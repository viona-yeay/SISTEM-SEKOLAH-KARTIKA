"use client";

import { useState } from "react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { updateRegistrationStatus } from "@/app/actions/ppdb";
import { 
  GraduationCap, LogOut, Users, Clock, CheckCircle2, 
  XCircle, Search, Eye, ThumbsUp, ThumbsDown, UserCheck, ShieldAlert, Images 
} from "lucide-react";

interface RegistrationItem {
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
  createdAt: string;
  user: {
    nama: string;
    email: string;
  };
}

interface AdminStats {
  total: number;
  pending: number;
  approved: number;
  rejected: number;
}

interface AdminDashboardProps {
  user: {
    name: string;
  };
  registrations: RegistrationItem[];
  stats: AdminStats;
}

export default function AdminDashboard({ user, registrations, stats }: AdminDashboardProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedReg, setSelectedReg] = useState<RegistrationItem | null>(null);
  const [localRegs, setLocalRegs] = useState<RegistrationItem[]>(registrations);
  const [localStats, setLocalStats] = useState<AdminStats>(stats);
  const [actionLoading, setActionLoading] = useState(false);

  const filteredRegs = localRegs.filter((reg) => 
    reg.namaLengkap.toLowerCase().includes(searchTerm.toLowerCase()) ||
    reg.idRegistrasi.toLowerCase().includes(searchTerm.toLowerCase()) ||
    reg.asalSekolah.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAction = async (registrationId: string, action: "TERIMA" | "TOLAK") => {
    setActionLoading(true);
    const res = await updateRegistrationStatus(registrationId, action);
    setActionLoading(false);

    if (res?.success) {
      // Perbarui status secara lokal di state
      const nextStatus: "LULUS" | "TIDAK_LULUS" = action === "TERIMA" ? "LULUS" : "TIDAK_LULUS";
      
      const updatedRegs = localRegs.map((reg) => {
        if (reg.id === registrationId) {
          return { ...reg, status: nextStatus };
        }
        return reg;
      });

      setLocalRegs(updatedRegs);

      // Hitung ulang statistik secara instan
      const newStats = updatedRegs.reduce((acc, curr) => {
        acc.total++;
        if (curr.status === "MENUNGGU_VERIFIKASI") acc.pending++;
        else if (curr.status === "LULUS") acc.approved++;
        else if (curr.status === "TIDAK_LULUS") acc.rejected++;
        return acc;
      }, { total: 0, pending: 0, approved: 0, rejected: 0 });

      setLocalStats(newStats);

      // Sinkronkan detail modal yang sedang dibuka
      if (selectedReg && selectedReg.id === registrationId) {
        setSelectedReg({ ...selectedReg, status: nextStatus });
      }
    } else if (res?.error) {
      alert(res.error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Topbar Admin */}
      <header className="bg-slate-900 text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-600 text-white p-2.5 rounded-xl">
              <GraduationCap className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight">Panel Panitia PPDB</h1>
              <p className="text-[10px] text-slate-400 font-semibold tracking-wider uppercase leading-none">SD KARTIKA X-4</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Link
              href="/dashboard/admin/kegiatan"
              className="bg-blue-600 hover:bg-blue-700 text-white flex items-center space-x-1.5 px-3 py-2 rounded-xl text-xs font-semibold border border-blue-500/30 transition-colors"
            >
              <Images className="h-4 w-4" />
              <span className="hidden sm:inline">Kelola Galeri</span>
            </Link>
            <span className="hidden sm:inline text-xs text-slate-400">
              Petugas: <strong className="text-white">{user.name}</strong>
              <span className="ml-2 text-[9px] bg-blue-605 bg-blue-600 text-white px-1.5 py-0.5 rounded font-extrabold uppercase">
                ADMIN
              </span>
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
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        
        {/* 1. Grid Statistik */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
          {/* Total Pendaftar */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center space-x-5 hover:border-slate-300 transition-colors duration-200">
            <div className="bg-blue-50 text-blue-650 text-blue-600 p-4 rounded-xl">
              <Users className="h-6 w-6" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Total Pendaftar</span>
              <span className="text-2xl font-extrabold text-slate-800">{localStats.total}</span>
            </div>
          </div>

          {/* Menunggu Verifikasi */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center space-x-5 hover:border-slate-300 transition-colors duration-200">
            <div className="bg-amber-50 text-amber-600 p-4 rounded-xl">
              <Clock className="h-6 w-6" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Menunggu Review</span>
              <span className="text-2xl font-extrabold text-slate-800">{localStats.pending}</span>
            </div>
          </div>

          {/* Lulus */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center space-x-5 hover:border-slate-300 transition-colors duration-200">
            <div className="bg-emerald-50 text-emerald-600 p-4 rounded-xl">
              <CheckCircle2 className="h-6 w-6" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Dinyatakan Lulus</span>
              <span className="text-2xl font-extrabold text-slate-800 text-emerald-700">{localStats.approved}</span>
            </div>
          </div>

          {/* Tidak Lulus */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center space-x-5 hover:border-slate-300 transition-colors duration-200">
            <div className="bg-rose-50 text-rose-600 p-4 rounded-xl">
              <XCircle className="h-6 w-6" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Belum Lulus</span>
              <span className="text-2xl font-extrabold text-slate-800 text-rose-700">{localStats.rejected}</span>
            </div>
          </div>
        </section>

        {/* 2. Pencarian & Tabel Pendaftar */}
        <section className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden text-left space-y-6">
          <div className="p-8 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100">
            <div>
              <h3 className="text-lg font-bold text-slate-800">Daftar Pengajuan Calon Siswa Baru</h3>
              <p className="text-xs text-slate-400 font-semibold mt-0.5">Kelola kelulusan pendaftar dengan meninjau rincian formulir.</p>
            </div>
            {/* Input Cari */}
            <div className="relative max-w-sm w-full">
              <Search className="absolute left-4 top-3.5 h-4.5 w-4.5 text-slate-450 text-slate-400" />
              <input
                type="text"
                placeholder="Cari nama, ID, atau asal TK..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm"
              />
            </div>
          </div>

          {/* Tabel */}
          <div className="overflow-x-auto">
            {filteredRegs.length > 0 ? (
              <table className="w-full text-left text-sm whitespace-nowrap">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50/50 text-slate-500 font-bold uppercase tracking-wider text-xs">
                    <th className="px-8 py-4">ID Registrasi</th>
                    <th className="px-8 py-4">Nama Lengkap Calon Siswa</th>
                    <th className="px-8 py-4">Asal TK / Sekolah</th>
                    <th className="px-8 py-4 text-center">Status Verifikasi</th>
                    <th className="px-8 py-4 text-right">Aksi Peninjauan</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                  {filteredRegs.map((reg) => (
                    <tr key={reg.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-8 py-4 text-blue-900 font-extrabold">{reg.idRegistrasi}</td>
                      <td className="px-8 py-4">
                        <div className="flex flex-col">
                          <span className="font-bold text-slate-800">{reg.namaLengkap}</span>
                          <span className="text-[10px] text-slate-400 mt-0.5">{reg.user.email}</span>
                        </div>
                      </td>
                      <td className="px-8 py-4 font-semibold text-slate-500">{reg.asalSekolah}</td>
                      <td className="px-8 py-4 text-center">
                        {reg.status === "MENUNGGU_VERIFIKASI" ? (
                          <span className="inline-flex items-center px-2.5 py-1 rounded-md text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-100 uppercase tracking-wider">
                            Menunggu Review
                          </span>
                        ) : reg.status === "LULUS" ? (
                          <span className="inline-flex items-center px-2.5 py-1 rounded-md text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-100 uppercase tracking-wider">
                            LULUS
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2.5 py-1 rounded-md text-[10px] font-bold bg-rose-50 text-rose-700 border border-rose-100 uppercase tracking-wider">
                            Ditolak
                          </span>
                        )}
                      </td>
                      <td className="px-8 py-4 text-right">
                        <button
                          onClick={() => setSelectedReg(reg)}
                          className="bg-slate-100 hover:bg-blue-50 hover:text-blue-900 text-slate-650 flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-bold border border-slate-200/50 transition-colors cursor-pointer ml-auto"
                        >
                          <Eye className="h-4 w-4" />
                          <span>Tinjau Berkas</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="py-16 text-center text-slate-400 flex flex-col items-center justify-center space-y-3">
                <ShieldAlert className="h-10 w-10 text-slate-300" />
                <div>
                  <h5 className="font-bold text-slate-600">Tidak Ada Pendaftar Ditemukan</h5>
                  <p className="text-xs text-slate-500">Coba ganti kata kunci pencarian Anda.</p>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* 3. Modal / Panel Detail Peninjauan */}
        {selectedReg && (
          <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto text-left animate-in fade-in zoom-in-95 duration-200">
              {/* Header Modal */}
              <div className="bg-slate-900 text-white p-6 flex justify-between items-center">
                <div className="flex items-center space-x-3">
                  <UserCheck className="h-6 w-6 text-blue-400" />
                  <div>
                    <h4 className="font-bold text-sm leading-snug">Detail Profil Pendaftar</h4>
                    <p className="text-[10px] text-slate-400 font-semibold uppercase">{selectedReg.idRegistrasi}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedReg(null)}
                  className="text-slate-450 hover:text-white text-sm font-bold bg-white/10 px-3 py-1.5 rounded-xl border border-white/5 cursor-pointer"
                >
                  Tutup
                </button>
              </div>

              {/* Isi Detail Modal */}
              <div className="p-8 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
                  {/* Calon Siswa */}
                  <div className="space-y-1 bg-slate-50 p-4.5 rounded-2xl border border-slate-100">
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Calon Siswa</span>
                    <strong className="text-slate-800 text-base">{selectedReg.namaLengkap}</strong>
                    <p className="text-xs text-slate-500 mt-1">{selectedReg.ttl}</p>
                  </div>

                  {/* Asal Sekolah */}
                  <div className="space-y-1 bg-slate-50 p-4.5 rounded-2xl border border-slate-100">
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Asal TK / PAUD</span>
                    <strong className="text-slate-800 text-base">{selectedReg.asalSekolah}</strong>
                  </div>

                  {/* Wali Murid */}
                  <div className="space-y-1 bg-slate-50 p-4.5 rounded-2xl border border-slate-100">
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Nama Orang Tua</span>
                    <strong className="text-slate-800 text-base">{selectedReg.namaOrangTua}</strong>
                    <p className="text-xs text-slate-500 mt-1">Pendaftar: {selectedReg.user.nama}</p>
                  </div>

                  {/* Kontak */}
                  <div className="space-y-1 bg-slate-50 p-4.5 rounded-2xl border border-slate-100">
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Kontak Akun</span>
                    <strong className="text-slate-800 break-all text-sm">{selectedReg.user.email}</strong>
                  </div>
                </div>
                
                {/* Dokumen Persyaratan */}
                <div className="space-y-3 border-t border-slate-100 pt-5">
                  <span className="text-[10px] text-slate-450 text-slate-400 font-bold uppercase tracking-wider block">Dokumen Persyaratan</span>
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    {/* Foto KK */}
                    <a href={selectedReg.fotoKk} target="_blank" rel="noopener noreferrer" className="p-3 bg-slate-50 border border-slate-200 rounded-xl hover:bg-slate-100 transition block text-center shadow-sm">
                      <span className="font-bold text-slate-700 block mb-1">Kartu Keluarga (KK)</span>
                      <span className="text-blue-600 font-bold hover:underline">Buka Gambar</span>
                    </a>
                    {/* KTP Orang Tua */}
                    <a href={selectedReg.ktpOrangTua} target="_blank" rel="noopener noreferrer" className="p-3 bg-slate-50 border border-slate-200 rounded-xl hover:bg-slate-100 transition block text-center shadow-sm">
                      <span className="font-bold text-slate-700 block mb-1">KTP Orang Tua</span>
                      <span className="text-blue-600 font-bold hover:underline">Buka Gambar</span>
                    </a>
                    {/* Foto Akte */}
                    <a href={selectedReg.fotoAkte} target="_blank" rel="noopener noreferrer" className="p-3 bg-slate-50 border border-slate-200 rounded-xl hover:bg-slate-100 transition block text-center shadow-sm">
                      <span className="font-bold text-slate-700 block mb-1">Akte Lahir Anak</span>
                      <span className="text-blue-600 font-bold hover:underline">Buka Gambar</span>
                    </a>
                    {/* Pass Foto */}
                    <a href={selectedReg.passFoto} target="_blank" rel="noopener noreferrer" className="p-3 bg-slate-50 border border-slate-200 rounded-xl hover:bg-slate-100 transition block text-center shadow-sm">
                      <span className="font-bold text-slate-700 block mb-1">Pass Foto 3x4</span>
                      <span className="text-blue-600 font-bold hover:underline">Buka Gambar</span>
                    </a>
                  </div>
                </div>

                {/* Status Saat Ini */}
                <div className="flex items-center justify-between border-y border-slate-100 py-4 text-sm font-semibold">
                  <span className="text-slate-500">Status Kelulusan Saat Ini:</span>
                  {selectedReg.status === "MENUNGGU_VERIFIKASI" ? (
                    <span className="bg-amber-50 text-amber-700 border border-amber-100 px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider">
                      Belum Diverifikasi
                    </span>
                  ) : selectedReg.status === "LULUS" ? (
                    <span className="bg-emerald-50 text-emerald-700 border border-emerald-100 px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider">
                      Diterima (LULUS)
                    </span>
                  ) : (
                    <span className="bg-rose-50 text-rose-700 border border-rose-100 px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider">
                      Ditolak (TIDAK LULUS)
                    </span>
                  )}
                </div>

                {/* Tombol Aksi Verifikasi */}
                <div className="grid grid-cols-2 gap-4">
                  {/* Terima */}
                  <button
                    disabled={actionLoading || selectedReg.status === "LULUS"}
                    onClick={() => handleAction(selectedReg.id, "TERIMA")}
                    className="bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white flex items-center justify-center space-x-2 py-3.5 rounded-xl font-bold shadow-md transition-colors cursor-pointer"
                  >
                    <ThumbsUp className="h-4.5 w-4.5" />
                    <span>Terima / Lulus</span>
                  </button>

                  {/* Tolak */}
                  <button
                    disabled={actionLoading || selectedReg.status === "TIDAK_LULUS"}
                    onClick={() => handleAction(selectedReg.id, "TOLAK")}
                    className="bg-rose-650 bg-rose-600 hover:bg-rose-700 disabled:bg-rose-455 disabled:bg-rose-400 text-white flex items-center justify-center space-x-2 py-3.5 rounded-xl font-bold shadow-md transition-colors cursor-pointer"
                  >
                    <ThumbsDown className="h-4.5 w-4.5" />
                    <span>Tolak Berkas</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
