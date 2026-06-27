import { getAdminBlogs } from '../../../lib/queries/admin';
import { AdminPageHeader } from '../../../components/admin/ui/PageHeader';
import DataTable, { type DataRow } from '../../../components/admin/ui/DataTable';
import { blogColumns, blogFilters } from '../../../components/admin/ui/specs';
import {
  toggleBlogPublished,
  deleteBlog,
  duplicateBlog,
  bulkPublishBlogs,
  bulkDeleteBlogs,
} from '../../../lib/actions/blogs';

export const metadata = { title: 'Blogs' };

export default async function AdminBlogsPage() {
  const blogs = await getAdminBlogs();

  return (
    <div>
      <AdminPageHeader
        title="Blog"
        description={`${blogs.length} total`}
        newHref="/admin/blogs/new"
        newLabel="New article"
      />
      <DataTable
        rows={blogs as unknown as DataRow[]}
        columns={blogColumns}
        filters={blogFilters}
        basePath="/admin/blogs"
        searchKeys={['title', 'slug']}
        labelSingular="article"
        labelPlural="articles"
        emptyIconName="file"
        onTogglePublished={toggleBlogPublished}
        onDelete={deleteBlog}
        onDuplicate={duplicateBlog}
        onBulkPublish={bulkPublishBlogs}
        onBulkDelete={bulkDeleteBlogs}
      />
    </div>
  );
}
