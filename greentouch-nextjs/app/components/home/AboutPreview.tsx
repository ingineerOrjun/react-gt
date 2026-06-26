import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ShieldCheck, PackageCheck, Building2 } from 'lucide-react';
import Reveal from '../ui/Reveal';

const POINTS = [
  { icon: ShieldCheck, text: 'Consistent, dependable quality' },
  { icon: PackageCheck, text: 'Reliable bulk supply' },
  { icon: Building2, text: 'Built for institutions & industry' },
];

// Section 7 — about preview. Teaser that links to the full About page.
export default function AboutPreview() {
  return (
    <section className="bg-slate-50 py-8 dark:bg-slate-900/40 md:py-24">
      <div className="container grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <Reveal direction="right" className="max-lg:hidden">
          <div className="relative">
            <div
              aria-hidden="true"
              className="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-green-200/40 to-emerald-100/20 blur-2xl dark:from-green-800/20 dark:to-emerald-900/10"
            />
            <div className="relative aspect-[16/10] overflow-hidden rounded-3xl border border-slate-200 shadow-soft-xl dark:border-slate-700/60 lg:aspect-[4/3]">
              <Image
                src="/images/banner/bc.jpeg"
                alt="GreenTouch Chemicals"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div>
            <span className="text-sm font-semibold uppercase tracking-wider text-green-700 dark:text-green-400">
              About GreenTouch
            </span>
            <h2 className="mt-3 text-3xl font-bold text-slate-900 dark:text-slate-100 md:text-4xl">
              Built to Help You Maintain Cleaner, Safer Spaces
            </h2>
            <p className="mt-5 leading-relaxed text-slate-600 dark:text-slate-300 max-lg:line-clamp-3">
              We produce high-quality cleaning and hygiene products that homes, businesses, and
              institutions can genuinely rely on — focused on consistent quality, dependable supply,
              and responsive customer care.
            </p>
            <ul className="mt-6 space-y-3">
              {POINTS.map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-center gap-3 text-slate-700 dark:text-slate-200">
                  <span className="inline-flex shrink-0 rounded-lg bg-green-100 p-2 text-green-600 dark:bg-green-900/40 dark:text-green-400">
                    <Icon className="h-5 w-5" />
                  </span>
                  {text}
                </li>
              ))}
            </ul>
            <Link
              href="/about"
              className="group mt-8 inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-700 transition-all duration-300 hover:-translate-y-0.5 hover:border-green-300 hover:text-green-700 dark:border-slate-700 dark:bg-slate-900/50 dark:text-slate-200 dark:hover:border-green-700/60"
            >
              Learn More About Us
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
