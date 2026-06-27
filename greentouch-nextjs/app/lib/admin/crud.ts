// ─────────────────────────────────────────────────────────────────────────────
// Generic admin CRUD core. One implementation of the create/update/image/
// publish/delete/duplicate flow, parameterised by a ResourceConfig. Every CMS
// module (products, blogs, and future categories/industries/testimonials/etc.)
// reuses this — eliminating the per-resource action duplication.
//
// This is a server-only helper module (NOT a 'use server' action file). The thin
// 'use server' wrappers in app/lib/actions/*.ts bind a config to these helpers.
// ─────────────────────────────────────────────────────────────────────────────
import 'server-only';
import { revalidatePath, revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';
import { createClient } from '../supabase/server';
import { validateImage, buildObjectKey, type Bucket } from '../storage';
import type { ActionState } from '../../components/admin/ui/types';
import type { User } from '@supabase/supabase-js';

type DbClient = ReturnType<typeof createClient>;

export type ParseResult =
  | { ok: true; payload: Record<string, unknown> }
  | { ok: false; error: string };

export interface ResourceConfig {
  /** Supabase table name. */
  table: string;
  /** Storage bucket, when the resource has an image. */
  bucket?: Bucket;
  /** Admin base path, e.g. '/admin/products'. */
  basePath: string;
  /** Lowercase singular noun used in messages, e.g. 'product'. */
  labelSingular: string;
  /** Message shown on a unique-constraint violation. */
  dupMessage: string;
  /** Public paths to revalidate on every mutation. */
  revalidate: string[];
  /** Cache tags to revalidate (e.g. 'home-content' for cached homepage reads). */
  revalidateTags?: string[];
  /** Extra dynamic paths (e.g. `/blog/${slug}`) derived from the saved payload. */
  revalidateDynamic?: (payload: Record<string, unknown>) => string[];
  /** Validate + shape a submitted FormData into a column payload. */
  parse: (formData: FormData) => ParseResult;
  /** Build the insert payload for a duplicate from an existing row. */
  duplicateTransform?: (row: Record<string, unknown>) => Record<string, unknown>;
  /** Guard run before delete — return an error string to block (e.g. in use). */
  beforeDelete?: (supabase: DbClient, id: string) => Promise<string | null>;
}

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
const isDup = (e: { message?: string } | null | undefined) =>
  !!e?.message?.toLowerCase().includes('duplicate');

/** Shared permission layer (single-admin). Confirms an authenticated session. */
export async function requireUser() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect('/admin/login');
  return { supabase, user };
}

function revalidate(config: ResourceConfig, payload?: Record<string, unknown>) {
  revalidatePath(config.basePath);
  config.revalidate.forEach((p) => revalidatePath(p));
  config.revalidateTags?.forEach((t) => revalidateTag(t));
  if (payload && config.revalidateDynamic) {
    config.revalidateDynamic(payload).forEach((p) => revalidatePath(p));
  }
}

// Resilient audit trail — never fails the mutation it records.
async function logActivity(
  supabase: DbClient,
  user: User,
  entity: string,
  action: string,
  detail?: { field?: string; old?: string; new?: string },
) {
  try {
    await supabase.from('activity_log').insert({
      actor_id: user.id,
      actor_email: user.email ?? null,
      entity,
      action,
      field: detail?.field ?? null,
      old_value: detail?.old ?? null,
      new_value: detail?.new ?? null,
    } as never);
  } catch {
    /* audit is best-effort */
  }
}

/**
 * Create or update a row. The presence of `id` in the FormData switches to
 * update mode. On create we insert first (so the image can be foldered under the
 * new id) and roll the row back if the image upload fails. Redirects on success.
 */
export async function saveResource(
  config: ResourceConfig,
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const { supabase, user } = await requireUser();

  const id = (formData.get('id') as string) || null;
  const parsed = config.parse(formData);
  if (!parsed.ok) return { error: parsed.error };
  const payload = parsed.payload;
  const published = Boolean(payload.published);
  const nowIso = new Date().toISOString();

  // Existing row (for image replacement + published_at preservation).
  let existing: Record<string, unknown> | null = null;
  if (id) {
    const { data } = await supabase.from(config.table).select('*').eq('id', id).maybeSingle();
    existing = (data as Record<string, unknown> | null) ?? null;
    if (!existing) return { error: `${cap(config.labelSingular)} not found.` };
  }

  // Insert first when creating.
  let rowId = id;
  if (!rowId) {
    const insertPayload = {
      ...payload,
      published_at: published ? nowIso : null,
      created_by: user.id,
    };
    const { data, error } = await supabase
      .from(config.table)
      .insert(insertPayload as never)
      .select('id')
      .single();
    if (error || !data) {
      return { error: isDup(error) ? config.dupMessage : `Could not create the ${config.labelSingular}.` };
    }
    rowId = (data as unknown as { id: string }).id;
  }

  // Optional image upload — roll a freshly created row back on failure.
  let imagePath = (existing?.image_path as string | null) ?? null;
  if (config.bucket) {
    const justCreated = !id;
    const file = formData.get('image') as File | null;
    if (file && file.size > 0) {
      const invalid = validateImage(file);
      if (invalid) {
        if (justCreated) await supabase.from(config.table).delete().eq('id', rowId!);
        return { error: invalid };
      }
      const key = buildObjectKey(rowId!, file.name);
      const { error: upErr } = await supabase.storage
        .from(config.bucket)
        .upload(key, file, { contentType: file.type, upsert: false });
      if (upErr) {
        if (justCreated) await supabase.from(config.table).delete().eq('id', rowId!);
        return { error: 'Image upload failed. Please try again.' };
      }
      if (imagePath && imagePath !== key) {
        await supabase.storage.from(config.bucket).remove([imagePath]);
      }
      imagePath = key;
    }
  }

  // Update (covers both create-then-attach-image and edits).
  const updatePayload: Record<string, unknown> = {
    ...payload,
    published_at: published ? ((existing?.published_at as string | null) ?? nowIso) : null,
  };
  if (config.bucket) updatePayload.image_path = imagePath;
  const { error: updErr } = await supabase
    .from(config.table)
    .update(updatePayload as never)
    .eq('id', rowId!);
  if (updErr) {
    return { error: isDup(updErr) ? config.dupMessage : `Could not save the ${config.labelSingular}.` };
  }

  await logActivity(supabase, user, config.table, id ? 'update' : 'create', {
    field: String(payload.name ?? payload.title ?? payload.label ?? ''),
  });
  revalidate(config, payload);
  redirect(config.basePath);
}

