import { MessageSquare, Factory, BadgeCheck } from 'lucide-react';
import PremiumHero from '../ui/PremiumHero';
import { HERO_TRUST } from '../ui/heroData';

// About hero — built on the shared PremiumHero system.
export default function AboutHero() {
  return (
    <PremiumHero
      padding="py-16 md:py-24"
      eyebrow="About GreenTouch Chemicals"
      headline={
        <>
          Delivering Reliable <span className="text-gradient-green">Cleaning Solutions</span> for
          Homes, Businesses, and Industries
        </>
      }
      copy="GreenTouch Chemicals is a local manufacturer committed to high-quality cleaning and hygiene products that help customers maintain cleaner, safer, and healthier environments."
      trust={HERO_TRUST}
      ctas={[
        { label: 'Explore Products', href: '/products', variant: 'primary' },
        { label: 'Contact Us', href: '/contact', variant: 'outline', icon: MessageSquare },
      ]}
      floatingStats={[
        { icon: Factory, value: 'Local manufacturer', label: 'Dhalkebar, Nepal' },
        { icon: BadgeCheck, value: 'Quality assured', label: 'Consistent, reliable supply' },
      ]}
    />
  );
}
