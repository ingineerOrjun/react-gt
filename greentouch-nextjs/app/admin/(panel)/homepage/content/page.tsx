import { BackLink, AdminPageHeader } from '../../../../components/admin/ui/PageHeader';
import HomeContentForm from '../../../../components/admin/home/HomeContentForm';
import { getHomeContentFresh } from '../../../../lib/queries/home';

export const metadata = { title: 'Homepage content' };

export default async function HomeContentPage() {
  const content = await getHomeContentFresh();
  return (
    <div>
      <BackLink href="/admin/homepage" label="Back to homepage" />
      <AdminPageHeader title="Homepage content" description="Hero, Why-Choose heading and the final call-to-action." />
      <HomeContentForm content={content} />
    </div>
  );
}
