"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

export default function AboutPageContent() {
  const [openTimeline, setOpenTimeline] = useState<number | null>(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (count === 0 && window.scrollY > 300) {
        let currentCount = 0;
        const interval = setInterval(() => {
          if (currentCount < 25) {
            currentCount++;
            setCount(currentCount);
          } else {
            clearInterval(interval);
          }
        }, 50);
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [count]);

  const timeline = [
    {
      year: 2012,
      title: "Founding Vision",
      shortDescription: "Established in a small laboratory with a mission to reduce environmental impact...",
      fullDescription: "Our founders, Dr. Sharma and Dr. Patel, started with a simple vision of creating chemical products that wouldn't harm the environment. Despite early challenges, they secured their first major manufacturing partnership within 18 months."
    },
    {
      year: 2015,
      title: "Expansion & Growth",
      shortDescription: "Opened our first dedicated research facility...",
      fullDescription: "We expanded our operations with a state-of-the-art research facility in Chennai, growing our team to over 50 scientists and researchers. This period marked our first international distribution agreements."
    },
    {
      year: 2018,
      title: "Sustainability Certification",
      shortDescription: "Achieved ISO 14001 environmental certification...",
      fullDescription: "All our manufacturing processes received ISO 14001 certification, confirming our commitment to environmental management. We also introduced our first fully biodegradable product line to the market."
    },
    {
      year: 2021,
      title: "Innovation Awards",
      shortDescription: "Recognized for groundbreaking green chemistry solutions...",
      fullDescription: "GreenTouch received multiple industry awards for our innovative approach to sustainable chemistry, including the prestigious EcoInnovator Award for our water-based solvent alternatives."
    }
  ];

  const teamMembers = [
    {
      name: "Dr. Ananya Sharma",
      role: "Founder & CEO",
      image: "/images/team/placeholder.jpg",
      bio: "With a Ph.D. in Organic Chemistry and over 15 years of industry experience, Dr. Sharma leads our vision for sustainable chemical solutions."
    },
    {
      name: "Dr. Raj Patel",
      role: "Co-Founder & CTO",
      image: "/images/team/placeholder.jpg",
      bio: "A pioneer in green chemistry research, Dr. Patel oversees all technical developments and our R&D department."
    },
    {
      name: "Meera Krishnan",
      role: "Chief Sustainability Officer",
      image: "/images/team/placeholder.jpg",
      bio: "Former environmental consultant with expertise in sustainable supply chain management and carbon footprint reduction."
    }
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[400px] flex items-center justify-center bg-cover bg-center">
        <div className="absolute inset-0 bg-green-700/60 z-0">
          <Image
            src="/images/banner/bann.jpeg"
            alt="Laboratory"
            fill
            className="object-cover mix-blend-overlay"
          />
        </div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-fade-in">
            Our Story of Sustainable Innovation
          </h1>
          <p className="text-xl md:text-2xl">
            Pioneering eco-friendly solutions since 2012
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-green-700 dark:text-green-500 mb-4">
              Our Mission
            </h2>
            <div className="text-lg md:text-xl leading-relaxed max-w-3xl mx-auto text-gray-700 dark:text-slate-300">
              <p className="mb-6">
                At GreenTouch Chemicals Pvt. Ltd., we&apos;re committed to developing innovative, eco-friendly chemical
                solutions that minimize environmental impact while maximizing performance.
                Founded in 2010, our company has been at the forefront of sustainable
                chemistry, pioneering green alternatives to traditional chemical products.
              </p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <div className="bg-green-50 dark:bg-green-900/30 p-8 rounded-xl shadow-sm">
              <h3 className="text-xl font-semibold text-green-700 dark:text-green-400 mb-4">Sustainability</h3>
              <p className="text-gray-600 dark:text-slate-300">
                We develop products with biodegradable ingredients and minimize waste throughout 
                our production process.
              </p>
            </div>
            
            <div className="bg-green-50 dark:bg-green-900/30 p-8 rounded-xl shadow-sm">
              <h3 className="text-xl font-semibold text-green-700 dark:text-green-400 mb-4">Innovation</h3>
              <p className="text-gray-600 dark:text-slate-300">
                Our dedicated R&D team constantly explores new technologies and formulations 
                to create more effective, environmentally-friendly solutions.
              </p>
            </div>
            
            <div className="bg-green-50 dark:bg-green-900/30 p-8 rounded-xl shadow-sm">
              <h3 className="text-xl font-semibold text-green-700 dark:text-green-400 mb-4">Integrity</h3>
              <p className="text-gray-600 dark:text-slate-300">
                We maintain transparency in our operations and hold ourselves to the highest 
                ethical standards in everything we do.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* History Timeline */}
      <section className="py-16 bg-gray-50 dark:bg-slate-800">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-green-700 dark:text-green-500 mb-12 text-center">
              Our Journey
            </h2>
            <div className="relative pl-8 md:pl-0 space-y-12">
              {timeline.map((item, index) => (
                <div key={index} className="relative flex md:justify-between items-center group">
                  <div className="hidden md:block md:w-1/2"></div>
                  <div className="absolute left-0 h-full w-1 bg-green-100 dark:bg-green-700/30 md:hidden"></div>
                  <div className="absolute left-[-7px] top-4 w-4 h-4 rounded-full bg-green-700 dark:bg-green-500 md:hidden"></div>
                  <div className="md:w-1/2 md:pl-12 transition-all duration-300 hover:scale-[1.02]">
                    <div
                      className="bg-white dark:bg-slate-900 p-8 rounded-xl shadow-lg hover:shadow-xl cursor-pointer"
                      onClick={() => setOpenTimeline(openTimeline === index ? null : index)}
                    >
                      <div className="flex items-center mb-4">
                        <div className="w-12 h-12 bg-green-700 dark:bg-green-600 rounded-full flex items-center justify-center text-white mr-4">
                          {item.year}
                        </div>
                        <h3 className="text-xl font-bold text-green-700 dark:text-green-500">
                          {item.title}
                        </h3>
                      </div>
                      <p className="text-gray-600 dark:text-slate-300">
                        {openTimeline === index ? item.fullDescription : item.shortDescription}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="bg-gradient-to-r from-green-700 to-green-800 text-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            Our Impact
          </h2>
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="p-6">
              <div className="text-4xl font-bold mb-2">{count}M+</div>
              <p className="text-green-100">Products Sold</p>
            </div>
            <div className="p-6">
              <div className="text-4xl font-bold mb-2">650K+</div>
              <p className="text-green-100">Trees Planted</p>
            </div>
            <div className="p-6">
              <div className="text-4xl font-bold mb-2">98%</div>
              <p className="text-green-100">Customer Satisfaction</p>
            </div>
            <div className="p-6">
              <div className="text-4xl font-bold mb-2">40+</div>
              <p className="text-green-100">Countries Served</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-green-700 dark:text-green-500 mb-12 text-center">
            Our Leadership Team
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-gray-50 dark:bg-slate-800 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300">
                <div className="h-64 relative">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-green-700 dark:text-green-500 mb-1">{member.name}</h3>
                  <p className="text-gray-500 dark:text-slate-400 mb-4">{member.role}</p>
                  <p className="text-gray-600 dark:text-slate-300">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-16 bg-gray-50 dark:bg-slate-800">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto bg-white dark:bg-slate-900 p-8 md:p-12 rounded-2xl shadow-lg text-center">
            <blockquote className="text-xl md:text-2xl text-gray-600 dark:text-slate-300 italic mb-6">
              &ldquo;GreenTouch Chemicals Pvt. Ltd. has completely transformed our manufacturing process.
              Their eco-friendly solutions reduced our environmental footprint by 40% while
              improving our product quality.&rdquo;
            </blockquote>
            <div className="flex items-center justify-center">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-800 rounded-full flex items-center justify-center text-green-700 dark:text-green-300 font-semibold mr-4">AB</div>
              <div className="text-left">
                <p className="font-semibold text-gray-800 dark:text-slate-100">Anjali Bhatia</p>
                <p className="text-gray-500 dark:text-slate-400">CEO, EcoManufacturing Ltd.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
} 