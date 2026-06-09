import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import UserDashboard from "@/components/UserDashboard";

export default async function UserDashboardPage() {
  const session = await auth();

  if (!session || !session.user || !session.user.id) {
    redirect("/login");
  }

  try {
    const userRecord = await prisma.user.findUnique({
      where: { id: session.user.id },
      include: { registration: true },
    });

    if (!userRecord) {
      redirect("/login");
    }

    // Ubah tipe data prisma menjadi kecocokan tipe data props
    const registrationData = userRecord.registration
      ? {
          id: userRecord.registration.id,
          idRegistrasi: userRecord.registration.idRegistrasi,
          namaLengkap: userRecord.registration.namaLengkap,
          ttl: userRecord.registration.ttl,
          namaOrangTua: userRecord.registration.namaOrangTua,
          asalSekolah: userRecord.registration.asalSekolah,
          fotoKk: userRecord.registration.fotoKk,
          ktpOrangTua: userRecord.registration.ktpOrangTua,
          fotoAkte: userRecord.registration.fotoAkte,
          passFoto: userRecord.registration.passFoto,
          status: userRecord.registration.status as any,
        }
      : null;

    return (
      <UserDashboard
        user={{
          name: userRecord.nama,
          email: userRecord.email,
        }}
        registration={registrationData}
      />
    );
  } catch (error) {
    console.error("Dashboard User Page error:", error);
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-700">
        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-xl text-center space-y-4 max-w-sm">
          <h2 className="text-xl font-bold text-red-650 text-red-600">Terjadi Kesalahan Sistem</h2>
          <p className="text-sm leading-relaxed text-slate-500">
            Gagal melakukan sinkronisasi dengan database MySQL. Silakan periksa koneksi internet dan server database Anda lalu coba lagi.
          </p>
        </div>
      </div>
    );
  }
}
