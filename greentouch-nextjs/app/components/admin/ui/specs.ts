// Serializable column + field specs per resource. Server pages import these and
// pass them across the RSC boundary to the client DataTable / ResourceForm.
// Adding a CMS resource = add a spec block here + a server config (resources.ts).
import type { ColumnSpec, FilterSpec, FormField } from './types';

const STATUS_FILTER: FilterSpec = {
  key: 'published',
  label: 'Status',
  options: [
    { label: 'Published', value: 'true' },
    { label: 'Draft', value: 'false' },
  ],
};

// ── Products ─────────────────────────────────────────────────────────────────
export const productColumns: ColumnSpec[] = [
  {
    key: 'name',
    header: 'Product',
    type: 'primary',
    sortable: true,
    imageKey: 'imageUrl',
    titleKey: 'name',
    subKey: 'slug',
    subPrefix: '/',
    iconName: 'package',
    imageAspect: 'square',
  },
  { key: 'display_order', header: 'Order', type: 'number', sortable: true, width: 'w-24' },
  { key: 'published', header: 'Status', type: 'status', sortable: true, width: 'w-32' },
];

export const productFilters: FilterSpec[] = [STATUS_FILTER];

export const productFields: FormField[] = [
  { name: 'name', label: 'Name', type: 'text', required: true, maxLength: 160, group: 'main' },
  { name: 'short_description', label: 'Short description', type: 'textarea', rows: 2, maxLength: 300, helpText: 'One-line summary for cards & previews.', group: 'main' },
  { name: 'description', label: 'Description', type: 'textarea', required: true, rows: 6, group: 'main' },
  { name: 'image', label: 'Image', type: 'image', imageBucket: 'products', imageAspect: 'square', group: 'main' },
  // Sidebar
  { name: 'published', label: 'Published', type: 'switch', group: 'meta' },
  { name: 'category_id', label: 'Category', type: 'select', placeholder: '— Uncategorized —', group: 'meta' },
  { name: 'featured', label: 'Featured', type: 'switch', group: 'meta' },
  { name: 'popular', label: 'Popular', type: 'switch', group: 'meta' },
  { name: 'is_new', label: 'New', type: 'switch', group: 'meta' },
  { name: 'best_seller', label: 'Best seller', type: 'switch', group: 'meta' },
  { name: 'display_order', label: 'Display order', type: 'number', min: 0, helpText: 'Lower numbers appear first.', group: 'meta' },
  // SEO (collapsible)
  { name: 'seo_title', label: 'SEO title', type: 'text', maxLength: 200, helpText: 'Defaults to the product name.', group: 'seo' },
  { name: 'seo_description', label: 'SEO description', type: 'textarea', rows: 2, maxLength: 320, group: 'seo' },
  { name: 'seo_keywords', label: 'Keywords', type: 'text', maxLength: 300, helpText: 'Comma-separated.', group: 'seo' },
  { name: 'og_image', label: 'OG image URL', type: 'text', maxLength: 300, group: 'seo' },
  { name: 'canonical_url', label: 'Canonical URL', type: 'text', maxLength: 300, group: 'seo' },
  { name: 'meta_robots', label: 'Meta robots', type: 'text', maxLength: 80, helpText: 'e.g. index,follow', group: 'seo' },
];

// ── Product taxonomy (categories & industries share this shape) ──────────────
export const taxonomyColumns: ColumnSpec[] = [
  { key: 'name', header: 'Name', type: 'primary', sortable: true, iconKey: 'icon', titleKey: 'name', subKey: 'slug', subPrefix: '/' },
  { key: 'display_order', header: 'Order', type: 'number', sortable: true, width: 'w-24' },
  { key: 'published', header: 'Status', type: 'status', sortable: true, width: 'w-28' },
];

export const taxonomyFilters: FilterSpec[] = [STATUS_FILTER];

export const taxonomyFields: FormField[] = [
  { name: 'name', label: 'Name', type: 'text', required: true, maxLength: 120, group: 'main' },
  { name: 'slug', label: 'Slug', type: 'slug', slugFrom: 'name', helpText: 'Leave blank to auto-generate from the name.', group: 'main' },
  { name: 'description', label: 'Description', type: 'textarea', rows: 3, maxLength: 400, group: 'main' },
  { name: 'icon', label: 'Icon', type: 'icon', group: 'main' },
  { name: 'published', label: 'Published', type: 'switch', defaultChecked: true, group: 'meta' },
  { name: 'display_order', label: 'Display order', type: 'number', min: 0, helpText: 'Lower numbers appear first.', group: 'meta' },
];

