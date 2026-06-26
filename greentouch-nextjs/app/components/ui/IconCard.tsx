import Link from 'next/link';
import { ArrowUpRight, type LucideIcon } from 'lucide-react';
import { cn } from '../../lib/utils';
import { cardBase, cardHover, cardIconTile } from './Card';

interface IconCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  /** When set, the card becomes a link and shows an action cue. */
  href?: string;
  /** Action-cue label (defaults to "Learn more" when href is set). */
  cue?: string;
  external?: boolean;
  align?: 'left' | 'center';
  /** Clamp the description to 2 lines below lg (preserves mobile density). */
  clampMobile?: boolean;
  className?: string;
}

// Premium vertical card: icon tile → title → supporting text → action cue.
// The default across feature / value / category / industry grids. Server
// Component; pure-CSS hover. Renders as a <Link> when `href` is provided.
export default function IconCard({
  icon: Icon,
  title,
  description,
  href,
  cue,
  external,
  align = 'left',
  clampMobile,
  className,
}: IconCardProps) {
  const inner = (
    <>
      <span className={cn(cardIconTile, 'mb-4 p-3 md:mb-5 md:p-3.5')}>
        <Icon className="h-6 w-6" />
      </span>
      <h3 className="mb-2 text-lg font-semibold leading-snug text-slate-900 dark:text-slate-100">
        {title}
      </h3>
      <p
        className={cn(
          'flex-1 text-sm leading-relaxed text-slate-600 dark:text-slate-300',
          clampMobile && 'max-lg:line-clamp-2'
        )}
      >
        {description}
      </p>
      {href && (
        <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-green-700 transition-colors group-hover:text-green-600 dark:text-green-400">
          {cue ?? 'Learn more'}
          <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      )}
    </>
  );

  const classes = cn(
    cardBase,
    cardHover,
    'group flex h-full flex-col p-6 md:p-8',
    align === 'center' && 'items-center text-center',
    className
  );

  if (href) {
    return (
      <Link
        href={href}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        className={cn(
          classes,
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900'
        )}
      >
        {inner}
      </Link>
    );
  }

  return <div className={classes}>{inner}</div>;
}
