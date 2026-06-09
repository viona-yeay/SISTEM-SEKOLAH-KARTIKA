# Website & Aplikasi PPDB Online SD KARTIKA X-4

Website Profil Sekolah dan Sistem Penerimaan Peserta Didik Baru (PPDB) Online terintegrasi untuk SD KARTIKA X-4. Dibangun menggunakan Next.js (App Router), Tailwind CSS, Prisma ORM, MySQL (XAMPP), dan NextAuth.js v5.

---

## 🛠️ Persyaratan Sistem
Sebelum menjalankan aplikasi, pastikan komputer Anda telah terinstal:
- [Node.js](https://nodejs.org/) (Versi LTS terbaru)
- [XAMPP](https://www.apachefriends.org/index.html) (Untuk server lokal MySQL/MariaDB)

---

## ⚙️ Cara Setup Database di XAMPP

Aplikasi ini menggunakan **Prisma ORM** yang telah dikonfigurasi dengan sistem **inisialisasi database otomatis**. Anda tidak perlu mengimpor tabel SQL secara manual. Ikuti langkah di bawah:

1. **Aktifkan XAMPP**:
   Buka aplikasi *XAMPP Control Panel*, kemudian klik **Start** pada bagian **Apache** dan **MySQL**.
2. **Buat Database Kosong**:
   Buka browser Anda dan buka tautan [http://localhost/phpmyadmin](http://localhost/phpmyadmin). Buat database baru dengan nama:
   `sd_kartika_x4`
3. **Konfigurasi Berkas `.env`**:
   Buka berkas `.env` di direktori utama proyek Anda, lalu pastikan baris `DATABASE_URL` telah disesuaikan dengan kredensial XAMPP lokal Anda:
   ```env
   # Format: mysql://USERNAME:PASSWORD@HOST:PORT/NAMA_DATABASE
   DATABASE_URL="mysql://root:@localhost:3306/sd_kartika_x4"
   ```
   *(Secara bawaan, username XAMPP adalah `root` dan tanpa password).*

---

## ⚡ Cara Menjalankan Aplikasi

Setelah database XAMPP aktif dan database kosong telah dibuat, ikuti langkah berikut untuk menyalakan aplikasi:

1. **Unduh/Install Dependencies** (jika belum):
   ```bash
   npm install
   ```
2. **Jalankan Aplikasi dalam Mode Pengembangan**:
   ```bash
   npm run dev
   ```
3. **Akses di Browser**:
   Buka [http://localhost:3000](http://localhost:3000) di browser Anda.

> [!NOTE]  
> **Inisialisasi Tabel Otomatis**: Saat halaman website pertama kali dimuat di browser Anda, Next.js akan mendeteksi database kosong di XAMPP, lalu secara otomatis membuat seluruh tabel (`User` & `Registration`) beserta akun uji coba bawaan.

---

## 🔑 Akun Uji Coba Bawaan

Sistem otomatis membuat dua akun pengujian berikut untuk memudahkan evaluasi alur pendaftaran PPDB:

### 1. Akun Panitia (ADMIN)
- **Halaman Masuk**: [http://localhost:3000/login](http://localhost:3000/login)
- **Email**: `admin@kartikax4.sch.id`
- **Kata Sandi**: `adminpassword123`
- **Fitur**: Melihat statistik pendaftaran berkas, melakukan pencarian siswa, meninjau biodata formulir calon siswa, serta menyetujui (**Terima / Lulus**) atau menolak berkas pendaftar.

### 2. Akun Wali Murid (USER)
- **Halaman Masuk**: [http://localhost:3000/login](http://localhost:3000/login)
- **Email**: `wali@email.com`
- **Kata Sandi**: `walipassword123`
- **Fitur**: Mengisi formulir pendaftaran calon siswa (Data diri, Orang tua, TK asal), memantau status seleksi secara real-time, dan mencetak/mengunduh **Surat Bukti Kelulusan Digital** resmi jika dinyatakan diterima oleh panitia.

---

## 📂 Pilihan Alternatif (Import SQL Manual)
Jika Anda ingin mengimpor skema database secara manual melalui fitur *Import* phpMyAdmin, Anda dapat menggunakan file SQL yang telah disediakan:
- Berkas SQL: **[sd_kartika_x4.sql](file:///C:/Users/vionafebiola/KP-SEKOLAH/sd_kartika_x4.sql)** (berada di folder utama proyek).
