import React from 'react';
import { redirect } from 'next/navigation';
import type { Metadata } from 'next';
import AdminSidebar from '../../components/admin/AdminSidebar';
import { createClient } from '../../lib/supabase/server';
import { hasSupabaseEnv } from '../../lib/env';

export const metadata: Metadata = {
  title: { default: 'Admin', template: '%s · GreenTouch Admin' },
  robots: { index: false, follow: false },
};

// Always render dynamically — this area is user/session specific.
export const dynamic = 'force-dynamic';

export default async function PanelLayout({ children }: { children: React.ReactNode }) {
  if (!hasSupabaseEnv) redirect('/admin/login');

  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect('/admin/login');

  // Defense in depth on top of RLS: confirm the user has a staff profile.
  const { data: profile } = await supabase
    .from('profiles')
    .select('id')
    .eq('id', user.id)
    .maybeSingle();
  if (!profile) redirect('/admin/login');

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-slate-950">
      <AdminSidebar />
      <div className="flex-1 min-w-0">
        <main className="p-6 md:p-8 max-w-6xl mx-auto">{children}</main>
      </div>
    </div>
  );
}
