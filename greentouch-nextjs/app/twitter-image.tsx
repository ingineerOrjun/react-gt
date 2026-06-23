// Twitter card image reuses the Open Graph image. Re-exporting the route's
// default + metadata makes Next emit `twitter:image` (1200x630, summary_large_image).
export const runtime = 'edge';

export { default, alt, size, contentType } from './opengraph-image';
