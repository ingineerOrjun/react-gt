import Reveal from '../ui/Reveal';
import IconCard from '../ui/IconCard';
import { CORE_VALUES } from './aboutData';

// Section 4 — core values. Four premium cards, consistent heights, CSS hover.
export default function CoreValues() {
  return (
    <section className="container py-16 md:py-24">
      <div className="mx-auto mb-12 max-w-2xl text-center">
        <Reveal>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 md:text-4xl">
            The Values Behind Our Work
          </h2>
        </Reveal>
        <Reveal delay={0.05}>
          <p className="mt-3 leading-relaxed text-slate-600 dark:text-slate-300">
            Principles that shape every product we make and every relationship we build.
          </p>
        </Reveal>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {CORE_VALUES.map(({ icon, title, description }, i) => (
          <Reveal key={title} delay={i * 0.06} className="h-full">
            <IconCard icon={icon} title={title} description={description} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
