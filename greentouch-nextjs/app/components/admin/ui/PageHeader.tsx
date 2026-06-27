import Link from 'next/link';
import { ArrowLeft, Plus } from 'lucide-react';

// Shared admin page chrome (server component) — one consistent header + back link
// across every CMS module.
export function AdminPageHeader({
  title,
  description,
  newHref,
  newLabel,
}: {
  title: string;
  description?: string;
  newHref?: string;
  newLabel?: string;
}) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">{title}</h1>
        {description && <p className="mt-0.5 text-sm text-slate-500 dark:text-slate-400">{description}</p>}
      </div>
      {newHref && (
        <Link
          href={newHref}
          className="inline-flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-green-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900"
        >
          <Plus className="h-4 w-4" /> {newLabel ?? 'New'}
        </Link>
      )}
    </div>
  );
}

export function BackLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="mb-4 inline-flex items-center text-sm text-slate-500 transition-colors hover:text-green-600 dark:text-slate-400 dark:hover:text-green-400"
    >
      <ArrowLeft className="mr-1.5 h-4 w-4" /> {label}
    </Link>
  );
}
