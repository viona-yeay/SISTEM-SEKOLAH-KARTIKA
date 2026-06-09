"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

export async function submitPpdbForm(prevState: any, formData: FormData) {
  const session = await auth();
  
  if (!session || !session.user || !session.user.id) {
    return { error: "Sesi Anda telah berakhir. Silakan masuk kembali." };
  }

  const namaLengkap = formData.get("namaLengkap") as string;
  const ttl = formData.get("ttl") as string;
  const namaOrangTua = formData.get("namaOrangTua") as string;
  const asalSekolah = formData.get("asalSekolah") as string;

  const fotoKkFile = formData.get("fotoKk") as File | null;
  const ktpOrangTuaFile = formData.get("ktpOrangTua") as File | null;
  const fotoAkteFile = formData.get("fotoAkte") as File | null;
  const passFotoFile = formData.get("passFoto") as File | null;

  if (!namaLengkap || !ttl || !namaOrangTua || !asalSekolah) {
    return { error: "Semua kolom formulir pendaftaran wajib diisi." };
  }

  if (
    !fotoKkFile || fotoKkFile.size === 0 ||
    !ktpOrangTuaFile || ktpOrangTuaFile.size === 0 ||
    !fotoAkteFile || fotoAkteFile.size === 0 ||
    !passFotoFile || passFotoFile.size === 0
  ) {
    return { error: "Semua berkas persyaratan (KK, KTP, Akte, dan Pass Foto) wajib diunggah." };
  }

  // Validasi format file (hanya gambar) & ukuran (maks 5MB)
  const allowedTypes = ["image/jpeg", "image/png", "image/jpg", "image/webp"];
  const maxSizeBytes = 5 * 1024 * 1024; // 5MB

  const fileCheckList = [
    { name: "Foto KK", file: fotoKkFile },
    { name: "KTP Orang Tua", file: ktpOrangTuaFile },
    { name: "Foto Akte Anak", file: fotoAkteFile },
    { name: "Pass Foto 3x4", file: passFotoFile },
  ];

  for (const item of fileCheckList) {
    if (!allowedTypes.includes(item.file.type)) {
      return { error: `Format berkas ${item.name} tidak valid. Hanya menerima format gambar (JPG/PNG/WEBP).` };
    }
    if (item.file.size > maxSizeBytes) {
      return { error: `Ukuran berkas ${item.name} terlalu besar. Maksimal adalah 5MB.` };
    }
  }

  try {
    // Cek apakah user sudah mengisi pendaftaran sebelumnya
    const existingRegistration = await prisma.registration.findUnique({
      where: { userId: session.user.id }
    });

    if (existingRegistration) {
      return { error: "Anda sudah melakukan pengisian formulir pendaftaran sebelumnya." };
    }

    // Buat direktori upload jika belum ada
    const fs = require("fs/promises");
    const path = require("path");
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    await fs.mkdir(uploadDir, { recursive: true });

    // Helper untuk menyimpan file
    const saveFile = async (file: File, prefix: string) => {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const ext = path.extname(file.name) || ".png";
      const filename = `${prefix}-${session.user.id}-${Date.now()}${ext}`;
      const filepath = path.join(uploadDir, filename);
      await fs.writeFile(filepath, buffer);
      return `/uploads/${filename}`;
    };

    const fotoKkPath = await saveFile(fotoKkFile, "kk");
    const ktpOrangTuaPath = await saveFile(ktpOrangTuaFile, "ktp");
    const fotoAktePath = await saveFile(fotoAkteFile, "akte");
    const passFotoPath = await saveFile(passFotoFile, "passfoto");

    // Generate ID Registrasi unik. Format: PPDB26-001, PPDB26-002, dst.
    const count = await prisma.registration.count();
    const sequence = String(count + 1).padStart(3, "0");
    const idRegistrasi = `PPDB26-${sequence}`;

    await prisma.registration.create({
      data: {
        userId: session.user.id,
        idRegistrasi,
        namaLengkap: namaLengkap.trim(),
        ttl: ttl.trim(),
        namaOrangTua: namaOrangTua.trim(),
        asalSekolah: asalSekolah.trim(),
        fotoKk: fotoKkPath,
        ktpOrangTua: ktpOrangTuaPath,
        fotoAkte: fotoAktePath,
        passFoto: passFotoPath,
        status: "MENUNGGU_VERIFIKASI"
      }
    });

    revalidatePath("/dashboard/user");
    return { success: true, idRegistrasi };
  } catch (error) {
    console.error("PPDB Form Submit error:", error);
    return { error: "Gagal menyimpan formulir pendaftaran ke database. Silakan coba lagi." };
  }
}

export async function updateRegistrationStatus(registrationId: string, action: "TERIMA" | "TOLAK") {
  const session = await auth();

  if (!session || !session.user || session.user.role !== "ADMIN") {
    return { error: "Otorisasi ditolak. Hanya panitia/admin yang dapat melakukan tindakan ini." };
  }

  if (!registrationId || !action) {
    return { error: "Parameter aksi tidak valid." };
  }

  const nextStatus = action === "TERIMA" ? "LULUS" : "TIDAK_LULUS";

  try {
    await prisma.registration.update({
      where: { id: registrationId },
      data: { status: nextStatus }
    });

    revalidatePath("/dashboard/admin");
    revalidatePath("/dashboard/user"); // Pastikan revalidate juga dashboard user agar langsung terupdate
    return { success: true };
  } catch (error) {
    console.error("PPDB Status Update error:", error);
    return { error: "Gagal memperbarui status pendaftaran di database." };
  }
}
