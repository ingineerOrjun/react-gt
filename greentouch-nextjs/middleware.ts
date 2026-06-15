import { NextResponse, type NextRequest } from 'next/server';
import { hasSupabaseEnv } from './app/lib/env';
import { updateSession } from './app/lib/supabase/middleware';

export async function middleware(request: NextRequest) {
  // Before Supabase is configured, don't block anything (and never crash).
  if (!hasSupabaseEnv) return NextResponse.next();
  return updateSession(request);
}

export const config = {
  // Only the admin area needs session handling; public pages stay untouched.
  matcher: ['/admin/:path*'],
};
