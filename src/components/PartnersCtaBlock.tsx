import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight, Briefcase } from 'lucide-react';
import { useTransition } from '../contexts/TransitionContext';

export function PartnersCtaBlock() {
  const { navigateWithTransition } = useTransition();

  return (
    <section className="relative py-16 md:py-24 bg-[#F5F4F0] border-t border-stone-200/80 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.6 }}
          className="relative bg-white border border-stone-200/90 rounded-3xl p-8 sm:p-12 md:p-16 shadow-xs overflow-hidden"
        >
          {/* Subtle warm decorative glow */}
          <div className="absolute -right-24 -top-24 w-96 h-96 bg-brand-red/5 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl flex flex-col items-start">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-orange-50 border border-orange-200/70 rounded-full mb-6">
              <Briefcase className="w-3.5 h-3.5 text-brand-red" />
              <span className="font-mono text-xs uppercase tracking-wider font-bold text-brand-red">Для партнёров и дизайнеров</span>
            </div>
            
            <h2 className="font-sans font-extrabold text-2xl sm:text-3xl md:text-4xl text-gray-950 tracking-tight mb-4">
              Надёжный партнёр для <span className="text-brand-red">ваших дизайн-проектов</span>
            </h2>
            
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-8 max-w-2xl">
              Предлагаем специальные партнерские условия для дизайнеров интерьера, архитекторов и руководителей строительных проектов. 
              Берём на себя сложные инженерные узлы, теневые примыкания EuroKraab, трековое освещение и сдаём объекты точно в срок с гарантией 10 лет.
            </p>
            
            <button
              onClick={() => navigateWithTransition('/partners', 'ПАРТНЕРЫ')}
              className="inline-flex items-center justify-center gap-2 bg-brand-red hover:bg-brand-red-hover text-white px-8 py-3.5 rounded-xl font-sans text-xs uppercase tracking-wider font-bold transition-all shadow-sm group cursor-pointer"
            >
              <span>Узнать условия для дизайнеров</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
