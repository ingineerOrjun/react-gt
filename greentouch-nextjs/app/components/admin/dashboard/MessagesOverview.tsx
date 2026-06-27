import Link from 'next/link';
import { Inbox, Mail, ArrowUpRight } from 'lucide-react';
import { cn } from '../../../lib/utils';
import { DashCard, SectionTitle, EmptyState } from './primitives';
import { timeAgo, type DashboardData } from '../../../lib/queries/dashboard';

const STATUS: Record<string, string> = {
  new: 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300',
  read: 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300',
  responded: 'bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300',
  archived: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
};

// Section 4 — Messages overview: time-window counts + the latest 5 enquiries.
export default function MessagesOverview({ messages }: { messages: DashboardData['messages'] }) {
  const stats = [
    { label: 'Unread', value: messages.unread, highlight: messages.unread > 0 },
    { label: 'Today', value: messages.today },
    { label: 'This week', value: messages.week },
    { label: 'Last 30 days', value: messages.month },
  ];

  return (
    <DashCard className="h-full">
      <SectionTitle title="Messages" icon={Inbox} action={{ label: 'View all', href: '/admin/messages' }} />

      <div className="mb-5 grid grid-cols-4 gap-2">
        {stats.map((s) => (
          <div
            key={s.label}
            className={cn(
              'rounded-xl border px-2 py-3 text-center',
              s.highlight
                ? 'border-amber-200 bg-amber-50 dark:border-amber-800/50 dark:bg-amber-900/20'
                : 'border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-800/40',
            )}
          >
            <p className={cn('text-xl font-bold tabular-nums', s.highlight ? 'text-amber-700 dark:text-amber-300' : 'text-slate-900 dark:text-slate-100')}>{s.value}</p>
            <p className="mt-0.5 text-[11px] font-medium text-slate-500 dark:text-slate-400">{s.label}</p>
          </div>
        ))}
      </div>

      {messages.latest.length === 0 ? (
        <EmptyState icon={Mail} title="No enquiries yet" description="New messages from the contact form will land here." />
      ) : (
        <ul className="divide-y divide-slate-100 dark:divide-slate-800">
          {messages.latest.map((m) => (
            <li key={m.id}>
              <Link href="/admin/messages" className="group flex items-center gap-3 py-2.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent">
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-slate-900 dark:text-slate-100">{m.subject || m.name}</p>
                  <p className="truncate text-xs text-slate-500 dark:text-slate-400">
                    {m.name} · {m.email}
                  </p>
                </div>
                <span className={cn('shrink-0 rounded-full px-2 py-0.5 text-[11px] font-medium capitalize', STATUS[m.status] ?? STATUS.new)}>{m.status}</span>
                <span className="hidden shrink-0 text-xs tabular-nums text-slate-400 sm:inline">{timeAgo(m.created_at)}</span>
                <ArrowUpRight className="h-4 w-4 shrink-0 text-slate-300 opacity-0 transition-opacity group-hover:opacity-100" />
              </Link>
            </li>
          ))}
        </ul>
      )}
    </DashCard>
  );
}
