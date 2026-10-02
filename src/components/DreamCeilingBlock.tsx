import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Plus, Minus } from 'lucide-react';
import { LazyVideo } from './LazyVideo';

interface DreamCeilingBlockProps {
  onOpenCalculator: (service?: string) => void;
}

export function DreamCeilingBlock({ onOpenCalculator }: DreamCeilingBlockProps) {
  const [activeStep, setActiveStep] = useState<string | null>("01");

  const steps = [
    {
      num: "01",
      title: "Заявка и консультация",
      desc: "расчет за 5 минут",
      details: "Обсуждаем планировку, тип полотна и освещения. Называем ориентировочную стоимость и согласовываем удобное время замера."
    },
    {
      num: "02",
      title: "Бесплатный выезд на замер",
      desc: "с образцами полотен",
      details: "Олег лично привозит образцы фактур (матовые, сатин, EuroKRAAB). Выбираете материал вживую при вашем комнатном освещении."
    },
    {
      num: "03",
      title: "Фиксированная смета и договор",
      desc: "цена не меняется",
      details: "Составляем прозрачную спецификацию до копейки. Заключаем договор с гарантией 10 лет. Сумма в договоре окончательная."
    },
    {
      num: "04",
      title: "Раскрой полотна на производстве",
      desc: "за 24 часа",
      details: "Полотно кроится на станке точно по лазерным замерам помещения с огарпуниванием по ГОСТу."
    },
    {
      num: "05",
      title: "Чистый монтаж",
      desc: "за один день без пыли",
      details: "Используем перфораторы с пылеудалением и безопасные композитные баллоны. Укрываем стены и мебель."
    },
    {
      num: "06",
      title: "Сдача и уборка",
      desc: "принимаете идеальный потолок",
      details: "Убираем за собой строительный мусор, проверяем работу каждого светильника и подписываем акт приемки."
    }
  ];

  return (
    <section id="process" className="relative bg-[#FAF9F6] py-20 md:py-28 border-t border-stone-200/80 overflow-hidden">
      {/* Ambient Warm Light */}
      <div className="absolute top-1/4 right-[-5%] w-[500px] h-[500px] bg-gradient-to-bl from-orange-100/25 via-amber-100/15 to-transparent blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          
          {/* Left Column: Headline */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div className="space-y-4">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-950 tracking-tight leading-tight">
                Как проходит работа: 6 понятных шагов
              </h2>
              <p className="text-gray-600 text-base leading-relaxed">
                От первого сообщения до готового чистого потолка без сюрпризов, нервов и переплат.
              </p>
            </div>

            {/* Video Showcase Card */}
            <div className="hidden lg:block mt-8">
              <div className="relative rounded-xl overflow-hidden border border-gray-200 shadow-md aspect-video bg-gray-100">
                <LazyVideo
                  src="/new_image_azhur/IMG_0756.mp4"
                  poster="/azhur/photo/hero.webp"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-4">
                  <div className="text-white text-xs font-medium">
                    Процесс чистого монтажа с пылесосом
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Steps Accordion */}
          <div className="lg:col-span-7">
            <div className="divide-y divide-gray-200 border-t border-b border-gray-200">
              {steps.map((step) => {
                const isOpen = activeStep === step.num;
                return (
                  <div key={step.num} className="group">
                    <button
                      onClick={() => setActiveStep(isOpen ? null : step.num)}
                      className="w-full text-left py-5 sm:py-6 flex items-start gap-5 focus:outline-none cursor-pointer"
                    >
                      {/* Step Number */}
                      <span className={`font-mono text-base font-bold leading-6 shrink-0 transition-colors ${
                        isOpen ? 'text-brand-red' : 'text-gray-400 group-hover:text-brand-red'
                      }`}>
                        {step.num}
                      </span>
                      
                      {/* Content */}
                      <div className="flex-grow flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 sm:gap-4 pr-3">
                        <h3 className={`text-base sm:text-lg font-bold transition-colors leading-snug ${
                          isOpen ? 'text-brand-red' : 'text-gray-950 group-hover:text-brand-red'
                        }`}>
                          {step.title}
                        </h3>
                        <span className="text-xs text-gray-500 shrink-0">
                          {step.desc}
                        </span>
                      </div>

                      {/* Plus/Minus Indicator */}
                      <div className="shrink-0 mt-0.5 text-gray-400 group-hover:text-brand-red transition-colors">
                        {isOpen ? (
                          <Minus size={20} className="text-brand-red" />
                        ) : (
                          <Plus size={20} />
                        )}
                      </div>
                    </button>

                    {/* Expandable details container */}
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: 'easeInOut' }}
                          className="overflow-hidden"
                        >
                          <div className="pb-5 pl-9 sm:pl-10 max-w-2xl">
                            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                              {step.details}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>

            {/* Action Button */}
            <div className="mt-8 flex justify-start">
              <button
                onClick={() => onOpenCalculator('Обсуждение проекта')}
                className="bg-brand-red hover:bg-brand-red-hover text-white font-semibold text-sm px-7 py-3.5 rounded-lg shadow-sm hover:shadow-md transition-all flex items-center gap-2 cursor-pointer group"
              >
                <span>Вызвать мастера на замер</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
