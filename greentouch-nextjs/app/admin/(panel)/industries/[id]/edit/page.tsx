import { notFound } from 'next/navigation';
import { BackLink } from '../../../../../components/admin/ui/PageHeader';
import ResourceForm from '../../../../../components/admin/ui/ResourceForm';
import { taxonomyFields } from '../../../../../components/admin/ui/specs';
import { saveIndustry, deleteIndustry, duplicateIndustry } from '../../../../../lib/actions/industries';
import { getAdminIndustry } from '../../../../../lib/queries/admin';

export const metadata = { title: 'Edit industry' };

export default async function EditIndustryPage({ params }: { params: { id: string } }) {
  const industry = await getAdminIndustry(params.id);
  if (!industry) notFound();
  return (
    <div>
      <BackLink href="/admin/industries" label="Back to industries" />
      <h1 className="mb-6 text-2xl font-bold text-slate-900 dark:text-slate-100">Edit industry</h1>
      <ResourceForm
        fields={taxonomyFields}
        action={saveIndustry}
        record={industry as unknown as Record<string, unknown>}
        basePath="/admin/industries"
        labelSingular="industry"
        createLabel="Create industry"
        onDelete={deleteIndustry}
        onDuplicate={duplicateIndustry}
      />
    </div>
  );
}
