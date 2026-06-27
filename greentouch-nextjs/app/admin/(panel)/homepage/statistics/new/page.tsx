import { BackLink } from '../../../../../components/admin/ui/PageHeader';
import ResourceForm from '../../../../../components/admin/ui/ResourceForm';
import { statisticFields } from '../../../../../components/admin/ui/specs';
import { saveStatistic } from '../../../../../lib/actions/home-statistics';

export const metadata = { title: 'New statistic' };

export default function NewStatisticPage() {
  return (
    <div>
      <BackLink href="/admin/homepage/statistics" label="Back to trust bar" />
      <h1 className="mb-6 text-2xl font-bold text-slate-900 dark:text-slate-100">New trust-bar item</h1>
      <ResourceForm
        fields={statisticFields}
        action={saveStatistic}
        basePath="/admin/homepage/statistics"
        labelSingular="statistic"
        createLabel="Create item"
      />
    </div>
  );
}
