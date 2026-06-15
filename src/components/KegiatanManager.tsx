"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { createKegiatan, deleteKegiatan } from "@/app/actions/kegiatan";
import {
  GraduationCap, ArrowLeft, ImagePlus, Trash2, AlertCircle,
  CheckCircle2, Camera, Loader2,
} from "lucide-react";

interface KegiatanItem {
  id: string;
  judul: string;
  kategori: string;
  deskripsi: string;
  gambarUrl: string;
  createdAt: string;
}

interface KegiatanManagerProps {
  kegiatanList: KegiatanItem[];
}

const KATEGORI_OPSI = ["Fasilitas", "Acara", "Pembelajaran", "Ekstrakurikuler", "Prestasi"];

export default function KegiatanManager({ kegiatanList }: KegiatanManagerProps) {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const [items, setItems] = useState<KegiatanItem[]>(kegiatanList);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const res = await createKegiatan(null, formData);

    setIsSubmitting(false);

    if (res?.error) {
      setError(res.error);
    } else if (res?.success) {
      setSuccess("Kegiatan berhasil ditambahkan ke galeri.");
      formRef.current?.reset();
      setPreview(null);
      router.refresh();
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Yakin ingin menghapus kegiatan ini? Gambar juga akan dihapus permanen.")) {
      return;
    }
    setDeletingId(id);
    const res = await deleteKegiatan(id);
    setDeletingId(null);

    if (res?.error) {
      setError(res.error);
    } else if (res?.success) {
      setItems((prev) => prev.filter((item) => item.id !== id));
      setSuccess("Kegiatan berhasil dihapus.");
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    } else {
      setPreview(null);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Topbar */}
      <header className="bg-slate-900 text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-600 text-white p-2.5 rounded-xl">
              <GraduationCap className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight">Kelola Galeri Kegiatan</h1>
              <p className="text-[10px] text-slate-400 font-semibold tracking-wider uppercase leading-none">SD KARTIKA X-4</p>
            </div>
          </div>

          <Link
            href="/dashboard/admin"
            className="bg-white/10 hover:bg-white/15 text-white flex items-center space-x-1.5 px-3 py-2 rounded-xl text-xs font-semibold border border-white/10 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Kembali ke Panel PPDB</span>
          </Link>
        </div>
      </header>

      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form Tambah Kegiatan */}
        <section className="lg:col-span-1">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-7 space-y-5 sticky top-6">
            <div className="flex items-center space-x-2.5">
              <div className="bg-blue-50 text-blue-600 p-2.5 rounded-xl">
                <ImagePlus className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-base font-bold text-slate-800">Tambah Kegiatan Baru</h2>
                <p className="text-[11px] text-slate-400 font-semibold">Unggah dokumentasi & deskripsi</p>
              </div>
            </div>

            {error && (
              <div className="p-3.5 bg-rose-50 border border-rose-200 text-rose-800 rounded-xl flex items-start space-x-2.5 text-xs">
                <AlertCircle className="h-4.5 w-4.5 text-rose-600 flex-shrink-0 mt-0.5" />
                <span className="font-semibold leading-relaxed">{error}</span>
              </div>
            )}
            {success && (
              <div className="p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl flex items-start space-x-2.5 text-xs">
                <CheckCircle2 className="h-4.5 w-4.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span className="font-semibold leading-relaxed">{success}</span>
              </div>
            )}

            <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
              {/* Gambar */}
              <div className="space-y-1.5">
                <label htmlFor="gambar" className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Gambar Kegiatan
                </label>
                <div className="relative border-2 border-dashed border-slate-200 rounded-2xl overflow-hidden hover:border-blue-400 transition-colors">
                  {preview ? (
                    <img src={preview} alt="Pratinjau" className="w-full h-40 object-cover" />
                  ) : (
                    <div className="h-40 flex flex-col items-center justify-center text-slate-400 space-y-2">
                      <Camera className="h-8 w-8" />
                      <span className="text-xs font-semibold">Klik untuk pilih gambar (maks 5MB)</span>
                    </div>
                  )}
                  <input
                    type="file"
                    id="gambar"
                    name="gambar"
                    accept="image/png,image/jpeg,image/jpg,image/webp"
                    required
                    onChange={handleFileChange}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                </div>
              </div>

              {/* Judul */}
              <div className="space-y-1.5">
                <label htmlFor="judul" className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Judul Kegiatan
                </label>
                <input
                  type="text"
                  id="judul"
                  name="judul"
                  required
                  placeholder="Contoh: Latihan Rutin Renang"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm placeholder:text-slate-400"
                />
              </div>

              {/* Kategori */}
              <div className="space-y-1.5">
                <label htmlFor="kategori" className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Kategori
                </label>
                <input
                  type="text"
                  id="kategori"
                  name="kategori"
                  required
                  list="kategori-opsi"
                  placeholder="Pilih atau ketik kategori"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm placeholder:text-slate-400"
                />
                <datalist id="kategori-opsi">
                  {KATEGORI_OPSI.map((k) => (
                    <option key={k} value={k} />
                  ))}
                </datalist>
              </div>

              {/* Deskripsi */}
              <div className="space-y-1.5">
                <label htmlFor="deskripsi" className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Deskripsi
                </label>
                <textarea
                  id="deskripsi"
                  name="deskripsi"
                  required
                  rows={4}
                  placeholder="Jelaskan detail isi kegiatan..."
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm placeholder:text-slate-400 resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center space-x-2 py-3.5 rounded-xl font-bold shadow-md hover:shadow-lg transition-colors cursor-pointer disabled:bg-blue-400"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span>Mengunggah...</span>
                  </>
                ) : (
                  <>
                    <ImagePlus className="h-5 w-5" />
                    <span>Tambah ke Galeri</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </section>

        {/* Daftar Kegiatan */}
        <section className="lg:col-span-2">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-7 space-y-5">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-slate-800">
                Daftar Kegiatan ({items.length})
              </h2>
              <Link href="/galeri" target="_blank" className="text-xs font-bold text-blue-600 hover:underline">
                Lihat Galeri Publik →
              </Link>
            </div>

            {items.length === 0 ? (
              <div className="py-16 text-center text-slate-400 flex flex-col items-center justify-center space-y-3">
                <Camera className="h-10 w-10 text-slate-300" />
                <div>
                  <h5 className="font-bold text-slate-600">Belum Ada Kegiatan</h5>
                  <p className="text-xs text-slate-500">Tambahkan kegiatan pertama melalui formulir di samping.</p>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {items.map((item) => (
                  <div key={item.id} className="group border border-slate-200 rounded-2xl overflow-hidden bg-slate-50 flex flex-col">
                    <div className="relative aspect-[4/3] bg-slate-200">
                      <Image
                        src={item.gambarUrl}
                        alt={item.judul}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover"
                      />
                      <span className="absolute top-3 left-3 text-[10px] font-bold tracking-wider uppercase bg-white/95 text-blue-950 px-2.5 py-1 rounded-md shadow-sm">
                        {item.kategori}
                      </span>
                    </div>
                    <div className="p-4 flex flex-col flex-grow space-y-2">
                      <h3 className="font-bold text-slate-800 text-sm leading-snug">{item.judul}</h3>
                      <p className="text-xs text-slate-500 leading-relaxed line-clamp-3 flex-grow">{item.deskripsi}</p>
                      <button
                        onClick={() => handleDelete(item.id)}
                        disabled={deletingId === item.id}
                        className="mt-2 w-full bg-rose-50 hover:bg-rose-100 text-rose-700 flex items-center justify-center space-x-1.5 py-2 rounded-xl text-xs font-bold border border-rose-100 transition-colors cursor-pointer disabled:opacity-50"
                      >
                        {deletingId === item.id ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Trash2 className="h-4 w-4" />
                        )}
                        <span>{deletingId === item.id ? "Menghapus..." : "Hapus"}</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
