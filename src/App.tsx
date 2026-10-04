import { useState, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Layout/Navbar';
import { Footer } from './components/Layout/Footer';
import { Home } from './pages/Home';
import { TransitionProvider } from './contexts/TransitionContext';
import { YandexMetrika } from './components/YandexMetrika';
import { CookieBanner } from './components/CookieBanner';
import { FloatingContactWidget } from './components/FloatingContactWidget';

const CostModal = lazy(() => import('./components/CostModal').then(m => ({ default: m.CostModal })));
const Partners = lazy(() => import('./pages/Partners').then(m => ({ default: m.Partners })));
const Privacy = lazy(() => import('./pages/Privacy').then(m => ({ default: m.Privacy })));

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string | undefined>(undefined);

  const handleOpenCalculator = (serviceName?: string) => {
    setSelectedService(serviceName);
    setIsModalOpen(true);
  };

  const handleCloseCalculator = () => {
    setIsModalOpen(false);
  };

  return (
    <BrowserRouter>
      <YandexMetrika />
      <TransitionProvider>
        <div className="min-h-screen bg-[#FAF9F6] text-slate-900 selection:bg-brand-red selection:text-white overflow-x-hidden">
          {/* Navigation Bar */}
          <Navbar onOpenCalculator={() => handleOpenCalculator()} />
          
          <Suspense fallback={null}>
            <Routes>
              <Route path="/" element={<Home onOpenCalculator={handleOpenCalculator} />} />
              <Route path="/partners" element={<Partners />} />
              <Route path="/partners/" element={<Partners />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/privacy/" element={<Privacy />} />
            </Routes>
          </Suspense>
          
          {/* Footer Section */}
          <Footer />

          {/* Interactive Callback & Pricing Calculator Modal (Loaded on demand) */}
          {isModalOpen && (
            <Suspense fallback={null}>
              <CostModal 
                isOpen={isModalOpen} 
                onClose={handleCloseCalculator} 
                selectedService={selectedService} 
              />
            </Suspense>
          )}
          <CookieBanner />
          {/* Floating Contact Widget — always on top */}
          <FloatingContactWidget onOpenCalculator={handleOpenCalculator} />
        </div>
      </TransitionProvider>
    </BrowserRouter>
  );
}
