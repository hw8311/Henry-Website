import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PaperPlaneTilt, CircleNotch, CheckCircle, WarningCircle } from '@phosphor-icons/react';
import axios from 'axios';
import { toast } from 'sonner';
import BlueprintGrid from '../components/BlueprintGrid';
import { useLanguage } from '../context/LanguageContext';
import { trackEvents } from '../utils/analytics';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const KontaktPage = () => {
  const { language } = useLanguage();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      await axios.post(`${API}/contact`, {
        name: formData.name,
        email: formData.email,
        company: formData.company || null,
        message: formData.message
      });

      setSubmitStatus('success');
      toast.success(language === 'de' ? 'Anfrage erfolgreich gesendet!' : 'Request sent successfully!');
      setFormData({ name: '', email: '', company: '', message: '' });
      trackEvents.contactFormSubmit();
    } catch (error) {
      console.error('Contact form error:', error);
      setSubmitStatus('error');
      toast.error(language === 'de' ? 'Fehler beim Senden. Bitte versuchen Sie es erneut.' : 'Error sending. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Hero Banner */}
      <section className="relative py-32 bg-navy overflow-hidden">
        <BlueprintGrid opacity={0.02} />
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="label-mono text-gold block mb-4"
          >
            {language === 'de' ? 'Kontakt' : 'Contact'}
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="heading-display text-4xl md:text-5xl lg:text-6xl text-offwhite mb-6"
          >
            {language === 'de' ? 'Systemgespräch anfragen.' : 'Request a consultation.'}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-muted-gray text-lg max-w-2xl mx-auto"
          >
            {language === 'de'
              ? 'Lassen Sie uns über Ihre Herausforderungen sprechen – und wie durchdachte KI-Architektur sie lösen kann.'
              : 'Let\'s talk about your challenges – and how thoughtful AI architecture can solve them.'}
          </motion.p>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="relative py-24 md:py-32 bg-navy-light overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 md:px-12">
          <motion.form
            data-testid="contact-form"
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative bg-navy/30 border border-white/5 p-8 md:p-12"
          >
            <div className="absolute top-0 right-0 w-24 h-24 border-t border-r border-blueprint opacity-30" />
            <div className="absolute bottom-0 left-0 w-24 h-24 border-b border-l border-blueprint opacity-30" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <label htmlFor="name" className="label-mono text-muted-gray block mb-2">
                  {language === 'de' ? 'Ihr Name' : 'Your Name'} *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  data-testid="contact-input-name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  minLength={2}
                  className="input-minimal"
                  placeholder="Max Mustermann"
                />
              </div>

              <div>
                <label htmlFor="email" className="label-mono text-muted-gray block mb-2">
                  {language === 'de' ? 'E-Mail-Adresse' : 'Email Address'} *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  data-testid="contact-input-email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="input-minimal"
                  placeholder={language === 'de' ? 'max@unternehmen.de' : 'max@company.com'}
                />
              </div>
            </div>

            <div className="mb-8">
              <label htmlFor="company" className="label-mono text-muted-gray block mb-2">
                {language === 'de' ? 'Unternehmen (optional)' : 'Company (optional)'}
              </label>
              <input
                type="text"
                id="company"
                name="company"
                data-testid="contact-input-company"
                value={formData.company}
                onChange={handleChange}
                className="input-minimal"
                placeholder={language === 'de' ? 'Unternehmen GmbH' : 'Company Ltd.'}
              />
            </div>

            <div className="mb-10">
              <label htmlFor="message" className="label-mono text-muted-gray block mb-2">
                {language === 'de' ? 'Beschreiben Sie kurz Ihre Situation' : 'Briefly describe your situation'} *
              </label>
              <textarea
                id="message"
                name="message"
                data-testid="contact-input-message"
                value={formData.message}
                onChange={handleChange}
                required
                minLength={10}
                rows={5}
                className="input-minimal resize-none"
                placeholder={language === 'de'
                  ? 'Beschreiben Sie Ihre Herausforderung und was Sie erreichen möchten...'
                  : 'Describe your challenge and what you want to achieve...'}
              />
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-6">
              <button
                type="submit"
                data-testid="contact-submit-button"
                disabled={isSubmitting}
                className="btn-primary flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto min-h-[56px]"
              >
                {isSubmitting ? (
                  <>
                    <CircleNotch size={18} className="animate-spin" />
                    {language === 'de' ? 'Wird gesendet...' : 'Sending...'}
                  </>
                ) : (
                  <>
                    <PaperPlaneTilt size={18} weight="bold" />
                    {language === 'de' ? 'Anfrage senden' : 'Send request'}
                  </>
                )}
              </button>

              {submitStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-2 text-green-400"
                >
                  <CheckCircle size={20} weight="fill" />
                  <span className="text-sm">{language === 'de' ? 'Erfolgreich gesendet!' : 'Successfully sent!'}</span>
                </motion.div>
              )}
              {submitStatus === 'error' && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-2 text-red-400"
                >
                  <WarningCircle size={20} weight="fill" />
                  <span className="text-sm">{language === 'de' ? 'Fehler beim Senden' : 'Error sending'}</span>
                </motion.div>
              )}
            </div>
          </motion.form>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-12 text-center"
          >
            <p className="text-muted-gray">
              {language === 'de' ? 'Oder direkt per E-Mail: ' : 'Or directly via email: '}
              <a href="mailto:henry-triangle@outlook.com" className="text-gold hover:text-gold-light transition-colors">henry-triangle@outlook.com</a>
            </p>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default KontaktPage;
