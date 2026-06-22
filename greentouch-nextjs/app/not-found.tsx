import React from 'react';
import Link from 'next/link';
import { Leaf } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 bg-gray-50 dark:bg-slate-950">
      <div className="text-center max-w-md">
        <span className="inline-flex items-center justify-center h-12 w-12 rounded-xl bg-green-600 text-white mb-5">
          <Leaf className="h-7 w-7" strokeWidth={2.5} />
        </span>
        <p className="text-5xl font-bold text-green-700 dark:text-green-400 mb-2">404</p>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">Page not found</h1>
        <p className="text-slate-600 dark:text-slate-300 mb-6">
          The page you&apos;re looking for doesn&apos;t exist or has moved.
        </p>
        <Link
          href="/"
          className="inline-flex items-center px-5 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
        >
          Back to home
        </Link>
      </div>
    </div>
  );
}
