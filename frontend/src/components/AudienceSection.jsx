import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Check, X } from '@phosphor-icons/react';
import content from '../data/content.json';

export const AudienceSection = () => {
  const { audience } = content;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section 
      id="zielgruppe"
      data-testid="audience-section"
      className="relative py-32 md:py-40 bg-navy overflow-hidden"
      ref={ref}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span 
            className="label-mono text-gold block mb-4"
            data-testid="audience-overline"
          >
            {audience.overline}
          </span>
          <h2 
            className="heading-display text-3xl md:text-4xl lg:text-5xl text-offwhite"
            data-testid="audience-headline"
          >
            {audience.headline}
          </h2>
        </motion.div>

        {/* Two Column Layout - Asymmetric Focus */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10">
          {/* For Column - Larger, Primary Focus */}
          <motion.div
            data-testid="audience-for-section"
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="md:col-span-7 relative p-8 md:p-12 bg-navy-light/40 border border-gold/30 hover:border-gold/50 transition-colors duration-500"
          >
            <h3 className="font-display text-2xl md:text-3xl text-offwhite mb-10">
              {audience.for.title}
            </h3>
            <ul className="space-y-5">
              {audience.for.items.map((item, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                  className="flex items-start gap-4 group"
                >
                  <div className="w-6 h-6 flex items-center justify-center bg-gold/10 group-hover:bg-gold/20 transition-colors duration-300 flex-shrink-0 mt-0.5">
                    <Check size={16} weight="bold" className="text-gold" />
                  </div>
                  <span className="text-offwhite text-lg">{item}</span>
                </motion.li>
              ))}
            </ul>
            
            {/* Corner Accents */}
            <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-gold" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-gold/30" />
          </motion.div>

          {/* Not For Column - Smaller, Subdued */}
          <motion.div
            data-testid="audience-not-for-section"
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="md:col-span-5 relative p-6 md:p-8 bg-navy-light/20 border border-white/5 opacity-80 hover:opacity-100 transition-opacity duration-500"
          >
            <h3 className="font-display text-xl text-muted-gray/80 mb-6">
              {audience.not_for.title}
            </h3>
            <ul className="space-y-3">
              {audience.not_for.items.map((item, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <X size={16} weight="light" className="text-muted-gray/40 mt-1 flex-shrink-0" />
                  <span className="text-muted-gray/70 text-sm">{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AudienceSection;
