import { Metadata } from 'next';
import { Inter, Poppins } from 'next/font/google';
import { Providers } from './providers';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['500', '600', '700', '800'],
  variable: '--font-poppins',
  display: 'swap',
});

const siteUrl = 'https://greentouchchemicals.com';

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
      className={`${inter.variable} ${poppins.variable} scroll-smooth`}
    >
      <body className="font-sans antialiased min-h-screen flex flex-col bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 selection:bg-green-200 selection:text-green-900">
        <Providers>
          <Navbar />
          <main className="flex-grow pt-20">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
