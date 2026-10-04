import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, X, Play, ChevronLeft, ChevronRight } from 'lucide-react';
import { LazyVideo } from './LazyVideo';

interface WorksBentoProps {
  onOpenCalculator: (service?: string) => void;
}

interface BentoItem {
  id: number;
  title: string;
  location: string;
  used: string;
  thumbnailVideo?: string;
  thumbnailImage?: string;
  galleryImages: string[];
  gridClass: string;
  serviceName: string;
}

const bentoItems: BentoItem[] = [
  {
    id: 1,
    title: "Парящий потолок с дизайнерским освещением",
    location: "Лобня",
    used: "Полотно Teqtum Euro, профиль Flexy Borzz Fly Max, встраиваемый карниз Flexy Borzz P45",
    thumbnailVideo: "/new_image_azhur/lobnya.mp4",
    galleryImages: [],
    gridClass: "sm:col-span-2 lg:col-span-2 lg:row-span-2 h-[340px] sm:h-[400px] lg:h-[580px]",
    serviceName: "Натяжные потолки"
  },
  {
    id: 2,
    title: "Теневое примыкание в частном доме",
    location: "Озерецкое",
    used: "Потолки MSD Evolution, теневое примыкание EuroKraab X, встраиваемые карнизы ПК14",
    thumbnailVideo: "/new_image_azhur/ozereckoe.mp4",
    galleryImages: [],
    gridClass: "sm:col-span-1 lg:col-span-1 lg:row-span-1 h-[240px] sm:h-[280px]",
    serviceName: "Теневой профиль"
  },
  {
    id: 3,
    title: "Парящий потолок с магнитными треками",
    location: "Звенигород",
    used: "Теневой профиль EuroKraab 2.0, парящий Flexy Borz Fly Max, ниши под электрокарнизы Lumfer PDK60, встраиваемые магнитные треки",
    thumbnailVideo: "/new_image_azhur/zvenigorod.mp4",
    galleryImages: [],
    gridClass: "sm:col-span-1 lg:col-span-1 lg:row-span-1 h-[240px] sm:h-[280px]",
    serviceName: "Карнизные решения"
  },
  {
    id: 4,
    title: "Классика и современность в одном решении",
    location: "Клинский район",
    used: "Плёнка ПВХ Bauf 270, теневое и парящее примыкания к стенам",
    thumbnailVideo: "/new_image_azhur/klinskiy.mp4",
    galleryImages: [],
    gridClass: "sm:col-span-2 lg:col-span-2 lg:row-span-1 h-[240px] sm:h-[280px]",
    serviceName: "Световые линии и треки"
  },
  {
    id: 5,
    title: "Стильная спальня с нишей для штор",
    location: "Москва, ул. Нежинская",
    used: "Потолок ПВХ Bauf 270, теневое примыкание EuroKraab, ниша для штор Lumfer PDK100",
    thumbnailVideo: "/new_image_azhur/nezhinskaya/1.mp4",
    galleryImages: [
      "/new_image_azhur/nezhinskaya/1.webp",
      "/new_image_azhur/nezhinskaya/2.webp",
      "/new_image_azhur/nezhinskaya/3.webp",
      "/new_image_azhur/nezhinskaya/4.webp",
      "/new_image_azhur/nezhinskaya/5.webp"
    ],
    gridClass: "sm:col-span-2 lg:col-span-4 lg:row-span-1 h-[260px] sm:h-[300px]",
    serviceName: "Натяжные потолки"
  }
];

