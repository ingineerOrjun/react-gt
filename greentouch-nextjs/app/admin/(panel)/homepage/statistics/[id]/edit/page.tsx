import { notFound } from 'next/navigation';
import { BackLink } from '../../../../../../components/admin/ui/PageHeader';
import ResourceForm from '../../../../../../components/admin/ui/ResourceForm';
import { statisticFields } from '../../../../../../components/admin/ui/specs';
import { saveStatistic, deleteStatistic, duplicateStatistic } from '../../../../../../lib/actions/home-statistics';
import { getAdminStatistic } from '../../../../../../lib/queries/admin';

export const metadata = { title: 'Edit statistic' };

export default async function EditStatisticPage({ params }: { params: { id: string } }) {
  const stat = await getAdminStatistic(params.id);
  if (!stat) notFound();

  return (
    <div>
      <BackLink href="/admin/homepage/statistics" label="Back to trust bar" />
      <h1 className="mb-6 text-2xl font-bold text-slate-900 dark:text-slate-100">Edit trust-bar item</h1>
      <ResourceForm
        fields={statisticFields}
        action={saveStatistic}
        record={stat as unknown as Record<string, unknown>}
        basePath="/admin/homepage/statistics"
        labelSingular="statistic"
        createLabel="Create item"
        onDelete={deleteStatistic}
        onDuplicate={duplicateStatistic}
      />
    </div>
  );
}
