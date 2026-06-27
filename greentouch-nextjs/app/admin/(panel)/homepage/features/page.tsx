import { getAdminFeatures } from '../../../../lib/queries/admin';
import { BackLink, AdminPageHeader } from '../../../../components/admin/ui/PageHeader';
import DataTable, { type DataRow } from '../../../../components/admin/ui/DataTable';
import { featureColumns, featureFilters } from '../../../../components/admin/ui/specs';
import {
  toggleFeature,
  deleteFeature,
  duplicateFeature,
  bulkPublishFeatures,
  bulkDeleteFeatures,
} from '../../../../lib/actions/home-features';

export const metadata = { title: 'Why-Choose features' };

export default async function FeaturesPage() {
  const features = await getAdminFeatures();
  return (
    <div>
      <BackLink href="/admin/homepage" label="Back to homepage" />
      <AdminPageHeader
        title="Why-Choose features"
        description={`${features.length} total`}
        newHref="/admin/homepage/features/new"
        newLabel="New feature"
      />
      <DataTable
        rows={features as unknown as DataRow[]}
        columns={featureColumns}
        filters={featureFilters}
        basePath="/admin/homepage/features"
        searchKeys={['title', 'description']}
        labelSingular="feature"
        labelPlural="features"
        emptyIconName="tag"
        onTogglePublished={toggleFeature}
        onDelete={deleteFeature}
        onDuplicate={duplicateFeature}
        onBulkPublish={bulkPublishFeatures}
        onBulkDelete={bulkDeleteFeatures}
      />
    </div>
  );
}
