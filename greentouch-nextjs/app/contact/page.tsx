import { Metadata } from 'next';
import { Facebook, Twitter, Linkedin, Instagram, Send, Clock, Phone } from 'lucide-react';
import ContactForm from '../components/ContactForm';
import ContactHero from '../components/contact/ContactHero';
import ContactOptions from '../components/contact/ContactOptions';
import WhyChoose from '../components/contact/WhyChoose';
import InquiryTimeline from '../components/contact/InquiryTimeline';
import ContactFaq from '../components/contact/ContactFaq';
import LocationSection from '../components/contact/LocationSection';
import SocialProof from '../components/contact/SocialProof';
import Reveal from '../components/ui/Reveal';
import { CONTACT_FAQS } from '../components/contact/contactData';
import { getSiteSettings } from '../lib/queries/site-settings';
import { jsonLdScript } from '../lib/utils';

const SOCIAL_META = [
  { key: 'facebook' as const, label: 'Facebook', icon: Facebook },
  { key: 'twitter' as const, label: 'Twitter', icon: Twitter },
  { key: 'linkedin' as const, label: 'LinkedIn', icon: Linkedin },
  { key: 'instagram' as const, label: 'Instagram', icon: Instagram },
];

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Get expert guidance on cleaning, hygiene, and chemical supply for schools, institutions, and businesses. Reliable bulk supply with a typical 24-hour response.',
  alternates: { canonical: '/contact' },
};

// FAQ structured data for richer search results. Server-only, zero runtime cost.
const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: CONTACT_FAQS.map(({ question, answer }) => ({
    '@type': 'Question',
    name: question,
    acceptedAnswer: { '@type': 'Answer', text: answer },
  })),
};

// Server-rendered page shell. The only client islands are <ContactForm /> (owns
// its validation, Turnstile, and submission) and the small FAQ accordion +
// <Reveal> entrance wrappers. Rendering the shell on the server preserves
// SSR/SEO while keeping the JS payload minimal.
export default async function ContactPage() {
  const s = await getSiteSettings();
  const socials = SOCIAL_META.map((m) => ({ ...m, url: s.social[m.key] })).filter(
    (x): x is typeof x & { url: string } => Boolean(x.url),
  );
  const hours = s.businessHours[0] ? `${s.businessHours[0].label}: ${s.businessHours[0].value}` : '';

  const contactPointJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: s.companyName,
    url: `${s.siteUrl}/contact`,
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: s.phone,
      email: s.email,
      contactType: 'sales',
      areaServed: 'NP',
      availableLanguage: ['en', 'ne'],
    },
  };

  return (
    <main className="bg-white dark:bg-slate-950">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(contactPointJsonLd) }}
      />

      {/* Section 1 — Premium hero */}
      <ContactHero />

      {/* Form moved directly below the hero so it's reachable within the first
          mobile screen; contact options now follow it. */}
      <section className="relative bg-slate-50 py-12 dark:bg-slate-900/40 md:py-20">
        <div className="container">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-5 lg:gap-10">
            {/* Form island */}
            <div className="lg:col-span-3">
              <Reveal>
                <div className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-soft-xl backdrop-blur-sm dark:border-slate-700/60 dark:bg-slate-800/70 md:p-8">
                  <div className="mb-6 flex items-center gap-3">
                    <span className="inline-flex rounded-xl bg-green-100 p-2.5 text-green-600 dark:bg-green-900/40 dark:text-green-400">
                      <Send className="h-5 w-5" />
                    </span>
                    <div>
                      <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 md:text-2xl">
                        Send Us a Message
                      </h2>
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        Tell us what you need — we&apos;ll get back with a tailored response.
                      </p>
                    </div>
                  </div>
                  {/* What to expect — availability + preferred methods (response
                      time is shown inside the form itself). */}
                  <ul className="mb-6 flex flex-wrap gap-2">
                    <li className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-700 ring-1 ring-green-100 dark:bg-green-900/30 dark:text-green-300 dark:ring-green-800/40">
                      <Clock className="h-3.5 w-3.5" />
                      {hours}
                    </li>
                    <li className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-700 ring-1 ring-green-100 dark:bg-green-900/30 dark:text-green-300 dark:ring-green-800/40">
                      <Phone className="h-3.5 w-3.5" />
                      Call, WhatsApp or email
                    </li>
                  </ul>
                  <ContactForm />
                </div>
              </Reveal>
            </div>

            {/* Why choose + socials */}
            <div className="space-y-6 lg:col-span-2">
              <Reveal delay={0.08}>
                <WhyChoose />
              </Reveal>
              <Reveal delay={0.12}>
                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700/60 dark:bg-slate-800/60">
                  <h2 className="mb-4 text-lg font-semibold text-slate-900 dark:text-slate-100">
                    Connect With Us
                  </h2>
                  <div className="flex flex-wrap gap-3">
                    {socials.map(({ label, icon: Icon, url }) => (
                      <a
                        key={label}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={label}
                        className="inline-flex rounded-full bg-gray-100 p-3.5 text-gray-700 transition-all duration-300 hover:-translate-y-0.5 hover:bg-green-600 hover:text-white dark:bg-slate-700 dark:text-slate-200"
                      >
                        <Icon className="h-5 w-5" />
                      </a>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2 — Contact options grid (now below the form) */}
      <ContactOptions />

      {/* Section 5 — Inquiry process timeline */}
      <InquiryTimeline />

      {/* Section 6 — FAQ */}
      <ContactFaq />

      {/* Section 7 — Location */}
      <LocationSection />

      {/* Section 8 — Social proof */}
      <SocialProof />
    </main>
  );
}
