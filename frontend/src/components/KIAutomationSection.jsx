import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { 
  Lightbulb, 
  ChartLineUp, 
  Scales, 
  ShieldCheck, 
  Lightning, 
  Trophy,
  FileText,
  ChartBar,
  Gear,
  Brain,
  Plugs,
  Cube,
  ArrowsClockwise,
  CheckSquare,
  TreeStructure
} from '@phosphor-icons/react';
import BlueprintGrid from './BlueprintGrid';
import { useLanguage } from '../context/LanguageContext';
import { LineReveal, StaggerContainer, StaggerItem } from './animations/ScrollAnimations';

const applicationFields = [
  { icon: FileText, de: 'Dokumenten- und Informationsverarbeitung', en: 'Document and information processing' },
  { icon: ChartBar, de: 'Analyse großer Datenmengen', en: 'Large-scale data analysis' },
  { icon: Gear, de: 'Prozessoptimierung in Verwaltung und Produktion', en: 'Process optimization in administration and production' },
  { icon: Brain, de: 'Wissenssysteme und Entscheidungsunterstützung', en: 'Knowledge systems and decision support' },
  { icon: Plugs, de: 'Intelligente Schnittstellen zwischen Software-Systemen', en: 'Intelligent interfaces between software systems' }
];

const benefits = [
  {
    icon: Lightning,
    title: { de: 'Effizienzsteigerung', en: 'Efficiency Gains' },
    description: { de: 'Routinetätigkeiten werden automatisiert, Mitarbeitende gewinnen Zeit für strategische Aufgaben.', en: 'Routine tasks are automated, giving employees time for strategic work.' }
  },
  {
    icon: ChartLineUp,
    title: { de: 'Skalierbarkeit', en: 'Scalability' },
    description: { de: 'Systeme können steigende Datenmengen oder Anfragen verarbeiten, ohne proportional mehr Personal zu benötigen.', en: 'Systems can handle increasing data volumes or requests without proportionally more staff.' }
  },
  {
    icon: ShieldCheck,
    title: { de: 'Konsistenz und Fehlerreduktion', en: 'Consistency and Error Reduction' },
    description: { de: 'Standardisierte Prozesse laufen reproduzierbar und stabil.', en: 'Standardized processes run reproducibly and stably.' }
  },
  {
    icon: Scales,
    title: { de: 'Schnellere Entscheidungsgrundlagen', en: 'Faster Decision-Making' },
    description: { de: 'KI kann Informationen vorstrukturieren, bewerten und priorisieren.', en: 'AI can pre-structure, evaluate, and prioritize information.' }
  },
  {
    icon: Trophy,
    title: { de: 'Wettbewerbsvorteil', en: 'Competitive Advantage' },
    description: { de: 'Unternehmen, die intelligente Infrastruktur einsetzen, reagieren schneller und flexibler auf Marktveränderungen.', en: 'Companies using intelligent infrastructure respond faster and more flexibly to market changes.' }
  }
];

const architecturePoints = [
  { icon: Cube, de: 'Klare Systemlogik', en: 'Clear system logic' },
  { icon: Plugs, de: 'Saubere Schnittstellen', en: 'Clean interfaces' },
  { icon: CheckSquare, de: 'Definierte Verantwortlichkeiten', en: 'Defined responsibilities' },
  { icon: TreeStructure, de: 'Skalierbare Infrastruktur', en: 'Scalable infrastructure' }
];

const conclusionPoints = [
  { de: 'Robuste Prozesse', en: 'Robust processes' },
  { de: 'Datenbasierte Entscheidungsfähigkeit', en: 'Data-driven decision-making' },
  { de: 'Nachhaltige Skalierbarkeit', en: 'Sustainable scalability' }
];

