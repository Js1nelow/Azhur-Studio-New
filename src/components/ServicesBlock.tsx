import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, ChevronLeft, ArrowRight, Check } from 'lucide-react';

interface ServicesBlockProps {
  onOpenCalculator: (service?: string) => void;
}

export function ServicesBlock({ onOpenCalculator }: ServicesBlockProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const mobileScrollRef = useRef<HTMLDivElement>(null);
  const [activeMobileService, setActiveMobileService] = useState(0);

  const services = [
    {
      id: "01",
      title: "Натяжные потолки",
      subtitle: "Матовые, сатиновые и глянцевые полотна",
      description: "Ровная матовая поверхность без швов и провисаний. Полотна без запаха, экологический класс А+. Монтаж комнаты за 3–5 часов.",
      specs: [
        { label: "Материал", value: "MSD Premium / Bauf / Teqtum" },
        { label: "Экологичность", value: "Класс А+ (без запаха)" },
        { label: "Ширина полотна", value: "До 5.5 м без швов" },
        { label: "Срок службы", value: "Гарантия 10 лет" }
      ],
      features: ["Монтаж без пыли за 1 день", "Равномерная фактура без дефектов", "Выдерживает до 100 л воды на м² при затопе"]
    },
    {
      id: "02",
      title: "Теневой профиль",
      subtitle: "Система EuroKRAAB без плинтусов и заглушек",
      description: "Примыкание потолка к стене с аккуратным зазором 6–7 мм. Никаких резиновых заглушек — только строгий минималистичный контур.",
      specs: [
        { label: "Технология", value: "EuroKRAAB / Lumfer" },
        { label: "Теневой зазор", value: "6–7 мм ровного контура" },
        { label: "Материал профиля", value: "Алюминиевый окрашенный" },
        { label: "Цвет зазора", value: "Глубокий черный матовый" }
      ],
      features: ["Ровный 7-миллиметровый зазор по периметру", "Удобно клеить обои или красить стены в будущем", "Эффект парящего потолка"]
    },
    {
      id: "03",
      title: "Карнизные решения",
      subtitle: "Скрытые ниши для штор и электрокарнизы",
      description: "Эстетичные ниши в потолке, где шторы плавно спускаются прямо с потолка. Возможность установки мягкой подсветки и электропривода.",
      specs: [
        { label: "Конструкция ниши", value: "Скрытый алюминиевый брус" },
        { label: "Электрокарниз", value: "Поддержка любых моторов" },
        { label: "Опуск потолка", value: "Минимальный от 4 см" },
        { label: "Подсветка штор", value: "Теплый / нейтральный LED" }
      ],
      features: ["Никаких видимых крючков и крепежей", "Бесшумные бегунки на роликах", "Стильный интерьер гостиной и спальни"]
    },
    {
      id: "04",
      title: "Световые линии и треки",
      subtitle: "Магнитные треки и встроенные световые полосы",
      description: "Современный сценарий освещения: утопленные в потолок магнитные треки 48V со сменными светильниками и яркие световые линии.",
      specs: [
        { label: "Ширина шинопровода", value: "25 мм / 35 мм" },
        { label: "Питание шины", value: "Безопасное напряжение 48V" },
        { label: "Светодиоды", value: "CRI >90 (естественная цветопередача)" },
        { label: "Управление", value: "Обычный выключатель или диммер" }
      ],
      features: ["Легко переставлять светильники руками", "Служит основным светом в комнате", "Энергоэффективность и долговечность"]
    }
  ];

  const handleMobileScroll = () => {
    if (!mobileScrollRef.current) return;
    const { scrollLeft, clientWidth } = mobileScrollRef.current;
    const index = Math.round(scrollLeft / (clientWidth * 0.86));
    setActiveMobileService(Math.min(Math.max(index, 0), services.length - 1));
  };

  const scrollServicePrev = () => {
    if (!mobileScrollRef.current) return;
    const itemWidth = mobileScrollRef.current.clientWidth * 0.86;
    mobileScrollRef.current.scrollBy({ left: -itemWidth, behavior: 'smooth' });
  };

  const scrollServiceNext = () => {
    if (!mobileScrollRef.current) return;
    const itemWidth = mobileScrollRef.current.clientWidth * 0.86;
    mobileScrollRef.current.scrollBy({ left: itemWidth, behavior: 'smooth' });
  };

  return (
    <section id="services" className="relative bg-[#F6F5F2] pt-16 pb-20 md:pt-28 md:pb-32 border-t border-stone-200/80 overflow-hidden">
      {/* Ambient Warm Interior Glow */}
      <div className="absolute -top-32 right-[-5%] w-[600px] h-[600px] bg-gradient-to-bl from-orange-200/25 via-amber-100/15 to-transparent blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute -bottom-32 left-[-5%] w-[500px] h-[500px] bg-gradient-to-tr from-amber-200/20 to-transparent blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-[1440px] mx-auto px-5 sm:px-8 md:px-12 lg:px-16">
        
        {/* Section Header */}
        <div className="mb-8 md:mb-18 flex flex-col md:flex-row md:items-end justify-between gap-4 md:gap-6">
          <div className="max-w-2xl">
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-gray-950 tracking-tight mb-2 md:mb-4" id="services-title">
              Виды потолков и конструкций
            </h2>
            <p className="text-gray-600 text-sm sm:text-lg leading-relaxed">
              Подбираем решения под ваш бюджет: от классических белых полотен до теневых систем EuroKRAAB и трекового света.
            </p>
          </div>
        </div>

        {/* DESKTOP VIEW: Split Menu + Detail Showcase */}
        <div className="hidden lg:grid grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Menu Selector */}
          <div className="col-span-5 space-y-3">
            {services.map((service, index) => {
              const isActive = activeIndex === index;
              return (
                <div
                  key={service.id}
                  onClick={() => setActiveIndex(index)}
                  className={`group relative p-5 rounded-2xl cursor-pointer border transition-all duration-200 select-none ${
                    isActive 
                      ? 'bg-white border-brand-red shadow-[0_8px_25px_rgba(224,90,43,0.08)]' 
                      : 'bg-white/70 hover:bg-white border-stone-200/80 hover:border-stone-300 shadow-[0_2px_8px_rgba(0,0,0,0.02)]'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    {/* Index */}
                    <span className={`font-mono text-xs font-bold leading-6 transition-colors ${
                      isActive ? 'text-brand-red' : 'text-gray-400 group-hover:text-gray-700'
                    }`}>
                      {service.id}
                    </span>

                    {/* Content */}
                    <div className="flex-1">
                      <h3 className={`text-base font-bold transition-colors ${
                        isActive ? 'text-gray-950' : 'text-gray-800 group-hover:text-gray-950'
                      }`}>
                        {service.title}
                      </h3>
                      <p className="text-xs text-gray-600 mt-1 leading-snug">
                        {service.subtitle}
                      </p>
                    </div>

                    <ChevronRight size={18} className={`mt-1 transition-transform ${
                      isActive ? 'text-brand-red translate-x-1' : 'text-gray-400 group-hover:translate-x-0.5'
                    }`} />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Display Panel */}
          <div className="col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="bg-white border border-stone-200/90 p-8 xl:p-10 rounded-2xl shadow-[0_16px_40px_rgba(0,0,0,0.04)] flex flex-col justify-between min-h-[460px]"
              >
                <div>
                  <div className="mb-6">
                    <span className="text-xs font-semibold text-brand-red uppercase tracking-wider block mb-1">
                      {services[activeIndex].subtitle}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-950 tracking-tight mb-3">
                      {services[activeIndex].title}
                    </h3>
                    <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                      {services[activeIndex].description}
                    </p>
                  </div>

                  {/* Tech Specs */}
                  <div className="grid grid-cols-2 gap-4 py-5 border-t border-b border-stone-200 mb-6">
                    {services[activeIndex].specs.map((spec, sIdx) => (
                      <div key={sIdx} className="space-y-0.5">
                        <span className="text-xs text-gray-500 block">
                          {spec.label}
                        </span>
                        <span className="text-sm font-bold text-gray-900 block">
                          {spec.value}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Features List */}
                  <div className="space-y-2.5 mb-8">
                    <span className="text-xs font-semibold text-gray-600 block mb-2">
                      Преимущества технологии:
                    </span>
                    {services[activeIndex].features.map((feature, fIdx) => (
                      <div key={fIdx} className="flex items-center gap-2.5 text-xs sm:text-sm text-gray-800">
                        <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                          <Check size={11} strokeWidth={3} />
                        </div>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Primary CTA */}
                <div>
                  <button
                    onClick={() => onOpenCalculator(services[activeIndex].title)}
                    className="w-full sm:w-auto bg-brand-red hover:bg-brand-red-hover text-white font-semibold text-sm px-7 py-3.5 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer group"
                  >
                    <span>Рассчитать стоимость</span>
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* MOBILE VIEW: Horizontal Snap Slider with Controls (IDENTICAL TO CASES) */}
        <div className="lg:hidden">
          <div
            ref={mobileScrollRef}
            onScroll={handleMobileScroll}
            className="flex gap-3.5 overflow-x-auto snap-x snap-mandatory scrollbar-none -mx-5 px-5 pb-3 pt-1"
          >
            {services.map((service) => (
              <div
                key={service.id}
                className="w-[86vw] max-w-[340px] shrink-0 snap-center rounded-2xl bg-white border border-stone-200/90 shadow-md p-5 flex flex-col justify-between"
              >
                <div>
                  {/* Top Index & Subtitle */}
                  <div className="flex items-center justify-between mb-2.5">
                    <span className="font-mono text-xs font-bold text-brand-red bg-orange-50 px-2.5 py-0.5 rounded-full border border-orange-200/80">
                      {service.id}
                    </span>
                    <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider truncate max-w-[210px]">
                      {service.subtitle}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-extrabold text-gray-950 tracking-tight mb-2">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-gray-700 leading-relaxed mb-4">
                    {service.description}
                  </p>

                  {/* 2x2 Tech Specs Grid */}
                  <div className="grid grid-cols-2 gap-2.5 py-3 border-t border-b border-stone-200/80 mb-4 bg-stone-50/70 -mx-5 px-5">
                    {service.specs.map((spec, sIdx) => (
                      <div key={sIdx} className="space-y-0.5">
                        <span className="text-[10px] text-gray-500 uppercase tracking-wider block">
                          {spec.label}
                        </span>
                        <span className="text-xs font-bold text-gray-900 block leading-tight">
                          {spec.value}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Features List */}
                  <div className="space-y-2 mb-5">
                    {service.features.map((feature, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2 text-xs text-gray-800">
                        <div className="w-3.5 h-3.5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                          <Check size={10} strokeWidth={3} />
                        </div>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Primary Mobile CTA Button */}
                <button
                  onClick={() => onOpenCalculator(service.title)}
                  className="w-full bg-brand-red hover:bg-brand-red-hover text-white text-sm font-semibold py-3.5 px-5 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
                >
                  <span>Рассчитать стоимость</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            ))}
          </div>

          {/* Mobile Navigation Controls: Dots + Counter + Arrows [←] [→] */}
          <div className="flex items-center justify-between mt-3 px-1">
            <div className="flex items-center gap-1.5">
              {services.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => {
                    if (!mobileScrollRef.current) return;
                    const itemWidth = mobileScrollRef.current.clientWidth * 0.86;
                    mobileScrollRef.current.scrollTo({ left: i * itemWidth, behavior: 'smooth' });
                  }}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    activeMobileService === i ? 'w-6 bg-brand-red' : 'w-1.5 bg-stone-300'
                  }`}
                  aria-label={`Услуга ${i + 1}`}
                />
              ))}
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500 font-medium">
                {activeMobileService + 1} / {services.length}
              </span>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={scrollServicePrev}
                  disabled={activeMobileService === 0}
                  className={`w-10 h-10 rounded-full bg-white border border-stone-200/90 shadow-2xs flex items-center justify-center text-gray-700 transition-all cursor-pointer ${
                    activeMobileService === 0 ? 'opacity-35 cursor-not-allowed' : 'active:scale-95 hover:bg-stone-50'
                  }`}
                  aria-label="Предыдущая услуга"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  type="button"
                  onClick={scrollServiceNext}
                  disabled={activeMobileService === services.length - 1}
                  className={`w-10 h-10 rounded-full bg-white border border-stone-200/90 shadow-2xs flex items-center justify-center text-gray-700 transition-all cursor-pointer ${
                    activeMobileService === services.length - 1 ? 'opacity-35 cursor-not-allowed' : 'active:scale-95 hover:bg-stone-50'
                  }`}
                  aria-label="Следующая услуга"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
