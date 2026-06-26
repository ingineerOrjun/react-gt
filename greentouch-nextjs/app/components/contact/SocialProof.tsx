import Reveal from '../ui/Reveal';
import IconCard from '../ui/IconCard';
import { SOCIAL_PROOF } from './contactData';

// Section 8 — credibility cards. Honest positioning statements only; no
// fabricated testimonials or statistics.
export default function SocialProof() {
  return (
    <section className="container py-16 md:py-20">
      <div className="mx-auto mb-12 max-w-2xl text-center">
        <Reveal>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 md:text-3xl">
            Built on Trust and Service
          </h2>
        </Reveal>
        <Reveal delay={0.05}>
          <p className="mt-3 text-slate-600 dark:text-slate-300">
            The organisations we serve and the standards we hold ourselves to.
          </p>
        </Reveal>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {SOCIAL_PROOF.map(({ icon, title, description }, i) => (
          <Reveal key={title} delay={i * 0.06} className="h-full">
            <IconCard icon={icon} title={title} description={description} align="center" />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
