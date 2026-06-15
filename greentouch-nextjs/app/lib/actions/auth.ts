'use server';

import { redirect } from 'next/navigation';
import { createClient } from '../supabase/server';
import { hasSupabaseEnv } from '../env';
import { loginSchema } from '../validations/schemas';

export type AuthState = { error: string | null };

export async function login(_prevState: AuthState, formData: FormData): Promise<AuthState> {
  if (!hasSupabaseEnv) {
    return { error: 'Supabase is not configured. Set the environment variables first.' };
  }

  const parsed = loginSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  });
  if (!parsed.success) {
    return { error: 'Please enter a valid email and password.' };
  }

  const supabase = createClient();
  const { error } = await supabase.auth.signInWithPassword(parsed.data);
  if (error) {
    return { error: 'Invalid credentials. Please try again.' };
  }

  redirect('/admin');
}

export async function logout(): Promise<void> {
  if (hasSupabaseEnv) {
    const supabase = createClient();
    await supabase.auth.signOut();
  }
  redirect('/admin/login');
}
