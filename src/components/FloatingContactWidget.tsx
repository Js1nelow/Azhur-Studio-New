import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, MessageSquare } from 'lucide-react';
import { reachMetrikaGoal } from './YandexMetrika';

interface FloatingContactWidgetProps {
  onOpenCalculator?: (service?: string) => void;
}

export function FloatingContactWidget({ onOpenCalculator: _ }: FloatingContactWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [imgError, setImgError] = useState(false);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleOpen = () => {
    reachMetrikaGoal('contact_widget_open');
    setIsOpen(true);
  };

  const handleSaveContact = () => {
    reachMetrikaGoal('contact_phone');
    const vcard = [
      'BEGIN:VCARD',
      'VERSION:3.0',
      'N:Мысягин;Олег;;;',
      'FN:Олег Мысягин',
      'ORG:Azhur Studio',
      'TEL;TYPE=CELL,VOICE:+79253131799',
      'URL:https://azhur-studio.ru',
      'END:VCARD'
    ].join('\r\n');

    const blob = new Blob([vcard], { type: 'text/vcard;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'Олег_Мысягин.vcf');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  return (
    <>
      {/* Floating Action Trigger Button in Brand Palette */}
      <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-40 select-none">
        <button
          type="button"
          onClick={handleOpen}
          aria-expanded={isOpen}
          aria-label="Связаться с Олегом Мысягиным"
          className="relative flex items-center justify-center w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-brand-red hover:bg-brand-red-hover text-white shadow-[0_8px_25px_rgba(224,90,43,0.35)] hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer focus:outline-none"
        >
          <MessageSquare size={22} strokeWidth={1.8} />
        </button>
      </div>

      {/* Modal Dialog */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 select-none">
            {/* Soft Dark Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-xs"
              aria-hidden="true"
            />

            {/* Business Card Modal Container in Azhur Studio Warm Alabaster Palette */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 12 }}
              transition={{ type: 'spring', stiffness: 380, damping: 28 }}
              className="relative z-10 w-full max-w-[340px] bg-[#FAF9F6] border border-stone-200/90 rounded-2xl px-6 pt-6 pb-8 shadow-[0_25px_60px_rgba(0,0,0,0.15),0_10px_25px_rgba(224,90,43,0.06)] text-gray-900 font-sans text-center"
              role="dialog"
              aria-modal="true"
              aria-label="Контакты Олега Мысягина"
            >
              {/* Close Button Top-Right */}
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 text-stone-400 hover:text-gray-900 transition-colors p-1 cursor-pointer focus:outline-none"
                aria-label="Закрыть"
              >
                <X size={22} strokeWidth={1.5} />
              </button>

              {/* Centered Circular Avatar */}
              <div className="w-24 h-24 sm:w-28 sm:h-28 mx-auto rounded-full overflow-hidden mb-4 border-2 border-stone-200/90 bg-stone-100 shadow-sm">
                {!imgError ? (
                  <img
                    src="/azhur/photo/hero.webp"
                    alt="Олег Мысягин"
                    onError={() => setImgError(true)}
                    className="w-full h-full object-cover object-top"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-lg font-serif text-gray-900">
                    ОМ
                  </div>
                )}
              </div>

              {/* Name in Cormorant Garamond Serif */}
              <h3 className="font-serif text-2xl sm:text-[26px] text-gray-950 font-normal tracking-wide leading-tight mb-1.5">
                Олег Мысягин
              </h3>

              {/* Phone Link */}
              <a
                href="tel:+79253131799"
                onClick={() => reachMetrikaGoal('contact_phone')}
                className="inline-block text-stone-600 hover:text-brand-red text-base tracking-wider font-sans mb-6 transition-colors cursor-pointer"
              >
                +7 (925) 313-17-99
              </a>

              {/* Action Buttons Column */}
              <div className="flex flex-col gap-2.5">
                {/* WhatsApp */}
                <a
                  href="https://wa.me/79253131799"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => reachMetrikaGoal('contact_whatsapp')}
                  className="w-full h-12 flex items-center justify-center gap-2.5 border border-stone-300 hover:border-emerald-500/80 bg-white hover:bg-emerald-50/40 text-gray-900 text-sm font-sans tracking-wide transition-colors cursor-pointer shadow-2xs rounded-xs sm:rounded-none"
                >
                  <svg className="w-4 h-4 fill-emerald-600 shrink-0" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.04 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 15 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67M9.53 7.15C9.36 7.15 9.08 7.22 8.84 7.48C8.6 7.74 7.93 8.37 7.93 9.65C7.93 10.93 8.87 12.16 9 12.33C9.13 12.5 10.82 15.11 13.43 16.23C15.6 17.17 16.04 16.98 16.52 16.93C17 16.89 18.07 16.3 18.3 15.66C18.53 15.02 18.53 14.47 18.46 14.36C18.39 14.25 18.22 14.18 17.96 14.05C17.7 13.92 16.42 13.29 16.18 13.2C15.94 13.12 15.77 13.07 15.6 13.33C15.43 13.58 14.94 14.18 14.79 14.35C14.64 14.52 14.5 14.54 14.24 14.41C13.98 14.28 12.89 13.92 11.6 12.77C10.59 11.87 9.91 10.76 9.71 10.42C9.51 10.08 9.69 9.9 9.82 9.77C9.94 9.65 10.08 9.46 10.22 9.3C10.36 9.14 10.41 9.02 10.5 8.84C10.59 8.66 10.54 8.51 10.48 8.38C10.41 8.25 9.91 7.02 9.71 6.54C9.51 6.07 9.31 6.13 9.16 6.13H8.84C8.68 6.13 8.5 6.19 8.35 6.35C8.07 6.63 7.55 7.15 7.55 8.16" />
                  </svg>
                  <span>WhatsApp</span>
                </a>

                {/* Telegram */}
                <a
                  href="https://t.me/+79253131799"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => reachMetrikaGoal('contact_telegram')}
                  className="w-full h-12 flex items-center justify-center gap-2.5 border border-stone-300 hover:border-sky-500/80 bg-white hover:bg-sky-50/40 text-gray-900 text-sm font-sans tracking-wide transition-colors cursor-pointer shadow-2xs rounded-xs sm:rounded-none"
                >
                  <svg className="w-4 h-4 fill-sky-500 shrink-0" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.75-.55 2.92-1.27 4.86-2.11 5.83-2.52 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .36z" />
                  </svg>
                  <span>Telegram</span>
                </a>

                {/* Сохранить контакт in Brand Terracotta */}
                <button
                  type="button"
                  onClick={handleSaveContact}
                  className="w-full h-12 flex items-center justify-center bg-brand-red hover:bg-brand-red-hover text-white text-sm font-sans font-medium tracking-wide transition-colors cursor-pointer shadow-sm rounded-xs sm:rounded-none"
                >
                  Сохранить контакт
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