export function WorksBento({ onOpenCalculator }: WorksBentoProps) {
  const [activeItem, setActiveItem] = useState<BentoItem | null>(null);
  const [activeMobileIndex, setActiveMobileIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveItem(null);
      }
    };
    if (activeItem) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [activeItem]);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, clientWidth } = scrollRef.current;
    const index = Math.round(scrollLeft / (clientWidth * 0.85));
    setActiveMobileIndex(Math.min(Math.max(index, 0), bentoItems.length - 1));
  };

  const scrollPrev = () => {
    if (!scrollRef.current) return;
    const itemWidth = scrollRef.current.clientWidth * 0.85;
    scrollRef.current.scrollBy({ left: -itemWidth, behavior: 'smooth' });
  };

  const scrollNext = () => {
    if (!scrollRef.current) return;
    const itemWidth = scrollRef.current.clientWidth * 0.85;
    scrollRef.current.scrollBy({ left: itemWidth, behavior: 'smooth' });
  };

  return (
    <section id="works" className="relative bg-white pt-16 pb-20 md:pt-28 md:pb-28 border-t border-stone-200/80 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 md:px-12 lg:px-16">
        
        {/* Section Header */}
        <div className="mb-8 md:mb-16 max-w-3xl">
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-gray-950 tracking-tight mb-3" id="works-title">
            Реальные работы со сметами
          </h2>
          <p className="text-gray-600 text-sm sm:text-lg leading-relaxed" id="works-subtitle">
            Каждый объект снят сразу после чистового монтажа. Нажмите на видео, чтобы посмотреть качество швов, углов и зазоров.
          </p>
        </div>

        {/* MOBILE VIEW: Touch-optimized horizontal snap slider */}
        <div className="md:hidden">
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex gap-3.5 overflow-x-auto snap-x snap-mandatory scrollbar-none -mx-5 px-5 pb-4 pt-1"
          >
            {bentoItems.map((item, idx) => (
              <div
                key={item.id}
                onClick={() => setActiveItem(item)}
                className="w-[84vw] max-w-[330px] shrink-0 snap-center rounded-2xl overflow-hidden aspect-[4/5] relative bg-gray-950 border border-stone-200/90 shadow-md cursor-pointer flex flex-col justify-between p-4"
              >
                {/* Background Video / Image */}
                <div className="absolute inset-0 w-full h-full overflow-hidden">
                  {item.thumbnailVideo ? (
                    <LazyVideo
                      src={item.thumbnailVideo}
                      muted
                      loop
                      playsInline
                      className="w-full h-full object-cover"
                    />
                  ) : item.thumbnailImage ? (
                    <img
                      src={item.thumbnailImage}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  ) : null}
                  {/* High contrast gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/35 to-black/25" />
                </div>

                {/* Top Badges */}
                <div className="relative z-10 flex items-center justify-between">
                  <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-white/95 text-gray-900 shadow-sm backdrop-blur-xs">
                    {item.location}
                  </span>
                  <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-black/50 text-white/90 backdrop-blur-xs border border-white/20">
                    Видео • 0:15
                  </span>
                </div>

                {/* Center Play Indicator */}
                <div className="relative z-10 self-center my-auto">
                  <div className="w-13 h-13 rounded-full bg-brand-red/90 text-white flex items-center justify-center shadow-lg backdrop-blur-xs border border-white/30 transform active:scale-95 transition-transform">
                    <Play size={20} className="fill-current ml-0.5" />
                  </div>
                </div>

                {/* Bottom Content */}
                <div className="relative z-10">
                  <span className="text-[11px] font-semibold text-orange-300 uppercase tracking-wider block mb-1">
                    {item.serviceName}
                  </span>
                  <h3 className="text-sm font-bold text-white leading-snug line-clamp-2">
                    {item.title}
                  </h3>
                  <div className="mt-2.5 flex items-center justify-between text-xs text-stone-300 pt-2 border-t border-white/15">
                    <span>Смотреть детали и смету</span>
                    <ArrowUpRight size={14} className="text-orange-400" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile pagination indicator & buttons */}
          <div className="flex items-center justify-between mt-3 px-1">
            {/* Dots */}
            <div className="flex items-center gap-1.5">
              {bentoItems.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => {
                    if (!scrollRef.current) return;
                    const itemWidth = scrollRef.current.clientWidth * 0.85;
                    scrollRef.current.scrollTo({ left: i * itemWidth, behavior: 'smooth' });
                  }}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    activeMobileIndex === i ? 'w-6 bg-brand-red' : 'w-1.5 bg-stone-300'
                  }`}
                  aria-label={`Кейс ${i + 1}`}
                />
              ))}
            </div>

            {/* Counter & Arrow Buttons */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500 font-medium">
                {activeMobileIndex + 1} / {bentoItems.length}
              </span>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={scrollPrev}
                  disabled={activeMobileIndex === 0}
                  className={`w-10 h-10 rounded-full bg-white border border-stone-200/90 shadow-2xs flex items-center justify-center text-gray-700 transition-all cursor-pointer ${
                    activeMobileIndex === 0 ? 'opacity-35 cursor-not-allowed' : 'active:scale-95 hover:bg-stone-50'
                  }`}
                  aria-label="Предыдущий кейс"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  type="button"
                  onClick={scrollNext}
                  disabled={activeMobileIndex === bentoItems.length - 1}
                  className={`w-10 h-10 rounded-full bg-white border border-stone-200/90 shadow-2xs flex items-center justify-center text-gray-700 transition-all cursor-pointer ${
                    activeMobileIndex === bentoItems.length - 1 ? 'opacity-35 cursor-not-allowed' : 'active:scale-95 hover:bg-stone-50'
                  }`}
                  aria-label="Следующий кейс"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* DESKTOP VIEW: Bento Grid Gallery */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6" id="works-bento-grid">
          {bentoItems.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className={`relative group overflow-hidden rounded-2xl border border-stone-200/90 bg-gray-900 flex flex-col justify-end p-5 sm:p-6 cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300 ${item.gridClass}`}
              onClick={() => setActiveItem(item)}
            >
              {/* Dark overlay specifically for video contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20 z-10 transition-opacity duration-300 group-hover:from-black/95" />

              {/* Video or Image Background */}
              <div className="absolute inset-0 w-full h-full overflow-hidden bg-black">
                {item.thumbnailVideo ? (
                  <LazyVideo
                    src={item.thumbnailVideo}
                    muted
                    loop
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                ) : item.thumbnailImage ? (
                  <img
                    src={item.thumbnailImage}
                    alt={item.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                ) : null}
              </div>

              {/* Top location badge & play icon */}
              <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-none">
                <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-white/90 backdrop-blur-md text-gray-900 shadow-xs">
                  {item.location}
                </span>
                <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-brand-red group-hover:scale-110 transition-all duration-300">
                  <Play size={14} className="fill-current ml-0.5" />
                </div>
              </div>

              {/* Bottom text overlay */}
              <div className="relative z-20">
                <div className="text-[11px] font-medium text-orange-300 uppercase tracking-wider mb-1">
                  {item.serviceName}
                </div>
                <h3 className="text-sm sm:text-base font-bold text-white leading-snug group-hover:text-orange-100 transition-colors">
                  {item.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Lightbox / Video Modal (Responsive on both desktop and mobile) */}
      <AnimatePresence>
        {activeItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-3 sm:p-6"
            onClick={() => setActiveItem(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
              className="relative bg-white border border-stone-200/90 rounded-2xl flex flex-col overflow-hidden shadow-2xl max-w-4xl w-full max-h-[92vh] md:grid md:grid-cols-5"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button - High visibility */}
              <button
                onClick={() => setActiveItem(null)}
                className="absolute top-3 right-3 z-50 p-2 text-white bg-black/60 hover:bg-black rounded-full shadow-lg transition-all cursor-pointer backdrop-blur-xs"
                aria-label="Закрыть"
              >
                <X size={18} />
              </button>

              {/* Media Container */}
              <div className="relative bg-black flex items-center justify-center overflow-hidden md:col-span-3 min-h-[220px] sm:min-h-[340px] md:min-h-[440px]">
                {activeItem.thumbnailVideo ? (
                  <video
                    src={activeItem.thumbnailVideo}
                    autoPlay
                    controls
                    loop
                    playsInline
                    className="w-full h-full max-h-[50vh] md:max-h-[75vh] object-contain"
                  />
                ) : activeItem.thumbnailImage ? (
                  <img
                    src={activeItem.thumbnailImage}
                    alt={activeItem.title}
                    className="w-full h-full max-h-[50vh] md:max-h-[75vh] object-contain"
                  />
                ) : null}
              </div>

              {/* Details & CTA Panel */}
              <div className="md:col-span-2 p-5 sm:p-7 flex flex-col justify-between bg-white text-gray-900 overflow-y-auto">
                <div className="space-y-3.5">
                  <span className="text-xs font-semibold px-2.5 py-1 rounded bg-orange-50 text-brand-red border border-orange-200 w-fit block">
                    {activeItem.serviceName}
                  </span>
                  
                  <h3 className="text-base sm:text-xl font-bold text-gray-950 leading-snug">
                    {activeItem.title}
                  </h3>
                  
                  <div className="py-3 border-t border-b border-stone-200 space-y-2.5">
                    <div>
                      <span className="text-[11px] text-gray-500 font-medium block">Локация объекта</span>
                      <span className="text-xs sm:text-sm font-semibold text-gray-900">{activeItem.location}</span>
                    </div>
                    <div>
                      <span className="text-[11px] text-gray-500 font-medium block">Использованные материалы</span>
                      <span className="text-xs text-gray-700 leading-relaxed block">{activeItem.used}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-5 pt-1">
                  <button
                    onClick={() => {
                      const service = activeItem.serviceName;
                      setActiveItem(null);
                      setTimeout(() => {
                        onOpenCalculator(service);
                      }, 200);
                    }}
                    className="w-full flex items-center justify-center gap-2 bg-brand-red hover:bg-brand-red-hover text-white text-sm font-semibold py-3.5 px-5 rounded-xl shadow-md transition-all cursor-pointer"
                  >
                    <span>Рассчитать такой потолок</span>
                    <ArrowUpRight size={16} />
                  </button>
                </div>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
