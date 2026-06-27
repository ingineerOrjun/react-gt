import { MapPin, Phone, Mail, Building2, PieChart, Lock } from 'lucide-react';
import { DashCard, SectionTitle, ProgressBar } from './primitives';
import type { DashboardData } from '../../../lib/queries/dashboard';

// Section 8 — company information (from site_settings when populated, otherwise
// the canonical real-data constants). Edit lands in Settings (Phase 3).
export function CompanyInfo({ company }: { company: DashboardData['company'] }) {
  return (
    <DashCard className="h-full">
      <SectionTitle title="Company information" icon={Building2} />
      <p className="text-base font-semibold text-slate-900 dark:text-slate-100">{company.name}</p>

      <dl className="mt-4 space-y-3 text-sm">
        <div className="flex items-start gap-2.5">
          <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
          <dd className="text-slate-600 dark:text-slate-300">{company.address}</dd>
        </div>
        <div className="flex items-center gap-2.5">
          <Phone className="h-4 w-4 shrink-0 text-slate-400" />
          <dd className="text-slate-600 dark:text-slate-300">
            <a href={`tel:${company.phone}`} className="hover:text-green-600 dark:hover:text-green-400">{company.phoneDisplay}</a>
          </dd>
        </div>
        <div className="flex items-center gap-2.5">
          <Mail className="h-4 w-4 shrink-0 text-slate-400" />
          <dd className="truncate text-slate-600 dark:text-slate-300">
            <a href={`mailto:${company.email}`} className="hover:text-green-600 dark:hover:text-green-400">{company.email}</a>
          </dd>
        </div>
      </dl>

      <div className="mt-4">
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">Service areas</p>
        <ul className="flex flex-wrap gap-1.5">
          {company.serviceAreas.map((c) => (
            <li key={c} className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-600 dark:border-slate-700 dark:bg-slate-800/60 dark:text-slate-300">
              {c}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-5 flex items-center gap-2 border-t border-slate-100 pt-4 dark:border-slate-800">
        <span className="inline-flex items-center gap-1.5 rounded-lg bg-slate-100 px-3 py-1.5 text-sm font-medium text-slate-400 dark:bg-slate-800 dark:text-slate-500" title="Editing company info arrives with Settings">
          <Lock className="h-3.5 w-3.5" /> Edit in Settings
          <span className="rounded-full bg-slate-200 px-1.5 py-0.5 text-[10px] font-semibold uppercase text-slate-500 dark:bg-slate-700 dark:text-slate-400">Soon</span>
        </span>
      </div>
    </DashCard>
  );
}

// Section 9 — content summary as elegant CSS progress bars (no chart libs).
export function ContentSummary({ data }: { data: DashboardData }) {
  const { products, blogs } = data;
  const productImages = products.total - products.missingImage;
  const blogImages = blogs.total - blogs.missingImage;

  return (
    <DashCard className="h-full">
      <SectionTitle title="Content summary" icon={PieChart} />
      <div className="space-y-4">
        <ProgressBar label="Products published" value={products.published} total={products.total} />
        <ProgressBar label="Blogs published" value={blogs.published} total={blogs.total} />
        <ProgressBar label="Product images complete" value={productImages} total={products.total} />
        <ProgressBar label="Blog covers complete" value={blogImages} total={blogs.total} />
      </div>
    </DashCard>
  );
}
