// Skeleton shown while a product detail page streams/ISR-renders. Mirrors the
// top-of-page layout to avoid layout shift.
export default function ProductDetailLoading() {
  return (
    <main className="bg-white dark:bg-slate-950">
      <div className="container py-8 md:py-12">
        {/* Breadcrumb */}
        <div className="h-4 w-56 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />

        <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:gap-14">
          {/* Gallery */}
          <div className="aspect-square animate-pulse rounded-3xl bg-slate-200 dark:bg-slate-800" />

          {/* Info */}
          <div className="flex flex-col gap-4">
            <div className="h-6 w-40 animate-pulse rounded-full bg-slate-200 dark:bg-slate-800" />
            <div className="h-9 w-3/4 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
            <div className="space-y-2">
              <div className="h-4 w-full animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
              <div className="h-4 w-5/6 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
              <div className="h-4 w-2/3 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
            </div>
            <div className="mt-2 flex flex-wrap gap-2.5">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="h-8 w-32 animate-pulse rounded-full bg-slate-200 dark:bg-slate-800"
                />
              ))}
            </div>
            <div className="mt-4 flex flex-col gap-3 sm:flex-row">
              <div className="h-12 w-44 animate-pulse rounded-lg bg-slate-200 dark:bg-slate-800" />
              <div className="h-12 w-36 animate-pulse rounded-lg bg-slate-200 dark:bg-slate-800" />
            </div>
          </div>
        </div>
      </div>
      <span className="sr-only" role="status">
        Loading product…
      </span>
    </main>
  );
}
