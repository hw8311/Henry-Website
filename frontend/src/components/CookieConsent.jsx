import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Cookie } from '@phosphor-icons/react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const CONSENT_KEY = 'cookie_consent';

export const CookieConsent = () => {
  const [showBanner, setShowBanner] = useState(false);
  const { language } = useLanguage();

  useEffect(() => {
    const consent = localStorage.getItem(CONSENT_KEY);
    if (!consent) {
      const timer = setTimeout(() => setShowBanner(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptAll = () => {
    localStorage.setItem(CONSENT_KEY, JSON.stringify({
      essential: true,
      analytics: true,
      timestamp: new Date().toISOString()
    }));
    setShowBanner(false);
    if (window.gtag) {
      window.gtag('consent', 'update', {
        'analytics_storage': 'granted'
      });
    }
  };

  const acceptEssential = () => {
    localStorage.setItem(CONSENT_KEY, JSON.stringify({
      essential: true,
      analytics: false,
      timestamp: new Date().toISOString()
    }));
    setShowBanner(false);
  };

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6"
          data-testid="cookie-consent-banner"
        >
          <div className="max-w-4xl mx-auto bg-navy-light border border-white/10 p-6 md:p-8 shadow-2xl">
            {/* Close Button */}
            <button
              onClick={acceptEssential}
              className="absolute top-4 right-4 text-muted-gray hover:text-offwhite transition-colors"
              aria-label={language === 'de' ? 'Schließen' : 'Close'}
            >
              <X size={20} weight="light" />
            </button>

            <div className="flex flex-col md:flex-row md:items-start gap-6">
              {/* Icon */}
              <div className="hidden md:flex w-12 h-12 items-center justify-center bg-gold/10 flex-shrink-0">
                <Cookie size={24} weight="light" className="text-gold" />
              </div>

              {/* Content */}
              <div className="flex-1">
                <h3 className="font-display text-xl text-offwhite mb-3">
                  {language === 'de' ? 'Cookie-Einstellungen' : 'Cookie Settings'}
                </h3>
                <p className="text-muted-gray text-sm leading-relaxed mb-4">
                  {language === 'de' 
                    ? 'Diese Website verwendet Cookies, um Ihnen das beste Erlebnis zu bieten. Essenzielle Cookies sind für die Grundfunktionen erforderlich. Analyse-Cookies helfen uns, die Website zu verbessern. '
                    : 'This website uses cookies to provide you with the best experience. Essential cookies are required for basic functions. Analytics cookies help us improve the website. '}
                  <Link to="/datenschutz" className="text-gold hover:text-gold-light transition-colors">
                    {language === 'de' ? 'Mehr erfahren' : 'Learn more'}
                  </Link>
                </p>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={acceptAll}
                    className="btn-primary text-sm py-3"
                    data-testid="cookie-accept-all"
                  >
                    {language === 'de' ? 'Alle akzeptieren' : 'Accept all'}
                  </button>
                  <button
                    onClick={acceptEssential}
                    className="btn-secondary text-sm py-3"
                    data-testid="cookie-accept-essential"
                  >
                    {language === 'de' ? 'Nur essenzielle' : 'Essential only'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Hilfsfunktion um Consent-Status zu prüfen
export const getConsentStatus = () => {
  try {
    const consent = localStorage.getItem(CONSENT_KEY);
    if (consent) {
      return JSON.parse(consent);
    }
  } catch (e) {
    console.error('Error reading consent:', e);
  }
  return null;
};

// Hilfsfunktion um zu prüfen ob Analytics erlaubt ist
export const isAnalyticsAllowed = () => {
  const consent = getConsentStatus();
  return consent?.analytics === true;
};

export default CookieConsent;
