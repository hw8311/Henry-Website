import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Blueprint, Brain, ChartLine, TreeStructure } from '@phosphor-icons/react';
import BlueprintGrid from '../components/BlueprintGrid';
import { useLanguage } from '../context/LanguageContext';
import { LineReveal, StaggerContainer, StaggerItem } from '../components/animations/ScrollAnimations';
import TracingBeamCard from '../components/TracingBeamCard';

const icons = [Blueprint, Brain, ChartLine, TreeStructure];

const cards = [
  {
    title: { de: 'Strategische KI-Architektur', en: 'Strategic AI Architecture' },
    description: {
      de: 'Keine isolierten Tools. Durchdachte Systemstrukturen, die alle Komponenten intelligent verbinden und skalierbar orchestrieren.',
      en: 'No isolated tools. Thoughtful system structures that intelligently connect all components and orchestrate them scalably.'
    }
  },
  {
    title: { de: 'Automatisierte Denkprozesse', en: 'Automated Thinking Processes' },
    description: {
      de: 'Regelbasierte Intelligenz, die repetitive Entscheidungen übernimmt. Ihr Team konzentriert sich auf das Wesentliche.',
      en: 'Rule-based intelligence that handles repetitive decisions. Your team focuses on what matters.'
    }
  },
  {
    title: { de: 'Entscheidungsintelligenz', en: 'Decision Intelligence' },
    description: {
      de: 'Datengetriebene Logik, die nicht rät – sondern ableitet. Fundierte Empfehlungen auf Basis realer Muster.',
      en: 'Data-driven logic that doesn\'t guess – it derives. Informed recommendations based on real patterns.'
    }
  },
  {
    title: { de: 'Skalierbare Systemlogik', en: 'Scalable System Logic' },
    description: {
      de: 'Architekturen, die mit Ihrem Unternehmen wachsen. Keine Insellösungen, sondern zukunftsfähige Infrastruktur.',
      en: 'Architectures that grow with your business. No isolated solutions, but future-proof infrastructure.'
    }
  }
];

const steps = [
  { number: '01', title: { de: 'Analyse', en: 'Analysis' }, description: { de: 'Tiefgreifende Systemanalyse Ihrer aktuellen Prozesse und Potenziale.', en: 'In-depth system analysis of your current processes and potential.' } },
  { number: '02', title: { de: 'Systemmodell', en: 'System Model' }, description: { de: 'Konzeption der optimalen KI-Architektur für Ihre spezifischen Anforderungen.', en: 'Designing the optimal AI architecture for your specific requirements.' } },
  { number: '03', title: { de: 'Prototyp', en: 'Prototype' }, description: { de: 'Schnelle Validierung der Kernfunktionen mit messbaren Ergebnissen.', en: 'Rapid validation of core functions with measurable results.' } },
  { number: '04', title: { de: 'Integration', en: 'Integration' }, description: { de: 'Nahtlose Einbindung in bestehende Systeme und Workflows.', en: 'Seamless integration into existing systems and workflows.' } },
  { number: '05', title: { de: 'Skalierung', en: 'Scaling' }, description: { de: 'Systematische Erweiterung und kontinuierliche Optimierung.', en: 'Systematic expansion and continuous optimization.' } }
];

const LeistungenPage = () => {
  const { language } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <>
      {/* Hero Banner */}
      <section className="relative py-32 bg-navy overflow-hidden">
        <BlueprintGrid opacity={0.02} />
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="label-mono text-gold block mb-4"
          >
            {language === 'de' ? 'Leistungen' : 'Services'}
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="heading-display text-4xl md:text-5xl lg:text-6xl text-offwhite"
          >
            {language === 'de' ? 'Was ich anbiete' : 'What I offer'}
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
              {language === 'de' ? 'Der Unterschied' : 'The Difference'}
            </span>
            <h2 className="heading-display text-3xl md:text-4xl lg:text-5xl text-offwhite">
              {language === 'de' ? 'Strategie statt Spielerei.' : 'Strategy, not gimmicks.'}
            </h2>
          </motion.div>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8" stagger={0.15} delay={0.2}>
            {cards.map((card, index) => {
              const Icon = icons[index];
              return (
                <StaggerItem key={index}>
                  <TracingBeamCard className="bg-navy/50 backdrop-blur-sm border border-white/5 card-hover h-full">
                    <div className="p-8 md:p-10 relative">
                      <div className="absolute top-0 right-0 w-20 h-20 border-t border-r border-blueprint opacity-30" />
                      
                      <div className="mb-6">
                        <Icon size={40} weight="thin" className="text-gold opacity-80" />
                      </div>

                      <h3 className="font-display text-xl md:text-2xl text-offwhite mb-4">
                        {card.title[language]}
                      </h3>

                      <p className="text-muted-gray leading-relaxed">
                        {card.description[language]}
                      </p>
                    </div>
                  </TracingBeamCard>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
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
              {language === 'de' ? 'Arbeitsweise' : 'Approach'}
            </span>
            <h2 className="heading-display text-3xl md:text-4xl lg:text-5xl text-offwhite">
              {language === 'de' ? 'Von der Analyse zur Skalierung.' : 'From analysis to scaling.'}
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
              {steps.map((step, index) => (
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
                    {step.title[language]}
                  </h3>

                  <p className="text-sm text-muted-gray leading-relaxed group-hover:text-offwhite/80 transition-colors duration-300 px-2">
                    {step.description[language]}
                  </p>

                  {index < steps.length - 1 && (
                    <motion.div 
                      className="absolute top-10 -right-4 lg:-right-6 text-gold/40 text-xl"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.8 + index * 0.15 }}
                    >
                      <motion.span animate={{ x: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 2, delay: index * 0.2 }}>
                        &rarr;
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
                {steps.map((step, index) => (
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
                      <h3 className="font-display text-xl text-offwhite mb-3">{step.title[language]}</h3>
                      <p className="text-muted-gray leading-relaxed text-base">{step.description[language]}</p>
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
