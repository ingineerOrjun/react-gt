// Icon registry — maps a stored icon NAME (string in the DB) to a lucide icon.
// Shared by the public homepage render and the admin editor so features/stats
// can store icons as plain text. Client-safe (no server-only).
import {
  BadgeCheck,
  Building2,
  PackageCheck,
  Headphones,
  Truck,
  Sparkles,
  Factory,
  HeartHandshake,
  ShieldCheck,
  Leaf,
  Droplets,
  Recycle,
  FlaskConical,
  Award,
  Boxes,
  Clock,
  Users,
  ThumbsUp,
  Zap,
  Star,
  type LucideIcon,
} from 'lucide-react';

export const ICON_MAP: Record<string, LucideIcon> = {
  BadgeCheck,
  Building2,
  PackageCheck,
  Headphones,
  Truck,
  Sparkles,
  Factory,
  HeartHandshake,
  ShieldCheck,
  Leaf,
  Droplets,
  Recycle,
  FlaskConical,
  Award,
  Boxes,
  Clock,
  Users,
  ThumbsUp,
  Zap,
  Star,
};

/** Names available in the admin icon picker. */
export const ICON_NAMES = Object.keys(ICON_MAP);

/** Resolve a stored name to an icon, falling back to a neutral default. */
export function resolveIcon(name: string | null | undefined): LucideIcon {
  return (name && ICON_MAP[name]) || ShieldCheck;
}
