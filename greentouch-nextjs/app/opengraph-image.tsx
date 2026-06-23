import { ImageResponse } from 'next/og';

// Branded 1200x630 Open Graph image, generated at the edge of the build/runtime.
// Using the App Router file convention means Next automatically emits the
// `og:image` (and, via twitter-image.tsx, `twitter:image`) tags with the correct
// absolute URL + dimensions — no manual metadata wiring needed.

// Edge runtime is the supported target for next/og ImageResponse and avoids the
// node font-path resolution bug in @vercel/og under Next 14.2.
export const runtime = 'edge';

export const alt = 'GreenTouch Chemicals — Sustainable Chemical Solutions';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const GREEN = '#16a34a';

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '80px',
          background: 'linear-gradient(135deg, #052e16 0%, #166534 55%, #16a34a 100%)',
          color: '#ffffff',
          fontFamily: 'sans-serif',
          position: 'relative',
        }}
      >
        {/* Decorative product-focused motifs (abstract droplets / beakers). */}
        <div
          style={{
            position: 'absolute',
            top: -120,
            right: -80,
            width: 420,
            height: 420,
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.08)',
            display: 'flex',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: -160,
            right: 180,
            width: 320,
            height: 320,
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.06)',
            display: 'flex',
          }}
        />

        {/* Eyebrow row: tagline pill (left) + domain (right) */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '12px 24px',
              borderRadius: 999,
              background: 'rgba(255,255,255,0.14)',
              fontSize: 26,
              fontWeight: 600,
              letterSpacing: 2,
            }}
          >
            ECO-FRIENDLY · SUSTAINABLE
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div
              style={{
                display: 'flex',
                width: 26,
                height: 26,
                borderRadius: '50%',
                background: GREEN,
                border: '4px solid #ffffff',
              }}
            />
            <div style={{ display: 'flex', fontSize: 28, fontWeight: 600 }}>
              greentouchchemicals.com
            </div>
          </div>
        </div>

        {/* Title block */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', fontSize: 84, fontWeight: 800, lineHeight: 1.05 }}>
            GreenTouch Chemicals
          </div>
          <div style={{ display: 'flex', marginTop: 16, fontSize: 40, color: '#d1fae5' }}>
            Sustainable Chemical Solutions
          </div>
        </div>

        {/* Product categories */}
        <div style={{ display: 'flex', gap: 16 }}>
          {['Eco Cleaners', 'Industrial Solutions', 'Water Treatment', 'Green Chemicals'].map(
            (label) => (
              <div
                key={label}
                style={{
                  display: 'flex',
                  padding: '12px 22px',
                  borderRadius: 14,
                  background: 'rgba(255,255,255,0.16)',
                  border: '1px solid rgba(255,255,255,0.25)',
                  fontSize: 26,
                  fontWeight: 600,
                }}
              >
                {label}
              </div>
            )
          )}
        </div>
      </div>
    ),
    { ...size }
  );
}
