import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft } from '@phosphor-icons/react';
import BlueprintGrid from '../components/BlueprintGrid';
import { useSEO } from '../components/SEO';

const AGBPage = () => {
  useSEO('agb');
  
  return (
    <>
      {/* Hero Banner */}
      <section className="relative py-24 bg-navy overflow-hidden">
        <BlueprintGrid opacity={0.02} />
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-muted-gray hover:text-gold transition-colors mb-8"
          >
            <ArrowLeft size={20} />
            <span className="label-mono">Zurück zur Startseite</span>
          </Link>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="heading-display text-4xl md:text-5xl text-offwhite"
          >
            Allgemeine Geschäftsbedingungen
          </motion.h1>
        </div>
      </section>

      {/* Content */}
      <section className="relative py-16 md:py-24 bg-navy-light overflow-hidden">
        <div className="max-w-3xl mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-10 text-muted-gray"
          >
            <div>
              <h2 className="font-display text-2xl text-offwhite mb-4">§1 Geltungsbereich</h2>
              <p>
                Diese Allgemeinen Geschäftsbedingungen gelten für alle Leistungen, Beratungen und 
                Dienstleistungen im Bereich KI-Automatisierung, Prozessoptimierung und digitale 
                Systemintegration, die durch Henry Wilke angeboten werden.
              </p>
            </div>

            <div className="h-px bg-white/10" />

            <div>
              <h2 className="font-display text-2xl text-offwhite mb-4">§2 Leistungsbeschreibung</h2>
              <p className="mb-4">Der Anbieter erbringt Beratungs- und Umsetzungsleistungen im Bereich:</p>
              <ul className="list-none space-y-2 ml-4">
                <li className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 bg-gold rotate-45" />
                  <span>KI-gestützte Automatisierung</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 bg-gold rotate-45" />
                  <span>Digitale Prozessoptimierung</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 bg-gold rotate-45" />
                  <span>Workflow-Integration</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 bg-gold rotate-45" />
                  <span>Strategische Beratung</span>
                </li>
              </ul>
              <p className="mt-4">Der konkrete Leistungsumfang ergibt sich aus individueller Vereinbarung.</p>
            </div>

            <div className="h-px bg-white/10" />

            <div>
              <h2 className="font-display text-2xl text-offwhite mb-4">§3 Vertragsschluss</h2>
              <p>
                Ein Vertrag kommt durch individuelle Vereinbarung, Angebot und Annahme zustande. 
                Angebote sind freibleibend.
              </p>
            </div>

            <div className="h-px bg-white/10" />

            <div>
              <h2 className="font-display text-2xl text-offwhite mb-4">§4 Vergütung</h2>
              <p>
                Die Vergütung erfolgt gemäß individueller Vereinbarung. Rechnungen sind innerhalb 
                von 14 Tagen ohne Abzug fällig.
              </p>
            </div>

            <div className="h-px bg-white/10" />

            <div>
              <h2 className="font-display text-2xl text-offwhite mb-4">§5 Haftung</h2>
              <p>
                Der Anbieter haftet nur für Schäden, die auf vorsätzlichem oder grob fahrlässigem 
                Verhalten beruhen. Für entgangenen Gewinn oder mittelbare Schäden wird keine 
                Haftung übernommen.
              </p>
            </div>

            <div className="h-px bg-white/10" />

            <div>
              <h2 className="font-display text-2xl text-offwhite mb-4">§6 Vertraulichkeit</h2>
              <p>
                Beide Parteien verpflichten sich zur vertraulichen Behandlung aller im Rahmen 
                der Zusammenarbeit erhaltenen Informationen.
              </p>
            </div>

            <div className="h-px bg-white/10" />

            <div>
              <h2 className="font-display text-2xl text-offwhite mb-4">§7 Schlussbestimmungen</h2>
              <p className="mb-2">Es gilt deutsches Recht.</p>
              <p>
                Sollte eine Bestimmung dieser AGB unwirksam sein, bleibt die Wirksamkeit der 
                übrigen Bestimmungen unberührt.
              </p>
            </div>

            <div className="h-px bg-white/10" />

            <div className="pt-4">
              <p className="label-mono text-muted-gray/60">
                Stand: Rostock, 2. Februar 2026
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default AGBPage;