export async function toggleResource(
  config: ResourceConfig,
  id: string,
  published: boolean,
): Promise<ActionState> {
  const { supabase, user } = await requireUser();
  const { error } = await supabase
    .from(config.table)
    .update({ published, published_at: published ? new Date().toISOString() : null } as never)
    .eq('id', id);
  if (error) return { error: 'Could not update status.' };
  await logActivity(supabase, user, config.table, published ? 'publish' : 'unpublish');
  revalidate(config);
  return { error: null };
}

export async function deleteResource(config: ResourceConfig, id: string): Promise<ActionState> {
  const { supabase, user } = await requireUser();

  if (config.beforeDelete) {
    const block = await config.beforeDelete(supabase, id);
    if (block) return { error: block };
  }

  let imagePath: string | null = null;
  if (config.bucket) {
    const { data } = await supabase.from(config.table).select('image_path').eq('id', id).maybeSingle();
    imagePath = (data as unknown as { image_path: string | null } | null)?.image_path ?? null;
  }

  const { error } = await supabase.from(config.table).delete().eq('id', id);
  if (error) return { error: `Could not delete the ${config.labelSingular}.` };

  if (config.bucket && imagePath) await supabase.storage.from(config.bucket).remove([imagePath]);
  await logActivity(supabase, user, config.table, 'delete');
  revalidate(config);
  return { error: null };
}

export async function duplicateResource(config: ResourceConfig, id: string): Promise<ActionState> {
  const { supabase, user } = await requireUser();
  const { data: row } = await supabase.from(config.table).select('*').eq('id', id).maybeSingle();
  if (!row) return { error: `${cap(config.labelSingular)} not found.` };

  const base = config.duplicateTransform
    ? config.duplicateTransform(row as Record<string, unknown>)
    : (row as Record<string, unknown>);
  const insertPayload: Record<string, unknown> = {
    ...base,
    published: false,
    published_at: null,
    image_path: null,
    created_by: user.id,
  };
  delete insertPayload.id;
  delete insertPayload.created_at;
  delete insertPayload.updated_at;

  const { error } = await supabase.from(config.table).insert(insertPayload as never);
  if (error) {
    return { error: isDup(error) ? config.dupMessage : `Could not duplicate the ${config.labelSingular}.` };
  }
  await logActivity(supabase, user, config.table, 'duplicate');
  revalidate(config);
  return { error: null };
}

// ── Bulk actions (operate on a set of ids) ───────────────────────────────────
export async function bulkSetPublished(
  config: ResourceConfig,
  ids: string[],
  published: boolean,
): Promise<ActionState> {
  if (ids.length === 0) return { error: null };
  const { supabase, user } = await requireUser();
  const { error } = await supabase
    .from(config.table)
    .update({ published, published_at: published ? new Date().toISOString() : null } as never)
    .in('id', ids);
  if (error) return { error: 'Could not update the selected items.' };
  await logActivity(supabase, user, config.table, published ? 'bulk_publish' : 'bulk_unpublish', { new: String(ids.length) });
  revalidate(config);
  return { error: null };
}

export async function bulkDelete(config: ResourceConfig, ids: string[]): Promise<ActionState> {
  if (ids.length === 0) return { error: null };
  const { supabase, user } = await requireUser();

  if (config.bucket) {
    const { data } = await supabase.from(config.table).select('image_path').in('id', ids);
    const paths = ((data as unknown as { image_path: string | null }[]) ?? [])
      .map((r) => r.image_path)
      .filter((p): p is string => !!p);
    if (paths.length) await supabase.storage.from(config.bucket).remove(paths);
  }

  const { error } = await supabase.from(config.table).delete().in('id', ids);
  if (error) return { error: 'Could not delete the selected items.' };
  await logActivity(supabase, user, config.table, 'bulk_delete', { new: String(ids.length) });
  revalidate(config);
  return { error: null };
}
