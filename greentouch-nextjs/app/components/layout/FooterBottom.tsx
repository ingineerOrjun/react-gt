import Link from 'next/link';

const LEGAL = [
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms & Conditions', href: '/terms' },
  { label: 'Sitemap', href: '/sitemap.xml' },
];

// Footer bottom bar — copyright + legal links. `year` and `copyright` are passed
// in (copyright is database-driven) so the component stays trivially pure.
export default function FooterBottom({ year, copyright }: { year: number; copyright: string }) {
  return (
    <div className="border-t border-white/10 pt-6 pb-24 lg:pb-6">
      <div className="container flex flex-col items-center justify-between gap-4 text-center md:flex-row md:text-left">
        <p className="text-sm text-slate-400">
          © {year} {copyright}
        </p>
        <nav aria-label="Legal">
          <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {LEGAL.map(({ label, href }) => (
              <li key={label}>
                <Link
                  href={href}
                  className="inline-flex items-center rounded text-sm text-slate-400 transition-colors hover:text-green-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 max-lg:min-h-[44px]"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}
