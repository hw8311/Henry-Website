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

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {/* For Column */}
          <motion.div
            data-testid="audience-for-section"
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative p-8 md:p-10 bg-navy-light/30 border border-gold/20"
          >
            <h3 className="font-display text-2xl text-offwhite mb-8">
              {audience.for.title}
            </h3>
            <ul className="space-y-4">
              {audience.for.items.map((item, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                  className="flex items-start gap-4"
                >
                  <Check size={20} weight="bold" className="text-gold mt-1 flex-shrink-0" />
                  <span className="text-offwhite">{item}</span>
                </motion.li>
              ))}
            </ul>
            
            {/* Corner Accent */}
            <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-gold" />
          </motion.div>

          {/* Not For Column */}
          <motion.div
            data-testid="audience-not-for-section"
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative p-8 md:p-10 bg-navy-light/30 border border-white/5"
          >
            <h3 className="font-display text-2xl text-muted-gray mb-8">
              {audience.not_for.title}
            </h3>
            <ul className="space-y-4">
              {audience.not_for.items.map((item, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                  className="flex items-start gap-4"
                >
                  <X size={20} weight="bold" className="text-muted-gray/50 mt-1 flex-shrink-0" />
                  <span className="text-muted-gray">{item}</span>
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
