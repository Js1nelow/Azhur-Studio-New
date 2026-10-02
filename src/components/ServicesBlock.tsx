import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Cpu, Sliders, Layers, Eye, ShieldCheck, ChevronRight } from 'lucide-react';

interface ServicesBlockProps {
  onOpenCalculator: (service: string) => void;
}

export function ServicesBlock({ onOpenCalculator }: ServicesBlockProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const services = [
    {
      id: "01",
      title: "Натяжные потолки",
      subtitle: "Матовые, сатиновые и глянцевые полотна",
      description: "Идеально ровная белая поверхность без швов и трещин. Полотна без запаха, экологический класс А+. Монтаж комнаты за 3–5 часов.",
      icon: Layers,
      specs: [
        { label: "Материал", value: "MSD Premium / Bauf / Teqtum" },
        { label: "Экологичность", value: "Класс А+ (без запаха)" },
        { label: "Ширина полотна", value: "До 5.5 м без швов" },
        { label: "Срок службы", value: "Гарантия 10 лет" }
      ],
      features: ["Монтаж без пыли за 1 день", "Идеальная белизна полотна", "Выдерживает до 100 л воды на м² при затопе"]
    },
    {
      id: "02",
      title: "Теневой профиль",
      subtitle: "Система EuroKRAAB без плинтусов и заглушек",
      description: "Современное примыкание потолка к стене с аккуратным зазором 6–7 мм. Никаких дешевых резиновых заглушек — стильный минималистичный контур.",
      icon: Sliders,
      specs: [
        { label: "Технология", value: "EuroKRAAB / Lumfer" },
        { label: "Теневой зазор", value: "6–7 мм ровного контура" },
        { label: "Материал профиля", value: "Алюминиевый окрашенный" },
        { label: "Цвет зазора", value: "Глубокий черный матовый" }
      ],
      features: ["Идеально ровный зазор по всему периметру", "Удобно клеить обои или красить стены в будущем", "Эффект парящего потолка"]
    },
    {
      id: "03",
      title: "Карнизные решения",
      subtitle: "Скрытые ниши для штор и электрокарнизы",
      description: "Эстетичные ниши в потолке, где шторы плавно спускаются прямо с потолка. Возможность установки мягкой подсветки и электропривода.",
      icon: Cpu,
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
      icon: Eye,
      specs: [
        { label: "Ширина шинопровода", value: "25 мм / 35 мм" },
        { label: "Питание шины", value: "Безопасное напряжение 48V" },
        { label: "Светодиоды", value: "CRI >90 (естественная цветопередача)" },
        { label: "Управление", value: "Обычный выключатель или диммер" }
      ],
      features: ["Легко переставлять светильники руками", "Служит основным светом в комнате", "Энергоэффективность и долговечность"]
    }
  ];

  return (
    <section id="services" className="relative bg-white pt-20 pb-24 md:pt-28 md:pb-32 border-t border-gray-200">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16">
        
        {/* Section Header */}
        <div className="mb-14 md:mb-18 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-950 tracking-tight mb-4" id="services-title">
              Виды потолков и конструкций
            </h2>
            <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
              Подбираем решения под ваш бюджет: от классических белых полотен до теневых систем EuroKRAAB и трекового света.
            </p>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:grid grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Menu Selector */}
          <div className="col-span-5 space-y-3">
            {services.map((service, index) => {
              const Icon = service.icon;
              const isActive = activeIndex === index;
              return (
                <div
                  key={service.id}
                  onClick={() => setActiveIndex(index)}
                  className={`group relative p-5 rounded-xl cursor-pointer border transition-all duration-200 select-none ${
                    isActive 
                      ? 'bg-orange-50/70 border-brand-red shadow-sm' 
                      : 'bg-white border-gray-200 hover:border-gray-300 hover:bg-gray-50/80'
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
                      <div className="flex items-center gap-2.5">
                        <Icon size={18} className={isActive ? 'text-brand-red' : 'text-gray-500 group-hover:text-gray-900'} />
                        <h3 className={`text-base font-bold transition-colors ${
                          isActive ? 'text-gray-950' : 'text-gray-800 group-hover:text-gray-950'
                        }`}>
                          {service.title}
                        </h3>
                      </div>
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
                className="bg-white border border-gray-200 p-8 xl:p-10 rounded-2xl shadow-md flex flex-col justify-between min-h-[460px]"
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
                  <div className="grid grid-cols-2 gap-4 py-5 border-t border-b border-gray-200 mb-6">
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
                  <div className="space-y-2 mb-8">
                    <span className="text-xs font-semibold text-gray-600 block mb-2">
                      Преимущества технологии:
                    </span>
                    {services[activeIndex].features.map((feature, fIdx) => (
                      <div key={fIdx} className="flex items-center gap-2.5 text-xs sm:text-sm text-gray-800">
                        <ShieldCheck size={16} className="text-emerald-600 shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Primary CTA */}
                <div>
                  <button
                    onClick={() => onOpenCalculator(services[activeIndex].title)}
                    className="w-full sm:w-auto bg-brand-red hover:bg-brand-red-hover text-white font-semibold text-sm px-7 py-3.5 rounded-lg shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer group"
                  >
                    <span>Рассчитать стоимость</span>
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Mobile Showcase */}
        <div className="lg:hidden space-y-4">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={service.id}
                className="bg-white border border-gray-200 p-6 rounded-xl shadow-xs"
              >
                <div className="flex items-center gap-2.5 mb-2">
                  <Icon size={18} className="text-brand-red" />
                  <h3 className="text-lg font-bold text-gray-950">
                    {service.title}
                  </h3>
                </div>

                <p className="text-xs text-gray-500 mb-3">{service.subtitle}</p>
                <p className="text-sm text-gray-700 leading-relaxed mb-4">{service.description}</p>

                <div className="grid grid-cols-2 gap-3 py-3 border-t border-b border-gray-200 mb-4">
                  {service.specs.slice(0, 2).map((spec, sIdx) => (
                    <div key={sIdx}>
                      <span className="text-[11px] text-gray-500 block">{spec.label}</span>
                      <span className="text-xs font-bold text-gray-900 block">{spec.value}</span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => onOpenCalculator(service.title)}
                  className="w-full bg-brand-red hover:bg-brand-red-hover text-white text-xs font-semibold py-3 rounded-lg transition-colors"
                >
                  Рассчитать стоимость
                </button>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
