'use client';

import { useEffect, useRef } from 'react';
import { AlertTriangle, Loader2 } from 'lucide-react';
import { cn } from '../../../lib/utils';

export interface ConfirmDialogProps {
  open: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  destructive?: boolean;
  pending?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

// Reusable confirmation modal used across the admin for destructive/irreversible
// actions. Accessible: role=dialog, focus moves to the confirm button, Esc
// cancels, backdrop click cancels.
export default function ConfirmDialog({
  open,
  title,
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  destructive = false,
  pending = false,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  const confirmRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    confirmRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !pending) onCancel();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, pending, onCancel]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm"
      onClick={() => !pending && onCancel()}
    >
      <div
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="confirm-title"
        aria-describedby="confirm-message"
        className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-700 dark:bg-slate-900"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex gap-4">
          <span
            className={cn(
              'inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full',
              destructive
                ? 'bg-red-100 text-red-600 dark:bg-red-900/40 dark:text-red-400'
                : 'bg-green-100 text-green-600 dark:bg-green-900/40 dark:text-green-400',
            )}
          >
            <AlertTriangle className="h-5 w-5" />
          </span>
          <div className="min-w-0">
            <h2 id="confirm-title" className="text-lg font-semibold text-slate-900 dark:text-slate-100">
              {title}
            </h2>
            <p id="confirm-message" className="mt-1 text-sm text-slate-600 dark:text-slate-300">
              {message}
            </p>
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            disabled={pending}
            className="rounded-lg px-4 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 disabled:opacity-60 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            {cancelLabel}
          </button>
          <button
            ref={confirmRef}
            type="button"
            onClick={onConfirm}
            disabled={pending}
            className={cn(
              'inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-70 dark:focus-visible:ring-offset-slate-900',
              destructive
                ? 'bg-red-600 hover:bg-red-700 focus-visible:ring-red-500'
                : 'bg-green-600 hover:bg-green-700 focus-visible:ring-accent',
            )}
          >
            {pending && <Loader2 className="h-4 w-4 animate-spin" />}
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
