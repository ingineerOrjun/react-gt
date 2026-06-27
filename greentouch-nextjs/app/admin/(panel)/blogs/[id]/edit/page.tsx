import { notFound } from 'next/navigation';
import { BackLink } from '../../../../../components/admin/ui/PageHeader';
import ResourceForm from '../../../../../components/admin/ui/ResourceForm';
import { blogFields } from '../../../../../components/admin/ui/specs';
import { saveBlog, deleteBlog, duplicateBlog } from '../../../../../lib/actions/blogs';
import { getAdminBlog } from '../../../../../lib/queries/admin';

export const metadata = { title: 'Edit article' };

export default async function EditBlogPage({ params }: { params: { id: string } }) {
  const blog = await getAdminBlog(params.id);
  if (!blog) notFound();

  return (
    <div>
      <BackLink href="/admin/blogs" label="Back to blog" />
      <h1 className="mb-6 text-2xl font-bold text-slate-900 dark:text-slate-100">Edit article</h1>
      <ResourceForm
        fields={blogFields}
        action={saveBlog}
        record={blog as unknown as Record<string, unknown>}
        basePath="/admin/blogs"
        labelSingular="article"
        createLabel="Create article"
        previewHref={blog.published ? `/blog/${blog.slug}` : undefined}
        onDelete={deleteBlog}
        onDuplicate={duplicateBlog}
        draftKey={`gt-draft-blog-${blog.id}`}
      />
    </div>
  );
}
