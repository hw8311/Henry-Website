import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Check, X } from '@phosphor-icons/react';
import BlueprintGrid from '../components/BlueprintGrid';
import { useSEO } from '../components/SEO';
import content from '../data/content.json';

const UeberPage = () => {
  const { audience, stance, hero } = content;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  useSEO('ueber');

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
            Über mich
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="heading-display text-4xl md:text-5xl lg:text-6xl text-offwhite"
          >
            Wer dahinter steht
          </motion.h1>
        </div>
      </section>

      {/* About Me Section */}
      <section className="relative py-24 md:py-32 bg-navy-light overflow-hidden">
        <BlueprintGrid opacity={0.01} />
        <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Image Column - Smaller */}
            <motion.div 
              className="lg:col-span-3"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="relative max-w-[280px] mx-auto lg:mx-0">
                <div className="absolute -inset-3 border border-gold/20" />
                <img
                  src="https://customer-assets.emergentagent.com/job_ai-systems-henry/artifacts/u496axd7_IMG_20251224_034057_661.jpg"
                  alt="Henry Wilke"
                  className="w-full aspect-square object-cover object-top"
                />
                <div className="absolute -bottom-2 -right-2 w-10 h-10 border-b-2 border-r-2 border-gold" />
              </div>
            </motion.div>

            {/* Text Column */}
            <motion.div 
              className="lg:col-span-9"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <p className="text-lg md:text-xl text-offwhite leading-relaxed mb-8">
                Ich unterstütze Unternehmen dabei, KI sinnvoll in ihre Abläufe zu integrieren – <span className="text-gold">strukturiert, verständlich</span> und mit klarem wirtschaftlichem Fokus.
              </p>

              <div className="space-y-6 text-muted-gray leading-relaxed">
                <p>
                  Mein beruflicher Hintergrund ist bewusst nicht klassisch IT-lastig. Ich habe zwei IHK-Ausbildungen absolviert: als <span className="text-offwhite">Anlagenmechaniker</span> mit technischem Fundament und als <span className="text-offwhite">Immobilienkaufmann</span> mit kaufmännischem und organisatorischem Schwerpunkt. Diese Kombination hat mir früh vermittelt, wie Prozesse entstehen, wo Reibungspunkte liegen und wie technische Lösungen wirtschaftlich gedacht werden müssen.
                </p>

                {/* Highlight Box */}
                <div className="relative p-6 bg-navy/50 border-l-2 border-gold my-8">
                  <p className="text-offwhite text-lg">
                    Gerade im Bereich KI-Automatisierung ist das entscheidend.
                  </p>
                </div>

                <p>
                  Künstliche Intelligenz ist heute nicht mehr mit traditioneller IT gleichzusetzen. Es geht nicht primär um Programmierung, Serverstrukturen oder tiefgreifende Systemarchitektur. Es geht darum, <span className="text-offwhite">Anforderungen klar zu formulieren</span>, Prozesse logisch zu strukturieren und zwischen Mensch und System präzise zu übersetzen.
                </p>

                <p className="text-offwhite text-lg font-display">
                  Und genau hier liegt meine Stärke.
                </p>

                <p>
                  Ich arbeite analytisch, strukturiert und kommunikationsstark. Komplexe Abläufe kann ich so herunterbrechen, dass sie für Menschen verständlich – und für KI-Systeme präzise verwertbar – werden. Man könnte sagen: <span className="text-gold">Ich denke in Prozessen und formuliere in einer Klarheit, die maschinenlesbar wird.</span>
                </p>

                <p>
                  Seit rund zwei Jahren beschäftige ich mich intensiv mit KI-gestützter Automatisierung und digitalen Workflows. Dabei verbinde ich technisches Verständnis, wirtschaftliches Denken und praktische Erfahrung aus realen Unternehmensstrukturen.
                </p>

                {/* Final Statement */}
                <div className="pt-8 mt-8 border-t border-white/10">
                  <p className="text-muted-gray mb-2">
                    Für mich ist KI kein Selbstzweck und kein Hype-Thema.
                  </p>
                  <p className="text-offwhite text-xl font-display">
                    Sie ist ein Werkzeug – und Werkzeuge müssen <span className="gold-text">sinnvoll eingesetzt</span> werden.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      {/* Audience Section */}
      <section className="relative py-24 md:py-32 bg-navy overflow-hidden" ref={ref}>
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <span className="label-mono text-gold block mb-4">
              {audience.overline}
            </span>
            <h2 className="heading-display text-3xl md:text-4xl lg:text-5xl text-offwhite">
              {audience.headline}
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10">
            {/* For Column */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="md:col-span-7 relative p-8 md:p-12 bg-navy/40 border border-gold/30 hover:border-gold/50 transition-colors duration-500"
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
              
              <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-gold" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-gold/30" />
            </motion.div>

            {/* Not For Column */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="md:col-span-5 relative p-6 md:p-8 bg-navy/20 border border-white/5 opacity-80 hover:opacity-100 transition-opacity duration-500"
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

      {/* Stance Section */}
      <section className="relative py-32 md:py-48 bg-navy overflow-hidden">
        <BlueprintGrid opacity={0.015} />
        
        <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <motion.span 
              className="block font-display text-6xl md:text-8xl text-gold/20 mb-4"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              "
            </motion.span>

            <h2 className="heading-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-offwhite mb-4">
              {stance.quote}
            </h2>
            <h2 className="heading-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl gold-text">
              {stance.emphasis}
            </h2>

            <motion.span 
              className="block font-display text-6xl md:text-8xl text-gold/20 mt-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              "
            </motion.span>
          </motion.div>

          <motion.div 
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] pointer-events-none"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <div className="absolute top-0 left-1/4 w-px h-16 bg-gradient-to-b from-gold/30 to-transparent" />
            <div className="absolute bottom-0 right-1/4 w-px h-16 bg-gradient-to-t from-gold/30 to-transparent" />
            <div className="absolute left-0 top-1/3 w-16 h-px bg-gradient-to-r from-gold/30 to-transparent" />
            <div className="absolute right-0 bottom-1/3 w-16 h-px bg-gradient-to-l from-gold/30 to-transparent" />
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default UeberPage;
