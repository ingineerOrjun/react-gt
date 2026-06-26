import Link from 'next/link';
import { ArrowUpRight, type LucideIcon } from 'lucide-react';
import { cn } from '../../lib/utils';
import { cardBase, cardHover, cardIconTile } from './Card';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  href?: string;
  cue?: string;
  external?: boolean;
  className?: string;
}

// Horizontal icon-beside-content card. For dense "why choose" / benefit / option
// rows. Server Component; renders as a <Link> when `href` is provided.
export default function FeatureCard({
  icon: Icon,
  title,
  description,
  href,
  cue,
  external,
  className,
}: FeatureCardProps) {
  const inner = (
    <>
      <span className={cn(cardIconTile, 'shrink-0 p-3')}>
        <Icon className="h-6 w-6" />
      </span>
      <div className="min-w-0">
        <h3 className="font-semibold text-slate-900 dark:text-slate-100">{title}</h3>
        <p className="mt-1 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
          {description}
        </p>
        {href && (
          <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-green-700 transition-colors group-hover:text-green-600 dark:text-green-400">
            {cue ?? 'Learn more'}
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        )}
      </div>
    </>
  );

  const classes = cn(cardBase, cardHover, 'group flex h-full items-start gap-4 p-6 md:p-7', className);

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
