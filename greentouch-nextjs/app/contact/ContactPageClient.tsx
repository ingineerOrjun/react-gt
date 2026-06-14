'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';
import { CONTACT_INFO } from '../lib/constants';

const ContactForm = dynamic(() => import('../components/ContactForm'), { ssr: false });

const SOCIALS = [
  { label: 'Facebook', icon: Facebook, url: 'https://facebook.com/greentouchchemicalsindustries' },
  { label: 'Twitter', icon: Twitter, url: 'https://twitter.com/greentouchchem' },
  { label: 'LinkedIn', icon: Linkedin, url: 'https://linkedin.com/company/greentouch-chemical-industries' },
  { label: 'Instagram', icon: Instagram, url: 'https://instagram.com/greentouchchemicalsindustries' },
];

const CONTACT_ITEMS = [
  { icon: MapPin, title: 'Address', value: CONTACT_INFO.address },
  { icon: Phone, title: 'Phone', value: CONTACT_INFO.phone, href: `tel:${CONTACT_INFO.phone}` },
  { icon: Mail, title: 'Email', value: CONTACT_INFO.email, href: `mailto:${CONTACT_INFO.email}` },
  { icon: Clock, title: 'Hours', value: CONTACT_INFO.hours },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } },
};

export default function ContactPageClient() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => setLoaded(true), []);

  return (
    <main className="bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900 py-12 md:py-20 min-h-screen">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Contact Us
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Have questions or want to learn more about our eco-friendly solutions? Our team is ready
            to assist you. Fill out the form below or use our contact information.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={loaded ? 'visible' : 'hidden'}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10"
        >
          {/* Form */}
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 md:p-8">
              <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">
                Send Us a Message
              </h2>
              <ContactForm />
            </div>
          </motion.div>

          {/* Info column */}
          <motion.div variants={itemVariants} className="space-y-8">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 md:p-8 hover:shadow-xl transition-all duration-300">
              <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">
                Contact Information
              </h2>
              <div className="space-y-4">
                {CONTACT_ITEMS.map(({ icon: Icon, title, value, href }) => (
                  <div
                    key={title}
                    className="flex items-start group hover:bg-green-50 dark:hover:bg-green-900/20 p-3 rounded-lg transition-all duration-300"
                  >
                    <div className="bg-green-100 dark:bg-green-900/40 p-3 rounded-full mr-4 group-hover:bg-green-200 dark:group-hover:bg-green-900/60 transition-colors duration-300">
                      <Icon className="h-6 w-6 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white mb-1">{title}</h3>
                      {href ? (
                        <a
                          href={href}
                          className="text-green-600 dark:text-green-400 hover:underline break-all transition-colors"
                        >
                          {value}
                        </a>
                      ) : (
                        <p className="text-gray-600 dark:text-gray-300">{value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 md:p-8 hover:shadow-xl transition-all duration-300">
              <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">
                Connect With Us
              </h2>
              <div className="flex flex-wrap gap-4">
                {SOCIALS.map(({ label, icon: Icon, url }) => (
                  <a
                    key={label}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-green-600 hover:text-white p-4 rounded-full transition-all duration-300 hover:scale-110"
                  >
                    <Icon className="h-6 w-6" />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </main>
  );
}
