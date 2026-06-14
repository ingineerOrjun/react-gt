import React from 'react';
import type { Metadata } from 'next';
import LegalPage from '../components/LegalPage';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'How GreenTouch Chemicals Pvt. Ltd. collects, uses, and protects your personal information.',
};

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      lastUpdated="June 2026"
      intro="GreenTouch Chemicals Pvt. Ltd. is committed to protecting your privacy. This policy explains what information we collect, how we use it, and the choices you have."
      sections={[
        {
          heading: 'Information We Collect',
          body: [
            'We collect information you voluntarily provide when you contact us, subscribe to our newsletter, or request product information — such as your name, email address, phone number, and message.',
            'We also collect limited technical data automatically, including your browser type and pages visited, to help us improve our website.',
          ],
        },
        {
          heading: 'How We Use Your Information',
          body: [
            'Your information is used to respond to enquiries, provide requested information, send updates you have opted into, and improve our products and services.',
            'We never sell your personal information to third parties.',
          ],
        },
        {
          heading: 'Data Security',
          body: [
            'We implement appropriate technical and organisational measures to safeguard your data against unauthorised access, alteration, or disclosure.',
          ],
        },
        {
          heading: 'Your Rights',
          body: [
            'You may request access to, correction of, or deletion of your personal data at any time by contacting us at greentouchgrouppvtltd.1@gmail.com.',
          ],
        },
      ]}
    />
  );
}
