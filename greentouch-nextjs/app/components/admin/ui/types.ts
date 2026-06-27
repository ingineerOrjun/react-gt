// Shared, serializable contracts for the generic admin CMS primitives.
// Everything here is plain data (no functions) so a Server Component can build
// these specs and hand them to the client DataTable / ResourceForm across the
// RSC boundary. Mutations flow through Server Actions, which *are* passable.

import type { Bucket } from '../../../lib/storage';

/** Standard result shape returned by every admin Server Action. */
export interface ActionState {
  error: string | null;
  /** Set on a successful no-redirect save (e.g. settings). */
  ok?: boolean;
}

// ── DataTable column specs ───────────────────────────────────────────────────
export type ColumnType = 'primary' | 'text' | 'number' | 'status' | 'date' | 'badge';

export interface ColumnSpec {
  /** Row property this column reads. */
  key: string;
  header: string;
  type?: ColumnType;
  sortable?: boolean;
  /** Tailwind width utility, e.g. 'w-32'. */
  width?: string;
  align?: 'left' | 'right' | 'center';
  // 'primary' cell (thumbnail + title + sub) options:
  imageKey?: string;
  titleKey?: string;
  subKey?: string;
  subPrefix?: string;
  /** lucide icon name used as the thumbnail fallback. */
  iconName?: 'package' | 'file' | 'image' | 'tag' | 'factory';
  /** Row property holding a stored icon NAME → renders that icon in the cell. */
  iconKey?: string;
  /** 'square' (products) or 'video' (blog cover). */
  imageAspect?: 'square' | 'video';
}

export interface FilterSpec {
  key: string;
  label: string;
  options: { label: string; value: string }[];
}

// ── ResourceForm field specs ─────────────────────────────────────────────────
export type FieldType =
  | 'text'
  | 'textarea'
  | 'slug'
  | 'richtext'
  | 'image'
  | 'icon'
  | 'select'
  | 'number'
  | 'switch';

export interface FormField {
  name: string;
  label: string;
  type: FieldType;
  required?: boolean;
  placeholder?: string;
  helpText?: string;
  maxLength?: number;
  rows?: number;
  min?: number;
  /** Which panel the field renders in. 'seo' renders in a collapsible section. */
  group?: 'main' | 'meta' | 'seo';
  /** For 'slug': the field name to auto-generate from. */
  slugFrom?: string;
  /** For 'image': storage bucket of the existing image + thumbnail shape. */
  imageBucket?: Bucket;
  imageAspect?: 'square' | 'video';
  /** For 'switch': default on. */
  defaultChecked?: boolean;
}
