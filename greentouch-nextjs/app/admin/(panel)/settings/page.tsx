import { AdminPageHeader } from '../../../components/admin/ui/PageHeader';
import SettingsForm from '../../../components/admin/settings/SettingsForm';
import { getSiteSettingsFresh } from '../../../lib/queries/site-settings';

export const metadata = { title: 'Settings' };

export default async function SettingsPage() {
  const settings = await getSiteSettingsFresh();

  return (
    <div>
      <AdminPageHeader
        title="Settings"
        description="Global company information — the single source of truth for the website, footer, metadata and structured data."
      />
      <SettingsForm settings={settings} />
    </div>
  );
}
