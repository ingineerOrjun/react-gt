import { Metadata } from 'next';
import { Inter, Plus_Jakarta_Sans, Playfair_Display } from 'next/font/google';
import { GoogleAnalytics } from '@next/third-parties/google';
import { Providers } from './providers';
import Navbar from './components/Navbar';
import Footer from './components/layout/Footer';
import MobileStickyBar from './components/layout/MobileStickyBar';
import SiteMain from './components/SiteMain';
import { getSiteSettings } from './lib/queries/site-settings';
import { jsonLdScript } from './lib/utils';
import './globals.css';

const gaId = process.env.NEXT_PUBLIC_GA_ID;

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['600', '700', '800'],
  variable: '--font-jakarta',
  display: 'swap',
});

// Premium display serif — used ONLY on hero headlines via the `.font-display`
// utility. Two weights, latin subset, swap → minimal payload, no client JS.
const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['600', '700'],
  variable: '--font-playfair',
  display: 'swap',
});

// Metadata is now database-driven (single source of truth). Defaults are seeded
// to the previous hardcoded values, so output is identical until edited in admin.
export async function generateMetadata(): Promise<Metadata> {
  const s = await getSiteSettings();
  return {
    metadataBase: new URL(s.siteUrl),
    title: { default: s.seoTitle, template: `%s | ${s.companyName}` },
    description: s.seoDescription,
    keywords: s.seoKeywords.split(',').map((k) => k.trim()).filter(Boolean),
    authors: [{ name: s.companyName }],
    openGraph: {
      type: 'website',
      siteName: s.companyName,
      title: s.seoTitle,
      description: s.seoDescription,
      url: s.siteUrl,
    },
    twitter: {
      card: 'summary_large_image',
      title: s.companyName,
      description: s.seoDescription,
    },
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const s = await getSiteSettings();
  const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: s.companyName,
    url: s.siteUrl,
    logo: `${s.siteUrl}/icon.svg`,
    description: s.companyDescription || s.seoDescription,
    email: s.email,
    telephone: `+977-${s.phone}`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: [s.addressStreet, s.addressMunicipality].filter(Boolean).join(', '),
      addressRegion: s.addressDistrict,
      postalCode: s.addressPostalCode,
      addressCountry: 'NP',
    },
    sameAs: [s.social.facebook, s.social.twitter, s.social.instagram, s.social.linkedin].filter(Boolean),
  };

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${jakarta.variable} ${playfair.variable} scroll-smooth`}
    >
      <body className="font-sans antialiased min-h-screen flex flex-col bg-gray-50 dark:bg-slate-950 text-gray-900 dark:text-slate-100 selection:bg-green-200 selection:text-green-900">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLdScript(organizationJsonLd) }}
        />
        <Providers>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:top-3 focus:left-3 focus:px-4 focus:py-2 focus:rounded-lg focus:bg-green-600 focus:text-white"
          >
            Skip to content
          </a>
          <Navbar />
          {/* Footer is a Server Component rendered here and gated inside SiteMain
              (which already knows the route) so it never shows on /admin — without
              forcing dynamic rendering in this layout. */}
          <SiteMain footer={<Footer />} stickyBar={<MobileStickyBar />}>
            {children}
          </SiteMain>
        </Providers>
        {gaId && <GoogleAnalytics gaId={gaId} />}
      </body>
    </html>
  );
}
