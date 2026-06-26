import { Phone, Mail } from 'lucide-react';
import PremiumHero from '../ui/PremiumHero';
import { HERO_TRUST } from '../ui/heroData';
import { CONTACT_INFO } from '../../lib/constants';

// Contact hero — built on the shared PremiumHero system. Phone + email are
// surfaced as CTAs and desktop floating panels; on mobile the CTA row is hidden
// (the global sticky bar + the form directly below cover contact actions, so the
// form stays within the first mobile screen).
export default function ContactHero() {
  return (
    <PremiumHero
      padding="py-10 md:py-24"
      eyebrow="We typically respond within 24 hours"
      headline={
        <>
          Let&apos;s Discuss Your <span className="text-gradient-green">Cleaning &amp; Hygiene</span>{' '}
          Requirements
        </>
      }
      copy="Professional cleaning and hygiene solutions for schools, institutions, businesses, and industrial environments — supplied reliably and at scale."
      trust={HERO_TRUST}
      trustMobileHidden
      ctas={[
        { label: CONTACT_INFO.phoneDisplay, href: `tel:${CONTACT_INFO.phone}`, variant: 'primary', icon: Phone },
        { label: 'Email Us', href: `mailto:${CONTACT_INFO.email}`, variant: 'outline', icon: Mail },
      ]}
      ctasMobileHidden
      floatingStats={[
        { icon: Phone, value: CONTACT_INFO.phoneDisplay, label: 'Call our team' },
        { icon: Mail, value: CONTACT_INFO.email, label: 'Email us' },
      ]}
    />
  );
}
