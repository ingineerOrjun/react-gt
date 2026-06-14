"use client";

import React from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin, ChevronRight, Instagram, Facebook, Twitter, Linkedin, Leaf } from "lucide-react";
import { FiPhone, FiMail } from 'react-icons/fi';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-b from-green-800 to-green-900 text-white relative overflow-hidden">
      {/* Animated leaf background */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <div className="leaf-pattern absolute inset-0 w-full h-full"></div>
      </div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <CompanyInfo />
          <QuickLinks />
          <ContactInfo />
          <Newsletter />
        </div>
      </div>

      <BottomFooter year={currentYear} />
      
      {/* Leaf pattern style */}
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
      `}</style>
    </footer>
  );
}

const CompanyInfo = () => (
  <div className="space-y-4 transform hover:-translate-y-1 transition-transform duration-500">
    <h3 className="text-2xl font-bold mb-4 relative inline-flex items-center">
      <Leaf className="w-6 h-6 mr-2 text-green-300" />
      <span className="bg-gradient-to-r from-green-300 to-green-100 bg-clip-text text-transparent">
        GreenTouch Chemical Industries Private Limited
      </span>
    </h3>
    <p className="text-green-100 hover:text-white transition-all duration-300 italic">
      Your partner in sustainable chemical solutions for a greener tomorrow.
    </p>
    <div className="flex space-x-3 pt-2">
      <a href="#" className="bg-green-700 hover:bg-green-600 p-2 rounded-full transition-all duration-300">
        <Facebook size={18} className="text-white" />
      </a>
      <a href="#" className="bg-green-700 hover:bg-green-600 p-2 rounded-full transition-all duration-300">
        <Twitter size={18} className="text-white" />
      </a>
      <a href="#" className="bg-green-700 hover:bg-green-600 p-2 rounded-full transition-all duration-300">
        <Instagram size={18} className="text-white" />
      </a>
      <a href="#" className="bg-green-700 hover:bg-green-600 p-2 rounded-full transition-all duration-300">
        <Linkedin size={18} className="text-white" />
      </a>
    </div>
  </div>
);

const QuickLinks = () => (
  <div className="transform hover:-translate-y-1 transition-transform duration-500">
    <h4 className="text-lg font-semibold mb-6 text-green-200 border-b border-green-700 pb-2">
      Quick Links
    </h4>
    <ul className="space-y-3">
      <li>
        <Link
          href="/"
          className="flex items-center text-green-100 hover:text-white transition-colors duration-300 group"
        >
          <ChevronRight className="w-4 h-4 mr-2 text-green-400 group-hover:translate-x-1 transition-transform duration-300" />
          <span>Home</span>
        </Link>
      </li>
      <li>
        <Link
          href="/products"
          className="flex items-center text-green-100 hover:text-white transition-colors duration-300 group"
        >
          <ChevronRight className="w-4 h-4 mr-2 text-green-400 group-hover:translate-x-1 transition-transform duration-300" />
          <span>Products</span>
        </Link>
      </li>
      <li>
        <Link
          href="/blog"
          className="flex items-center text-green-100 hover:text-white transition-colors duration-300 group"
        >
          <ChevronRight className="w-4 h-4 mr-2 text-green-400 group-hover:translate-x-1 transition-transform duration-300" />
          <span>Blog</span>
        </Link>
      </li>
      <li>
        <Link
          href="/contact"
          className="flex items-center text-green-100 hover:text-white transition-colors duration-300 group"
        >
          <ChevronRight className="w-4 h-4 mr-2 text-green-400 group-hover:translate-x-1 transition-transform duration-300" />
          <span>Contact</span>
        </Link>
      </li>
    </ul>
  </div>
);

const ContactInfo = () => (
  <div className="transform hover:-translate-y-1 transition-transform duration-500">
    <h4 className="text-lg font-semibold mb-6 text-green-200 border-b border-green-700 pb-2">
      Contact Us
    </h4>
    <div className="space-y-4">
      <p className="flex items-start group hover:bg-green-700/30 p-2 rounded-lg transition-all duration-300">
        <MapPin className="w-5 h-5 mr-3 mt-1 text-green-300 flex-shrink-0" />
        <span className="text-green-100 group-hover:text-white transition-colors duration-300">
          Kushwaha Chock Dhalkebar,
          <br />
          Dhanusa district
        </span>
      </p>
      <div className="flex items-center group hover:bg-green-700/30 p-2 rounded-lg transition-all duration-300">
        <FiPhone className="w-5 h-5 mr-3 text-green-300 flex-shrink-0" />
        <span className="text-green-100 group-hover:text-white transition-colors duration-300">9801603296</span>
      </div>
      <div className="flex items-center group hover:bg-green-700/30 p-2 rounded-lg transition-all duration-300">
        <FiMail className="w-5 h-5 mr-3 text-green-300 flex-shrink-0" />
        <a
          href="mailto:greentouchgrouppvtltd.1@gmail.com"
          className="text-green-100 group-hover:text-white transition-colors duration-300"
        >
          greentouchgrouppvtltd.1@gmail.com
        </a>
      </div>
    </div>
  </div>
);

const Newsletter = () => (
  <div className="transform hover:-translate-y-1 transition-transform duration-500">
    <h4 className="text-lg font-semibold mb-6 text-green-200 border-b border-green-700 pb-2">
      Newsletter
    </h4>
    <p className="text-green-100 mb-4">
      Subscribe to our newsletter for the latest updates on sustainable chemistry and exclusive offers.
    </p>
    <form className="space-y-2">
      <div className="relative">
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full px-4 py-3 rounded-lg bg-green-700/50 text-white placeholder-green-200 border border-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all duration-300"
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
      <p className="text-xs text-green-300 mt-2">
        We respect your privacy. Unsubscribe at any time.
      </p>
    </form>
  </div>
);

const BottomFooter = ({ year }: { year: number }) => (
  <div className="border-t border-gray-200 dark:border-gray-800 pt-6 mt-8">
    <div className="container mx-auto px-4">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <p className="text-gray-600 dark:text-gray-400 text-sm text-center md:text-left">
          © {year} GreenTouch Chemical Industries Private Limited. All rights reserved.
        </p>
        <div className="flex flex-wrap justify-center space-x-4 mt-2 md:mt-0">
          <Link
            href="/privacy"
            className="hover:text-white hover:underline transition-all duration-300"
          >
            Privacy Policy
          </Link>
          <Link
            href="/terms"
            className="hover:text-white hover:underline transition-all duration-300"
          >
            Terms of Service
          </Link>
          <Link
            href="/cookies"
            className="hover:text-white hover:underline transition-all duration-300"
          >
            Cookie Policy
          </Link>
        </div>
      </div>
    </div>
  </div>
); 