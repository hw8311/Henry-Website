import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { PaperPlaneTilt, CircleNotch, CheckCircle, WarningCircle } from '@phosphor-icons/react';
import axios from 'axios';
import { toast } from 'sonner';
import content from '../data/content.json';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

export const ContactSection = () => {
  const { contact } = content;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
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
      toast.success('Anfrage erfolgreich gesendet!');
      setFormData({ name: '', email: '', company: '', message: '' });
    } catch (error) {
      console.error('Contact form error:', error);
      setSubmitStatus('error');
      toast.error('Fehler beim Senden. Bitte versuchen Sie es erneut.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section 
      id="kontakt"
      data-testid="contact-section"
      className="relative py-32 md:py-40 bg-navy overflow-hidden"
      ref={ref}
    >
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span 
            className="label-mono text-gold block mb-4"
            data-testid="contact-overline"
          >
            {contact.overline}
          </span>
          <h2 
            className="heading-display text-3xl md:text-4xl lg:text-5xl text-offwhite mb-6"
            data-testid="contact-headline"
          >
            {contact.headline}
          </h2>
          <p className="text-muted-gray text-lg max-w-2xl mx-auto">
            {contact.description}
          </p>
        </motion.div>

        {/* Form */}
        <motion.form
          data-testid="contact-form"
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative bg-navy-light/30 border border-white/5 p-8 md:p-12"
        >
          {/* Blueprint Corner */}
          <div className="absolute top-0 right-0 w-24 h-24 border-t border-r border-blueprint opacity-30" />
          <div className="absolute bottom-0 left-0 w-24 h-24 border-b border-l border-blueprint opacity-30" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {/* Name */}
            <div>
              <label htmlFor="name" className="label-mono text-muted-gray block mb-2">
                {contact.fields.name} *
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

            {/* Email */}
            <div>
              <label htmlFor="email" className="label-mono text-muted-gray block mb-2">
                {contact.fields.email} *
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
                placeholder="max@unternehmen.de"
              />
            </div>
          </div>

          {/* Company */}
          <div className="mb-8">
            <label htmlFor="company" className="label-mono text-muted-gray block mb-2">
              {contact.fields.company}
            </label>
            <input
              type="text"
              id="company"
              name="company"
              data-testid="contact-input-company"
              value={formData.company}
              onChange={handleChange}
              className="input-minimal"
              placeholder="Unternehmen GmbH"
            />
          </div>

          {/* Message */}
          <div className="mb-10">
            <label htmlFor="message" className="label-mono text-muted-gray block mb-2">
              {contact.fields.message} *
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
              placeholder="Beschreiben Sie Ihre Herausforderung und was Sie erreichen möchten..."
            />
          </div>

          {/* Submit Button */}
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <button
              type="submit"
              data-testid="contact-submit-button"
              disabled={isSubmitting}
              className="btn-primary flex items-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <CircleNotch size={18} className="animate-spin" />
                  Wird gesendet...
                </>
              ) : (
                <>
                  <PaperPlaneTilt size={18} weight="bold" />
                  {contact.submit}
                </>
              )}
            </button>

            {/* Status Message */}
            {submitStatus === 'success' && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-2 text-green-400"
                data-testid="contact-success-message"
              >
                <CheckCircle size={20} weight="fill" />
                <span className="text-sm">Erfolgreich gesendet!</span>
              </motion.div>
            )}
            {submitStatus === 'error' && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-2 text-red-400"
                data-testid="contact-error-message"
              >
                <WarningCircle size={20} weight="fill" />
                <span className="text-sm">Fehler beim Senden</span>
              </motion.div>
            )}
          </div>
        </motion.form>
      </div>
    </section>
  );
};

export default ContactSection;
