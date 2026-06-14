'use client';

import React, { useState } from 'react';
import { CheckCircle2, Loader2 } from 'lucide-react';
import { submitContactForm } from '../lib/api/contactService';
import { isValidEmail } from '../lib/utils';
import { VALIDATION_MESSAGES } from '../lib/constants';

const subjects = [
  'General Inquiry',
  'Product Information',
  'Partnership Opportunity',
  'Career Information',
  'Technical Support',
  'Other',
];

const baseField =
  'w-full px-4 py-2.5 border rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

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

    setIsSubmitting(true);
    setSubmitError('');

    try {
      const response = await submitContactForm(formData);
      if (response.success) {
        setSubmitSuccess(true);
        setFormData({ name: '', email: '', phone: '', company: '', subject: '', message: '' });
      } else {
        setSubmitError(response.message || 'Failed to submit the form. Please try again later.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitError('An unexpected error occurred. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const fieldClass = (name: string) =>
    `${baseField} ${errors[name] ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'}`;

  if (submitSuccess) {
    return (
      <div className="bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-xl p-8 text-center">
        <CheckCircle2 className="h-12 w-12 mx-auto text-green-500 mb-3" />
        <h3 className="text-xl font-semibold text-green-800 dark:text-green-300 mb-2">Thank You!</h3>
        <p className="text-green-700 dark:text-green-200 mb-4">
          Your message has been sent successfully. We&apos;ll get back to you as soon as possible.
        </p>
        <button
          onClick={() => setSubmitSuccess(false)}
          className="bg-green-600 text-white px-5 py-2.5 rounded-lg hover:bg-green-700 transition-colors"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {submitError && (
        <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 p-4 rounded-lg">
          {submitError}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-gray-700 dark:text-gray-200 font-medium mb-2">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={fieldClass('name')}
          />
          {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="email" className="block text-gray-700 dark:text-gray-200 font-medium mb-2">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={fieldClass('email')}
          />
          {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
        </div>

        <div>
          <label htmlFor="phone" className="block text-gray-700 dark:text-gray-200 font-medium mb-2">
            Phone
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className={`${baseField} border-gray-300 dark:border-gray-700`}
          />
        </div>

        <div>
          <label htmlFor="company" className="block text-gray-700 dark:text-gray-200 font-medium mb-2">
            Company
          </label>
          <input
            type="text"
            id="company"
            name="company"
            value={formData.company}
            onChange={handleChange}
            className={`${baseField} border-gray-300 dark:border-gray-700`}
          />
        </div>
      </div>

      <div>
        <label htmlFor="subject" className="block text-gray-700 dark:text-gray-200 font-medium mb-2">
          Subject <span className="text-red-500">*</span>
        </label>
        <select
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          className={fieldClass('subject')}
        >
          <option value="">Please select a subject</option>
          {subjects.map((subject) => (
            <option key={subject} value={subject}>
              {subject}
            </option>
          ))}
        </select>
        {errors.subject && <p className="mt-1 text-sm text-red-500">{errors.subject}</p>}
      </div>

      <div>
        <label htmlFor="message" className="block text-gray-700 dark:text-gray-200 font-medium mb-2">
          Message <span className="text-red-500">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          value={formData.message}
          onChange={handleChange}
          className={fieldClass('message')}
        />
        {errors.message && <p className="mt-1 text-sm text-red-500">{errors.message}</p>}
      </div>

      <div>
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-lg transition-colors ${
            isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
          }`}
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center">
              <Loader2 className="animate-spin -ml-1 mr-2 h-5 w-5" />
              Sending...
            </span>
          ) : (
            'Send Message'
          )}
        </button>
      </div>

      <p className="text-gray-500 dark:text-gray-400 text-sm">
        Fields marked with <span className="text-red-500">*</span> are required.
      </p>
    </form>
  );
};

export default ContactForm;
