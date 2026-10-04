import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Phone, ChevronRight, X, MessageCircle, Calculator } from 'lucide-react';
import { reachMetrikaGoal } from './YandexMetrika';

interface FloatingContactWidgetProps {
  onOpenCalculator?: (service?: string) => void;
}

export function FloatingContactWidget({ onOpenCalculator }: FloatingContactWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [imgError, setImgError] = useState(false);
  const [showTeaser, setShowTeaser] = useState(true);
  const widgetRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (widgetRef.current && !widgetRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Hide teaser on scroll to avoid cluttering
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400 && showTeaser) {
        setShowTeaser(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [showTeaser]);

  const handleLinkClick = (id: string) => {
    if (id === 'telegram') reachMetrikaGoal('contact_telegram');
    if (id === 'whatsapp') reachMetrikaGoal('contact_whatsapp');
    if (id === 'phone') reachMetrikaGoal('contact_phone');
    setIsOpen(false);
  };

  const handleToggle = () => {
    if (!isOpen) {
      reachMetrikaGoal('contact_widget_open');
      setShowTeaser(false);
    }
    setIsOpen((prev) => !prev);
  };

  const contactLinks = [
    {
      id: 'telegram',
      title: 'Telegram',
      subtitle: 'Быстрый ответ мастера • Присылайте фото или чертёж',
      href: 'https://t.me/+79253131799',
      target: '_blank',
      rel: 'noopener noreferrer',
      iconBg: 'bg-sky-50 text-sky-500 border border-sky-200/80 group-hover:scale-105 transition-transform',
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.75-.55 2.92-1.27 4.86-2.11 5.83-2.52 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .36z" />
        </svg>
      )
    },
    {
      id: 'whatsapp',
      title: 'WhatsApp',
      subtitle: 'Консультация и предварительный расчёт сметы',
      href: 'https://wa.me/79253131799?text=' + encodeURIComponent('Здравствуйте, Олег! Хочу рассчитать стоимость натяжного потолка.'),
      target: '_blank',
      rel: 'noopener noreferrer',
      iconBg: 'bg-emerald-50 text-emerald-600 border border-emerald-200/80 group-hover:scale-105 transition-transform',
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.04 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 15 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67M9.53 7.15C9.36 7.15 9.08 7.22 8.84 7.48C8.6 7.74 7.93 8.37 7.93 9.65C7.93 10.93 8.87 12.16 9 12.33C9.13 12.5 10.82 15.11 13.43 16.23C15.6 17.17 16.04 16.98 16.52 16.93C17 16.89 18.07 16.3 18.3 15.66C18.53 15.02 18.53 14.47 18.46 14.36C18.39 14.25 18.22 14.18 17.96 14.05C17.7 13.92 16.42 13.29 16.18 13.2C15.94 13.12 15.77 13.07 15.6 13.33C15.43 13.58 14.94 14.18 14.79 14.35C14.64 14.52 14.5 14.54 14.24 14.41C13.98 14.28 12.89 13.92 11.6 12.77C10.59 11.87 9.91 10.76 9.71 10.42C9.51 10.08 9.69 9.9 9.82 9.77C9.94 9.65 10.08 9.46 10.22 9.3C10.36 9.14 10.41 9.02 10.5 8.84C10.59 8.66 10.54 8.51 10.48 8.38C10.41 8.25 9.91 7.02 9.71 6.54C9.51 6.07 9.31 6.13 9.16 6.13H8.84C8.68 6.13 8.5 6.19 8.35 6.35C8.07 6.63 7.55 7.15 7.55 8.16" />
        </svg>
      )
    },
    {
      id: 'phone',
      title: 'Позвонить мастеру',
      subtitle: '+7 (925) 313-17-99 • Прямой диалог без менеджеров',
      href: 'tel:+79253131799',
      target: undefined,
      rel: undefined,
      iconBg: 'bg-orange-50 text-brand-red border border-orange-200/80 group-hover:scale-105 transition-transform',
      icon: <Phone size={18} strokeWidth={2} />
    }
  ];

  return (
    <div ref={widgetRef} className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 select-none font-sans">
      {/* Popover Card */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 420, damping: 32 }}
            className="absolute bottom-16 right-0 mb-3 w-[320px] sm:w-[360px] max-w-[calc(100vw-2rem)] origin-bottom-right rounded-3xl border border-stone-200/90 bg-white/98 backdrop-blur-xl p-5 sm:p-6 shadow-[0_24px_60px_rgba(0,0,0,0.14),0_8px_20px_rgba(224,90,43,0.06)] text-gray-900"
            role="dialog"
            aria-modal="true"
            aria-label="Связаться с ведущим мастером"
          >
            {/* Header / Master Profile */}
            <div className="flex items-start justify-between pb-3.5 border-b border-stone-100">
              <div className="flex items-center gap-3">
                {/* Avatar with status indicator */}
                <div className="relative shrink-0">
                  <div className="w-13 h-13 rounded-full overflow-hidden border-2 border-stone-200 shadow-2xs bg-stone-100 flex items-center justify-center">
                    {!imgError ? (
                      <img
                        src="/azhur/photo/hero.webp"
                        alt="Олег Мисягин"
                        onError={() => setImgError(true)}
                        className="w-full h-full object-cover object-top"
                      />
                    ) : (
                      <span className="text-sm font-bold text-gray-800">
                        ОМ
                      </span>
                    )}
                  </div>
                  <span
                    className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white ring-2 ring-emerald-500/20"
                    title="Онлайн"
                  />
                </div>

                {/* Master Info & Live Status */}
                <div>
                  <h3 className="text-base font-extrabold text-gray-950 tracking-tight leading-snug">
                    Олег Мисягин
                  </h3>
                  <p className="text-xs text-gray-600 font-normal">
                    Основатель и ведущий мастер
                  </p>
                  <div className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/60 mt-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span>На связи • Отвечаю за 5 мин</span>
                  </div>
                </div>
              </div>

              {/* Close Button Inside Card */}
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-gray-800 p-1.5 rounded-xl hover:bg-stone-100 transition-colors cursor-pointer -mr-1"
                aria-label="Закрыть окно"
              >
                <X size={18} />
              </button>
            </div>

            {/* Warm Personal Greeting */}
            <div className="my-3.5 p-3 bg-[#FAF9F6] rounded-2xl border border-stone-200/80 text-xs text-gray-700 leading-relaxed">
              «Здравствуйте! Я сейчас на объекте или в мастерской. Выберите, куда удобнее прислать предварительный расчёт, или сразу звоните.»
            </div>

            {/* Action Buttons Column */}
            <div className="space-y-2">
              {contactLinks.map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  target={item.target}
                  rel={item.rel}
                  onClick={() => handleLinkClick(item.id)}
                  className="group flex items-center justify-between p-3 rounded-2xl border border-stone-200/80 bg-white hover:bg-stone-50/80 hover:border-stone-300 hover:shadow-2xs transition-all duration-200"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${item.iconBg}`}
                    >
                      {item.icon}
                    </div>
                    <div className="text-left">
                      <div className="text-xs font-bold text-gray-950">
                        {item.title}
                      </div>
                      <div className="text-[11px] text-gray-600 line-clamp-1">
                        {item.subtitle}
                      </div>
                    </div>
                  </div>
                  <ChevronRight
                    size={16}
                    className="text-stone-400 group-hover:text-gray-900 group-hover:translate-x-0.5 transition-all shrink-0 ml-1"
                  />
                </a>
              ))}
            </div>

            {/* Quick Topic Chips */}
            <div className="mt-3.5 pt-3 border-t border-stone-100">
              <div className="text-[11px] font-medium text-gray-500 mb-2">Быстрый старт:</div>
              <div className="flex flex-wrap gap-1.5">
                <button
                  type="button"
                  onClick={() => {
                    setIsOpen(false);
                    onOpenCalculator?.('Экспресс-расчёт');
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-stone-100 hover:bg-orange-50 hover:text-brand-red hover:border-orange-200 rounded-xl border border-stone-200/70 text-[11px] font-semibold text-gray-700 transition-all cursor-pointer shadow-2xs"
                >
                  <Calculator size={12} className="text-brand-red shrink-0" />
                  <span>Рассчитать смету онлайн</span>
                </button>
                <a
                  href={'https://wa.me/79253131799?text=' + encodeURIComponent('Здравствуйте, Олег! Хочу прислать фото/план помещения для расчёта стоимости.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => handleLinkClick('whatsapp')}
                  className="inline-flex items-center gap-1 px-3 py-1.5 bg-stone-100 hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-200 rounded-xl border border-stone-200/70 text-[11px] font-semibold text-gray-700 transition-all cursor-pointer shadow-2xs"
                >
                  <span>📸 Прислать фото / чертёж</span>
                </a>
              </div>
            </div>

            {/* Footer reassurance note */}
            <div className="mt-3 pt-2 text-center border-t border-stone-100">
              <span className="text-[10px] text-gray-400 font-medium">
                Консультация и выезд на замер — бесплатно • Без спама
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Trigger Row (Teaser + Button) */}
      <div className="flex items-center">
        {/* Subtle Live Teaser Chip (Desktop & Tablet) */}
        <AnimatePresence>
          {!isOpen && showTeaser && (
            <motion.div
              initial={{ opacity: 0, x: 20, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 10, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              onClick={handleToggle}
              className="mr-3 hidden sm:flex items-center gap-2 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-full border border-stone-200/90 shadow-md text-xs font-semibold text-gray-800 cursor-pointer hover:border-brand-red/30 transition-all group"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
              <span>Олег на связи</span>
              <span className="text-[10px] text-gray-400 font-normal">·</span>
              <span className="text-[11px] text-brand-red font-medium group-hover:underline">Задать вопрос</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating Action Trigger Button */}
        <button
          type="button"
          onClick={handleToggle}
          aria-expanded={isOpen}
          aria-label={isOpen ? 'Закрыть контакты' : 'Связаться с мастером Олегом'}
          className={`relative flex items-center justify-center w-14 h-14 rounded-full transition-all duration-300 cursor-pointer focus:outline-none ${
            isOpen
              ? 'bg-gray-900 text-white hover:bg-gray-800 shadow-md'
              : 'bg-gradient-to-tr from-brand-red to-orange-500 text-white shadow-[0_8px_25px_rgba(224,90,43,0.35)] hover:shadow-[0_12px_32px_rgba(224,90,43,0.48)] hover:scale-105 active:scale-95'
          }`}
        >
          {/* Subtle Ambient Pulse Ring when closed */}
          {!isOpen && (
            <span className="absolute inset-0 rounded-full bg-brand-red/30 animate-ping pointer-events-none" style={{ animationDuration: '3.5s' }} />
          )}

          <AnimatePresence mode="wait" initial={false}>
            {isOpen ? (
              <motion.div
                key="close-icon"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <X size={22} strokeWidth={2.5} />
              </motion.div>
            ) : (
              <motion.div
                key="phone-icon"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="relative"
              >
                <MessageCircle size={24} strokeWidth={2} />
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </div>
    </div>
  );
}
