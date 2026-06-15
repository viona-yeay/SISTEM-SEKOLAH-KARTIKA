"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { uploadImage, deleteImage } from "@/lib/supabase";
import { revalidatePath } from "next/cache";

const allowedTypes = ["image/jpeg", "image/png", "image/jpg", "image/webp"];
const maxSizeBytes = 5 * 1024 * 1024; // 5MB

export async function createKegiatan(prevState: any, formData: FormData) {
  const session = await auth();

  if (!session || !session.user || session.user.role !== "ADMIN") {
    return { error: "Otorisasi ditolak. Hanya admin yang dapat menambah kegiatan." };
  }

  const judul = (formData.get("judul") as string | null)?.trim() || "";
  const kategori = (formData.get("kategori") as string | null)?.trim() || "";
  const deskripsi = (formData.get("deskripsi") as string | null)?.trim() || "";
  const gambar = formData.get("gambar") as File | null;

  if (!judul || !kategori || !deskripsi) {
    return { error: "Judul, kategori, dan deskripsi wajib diisi." };
  }

  if (!gambar || gambar.size === 0) {
    return { error: "Gambar kegiatan wajib diunggah." };
  }

  if (!allowedTypes.includes(gambar.type)) {
    return { error: "Format gambar tidak valid. Hanya menerima JPG, PNG, atau WEBP." };
  }

  if (gambar.size > maxSizeBytes) {
    return { error: "Ukuran gambar terlalu besar. Maksimal 5MB." };
  }

  try {
    const { url, path } = await uploadImage(gambar, "kegiatan");

    await prisma.kegiatan.create({
      data: { judul, kategori, deskripsi, gambarUrl: url, gambarPath: path },
    });

    revalidatePath("/dashboard/admin/kegiatan");
    revalidatePath("/galeri");
    return { success: true };
  } catch (error) {
    console.error("Create Kegiatan error:", error);
    const message = error instanceof Error ? error.message : "Gagal menyimpan kegiatan.";
    return { error: message };
  }
}

export async function deleteKegiatan(id: string) {
  const session = await auth();

  if (!session || !session.user || session.user.role !== "ADMIN") {
    return { error: "Otorisasi ditolak. Hanya admin yang dapat menghapus kegiatan." };
  }

  if (!id) {
    return { error: "ID kegiatan tidak valid." };
  }

  try {
    const kegiatan = await prisma.kegiatan.findUnique({ where: { id } });
    if (!kegiatan) {
      return { error: "Kegiatan tidak ditemukan." };
    }

    // Hapus gambar dari storage terlebih dahulu (abaikan jika gagal agar baris DB tetap bisa dihapus)
    try {
      await deleteImage(kegiatan.gambarPath);
    } catch (e) {
      console.error("Gagal menghapus gambar storage:", e);
    }

    await prisma.kegiatan.delete({ where: { id } });

    revalidatePath("/dashboard/admin/kegiatan");
    revalidatePath("/galeri");
    return { success: true };
  } catch (error) {
    console.error("Delete Kegiatan error:", error);
    return { error: "Gagal menghapus kegiatan dari database." };
  }
}
