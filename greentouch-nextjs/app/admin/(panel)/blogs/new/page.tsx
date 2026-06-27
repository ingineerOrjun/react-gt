import { BackLink } from '../../../../components/admin/ui/PageHeader';
import ResourceForm from '../../../../components/admin/ui/ResourceForm';
import { blogFields } from '../../../../components/admin/ui/specs';
import { saveBlog } from '../../../../lib/actions/blogs';

export const metadata = { title: 'New article' };

export default function NewBlogPage() {
  return (
    <div>
      <BackLink href="/admin/blogs" label="Back to blog" />
      <h1 className="mb-6 text-2xl font-bold text-slate-900 dark:text-slate-100">New article</h1>
      <ResourceForm
        fields={blogFields}
        action={saveBlog}
        basePath="/admin/blogs"
        labelSingular="article"
        createLabel="Create article"
        draftKey="gt-draft-blog-new"
      />
    </div>
  );
}
