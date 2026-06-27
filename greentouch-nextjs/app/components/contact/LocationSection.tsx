import { MapPin, Clock, Globe2, ExternalLink } from 'lucide-react';
import Reveal from '../ui/Reveal';
import { cn } from '../../lib/utils';
import { cardBase, cardHover, cardIconTile } from '../ui/Card';
import { getSiteSettings } from '../../lib/queries/site-settings';

const MAPS_URL =
  'https://www.google.com/maps/search/?api=1&query=Dhalkebar+Mithila+Municipality+Dhanusha+Nepal';

// Section 7 — dedicated location section with elegant information cards.
export default async function LocationSection() {
  const s = await getSiteSettings();
  const SERVICE_AREAS = s.serviceAreas;
  const CARDS = [
    { icon: MapPin, title: 'Business Address', value: s.address },
    { icon: Clock, title: 'Business Hours', value: s.businessHours.map((h) => `${h.label}: ${h.value}`).join('\n') },
    {
      icon: Globe2,
      title: 'Coverage Area',
      value: `Delivering to ${SERVICE_AREAS.length} cities — ${SERVICE_AREAS.slice(0, -1).join(', ')} & ${SERVICE_AREAS.at(-1)} — plus surrounding regions across Nepal.`,
    },
  ];
  return (
    <section className="relative overflow-hidden bg-slate-50 py-16 dark:bg-slate-900/40 md:py-20">
      <div className="container">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <Reveal>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 md:text-3xl">
              Where to Find Us
            </h2>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="mt-3 text-slate-600 dark:text-slate-300">
              Visit our facility or reach out — we supply across the region.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {CARDS.map(({ icon: Icon, title, value }, i) => (
            <Reveal key={title} delay={i * 0.08} className="h-full">
              <div className={cn(cardBase, cardHover, 'group flex h-full flex-col p-6 md:p-8')}>
                <span className={cn(cardIconTile, 'mb-4 w-fit p-3')}>
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="font-semibold text-slate-900 dark:text-slate-100">{title}</h3>
                <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                  {value}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Service-area coverage — the cities we deliver to. */}
        <Reveal delay={0.1}>
          <div className="mt-12">
            <p className="text-center text-sm font-semibold uppercase tracking-wide text-green-700 dark:text-green-400">
              Areas we serve
            </p>
            <ul className="mx-auto mt-4 flex max-w-3xl flex-wrap justify-center gap-2.5">
              {SERVICE_AREAS.map((city) => (
                <li
                  key={city}
                  className="inline-flex items-center gap-1.5 rounded-full border border-slate-200/80 bg-white px-3.5 py-1.5 text-sm font-medium text-slate-700 shadow-sm dark:border-slate-700/60 dark:bg-slate-800/60 dark:text-slate-200"
                >
                  <MapPin className="h-3.5 w-3.5 text-green-600 dark:text-green-400" />
                  {city}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mt-8 text-center">
            <a
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-green-600 px-6 py-3 font-semibold text-white shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-green-700 hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900"
            >
              <MapPin className="h-5 w-5" />
              Open in Google Maps
              <ExternalLink className="h-4 w-4 opacity-80" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
