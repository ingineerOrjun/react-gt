'use server';

import { headers } from 'next/headers';
import { createPublicClient } from '../supabase/public';
import { hasSupabaseEnv } from '../env';
import { contactSchema } from '../validations/schemas';
import { contactRatelimit } from '../rate-limit';
import { verifyTurnstile } from '../turnstile';
import type { Database } from '../supabase/database.types';

type ContactInsert = Database['public']['Tables']['contact_messages']['Insert'];

export interface ContactResult {
  success: boolean;
  message: string;
}

export interface ContactFormValues {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  subject: string;
  message: string;
  website?: string; // honeypot
  turnstileToken?: string; // Cloudflare Turnstile
}

/** Best-effort client IP from proxy headers (Vercel sets x-forwarded-for). */
function getClientIp(): string {
  const h = headers();
  const xff = h.get('x-forwarded-for');
  if (xff) return xff.split(',')[0]!.trim();
  return h.get('x-real-ip') ?? '127.0.0.1';
}

export async function submitContact(values: ContactFormValues): Promise<ContactResult> {
  const parsed = contactSchema.safeParse(values);
  if (!parsed.success) {
    const first = parsed.error.issues[0]?.message ?? 'Please check the form and try again.';
    return { success: false, message: first };
  }

  // ── Layer 1: honeypot ──────────────────────────────────────────────────────
  // A filled hidden field means a bot — pretend success, store nothing, and skip
  // the (paid) downstream checks entirely.
  if (parsed.data.website && parsed.data.website.length > 0) {
    return { success: true, message: 'Thank you for your message. We will get back to you shortly.' };
  }

  const ip = getClientIp();

  // ── Layer 2: rate limit (Upstash) ──────────────────────────────────────────
  // 5 requests / 10 minutes per IP. Inert when Upstash isn't configured.
  if (contactRatelimit) {
    const { success } = await contactRatelimit.limit(ip);
    if (!success) {
      return {
        success: false,
        message: 'You have sent too many messages. Please wait a few minutes and try again.',
      };
    }
  }

  // ── Layer 3: Turnstile (Cloudflare) ────────────────────────────────────────
  // Verified server-side. Inert when Turnstile isn't configured.
  const human = await verifyTurnstile(parsed.data.turnstileToken, ip);
  if (!human) {
    return {
      success: false,
      message: 'Security verification failed. Please complete the check and try again.',
    };
  }

  if (!hasSupabaseEnv) {
    return {
      success: false,
      message: 'Messaging is not available right now. Please email us directly.',
    };
  }

  try {
    const supabase = createPublicClient();
    // RLS allows anonymous INSERT with status defaulting to 'new'. Only the four
    // schema columns are persisted (phone/company are UI-only).
    const payload: ContactInsert = {
      name: parsed.data.name,
      email: parsed.data.email,
      subject: parsed.data.subject,
      message: parsed.data.message,
    };
    // NOTE: the hand-authored Database generic isn't fully threaded by this
    // supabase-js version, so the insert param widens to `never`. Cast through —
    // replace database.types.ts with `supabase gen types` output to restore typing.
    const { error } = await supabase.from('contact_messages').insert(payload as never);
    if (error) {
      return { success: false, message: 'Failed to submit the form. Please try again later.' };
    }
    return {
      success: true,
      message: 'Thank you for your message. We will get back to you shortly.',
    };
  } catch {
    return { success: false, message: 'An unexpected error occurred. Please try again later.' };
  }
}
