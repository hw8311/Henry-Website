import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Check, X } from '@phosphor-icons/react';
import { useLanguage } from '../context/LanguageContext';
import { LineReveal, StaggerContainer, StaggerItem } from '../components/animations/ScrollAnimations';

const audienceFor = [
  { de: 'Unternehmer mit Systemdenken', en: 'Entrepreneurs with systems thinking' },
  { de: 'Strategen, die Komplexität reduzieren wollen', en: 'Strategists looking to reduce complexity' },
  { de: 'Skalierende Organisationen', en: 'Scaling organizations' },
  { de: 'Teams, die KI als Infrastruktur verstehen', en: 'Teams that understand AI as infrastructure' }
];

const audienceNotFor = [
  { de: 'Tool-Sammler', en: 'Tool collectors' },
  { de: 'Schnellstart-Hacker', en: 'Quick-start hackers' },
  { de: 'Buzzword-Enthusiasten', en: 'Buzzword enthusiasts' },
  { de: 'Einmal-Projekte ohne strategischen Kontext', en: 'One-off projects without strategic context' }
];

const UeberPage = () => {
  const { language } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <>
      {/* Hero Banner */}
      <section className="relative py-24 overflow-hidden">
        <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12">
          <motion.div className="glass-card p-8 md:p-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="label-mono text-gold block mb-4">
              {language === 'de' ? 'Über mich' : 'About me'}
            </span>
            <h1 className="heading-display text-4xl md:text-5xl lg:text-6xl text-offwhite">
              {language === 'de' ? 'Wer dahinter steht' : 'The person behind it'}
            </h1>
          </motion.div>
        </div>
      </section>

      {/* About Me Section */}
      <section className="relative py-12 md:py-16 overflow-hidden">
        <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12">
          <motion.div
            className="glass-card p-8 md:p-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
              {/* Image Column */}
              <div className="lg:col-span-3">
                <div className="relative max-w-[240px] mx-auto lg:mx-0">
                  <img
                    src="https://customer-assets.emergentagent.com/job_ai-systems-henry/artifacts/u496axd7_IMG_20251224_034057_661.jpg"
                    alt="Henry Wilke"
                    className="w-full aspect-square object-cover object-top rounded-xl"
                  />
                </div>
              </div>

              {/* Text Column */}
              <div className="lg:col-span-9">
                <p className="text-lg md:text-xl text-offwhite leading-relaxed mb-8">
                  {language === 'de'
                    ? <>Ich unterstütze Unternehmen dabei, KI sinnvoll in ihre Abläufe zu integrieren – <span className="text-gold">strukturiert, verständlich</span> und mit klarem wirtschaftlichem Fokus.</>
                    : <>I help companies integrate AI meaningfully into their operations – <span className="text-gold">structured, understandable</span>, and with a clear economic focus.</>}
                </p>

                <div className="space-y-6 text-muted-gray leading-relaxed">
                  <p>
                    {language === 'de'
                      ? <>Mein beruflicher Hintergrund ist bewusst nicht klassisch IT-lastig. Ich habe zwei IHK-Ausbildungen absolviert: als <span className="text-offwhite">Anlagenmechaniker</span> mit technischem Fundament und als <span className="text-offwhite">Immobilienkaufmann</span> mit kaufmännischem und organisatorischem Schwerpunkt.</>
                      : <>My professional background is deliberately not classically IT-heavy. I completed two IHK apprenticeships: as a <span className="text-offwhite">plant mechanic</span> with a technical foundation and as a <span className="text-offwhite">real estate agent</span> with a commercial and organizational focus.</>}
                  </p>

                  {/* Highlight Box */}
                  <div className="relative p-5 bg-white/5 border-l-2 border-gold rounded-lg">
                    <p className="text-offwhite text-lg">
                      {language === 'de'
                        ? 'Gerade im Bereich KI-Automatisierung ist das entscheidend.'
                        : 'This is especially crucial in the field of AI automation.'}
                    </p>
                  </div>

                  <p>
                    {language === 'de'
                      ? <>Künstliche Intelligenz ist heute nicht mehr mit traditioneller IT gleichzusetzen. Es geht darum, <span className="text-offwhite">Anforderungen klar zu formulieren</span>, Prozesse logisch zu strukturieren und zwischen Mensch und System präzise zu übersetzen.</>
                      : <>Artificial intelligence today is no longer synonymous with traditional IT. It's about <span className="text-offwhite">clearly formulating requirements</span>, logically structuring processes, and precisely translating between humans and systems.</>}
                  </p>

                  <p className="text-offwhite text-lg font-display">
                    {language === 'de' ? 'Und genau hier liegt meine Stärke.' : 'And that\'s exactly where my strength lies.'}
                  </p>

                  <p>
                    {language === 'de'
                      ? <>Ich arbeite analytisch, strukturiert und kommunikationsstark. <span className="text-gold">Ich denke in Prozessen und formuliere in einer Klarheit, die maschinenlesbar wird.</span></>
                      : <>I work analytically, in a structured manner, and with strong communication skills. <span className="text-gold">I think in processes and formulate with a clarity that becomes machine-readable.</span></>}
                  </p>

                  {/* Final Statement */}
                  <div className="pt-6 mt-6 border-t border-white/10">
                    <p className="text-offwhite text-xl font-display">
                      {language === 'de'
                        ? <>Werkzeuge müssen <span className="gold-text">sinnvoll eingesetzt</span> werden.</>
                        : <>Tools must be <span className="gold-text">used wisely</span>.</>}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Audience Section */}
      <section className="relative py-12 md:py-16 overflow-hidden" ref={ref}>
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          <div className="text-center mb-10">
            <span className="label-mono text-gold block mb-4">
              {language === 'de' ? 'Zielgruppe' : 'Target Audience'}
            </span>
            <h2 className="heading-display text-3xl md:text-4xl lg:text-5xl text-offwhite">
              {language === 'de' ? 'Für wen das relevant ist.' : 'Who this is relevant for.'}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
            {/* For Column */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="md:col-span-7 glass-card p-6 md:p-10 border-gold/30 hover:border-gold/50 transition-colors duration-500"
            >
              <h3 className="font-display text-2xl md:text-3xl text-offwhite mb-8">
                {language === 'de' ? 'Ideal für' : 'Ideal for'}
              </h3>
              <StaggerContainer stagger={0.12} delay={0.3} className="space-y-4">
                {audienceFor.map((item, index) => (
                  <StaggerItem key={index}>
                    <div className="flex items-start gap-4 group">
                      <div className="w-6 h-6 flex items-center justify-center bg-gold/10 group-hover:bg-gold/20 transition-colors duration-300 flex-shrink-0 mt-0.5 rounded">
                        <Check size={16} weight="bold" className="text-gold" />
                      </div>
                      <span className="text-offwhite text-lg">{item[language]}</span>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </motion.div>

            {/* Not For Column */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="md:col-span-5 glass-card p-5 md:p-7 opacity-80 hover:opacity-100 transition-opacity duration-500"
            >
              <h3 className="font-display text-xl text-muted-gray/80 mb-5">
                {language === 'de' ? 'Nicht für' : 'Not for'}
              </h3>
              <ul className="space-y-3">
                {audienceNotFor.map((item, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <X size={16} weight="light" className="text-muted-gray/40 mt-1 flex-shrink-0" />
                    <span className="text-muted-gray/70 text-sm">{item[language]}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stance Section */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12">
          <motion.div
            className="glass-card p-10 md:p-16 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="block font-display text-5xl md:text-7xl text-gold/20 mb-4">&ldquo;</span>

            <h2 className="heading-display text-3xl sm:text-4xl md:text-5xl text-offwhite mb-3">
              <LineReveal text={language === 'de' ? 'KI ist kein Feature.' : 'AI is not a feature.'} delay={0.2} />
            </h2>
            <h2 className="heading-display text-3xl sm:text-4xl md:text-5xl gold-text">
              <LineReveal text={language === 'de' ? 'Sie ist Infrastruktur.' : "It's infrastructure."} delay={0.5} />
            </h2>

            <span className="block font-display text-5xl md:text-7xl text-gold/20 mt-4">&rdquo;</span>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default UeberPage;