export const KIAutomationSection = () => {
  const { language } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section 
      id="ki-automatisierung"
      data-testid="ki-automation-section"
      className="relative py-32 md:py-40 bg-navy overflow-hidden"
      ref={ref}
    >
      <BlueprintGrid opacity={0.015} />
      
      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12">
        {/* Header */}
        <motion.div 
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="label-mono text-gold block mb-4" data-testid="ki-automation-overline">
            {language === 'de' ? 'Grundlagen' : 'Fundamentals'}
          </span>
          <h2 className="heading-display text-3xl md:text-4xl lg:text-5xl text-offwhite mb-8" data-testid="ki-automation-headline">
            {language === 'de'
              ? 'Was bedeutet KI-Automatisierung – und warum wird sie strategisch relevant?'
              : 'What does AI automation mean – and why is it becoming strategically relevant?'}
          </h2>
        </motion.div>

        {/* Intro Paragraphs */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <p className="text-lg md:text-xl text-offwhite leading-relaxed mb-6">
            {language === 'de'
              ? <>Künstliche Intelligenz ist kein Zukunftsthema mehr. Sie ist Gegenwart – und zunehmend <span className="text-gold">Infrastruktur</span>.</>
              : <>Artificial intelligence is no longer a future topic. It is the present – and increasingly <span className="text-gold">infrastructure</span>.</>}
          </p>
          <p className="text-muted-gray leading-relaxed mb-6">
            {language === 'de'
              ? 'Unter KI-Automatisierung versteht man den gezielten Einsatz lernfähiger Systeme, um wiederkehrende, komplexe oder datenintensive Prozesse teilweise oder vollständig zu automatisieren. Anders als klassische Automatisierung arbeitet KI nicht nur regelbasiert, sondern kann Muster erkennen, Inhalte verstehen, Entscheidungen vorbereiten und Prozesse dynamisch anpassen.'
              : 'AI automation refers to the targeted use of learning systems to partially or fully automate recurring, complex, or data-intensive processes. Unlike classical automation, AI doesn\'t just work rule-based – it can recognize patterns, understand content, prepare decisions, and dynamically adjust processes.'}
          </p>
          
          {/* Highlight Box */}
          <motion.div 
            className="relative p-6 md:p-8 bg-navy-light/40 border-l-2 border-gold my-10"
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <p className="text-offwhite text-lg md:text-xl font-display">
              {language === 'de'
                ? <>Das bedeutet: Nicht nur &bdquo;Wenn A, dann B&ldquo;, sondern <span className="gold-text">kontextabhängiges Handeln</span> auf Basis von Daten.</>
                : <>This means: Not just &ldquo;If A, then B&rdquo;, but <span className="gold-text">context-dependent action</span> based on data.</>}
            </p>
          </motion.div>
        </motion.div>

        {/* Application Fields */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h3 className="font-display text-2xl text-offwhite mb-8">
            {language === 'de' ? 'Typische Anwendungsfelder' : 'Typical Application Areas'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {applicationFields.map((field, index) => {
              const Icon = field.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                  className="flex items-center gap-4 p-4 bg-navy-light/20 border border-white/5 hover:border-gold/30 transition-colors duration-300 group"
                >
                  <div className="w-10 h-10 flex items-center justify-center bg-gold/10 group-hover:bg-gold/20 transition-colors">
                    <Icon size={20} weight="light" className="text-gold" />
                  </div>
                  <span className="text-offwhite">{field[language]}</span>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Key Difference */}
        <motion.div
          className="mb-20 p-8 md:p-10 bg-navy-light/30 border border-white/5 relative"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-gold" />
          <Lightbulb size={32} weight="light" className="text-gold mb-4" />
          <p className="text-muted-gray leading-relaxed">
            {language === 'de'
              ? <>Der entscheidende Unterschied zur bisherigen IT-Automatisierung liegt in der Fähigkeit, mit <span className="text-offwhite">unstrukturierten Informationen</span> umzugehen – also Texten, Bildern, Sprache oder komplexen Zusammenhängen.</>
              : <>The crucial difference from previous IT automation lies in the ability to handle <span className="text-offwhite">unstructured information</span> – such as texts, images, speech, or complex contexts.</>}
          </p>
        </motion.div>

        {/* Benefits Section */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          <h3 className="heading-display text-2xl md:text-3xl text-offwhite mb-10">
            {language === 'de' ? 'Welche Vorteile entstehen konkret?' : 'What are the concrete benefits?'}
          </h3>
          <div className="space-y-6">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                  className="group flex gap-6 p-6 bg-navy-light/20 border border-white/5 hover:border-gold/30 transition-all duration-300"
                >
                  <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center border border-gold/30 group-hover:border-gold/60 group-hover:bg-gold/5 transition-all duration-300">
                    <Icon size={24} weight="light" className="text-gold" />
                  </div>
                  <div>
                    <h4 className="font-display text-xl text-offwhite mb-2 group-hover:text-gold transition-colors duration-300">
                      {benefit.title[language]}
                    </h4>
                    <p className="text-muted-gray leading-relaxed">
                      {benefit.description[language]}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Why Tools Are Not Enough */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          <h3 className="heading-display text-2xl md:text-3xl text-offwhite mb-8">
            {language === 'de'
              ? 'Warum reicht "ein Tool einsetzen" nicht aus?'
              : 'Why isn\'t "using a tool" enough?'}
          </h3>
          <p className="text-muted-gray leading-relaxed mb-8">
            {language === 'de'
              ? 'Viele Organisationen starten mit isolierten KI-Tools. Doch ohne saubere Architektur bleiben diese Insellösungen. Der nachhaltige Nutzen entsteht erst, wenn KI strukturell integriert wird – in bestehende Prozesse, Datenflüsse und Entscheidungswege.'
              : 'Many organizations start with isolated AI tools. But without clean architecture, these remain siloed solutions. Sustainable value only emerges when AI is structurally integrated – into existing processes, data flows, and decision paths.'}
          </p>
          
          {/* Architecture Statement */}
          <div className="text-center py-12 my-10 border-y border-white/5">
            <p className="font-display text-2xl md:text-3xl text-offwhite mb-2">
              <LineReveal text={language === 'de' ? 'KI ist kein Add-on.' : 'AI is not an add-on.'} delay={0.1} />
            </p>
            <p className="font-display text-2xl md:text-3xl gold-text">
              <LineReveal text={language === 'de' ? 'Sie ist ein Architekturthema.' : "It's an architecture topic."} delay={0.35} />
            </p>
          </div>

          {/* Architecture Points */}
          <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10" stagger={0.1} delay={0.2}>
            {architecturePoints.map((point, index) => {
              const Icon = point.icon;
              return (
                <StaggerItem key={index}>
                  <div className="text-center p-4 border border-white/5 hover:border-gold/30 transition-colors duration-300 group">
                    <Icon size={28} weight="thin" className="text-gold mx-auto mb-3 group-hover:scale-110 transition-transform duration-300" />
                    <span className="text-sm text-muted-gray group-hover:text-offwhite transition-colors duration-300">{point[language]}</span>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
          
          <p className="text-muted-gray leading-relaxed mt-8 text-center">
            {language === 'de'
              ? <>Nur so entsteht echte Automatisierung – <span className="text-offwhite">nicht nur ein experimentelles Feature</span>.</>
              : <>Only this way does real automation emerge – <span className="text-offwhite">not just an experimental feature</span>.</>}
          </p>
        </motion.div>

        {/* Reality Section */}
        <motion.div
          className="mb-20 relative p-8 md:p-12 bg-navy-light/40 border border-gold/20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <div className="absolute top-0 right-0 w-20 h-20 border-t border-r border-blueprint opacity-40" />
          <span className="label-mono text-gold block mb-4">
            {language === 'de' ? 'Stand heute' : 'State of today'}
          </span>
          <h3 className="font-display text-2xl text-offwhite mb-6">
            {language === 'de' ? 'Realität statt Science-Fiction' : 'Reality, not science fiction'}
          </h3>
          <p className="text-muted-gray leading-relaxed mb-6">
            {language === 'de'
              ? 'Moderne Sprachmodelle, Automatisierungsplattformen und API-basierte Systeme ermöglichen bereits heute leistungsfähige Lösungen – ohne futuristische Visionen oder übertriebene Versprechen.'
              : 'Modern language models, automation platforms, and API-based systems already enable powerful solutions today – without futuristic visions or exaggerated promises.'}
          </p>
          <p className="text-offwhite text-lg">
            {language === 'de'
              ? <>Wichtig ist nicht die Technologie allein, sondern ihr <span className="text-gold">strukturierter Einsatz</span>.</>
              : <>What matters is not the technology alone, but its <span className="text-gold">structured deployment</span>.</>}
          </p>
          
          <div className="mt-8 pt-6 border-t border-white/10">
            <p className="text-muted-gray">
              {language === 'de'
                ? 'KI-Automatisierung bedeutet nicht, Menschen zu ersetzen.'
                : 'AI automation doesn\'t mean replacing humans.'}
            </p>
            <p className="text-offwhite text-lg mt-2">
              {language === 'de'
                ? <>Sie bedeutet, <span className="gold-text">Systeme intelligenter</span> zu machen.</>
                : <>It means making <span className="gold-text">systems smarter</span>.</>}
            </p>
          </div>
        </motion.div>

        {/* Conclusion */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.3 }}
        >
          <span className="label-mono text-gold block mb-4">
            {language === 'de' ? 'Fazit' : 'Conclusion'}
          </span>
          <p className="text-muted-gray text-lg mb-8 max-w-3xl mx-auto">
            {language === 'de'
              ? <>Unternehmen stehen nicht vor der Frage, <span className="text-offwhite">ob</span> KI relevant wird, sondern <span className="text-offwhite">wie</span> sie strategisch integriert wird.</>
              : <>Companies don't face the question of <span className="text-offwhite">whether</span> AI becomes relevant, but <span className="text-offwhite">how</span> it gets strategically integrated.</>}
          </p>
          
          <p className="text-offwhite text-lg mb-8">
            {language === 'de'
              ? 'Wer frühzeitig auf durchdachte KI-Architektur setzt, schafft:'
              : 'Those who invest early in thoughtful AI architecture create:'}
          </p>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 mb-12">
            {conclusionPoints.map((point, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: 1.4 + index * 0.1 }}
                className="flex items-center gap-3"
              >
                <div className="w-2 h-2 bg-gold rotate-45" />
                <span className="text-offwhite">{point[language]}</span>
              </motion.div>
            ))}
          </div>

          {/* Final Statement */}
          <div className="pt-8 border-t border-white/5">
            <p className="text-muted-gray text-lg">
              <LineReveal text={language === 'de' ? 'Nicht als Trend.' : 'Not as a trend.'} delay={0.1} />
            </p>
            <p className="font-display text-3xl md:text-4xl gold-text mt-2">
              <LineReveal text={language === 'de' ? 'Sondern als Infrastruktur.' : 'But as infrastructure.'} delay={0.35} />
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default KIAutomationSection;
