import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, FileArrowDown } from '@phosphor-icons/react';
import { Link } from 'react-router-dom';
import NeuralBackground from '../components/NeuralBackground';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../data/translations';
import { LineReveal, SweepReveal } from '../components/animations/ScrollAnimations';

// Typing animation component
const TypingText = ({ text, delay = 0, className }) => {
  const [displayed, setDisplayed] = useState('');
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const startTimer = setTimeout(() => setStarted(true), delay * 1000);
    return () => clearTimeout(startTimer);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    setDisplayed('');
    let i = 0;
    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplayed(text.slice(0, i + 1));
        i++;
      } else {
        clearInterval(interval);
      }
    }, 30);
    return () => clearInterval(interval);
  }, [text, started]);

  return (
    <span className={className}>
      {displayed}
      {started && displayed.length < text.length && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ repeat: Infinity, duration: 0.6 }}
          className="inline-block w-[2px] h-[1em] bg-gold ml-0.5 align-middle"
        />
      )}
    </span>
  );
};

const HomePage = () => {
  const { language } = useLanguage();
  const t = translations;

  const heroTitle = language === 'de' ? 'Systeme bauen,' : 'Building systems';
  const heroTitleAccent = language === 'de' ? 'die denken.' : 'that think.';

  return (
    <>
      {/* Hero Section */}
      <section 
        data-testid="hero-section"
        className="relative min-h-screen flex items-center overflow-hidden"
      >
        {/* Chess Portrait Background - 40% opacity, smooth & dezent */}
        <div className="absolute inset-0 pointer-events-none">
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: 'url(https://customer-assets.emergentagent.com/job_ecbd67ad-0a69-4164-b768-2e37571f9a4f/artifacts/kxm166sn_grok_image_1771589320374.jpg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center top',
              opacity: 0.4,
            }}
          />
          {/* Gradient overlays for smooth blending into dark bg */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-black/70" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/50" />
        </div>

        {/* Neural Network Background */}
        <NeuralBackground opacity={0.1} particleCount={50} />
        
        <div className="relative z-10 w-full max-w-5xl mx-auto px-6 md:px-12 py-24 md:py-32">
          <div className="max-w-2xl">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="label-mono text-gold mb-6 block"
            >
              {t.hero.label[language]}
            </motion.span>

            {/* Main title with sequential reveal */}
            <div className="mb-8">
              <motion.h1
                initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="claim-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-offwhite"
              >
                {heroTitle}
              </motion.h1>
              <motion.h1
                initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 0.8, delay: 0.55 }}
                className="claim-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl gold-text neon-glow mt-1"
              >
                {heroTitleAccent}
              </motion.h1>
            </div>

            {/* Typing subtitle */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1 }}
              className="text-base md:text-xl text-muted-gray max-w-xl mb-10 md:mb-12 leading-relaxed px-1 min-h-[3rem]"
            >
              <TypingText 
                text={t.hero.subtitle[language]} 
                delay={1.2}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 2.2 }}
              className="flex flex-col sm:flex-row gap-4 sm:gap-5"
            >
              <Link to="/kontakt" className="btn-primary text-center" data-testid="hero-cta-primary">
                {t.hero.cta[language]}
              </Link>
              <Link to="/leistungen" className="btn-secondary text-center" data-testid="hero-cta-secondary">
                {language === 'de' ? 'Mehr erfahren' : 'Learn more'}
              </Link>
            </motion.div>
          </div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3 }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="text-gold/40"
            >
              <ArrowDown size={28} weight="light" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Positioning Section */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="glass-card p-8 md:p-12"
          >
            <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-14">
              <div className="md:col-span-4">
                <span className="label-mono text-gold block mb-4">
                  {t.positioning.label[language]}
                </span>
                <h2 className="heading-display text-3xl md:text-4xl lg:text-5xl text-offwhite whitespace-pre-line">
                  <LineReveal text={t.positioning.title[language]} delay={0.1} />
                </h2>
              </div>

              <div className="md:col-span-8">
                <SweepReveal delay={0.5}>
                  <p className="text-lg md:text-xl leading-relaxed text-muted-gray">
                    {t.positioning.text[language]}
                  </p>
                </SweepReveal>

                <motion.div 
                  className="mt-10 h-px bg-gradient-to-r from-gold via-violet/50 to-transparent"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.8 }}
                  style={{ transformOrigin: 'left' }}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Kundenstimmen / Testimonials - Google Review Style */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <span className="label-mono text-gold block mb-4">
              {language === 'de' ? 'Kundenstimmen' : 'Client Reviews'}
            </span>
            <h2 className="heading-display text-3xl md:text-4xl text-offwhite">
              {language === 'de' ? 'Was Kunden sagen.' : 'What clients say.'}
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                name: 'Thomas B.',
                text: language === 'de' 
                  ? 'Henry Wilke hat uns in nur 8 Wochen eine KI-gestützte Prozessautomatisierung aufgebaut, die unsere Auftragsabwicklung von 3 Tagen auf unter 4 Stunden reduziert hat. Die ROI-Berechnung hat sich bereits nach 4 Monaten amortisiert. Extrem kompetent, praxisnah und immer auf Augenhöhe mit uns Mittelständlern.'
                  : 'Henry Wilke built us an AI-powered process automation in just 8 weeks that reduced our order processing from 3 days to under 4 hours. The ROI paid off after just 4 months. Extremely competent, practical, and always on eye level with us SMEs.',
              },
              {
                name: 'Anna-Maria S.',
                text: language === 'de'
                  ? 'Dank Henrys KI-Strategie konnten wir unsere Lager- und Versandprozesse intelligent automatisieren. Die Fehlerquote ist um über 85 % gesunken und unsere Mitarbeiter können sich endlich auf wertschöpfende Tätigkeiten konzentrieren. Sehr empfehlenswert für jedes Unternehmen, das skalieren will, ohne blind Personal aufzubauen.'
                  : 'Thanks to Henry\'s AI strategy, we were able to intelligently automate our warehouse and shipping processes. The error rate dropped by over 85% and our employees can finally focus on value-adding activities. Highly recommended for any company that wants to scale without blindly hiring.',
              },
              {
                name: 'Michael H.',
                text: language === 'de'
                  ? 'Henry versteht es meisterhaft, komplexe KI-Möglichkeiten in konkrete, sofort einsetzbare Systemarchitekturen zu übersetzen. Seine Begleitung bei der Implementierung unserer intelligenten Dokumenten- und Kundenanalyse war Gold wert. Professionell, transparent und mit messbaren Ergebnissen.'
                  : 'Henry masterfully understands how to translate complex AI possibilities into concrete, immediately deployable system architectures. His guidance in implementing our intelligent document and customer analysis was worth its weight in gold. Professional, transparent, and with measurable results.',
              },
              {
                name: 'Markus L.',
                text: language === 'de'
                  ? 'Vor der Zusammenarbeit mit Henry Wilke war KI für mich ein Buzzword. Heute läuft bei uns eine automatisierte Preisanpassung, Bedarfsprognose und Angebotserstellung. Umsatzsteigerung von 18 % im ersten Quartal. Henry denkt unternehmerisch und liefert keine Theorie, sondern Ergebnisse.'
                  : 'Before working with Henry Wilke, AI was just a buzzword to me. Today we run automated pricing, demand forecasting, and quote generation. Revenue increase of 18% in the first quarter. Henry thinks entrepreneurially and delivers results, not theory.',
              },
              {
                name: 'Julia von B.',
                text: language === 'de'
                  ? 'Henry hat unsere internen Workflows komplett neu gestaltet. Was früher manuell und zeitintensiv war, läuft jetzt KI-gestützt und skalierbar. Besonders beeindruckend: Seine Fähigkeit, die Lösungen so zu gestalten, dass sie von unserem Team wirklich angenommen werden. Top-Empfehlung!'
                  : 'Henry completely redesigned our internal workflows. What used to be manual and time-intensive now runs AI-powered and scalable. Especially impressive: his ability to design solutions that are truly adopted by our team. Top recommendation!',
              },
            ].map((review, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-lg shadow-black/10 flex flex-col"
                data-testid={`testimonial-${index}`}
              >
                {/* Google-style 5 Stars */}
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                {/* Review Text */}
                <p className="text-gray-700 text-sm leading-relaxed flex-1 mb-4">
                  &ldquo;{review.text}&rdquo;
                </p>

                {/* Reviewer Name */}
                <div className="flex items-center gap-3 pt-3 border-t border-gray-100">
                  <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-600 font-medium text-sm">{review.name.charAt(0)}</span>
                  </div>
                  <span className="text-gray-900 font-medium text-sm">{review.name}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Whitepaper CTA Banner */}
      <section className="relative py-10 overflow-hidden">
        <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="glass-card p-8 md:p-10"
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div className="flex-1">
                <span className="label-mono text-gold block mb-2">
                  {language === 'de' ? 'Kostenloses Whitepaper' : 'Free Whitepaper'}
                </span>
                <h3 className="font-display text-2xl md:text-3xl text-offwhite mb-2">
                  {language === 'de' ? 'Die Architektur der Effizienz' : 'The Architecture of Efficiency'}
                </h3>
                <p className="text-muted-gray">
                  {language === 'de' 
                    ? 'Prozessautomatisierung für den deutschen Mittelstand – 24 Seiten strategisches Know-how.'
                    : 'Process automation for German SMEs – 24 pages of strategic know-how.'}
                </p>
              </div>
              <Link 
                to="/whitepaper" 
                className="btn-primary inline-flex items-center gap-3 flex-shrink-0"
                data-testid="whitepaper-cta"
              >
                <FileArrowDown size={20} weight="bold" />
                {language === 'de' ? 'Jetzt herunterladen' : 'Download now'}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
