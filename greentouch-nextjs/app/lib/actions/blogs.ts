'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createClient } from '../supabase/server';
import { blogSchema } from '../validations/schemas';
import { slugify } from '../utils';
import { sanitizeHtml } from '../sanitize';
import { validateImage, buildObjectKey } from '../storage';
import type { BlogRow } from '../supabase/database.types';

export type BlogFormState = { error: string | null };

const BUCKET = 'blogs';

function revalidateBlogs(slug?: string) {
  revalidatePath('/admin/blogs');
  revalidatePath('/blog');
  revalidatePath('/');
  if (slug) revalidatePath(`/blog/${slug}`);
}

async function requireUser() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect('/admin/login');
  return { supabase, user };
}

export async function saveBlog(_prev: BlogFormState, formData: FormData): Promise<BlogFormState> {
  const { supabase, user } = await requireUser();

  const id = (formData.get('id') as string) || null;
  const title = String(formData.get('title') ?? '').trim();
  const rawSlug = String(formData.get('slug') ?? '').trim();
  const slug = rawSlug ? slugify(rawSlug) : slugify(title);
  const content = sanitizeHtml(String(formData.get('content') ?? ''));

  const parsed = blogSchema.safeParse({
    title,
    slug,
    excerpt: formData.get('excerpt'),
    content,
    published: formData.get('published') ? true : false,
    display_order: formData.get('display_order') ?? 0,
  });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? 'Please check the form.' };
  }

  let existing: BlogRow | null = null;
  if (id) {
    const { data } = await supabase.from('blogs').select('*').eq('id', id).maybeSingle();
    existing = (data as unknown as BlogRow) ?? null;
    if (!existing) return { error: 'Article not found.' };
  }

  let blogId = id;
  if (!blogId) {
    const insertPayload = {
      title: parsed.data.title,
      slug: parsed.data.slug,
      excerpt: parsed.data.excerpt,
      content: parsed.data.content,
      published: parsed.data.published,
      published_at: parsed.data.published ? new Date().toISOString() : null,
      display_order: parsed.data.display_order,
      created_by: user.id,
    };
    const { data, error } = await supabase
      .from('blogs')
      .insert(insertPayload as never)
      .select('id')
      .single();
    if (error || !data) {
      return {
        error: error?.message?.includes('duplicate')
          ? 'An article with this slug already exists.'
          : 'Could not create the article.',
      };
    }
    blogId = (data as unknown as { id: string }).id;
  }

  // Featured image (optional)
  let imagePath = existing?.image_path ?? null;
  const file = formData.get('image') as File | null;
  if (file && file.size > 0) {
    const invalid = validateImage(file);
    if (invalid) return { error: invalid };
    const key = buildObjectKey(blogId!, file.name);
    const { error: upErr } = await supabase.storage
      .from(BUCKET)
      .upload(key, file, { contentType: file.type, upsert: false });
    if (upErr) return { error: 'Image upload failed. Please try again.' };
    if (imagePath && imagePath !== key) {
      await supabase.storage.from(BUCKET).remove([imagePath]);
    }
    imagePath = key;
  }

  const updatePayload = {
    title: parsed.data.title,
    slug: parsed.data.slug,
    excerpt: parsed.data.excerpt,
    content: parsed.data.content,
    published: parsed.data.published,
    published_at: parsed.data.published
      ? existing?.published_at ?? new Date().toISOString()
      : null,
    display_order: parsed.data.display_order,
    image_path: imagePath,
  };
  const { error: updErr } = await supabase
    .from('blogs')
    .update(updatePayload as never)
    .eq('id', blogId!);
  if (updErr) {
    return {
      error: updErr.message.includes('duplicate')
        ? 'An article with this slug already exists.'
        : 'Could not save the article.',
    };
  }

  revalidateBlogs(parsed.data.slug);
  redirect('/admin/blogs');
}

export async function toggleBlogPublished(
  id: string,
  published: boolean
): Promise<{ error: string | null }> {
  const { supabase } = await requireUser();
  const { error } = await supabase
    .from('blogs')
    .update({ published, published_at: published ? new Date().toISOString() : null } as never)
    .eq('id', id);
  if (error) return { error: 'Could not update status.' };
  revalidateBlogs();
  return { error: null };
}

export async function deleteBlog(id: string): Promise<{ error: string | null }> {
  const { supabase } = await requireUser();
  const { data } = await supabase.from('blogs').select('image_path').eq('id', id).maybeSingle();
  const imagePath = (data as unknown as { image_path: string | null } | null)?.image_path ?? null;

  const { error } = await supabase.from('blogs').delete().eq('id', id);
  if (error) return { error: 'Could not delete the article.' };

  if (imagePath) {
    await supabase.storage.from(BUCKET).remove([imagePath]);
  }
  revalidateBlogs();
  return { error: null };
}
