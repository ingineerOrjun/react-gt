import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import { CONTACT_FAQS } from '../contact/contactData';

// Condensed homepage FAQ — max 3 questions, native <details> accordions
// (zero client JS, server-rendered, content in the DOM for SEO). Collapsed by
// default on all breakpoints.
export default function HomeFaqCondensed() {
  const faqs = CONTACT_FAQS.slice(0, 3);

  return (
    <section className="bg-slate-50 py-8 dark:bg-slate-900/40 md:py-20">
      <div className="container">
        <div className="mx-auto mb-6 max-w-2xl text-center md:mb-10">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 md:text-3xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-3 text-slate-600 dark:text-slate-300">
            Quick answers on supply and service.{' '}
            <Link
              href="/contact"
              className="font-semibold text-green-700 underline-offset-4 hover:underline dark:text-green-400"
            >
              See all on Contact
            </Link>
            .
          </p>
        </div>

        <div className="mx-auto max-w-3xl space-y-3">
          {faqs.map(({ question, answer }) => (
            <details
              key={question}
              className="disclosure group rounded-2xl border border-slate-200 bg-white px-5 shadow-sm dark:border-slate-700/60 dark:bg-slate-800/60"
            >
              <summary className="flex min-h-[44px] items-center justify-between gap-4 py-4 font-semibold text-slate-900 dark:text-slate-100">
                {question}
                <ChevronDown className="h-5 w-5 shrink-0 text-green-600 transition-transform duration-300 group-open:rotate-180 dark:text-green-400" />
              </summary>
              <div className="disclosure-content">
                <p className="pb-5 leading-relaxed text-slate-600 dark:text-slate-300">{answer}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
