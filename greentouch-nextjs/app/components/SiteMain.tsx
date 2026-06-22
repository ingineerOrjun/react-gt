'use client';

import React from 'react';
import { usePathname } from 'next/navigation';

// Applies the fixed-navbar top offset only on public pages. Admin routes render
// their own chrome (sidebar), so they skip the offset and the marketing Navbar.
export default function SiteMain({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin');

  return (
    <main id="main-content" className={`flex-grow ${isAdmin ? '' : 'pt-20'}`}>
      {children}
    </main>
  );
}
