import { useEffect, ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import { Navbar } from '../components/Layout/Navbar';
import { HeroBlock } from '../components/HeroBlock';
import { WorksBento } from '../components/WorksBento';
import { ServicesBlock } from '../components/ServicesBlock';
import { ReviewsBlock } from '../components/ReviewsBlock';
import { DreamCeilingBlock } from '../components/DreamCeilingBlock';
import { AboutBlock } from '../components/AboutBlock';
import { PartnersCtaBlock } from '../components/PartnersCtaBlock';
import { FaqBlock } from '../components/FaqBlock';
import { ContactFormBlock } from '../components/ContactFormBlock';

interface HomeProps {
  onOpenCalculator: (serviceName?: string) => void;
}

function FadeIn({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function Home({ onOpenCalculator }: HomeProps) {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash;
      const element = document.querySelector(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }
  }, [location]);

  return (
    <>
      <HeroBlock onOpenCalculator={onOpenCalculator} />
      <FadeIn>
        <WorksBento onOpenCalculator={onOpenCalculator} />
      </FadeIn>
      <FadeIn>
        <ServicesBlock onOpenCalculator={onOpenCalculator} />
      </FadeIn>
      <FadeIn>
        <DreamCeilingBlock onOpenCalculator={onOpenCalculator} />
      </FadeIn>
      <FadeIn>
        <ReviewsBlock />
      </FadeIn>
      <FadeIn>
        <AboutBlock />
      </FadeIn>
      <FadeIn>
        <PartnersCtaBlock />
      </FadeIn>
      <FadeIn>
        <FaqBlock />
      </FadeIn>
      <FadeIn>
        <ContactFormBlock />
      </FadeIn>
    </>
  );
}
