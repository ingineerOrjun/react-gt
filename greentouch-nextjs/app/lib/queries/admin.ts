// Admin read layer — runs as the authenticated staff user (server client), so
// RLS returns ALL rows including drafts. Casts work around the hand-authored
// Database generic widening results to `never` (replace with `supabase gen types`).
import 'server-only';
import { createClient } from '../supabase/server';
import { publicImageUrl } from '../storage';
import type { ProductRow, BlogRow, ContactMessageRow } from '../supabase/database.types';

export interface AdminProduct extends ProductRow {
  imageUrl: string | null;
}

export async function getAdminProducts(): Promise<AdminProduct[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('display_order', { ascending: true })
    .order('created_at', { ascending: false });
  if (error || !data) return [];
  return (data as unknown as ProductRow[]).map((p) => ({
    ...p,
    imageUrl: publicImageUrl('products', p.image_path),
  }));
}

export async function getAdminProduct(id: string): Promise<ProductRow | null> {
  const supabase = createClient();
  const { data, error } = await supabase.from('products').select('*').eq('id', id).maybeSingle();
  if (error || !data) return null;
  return data as unknown as ProductRow;
}

export type { BlogRow, ContactMessageRow };
