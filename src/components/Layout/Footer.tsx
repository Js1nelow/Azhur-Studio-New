import { Phone, Mail, MapPin } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 border-t border-gray-200 py-16 text-gray-600">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12 pb-12 border-b border-gray-200">
          
          {/* Column 1: Brand */}
          <div className="md:col-span-2 space-y-3">
            <span className="font-extrabold tracking-tight text-2xl text-gray-950 block">
              АЖУР<span className="text-brand-red">.</span>
            </span>
            <p className="text-xs sm:text-sm text-gray-600 max-w-sm leading-relaxed">
              Монтаж натяжных потолков в Москве и Московской области. Без пыли, с гарантией 10 лет и фиксированной сметой в договоре.
            </p>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900">Разделы</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#hero" className="text-gray-600 hover:text-brand-red transition-colors">Главная</a>
              </li>
              <li>
                <a href="#works" className="text-gray-600 hover:text-brand-red transition-colors">Портфолио</a>
              </li>
              <li>
                <a href="#services" className="text-gray-600 hover:text-brand-red transition-colors">Виды потолков</a>
              </li>
              <li>
                <a href="#process" className="text-gray-600 hover:text-brand-red transition-colors">Этапы работы</a>
              </li>
              <li>
                <a href="#reviews" className="text-gray-600 hover:text-brand-red transition-colors">Отзывы</a>
              </li>
              <li>
                <a href="#about" className="text-gray-600 hover:text-brand-red transition-colors">О мастере</a>
              </li>
              <li>
                <a href="#faq" className="text-gray-600 hover:text-brand-red transition-colors">Вопросы и ответы</a>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900">Контакты</h4>
            <ul className="space-y-2.5 text-xs">
              <li className="flex items-center gap-2">
                <Phone size={14} className="text-brand-red shrink-0" />
                <a href="tel:+74959713123" className="text-gray-900 font-semibold hover:text-brand-red transition-colors">
                  +7 (495) 971-31-23
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={14} className="text-brand-red shrink-0" />
                <a href="tel:+79253131799" className="text-gray-900 font-semibold hover:text-brand-red transition-colors">
                  +7 (925) 313-17-99
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={14} className="text-brand-red shrink-0" />
                <a href="mailto:info@azhur-studio.ru" className="text-gray-600 hover:text-brand-red transition-colors">
                  info@azhur-studio.ru
                </a>
              </li>
              <li className="flex items-start gap-2 leading-relaxed">
                <MapPin size={14} className="text-brand-red mt-0.5 shrink-0" />
                <span>Москва и Московская область</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <div>
            © {currentYear} Студия натяжных потолков «Ажур». Все права защищены.
          </div>
          <div>
            <a href="/privacy/" className="hover:text-gray-900 transition-colors underline">
              Политика конфиденциальности
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
