import React, { useEffect } from "react";
import { Toaster } from "sonner";
import Navigation from "./components/Navigation";
import HeroSection from "./components/HeroSection";
import PositioningSection from "./components/PositioningSection";
import DifferenceSection from "./components/DifferenceSection";
import WorkflowSection from "./components/WorkflowSection";
import AudienceSection from "./components/AudienceSection";
import StanceSection from "./components/StanceSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";

function App() {
  useEffect(() => {
    // Update document title
    document.title = "Henry Wilke | AI-Systemarchitekt";
  }, []);

  return (
    <div className="App bg-navy min-h-screen" data-testid="app-container">
      <Toaster 
        position="top-right"
        toastOptions={{
          style: {
            background: '#0F172A',
            border: '1px solid rgba(212, 175, 55, 0.3)',
            color: '#F8FAFC',
            fontFamily: 'Inter, sans-serif',
          },
        }}
      />
      <Navigation />
      <main>
        <HeroSection />
        <PositioningSection />
        <DifferenceSection />
        <WorkflowSection />
        <AudienceSection />
        <StanceSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}

export default App;
