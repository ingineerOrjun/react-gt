'use client';

import React, { useState } from 'react';
import type { LucideIcon } from 'lucide-react';
import { cn } from '../../../lib/utils';

// Shared presentational form bits for the singleton editors (Settings + Homepage
// content). Keeps both forms DRY — one Section + Field definition.

export const inputClass =
  'w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 transition focus:border-transparent focus:outline-none focus:ring-2 focus:ring-accent dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100';

export function Section({
  title,
  description,
  icon: Icon,
  children,
}: {
  title: string;
  description?: string;
  icon: LucideIcon;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-card dark:border-slate-800 dark:bg-slate-900 md:p-6">
      <div className="mb-4 flex items-start gap-3">
        <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-green-100 text-green-600 dark:bg-green-900/40 dark:text-green-400">
          <Icon className="h-5 w-5" />
        </span>
        <div>
          <h2 className="font-semibold text-slate-900 dark:text-slate-100">{title}</h2>
          {description && <p className="text-sm text-slate-500 dark:text-slate-400">{description}</p>}
        </div>
      </div>
      <div className="space-y-4">{children}</div>
    </section>
  );
}

export function Field({
  label,
  name,
  defaultValue,
  type = 'text',
  required,
  textarea,
  rows = 3,
  maxLength,
  help,
  mono,
}: {
  label: string;
  name: string;
  defaultValue?: string;
  type?: string;
  required?: boolean;
  textarea?: boolean;
  rows?: number;
  maxLength?: number;
  help?: string;
  mono?: boolean;
}) {
  const [count, setCount] = useState(defaultValue?.length ?? 0);
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-200">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {textarea ? (
        <textarea
          id={name}
          name={name}
          rows={rows}
          required={required}
          maxLength={maxLength}
          defaultValue={defaultValue}
          onChange={(e) => setCount(e.target.value.length)}
          className={cn(inputClass, mono && 'font-mono text-xs leading-relaxed')}
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          required={required}
          maxLength={maxLength}
          defaultValue={defaultValue}
          onChange={(e) => setCount(e.target.value.length)}
          className={inputClass}
        />
      )}
      <div className="mt-1 flex justify-between gap-2">
        {help ? <p className="text-xs text-slate-500 dark:text-slate-400">{help}</p> : <span />}
        {maxLength && <span className="shrink-0 text-xs tabular-nums text-slate-400">{count}/{maxLength}</span>}
      </div>
    </div>
  );
}
