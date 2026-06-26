import Reveal from '../ui/Reveal';
import IconCard from '../ui/IconCard';
import { INDUSTRIES } from './productsData';

// Industries served — premium centered icon cards.
export default function IndustriesServed() {
  return (
    <section className="bg-slate-50 py-16 dark:bg-slate-900/40 md:py-20">
      <div className="container">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <Reveal>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 md:text-3xl">
              Industries We Serve
            </h2>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="mt-3 leading-relaxed text-slate-600 dark:text-slate-300">
              Specialised solutions for a wide range of sectors, each with specific requirements.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {INDUSTRIES.map(({ icon, title, description }, i) => (
            <Reveal key={title} delay={i * 0.05} className="h-full">
              <IconCard icon={icon} title={title} description={description} align="center" />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
