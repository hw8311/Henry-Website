import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { List, X } from '@phosphor-icons/react';
import content from '../data/content.json';

export const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        data-testid="main-navigation"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled 
            ? 'bg-navy/90 backdrop-blur-md border-b border-white/5' 
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <motion.button
              data-testid="nav-logo"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="font-display text-xl md:text-2xl text-offwhite hover:text-gold transition-colors cursor-pointer"
              whileHover={{ scale: 1.02 }}
            >
              Henry Wilke
            </motion.button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {content.navigation.links.map((link) => (
                <button
                  key={link.id}
                  data-testid={`nav-link-${link.id}`}
                  onClick={() => scrollToSection(link.id)}
                  className="label-mono text-muted-gray hover:text-gold transition-colors cursor-pointer"
                >
                  {link.label}
                </button>
              ))}
              <button
                data-testid="nav-cta-button"
                onClick={() => scrollToSection('kontakt')}
                className="btn-primary"
              >
                Kontakt
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              data-testid="mobile-menu-toggle"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-offwhite hover:text-gold transition-colors"
            >
              {isMobileMenuOpen ? <X size={28} weight="light" /> : <List size={28} weight="light" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            data-testid="mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-navy/98 backdrop-blur-lg md:hidden pt-24"
          >
            <div className="flex flex-col items-center gap-8 p-6">
              {content.navigation.links.map((link, index) => (
                <motion.button
                  key={link.id}
                  data-testid={`mobile-nav-link-${link.id}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => scrollToSection(link.id)}
                  className="font-display text-2xl text-offwhite hover:text-gold transition-colors"
                >
                  {link.label}
                </motion.button>
              ))}
              <motion.button
                data-testid="mobile-cta-button"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                onClick={() => scrollToSection('kontakt')}
                className="btn-primary mt-4"
              >
                Kontakt
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;
