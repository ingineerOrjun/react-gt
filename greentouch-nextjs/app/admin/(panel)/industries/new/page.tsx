import { BackLink } from '../../../../components/admin/ui/PageHeader';
import ResourceForm from '../../../../components/admin/ui/ResourceForm';
import { taxonomyFields } from '../../../../components/admin/ui/specs';
import { saveIndustry } from '../../../../lib/actions/industries';

export const metadata = { title: 'New industry' };

export default function NewIndustryPage() {
  return (
    <div>
      <BackLink href="/admin/industries" label="Back to industries" />
      <h1 className="mb-6 text-2xl font-bold text-slate-900 dark:text-slate-100">New industry</h1>
      <ResourceForm fields={taxonomyFields} action={saveIndustry} basePath="/admin/industries" labelSingular="industry" createLabel="Create industry" />
    </div>
  );
}
