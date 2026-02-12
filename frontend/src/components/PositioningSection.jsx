import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import content from '../data/content.json';
import BlueprintGrid from './BlueprintGrid';

export const PositioningSection = () => {
  const { positioning } = content;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section 
      id="positionierung"
      data-testid="positioning-section"
      className="relative py-32 md:py-40 bg-navy-light overflow-hidden"
      ref={ref}
    >
      <BlueprintGrid opacity={0.015} />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16">
          {/* Left Column - Label */}
          <motion.div 
            className="md:col-span-4"
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <span 
              className="label-mono text-gold block mb-4"
              data-testid="positioning-overline"
            >
              {positioning.overline}
            </span>
            <h2 
              className="heading-display text-3xl md:text-4xl lg:text-5xl text-offwhite"
              data-testid="positioning-headline"
            >
              {positioning.headline}
            </h2>
          </motion.div>

          {/* Right Column - Content */}
          <motion.div 
            className="md:col-span-8"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="space-y-6" data-testid="positioning-content">
              {positioning.content.map((paragraph, index) => (
                <motion.p
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                  className={`text-lg md:text-xl leading-relaxed ${
                    index === positioning.content.length - 1 
                      ? 'text-offwhite' 
                      : 'text-muted-gray'
                  }`}
                >
                  {paragraph}
                </motion.p>
              ))}
            </div>

            {/* Decorative Line */}
            <motion.div 
              className="mt-12 h-px bg-gradient-to-r from-gold via-gold/50 to-transparent"
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 1, delay: 0.8 }}
              style={{ transformOrigin: 'left' }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PositioningSection;
