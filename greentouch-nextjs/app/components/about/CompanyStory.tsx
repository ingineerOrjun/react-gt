import { Quote, Leaf } from 'lucide-react';
import Reveal from '../ui/Reveal';
import { STORY_POINTS } from './aboutData';

// Section 2 — company story. Two-column: narrative (left) + visual trust card
// (right). Honest framing, no invented history.
export default function CompanyStory() {
  return (
    <section className="container py-16 md:py-24">
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        {/* Narrative */}
        <Reveal>
          <div>
            <span className="text-sm font-semibold uppercase tracking-wider text-green-700 dark:text-green-400">
              Our Story
            </span>
            <h2 className="mt-3 text-3xl font-bold text-slate-900 dark:text-slate-100 md:text-4xl">
              Built to Help You Maintain Cleaner, Safer Spaces
            </h2>
            <div className="mt-6 space-y-4 leading-relaxed text-slate-600 dark:text-slate-300">
              <p>
                GreenTouch Chemicals was established to give homes, businesses, and institutions
                access to cleaning and hygiene products they can genuinely rely on — effective,
                consistent, and available when they need them.
              </p>
              <p>
                Quality sits at the centre of everything we make. We focus on dependable
                formulations and careful production so that every order performs the way our
                customers expect.
              </p>
              <p className="max-lg:hidden">
                Just as important is the relationship behind each order. We listen to the practical
                needs of the schools, hotels, facilities, and businesses we serve, and we keep
                improving our products and processes to support them over the long term.
              </p>
            </div>
          </div>
        </Reveal>

        {/* Visual trust card */}
        <Reveal delay={0.1}>
          <div className="relative">
            <div
              aria-hidden="true"
              className="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-green-200/40 to-emerald-100/20 blur-2xl dark:from-green-800/20 dark:to-emerald-900/10"
            />
            <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-green-600 to-green-700 p-8 text-white shadow-soft-xl dark:border-slate-700/60 md:p-10">
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,white,transparent_60%)] opacity-10"
              />
              <Quote className="h-9 w-9 text-white/70" />
              <p className="relative mt-4 text-2xl font-bold leading-snug md:text-3xl">
                Building Trust Through Quality and Consistency
              </p>
              <ul className="relative mt-8 space-y-3">
                {STORY_POINTS.map(({ icon: Icon, label }) => (
                  <li key={label} className="flex items-center gap-3">
                    <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/15 ring-1 ring-white/20">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="font-medium text-green-50">{label}</span>
                  </li>
                ))}
              </ul>
              <div className="relative mt-8 flex items-center gap-2 border-t border-white/15 pt-5 text-sm text-green-50/90">
                <Leaf className="h-4 w-4" />
                Eco-conscious cleaning &amp; hygiene solutions
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
