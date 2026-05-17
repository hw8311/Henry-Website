import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { InstagramLogo, LinkedinLogo } from '@phosphor-icons/react';
import { useLanguage } from '../context/LanguageContext';

const socialLinks = [
  { 
    name: 'Instagram', 
    url: 'https://www.instagram.com/tbs.olutions?igsh=bGw0NTY1eXc2MWN2',
    icon: InstagramLogo
  },
  { 
    name: 'LinkedIn', 
    url: 'https://www.linkedin.com/in/henry-wilke-776839369',
    icon: LinkedinLogo
  }
];

export const Footer = () => {
  const { language } = useLanguage();
  
  return (
    <footer 
      data-testid="footer"
      role="contentinfo"
      aria-label={language === 'de' ? 'Fußbereich' : 'Footer'}
      className="relative py-16 border-t border-white/5"
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
              {language === 'de' ? 'AI-Systemarchitekt' : 'AI System Architect'}
            </p>
            <p className="text-muted-gray text-sm mt-4 max-w-xs">
              {language === 'de' 
                ? 'Strategische KI-Implementierung und Systemdesign für skalierbare Organisationen.'
                : 'Strategic AI implementation and system design for scalable organizations.'}
            </p>
            
            {/* Social Media Links */}
            <div className="flex items-center gap-3 mt-6">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 bg-white/5 border border-white/10 text-muted-gray hover:text-gold hover:border-gold/30 transition-all duration-300"
                    aria-label={social.name}
                    data-testid={`footer-social-${social.name.toLowerCase()}`}
                  >
                    <Icon size={20} weight="regular" />
                  </a>
                );
              })}
            </div>
          </motion.div>

          {/* Navigation */}
          <motion.nav 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            aria-label="Footer Navigation"
          >
            <h3 className="label-mono text-gold mb-4">{language === 'de' ? 'Navigation' : 'Navigation'}</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-muted-gray hover:text-offwhite transition-colors">
                  {language === 'de' ? 'Start' : 'Home'}
                </Link>
              </li>
              <li>
                <Link to="/leistungen" className="text-muted-gray hover:text-offwhite transition-colors">
                  {language === 'de' ? 'Leistungen' : 'Services'}
                </Link>
              </li>
              <li>
                <Link to="/referenzen" className="text-muted-gray hover:text-offwhite transition-colors">
                  {language === 'de' ? 'Referenzen' : 'Portfolio'}
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-muted-gray hover:text-offwhite transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/ueber" className="text-muted-gray hover:text-offwhite transition-colors">
                  {language === 'de' ? 'Über mich' : 'About'}
                </Link>
              </li>
              <li>
                <Link to="/automatisierung" className="text-muted-gray hover:text-offwhite transition-colors">
                  {language === 'de' ? 'Automatisierung erklärt' : 'Automation explained'}
                </Link>
              </li>
              <li>
                <Link to="/kontakt" className="text-muted-gray hover:text-offwhite transition-colors">
                  {language === 'de' ? 'Kontakt' : 'Contact'}
                </Link>
              </li>
              <li>
                <Link to="/whitepaper" className="text-gold hover:text-gold-light transition-colors">
                  {language === 'de' ? 'Whitepaper' : 'Whitepaper'}
                </Link>
              </li>
            </ul>
          </motion.nav>

          {/* Legal */}
          <motion.nav 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            aria-label={language === 'de' ? 'Rechtliche Informationen' : 'Legal Information'}
          >
            <h3 className="label-mono text-gold mb-4">{language === 'de' ? 'Rechtliches' : 'Legal'}</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/impressum" className="text-muted-gray hover:text-offwhite transition-colors">
                  {language === 'de' ? 'Impressum' : 'Imprint'}
                </Link>
              </li>
              <li>
                <Link to="/agb" className="text-muted-gray hover:text-offwhite transition-colors">
                  {language === 'de' ? 'AGB' : 'Terms'}
                </Link>
              </li>
              <li>
                <Link to="/datenschutz" className="text-muted-gray hover:text-offwhite transition-colors">
                  {language === 'de' ? 'Datenschutzerklärung' : 'Privacy Policy'}
                </Link>
              </li>
            </ul>
            
            <div className="mt-6 pt-6 border-t border-white/5">
              <p className="text-muted-gray text-sm">
                {language === 'de' ? 'E-Mail: ' : 'Email: '}
                <a href="mailto:info@wilke-solutions.com" className="text-gold hover:text-gold-light transition-colors" aria-label={language === 'de' ? 'E-Mail an Henry Wilke senden' : 'Send email to Henry Wilke'}>
                  info@wilke-solutions.com
                </a>
              </p>
            </div>
          </motion.nav>
        </div>

        {/* Bottom Bar */}
        <motion.div 
          className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <p className="text-muted-gray/60 text-sm">
            © 2026 Henry Wilke. {language === 'de' ? 'Alle Rechte vorbehalten.' : 'All rights reserved.'}
          </p>
          <div className="flex items-center gap-6">
            <Link to="/impressum" className="text-muted-gray/60 text-sm hover:text-muted-gray transition-colors">
              {language === 'de' ? 'Impressum' : 'Imprint'}
            </Link>
            <Link to="/datenschutz" className="text-muted-gray/60 text-sm hover:text-muted-gray transition-colors">
              {language === 'de' ? 'Datenschutz' : 'Privacy'}
            </Link>
            <Link to="/agb" className="text-muted-gray/60 text-sm hover:text-muted-gray transition-colors">
              {language === 'de' ? 'AGB' : 'Terms'}
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
