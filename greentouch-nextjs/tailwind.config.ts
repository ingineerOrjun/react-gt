import type { Config } from 'tailwindcss';
import typography from '@tailwindcss/typography';

// ── GreenTouch design system — brand ramp ────────────────────────────────────
// Emerald-teal anchored on the brand primary #0F766E (600) and hover #115E59
// (700). The legacy `green` key is remapped to this ramp so the entire existing
// codebase shifts to the new brand automatically; `brand` is the same ramp under
// a semantic name for future use.
const brand = {
  50: '#f0fdfa',
  100: '#ccfbf1',
  200: '#99f6e4',
  300: '#5eead4',
  400: '#2dd4bf',
  500: '#14b8a6',
  600: '#0f766e', // primary
  700: '#115e59', // primary hover
  800: '#134e4a',
  900: '#0f3b38',
  950: '#042f2e',
};

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        green: brand, // legacy alias → whole site adopts the brand automatically
        brand,
        navy: { DEFAULT: '#0F172A', light: '#1E293B', dark: '#0B1120' }, // secondary
        accent: { DEFAULT: '#38BDF8' }, // sky — links / focus / interactive only
        // Luxury brass gold — trust badges / active nav / separators only (never
        // CTAs or text). `premium` kept as the key so existing usages adopt it.
        premium: { DEFAULT: '#C8A24C', dark: '#A8853A' },
        gold: { DEFAULT: '#C8A24C', dark: '#A8853A' },
      },
      fontFamily: {
        sans: ['var(--font-inter)'],
        heading: ['var(--font-jakarta)'],
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '2rem',
          lg: '4rem',
          xl: '5rem',
          '2xl': '6rem',
        },
      },
      boxShadow: {
        'soft-xl': '0 20px 27px 0 rgba(0, 0, 0, 0.05)',
        // Premium card depth tuned against the navy secondary.
        card: '0 10px 40px rgba(15, 23, 42, 0.08)',
        'card-hover': '0 18px 50px rgba(15, 23, 42, 0.12)',
      },
    },
  },
  plugins: [typography],
};

export default config;
