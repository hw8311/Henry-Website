import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft } from '@phosphor-icons/react';
import BlueprintGrid from '../components/BlueprintGrid';
import { useSEO } from '../components/SEO';

const DatenschutzPage = () => {
  useSEO('datenschutz');
  
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
            Datenschutzerklärung
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
            className="space-y-8 text-muted-gray"
          >
            <p className="text-lg text-offwhite">
              Diese Website erhebt und verarbeitet personenbezogene Daten ausschließlich im Rahmen 
              der gesetzlichen Bestimmungen.
            </p>

            <div className="h-px bg-white/10" />

            <div>
              <h2 className="font-display text-2xl text-offwhite mb-4">Erfasste Daten</h2>
              <p className="mb-4">Erfasst werden können:</p>
              <ul className="list-none space-y-2 ml-4">
                <li className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 bg-gold rotate-45" />
                  <span>IP-Adresse</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 bg-gold rotate-45" />
                  <span>Kontaktinformationen bei E-Mail-Anfragen</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 bg-gold rotate-45" />
                  <span>Technische Zugriffsdaten</span>
                </li>
              </ul>
            </div>

            <div className="h-px bg-white/10" />

            <div>
              <h2 className="font-display text-2xl text-offwhite mb-4">Zweck der Verarbeitung</h2>
              <p>
                Die Verarbeitung erfolgt zur Bereitstellung der Website und zur Bearbeitung von Anfragen.
              </p>
            </div>

            <div className="h-px bg-white/10" />

            <div>
              <h2 className="font-display text-2xl text-offwhite mb-4">Weitergabe an Dritte</h2>
              <p>
                Es erfolgt keine Weitergabe an Dritte ohne ausdrückliche Zustimmung.
              </p>
            </div>

            <div className="h-px bg-white/10" />

            <div>
              <h2 className="font-display text-2xl text-offwhite mb-4">Ihre Rechte</h2>
              <p>
                Betroffene Personen haben das Recht auf Auskunft, Berichtigung oder Löschung ihrer Daten.
              </p>
            </div>

            <div className="h-px bg-white/10" />

            <div>
              <h2 className="font-display text-2xl text-offwhite mb-4">Kontakt</h2>
              <p>
                Bei Fragen zum Datenschutz wenden Sie sich bitte an: <br />
                <a href="mailto:henry-triangle@outlook.com" className="text-gold hover:text-gold-light transition-colors">
                  henry-triangle@outlook.com
                </a>
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

export default DatenschutzPage;
