import { ShieldCheck } from 'lucide-react';
import { WHY_CHOOSE } from './contactData';

// Section 4 — side panel beside the form. Server-rendered; subtle CSS hover.
export default function WhyChoose() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700/60 dark:bg-slate-800/60 md:p-8">
      <div className="mb-6 flex items-center gap-3">
        <span className="inline-flex rounded-xl bg-green-100 p-2.5 text-green-600 dark:bg-green-900/40 dark:text-green-400">
          <ShieldCheck className="h-6 w-6" />
        </span>
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 md:text-2xl">
          Why Businesses Choose GreenTouch
        </h2>
      </div>

      <ul className="space-y-2">
        {WHY_CHOOSE.map(({ icon: Icon, title, description }) => (
          <li key={title}>
            <div className="group flex items-start gap-4 rounded-xl p-3 transition-colors duration-300 hover:bg-green-50/70 dark:hover:bg-green-900/15">
              <span className="mt-0.5 inline-flex shrink-0 rounded-lg bg-green-100 p-2 text-green-600 ring-1 ring-green-200/60 transition-transform duration-300 group-hover:scale-110 dark:bg-green-900/40 dark:text-green-400 dark:ring-green-800/40">
                <Icon className="h-5 w-5" />
              </span>
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-slate-100">{title}</h3>
                <p className="mt-0.5 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                  {description}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
