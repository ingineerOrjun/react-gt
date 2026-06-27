'use client';

import React, { useEffect, useMemo, useRef, useState, useTransition } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useFormState, useFormStatus } from 'react-dom';
import {
  ImagePlus,
  Loader2,
  X,
  Wand2,
  Eye,
  Copy,
  Trash2,
  AlertCircle,
  Save,
  Check,
  Search,
  ChevronDown,
} from 'lucide-react';
import { cn } from '../../../lib/utils';
import { slugify } from '../../../lib/utils';
import { publicImageUrl } from '../../../lib/storage';
import { ICON_NAMES, resolveIcon } from '../../../lib/icon-map';
import type { ActionState, FormField } from './types';
import RichTextEditor from '../RichTextEditor';
import ConfirmDialog from './ConfirmDialog';

const initialState: ActionState = { error: null };

const inputClass =
  'w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-slate-900 transition focus:border-transparent focus:outline-none focus:ring-2 focus:ring-accent dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100';

export interface ResourceFormProps {
  fields: FormField[];
  action: (prev: ActionState, fd: FormData) => Promise<ActionState>;
  record?: Record<string, unknown>;
  basePath: string;
  labelSingular: string;
  createLabel: string;
  previewHref?: string;
  onDelete?: (id: string) => Promise<ActionState>;
  onDuplicate?: (id: string) => Promise<ActionState>;
  draftKey?: string;
  /** Options for `select` fields, keyed by field name. */
  fieldOptions?: Record<string, { label: string; value: string }[]>;
}

