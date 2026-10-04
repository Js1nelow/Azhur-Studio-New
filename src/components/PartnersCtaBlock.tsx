import { ArrowRight } from 'lucide-react';
import { useTransition } from '../contexts/TransitionContext';

export function PartnersCtaBlock() {
  const { navigateWithTransition } = useTransition();

  return (
    <section className="relative py-16 md:py-24 bg-[#F5F4F0] border-t border-stone-200/80 overflow-hidden">
      {/* Subtle warm ambient backdrop */}
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-orange-200/20 via-amber-100/10 to-transparent blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          
          <div className="lg:col-span-8 space-y-4">
            <h2 className="font-sans font-extrabold text-2xl sm:text-3xl md:text-4xl text-gray-950 tracking-tight leading-tight">
              Партнёрам и дизайнерам интерьера
            </h2>
            
            <p className="text-gray-700 text-sm sm:text-base leading-relaxed max-w-2xl">
              Предлагаем прозрачные условия сотрудничества для дизайнеров интерьера, архитекторов и руководителей строительных проектов. Берём на себя сложные узлы, теневые примыкания EuroKraab, трековое освещение и сдаём объекты точно в срок с гарантией 10 лет.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs sm:text-sm text-gray-600 font-medium">
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-red shrink-0" />
                Смета и чертежи до монтажа
              </span>
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-red shrink-0" />
                Образцы профилей на объект
              </span>
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-red shrink-0" />
                Фиксация стоимости в договоре
              </span>
            </div>
          </div>

          <div className="lg:col-span-4 flex lg:justify-end">
            <button
              onClick={() => navigateWithTransition('/partners', 'ПАРТНЕРЫ')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-brand-red hover:bg-brand-red-hover text-white px-7 py-4 rounded-xl font-semibold text-xs sm:text-sm uppercase tracking-wider transition-all shadow-sm cursor-pointer group whitespace-nowrap active:scale-[0.99]"
            >
              <span>Условия сотрудничества</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}
