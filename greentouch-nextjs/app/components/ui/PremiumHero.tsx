import Link from 'next/link';
import { ArrowRight, type LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';
import Reveal from './Reveal';
import { cn } from '../../lib/utils';
import type { HeroTrustItem } from './heroData';

export interface HeroCta {
  label: string;
  href: string;
  icon?: LucideIcon;
  variant?: 'primary' | 'outline';
  external?: boolean;
}

export interface HeroFloatingStat {
  icon: LucideIcon;
  value: string;
  label: string;
}

interface PremiumHeroProps {
  eyebrow: string;
  /** Playfair headline — pass JSX so pages control the gradient span. */
  headline: ReactNode;
  copy: string;
  trust?: HeroTrustItem[];
  /** Hide trust chips below lg (Contact keeps the hero short above the form). */
  trustMobileHidden?: boolean;
  ctas?: HeroCta[];
  /** Hide the CTA row below lg (Contact relies on the sticky bar + form). */
  ctasMobileHidden?: boolean;
  /** Desktop-only (xl) floating glass panels for layered depth. Max 2 used. */
  floatingStats?: HeroFloatingStat[];
  /** Section vertical padding (lets pages preserve their mobile rhythm). */
  padding?: string;
}

// ── One premium hero system for About / Products / Contact ───────────────────
// Server Component. Layered background (brand glows + dot-grid + gold accent),
// the locked hierarchy (eyebrow → headline → copy → trust → CTAs), and optional
// desktop-only floating glass stat panels for depth. The LCP headline renders
// statically; only secondary rows use <Reveal>. Motion ≤ translateY(-4px) and
// respects prefers-reduced-motion via the global MotionConfig + CSS.
export default function PremiumHero({
  eyebrow,
  headline,
  copy,
  trust,
  trustMobileHidden,
  ctas = [],
  ctasMobileHidden,
  floatingStats,
  padding = 'py-14 md:py-24',
}: PremiumHeroProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-green-50 via-white to-white dark:from-green-950/40 dark:via-slate-950 dark:to-slate-950">
      {/* Layered decorative background — brand glows, gold accent, dot grid. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-green-300/30 blur-3xl dark:bg-green-700/20" />
        <div className="absolute -bottom-32 -left-24 h-80 w-80 rounded-full bg-emerald-200/30 blur-3xl dark:bg-emerald-800/10" />
        <div className="absolute left-1/2 top-0 h-44 w-72 -translate-x-1/2 rounded-full bg-[#C8A24C]/10 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(theme(colors.green.500/0.08)_1px,transparent_1px)] [background-size:22px_22px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
      </div>

      <div className={cn('container relative', padding)}>
        {/* Desktop-only floating glass stat panels (decorative; data is also in
            the accessible trust chips below). */}
        {floatingStats && floatingStats.length > 0 && (
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 hidden xl:block">
            {floatingStats.slice(0, 2).map((s, i) => (
              <div
                key={s.label}
                className={cn(
                  'absolute flex w-56 items-center gap-3 rounded-2xl border border-slate-200/80 bg-white/70 p-4 shadow-card backdrop-blur-md dark:border-slate-700/60 dark:bg-slate-900/60',
                  i === 0 ? 'left-4 top-12' : 'bottom-12 right-4'
                )}
              >
                <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-green-50 to-green-100 text-green-600 ring-1 ring-green-200/70 dark:from-green-900/30 dark:to-green-900/50 dark:text-green-400">
                  <s.icon className="h-5 w-5" />
                </span>
                <div className="min-w-0">
                  <div className="truncate text-sm font-bold text-slate-900 dark:text-slate-100">
                    {s.value}
                  </div>
                  <div className="truncate text-xs text-slate-500 dark:text-slate-400">{s.label}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="relative mx-auto max-w-3xl text-center">
          {/* Eyebrow */}
          <span className="inline-flex items-center gap-2 rounded-full border border-green-200 bg-white/70 px-4 py-1.5 text-sm font-medium text-green-700 shadow-sm backdrop-blur dark:border-green-800/60 dark:bg-slate-900/60 dark:text-green-300">
            <span className="h-1.5 w-1.5 rounded-full bg-[#C8A24C]" />
            {eyebrow}
          </span>

          {/* Headline (Playfair) — static for fast, no-JS LCP. */}
          <h1 className="mt-6 text-balance font-display text-[clamp(2.75rem,5vw,4.75rem)] font-bold tracking-tight text-slate-900 dark:text-slate-100 leading-[1.06]">
            {headline}
          </h1>

          {/* Supporting copy */}
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-slate-600 dark:text-slate-300">
            {copy}
          </p>

          {/* Trust indicators — premium glass chips. */}
          {trust && trust.length > 0 && (
            <Reveal delay={0.1}>
              <ul
                className={cn(
                  'mt-7 flex flex-wrap items-center justify-center gap-2.5',
                  trustMobileHidden && 'max-lg:hidden'
                )}
              >
                {trust.map(({ icon: Icon, label }) => (
                  <li
                    key={label}
                    className="inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-white/70 px-3.5 py-1.5 text-sm font-medium text-slate-700 shadow-sm backdrop-blur dark:border-slate-700/60 dark:bg-slate-800/50 dark:text-slate-200"
                  >
                    <Icon className="h-4 w-4 text-green-600 dark:text-green-400" />
                    {label}
                  </li>
                ))}
              </ul>
            </Reveal>
          )}

          {/* CTA row */}
          {ctas.length > 0 && (
          <Reveal delay={0.15}>
            <div
              className={cn(
                'mt-8 flex flex-wrap items-center justify-center gap-3',
                ctasMobileHidden && 'max-lg:hidden'
              )}
            >
              {ctas.map(({ label, href, icon: Icon, variant = 'primary', external }) => {
                const cls =
                  variant === 'primary'
                    ? 'group inline-flex items-center gap-2 rounded-xl bg-green-600 px-6 py-3 font-semibold text-white shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-green-700 hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900'
                    : 'group inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white/70 px-6 py-3 font-semibold text-slate-700 backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:border-green-300 hover:text-green-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 dark:border-slate-700 dark:bg-slate-900/50 dark:text-slate-200 dark:hover:border-green-700/60 dark:focus-visible:ring-offset-slate-900';
                const content = (
                  <>
                    {Icon && <Icon className="h-4 w-4" />}
                    {label}
                    {variant === 'primary' && !/^(tel:|mailto:|#)/.test(href) && (
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                    )}
                  </>
                );
                return external ? (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer" className={cls}>
                    {content}
                  </a>
                ) : (
                  <Link key={label} href={href} className={cls}>
                    {content}
                  </Link>
                );
              })}
            </div>
          </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}
