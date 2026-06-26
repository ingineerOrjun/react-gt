import Reveal from '../ui/Reveal';
import IconCard from '../ui/IconCard';
import { WHY_CHOOSE } from '../about/aboutData';

// Section 5 — why choose GreenTouch. Reuses shared, honest reasons.
export default function WhyChooseHome() {
  return (
    <section className="bg-slate-50 py-8 dark:bg-slate-900/40 md:py-24">
      <div className="container">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <Reveal>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 md:text-4xl">
              Why Choose GreenTouch
            </h2>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="mt-3 leading-relaxed text-slate-600 dark:text-slate-300">
              The reasons institutions and businesses rely on us for cleaning and hygiene supply.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {WHY_CHOOSE.map(({ icon, title, description }, i) => (
            <Reveal key={title} delay={i * 0.05} className="h-full">
              <IconCard icon={icon} title={title} description={description} clampMobile />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
