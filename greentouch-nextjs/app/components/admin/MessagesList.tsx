'use client';

import React, { useState, useTransition } from 'react';
import { Mail, Trash2, Loader2, ChevronDown, Inbox } from 'lucide-react';
import { updateMessageStatus, deleteMessage } from '../../lib/actions/messages';
import type { ContactMessageRow } from '../../lib/supabase/database.types';

const STATUSES = ['new', 'read', 'responded', 'archived'] as const;

const STATUS_STYLES: Record<string, string> = {
  new: 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300',
  read: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300',
  responded: 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300',
  archived: 'bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300',
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function MessageRow({ message, onRemoved }: { message: ContactMessageRow; onRemoved: (id: string) => void }) {
  const [status, setStatus] = useState(message.status);
  const [open, setOpen] = useState(false);
  const [pending, start] = useTransition();

  const changeStatus = (next: string) => {
    const prev = status;
    setStatus(next as ContactMessageRow['status']); // optimistic
    start(async () => {
      const res = await updateMessageStatus(message.id, next);
      if (res.error) setStatus(prev);
    });
  };

  const toggleOpen = () => {
    const next = !open;
    setOpen(next);
    if (next && status === 'new') changeStatus('read'); // mark read on first view
  };

  const onDelete = () => {
    if (!window.confirm('Delete this message? This cannot be undone.')) return;
    start(async () => {
      const res = await deleteMessage(message.id);
      if (!res.error) onRemoved(message.id);
    });
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
      <div className="flex items-center gap-3 p-4">
        <button
          type="button"
          onClick={toggleOpen}
          aria-expanded={open}
          className="flex-1 flex items-center gap-3 min-w-0 text-left"
        >
          <ChevronDown className={`h-4 w-4 text-slate-400 shrink-0 transition-transform ${open ? 'rotate-180' : ''}`} />
          <div className="min-w-0">
            <p className="font-medium text-slate-900 dark:text-slate-100 truncate">{message.subject}</p>
            <p className="text-sm text-slate-500 dark:text-slate-400 truncate">
              {message.name} · {formatDate(message.created_at)}
            </p>
          </div>
        </button>

        <span className={`shrink-0 hidden sm:inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${STATUS_STYLES[status]}`}>
          {status}
        </span>

        <select
          value={status}
          onChange={(e) => changeStatus(e.target.value)}
          disabled={pending}
          aria-label="Change status"
          className="shrink-0 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 px-2 py-1.5 capitalize focus:outline-none focus:ring-2 focus:ring-accent"
        >
          {STATUSES.map((s) => (
            <option key={s} value={s} className="capitalize">
              {s}
            </option>
          ))}
        </select>

        <button
          type="button"
          onClick={onDelete}
          disabled={pending}
          aria-label="Delete message"
          className="shrink-0 p-2 rounded-lg text-slate-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors disabled:opacity-60"
        >
          {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
        </button>
      </div>

      {open && (
        <div className="px-4 pb-4 pt-1 border-t border-slate-100 dark:border-slate-800 space-y-3">
          <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm">
            <span className="text-slate-500 dark:text-slate-400">
              From: <span className="text-slate-700 dark:text-slate-200">{message.name}</span>
            </span>
            <a href={`mailto:${message.email}`} className="inline-flex items-center gap-1 text-green-600 dark:text-green-400 hover:underline">
              <Mail className="h-3.5 w-3.5" /> {message.email}
            </a>
          </div>
          <p className="text-slate-700 dark:text-slate-300 whitespace-pre-wrap leading-relaxed">{message.message}</p>
          <a
            href={`mailto:${message.email}?subject=Re: ${encodeURIComponent(message.subject)}`}
            className="inline-flex items-center gap-1.5 text-sm bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 rounded-lg transition-colors"
          >
            <Mail className="h-3.5 w-3.5" /> Reply by email
          </a>
        </div>
      )}
    </div>
  );
}

export default function MessagesList({ messages }: { messages: ContactMessageRow[] }) {
  const [items, setItems] = useState(messages);
  const remove = (id: string) => setItems((cur) => cur.filter((m) => m.id !== id));

  if (items.length === 0) {
    return (
      <div className="text-center py-16 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl">
        <Inbox className="h-10 w-10 mx-auto mb-3 text-slate-300 dark:text-slate-600" />
        <p className="text-slate-600 dark:text-slate-300">No messages yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {items.map((m) => (
        <MessageRow key={m.id} message={m} onRemoved={remove} />
      ))}
    </div>
  );
}
