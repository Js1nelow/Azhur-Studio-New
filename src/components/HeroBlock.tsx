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
    <section id="hero" className="relative min-h-[90svh] flex items-center bg-[#FAF9F6] pt-24 pb-16 lg:pt-32 lg:pb-20 border-b border-stone-200/80 overflow-hidden">
      
      {/* Ambient Indirect Light Glow (3000K warm interior illumination) */}
      <div className="absolute -top-32 right-[-5%] w-[680px] h-[680px] bg-gradient-to-br from-amber-200/40 via-orange-100/25 to-transparent blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute -bottom-24 -left-16 w-[520px] h-[520px] bg-gradient-to-tr from-orange-200/30 via-amber-100/20 to-transparent blur-[120px] rounded-full pointer-events-none" />
      
      {/* Subtle recessed ceiling light datum line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-brand-red/35 to-transparent pointer-events-none" />

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
              className="text-gray-700 text-base sm:text-lg leading-relaxed max-w-2xl mb-7 font-normal"
            >
              Фиксируем точную смету в договоре до начала работ. Никаких доплат после монтажа. Безопасные полимерные баллоны, полотна без запаха и аккуратная работа без пыли.
            </motion.p>

            {/* Mobile-Only Master Photo */}
            <div className="block md:hidden mb-6">
              <div className="relative rounded-2xl overflow-hidden border border-stone-200/80 shadow-[0_12px_30px_rgba(0,0,0,0.06)] bg-white">
                <img
                  src="/azhur/photo/hero.webp"
                  alt="Ведущий мастер Олег Мисягин"
                  className="w-full aspect-[4/3] object-cover"
                />
                <div className="p-4 bg-white/95 backdrop-blur-xs border-t border-stone-200 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-gray-950 text-sm">Олег Мисягин</div>
                    <div className="text-xs text-gray-600">Ведущий мастер • Контроль смет и монтажа</div>
                  </div>
                  <div className="text-xs font-semibold px-2.5 py-1 rounded-full bg-orange-50 text-brand-red border border-orange-200/80">
                    Опыт 17 лет
                  </div>
                </div>
              </div>
            </div>

            {/* Clean Architectural Trust Strip (Subtle warm floating badges) */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-wrap items-center gap-2.5 sm:gap-3 mb-8"
            >
              {trustPoints.map((point, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 bg-white/80 backdrop-blur-xs border border-stone-200/90 px-3.5 py-1.5 rounded-full shadow-[0_2px_8px_rgba(0,0,0,0.03)] text-xs sm:text-sm text-gray-800"
                >
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
                className="flex-1 h-14 bg-brand-red hover:bg-brand-red-hover text-white font-semibold text-sm sm:text-base px-6 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2.5 cursor-pointer whitespace-nowrap active:scale-[0.99]"
              >
                <Calculator className="w-5 h-5 shrink-0" />
                <span>Рассчитать смету</span>
              </button>

              <button
                type="button"
                onClick={handleWhatsAppClick}
                className="flex-1 h-14 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm sm:text-base px-6 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2.5 cursor-pointer whitespace-nowrap active:scale-[0.99]"
              >
                <MessageSquare className="w-5 h-5 shrink-0" />
                <span>Написать в WhatsApp</span>
              </button>
            </motion.div>

          </div>

          {/* Right Column: Master Photo (Desktop with ambient halo) */}
          <div className="hidden md:flex lg:col-span-5 justify-center items-center relative">
            
            {/* Warm backlight halo behind portrait */}
            <div className="absolute inset-0 bg-gradient-to-tr from-orange-300/25 via-amber-200/30 to-transparent blur-3xl rounded-3xl scale-110 pointer-events-none" />

            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="relative w-full max-w-[420px]"
            >
              <div className="relative rounded-2xl overflow-hidden border border-stone-200/90 bg-white shadow-[0_20px_50px_rgba(224,90,43,0.09),0_10px_30px_rgba(0,0,0,0.06)]">
                <img
                  src="/azhur/photo/hero.webp"
                  alt="Олег Мисягин — ведущий специалист"
                  className="w-full aspect-[4/5] object-cover object-top"
                  loading="eager"
                />
                
                {/* Clean master badge with warm frosted glass */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md border border-stone-200 p-4 rounded-xl shadow-md">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-extrabold text-gray-950 text-base">Олег Мисягин</span>
                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-orange-50 text-brand-red border border-orange-200/90 uppercase tracking-wider">
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
