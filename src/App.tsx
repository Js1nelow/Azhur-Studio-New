import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Layout/Navbar';
import { Footer } from './components/Layout/Footer';
import { CostModal } from './components/CostModal';
import { Home } from './pages/Home';
import { Partners } from './pages/Partners';
import { TransitionProvider } from './contexts/TransitionContext';
import { YandexMetrika } from './components/YandexMetrika';
import { CookieBanner } from './components/CookieBanner';
import { Privacy } from './pages/Privacy';
import { FloatingContactWidget } from './components/FloatingContactWidget';

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
        <div className="min-h-screen bg-brand-black text-brand-light selection:bg-brand-red selection:text-white overflow-x-hidden">
          {/* Navigation Bar */}
          <Navbar onOpenCalculator={() => handleOpenCalculator()} />
          
          <Routes>
            <Route path="/" element={<Home onOpenCalculator={handleOpenCalculator} />} />
            <Route path="/partners" element={<Partners />} />
            <Route path="/privacy/" element={<Privacy />} />
          </Routes>
          
          {/* Footer Section */}
          <Footer />

          {/* Interactive Callback & Pricing Calculator Modal */}
          <CostModal 
            isOpen={isModalOpen} 
            onClose={handleCloseCalculator} 
            selectedService={selectedService} 
          />
          <CookieBanner />
          {/* Floating Contact Widget — always on top */}
          <FloatingContactWidget />
        </div>
      </TransitionProvider>
    </BrowserRouter>
  );
}
