# Dokumentasi Sistem Informasi PPDB (Penerimaan Peserta Didik Baru)

Dokumentasi ini merupakan penjabaran lengkap terkait arsitektur dan alur Sistem Informasi PPDB yang dibangun menggunakan Next.js dan Prisma ORM. Proyek ini memfasilitasi proses pendaftaran siswa baru, mulai dari pembuatan akun, pengisian biodata dan unggah berkas, hingga proses verifikasi oleh Admin.

---

## 1. Entity Relationship Diagram (ERD)

ERD di bawah ini merepresentasikan struktur database sistem berdasarkan Prisma schema. Terdapat relasi *One-to-One* (atau *One-to-Zero*) antara tabel `User` dan `Registration`.

```plantuml
@startuml
!define PRIMARY_KEY
!define FOREIGN_KEY
!define UNIQUE

entity "User" as user {
  * id : String <<PK>>
  --
  nama : String
  email : String <<UNIQUE>>
  password : String
  role : Role (USER, ADMIN)
  createdAt : DateTime
  updatedAt : DateTime
}

entity "Registration" as reg {
  * id : String <<PK>>
  --
  userId : String <<FK>> <<UNIQUE>>
  idRegistrasi : String <<UNIQUE>>
  namaLengkap : String
  ttl : String
  namaOrangTua : String
  asalSekolah : String
  fotoKk : String
  ktpOrangTua : String
  fotoAkte : String
  passFoto : String
  status : RegistrationStatus
  createdAt : DateTime
  updatedAt : DateTime
}

user ||--o| reg : "1" -- "0..1"
@enduml
```

---

## 2. Class Diagram

Class Diagram ini memperlihatkan struktur entitas aplikasi (Model) dan *Enumeration* yang mendefinisikan tipe role dan status, beserta method/operasi yang umumnya melekat secara logis pada *domain model* tersebut.

```plantuml
@startuml
skinparam classAttributeIconSize 0

enum Role {
  USER
  ADMIN
}

enum RegistrationStatus {
  BELUM_MENGISI
  MENUNGGU_VERIFIKASI
  LULUS
  TIDAK_LULUS
}

class User {
  + id : String
  + nama : String
  + email : String
  + password : String
  + role : Role
  + createdAt : DateTime
  + updatedAt : DateTime
  --
  + registerAccount()
  + login()
  + updateProfile()
}

class Registration {
  + id : String
  + userId : String
  + idRegistrasi : String
  + namaLengkap : String
  + ttl : String
  + namaOrangTua : String
  + asalSekolah : String
  + fotoKk : String
  + ktpOrangTua : String
  + fotoAkte : String
  + passFoto : String
  + status : RegistrationStatus
  + createdAt : DateTime
  + updatedAt : DateTime
  --
  + submitRegistrationForm()
  + uploadDocuments()
  + updateRegistrationStatus(status: RegistrationStatus)
}

User "1" *-- "0..1" Registration : "has"
User .> Role : "uses"
Registration .> RegistrationStatus : "uses"
@enduml
```

---

## 3. Sequence Diagram

Sequence diagram di bawah ini menjelaskan urutan pengiriman pesan antar objek atau komponen dalam skenario-skenario utama.

### A. Sequence Diagram: Pendaftaran & Pengajuan PPDB (Calon Siswa)

```plantuml
@startuml
actor "Calon Siswa\n(User)" as user
participant "Frontend\n(Next.js App)" as ui
participant "Server Action\n/ API Route" as action
participant "Database\n(Prisma/MySQL)" as db

== 1. Pembuatan Akun ==
user -> ui : Mengisi form registrasi akun (Nama, Email, Password)
ui -> action : submitRegister(data)
action -> db : create(User)
db --> action : User Created
action --> ui : Redirect ke Halaman Login

== 2. Login ==
user -> ui : Input Email & Password
ui -> action : loginCredentials(email, password)
action -> db : findUnique(User)
db --> action : User Data
action --> ui : Autentikasi Sukses, Redirect Dashboard

== 3. Pengisian Form PPDB ==
user -> ui : Mengisi Form Biodata & Upload Berkas
ui -> action : submitRegistration(dataForm)
action -> action : Generate ID Registrasi (PPDB26-XXX)
action -> db : create(Registration) dengan status MENUNGGU_VERIFIKASI
db --> action : Registration Created
action --> ui : Tampilkan Alert/Notifikasi Sukses
ui --> user : Halaman Dashboard (Status: Menunggu Verifikasi)
@enduml
```

### B. Sequence Diagram: Verifikasi Pendaftaran (Admin)

```plantuml
@startuml
actor Admin as admin
participant "Frontend\n(Admin Dashboard)" as ui
participant "Server Action\n/ API Route" as action
participant "Database\n(Prisma/MySQL)" as db

admin -> ui : Login dan Buka Halaman Verifikasi PPDB
ui -> db : fetchAll(Registration)
db --> ui : List of Registration

admin -> ui : Membuka detail pendaftar (Cek Berkas & Biodata)
ui --> admin : Tampilkan data dan gambar berkas

admin -> ui : Klik tombol "Lulus" / "Tidak Lulus"
ui -> action : updateStatus(registrationId, status)
action -> db : update(Registration, status)
db --> action : Registration Updated
action --> ui : Refresh Data / Tampilkan Notifikasi
ui --> admin : Data di tabel pendaftar terbarui
@enduml
```

---

## 4. Activity Diagram

Activity diagram di bawah ini menjelaskan alur kerja (workflow) dari sudut pandang proses bisnis PPDB, melingkupi interaksi dari sisi calon siswa hingga pihak Admin yang memberikan verifikasi.

```plantuml
@startuml
|Calon Siswa (User)|
start
:Mengakses Web PPDB Sekolah Kartika;
:Memilih menu Daftar / Registrasi Akun;
:Mengisi Nama, Email, dan Password;

|Sistem|
:Menyimpan data User ke Database;
:Mengarahkan ke halaman Login;

|Calon Siswa (User)|
:Melakukan Login;
:Membuka Halaman Formulir PPDB;
:Mengisi Biodata Lengkap (Nama, TTL, dll);
:Mengunggah Berkas (KK, KTP Ortu, Akte, Foto);
:Menyimpan/Submit Formulir Pendaftaran;

|Sistem|
:Menyimpan data Registration ke Database;
:Menetapkan Status "MENUNGGU_VERIFIKASI";

|Admin|
:Melakukan Login sebagai Admin;
:Mengakses Dashboard Admin;
:Melihat Daftar Pendaftar Masuk;
:Memeriksa Biodata dan Berkas Pendaftar;

if (Apakah Data & Berkas Valid?) then (Ya, Memenuhi Syarat)
  :Admin menetapkan status "LULUS";
else (Tidak, Data Salah/Kurang)
  :Admin menetapkan status "TIDAK_LULUS";
endif

|Sistem|
:Memperbarui kolom Status pada tabel Registration;

|Calon Siswa (User)|
:Mengecek Dashboard User;
:Melihat status kelulusan (LULUS / TIDAK LULUS);
stop
@enduml
```
