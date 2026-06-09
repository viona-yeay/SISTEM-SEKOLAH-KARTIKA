import Image from "next/image";
import { Shield, BookOpen, Compass, Award, Building, Sparkles } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";

export default function ProfilSekolah() {
  const misiList = [
    "Mengembangkan sikap dan perilaku religius di lingkungan dalam dan luar sekolah.",
    "Membentuk peserta didik yang beriman kepada Tuhan Yang Maha Esa, Berakhlak Mulia, Jujur, Bertanggung Jawab, Disiplin serta Peduli Lingkungan.",
    "Membentuk peserta didik yang bertaqwa dengan menjalankan segenap perintah agama.",
    "Mengembangkan pengetahuan di bidang Iptek, bahasa, Olah Raga dan Seni Budaya sesuai dengan bakat, minat sesuai potensi yang dimiliki setiap peserta didik.",
    "Meningkatkan prestasi akademik peserta didik untuk mencapai lulusan terbaik secara berkelanjutan.",
    "Mengokohkan nilai-nilai karakter bangsa melalui mata pelajaran yang relevan.",
    "Mengembangkan budaya literasi dan menerapkannya dalam kehidupan sehari-hari.",
    "Mengembangkan strategi pembelajaran yang menantang, menyenangkan, komunikatif, tanpa takut salah, dan demokratis.",
    "Mengembangkan kreativitas dan inovasi budaya sekolah.",
    "Mengintegrasikan nilai-nilai profil Pelajar Pancasila dalam setiap pembelajaran dan kegiatan Projek Penguatan Profil Pelajar Pancasila."
  ];

  const tujuanList = [
    "Memiliki sikap dan perilaku religius di lingkungan dalam dan luar sekolah.",
    "Terwujudnya peserta didik yang beriman kepada Tuhan Yang Maha Esa, Berakhlak Mulia, Jujur, Bertanggung Jawab, Disiplin serta Peduli Lingkungan.",
    "Terwujudnya Peserta Didik yang Bertaqwa dengan menjalankan Segenap Perintah Agama.",
    "Memiliki Pengetahuan di bidang Iptek, Bahasa, Olah Raga dan Seni Budaya sesuai dengan bakat, Minat sesuai potensi yang dimiliki setiap peserta didik.",
    "Tercapainya prestasi akademik peserta didik untuk mencapai lulusan terbaik secara berkelanjutan.",
    "Terwujudnya nilai-nilai karakter bangsa melalui mata pelajaran yang relevan.",
    "Terciptanya budaya literasi dalam kehidupan sehari-hari.",
    "Memiliki strategi pembelajaran yang menantang, menyenangkan, Komunikatif, tanpa takut salah, dan demokratis.",
    "Memiliki kreativitas dan inovasi budaya sekolah.",
    "Memiliki sikap dan perilaku yang mencerminkan Profil Pelajar Pancasila.",
    "Memiliki kecakapan abad-21 yang mencerminkan keterampilan berfikir tingkat tinggi (Berfikir Kritis, Kreatif/Inovatif, Kolaboratif, dan Komunikatif) serta memiliki rasa percaya diri."
  ];

  const fasilitas = [
    {
      name: "Ruang Kelas & Sarana Belajar",
      desc: "Infrastruktur ruang kelas yang nyaman untuk mendukung pelaksanaan Kurikulum Merdeka secara terpadu guna memastikan siswa mencapai kompetensi optimal.",
      icon: <Building className="h-6 w-6 text-blue-600" />,
    },
    {
      name: "Literasi & Numerasi Digital",
      desc: "Pengenalan dan penggunaan perangkat komputer dasar bagi siswa kelas tinggi guna mendukung persiapan Asesmen Nasional Berbasis Komputer (ANBK).",
      icon: <Sparkles className="h-6 w-6 text-blue-600" />,
    },
    {
      name: "Sistem Informasi Publik Berbasis Web",
      desc: "Layanan informasi publik dan administrasi sekolah yang transparan, cepat, dan mudah diakses, termasuk sistem Pendaftaran Peserta Didik Baru (PPDB) online.",
      icon: <BookOpen className="h-6 w-6 text-blue-600" />,
    },
    {
      name: "Lingkungan Aman & Tertib",
      desc: "Berlokasi di kawasan strategis yang terintegrasi dengan area kedinasan militer, memberikan keuntungan berupa lingkungan belajar yang kondusif, aman, dan tertib.",
      icon: <Award className="h-6 w-6 text-blue-600" />,
    },
  ];

  const guruStaff = [
    { nama: "Sukirman, S. Pd.", jabatan: "Kepala Sekolah" },
    { nama: "Panitia PPDB", jabatan: "Tim Pelaksana Pendaftaran" },
    { nama: "Staf Tata Usaha", jabatan: "Administrator & Pengelola Data" },
    { nama: "Yayasan Kartika Jaya", jabatan: "Badan Penyelenggara & Penasihat" },
  ];

  return (
    <div className="py-16 sm:py-24 space-y-24 overflow-hidden">
      {/* 1. Header Profil */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <AnimatedSection direction="down">
          <span className="text-xs font-bold tracking-wider text-blue-600 uppercase bg-blue-50 px-3.5 py-1.5 rounded-full">
            Profil Institusi
          </span>
        </AnimatedSection>
        <AnimatedSection direction="up" delay={0.15}>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-blue-900 tracking-tight">
            Mengenal SDN KARTIKA X-4
          </h1>
        </AnimatedSection>
        <AnimatedSection direction="up" delay={0.25}>
          <p className="text-slate-600 max-w-3xl mx-auto text-base sm:text-lg leading-relaxed">
            Berada di bawah naungan Yayasan Kartika Jaya, SD Kartika X-4 berkomitmen menyelenggarakan pendidikan berkualitas dengan mengedepankan pembentukan karakter serta kedisiplinan siswa sejak dini.
          </p>
        </AnimatedSection>
      </section>

      {/* 2. Sejarah Singkat */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <AnimatedSection direction="right">
            <div className="space-y-6 text-left">
              <h2 className="text-3xl font-bold text-blue-900 tracking-tight">
                Sejarah & Latar Belakang
              </h2>
              <div className="space-y-4 text-slate-600 leading-relaxed text-sm sm:text-base font-semibold">
                <p>
                  SD Kartika X-4 didirikan pada tanggal 11 April 2005 sebagai bagian dari kontribusi nyata Yayasan Kartika Jaya dalam upaya mencerdaskan kehidupan bangsa melalui jalur pendidikan dasar. Sekolah ini merupakan bagian dari jaringan pendidikan di bawah naungan Persit Kartika Chandra Kirana, dengan misi menyediakan pendidikan berkualitas bagi putra-putri anggota TNI AD maupun masyarakat umum.
                </p>
                <p>
                  Seiring berjalannya waktu, sekolah ini terus berkembang menjadi lembaga pilihan yang diminati oleh masyarakat luas karena reputasi kedisiplinan dan kualitas akademiknya. Saat ini, SD Kartika X-4 melayani sekitar 274 siswa dengan menerapkan Kurikulum Merdeka serta telah berhasil mempertahankan predikat <strong>Akreditasi A</strong>.
                </p>
              </div>
            </div>
          </AnimatedSection>
          <AnimatedSection direction="left" delay={0.2}>
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl border border-slate-100">
              <Image
                src="/gedung_sekolah.png"
                alt="Kampus SD Kartika"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* 3. Detail Visi Misi */}
      <section className="bg-blue-900 text-white py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:border-b lg:border-white/10 lg:pb-12">
            <AnimatedSection direction="right">
              <div className="space-y-4 text-left">
                <span className="text-xs font-bold text-blue-300 uppercase tracking-wider">
                  Visi Sekolah
                </span>
                <h2 className="text-2xl font-extrabold tracking-tight leading-snug">
                  "Terwujudnya siswa yang Beriman, Bertaqwa, Berwawasan Global dan Berprestasi melalui pembelajaran yang Berkarakter dan Berbudaya sesuai dengan Profil Pelajar Pancasila"
                </h2>
              </div>
            </AnimatedSection>
            <AnimatedSection direction="left">
              <div className="flex items-center text-slate-300 text-sm sm:text-base leading-relaxed font-semibold h-full">
                Sesuai dengan plang maklumat resmi institusi, misi operasional kami didesain secara terstruktur untuk melahirkan siswa yang menguasai kecakapan abad-21, berpikir kritis, kreatif, inovatif, kolaboratif, komunikatif, serta memiliki rasa percaya diri yang tinggi.
              </div>
            </AnimatedSection>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* MISI Column */}
            <div className="space-y-8 text-left">
              <AnimatedSection direction="up">
                <div className="space-y-2 border-b border-white/10 pb-4">
                  <span className="text-xs font-bold text-blue-300 uppercase tracking-wider">Misi Utama</span>
                  <h3 className="text-2xl font-bold">Misi SD KARTIKA X-4</h3>
                </div>
              </AnimatedSection>
              <div className="space-y-6">
                {misiList.map((misi, index) => (
                  <AnimatedSection key={index} direction="up" delay={index * 0.03}>
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0 flex items-center justify-center h-8 w-8 rounded-lg bg-blue-600 text-white font-bold text-sm">
                        {index + 1}
                      </div>
                      <p className="text-slate-300 text-sm sm:text-base leading-relaxed pt-0.5 font-semibold">
                        {misi}
                      </p>
                    </div>
                  </AnimatedSection>
                ))}
              </div>
            </div>

            {/* TUJUAN Column */}
            <div className="space-y-8 text-left">
              <AnimatedSection direction="up">
                <div className="space-y-2 border-b border-white/10 pb-4">
                  <span className="text-xs font-bold text-blue-300 uppercase tracking-wider">Tujuan Strategis</span>
                  <h3 className="text-2xl font-bold">Tujuan Pendidikan</h3>
                </div>
              </AnimatedSection>
              <div className="space-y-6">
                {tujuanList.map((tujuan, index) => (
                  <AnimatedSection key={index} direction="up" delay={index * 0.03}>
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0 flex items-center justify-center h-8 w-8 rounded-lg bg-blue-550 bg-blue-500/80 text-white font-bold text-sm">
                        {index + 1}
                      </div>
                      <p className="text-slate-300 text-sm sm:text-base leading-relaxed pt-0.5 font-semibold">
                        {tujuan}
                      </p>
                    </div>
                  </AnimatedSection>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Fasilitas Sekolah */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <AnimatedSection direction="up">
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <span className="text-xs font-bold text-blue-600 bg-blue-50 px-3.5 py-1.5 rounded-full uppercase">
              Sarana Prasarana
            </span>
            <h2 className="text-3xl font-bold text-blue-900 tracking-tight">
              Program & Layanan Pendidikan
            </h2>
            <p className="text-slate-600">
              Mendukung penuh proses pembelajaran serta pengembangan potensi peserta didik secara utuh melalui integrasi kurikulum dan teknologi.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {fasilitas.map((fas, index) => (
            <AnimatedSection key={index} direction="up" delay={index * 0.15}>
              <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-md flex items-start space-x-6 hover:shadow-lg transition-shadow duration-300 h-full">
                <div className="bg-blue-50 p-4 rounded-xl text-blue-600 flex-shrink-0">
                  {fas.icon}
                </div>
                <div className="space-y-2 text-left">
                  <h4 className="font-bold text-blue-900 text-lg leading-snug">
                    {fas.name}
                  </h4>
                  <p className="text-sm text-slate-600 leading-relaxed font-semibold">
                    {fas.desc}
                  </p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>
    </div>
  );
}