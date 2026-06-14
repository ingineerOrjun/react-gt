"use client";

import React from 'react';

const testimonials = [
  {
    quote: "GreenTouch's eco-friendly chemicals have transformed our manufacturing process, reducing our environmental impact without sacrificing quality.",
    author: "Sarah Johnson",
    position: "Operations Director, EcoManufacturing Inc."
  },
  {
    quote: "The technical support and innovative solutions provided by GreenTouch have helped us meet our sustainability goals ahead of schedule.",
    author: "Michael Chen",
    position: "Chief Sustainability Officer, GreenTech Solutions"
  },
  {
    quote: "Switching to GreenTouch's products has not only reduced our carbon footprint but has also improved our production efficiency by 30%.",
    author: "Emma Rodriguez",
    position: "Plant Manager, BioProducts Co."
  }
];

export default function TestimonialsSection() {
  return (
    <section className="py-16 bg-gradient-to-b from-green-50 to-white dark:bg-gradient-to-b dark:from-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            What Our Clients Say
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            We're proud to partner with forward-thinking companies committed to sustainability.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow relative"
            >
              <div className="absolute top-0 right-0 w-12 h-12 -mt-4 -mr-4 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
                </svg>
              </div>
              
              <p className="text-gray-700 dark:text-gray-300 italic mb-4">"{testimonial.quote}"</p>
              
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white">{testimonial.author}</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.position}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 