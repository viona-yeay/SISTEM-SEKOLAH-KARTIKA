import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

let isInitializing = false;
let isInitialized = false;

export async function initializeDatabase() {
  if (isInitialized || isInitializing) return;
  
  isInitializing = true;
  console.log("[DB Init] Memulai pemeriksaan dan inisialisasi database...");
  
  try {
    // 1. Cek apakah tabel User sudah ada
    let userTableExists = false;
    try {
      await prisma.$queryRaw`SELECT 1 FROM "User" LIMIT 1`;
      userTableExists = true;
      console.log("[DB Init] Tabel 'User' terdeteksi sudah ada.");
    } catch (e) {
      console.log("[DB Init] Tabel 'User' belum ada. Membuat tabel...");
    }

    // 2. Jika tabel belum ada, buat tabel secara manual lewat executeRaw (sintaks PostgreSQL)
    if (!userTableExists) {
      // Buat tipe ENUM (idempoten: abaikan jika sudah ada)
      await prisma.$executeRawUnsafe(`
        DO $$ BEGIN
          CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');
        EXCEPTION WHEN duplicate_object THEN null; END $$;
      `);
      await prisma.$executeRawUnsafe(`
        DO $$ BEGIN
          CREATE TYPE "RegistrationStatus" AS ENUM ('BELUM_MENGISI', 'MENUNGGU_VERIFIKASI', 'LULUS', 'TIDAK_LULUS');
        EXCEPTION WHEN duplicate_object THEN null; END $$;
      `);

      // Buat tabel User
      await prisma.$executeRawUnsafe(`
        CREATE TABLE IF NOT EXISTS "User" (
          "id" TEXT NOT NULL,
          "nama" TEXT NOT NULL,
          "email" TEXT NOT NULL,
          "password" TEXT NOT NULL,
          "role" "Role" NOT NULL DEFAULT 'USER',
          "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
          "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
          CONSTRAINT "User_pkey" PRIMARY KEY ("id")
        );
      `);
      await prisma.$executeRawUnsafe(`
        CREATE UNIQUE INDEX IF NOT EXISTS "User_email_key" ON "User"("email");
      `);

      // Buat tabel Registration
      await prisma.$executeRawUnsafe(`
        CREATE TABLE IF NOT EXISTS "Registration" (
          "id" TEXT NOT NULL,
          "userId" TEXT NOT NULL,
          "idRegistrasi" TEXT NOT NULL,
          "namaLengkap" TEXT NOT NULL,
          "ttl" TEXT NOT NULL,
          "namaOrangTua" TEXT NOT NULL,
          "asalSekolah" TEXT NOT NULL,
          "fotoKk" TEXT NOT NULL,
          "ktpOrangTua" TEXT NOT NULL,
          "fotoAkte" TEXT NOT NULL,
          "passFoto" TEXT NOT NULL,
          "status" "RegistrationStatus" NOT NULL DEFAULT 'MENUNGGU_VERIFIKASI',
          "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
          "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
          CONSTRAINT "Registration_pkey" PRIMARY KEY ("id"),
          CONSTRAINT "Registration_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
        );
      `);
      await prisma.$executeRawUnsafe(`
        CREATE UNIQUE INDEX IF NOT EXISTS "Registration_userId_key" ON "Registration"("userId");
      `);
      await prisma.$executeRawUnsafe(`
        CREATE UNIQUE INDEX IF NOT EXISTS "Registration_idRegistrasi_key" ON "Registration"("idRegistrasi");
      `);
      console.log("[DB Init] Seluruh tabel berhasil dibuat otomatis di PostgreSQL.");
    } else {
      // Pastikan kolom berkas baru ada di tabel Registration (migrasi dinamis untuk database yang sudah ada)
      try {
        await prisma.$executeRawUnsafe(`ALTER TABLE "Registration" ADD COLUMN IF NOT EXISTS "fotoKk" TEXT NOT NULL DEFAULT ''`);
      } catch (e) {}
      try {
        await prisma.$executeRawUnsafe(`ALTER TABLE "Registration" ADD COLUMN IF NOT EXISTS "ktpOrangTua" TEXT NOT NULL DEFAULT ''`);
      } catch (e) {}
      try {
        await prisma.$executeRawUnsafe(`ALTER TABLE "Registration" ADD COLUMN IF NOT EXISTS "fotoAkte" TEXT NOT NULL DEFAULT ''`);
      } catch (e) {}
      try {
        await prisma.$executeRawUnsafe(`ALTER TABLE "Registration" ADD COLUMN IF NOT EXISTS "passFoto" TEXT NOT NULL DEFAULT ''`);
      } catch (e) {}
    }

    // 2b. Pastikan tabel Kegiatan (galeri) selalu ada (idempoten, untuk DB baru maupun lama)
    await prisma.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS "Kegiatan" (
        "id" TEXT NOT NULL,
        "judul" TEXT NOT NULL,
        "kategori" TEXT NOT NULL,
        "deskripsi" TEXT NOT NULL,
        "gambarUrl" TEXT NOT NULL,
        "gambarPath" TEXT NOT NULL DEFAULT '',
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT "Kegiatan_pkey" PRIMARY KEY ("id")
      );
    `);

    // 3. Buat User Default secara otomatis jika belum terdaftar
    const adminEmail = "admin@kartikax4.sch.id";
    const userEmail = "wali@email.com";

    const adminExists = await prisma.user.findUnique({ where: { email: adminEmail } });
    if (!adminExists) {
      const adminPassword = await bcrypt.hash("adminpassword123", 10);
      await prisma.user.create({
        data: {
          id: "admin-default-id",
          nama: "Panitia PPDB Kartika",
          email: adminEmail,
          password: adminPassword,
          role: "ADMIN",
        },
      });
      console.log("[DB Init] Akun ADMIN bawaan berhasil dibuat (admin@kartikax4.sch.id / adminpassword123).");
    }

    const userExists = await prisma.user.findUnique({ where: { email: userEmail } });
    if (!userExists) {
      const userPassword = await bcrypt.hash("walipassword123", 10);
      await prisma.user.create({
        data: {
          id: "user-default-id",
          nama: "Budi Setiawan",
          email: userEmail,
          password: userPassword,
          role: "USER",
        },
      });
      console.log("[DB Init] Akun USER (Wali Murid) bawaan berhasil dibuat (wali@email.com / walipassword123).");
    }

    console.log("[DB Init] Inisialisasi database sukses!");
    isInitialized = true;
  } catch (error) {
    console.error("[DB Init] Gagal menginisialisasi database:", error);
  } finally {
    isInitializing = false;
  }
}
