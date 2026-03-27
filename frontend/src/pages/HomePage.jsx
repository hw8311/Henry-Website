import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, FileArrowDown } from '@phosphor-icons/react';
import { Link } from 'react-router-dom';
import NeuralBackground from '../components/NeuralBackground';
import BlueprintGrid from '../components/BlueprintGrid';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../data/translations';

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
        className="relative min-h-screen flex items-center overflow-hidden bg-navy"
      >
        {/* Neural Network Background */}
        <NeuralBackground opacity={0.2} particleCount={50} />
        
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-navy via-transparent to-navy pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-navy to-transparent pointer-events-none" />
        
        {/* Subtle violet gradient accent */}
        <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-violet/5 rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute bottom-1/3 left-0 w-[400px] h-[400px] bg-gold/3 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 py-24 md:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
            {/* Text Content */}
            <div className="lg:col-span-7 order-2 lg:order-1">
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

            {/* Hero Image */}
            <motion.div 
              className="lg:col-span-5 order-1 lg:order-2"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
            >
              <motion.div 
                className="relative group"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.6 }}
              >
                {/* Border frames with new accent */}
                <motion.div 
                  className="absolute -inset-4 border border-white/[0.06]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                />
                
                <div className="relative aspect-[4/5] overflow-hidden bg-navy-light">
                  <div 
                    className="absolute inset-0 scale-110"
                    style={{
                      backgroundImage: 'url(https://customer-assets.emergentagent.com/job_ai-systems-henry/artifacts/4tf3zkmz_file_000000005b706246860393db18f7484a~7.png)',
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      filter: 'blur(20px) brightness(0.3)',
                    }}
                  />
                  <motion.img
                    src="https://customer-assets.emergentagent.com/job_ai-systems-henry/artifacts/4tf3zkmz_file_000000005b706246860393db18f7484a~7.png"
                    alt={language === 'de' ? 'Henry Wilke - AI-Systemarchitekt' : 'Henry Wilke - AI System Architect'}
                    className="relative w-full h-full object-cover object-center"
                    whileHover={{ scale: 1.03 }}
                    transition={{ duration: 0.8 }}
                  />
                  {/* Gradient overlay with cyan/violet tint */}
                  <div className="absolute inset-0 bg-gradient-to-br from-navy/30 via-transparent to-violet/10 mix-blend-overlay" />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy via-transparent to-transparent opacity-70" />
                </div>
                
                {/* Corner accents */}
                <motion.div className="absolute -top-2 -left-2 w-8 h-8 border-t-2 border-l-2 border-gold" />
                <motion.div className="absolute -bottom-2 -right-2 w-8 h-8 border-b-2 border-r-2 border-gold" />
              </motion.div>
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
      <section className="relative py-32 md:py-40 bg-navy-light overflow-hidden">
        <BlueprintGrid opacity={0.015} />
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16">
            <motion.div 
              className="md:col-span-4"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="label-mono text-gold block mb-4">
                {t.positioning.label[language]}
              </span>
              <h2 className="heading-display text-3xl md:text-4xl lg:text-5xl text-offwhite whitespace-pre-line">
                {t.positioning.title[language]}
              </h2>
            </motion.div>

            <motion.div 
              className="md:col-span-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="space-y-6">
                <p className="text-lg md:text-xl leading-relaxed text-muted-gray">
                  {t.positioning.text[language]}
                </p>
              </div>

              <motion.div 
                className="mt-12 h-px bg-gradient-to-r from-gold via-violet/50 to-transparent"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.8 }}
                style={{ transformOrigin: 'left' }}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Whitepaper CTA Banner */}
      <section className="relative py-16 bg-navy overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-gold/3 via-transparent to-violet/3" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative p-8 md:p-10 border border-white/[0.08] bg-navy-light/50 backdrop-blur-sm"
          >
            {/* Corner decorations */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-gold" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-violet" />
            
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
