"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon, Leaf } from 'lucide-react';
import { NAV_LINKS } from '../lib/constants';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const toggleTheme = () => {
    if (mounted) setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const isActive = (path: string) => {
    if (path === '/') return pathname === '/';
    return pathname.startsWith(path);
  };

  // The admin area has its own chrome (sidebar); don't show the marketing nav.
  if (pathname?.startsWith('/admin')) return null;

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 dark:bg-slate-900/90 backdrop-blur-md shadow-md'
          : 'bg-white dark:bg-slate-900'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center group" aria-label="GreenTouch Chemicals home">
            <span className="inline-flex items-center justify-center h-10 w-10 rounded-lg bg-green-600 text-white mr-2.5 transition-transform group-hover:scale-105">
              <Leaf className="h-6 w-6" strokeWidth={2.5} />
            </span>
            <span className="flex flex-col leading-tight">
              <span className="text-lg font-bold text-gray-900 dark:text-slate-100">
                Green<span className="text-green-600 dark:text-green-400">Touch</span>
              </span>
              <span className="text-[10px] uppercase tracking-widest text-gray-500 dark:text-slate-400">
                Chemicals Pvt. Ltd.
              </span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center space-x-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.path}
                aria-current={isActive(link.path) ? 'page' : undefined}
                className={`link-underline inline-flex items-center font-medium tracking-tight transition-colors duration-200 ${
                  isActive(link.path)
                    ? 'is-active font-semibold text-slate-900 dark:text-white'
                    : 'text-slate-600 dark:text-slate-300 hover:text-green-700 dark:hover:text-green-400'
                }`}
              >
                {link.label}
              </Link>
            ))}

            <button
              onClick={toggleTheme}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-gray-100 dark:bg-slate-800 text-gray-800 dark:text-slate-200 hover:ring-2 hover:ring-green-400 transition"
              aria-label="Toggle theme"
            >
              {mounted && theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>

            <Link
              href="/contact"
              className="inline-flex min-h-[44px] items-center px-5 py-2.5 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow-sm hover:shadow-md hover:-translate-y-0.5 hover:scale-[1.02] transition-all duration-300 ease-out"
            >
              Get a Quote
            </Link>
          </nav>

          {/* Mobile controls */}
          <div className="md:hidden flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-gray-100 dark:bg-slate-800 text-gray-800 dark:text-slate-200"
              aria-label="Toggle theme"
            >
              {mounted && theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            <button
              onClick={() => setIsMenuOpen((v) => !v)}
              className="text-gray-700 dark:text-slate-200 hover:text-green-600 dark:hover:text-green-400"
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden bg-white dark:bg-slate-900 shadow-lg overflow-hidden border-t border-gray-100 dark:border-slate-800"
          >
            <nav className="flex flex-col space-y-1 px-4 py-3">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.label}
                  href={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`font-medium py-3 px-3 rounded-lg transition-colors flex items-center min-h-[44px] ${
                    isActive(link.path)
                      ? 'text-green-700 dark:text-green-400 bg-green-50 dark:bg-green-900/30 border-l-2 border-premium'
                      : 'text-gray-700 dark:text-slate-200 hover:bg-gray-50 dark:hover:bg-slate-800'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/contact"
                onClick={() => setIsMenuOpen(false)}
                className="mt-2 inline-flex min-h-[44px] items-center justify-center px-5 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition"
              >
                Get a Quote
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
