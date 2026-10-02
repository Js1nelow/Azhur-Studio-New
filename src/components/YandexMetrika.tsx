import { useEffect } from 'react';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';

const COUNTER_ID = 111296243;
const CONSENT_KEY = 'cookieConsent';

declare global {
  interface Window {
    ym?: (...args: unknown[]) => void;
    __yandexMetrikaInitialized?: boolean;
    __yandexMetrikaLastUrl?: string;
  }
}

export function reachMetrikaGoal(goal: string) {
  window.ym?.(COUNTER_ID, 'reachGoal', goal);
}

export function YandexMetrika() {
  const location = useLocation();
  const [hasConsent, setHasConsent] = useState(() => localStorage.getItem(CONSENT_KEY) === 'true');

  useEffect(() => {
    const accept = () => setHasConsent(true);
    window.addEventListener('cookie-consent-accepted', accept);
    return () => window.removeEventListener('cookie-consent-accepted', accept);
  }, []);

  useEffect(() => {
    if (!hasConsent) return;
    if (!window.ym) {
      const ymFunc = function (...args: unknown[]) {
        const fn = ymFunc as unknown as { a: unknown[] };
        fn.a = fn.a || [];
        fn.a.push(args);
      };
      (ymFunc as unknown as { a: unknown[] }).a = [];
      window.ym = ymFunc as unknown as Window['ym'];

      const script = document.createElement('script');
      script.async = true;
      script.src = `https://mc.yandex.ru/metrika/tag.js?id=${COUNTER_ID}`;
      document.head.appendChild(script);
    }

    if (!window.__yandexMetrikaInitialized) {
      window.ym?.(COUNTER_ID, 'init', {
        defer: true,
        ssr: true,
        webvisor: true,
        clickmap: true,
        trackLinks: true,
        accurateTrackBounce: true,
        ecommerce: 'dataLayer',
      });
      window.__yandexMetrikaInitialized = true;
    }
  }, [hasConsent]);

  useEffect(() => {
    if (!hasConsent) return;
    const url = window.location.href;
    if (window.__yandexMetrikaLastUrl === url) return;

    window.ym?.(COUNTER_ID, 'hit', url, {
      title: document.title,
      referer: window.__yandexMetrikaLastUrl || document.referrer,
    });
    window.__yandexMetrikaLastUrl = url;
  }, [hasConsent, location.pathname, location.search, location.hash]);

  return null;
}
