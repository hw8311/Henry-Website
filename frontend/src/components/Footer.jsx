import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer 
      data-testid="footer"
      role="contentinfo"
      aria-label="Fußbereich"
      className="relative py-16 bg-navy border-t border-white/5"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <Link to="/" className="font-display text-2xl text-offwhite hover:text-gold transition-colors">
              Henry Wilke
            </Link>
            <p className="label-mono text-muted-gray mt-2">
              AI-Systemarchitekt
            </p>
            <p className="text-muted-gray text-sm mt-4 max-w-xs">
              Strategische KI-Implementierung und Systemdesign für skalierbare Organisationen.
            </p>
          </motion.div>

          {/* Navigation */}
          <motion.nav 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            aria-label="Footer Navigation"
          >
            <h3 className="label-mono text-gold mb-4">Navigation</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-muted-gray hover:text-offwhite transition-colors">
                  Start
                </Link>
              </li>
              <li>
                <Link to="/leistungen" className="text-muted-gray hover:text-offwhite transition-colors">
                  Leistungen
                </Link>
              </li>
              <li>
                <Link to="/ueber" className="text-muted-gray hover:text-offwhite transition-colors">
                  Über mich
                </Link>
              </li>
              <li>
                <Link to="/automatisierung" className="text-muted-gray hover:text-offwhite transition-colors">
                  Automatisierung erklärt
                </Link>
              </li>
              <li>
                <Link to="/kontakt" className="text-muted-gray hover:text-offwhite transition-colors">
                  Kontakt
                </Link>
              </li>
            </ul>
          </motion.nav>

          {/* Legal */}
          <motion.nav 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            aria-label="Rechtliche Informationen"
          >
            <h3 className="label-mono text-gold mb-4">Rechtliches</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/impressum" className="text-muted-gray hover:text-offwhite transition-colors">
                  Impressum
                </Link>
              </li>
              <li>
                <Link to="/agb" className="text-muted-gray hover:text-offwhite transition-colors">
                  AGB
                </Link>
              </li>
              <li>
                <Link to="/datenschutz" className="text-muted-gray hover:text-offwhite transition-colors">
                  Datenschutzerklärung
                </Link>
              </li>
            </ul>
            
            <div className="mt-6 pt-6 border-t border-white/5">
              <p className="text-muted-gray text-sm">
                E-Mail: <a href="mailto:henry-triangle@outlook.com" className="text-gold hover:text-gold-light transition-colors">henry-triangle@outlook.com</a>
              </p>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div 
          className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <p className="text-muted-gray/60 text-sm">
            © 2026 Henry Wilke. Alle Rechte vorbehalten.
          </p>
          <div className="flex items-center gap-6">
            <Link to="/impressum" className="text-muted-gray/60 text-sm hover:text-muted-gray transition-colors">
              Impressum
            </Link>
            <Link to="/datenschutz" className="text-muted-gray/60 text-sm hover:text-muted-gray transition-colors">
              Datenschutz
            </Link>
            <Link to="/agb" className="text-muted-gray/60 text-sm hover:text-muted-gray transition-colors">
              AGB
            </Link>
          </div>
        </motion.div>

        {/* Decorative Line */}
        <motion.div 
          className="mt-8 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 1 }}
        />
      </div>
    </footer>
  );
};

export default Footer;
