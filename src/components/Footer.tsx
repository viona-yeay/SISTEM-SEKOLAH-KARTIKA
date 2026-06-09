import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-400 border-t border-slate-800">
      {/* Bagian Utama Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Kolom 1: Branding */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-3 group">
              <Image
                src="/LOGO-kartika.png"
                alt="Logo SD Kartika X-4"
                width={44}
                height={44}
                className="object-contain"
              />
              <span className="text-xl font-bold tracking-tight text-white">
                SD KARTIKA X-4
              </span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed">
              Mewujudkan generasi cerdas, berkarakter mulia, dan berprestasi unggul demi masa depan bangsa yang cemerlang.
            </p>
            <div className="pt-2 text-xs text-slate-500 font-semibold tracking-wider uppercase">
              TERAKREDITASI A
            </div>
          </div>

          {/* Kolom 2: Navigasi Cepat */}
          <div>
            <h3 className="text-sm font-bold tracking-wider uppercase text-white mb-6">
              Peta Situs
            </h3>
            <ul className="space-y-3.5">
              {[
                { name: "Beranda", href: "/" },
                { name: "Profil Sekolah", href: "/profil" },
                { name: "Galeri Kegiatan", href: "/galeri" },
                { name: "Informasi PPDB", href: "/info-ppdb" },
                { name: "Hubungi Kami", href: "/kontak" },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm text-slate-400 hover:text-white transition-colors duration-200"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Kolom 3: Kontak & Informasi */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold tracking-wider uppercase text-white mb-6">
              Kontak Kami
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-slate-400 leading-relaxed">
                  Jl. Kartika No. 4, Kompleks Militer, Jakarta Barat, DKI Jakarta, 11440
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-blue-500 flex-shrink-0" />
                <span className="text-sm text-slate-400">(021) 567-8910</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-blue-500 flex-shrink-0" />
                <span className="text-sm text-slate-400">vionacantik@gmail.com</span>
              </li>
            </ul>
          </div>

          {/* Kolom 4: Jam Operasional */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold tracking-wider uppercase text-white mb-6">
              Jam Operasional
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3 text-sm text-slate-400">
                <Clock className="h-4 w-4 text-blue-500 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-slate-300">Senin - Jumat:</p>
                  <p className="text-xs text-slate-500">07:00 - 14:00 WIB</p>
                </div>
              </li>
              <li className="flex items-start space-x-3 text-sm text-slate-400">
                <Clock className="h-4 w-4 text-slate-600 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-slate-550">Sabtu - Minggu:</p>
                  <p className="text-xs text-slate-500">Tutup (Libur)</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Garis Pembatas */}
        <hr className="my-12 border-slate-800" />

        {/* Bagian Hak Cipta */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-slate-500">
          <p>
            &copy; {currentYear} SD KARTIKA X-4. Seluruh Hak Cipta Dilindungi Undang-Undang.
          </p>
          <div className="flex space-x-6">
            <span className="hover:text-slate-400 cursor-pointer">Syarat & Ketentuan</span>
            <span className="hover:text-slate-400 cursor-pointer">Kebijakan Privasi</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
