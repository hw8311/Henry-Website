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
            className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent -translate-y-1/2"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 1.5, delay: 0.5 }}
          />
          
          <div className="grid grid-cols-5 gap-4">
            {workflow.steps.map((step, index) => (
              <motion.div
                key={index}
                data-testid={`workflow-step-${index}`}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.15 }}
                className="relative text-center"
              >
                {/* Node */}
                <div className="relative z-10 mx-auto w-16 h-16 mb-6">
                  <motion.div 
                    className="absolute inset-0 border border-gold/30 rotate-45"
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : {}}
                    transition={{ duration: 0.4, delay: 0.5 + index * 0.15 }}
                  />
                  <div className="absolute inset-2 bg-navy-light flex items-center justify-center">
                    <span className="font-mono text-gold text-sm">
                      {step.number}
                    </span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="font-display text-lg text-offwhite mb-2">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-muted-gray leading-relaxed">
                  {step.description}
                </p>

                {/* Arrow (except last) */}
                {index < workflow.steps.length - 1 && (
                  <motion.div 
                    className="absolute top-8 -right-2 text-gold/50"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.8 + index * 0.15 }}
                  >
                    →
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Workflow Steps - Mobile/Tablet */}
        <div className="lg:hidden" data-testid="workflow-mobile">
          <div className="relative">
            {/* Vertical Line */}
            <motion.div 
              className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-gold/50 via-gold/30 to-transparent"
              initial={{ scaleY: 0 }}
              animate={isInView ? { scaleY: 1 } : {}}
              transition={{ duration: 1.5, delay: 0.3 }}
              style={{ transformOrigin: 'top' }}
            />
            
            <div className="space-y-8">
              {workflow.steps.map((step, index) => (
                <motion.div
                  key={index}
                  data-testid={`workflow-step-mobile-${index}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                  className="relative pl-16"
                >
                  {/* Node */}
                  <div className="absolute left-0 top-0 w-12 h-12 flex items-center justify-center">
                    <div className="w-10 h-10 border border-gold/50 rotate-45 flex items-center justify-center bg-navy-light">
                      <span className="font-mono text-gold text-xs -rotate-45">
                        {step.number}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div>
                    <h3 className="font-display text-xl text-offwhite mb-2">
                      {step.title}
                    </h3>
                    <p className="text-muted-gray leading-relaxed">
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
