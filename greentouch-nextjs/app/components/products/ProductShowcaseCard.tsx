'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Package, Leaf, Boxes, ShieldCheck } from 'lucide-react';
import { cardEntrance, hoverLift, hoverTransition, revealViewport } from '../ui/motion';

interface ProductShowcaseCardProps {
  title: string;
  description: string;
  image: string | null;
  index?: number;
  slug?: string;
  href?: string;
}

// Honest, general supply attributes (not per-product fabricated claims).
const BENEFITS = [
  { icon: Boxes, label: 'Bulk supply' },
  { icon: ShieldCheck, label: 'Quality assured' },
];

// Premium catalogue product card — the single product-card system (catalogue,
// featured, related). Adopts the card tokens (rounded-3xl, shadow-card →
// shadow-card-hover), object-contain imagery so labels are never cropped, a
// restrained ≤1.04 hover zoom, a category/quality badge, benefit chips, and a
// prominent CTA. Entrance + lift via framer respect prefers-reduced-motion
// through the global MotionConfig; the shadow/border hover is pure CSS.
export default function ProductShowcaseCard({
  title,
  description,
  image,
  index = 0,
  slug,
  href,
}: ProductShowcaseCardProps) {
  const target = href ?? (slug ? `/products/${slug}` : '/contact');

  return (
    <motion.article
      custom={index}
      variants={cardEntrance}
      initial="hidden"
      whileInView="visible"
      viewport={revealViewport}
      whileHover={hoverLift}
      transition={hoverTransition}
      className="group flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-card transition-[box-shadow,border-color] duration-300 ease-out hover:border-green-300/70 hover:shadow-card-hover hover:ring-1 hover:ring-green-500/10 dark:border-slate-700/60 dark:bg-slate-800/60 dark:hover:border-green-700/60"
    >
      {/* Image — fixed 4:3, object-contain (labels never cropped), soft radial
          highlight + bottom gradient for depth, restrained ≤1.04 hover zoom. */}
      <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-green-50 via-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,white,transparent_70%)] opacity-70 dark:opacity-10"
        />
        {image ? (
          <Image
            src={image}
            alt={title}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-contain object-center p-5 transition-transform duration-500 ease-out group-hover:scale-[1.04]"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-slate-300 dark:text-slate-600">
            <Package className="h-14 w-14" />
          </div>
        )}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/[0.05] to-transparent dark:from-black/20"
        />

        {/* Category / quality badge */}
        <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full border border-green-200/70 bg-white/90 px-2.5 py-1 text-xs font-semibold text-green-700 shadow-sm backdrop-blur dark:border-green-800/50 dark:bg-slate-900/80 dark:text-green-300">
          <Leaf className="h-3 w-3" />
          Eco
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5 md:p-6">
        <h3 className="text-lg font-semibold leading-snug text-slate-900 dark:text-slate-100">
          {title}
        </h3>
        <p className="mt-2 line-clamp-2 flex-1 text-sm leading-relaxed text-slate-600 dark:text-slate-300 lg:line-clamp-3">
          {description}
        </p>

        {/* Benefit chips — hidden on the tightest mobile grid to keep density. */}
        <ul className="mt-3 hidden flex-wrap gap-1.5 sm:flex">
          {BENEFITS.map(({ icon: Icon, label }) => (
            <li
              key={label}
              className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-0.5 text-[11px] font-medium text-green-700 ring-1 ring-green-100 dark:bg-green-900/30 dark:text-green-300 dark:ring-green-800/40"
            >
              <Icon className="h-3 w-3" />
              {label}
            </li>
          ))}
        </ul>

        <Link
          href={target}
          aria-label={`View ${title}`}
          className="group/btn mt-5 inline-flex items-center justify-center gap-2 rounded-xl bg-green-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:bg-green-700 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900"
        >
          View Product
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-0.5" />
        </Link>
      </div>
    </motion.article>
  );
}
