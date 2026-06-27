import { ArrowUpRight } from 'lucide-react';
import Reveal from '../ui/Reveal';
import { cn } from '../../lib/utils';
import { cardBase, cardHover, cardIconTile } from '../ui/Card';
import { buildContactOptions } from './contactData';
import { getSiteSettings } from '../../lib/queries/site-settings';

// Section 2 — three premium, tactile contact-method cards. Hover lift + shadow +
// border glow + icon scale are pure CSS (no JS cost).
export default async function ContactOptions() {
  const options = buildContactOptions(await getSiteSettings());
  return (
    <section className="container py-16 md:py-20">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {options.map(({ icon: Icon, title, value, description, href, external }, i) => {
          const card = (
            <article className={cn(cardBase, cardHover, 'group relative flex h-full flex-col p-6 md:p-8')}>
              <div className={cn(cardIconTile, 'mb-5 w-fit p-3.5')}>
                <Icon className="h-7 w-7" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">{title}</h3>
              <p className="mt-1 break-words font-medium text-green-700 dark:text-green-400">
                {value}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                {description}
              </p>
              {href && (
                <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-green-700 transition-colors group-hover:text-green-600 dark:text-green-400">
                  {external ? 'Open in Maps' : title}
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              )}
            </article>
          );
          return (
            <Reveal key={title} delay={i * 0.08} className="h-full">
              {href ? (
                <a
                  href={href}
                  {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="block h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded-2xl dark:focus-visible:ring-offset-slate-900"
                >
                  {card}
                </a>
              ) : (
                card
              )}
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
