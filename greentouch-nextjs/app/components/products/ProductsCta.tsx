import Link from 'next/link';
import { ArrowRight, Phone } from 'lucide-react';
import { getSiteSettings } from '../../lib/queries/site-settings';

// Closing conversion band. Mirrors the site's gradient CTA language.
export default async function ProductsCta() {
  const s = await getSiteSettings();
  return (
    <section className="bg-brand-gradient py-16 text-white md:py-20">
      <div className="container text-center">
        <h2 className="mx-auto max-w-2xl text-3xl font-bold md:text-4xl">
          Need a Custom Formulation or Bulk Quote?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-lg text-green-50/90">
          Tell us your requirements and we&apos;ll respond with a tailored quotation — typically
          within 24 hours.
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
            href={`tel:${s.phone}`}
            className="inline-flex items-center gap-2 rounded-lg border-2 border-white/80 px-8 py-3.5 font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/10"
          >
            <Phone className="h-4 w-4" />
            {s.phone}
          </a>
        </div>
      </div>
    </section>
  );
}
