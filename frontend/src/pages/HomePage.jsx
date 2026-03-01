import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown } from '@phosphor-icons/react';
import { Link } from 'react-router-dom';
import BlueprintGrid from '../components/BlueprintGrid';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../data/translations';

const HomePage = () => {
  const { language } = useLanguage();
  const t = translations;

  return (
    <>
      {/* Hero Section */}
      <section 
        data-testid="hero-section"
        className="relative min-h-screen flex items-center overflow-hidden bg-navy"
      >
        <BlueprintGrid opacity={0.02} />
        <div className="absolute inset-0 bg-gradient-to-b from-navy via-navy/90 to-navy pointer-events-none" />
        
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

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="heading-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-offwhite mb-8"
              >
                {t.hero.title[language]}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="text-base md:text-xl text-muted-gray max-w-xl mb-10 md:mb-12 leading-relaxed px-1"
              >
                {t.hero.subtitle[language]}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
                className="flex flex-col sm:flex-row gap-4 sm:gap-5"
              >
                <Link to="/kontakt" className="btn-primary text-center" data-testid="hero-cta-primary">
                  {hero.cta_primary}
                </Link>
                <Link to="/leistungen" className="btn-secondary text-center" data-testid="hero-cta-secondary">
                  {hero.cta_secondary}
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
                <motion.div 
                  className="absolute -inset-4 border border-blueprint"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.5 }}
                  whileHover={{ opacity: 0.8, borderColor: 'rgba(212, 175, 55, 0.3)' }}
                  transition={{ duration: 0.5 }}
                />
                <motion.div 
                  className="absolute -inset-8 border border-blueprint"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.25 }}
                  whileHover={{ opacity: 0.5 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                />
                
                <div className="relative aspect-[4/5] overflow-hidden bg-navy-light">
                  <div 
                    className="absolute inset-0 scale-110"
                    style={{
                      backgroundImage: `url(${hero.image})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      filter: 'blur(20px) brightness(0.4)',
                    }}
                  />
                  <motion.img
                    src={hero.image}
                    alt="Henry Wilke - AI-Systemarchitekt"
                    className="relative w-full h-full object-cover object-center"
                    whileHover={{ scale: 1.03 }}
                    transition={{ duration: 0.8 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-navy/20 via-transparent to-gold/5 mix-blend-overlay" />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy via-transparent to-transparent opacity-70" />
                  <motion.div className="absolute inset-0 bg-gold/0 group-hover:bg-gold/5 transition-colors duration-700" />
                </div>
                
                <motion.div className="absolute -top-2 -left-2 w-8 h-8 border-t-2 border-l-2 border-gold" />
                <motion.div className="absolute -bottom-2 -right-2 w-8 h-8 border-b-2 border-r-2 border-gold" />
              </motion.div>
            </motion.div>
          </div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="text-muted-gray"
            >
              <ArrowDown size={32} weight="light" />
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
                {positioning.overline}
              </span>
              <h2 className="heading-display text-3xl md:text-4xl lg:text-5xl text-offwhite">
                {positioning.headline}
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
                {positioning.content.map((paragraph, index) => (
                  <p
                    key={index}
                    className={`text-lg md:text-xl leading-relaxed ${
                      index === positioning.content.length - 1 
                        ? 'text-offwhite' 
                        : 'text-muted-gray'
                    }`}
                  >
                    {paragraph}
                  </p>
                ))}
              </div>

              <motion.div 
                className="mt-12 h-px bg-gradient-to-r from-gold via-gold/50 to-transparent"
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
    </>
  );
};

export default HomePage;
