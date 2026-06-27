'use client';

import React, { useCallback, useMemo, useRef, useState, useTransition } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  Search,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Pencil,
  Trash2,
  Copy,
  Loader2,
  Download,
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight,
  Package,
  FileText,
  ImageIcon,
  Tags,
  Factory,
  Inbox,
  X,
} from 'lucide-react';
import { cn } from '../../../lib/utils';
import { resolveIcon } from '../../../lib/icon-map';
import type { ActionState, ColumnSpec, FilterSpec } from './types';
import ConfirmDialog from './ConfirmDialog';

export type DataRow = Record<string, unknown> & { id: string };
type Row = DataRow;

const ICONS = { package: Package, file: FileText, image: ImageIcon, tag: Tags, factory: Factory } as const;

export interface DataTableProps {
  rows: Row[];
  columns: ColumnSpec[];
  basePath: string;
  searchKeys: string[];
  searchPlaceholder?: string;
  filters?: FilterSpec[];
  labelSingular: string;
  labelPlural: string;
  emptyIconName?: keyof typeof ICONS;
  pageSize?: number;
  /** Embed as a widget: hides the toolbar (search/filter/columns/export). */
  compact?: boolean;
  onTogglePublished?: (id: string, published: boolean) => Promise<ActionState>;
  onDelete?: (id: string) => Promise<ActionState>;
  onDuplicate?: (id: string) => Promise<ActionState>;
  onBulkPublish?: (ids: string[], published: boolean) => Promise<ActionState>;
  onBulkDelete?: (ids: string[]) => Promise<ActionState>;
}

const cellText = (row: Row, c: ColumnSpec): string => {
  if (c.type === 'primary') return String(row[c.titleKey ?? 'name'] ?? '');
  if (c.type === 'status') return row[c.key] ? 'Published' : 'Draft';
  const v = row[c.key];
  return v == null ? '' : String(v);
};

