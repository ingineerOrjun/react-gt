'use client';

import React, { useEffect } from 'react';
import * as Sentry from '@sentry/nextjs';

// Catches errors thrown in the root layout itself. Must render <html>/<body>.
export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    Sentry.captureException(error);
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body style={{ fontFamily: 'system-ui, sans-serif', display: 'flex', minHeight: '100vh', alignItems: 'center', justifyContent: 'center', margin: 0, background: '#f8fafc' }}>
        <div style={{ textAlign: 'center', padding: '2rem', maxWidth: 480 }}>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.5rem' }}>
            Something went wrong
          </h1>
          <p style={{ color: '#475569', marginBottom: '1.5rem' }}>
            A critical error occurred. Please reload the page.
          </p>
          <button
            onClick={reset}
            style={{ background: '#16a34a', color: '#fff', border: 0, padding: '0.625rem 1.25rem', borderRadius: 8, fontWeight: 600, cursor: 'pointer' }}
          >
            Reload
          </button>
        </div>
      </body>
    </html>
  );
}
