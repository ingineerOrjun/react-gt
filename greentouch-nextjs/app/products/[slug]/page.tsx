import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowRight,
  FileText,
  Phone,
  Check,
  ShieldAlert,
  Package,
  ChevronDown,
  Boxes,
  Headphones,
} from 'lucide-react';
import { getProductBySlug, getProductSlugs, getRelatedProducts } from '../../lib/queries/public';
import { truncateText } from '../../lib/utils';
import { CONTACT_INFO } from '../../lib/constants';
import Reveal from '../../components/ui/Reveal';
import IconCard from '../../components/ui/IconCard';
import FeatureCard from '../../components/ui/FeatureCard';
import ProductBreadcrumb from '../../components/products/detail/ProductBreadcrumb';
import ProductGallery from '../../components/products/detail/ProductGallery';
import RelatedProducts from '../../components/products/detail/RelatedProducts';
import WhatsappIcon from '../../components/products/detail/WhatsappIcon';
import {
  KEY_BENEFITS,
  APPLICATIONS,
  USAGE_STEPS,
  PACKAGING_INFO,
  SAFETY_NOTES,
} from '../../components/products/detail/detailData';
import { PRODUCT_BADGES } from '../../components/products/productsData';

const BASE = 'https://greentouchchemicals.com';

// ISR: prebuild known product pages; new/edited slugs render on-demand and cache.
export const revalidate = 60;

