// Lightweight HTML sanitizer for blog content authored in the admin Tiptap
// editor. The editor only emits a constrained, known-safe subset, and authoring
// is restricted to invited admins — so a dependency-free allowlist pass that
// strips dangerous tags/attributes is sufficient here. If untrusted authors are
// ever introduced, replace this with a vetted library (e.g. sanitize-html).

export function sanitizeHtml(html: string): string {
  if (!html) return '';
  let out = html;

  // Drop dangerous elements entirely (open/close tags + obvious blocks).
  out = out.replace(
    /<\/?(script|style|iframe|object|embed|form|input|link|meta|base)\b[^>]*>/gi,
    ''
  );

  // Strip inline event handlers (onclick, onerror, ...).
  out = out.replace(/\son\w+\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi, '');

  // Neutralize javascript:/data: URLs in href/src.
  out = out.replace(
    /\b(href|src)\s*=\s*("|')\s*(javascript|data|vbscript):[^"']*\2/gi,
    '$1=$2#$2'
  );

  return out.trim();
}
