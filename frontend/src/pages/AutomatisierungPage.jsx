import React from 'react';
import KIAutomationSection from '../components/KIAutomationSection';
import { useSEO } from '../components/SEO';

const AutomatisierungPage = () => {
  useSEO('automatisierung');
  
  return <KIAutomationSection />;
};

export default AutomatisierungPage;
