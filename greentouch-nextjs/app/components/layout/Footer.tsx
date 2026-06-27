import Link from 'next/link';
import {
  Leaf,
  Truck,
  BadgeCheck,
  Headphones,
  Boxes,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  MapPin,
  type LucideIcon,
} from 'lucide-react';
import { getPublishedProducts } from '../../lib/queries/public';
import { getSiteSettings } from '../../lib/queries/site-settings';
import { INDUSTRIES } from '../about/aboutData';
import FooterCTA from './FooterCTA';
import FooterLinks from './FooterLinks';
import FooterProducts from './FooterProducts';
import FooterContact from './FooterContact';
import FooterBottom from './FooterBottom';

// Platform → icon + display label. URLs come from the database (settings.social).
const SOCIAL_META: { key: 'facebook' | 'twitter' | 'instagram' | 'linkedin' | 'youtube'; label: string; icon: LucideIcon }[] = [
  { key: 'facebook', label: 'Facebook', icon: Facebook },
  { key: 'twitter', label: 'Twitter', icon: Twitter },
  { key: 'instagram', label: 'Instagram', icon: Instagram },
  { key: 'linkedin', label: 'LinkedIn', icon: Linkedin },
  { key: 'youtube', label: 'YouTube', icon: Youtube },
];

const QUICK_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Products', href: '/products' },
  { label: 'About Us', href: '/about' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
];

const TRUST = [
  { icon: Truck, label: 'Reliable Supply' },
  { icon: BadgeCheck, label: 'Quality Products' },
  { icon: Headphones, label: 'Customer Support' },
  { icon: Boxes, label: 'Bulk Orders Welcome' },
];

// Premium site footer. Async Server Component — pulls popular products from
// Supabase (resilient: empty list when unconfigured). No client JavaScript.
export default async function Footer() {
  const [products, settings] = await Promise.all([getPublishedProducts(5), getSiteSettings()]);
  const year = new Date().getFullYear();
  const industryItems = INDUSTRIES.map((i) => ({ label: i.title }));
  const socials = SOCIAL_META.map((m) => ({ ...m, url: settings.social[m.key] })).filter(
    (s): s is typeof s & { url: string } => Boolean(s.url),
  );

  return (
    <footer aria-labelledby="footer-heading" className="relative">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>

      {/* CTA band */}
      <FooterCTA />

      {/* Footer body */}
      <div className="relative overflow-hidden bg-slate-950 text-slate-300">
        {/* Gradient accent line + soft brand glow */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-green-500/70 to-transparent"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 left-1/2 h-64 w-[36rem] -translate-x-1/2 rounded-full bg-green-600/10 blur-3xl"
        />

        <div className="container relative py-11 md:py-16">
          {/* Trust indicators */}
          <ul className="mb-10 grid grid-cols-2 gap-4 lg:mb-14 lg:grid-cols-4">
            {TRUST.map(({ icon: Icon, label }) => (
              <li
                key={label}
                className="group flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3.5 transition-all duration-300 hover:-translate-y-1 hover:border-green-500/40 hover:bg-white/[0.07]"
              >
                <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-premium/10 text-premium ring-1 ring-premium/30 transition-transform duration-300 group-hover:scale-110">
                  <Icon className="h-5 w-5" />
                </span>
                <span className="text-sm font-semibold text-slate-100">{label}</span>
              </li>
            ))}
          </ul>

          {/* Main grid — stacked accordions on mobile, 12-col on desktop */}
          <div className="grid grid-cols-1 gap-1 lg:grid-cols-12 lg:gap-10">
            {/* Company overview */}
            <div className="lg:col-span-4 max-lg:mb-4">
              <Link
                href="/"
                className="inline-flex items-center gap-2 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
              >
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 text-white shadow-md">
                  <Leaf className="h-5 w-5" />
                </span>
                <span className="text-lg font-bold text-white">
                  Green<span className="text-green-400">Touch</span>
                </span>
              </Link>
              <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-400">
                Premium, eco-conscious cleaning and hygiene products with dependable bulk supply for
                homes, businesses, and institutions.
              </p>
              <div className="mt-6 flex gap-2.5">
                {socials.map(({ label, icon: Icon, url }) => (
                  <a
                    key={label}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-slate-300 transition-all duration-300 hover:-translate-y-0.5 hover:border-green-500/40 hover:bg-green-500/10 hover:text-green-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>

            <div className="lg:col-span-2">
              <FooterLinks title="Quick Links" items={QUICK_LINKS} />
            </div>
            <div className="lg:col-span-2">
              <FooterLinks title="Industries" items={industryItems} />
            </div>
            <div className="lg:col-span-2">
              <FooterProducts products={products} />
            </div>
            <div className="lg:col-span-2">
              <FooterContact
                phone={settings.phone}
                email={settings.email}
                whatsapp={settings.whatsapp}
                address={settings.address}
              />
            </div>
          </div>

          {/* Service-area coverage — surfaces the cities we deliver to. */}
          <div className="mt-6 border-t border-white/10 pt-5 lg:mt-12 lg:pt-8">
            <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-slate-400">
              <MapPin className="h-4 w-4 shrink-0 text-green-400" />
              <span className="font-semibold text-slate-300">Areas we serve:</span>
              {settings.serviceAreas.join(' · ')}
            </p>
          </div>
        </div>

        <FooterBottom year={year} copyright={settings.footerCopyright} />
      </div>
    </footer>
  );
}
