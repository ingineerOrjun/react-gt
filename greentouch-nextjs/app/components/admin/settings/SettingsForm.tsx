'use client';

import React, { useEffect, useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import {
  Building2,
  Phone,
  MapPin,
  Share2,
  Search,
  Clock,
  Map,
  PanelBottom,
  AlertCircle,
  CheckCircle2,
  Loader2,
  Save,
} from 'lucide-react';
import { updateSiteSettings } from '../../../lib/actions/settings';
import { Section, Field } from './fields';
import type { ActionState } from '../ui/types';
import type { SiteSettings } from '../../../lib/site-settings-defaults';

const initialState: ActionState = { error: null };

export default function SettingsForm({ settings }: { settings: SiteSettings }) {
  const [state, formAction] = useFormState(updateSiteSettings, initialState);
  const [dirty, setDirty] = useState(false);

  // Reset dirty + surface success when a save resolves ok.
  useEffect(() => {
    if (state.ok) setDirty(false);
  }, [state.ok]);

  // Warn on navigation with unsaved edits.
  useEffect(() => {
    const h = (e: BeforeUnloadEvent) => {
      if (dirty) {
        e.preventDefault();
        e.returnValue = '';
      }
    };
    window.addEventListener('beforeunload', h);
    return () => window.removeEventListener('beforeunload', h);
  }, [dirty]);

  const s = settings;
  const hoursText = s.businessHours.map((h) => `${h.label} | ${h.value}`).join('\n');

  return (
    <form action={formAction} onInput={() => setDirty(true)} className="space-y-6 pb-24">
      {state.error && (
        <div role="alert" className="flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700 dark:border-red-800 dark:bg-red-900/30 dark:text-red-300">
          <AlertCircle className="h-4 w-4 shrink-0" />
          {state.error}
        </div>
      )}
      {state.ok && !dirty && (
        <div role="status" className="flex items-center gap-2 rounded-lg border border-green-200 bg-green-50 p-3 text-sm text-green-700 dark:border-green-800 dark:bg-green-900/30 dark:text-green-300">
          <CheckCircle2 className="h-4 w-4 shrink-0" />
          Settings saved — the public website and dashboard are updated.
        </div>
      )}

      <Section title="Company" icon={Building2} description="Identity shown across the site, footer and structured data.">
        <Field label="Company name" name="company_name" defaultValue={s.companyName} required maxLength={160} />
        <Field label="Tagline" name="company_tagline" defaultValue={s.companyTagline} maxLength={200} />
        <Field label="Description" name="company_description" defaultValue={s.companyDescription} textarea rows={3} maxLength={1200} help="Short company description for SEO / structured data." />
      </Section>

      <Section title="Contact" icon={Phone} description="Used in the footer, contact page, sticky bar and links.">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Email" name="contact_email" type="email" defaultValue={s.email} required />
          <Field label="Phone" name="contact_phone" defaultValue={s.phone} required help="Digits only for tel: / wa.me links." />
          <Field label="WhatsApp" name="whatsapp" defaultValue={s.whatsapp} help="Digits only. Defaults to phone if blank." />
        </div>
      </Section>

      <Section title="Address" icon={MapPin} description="Full address plus normalized parts for structured data.">
        <Field label="Full address (one line)" name="address" defaultValue={s.address} required maxLength={300} />
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Street / locality" name="address_street" defaultValue={s.addressStreet} />
          <Field label="Municipality" name="address_municipality" defaultValue={s.addressMunicipality} />
          <Field label="District" name="address_district" defaultValue={s.addressDistrict} />
          <Field label="Postal code" name="address_postal_code" defaultValue={s.addressPostalCode} />
          <Field label="Country" name="address_country" defaultValue={s.addressCountry} />
        </div>
      </Section>

      <Section title="Service areas" icon={Map} description="One city per line. Shown on contact, footer and trust messaging.">
        <Field label="Cities served" name="service_areas" defaultValue={s.serviceAreas.join('\n')} textarea rows={4} mono />
      </Section>

      <Section title="Business hours" icon={Clock} description="One per line as “Label | Value”.">
        <Field label="Hours" name="business_hours" defaultValue={hoursText} textarea rows={3} mono />
      </Section>

      <Section title="Social links" icon={Share2} description="Full URLs. Leave blank to hide a platform.">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Facebook" name="social_facebook" type="url" defaultValue={s.social.facebook ?? ''} />
          <Field label="Twitter / X" name="social_twitter" type="url" defaultValue={s.social.twitter ?? ''} />
          <Field label="Instagram" name="social_instagram" type="url" defaultValue={s.social.instagram ?? ''} />
          <Field label="LinkedIn" name="social_linkedin" type="url" defaultValue={s.social.linkedin ?? ''} />
          <Field label="YouTube" name="social_youtube" type="url" defaultValue={s.social.youtube ?? ''} />
          <Field label="TikTok" name="social_tiktok" type="url" defaultValue={s.social.tiktok ?? ''} />
        </div>
      </Section>

      <Section title="SEO defaults" icon={Search} description="Default metadata when a page doesn’t specify its own.">
        <Field label="Default title" name="seo_title" defaultValue={s.seoTitle} maxLength={200} />
        <Field label="Default description" name="seo_description" defaultValue={s.seoDescription} textarea rows={2} maxLength={320} />
        <Field label="Keywords" name="seo_keywords" defaultValue={s.seoKeywords} maxLength={500} help="Comma-separated." />
        <Field label="OG image URL" name="seo_og_image" type="url" defaultValue={s.seoOgImage} help="Leave blank to use the generated OG image." />
      </Section>

      <Section title="Footer" icon={PanelBottom} description="Copyright line shown in the footer.">
        <Field label="Copyright" name="footer_copyright" defaultValue={s.footerCopyright} maxLength={300} />
      </Section>

      {/* Floating save bar */}
      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-slate-200 bg-white/90 px-4 py-3 backdrop-blur dark:border-slate-800 dark:bg-slate-900/90 lg:pl-64">
        <div className="mx-auto flex max-w-6xl items-center gap-3">
          <span className="text-sm text-slate-500 dark:text-slate-400">
            {dirty ? (
              <span className="font-medium text-amber-600 dark:text-amber-400">Unsaved changes</span>
            ) : (
              'All changes saved'
            )}
          </span>
          <div className="ml-auto">
            <SubmitButton />
          </div>
        </div>
      </div>
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex items-center justify-center gap-2 rounded-lg bg-green-600 px-6 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-green-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 disabled:opacity-70 dark:focus-visible:ring-offset-slate-950"
    >
      {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
      Save settings
    </button>
  );
}
