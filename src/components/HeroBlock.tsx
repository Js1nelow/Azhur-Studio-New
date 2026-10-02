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
    <section id="hero" className="relative min-h-[92svh] flex items-center bg-white pt-24 pb-16 lg:pt-32 lg:pb-20 border-b border-gray-100 overflow-hidden">
      {/* Background soft ambient accents */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-100/40 rounded-full blur-[140px] pointer-events-none -z-0" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gray-100/60 rounded-full blur-[120px] pointer-events-none -z-0" />

      <div className="relative z-10 max-w-[1440px] mx-auto px-5 sm:px-8 md:px-12 lg:px-16 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Offer & Conversion Stack */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            
            {/* Geo & Category Badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 self-start bg-orange-50 border border-orange-200/60 px-3.5 py-1.5 rounded-full mb-5"
            >
              <span className="w-2 h-2 rounded-full bg-brand-red animate-pulse" />
              <span className="text-xs font-semibold text-orange-950 uppercase tracking-wider">
                Москва и Подмосковье до 50 км • Выезд на замер 0 ₽
              </span>
            </motion.div>

            {/* Main Conversion Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-extrabold leading-[1.12] tracking-tight text-gray-900 mb-5"
            >
              Натяжные потолки от <span className="text-brand-red">790 ₽/м²</span> с чистым монтажом за 1 день
            </motion.h1>

            {/* Subhead / Guarantee */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-gray-600 text-base sm:text-lg leading-relaxed max-w-2xl mb-8"
            >
              Фиксируем точную смету в договоре до начала работ. Никаких доплат после монтажа. Безопасные полимерные баллоны, полотна без запаха и аккуратная работа без пыли.
            </motion.p>

            {/* Mobile-Only Master Photo */}
            <div className="block md:hidden mb-8">
              <div className="relative rounded-2xl overflow-hidden border border-gray-200 shadow-md bg-gray-50">
                <img
                  src="/azhur/photo/hero.webp"
                  alt="Ведущий мастер Олег Мисягин"
                  className="w-full aspect-[4/3] object-cover"
                />
                <div className="p-4 bg-white border-t border-gray-100 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-gray-900 text-sm">Олег Мисягин</div>
                    <div className="text-xs text-gray-500">Ведущий мастер • Личный контроль смет и монтажа</div>
                  </div>
                  <div className="text-xs font-semibold px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200">
                    Опыт 17 лет
                  </div>
                </div>
              </div>
            </div>

            {/* 4 Benefit Cards Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8 max-w-2xl"
            >
              {benefits.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-3.5 rounded-xl bg-gray-50/80 border border-gray-200/80 hover:border-gray-300 transition-colors"
                >
                  <div className="p-1.5 rounded-lg bg-white border border-gray-200/60 shadow-xs">
                    {item.icon}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-gray-900 leading-snug">{item.title}</div>
                    <div className="text-xs text-gray-600 mt-0.5 leading-snug">{item.desc}</div>
                  </div>
                </div>
              ))}
            </motion.div>

            {/* CTA Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 max-w-xl"
            >
              <button
                onClick={() => onOpenCalculator('Натяжные потолки')}
                className="flex-1 bg-brand-red hover:bg-brand-red-hover text-white font-semibold text-sm sm:text-base px-6 py-4 rounded-xl shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer group"
              >
                <Calculator className="w-5 h-5 shrink-0" />
                <span>Рассчитать смету онлайн</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={handleWhatsAppClick}
                className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm sm:text-base px-6 py-4 rounded-xl shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageSquare className="w-5 h-5 shrink-0" />
                <span>Написать в WhatsApp</span>
              </button>
            </motion.div>

            <div className="text-xs text-gray-500 mt-3 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              Бесплатный расчет за 10 минут • Скидка 15% при заказе на этой неделе
            </div>

          </div>

          {/* Right Column: Master Photo (Desktop) */}
          <div className="hidden md:flex lg:col-span-5 justify-center items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative w-full max-w-[440px]"
            >
              {/* Decorative Frame */}
              <div className="relative rounded-2xl overflow-hidden border border-gray-200/90 bg-white shadow-xl">
                <img
                  src="/azhur/photo/hero.webp"
                  alt="Олег Мисягин — ведущий мастер студии Ажур"
                  className="w-full aspect-[3/4] object-cover"
                />

                {/* Trust Badge at bottom of photo */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md border border-gray-200/80 p-4 rounded-xl shadow-lg">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-base font-bold text-gray-900">Олег Мисягин</span>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-orange-100 text-orange-800">
                      17 лет опыта
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 leading-snug">
                    Основатель студии «Ажур». Лично выезжает на замеры и отвечает за качество каждого объекта по договору.
                  </p>
                </div>
              </div>

              {/* Float Mini Badge: 100% честная цена */}
              <div className="absolute -top-3 -right-3 bg-white border border-gray-200 px-3.5 py-2 rounded-xl shadow-md flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                <div className="text-xs font-bold text-gray-900">
                  Честная смета
                  <div className="text-[10px] text-gray-500 font-normal">без скрытых доплат</div>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
