import { Metadata } from 'next';
import { Inter, Plus_Jakarta_Sans, Playfair_Display } from 'next/font/google';
import { GoogleAnalytics } from '@next/third-parties/google';
import { Providers } from './providers';
import Navbar from './components/Navbar';
import Footer from './components/layout/Footer';
import MobileStickyBar from './components/layout/MobileStickyBar';
import SiteMain from './components/SiteMain';
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

const siteUrl = 'https://greentouchchemicals.com';

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'GreenTouch Chemicals Pvt. Ltd.',
  url: siteUrl,
  logo: `${siteUrl}/icon.svg`,
  description: 'Eco-friendly chemical products and sustainable solutions.',
  email: 'greentouch.np@gmail.com',
  telephone: '+977-9801603296',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Dhalkebar, Mithila Municipality',
    addressRegion: 'Dhanusha',
    postalCode: '45700',
    addressCountry: 'NP',
  },
  sameAs: [
    'https://facebook.com/greentouchchemicalsindustries',
    'https://twitter.com/greentouchchem',
    'https://instagram.com/greentouchchemicalsindustries',
    'https://linkedin.com/company/greentouch-chemical-industries',
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'GreenTouch Chemicals Pvt. Ltd. | Sustainable Chemical Solutions',
    template: '%s | GreenTouch Chemicals Pvt. Ltd.',
  },
  description:
    'GreenTouch Chemicals Pvt. Ltd. is a leading provider of eco-friendly chemical products and sustainable solutions for industrial and consumer applications.',
  keywords: [
    'sustainable chemicals',
    'eco-friendly products',
    'green chemical solutions',
    'biodegradable',
    'GreenTouch Chemicals',
  ],
  authors: [{ name: 'GreenTouch Chemicals Pvt. Ltd.' }],
  openGraph: {
    type: 'website',
    siteName: 'GreenTouch Chemicals Pvt. Ltd.',
    title: 'GreenTouch Chemicals Pvt. Ltd. | Sustainable Chemical Solutions',
    description:
      'Eco-friendly chemical products and sustainable solutions for industrial and consumer applications.',
    url: siteUrl,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GreenTouch Chemicals Pvt. Ltd.',
    description: 'Sustainable chemical solutions for a greener tomorrow.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${jakarta.variable} ${playfair.variable} scroll-smooth`}
    >
      <body className="font-sans antialiased min-h-screen flex flex-col bg-gray-50 dark:bg-slate-950 text-gray-900 dark:text-slate-100 selection:bg-green-200 selection:text-green-900">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
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