export async function generateStaticParams() {
  const slugs = await getProductSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const product = await getProductBySlug(params.slug);
  if (!product) {
    return { title: 'Product Not Found', robots: { index: false } };
  }
  const url = `${BASE}/products/${product.slug}`;
  const description = truncateText(product.description, 155);
  return {
    title: product.name,
    description,
    alternates: { canonical: `/products/${product.slug}` },
    openGraph: {
      type: 'website',
      title: `${product.name} | GreenTouch Chemicals`,
      description,
      url,
      ...(product.imageUrl ? { images: [{ url: product.imageUrl, alt: product.name }] } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title: product.name,
      description,
      ...(product.imageUrl ? { images: [product.imageUrl] } : {}),
    },
  };
}

export default async function ProductDetailPage({ params }: { params: { slug: string } }) {
  const product = await getProductBySlug(params.slug);
  if (!product) notFound();

  const related = await getRelatedProducts(params.slug, 3);
  const url = `${BASE}/products/${product.slug}`;

  // WhatsApp inquiry deep-link with a prefilled, product-specific message.
  const whatsappHref = `https://wa.me/977${CONTACT_INFO.phone}?text=${encodeURIComponent(
    `Hello GreenTouch, I'm interested in ${product.name}. Could you share pricing and availability?`
  )}`;

  // Differentiated enquiry paths (bulk / technical / sales) — each opens
  // WhatsApp with a prefilled, context-specific message. No new components.
  const wa = (text: string) =>
    `https://wa.me/977${CONTACT_INFO.phone}?text=${encodeURIComponent(text)}`;
  const enquiryOptions = [
    {
      icon: Boxes,
      label: 'Bulk supply enquiry',
      href: wa(
        `Hello GreenTouch, I'd like a bulk-supply quote for ${product.name}. Please share volume pricing and lead times.`
      ),
    },
    {
      icon: FileText,
      label: 'Technical support / SDS',
      href: wa(
        `Hello GreenTouch, I need technical details and the Safety Data Sheet (SDS) for ${product.name}.`
      ),
    },
    {
      icon: Headphones,
      label: 'General sales enquiry',
      href: wa(`Hello GreenTouch, I'd like to speak with sales about ${product.name}.`),
    },
  ];

  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    ...(product.imageUrl ? { image: [product.imageUrl] } : {}),
    brand: { '@type': 'Brand', name: 'GreenTouch Chemicals Pvt. Ltd.' },
    category: 'Cleaning & Hygiene',
    url,
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: BASE },
      { '@type': 'ListItem', position: 2, name: 'Products', item: `${BASE}/products` },
      { '@type': 'ListItem', position: 3, name: product.name, item: url },
    ],
  };

  return (
    <main className="bg-white dark:bg-slate-950">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* ── Hero: gallery + info ────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-green-50/70 via-white to-white dark:from-green-950/30 dark:via-slate-950 dark:to-slate-950">
        <div className="container py-8 md:py-12">
          <ProductBreadcrumb productName={product.name} />

          <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:gap-14">
            {/* Gallery (single client island) */}
            <ProductGallery images={[product.imageUrl]} alt={product.name} />

            {/* Info */}
            <div className="flex flex-col">
              <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-green-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-green-700 dark:bg-green-900/40 dark:text-green-300">
                <Package className="h-3.5 w-3.5" />
                Cleaning &amp; Hygiene
              </span>
              <h1 className="mt-4 font-display text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100 md:text-[2.5rem]">
                {product.name}
              </h1>
              <p className="mt-4 text-lg leading-relaxed text-slate-600 dark:text-slate-300">
                {truncateText(product.description, 200)}
              </p>

              {/* Key benefits quick list */}
              <ul className="mt-6 grid grid-cols-1 gap-2 sm:grid-cols-2">
                {KEY_BENEFITS.map(({ title }) => (
                  <li
                    key={title}
                    className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-200"
                  >
                    <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-900/50 dark:text-green-400">
                      <Check className="h-3 w-3" />
                    </span>
                    {title}
                  </li>
                ))}
              </ul>

              {/* Trust badges */}
              <ul className="mt-6 flex flex-wrap gap-2.5">
                {PRODUCT_BADGES.map(({ icon: Icon, label }) => (
                  <li
                    key={label}
                    className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 shadow-sm dark:border-slate-700/60 dark:bg-slate-800/60 dark:text-slate-200"
                  >
                    <Icon className="h-4 w-4 text-green-600 dark:text-green-400" />
                    {label}
                  </li>
                ))}
              </ul>

              {/* CTAs */}
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link
                  href="/contact"
                  className="group inline-flex items-center justify-center gap-2 rounded-lg bg-green-600 px-6 py-3.5 font-semibold text-white shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-green-700 hover:shadow-lg"
                >
                  <FileText className="h-4 w-4" />
                  Request a Quote
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                </Link>
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Inquire about ${product.name} on WhatsApp`}
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#25D366] px-6 py-3.5 font-semibold text-white shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:opacity-90 hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900"
                >
                  <WhatsappIcon className="h-5 w-5" />
                  WhatsApp Inquiry
                </a>
                <a
                  href={`tel:${CONTACT_INFO.phone}`}
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-6 py-3.5 font-semibold text-slate-700 transition-all duration-300 hover:-translate-y-0.5 hover:border-green-300 hover:text-green-700 dark:border-slate-700 dark:bg-slate-900/50 dark:text-slate-200 dark:hover:border-green-700/60"
                >
                  <Phone className="h-4 w-4" />
                  Contact Sales
                </a>
              </div>

              {/* Differentiated enquiry paths — bulk / technical / sales. */}
              <div className="mt-5">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                  Quick enquiry
                </p>
                <ul className="mt-2 flex flex-wrap gap-2">
                  {enquiryOptions.map(({ icon: Icon, label, href }) => (
                    <li key={label}>
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-full border border-slate-200/80 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-green-300 hover:text-green-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 dark:border-slate-700/60 dark:bg-slate-800/60 dark:text-slate-200 dark:hover:border-green-700/60 dark:focus-visible:ring-offset-slate-900"
                      >
                        <Icon className="h-4 w-4 text-green-600 dark:text-green-400" />
                        {label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
                Bulk supply and custom quantities available — we typically respond within 24 hours.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Product Overview ────────────────────────────────────────────── */}
      <section className="container py-14 md:py-20">
        <Reveal>
          <div className="mx-auto max-w-3xl">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 md:text-3xl">
              Product Overview
            </h2>
            <p className="mt-5 whitespace-pre-line text-lg leading-relaxed text-slate-600 dark:text-slate-300">
              {product.description}
            </p>
          </div>
        </Reveal>
      </section>

      {/* ── Key Benefits ────────────────────────────────────────────────── */}
      <section className="bg-slate-50 py-14 dark:bg-slate-900/40 md:py-20">
        <div className="container">
          <Reveal>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 md:text-3xl">
              Key Benefits
            </h2>
          </Reveal>
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
            {KEY_BENEFITS.map(({ icon: Icon, title, description }, i) => (
              <Reveal key={title} delay={i * 0.06} className="h-full">
                <IconCard icon={Icon} title={title} description={description} clampMobile />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Recommended Applications — collapsed on mobile, open on desktop ── */}
      <section className="container py-12 md:py-20">
        <details className="responsive-disclosure group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-slate-700/60 dark:bg-slate-800/60 lg:border-0 lg:bg-transparent lg:shadow-none dark:lg:bg-transparent">
          <summary className="flex items-center justify-between gap-3 px-6 py-5 lg:px-0 lg:pb-6 lg:pt-0">
            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 md:text-2xl lg:text-3xl">
              Recommended Applications
            </h2>
            <ChevronDown className="disclosure-chevron h-5 w-5 shrink-0 text-green-600 transition-transform duration-300 dark:text-green-400" />
          </summary>
          <div className="disclosure-content px-6 pb-6 lg:px-0 lg:pb-0">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
              {APPLICATIONS.map(({ icon, title, description }) => (
                <FeatureCard key={title} icon={icon} title={title} description={description} />
              ))}
            </div>
          </div>
        </details>
      </section>

      {/* ── Usage / Packaging / Safety — collapsed on mobile, expanded on
          desktop via native <details> (zero JS; content stays in the DOM). ── */}
      <section className="bg-slate-50 py-12 dark:bg-slate-900/40 md:py-20">
        <div className="container">
          {/* Usage Instructions */}
          <details className="responsive-disclosure group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-slate-700/60 dark:bg-slate-800/60 lg:border-0 lg:bg-transparent lg:shadow-none dark:lg:bg-transparent">
            <summary className="flex items-center justify-between gap-3 px-6 py-5 lg:px-0 lg:pb-6 lg:pt-0">
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 md:text-2xl lg:text-3xl">
                Usage Instructions
              </h2>
              <ChevronDown className="disclosure-chevron h-5 w-5 shrink-0 text-green-600 transition-transform duration-300 dark:text-green-400" />
            </summary>
            <div className="disclosure-content px-6 pb-6 lg:px-0 lg:pb-0">
              <p className="mb-6 max-w-2xl leading-relaxed text-slate-600 dark:text-slate-300">
                General guidance for safe, effective use. Always defer to the product label.
              </p>
              <ol className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
                {USAGE_STEPS.map(({ icon: Icon, title, description }, i) => (
                  <li
                    key={title}
                    className="relative h-full rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700/60 dark:bg-slate-800/60 md:p-6"
                  >
                    <span className="absolute right-4 top-4 text-3xl font-bold text-green-100 dark:text-green-900/50">
                      {i + 1}
                    </span>
                    <div className="mb-3 inline-flex rounded-xl bg-green-100 p-3 text-green-600 dark:bg-green-900/40 dark:text-green-400">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="mb-1.5 font-semibold text-slate-900 dark:text-slate-100">{title}</h3>
                    <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                      {description}
                    </p>
                  </li>
                ))}
              </ol>
            </div>
          </details>

          {/* Packaging + Safety — 2-col on desktop, stacked accordions on mobile */}
          <div className="mt-4 grid gap-4 lg:mt-8 lg:grid-cols-2 lg:gap-8">
            <details className="responsive-disclosure group h-full overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-slate-700/60 dark:bg-slate-800/60">
              <summary className="flex items-center justify-between gap-3 px-6 py-5 md:px-8">
                <span className="flex items-center gap-3">
                  <span className="inline-flex rounded-xl bg-green-100 p-2.5 text-green-600 dark:bg-green-900/40 dark:text-green-400">
                    <Package className="h-5 w-5" />
                  </span>
                  <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 md:text-xl">
                    Packaging Information
                  </h2>
                </span>
                <ChevronDown className="disclosure-chevron h-5 w-5 shrink-0 text-green-600 transition-transform duration-300 dark:text-green-400" />
              </summary>
              <div className="disclosure-content px-6 pb-6 md:px-8 md:pb-8">
                <ul className="space-y-3">
                  {PACKAGING_INFO.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-slate-600 dark:text-slate-300">
                      <Check className="mt-0.5 h-5 w-5 shrink-0 text-green-600 dark:text-green-400" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </details>

            <details className="responsive-disclosure group h-full overflow-hidden rounded-3xl border border-amber-200 bg-amber-50/60 shadow-sm dark:border-amber-900/40 dark:bg-amber-950/20">
              <summary className="flex items-center justify-between gap-3 px-6 py-5 md:px-8">
                <span className="flex items-center gap-3">
                  <span className="inline-flex rounded-xl bg-amber-100 p-2.5 text-amber-600 dark:bg-amber-900/40 dark:text-amber-400">
                    <ShieldAlert className="h-5 w-5" />
                  </span>
                  <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 md:text-xl">
                    Safety Notes
                  </h2>
                </span>
                <ChevronDown className="disclosure-chevron h-5 w-5 shrink-0 text-amber-600 transition-transform duration-300 dark:text-amber-400" />
              </summary>
              <div className="disclosure-content px-6 pb-6 md:px-8 md:pb-8">
                <ul className="space-y-3">
                  {SAFETY_NOTES.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-slate-700 dark:text-slate-200">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </details>
          </div>
        </div>
      </section>

      {/* ── Related products ────────────────────────────────────────────── */}
      <RelatedProducts products={related} />

      {/* ── Closing CTA ─────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-brand-gradient py-16 text-white md:py-20">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,white,transparent_55%)] opacity-10"
        />
        <div className="container relative text-center">
          <h2 className="mx-auto max-w-2xl text-3xl font-bold md:text-4xl">
            Interested in {product.name}?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-green-50/90">
            Request a quote or message us on WhatsApp about bulk supply and custom quantities.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 rounded-lg bg-white px-8 py-3.5 font-semibold text-green-700 shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-green-50"
            >
              Request a Quote
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </Link>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Inquire about ${product.name} on WhatsApp`}
              className="inline-flex items-center gap-2 rounded-lg border-2 border-white/80 px-8 py-3.5 font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/10"
            >
              <WhatsappIcon className="h-5 w-5" />
              WhatsApp Inquiry
            </a>
          </div>
        </div>
      </section>

    </main>
  );
}
