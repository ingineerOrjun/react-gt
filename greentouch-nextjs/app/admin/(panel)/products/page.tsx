import { getAdminProducts, getCategoryOptions } from '../../../lib/queries/admin';
import { AdminPageHeader } from '../../../components/admin/ui/PageHeader';
import DataTable, { type DataRow } from '../../../components/admin/ui/DataTable';
import { productColumns, productFilters } from '../../../components/admin/ui/specs';
import type { FilterSpec } from '../../../components/admin/ui/types';
import {
  toggleProductPublished,
  deleteProduct,
  duplicateProduct,
  bulkPublishProducts,
  bulkDeleteProducts,
} from '../../../lib/actions/products';

export const metadata = { title: 'Products' };

export default async function AdminProductsPage() {
  const [products, categories] = await Promise.all([getAdminProducts(), getCategoryOptions()]);

  // Status + Featured (+ Category when categories exist) — built dynamically.
  const filters: FilterSpec[] = [
    ...productFilters,
    { key: 'featured', label: 'Featured', options: [{ label: 'Featured', value: 'true' }, { label: 'Not featured', value: 'false' }] },
    ...(categories.length ? [{ key: 'category_id', label: 'Category', options: categories }] : []),
  ];

  return (
    <div>
      <AdminPageHeader
        title="Products"
        description={`${products.length} total`}
        newHref="/admin/products/new"
        newLabel="New product"
      />
      <DataTable
        rows={products as unknown as DataRow[]}
        columns={productColumns}
        filters={filters}
        basePath="/admin/products"
        searchKeys={['name', 'slug']}
        labelSingular="product"
        labelPlural="products"
        emptyIconName="package"
        onTogglePublished={toggleProductPublished}
        onDelete={deleteProduct}
        onDuplicate={duplicateProduct}
        onBulkPublish={bulkPublishProducts}
        onBulkDelete={bulkDeleteProducts}
      />
    </div>
  );
}
