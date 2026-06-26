import Reveal from '../ui/Reveal';
import { INQUIRY_STEPS } from './contactData';

// Section 5 — inquiry process timeline. Horizontal on desktop, vertical on
// mobile, with a connecting line and staggered reveal.
export default function InquiryTimeline() {
  return (
    <section className="relative overflow-hidden bg-slate-50 py-16 dark:bg-slate-900/40 md:py-20">
      <div className="container">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <Reveal>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 md:text-3xl">
              How Your Inquiry Is Handled
            </h2>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="mt-3 text-slate-600 dark:text-slate-300">
              A clear, four-step path from first message to reliable supply.
            </p>
          </Reveal>
        </div>

        <ol className="relative grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Connector line (desktop only, behind the nodes). */}
          <div
            aria-hidden="true"
            className="absolute left-0 right-0 top-7 hidden h-px bg-gradient-to-r from-transparent via-green-300 to-transparent dark:via-green-800 lg:block"
          />
          {INQUIRY_STEPS.map(({ icon: Icon, title, description }, i) => (
            <li key={title} className="relative">
              <Reveal delay={i * 0.1}>
                <div className="flex flex-col items-center text-center">
                  <div className="relative z-10 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-green-600 shadow-md ring-1 ring-green-200/70 dark:bg-slate-800 dark:text-green-400 dark:ring-green-800/50">
                    <Icon className="h-6 w-6" />
                    <span className="absolute -right-1.5 -top-1.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-green-600 text-xs font-bold text-white shadow">
                      {i + 1}
                    </span>
                  </div>
                  <h3 className="mt-4 font-semibold text-slate-900 dark:text-slate-100">{title}</h3>
                  <p className="mt-1.5 max-w-xs text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                    {description}
                  </p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
