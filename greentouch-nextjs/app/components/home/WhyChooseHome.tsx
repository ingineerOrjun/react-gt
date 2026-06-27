import Reveal from '../ui/Reveal';
import IconCard from '../ui/IconCard';
import { getHomeContent } from '../../lib/queries/home';
import { resolveIcon } from '../../lib/icon-map';

// Section 5 — why choose GreenTouch. Header + cards are database-driven
// (home_sections['why_choose'] + home_features).
export default async function WhyChooseHome() {
  const { whyChoose, features } = await getHomeContent();
  return (
    <section className="bg-slate-50 py-8 dark:bg-slate-900/40 md:py-24">
      <div className="container">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <Reveal>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 md:text-4xl">
              {whyChoose.title}
            </h2>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="mt-3 leading-relaxed text-slate-600 dark:text-slate-300">
              {whyChoose.subtitle}
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {features.map((f, i) => (
            <Reveal key={f.title} delay={i * 0.05} className="h-full">
              <IconCard icon={resolveIcon(f.icon)} title={f.title} description={f.description} clampMobile />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
