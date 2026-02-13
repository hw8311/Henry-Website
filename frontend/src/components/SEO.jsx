import React from 'react';
import { Helmet } from 'react-helmet-async';

const siteConfig = {
  siteName: 'Henry Wilke | AI-Systemarchitekt',
  siteUrl: 'https://henrywilke.de', // Anpassen wenn Domain bekannt
  defaultImage: 'https://customer-assets.emergentagent.com/job_ai-systems-henry/artifacts/4tf3zkmz_file_000000005b706246860393db18f7484a~7.png',
  defaultDescription: 'Ich baue Systeme, die denken. Strategische KI-Implementierung und Systemdesign für skalierbare Organisationen.',
  twitterHandle: '@henrywilke', // Anpassen
  locale: 'de_DE',
};

export const SEO = ({ 
  title, 
  description, 
  path = '',
  image,
  type = 'website',
  noIndex = false 
}) => {
  const fullTitle = title 
    ? `${title} | Henry Wilke` 
    : 'Henry Wilke | AI-Systemarchitekt';
  
  const fullUrl = `${siteConfig.siteUrl}${path}`;
  const imageUrl = image || siteConfig.defaultImage;
  const metaDescription = description || siteConfig.defaultDescription;

  return (
    <Helmet>
      {/* Basis Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={metaDescription} />
      <link rel="canonical" href={fullUrl} />
      
      {/* Robots */}
      {noIndex && <meta name="robots" content="noindex, nofollow" />}
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:locale" content={siteConfig.locale} />
      <meta property="og:site_name" content={siteConfig.siteName} />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={fullUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
      
      {/* Zusätzliche SEO Tags */}
      <meta name="author" content="Henry Wilke" />
      <meta name="language" content="de" />
    </Helmet>
  );
};

// Vordefinierte SEO-Daten für alle Seiten
export const seoData = {
  home: {
    title: null, // Nutzt Standard-Titel
    description: 'Ich baue Systeme, die denken. Strategische KI-Implementierung und Systemdesign für skalierbare Organisationen. Keine Tools, kein Hype – sondern durchdachte KI-Architektur.',
    path: '/',
  },
  leistungen: {
    title: 'Leistungen',
    description: 'Strategische KI-Architektur, automatisierte Denkprozesse, Entscheidungsintelligenz und skalierbare Systemlogik. Vom Systemmodell bis zur Integration.',
    path: '/leistungen',
  },
  ueber: {
    title: 'Über mich',
    description: 'Henry Wilke – KI-Systemarchitekt mit technischem und kaufmännischem Hintergrund. Ich denke in Prozessen und formuliere in einer Klarheit, die maschinenlesbar wird.',
    path: '/ueber',
  },
  automatisierung: {
    title: 'KI-Automatisierung erklärt',
    description: 'Was bedeutet KI-Automatisierung und warum wird sie strategisch relevant? Grundlagen, Anwendungsfelder und konkrete Vorteile für Unternehmen.',
    path: '/automatisierung',
  },
  kontakt: {
    title: 'Kontakt',
    description: 'Systemgespräch anfragen. Lassen Sie uns über Ihre Herausforderungen sprechen und wie durchdachte KI-Architektur sie lösen kann.',
    path: '/kontakt',
  },
  impressum: {
    title: 'Impressum',
    description: 'Impressum und rechtliche Angaben gemäß § 5 TMG für Henry Wilke, AI-Systemarchitekt.',
    path: '/impressum',
    noIndex: true,
  },
  agb: {
    title: 'AGB',
    description: 'Allgemeine Geschäftsbedingungen für Beratungs- und Umsetzungsleistungen im Bereich KI-Automatisierung.',
    path: '/agb',
    noIndex: true,
  },
  datenschutz: {
    title: 'Datenschutzerklärung',
    description: 'Datenschutzerklärung und Informationen zur Verarbeitung personenbezogener Daten.',
    path: '/datenschutz',
    noIndex: true,
  },
};

export default SEO;
