import { getAdminIndustries } from '../../../lib/queries/admin';
import { AdminPageHeader } from '../../../components/admin/ui/PageHeader';
import DataTable, { type DataRow } from '../../../components/admin/ui/DataTable';
import { taxonomyColumns, taxonomyFilters } from '../../../components/admin/ui/specs';
import {
  toggleIndustry,
  deleteIndustry,
  duplicateIndustry,
  bulkPublishIndustries,
  bulkDeleteIndustries,
} from '../../../lib/actions/industries';

export const metadata = { title: 'Industries' };

export default async function IndustriesPage() {
  const industries = await getAdminIndustries();
  return (
    <div>
      <AdminPageHeader title="Industries" description={`${industries.length} total`} newHref="/admin/industries/new" newLabel="New industry" />
      <DataTable
        rows={industries as unknown as DataRow[]}
        columns={taxonomyColumns}
        filters={taxonomyFilters}
        basePath="/admin/industries"
        searchKeys={['name', 'slug']}
        labelSingular="industry"
        labelPlural="industries"
        emptyIconName="factory"
        onTogglePublished={toggleIndustry}
        onDelete={deleteIndustry}
        onDuplicate={duplicateIndustry}
        onBulkPublish={bulkPublishIndustries}
        onBulkDelete={bulkDeleteIndustries}
      />
    </div>
  );
}
