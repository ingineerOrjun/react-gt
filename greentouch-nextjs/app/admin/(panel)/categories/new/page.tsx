import { BackLink } from '../../../../components/admin/ui/PageHeader';
import ResourceForm from '../../../../components/admin/ui/ResourceForm';
import { taxonomyFields } from '../../../../components/admin/ui/specs';
import { saveCategory } from '../../../../lib/actions/categories';

export const metadata = { title: 'New category' };

export default function NewCategoryPage() {
  return (
    <div>
      <BackLink href="/admin/categories" label="Back to categories" />
      <h1 className="mb-6 text-2xl font-bold text-slate-900 dark:text-slate-100">New category</h1>
      <ResourceForm fields={taxonomyFields} action={saveCategory} basePath="/admin/categories" labelSingular="category" createLabel="Create category" />
    </div>
  );
}
