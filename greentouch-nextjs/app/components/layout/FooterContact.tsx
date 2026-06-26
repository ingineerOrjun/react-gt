import { Phone, Mail, MapPin } from 'lucide-react';
import WhatsappIcon from '../products/detail/WhatsappIcon';
import { CONTACT_INFO } from '../../lib/constants';

const whatsappHref = `https://wa.me/977${CONTACT_INFO.phone}?text=${encodeURIComponent(
  'Hello GreenTouch, I would like to inquire about your products.'
)}`;

const ROW =
  'group/row flex items-start gap-3 rounded-lg p-2 -mx-2 text-sm text-slate-400 transition-colors hover:bg-white/5 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 max-lg:min-h-[44px]';
const ICON =
  'mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-500/10 text-green-400 ring-1 ring-green-500/20 transition-colors group-hover/row:bg-green-500/20';

// Contact column — Phone, Email, WhatsApp, Address. Kept EXPANDED on mobile
// (not collapsible) so primary contact is always one tap away.
export default function FooterContact() {
  return (
    <div className="max-lg:border-b max-lg:border-white/10 max-lg:pb-4 max-lg:pt-3">
      <h3 className="text-sm font-semibold uppercase tracking-wider text-white">Contact</h3>
      <span
        aria-hidden="true"
        className="mt-2 hidden h-0.5 w-8 rounded bg-gradient-to-r from-green-400 to-emerald-500 lg:block"
      />
      <ul className="mt-3 space-y-1 lg:mt-5">
        <li>
          <a href={`tel:${CONTACT_INFO.phone}`} className={ROW} aria-label={`Call ${CONTACT_INFO.phone}`}>
            <span className={ICON}>
              <Phone className="h-4 w-4" />
            </span>
            <span className="pt-1.5">{CONTACT_INFO.phone}</span>
          </a>
        </li>
        <li>
          <a href={`mailto:${CONTACT_INFO.email}`} className={ROW}>
            <span className={ICON}>
              <Mail className="h-4 w-4" />
            </span>
            <span className="break-all pt-1.5">{CONTACT_INFO.email}</span>
          </a>
        </li>
        <li>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className={ROW}
            aria-label="Chat with us on WhatsApp"
          >
            <span className={ICON}>
              <WhatsappIcon className="h-4 w-4" />
            </span>
            <span className="pt-1.5">WhatsApp Chat</span>
          </a>
        </li>
        <li>
          <div className="flex items-start gap-3 p-2 -mx-2 text-sm text-slate-400">
            <span className={ICON}>
              <MapPin className="h-4 w-4" />
            </span>
            <span className="pt-1.5">{CONTACT_INFO.address}</span>
          </div>
        </li>
      </ul>
    </div>
  );
}
