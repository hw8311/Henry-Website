import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Blueprint, Brain, ChartLine, TreeStructure } from '@phosphor-icons/react';
import content from '../data/content.json';

const icons = [Blueprint, Brain, ChartLine, TreeStructure];

export const DifferenceSection = () => {
  const { difference } = content;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section 
      id="unterschied"
      data-testid="difference-section"
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
            data-testid="difference-overline"
          >
            {difference.overline}
          </span>
          <h2 
            className="heading-display text-3xl md:text-4xl lg:text-5xl text-offwhite"
            data-testid="difference-headline"
          >
            {difference.headline}
          </h2>
        </motion.div>

        {/* Cards Grid */}
        <div 
          className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8"
          data-testid="difference-cards-grid"
        >
          {difference.cards.map((card, index) => {
            const Icon = icons[index];
            return (
              <motion.div
                key={index}
                data-testid={`difference-card-${index}`}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.15 }}
                className="group relative bg-navy-light/50 backdrop-blur-sm border border-white/5 p-8 md:p-10 card-hover"
              >
                {/* Blueprint Corner */}
                <div className="absolute top-0 right-0 w-20 h-20 border-t border-r border-blueprint opacity-30 group-hover:opacity-60 transition-opacity" />
                
                {/* Icon */}
                <div className="mb-6">
                  <Icon 
                    size={40} 
                    weight="thin" 
                    className="text-gold opacity-80 group-hover:opacity-100 transition-opacity"
                  />
                </div>

                {/* Title */}
                <h3 className="font-display text-xl md:text-2xl text-offwhite mb-4">
                  {card.title}
                </h3>

                {/* Description */}
                <p className="text-muted-gray leading-relaxed">
                  {card.description}
                </p>

                {/* Bottom Accent */}
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gold group-hover:w-full transition-all duration-500" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default DifferenceSection;
