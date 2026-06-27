import { notFound } from 'next/navigation';
import { BackLink } from '../../../../../../components/admin/ui/PageHeader';
import ResourceForm from '../../../../../../components/admin/ui/ResourceForm';
import { featureFields } from '../../../../../../components/admin/ui/specs';
import { saveFeature, deleteFeature, duplicateFeature } from '../../../../../../lib/actions/home-features';
import { getAdminFeature } from '../../../../../../lib/queries/admin';

export const metadata = { title: 'Edit feature' };

export default async function EditFeaturePage({ params }: { params: { id: string } }) {
  const feature = await getAdminFeature(params.id);
  if (!feature) notFound();

  return (
    <div>
      <BackLink href="/admin/homepage/features" label="Back to features" />
      <h1 className="mb-6 text-2xl font-bold text-slate-900 dark:text-slate-100">Edit feature</h1>
      <ResourceForm
        fields={featureFields}
        action={saveFeature}
        record={feature as unknown as Record<string, unknown>}
        basePath="/admin/homepage/features"
        labelSingular="feature"
        createLabel="Create feature"
        onDelete={deleteFeature}
        onDuplicate={duplicateFeature}
      />
    </div>
  );
}
