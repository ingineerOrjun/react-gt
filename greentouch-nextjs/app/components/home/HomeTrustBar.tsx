import Reveal from '../ui/Reveal';
import { TRUST_BAR } from '../about/aboutData';

// Section 2 — compact trust bar. Honest value statements only (no statistics).
export default function HomeTrustBar() {
  return (
    <section className="border-y border-slate-200 bg-white py-6 dark:border-slate-800 dark:bg-slate-950 lg:py-8">
      <div className="container">
        <Reveal>
          <ul className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {TRUST_BAR.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center justify-center gap-2.5 text-center">
                <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-900/40 dark:text-green-400">
                  <Icon className="h-5 w-5" />
                </span>
                <span className="text-sm font-semibold text-slate-700 dark:text-slate-200 sm:text-base">
                  {label}
                </span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
