import React from 'react';

export default function BlogPostLoading() {
  return (
    <div className="bg-white dark:bg-slate-950" aria-busy="true" aria-label="Loading article">
      <div className="h-[50vh] min-h-[360px] w-full bg-slate-200 dark:bg-slate-900 animate-pulse" />
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="max-w-3xl mx-auto animate-pulse space-y-4">
          <div className="h-6 w-3/4 bg-slate-200 dark:bg-slate-800 rounded" />
          <div className="h-4 w-full bg-slate-200 dark:bg-slate-800 rounded" />
          <div className="h-4 w-full bg-slate-200 dark:bg-slate-800 rounded" />
          <div className="h-4 w-2/3 bg-slate-200 dark:bg-slate-800 rounded" />
        </div>
      </div>
    </div>
  );
}
