import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import WhatsappIcon from '../products/detail/WhatsappIcon';
import { CONTACT_INFO } from '../../lib/constants';

const whatsappHref = `https://wa.me/977${CONTACT_INFO.phone}?text=${encodeURIComponent(
  'Hello GreenTouch, I would like to request a quote for your cleaning and hygiene products.'
)}`;

// Large CTA band shown above the footer body. Server Component; pure-CSS hover.
export default function FooterCTA() {
  return (
    <section className="relative overflow-hidden bg-brand-gradient text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,white,transparent_55%)] opacity-10"
      />
      <div className="container relative py-14 md:py-16">
        <div className="flex flex-col items-center gap-8 text-center lg:flex-row lg:justify-between lg:text-left">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-bold md:text-3xl">
              Ready to Order Reliable Cleaning &amp; Hygiene Supply?
            </h2>
            <p className="mt-3 text-green-50/90 md:text-lg">
              Request a quote or message us on WhatsApp — bulk and custom quantities welcome, with a
              typical 24-hour response.
            </p>
          </div>
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <Link
              href="/contact"
              className="group inline-flex items-center justify-center gap-2 rounded-lg bg-white px-7 py-3.5 font-semibold text-green-700 shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-green-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-green-600"
            >
              Request a Quote
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </Link>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Inquire on WhatsApp"
              className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-white/80 px-7 py-3.5 font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-green-600"
            >
              <WhatsappIcon className="h-5 w-5" />
              WhatsApp Inquiry
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
