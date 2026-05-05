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
