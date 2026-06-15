// Public read layer for the marketing site. Every query is resilient: if
// Supabase isn't configured yet or a request fails, it returns empty data so
// pages render their empty states instead of crashing the build/runtime.
//
// NOTE: the hand-authored Database generic isn't fully threaded by this
// supabase-js version, so query results widen to `never`. We cast each result
// to an explicit Pick<> of the row type to keep a real contract at the boundary.
// Replace database.types.ts with `supabase gen types` output to drop the casts.

import { createPublicClient } from '../supabase/public';
import { publicImageUrl } from '../storage';
import { hasSupabaseEnv } from '../env';
import { formatDate } from '../utils';
import type { ProductRow, BlogRow } from '../supabase/database.types';

export interface ProductView {
  id: string;
  slug: string;
  name: string;
  description: string;
  imageUrl: string | null;
}

export interface BlogCardView {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  imageUrl: string | null;
  date: string;
}

export interface BlogDetailView extends BlogCardView {
  content: string;
}

type ProductSelect = Pick<ProductRow, 'id' | 'slug' | 'name' | 'description' | 'image_path'>;
type BlogCardSelect = Pick<
  BlogRow,
  'id' | 'slug' | 'title' | 'excerpt' | 'image_path' | 'published_at' | 'created_at'
>;
type BlogDetailSelect = BlogCardSelect & Pick<BlogRow, 'content'>;

function toBlogCard(b: BlogCardSelect): BlogCardView {
  return {
    id: b.id,
    slug: b.slug,
    title: b.title,
    excerpt: b.excerpt,
    imageUrl: publicImageUrl('blogs', b.image_path),
    date: formatDate(b.published_at ?? b.created_at),
  };
}

export async function getPublishedProducts(limit?: number): Promise<ProductView[]> {
  if (!hasSupabaseEnv) return [];
  try {
    const supabase = createPublicClient();
    let query = supabase
      .from('products')
      .select('id, slug, name, description, image_path')
      .eq('published', true)
      .order('display_order', { ascending: true })
      .order('created_at', { ascending: false });
    if (limit) query = query.limit(limit);

    const { data, error } = await query;
    if (error || !data) return [];
    const rows = data as unknown as ProductSelect[];
    return rows.map((p) => ({
      id: p.id,
      slug: p.slug,
      name: p.name,
      description: p.description,
      imageUrl: publicImageUrl('products', p.image_path),
    }));
  } catch {
    return [];
  }
}

export async function getPublishedBlogs(): Promise<BlogCardView[]> {
  if (!hasSupabaseEnv) return [];
  try {
    const supabase = createPublicClient();
    const { data, error } = await supabase
      .from('blogs')
      .select('id, slug, title, excerpt, image_path, published_at, created_at')
      .eq('published', true)
      .order('display_order', { ascending: true })
      .order('published_at', { ascending: false });
    if (error || !data) return [];
    return (data as unknown as BlogCardSelect[]).map(toBlogCard);
  } catch {
    return [];
  }
}

export async function getPublishedBlogSlugs(): Promise<string[]> {
  if (!hasSupabaseEnv) return [];
  try {
    const supabase = createPublicClient();
    const { data, error } = await supabase.from('blogs').select('slug').eq('published', true);
    if (error || !data) return [];
    return (data as unknown as Pick<BlogRow, 'slug'>[]).map((b) => b.slug);
  } catch {
    return [];
  }
}

export async function getBlogBySlug(slug: string): Promise<BlogDetailView | null> {
  if (!hasSupabaseEnv) return null;
  try {
    const supabase = createPublicClient();
    const { data, error } = await supabase
      .from('blogs')
      .select('id, slug, title, excerpt, content, image_path, published_at, created_at')
      .eq('slug', slug)
      .eq('published', true)
      .maybeSingle();
    if (error || !data) return null;
    const row = data as unknown as BlogDetailSelect;
    return { ...toBlogCard(row), content: row.content };
  } catch {
    return null;
  }
}

export async function getRelatedBlogs(slug: string, limit = 3): Promise<BlogCardView[]> {
  if (!hasSupabaseEnv) return [];
  try {
    const supabase = createPublicClient();
    const { data, error } = await supabase
      .from('blogs')
      .select('id, slug, title, excerpt, image_path, published_at, created_at')
      .eq('published', true)
      .neq('slug', slug)
      .order('published_at', { ascending: false })
      .limit(limit);
    if (error || !data) return [];
    return (data as unknown as BlogCardSelect[]).map(toBlogCard);
  } catch {
    return [];
  }
}
