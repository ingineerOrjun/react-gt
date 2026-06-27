'use server';

// Homepage section-content update (hero / why_choose / cta). Validates, writes
// the home_sections rows, records an audit entry, and revalidates the cached
// homepage so the public site updates immediately.
import { revalidatePath, revalidateTag } from 'next/cache';
import { requireUser } from '../admin/crud';
import { HOME_CONTENT_TAG } from '../queries/home';
import type { ActionState } from '../../components/admin/ui/types';

const lines = (raw: string): string[] =>
  raw.split('\n').map((l) => l.trim()).filter(Boolean);

export async function updateHomeContent(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const { supabase, user } = await requireUser();
  const str = (k: string) => String(formData.get(k) ?? '').trim();

  if (!str('hero_title')) return { error: 'Hero headline is required.' };
  if (!str('why_title')) return { error: 'Why-Choose title is required.' };
  if (!str('cta_title')) return { error: 'CTA headline is required.' };

  const heroMeta = {
    points: lines(str('hero_points')),
    card_title: str('hero_card_title'),
    card_subtitle: str('hero_card_subtitle'),
  };

  const updates: { key: string; payload: Record<string, unknown> }[] = [
    {
      key: 'hero',
      payload: {
        eyebrow: str('hero_eyebrow') || null,
        title: str('hero_title'),
        highlight: str('hero_highlight') || null,
        subtitle: str('hero_subtitle') || null,
        button_text: str('hero_button_text') || null,
        button_link: str('hero_button_link') || null,
        button2_text: str('hero_button2_text') || null,
        button2_link: str('hero_button2_link') || null,
        image: str('hero_image') || null,
        meta: heroMeta,
      },
    },
    { key: 'why_choose', payload: { title: str('why_title'), subtitle: str('why_subtitle') || null } },
    {
      key: 'cta',
      payload: {
        title: str('cta_title'),
        content: str('cta_content') || null,
        button_text: str('cta_button_text') || null,
        button_link: str('cta_button_link') || null,
      },
    },
  ];

  for (const u of updates) {
    const { error } = await supabase.from('home_sections').update(u.payload as never).eq('section_key', u.key);
    if (error) return { error: 'Could not save homepage content. Please try again.' };
  }

  try {
    await supabase.from('activity_log').insert({
      actor_id: user.id,
      actor_email: user.email ?? null,
      entity: 'home_sections',
      action: 'update',
      field: 'hero, why_choose, cta',
    } as never);
  } catch {
    /* audit best-effort */
  }

  revalidateTag(HOME_CONTENT_TAG);
  revalidatePath('/');
  revalidatePath('/admin/homepage');
  return { error: null, ok: true };
}
