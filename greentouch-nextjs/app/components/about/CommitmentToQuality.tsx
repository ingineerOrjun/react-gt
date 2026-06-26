import Link from 'next/link';
import { CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';
import Reveal from '../ui/Reveal';
import { QUALITY_POINTS } from './aboutData';

// Section 8 — commitment to quality. Large highlighted panel with a check-mark
// list; authoritative, trust-focused layout.
export default function CommitmentToQuality() {
  return (
    <section className="container py-16 md:py-24">
      <Reveal>
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-white to-green-50/60 shadow-soft-xl dark:border-slate-700/60 dark:from-slate-800/70 dark:to-green-950/20">
          <div className="grid gap-10 p-8 md:grid-cols-2 md:p-12 lg:p-14">
            {/* Heading side */}
            <div className="flex flex-col justify-center">
              <span className="inline-flex w-fit items-center gap-2 rounded-full bg-green-100 px-3.5 py-1.5 text-sm font-semibold text-green-700 dark:bg-green-900/40 dark:text-green-300">
                <ShieldCheck className="h-4 w-4" />
                Our Commitment
              </span>
              <h2 className="mt-5 text-3xl font-bold text-slate-900 dark:text-slate-100 md:text-4xl">
                Commitment to Quality
              </h2>
              <p className="mt-4 leading-relaxed text-slate-600 dark:text-slate-300">
                Quality is not a single step — it runs through how we develop, produce, and support
                every product. Here is what that means for the customers who rely on us.
              </p>
              <Link
                href="/contact"
                className="group mt-7 inline-flex w-fit items-center gap-2 rounded-lg bg-green-600 px-6 py-3 font-semibold text-white shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-green-700 hover:shadow-lg"
              >
                Talk to Our Team
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </Link>
            </div>

            {/* Checklist side */}
            <ul className="space-y-4">
              {QUALITY_POINTS.map(({ title, description }) => (
                <li
                  key={title}
                  className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700/60 dark:bg-slate-800/60"
                >
                  <span className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-900/40 dark:text-green-400">
                    <CheckCircle2 className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="font-semibold text-slate-900 dark:text-slate-100">{title}</h3>
                    <p className="mt-0.5 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                      {description}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
