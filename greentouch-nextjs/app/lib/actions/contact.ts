'use server';

import { createPublicClient } from '../supabase/public';
import { hasSupabaseEnv } from '../env';
import { contactSchema } from '../validations/schemas';
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
}

export async function submitContact(values: ContactFormValues): Promise<ContactResult> {
  const parsed = contactSchema.safeParse(values);
  if (!parsed.success) {
    const first = parsed.error.issues[0]?.message ?? 'Please check the form and try again.';
    return { success: false, message: first };
  }

  // Honeypot: a filled hidden field means a bot — pretend success, store nothing.
  if (parsed.data.website && parsed.data.website.length > 0) {
    return { success: true, message: 'Thank you for your message. We will get back to you shortly.' };
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
