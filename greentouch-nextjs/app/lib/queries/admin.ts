// Admin read layer — runs as the authenticated staff user (server client), so
// RLS returns ALL rows including drafts. Casts work around the hand-authored
// Database generic widening results to `never` (replace with `supabase gen types`).
import 'server-only';
import { createClient } from '../supabase/server';
import { publicImageUrl } from '../storage';
import type { ProductRow, BlogRow, ContactMessageRow, HomeFeatureRow, HomeStatRow, ProductTaxonomyRow } from '../supabase/database.types';

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

export interface AdminBlog extends BlogRow {
  imageUrl: string | null;
}

export async function getAdminBlogs(): Promise<AdminBlog[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('blogs')
    .select('*')
    .order('display_order', { ascending: true })
    .order('created_at', { ascending: false });
  if (error || !data) return [];
  return (data as unknown as BlogRow[]).map((b) => ({
    ...b,
    imageUrl: publicImageUrl('blogs', b.image_path),
  }));
}

export async function getAdminBlog(id: string): Promise<BlogRow | null> {
  const supabase = createClient();
  const { data, error } = await supabase.from('blogs').select('*').eq('id', id).maybeSingle();
  if (error || !data) return null;
  return data as unknown as BlogRow;
}

export async function getAdminMessages(): Promise<ContactMessageRow[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('contact_messages')
    .select('*')
    .order('created_at', { ascending: false });
  if (error || !data) return [];
  return data as unknown as ContactMessageRow[];
}

export async function getAdminMessage(id: string): Promise<ContactMessageRow | null> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('contact_messages')
    .select('*')
    .eq('id', id)
    .maybeSingle();
  if (error || !data) return null;
  return data as unknown as ContactMessageRow;
}

export type { BlogRow, ContactMessageRow };


export async function getAdminFeatures(): Promise<HomeFeatureRow[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('home_features')
    .select('*')
    .order('display_order', { ascending: true })
    .order('created_at', { ascending: false });
  if (error || !data) return [];
  return data as unknown as HomeFeatureRow[];
}

export async function getAdminFeature(id: string): Promise<HomeFeatureRow | null> {
  const supabase = createClient();
  const { data } = await supabase.from('home_features').select('*').eq('id', id).maybeSingle();
  return (data as unknown as HomeFeatureRow) ?? null;
}

export async function getAdminStatistics(): Promise<HomeStatRow[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('home_statistics')
    .select('*')
    .order('display_order', { ascending: true })
    .order('created_at', { ascending: false });
  if (error || !data) return [];
  return data as unknown as HomeStatRow[];
}

export async function getAdminStatistic(id: string): Promise<HomeStatRow | null> {
  const supabase = createClient();
  const { data } = await supabase.from('home_statistics').select('*').eq('id', id).maybeSingle();
  return (data as unknown as HomeStatRow) ?? null;
}

// ── Product taxonomy: categories & industries (admin reads — all rows) ────────
async function readTaxonomy(table: 'product_categories' | 'product_industries'): Promise<ProductTaxonomyRow[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from(table)
    .select('*')
    .order('display_order', { ascending: true })
    .order('created_at', { ascending: false });
  if (error || !data) return [];
  return data as unknown as ProductTaxonomyRow[];
}
async function readTaxonomyOne(table: 'product_categories' | 'product_industries', id: string): Promise<ProductTaxonomyRow | null> {
  const supabase = createClient();
  const { data } = await supabase.from(table).select('*').eq('id', id).maybeSingle();
  return (data as unknown as ProductTaxonomyRow) ?? null;
}

export const getAdminCategories = () => readTaxonomy('product_categories');
export const getAdminCategory = (id: string) => readTaxonomyOne('product_categories', id);
export const getAdminIndustries = () => readTaxonomy('product_industries');
export const getAdminIndustry = (id: string) => readTaxonomyOne('product_industries', id);

/** {label,value} options for the product category <select>. */
export async function getCategoryOptions(): Promise<{ label: string; value: string }[]> {
  const cats = await readTaxonomy('product_categories');
  return cats.map((c) => ({ label: c.name, value: c.id }));
}
