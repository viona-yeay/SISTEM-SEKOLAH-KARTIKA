import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { initializeDatabase } from "@/lib/db";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "SD KARTIKA X-4 - Cerdas, Berkarakter, Berprestasi",
  description: "Selamat datang di website resmi SD KARTIKA X-4. Sekolah dasar berkualitas tinggi dengan kurikulum unggulan, fasilitas lengkap, dan pendaftaran PPDB Online terpadu.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Jalankan pembuatan tabel dan user otomatis di XAMPP secara dinamis jika belum dibuat
  await initializeDatabase();

  return (
    <html lang="id" className={`${inter.variable} h-full antialiasedScroll`}>
      <body className="min-h-full bg-slate-50 text-slate-800 flex flex-col font-sans">
        {children}
      </body>
    </html>
  );
}
