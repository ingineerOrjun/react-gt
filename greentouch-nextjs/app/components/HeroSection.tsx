"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const BANNER_DATA = [
    { img: "/images/banner/ba.jpeg", text: "GREENTOUCH CHEMICAL INDUSTRIES PRIVATE LIMITED" },
    { img: "/images/banner/bann.jpeg", text: "GREENTOUCH CHEMICAL INDUSTRIES PRIVATE LIMITED" },
    { img: "/images/banner/bc.jpeg", text: "GREENTOUCH CHEMICAL INDUSTRIES PRIVATE LIMITED" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev < BANNER_DATA.length - 1 ? prev + 1 : 0));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full h-[80vh] overflow-hidden">
      <div
        className="relative w-full h-full flex transition-transform duration-700"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {BANNER_DATA.map((slide, index) => (
          <div key={index} className="w-full flex-shrink-0 relative h-full">
            <Image
              src={slide.img}
              alt="Hero"
              fill
              priority
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white text-center px-6">
              <h1 className="text-4xl md:text-6xl font-bold mb-4">
                {slide.text}
              </h1>
              <p className="text-lg md:text-xl">
                Chemistry in Harmony with Nature
              </p>
              <Link href="/contact" className="mt-6 px-6 py-3 bg-green-800 hover:bg-green-700 transition rounded-lg text-lg font-semibold">
                Contact Us
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3">
        {BANNER_DATA.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-4 h-4 rounded-full border border-white transition-all ${
              currentSlide === index ? "bg-white" : "bg-gray-500"
            }`}
          />
        ))}
      </div>

      <button
        onClick={() =>
          setCurrentSlide((prev) => (prev > 0 ? prev - 1 : BANNER_DATA.length - 1))
        }
        className="absolute left-5 top-2/4 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full"
        aria-label="Previous slide"
      >
        ❮
      </button>

      <button
        onClick={() =>
          setCurrentSlide((prev) => (prev < BANNER_DATA.length - 1 ? prev + 1 : 0))
        }
        className="absolute right-5 top-2/4 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full"
        aria-label="Next slide"
      >
        ❯
      </button>
    </section>
  );
} 