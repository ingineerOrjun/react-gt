// Server-side Cloudflare Turnstile verification. SERVER-ONLY (uses the secret
// key). Graceful: if TURNSTILE_SECRET_KEY isn't set the check is skipped so the
// form still works in dev / before the keys are provisioned — exactly like the
// Supabase and rate-limit degradations elsewhere in the app.
import 'server-only';

const SECRET = process.env.TURNSTILE_SECRET_KEY;
const VERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';

export const hasTurnstileEnv = Boolean(SECRET);

interface SiteverifyResponse {
  success: boolean;
  'error-codes'?: string[];
}

/**
 * Verifies a Turnstile token with Cloudflare. Returns true when the visitor
 * passed the challenge. When the secret isn't configured, returns true (feature
 * inert). When configured, a missing/invalid token returns false.
 */
export async function verifyTurnstile(
  token: string | undefined | null,
  ip?: string
): Promise<boolean> {
  if (!hasTurnstileEnv) return true; // not configured -> skip
  if (!token) return false;

  try {
    const body = new URLSearchParams();
    body.set('secret', SECRET!);
    body.set('response', token);
    if (ip) body.set('remoteip', ip);

    const res = await fetch(VERIFY_URL, {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      body,
      // Never cache a verification.
      cache: 'no-store',
    });
    if (!res.ok) return false;

    const data = (await res.json()) as SiteverifyResponse;
    return data.success === true;
  } catch {
    // Network failure verifying the token — fail closed.
    return false;
  }
}
