import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import AdminDashboard from "@/components/AdminDashboard";

export default async function AdminDashboardPage() {
  const session = await auth();

  // Proteksi Tambahan Server-Side
  if (!session || !session.user || !session.user.id) {
    redirect("/login");
  }

  if (session.user.role !== "ADMIN") {
    redirect("/dashboard/user");
  }

  try {
    // Ambil seluruh data registrasi berikut detail user akunnya
    const registrations = await prisma.registration.findMany({
      include: {
        user: {
          select: {
            nama: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    // Hitung statistik
    const stats = registrations.reduce(
      (acc, curr) => {
        acc.total++;
        if (curr.status === "MENUNGGU_VERIFIKASI") acc.pending++;
        else if (curr.status === "LULUS") acc.approved++;
        else if (curr.status === "TIDAK_LULUS") acc.rejected++;
        return acc;
      },
      { total: 0, pending: 0, approved: 0, rejected: 0 }
    );

    // Map tipe data agar serializable ke client component
    const mappedRegs = registrations.map((reg) => ({
      id: reg.id,
      idRegistrasi: reg.idRegistrasi,
      namaLengkap: reg.namaLengkap,
      ttl: reg.ttl,
      namaOrangTua: reg.namaOrangTua,
      asalSekolah: reg.asalSekolah,
      fotoKk: reg.fotoKk,
      ktpOrangTua: reg.ktpOrangTua,
      fotoAkte: reg.fotoAkte,
      passFoto: reg.passFoto,
      status: reg.status as any,
      createdAt: reg.createdAt.toISOString(),
      user: {
        nama: reg.user.nama,
        email: reg.user.email,
      },
    }));

    return (
      <AdminDashboard
        user={{
          name: session.user.name || "Panitia PPDB",
        }}
        registrations={mappedRegs}
        stats={stats}
      />
    );
  } catch (error) {
    console.error("Dashboard Admin Page error:", error);
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-700">
        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-xl text-center space-y-4 max-w-sm">
          <h2 className="text-xl font-bold text-red-650 text-red-600">Kesalahan Muat Panel Admin</h2>
          <p className="text-sm leading-relaxed text-slate-500">
            Gagal mengambil data pendaftaran dari database MySQL. Pastikan server database Anda aktif dan konfigurasi URL database benar.
          </p>
        </div>
      </div>
    );
  }
}
