'use client';

import React, { useState, useTransition } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Pencil, Trash2, Loader2, FileText } from 'lucide-react';
import { toggleBlogPublished, deleteBlog } from '../../lib/actions/blogs';
import type { AdminBlog } from '../../lib/queries/admin';

function PublishToggle({ id, published }: { id: string; published: boolean }) {
  const [on, setOn] = useState(published);
  const [pending, start] = useTransition();
  const flip = () => {
    const next = !on;
    setOn(next);
    start(async () => {
      const res = await toggleBlogPublished(id, next);
      if (res.error) setOn(!next);
    });
  };
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      aria-label={on ? 'Published' : 'Draft'}
      onClick={flip}
      disabled={pending}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors disabled:opacity-60 ${
        on ? 'bg-green-600' : 'bg-slate-300 dark:bg-slate-600'
      }`}
    >
      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${on ? 'translate-x-6' : 'translate-x-1'}`} />
    </button>
  );
}

function DeleteButton({ id, title }: { id: string; title: string }) {
  const [pending, start] = useTransition();
  const onDelete = () => {
    if (!window.confirm(`Delete “${title}”? This cannot be undone.`)) return;
    start(async () => {
      await deleteBlog(id);
    });
  };
  return (
    <button
      type="button"
      onClick={onDelete}
      disabled={pending}
      aria-label={`Delete ${title}`}
      className="p-2 rounded-lg text-slate-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors disabled:opacity-60"
    >
      {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
    </button>
  );
}

export default function BlogsTable({ blogs }: { blogs: AdminBlog[] }) {
  return (
    <div className="overflow-x-auto bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800">
            <th className="px-4 py-3 font-medium">Article</th>
            <th className="px-4 py-3 font-medium w-24">Order</th>
            <th className="px-4 py-3 font-medium w-32">Published</th>
            <th className="px-4 py-3 font-medium w-28 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
          {blogs.map((b) => (
            <tr key={b.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
              <td className="px-4 py-3">
                <div className="flex items-center gap-3">
                  <div className="relative h-12 w-16 shrink-0 rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                    {b.imageUrl ? (
                      <Image src={b.imageUrl} alt={b.title} fill className="object-cover" />
                    ) : (
                      <FileText className="h-5 w-5 text-slate-300 dark:text-slate-600" />
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="font-medium text-slate-900 dark:text-slate-100 truncate">{b.title}</p>
                    <p className="text-xs text-slate-400 truncate">/blog/{b.slug}</p>
                  </div>
                </div>
              </td>
              <td className="px-4 py-3 text-slate-600 dark:text-slate-300">{b.display_order}</td>
              <td className="px-4 py-3">
                <PublishToggle id={b.id} published={b.published} />
              </td>
              <td className="px-4 py-3">
                <div className="flex items-center justify-end gap-1">
                  <Link
                    href={`/admin/blogs/${b.id}/edit`}
                    aria-label={`Edit ${b.title}`}
                    className="p-2 rounded-lg text-slate-500 hover:text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors"
                  >
                    <Pencil className="h-4 w-4" />
                  </Link>
                  <DeleteButton id={b.id} title={b.title} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
