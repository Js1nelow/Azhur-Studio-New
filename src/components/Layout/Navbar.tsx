import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useTransition } from '../../contexts/TransitionContext';
import { Logo } from '../Logo';

interface NavbarProps {
  onOpenCalculator: (service?: string) => void;
}

export function Navbar({ onOpenCalculator }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('hero');
  const location = useLocation();
  const { navigateWithTransition } = useTransition();

  useEffect(() => {
    if (location.pathname !== '/') return;
    const sections = ['hero', 'works', 'services', 'process', 'reviews', 'about', 'faq', 'contact'];
    
    const observerOptions = {
      root: null,
      rootMargin: '-40% 0px -50% 0px', // Triggers when section is comfortably in the viewport center
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      sections.forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (location.pathname !== '/') {
      setIsOpen(false);
      return; // Let react-router handle the navigation to /#id
    }
    e.preventDefault();
    setIsOpen(false);
    const targetElement = document.querySelector(href);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const navLinks = [
    { href: '#works', id: 'works', label: 'Портфолио' },
    { href: '#services', id: 'services', label: 'Услуги' },
    { href: '#process', id: 'process', label: 'Этапы работы' },
    { href: '#reviews', id: 'reviews', label: 'Отзывы' },
    { href: '#about', id: 'about', label: 'О нас' },
    { href: '#faq', id: 'faq', label: 'FAQ' },
    { href: '#contact', id: 'contact', label: 'Контакты' },
  ];

  return (
    <motion.header 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-[#FAF9F6]/90 backdrop-blur-md border-b border-stone-200/80 shadow-[0_2px_10px_rgba(0,0,0,0.02)]"
    >
      <div className="max-w-[1440px] mx-auto px-6 h-20 flex items-center justify-between w-full">
        {/* Left Side: Logo */}
        <div className="flex items-center">
          <Link 
            to="/#hero" 
            onClick={(e) => handleLinkClick(e, '#hero')} 
          >
            <Logo variant="gap" />
          </Link>
        </div>

        {/* Right Side: Desktop Nav links & Estimate CTAs */}
        <div className="hidden md:flex items-center justify-center">
          <nav className="flex items-center gap-5 lg:gap-7 text-xs uppercase tracking-wider">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={`/${link.href}`}
                onClick={(e) => handleLinkClick(e, link.href)}
                className={`transition-colors duration-200 relative py-1.5 font-medium ${
                  activeSection === link.id
                    ? 'text-brand-red font-semibold'
                    : 'text-gray-600 hover:text-gray-950'
                }`}
              >
                {link.label}
                {activeSection === link.id && (
                  <motion.span
                    layoutId="activeIndicator"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-brand-red rounded-full"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            ))}
            <Link
              to="/partners"
              className={`transition-colors duration-200 relative py-1.5 font-medium ${
                location.pathname === '/partners'
                  ? 'text-brand-red font-semibold'
                  : 'text-gray-600 hover:text-gray-950'
              }`}
            >
              Партнёрам
            </Link>
          </nav>
        </div>

        {/* Right Side: Estimate CTAs */}
        <div className="flex items-center justify-end gap-3 lg:gap-4">
          {/* Price indicator in main menu */}
          <div className="hidden lg:flex flex-col items-end text-right justify-center">
            <span className="text-[11px] font-bold text-brand-red tracking-wider uppercase whitespace-nowrap">от 990 ₽/м²</span>
            <span className="text-[10px] text-gray-500 font-medium whitespace-nowrap">монтаж за 1 день</span>
          </div>

          {/* Calculate Button (Only visible on sm+) */}
          <button
            onClick={() => onOpenCalculator()}
            className="hidden sm:block bg-brand-red hover:bg-brand-red-hover text-white px-5 py-2.5 text-xs uppercase tracking-wider transition-all cursor-pointer font-semibold rounded-lg shadow-sm hover:shadow-md"
          >
            Рассчитать смету
          </button>
          
          {/* Mobile Menu Trigger */}
          <button 
            className="relative z-[60] text-gray-900 p-2 -mr-2 group hover:text-brand-red transition-colors md:hidden cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} strokeWidth={1.5} /> : <Menu size={24} strokeWidth={1.5} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 bg-[#FAF9F6] z-50 flex flex-col pt-24 pb-12 px-6 min-h-screen border-b border-stone-200"
          >
            <nav className="flex flex-col items-center justify-center gap-5 font-sans text-sm md:text-base uppercase tracking-wider font-semibold text-gray-800 text-center flex-1">
              <Link 
                to="/#hero" 
                onClick={(e) => handleLinkClick(e, '#hero')} 
                className={`transition-colors duration-300 ${
                  activeSection === 'hero' ? 'text-brand-red' : 'hover:text-brand-red'
                }`}
              >
                Главная
              </Link>
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={`/${link.href}`}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className={`transition-colors duration-300 ${
                    activeSection === link.id ? 'text-brand-red' : 'hover:text-brand-red'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                to="/partners"
                onClick={() => setIsOpen(false)}
                className={`transition-colors duration-300 ${
                  location.pathname === '/partners' ? 'text-brand-red' : 'hover:text-brand-red'
                }`}
              >
                Партнёрам и дизайнерам
              </Link>
            </nav>

            <div className="flex flex-col items-center gap-5 w-full max-w-sm mx-auto shrink-0 mt-8">
              <div className="text-center">
                <div className="text-xs font-bold text-brand-red uppercase tracking-wider">от 990 ₽/м² с монтажом</div>
                <div className="text-[11px] text-gray-500 mt-0.5">Фиксированная смета в договоре</div>
              </div>

              <div className="w-full">
                <button
                  onClick={() => {
                    setIsOpen(false);
                    onOpenCalculator();
                  }}
                  className="w-full bg-brand-red hover:bg-brand-red-hover text-white text-xs uppercase tracking-wider py-3.5 rounded-xl font-bold transition-all cursor-pointer text-center shadow-sm"
                >
                  Рассчитать смету
                </button>
              </div>
              <div className="text-xs text-gray-500">
                <div>АЖУР СТУДИЯ • МОСКВА И МО</div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
