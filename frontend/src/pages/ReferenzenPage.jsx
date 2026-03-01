import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Cpu, ChartLineUp, Lightning, Users, ShieldCheck, Gear, Robot, ArrowRight } from '@phosphor-icons/react';
import { Link } from 'react-router-dom';
import BlueprintGrid from '../components/BlueprintGrid';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../data/translations';

const ReferenzenPage = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { language } = useLanguage();
  const t = translations.portfolio;

  const projects = [
    {
      id: 'taxopti',
      category: t.taxopti.category[language],
      title: 'TaxOpti Pro',
      subtitle: t.taxopti.subtitle[language],
      description: t.taxopti.description[language],
      challenge: t.taxopti.challenge[language],
      solution: t.taxopti.solutionText[language],
      approach: t.taxopti.approachText[language],
      results: t.taxopti.results.map(r => r[language]),
      technologies: ['Vertex AI', 'Document AI', 'Cloud SQL', 'PWA'],
      icon: ChartLineUp,
      highlight: t.taxopti.highlight[language],
      logo: '/assets/taxopti-logo.webp',
      logoAlt: 'TaxOpti Logo'
    },
    {
      id: 'energieunternehmen',
      category: t.energy.category[language],
      title: t.energy.title[language],
      subtitle: t.energy.subtitle[language],
      description: t.energy.description[language],
      challenge: t.energy.challenge[language],
      solution: t.energy.solutionText[language],
      approach: t.energy.approachText[language],
      results: t.energy.results.map(r => r[language]),
      technologies: ['KI-Agenten', 'Chatbot', 'CRM-Integration', 'Workflow-Automation'],
      icon: Lightning,
      highlight: t.energy.highlight[language],
      logo: '/assets/tbs-logo.jpg',
      logoAlt: 'Triangle Business Solution Logo'
    }
  ];

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
            {t.heroLabel[language]}
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="heading-display text-4xl md:text-5xl lg:text-6xl text-offwhite mb-6"
          >
            {t.heroTitle[language]}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-muted-gray text-lg max-w-2xl mx-auto"
          >
            {t.heroSubtitle[language]}
          </motion.p>
        </div>
      </section>

      {/* Projects Section */}
      <section className="relative py-24 md:py-32 bg-navy-light overflow-hidden" ref={ref}>
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="space-y-24 md:space-y-32">
            {projects.map((project, index) => {
              const Icon = project.icon;
              return (
                <motion.article
                  key={project.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  className="relative"
                  aria-labelledby={`project-title-${project.id}`}
                >
                  {/* Project Number */}
                  <div className="absolute -left-4 md:left-0 top-0 font-mono text-8xl md:text-9xl text-white/[0.03] font-bold select-none" aria-hidden="true">
                    0{index + 1}
                  </div>

                  <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
                    {/* Left Column - Overview */}
                    <div className="lg:col-span-5">
                      <div className="sticky top-28">
                        <span className="label-mono text-gold block mb-3">
                          {project.category}
                        </span>
                        
                        {/* Title with Logo */}
                        <div className="flex items-start justify-between gap-4 mb-2">
                          <h2 
                            id={`project-title-${project.id}`}
                            className="heading-display text-3xl md:text-4xl lg:text-5xl text-offwhite"
                          >
                            {project.title}
                          </h2>
                          {/* Logo next to title */}
                          <div className="flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden bg-white/5 border border-white/10 shadow-lg">
                            <img 
                              src={project.logo} 
                              alt={project.logoAlt}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>
                        
                        <p className="text-muted-gray text-lg mb-6">
                          {project.subtitle}
                        </p>

                        {/* Highlight Box */}
                        <div className="relative p-6 bg-navy/60 border-l-2 border-gold mb-8">
                          <div className="flex items-start gap-4">
                            <Icon size={32} weight="light" className="text-gold flex-shrink-0 mt-1" aria-hidden="true" />
                            <div>
                              <span className="label-mono text-gold/80 text-xs block mb-2">Kernfokus</span>
                              <p className="text-offwhite font-display text-lg">
                                {project.highlight}
                              </p>
                            </div>
                          </div>
                        </div>

                        <p className="text-muted-gray leading-relaxed">
                          {project.description}
                        </p>
                      </div>
                    </div>

                    {/* Right Column - Details */}
                    <div className="lg:col-span-7 space-y-10">
                      {/* Challenge */}
                      <div className="relative p-8 bg-navy/40 border border-white/5">
                        <div className="absolute top-0 left-0 w-12 h-12 border-t border-l border-gold/30" aria-hidden="true" />
                        <h3 className="font-display text-xl text-offwhite mb-4 flex items-center gap-3">
                          <Gear size={24} weight="light" className="text-gold" aria-hidden="true" />
                          Herausforderung
                        </h3>
                        <p className="text-muted-gray leading-relaxed">
                          {project.challenge}
                        </p>
                      </div>

                      {/* Solution */}
                      <div className="relative p-8 bg-navy/40 border border-white/5">
                        <div className="absolute top-0 right-0 w-12 h-12 border-t border-r border-gold/30" aria-hidden="true" />
                        <h3 className="font-display text-xl text-offwhite mb-4 flex items-center gap-3">
                          <Cpu size={24} weight="light" className="text-gold" aria-hidden="true" />
                          Lösung
                        </h3>
                        <p className="text-muted-gray leading-relaxed">
                          {project.solution}
                        </p>
                      </div>

                      {/* Approach */}
                      <div className="relative p-8 bg-navy/40 border border-white/5">
                        <h3 className="font-display text-xl text-offwhite mb-4 flex items-center gap-3">
                          <Robot size={24} weight="light" className="text-gold" aria-hidden="true" />
                          Mein Ansatz
                        </h3>
                        <p className="text-muted-gray leading-relaxed">
                          {project.approach}
                        </p>
                      </div>

                      {/* Results */}
                      <div className="relative p-8 bg-navy/40 border border-gold/20">
                        <div className="absolute bottom-0 right-0 w-12 h-12 border-b border-r border-gold/30" aria-hidden="true" />
                        <h3 className="font-display text-xl text-offwhite mb-6 flex items-center gap-3">
                          <ShieldCheck size={24} weight="light" className="text-gold" aria-hidden="true" />
                          Ergebnisse
                        </h3>
                        <ul className="space-y-4">
                          {project.results.map((result, i) => (
                            <li key={i} className="flex items-start gap-3">
                              <ArrowRight size={18} weight="bold" className="text-gold flex-shrink-0 mt-1" aria-hidden="true" />
                              <span className="text-offwhite">{result}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Technologies */}
                      <div className="flex flex-wrap gap-3">
                        {project.technologies.map((tech, i) => (
                          <span 
                            key={i}
                            className="px-4 py-2 bg-navy/60 border border-white/10 text-muted-gray text-sm font-mono"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Divider */}
                  {index < projects.length - 1 && (
                    <motion.div 
                      className="mt-24 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent"
                      initial={{ scaleX: 0 }}
                      animate={isInView ? { scaleX: 1 } : {}}
                      transition={{ duration: 1, delay: 0.5 + index * 0.2 }}
                      aria-hidden="true"
                    />
                  )}
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 md:py-32 bg-navy overflow-hidden">
        <BlueprintGrid opacity={0.02} />
        <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="heading-display text-3xl md:text-4xl text-offwhite mb-6">
              Haben Sie ein ähnliches Projekt?
            </h2>
            <p className="text-muted-gray text-lg mb-10 max-w-2xl mx-auto">
              Ich analysiere, konkretisiere und automatisiere – von der ersten Idee 
              bis zur funktionsfähigen Lösung.
            </p>
            <Link 
              to="/kontakt" 
              className="btn-primary inline-flex items-center gap-3"
              data-testid="referenzen-cta"
            >
              Projekt besprechen
              <ArrowRight size={18} weight="bold" aria-hidden="true" />
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default ReferenzenPage;
