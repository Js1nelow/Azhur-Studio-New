import { motion } from 'motion/react';
import { Calculator, MessageSquare } from 'lucide-react';
import { reachMetrikaGoal } from './YandexMetrika';

interface HeroBlockProps {
  onOpenCalculator: (service?: string) => void;
}

export function HeroBlock({ onOpenCalculator }: HeroBlockProps) {
  const trustPoints = [
    "Монтаж от 4 часов без пыли",
    "Гарантия 10 лет по договору",
    "Фиксированная смета без доплат",
    "Экологичные полотна без запаха"
  ];

  const handleWhatsAppClick = () => {
    reachMetrikaGoal('contact_whatsapp');
    window.open('https://wa.me/79253131799?text=' + encodeURIComponent('Здравствуйте! Хочу узнать стоимость натяжного потолка.'), '_blank');
  };

  return (
    <section id="hero" className="relative min-h-[88svh] flex items-center bg-white pt-24 pb-16 lg:pt-32 lg:pb-20 border-b border-gray-200 overflow-hidden">
      <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Offer & Conversion Stack */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            
            {/* Main Conversion Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-extrabold leading-[1.12] tracking-tight text-gray-950 mb-5"
            >
              Натяжные потолки от <span className="text-brand-red">790 ₽/м²</span> с чистым монтажом за 1 день
            </motion.h1>

            {/* Subhead / Guarantee */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-gray-700 text-base sm:text-lg leading-relaxed max-w-2xl mb-6 font-normal"
            >
              Фиксируем точную смету в договоре до начала работ. Никаких доплат после монтажа. Безопасные полимерные баллоны, полотна без запаха и аккуратная работа без пыли.
            </motion.p>

            {/* Mobile-Only Master Photo */}
            <div className="block md:hidden mb-6">
              <div className="relative rounded-xl overflow-hidden border border-gray-300 shadow-md bg-white">
                <img
                  src="/azhur/photo/hero.webp"
                  alt="Ведущий мастер Олег Мисягин"
                  className="w-full aspect-[4/3] object-cover"
                />
                <div className="p-4 bg-white border-t border-gray-200 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-gray-950 text-sm">Олег Мисягин</div>
                    <div className="text-xs text-gray-600">Ведущий мастер • Контроль смет и монтажа</div>
                  </div>
                  <div className="text-xs font-semibold px-2.5 py-1 rounded bg-orange-50 text-brand-red border border-orange-200">
                    Опыт 17 лет
                  </div>
                </div>
              </div>
            </div>

            {/* Clean Trust Strip (No bulky cards, no orange number tags) */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-wrap items-center gap-x-5 gap-y-2.5 mb-8 text-xs sm:text-sm text-gray-700"
            >
              {trustPoints.map((point, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-red shrink-0" />
                  <span className="font-medium">{point}</span>
                </div>
              ))}
            </motion.div>

            {/* CTA Action Buttons: Perfectly aligned, equal height (h-14), single line */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 max-w-xl"
            >
              <button
                type="button"
                onClick={() => onOpenCalculator('Натяжные потолки')}
                className="flex-1 h-14 bg-brand-red hover:bg-brand-red-hover text-white font-semibold text-sm sm:text-base px-6 rounded-xl shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2.5 cursor-pointer whitespace-nowrap"
              >
                <Calculator className="w-5 h-5 shrink-0" />
                <span>Рассчитать смету</span>
              </button>

              <button
                type="button"
                onClick={handleWhatsAppClick}
                className="flex-1 h-14 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm sm:text-base px-6 rounded-xl shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2.5 cursor-pointer whitespace-nowrap"
              >
                <MessageSquare className="w-5 h-5 shrink-0" />
                <span>Написать в WhatsApp</span>
              </button>
            </motion.div>

          </div>

          {/* Right Column: Master Photo (Desktop) */}
          <div className="hidden md:flex lg:col-span-5 justify-center items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="relative w-full max-w-[420px]"
            >
              <div className="relative rounded-xl overflow-hidden border border-gray-300 bg-white shadow-lg">
                <img
                  src="/azhur/photo/hero.webp"
                  alt="Олег Мисягин — ведущий специалист"
                  className="w-full aspect-[4/5] object-cover object-top"
                  loading="eager"
                />
                
                {/* Clean master badge */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md border border-gray-200 p-4 rounded-lg shadow-md">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-extrabold text-gray-950 text-base">Олег Мисягин</span>
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-orange-50 text-brand-red border border-orange-200 uppercase tracking-wider">
                      Опыт 17 лет
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 leading-snug">
                    Ведущий мастер студии «Ажур». Лично выезжает на замеры и отвечает за каждый объект по договору.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
