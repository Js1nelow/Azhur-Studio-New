import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, ArrowLeft, ArrowRight } from 'lucide-react';

interface Review {
  id: number;
  rating: number;
  text: string;
  author: string;
  city: string;
  project: string;
}

const reviews: Review[] = [
  {
    id: 1,
    rating: 5,
    text: "Делали парящий потолок в гостиной. Приехали вовремя, убрали за собой строительный мусор, всё сделали за один день. Олег лично контролировал монтаж — результат идеальный, никаких зазоров и складок.",
    author: "Марина К.",
    city: "Москва",
    project: "Парящий потолок"
  },
  {
    id: 2,
    rating: 5,
    text: "Долго выбирали компанию в новостройку. Остановились на Ажур и не прогадали. Смета была зафиксирована в договоре и не выросла ни на рубль при сдаче. Полотна действительно без запаха.",
    author: "Дмитрий В.",
    city: "Красногорск",
    project: "Карнизные ниши + треки"
  },
  {
    id: 3,
    rating: 5,
    text: "Сделали теневой профиль EuroKRAAB по всей квартире. Идеально ровный темный зазор без резиновых вставок. Спасибо за аккуратность и чистую работу с пылесосом!",
    author: "Анна С.",
    city: "Химки",
    project: "Теневой профиль EuroKRAAB"
  }
];

export function ReviewsBlock() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const minSwipeDistance = 50;

  const handleNext = () => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % reviews.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      handleNext();
    } else if (isRightSwipe) {
      handlePrev();
    }
  };

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 100 : -100,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (dir: number) => ({
      x: dir < 0 ? 100 : -100,
      opacity: 0
    })
  };

  return (
    <section id="reviews" className="relative bg-[#FAF9F6] py-20 md:py-28 border-t border-stone-200/80 overflow-hidden">
      {/* Ambient Warm Light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gradient-to-r from-amber-100/30 via-orange-100/20 to-transparent blur-[130px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16">
        
        {/* Section Header */}
        <div className="mb-12 md:mb-16 max-w-2xl">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-950 tracking-tight mb-4">
            Отзывы наших заказчиков
          </h2>
          <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
            Реальные впечатления клиентов после монтажа и сдачи объектов
          </p>
        </div>

        {/* Desktop: 3 Columns Grid */}
        <div className="hidden md:grid grid-cols-3 gap-6">
          {reviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white border border-stone-200/90 rounded-2xl p-7 flex flex-col justify-between shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_14px_35px_rgba(0,0,0,0.06)] hover:border-stone-300 transition-all"
            >
              <div>
                {/* Stars */}
                <div className="flex items-center gap-1 mb-5">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} size={16} className="fill-amber-400 text-amber-400 shrink-0" />
                  ))}
                </div>

                {/* Review Text */}
                <p className="text-gray-700 text-sm sm:text-base leading-relaxed mb-6">
                  «{review.text}»
                </p>
              </div>

              {/* Author & Project */}
              <div className="border-t border-gray-200 pt-4 mt-auto">
                <div className="text-sm font-bold text-gray-950">
                  {review.author}
                </div>
                <div className="text-xs text-gray-500 mt-1 flex items-center gap-2">
                  <span>{review.city}</span>
                  <span>•</span>
                  <span className="text-brand-red font-medium">{review.project}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile: Carousel */}
        <div className="md:hidden flex flex-col space-y-6">
          <div 
            className="overflow-hidden min-h-[260px] relative touch-pan-y"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={activeIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="bg-gray-50 border border-gray-200 rounded-2xl p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(reviews[activeIndex].rating)].map((_, i) => (
                      <Star key={i} size={16} className="fill-amber-400 text-amber-400 shrink-0" />
                    ))}
                  </div>

                  <p className="text-gray-700 text-sm leading-relaxed mb-6">
                    «{reviews[activeIndex].text}»
                  </p>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <div className="text-sm font-bold text-gray-950">
                    {reviews[activeIndex].author}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {reviews[activeIndex].city} • <span className="text-brand-red font-medium">{reviews[activeIndex].project}</span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-2">
            <div className="flex gap-2">
              {reviews.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setDirection(i > activeIndex ? 1 : -1);
                    setActiveIndex(i);
                  }}
                  className={`h-2 rounded-full transition-all ${
                    i === activeIndex ? 'w-6 bg-brand-red' : 'w-2 bg-gray-300'
                  }`}
                  aria-label={`Отзыв ${i + 1}`}
                />
              ))}
            </div>

            <div className="flex gap-2">
              <button
                onClick={handlePrev}
                className="p-2.5 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors"
                aria-label="Предыдущий отзыв"
              >
                <ArrowLeft size={16} />
              </button>
              <button
                onClick={handleNext}
                className="p-2.5 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors"
                aria-label="Следующий отзыв"
              >
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
