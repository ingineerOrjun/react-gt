import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import WhatsappIcon from '../products/detail/WhatsappIcon';
import { CONTACT_INFO } from '../../lib/constants';

const whatsappHref = `https://wa.me/977${CONTACT_INFO.phone}?text=${encodeURIComponent(
  'Hello GreenTouch, I would like to request a quote for your cleaning and hygiene products.'
)}`;

// Section 10 — final conversion CTA.
export default function HomeFinalCta() {
  return (
    <section className="relative overflow-hidden bg-brand-gradient py-10 text-white md:py-24">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,white,transparent_55%)] opacity-10"
      />
      <div className="container relative text-center">
        <h2 className="mx-auto max-w-3xl text-3xl font-bold md:text-4xl">
          Ready to Order Reliable Cleaning &amp; Hygiene Supply?
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-green-50/90">
          Request a quote or message us on WhatsApp — bulk and custom quantities welcome. We
          typically respond within 24 hours.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/contact"
            className="group inline-flex items-center gap-2 rounded-lg bg-white px-8 py-3.5 font-semibold text-green-700 shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-green-50"
          >
            Request a Quote
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </Link>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Inquire on WhatsApp"
            className="inline-flex items-center gap-2 rounded-lg border-2 border-white/80 px-8 py-3.5 font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/10"
          >
            <WhatsappIcon className="h-5 w-5" />
            WhatsApp Inquiry
          </a>
        </div>
      </div>
    </section>
  );
}
