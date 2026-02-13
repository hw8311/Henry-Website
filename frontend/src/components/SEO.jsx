import { useEffect } from 'react';

// SEO-Daten für alle Seiten
export const seoData = {
  home: {
    title: 'Henry Wilke | AI-Systemarchitekt',
    description: 'Ich baue Systeme, die denken. Strategische KI-Implementierung und Systemdesign für skalierbare Organisationen.',
  },
  leistungen: {
    title: 'Leistungen | Henry Wilke',
    description: 'Strategische KI-Architektur, automatisierte Denkprozesse, Entscheidungsintelligenz und skalierbare Systemlogik.',
  },
  ueber: {
    title: 'Über mich | Henry Wilke',
    description: 'Henry Wilke – KI-Systemarchitekt mit technischem und kaufmännischem Hintergrund.',
  },
  automatisierung: {
    title: 'KI-Automatisierung erklärt | Henry Wilke',
    description: 'Was bedeutet KI-Automatisierung und warum wird sie strategisch relevant?',
  },
  kontakt: {
    title: 'Kontakt | Henry Wilke',
    description: 'Systemgespräch anfragen. Lassen Sie uns über Ihre Herausforderungen sprechen.',
  },
  impressum: {
    title: 'Impressum | Henry Wilke',
    description: 'Impressum und rechtliche Angaben gemäß § 5 TMG.',
  },
  agb: {
    title: 'AGB | Henry Wilke',
    description: 'Allgemeine Geschäftsbedingungen für Beratungs- und Umsetzungsleistungen.',
  },
  datenschutz: {
    title: 'Datenschutzerklärung | Henry Wilke',
    description: 'Datenschutzerklärung und Informationen zur Verarbeitung personenbezogener Daten.',
  },
};

// Hook für dynamische SEO
export const useSEO = (pageKey) => {
  useEffect(() => {
    const data = seoData[pageKey];
    if (data) {
      // Title setzen
      document.title = data.title;
      
      // Meta Description setzen
      let metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', data.description);
      }
      
      // Open Graph Title
      let ogTitle = document.querySelector('meta[property="og:title"]');
      if (ogTitle) {
        ogTitle.setAttribute('content', data.title);
      }
      
      // Open Graph Description
      let ogDescription = document.querySelector('meta[property="og:description"]');
      if (ogDescription) {
        ogDescription.setAttribute('content', data.description);
      }
    }
    
    // Cleanup
    return () => {
      document.title = 'Henry Wilke | AI-Systemarchitekt';
    };
  }, [pageKey]);
};

export default useSEO;
