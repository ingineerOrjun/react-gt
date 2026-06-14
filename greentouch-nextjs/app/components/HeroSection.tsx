"use client";

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const BANNER_DATA = [
  { img: '/images/banner/ba.jpeg', text: 'GreenTouch Chemicals Pvt. Ltd.' },
  { img: '/images/banner/bann.jpeg', text: 'Sustainable Chemistry, Delivered' },
  { img: '/images/banner/bc.jpeg', text: 'Innovating for a Greener Tomorrow' },
];

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const next = useCallback(
    () => setCurrentSlide((prev) => (prev < BANNER_DATA.length - 1 ? prev + 1 : 0)),
    []
  );
  const prev = () => setCurrentSlide((p) => (p > 0 ? p - 1 : BANNER_DATA.length - 1));

  useEffect(() => {
    const interval = setInterval(next, 6000);
    return () => clearInterval(interval);
  }, [next]);

  return (
    <section className="relative w-full h-[80vh] min-h-[480px] overflow-hidden">
      {/* Slides */}
      <div
        className="relative w-full h-full flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {BANNER_DATA.map((slide, index) => (
          <div key={index} className="w-full flex-shrink-0 relative h-full">
            <Image
              src={slide.img}
              alt={slide.text}
              fill
              priority={index === 0}
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/70" />
          </div>
        ))}
      </div>

      {/* Animated caption (re-animates on slide change) */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-6 pointer-events-none">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="max-w-4xl"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">
              {BANNER_DATA[currentSlide].text}
            </h1>
            <p className="text-lg md:text-2xl mb-8 text-green-50/90">
              Chemistry in Harmony with Nature
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pointer-events-auto">
              <Link
                href="/products"
                className="px-8 py-3.5 bg-green-600 hover:bg-green-500 transition rounded-lg text-lg font-semibold shadow-lg hover:-translate-y-0.5"
              >
                Explore Products
              </Link>
              <Link
                href="/contact"
                className="px-8 py-3.5 bg-white/10 backdrop-blur-sm border border-white/60 hover:bg-white/20 transition rounded-lg text-lg font-semibold"
              >
                Contact Us
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-3 z-10">
        {BANNER_DATA.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`h-2.5 rounded-full border border-white/70 transition-all duration-300 ${
              currentSlide === index ? 'bg-white w-8' : 'bg-white/40 w-2.5 hover:bg-white/70'
            }`}
          />
        ))}
      </div>

      {/* Arrows */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-3 rounded-full transition z-10"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-3 rounded-full transition z-10"
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6" />
      </button>
    </section>
  );
}
