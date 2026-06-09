"use client";

import { useState } from "react";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2 } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";

export default function Kontak() {
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [subjek, setSubjek] = useState("");
  const [pesan, setPesan] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nama || !email || !subjek || !pesan) return;

    setIsSubmitting(true);
    // Simulasi pengiriman pesan
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setNama("");
      setEmail("");
      setSubjek("");
      setPesan("");
    }, 1500);
  };

  return (
    <div className="py-16 sm:py-24 space-y-24 overflow-hidden">
      {/* Header Kontak */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <AnimatedSection direction="down">
          <span className="text-xs font-bold tracking-wider text-blue-600 uppercase bg-blue-50 px-3.5 py-1.5 rounded-full">
            Hubungi Manajemen
          </span>
        </AnimatedSection>
        <AnimatedSection direction="up" delay={0.15}>
          <h1 className="text-4xl font-extrabold text-blue-900 tracking-tight">
            Hubungi SD KARTIKA X-4
          </h1>
        </AnimatedSection>
        <AnimatedSection direction="up" delay={0.25}>
          <p className="text-slate-600 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            Kami siap melayani setiap pertanyaan, konsultasi pendaftaran, serta saran dan masukan berharga dari orang tua/wali murid demi kemajuan pendidikan anak.
          </p>
        </AnimatedSection>
      </section>

      {/* Konten Utama Kontak & Form */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Kolom Kiri: Info Kontak */}
          <div className="lg:col-span-5 space-y-8 text-left">
            <AnimatedSection direction="right">
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-blue-900 tracking-tight">
                  Informasi Kantor & Hubungan Masyarakat
                </h2>
                <p className="text-sm text-slate-500 leading-relaxed font-semibold">
                  Anda dapat mengunjungi kantor sekretariat pendaftaran kami secara langsung selama hari dan jam kerja operasional sekolah.
                </p>
              </div>
            </AnimatedSection>

            <div className="space-y-6">
              {/* Alamat */}
              <AnimatedSection direction="right" delay={0.1}>
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-50 p-3 rounded-xl text-blue-600 flex-shrink-0 mt-1">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-bold text-slate-800 text-base">Alamat Lengkap</h4>
                    <p className="text-sm text-slate-600 leading-relaxed font-semibold">
                      Jl. Kartika No. 4, Kompleks Militer, Jakarta Barat, DKI Jakarta, 11440
                    </p>
                  </div>
                </div>
              </AnimatedSection>

              {/* Telepon */}
              <AnimatedSection direction="right" delay={0.2}>
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-50 p-3 rounded-xl text-blue-600 flex-shrink-0 mt-1">
                    <Phone className="h-6 w-6" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-bold text-slate-800 text-base">Saluran Telepon</h4>
                    <p className="text-sm text-slate-600 font-semibold">(021) 567-8910</p>
                    <p className="text-xs text-slate-400 font-semibold">Hubungi selama jam KBM sekolah</p>
                  </div>
                </div>
              </AnimatedSection>

              {/* Surel */}
              <AnimatedSection direction="right" delay={0.3}>
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-50 p-3 rounded-xl text-blue-600 flex-shrink-0 mt-1">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-bold text-slate-800 text-base">Alamat Email</h4>
                    <p className="text-sm text-slate-600 font-semibold">vionacantik@gmail.com</p>
                    <p className="text-xs text-slate-400 font-semibold">Respon dalam waktu maksimal 2x24 jam kerja</p>
                  </div>
                </div>
              </AnimatedSection>

              {/* Jam Operasional */}
              <AnimatedSection direction="right" delay={0.4}>
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-50 p-3 rounded-xl text-blue-600 flex-shrink-0 mt-1">
                    <Clock className="h-6 w-6" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-bold text-slate-800 text-base">Jam Operasional</h4>
                    <p className="text-sm text-slate-600 font-semibold">Senin - Jumat | 07:00 - 14:00 WIB</p>
                    <p className="text-xs text-slate-400 font-semibold">Sabtu - Minggu & Tanggal Merah Tutup</p>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>

          {/* Kolom Kanan: Form Hubungi Kami */}
          <div className="lg:col-span-7">
            <AnimatedSection direction="left" delay={0.2}>
              <div className="bg-white p-8 sm:p-10 rounded-2xl border border-slate-100 shadow-xl text-left">
                <h3 className="text-xl font-bold text-blue-900 mb-6">
                  Kirim Pesan / Pertanyaan Secara Langsung
                </h3>

                {isSuccess && (
                  <div className="mb-6 p-4 bg-emerald-50 border border-emerald-250 text-emerald-800 rounded-xl flex items-start space-x-3">
                    <CheckCircle2 className="h-5 w-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h5 className="font-bold">Pesan Berhasil Terkirim!</h5>
                      <p className="text-xs text-emerald-700 mt-0.5 font-semibold">
                        Terima kasih telah menghubungi kami. Tim administrasi kami akan segera meninjau dan membalas pesan Anda melalui email secepatnya.
                      </p>
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Nama */}
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-xs font-bold uppercase tracking-wider text-slate-500">
                        Nama Lengkap
                      </label>
                      <input
                        type="text"
                        id="name"
                        required
                        value={nama}
                        onChange={(e) => setNama(e.target.value)}
                        placeholder="Nama Anda"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm placeholder:text-slate-400"
                      />
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-slate-500">
                        Alamat Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="email@alamat.com"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm placeholder:text-slate-400"
                      />
                    </div>
                  </div>

                  {/* Subjek */}
                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      Perihal / Subjek
                    </label>
                    <input
                      type="text"
                      id="subject"
                      required
                      value={subjek}
                      onChange={(e) => setSubjek(e.target.value)}
                      placeholder="Contoh: Konsultasi Biaya PPDB"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm placeholder:text-slate-400"
                    />
                  </div>

                  {/* Pesan */}
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      Isi Pesan Lengkap
                    </label>
                    <textarea
                      id="message"
                      required
                      rows={5}
                      value={pesan}
                      onChange={(e) => setPesan(e.target.value)}
                      placeholder="Tuliskan pertanyaan atau kendala Anda di sini..."
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm placeholder:text-slate-400 resize-none"
                    />
                  </div>

                  {/* Tombol Kirim */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center space-x-2 py-3.5 rounded-xl font-bold shadow-md hover:shadow-lg transition-colors cursor-pointer disabled:bg-blue-400"
                  >
                    <Send className="h-4 w-4" />
                    <span>{isSubmitting ? "Sedang Mengirim..." : "Kirim Pesan Sekarang"}</span>
                  </button>
                </form>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Peta Lokasi */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection direction="up">
          <div className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-xl">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.0327421398633!2d106.75332107399035!3d-6.259417493729117!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f0f7cb5a2f37%3A0xd1cac0f7df11da67!2sSekolah%20Dasar%20Kartika%20X-4!5e0!3m2!1sid!2sid!4v1780478150354!5m2!1sid!2sid"
              className="w-full h-[450px] block"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>
        </AnimatedSection>
      </section>
    </div>
  );
}
