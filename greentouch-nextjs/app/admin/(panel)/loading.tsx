import React from 'react';

// Shown while any admin panel route's server component is fetching.
export default function AdminLoading() {
  return (
    <div className="animate-pulse" aria-busy="true" aria-label="Loading">
      <div className="h-8 w-48 bg-slate-200 dark:bg-slate-800 rounded mb-6" />
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
        {[0, 1, 2].map((i) => (
          <div key={i} className="h-28 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl" />
        ))}
      </div>
      <div className="space-y-3">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="h-16 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl" />
        ))}
      </div>
    </div>
  );
}
