import Link from 'next/link';
import { FileText, Phone } from 'lucide-react';
import WhatsappIcon from '../products/detail/WhatsappIcon';
import { getSiteSettings } from '../../lib/queries/site-settings';

// Global mobile conversion bar. CSS-only Server Component (no client JS):
// fixed to the bottom, hidden on lg+ (desktop) and on /admin (gated in SiteMain),
// with iOS safe-area support. Every action is a ≥44px touch target.
export default async function MobileStickyBar() {
  const s = await getSiteSettings();
  const whatsappHref = `https://wa.me/977${s.whatsapp}?text=${encodeURIComponent(
    'Hello GreenTouch, I would like to inquire about your cleaning and hygiene products.',
  )}`;
  return (
    <div
      role="region"
      aria-label="Quick contact actions"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 px-3 pt-2 shadow-[0_-4px_24px_rgba(15,23,42,0.12)] backdrop-blur pb-[max(0.5rem,env(safe-area-inset-bottom))] lg:hidden dark:border-slate-700/60 dark:bg-slate-900/95">
      <div className="flex items-center gap-2">
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with us on WhatsApp"
          className="flex min-h-[44px] flex-1 items-center justify-center gap-1.5 rounded-xl bg-[#25D366] text-sm font-semibold text-white transition-opacity hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900"
        >
          <WhatsappIcon className="h-5 w-5" />
          WhatsApp
        </a>
        <Link
          href="/contact"
          className="flex min-h-[44px] flex-1 items-center justify-center gap-1.5 rounded-xl bg-green-600 text-sm font-semibold text-white transition-colors hover:bg-green-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900"
        >
          <FileText className="h-4 w-4" />
          Get a Quote
        </Link>
        <a
          href={`tel:${s.phone}`}
          aria-label="Call us"
          className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-xl border border-slate-300 text-slate-700 transition-colors hover:border-green-300 hover:text-green-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 dark:border-slate-700 dark:text-slate-200 dark:focus-visible:ring-offset-slate-900"
        >
          <Phone className="h-5 w-5" />
        </a>
      </div>
    </div>
  );
}
