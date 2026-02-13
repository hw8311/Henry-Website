// Google Analytics / Tracking Konfiguration
// ==========================================
// WICHTIG: Ersetzen Sie 'G-XXXXXXXXXX' mit Ihrer echten Google Analytics ID
// 
// So erhalten Sie eine Google Analytics ID:
// 1. Gehen Sie zu https://analytics.google.com
// 2. Erstellen Sie ein neues Property
// 3. Wählen Sie "Web" als Plattform
// 4. Kopieren Sie die Mess-ID (beginnt mit "G-")

export const GA_TRACKING_ID = 'G-XXXXXXXXXX'; // <-- Hier Ihre ID eintragen

// Prüfen ob Analytics aktiviert ist
export const isAnalyticsEnabled = () => {
  // Nur aktivieren wenn echte ID eingetragen und Consent gegeben
  if (GA_TRACKING_ID === 'G-XXXXXXXXXX') {
    return false;
  }
  
  try {
    const consent = localStorage.getItem('cookie_consent');
    if (consent) {
      const { analytics } = JSON.parse(consent);
      return analytics === true;
    }
  } catch (e) {
    console.error('Error checking analytics consent:', e);
  }
  return false;
};

// Page View tracken
export const pageview = (url) => {
  if (!isAnalyticsEnabled()) return;
  
  if (window.gtag) {
    window.gtag('config', GA_TRACKING_ID, {
      page_path: url,
    });
  }
};

// Event tracken
export const event = ({ action, category, label, value }) => {
  if (!isAnalyticsEnabled()) return;
  
  if (window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Vordefinierte Events
export const trackEvents = {
  // Kontaktformular
  contactFormSubmit: () => event({
    action: 'submit',
    category: 'contact_form',
    label: 'Kontaktanfrage gesendet',
  }),
  
  // CTA Clicks
  ctaClick: (ctaName) => event({
    action: 'click',
    category: 'cta',
    label: ctaName,
  }),
  
  // Navigation
  navigationClick: (pageName) => event({
    action: 'click',
    category: 'navigation',
    label: pageName,
  }),
  
  // Scroll Depth (optional)
  scrollDepth: (percentage) => event({
    action: 'scroll',
    category: 'engagement',
    label: `${percentage}%`,
    value: percentage,
  }),
};

export default {
  GA_TRACKING_ID,
  isAnalyticsEnabled,
  pageview,
  event,
  trackEvents,
};
