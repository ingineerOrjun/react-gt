import type { MetadataRoute } from 'next';

// PWA / installability manifest. Theme color matches the brand primary (#0F766E).
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'GreenTouch Chemicals Pvt. Ltd.',
    short_name: 'GreenTouch',
    description:
      'Premium, eco-conscious cleaning and hygiene products with reliable bulk supply for homes, businesses, and institutions.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#0F766E',
    icons: [{ src: '/icon.svg', sizes: 'any', type: 'image/svg+xml' }],
  };
}
