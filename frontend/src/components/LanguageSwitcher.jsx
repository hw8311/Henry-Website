import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Globe } from '@phosphor-icons/react';

const LanguageSwitcher = () => {
  const { language, toggleLanguage } = useLanguage();

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center gap-2 px-3 py-2 text-muted-gray hover:text-gold transition-colors duration-300 group"
      aria-label={language === 'de' ? 'Switch to English' : 'Zu Deutsch wechseln'}
      data-testid="language-switcher"
    >
      <Globe size={18} weight="light" className="group-hover:rotate-12 transition-transform" aria-hidden="true" />
      <span className="label-mono text-xs uppercase tracking-wider">
        {language === 'de' ? 'EN' : 'DE'}
      </span>
    </button>
  );
};

export default LanguageSwitcher;
