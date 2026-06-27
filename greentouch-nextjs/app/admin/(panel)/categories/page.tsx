import { getAdminCategories } from '../../../lib/queries/admin';
import { AdminPageHeader } from '../../../components/admin/ui/PageHeader';
import DataTable, { type DataRow } from '../../../components/admin/ui/DataTable';
import { taxonomyColumns, taxonomyFilters } from '../../../components/admin/ui/specs';
import {
  toggleCategory,
  deleteCategory,
  duplicateCategory,
  bulkPublishCategories,
  bulkDeleteCategories,
} from '../../../lib/actions/categories';

export const metadata = { title: 'Categories' };

export default async function CategoriesPage() {
  const categories = await getAdminCategories();
  return (
    <div>
      <AdminPageHeader title="Categories" description={`${categories.length} total`} newHref="/admin/categories/new" newLabel="New category" />
      <DataTable
        rows={categories as unknown as DataRow[]}
        columns={taxonomyColumns}
        filters={taxonomyFilters}
        basePath="/admin/categories"
        searchKeys={['name', 'slug']}
        labelSingular="category"
        labelPlural="categories"
        emptyIconName="tag"
        onTogglePublished={toggleCategory}
        onDelete={deleteCategory}
        onDuplicate={duplicateCategory}
        onBulkPublish={bulkPublishCategories}
        onBulkDelete={bulkDeleteCategories}
      />
    </div>
  );
}
