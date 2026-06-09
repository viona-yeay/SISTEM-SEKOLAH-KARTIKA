import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Memulai proses seeding database...");

  // Hapus data lama (opsional, untuk reset saat seed ulang)
  await prisma.registration.deleteMany({});
  await prisma.user.deleteMany({});

  // 1. Buat Akun Admin / Panitia
  const adminPassword = await bcrypt.hash("adminpassword123", 10);
  const admin = await prisma.user.create({
    data: {
      nama: "Panitia PPDB Kartika",
      email: "admin@kartikax4.sch.id",
      password: adminPassword,
      role: "ADMIN",
    },
  });
  console.log("Akun ADMIN berhasil dibuat:", admin.email);

  // 2. Buat Akun User / Wali Murid
  const userPassword = await bcrypt.hash("walipassword123", 10);
  const user = await prisma.user.create({
    data: {
      nama: "Budi Setiawan",
      email: "wali@email.com",
      password: userPassword,
      role: "USER",
    },
  });
  console.log("Akun USER (Wali Murid) berhasil dibuat:", user.email);

  console.log("Proses seeding database selesai dengan sukses!");
}

main()
  .catch((e) => {
    console.error("Terjadi kesalahan saat seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
