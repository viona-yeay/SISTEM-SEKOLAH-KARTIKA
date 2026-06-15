import Image from "next/image";
import { Camera } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import { prisma } from "@/lib/prisma";

type KegiatanRow = {
  id: string;
  judul: string;
  kategori: string;
  deskripsi: string;
  gambarUrl: string;
  createdAt: Date;
};

// Selalu ambil data terbaru dari database
export const dynamic = "force-dynamic";

// Item bawaan yang ditampilkan jika admin belum menambahkan kegiatan apa pun
const galeriDefault = [
  {
    image: "/gedung_sekolah.png",
    category: "Fasilitas",
    title: "Gedung Kampus & Taman Belajar",
    desc: "Suasana depan gedung utama SD KARTIKA X-4 dengan taman asri dan ruang hijau terbuka tempat siswa berinteraksi.",
  },
  {
    image: "/kepala_sekolah.png",
    category: "Acara",
    title: "Sosialisasi Komite Sekolah & Wali Murid",
    desc: "Pertemuan koordinasi berkala antara pihak manajemen sekolah dengan komite sekolah dan orang tua/wali murid.",
  },
  {
    image: "/BERENANG.jpeg",
    category: "Ekstrakurikuler",
    title: "Latihan Rutin Renang",
    desc: "Kegiatan ekstrakurikuler renang untuk meningkatkan kebugaran dan kemampuan berenang siswa.",
  },
  {
    image: "/KARATE.jpeg",
    category: "Ekstrakurikuler",
    title: "Kegiatan Ekstrakurikuler Karate",
    desc: "Sesi latihan rutin ekstrakurikuler Karate SD Kartika X-4.",
  },
  {
    image: "/KREASI.jpeg",
    category: "Ekstrakurikuler",
    title: "Kegiatan Ekstrakurikuler Kreasi",
    desc: "Kegiatan ekstrakurikuler Kreasi SD Kartika X-4.",
  },
];

export default async function Galeri() {
  let galeriItem = galeriDefault;

  try {
    const kegiatan = await prisma.kegiatan.findMany({
      orderBy: { createdAt: "desc" },
    });

    if (kegiatan.length > 0) {
      galeriItem = kegiatan.map((k: KegiatanRow) => ({
        image: k.gambarUrl,
        category: k.kategori,
        title: k.judul,
        desc: k.deskripsi,
      }));
    }
  } catch (error) {
    console.error("Gagal memuat galeri dari database:", error);
  }

  return (
    <div className="py-16 sm:py-24 space-y-16 overflow-hidden">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <AnimatedSection direction="down">
          <span className="text-xs font-bold tracking-wider text-blue-600 uppercase bg-blue-50 px-3.5 py-1.5 rounded-full">
            Dokumentasi Kegiatan
          </span>
        </AnimatedSection>
        <AnimatedSection direction="up" delay={0.15}>
          <h1 className="text-4xl font-extrabold text-blue-900 tracking-tight">
            Galeri SD KARTIKA X-4
          </h1>
        </AnimatedSection>
        <AnimatedSection direction="up" delay={0.25}>
          <p className="text-slate-600 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            Kumpulan momen-momen berharga, keceriaan belajar, pencapaian prestasi, serta sarana prasarana penunjang kenyamanan tumbuh kembang anak didik kami.
          </p>
        </AnimatedSection>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {galeriItem.map((item, index) => (
            <AnimatedSection key={index} direction="up" delay={(index % 3) * 0.1}>
              <div className="group relative bg-slate-900 rounded-2xl overflow-hidden shadow-lg border border-slate-100 aspect-[4/3] cursor-pointer">
                {/* Gambar Dokumentasi */}
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-all duration-500 group-hover:scale-110 group-hover:opacity-30"
                />

                {/* Overlay Kategori */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="text-[10px] font-bold tracking-wider uppercase bg-white/95 text-blue-950 px-2.5 py-1 rounded-md shadow-sm border border-slate-200/25">
                    {item.category}
                  </span>
                </div>

                {/* Overlay Deskripsi */}
                <div className="absolute inset-0 p-6 flex flex-col justify-end bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-left space-y-2">
                  <div className="flex items-center space-x-2 text-blue-400">
                    <Camera className="h-4 w-4" />
                    <span className="text-xs font-semibold tracking-wider uppercase">
                      Dokumentasi Resmi
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">
                    {item.desc}
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
