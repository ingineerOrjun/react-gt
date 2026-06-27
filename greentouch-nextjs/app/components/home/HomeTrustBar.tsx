import Reveal from '../ui/Reveal';
import { getHomeContent } from '../../lib/queries/home';
import { resolveIcon } from '../../lib/icon-map';

// Section 2 — compact trust bar. Content is database-driven (home_statistics).
export default async function HomeTrustBar() {
  const { statistics } = await getHomeContent();
  return (
    <section className="border-y border-slate-200 bg-white py-6 dark:border-slate-800 dark:bg-slate-950 lg:py-8">
      <div className="container">
        <Reveal>
          <ul className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {statistics.map((stat) => {
              const Icon = resolveIcon(stat.icon);
              return (
                <li key={stat.label} className="flex items-center justify-center gap-2.5 text-center">
                  <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-900/40 dark:text-green-400">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="text-sm font-semibold text-slate-700 dark:text-slate-200 sm:text-base">
                    {stat.value ? `${stat.value}${stat.suffix} ` : ''}
                    {stat.label}
                  </span>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
