import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown } from '@phosphor-icons/react';
import content from '../data/content.json';
import BlueprintGrid from './BlueprintGrid';

export const HeroSection = () => {
  const { hero } = content;

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      data-testid="hero-section"
      className="relative min-h-screen flex items-center overflow-hidden bg-navy"
    >
      <BlueprintGrid opacity={0.02} />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy via-navy/90 to-navy pointer-events-none" />
      
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 py-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Text Content */}
          <div className="lg:col-span-7 order-2 lg:order-1">
            {/* Overline */}
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="label-mono text-gold mb-6 block"
              data-testid="hero-overline"
            >
              {hero.overline}
            </motion.span>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="heading-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-offwhite mb-8"
              data-testid="hero-headline"
            >
              {hero.headline}
            </motion.h1>

            {/* Subline */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-lg md:text-xl text-muted-gray max-w-xl mb-12 leading-relaxed"
              data-testid="hero-subline"
            >
              {hero.subline}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <button
                data-testid="hero-cta-primary"
                onClick={() => scrollToSection('kontakt')}
                className="btn-primary"
              >
                {hero.cta_primary}
              </button>
              <button
                data-testid="hero-cta-secondary"
                onClick={() => scrollToSection('positionierung')}
                className="btn-secondary"
              >
                {hero.cta_secondary}
              </button>
            </motion.div>
          </div>

          {/* Hero Image */}
          <motion.div 
            className="lg:col-span-5 order-1 lg:order-2"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            <div className="relative">
              {/* Blueprint Frame */}
              <div className="absolute -inset-4 border border-blueprint opacity-50" />
              <div className="absolute -inset-8 border border-blueprint opacity-25" />
              
              {/* Image Container */}
              <div 
                data-testid="hero-image-container"
                className="relative aspect-[4/5] overflow-hidden bg-navy-light"
              >
                <img
                  src={hero.image}
                  alt="Henry Wilke - AI-Systemarchitekt"
                  className="w-full h-full object-cover object-center"
                  data-testid="hero-image"
                />
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-navy via-transparent to-transparent opacity-60" />
              </div>
              
              {/* Corner Accents */}
              <div className="absolute -top-2 -left-2 w-8 h-8 border-t-2 border-l-2 border-gold" />
              <div className="absolute -bottom-2 -right-2 w-8 h-8 border-b-2 border-r-2 border-gold" />
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
        >
          <motion.button
            data-testid="scroll-indicator"
            onClick={() => scrollToSection('positionierung')}
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="text-muted-gray hover:text-gold transition-colors cursor-pointer"
          >
            <ArrowDown size={32} weight="light" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
