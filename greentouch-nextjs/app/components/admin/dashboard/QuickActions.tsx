import Link from 'next/link';
import { Plus, PenSquare, Inbox, Settings, Image as ImageIcon, Tags, Factory, type LucideIcon } from 'lucide-react';
import { cn } from '../../../lib/utils';
import { SectionTitle } from './primitives';

interface Action {
  title: string;
  description: string;
  icon: LucideIcon;
  href?: string;
  soon?: boolean;
  accent?: boolean;
}

const ACTIONS: Action[] = [
  { title: 'New Product', description: 'Add a product to the catalog', icon: Plus, href: '/admin/products/new', accent: true },
  { title: 'New Blog Post', description: 'Write & publish an article', icon: PenSquare, href: '/admin/blogs/new', accent: true },
  { title: 'View Messages', description: 'Review customer enquiries', icon: Inbox, href: '/admin/messages' },
  { title: 'Website Settings', description: 'Brand, contact & socials', icon: Settings, soon: true },
  { title: 'Media Library', description: 'Manage images & uploads', icon: ImageIcon, soon: true },
  { title: 'Categories', description: 'Organize the catalog', icon: Tags, soon: true },
  { title: 'Industries', description: 'Sectors you serve', icon: Factory, soon: true },
];

// Section 2 — Quick Actions. Server component; live actions are focusable links,
// not-yet-built ones render disabled with a "Soon" pill (no broken links).
export default function QuickActions() {
  return (
    <section aria-labelledby="quick-actions">
      <SectionTitle title="Quick actions" />
      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {ACTIONS.map((a) => {
          const body = (
            <>
              <span
                className={cn(
                  'inline-flex h-10 w-10 items-center justify-center rounded-xl',
                  a.accent
                    ? 'bg-green-100 text-green-600 dark:bg-green-900/40 dark:text-green-400'
                    : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300',
                )}
              >
                <a.icon className="h-5 w-5" />
              </span>
              <span className="mt-3 flex items-center gap-1.5 font-semibold text-slate-900 dark:text-slate-100">
                {a.title}
                {a.soon && (
                  <span className="rounded-full bg-slate-100 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-slate-400 dark:bg-slate-800 dark:text-slate-500">
                    Soon
                  </span>
                )}
              </span>
              <span className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">{a.description}</span>
            </>
          );
          const base = 'flex h-full flex-col rounded-2xl border p-4 transition-all duration-300 motion-reduce:transition-none';
          return (
            <li key={a.title}>
              {a.soon || !a.href ? (
                <div className={cn(base, 'cursor-not-allowed border-dashed border-slate-200 bg-slate-50/50 opacity-70 dark:border-slate-800 dark:bg-slate-900/40')} aria-disabled="true">
                  {body}
                </div>
              ) : (
                <Link
                  href={a.href}
                  className={cn(base, 'border-slate-200 bg-white shadow-card hover:-translate-y-0.5 hover:shadow-card-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 motion-reduce:hover:translate-y-0 dark:border-slate-800 dark:bg-slate-900 dark:focus-visible:ring-offset-slate-950')}
                >
                  {body}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
