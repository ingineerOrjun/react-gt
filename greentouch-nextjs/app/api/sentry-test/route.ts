import * as Sentry from '@sentry/nextjs';
import { NextResponse } from 'next/server';

// Deliberate error route for validating the Sentry pipeline end-to-end
// (capture -> source-mapped stack -> alert). Not indexed: /api is disallowed in
// robots.ts. Returns 200 with the event id when Sentry is wired, otherwise 503
// so you can tell "not configured" apart from "configured but failing".
//
//   curl https://<host>/api/sentry-test
//
export const dynamic = 'force-dynamic';

export async function GET() {
  if (!process.env.NEXT_PUBLIC_SENTRY_DSN) {
    return NextResponse.json(
      { ok: false, reason: 'NEXT_PUBLIC_SENTRY_DSN is not set; Sentry is inert.' },
      { status: 503 }
    );
  }

  const eventId = Sentry.captureException(
    new Error('GreenTouch Sentry test error — server route /api/sentry-test')
  );
  // Ensure the event is delivered before the serverless function freezes.
  await Sentry.flush(2000);

  return NextResponse.json({ ok: true, eventId, message: 'Test error sent to Sentry.' });
}
