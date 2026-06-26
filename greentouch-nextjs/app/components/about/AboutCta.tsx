import Link from 'next/link';
import { ArrowRight, MessageSquare } from 'lucide-react';

// Section 9 — premium closing CTA. Mirrors the site's gradient CTA language.
export default function AboutCta() {
  return (
    <section className="relative overflow-hidden bg-brand-gradient py-16 text-white md:py-24">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,white,transparent_55%)] opacity-10"
      />
      <div className="container relative text-center">
        <h2 className="mx-auto max-w-3xl text-3xl font-bold md:text-4xl">
          Let&apos;s Build Cleaner, Better Environments Together
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-green-50/90">
          Whether you&apos;re looking for product information, bulk supply solutions, or business
          partnerships, our team is ready to assist.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/contact"
            className="group inline-flex items-center gap-2 rounded-lg bg-white px-8 py-3.5 font-semibold text-green-700 shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-green-50"
          >
            <MessageSquare className="h-4 w-4" />
            Contact Us
          </Link>
          <Link
            href="/products"
            className="group inline-flex items-center gap-2 rounded-lg border-2 border-white/80 px-8 py-3.5 font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/10"
          >
            Explore Products
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
