import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import content from '../data/content.json';
import BlueprintGrid from './BlueprintGrid';

export const WorkflowSection = () => {
  const { workflow } = content;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section 
      id="arbeitsweise"
      data-testid="workflow-section"
      className="relative py-32 md:py-40 bg-navy-light overflow-hidden"
      ref={ref}
    >
      <BlueprintGrid opacity={0.02} />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span 
            className="label-mono text-gold block mb-4"
            data-testid="workflow-overline"
          >
            {workflow.overline}
          </span>
          <h2 
            className="heading-display text-3xl md:text-4xl lg:text-5xl text-offwhite"
            data-testid="workflow-headline"
          >
            {workflow.headline}
          </h2>
        </motion.div>

        {/* Workflow Steps - Desktop */}
        <div className="hidden lg:block relative" data-testid="workflow-desktop">
          {/* Connection Line */}
          <motion.div 
            className="absolute top-12 left-[10%] right-[10%] h-px bg-gradient-to-r from-gold/10 via-gold/40 to-gold/10"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 1.5, delay: 0.5 }}
          />
          
          <div className="grid grid-cols-5 gap-8 lg:gap-12">
            {workflow.steps.map((step, index) => (
              <motion.div
                key={index}
                data-testid={`workflow-step-${index}`}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.15 }}
                className="relative text-center group cursor-pointer"
              >
                {/* Node - Larger with Hover Effect */}
                <motion.div 
                  className="relative z-10 mx-auto w-20 h-20 mb-8"
                  whileHover={{ scale: 1.15 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div 
                    className="absolute inset-0 border-2 border-gold/30 rotate-45 group-hover:border-gold/70 transition-colors duration-300"
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : {}}
                    transition={{ duration: 0.4, delay: 0.5 + index * 0.15 }}
                  />
                  {/* Inner glow on hover */}
                  <div className="absolute inset-0 rotate-45 bg-gold/0 group-hover:bg-gold/10 transition-colors duration-300" />
                  <div className="absolute inset-2 bg-navy-light flex items-center justify-center">
                    <span className="font-mono text-gold text-base group-hover:text-gold-light transition-colors duration-300">
                      {step.number}
                    </span>
                  </div>
                </motion.div>

                {/* Title - Larger */}
                <h3 className="font-display text-xl text-offwhite mb-3 group-hover:text-gold transition-colors duration-300">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-muted-gray leading-relaxed group-hover:text-offwhite/80 transition-colors duration-300 px-2">
                  {step.description}
                </p>

                {/* Animated Arrow (except last) */}
                {index < workflow.steps.length - 1 && (
                  <motion.div 
                    className="absolute top-10 -right-4 lg:-right-6 text-gold/40 text-xl"
                    initial={{ opacity: 0, x: -10 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.8 + index * 0.15 }}
                  >
                    <motion.span
                      animate={{ x: [0, 5, 0] }}
                      transition={{ repeat: Infinity, duration: 2, delay: index * 0.2 }}
                    >
                      →
                    </motion.span>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Workflow Steps - Mobile/Tablet - Improved */}
        <div className="lg:hidden" data-testid="workflow-mobile">
          <div className="relative px-2">
            {/* Vertical Line */}
            <motion.div 
              className="absolute left-7 top-0 bottom-0 w-px bg-gradient-to-b from-gold/50 via-gold/30 to-transparent"
              initial={{ scaleY: 0 }}
              animate={isInView ? { scaleY: 1 } : {}}
              transition={{ duration: 1.5, delay: 0.3 }}
              style={{ transformOrigin: 'top' }}
            />
            
            <div className="space-y-10">
              {workflow.steps.map((step, index) => (
                <motion.div
                  key={index}
                  data-testid={`workflow-step-mobile-${index}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                  className="relative pl-20"
                >
                  {/* Node - Larger on Mobile */}
                  <div className="absolute left-0 top-0 w-14 h-14 flex items-center justify-center">
                    <div className="w-12 h-12 border-2 border-gold/50 rotate-45 flex items-center justify-center bg-navy-light">
                      <span className="font-mono text-gold text-sm -rotate-45 font-medium">
                        {step.number}
                      </span>
                    </div>
                  </div>

                  {/* Content - More Padding */}
                  <div className="pt-1">
                    <h3 className="font-display text-xl text-offwhite mb-3">
                      {step.title}
                    </h3>
                    <p className="text-muted-gray leading-relaxed text-base">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkflowSection;
