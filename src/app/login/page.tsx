"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { ArrowLeft, LogIn, AlertCircle } from "lucide-react";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Cek jika diarahkan kembali dengan parameter error
  const errorType = searchParams.get("error");
  const getErrorMessage = () => {
    if (error) return error;
    if (errorType === "CredentialsSignin") {
      return "Email atau kata sandi yang Anda masukkan salah.";
    }
    if (errorType) {
      return "Akses ditolak. Terjadi kesalahan otentikasi.";
    }
    return null;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const res = await signIn("credentials", {
        email: email.toLowerCase().trim(),
        password,
        redirect: false,
      });

      if (res?.error) {
        setError("Email atau kata sandi yang Anda masukkan salah.");
        setIsSubmitting(false);
      } else {
        // Berhasil login, arahkan ke dashboard
        // Middleware akan otomatis merutekan ke /dashboard/admin jika role ADMIN
        router.push("/dashboard/user");
        router.refresh();
      }
    } catch (err) {
      console.error(err);
      setError("Terjadi kegagalan koneksi ke server.");
      setIsSubmitting(false);
    }
  };

  const currentErrorMessage = getErrorMessage();

  return (
    <div className="bg-white/95 backdrop-blur-md py-8 px-10 rounded-3xl border border-slate-100 shadow-2xl space-y-6 text-left">
      <form onSubmit={handleSubmit} className="space-y-5">
        {currentErrorMessage && (
          <div className="p-3.5 bg-rose-50 border border-rose-200 text-rose-800 rounded-xl flex items-start space-x-2.5 text-xs">
            <AlertCircle className="h-4.5 w-4.5 text-rose-600 flex-shrink-0 mt-0.5" />
            <span className="font-semibold leading-relaxed">{currentErrorMessage}</span>
          </div>
        )}

        {/* Email */}
        <div className="space-y-1.5">
          <label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Alamat Email Anda
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
            Kata Sandi
          </label>
          <input
            type="password"
            id="password"
            name="password"
            required
            placeholder="Masukkan kata sandi Anda"
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm placeholder:text-slate-400"
          />
        </div>

        {/* Tombol Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-650 bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center space-x-2 py-3.5 rounded-xl font-bold shadow-md hover:shadow-lg transition-colors cursor-pointer disabled:bg-blue-450 disabled:bg-blue-400 mt-2"
        >
          <LogIn className="h-5 w-5" />
          <span>{isSubmitting ? "Sedang Memverifikasi..." : "Masuk Sekarang"}</span>
        </button>
      </form>

      <div className="pt-2 text-center text-xs text-slate-500">
        Belum memiliki akun pendaftaran?{" "}
        <Link href="/daftar" className="font-bold text-blue-600 hover:underline">
          Daftar Akun Baru
        </Link>
      </div>
    </div>
  );
}

export default function Login() {
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
            Masuk Portal PPDB & Panitia
          </p>
        </div>

        <Suspense fallback={
          <div className="bg-white/95 backdrop-blur-md py-8 px-10 rounded-3xl border border-slate-100 shadow-2xl text-center text-sm text-slate-500">
            Sedang memuat formulir masuk...
          </div>
        }>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}
