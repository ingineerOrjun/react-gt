import type { LucideIcon } from 'lucide-react';
import { cn } from '../../lib/utils';
import { cardBase, cardHover } from './Card';

// Qualitative trust-stat card (e.g. "24h" / "Response time", "Bulk" / "Supply").
// Uses the restrained gold accent for the icon — never fabricated numeric stats.
// Server Component.
export default function StatCard({
  value,
  label,
  icon: Icon,
  className,
}: {
  value: string;
  label: string;
  icon?: LucideIcon;
  className?: string;
}) {
  return (
    <div className={cn(cardBase, cardHover, 'group p-7 text-center', className)}>
      {Icon && (
        <span className="mx-auto mb-3 inline-flex rounded-2xl bg-premium/10 p-3 text-premium ring-1 ring-premium/25 transition-transform duration-300 group-hover:scale-105">
          <Icon className="h-6 w-6" />
        </span>
      )}
      <div className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
        {value}
      </div>
      <div className="mt-1 text-sm text-slate-500 dark:text-slate-400">{label}</div>
    </div>
  );
}
