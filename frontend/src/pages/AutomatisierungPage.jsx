import React from 'react';
import KIAutomationSection from '../components/KIAutomationSection';
import SEO, { seoData } from '../components/SEO';

const AutomatisierungPage = () => {
  return (
    <>
      <SEO {...seoData.automatisierung} />
      <KIAutomationSection />
    </>
  );
};

export default AutomatisierungPage;
