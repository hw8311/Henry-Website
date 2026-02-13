import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "sonner";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import CookieConsent from "./components/CookieConsent";
import { pageview } from "./utils/analytics";

// Pages
import HomePage from "./pages/HomePage";
import LeistungenPage from "./pages/LeistungenPage";
import UeberPage from "./pages/UeberPage";
import AutomatisierungPage from "./pages/AutomatisierungPage";
import KontaktPage from "./pages/KontaktPage";
import ImpressumPage from "./pages/ImpressumPage";
import AGBPage from "./pages/AGBPage";
import DatenschutzPage from "./pages/DatenschutzPage";

// Scroll to top und Analytics tracking bei Route-Wechsel
const RouteChangeHandler = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll to top
    window.scrollTo(0, 0);
    
    // Analytics pageview tracken
    pageview(pathname);
  }, [pathname]);

  return null;
};

function App() {
  return (
    <HelmetProvider>
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
        <BrowserRouter>
          <RouteChangeHandler />
          <Navigation />
          <main className="pt-20">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/leistungen" element={<LeistungenPage />} />
              <Route path="/ueber" element={<UeberPage />} />
              <Route path="/automatisierung" element={<AutomatisierungPage />} />
              <Route path="/kontakt" element={<KontaktPage />} />
              <Route path="/impressum" element={<ImpressumPage />} />
              <Route path="/agb" element={<AGBPage />} />
              <Route path="/datenschutz" element={<DatenschutzPage />} />
            </Routes>
          </main>
          <Footer />
          <CookieConsent />
        </BrowserRouter>
      </div>
    </HelmetProvider>
  );
}

export default App;
