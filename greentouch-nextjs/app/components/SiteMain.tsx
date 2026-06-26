'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

// Applies the fixed-navbar top offset only on public pages, and gates the
// marketing footer the same way. Admin routes render their own chrome (sidebar),
// so they skip the offset, the marketing Navbar, and the Footer.
//
// The `footer` is a server-rendered element passed down from the layout; gating
// it here (reusing this existing client boundary) lets <Footer> stay a Server
// Component without forcing dynamic rendering via headers() in the layout.
//
// `usePathname()` resolves on the client only (it's empty during SSR here), so
// the admin hide is deferred until after mount: the server output and the first
// client render are identical (offset + footer present), avoiding any hydration
// mismatch. The admin sidebar layout covers the brief pre-mount state.
export default function SiteMain({
  children,
  footer,
  stickyBar,
}: {
  children: React.ReactNode;
  footer?: React.ReactNode;
  stickyBar?: React.ReactNode;
}) {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const hideChrome = mounted && pathname?.startsWith('/admin');

  return (
    <>
      <main id="main-content" className={`flex-grow ${hideChrome ? '' : 'pt-20'}`}>
        {children}
      </main>
      {!hideChrome && footer}
      {/* Global mobile conversion bar — same admin gate; hidden on lg+ via CSS. */}
      {!hideChrome && stickyBar}
    </>
  );
}
