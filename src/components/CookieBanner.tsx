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
    <aside className={`fixed inset-x-3 bottom-3 z-[100] mx-auto max-w-5xl border border-white/10 bg-[#111]/95 p-5 shadow-2xl shadow-black/60 backdrop-blur-xl transition-all duration-300 md:bottom-6 md:p-6 ${closing ? 'translate-y-8 opacity-0' : 'translate-y-0 opacity-100'}`} role="dialog" aria-label="Уведомление о cookie">
      <div className="flex flex-col items-start gap-5 md:flex-row md:items-center md:justify-between">
        <p className="max-w-3xl text-sm leading-relaxed text-brand-gray">
          Мы используем файлы cookie и сервисы веб-аналитики (Яндекс.Метрика) для корректной работы сайта. Продолжая использовать сайт, вы соглашаетесь с нашей{' '}
          <Link to="/privacy/" className="text-brand-light underline decoration-brand-red underline-offset-4 hover:text-brand-red">Политикой конфиденциальности</Link>.
        </p>
        <button type="button" onClick={accept} className="w-full shrink-0 bg-brand-red px-8 py-3 font-mono text-xs uppercase tracking-widest text-white transition-colors hover:bg-brand-red/90 md:w-auto">Принять</button>
      </div>
    </aside>
  );
}
