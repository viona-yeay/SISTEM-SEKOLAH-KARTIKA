import { createClient } from "@supabase/supabase-js";

// Klien Supabase khusus sisi-server (memakai Service Role Key) untuk operasi storage.
// Service Role Key TIDAK BOLEH diekspos ke client. Jangan pakai prefix NEXT_PUBLIC_.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export const STORAGE_BUCKET = process.env.SUPABASE_STORAGE_BUCKET || "galeri";

let cachedClient: ReturnType<typeof createClient> | null = null;

export function getSupabaseAdmin() {
  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error(
      "Konfigurasi Supabase belum lengkap. Pastikan NEXT_PUBLIC_SUPABASE_URL dan SUPABASE_SERVICE_ROLE_KEY sudah diisi di .env"
    );
  }

  if (!cachedClient) {
    cachedClient = createClient(supabaseUrl, supabaseServiceKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
  }

  return cachedClient;
}

/**
 * Unggah file gambar ke Supabase Storage dan kembalikan URL publik + path objek.
 */
export async function uploadImage(file: File, prefix: string) {
  const supabase = getSupabaseAdmin();

  const ext = (file.name.split(".").pop() || "png").toLowerCase();
  const objectPath = `${prefix}/${prefix}-${Date.now()}-${Math.random()
    .toString(36)
    .slice(2, 8)}.${ext}`;

  const bytes = await file.arrayBuffer();

  const { error } = await supabase.storage
    .from(STORAGE_BUCKET)
    .upload(objectPath, bytes, {
      contentType: file.type || "image/png",
      upsert: false,
    });

  if (error) {
    throw new Error(`Gagal mengunggah gambar ke Supabase Storage: ${error.message}`);
  }

  const { data } = supabase.storage.from(STORAGE_BUCKET).getPublicUrl(objectPath);

  return { url: data.publicUrl, path: objectPath };
}

/**
 * Hapus objek gambar dari Supabase Storage berdasarkan path.
 */
export async function deleteImage(objectPath: string) {
  if (!objectPath) return;
  const supabase = getSupabaseAdmin();
  await supabase.storage.from(STORAGE_BUCKET).remove([objectPath]);
}
