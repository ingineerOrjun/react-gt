'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import * as Sentry from '@sentry/nextjs';
import { AlertTriangle, RotateCw } from 'lucide-react';

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    Sentry.captureException(error);
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4 bg-gray-50 dark:bg-slate-950">
      <div className="text-center max-w-md">
        <span className="inline-flex p-3 rounded-2xl bg-red-100 dark:bg-red-900/40 mb-4">
          <AlertTriangle className="h-8 w-8 text-red-600 dark:text-red-400" />
        </span>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">
          Something went wrong
        </h1>
        <p className="text-slate-600 dark:text-slate-300 mb-6">
          An unexpected error occurred while loading this page. Please try again.
        </p>
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={reset}
            className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-medium px-5 py-2.5 rounded-lg transition-colors"
          >
            <RotateCw className="h-4 w-4" /> Try again
          </button>
          <Link
            href="/"
            className="px-5 py-2.5 rounded-lg font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}
