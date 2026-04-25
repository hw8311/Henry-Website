import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft } from '@phosphor-icons/react';
import { useSEO } from '../components/SEO';

const ImpressumPage = () => {
  useSEO('impressum');
  
  return (
    <>
      {/* Hero Banner */}
      <section className="relative py-24 overflow-hidden">
        <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-muted-gray hover:text-gold transition-colors mb-8"
          >
            <ArrowLeft size={20} />
            <span className="label-mono">Zurück zur Startseite</span>
          </Link>
          <div className="glass-card p-8 md:p-12">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="heading-display text-4xl md:text-5xl text-offwhite"
          >
            Impressum
          </motion.h1>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="relative py-12 md:py-16 overflow-hidden">
        <div className="max-w-3xl mx-auto px-6 md:px-12">
          <div className="glass-card p-8 md:p-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="prose prose-invert max-w-none"
          >
            <div className="space-y-8 text-muted-gray">
              <div>
                <h2 className="font-display text-2xl text-offwhite mb-4">Angaben gemäß § 5 TMG</h2>
                <p className="text-lg">
                  Triangle Business Solutions LLC<br />
                  115 West 27th Street<br />
                  New York, NY 10001<br />
                  United States
                </p>
                <p className="mt-4 text-offwhite">
                  vertreten durch Henry Wilke
                </p>
                <p className="mt-4">
                  E-Mail: <a href="mailto:henry-triangle@outlook.com" className="text-gold hover:text-gold-light transition-colors">henry-triangle@outlook.com</a>
                </p>
              </div>

              <div className="h-px bg-white/10" />

              <div>
                <h2 className="font-display text-2xl text-offwhite mb-4">Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV</h2>
                <p>
                  Henry Wilke<br />
                  Triangle Business Solutions LLC<br />
                  115 West 27th Street<br />
                  New York, NY 10001<br />
                  United States
                </p>
              </div>

              <div className="h-px bg-white/10" />

              <div>
                <h2 className="font-display text-2xl text-offwhite mb-4">Haftung für Inhalte</h2>
                <p>
                  Die Inhalte dieser Website wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, 
                  Vollständigkeit und Aktualität der Inhalte wird jedoch keine Gewähr übernommen.
                </p>
              </div>

              <div className="h-px bg-white/10" />

              <div>
                <h2 className="font-display text-2xl text-offwhite mb-4">Haftung für Links</h2>
                <p>
                  Diese Website kann Links zu externen Websites Dritter enthalten. Auf deren Inhalte 
                  besteht kein Einfluss. Für die Inhalte der verlinkten Seiten ist stets der jeweilige 
                  Anbieter verantwortlich.
                </p>
              </div>

              <div className="h-px bg-white/10" />

              <div>
                <h2 className="font-display text-2xl text-offwhite mb-4">Urheberrecht</h2>
                <p>
                  Die durch den Seitenbetreiber erstellten Inhalte und Werke auf dieser Website unterliegen 
                  dem deutschen Urheberrecht. Eine Vervielfältigung oder Verwendung ist ohne ausdrückliche 
                  Zustimmung nicht gestattet.
                </p>
              </div>

              <div className="h-px bg-white/10" />

              <div className="pt-4">
                <p className="label-mono text-muted-gray/60">
                  Stand: Rostock, 2. Februar 2026
                </p>
              </div>
            </div>
          </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ImpressumPage;