export default function DataTable({
  rows,
  columns,
  basePath,
  searchKeys,
  searchPlaceholder,
  filters = [],
  labelSingular,
  labelPlural,
  emptyIconName = 'package',
  pageSize = 10,
  compact = false,
  onTogglePublished,
  onDelete,
  onDuplicate,
  onBulkPublish,
  onBulkDelete,
}: DataTableProps) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const [query, setQuery] = useState('');
  const [filterValues, setFilterValues] = useState<Record<string, string>>({});
  const [sort, setSort] = useState<{ key: string; dir: 'asc' | 'desc' } | null>(null);
  const [page, setPage] = useState(0);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [hidden, setHidden] = useState<Set<string>>(new Set());
  const [colMenu, setColMenu] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [confirm, setConfirm] = useState<null | { ids: string[]; message: string }>(null);

  const rowRefs = useRef<(HTMLTableRowElement | null)[]>([]);

  // ── derive filtered → sorted view ──────────────────────────────────────────
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let out = rows.filter((r) => {
      if (q && !searchKeys.some((k) => String(r[k] ?? '').toLowerCase().includes(q))) return false;
      for (const f of filters) {
        const fv = filterValues[f.key];
        if (fv && fv !== 'all' && String(r[f.key]) !== fv) return false;
      }
      return true;
    });
    if (sort) {
      const col = columns.find((c) => c.key === sort.key);
      const sortKey = col?.type === 'primary' ? col.titleKey ?? 'name' : sort.key;
      out = [...out].sort((a, b) => {
        const av = a[sortKey];
        const bv = b[sortKey];
        let cmp: number;
        if (typeof av === 'number' && typeof bv === 'number') cmp = av - bv;
        else if (typeof av === 'boolean' && typeof bv === 'boolean') cmp = Number(av) - Number(bv);
        else cmp = String(av ?? '').localeCompare(String(bv ?? ''));
        return sort.dir === 'asc' ? cmp : -cmp;
      });
    }
    return out;
  }, [rows, query, filterValues, filters, searchKeys, sort, columns]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
  const safePage = Math.min(page, pageCount - 1);
  const pageRows = filtered.slice(safePage * pageSize, safePage * pageSize + pageSize);

  const visibleColumns = columns.filter((c) => !hidden.has(c.key));
  const allOnPageSelected = pageRows.length > 0 && pageRows.every((r) => selected.has(r.id));

  // ── helpers ────────────────────────────────────────────────────────────────
  const resetPage = () => setPage(0);

  const toggleSort = (key: string) =>
    setSort((s) => (s?.key === key ? { key, dir: s.dir === 'asc' ? 'desc' : 'asc' } : { key, dir: 'asc' }));

  const toggleSelect = (id: string) =>
    setSelected((s) => {
      const next = new Set(s);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const toggleSelectPage = () =>
    setSelected((s) => {
      const next = new Set(s);
      if (allOnPageSelected) pageRows.forEach((r) => next.delete(r.id));
      else pageRows.forEach((r) => next.add(r.id));
      return next;
    });

  const run = useCallback(
    (fn: () => Promise<ActionState>, after?: () => void) => {
      setError(null);
      startTransition(async () => {
        const res = await fn();
        if (res?.error) setError(res.error);
        else {
          after?.();
          router.refresh();
        }
      });
    },
    [router],
  );

  const exportCsv = () => {
    const cols = visibleColumns;
    const head = cols.map((c) => c.header);
    const lines = filtered.map((r) =>
      cols
        .map((c) => {
          const v = cellText(r, c).replace(/"/g, '""');
          return `"${v}"`;
        })
        .join(','),
    );
    const csv = [head.join(','), ...lines].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${labelPlural}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // keyboard nav across rows
  const onRowKeyDown = (e: React.KeyboardEvent, idx: number, id: string) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      rowRefs.current[idx + 1]?.focus();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      rowRefs.current[idx - 1]?.focus();
    } else if (e.key === 'Enter') {
      e.preventDefault();
      router.push(`${basePath}/${id}/edit`);
    }
  };

  const EmptyIcon = ICONS[emptyIconName];
  const hasData = rows.length > 0;
  const noMatches = hasData && filtered.length === 0;

  return (
    <div className="space-y-3">
      {error && (
        <div role="alert" className="flex items-center justify-between rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700 dark:border-red-800 dark:bg-red-900/30 dark:text-red-300">
          {error}
          <button onClick={() => setError(null)} aria-label="Dismiss"><X className="h-4 w-4" /></button>
        </div>
      )}

      {/* Toolbar */}
      {!compact && (
      <div className="flex flex-wrap items-center gap-2">
        <div className="relative min-w-[200px] flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              resetPage();
            }}
            placeholder={searchPlaceholder ?? `Search ${labelPlural}…`}
            className="w-full rounded-lg border border-slate-300 bg-white py-2 pl-9 pr-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-accent dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
          />
        </div>

        {filters.map((f) => (
          <select
            key={f.key}
            aria-label={f.label}
            value={filterValues[f.key] ?? 'all'}
            onChange={(e) => {
              setFilterValues((v) => ({ ...v, [f.key]: e.target.value }));
              resetPage();
            }}
            className="rounded-lg border border-slate-300 bg-white py-2 pl-3 pr-8 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-accent dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
          >
            <option value="all">{f.label}: All</option>
            {f.options.map((o) => (
              <option key={o.value} value={o.value}>
                {f.label}: {o.label}
              </option>
            ))}
          </select>
        ))}

        {/* Column visibility */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setColMenu((o) => !o)}
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            <SlidersHorizontal className="h-4 w-4" />
            <span className="hidden sm:inline">Columns</span>
          </button>
          {colMenu && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setColMenu(false)} />
              <div className="absolute right-0 z-20 mt-1 w-48 rounded-lg border border-slate-200 bg-white p-1.5 shadow-lg dark:border-slate-700 dark:bg-slate-900">
                {columns.map((c) => (
                  <label key={c.key} className="flex items-center gap-2 rounded px-2 py-1.5 text-sm text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800">
                    <input
                      type="checkbox"
                      checked={!hidden.has(c.key)}
                      disabled={c.type === 'primary'}
                      onChange={() =>
                        setHidden((h) => {
                          const next = new Set(h);
                          if (next.has(c.key)) next.delete(c.key);
                          else next.add(c.key);
                          return next;
                        })
                      }
                      className="h-3.5 w-3.5 rounded border-slate-300 text-green-600 focus:ring-accent"
                    />
                    {c.header}
                  </label>
                ))}
              </div>
            </>
          )}
        </div>

        <button
          type="button"
          onClick={exportCsv}
          disabled={!hasData}
          className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 disabled:opacity-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
        >
          <Download className="h-4 w-4" />
          <span className="hidden sm:inline">Export</span>
        </button>
      </div>
      )}

      {/* Bulk action bar */}
      {selected.size > 0 && (
        <div className="flex flex-wrap items-center gap-2 rounded-lg border border-green-200 bg-green-50 px-3 py-2 text-sm dark:border-green-800/60 dark:bg-green-900/20">
          <span className="font-medium text-green-800 dark:text-green-300">{selected.size} selected</span>
          <div className="ml-auto flex flex-wrap items-center gap-2">
            {onBulkPublish && (
              <>
                <button onClick={() => run(() => onBulkPublish(Array.from(selected), true), () => setSelected(new Set()))} className="rounded-md px-2.5 py-1 font-medium text-green-700 hover:bg-green-100 dark:text-green-300 dark:hover:bg-green-900/40">
                  Publish
                </button>
                <button onClick={() => run(() => onBulkPublish(Array.from(selected), false), () => setSelected(new Set()))} className="rounded-md px-2.5 py-1 font-medium text-slate-600 hover:bg-slate-200/60 dark:text-slate-300 dark:hover:bg-slate-700/60">
                  Unpublish
                </button>
              </>
            )}
            {onBulkDelete && (
              <button
                onClick={() => setConfirm({ ids: Array.from(selected), message: `Delete ${selected.size} ${selected.size === 1 ? labelSingular : labelPlural}? This cannot be undone.` })}
                className="rounded-md px-2.5 py-1 font-medium text-red-600 hover:bg-red-100 dark:text-red-400 dark:hover:bg-red-900/30"
              >
                Delete
              </button>
            )}
            <button onClick={() => setSelected(new Set())} className="rounded-md p-1 text-slate-400 hover:text-slate-600" aria-label="Clear selection">
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
        <table className="w-full text-sm">
          <thead className="sticky top-0 z-[1] bg-slate-50/95 backdrop-blur dark:bg-slate-800/80">
            <tr className="border-b border-slate-200 text-left text-slate-500 dark:border-slate-700 dark:text-slate-400">
              {(onBulkDelete || onBulkPublish) && (
                <th className="w-10 px-3 py-3">
                  <input
                    type="checkbox"
                    aria-label="Select all on page"
                    checked={allOnPageSelected}
                    onChange={toggleSelectPage}
                    className="h-4 w-4 rounded border-slate-300 text-green-600 focus:ring-accent"
                  />
                </th>
              )}
              {visibleColumns.map((c) => (
                <th key={c.key} className={cn('px-4 py-3 font-medium', c.width, c.align === 'right' && 'text-right')}>
                  {c.sortable ? (
                    <button onClick={() => toggleSort(c.key)} className="inline-flex items-center gap-1 hover:text-slate-700 dark:hover:text-slate-200">
                      {c.header}
                      {sort?.key === c.key ? (
                        sort.dir === 'asc' ? <ArrowUp className="h-3.5 w-3.5" /> : <ArrowDown className="h-3.5 w-3.5" />
                      ) : (
                        <ArrowUpDown className="h-3.5 w-3.5 opacity-40" />
                      )}
                    </button>
                  ) : (
                    c.header
                  )}
                </th>
              ))}
              <th className="w-28 px-4 py-3 text-right font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className={cn('divide-y divide-slate-100 dark:divide-slate-800', pending && 'opacity-60')}>
            {pageRows.map((row, idx) => (
              <tr
                key={row.id}
                ref={(el) => {
                  rowRefs.current[idx] = el;
                }}
                tabIndex={0}
                onKeyDown={(e) => onRowKeyDown(e, idx, row.id)}
                className="outline-none hover:bg-slate-50 focus-visible:bg-green-50/60 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent dark:hover:bg-slate-800/50 dark:focus-visible:bg-green-900/10"
              >
                {(onBulkDelete || onBulkPublish) && (
                  <td className="px-3 py-3">
                    <input
                      type="checkbox"
                      aria-label={`Select ${cellText(row, columns[0])}`}
                      checked={selected.has(row.id)}
                      onChange={() => toggleSelect(row.id)}
                      className="h-4 w-4 rounded border-slate-300 text-green-600 focus:ring-accent"
                    />
                  </td>
                )}
                {visibleColumns.map((c) => (
                  <td key={c.key} className={cn('px-4 py-3', c.align === 'right' && 'text-right')}>
                    <Cell row={row} col={c} />
                  </td>
                ))}
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-0.5">
                    {onTogglePublished && columns.some((c) => c.type === 'status') && (
                      <PublishToggle id={row.id} published={Boolean(row.published)} onToggle={onTogglePublished} onError={setError} onDone={() => router.refresh()} />
                    )}
                    <Link
                      href={`${basePath}/${row.id}/edit`}
                      aria-label="Edit"
                      className="rounded-lg p-2 text-slate-500 transition-colors hover:bg-green-50 hover:text-green-600 dark:hover:bg-green-900/20"
                    >
                      <Pencil className="h-4 w-4" />
                    </Link>
                    {onDuplicate && (
                      <button
                        type="button"
                        onClick={() => run(() => onDuplicate(row.id))}
                        aria-label="Duplicate"
                        className="rounded-lg p-2 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800"
                      >
                        <Copy className="h-4 w-4" />
                      </button>
                    )}
                    {onDelete && (
                      <button
                        type="button"
                        onClick={() => setConfirm({ ids: [row.id], message: `Delete “${cellText(row, columns[0])}”? This cannot be undone.` })}
                        aria-label="Delete"
                        className="rounded-lg p-2 text-slate-500 transition-colors hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/20"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Empty / no-match states */}
        {!hasData && (
          <div className="px-4 py-16 text-center">
            <EmptyIcon className="mx-auto mb-3 h-10 w-10 text-slate-300 dark:text-slate-600" />
            <p className="mb-4 text-slate-600 dark:text-slate-300">No {labelPlural} yet.</p>
            <Link href={`${basePath}/new`} className="font-medium text-green-600 hover:underline dark:text-green-400">
              Create your first {labelSingular}
            </Link>
          </div>
        )}
        {noMatches && (
          <div className="px-4 py-16 text-center text-slate-500 dark:text-slate-400">
            <Inbox className="mx-auto mb-3 h-10 w-10 text-slate-300 dark:text-slate-600" />
            No {labelPlural} match your filters.
          </div>
        )}
      </div>

      {/* Pagination */}
      {filtered.length > pageSize && (
        <div className="flex items-center justify-between text-sm text-slate-500 dark:text-slate-400">
          <span>
            {safePage * pageSize + 1}–{Math.min((safePage + 1) * pageSize, filtered.length)} of {filtered.length}
          </span>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              disabled={safePage === 0}
              className="rounded-lg p-2 hover:bg-slate-100 disabled:opacity-40 dark:hover:bg-slate-800"
              aria-label="Previous page"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <span className="px-2 font-medium text-slate-700 dark:text-slate-200">
              {safePage + 1} / {pageCount}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(pageCount - 1, p + 1))}
              disabled={safePage >= pageCount - 1}
              className="rounded-lg p-2 hover:bg-slate-100 disabled:opacity-40 dark:hover:bg-slate-800"
              aria-label="Next page"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      <ConfirmDialog
        open={!!confirm}
        title="Confirm deletion"
        message={confirm?.message ?? ''}
        confirmLabel="Delete"
        destructive
        pending={pending}
        onCancel={() => setConfirm(null)}
        onConfirm={() => {
          if (!confirm) return;
          const ids = confirm.ids;
          const fn =
            ids.length === 1 && onDelete
              ? () => onDelete(ids[0])
              : onBulkDelete
                ? () => onBulkDelete(ids)
                : null;
          if (fn) run(fn, () => setSelected(new Set()));
          setConfirm(null);
        }}
      />
    </div>
  );
}

// ── Cell renderer ─────────────────────────────────────────────────────────────
function Cell({ row, col }: { row: Row; col: ColumnSpec }) {
  if (col.type === 'primary') {
    const Icon = ICONS[col.iconName ?? 'package'];
    const img = col.imageKey ? (row[col.imageKey] as string | null) : null;
    const title = String(row[col.titleKey ?? 'name'] ?? '');
    const sub = col.subKey ? `${col.subPrefix ?? ''}${row[col.subKey]}` : null;
    const video = col.imageAspect === 'video';
    // Per-row icon (home features/statistics) — render the stored lucide icon.
    if (col.iconKey) {
      const RowIcon = resolveIcon(row[col.iconKey] as string);
      return (
        <div className="flex items-center gap-3">
          <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green-100 text-green-600 dark:bg-green-900/40 dark:text-green-400">
            <RowIcon className="h-5 w-5" />
          </span>
          <div className="min-w-0">
            <p className="truncate font-medium text-slate-900 dark:text-slate-100">{title}</p>
            {sub && <p className="truncate text-xs text-slate-400">{sub}</p>}
          </div>
        </div>
      );
    }
    return (
      <div className="flex items-center gap-3">
        <div className={cn('relative flex shrink-0 items-center justify-center overflow-hidden rounded-lg bg-slate-100 dark:bg-slate-800', video ? 'h-12 w-16' : 'h-12 w-12')}>
          {img ? (
            <Image src={img} alt={title} fill className={video ? 'object-cover' : 'object-contain p-1'} />
          ) : (
            <Icon className="h-5 w-5 text-slate-300 dark:text-slate-600" />
          )}
        </div>
        <div className="min-w-0">
          <p className="truncate font-medium text-slate-900 dark:text-slate-100">{title}</p>
          {sub && <p className="truncate text-xs text-slate-400">{sub}</p>}
        </div>
      </div>
    );
  }
  if (col.type === 'status') {
    const on = Boolean(row[col.key]);
    return (
      <span className={cn('inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium', on ? 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300' : 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400')}>
        <span className={cn('h-1.5 w-1.5 rounded-full', on ? 'bg-green-500' : 'bg-slate-400')} />
        {on ? 'Published' : 'Draft'}
      </span>
    );
  }
  if (col.type === 'date') {
    const v = row[col.key] as string | null;
    return <span className="text-slate-600 dark:text-slate-300">{v ? new Date(v).toLocaleDateString() : '—'}</span>;
  }
  return <span className="text-slate-600 dark:text-slate-300">{String(row[col.key] ?? '')}</span>;
}

// ── Optimistic publish toggle ─────────────────────────────────────────────────
function PublishToggle({
  id,
  published,
  onToggle,
  onError,
  onDone,
}: {
  id: string;
  published: boolean;
  onToggle: (id: string, published: boolean) => Promise<ActionState>;
  onError: (msg: string) => void;
  onDone: () => void;
}) {
  const [on, setOn] = useState(published);
  const [pending, start] = useTransition();
  const flip = () => {
    const next = !on;
    setOn(next);
    start(async () => {
      const res = await onToggle(id, next);
      if (res.error) {
        setOn(!next);
        onError(res.error);
      } else onDone();
    });
  };
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      aria-label={on ? 'Published — set to draft' : 'Draft — publish'}
      onClick={flip}
      disabled={pending}
      className={cn('relative mr-1 inline-flex h-5 w-9 items-center rounded-full transition-colors disabled:opacity-60', on ? 'bg-green-600' : 'bg-slate-300 dark:bg-slate-600')}
    >
      <span className={cn('inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform', on ? 'translate-x-[1.125rem]' : 'translate-x-0.5')} />
    </button>
  );
}
