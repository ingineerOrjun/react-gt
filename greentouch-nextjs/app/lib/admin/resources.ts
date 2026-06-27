// Resource configs — the *only* per-resource server logic (how to validate &
// shape a submission). Everything else (create/update/image/publish/delete/
// duplicate/bulk) is the shared crud.ts core. Adding a new CMS resource = add a
// config here + a client field/column spec; no new CRUD code.
import 'server-only';
import type { ResourceConfig } from './crud';
import { productSchema, blogSchema } from '../validations/schemas';
import { HOME_CONTENT_TAG } from '../queries/home';
import { slugify } from '../utils';
import { sanitizeHtml } from '../sanitize';

const firstIssue = (msg?: string) => msg ?? 'Please check the form and try again.';
const order = (fd: FormData) => Number(fd.get('display_order') ?? 0) || 0;
const isOn = (fd: FormData, k: string) => (fd.get(k) ? true : false);

export const productsResource: ResourceConfig = {
  table: 'products',
  bucket: 'products',
  basePath: '/admin/products',
  labelSingular: 'product',
  dupMessage: 'A product with this name already exists.',
  revalidate: ['/products', '/'],
  parse(formData) {
    const name = String(formData.get('name') ?? '').trim();
    const parsed = productSchema.safeParse({
      name,
      slug: slugify(name),
      description: formData.get('description'),
      published: formData.get('published') ? true : false,
      display_order: formData.get('display_order') ?? 0,
    });
    if (!parsed.success) return { ok: false, error: firstIssue(parsed.error.issues[0]?.message) };
    const str = (k: string) => String(formData.get(k) ?? '').trim();
    const categoryId = str('category_id');
    return {
      ok: true,
      payload: {
        name: parsed.data.name,
        slug: parsed.data.slug,
        description: parsed.data.description,
        published: parsed.data.published,
        display_order: parsed.data.display_order,
        // Product CMS fields
        category_id: categoryId || null,
        featured: isOn(formData, 'featured'),
        popular: isOn(formData, 'popular'),
        is_new: isOn(formData, 'is_new'),
        best_seller: isOn(formData, 'best_seller'),
        short_description: str('short_description') || null,
        seo_title: str('seo_title') || null,
        seo_description: str('seo_description') || null,
        seo_keywords: str('seo_keywords') || null,
        og_image: str('og_image') || null,
        canonical_url: str('canonical_url') || null,
        meta_robots: str('meta_robots') || null,
      },
    };
  },
  duplicateTransform(row) {
    return {
      name: `${row.name as string} (Copy)`,
      slug: `${row.slug as string}-copy-${Date.now().toString(36)}`,
      description: row.description,
      display_order: row.display_order,
    };
  },
};

export const blogsResource: ResourceConfig = {
  table: 'blogs',
  bucket: 'blogs',
  basePath: '/admin/blogs',
  labelSingular: 'article',
  dupMessage: 'An article with this slug already exists.',
  revalidate: ['/blog', '/'],
  revalidateDynamic: (payload) => (payload.slug ? [`/blog/${payload.slug as string}`] : []),
  parse(formData) {
    const title = String(formData.get('title') ?? '').trim();
    const rawSlug = String(formData.get('slug') ?? '').trim();
    const slug = rawSlug ? slugify(rawSlug) : slugify(title);
    const content = sanitizeHtml(String(formData.get('content') ?? ''));
    const parsed = blogSchema.safeParse({
      title,
      slug,
      excerpt: formData.get('excerpt'),
      content,
      published: formData.get('published') ? true : false,
      display_order: formData.get('display_order') ?? 0,
    });
    if (!parsed.success) return { ok: false, error: firstIssue(parsed.error.issues[0]?.message) };
    return {
      ok: true,
      payload: {
        title: parsed.data.title,
        slug: parsed.data.slug,
        excerpt: parsed.data.excerpt,
        content: parsed.data.content,
        published: parsed.data.published,
        display_order: parsed.data.display_order,
      },
    };
  },
  duplicateTransform(row) {
    return {
      title: `${row.title as string} (Copy)`,
      slug: `${row.slug as string}-copy-${Date.now().toString(36)}`,
      excerpt: row.excerpt,
      content: row.content,
      display_order: row.display_order,
    };
  },
};

