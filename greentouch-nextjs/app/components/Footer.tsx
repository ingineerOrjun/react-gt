"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Mail,
  Phone,
  MapPin,
  ChevronRight,
  Instagram,
  Facebook,
  Twitter,
  Linkedin,
  Leaf,
} from 'lucide-react';

const SOCIALS = [
  { label: 'Facebook', icon: Facebook, url: 'https://facebook.com/greentouchchemicalsindustries' },
  { label: 'Twitter', icon: Twitter, url: 'https://twitter.com/greentouchchem' },
  { label: 'Instagram', icon: Instagram, url: 'https://instagram.com/greentouchchemicalsindustries' },
  { label: 'LinkedIn', icon: Linkedin, url: 'https://linkedin.com/company/greentouch-chemical-industries' },
];

const QUICK_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Products', href: '/products' },
  { label: 'About', href: '/about' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const pathname = usePathname();

  // Admin routes have their own layout; hide the marketing footer there.
  if (pathname?.startsWith('/admin')) return null;

  return (
    <footer className="bg-gradient-to-b from-green-800 to-green-950 text-white relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden opacity-10 pointer-events-none">
        <div className="leaf-pattern absolute inset-0 w-full h-full" />
      </div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <CompanyInfo />
          <QuickLinks />
          <ContactInfo />
          <Newsletter />
        </div>
      </div>

      <BottomFooter year={currentYear} />

      <style jsx>{`
        .leaf-pattern {
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 24 24' fill='none' stroke='%23ffffff' stroke-width='0.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z'/%3E%3Cpath d='M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12'/%3E%3C/svg%3E");
          background-repeat: space;
          animation: leafFloat 120s linear infinite;
        }
        @keyframes leafFloat {
          from { background-position: 0 0; }
          to { background-position: 1000px 1000px; }
        }
        @media (prefers-reduced-motion: reduce) {
          .leaf-pattern { animation: none; }
        }
      `}</style>
    </footer>
  );
}

const CompanyInfo = () => (
  <div className="space-y-4">
    <Link href="/" className="inline-flex items-center group">
      <Leaf className="w-6 h-6 mr-2 text-green-300 transition-transform group-hover:scale-110" />
      <span className="text-xl font-bold bg-gradient-to-r from-green-300 to-green-100 bg-clip-text text-transparent">
        GreenTouch Chemicals
      </span>
    </Link>
    <p className="text-green-100/90 leading-relaxed">
      Your partner in sustainable chemical solutions for a greener tomorrow.
    </p>
    <div className="flex space-x-3 pt-2">
      {SOCIALS.map(({ label, icon: Icon, url }) => (
        <a
          key={label}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className="bg-green-700/70 hover:bg-green-500 p-2 rounded-full transition-all duration-300 hover:-translate-y-1"
        >
          <Icon size={18} className="text-white" />
        </a>
      ))}
    </div>
  </div>
);

const QuickLinks = () => (
  <div>
    <h4 className="text-lg font-semibold mb-6 text-green-200 border-b border-green-700 pb-2">
      Quick Links
    </h4>
    <ul className="space-y-3">
      {QUICK_LINKS.map((link) => (
        <li key={link.href}>
          <Link
            href={link.href}
            className="flex items-center text-green-100 hover:text-white transition-colors duration-300 group"
          >
            <ChevronRight className="w-4 h-4 mr-2 text-green-400 group-hover:translate-x-1 transition-transform duration-300" />
            <span>{link.label}</span>
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

const ContactInfo = () => (
  <div>
    <h4 className="text-lg font-semibold mb-6 text-green-200 border-b border-green-700 pb-2">
      Contact Us
    </h4>
    <div className="space-y-3">
      <p className="flex items-start group p-2 rounded-lg hover:bg-green-700/30 transition-all duration-300">
        <MapPin className="w-5 h-5 mr-3 mt-0.5 text-green-300 flex-shrink-0" />
        <span className="text-green-100 group-hover:text-white transition-colors">
          Kushwaha Chock Dhalkebar,
          <br />
          Dhanusa district
        </span>
      </p>
      <a
        href="tel:9801603296"
        className="flex items-center group p-2 rounded-lg hover:bg-green-700/30 transition-all duration-300"
      >
        <Phone className="w-5 h-5 mr-3 text-green-300 flex-shrink-0" />
        <span className="text-green-100 group-hover:text-white transition-colors">9801603296</span>
      </a>
      <a
        href="mailto:greentouchgrouppvtltd.1@gmail.com"
        className="flex items-center group p-2 rounded-lg hover:bg-green-700/30 transition-all duration-300"
      >
        <Mail className="w-5 h-5 mr-3 text-green-300 flex-shrink-0" />
        <span className="text-green-100 group-hover:text-white transition-colors break-all">
          greentouchgrouppvtltd.1@gmail.com
        </span>
      </a>
    </div>
  </div>
);

const Newsletter = () => (
  <div>
    <h4 className="text-lg font-semibold mb-6 text-green-200 border-b border-green-700 pb-2">
      Newsletter
    </h4>
    <p className="text-green-100/90 mb-4">
      Subscribe for the latest updates on sustainable chemistry and exclusive offers.
    </p>
    <form className="space-y-2" onSubmit={(e) => e.preventDefault()}>
      <div className="relative">
        <input
          type="email"
          required
          placeholder="Enter your email"
          className="w-full px-4 py-3 rounded-lg bg-green-700/40 text-white placeholder-green-200 border border-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all duration-300"
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
          <Mail className="h-5 w-5 text-green-300" />
        </div>
      </div>
      <button
        type="submit"
        className="w-full px-4 py-3 bg-green-500 text-white rounded-lg hover:bg-green-400 transition-all duration-300 font-medium shadow-sm hover:shadow-md"
      >
        Subscribe
      </button>
      <p className="text-xs text-green-300/80 mt-2">
        We respect your privacy. Unsubscribe at any time.
      </p>
    </form>
  </div>
);

const BottomFooter = ({ year }: { year: number }) => (
  <div className="border-t border-green-700/50 py-6 relative z-10">
    <div className="container mx-auto px-4">
      <div className="flex flex-col md:flex-row justify-between items-center gap-3">
        <p className="text-green-200/80 text-sm text-center md:text-left">
          © {year} GreenTouch Chemicals Pvt. Ltd. All rights reserved.
        </p>
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
          <Link href="/privacy" className="link-underline text-green-200/80 hover:text-white transition-colors">
            Privacy Policy
          </Link>
          <Link href="/terms" className="link-underline text-green-200/80 hover:text-white transition-colors">
            Terms of Service
          </Link>
          <Link href="/cookies" className="link-underline text-green-200/80 hover:text-white transition-colors">
            Cookie Policy
          </Link>
        </div>
      </div>
    </div>
  </div>
);
