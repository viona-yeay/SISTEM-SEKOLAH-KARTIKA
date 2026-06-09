"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, User as UserIcon, LogOut, LayoutDashboard } from "lucide-react";
import { signOut } from "next-auth/react";

interface NavbarProps {
  user?: {
    name?: string | null;
    email?: string | null;
    role?: "USER" | "ADMIN";
  };
}

export default function Navbar({ user }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navigation = [
    { name: "Beranda", href: "/" },
    { name: "Profil Sekolah", href: "/profil" },
    { name: "Galeri Kegiatan", href: "/galeri" },
    { name: "Informasi PPDB", href: "/info-ppdb" },
    { name: "Hubungi Kami", href: "/kontak" },
  ];

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  const handleLogout = async () => {
    await signOut({ redirectTo: "/" });
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200/80 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center space-x-3 group">
              <Image
                src="/LOGO-kartika.png"
                alt="Logo SD Kartika X-4"
                width={48}
                height={48}
                className="object-contain group-hover:scale-105 transition-all duration-200"
              />
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-tight text-blue-900 group-hover:text-blue-700 transition-colors duration-200">
                  SD KARTIKA X-4
                </span>
                <span className="text-[10px] text-slate-500 font-semibold tracking-wider uppercase leading-none">
                  Cerdas, Berkarakter, Berprestasi
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive(item.href)
                    ? "bg-blue-50 text-blue-900 font-semibold shadow-sm"
                    : "text-slate-600 hover:text-blue-900 hover:bg-slate-50"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Desktop Auth CTA */}
          <div className="hidden md:flex items-center space-x-3">
            {user ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 text-sm text-slate-700 bg-slate-100/80 px-3 py-1.5 rounded-xl border border-slate-200/50">
                  <UserIcon className="h-4 w-4 text-blue-600" />
                  <span className="font-semibold truncate max-w-[120px]">{user.name}</span>
                  <span className="text-[10px] bg-blue-900 text-white px-1.5 py-0.5 rounded-md font-bold uppercase">
                    {user.role}
                  </span>
                </div>
                
                <Link
                  href={user.role === "ADMIN" ? "/dashboard/admin" : "/dashboard/user"}
                  className="bg-blue-900 hover:bg-blue-800 text-white flex items-center space-x-2 px-4.5 py-2.5 rounded-xl text-sm font-semibold shadow-md transition-all duration-200 transform hover:-translate-y-0.5"
                >
                  <LayoutDashboard className="h-4 w-4" />
                  <span>Dashboard</span>
                </Link>

                <button
                  onClick={handleLogout}
                  className="text-slate-500 hover:text-red-605 p-2 rounded-xl hover:bg-red-50 transition-all duration-200 cursor-pointer"
                  title="Keluar Akun"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  href="/login"
                  className="text-slate-700 hover:text-blue-900 px-4 py-2 rounded-xl text-sm font-medium transition-colors"
                >
                  Masuk
                </Link>
                <Link
                  href="/info-ppdb"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5"
                >
                  Daftar PPDB Sekarang
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-xl text-slate-500 hover:text-blue-900 hover:bg-slate-100 focus:outline-none transition-colors cursor-pointer"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t border-slate-200/60 bg-white">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                  isActive(item.href)
                    ? "bg-blue-50 text-blue-900 font-bold"
                    : "text-slate-600 hover:text-blue-900 hover:bg-slate-50"
                }`}
              >
                {item.name}
              </Link>
            ))}
            <hr className="my-2 border-slate-105" />
            {user ? (
              <div className="space-y-2 px-4 py-2">
                <div className="flex items-center space-x-2 text-slate-700 bg-slate-50 p-2 rounded-xl">
                  <UserIcon className="h-5 w-5 text-blue-600" />
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold">{user.name}</span>
                    <span className="text-[10px] text-slate-500">{user.email}</span>
                  </div>
                  <span className="ml-auto text-[10px] bg-blue-900 text-white px-1.5 py-0.5 rounded font-bold uppercase">
                    {user.role}
                  </span>
                </div>
                <Link
                  href={user.role === "ADMIN" ? "/dashboard/admin" : "/dashboard/user"}
                  onClick={() => setIsOpen(false)}
                  className="w-full bg-blue-900 hover:bg-blue-800 text-white flex items-center justify-center space-x-2 py-3 rounded-xl font-semibold shadow-md transition-colors"
                >
                  <LayoutDashboard className="h-5 w-5" />
                  <span>Masuk Dashboard</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-red-600 hover:bg-red-50 flex items-center justify-center space-x-2 py-3 rounded-xl font-semibold border border-red-200/50 transition-colors cursor-pointer"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Keluar Akun</span>
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2 px-4 py-2">
                <Link
                  href="/login"
                  onClick={() => setIsOpen(false)}
                  className="text-center text-slate-700 border border-slate-200 py-3 rounded-xl text-sm font-semibold hover:bg-slate-50 transition-colors"
                >
                  Masuk
                </Link>
                <Link
                  href="/info-ppdb"
                  onClick={() => setIsOpen(false)}
                  className="text-center bg-blue-600 text-white py-3 rounded-xl text-sm font-semibold shadow-md hover:bg-blue-700 transition-colors"
                >
                  Daftar PPDB
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
