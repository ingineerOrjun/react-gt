import Link from 'next/link';
import { Package, CheckCircle2, FileEdit, FileText, Inbox, MailWarning, CalendarClock, ShieldCheck, ArrowUpRight, type LucideIcon } from 'lucide-react';
import { cn } from '../../../lib/utils';
import type { DashboardData } from '../../../lib/queries/dashboard';

interface Kpi {
  title: string;
  value: string | number;
  detail: string;
  icon: LucideIcon;
  href: string;
  tone?: 'default' | 'attention' | 'positive';
}

const tones = {
  default: 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300',
  positive: 'bg-green-100 text-green-600 dark:bg-green-900/40 dark:text-green-400',
  attention: 'bg-amber-100 text-amber-600 dark:bg-amber-900/40 dark:text-amber-400',
};

// Section 1 — Executive KPI cards. Server component; each card is a keyboard-
// focusable link with a calm hover lift and a reveal-on-hover action cue.
export default function KpiRow({ data }: { data: DashboardData }) {
  const { products, blogs, messages } = data;
  const pubRate = products.total ? Math.round((products.published / products.total) * 100) : 0;

  const kpis: Kpi[] = [
    { title: 'Total Products', value: products.total, detail: `${products.published} published`, icon: Package, href: '/admin/products' },
    { title: 'Published Products', value: products.published, detail: `${pubRate}% of catalog`, icon: CheckCircle2, href: '/admin/products', tone: 'positive' },
    { title: 'Draft Products', value: products.draft, detail: products.draft ? 'Awaiting publish' : 'All live', icon: FileEdit, href: '/admin/products', tone: products.draft ? 'attention' : 'default' },
    { title: 'Blog Posts', value: blogs.total, detail: `${blogs.published} published`, icon: FileText, href: '/admin/blogs' },
    { title: 'Messages', value: messages.total, detail: 'All-time enquiries', icon: Inbox, href: '/admin/messages' },
    { title: 'Unread Messages', value: messages.unread, detail: messages.unread ? 'Need a reply' : 'All caught up', icon: MailWarning, href: '/admin/messages', tone: messages.unread ? 'attention' : 'positive' },
    { title: "Today's Enquiries", value: messages.today, detail: 'In the last 24h', icon: CalendarClock, href: '/admin/messages' },
    { title: 'Website Status', value: 'Online', detail: 'All systems healthy', icon: ShieldCheck, href: '#website-health', tone: 'positive' },
  ];

  return (
    <ul className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
      {kpis.map((k) => (
        <li key={k.title}>
          <Link
            href={k.href}
            className="group flex h-full flex-col rounded-3xl border border-slate-200 bg-white p-4 shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:shadow-card-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 motion-reduce:transition-none motion-reduce:hover:translate-y-0 dark:border-slate-800 dark:bg-slate-900 dark:focus-visible:ring-offset-slate-950 md:p-5"
          >
            <div className="mb-3 flex items-center justify-between">
              <span className={cn('inline-flex h-9 w-9 items-center justify-center rounded-xl', tones[k.tone ?? 'default'])}>
                <k.icon className="h-5 w-5" />
              </span>
              <ArrowUpRight className="h-4 w-4 text-slate-300 opacity-0 transition-opacity group-hover:opacity-100 dark:text-slate-600" />
            </div>
            <p className="text-2xl font-bold tabular-nums text-slate-900 dark:text-slate-100 md:text-3xl">{k.value}</p>
            <p className="mt-0.5 text-sm font-medium text-slate-700 dark:text-slate-200">{k.title}</p>
            <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">{k.detail}</p>
          </Link>
        </li>
      ))}
    </ul>
  );
}
