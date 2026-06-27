import { notFound } from 'next/navigation';
import { BackLink } from '../../../../../components/admin/ui/PageHeader';
import ResourceForm from '../../../../../components/admin/ui/ResourceForm';
import { taxonomyFields } from '../../../../../components/admin/ui/specs';
import { saveCategory, deleteCategory, duplicateCategory } from '../../../../../lib/actions/categories';
import { getAdminCategory } from '../../../../../lib/queries/admin';

export const metadata = { title: 'Edit category' };

export default async function EditCategoryPage({ params }: { params: { id: string } }) {
  const category = await getAdminCategory(params.id);
  if (!category) notFound();
  return (
    <div>
      <BackLink href="/admin/categories" label="Back to categories" />
      <h1 className="mb-6 text-2xl font-bold text-slate-900 dark:text-slate-100">Edit category</h1>
      <ResourceForm
        fields={taxonomyFields}
        action={saveCategory}
        record={category as unknown as Record<string, unknown>}
        basePath="/admin/categories"
        labelSingular="category"
        createLabel="Create category"
        onDelete={deleteCategory}
        onDuplicate={duplicateCategory}
      />
    </div>
  );
}
