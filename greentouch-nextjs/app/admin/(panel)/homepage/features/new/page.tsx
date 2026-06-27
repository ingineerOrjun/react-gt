import { BackLink } from '../../../../../components/admin/ui/PageHeader';
import ResourceForm from '../../../../../components/admin/ui/ResourceForm';
import { featureFields } from '../../../../../components/admin/ui/specs';
import { saveFeature } from '../../../../../lib/actions/home-features';

export const metadata = { title: 'New feature' };

export default function NewFeaturePage() {
  return (
    <div>
      <BackLink href="/admin/homepage/features" label="Back to features" />
      <h1 className="mb-6 text-2xl font-bold text-slate-900 dark:text-slate-100">New feature</h1>
      <ResourceForm
        fields={featureFields}
        action={saveFeature}
        basePath="/admin/homepage/features"
        labelSingular="feature"
        createLabel="Create feature"
      />
    </div>
  );
}
