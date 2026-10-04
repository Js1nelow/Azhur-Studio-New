import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export const COOKIE_CONSENT_KEY = 'cookieConsent';

export function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [closing, setClosing] = useState(true);

  useEffect(() => {
    if (localStorage.getItem(COOKIE_CONSENT_KEY) !== 'true') {
      const timer = window.setTimeout(() => {
        setVisible(true);
        window.requestAnimationFrame(() => window.requestAnimationFrame(() => setClosing(false)));
      }, 500);
      return () => window.clearTimeout(timer);
    }
  }, []);

  const accept = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, 'true');
    window.dispatchEvent(new Event('cookie-consent-accepted'));
    setClosing(true);
    window.setTimeout(() => setVisible(false), 350);
  };

  if (!visible) return null;

  return (
    <aside className={`fixed inset-x-4 bottom-4 z-[100] mx-auto max-w-4xl border border-stone-200/90 bg-white/95 p-5 shadow-2xl shadow-stone-900/10 backdrop-blur-md rounded-2xl transition-all duration-300 md:bottom-6 md:p-6 ${closing ? 'translate-y-8 opacity-0' : 'translate-y-0 opacity-100'}`} role="dialog" aria-label="Уведомление о cookie">
      <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
        <p className="max-w-2xl text-xs sm:text-sm leading-relaxed text-gray-600">
          Мы используем файлы cookie и сервисы веб-аналитики (Яндекс.Метрика) для корректной работы сайта и улучшения пользовательского опыта. Продолжая использовать сайт, вы соглашаетесь с{' '}
          <Link to="/privacy" className="text-gray-900 font-semibold underline underline-offset-2 hover:text-brand-red transition-colors">
            Политикой конфиденциальности
          </Link>
          .
        </p>
        <button 
          type="button" 
          onClick={accept} 
          className="w-full shrink-0 bg-brand-red hover:bg-brand-red-hover px-7 py-2.5 font-sans text-xs uppercase tracking-wider font-bold text-white rounded-xl shadow-sm transition-all md:w-auto cursor-pointer"
        >
          Принять
        </button>
      </div>
    </aside>
  );
}