// ── Homepage: Why-Choose feature cards (reuses generic CRUD; no image) ────────
export const featuresResource: ResourceConfig = {
  table: 'home_features',
  basePath: '/admin/homepage/features',
  labelSingular: 'feature',
  dupMessage: 'A feature with this title already exists.',
  revalidate: ['/'],
  revalidateTags: [HOME_CONTENT_TAG],
  parse(formData) {
    const title = String(formData.get('title') ?? '').trim();
    const description = String(formData.get('description') ?? '').trim();
    const icon = String(formData.get('icon') ?? '').trim();
    if (!title) return { ok: false, error: 'Title is required.' };
    if (!description) return { ok: false, error: 'Description is required.' };
    return {
      ok: true,
      payload: { title, description, icon: icon || null, published: isOn(formData, 'published'), display_order: order(formData) },
    };
  },
  duplicateTransform: (row) => ({
    title: `${row.title as string} (Copy)`,
    description: row.description,
    icon: row.icon,
    display_order: row.display_order,
  }),
};

// ── Homepage: trust-bar / statistics (reuses generic CRUD; no image) ──────────
export const statisticsResource: ResourceConfig = {
  table: 'home_statistics',
  basePath: '/admin/homepage/statistics',
  labelSingular: 'statistic',
  dupMessage: 'A statistic with this label already exists.',
  revalidate: ['/'],
  revalidateTags: [HOME_CONTENT_TAG],
  parse(formData) {
    const label = String(formData.get('label') ?? '').trim();
    const value = String(formData.get('value') ?? '').trim();
    const suffix = String(formData.get('suffix') ?? '').trim();
    const icon = String(formData.get('icon') ?? '').trim();
    if (!label) return { ok: false, error: 'Label is required.' };
    return {
      ok: true,
      payload: {
        label,
        value: value || null,
        suffix: suffix || null,
        icon: icon || null,
        published: isOn(formData, 'published'),
        display_order: order(formData),
      },
    };
  },
  duplicateTransform: (row) => ({
    label: `${row.label as string} (Copy)`,
    value: row.value,
    suffix: row.suffix,
    icon: row.icon,
    display_order: row.display_order,
  }),
};

// ── Product taxonomy: Categories & Industries (reuse generic CRUD) ────────────
function taxonomyParse(formData: FormData): import('./crud').ParseResult {
  const name = String(formData.get('name') ?? '').trim();
  const rawSlug = String(formData.get('slug') ?? '').trim();
  const slug = rawSlug ? slugify(rawSlug) : slugify(name);
  if (!name) return { ok: false, error: 'Name is required.' };
  if (!slug) return { ok: false, error: 'Slug is required.' };
  return {
    ok: true,
    payload: {
      name,
      slug,
      description: String(formData.get('description') ?? '').trim() || null,
      icon: String(formData.get('icon') ?? '').trim() || null,
      published: isOn(formData, 'published'),
      display_order: order(formData),
    },
  };
}

const taxonomyDuplicate = (row: Record<string, unknown>) => ({
  name: `${row.name as string} (Copy)`,
  slug: `${row.slug as string}-copy-${Date.now().toString(36)}`,
  description: row.description,
  icon: row.icon,
  display_order: row.display_order,
});

export const categoriesResource: ResourceConfig = {
  table: 'product_categories',
  basePath: '/admin/categories',
  labelSingular: 'category',
  dupMessage: 'A category with this slug already exists.',
  revalidate: ['/products', '/'],
  parse: taxonomyParse,
  duplicateTransform: taxonomyDuplicate,
  // Block deletion while products still reference this category.
  async beforeDelete(supabase, id) {
    const { count } = await supabase
      .from('products')
      .select('id', { count: 'exact', head: true })
      .eq('category_id', id);
    return count && count > 0
      ? `Cannot delete: ${count} product${count === 1 ? '' : 's'} still use this category. Reassign them first.`
      : null;
  },
};

export const industriesResource: ResourceConfig = {
  table: 'product_industries',
  basePath: '/admin/industries',
  labelSingular: 'industry',
  dupMessage: 'An industry with this slug already exists.',
  revalidate: ['/products', '/'],
  parse: taxonomyParse,
  duplicateTransform: taxonomyDuplicate,
};
