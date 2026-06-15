// Storage helpers. Public URL derivation works with the anon client; uploads
// and deletes run from server actions as the authenticated admin (RLS allows
// staff writes). Image binaries are validated before upload.

import { SUPABASE_URL } from './env';

export type Bucket = 'products' | 'blogs';

export const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/avif'];
export const MAX_IMAGE_BYTES = 5 * 1024 * 1024; // 5 MB

/** Build the public URL for a stored object key (or null if no key). */
export function publicImageUrl(bucket: Bucket, path: string | null | undefined): string | null {
  if (!path || !SUPABASE_URL) return null;
  return `${SUPABASE_URL}/storage/v1/object/public/${bucket}/${path}`;
}

/** Validate an uploaded File before sending it to storage. Returns an error string or null. */
export function validateImage(file: File): string | null {
  if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
    return 'Unsupported image type. Use JPEG, PNG, WebP, or AVIF.';
  }
  if (file.size > MAX_IMAGE_BYTES) {
    return 'Image is too large (max 5 MB).';
  }
  return null;
}

/** Deterministic-ish object key under an entity folder. */
export function buildObjectKey(entityId: string, fileName: string): string {
  const ext = (fileName.split('.').pop() || 'jpg').toLowerCase().replace(/[^a-z0-9]/g, '');
  const safe = `${Date.now()}.${ext || 'jpg'}`;
  return `${entityId}/${safe}`;
}
