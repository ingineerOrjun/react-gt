import React from 'react';
import type { Metadata } from 'next';
import { Leaf } from 'lucide-react';
import LoginForm from './LoginForm';
import { hasSupabaseEnv } from '../../lib/env';

export const metadata: Metadata = {
  title: 'Admin Login',
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-slate-950 px-4">
      <div className="w-full max-w-md">
        <div className="flex items-center justify-center mb-6">
          <span className="inline-flex items-center justify-center h-11 w-11 rounded-lg bg-green-600 text-white mr-2.5">
            <Leaf className="h-6 w-6" strokeWidth={2.5} />
          </span>
          <span className="text-xl font-bold text-slate-900 dark:text-slate-100">
            Green<span className="text-green-600 dark:text-green-400">Touch</span> Admin
          </span>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-md p-6 md:p-8">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-1">Sign in</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
            Access the GreenTouch content management panel.
          </p>

          {!hasSupabaseEnv && (
            <div className="mb-5 text-sm bg-amber-50 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-300 p-3 rounded-lg">
              Supabase environment variables are not set yet. Configure{' '}
              <code>.env.local</code> to enable login.
            </div>
          )}

          <LoginForm />
        </div>
      </div>
    </div>
  );
}
