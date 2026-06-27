'use client';

import { useEffect, useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import {
  Sparkles,
  Award,
  Megaphone,
  AlertCircle,
  CheckCircle2,
  Loader2,
  Save,
} from 'lucide-react';
import { updateHomeContent } from '../../../lib/actions/home-content';
import { Section, Field } from '../settings/fields';
import type { ActionState } from '../ui/types';
import type { HomeContent } from '../../../lib/queries/home';

const initialState: ActionState = { error: null };

export default function HomeContentForm({ content }: { content: HomeContent }) {
  const [state, formAction] = useFormState(updateHomeContent, initialState);
  const [dirty, setDirty] = useState(false);

  useEffect(() => {
    if (state.ok) setDirty(false);
  }, [state.ok]);

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

  const { hero, whyChoose, cta } = content;

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
          Homepage content saved — the live homepage is updated.
        </div>
      )}

      <Section title="Hero" icon={Sparkles} description="The first thing visitors see. Headline + highlighted words render as one line.">
        <Field label="Eyebrow" name="hero_eyebrow" defaultValue={hero.eyebrow} maxLength={120} />
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Headline" name="hero_title" defaultValue={hero.title} required maxLength={120} />
          <Field label="Highlighted words" name="hero_highlight" defaultValue={hero.highlight} maxLength={120} help="Rendered in the green gradient." />
        </div>
        <Field label="Subtitle" name="hero_subtitle" defaultValue={hero.subtitle} textarea rows={3} maxLength={400} />
        <Field label="Hero points" name="hero_points" defaultValue={hero.points.join('\n')} textarea rows={3} mono help="One per line (desktop checklist)." />
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Primary button text" name="hero_button_text" defaultValue={hero.buttonText} maxLength={40} />
          <Field label="Primary button link" name="hero_button_link" defaultValue={hero.buttonLink} maxLength={200} />
          <Field label="Secondary button text" name="hero_button2_text" defaultValue={hero.button2Text} maxLength={40} />
          <Field label="Secondary button link" name="hero_button2_link" defaultValue={hero.button2Link} maxLength={200} />
        </div>
        <Field label="Hero image" name="hero_image" defaultValue={hero.image} maxLength={300} help="Path under /public or a full URL." />
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Floating card title" name="hero_card_title" defaultValue={hero.cardTitle} maxLength={60} />
          <Field label="Floating card subtitle" name="hero_card_subtitle" defaultValue={hero.cardSubtitle} maxLength={120} />
        </div>
      </Section>

      <Section title="Why Choose" icon={Award} description="Section heading above the feature cards (cards are managed under Features).">
        <Field label="Title" name="why_title" defaultValue={whyChoose.title} required maxLength={120} />
        <Field label="Subtitle" name="why_subtitle" defaultValue={whyChoose.subtitle} textarea rows={2} maxLength={300} />
      </Section>

      <Section title="Final CTA" icon={Megaphone} description="The closing conversion band. The WhatsApp button uses your Settings number.">
        <Field label="Headline" name="cta_title" defaultValue={cta.title} required maxLength={160} />
        <Field label="Description" name="cta_content" defaultValue={cta.content} textarea rows={2} maxLength={320} />
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Primary button text" name="cta_button_text" defaultValue={cta.buttonText} maxLength={40} />
          <Field label="Primary button link" name="cta_button_link" defaultValue={cta.buttonLink} maxLength={200} />
        </div>
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
          <div className="ml-auto flex items-center gap-2">
            <a href="/" target="_blank" rel="noopener noreferrer" className="rounded-lg px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800">
              Preview
            </a>
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
      Save content
    </button>
  );
}
