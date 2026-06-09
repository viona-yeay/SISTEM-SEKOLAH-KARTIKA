"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { registerUser } from "@/app/actions/auth";
import { ArrowLeft, UserPlus, CheckCircle2, AlertCircle } from "lucide-react";

export default function Daftar() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const res = await registerUser(null, formData);

    setIsSubmitting(false);
    if (res?.error) {
      setError(res.error);
    } else if (res?.success) {
      setSuccess(true);
      // Arahkan ke login setelah 3 detik
      setTimeout(() => {
        router.push("/login");
      }, 3000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-slate-900 to-indigo-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8 px-4">
      {/* Tombol Kembali ke Beranda */}
      <div className="absolute top-8 left-8">
        <Link
          href="/"
          className="flex items-center space-x-2 text-slate-400 hover:text-white transition-colors duration-200 text-sm font-semibold"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Kembali ke Beranda</span>
        </Link>
      </div>

      {/* Card Utama Pendaftaran */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md space-y-6">
        <div className="flex flex-col items-center">
          <Image
            src="/LOGO-kartika.png"
            alt="Logo SD Kartika X-4"
            width={64}
            height={64}
            className="object-contain mb-4"
          />
          <h2 className="text-3xl font-extrabold text-white tracking-tight">
            SD KARTIKA X-4
          </h2>
          <p className="mt-1 text-slate-400 text-sm font-medium">
            Registrasi Akun Baru PPDB Online
          </p>
        </div>

        <div className="bg-white/95 backdrop-blur-md py-8 px-10 rounded-3xl border border-slate-100 shadow-2xl space-y-6 text-left">
          {success ? (
            <div className="space-y-4 text-center py-6">
              <div className="bg-emerald-50 text-emerald-800 p-4 rounded-full w-fit mx-auto">
                <CheckCircle2 className="h-12 w-12 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-800">Registrasi Berhasil!</h3>
              <p className="text-sm text-slate-555 text-slate-500 leading-relaxed">
                Akun pendaftaran Anda berhasil dibuat. Sistem akan mengalihkan Anda ke halaman masuk (*Login*) secara otomatis dalam 3 detik...
              </p>
              <Link
                href="/login"
                className="mt-4 inline-block text-sm font-bold text-blue-600 hover:underline"
              >
                Klik di sini jika tidak beralih otomatis
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <div className="p-3.5 bg-rose-50 border border-rose-200 text-rose-800 rounded-xl flex items-start space-x-2.5 text-xs">
                  <AlertCircle className="h-4.5 w-4.5 text-rose-600 flex-shrink-0 mt-0.5" />
                  <span className="font-semibold leading-relaxed">{error}</span>
                </div>
              )}

              {/* Nama Lengkap */}
              <div className="space-y-1.5">
                <label htmlFor="nama" className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Nama Lengkap Orang Tua / Wali
                </label>
                <input
                  type="text"
                  id="nama"
                  name="nama"
                  required
                  placeholder="Masukkan nama lengkap Anda"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm placeholder:text-slate-400"
                />
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Alamat Email Aktif
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  placeholder="nama@email.com"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm placeholder:text-slate-400"
                />
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <label htmlFor="password" className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Kata Sandi (Password)
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  required
                  placeholder="Minimal 6 karakter"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm placeholder:text-slate-400"
                />
              </div>

              {/* Konfirmasi Password */}
              <div className="space-y-1.5">
                <label htmlFor="confirmPassword" className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Konfirmasi Kata Sandi
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  required
                  placeholder="Ulangi kata sandi Anda"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm placeholder:text-slate-400"
                />
              </div>

              {/* Tombol Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center space-x-2 py-3.5 rounded-xl font-bold shadow-md hover:shadow-lg transition-colors cursor-pointer disabled:bg-blue-400 mt-2"
              >
                <UserPlus className="h-5 w-5" />
                <span>{isSubmitting ? "Memproses Registrasi..." : "Buat Akun Sekarang"}</span>
              </button>
            </form>
          )}

          {!success && (
            <div className="pt-2 text-center text-xs text-slate-550 text-slate-500">
              Sudah memiliki akun pendaftaran?{" "}
              <Link href="/login" className="font-bold text-blue-600 hover:underline">
                Masuk / Login
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
