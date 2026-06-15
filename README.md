# Website & Aplikasi PPDB Online SD KARTIKA X-4

Website Profil Sekolah dan Sistem Penerimaan Peserta Didik Baru (PPDB) Online terintegrasi untuk SD KARTIKA X-4. Dibangun menggunakan Next.js (App Router), Tailwind CSS, Prisma ORM, PostgreSQL (Supabase), dan NextAuth.js v5.

---

## 🛠️ Persyaratan Sistem
Sebelum menjalankan aplikasi, pastikan komputer Anda telah terinstal:
- [Node.js](https://nodejs.org/) (Versi LTS terbaru)
- Akun [Supabase](https://supabase.com/) (database PostgreSQL terkelola, gratis)

---

## ⚙️ Cara Setup Database di Supabase

Aplikasi ini menggunakan **Prisma ORM** yang telah dikonfigurasi dengan sistem **inisialisasi database otomatis**. Anda tidak perlu mengimpor tabel SQL secara manual. Ikuti langkah di bawah:

1. **Buat Project Supabase**:
   Masuk ke [dashboard Supabase](https://supabase.com/dashboard), klik **New Project**, lalu tentukan nama project dan **Database Password** (simpan password ini).
2. **Ambil String Koneksi**:
   Buka **Project Settings > Database > Connection string**. Salin dua URL berikut:
   - **Transaction Pooler** (port `6543`) untuk `DATABASE_URL`
   - **Direct Connection** (port `5432`) untuk `DIRECT_URL`
3. **Konfigurasi Berkas `.env`**:
   Buka berkas `.env` di direktori utama proyek, lalu isi sesuai kredensial Supabase Anda (ganti `[PASSWORD]`, `[PROJECT-REF]`, dan `[REGION]`):
   ```env
   # Runtime aplikasi (Pooler, port 6543)
   DATABASE_URL="postgresql://postgres.[PROJECT-REF]:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres?pgbouncer=true"
   # Migrasi schema Prisma (Direct, port 5432)
   DIRECT_URL="postgresql://postgres.[PROJECT-REF]:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:5432/postgres"
   ```

---

## ⚡ Cara Menjalankan Aplikasi

Setelah berkas `.env` terisi dengan kredensial Supabase, ikuti langkah berikut untuk menyalakan aplikasi:

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
> **Inisialisasi Tabel Otomatis**: Saat halaman website pertama kali dimuat, Next.js akan mendeteksi database Supabase yang masih kosong, lalu secara otomatis membuat tipe ENUM, seluruh tabel (`User` & `Registration`), beserta akun uji coba bawaan.

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

## 📂 Pilihan Alternatif (Migrasi via Prisma)
Selain inisialisasi otomatis saat runtime, Anda juga dapat membuat schema secara manual menggunakan Prisma:
```bash
# Sinkronkan schema ke database Supabase tanpa membuat file migrasi
npx prisma db push

# (Opsional) Isi akun uji coba bawaan
npx prisma db seed
```
> File `sd_kartika_x4.sql` lama merupakan dump MySQL dan **tidak lagi dipakai** setelah migrasi ke PostgreSQL/Supabase.
