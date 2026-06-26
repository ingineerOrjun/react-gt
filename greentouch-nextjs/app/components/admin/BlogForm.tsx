'use client';

import React, { useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useFormState, useFormStatus } from 'react-dom';
import { ImagePlus, Loader2, X, Wand2 } from 'lucide-react';
import { saveBlog, type BlogFormState } from '../../lib/actions/blogs';
import RichTextEditor from './RichTextEditor';
import type { BlogRow } from '../../lib/supabase/database.types';
import { publicImageUrl } from '../../lib/storage';
import { slugify } from '../../lib/utils';

const initialState: BlogFormState = { error: null };

function SubmitButton({ editing }: { editing: boolean }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 disabled:opacity-70 text-white font-medium px-6 py-2.5 rounded-lg transition-colors"
    >
      {pending && <Loader2 className="h-4 w-4 animate-spin" />}
      {editing ? 'Save changes' : 'Create article'}
    </button>
  );
}

const fieldClass =
  'w-full px-4 py-2.5 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition';

export default function BlogForm({ blog }: { blog?: BlogRow }) {
  const [state, formAction] = useFormState(saveBlog, initialState);
  const editing = Boolean(blog);
  const existingUrl = publicImageUrl('blogs', blog?.image_path);

  const [content, setContent] = useState(blog?.content ?? '');
  const [title, setTitle] = useState(blog?.title ?? '');
  const [slug, setSlug] = useState(blog?.slug ?? '');
  const [preview, setPreview] = useState<string | null>(existingUrl);
  const fileRef = useRef<HTMLInputElement>(null);

  const onPick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setPreview(file ? URL.createObjectURL(file) : existingUrl);
  };

  return (
    <form action={formAction} className="space-y-6 max-w-3xl">
      {blog && <input type="hidden" name="id" value={blog.id} />}
      <input type="hidden" name="content" value={content} />

      {state.error && (
        <div role="alert" className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 text-sm p-3 rounded-lg">
          {state.error}
        </div>
      )}

      <div>
        <label htmlFor="title" className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1.5">
          Title <span className="text-red-500">*</span>
        </label>
        <input
          id="title"
          name="title"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={fieldClass}
        />
      </div>

      <div>
        <label htmlFor="slug" className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1.5 mb-1.5">
          Slug
        </label>
        <div className="flex gap-2">
          <input
            id="slug"
            name="slug"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            placeholder="auto-generated-from-title"
            className={fieldClass}
          />
          <button
            type="button"
            onClick={() => setSlug(slugify(title))}
            className="shrink-0 inline-flex items-center gap-1.5 px-3 rounded-lg border border-slate-300 dark:border-slate-700 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <Wand2 className="h-4 w-4" /> Generate
          </button>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          URL: <span className="font-mono">/blog/{slug || 'your-slug'}</span> · leave blank to auto-generate.
        </p>
      </div>

      <div>
        <label htmlFor="excerpt" className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1.5">
          Excerpt <span className="text-red-500">*</span>
        </label>
        <textarea id="excerpt" name="excerpt" required rows={2} maxLength={300} defaultValue={blog?.excerpt} className={fieldClass} />
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Short summary shown on cards (max 300 chars).</p>
      </div>

      <div>
        <span className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1.5">
          Content <span className="text-red-500">*</span>
        </span>
        <RichTextEditor value={content} onChange={setContent} />
      </div>

      {/* Featured image */}
      <div>
        <span className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1.5">Featured image</span>
        <div className="flex items-start gap-4">
          <div className="relative h-24 w-40 shrink-0 rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 flex items-center justify-center">
            {preview ? (
              <Image src={preview} alt="Preview" fill className="object-cover" unoptimized />
            ) : (
              <ImagePlus className="h-7 w-7 text-slate-300 dark:text-slate-600" />
            )}
          </div>
          <div className="space-y-2">
            <input
              ref={fileRef}
              id="image"
              name="image"
              type="file"
              accept="image/jpeg,image/png,image/webp,image/avif"
              onChange={onPick}
              className="block text-sm text-slate-600 dark:text-slate-300 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-green-50 file:text-green-700 hover:file:bg-green-100 dark:file:bg-green-900/40 dark:file:text-green-300"
            />
            <p className="text-xs text-slate-500 dark:text-slate-400">JPEG, PNG, WebP or AVIF · max 5 MB.</p>
            {preview && (
              <button
                type="button"
                onClick={() => {
                  if (fileRef.current) fileRef.current.value = '';
                  setPreview(null);
                }}
                className="inline-flex items-center gap-1 text-xs text-red-600 dark:text-red-400 hover:underline"
              >
                <X className="h-3.5 w-3.5" /> Remove selection
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="display_order" className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1.5">
            Display order
          </label>
          <input id="display_order" name="display_order" type="number" min={0} defaultValue={blog?.display_order ?? 0} className={fieldClass} />
        </div>
        <div className="flex items-center">
          <label className="inline-flex items-center gap-3 cursor-pointer">
            <input type="checkbox" name="published" defaultChecked={blog?.published ?? false} className="h-5 w-5 rounded border-slate-300 text-green-600 focus:ring-accent" />
            <span className="text-sm font-medium text-slate-700 dark:text-slate-200">Published</span>
          </label>
        </div>
      </div>

      <div className="flex items-center gap-3 pt-2">
        <SubmitButton editing={editing} />
        <Link href="/admin/blogs" className="px-5 py-2.5 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
          Cancel
        </Link>
      </div>
    </form>
  );
}
