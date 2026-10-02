import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Minus } from 'lucide-react';

interface FaqItem {
  q: string;
  a: string;
}

const faqItems: FaqItem[] = [
  {
    q: "Сколько времени занимает монтаж?",
    a: "В большинстве случаев один день. Монтаж стандартной комнаты занимает от 3 до 5 часов. Сложные многоуровневые или теневые конструкции — до двух дней. Точный срок мастер назовет после замера."
  },
  {
    q: "На каком этапе ремонта устанавливать потолок?",
    a: "Натяжной потолок устанавливается на финальном этапе: после окончания пыльных черновых работ, поклейки обоев или покраски стен. Благодаря перфораторам с пылеудалением обои останутся чистыми."
  },
  {
    q: "Как формируется цена и не вырастет ли она в процессе?",
    a: "Цена формируется из площади, типа полотна и профильной системы (теневой, парящий, ниши для штор). Мы фиксируем точную смету в официальном договоре до начала работ — доплат после монтажа не бывает."
  },
  {
    q: "Вы убираете за собой строительный мусор?",
    a: "Да. Работаем аккуратно с профессиональным пылесосом, защищаем чистовые поверхности пленкой и убираем обрезки полотна и упаковку после завершения. Вы принимаете чистую комнату."
  },
  {
    q: "Есть ли гарантия на полотна и монтаж?",
    a: "Да. На полотна действует заводская гарантия 10 лет (не желтеют, не провисают, без запаха). На монтажные работы и крепления профиля предоставляем 3 года гарантии по договору."
  }
];

export function FaqBlock() {
  const [activeIdx, setActiveIdx] = useState<number | null>(0);

  return (
    <section id="faq" className="relative bg-[#FAF9F6] py-20 md:py-28 border-t border-stone-200/80 overflow-hidden">
      {/* Ambient Warm Interior Glow */}
      <div className="absolute top-1/2 left-[-5%] w-[500px] h-[500px] bg-gradient-to-tr from-amber-100/30 via-orange-100/20 to-transparent blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          
          {/* Left Header */}
          <div className="lg:col-span-5 lg:sticky lg:top-28 h-fit space-y-3">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-950 tracking-tight">
              Частые вопросы
            </h2>
            <p className="text-gray-600 text-base leading-relaxed max-w-sm">
              Отвечаем честно на вопросы о стоимости, сроках и гарантиях
            </p>
          </div>

          {/* Right Accordion List */}
          <div className="lg:col-span-7 divide-y divide-stone-200/80 border-b border-t border-stone-200/80">
            {faqItems.map((item, index) => {
              const isOpen = activeIdx === index;
              return (
                <div key={index} className="group">
                  <button
                    onClick={() => setActiveIdx(isOpen ? null : index)}
                    className="w-full text-left py-6 md:py-7 flex items-start gap-5 focus:outline-none cursor-pointer"
                  >
                    {/* Index */}
                    <span className="font-mono text-sm font-bold leading-6 select-none text-brand-red shrink-0">
                      {(index + 1).toString().padStart(2, '0')}
                    </span>

                    {/* Question text */}
                    <div className="flex-grow pr-4">
                      <h3 className={`text-base sm:text-lg font-bold transition-colors leading-snug ${
                        isOpen ? 'text-brand-red' : 'text-gray-950 group-hover:text-brand-red'
                      }`}>
                        {item.q}
                      </h3>
                    </div>

                    {/* Plus/Minus Indicator */}
                    <div className="shrink-0 mt-0.5 text-gray-500 group-hover:text-brand-red transition-colors">
                      {isOpen ? (
                        <Minus size={20} className="text-brand-red" />
                      ) : (
                        <Plus size={20} />
                      )}
                    </div>
                  </button>

                  {/* Accordion Expansion Panel */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <div className="pb-6 pl-9 sm:pl-10 max-w-2xl">
                          <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                            {item.a}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
