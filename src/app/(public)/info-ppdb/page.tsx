import Link from "next/link";
import { ArrowRight, UserPlus, FileSpreadsheet, ClipboardCheck, Award, FileText, CheckCircle2 } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";

export default function InfoPpdb() {
  const alurLangkah = [
    {
      icon: <UserPlus className="h-6 w-6 text-blue-600" />,
      title: "1. Registrasi Akun",
      desc: "Buat akun pendaftaran menggunakan email aktif orang tua/wali murid melalui halaman registrasi.",
    },
    {
      icon: <FileSpreadsheet className="h-6 w-6 text-blue-600" />,
      title: "2. Pengisian Formulir",
      desc: "Masuk ke dashboard siswa dan lengkapi formulir pendaftaran mulai dari data diri, orang tua, hingga asal sekolah.",
    },
    {
      icon: <ClipboardCheck className="h-6 w-6 text-blue-600" />,
      title: "3. Verifikasi Panitia",
      desc: "Panitia PPDB SD KARTIKA X-4 akan memeriksa berkas dan data pendaftaran Anda secara berkala.",
    },
    {
      icon: <Award className="h-6 w-6 text-blue-600" />,
      title: "4. Pengumuman Kelulusan",
      desc: "Cek hasil verifikasi langsung di dashboard. Siswa yang lulus dapat mengunduh surat bukti kelulusan digital.",
    },
  ];

  const persyaratan = [
    "Usia calon peserta didik baru minimal 6 tahun per tanggal 1 Juli 2026.",
    "Mengisi Formulir Pendaftaran PPDB secara lengkap dan valid melalui dashboard pendaftar.",
    "Menyerahkan fotokopi Akta Kelahiran calon siswa (diunggah / dibawa saat daftar ulang).",
    "Menyerahkan fotokopi Kartu Keluarga (KK) dan KTP kedua orang tua/wali.",
    "Pasfoto terbaru calon siswa berukuran 3x4 (latar belakang merah) sebanyak 2 lembar."
  ];



  return (
    <div className="py-16 sm:py-24 space-y-24 overflow-hidden">
      {/* 1. Header PPDB */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <AnimatedSection direction="down">
          <span className="text-xs font-bold tracking-wider text-blue-600 uppercase bg-blue-50 px-3.5 py-1.5 rounded-full">
            Portal PPDB Online
          </span>
        </AnimatedSection>
        <AnimatedSection direction="up" delay={0.15}>
          <h1 className="text-4xl font-extrabold text-blue-900 tracking-tight">
            Informasi & Prosedur Pendaftaran PPDB
          </h1>
        </AnimatedSection>
        <AnimatedSection direction="up" delay={0.25}>
          <p className="text-slate-600 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            Tahun Ajaran 2026/2027. Dapatkan transparansi alur pendaftaran, rincian biaya investasi pendidikan, serta persyaratan masuk secara lengkap di bawah ini.
          </p>
        </AnimatedSection>
      </section>

      {/* 2. Langkah Alur Pendaftaran */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">
        <AnimatedSection direction="up">
          <h2 className="text-2xl sm:text-3xl font-bold text-blue-900">Alur Pendaftaran Terpadu</h2>
        </AnimatedSection>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {alurLangkah.map((langkah, index) => (
            <AnimatedSection key={index} direction="up" delay={index * 0.1}>
              <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-md text-left flex flex-col justify-between space-y-4 hover:border-blue-200 transition-all duration-300 h-full">
                <div className="bg-blue-50 p-4 rounded-xl w-fit">
                  {langkah.icon}
                </div>
                <div className="space-y-2">
                  <h3 className="font-bold text-blue-900 text-lg leading-snug">{langkah.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed font-semibold">
                    {langkah.desc}
                  </p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* 3. Syarat Pendaftaran */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Syarat Pendaftaran */}
        <AnimatedSection direction="up">
          <div className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-100 shadow-xl space-y-6 text-left">
            <div className="flex items-center space-x-3 text-blue-900">
              <FileText className="h-6 w-6" />
              <h3 className="text-2xl font-bold tracking-tight">Persyaratan Pendaftaran</h3>
            </div>
            <p className="text-xs text-slate-400">
              Mohon persiapkan dan pastikan berkas-berkas di bawah ini lengkap sebelum melakukan pengisian formulir online:
            </p>
            <ul className="space-y-4">
              {persyaratan.map((syarat, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-slate-650 leading-relaxed font-semibold">
                    {syarat}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </AnimatedSection>
      </section>

      {/* 4. Timeline Kegiatan PPDB */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">
        <AnimatedSection direction="up">
          <h2 className="text-2xl sm:text-3xl font-bold text-blue-900">Timeline & Jadwal Penerimaan</h2>
        </AnimatedSection>
        
        {/* Timeline Visual */}
        <div className="relative border-l-2 border-blue-200 text-left pl-6 ml-4 space-y-10 max-w-xl mx-auto">
          {/* Gelombang 1 */}
          <AnimatedSection direction="up">
            <div className="relative">
              <div className="absolute -left-[31px] top-1.5 h-4 w-4 rounded-full bg-blue-600 ring-4 ring-blue-50" />
              <h4 className="font-bold text-slate-800 text-base">Gelombang 1: Pendaftaran & Pengisian Formulir</h4>
              <p className="text-xs text-slate-400 font-semibold mt-0.5">25 Mei - 20 Juni 2026</p>
              <p className="text-sm text-slate-600 leading-relaxed mt-2 font-semibold">
                Registrasi akun wali murid dan pengisian formulir calon siswa baru secara online melalui web portal.
              </p>
            </div>
          </AnimatedSection>

          {/* Pengumuman */}
          <AnimatedSection direction="up" delay={0.15}>
            <div className="relative">
              <div className="absolute -left-[31px] top-1.5 h-4 w-4 rounded-full bg-slate-300 ring-4 ring-slate-100" />
              <h4 className="font-bold text-slate-700 text-base">Seleksi Administrasi & Verifikasi Panitia</h4>
              <p className="text-xs text-slate-400 font-semibold mt-0.5">21 Juni - 25 Juni 2026</p>
              <p className="text-sm text-slate-500 leading-relaxed mt-2 font-semibold">
                Panitia melakukan pemeriksaan kesesuaian berkas secara ketat sesuai kriteria usia dan keabsahan dokumen.
              </p>
            </div>
          </AnimatedSection>

          {/* Daftar Ulang */}
          <AnimatedSection direction="up" delay={0.3}>
            <div className="relative">
              <div className="absolute -left-[31px] top-1.5 h-4 w-4 rounded-full bg-slate-300 ring-4 ring-slate-100" />
              <h4 className="font-bold text-slate-700 text-base">Pengumuman Kelulusan & Daftar Ulang</h4>
              <p className="text-xs text-slate-400 font-semibold mt-0.5">28 Juni - 5 Juli 2026</p>
              <p className="text-sm text-slate-500 leading-relaxed mt-2 font-semibold">
                Hasil kelulusan resmi diumumkan di dashboard. Orang tua siswa yang lulus melakukan konfirmasi pembayaran dan pengukuran seragam.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* 5. CTA Besar Portal PPDB */}
      <section className="max-w-5xl mx-auto px-4">
        <AnimatedSection direction="up">
          <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white rounded-3xl p-12 text-center space-y-6 shadow-2xl relative overflow-hidden border border-white/5">
            <div className="absolute inset-0 bg-blue-500/10 opacity-30 blur-2xl" />
            <h2 className="text-3xl font-extrabold tracking-tight relative">
              Mulai Langkah Awal Pendidikan Hebat Putra-Putri Anda
            </h2>
            <p className="text-slate-200 max-w-xl mx-auto text-sm sm:text-base leading-relaxed relative font-semibold">
              Silakan klik tombol di bawah untuk membuat akun baru atau login menggunakan email Anda untuk mulai mengisi data pendaftaran.
            </p>
            <div className="relative pt-4 flex justify-center">
              <Link
                href="/daftar"
                className="bg-white text-blue-900 hover:bg-slate-50 flex items-center space-x-2 px-8 py-4 rounded-xl text-base font-bold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5 cursor-pointer"
              >
                <span>Daftar / Masuk PPDB Sekarang</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </AnimatedSection>
      </section>
    </div>
  );
}
