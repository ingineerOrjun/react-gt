import { getAdminStatistics } from '../../../../lib/queries/admin';
import { BackLink, AdminPageHeader } from '../../../../components/admin/ui/PageHeader';
import DataTable, { type DataRow } from '../../../../components/admin/ui/DataTable';
import { statisticColumns, statisticFilters } from '../../../../components/admin/ui/specs';
import {
  toggleStatistic,
  deleteStatistic,
  duplicateStatistic,
  bulkPublishStatistics,
  bulkDeleteStatistics,
} from '../../../../lib/actions/home-statistics';

export const metadata = { title: 'Trust bar' };

export default async function StatisticsPage() {
  const stats = await getAdminStatistics();
  return (
    <div>
      <BackLink href="/admin/homepage" label="Back to homepage" />
      <AdminPageHeader
        title="Trust bar"
        description={`${stats.length} total`}
        newHref="/admin/homepage/statistics/new"
        newLabel="New item"
      />
      <DataTable
        rows={stats as unknown as DataRow[]}
        columns={statisticColumns}
        filters={statisticFilters}
        basePath="/admin/homepage/statistics"
        searchKeys={['label']}
        labelSingular="statistic"
        labelPlural="statistics"
        emptyIconName="tag"
        onTogglePublished={toggleStatistic}
        onDelete={deleteStatistic}
        onDuplicate={duplicateStatistic}
        onBulkPublish={bulkPublishStatistics}
        onBulkDelete={bulkDeleteStatistics}
      />
    </div>
  );
}
