"use client";

import { useState } from "react";
import { signOut } from "next-auth/react";
import { submitPpdbForm } from "@/app/actions/ppdb";
import { 
  GraduationCap, LogOut, FileText, Clock, CheckCircle2, 
  XCircle, Printer, BookOpen, User as UserIcon, Calendar, Building 
} from "lucide-react";

interface UserDashboardProps {
  user: {
    name: string;
    email: string;
  };
  registration: {
    id: string;
    idRegistrasi: string;
    namaLengkap: string;
    ttl: string;
    namaOrangTua: string;
    asalSekolah: string;
    fotoKk: string;
    ktpOrangTua: string;
    fotoAkte: string;
    passFoto: string;
    status: "BELUM_MENGISI" | "MENUNGGU_VERIFIKASI" | "LULUS" | "TIDAK_LULUS";
  } | null;
}

export default function UserDashboard({ user, registration }: UserDashboardProps) {
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [localReg, setLocalReg] = useState(registration);
  const [previews, setPreviews] = useState<{ [key: string]: string }>({});

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, fieldName: string) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviews(prev => ({ ...prev, [fieldName]: url }));
    }
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const res = await submitPpdbForm(null, formData);

    setIsSubmitting(false);
    if (res?.error) {
      setError(res.error);
    } else if (res?.success) {
      // Simulasikan update instan pada state lokal
      setLocalReg({
        id: "",
        idRegistrasi: res.idRegistrasi || "PPDB26-XXX",
        namaLengkap: formData.get("namaLengkap") as string,
        ttl: formData.get("ttl") as string,
        namaOrangTua: formData.get("namaOrangTua") as string,
        asalSekolah: formData.get("asalSekolah") as string,
        fotoKk: previews.fotoKk || "",
        ktpOrangTua: previews.ktpOrangTua || "",
        fotoAkte: previews.fotoAkte || "",
        passFoto: previews.passFoto || "",
        status: "MENUNGGU_VERIFIKASI"
      });
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Topbar Dashboard */}
      <header className="bg-blue-900 text-white shadow-md print:hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="bg-white/10 p-2 rounded-xl border border-white/10">
              <GraduationCap className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight">Portal PPDB Siswa</h1>
              <p className="text-[10px] text-blue-200 font-semibold tracking-wider uppercase leading-none">SD KARTIKA X-4</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <span className="hidden sm:inline text-xs text-blue-200">
              Selamat datang, <strong className="text-white">{user.name}</strong>
            </span>
            <button
              onClick={() => signOut({ redirectTo: "/" })}
              className="bg-white/10 hover:bg-white/15 text-white flex items-center space-x-1.5 px-3 py-2 rounded-xl text-xs font-semibold border border-white/10 transition-colors cursor-pointer"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Keluar</span>
            </button>
          </div>
        </div>
      </header>

      {/* Konten Utama */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 print:py-0 print:px-0">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Sisi Kiri: Profil & Status Kelulusan */}
          <div className="lg:col-span-4 space-y-6 print:hidden">
            {/* Profil User */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-left space-y-4">
              <h3 className="font-bold text-slate-800 text-sm tracking-wider uppercase border-b border-slate-100 pb-2">
                Informasi Akun
              </h3>
              <div className="space-y-3 text-sm text-slate-600">
                <div>
                  <p className="text-xs text-slate-400 font-bold uppercase">Nama Pendaftar</p>
                  <p className="font-bold text-slate-800 mt-0.5">{user.name}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-bold uppercase">Alamat Email</p>
                  <p className="font-semibold text-slate-800 mt-0.5">{user.email}</p>
                </div>
              </div>
            </div>

            {/* Kartu Status Pendaftaran */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-left space-y-4">
              <h3 className="font-bold text-slate-800 text-sm tracking-wider uppercase border-b border-slate-100 pb-2">
                Status Registrasi PPDB
              </h3>
              
              {!localReg ? (
                // BELUM MENGISI FORMULIR
                <div className="space-y-3">
                  <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-100">
                    Belum Mengisi Formulir
                  </span>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Sistem belum mendeteksi pengisian formulir. Silakan lengkapi formulir di sebelah kanan untuk memulai proses verifikasi berkas.
                  </p>
                </div>
              ) : localReg.status === "MENUNGGU_VERIFIKASI" ? (
                // MENUNGGU VERIFIKASI
                <div className="space-y-4">
                  <div className="flex items-center space-x-2 text-amber-700 bg-amber-50 border border-amber-100 px-3 py-2 rounded-xl">
                    <Clock className="h-5 w-5 text-amber-600 flex-shrink-0 animate-pulse" />
                    <span className="text-xs font-bold uppercase">Menunggu Verifikasi</span>
                  </div>
                  <div className="text-sm text-slate-650">
                    <p className="text-xs text-slate-400 font-bold uppercase">ID Registrasi</p>
                    <p className="font-extrabold text-blue-900 mt-0.5 text-base">{localReg.idRegistrasi}</p>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Berkas pendaftaran Anda telah berhasil diajukan dan sedang diulas secara cermat oleh Panitia Penerimaan SD KARTIKA X-4. Hasil seleksi akan langsung ditampilkan di sini.
                  </p>
                </div>
              ) : localReg.status === "LULUS" ? (
                // LULUS
                <div className="space-y-4">
                  <div className="flex items-center space-x-2 text-emerald-800 bg-emerald-50 border border-emerald-100 px-3 py-2 rounded-xl">
                    <CheckCircle2 className="h-5 w-5 text-emerald-600 flex-shrink-0" />
                    <span className="text-xs font-bold uppercase">Calon Siswa Lulus</span>
                  </div>
                  <div className="text-sm text-slate-650">
                    <p className="text-xs text-slate-400 font-bold uppercase">ID Registrasi</p>
                    <p className="font-extrabold text-blue-900 mt-0.5 text-base">{localReg.idRegistrasi}</p>
                  </div>
                  <p className="text-xs text-emerald-700 leading-relaxed font-semibold">
                    Selamat! Putra-putri Anda dinyatakan LULUS seleksi berkas penerimaan peserta didik baru SD KARTIKA X-4.
                  </p>
                  <button
                    onClick={handlePrint}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center space-x-2 py-2.5 rounded-xl text-xs font-bold shadow-md transition-colors cursor-pointer"
                  >
                    <Printer className="h-4 w-4" />
                    <span>Cetak Bukti Kelulusan</span>
                  </button>
                </div>
              ) : (
                // TIDAK LULUS
                <div className="space-y-4">
                  <div className="flex items-center space-x-2 text-rose-800 bg-rose-50 border border-rose-100 px-3 py-2 rounded-xl">
                    <XCircle className="h-5 w-5 text-rose-600 flex-shrink-0" />
                    <span className="text-xs font-bold uppercase">Tidak Lulus Seleksi</span>
                  </div>
                  <div className="text-sm text-slate-650">
                    <p className="text-xs text-slate-400 font-bold uppercase">ID Registrasi</p>
                    <p className="font-extrabold text-slate-800 mt-0.5 text-base">{localReg.idRegistrasi}</p>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Mohon maaf, pendaftaran calon siswa saat ini belum memenuhi kriteria kelulusan panitia atau daya tampung kuota kelas telah terpenuhi.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Sisi Kanan: Formulir atau Bukti Kelulusan */}
          <div className="lg:col-span-8">
            {!localReg ? (
              // FORMULIR PENDAFTARAN (Jika Belum Isi)
              <div className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-sm text-left space-y-6 print:hidden">
                <div className="flex items-center space-x-3 text-blue-900 border-b border-slate-100 pb-4">
                  <FileText className="h-6 w-6" />
                  <div>
                    <h3 className="text-xl font-bold tracking-tight">Formulir Pendaftaran Siswa Baru</h3>
                    <p className="text-xs text-slate-400 font-semibold mt-0.5">Tahun Ajaran 2026/2027 | Lengkapi dengan Huruf Kapital</p>
                  </div>
                </div>

                {error && (
                  <div className="p-3.5 bg-rose-50 border border-rose-200 text-rose-800 rounded-xl flex items-start space-x-2 text-xs font-semibold">
                    <XCircle className="h-4.5 w-4.5 text-rose-600 flex-shrink-0 mt-0.5" />
                    <span>{error}</span>
                  </div>
                )}

                <form onSubmit={handleFormSubmit} encType="multipart/form-data" className="space-y-6">
                  {/* Seksi A: Data Calon Siswa */}
                  <div className="space-y-4">
                    <h4 className="font-bold text-blue-900 text-sm tracking-wider uppercase border-l-4 border-blue-650 pl-3">
                      A. Data Diri Calon Siswa
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                          Nama Lengkap Calon Siswa
                        </label>
                        <input
                          type="text"
                          name="namaLengkap"
                          required
                          placeholder="Contoh: RIFQI ADRIAN PRATAMA"
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                          Tempat, Tanggal Lahir (TTL)
                        </label>
                        <input
                          type="text"
                          name="ttl"
                          required
                          placeholder="Contoh: Jakarta, 12-05-2020"
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Seksi B: Data Orang Tua */}
                  <div className="space-y-4">
                    <h4 className="font-bold text-blue-900 text-sm tracking-wider uppercase border-l-4 border-blue-650 pl-3">
                      B. Data Orang Tua / Wali
                    </h4>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                        Nama Lengkap Orang Tua / Wali
                      </label>
                      <input
                        type="text"
                        name="namaOrangTua"
                        required
                        placeholder="Contoh: BUDI SETIAWAN, S.H."
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm"
                      />
                    </div>
                  </div>

                  {/* Seksi C: Riwayat TK */}
                  <div className="space-y-4">
                    <h4 className="font-bold text-blue-900 text-sm tracking-wider uppercase border-l-4 border-blue-650 pl-3">
                      C. Riwayat Pendidikan Sebelumnya
                    </h4>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                        Asal TK / PAUD / Sekolah Sebelum
                      </label>
                      <input
                        type="text"
                        name="asalSekolah"
                        required
                        placeholder="Contoh: TK KARTIKA X-4 JAKARTA"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm"
                      />
                    </div>
                  </div>

                  {/* Seksi D: Berkas Persyaratan */}
                  <div className="space-y-4">
                    <h4 className="font-bold text-blue-900 text-sm tracking-wider uppercase border-l-4 border-blue-650 pl-3">
                      D. Unggah Berkas Persyaratan (Format Gambar, Maks 5MB)
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      {/* Foto KK */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                          Foto Kartu Keluarga (KK)
                        </label>
                        <input
                          type="file"
                          name="fotoKk"
                          accept="image/*"
                          required
                          onChange={(e) => handleFileChange(e, "fotoKk")}
                          className="w-full text-sm text-slate-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 border border-slate-200 p-2 rounded-xl"
                        />
                        {previews.fotoKk && (
                          <div className="mt-2 relative w-full h-32 rounded-xl overflow-hidden border border-slate-200 bg-slate-50">
                            <img src={previews.fotoKk} alt="Preview KK" className="w-full h-full object-cover" />
                          </div>
                        )}
                      </div>
                      {/* KTP Orang Tua */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                          Foto KTP Orang Tua
                        </label>
                        <input
                          type="file"
                          name="ktpOrangTua"
                          accept="image/*"
                          required
                          onChange={(e) => handleFileChange(e, "ktpOrangTua")}
                          className="w-full text-sm text-slate-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 border border-slate-200 p-2 rounded-xl"
                        />
                        {previews.ktpOrangTua && (
                          <div className="mt-2 relative w-full h-32 rounded-xl overflow-hidden border border-slate-200 bg-slate-50">
                            <img src={previews.ktpOrangTua} alt="Preview KTP" className="w-full h-full object-cover" />
                          </div>
                        )}
                      </div>
                      {/* Foto Akte */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                          Foto Akte Kelahiran Anak
                        </label>
                        <input
                          type="file"
                          name="fotoAkte"
                          accept="image/*"
                          required
                          onChange={(e) => handleFileChange(e, "fotoAkte")}
                          className="w-full text-sm text-slate-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 border border-slate-200 p-2 rounded-xl"
                        />
                        {previews.fotoAkte && (
                          <div className="mt-2 relative w-full h-32 rounded-xl overflow-hidden border border-slate-200 bg-slate-50">
                            <img src={previews.fotoAkte} alt="Preview Akte" className="w-full h-full object-cover" />
                          </div>
                        )}
                      </div>
                      {/* Pass Foto */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                          Pass Foto 3x4 (1 Lembar)
                        </label>
                        <input
                          type="file"
                          name="passFoto"
                          accept="image/*"
                          required
                          onChange={(e) => handleFileChange(e, "passFoto")}
                          className="w-full text-sm text-slate-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 border border-slate-200 p-2 rounded-xl"
                        />
                        {previews.passFoto && (
                          <div className="mt-2 relative w-24 h-32 rounded-xl overflow-hidden border border-slate-200 bg-slate-50">
                            <img src={previews.passFoto} alt="Preview Pass Foto" className="w-full h-full object-cover" />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Tombol Submit */}
                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center space-x-2 py-4 rounded-xl font-bold shadow-lg transition-colors cursor-pointer disabled:bg-blue-400"
                    >
                      <CheckCircle2 className="h-5 w-5" />
                      <span>{isSubmitting ? "Sedang Mengirim Data Formulir..." : "Kirim Pendaftaran Sekarang"}</span>
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              // JIKA SUDAH MENGISI FORMULIR
              <div className="space-y-8">
                {/* Info Status Pengisian */}
                <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm text-left space-y-4 print:hidden">
                  <div className="flex items-center space-x-3 text-slate-700">
                    <CheckCircle2 className="h-6 w-6 text-emerald-600" />
                    <div>
                      <h3 className="text-lg font-bold">Data Pendaftaran Berhasil Disubmit</h3>
                      <p className="text-xs text-slate-500">Anda telah melengkapi formulir. Data di bawah ini bersifat permanen.</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2 text-sm text-slate-650">
                    <div className="bg-slate-50 p-4 rounded-xl space-y-2">
                      <div>
                        <span className="text-[10px] text-slate-400 font-bold uppercase block">Nama Lengkap Siswa</span>
                        <strong className="text-slate-800">{localReg.namaLengkap}</strong>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 font-bold uppercase block">Tempat Tanggal Lahir</span>
                        <strong className="text-slate-800">{localReg.ttl}</strong>
                      </div>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-xl space-y-2">
                      <div>
                        <span className="text-[10px] text-slate-400 font-bold uppercase block">Nama Orang Tua/Wali</span>
                        <strong className="text-slate-800">{localReg.namaOrangTua}</strong>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 font-bold uppercase block">Asal Sekolah (TK)</span>
                        <strong className="text-slate-800">{localReg.asalSekolah}</strong>
                      </div>
                    </div>
                  </div>

                  {/* Berkas Persyaratan yang Diunggah */}
                  <div className="pt-4 border-t border-slate-100">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-3">Berkas Persyaratan yang Diunggah</span>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      {localReg.fotoKk && (
                        <a href={localReg.fotoKk} target="_blank" rel="noopener noreferrer" className="block p-3 bg-slate-50 border border-slate-200 rounded-xl hover:bg-slate-100 transition text-center shadow-sm">
                          <span className="text-[10px] text-slate-500 font-bold uppercase block mb-1">Kartu Keluarga (KK)</span>
                          <span className="text-xs text-blue-600 font-bold hover:underline">Lihat Berkas</span>
                        </a>
                      )}
                      {localReg.ktpOrangTua && (
                        <a href={localReg.ktpOrangTua} target="_blank" rel="noopener noreferrer" className="block p-3 bg-slate-50 border border-slate-200 rounded-xl hover:bg-slate-100 transition text-center shadow-sm">
                          <span className="text-[10px] text-slate-500 font-bold uppercase block mb-1">KTP Orang Tua</span>
                          <span className="text-xs text-blue-600 font-bold hover:underline">Lihat Berkas</span>
                        </a>
                      )}
                      {localReg.fotoAkte && (
                        <a href={localReg.fotoAkte} target="_blank" rel="noopener noreferrer" className="block p-3 bg-slate-50 border border-slate-200 rounded-xl hover:bg-slate-100 transition text-center shadow-sm">
                          <span className="text-[10px] text-slate-500 font-bold uppercase block mb-1">Akte Lahir Anak</span>
                          <span className="text-xs text-blue-600 font-bold hover:underline">Lihat Berkas</span>
                        </a>
                      )}
                      {localReg.passFoto && (
                        <a href={localReg.passFoto} target="_blank" rel="noopener noreferrer" className="block p-3 bg-slate-50 border border-slate-200 rounded-xl hover:bg-slate-100 transition text-center shadow-sm">
                          <span className="text-[10px] text-slate-500 font-bold uppercase block mb-1">Pass Foto 3x4</span>
                          <span className="text-xs text-blue-600 font-bold hover:underline">Lihat Berkas</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                {/* Surat Bukti Kelulusan Digital (Muncul hanya jika status LULUS) */}
                {localReg.status === "LULUS" && (
                  <div className="bg-white border-[6px] border-double border-blue-900 rounded-3xl p-10 sm:p-14 text-center space-y-8 shadow-2xl relative overflow-hidden print:border-none print:shadow-none print:p-0">
                    {/* Hiasan Latar Belakang */}
                    <div className="absolute inset-0 bg-[radial-gradient(#1e3a8a_1px,transparent_1px)] [background-size:24px_24px] opacity-5 print:hidden" />
                    
                    {/* Kop Surat */}
                    <div className="border-b-4 border-slate-800 pb-6 flex flex-col items-center relative z-10">
                      <div className="bg-blue-900 text-white p-3 rounded-2xl shadow mb-3 print:bg-slate-850">
                        <GraduationCap className="h-8 w-8" />
                      </div>
                      <h2 className="text-2xl font-extrabold text-blue-900 tracking-tight print:text-black uppercase">
                        YAYASAN KARTIKA JAYA
                      </h2>
                      <h3 className="text-xl font-bold text-slate-800 print:text-black mt-0.5">
                        SD KARTIKA X-4 JAKARTA
                      </h3>
                      <p className="text-xs text-slate-400 mt-1 font-semibold">
                        Jl. Kartika No. 4, Kompleks Militer, Jakarta Barat | Telp: (021) 567-8910
                      </p>
                    </div>

                    {/* Judul Surat */}
                    <div className="space-y-2 relative z-10">
                      <h4 className="text-xl font-extrabold tracking-wider text-slate-800 uppercase underline">
                        SURAT BUKTI KELULUSAN SELEKSI PPDB
                      </h4>
                      <p className="text-xs text-slate-500 font-semibold">
                        Nomor: {localReg.idRegistrasi}/PPDB/SDK-X4/2026
                      </p>
                    </div>

                    {/* Isi Surat */}
                    <div className="space-y-6 text-slate-700 text-sm leading-relaxed text-left max-w-xl mx-auto relative z-10">
                      <p>
                        Berdasarkan hasil seleksi berkas administrasi dan evaluasi persyaratan oleh Panitia Penerimaan Peserta Didik Baru (PPDB) SD KARTIKA X-4 Jakarta Tahun Pelajaran 2026/2027, dengan ini menyatakan bahwa:
                      </p>

                      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-3 font-semibold print:bg-white">
                        <div className="grid grid-cols-3">
                          <span className="text-slate-400">ID Registrasi</span>
                          <span className="col-span-2 text-blue-900 print:text-black font-extrabold">: {localReg.idRegistrasi}</span>
                        </div>
                        <div className="grid grid-cols-3">
                          <span className="text-slate-400">Nama Calon Siswa</span>
                          <span className="col-span-2 text-slate-800">: {localReg.namaLengkap}</span>
                        </div>
                        <div className="grid grid-cols-3">
                          <span className="text-slate-400">Tempat, Tgl Lahir</span>
                          <span className="col-span-2 text-slate-800">: {localReg.ttl}</span>
                        </div>
                        <div className="grid grid-cols-3">
                          <span className="text-slate-400">Nama Orang Tua/Wali</span>
                          <span className="col-span-2 text-slate-800">: {localReg.namaOrangTua}</span>
                        </div>
                        <div className="grid grid-cols-3">
                          <span className="text-slate-400">Asal TK / PAUD</span>
                          <span className="col-span-2 text-slate-800">: {localReg.asalSekolah}</span>
                        </div>
                      </div>

                      <p className="text-center font-extrabold text-emerald-700 text-base py-2 uppercase border-y-2 border-dashed border-slate-200">
                        DINYATAKAN: LULUS SELEKSI
                      </p>

                      <p>
                        Pendaftar yang bersangkutan dinyatakan resmi diterima menjadi bagian dari keluarga besar SD KARTIKA X-4 Jakarta. Harap mencetak dokumen bukti ini untuk digunakan saat melakukan verifikasi fisik dan daftar ulang administrasi keuangan.
                      </p>
                    </div>

                    {/* Tanda Tangan */}
                    <div className="pt-6 flex justify-end text-slate-700 text-sm relative z-10">
                      <div className="text-center space-y-16">
                        <div>
                          <p>Jakarta, 26 Mei 2026</p>
                          <p className="font-bold">Ketua Panitia PPDB,</p>
                        </div>
                        <div>
                          <p className="font-extrabold underline text-slate-800">Budi Santoso, S.Pd.</p>
                          <p className="text-xs text-slate-400">NIP. 19790514 200501 1 002</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

        </div>
      </main>
    </div>
  );
}
