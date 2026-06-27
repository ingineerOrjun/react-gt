import Link from 'next/link';
import { Package, FileText, Activity, CheckCircle2, AlertTriangle } from 'lucide-react';
import { cn } from '../../../lib/utils';
import { DashCard, SectionTitle } from './primitives';
import type { IssueSignal, HealthSignal } from '../../../lib/queries/dashboard';

// Sections 5 & 6 — content health. Warning colours appear only when a real issue
// exists; a clean module shows a calm green "all good" state.
function HealthList({ title, icon, issues }: { title: string; icon: typeof Package; issues: IssueSignal[] }) {
  return (
    <DashCard className="h-full">
      <SectionTitle title={title} icon={icon} />
      {issues.length === 0 ? (
        <div className="flex items-center gap-3 rounded-xl bg-green-50 px-4 py-3 dark:bg-green-900/20">
          <CheckCircle2 className="h-5 w-5 shrink-0 text-green-600 dark:text-green-400" />
          <p className="text-sm font-medium text-green-800 dark:text-green-300">Everything looks healthy.</p>
        </div>
      ) : (
        <ul className="space-y-2">
          {issues.map((it) => (
            <li key={it.label}>
              <Link
                href={it.href}
                className="group flex items-center gap-3 rounded-xl border border-amber-200 bg-amber-50/60 px-3 py-2.5 transition-colors hover:bg-amber-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent dark:border-amber-800/50 dark:bg-amber-900/15 dark:hover:bg-amber-900/25"
              >
                <AlertTriangle className="h-4 w-4 shrink-0 text-amber-600 dark:text-amber-400" />
                <span className="flex-1 text-sm text-slate-700 dark:text-slate-200">{it.label}</span>
                <span className="rounded-full bg-amber-200/70 px-2 py-0.5 text-xs font-semibold tabular-nums text-amber-800 dark:bg-amber-800/40 dark:text-amber-200">{it.count}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </DashCard>
  );
}

export function ProductHealth({ issues }: { issues: IssueSignal[] }) {
  return <HealthList title="Product health" icon={Package} issues={issues} />;
}

export function BlogHealth({ issues }: { issues: IssueSignal[] }) {
  return <HealthList title="Blog health" icon={FileText} issues={issues} />;
}

// Section 7 — website health. Real env/runtime signals only; "neutral" means a
// capability isn't configured (informational), never a faked failure.
export function WebsiteHealth({ signals }: { signals: HealthSignal[] }) {
  return (
    <DashCard className="h-full scroll-mt-24" >
      <div id="website-health" />
      <SectionTitle title="Website health" icon={Activity} />
      <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        {signals.map((s) => (
          <li key={s.label} className="flex items-center gap-2.5 rounded-xl border border-slate-200 bg-slate-50/60 px-3 py-2.5 dark:border-slate-800 dark:bg-slate-800/40">
            <span className={cn('relative inline-flex h-2.5 w-2.5 shrink-0 rounded-full', s.status === 'ok' ? 'bg-green-500' : 'bg-slate-300 dark:bg-slate-600')}>
              {s.status === 'ok' && <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-60 motion-reduce:hidden" />}
            </span>
            <span className="flex-1 text-sm font-medium text-slate-700 dark:text-slate-200">{s.label}</span>
            <span className={cn('text-xs', s.status === 'ok' ? 'text-green-600 dark:text-green-400' : 'text-slate-400')}>{s.detail}</span>
          </li>
        ))}
      </ul>
    </DashCard>
  );
}
