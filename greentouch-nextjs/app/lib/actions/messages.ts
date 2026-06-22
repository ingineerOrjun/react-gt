'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createClient } from '../supabase/server';
import { messageStatusSchema } from '../validations/schemas';

async function requireSupabase() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect('/admin/login');
  return supabase;
}

function revalidateMessages() {
  revalidatePath('/admin/messages');
  revalidatePath('/admin');
}

export async function updateMessageStatus(
  id: string,
  status: string
): Promise<{ error: string | null }> {
  const parsed = messageStatusSchema.safeParse(status);
  if (!parsed.success) return { error: 'Invalid status.' };

  const supabase = await requireSupabase();
  const { error } = await supabase
    .from('contact_messages')
    .update({ status: parsed.data } as never)
    .eq('id', id);
  if (error) return { error: 'Could not update status.' };

  revalidateMessages();
  return { error: null };
}

export async function deleteMessage(id: string): Promise<{ error: string | null }> {
  const supabase = await requireSupabase();
  const { error } = await supabase.from('contact_messages').delete().eq('id', id);
  if (error) return { error: 'Could not delete the message.' };

  revalidateMessages();
  return { error: null };
}