export default function ResourceForm({
  fields,
  action,
  record,
  basePath,
  labelSingular,
  createLabel,
  previewHref,
  onDelete,
  onDuplicate,
  draftKey,
  fieldOptions,
}: ResourceFormProps) {
  const router = useRouter();
  const [state, formAction] = useFormState(action, initialState);
  const editing = Boolean(record?.id);
  const formRef = useRef<HTMLFormElement>(null);

  const richField = fields.find((f) => f.type === 'richtext');
  const slugField = fields.find((f) => f.type === 'slug');
  const imageField = fields.find((f) => f.type === 'image');

  const [content, setContent] = useState((record?.[richField?.name ?? ''] as string) ?? '');
  const [slug, setSlug] = useState((record?.[slugField?.name ?? ''] as string) ?? '');
  const existingImageUrl =
    imageField?.imageBucket && record?.image_path
      ? publicImageUrl(imageField.imageBucket, record.image_path as string)
      : null;
  const [preview, setPreview] = useState<string | null>(existingImageUrl);
  const fileRef = useRef<HTMLInputElement>(null);

  const [dirty, setDirty] = useState(false);
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [savedAt, setSavedAt] = useState<string | null>(null);
  const [restored, setRestored] = useState(false);
  const [pendingAction, startAction] = useTransition();

  // ── unsaved-changes guard ──────────────────────────────────────────────────
  useEffect(() => {
    const onBeforeUnload = (e: BeforeUnloadEvent) => {
      if (dirty) {
        e.preventDefault();
        e.returnValue = '';
      }
    };
    window.addEventListener('beforeunload', onBeforeUnload);
    return () => window.removeEventListener('beforeunload', onBeforeUnload);
  }, [dirty]);

  // ── autosave draft (text fields + richtext) ────────────────────────────────
  const persistDraft = useMemo(() => {
    let t: ReturnType<typeof setTimeout>;
    return () => {
      if (!draftKey) return;
      clearTimeout(t);
      t = setTimeout(() => {
        if (!formRef.current) return;
        const fd = new FormData(formRef.current);
        const data: Record<string, string> = {};
        fields.forEach((f) => {
          if (f.type === 'image' || f.type === 'switch') return;
          const v = fd.get(f.name);
          if (typeof v === 'string') data[f.name] = v;
        });
        try {
          localStorage.setItem(draftKey, JSON.stringify({ data, savedAt: new Date().toISOString() }));
          setSavedAt(new Date().toLocaleTimeString());
        } catch {
          /* ignore quota */
        }
      }, 800);
    };
  }, [draftKey, fields]);

  // restore draft on mount
  useEffect(() => {
    if (!draftKey) return;
    try {
      const raw = localStorage.getItem(draftKey);
      if (!raw || !formRef.current) return;
      const parsed = JSON.parse(raw) as { data: Record<string, string> };
      Object.entries(parsed.data).forEach(([name, value]) => {
        const el = formRef.current!.elements.namedItem(name) as HTMLInputElement | null;
        if (el && 'value' in el) el.value = value;
        if (name === slugField?.name) setSlug(value);
        if (name === richField?.name) setContent(value);
      });
      setRestored(true);
      setDirty(true);
    } catch {
      /* ignore */
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const clearDraft = () => {
    if (draftKey) {
      try {
        localStorage.removeItem(draftKey);
      } catch {
        /* ignore */
      }
    }
  };

  const onAnyInput = (e: React.FormEvent<HTMLFormElement>) => {
    setDirty(true);
    const target = e.target as HTMLInputElement;
    if (target?.name && target.maxLength > 0) {
      setCounts((c) => ({ ...c, [target.name]: target.value.length }));
    }
    persistDraft();
  };

  const onPickImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setPreview(file ? URL.createObjectURL(file) : existingImageUrl);
    setDirty(true);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    // client-side required validation summary
    const fd = new FormData(e.currentTarget);
    const missing: string[] = [];
    fields.forEach((f) => {
      if (!f.required) return;
      const v = f.type === 'richtext' ? content : fd.get(f.name);
      if (!v || (typeof v === 'string' && v.trim() === '')) missing.push(f.label);
    });
    if (missing.length) {
      e.preventDefault();
      setValidationErrors(missing);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    setValidationErrors([]);
    setDirty(false); // allow navigation on the redirect
    clearDraft();
  };

  const runAction = (fn: () => Promise<ActionState>) => {
    startAction(async () => {
      const res = await fn();
      if (res?.error) setValidationErrors([res.error]);
      else router.refresh();
    });
  };

  const mainFields = fields.filter((f) => (f.group ?? 'main') === 'main');
  const seoFields = fields.filter((f) => f.group === 'seo');
  const metaFields = fields.filter((f) => f.group === 'meta');

  const renderField = (f: FormField) => {
    const initial = (record?.[f.name] as string | number | undefined) ?? undefined;
    const count = counts[f.name] ?? (typeof initial === 'string' ? initial.length : 0);

    switch (f.type) {
      case 'image':
        return (
          <div key={f.name}>
            <span className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-200">{f.label}</span>
            <div className="flex items-start gap-4">
              <div className={cn('relative flex shrink-0 items-center justify-center overflow-hidden rounded-lg border border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-800', f.imageAspect === 'video' ? 'h-24 w-40' : 'h-28 w-28')}>
                {preview ? (
                  <Image src={preview} alt="Preview" fill className={f.imageAspect === 'video' ? 'object-cover' : 'object-contain p-2'} unoptimized />
                ) : (
                  <ImagePlus className="h-8 w-8 text-slate-300 dark:text-slate-600" />
                )}
              </div>
              <div className="space-y-2">
                <input
                  ref={fileRef}
                  id={f.name}
                  name={f.name}
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/avif"
                  onChange={onPickImage}
                  className="block text-sm text-slate-600 file:mr-3 file:rounded-lg file:border-0 file:bg-green-50 file:px-4 file:py-2 file:text-green-700 hover:file:bg-green-100 dark:text-slate-300 dark:file:bg-green-900/40 dark:file:text-green-300"
                />
                <p className="text-xs text-slate-500 dark:text-slate-400">{f.helpText ?? 'JPEG, PNG, WebP or AVIF · max 5 MB.'}</p>
                {preview && (
                  <button
                    type="button"
                    onClick={() => {
                      if (fileRef.current) fileRef.current.value = '';
                      setPreview(null);
                      setDirty(true);
                    }}
                    className="inline-flex items-center gap-1 text-xs text-red-600 hover:underline dark:text-red-400"
                  >
                    <X className="h-3.5 w-3.5" /> Remove selection
                  </button>
                )}
              </div>
            </div>
          </div>
        );

      case 'icon':
        return <IconField key={f.name} name={f.name} label={f.label} defaultValue={(initial as string) ?? ''} onPick={() => setDirty(true)} />;

      case 'select': {
        const options = fieldOptions?.[f.name] ?? [];
        return (
          <div key={f.name}>
            <label htmlFor={f.name} className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-200">
              {f.label} {f.required && <span className="text-red-500">*</span>}
            </label>
            <select
              id={f.name}
              name={f.name}
              defaultValue={(initial as string) ?? ''}
              className={inputClass}
            >
              <option value="">{f.placeholder ?? '— None —'}</option>
              {options.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
            {f.helpText && <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{f.helpText}</p>}
          </div>
        );
      }

      case 'richtext':
        return (
          <div key={f.name}>
            <span className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-200">
              {f.label} {f.required && <span className="text-red-500">*</span>}
            </span>
            <input type="hidden" name={f.name} value={content} />
            <RichTextEditor
              value={content}
              onChange={(v) => {
                setContent(v);
                setDirty(true);
                persistDraft();
              }}
            />
          </div>
        );

      case 'slug':
        return (
          <div key={f.name}>
            <label htmlFor={f.name} className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-200">
              {f.label}
            </label>
            <div className="flex gap-2">
              <input
                id={f.name}
                name={f.name}
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder={f.placeholder ?? 'auto-generated'}
                className={inputClass}
              />
              <button
                type="button"
                onClick={() => {
                  const src = f.slugFrom
                    ? (formRef.current?.elements.namedItem(f.slugFrom) as HTMLInputElement | null)?.value
                    : '';
                  setSlug(slugify(src ?? ''));
                  setDirty(true);
                }}
                className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-slate-300 px-3 text-sm text-slate-600 transition-colors hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
              >
                <Wand2 className="h-4 w-4" /> Generate
              </button>
            </div>
            {f.helpText && <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{f.helpText}</p>}
          </div>
        );

      case 'switch':
        return (
          <label key={f.name} className="flex cursor-pointer items-center gap-3">
            <input
              type="checkbox"
              name={f.name}
              defaultChecked={(record?.[f.name] as boolean) ?? f.defaultChecked ?? false}
              onChange={() => setDirty(true)}
              className="h-5 w-5 rounded border-slate-300 text-green-600 focus:ring-accent"
            />
            <span className="text-sm font-medium text-slate-700 dark:text-slate-200">{f.label}</span>
          </label>
        );

      case 'number':
        return (
          <div key={f.name}>
            <label htmlFor={f.name} className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-200">
              {f.label}
            </label>
            <input id={f.name} name={f.name} type="number" min={f.min ?? 0} defaultValue={(initial as number) ?? 0} className={inputClass} />
            {f.helpText && <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{f.helpText}</p>}
          </div>
        );

      case 'textarea':
        return (
          <div key={f.name}>
            <label htmlFor={f.name} className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-200">
              {f.label} {f.required && <span className="text-red-500">*</span>}
            </label>
            <textarea id={f.name} name={f.name} rows={f.rows ?? 4} maxLength={f.maxLength} defaultValue={(initial as string) ?? ''} placeholder={f.placeholder} className={inputClass} />
            <div className="mt-1 flex justify-between">
              {f.helpText ? <p className="text-xs text-slate-500 dark:text-slate-400">{f.helpText}</p> : <span />}
              {f.maxLength && <span className="text-xs tabular-nums text-slate-400">{count}/{f.maxLength}</span>}
            </div>
          </div>
        );

      default: // text
        return (
          <div key={f.name}>
            <label htmlFor={f.name} className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-200">
              {f.label} {f.required && <span className="text-red-500">*</span>}
            </label>
            <input id={f.name} name={f.name} maxLength={f.maxLength} defaultValue={(initial as string) ?? ''} placeholder={f.placeholder} className={inputClass} />
            <div className="mt-1 flex justify-between">
              {f.helpText ? <p className="text-xs text-slate-500 dark:text-slate-400">{f.helpText}</p> : <span />}
              {f.maxLength && <span className="text-xs tabular-nums text-slate-400">{count}/{f.maxLength}</span>}
            </div>
          </div>
        );
    }
  };

  return (
    <form ref={formRef} action={formAction} onSubmit={handleSubmit} onInput={onAnyInput} className="pb-24">
      {editing && <input type="hidden" name="id" value={record!.id as string} />}

      {restored && (
        <div className="mb-4 flex items-center justify-between rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-800 dark:border-amber-800/60 dark:bg-amber-900/20 dark:text-amber-300">
          <span>Restored an unsaved draft.</span>
          <button type="button" onClick={() => { clearDraft(); window.location.reload(); }} className="font-medium underline">
            Discard draft
          </button>
        </div>
      )}

      {(state.error || validationErrors.length > 0) && (
        <div role="alert" className="mb-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700 dark:border-red-800 dark:bg-red-900/30 dark:text-red-300">
          <div className="flex items-center gap-2 font-medium">
            <AlertCircle className="h-4 w-4" />
            {state.error ? 'Could not save' : 'Please complete the required fields'}
          </div>
          {validationErrors.length > 0 && (
            <ul className="mt-1.5 list-inside list-disc pl-1">
              {validationErrors.map((m) => (
                <li key={m}>{m}</li>
              ))}
            </ul>
          )}
          {state.error && <p className="mt-1">{state.error}</p>}
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main panel */}
        <div className="space-y-6 lg:col-span-2">
          <div className="space-y-5 rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
            {mainFields.map(renderField)}
          </div>

          {/* Collapsible SEO section */}
          {seoFields.length > 0 && (
            <details className="group rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-2 rounded-2xl p-5 font-semibold text-slate-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent dark:text-slate-100">
                <span className="flex items-center gap-2">
                  <Search className="h-4 w-4 text-slate-400" />
                  Search engine optimization
                </span>
                <ChevronDown className="h-4 w-4 text-slate-400 transition-transform group-open:rotate-180" />
              </summary>
              <div className="space-y-5 border-t border-slate-100 p-5 dark:border-slate-800">
                {seoFields.map(renderField)}
              </div>
            </details>
          )}
        </div>

        {/* Meta sidebar */}
        <div className="space-y-6">
          <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">Status</h2>
            {metaFields.map(renderField)}
          </div>

          <div className="space-y-2 rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
            <h2 className="mb-1 text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">Actions</h2>
            {editing && previewHref && (
              <a href={previewHref} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800">
                <Eye className="h-4 w-4" /> Preview
              </a>
            )}
            {editing && onDuplicate && (
              <button type="button" onClick={() => runAction(() => onDuplicate(record!.id as string))} disabled={pendingAction} className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 disabled:opacity-60 dark:text-slate-300 dark:hover:bg-slate-800">
                <Copy className="h-4 w-4" /> Duplicate
              </button>
            )}
            {editing && onDelete && (
              <button type="button" onClick={() => setConfirmDelete(true)} className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20">
                <Trash2 className="h-4 w-4" /> Delete
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Floating save bar */}
      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-slate-200 bg-white/90 px-4 py-3 backdrop-blur dark:border-slate-800 dark:bg-slate-900/90 lg:pl-64">
        <div className="mx-auto flex max-w-6xl items-center gap-3">
          <div className="min-w-0 text-sm text-slate-500 dark:text-slate-400">
            {dirty ? (
              <span className="font-medium text-amber-600 dark:text-amber-400">Unsaved changes</span>
            ) : savedAt ? (
              <span className="inline-flex items-center gap-1 text-green-600 dark:text-green-400"><Check className="h-3.5 w-3.5" /> Draft autosaved {savedAt}</span>
            ) : (
              <span className="hidden sm:inline">{editing ? `Editing ${labelSingular}` : `New ${labelSingular}`}</span>
            )}
          </div>
          <div className="ml-auto flex items-center gap-2">
            <Link href={basePath} className="rounded-lg px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800">
              Cancel
            </Link>
            <SubmitButton label={editing ? 'Save changes' : createLabel} />
          </div>
        </div>
      </div>

      <ConfirmDialog
        open={confirmDelete}
        title={`Delete ${labelSingular}?`}
        message="This action cannot be undone."
        confirmLabel="Delete"
        destructive
        pending={pendingAction}
        onCancel={() => setConfirmDelete(false)}
        onConfirm={() => {
          if (!onDelete || !record?.id) return;
          setConfirmDelete(false);
          setDirty(false);
          clearDraft();
          startAction(async () => {
            const res = await onDelete(record.id as string);
            if (res?.error) setValidationErrors([res.error]);
            else router.push(basePath);
          });
        }}
      />
    </form>
  );
}

// Icon picker — select of registered icon names with a live preview tile.
function IconField({
  name,
  label,
  defaultValue,
  onPick,
}: {
  name: string;
  label: string;
  defaultValue: string;
  onPick: () => void;
}) {
  const [value, setValue] = useState(defaultValue || ICON_NAMES[0]);
  const Preview = resolveIcon(value);
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-200">
        {label}
      </label>
      <div className="flex items-center gap-3">
        <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green-100 text-green-600 dark:bg-green-900/40 dark:text-green-400">
          <Preview className="h-5 w-5" />
        </span>
        <select
          id={name}
          name={name}
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            onPick();
          }}
          className={cn(inputClass, 'max-w-xs')}
        >
          {ICON_NAMES.map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

function SubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex items-center justify-center gap-2 rounded-lg bg-green-600 px-6 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-green-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 disabled:opacity-70 dark:focus-visible:ring-offset-slate-900"
    >
      {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
      {label}
    </button>
  );
}
