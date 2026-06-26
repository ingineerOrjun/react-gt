import { MapPin, Factory, BadgeCheck, Zap, type LucideIcon } from 'lucide-react';

export interface HeroTrustItem {
  icon: LucideIcon;
  label: string;
}

// Shared hero trust layer — honest, real-company strengths (concise for chips).
export const HERO_TRUST: HeroTrustItem[] = [
  { icon: MapPin, label: 'Serving 8+ cities in Nepal' },
  { icon: Factory, label: 'Industrial & institutional' },
  { icon: BadgeCheck, label: 'Local manufacturer' },
  { icon: Zap, label: 'Fast quotation support' },
];
