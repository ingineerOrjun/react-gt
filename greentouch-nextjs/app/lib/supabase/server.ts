// Server client (anon key + the logged-in user's session via cookies).
// Use in Server Components, Server Actions, and Route Handlers. RLS-enforced
// as the current user.
import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies } from 'next/headers';

type CookieToSet = { name: string; value: string; options: CookieOptions };
import { SUPABASE_URL, SUPABASE_ANON_KEY } from '../env';
import type { Database } from './database.types';

export function createClient() {
  const cookieStore = cookies();

  return createServerClient<Database>(SUPABASE_URL!, SUPABASE_ANON_KEY!, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet: CookieToSet[]) {
        // setAll throws in a Server Component render (read-only cookies); that's
        // fine — middleware refreshes the session, so we ignore it here.
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          );
        } catch {
          /* called from a Server Component — safe to ignore */
        }
      },
    },
  });
}
