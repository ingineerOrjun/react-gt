import type { ReactNode } from 'react';
import { cn } from '../../lib/utils';

// ── Unified card foundation ──────────────────────────────────────────────────
// Single source of truth for card surfaces across the site. 24px radius
// (rounded-3xl), premium border, enterprise shadow, subtle elevated hover.
// Server Component; hover is pure CSS. Reused by IconCard / FeatureCard /
// StatCard and any section needing a surface.
export const cardBase =
  'rounded-3xl border border-slate-200/80 bg-white shadow-card transition-all duration-300 ease-out dark:border-slate-700/60 dark:bg-slate-800/60';

// Layered hover: gentle lift + deeper shadow + brand border-glow ring.
export const cardHover =
  'hover:-translate-y-1 hover:shadow-card-hover hover:border-green-300/70 hover:ring-1 hover:ring-green-500/10 dark:hover:border-green-700/60';

// Consistent premium icon tile (subtle gradient + ring) used by every variant.
export const cardIconTile =
  'inline-flex rounded-2xl bg-gradient-to-br from-green-50 to-green-100 text-green-600 ring-1 ring-green-200/70 transition-transform duration-300 ease-out group-hover:scale-105 dark:from-green-900/30 dark:to-green-900/50 dark:text-green-400 dark:ring-green-800/40';

export default function Card({
  children,
  className,
  hover = true,
}: {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}) {
  return <div className={cn(cardBase, hover && cardHover, className)}>{children}</div>;
}
