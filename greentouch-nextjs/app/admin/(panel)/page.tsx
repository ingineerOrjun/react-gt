import { Suspense } from 'react';
import { Sparkles } from 'lucide-react';
import { getDashboardData } from '../../lib/queries/dashboard';
import KpiRow from '../../components/admin/dashboard/KpiRow';
import QuickActions from '../../components/admin/dashboard/QuickActions';
import ActivityTimeline from '../../components/admin/dashboard/ActivityTimeline';
import MessagesOverview from '../../components/admin/dashboard/MessagesOverview';
import { ProductHealth, BlogHealth, WebsiteHealth } from '../../components/admin/dashboard/HealthPanels';
import { CompanyInfo, ContentSummary } from '../../components/admin/dashboard/CompanyAndSummary';
import { SectionTitle } from '../../components/admin/dashboard/primitives';
import DataTable, { type DataRow } from '../../components/admin/ui/DataTable';
import { recentProductColumns, recentBlogColumns } from '../../components/admin/ui/specs';
import { toggleProductPublished } from '../../lib/actions/products';
import { toggleBlogPublished } from '../../lib/actions/blogs';

export const metadata = { title: 'Dashboard' };

export default function DashboardPage() {
  return (
    <div className="space-y-7">
      <DashboardHeader />
      <Suspense fallback={<DashboardSkeleton />}>
        {/* Streams once the parallel metric gather resolves. */}
        <DashboardContent />
      </Suspense>
    </div>
  );
}

function DashboardHeader() {
  const date = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
  return (
    <header className="rounded-3xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-6 shadow-card dark:border-slate-800 dark:from-slate-900 dark:to-slate-900/60 md:p-7">
      <span className="inline-flex items-center gap-1.5 rounded-full bg-green-100 px-2.5 py-1 text-xs font-semibold text-green-700 dark:bg-green-900/40 dark:text-green-300">
        <Sparkles className="h-3.5 w-3.5" /> Control center
      </span>
      <h1 className="mt-3 text-2xl font-bold text-slate-900 dark:text-slate-100 md:text-3xl">Welcome back</h1>
      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{date} · Greentouch Chemical Industries</p>
    </header>
  );
}

async function DashboardContent() {
  const data = await getDashboardData();

  return (
    <div className="space-y-7">
      {/* 1 — KPIs */}
      <KpiRow data={data} />

      {/* 2 — Quick actions */}
      <QuickActions />

      {/* 3 — Activity + Messages */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <ActivityTimeline items={data.activity} />
        <MessagesOverview messages={data.messages} />
      </div>

      {/* 5/6/7 — Content health + website health */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <ProductHealth issues={data.products.issues} />
        <BlogHealth issues={data.blogs.issues} />
        <WebsiteHealth signals={data.health} />
      </div>

      {/* 10 — Recent products */}
      <section aria-labelledby="recent-products">
        <SectionTitle title="Recent products" action={{ label: 'View all', href: '/admin/products' }} />
        <DataTable
          compact
          rows={data.products.recent as unknown as DataRow[]}
          columns={recentProductColumns}
          basePath="/admin/products"
          searchKeys={[]}
          labelSingular="product"
          labelPlural="products"
          emptyIconName="package"
          onTogglePublished={toggleProductPublished}
        />
      </section>

      {/* 11 — Recent blogs */}
      <section aria-labelledby="recent-blogs">
        <SectionTitle title="Recent blogs" action={{ label: 'View all', href: '/admin/blogs' }} />
        <DataTable
          compact
          rows={data.blogs.recent as unknown as DataRow[]}
          columns={recentBlogColumns}
          basePath="/admin/blogs"
          searchKeys={[]}
          labelSingular="article"
          labelPlural="articles"
          emptyIconName="file"
          onTogglePublished={toggleBlogPublished}
        />
      </section>

      {/* 8/9 — System / company information */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <CompanyInfo company={data.company} />
        <ContentSummary data={data} />
      </div>
    </div>
  );
}

function SkeletonCard({ className = '' }: { className?: string }) {
  return <div className={`animate-pulse rounded-3xl border border-slate-200 bg-slate-100/70 dark:border-slate-800 dark:bg-slate-800/40 ${className}`} />;
}

function DashboardSkeleton() {
  return (
    <div className="space-y-7" aria-hidden="true">
      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <SkeletonCard key={i} className="h-28" />
        ))}
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <SkeletonCard key={i} className="h-24" />
        ))}
      </div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <SkeletonCard className="h-64" />
        <SkeletonCard className="h-64" />
      </div>
    </div>
  );
}
