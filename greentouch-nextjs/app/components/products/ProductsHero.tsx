import { FileText, Boxes, Factory } from 'lucide-react';
import PremiumHero from '../ui/PremiumHero';
import { HERO_TRUST } from '../ui/heroData';

// Products hero — built on the shared PremiumHero system.
export default function ProductsHero() {
  return (
    <PremiumHero
      padding="py-16 md:py-24"
      eyebrow="Industrial cleaning & institutional hygiene"
      headline={
        <>
          Cleaning &amp; Hygiene <span className="text-gradient-green">Products That Perform</span>
        </>
      }
      copy="Eco-friendly chemical solutions for schools, institutions, businesses, and industrial environments — built for performance and available in dependable bulk supply."
      trust={HERO_TRUST}
      ctas={[
        { label: 'Browse Products', href: '#products', variant: 'primary' },
        { label: 'Request a Quote', href: '/contact', variant: 'outline', icon: FileText },
      ]}
      floatingStats={[
        { icon: Boxes, value: 'Bulk supply', label: 'Volume & recurring orders' },
        { icon: Factory, value: 'Industrial-grade', label: 'Institutional hygiene' },
      ]}
    />
  );
}
