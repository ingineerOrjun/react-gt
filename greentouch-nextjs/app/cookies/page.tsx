import React from 'react';
import type { Metadata } from 'next';
import LegalPage from '../components/LegalPage';

export const metadata: Metadata = {
  title: 'Cookie Policy',
  description: 'How GreenTouch Chemicals Pvt. Ltd. uses cookies and similar technologies.',
};

export default function CookiePolicyPage() {
  return (
    <LegalPage
      title="Cookie Policy"
      lastUpdated="June 2026"
      intro="This policy explains how GreenTouch Chemicals Pvt. Ltd. uses cookies and similar technologies to recognise you when you visit our website."
      sections={[
        {
          heading: 'What Are Cookies',
          body: [
            'Cookies are small text files stored on your device that help websites function and remember your preferences.',
          ],
        },
        {
          heading: 'How We Use Cookies',
          body: [
            'We use essential cookies to keep the site running, and optional analytics cookies to understand how visitors use our website so we can improve it.',
          ],
        },
        {
          heading: 'Managing Cookies',
          body: [
            'You can control and delete cookies through your browser settings. Disabling certain cookies may affect the functionality of the website.',
          ],
        },
      ]}
    />
  );
}
