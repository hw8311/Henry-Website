import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import content from '../data/content.json';
import BlueprintGrid from './BlueprintGrid';

export const StanceSection = () => {
  const { stance } = content;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section 
      id="haltung"
      data-testid="stance-section"
      className="relative py-32 md:py-48 bg-navy-light overflow-hidden"
      ref={ref}
    >
      <BlueprintGrid opacity={0.015} />
      
      {/* Large Quote */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1 }}
        >
          {/* Opening Quote Mark */}
          <motion.span 
            className="block font-display text-6xl md:text-8xl text-gold/20 mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            "
          </motion.span>

          {/* Quote Text */}
          <h2 
            className="heading-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-offwhite mb-4"
            data-testid="stance-quote"
          >
            {stance.quote}
          </h2>
          <h2 
            className="heading-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl gold-text"
            data-testid="stance-emphasis"
          >
            {stance.emphasis}
          </h2>

          {/* Closing Quote Mark */}
          <motion.span 
            className="block font-display text-6xl md:text-8xl text-gold/20 mt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            "
          </motion.span>
        </motion.div>

        {/* Decorative Lines */}
        <motion.div 
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] pointer-events-none"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <div className="absolute top-0 left-1/4 w-px h-16 bg-gradient-to-b from-gold/30 to-transparent" />
          <div className="absolute bottom-0 right-1/4 w-px h-16 bg-gradient-to-t from-gold/30 to-transparent" />
          <div className="absolute left-0 top-1/3 w-16 h-px bg-gradient-to-r from-gold/30 to-transparent" />
          <div className="absolute right-0 bottom-1/3 w-16 h-px bg-gradient-to-l from-gold/30 to-transparent" />
        </motion.div>
      </div>
    </section>
  );
};

export default StanceSection;
