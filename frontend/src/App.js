import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Toaster } from "sonner";
import { LanguageProvider, useLanguage } from "./context/LanguageContext";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import CookieConsent from "./components/CookieConsent";

// Pages
import HomePage from "./pages/HomePage";
import LeistungenPage from "./pages/LeistungenPage";
import UeberPage from "./pages/UeberPage";
import AutomatisierungPage from "./pages/AutomatisierungPage";
import KontaktPage from "./pages/KontaktPage";
import ReferenzenPage from "./pages/ReferenzenPage";
import BlogPage from "./pages/BlogPage";
import BlogProduktivitaet from "./pages/BlogProduktivitaet";
import BlogNeurodivergent from "./pages/BlogNeurodivergent";
import BlogKMU from "./pages/BlogKMU";
import BlogKIMittelstand from "./pages/BlogKIMittelstand";
import WhitepaperPage from "./pages/WhitepaperPage";
import ImpressumPage from "./pages/ImpressumPage";
import AGBPage from "./pages/AGBPage";
import DatenschutzPage from "./pages/DatenschutzPage";
import AdminPage from "./pages/AdminPage";
import FAQPage from "./pages/FAQPage";

const RouteChangeHandler = () => {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
};

function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </LanguageProvider>
  );
}

function AppContent() {
  const { language } = useLanguage();
  const { pathname } = useLocation();
  const isAdmin = pathname === '/admin';

  return (
    <div className="App min-h-screen relative z-[2]" data-testid="app-container">
      <a href="#main-content" className="skip-link">
        {language === 'de' ? 'Zum Hauptinhalt springen' : 'Skip to main content'}
      </a>
      
      <Toaster 
        position="top-right"
        toastOptions={{
          style: {
            background: '#3C3C40',
            border: '1px solid rgba(0, 229, 255, 0.2)',
            color: '#F4F4F5',
            fontFamily: 'Inter, sans-serif',
          },
        }}
      />
      
      <RouteChangeHandler />
      
      {!isAdmin && <Navigation />}
      
      <main id="main-content" className={isAdmin ? '' : 'pt-20'} role="main">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/leistungen" element={<LeistungenPage />} />
          <Route path="/ueber-mich" element={<UeberPage />} />
          <Route path="/ueber" element={<Navigate to="/ueber-mich" replace />} />
          <Route path="/automatisierung" element={<AutomatisierungPage />} />
          <Route path="/referenzen" element={<ReferenzenPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/ki-mittelstand-2026" element={<BlogKIMittelstand />} />
          <Route path="/blog/ki-automatisierung-kmu" element={<BlogKMU />} />
          <Route path="/blog/produktivitaet-ki-erkenntnisse" element={<BlogProduktivitaet />} />
          <Route path="/blog/neurodivergent-ki-partnerschaft" element={<BlogNeurodivergent />} />
          <Route path="/whitepaper" element={<WhitepaperPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/kontakt" element={<KontaktPage />} />
          <Route path="/impressum" element={<ImpressumPage />} />
          <Route path="/agb" element={<AGBPage />} />
          <Route path="/datenschutz" element={<DatenschutzPage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </main>
      
      {!isAdmin && <Footer />}
      {!isAdmin && <CookieConsent />}
    </div>
  );
}

export default App;
