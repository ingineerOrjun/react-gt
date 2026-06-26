'use client';

import React, { useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useFormState, useFormStatus } from 'react-dom';
import { ImagePlus, Loader2, X } from 'lucide-react';
import { saveProduct, type ProductFormState } from '../../lib/actions/products';
import type { ProductRow } from '../../lib/supabase/database.types';
import { publicImageUrl } from '../../lib/storage';

const initialState: ProductFormState = { error: null };

function SubmitButton({ editing }: { editing: boolean }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 disabled:opacity-70 text-white font-medium px-6 py-2.5 rounded-lg transition-colors"
    >
      {pending && <Loader2 className="h-4 w-4 animate-spin" />}
      {editing ? 'Save changes' : 'Create product'}
    </button>
  );
}

const fieldClass =
  'w-full px-4 py-2.5 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition';

export default function ProductForm({ product }: { product?: ProductRow }) {
  const [state, formAction] = useFormState(saveProduct, initialState);
  const editing = Boolean(product);
  const existingUrl = publicImageUrl('products', product?.image_path);

  const [preview, setPreview] = useState<string | null>(existingUrl);
  const fileRef = useRef<HTMLInputElement>(null);

  const onPick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setPreview(file ? URL.createObjectURL(file) : existingUrl);
  };

  return (
    <form action={formAction} className="space-y-6 max-w-2xl">
      {product && <input type="hidden" name="id" value={product.id} />}

      {state.error && (
        <div role="alert" className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 text-sm p-3 rounded-lg">
          {state.error}
        </div>
      )}

      <div>
        <label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1.5">
          Name <span className="text-red-500">*</span>
        </label>
        <input id="name" name="name" required defaultValue={product?.name} className={fieldClass} />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1.5">
          Description <span className="text-red-500">*</span>
        </label>
        <textarea id="description" name="description" required rows={5} defaultValue={product?.description} className={fieldClass} />
      </div>

      {/* Image */}
      <div>
        <span className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1.5">Image</span>
        <div className="flex items-start gap-4">
          <div className="relative h-28 w-28 shrink-0 rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 flex items-center justify-center">
            {preview ? (
              <Image src={preview} alt="Preview" fill className="object-contain p-2" unoptimized />
            ) : (
              <ImagePlus className="h-8 w-8 text-slate-300 dark:text-slate-600" />
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
          <input
            id="display_order"
            name="display_order"
            type="number"
            min={0}
            defaultValue={product?.display_order ?? 0}
            className={fieldClass}
          />
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Lower numbers appear first.</p>
        </div>

        <div className="flex items-center">
          <label className="inline-flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              name="published"
              defaultChecked={product?.published ?? false}
              className="h-5 w-5 rounded border-slate-300 text-green-600 focus:ring-accent"
            />
            <span className="text-sm font-medium text-slate-700 dark:text-slate-200">Published</span>
          </label>
        </div>
      </div>

      <div className="flex items-center gap-3 pt-2">
        <SubmitButton editing={editing} />
        <Link
          href="/admin/products"
          className="px-5 py-2.5 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}
