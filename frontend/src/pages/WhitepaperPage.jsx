import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileArrowDown, CheckCircle, Spinner, BookOpen, Gear, ShieldCheck, ChartLineUp, ArrowRight } from '@phosphor-icons/react';
import { useLanguage } from '../context/LanguageContext';

const API_URL = process.env.REACT_APP_BACKEND_URL;

const WhitepaperPage = () => {
  const { language } = useLanguage();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch(`${API_URL}/api/whitepaper/download`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, name, company }),
      });

      if (response.ok) {
        const data = await response.json();
        setDownloadUrl(data.download_url);
        setIsSuccess(true);
        // Auto-trigger download
        window.open(data.download_url, '_blank');
      } else {
        setError(language === 'de' ? 'Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.' : 'An error occurred. Please try again.');
      }
    } catch (err) {
      setError(language === 'de' ? 'Verbindungsfehler. Bitte versuchen Sie es erneut.' : 'Connection error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const chapters = [
    {
      icon: Gear,
      titleDe: 'Das Problem',
      titleEn: 'The Problem',
      descDe: 'Wo Ihr Geld versickert – Identifikation der stillen Killer',
      descEn: 'Where your money is leaking – Identifying the silent killers'
    },
    {
      icon: BookOpen,
      titleDe: 'Die Voraussetzungen',
      titleEn: 'Prerequisites',
      descDe: 'Fundament und Architektur für erfolgreiche Automatisierung',
      descEn: 'Foundation and architecture for successful automation'
    },
    {
      icon: ChartLineUp,
      titleDe: 'Der Wandel',
      titleEn: 'The Transformation',
      descDe: 'Von der Verwaltung zur Steuerung – Ihre neue Rolle',
      descEn: 'From management to control – Your new role'
    },
    {
      icon: ShieldCheck,
      titleDe: 'Rechtliche Sicherheit',
      titleEn: 'Legal Security',
      descDe: 'DSGVO, GoBD & EU AI Act – Compliance garantiert',
      descEn: 'GDPR, GoBD & EU AI Act – Compliance guaranteed'
    }
  ];

  const benefits = language === 'de' ? [
    '20-40% mehr Kapazität durch Automatisierung',
    '99,9% Fehlertoleranz in automatisierten Prozessen',
    '6-12 Monate bis zur Amortisation',
    'ROI von 150% nach einem Jahr'
  ] : [
    '20-40% more capacity through automation',
    '99.9% error tolerance in automated processes',
    '6-12 months to amortization',
    'ROI of 150% after one year'
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="relative py-20 md:py-24 overflow-hidden">
        <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left - Content */}
            <motion.div 
              className="glass-card p-8 md:p-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="label-mono text-gold block mb-4"
              >
                {language === 'de' ? 'Kostenloses Whitepaper' : 'Free Whitepaper'}
              </motion.span>
              
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="heading-display text-3xl md:text-4xl lg:text-5xl text-offwhite mb-6"
              >
                {language === 'de' 
                  ? 'Die Architektur der Effizienz'
                  : 'The Architecture of Efficiency'}
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-xl text-gold mb-6"
              >
                {language === 'de'
                  ? 'Prozessautomatisierung für den deutschen Mittelstand'
                  : 'Process automation for German SMEs'}
              </motion.p>
              
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-muted-gray text-lg leading-relaxed mb-8"
              >
                {language === 'de'
                  ? 'Erfahren Sie, wie Sie operative Ineffizienzen eliminieren, Ihre Skalierbarkeit sichern und durch systemische Intelligenz vom reaktiven Verwalten zum proaktiven Gestalten wechseln.'
                  : 'Learn how to eliminate operational inefficiencies, ensure scalability, and transition from reactive management to proactive design through systemic intelligence.'}
              </motion.p>

              {/* Benefits */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="space-y-3 mb-8"
              >
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle size={20} weight="fill" className="text-gold flex-shrink-0 mt-0.5" />
                    <span className="text-offwhite">{benefit}</span>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right - Download Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="glass-card p-8 md:p-10">

                {!isSuccess ? (
                  <>
                    <div className="flex items-center gap-4 mb-6">
                      <div className="p-3 bg-gold/10">
                        <FileArrowDown size={32} weight="light" className="text-gold" />
                      </div>
                      <div>
                        <h3 className="font-display text-xl text-offwhite">
                          {language === 'de' ? 'Jetzt herunterladen' : 'Download now'}
                        </h3>
                        <p className="text-muted-gray text-sm">PDF, 24 Seiten</p>
                      </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div>
                        <label htmlFor="email" className="block label-mono text-muted-gray mb-2">
                          {language === 'de' ? 'E-Mail-Adresse *' : 'Email Address *'}
                        </label>
                        <input
                          type="email"
                          id="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 text-offwhite placeholder:text-muted-gray/50 focus:outline-none focus:border-gold/50 transition-colors rounded-lg"
                          placeholder={language === 'de' ? 'ihre@email.de' : 'your@email.com'}
                        />
                      </div>

                      <div>
                        <label htmlFor="name" className="block label-mono text-muted-gray mb-2">
                          {language === 'de' ? 'Name (optional)' : 'Name (optional)'}
                        </label>
                        <input
                          type="text"
                          id="name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 text-offwhite placeholder:text-muted-gray/50 focus:outline-none focus:border-gold/50 transition-colors rounded-lg"
                          placeholder={language === 'de' ? 'Ihr Name' : 'Your name'}
                        />
                      </div>

                      <div>
                        <label htmlFor="company" className="block label-mono text-muted-gray mb-2">
                          {language === 'de' ? 'Unternehmen (optional)' : 'Company (optional)'}
                        </label>
                        <input
                          type="text"
                          id="company"
                          value={company}
                          onChange={(e) => setCompany(e.target.value)}
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 text-offwhite placeholder:text-muted-gray/50 focus:outline-none focus:border-gold/50 transition-colors rounded-lg"
                          placeholder={language === 'de' ? 'Ihr Unternehmen' : 'Your company'}
                        />
                      </div>

                      {error && (
                        <p className="text-red-400 text-sm">{error}</p>
                      )}

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full btn-primary flex items-center justify-center gap-3 disabled:opacity-50"
                      >
                        {isSubmitting ? (
                          <>
                            <Spinner size={20} className="animate-spin" />
                            {language === 'de' ? 'Wird verarbeitet...' : 'Processing...'}
                          </>
                        ) : (
                          <>
                            <FileArrowDown size={20} weight="bold" />
                            {language === 'de' ? 'Whitepaper herunterladen' : 'Download Whitepaper'}
                          </>
                        )}
                      </button>

                      <p className="text-muted-gray/60 text-xs text-center">
                        {language === 'de'
                          ? 'Mit dem Download stimmen Sie unserer Datenschutzerklärung zu.'
                          : 'By downloading, you agree to our privacy policy.'}
                      </p>
                    </form>
                  </>
                ) : (
                  <div className="text-center py-8">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", duration: 0.5 }}
                      className="w-20 h-20 mx-auto mb-6 bg-gold/10 flex items-center justify-center"
                    >
                      <CheckCircle size={48} weight="fill" className="text-gold" />
                    </motion.div>
                    <h3 className="font-display text-2xl text-offwhite mb-3">
                      {language === 'de' ? 'Vielen Dank!' : 'Thank you!'}
                    </h3>
                    <p className="text-muted-gray mb-6">
                      {language === 'de'
                        ? 'Ihr Download sollte automatisch starten.'
                        : 'Your download should start automatically.'}
                    </p>
                    <a
                      href={downloadUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary inline-flex items-center gap-2"
                    >
                      <FileArrowDown size={18} />
                      {language === 'de' ? 'Erneut herunterladen' : 'Download again'}
                    </a>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Chapters Preview */}
      <section className="relative py-12 md:py-16 overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <span className="label-mono text-gold block mb-4">
              {language === 'de' ? 'Inhaltsvorschau' : 'Content Preview'}
            </span>
            <h2 className="heading-display text-3xl md:text-4xl text-offwhite">
              {language === 'de' ? 'Was Sie erwartet' : 'What to expect'}
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {chapters.map((chapter, index) => {
              const Icon = chapter.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="glass-card p-6"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-gold/10 flex-shrink-0 rounded-lg">
                      <Icon size={24} weight="light" className="text-gold" />
                    </div>
                    <div>
                      <h3 className="font-display text-lg text-offwhite mb-2">
                        {language === 'de' ? chapter.titleDe : chapter.titleEn}
                      </h3>
                      <p className="text-muted-gray text-sm">
                        {language === 'de' ? chapter.descDe : chapter.descEn}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-16 md:py-20 overflow-hidden">
        <div className="relative z-10 max-w-3xl mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card p-10 md:p-14 text-center"
          >
            <h2 className="heading-display text-3xl md:text-4xl text-offwhite mb-6">
              {language === 'de'
                ? 'Bereit für die Transformation?'
                : 'Ready for transformation?'}
            </h2>
            <p className="text-muted-gray text-lg mb-10">
              {language === 'de'
                ? 'Lassen Sie uns gemeinsam herausfinden, wie Prozessautomatisierung Ihr Unternehmen voranbringen kann.'
                : 'Let\'s find out together how process automation can move your business forward.'}
            </p>
            <a href="/kontakt" className="btn-primary inline-flex items-center gap-3">
              {language === 'de' ? 'Gespräch vereinbaren' : 'Schedule a conversation'}
              <ArrowRight size={18} weight="bold" />
            </a>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default WhitepaperPage;
