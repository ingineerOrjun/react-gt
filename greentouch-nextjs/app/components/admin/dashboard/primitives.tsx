import Link from 'next/link';
import type { ReactNode } from 'react';
import { ArrowRight, type LucideIcon } from 'lucide-react';
import { cn } from '../../../lib/utils';

// Shared dashboard surface — premium card on the design tokens (24px radius,
// soft layered shadow, calm hover). Server component.
export function DashCard({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <div
      className={cn(
        'rounded-3xl border border-slate-200 bg-white p-5 shadow-card dark:border-slate-800 dark:bg-slate-900 md:p-6',
        className,
      )}
    >
      {children}
    </div>
  );
}

export function SectionTitle({
  title,
  icon: Icon,
  action,
}: {
  title: string;
  icon?: LucideIcon;
  action?: { label: string; href: string };
}) {
  return (
    <div className="mb-4 flex items-center justify-between gap-3">
      <h2 className="flex items-center gap-2 text-base font-semibold text-slate-900 dark:text-slate-100">
        {Icon && <Icon className="h-4 w-4 text-slate-400" />}
        {title}
      </h2>
      {action && (
        <Link
          href={action.href}
          className="inline-flex items-center gap-1 rounded text-sm font-medium text-green-600 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-accent dark:text-green-400"
        >
          {action.label}
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      )}
    </div>
  );
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
}: {
  icon: LucideIcon;
  title: string;
  description?: string;
  action?: { label: string; href: string };
}) {
  return (
    <div className="flex flex-col items-center justify-center px-4 py-10 text-center">
      <span className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-400 dark:bg-slate-800 dark:text-slate-500">
        <Icon className="h-6 w-6" />
      </span>
      <p className="font-medium text-slate-700 dark:text-slate-200">{title}</p>
      {description && <p className="mt-1 max-w-xs text-sm text-slate-500 dark:text-slate-400">{description}</p>}
      {action && (
        <Link
          href={action.href}
          className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-green-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900"
        >
          {action.label}
        </Link>
      )}
    </div>
  );
}

export function ProgressBar({ label, value, total }: { label: string; value: number; total: number }) {
  const pct = total > 0 ? Math.round((value / total) * 100) : 0;
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between text-sm">
        <span className="text-slate-600 dark:text-slate-300">{label}</span>
        <span className="font-medium tabular-nums text-slate-500 dark:text-slate-400">
          {value}/{total} · {pct}%
        </span>
      </div>
      <div
        className="h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800"
        role="progressbar"
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label}
      >
        <div
          className="h-full rounded-full bg-gradient-to-r from-green-500 to-green-600 transition-[width] duration-500 motion-reduce:transition-none"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
