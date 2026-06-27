import Link from 'next/link';
import { Package, FileText, Inbox, History } from 'lucide-react';
import { cn } from '../../../lib/utils';
import { DashCard, SectionTitle, EmptyState } from './primitives';
import { timeAgo, type ActivityItem } from '../../../lib/queries/dashboard';

const KIND = {
  product: { icon: Package, tone: 'bg-green-100 text-green-600 dark:bg-green-900/40 dark:text-green-400' },
  blog: { icon: FileText, tone: 'bg-sky-100 text-sky-600 dark:bg-sky-900/40 dark:text-sky-400' },
  message: { icon: Inbox, tone: 'bg-amber-100 text-amber-600 dark:bg-amber-900/40 dark:text-amber-400' },
} as const;

// Section 3 — Recent activity, derived from create/update timestamps. Server
// component; premium vertical timeline, newest first.
export default function ActivityTimeline({ items }: { items: ActivityItem[] }) {
  return (
    <DashCard className="h-full">
      <SectionTitle title="Recent activity" icon={History} />
      {items.length === 0 ? (
        <EmptyState icon={History} title="No activity yet" description="Product, blog and enquiry updates will appear here." />
      ) : (
        <ol className="relative space-y-1">
          {items.map((it, i) => {
            const k = KIND[it.kind];
            const Icon = k.icon;
            const last = i === items.length - 1;
            return (
              <li key={`${it.kind}-${it.href}-${i}`} className="relative flex gap-3 pb-1">
                {/* connector */}
                {!last && <span aria-hidden="true" className="absolute left-[15px] top-9 h-[calc(100%-1rem)] w-px bg-slate-200 dark:bg-slate-800" />}
                <span className={cn('z-[1] mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full ring-4 ring-white dark:ring-slate-900', k.tone)}>
                  <Icon className="h-4 w-4" />
                </span>
                <Link href={it.href} className="group min-w-0 flex-1 rounded-lg px-1 py-1.5 hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent dark:hover:bg-slate-800/50">
                  <p className="truncate text-sm font-medium text-slate-900 group-hover:text-green-700 dark:text-slate-100 dark:group-hover:text-green-400">{it.title}</p>
                  <p className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                    <span className="truncate">{it.meta}</span>
                    <span aria-hidden="true">·</span>
                    <span className="shrink-0 tabular-nums">{timeAgo(it.at)}</span>
                  </p>
                </Link>
              </li>
            );
          })}
        </ol>
      )}
    </DashCard>
  );
}
