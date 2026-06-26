import Link from 'next/link';
import { ChevronRight, ChevronDown } from 'lucide-react';

export interface FooterLinkItem {
  label: string;
  href?: string;
}

// Reusable titled link/label column. Collapsible on mobile (native <details>),
// always-open on desktop (forced via the .responsive-disclosure CSS).
export default function FooterLinks({
  title,
  items,
}: {
  title: string;
  items: FooterLinkItem[];
}) {
  return (
    <details className="responsive-disclosure group border-b border-white/10 lg:border-0" open={false}>
      <summary className="flex items-center justify-between gap-2 py-3 max-lg:min-h-[44px] lg:py-0">
        <span>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-white">{title}</h3>
          <span
            aria-hidden="true"
            className="mt-2 hidden h-0.5 w-8 rounded bg-gradient-to-r from-green-400 to-emerald-500 lg:block"
          />
        </span>
        <ChevronDown className="disclosure-chevron h-4 w-4 shrink-0 text-slate-400 transition-transform duration-300 lg:hidden" />
      </summary>
      <div className="disclosure-content">
        <ul className="space-y-1 pb-3 lg:mt-5 lg:space-y-2.5 lg:pb-0">
          {items.map(({ label, href }) => (
            <li key={label}>
              {href ? (
                <Link
                  href={href}
                  className="group/link inline-flex items-center gap-1.5 rounded text-sm text-slate-400 transition-colors hover:text-green-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 max-lg:min-h-[44px]"
                >
                  <ChevronRight className="h-3.5 w-3.5 -translate-x-1 text-green-400 opacity-0 transition-all duration-300 group-hover/link:translate-x-0 group-hover/link:opacity-100" />
                  {label}
                </Link>
              ) : (
                <span className="inline-flex items-center gap-2 text-sm text-slate-400 max-lg:min-h-[44px]">
                  <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-green-500/70" />
                  {label}
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </details>
  );
}
