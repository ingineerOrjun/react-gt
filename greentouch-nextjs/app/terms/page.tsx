import React from 'react';
import type { Metadata } from 'next';
import LegalPage from '../components/LegalPage';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'The terms governing your use of the GreenTouch Chemicals Pvt. Ltd. website.',
};

export default function TermsOfServicePage() {
  return (
    <LegalPage
      title="Terms of Service"
      lastUpdated="June 2026"
      intro="By accessing and using this website, you agree to the following terms. Please read them carefully."
      sections={[
        {
          heading: 'Use of the Website',
          body: [
            'You may use this website for lawful purposes only. You agree not to misuse the site or interfere with its normal operation.',
          ],
        },
        {
          heading: 'Intellectual Property',
          body: [
            'All content on this website — including text, graphics, logos, and images — is the property of GreenTouch Chemicals Pvt. Ltd. and is protected by applicable intellectual property laws.',
          ],
        },
        {
          heading: 'Product Information',
          body: [
            'We strive to keep product information accurate and up to date. However, we do not warrant that all content is complete or error-free, and specifications may change without notice.',
          ],
        },
        {
          heading: 'Limitation of Liability',
          body: [
            'GreenTouch Chemicals Pvt. Ltd. shall not be liable for any indirect or consequential damages arising from your use of this website.',
          ],
        },
      ]}
    />
  );
}