// ── Blogs ────────────────────────────────────────────────────────────────────
export const blogColumns: ColumnSpec[] = [
  {
    key: 'title',
    header: 'Article',
    type: 'primary',
    sortable: true,
    imageKey: 'imageUrl',
    titleKey: 'title',
    subKey: 'slug',
    subPrefix: '/blog/',
    iconName: 'file',
    imageAspect: 'video',
  },
  { key: 'display_order', header: 'Order', type: 'number', sortable: true, width: 'w-24' },
  { key: 'published', header: 'Status', type: 'status', sortable: true, width: 'w-32' },
];

export const blogFilters: FilterSpec[] = [STATUS_FILTER];

// Compact column sets for the dashboard "Recent" widgets (image · name · status · updated).
export const recentProductColumns: ColumnSpec[] = [
  { key: 'name', header: 'Product', type: 'primary', imageKey: 'imageUrl', titleKey: 'name', subKey: 'slug', subPrefix: '/', iconName: 'package', imageAspect: 'square' },
  { key: 'published', header: 'Status', type: 'status', width: 'w-28' },
  { key: 'updated_at', header: 'Updated', type: 'date', width: 'w-28' },
];

export const recentBlogColumns: ColumnSpec[] = [
  { key: 'name', header: 'Article', type: 'primary', imageKey: 'imageUrl', titleKey: 'name', subKey: 'slug', subPrefix: '/blog/', iconName: 'file', imageAspect: 'video' },
  { key: 'published', header: 'Status', type: 'status', width: 'w-28' },
  { key: 'updated_at', header: 'Updated', type: 'date', width: 'w-28' },
];

export const blogFields: FormField[] = [
  { name: 'title', label: 'Title', type: 'text', required: true, maxLength: 200, group: 'main' },
  { name: 'slug', label: 'Slug', type: 'slug', slugFrom: 'title', helpText: 'URL: /blog/your-slug · leave blank to auto-generate.', group: 'main' },
  { name: 'excerpt', label: 'Excerpt', type: 'textarea', required: true, rows: 2, maxLength: 300, helpText: 'Short summary shown on cards.', group: 'main' },
  { name: 'content', label: 'Content', type: 'richtext', required: true, group: 'main' },
  { name: 'image', label: 'Featured image', type: 'image', imageBucket: 'blogs', imageAspect: 'video', group: 'main' },
  { name: 'published', label: 'Published', type: 'switch', group: 'meta' },
  { name: 'display_order', label: 'Display order', type: 'number', min: 0, helpText: 'Lower numbers appear first.', group: 'meta' },
];

// ── Homepage: Why-Choose features ────────────────────────────────────────────
export const featureColumns: ColumnSpec[] = [
  { key: 'title', header: 'Feature', type: 'primary', sortable: true, iconKey: 'icon', titleKey: 'title' },
  { key: 'display_order', header: 'Order', type: 'number', sortable: true, width: 'w-24' },
  { key: 'published', header: 'Status', type: 'status', sortable: true, width: 'w-28' },
];

export const featureFilters: FilterSpec[] = [STATUS_FILTER];

export const featureFields: FormField[] = [
  { name: 'title', label: 'Title', type: 'text', required: true, maxLength: 80, group: 'main' },
  { name: 'description', label: 'Description', type: 'textarea', required: true, rows: 3, maxLength: 200, group: 'main' },
  { name: 'icon', label: 'Icon', type: 'icon', group: 'main' },
  { name: 'published', label: 'Visible on homepage', type: 'switch', defaultChecked: true, group: 'meta' },
  { name: 'display_order', label: 'Display order', type: 'number', min: 0, helpText: 'Lower numbers appear first.', group: 'meta' },
];

// ── Homepage: trust-bar statistics ───────────────────────────────────────────
export const statisticColumns: ColumnSpec[] = [
  { key: 'label', header: 'Statistic', type: 'primary', sortable: true, iconKey: 'icon', titleKey: 'label' },
  { key: 'value', header: 'Value', type: 'text', width: 'w-24' },
  { key: 'display_order', header: 'Order', type: 'number', sortable: true, width: 'w-24' },
  { key: 'published', header: 'Status', type: 'status', sortable: true, width: 'w-28' },
];

export const statisticFilters: FilterSpec[] = [STATUS_FILTER];

export const statisticFields: FormField[] = [
  { name: 'label', label: 'Label', type: 'text', required: true, maxLength: 60, group: 'main' },
  { name: 'value', label: 'Value (optional)', type: 'text', maxLength: 20, helpText: 'e.g. "500" — leave blank for a label-only badge.', group: 'main' },
  { name: 'suffix', label: 'Suffix (optional)', type: 'text', maxLength: 10, helpText: 'e.g. "+", "%"', group: 'main' },
  { name: 'icon', label: 'Icon', type: 'icon', group: 'main' },
  { name: 'published', label: 'Visible on homepage', type: 'switch', defaultChecked: true, group: 'meta' },
  { name: 'display_order', label: 'Display order', type: 'number', min: 0, group: 'meta' },
];
