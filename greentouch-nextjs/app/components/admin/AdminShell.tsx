'use client';

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  Leaf,
  Menu,
  X,
  PanelLeftClose,
  PanelLeftOpen,
  ChevronRight,
  Plus,
  ExternalLink,
  LogOut,
  Search,
  CornerDownLeft,
  CircleUser,
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { logout } from '../../lib/actions/auth';
import { ADMIN_NAV, ADMIN_DESTINATIONS, ADMIN_SEGMENT_LABELS } from './adminNav';

const STORAGE_KEY = 'gt-admin-sidebar-collapsed';

export default function AdminShell({
  children,
  userEmail,
}: {
  children: React.ReactNode;
  userEmail?: string | null;
}) {
  const pathname = usePathname() ?? '/admin';
  const router = useRouter();

  // Hydration-safe: read persisted collapse only after mount.
  const [mounted, setMounted] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      setCollapsed(localStorage.getItem(STORAGE_KEY) === '1');
    } catch {
      /* ignore */
    }
  }, []);

  const toggleCollapsed = useCallback(() => {
    setCollapsed((c) => {
      const next = !c;
      try {
        localStorage.setItem(STORAGE_KEY, next ? '1' : '0');
      } catch {
        /* ignore */
      }
      return next;
    });
  }, []);

  // Close the mobile drawer on navigation.
  useEffect(() => {
    setDrawerOpen(false);
    setPaletteOpen(false);
  }, [pathname]);

  // ⌘K / Ctrl+K opens the command palette; Esc closes overlays.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setPaletteOpen((o) => !o);
      } else if (e.key === 'Escape') {
        setPaletteOpen(false);
        setDrawerOpen(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const isActive = (href: string, exact?: boolean) =>
    exact ? pathname === href : pathname === href || pathname.startsWith(href + '/');

  const breadcrumbs = useMemo(() => {
    const segs = pathname.split('/').filter(Boolean); // ['admin', 'products', 'new']
    const crumbs: { label: string; href: string }[] = [];
    segs.forEach((seg, i) => {
      const href = '/' + segs.slice(0, i + 1).join('/');
      const label =
        ADMIN_SEGMENT_LABELS[seg] ??
        seg.charAt(0).toUpperCase() + seg.slice(1).replace(/-/g, ' ');
      crumbs.push({ label, href });
    });
    return crumbs;
  }, [pathname]);

  const sidebarWidth = collapsed ? 'lg:w-[76px]' : 'lg:w-64';

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* ───────── Sidebar (desktop fixed, mobile drawer) ───────── */}
      {drawerOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm lg:hidden"
          onClick={() => setDrawerOpen(false)}
          aria-hidden="true"
        />
      )}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-slate-200 bg-white transition-transform duration-300 dark:border-slate-800 dark:bg-slate-900 lg:translate-x-0',
          sidebarWidth,
          drawerOpen ? 'translate-x-0' : '-translate-x-full',
        )}
        aria-label="Admin navigation"
      >
        {/* Brand + collapse */}
        <div className="flex h-16 shrink-0 items-center gap-2 border-b border-slate-200 px-4 dark:border-slate-800">
          <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-green-600 to-green-700 text-white shadow-sm">
            <Leaf className="h-5 w-5" strokeWidth={2.4} />
          </span>
          {(!collapsed || drawerOpen) && (
            <div className="min-w-0 leading-tight">
              <p className="truncate text-sm font-bold text-slate-900 dark:text-slate-100">GreenTouch</p>
              <p className="truncate text-[11px] font-medium uppercase tracking-wide text-slate-400">
                Admin CMS
              </p>
            </div>
          )}
          <button
            type="button"
            onClick={() => setDrawerOpen(false)}
            className="ml-auto rounded-lg p-1.5 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 lg:hidden"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 space-y-5 overflow-y-auto px-3 py-4">
          {ADMIN_NAV.map((section, si) => (
            <div key={section.title ?? si}>
              {section.title && (!collapsed || drawerOpen) && (
                <p className="mb-1.5 px-3 text-[11px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                  {section.title}
                </p>
              )}
              <ul className="space-y-0.5">
                {section.items.map((item) => {
                  const Icon = item.icon;
                  const showLabel = !collapsed || drawerOpen;
                  const active = item.href ? isActive(item.href, item.exact) : false;
                  const inner = (
                    <>
                      <Icon
                        className={cn(
                          'h-[18px] w-[18px] shrink-0',
                          active ? 'text-green-700 dark:text-green-400' : '',
                        )}
                      />
                      {showLabel && <span className="truncate">{item.label}</span>}
                      {showLabel && item.soon && (
                        <span className="ml-auto rounded-full bg-slate-100 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-slate-400 dark:bg-slate-800 dark:text-slate-500">
                          Soon
                        </span>
                      )}
                    </>
                  );
                  const base = cn(
                    'group relative flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                    collapsed && !drawerOpen && 'justify-center',
                  );
                  if (item.soon || !item.href) {
                    return (
                      <li key={item.label}>
                        <span
                          title={collapsed && !drawerOpen ? `${item.label} (soon)` : undefined}
                          aria-disabled="true"
                          className={cn(base, 'cursor-not-allowed text-slate-400 dark:text-slate-600')}
                        >
                          {inner}
                        </span>
                      </li>
                    );
                  }
                  return (
                    <li key={item.label}>
                      <Link
                        href={item.href}
                        aria-current={active ? 'page' : undefined}
                        title={collapsed && !drawerOpen ? item.label : undefined}
                        className={cn(
                          base,
                          active
                            ? 'bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                            : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-slate-100',
                        )}
                      >
                        {/* Gold active indicator */}
                        {active && (
                          <span className="absolute inset-y-1.5 left-0 w-1 rounded-r-full bg-[#C8A24C]" aria-hidden="true" />
                        )}
                        {inner}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>

        {/* Footer: collapse toggle (desktop) + view site */}
        <div className="shrink-0 space-y-1 border-t border-slate-200 p-3 dark:border-slate-800">
          <Link
            href="/"
            target="_blank"
            className={cn(
              'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800',
              collapsed && !drawerOpen && 'justify-center',
            )}
          >
            <ExternalLink className="h-[18px] w-[18px] shrink-0" />
            {(!collapsed || drawerOpen) && 'View site'}
          </Link>
          <button
            type="button"
            onClick={toggleCollapsed}
            className={cn(
              'hidden w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 lg:flex',
              collapsed && 'justify-center',
            )}
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {collapsed ? <PanelLeftOpen className="h-[18px] w-[18px]" /> : <PanelLeftClose className="h-[18px] w-[18px]" />}
            {!collapsed && 'Collapse'}
          </button>
        </div>
      </aside>

      {/* ───────── Main column ───────── */}
      <div className={cn('flex min-h-screen flex-col transition-[padding] duration-300', collapsed ? 'lg:pl-[76px]' : 'lg:pl-64')}>
        {/* Topbar */}
        <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-slate-200 bg-white/80 px-4 backdrop-blur dark:border-slate-800 dark:bg-slate-900/80 md:px-6">
          <button
            type="button"
            onClick={() => setDrawerOpen(true)}
            className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 lg:hidden"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>

          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="hidden min-w-0 sm:block">
            <ol className="flex items-center gap-1.5 text-sm">
              {breadcrumbs.map((c, i) => {
                const last = i === breadcrumbs.length - 1;
                return (
                  <li key={c.href} className="flex items-center gap-1.5 min-w-0">
                    {i > 0 && <ChevronRight className="h-3.5 w-3.5 shrink-0 text-slate-300 dark:text-slate-600" />}
                    {last ? (
                      <span className="truncate font-semibold text-slate-900 dark:text-slate-100">{c.label}</span>
                    ) : (
                      <Link href={c.href} className="truncate text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200">
                        {c.label}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ol>
          </nav>

          <div className="ml-auto flex items-center gap-2">
            {/* Search / command palette trigger */}
            <button
              type="button"
              onClick={() => setPaletteOpen(true)}
              className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm text-slate-500 transition-colors hover:border-slate-300 hover:text-slate-700 dark:border-slate-700 dark:bg-slate-800/60 dark:text-slate-400 dark:hover:text-slate-200"
              aria-label="Search (Command or Control + K)"
            >
              <Search className="h-4 w-4" />
              <span className="hidden md:inline">Search…</span>
              <kbd className="hidden rounded border border-slate-300 bg-white px-1.5 font-mono text-[10px] text-slate-400 dark:border-slate-600 dark:bg-slate-900 md:inline">
                ⌘K
              </kbd>
            </button>

            {/* Quick create */}
            <Link
              href="/admin/products/new"
              className="inline-flex items-center gap-1.5 rounded-lg bg-green-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-green-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900"
            >
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">New</span>
            </Link>

            {/* User menu */}
            <UserMenu email={userEmail} />
          </div>
        </header>

        <main className="flex-1 p-4 md:p-8">
          <div className="mx-auto max-w-6xl">{children}</div>
        </main>
      </div>

      {/* ───────── Command palette ───────── */}
      {mounted && paletteOpen && (
        <CommandPalette onClose={() => setPaletteOpen(false)} onNavigate={(href) => router.push(href)} />
      )}
    </div>
  );
}

// ── User menu (account + sign out) ───────────────────────────────────────────
function UserMenu({ email }: { email?: string | null }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  const initial = (email?.trim()?.[0] ?? 'A').toUpperCase();

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-slate-700 to-slate-900 text-sm font-semibold text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900"
        aria-label="Account menu"
        aria-expanded={open}
      >
        {initial}
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-56 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg dark:border-slate-700 dark:bg-slate-900">
          <div className="flex items-center gap-2.5 border-b border-slate-100 px-3 py-3 dark:border-slate-800">
            <CircleUser className="h-5 w-5 shrink-0 text-slate-400" />
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-slate-900 dark:text-slate-100">{email ?? 'Signed in'}</p>
              <p className="text-xs text-slate-400">Administrator</p>
            </div>
          </div>
          <form action={logout}>
            <button
              type="submit"
              className="flex w-full items-center gap-2.5 px-3 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:bg-red-50 hover:text-red-600 dark:text-slate-300 dark:hover:bg-red-900/20 dark:hover:text-red-400"
            >
              <LogOut className="h-4 w-4" />
              Sign out
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

// ── Command palette (⌘K) — fuzzy filter over live destinations ────────────────
function CommandPalette({ onClose, onNavigate }: { onClose: () => void; onNavigate: (href: string) => void }) {
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return ADMIN_DESTINATIONS;
    return ADMIN_DESTINATIONS.filter((d) => d.label.toLowerCase().includes(q));
  }, [query]);

  useEffect(() => setActive(0), [query]);

  const go = (i: number) => {
    const item = results[i];
    if (item) {
      onNavigate(item.href);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-start justify-center bg-slate-900/50 p-4 pt-[12vh] backdrop-blur-sm" onClick={onClose}>
      <div
        role="dialog"
        aria-label="Command palette"
        className="w-full max-w-lg overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl dark:border-slate-700 dark:bg-slate-900"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 border-b border-slate-100 px-4 dark:border-slate-800">
          <Search className="h-4 w-4 shrink-0 text-slate-400" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'ArrowDown') {
                e.preventDefault();
                setActive((a) => Math.min(a + 1, results.length - 1));
              } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                setActive((a) => Math.max(a - 1, 0));
              } else if (e.key === 'Enter') {
                e.preventDefault();
                go(active);
              }
            }}
            placeholder="Search admin…"
            className="w-full bg-transparent py-3.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none dark:text-slate-100"
          />
        </div>
        <ul className="max-h-72 overflow-y-auto p-2">
          {results.length === 0 ? (
            <li className="px-3 py-6 text-center text-sm text-slate-400">No matches</li>
          ) : (
            results.map((d, i) => {
              const Icon = d.icon;
              return (
                <li key={d.href}>
                  <button
                    type="button"
                    onMouseEnter={() => setActive(i)}
                    onClick={() => go(i)}
                    className={cn(
                      'flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm',
                      i === active
                        ? 'bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-300'
                        : 'text-slate-600 dark:text-slate-300',
                    )}
                  >
                    <Icon className="h-4 w-4 shrink-0" />
                    <span className="flex-1 truncate font-medium">{d.label}</span>
                    {i === active && <CornerDownLeft className="h-3.5 w-3.5 text-slate-400" />}
                  </button>
                </li>
              );
            })
          )}
        </ul>
      </div>
    </div>
  );
}
