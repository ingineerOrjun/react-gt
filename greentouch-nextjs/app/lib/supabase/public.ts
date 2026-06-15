// Cookie-less anon client for PUBLIC reads (no session needed). Safe to use in
// cached/ISR Server Components — does not touch cookies, so it doesn't opt the
// route out of static optimization.
import { createClient as createSupabaseClient } from '@supabase/supabase-js';
import { SUPABASE_URL, SUPABASE_ANON_KEY } from '../env';
import type { Database } from './database.types';

export function createPublicClient() {
  return createSupabaseClient<Database>(SUPABASE_URL!, SUPABASE_ANON_KEY!, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
