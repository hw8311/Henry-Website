import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Toaster } from "sonner";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";

// Pages
import HomePage from "./pages/HomePage";
import LeistungenPage from "./pages/LeistungenPage";
import UeberPage from "./pages/UeberPage";
import AutomatisierungPage from "./pages/AutomatisierungPage";
import KontaktPage from "./pages/KontaktPage";
import ImpressumPage from "./pages/ImpressumPage";
import AGBPage from "./pages/AGBPage";
import DatenschutzPage from "./pages/DatenschutzPage";

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

function App() {
  useEffect(() => {
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
      <BrowserRouter>
        <ScrollToTop />
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
      </BrowserRouter>
    </div>
  );
}

export default App;
