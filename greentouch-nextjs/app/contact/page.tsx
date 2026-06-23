import { Metadata } from 'next';
import { MapPin, Phone, Mail, Clock, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';
import ContactForm from '../components/ContactForm';
import { CONTACT_INFO } from '../lib/constants';

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Get in touch with our team for inquiries about our eco-friendly chemical solutions, partnerships, or sustainability initiatives.',
  alternates: { canonical: '/contact' },
};

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

// Server-rendered page shell. The only client island is <ContactForm />, which
// owns its own interactivity (validation, Turnstile, submission). Rendering the
// shell on the server restores SSR/SEO that the previous `ssr: false` wrapper
// disabled, while keeping the JS payload to just the form.
export default function ContactPage() {
  return (
    <main className="bg-gradient-to-b from-gray-50 to-gray-100 dark:from-slate-950 dark:to-slate-900 py-12 md:py-20 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-slate-100 mb-4">
            Contact Us
          </h1>
          <p className="text-lg text-gray-600 dark:text-slate-300 max-w-2xl mx-auto">
            Have questions or want to learn more about our eco-friendly solutions? Our team is ready
            to assist you. Fill out the form below or use our contact information.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10">
          {/* Form island */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 md:p-8">
              <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-slate-100">
                Send Us a Message
              </h2>
              <ContactForm />
            </div>
          </div>

          {/* Info column (static, SSR) */}
          <div className="space-y-8">
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6 md:p-8 hover:shadow-xl transition-all duration-300">
              <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-slate-100">
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
                      <h3 className="font-medium text-gray-900 dark:text-slate-100 mb-1">{title}</h3>
                      {href ? (
                        <a
                          href={href}
                          className="text-green-600 dark:text-green-400 hover:underline break-all transition-colors"
                        >
                          {value}
                        </a>
                      ) : (
                        <p className="text-gray-600 dark:text-slate-300">{value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6 md:p-8 hover:shadow-xl transition-all duration-300">
              <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-slate-100">
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
                    className="bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-slate-200 hover:bg-green-600 hover:text-white p-4 rounded-full transition-all duration-300 hover:scale-110"
                  >
                    <Icon className="h-6 w-6" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
