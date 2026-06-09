import Link from "next/link";
import Image from "next/image";
import { ArrowRight, BookOpen, Trophy, ShieldCheck, Heart } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";

export default function Beranda() {
  const visiMisiPoin = [
    {
      icon: <ShieldCheck className="h-6 w-6 text-blue-600" />,
      title: "Religius & Berkarakter",
      desc: "Menanamkan nilai akhlak mulia, kejujuran, disiplin, dan ketakwaan kepada Tuhan Yang Maha Esa sejak dini.",
    },
    {
      icon: <BookOpen className="h-6 w-6 text-blue-600" />,
      title: "Akademik Unggul",
      desc: "Kurikulum terpadu yang memicu kemampuan berpikir kritis, pemecahan masalah, dan penguasaan iptek secara dinamis.",
    },
    {
      icon: <Trophy className="h-6 w-6 text-blue-600" />,
      title: "Prestasi Kompetitif",
      desc: "Mendorong siswa untuk aktif mengeksplorasi potensi diri dalam bidang sains, olahraga, dan seni hingga tingkat nasional.",
    },
    {
      icon: <Heart className="h-6 w-6 text-blue-600" />,
      title: "Lingkungan Kasih Sayang",
      desc: "Menghadirkan ekosistem belajar yang ramah anak, nyaman, aman, saling menghargai, dan kekeluargaan.",
    },
  ];

  const beritaTerbaru = [
    {
      kategori: "Pendaftaran",
      tanggal: "25 Mei 2026",
      judul: "Penerimaan Peserta Didik Baru (PPDB) Tahun Pelajaran 2026/2027 Resmi Dibuka!",
      deskripsi: "SD KARTIKA X-4 secara resmi membuka pendaftaran bagi calon siswa-siswi baru. Lakukan registrasi akun dan pengisian formulir secara online melalui portal resmi PPDB kami.",
      link: "/info-ppdb",
    },
    {
      kategori: "Prestasi",
      tanggal: "18 Mei 2026",
      judul: "SD Kartika X-4 Menyabet Juara Umum Lomba Sains & Matematika Tingkat Provinsi",
      deskripsi: "Prestasi membanggakan kembali diraih oleh perwakilan siswa-siswi kami dalam olimpiade sains tahun ini, membuktikan komitmen sekolah terhadap mutu akademik unggulan.",
      link: "/galeri",
    },
    {
      kategori: "Kegiatan",
      tanggal: "10 Mei 2026",
      judul: "Eksplorasi Kreatif: Pentas Seni dan Pameran Proyek Sains Kreatif Siswa Kelas 1-6",
      deskripsi: "Melihat lebih dekat karya dan inovasi hebat anak didik kami dalam pameran seni budaya dan teknologi sederhana yang bertajuk 'Generasi Kartika Berinovasi'.",
      link: "/galeri",
    },
  ];

  return (
    <div className="space-y-24 pb-20 overflow-hidden">
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-950 via-blue-900 to-indigo-950 text-white py-24 sm:py-32">
        <div className="absolute inset-0 opacity-15">
          <Image
            src="/gedung_sekolah.png"
            alt="SD KARTIKA X-4 Background"
            fill
            sizes="100vw"
            priority
            className="object-cover"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-6 text-left">
            <AnimatedSection direction="down">
              <span className="inline-flex items-center px-3.5 py-1.5 rounded-full text-xs font-semibold bg-blue-500/25 text-blue-200 border border-blue-400/20 backdrop-blur-sm">
                Pendaftaran PPDB 2026/2027 Telah Dibuka
              </span>
            </AnimatedSection>
            <AnimatedSection direction="right" delay={0.15}>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-none">
                Membentuk Generasi <br />
                <span className="text-blue-400">Cerdas & Berkarakter</span>
              </h1>
            </AnimatedSection>
            <AnimatedSection direction="right" delay={0.25}>
              <p className="text-lg text-slate-300 leading-relaxed max-w-xl">
                Selamat datang di SD KARTIKA X-4. Kami berkomitmen menyelenggarakan pendidikan dasar unggulan yang memadukan nilai keagamaan, kecerdasan intelektual, serta akhlak mulia.
              </p>
            </AnimatedSection>
            <AnimatedSection direction="up" delay={0.35}>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link
                  href="/info-ppdb"
                  className="bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center space-x-2 px-8 py-4 rounded-xl text-base font-bold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5 cursor-pointer"
                >
                  <span>Daftar PPDB Sekarang</span>
                  <ArrowRight className="h-5 w-5" />
                </Link>
                <Link
                  href="/profil"
                  className="bg-white/10 hover:bg-white/15 text-white flex items-center justify-center border border-white/20 px-8 py-4 rounded-xl text-base font-semibold backdrop-blur-sm transition-colors duration-200 cursor-pointer"
                >
                  Pelajari Profil Sekolah
                </Link>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* 2. Sambutan Kepala Sekolah */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection direction="up">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden p-8 sm:p-12 lg:p-16 flex flex-col justify-center space-y-6">
            <span className="text-xs font-bold tracking-wider text-blue-600 uppercase">
              Sambutan Hangat
            </span>
            <h2 className="text-3xl font-extrabold text-blue-900 tracking-tight text-left">
              Pesan dari Kepala Sekolah
            </h2>
            <div className="space-y-4 text-slate-600 leading-relaxed italic text-base text-left">
              <p>
                &quot;Assalamu&apos;alaikum Warahmatullahi Wabarakatuh, Salam sejahtera bagi kita semua.</p>
              <p>
                Selamat datang di portal resmi SD KARTIKA X-4. Lembaga pendidikan kami hadir bukan hanya untuk mentransfer ilmu pengetahuan secara akademis, melainkan juga menanamkan karakter kebangsaan yang kokoh, moralitas luhur, dan disiplin tinggi kepada setiap peserta didik.&quot;
              </p>
              <p>
                &quot;Melalui fasilitas modern, tenaga pendidik bersertifikasi profesional, serta atmosfer belajar yang inklusif, kami berkomitmen menemani putra-putri Anda tumbuh menjadi pribadi mandiri yang siap bersinar di era global tanpa kehilangan identitas pekertinya. Mari bergabung bersama keluarga besar SD KARTIKA X-4.&quot;
              </p>
            </div>
            <div className="pt-4 border-t border-slate-100 text-left">
              <h4 className="text-base font-bold text-slate-800">Sukirman, S.Pd</h4>
              <p className="text-xs font-medium text-slate-500">Kepala Sekolah SD KARTIKA X-4</p>
            </div>
          </div>
        </AnimatedSection>
      </section>

      {/* 3. Visi & Misi Singkat */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">
        <AnimatedSection direction="up">
          <div className="space-y-4 max-w-3xl mx-auto">
            <span className="text-xs font-bold tracking-wider text-blue-600 uppercase">
              Pilar Pendidikan
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-blue-900 tracking-tight">
              Visi, Misi & Nilai Utama
            </h2>
            <p className="text-slate-600">
              Kami mengintegrasikan aspek akhlak mulia dan kompetensi akademik guna membentuk pribadi siswa yang unggul di setiap bidang kehidupan.
            </p>
          </div>
        </AnimatedSection>

        {/* Card Grid Visi & Misi */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {visiMisiPoin.map((poin, index) => (
            <AnimatedSection key={index} direction="up" delay={index * 0.1}>
              <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-left flex flex-col justify-between space-y-4 h-full">
                <div className="bg-blue-50 p-4 rounded-xl w-fit">
                  {poin.icon}
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-blue-900">{poin.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed font-semibold">
                    {poin.desc}
                  </p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection direction="up">
          <div className="pt-4">
            <Link
              href="/profil"
              className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-800 font-bold transition-colors"
            >
              <span>Lihat Profil dan Visi Misi Lengkap</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </AnimatedSection>
      </section>

      {/* 4. Berita / Pengumuman Terbaru */}
      <section className="bg-slate-100/50 border-y border-slate-200/50 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <AnimatedSection direction="up">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div className="space-y-4 text-left">
                <span className="text-xs font-bold tracking-wider text-blue-600 uppercase">
                  Informasi Terkini
                </span>
                <h2 className="text-3xl font-extrabold text-blue-900 tracking-tight">
                  Kabar Terkini & Pengumuman
                </h2>
              </div>
              <Link
                href="/galeri"
                className="inline-flex items-center space-x-2 text-sm font-bold text-slate-600 hover:text-blue-900 transition-colors"
              >
                <span>Lihat Semua Kabar Kegiatan</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </AnimatedSection>

          {/* Grid Berita */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {beritaTerbaru.map((berita, index) => (
              <AnimatedSection key={index} direction="up" delay={index * 0.15}>
                <div className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-md flex flex-col justify-between h-full">
                  <div className="p-8 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-blue-50 text-blue-700">
                        {berita.kategori}
                      </span>
                      <span className="text-xs text-slate-400 font-medium">{berita.tanggal}</span>
                    </div>
                    <h3 className="text-lg font-bold text-blue-900 leading-snug hover:text-blue-700 transition-colors">
                      <Link href={berita.link}>{berita.judul}</Link>
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed line-clamp-3">
                      {berita.deskripsi}
                    </p>
                  </div>
                  <div className="p-8 pt-0 border-t border-slate-50 bg-slate-50/50">
                    <Link
                      href={berita.link}
                      className="inline-flex items-center space-x-1.5 text-sm font-bold text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      <span>Selengkapnya</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CTA Pendaftaran PPDB */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection direction="up">
          <div className="relative rounded-3xl bg-gradient-to-r from-blue-900 to-indigo-900 text-white py-16 px-8 sm:px-16 text-center space-y-6 shadow-2xl overflow-hidden border border-white/5">
            {/* Aksen Gradien */}
            <div className="absolute inset-0 bg-blue-600/10 opacity-50 blur-3xl rounded-3xl" />

            <div className="relative space-y-4 max-w-2xl mx-auto">
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                Siap Menjadi Bagian dari Keluarga Besar Kami?
              </h2>
              <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
                Penerimaan Siswa Baru tahun ajaran 2026/2027 telah dibuka secara terpadu. Proses pendaftaran, pengisian formulir, hingga hasil kelulusan dapat dipantau langsung secara online.
              </p>
            </div>
            <div className="relative flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link
                href="/info-ppdb"
                className="w-full sm:w-auto bg-white text-blue-900 hover:bg-slate-50 font-bold px-8 py-4 rounded-xl shadow-lg transition-colors text-base cursor-pointer"
              >
                Registrasi / Login PPDB
              </Link>
              <Link
                href="/info-ppdb"
                className="w-full sm:w-auto bg-transparent hover:bg-white/10 text-white font-semibold border border-white/30 px-8 py-4 rounded-xl transition-colors text-base cursor-pointer"
              >
                Lihat Prosedur & Syarat
              </Link>
            </div>
          </div>
        </AnimatedSection>
      </section>
    </div>
  );
}
