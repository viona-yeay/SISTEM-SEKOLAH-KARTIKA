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
      await prisma.$queryRaw`SELECT 1 FROM User LIMIT 1`;
      userTableExists = true;
      console.log("[DB Init] Tabel 'User' terdeteksi sudah ada.");
    } catch (e) {
      console.log("[DB Init] Tabel 'User' belum ada. Membuat tabel...");
    }

    // 2. Jika tabel belum ada, buat tabel secara manual lewat executeRaw
    if (!userTableExists) {
      // Buat tabel User
      await prisma.$executeRawUnsafe(`
        CREATE TABLE IF NOT EXISTS \`User\` (
          \`id\` VARCHAR(191) NOT NULL,
          \`nama\` VARCHAR(191) NOT NULL,
          \`email\` VARCHAR(191) NOT NULL,
          \`password\` VARCHAR(191) NOT NULL,
          \`role\` ENUM('USER', 'ADMIN') NOT NULL DEFAULT 'USER',
          \`createdAt\` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
          \`updatedAt\` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
          UNIQUE INDEX \`User_email_key\`(\`email\`),
          PRIMARY KEY (\`id\`)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
      `);

      // Buat tabel Registration
      await prisma.$executeRawUnsafe(`
        CREATE TABLE IF NOT EXISTS \`Registration\` (
          \`id\` VARCHAR(191) NOT NULL,
          \`userId\` VARCHAR(191) NOT NULL,
          \`idRegistrasi\` VARCHAR(191) NOT NULL,
          \`namaLengkap\` VARCHAR(191) NOT NULL,
          \`ttl\` VARCHAR(191) NOT NULL,
          \`namaOrangTua\` VARCHAR(191) NOT NULL,
          \`asalSekolah\` VARCHAR(191) NOT NULL,
          \`fotoKk\` VARCHAR(191) NOT NULL,
          \`ktpOrangTua\` VARCHAR(191) NOT NULL,
          \`fotoAkte\` VARCHAR(191) NOT NULL,
          \`passFoto\` VARCHAR(191) NOT NULL,
          \`status\` ENUM('BELUM_MENGISI', 'MENUNGGU_VERIFIKASI', 'LULUS', 'TIDAK_LULUS') NOT NULL DEFAULT 'MENUNGGU_VERIFIKASI',
          \`createdAt\` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
          \`updatedAt\` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
          UNIQUE INDEX \`Registration_userId_key\`(\`userId\`),
          UNIQUE INDEX \`Registration_idRegistrasi_key\`(\`idRegistrasi\`),
          PRIMARY KEY (\`id\`),
          CONSTRAINT \`Registration_userId_fkey\` FOREIGN KEY (\`userId\`) REFERENCES \`User\` (\`id\`) ON DELETE CASCADE ON UPDATE CASCADE
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
      `);
      console.log("[DB Init] Seluruh tabel berhasil dibuat otomatis di MySQL.");
    } else {
      // Pastikan kolom berkas baru ada di tabel Registration (migrasi dinamis untuk database lokal yang sudah ada)
      try {
        await prisma.$executeRawUnsafe(`ALTER TABLE \`Registration\` ADD COLUMN \`fotoKk\` VARCHAR(191) NOT NULL DEFAULT ''`);
      } catch (e) {}
      try {
        await prisma.$executeRawUnsafe(`ALTER TABLE \`Registration\` ADD COLUMN \`ktpOrangTua\` VARCHAR(191) NOT NULL DEFAULT ''`);
      } catch (e) {}
      try {
        await prisma.$executeRawUnsafe(`ALTER TABLE \`Registration\` ADD COLUMN \`fotoAkte\` VARCHAR(191) NOT NULL DEFAULT ''`);
      } catch (e) {}
      try {
        await prisma.$executeRawUnsafe(`ALTER TABLE \`Registration\` ADD COLUMN \`passFoto\` VARCHAR(191) NOT NULL DEFAULT ''`);
      } catch (e) {}
    }

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
