'use client';

import { useId, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { CONTACT_FAQS } from './contactData';

// Section 6 — elegant accordion FAQs. Accessible disclosure pattern: each header
// is a <button> with aria-expanded/aria-controls; the panel is a region. Height
// animation is smooth via framer-motion and respects prefers-reduced-motion
// (global MotionConfig). Content is always in the DOM for SEO.
export default function ContactFaq() {
  const [open, setOpen] = useState<number | null>(0);
  const baseId = useId();

  return (
    <section className="container py-16 md:py-20">
      <div className="mx-auto max-w-3xl">
        <div className="mb-10 text-center">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 md:text-3xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-3 text-slate-600 dark:text-slate-300">
            Quick answers about supply, service, and response times.
          </p>
        </div>

        <div className="space-y-3">
          {CONTACT_FAQS.map(({ question, answer }, i) => {
            const isOpen = open === i;
            const panelId = `${baseId}-panel-${i}`;
            const btnId = `${baseId}-btn-${i}`;
            return (
              <div
                key={question}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-colors dark:border-slate-700/60 dark:bg-slate-800/60"
              >
                <h3>
                  <button
                    id={btnId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-green-50/60 dark:hover:bg-green-900/15"
                  >
                    <span className="font-semibold text-slate-900 dark:text-slate-100">
                      {question}
                    </span>
                    <ChevronDown
                      className={`h-5 w-5 shrink-0 text-green-600 transition-transform duration-300 dark:text-green-400 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={panelId}
                      role="region"
                      aria-labelledby={btnId}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeOut' }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 pb-5 pt-0 leading-relaxed text-slate-600 dark:text-slate-300">
                        {answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
