import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, MessageSquare, Check, ShieldCheck } from 'lucide-react';
import Reveal from '../ui/Reveal';
import WhatsappIcon from '../products/detail/WhatsappIcon';
import { CONTACT_INFO } from '../../lib/constants';
import { HERO_POINTS } from './homeData';

const whatsappHref = `https://wa.me/977${CONTACT_INFO.phone}?text=${encodeURIComponent(
  'Hello GreenTouch, I would like to inquire about your cleaning and hygiene products.'
)}`;

// Premium homepage hero (server component). Split layout: messaging + CTAs on
// the left, product-focused visual on the right. The LCP image uses priority;
// the headline renders statically (no opacity-gate) for fast, no-JS LCP.
export default function HomeHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-green-50 via-white to-white dark:from-green-950/40 dark:via-slate-950 dark:to-slate-950">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-green-300/30 blur-3xl dark:bg-green-700/20" />
        <div className="absolute -bottom-32 -left-24 h-80 w-80 rounded-full bg-emerald-200/30 blur-3xl dark:bg-emerald-800/10" />
        <div className="absolute inset-0 bg-[radial-gradient(theme(colors.green.500/0.08)_1px,transparent_1px)] [background-size:22px_22px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
      </div>

      <div className="container relative grid items-center gap-4 py-4 md:py-24 lg:grid-cols-2 lg:gap-16">
        {/* Messaging */}
        <div>
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-green-200 bg-white/70 px-4 py-1.5 text-sm font-medium text-green-700 shadow-sm backdrop-blur dark:border-green-800/60 dark:bg-slate-900/60 dark:text-green-300">
              <span className="h-2 w-2 rounded-full bg-green-500" />
              Cleaning &amp; hygiene products, supplied reliably
            </span>
          </Reveal>

          <h1 className="mt-6 text-balance font-display text-[clamp(2.35rem,5vw,4.75rem)] font-bold tracking-tight text-slate-900 dark:text-slate-100 leading-[1.05]">
            Premium Cleaning Solutions for{' '}
            <span className="text-gradient-green">Homes, Businesses &amp; Industries</span>
          </h1>

          <p className="mt-5 max-w-xl text-lg leading-relaxed text-slate-600 dark:text-slate-300 max-lg:line-clamp-2">
            GreenTouch Chemicals delivers high-quality, eco-conscious cleaning and hygiene products —
            with dependable bulk supply for schools, hospitals, hotels, and facilities.
          </p>

          <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 max-lg:hidden">
            {HERO_POINTS.map((point) => (
              <li
                key={point}
                className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-200"
              >
                <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-900/50 dark:text-green-400">
                  <Check className="h-3 w-3" />
                </span>
                {point}
              </li>
            ))}
          </ul>

          <Reveal delay={0.1}>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/products"
                className="group inline-flex items-center gap-2 rounded-lg bg-green-600 px-6 py-3.5 font-semibold text-white shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-green-700 hover:shadow-lg"
              >
                Explore Products
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </Link>
              {/* Hidden on mobile — the global sticky bar already exposes
                  WhatsApp + Quote + Call, so we avoid redundant hero CTAs. */}
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Inquire on WhatsApp"
                className="inline-flex items-center gap-2 rounded-lg bg-[#25D366] px-6 py-3.5 font-semibold text-white shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:opacity-90 hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900 max-lg:hidden"
              >
                <WhatsappIcon className="h-5 w-5" />
                WhatsApp Inquiry
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white/70 px-6 py-3.5 font-semibold text-slate-700 backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:border-green-300 hover:text-green-700 dark:border-slate-700 dark:bg-slate-900/50 dark:text-slate-200 dark:hover:border-green-700/60 max-lg:hidden"
              >
                <MessageSquare className="h-4 w-4" />
                Contact Us
              </Link>
            </div>
          </Reveal>
        </div>

        {/* Product-focused visual */}
        <Reveal delay={0.15} direction="left">
          <div className="relative">
            <div
              aria-hidden="true"
              className="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-green-200/40 to-emerald-100/20 blur-2xl dark:from-green-800/20 dark:to-emerald-900/10"
            />
            <div className="relative aspect-[2/1] overflow-hidden rounded-3xl border border-slate-200 shadow-soft-xl dark:border-slate-700/60 lg:aspect-[4/3]">
              <Image
                src="/images/banner/bann.jpeg"
                alt="GreenTouch cleaning and hygiene products"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"
              />
            </div>
            {/* Floating trust card */}
            <div className="absolute -bottom-5 left-5 right-5 mx-auto flex max-w-sm items-center gap-3 rounded-2xl border border-slate-200 bg-white/95 p-4 shadow-lg backdrop-blur dark:border-slate-700/60 dark:bg-slate-900/90 max-lg:hidden sm:left-6 sm:right-auto">
              <span className="inline-flex shrink-0 rounded-xl bg-green-100 p-2.5 text-green-600 dark:bg-green-900/40 dark:text-green-400">
                <ShieldCheck className="h-6 w-6" />
              </span>
              <div>
                <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                  Quality you can rely on
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Consistent supply for institutions &amp; industry
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
