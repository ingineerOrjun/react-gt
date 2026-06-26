import Link from 'next/link';
import { Check, FileText } from 'lucide-react';
import Reveal from '../ui/Reveal';
import { TECHNICAL_DOCS } from './productsData';

// Technical specifications & documentation. Preserves the original content and
// the "Request Technical Catalog" CTA to /contact.
export default function TechnicalDocs() {
  return (
    <section className="bg-slate-50 py-16 dark:bg-slate-900/40 md:py-20">
      <div className="container">
        <Reveal>
          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-soft-xl dark:border-slate-700/60 dark:bg-slate-800/60">
            <div className="grid md:grid-cols-2">
              {/* Left: copy + document list */}
              <div className="p-8 md:p-10">
                <div className="mb-5 flex items-center gap-3">
                  <span className="inline-flex rounded-xl bg-green-100 p-2.5 text-green-600 dark:bg-green-900/40 dark:text-green-400">
                    <FileText className="h-5 w-5" />
                  </span>
                  <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 md:text-2xl">
                    Technical Specifications &amp; Documentation
                  </h2>
                </div>
                <p className="mb-6 leading-relaxed text-slate-600 dark:text-slate-300">
                  Access detailed product specifications, safety data sheets, and usage guidelines
                  for our complete product range.
                </p>
                <ul className="space-y-3">
                  {TECHNICAL_DOCS.map((doc) => (
                    <li key={doc} className="flex items-center gap-3 text-slate-700 dark:text-slate-200">
                      <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-900/40 dark:text-green-400">
                        <Check className="h-3.5 w-3.5" />
                      </span>
                      {doc}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Right: CTA panel */}
              <div className="flex flex-col justify-center border-t border-slate-200 bg-gradient-to-br from-green-50 to-white p-8 dark:border-slate-700/60 dark:from-green-950/30 dark:to-slate-900 md:border-l md:border-t-0 md:p-10">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                  Need specs or a custom formulation?
                </h3>
                <p className="mt-2 mb-6 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                  For documentation, custom formulations, or specific technical questions, our team
                  is ready to help.
                </p>
                <Link
                  href="/contact"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-green-700 px-6 py-3 font-semibold text-white shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-green-800 hover:shadow-lg sm:w-auto"
                >
                  <FileText className="h-4 w-4" />
                  Request Technical Catalog
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
