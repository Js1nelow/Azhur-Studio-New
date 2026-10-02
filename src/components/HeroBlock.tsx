import { motion } from 'motion/react';
import { ShieldCheck, Sparkles, Clock, Calculator, MessageSquare, ArrowRight, CheckCircle2 } from 'lucide-react';
import { reachMetrikaGoal } from './YandexMetrika';

interface HeroBlockProps {
  onOpenCalculator: (service?: string) => void;
}

export function HeroBlock({ onOpenCalculator }: HeroBlockProps) {
  const benefits = [
    {
      icon: <Clock className="w-5 h-5 text-brand-red shrink-0" />,
      title: "Монтаж за 1 день",
      desc: "От 4 часов на комнату без срыва сроков",
    },
    {
      icon: <Sparkles className="w-5 h-5 text-brand-red shrink-0" />,
      title: "Чистота без пыли",
      desc: "Перфораторы с пылеудалением — обои и полы чистые",
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-brand-red shrink-0" />,
      title: "Фиксированная смета",
      desc: "Цена в договоре не вырастет после монтажа",
    },
    {
      icon: <CheckCircle2 className="w-5 h-5 text-brand-red shrink-0" />,
      title: "10 лет гарантии",
      desc: "Сертифицированные полотна без запаха (класс А+)",
    },
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
              className="text-gray-700 text-base sm:text-lg leading-relaxed max-w-2xl mb-8 font-normal"
            >
              Фиксируем точную смету в договоре до начала работ. Никаких доплат после монтажа. Безопасные полимерные баллоны, полотна без запаха и аккуратная работа без пыли.
            </motion.p>

            {/* Mobile-Only Master Photo */}
            <div className="block md:hidden mb-8">
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

            {/* 4 Benefit Cards Grid */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8 max-w-2xl"
            >
              {benefits.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-3.5 rounded-lg bg-gray-50 border border-gray-200 hover:border-gray-300 transition-colors"
                >
                  <div className="p-1.5 rounded bg-white border border-gray-200 shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-gray-950 leading-snug">{item.title}</div>
                    <div className="text-xs text-gray-600 mt-0.5 leading-snug">{item.desc}</div>
                  </div>
                </div>
              ))}
            </motion.div>

            {/* CTA Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 max-w-xl"
            >
              <button
                onClick={() => onOpenCalculator('Натяжные потолки')}
                className="flex-1 bg-brand-red hover:bg-brand-red-hover text-white font-semibold text-sm sm:text-base px-6 py-4 rounded-lg shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer group"
              >
                <Calculator className="w-5 h-5 shrink-0" />
                <span>Рассчитать смету онлайн</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={handleWhatsAppClick}
                className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm sm:text-base px-6 py-4 rounded-lg shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
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
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative w-full max-w-[440px]"
            >
              <div className="relative rounded-xl overflow-hidden border border-gray-300 bg-white shadow-lg">
                <img
                  src="/azhur/photo/hero.webp"
                  alt="Олег Мисягин — ведущий мастер студии Ажур"
                  className="w-full aspect-[3/4] object-cover"
                />

                {/* Trust Badge at bottom of photo */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md border border-gray-200 p-4 rounded-lg shadow-md">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-base font-bold text-gray-950">Олег Мисягин</span>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded bg-orange-100 text-orange-800">
                      17 лет опыта
                    </span>
                  </div>
                  <p className="text-xs text-gray-700 leading-snug">
                    Основатель студии «Ажур». Лично выезжает на замеры и отвечает за результат каждого объекта по договору.
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
