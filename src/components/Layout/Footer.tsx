import { motion } from 'motion/react';
import { Phone, Mail, MapPin } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-black border-t border-brand-light/10 py-16 text-brand-gray relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-red/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12 pb-12 border-b border-brand-light/10">
          
          {/* Column 1: Brand */}
          <div className="md:col-span-2 space-y-4">
            <span className="font-display font-medium tracking-tighter text-xl sm:text-2xl uppercase text-brand-light">
              АЖУР<span className="text-brand-red">.</span>
            </span>
            <p className="font-mono text-xs text-brand-gray uppercase tracking-wider max-w-sm">
              Профессиональное проектирование и чистый монтаж натяжных систем освещения и премиальных потолков в Москве и МО.
            </p>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="space-y-4">
            <h4 className="font-mono text-xs uppercase tracking-widest text-brand-light border-b border-brand-light/10 pb-2">Разделы</h4>
            <ul className="space-y-2 font-mono text-xs uppercase">
              <li>
                <a href="#hero" className="hover:text-brand-red transition-colors">Главная</a>
              </li>
              <li>
                <a href="#works" className="hover:text-brand-red transition-colors">Портфолио</a>
              </li>
              <li>
                <a href="#services" className="hover:text-brand-red transition-colors">Услуги</a>
              </li>
              <li>
                <a href="#process" className="hover:text-brand-red transition-colors">Этапы работы</a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-brand-red transition-colors">Отзывы</a>
              </li>
              <li>
                <a href="#about" className="hover:text-brand-red transition-colors">О нас</a>
              </li>
              <li>
                <a href="#faq" className="hover:text-brand-red transition-colors">FAQ</a>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div className="space-y-4">
            <h4 className="font-mono text-xs uppercase tracking-widest text-brand-light border-b border-brand-light/10 pb-2">Контакты</h4>
            <ul className="space-y-3 font-mono text-xs">
              <li className="flex items-center gap-2">
                <Phone size={14} className="text-brand-red" />
                <a href="tel:+74959713123" className="hover:text-brand-light transition-colors text-brand-light font-medium">+7 (495) 971-31-23</a>
              </li>
              <li className="flex items-center gap-2 text-[11px]">
                <Mail size={14} className="text-brand-red" />
                <a href="mailto:info@azhur-studio.ru" className="hover:text-brand-light transition-colors">info@azhur-studio.ru</a>
              </li>
              <li className="flex items-start gap-2 text-[11px] leading-relaxed">
                <MapPin size={14} className="text-brand-red mt-0.5" />
                <span>Москва и Зеленоград</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 font-mono text-[10px] uppercase">
          <div>
            © {currentYear} Ажур Студия. Все права защищены.
          </div>
          <div className="flex gap-6">
            <a href="/privacy/" className="hover:text-brand-light transition-colors">Политика конфиденциальности</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
