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
  // Product CMS (optional — present only when set; public falls back otherwise)
  shortDescription?: string | null;
  category?: string | null;
  seoTitle?: string | null;
  seoDescription?: string | null;
  seoKeywords?: string | null;
  ogImage?: string | null;
  canonicalUrl?: string | null;
  metaRobots?: string | null;
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

export async function getProductBySlug(slug: string): Promise<ProductView | null> {
  if (!hasSupabaseEnv) return null;
  try {
    const supabase = createPublicClient();
    const { data, error } = await supabase
      .from('products')
      .select(
        'id, slug, name, description, image_path, short_description, seo_title, seo_description, seo_keywords, og_image, canonical_url, meta_robots, category:product_categories(name)',
      )
      .eq('slug', slug)
      .eq('published', true)
      .maybeSingle();
    if (error || !data) return null;
    const p = data as unknown as ProductSelect & {
      short_description: string | null;
      seo_title: string | null;
      seo_description: string | null;
      seo_keywords: string | null;
      og_image: string | null;
      canonical_url: string | null;
      meta_robots: string | null;
      category: { name: string } | { name: string }[] | null;
    };
    const category = Array.isArray(p.category) ? p.category[0]?.name ?? null : p.category?.name ?? null;
    return {
      id: p.id,
      slug: p.slug,
      name: p.name,
      description: p.description,
      imageUrl: publicImageUrl('products', p.image_path),
      shortDescription: p.short_description ?? null,
      category,
      seoTitle: p.seo_title ?? null,
      seoDescription: p.seo_description ?? null,
      seoKeywords: p.seo_keywords ?? null,
      ogImage: p.og_image ?? null,
      canonicalUrl: p.canonical_url ?? null,
      metaRobots: p.meta_robots ?? null,
    };
  } catch {
    return null;
  }
}

export async function getProductSlugs(): Promise<string[]> {
  if (!hasSupabaseEnv) return [];
  try {
    const supabase = createPublicClient();
    const { data, error } = await supabase.from('products').select('slug').eq('published', true);
    if (error || !data) return [];
    return (data as unknown as Pick<ProductRow, 'slug'>[]).map((p) => p.slug);
  } catch {
    return [];
  }
}

export async function getRelatedProducts(slug: string, limit = 3): Promise<ProductView[]> {
  if (!hasSupabaseEnv) return [];
  try {
    const supabase = createPublicClient();
    const { data, error } = await supabase
      .from('products')
      .select('id, slug, name, description, image_path')
      .eq('published', true)
      .neq('slug', slug)
      .order('display_order', { ascending: true })
      .order('created_at', { ascending: false })
      .limit(limit);
    if (error || !data) return [];
    return (data as unknown as ProductSelect[]).map((p) => ({
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
