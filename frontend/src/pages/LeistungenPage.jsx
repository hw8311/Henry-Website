import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Blueprint, Brain, ChartLine, TreeStructure } from '@phosphor-icons/react';
import BlueprintGrid from '../components/BlueprintGrid';
import SEO, { seoData } from '../components/SEO';
import content from '../data/content.json';

const icons = [Blueprint, Brain, ChartLine, TreeStructure];

const LeistungenPage = () => {
  const { difference, workflow } = content;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <>
      <SEO {...seoData.leistungen} />
      {/* Hero Banner */}
      <section className="relative py-32 bg-navy overflow-hidden">
        <BlueprintGrid opacity={0.02} />
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="label-mono text-gold block mb-4"
          >
            Leistungen
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="heading-display text-4xl md:text-5xl lg:text-6xl text-offwhite"
          >
            Was ich anbiete
          </motion.h1>
        </div>
      </section>

      {/* Difference Section */}
      <section className="relative py-24 md:py-32 bg-navy-light overflow-hidden" ref={ref}>
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <span className="label-mono text-gold block mb-4">
              {difference.overline}
            </span>
            <h2 className="heading-display text-3xl md:text-4xl lg:text-5xl text-offwhite">
              {difference.headline}
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {difference.cards.map((card, index) => {
              const Icon = icons[index];
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.15 }}
                  className="group relative bg-navy/50 backdrop-blur-sm border border-white/5 p-8 md:p-10 card-hover"
                >
                  <div className="absolute top-0 right-0 w-20 h-20 border-t border-r border-blueprint opacity-30 group-hover:opacity-60 transition-opacity" />
                  
                  <div className="mb-6">
                    <Icon size={40} weight="thin" className="text-gold opacity-80 group-hover:opacity-100 transition-opacity" />
                  </div>

                  <h3 className="font-display text-xl md:text-2xl text-offwhite mb-4">
                    {card.title}
                  </h3>

                  <p className="text-muted-gray leading-relaxed">
                    {card.description}
                  </p>

                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gold group-hover:w-full transition-all duration-500" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Workflow Section */}
      <section className="relative py-24 md:py-32 bg-navy overflow-hidden">
        <BlueprintGrid opacity={0.02} />
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
          <motion.div 
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="label-mono text-gold block mb-4">
              {workflow.overline}
            </span>
            <h2 className="heading-display text-3xl md:text-4xl lg:text-5xl text-offwhite">
              {workflow.headline}
            </h2>
          </motion.div>

          {/* Desktop Workflow */}
          <div className="hidden lg:block relative">
            <motion.div 
              className="absolute top-12 left-[10%] right-[10%] h-px bg-gradient-to-r from-gold/10 via-gold/40 to-gold/10"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, delay: 0.5 }}
            />
            
            <div className="grid grid-cols-5 gap-8 lg:gap-12">
              {workflow.steps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.15 }}
                  className="relative text-center group cursor-pointer"
                >
                  <motion.div 
                    className="relative z-10 mx-auto w-20 h-20 mb-8"
                    whileHover={{ scale: 1.15 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="absolute inset-0 border-2 border-gold/40 rotate-45 group-hover:border-gold/80 transition-colors duration-300" />
                    <div className="absolute inset-0 rotate-45 bg-gold/0 group-hover:bg-gold/10 transition-colors duration-300" />
                    <div className="absolute inset-2 bg-navy flex items-center justify-center">
                      <span className="font-mono text-gold text-base">{step.number}</span>
                    </div>
                  </motion.div>

                  <h3 className="font-display text-xl text-offwhite mb-3 group-hover:text-gold transition-colors duration-300">
                    {step.title}
                  </h3>

                  <p className="text-sm text-muted-gray leading-relaxed group-hover:text-offwhite/80 transition-colors duration-300 px-2">
                    {step.description}
                  </p>

                  {index < workflow.steps.length - 1 && (
                    <motion.div 
                      className="absolute top-10 -right-4 lg:-right-6 text-gold/40 text-xl"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.8 + index * 0.15 }}
                    >
                      <motion.span animate={{ x: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 2, delay: index * 0.2 }}>
                        →
                      </motion.span>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Mobile Workflow */}
          <div className="lg:hidden px-2">
            <div className="relative">
              <motion.div 
                className="absolute left-7 top-0 bottom-0 w-px bg-gradient-to-b from-gold/50 via-gold/30 to-transparent"
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, delay: 0.3 }}
                style={{ transformOrigin: 'top' }}
              />
              
              <div className="space-y-10">
                {workflow.steps.map((step, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                    className="relative pl-20"
                  >
                    <div className="absolute left-0 top-0 w-14 h-14 flex items-center justify-center">
                      <div className="w-12 h-12 border-2 border-gold/50 rotate-45 flex items-center justify-center bg-navy">
                        <span className="font-mono text-gold text-sm -rotate-45 font-medium">{step.number}</span>
                      </div>
                    </div>

                    <div className="pt-1">
                      <h3 className="font-display text-xl text-offwhite mb-3">{step.title}</h3>
                      <p className="text-muted-gray leading-relaxed text-base">{step.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default LeistungenPage;
