import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import KegiatanManager from "@/components/KegiatanManager";

type KegiatanRow = {
  id: string;
  judul: string;
  kategori: string;
  deskripsi: string;
  gambarUrl: string;
  createdAt: Date;
};

export default async function KelolaKegiatanPage() {
  const session = await auth();

  if (!session || !session.user || !session.user.id) {
    redirect("/login");
  }

  if (session.user.role !== "ADMIN") {
    redirect("/dashboard/user");
  }

  const kegiatanList = await prisma.kegiatan.findMany({
    orderBy: { createdAt: "desc" },
  });

  const mapped = kegiatanList.map((k: KegiatanRow) => ({
    id: k.id,
    judul: k.judul,
    kategori: k.kategori,
    deskripsi: k.deskripsi,
    gambarUrl: k.gambarUrl,
    createdAt: k.createdAt.toISOString(),
  }));

  return <KegiatanManager kegiatanList={mapped} />;
}
