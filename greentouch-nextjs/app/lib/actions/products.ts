'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createClient } from '../supabase/server';
import { productSchema } from '../validations/schemas';
import { slugify } from '../utils';
import { validateImage, buildObjectKey } from '../storage';
import type { ProductRow } from '../supabase/database.types';

export type ProductFormState = { error: string | null };

const BUCKET = 'products';

function revalidateProducts() {
  revalidatePath('/admin/products');
  revalidatePath('/products');
  revalidatePath('/');
}

async function requireUser() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect('/admin/login');
  return { supabase, user };
}

/**
 * Create or update a product. `id` in the form switches to update mode.
 * Used with useFormState — returns { error } on failure, redirects on success.
 */
export async function saveProduct(
  _prev: ProductFormState,
  formData: FormData
): Promise<ProductFormState> {
  const { supabase, user } = await requireUser();

  const id = (formData.get('id') as string) || null;
  const name = String(formData.get('name') ?? '').trim();

  const parsed = productSchema.safeParse({
    name,
    slug: slugify(name),
    description: formData.get('description'),
    published: formData.get('published') ? true : false,
    display_order: formData.get('display_order') ?? 0,
  });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? 'Please check the form.' };
  }

  // Existing row (for image replacement + published_at transitions)
  let existing: ProductRow | null = null;
  if (id) {
    const { data } = await supabase.from('products').select('*').eq('id', id).maybeSingle();
    existing = (data as unknown as ProductRow) ?? null;
    if (!existing) return { error: 'Product not found.' };
  }

  // Resolve the target product id (insert first if creating, so we can fold the
  // image under its folder and keep storage tidy).
  let productId = id;
  if (!productId) {
    const insertPayload = {
      name: parsed.data.name,
      slug: parsed.data.slug,
      description: parsed.data.description,
      published: parsed.data.published,
      published_at: parsed.data.published ? new Date().toISOString() : null,
      display_order: parsed.data.display_order,
      created_by: user.id,
    };
    const { data, error } = await supabase
      .from('products')
      .insert(insertPayload as never)
      .select('id')
      .single();
    if (error || !data) {
      return { error: error?.message?.includes('duplicate') ? 'A product with this name already exists.' : 'Could not create the product.' };
    }
    productId = (data as unknown as { id: string }).id;
  }

  // Handle image upload (optional)
  let imagePath = existing?.image_path ?? null;
  const file = formData.get('image') as File | null;
  if (file && file.size > 0) {
    const invalid = validateImage(file);
    if (invalid) return { error: invalid };
    const key = buildObjectKey(productId!, file.name);
    const { error: upErr } = await supabase.storage
      .from(BUCKET)
      .upload(key, file, { contentType: file.type, upsert: false });
    if (upErr) return { error: 'Image upload failed. Please try again.' };
    if (imagePath && imagePath !== key) {
      await supabase.storage.from(BUCKET).remove([imagePath]);
    }
    imagePath = key;
  }

  // Update the row (covers both the create-then-attach-image case and edits)
  const updatePayload = {
    name: parsed.data.name,
    slug: parsed.data.slug,
    description: parsed.data.description,
    published: parsed.data.published,
    published_at: parsed.data.published
      ? existing?.published_at ?? new Date().toISOString()
      : null,
    display_order: parsed.data.display_order,
    image_path: imagePath,
  };
  const { error: updErr } = await supabase
    .from('products')
    .update(updatePayload as never)
    .eq('id', productId!);
  if (updErr) {
    return { error: updErr.message.includes('duplicate') ? 'A product with this name already exists.' : 'Could not save the product.' };
  }

  revalidateProducts();
  redirect('/admin/products');
}

export async function toggleProductPublished(id: string, published: boolean): Promise<{ error: string | null }> {
  const { supabase } = await requireUser();
  const { error } = await supabase
    .from('products')
    .update({ published, published_at: published ? new Date().toISOString() : null } as never)
    .eq('id', id);
  if (error) return { error: 'Could not update status.' };
  revalidateProducts();
  return { error: null };
}

export async function deleteProduct(id: string): Promise<{ error: string | null }> {
  const { supabase } = await requireUser();

  // Look up the image so we can clean up storage after the row is gone.
  const { data } = await supabase.from('products').select('image_path').eq('id', id).maybeSingle();
  const imagePath = (data as unknown as { image_path: string | null } | null)?.image_path ?? null;

  const { error } = await supabase.from('products').delete().eq('id', id);
  if (error) return { error: 'Could not delete the product.' };

  if (imagePath) {
    await supabase.storage.from(BUCKET).remove([imagePath]);
  }

  revalidateProducts();
  return { error: null };
}
