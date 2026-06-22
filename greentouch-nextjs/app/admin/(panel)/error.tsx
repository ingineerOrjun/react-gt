'use client';

import React, { useEffect } from 'react';
import { AlertTriangle, RotateCw } from 'lucide-react';

export default function AdminError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex items-center justify-center py-20">
      <div className="text-center max-w-md">
        <span className="inline-flex p-3 rounded-2xl bg-red-100 dark:bg-red-900/40 mb-4">
          <AlertTriangle className="h-8 w-8 text-red-600 dark:text-red-400" />
        </span>
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-2">
          This section failed to load
        </h2>
        <p className="text-slate-600 dark:text-slate-300 mb-6">
          Something went wrong while loading the admin content. You can retry.
        </p>
        <button
          onClick={reset}
          className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-medium px-5 py-2.5 rounded-lg transition-colors"
        >
          <RotateCw className="h-4 w-4" /> Try again
        </button>
      </div>
    </div>
  );
}
