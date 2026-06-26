'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import Script from 'next/script';
import {
  CheckCircle2,
  Loader2,
  User,
  Mail,
  Phone,
  Building2,
  Tag,
  MessageSquare,
  Clock,
  ShieldCheck,
  type LucideIcon,
} from 'lucide-react';
import { submitContact } from '../lib/actions/contact';
import { isValidEmail } from '../lib/utils';
import { VALIDATION_MESSAGES } from '../lib/constants';

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

const subjects = [
  'General Inquiry',
  'Product Information',
  'Partnership Opportunity',
  'Career Information',
  'Technical Support',
  'Other',
];

// ── Floating-label text field (presentational) ──────────────────────────────
// Pure CSS float via `peer` + `placeholder-shown`; icon + label animate on
// focus. Logic stays in the parent — this only renders.
interface FieldProps {
  id: string;
  name: string;
  label: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  icon: LucideIcon;
  error?: string;
  required?: boolean;
  autoComplete?: string;
  inputMode?: React.HTMLAttributes<HTMLInputElement>['inputMode'];
}

function FloatingField({
  id,
  name,
  label,
  type = 'text',
  value,
  onChange,
  icon: Icon,
  error,
  required,
  autoComplete,
  inputMode,
}: FieldProps) {
  return (
    <div>
      <div className="relative">
        <input
          id={id}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder=" "
          autoComplete={autoComplete}
          inputMode={inputMode}
          aria-required={required || undefined}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          className={`peer block w-full rounded-xl border bg-white/80 px-11 pb-2 pt-5 text-gray-900 shadow-sm outline-none transition-all duration-200 placeholder-transparent focus:ring-2 focus:ring-accent/70 dark:bg-slate-900/60 dark:text-slate-100 ${
            error
              ? 'border-red-400 focus:border-red-500 dark:border-red-500/70'
              : 'border-gray-300 focus:border-green-500 dark:border-slate-700'
          }`}
        />
        <Icon
          aria-hidden="true"
          className={`pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 transition-colors ${
            error ? 'text-red-400' : 'text-slate-400 peer-focus:text-green-500'
          }`}
        />
        <label
          htmlFor={id}
          className="pointer-events-none absolute left-11 top-1/2 -translate-y-1/2 text-slate-500 transition-all duration-200 peer-focus:top-2.5 peer-focus:translate-y-0 peer-focus:text-xs peer-focus:font-medium peer-focus:text-green-600 peer-[:not(:placeholder-shown)]:top-2.5 peer-[:not(:placeholder-shown)]:translate-y-0 peer-[:not(:placeholder-shown)]:text-xs dark:text-slate-400 dark:peer-focus:text-green-400"
        >
          {label}
          {required && <span className="text-red-500"> *</span>}
        </label>
      </div>
      {error && (
        <p id={`${id}-error`} className="ml-1 mt-1.5 animate-shake text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: '',
    website: '', // honeypot — must stay empty
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  // Cloudflare Turnstile. Only active when a site key is configured; otherwise
  // the widget is omitted and the token gate is skipped (graceful degradation).
  const [turnstileToken, setTurnstileToken] = useState('');
  const turnstileRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);

  const renderTurnstile = useCallback(() => {
    if (!TURNSTILE_SITE_KEY || !turnstileRef.current || !window.turnstile) return;
    if (widgetIdRef.current !== null) return; // already rendered
    widgetIdRef.current = window.turnstile.render(turnstileRef.current, {
      sitekey: TURNSTILE_SITE_KEY,
      action: 'contact',
      theme: 'auto',
      callback: (token: string) => setTurnstileToken(token),
      'expired-callback': () => setTurnstileToken(''),
      'error-callback': () => setTurnstileToken(''),
    });
  }, []);

  // If the script was already loaded (e.g. client-side navigation back to the
  // page), render immediately rather than waiting for the onLoad event.
  useEffect(() => {
    if (TURNSTILE_SITE_KEY && window.turnstile) renderTurnstile();
  }, [renderTurnstile]);

  const resetTurnstile = useCallback(() => {
    if (widgetIdRef.current !== null && window.turnstile) {
      window.turnstile.reset(widgetIdRef.current);
    }
    setTurnstileToken('');
  }, []);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = VALIDATION_MESSAGES.required;
    if (!formData.email.trim()) {
      newErrors.email = VALIDATION_MESSAGES.required;
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = VALIDATION_MESSAGES.email;
    }
    if (!formData.subject.trim()) newErrors.subject = VALIDATION_MESSAGES.required;
    if (!formData.message.trim()) {
      newErrors.message = VALIDATION_MESSAGES.required;
    } else if (formData.message.length < 10) {
      newErrors.message = VALIDATION_MESSAGES.minLength(10);
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        if (value.trim()) {
          if (name === 'email' && !isValidEmail(value)) {
            newErrors[name] = VALIDATION_MESSAGES.email;
          } else if (name === 'message' && value.length < 10) {
            newErrors[name] = VALIDATION_MESSAGES.minLength(10);
          } else {
            delete newErrors[name];
          }
        } else {
          newErrors[name] = VALIDATION_MESSAGES.required;
        }
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    // Gate on the Turnstile token only when the widget is active.
    if (TURNSTILE_SITE_KEY && !turnstileToken) {
      setSubmitError('Please complete the security check below before sending.');
      return;
    }

    setIsSubmitting(true);
    setSubmitError('');

    try {
      const response = await submitContact({ ...formData, turnstileToken });
      if (response.success) {
        setSubmitSuccess(true);
        setFormData({ name: '', email: '', phone: '', company: '', subject: '', message: '', website: '' });
      } else {
        setSubmitError(response.message || 'Failed to submit the form. Please try again later.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitError('An unexpected error occurred. Please try again later.');
    } finally {
      // A token is single-use; reset the widget so a retry gets a fresh one.
      resetTurnstile();
      setIsSubmitting(false);
    }
  };

  if (submitSuccess) {
    return (
      <div className="animate-fade-in rounded-2xl border border-green-200 bg-gradient-to-b from-green-50 to-white p-8 text-center dark:border-green-800 dark:from-green-900/30 dark:to-slate-900">
        <span className="mx-auto mb-4 inline-flex animate-pop-in rounded-full bg-green-100 p-3 dark:bg-green-900/50">
          <CheckCircle2 className="h-10 w-10 text-green-600 dark:text-green-400" />
        </span>
        <h3 className="mb-2 text-xl font-semibold text-green-800 dark:text-green-300">Thank You!</h3>
        <p className="mb-1 text-green-700 dark:text-green-200">
          Your message has been sent successfully.
        </p>
        <p className="mb-5 text-sm text-green-700/80 dark:text-green-200/80">
          We typically respond within 24 hours on business days.
        </p>
        <button
          onClick={() => setSubmitSuccess(false)}
          className="rounded-lg bg-green-600 px-5 py-2.5 font-medium text-white transition-colors hover:bg-green-700"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      {TURNSTILE_SITE_KEY && (
        <Script
          src="https://challenges.cloudflare.com/turnstile/v0/api.js"
          strategy="afterInteractive"
          onLoad={renderTurnstile}
        />
      )}

      {/* Honeypot: hidden from users, bots tend to fill it. */}
      <div className="absolute left-[-9999px]" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input
          type="text"
          id="website"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={formData.website}
          onChange={handleChange}
        />
      </div>

      {/* Response-time reassurance */}
      <div className="flex items-center gap-2 rounded-lg bg-green-50 px-3.5 py-2.5 text-sm font-medium text-green-700 dark:bg-green-900/20 dark:text-green-300">
        <Clock className="h-4 w-4 shrink-0" />
        We typically respond within 24 hours.
      </div>

      {submitError && (
        <div
          role="alert"
          className="animate-shake rounded-lg border border-red-200 bg-red-50 p-4 text-red-700 dark:border-red-800 dark:bg-red-900/30 dark:text-red-300"
        >
          {submitError}
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <FloatingField
          id="name"
          name="name"
          label="Name"
          value={formData.name}
          onChange={handleChange}
          icon={User}
          error={errors.name}
          required
          autoComplete="name"
        />
        <FloatingField
          id="email"
          name="email"
          label="Email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          icon={Mail}
          error={errors.email}
          required
          autoComplete="email"
          inputMode="email"
        />
        <FloatingField
          id="phone"
          name="phone"
          label="Phone"
          type="tel"
          value={formData.phone}
          onChange={handleChange}
          icon={Phone}
          autoComplete="tel"
          inputMode="tel"
        />
        <FloatingField
          id="company"
          name="company"
          label="Company"
          value={formData.company}
          onChange={handleChange}
          icon={Building2}
          autoComplete="organization"
        />
      </div>

      {/* Subject (select) — persistent floated label */}
      <div>
        <div className="relative">
          <Tag
            aria-hidden="true"
            className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400 peer-focus:text-green-500"
          />
          <label
            htmlFor="subject"
            className="pointer-events-none absolute left-11 top-2.5 text-xs font-medium text-slate-500 dark:text-slate-400"
          >
            Subject <span className="text-red-500">*</span>
          </label>
          <select
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            aria-required
            aria-invalid={errors.subject ? true : undefined}
            aria-describedby={errors.subject ? 'subject-error' : undefined}
            className={`peer block w-full appearance-none rounded-xl border bg-white/80 px-11 pb-2 pt-6 text-gray-900 shadow-sm outline-none transition-all duration-200 focus:ring-2 focus:ring-accent/70 dark:bg-slate-900/60 dark:text-slate-100 ${
              errors.subject
                ? 'border-red-400 focus:border-red-500 dark:border-red-500/70'
                : 'border-gray-300 focus:border-green-500 dark:border-slate-700'
            }`}
          >
            <option value="">Please select a subject</option>
            {subjects.map((subject) => (
              <option key={subject} value={subject}>
                {subject}
              </option>
            ))}
          </select>
          <svg
            aria-hidden="true"
            className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06.02L10 11.06l3.71-3.83a.75.75 0 111.08 1.04l-4.25 4.39a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        {errors.subject && (
          <p id="subject-error" className="ml-1 mt-1.5 animate-shake text-sm text-red-500">
            {errors.subject}
          </p>
        )}
      </div>

      {/* Message (textarea) — floating label */}
      <div>
        <div className="relative">
          <MessageSquare
            aria-hidden="true"
            className={`pointer-events-none absolute left-3.5 top-4 h-5 w-5 transition-colors ${
              errors.message ? 'text-red-400' : 'text-slate-400 peer-focus:text-green-500'
            }`}
          />
          <textarea
            id="message"
            name="message"
            rows={5}
            value={formData.message}
            onChange={handleChange}
            placeholder=" "
            aria-required
            aria-invalid={errors.message ? true : undefined}
            aria-describedby={errors.message ? 'message-error' : undefined}
            className={`peer block w-full resize-y rounded-xl border bg-white/80 px-11 pb-2 pt-7 text-gray-900 shadow-sm outline-none transition-all duration-200 placeholder-transparent focus:ring-2 focus:ring-accent/70 dark:bg-slate-900/60 dark:text-slate-100 ${
              errors.message
                ? 'border-red-400 focus:border-red-500 dark:border-red-500/70'
                : 'border-gray-300 focus:border-green-500 dark:border-slate-700'
            }`}
          />
          <label
            htmlFor="message"
            className="pointer-events-none absolute left-11 top-4 text-slate-500 transition-all duration-200 peer-focus:top-2.5 peer-focus:text-xs peer-focus:font-medium peer-focus:text-green-600 peer-[:not(:placeholder-shown)]:top-2.5 peer-[:not(:placeholder-shown)]:text-xs dark:text-slate-400 dark:peer-focus:text-green-400"
          >
            Message <span className="text-red-500">*</span>
          </label>
        </div>
        {errors.message && (
          <p id="message-error" className="ml-1 mt-1.5 animate-shake text-sm text-red-500">
            {errors.message}
          </p>
        )}
      </div>

      {TURNSTILE_SITE_KEY && (
        <div>
          {/* Cloudflare renders the challenge widget into this container. */}
          <div ref={turnstileRef} className="cf-turnstile" />
        </div>
      )}

      {/* Reassurance panel */}
      <div className="flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700/60 dark:bg-slate-900/40">
        <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-green-600 dark:text-green-400" />
        <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
          <span className="font-medium text-slate-800 dark:text-slate-100">
            Your information is secure.
          </span>{' '}
          No spam, and no unnecessary follow-ups — we only use your details to respond to your
          inquiry.
        </p>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className={`group relative w-full overflow-hidden rounded-xl bg-green-600 px-4 py-3.5 font-semibold text-white shadow-md transition-all duration-300 hover:bg-green-700 hover:shadow-lg active:scale-[0.99] ${
          isSubmitting ? 'cursor-not-allowed opacity-70' : ''
        }`}
      >
        {/* Hover sheen sweep (premium shine; reduced-motion neutralizes it). */}
        <span
          aria-hidden="true"
          className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full"
        />
        <span className="relative flex items-center justify-center">
          {isSubmitting ? (
            <>
              <Loader2 className="-ml-1 mr-2 h-5 w-5 animate-spin" />
              Sending...
            </>
          ) : (
            'Send Message'
          )}
        </span>
      </button>

      <p className="text-sm text-gray-500 dark:text-slate-400">
        Fields marked with <span className="text-red-500">*</span> are required.
      </p>
    </form>
  );
};

export default ContactForm;
