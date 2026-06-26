import Reveal from '../ui/Reveal';
import { MISSION, VISION } from './aboutData';

const CARDS = [
  { ...MISSION, accent: 'from-green-600 to-green-700' },
  { ...VISION, accent: 'from-emerald-600 to-teal-700' },
];

// Section 3 — mission & vision. Two large, distinct cards with elegant icons and
// a CSS hover lift.
export default function MissionVision() {
  return (
    <section className="bg-slate-50 py-16 dark:bg-slate-900/40 md:py-24">
      <div className="container">
        <div className="grid gap-6 md:grid-cols-2 md:gap-8">
          {CARDS.map(({ icon: Icon, title, lead, body, accent }, i) => (
            <Reveal key={title} delay={i * 0.08} className="h-full">
              <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-slate-700/60 dark:bg-slate-800/60 md:p-10">
                <div
                  aria-hidden="true"
                  className={`absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ${accent}`}
                />
                <span
                  className={`inline-flex w-fit rounded-2xl bg-gradient-to-br ${accent} p-4 text-white shadow-md transition-transform duration-300 ease-out group-hover:scale-110`}
                >
                  <Icon className="h-7 w-7" />
                </span>
                <h2 className="mt-6 text-2xl font-bold text-slate-900 dark:text-slate-100">
                  {title}
                </h2>
                <p className="mt-2 text-lg font-semibold text-green-700 dark:text-green-400">
                  {lead}
                </p>
                <p className="mt-4 leading-relaxed text-slate-600 dark:text-slate-300">{body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
