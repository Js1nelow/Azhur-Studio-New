import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Phone, X, MessageSquare, ChevronRight } from 'lucide-react';
import { reachMetrikaGoal } from './YandexMetrika';

export function FloatingContactWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [imgError, setImgError] = useState(false);
  const widgetRef = useRef<HTMLDivElement>(null);

  // Close on outside click and Escape key
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent | TouchEvent) => {
      if (widgetRef.current && !widgetRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
      document.addEventListener('touchstart', handleOutsideClick);
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('touchstart', handleOutsideClick);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  const handleLinkClick = (channel: string) => {
    reachMetrikaGoal(`contact_${channel}`);
  };

  const contactLinks = [
    {
      id: 'telegram',
      title: 'Telegram',
      subtitle: 'Быстрый ответ в чате',
      href: 'https://t.me/+79253131799',
      target: '_blank',
      rel: 'noopener noreferrer',
      colorClasses: 'hover:border-[#229ED9]/50 hover:bg-[#229ED9]/10 text-[#229ED9]',
      badgeBg: 'bg-[#229ED9]/15 text-[#229ED9] border-[#229ED9]/30',
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
        </svg>
      )
    },
    {
      id: 'whatsapp',
      title: 'WhatsApp',
      subtitle: 'Написать в мессенджер',
      href: 'https://wa.me/79253131799',
      target: '_blank',
      rel: 'noopener noreferrer',
      colorClasses: 'hover:border-[#25D366]/50 hover:bg-[#25D366]/10 text-[#25D366]',
      badgeBg: 'bg-[#25D366]/15 text-[#25D366] border-[#25D366]/30',
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M19.05 4.91A9.816 9.816 0 0 0 12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01zm-7.01 15.24c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.83c.02 4.54-3.68 8.23-8.23 8.23zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.78.97-.15.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.15.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.44.06-.66.3-.23.25-.87.85-.87 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.07-.1-.23-.17-.48-.29z" />
        </svg>
      )
    },
    {
      id: 'max',
      title: 'MAX',
      subtitle: '+7 925 313-17-99',
      href: 'https://max.ru/+79253131799',
      target: '_blank',
      rel: 'noopener noreferrer',
      colorClasses: 'hover:border-purple-400/50 hover:bg-purple-500/10 text-purple-400',
      badgeBg: 'bg-purple-500/15 text-purple-300 border-purple-500/30',
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 2C6.48 2 2 6.48 2 12c0 1.82.49 3.53 1.34 5L2 22l5.2-1.31c1.42.79 3.06 1.31 4.8 1.31 5.52 0 10-4.48 10-10S17.52 2 12 2zm1 14.5h-2v-2h2v2zm0-4h-2V7h2v5.5z" />
        </svg>
      )
    },
    {
      id: 'phone',
      title: 'Позвонить',
      subtitle: '+7 (925) 313-17-99',
      href: 'tel:+79253131799',
      target: undefined,
      rel: undefined,
      colorClasses: 'hover:border-brand-red/50 hover:bg-brand-red/10 text-brand-red',
      badgeBg: 'bg-brand-red/15 text-brand-red border-brand-red/30',
      icon: <Phone size={18} strokeWidth={2} />
    }
  ];

  return (
    <div ref={widgetRef} className="fixed bottom-6 right-6 z-50 select-none font-sans">
      {/* Popover Card */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.94 }}
            transition={{ type: 'spring', stiffness: 380, damping: 28 }}
            className="absolute bottom-16 right-0 mb-2 w-[310px] sm:w-[340px] max-w-[calc(100vw-2rem)] origin-bottom-right rounded-2xl border border-white/10 bg-brand-card/95 p-4 sm:p-5 shadow-2xl shadow-black/90 backdrop-blur-xl text-brand-light"
            role="dialog"
            aria-modal="true"
            aria-label="Связаться с мастером"
          >
            {/* Header / Profile */}
            <div className="flex items-center justify-between pb-4 border-b border-brand-light/10">
              <div className="flex items-center gap-3">
                {/* Avatar with fallback & online badge */}
                <div className="relative shrink-0">
                  <div className="w-12 h-12 rounded-full overflow-hidden border border-brand-light/20 bg-brand-black flex items-center justify-center">
                    {!imgError ? (
                      <img
                        src="/azhur/photo/hero.webp"
                        alt="Олег Мисягин"
                        onError={() => setImgError(true)}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="font-display text-sm font-bold text-brand-light uppercase tracking-wider">
                        ОМ
                      </span>
                    )}
                  </div>
                  <span
                    className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-brand-card shadow-[0_0_8px_rgba(16,185,129,0.8)]"
                    title="Онлайн"
                  />
                </div>

                {/* Master Info */}
                <div className="space-y-0.5">
                  <h3 className="font-display text-sm font-bold text-white tracking-tight uppercase">
                    Олег Мисягин
                  </h3>
                  <p className="text-[11px] text-brand-gray font-sans leading-tight">
                    Мастер по натяжным потолкам
                  </p>
                  <p className="text-[10px] font-mono text-emerald-400 flex items-center gap-1.5 pt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Отвечаю в течение 5 минут
                  </p>
                </div>
              </div>

              {/* Close Button Inside Card */}
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="text-brand-gray hover:text-white p-1 rounded-lg transition-colors cursor-pointer"
                aria-label="Закрыть окно"
              >
                <X size={18} />
              </button>
            </div>

            {/* Subheader */}
            <p className="text-xs text-brand-gray py-3 font-sans">
              Выберите удобный способ связи для консультации или бесплатного замера:
            </p>

            {/* Action Buttons Column */}
            <div className="space-y-2">
              {contactLinks.map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  target={item.target}
                  rel={item.rel}
                  onClick={() => handleLinkClick(item.id)}
                  className={`group flex items-center justify-between p-3 rounded-xl border border-white/5 bg-brand-black/60 transition-all duration-200 ${item.colorClasses}`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-9 h-9 rounded-lg flex items-center justify-center border transition-transform duration-200 group-hover:scale-105 ${item.badgeBg}`}
                    >
                      {item.icon}
                    </div>
                    <div className="text-left">
                      <div className="text-xs font-semibold text-white tracking-wide">
                        {item.title}
                      </div>
                      <div className="text-[11px] text-brand-gray group-hover:text-white/80 transition-colors font-mono">
                        {item.subtitle}
                      </div>
                    </div>
                  </div>
                  <ChevronRight
                    size={16}
                    className="text-brand-gray/60 group-hover:text-white group-hover:translate-x-0.5 transition-all"
                  />
                </a>
              ))}
            </div>

            {/* Footer reassurance note */}
            <div className="mt-3 pt-2 text-center border-t border-brand-light/5">
              <span className="font-mono text-[9px] uppercase tracking-wider text-brand-gray/70">
                Консультация и выезд на замер — бесплатно
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-label={isOpen ? 'Закрыть контакты' : 'Связаться с мастером Олегом'}
        className={`relative flex items-center justify-center w-14 h-14 rounded-full shadow-2xl transition-all duration-300 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-red focus-visible:ring-offset-2 focus-visible:ring-offset-brand-black ${
          isOpen
            ? 'bg-brand-card border border-white/20 text-white hover:bg-brand-card/80 hover:rotate-90'
            : 'bg-brand-red text-white hover:bg-brand-red/90 hover:scale-105 active:scale-95 shadow-[0_0_24px_rgba(139,0,0,0.6)]'
        }`}
      >
        {/* Pulsing ring when closed */}
        {!isOpen && (
          <span className="absolute -inset-1 rounded-full bg-brand-red/40 animate-ping duration-1000 -z-10 pointer-events-none" />
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
              <X size={24} strokeWidth={2} />
            </motion.div>
          ) : (
            <motion.div
              key="chat-icon"
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.7, opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="relative"
            >
              <MessageSquare size={24} strokeWidth={1.8} />
              {/* Little notification ping dot */}
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-brand-red" />
            </motion.div>
          )}
        </AnimatePresence>
      </button>
    </div>
  );
}
