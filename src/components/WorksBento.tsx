import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, X, Maximize2, Minimize2, ChevronLeft, ChevronRight, Play } from 'lucide-react';
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
  const [isMaximized, setIsMaximized] = useState(false);
  const [currentGalleryIndex, setCurrentGalleryIndex] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isMaximized) {
          setIsMaximized(false);
        } else {
          setActiveItem(null);
        }
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
  }, [activeItem, isMaximized]);

  return (
    <section id="works" className="relative bg-white pt-20 pb-20 md:pt-28 md:pb-28 border-t border-gray-200">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16">
        
        {/* Section Header */}
        <div className="mb-12 md:mb-16 max-w-3xl">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-950 tracking-tight mb-4" id="works-title">
            Реальные работы с видеоотчетами
          </h2>
          <p className="text-gray-600 text-base sm:text-lg leading-relaxed" id="works-subtitle">
            Каждый объект снят сразу после завершения чистового монтажа. Нажмите на видео, чтобы посмотреть детали и используемые профили.
          </p>
        </div>

        {/* Bento Grid Gallery */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6" id="works-bento-grid">
          {bentoItems.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className={`relative group overflow-hidden rounded-2xl border border-gray-200 bg-gray-900 flex flex-col justify-end p-5 sm:p-6 cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300 ${item.gridClass}`}
              onClick={() => {
                setActiveItem(item);
                setCurrentGalleryIndex(0);
              }}
            >
              {/* Dark overlay specifically for video contrast so text is always crystal clear */}
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

      {/* Lightbox / Video Modal */}
      <AnimatePresence>
        {activeItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 sm:p-6"
            onClick={() => {
              setActiveItem(null);
              setIsMaximized(false);
            }}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className={`relative bg-white border border-gray-200 rounded-2xl flex flex-col overflow-hidden shadow-2xl transition-all duration-300 ${
                isMaximized 
                  ? 'w-full h-full max-w-none bg-black border-none justify-center items-center' 
                  : 'max-w-4xl w-full md:grid md:grid-cols-5'
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => {
                  setActiveItem(null);
                  setIsMaximized(false);
                }}
                className="absolute top-4 right-4 z-40 p-2 text-gray-500 hover:text-gray-900 bg-white/90 hover:bg-white rounded-full shadow-md transition-all cursor-pointer"
                aria-label="Закрыть"
              >
                <X size={20} />
              </button>

              {/* Media Container */}
              <div className={`relative bg-black flex items-center justify-center overflow-hidden ${
                isMaximized ? 'w-full h-full' : 'md:col-span-3 min-h-[320px] sm:min-h-[420px]'
              }`}>
                {activeItem.thumbnailVideo ? (
                  <video
                    src={activeItem.thumbnailVideo}
                    autoPlay
                    controls
                    loop
                    playsInline
                    className="w-full h-full max-h-[75vh] object-contain"
                  />
                ) : activeItem.thumbnailImage ? (
                  <img
                    src={activeItem.thumbnailImage}
                    alt={activeItem.title}
                    className="w-full h-full max-h-[75vh] object-contain"
                  />
                ) : null}
              </div>

              {/* Details & CTA Panel */}
              {!isMaximized && (
                <div className="md:col-span-2 p-6 sm:p-8 flex flex-col justify-between bg-white text-gray-900">
                  <div className="space-y-4">
                    <span className="text-xs font-semibold px-2.5 py-1 rounded bg-orange-50 text-brand-red border border-orange-200 w-fit block">
                      {activeItem.serviceName}
                    </span>
                    
                    <h3 className="text-lg sm:text-xl font-bold text-gray-950 leading-snug">
                      {activeItem.title}
                    </h3>
                    
                    <div className="py-4 border-t border-b border-gray-200 space-y-3">
                      <div>
                        <span className="text-xs text-gray-500 font-medium block mb-0.5">Локация</span>
                        <span className="text-sm font-semibold text-gray-900">{activeItem.location}</span>
                      </div>
                      <div>
                        <span className="text-xs text-gray-500 font-medium block mb-0.5">Использованные материалы</span>
                        <span className="text-xs text-gray-700 leading-relaxed block">{activeItem.used}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-2">
                    <button
                      onClick={() => {
                        const service = activeItem.serviceName;
                        setActiveItem(null);
                        setTimeout(() => {
                          onOpenCalculator(service);
                        }, 200);
                      }}
                      className="w-full flex items-center justify-center gap-2 bg-brand-red hover:bg-brand-red-hover text-white text-sm font-semibold py-3.5 px-5 rounded-lg shadow-sm hover:shadow-md transition-all cursor-pointer"
                    >
                      <span>Рассчитать такой потолок</span>
                      <ArrowUpRight size={16} />
                    </button>
                  </div>
                </div>
              )}

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
