"use server";

import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function registerUser(prevState: any, formData: FormData) {
  const nama = formData.get("nama") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (!nama || !email || !password || !confirmPassword) {
    return { error: "Semua kolom formulir pendaftaran wajib diisi." };
  }

  if (password !== confirmPassword) {
    return { error: "Konfirmasi kata sandi tidak cocok dengan kata sandi." };
  }

  if (password.length < 6) {
    return { error: "Kata sandi minimal harus terdiri dari 6 karakter." };
  }

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email: email.toLowerCase().trim() },
    });

    if (existingUser) {
      return { error: "Alamat email tersebut sudah terdaftar di sistem kami." };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Otomatis atur role menjadi ADMIN untuk email khusus pengujian panitia
    const isAdminEmail = email.toLowerCase().trim() === "admin@kartikax4.sch.id";
    const role = isAdminEmail ? "ADMIN" : "USER";

    await prisma.user.create({
      data: {
        nama: nama.trim(),
        email: email.toLowerCase().trim(),
        password: hashedPassword,
        role: role as any,
      },
    });

    return { success: true };
  } catch (error) {
    console.error("Registrasi error:", error);
    return { error: "Terjadi kegagalan koneksi database. Silakan coba beberapa saat lagi." };
  }
}
