import Link from 'next/link';
import { Sparkles, Award, BarChart3, ArrowUpRight, ExternalLink } from 'lucide-react';
import { AdminPageHeader } from '../../../components/admin/ui/PageHeader';
import { getAdminFeatures, getAdminStatistics } from '../../../lib/queries/admin';

export const metadata = { title: 'Homepage' };

export default async function HomepageHub() {
  const [features, stats] = await Promise.all([getAdminFeatures(), getAdminStatistics()]);

  const cards = [
    { title: 'Section content', description: 'Hero, Why-Choose heading & final CTA copy.', href: '/admin/homepage/content', icon: Sparkles, meta: 'Hero · Why Choose · CTA' },
    { title: 'Why-Choose features', description: 'The reason cards shown on the homepage.', href: '/admin/homepage/features', icon: Award, meta: `${features.length} cards` },
    { title: 'Trust bar', description: 'Statistics / trust badges below the hero.', href: '/admin/homepage/statistics', icon: BarChart3, meta: `${stats.length} items` },
  ];

  return (
    <div>
      <AdminPageHeader title="Homepage" description="Manage every section of the public homepage." />

      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((c) => (
          <li key={c.href}>
            <Link
              href={c.href}
              className="group flex h-full flex-col rounded-3xl border border-slate-200 bg-white p-5 shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:shadow-card-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 motion-reduce:transition-none dark:border-slate-800 dark:bg-slate-900 dark:focus-visible:ring-offset-slate-950"
            >
              <div className="mb-3 flex items-center justify-between">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-green-100 text-green-600 dark:bg-green-900/40 dark:text-green-400">
                  <c.icon className="h-5 w-5" />
                </span>
                <ArrowUpRight className="h-4 w-4 text-slate-300 opacity-0 transition-opacity group-hover:opacity-100" />
              </div>
              <p className="font-semibold text-slate-900 dark:text-slate-100">{c.title}</p>
              <p className="mt-0.5 flex-1 text-sm text-slate-500 dark:text-slate-400">{c.description}</p>
              <p className="mt-3 text-xs font-medium text-slate-400">{c.meta}</p>
            </Link>
          </li>
        ))}
      </ul>

      <div className="mt-6">
        <a href="/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm font-medium text-green-600 hover:underline dark:text-green-400">
          <ExternalLink className="h-4 w-4" /> Preview the live homepage
        </a>
      </div>
    </div>
  );
}
