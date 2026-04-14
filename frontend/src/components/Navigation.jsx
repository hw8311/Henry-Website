import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { List, X, InstagramLogo, LinkedinLogo } from '@phosphor-icons/react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';

const navLinks = [
  { path: '/', labelDe: 'Start', labelEn: 'Home' },
  { path: '/leistungen', labelDe: 'Leistungen', labelEn: 'Services' },
  { path: '/referenzen', labelDe: 'Referenzen', labelEn: 'Portfolio' },
  { path: '/blog', labelDe: 'Blog', labelEn: 'Blog' },
  { path: '/ueber', labelDe: 'Über mich', labelEn: 'About' },
  { path: '/automatisierung', labelDe: 'Automatisierung', labelEn: 'Automation' },
];

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

export const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { language } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <>
      <motion.nav
        data-testid="main-navigation"
        role="navigation"
        aria-label="Hauptnavigation"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled 
            ? 'glass' 
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link
              to="/"
              data-testid="nav-logo"
              className="font-display text-xl md:text-2xl text-offwhite hover:text-gold transition-colors"
            >
              Henry Wilke
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  data-testid={`nav-link-${link.path.replace('/', '') || 'home'}`}
                  className={`label-mono transition-colors ${
                    location.pathname === link.path 
                      ? 'text-gold' 
                      : 'text-muted-gray hover:text-gold'
                  }`}
                >
                  {language === 'de' ? link.labelDe : link.labelEn}
                </Link>
              ))}
              
              {/* Social Media Icons */}
              <div className="flex items-center gap-1">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 text-muted-gray hover:text-gold transition-colors"
                      aria-label={social.name}
                      data-testid={`social-${social.name.toLowerCase()}`}
                    >
                      <Icon size={20} weight="regular" />
                    </a>
                  );
                })}
              </div>
              
              <LanguageSwitcher />
              <Link
                to="/kontakt"
                data-testid="nav-cta-button"
                className="btn-primary"
              >
                {language === 'de' ? 'Kontakt' : 'Contact'}
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              data-testid="mobile-menu-toggle"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-offwhite hover:text-gold transition-colors focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 focus:ring-offset-navy"
              aria-label={isMobileMenuOpen ? 'Menü schließen' : 'Menü öffnen'}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
            >
              {isMobileMenuOpen ? <X size={28} weight="light" aria-hidden="true" /> : <List size={28} weight="light" aria-hidden="true" />}
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-menu"
            data-testid="mobile-menu"
            role="navigation"
            aria-label="Mobile Navigation"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-lg md:hidden pt-24"
          >
            <div className="flex flex-col items-center gap-8 p-6">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    to={link.path}
                    data-testid={`mobile-nav-link-${link.path.replace('/', '') || 'home'}`}
                    className={`font-display text-2xl transition-colors ${
                      location.pathname === link.path 
                        ? 'text-gold' 
                        : 'text-offwhite hover:text-gold'
                    }`}
                  >
                    {language === 'de' ? link.labelDe : link.labelEn}
                  </Link>
                </motion.div>
              ))}
              
              {/* Social Media Icons - Mobile */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex items-center gap-6 mt-4"
              >
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 text-muted-gray hover:text-gold transition-colors border border-white/10 hover:border-gold/30"
                      aria-label={social.name}
                    >
                      <Icon size={28} weight="regular" />
                    </a>
                  );
                })}
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="mt-2"
              >
                <LanguageSwitcher />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                <Link
                  to="/kontakt"
                  data-testid="mobile-cta-button"
                  className="btn-primary mt-4"
                >
                  {language === 'de' ? 'Kontakt' : 'Contact'}
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;
