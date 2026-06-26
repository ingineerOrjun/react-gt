'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Package, Leaf } from 'lucide-react';

interface ProductGalleryProps {
  images: (string | null | undefined)[];
  alt: string;
}

// Product image gallery. Cursor-follow hover zoom on the main image and a
// thumbnail strip that already supports multiple images (currently the catalogue
// stores one image per product, so the strip only appears when more exist).
// The single justified client island on the detail page.
export default function ProductGallery({ images, alt }: ProductGalleryProps) {
  const valid = images.filter((src): src is string => Boolean(src));
  const [active, setActive] = useState(0);
  const [zoom, setZoom] = useState(false);
  const [origin, setOrigin] = useState('50% 50%');
  const src = valid[active] ?? null;

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width) * 100;
    const y = ((e.clientY - r.top) / r.height) * 100;
    setOrigin(`${x}% ${y}%`);
  };

  return (
    <div>
      <div
        className="group relative aspect-square overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-green-50 via-slate-50 to-slate-100 shadow-sm dark:border-slate-700/60 dark:from-slate-800 dark:to-slate-900"
        onMouseEnter={() => setZoom(true)}
        onMouseLeave={() => setZoom(false)}
        onMouseMove={handleMove}
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,white,transparent_70%)] opacity-70 dark:opacity-10"
        />
        {src ? (
          <Image
            src={src}
            alt={alt}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-contain p-6 transition-transform duration-300 ease-out md:p-10"
            style={{ transform: zoom ? 'scale(1.7)' : 'scale(1)', transformOrigin: origin }}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-slate-300 dark:text-slate-600">
            <Package className="h-20 w-20" />
          </div>
        )}

        <span className="pointer-events-none absolute left-4 top-4 inline-flex items-center gap-1 rounded-full bg-white/85 px-3 py-1 text-xs font-semibold text-green-700 shadow-sm backdrop-blur dark:bg-slate-900/70 dark:text-green-300">
          <Leaf className="h-3 w-3" />
          Eco
        </span>
        {src && (
          <span className="pointer-events-none absolute bottom-4 right-4 rounded-full bg-slate-900/60 px-2.5 py-1 text-xs font-medium text-white opacity-0 backdrop-blur transition-opacity duration-300 group-hover:opacity-100">
            Hover to zoom
          </span>
        )}
      </div>

      {valid.length > 1 && (
        <div className="mt-4 flex flex-wrap gap-3">
          {valid.map((thumb, i) => (
            <button
              key={thumb}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`View image ${i + 1}`}
              aria-pressed={i === active}
              className={`relative h-20 w-20 overflow-hidden rounded-xl border bg-white transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 dark:bg-slate-800 dark:focus-visible:ring-offset-slate-900 ${
                i === active
                  ? 'border-green-500 ring-1 ring-green-500'
                  : 'border-slate-200 hover:border-green-300 dark:border-slate-700/60'
              }`}
            >
              <Image src={thumb} alt="" fill sizes="80px" className="object-contain p-2" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
