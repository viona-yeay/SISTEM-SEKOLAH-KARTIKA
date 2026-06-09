-- ====================================================================
-- SKRIP DATABASE SQL SD KARTIKA X-4 (PPDB)
-- Kompatibel penuh dengan MySQL / MariaDB pada XAMPP (phpMyAdmin)
-- ====================================================================

-- 1. Buat Database jika belum ada
CREATE DATABASE IF NOT EXISTS `sd_kartika_x4` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `sd_kartika_x4`;

-- 2. Buat Tabel User (Panitia & Wali Murid)
CREATE TABLE IF NOT EXISTS `User` (
  `id` VARCHAR(191) NOT NULL,
  `nama` VARCHAR(191) NOT NULL,
  `email` VARCHAR(191) NOT NULL,
  `password` VARCHAR(191) NOT NULL,
  `role` ENUM('USER', 'ADMIN') NOT NULL DEFAULT 'USER',
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` DATETIME(3) NOT NULL,
  UNIQUE INDEX `User_email_key`(`email`),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 3. Buat Tabel Registration (Formulir PPDB Calon Siswa)
CREATE TABLE IF NOT EXISTS `Registration` (
  `id` VARCHAR(191) NOT NULL,
  `userId` VARCHAR(191) NOT NULL,
  `idRegistrasi` VARCHAR(191) NOT NULL,
  `namaLengkap` VARCHAR(191) NOT NULL,
  `ttl` VARCHAR(191) NOT NULL,
  `namaOrangTua` VARCHAR(191) NOT NULL,
  `asalSekolah` VARCHAR(191) NOT NULL,
  `status` ENUM('BELUM_MENGISI', 'MENUNGGU_VERIFIKASI', 'LULUS', 'TIDAK_LULUS') NOT NULL DEFAULT 'MENUNGGU_VERIFIKASI',
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` DATETIME(3) NOT NULL,
  UNIQUE INDEX `Registration_userId_key`(`userId`),
  UNIQUE INDEX `Registration_idRegistrasi_key`(`idRegistrasi`),
  PRIMARY KEY (`id`),
  CONSTRAINT `Registration_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
