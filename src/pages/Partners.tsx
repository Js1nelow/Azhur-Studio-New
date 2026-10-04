import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Handshake, Calculator, MessageSquare, MapPin, ArrowRight, CheckCircle, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { reachMetrikaGoal } from '../components/YandexMetrika';
import { PrivacyConsent } from '../components/PrivacyConsent';
import { usePhoneInput } from '../hooks/usePhoneInput';

export function Partners() {
  const [name, setName] = useState('');
  const { phone, handlePhoneChange, isPhoneValid, resetPhone } = usePhoneInput();
  const [honeypotValue, setHoneypotValue] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone) return;
    if (honeypotValue) return;

    setIsSubmitting(true);
    setError(null);
    
    try {
      const response = await fetch('/api/send-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          name, 
          phone, 
          source: 'Страница Партнерам'
        })
      });
      
      const data = await response.json().catch(() => null);

      if (response.ok && data?.success) {
        reachMetrikaGoal('lead_form_success');
        reachMetrikaGoal('lead_submit');
        reachMetrikaGoal('lead_partners');
        setIsSubmitted(true);
        setName('');
        resetPhone();
        setHoneypotValue('');
      } else {
        const errorMsg = data?.error || 'Не удалось отправить заявку. Попробуйте позже.';
        console.error(errorMsg);
        setError(errorMsg);
      }
    } catch (err) {
      console.error('Network error:', err);
      setError('Ошибка сети. Проверьте подключение и попробуйте снова.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const cards = [
    {
      icon: <Handshake className="text-brand-red w-6 h-6 stroke-[1.5]" />,
      title: "Вы наш главный заказчик",
      text: "Не лезем с ненужными советами, но если попросите — дадим инженерные рекомендации по улучшению проекта."
    },
    {
      icon: <Calculator className="text-brand-red w-6 h-6 stroke-[1.5]" />,
      title: "Проведём расчёты до старта",
      text: "Поможем решить сложные технические узлы, ниши и примыкания до начала монтажных работ."
    },
    {
      icon: <MessageSquare className="text-brand-red w-6 h-6 stroke-[1.5]" />,
      title: "Грамотный диалог с клиентом",
      text: "Ответим на вопросы доступным языком, обоснуем технологические решения и сохраним ваш авторитет."
    },
    {
      icon: <MapPin className="text-brand-red w-6 h-6 stroke-[1.5]" />,
      title: "Точный расчёт сразу на объекте",
      text: "Делаем смету и лазерный замер на месте, фиксируем окончательную стоимость в официальном договоре."
    }
  ];

  return (
    <div className="pt-28 sm:pt-36 pb-24 min-h-screen bg-[#FAF9F6] text-gray-900">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16">
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-gray-600 hover:text-brand-red text-xs font-semibold tracking-wide transition-colors mb-10"
        >
          <ArrowLeft size={16} />
          Назад на главную
        </Link>
        
        <div className="max-w-3xl mb-14 md:mb-18 space-y-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold uppercase tracking-tight text-gray-950">
            Партнёрам и дизайнерам
          </h1>
          <p className="text-gray-600 text-base sm:text-lg font-sans max-w-2xl leading-relaxed">
            Реализуем натяжные потолочные системы любой сложности точно по дизайн-проекту, без компромиссов в качестве и с соблюдением оговоренных сроков.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {cards.map((card, idx) => (
            <div 
              key={idx} 
              className="bg-white border border-stone-200/90 rounded-2xl p-6 sm:p-7 flex flex-col items-start shadow-xs hover:border-brand-red/30 hover:shadow-md transition-all group"
            >
              <div className="mb-5 w-12 h-12 rounded-xl bg-orange-50 border border-orange-200/60 flex items-center justify-center group-hover:scale-105 transition-transform">
                {card.icon}
              </div>
              <h3 className="text-gray-950 text-base font-bold tracking-tight mb-2.5">
                {card.title}
              </h3>
              <p className="text-gray-600 text-xs sm:text-sm leading-relaxed font-sans">
                {card.text}
              </p>
            </div>
          ))}
        </div>

        {/* Form Container */}
        <div className="max-w-xl mx-auto bg-white border border-stone-200/90 rounded-3xl p-8 sm:p-10 shadow-xs">
          <div className="mb-8 text-center">
            <h2 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-gray-950 mb-2">
              Оставить заявку
            </h2>
            <p className="text-gray-600 text-sm font-sans">
              Обсудим индивидуальные условия сотрудничества и партнерские бонусы
            </p>
          </div>

          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.form
                key="partner-form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="space-y-5"
              >
                {/* Honeypot anti-spam field */}
                <div style={{ position: 'absolute', left: '-9999px', opacity: 0, pointerEvents: 'none' }} aria-hidden="true">
                  <input
                    type="text"
                    name="user_website_check"
                    tabIndex={-1}
                    autoComplete="off"
                    value={honeypotValue}
                    onChange={(e) => setHoneypotValue(e.target.value)}
                  />
                </div>

                {error && (
                  <div className="p-3.5 bg-red-50 border border-red-200 rounded-xl text-red-600 text-xs sm:text-sm">
                    {error}
                  </div>
                )}
                
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700">Ваше имя</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Иван Иванов"
                    className="w-full bg-[#FAF9F6] border border-stone-200 focus:border-brand-red focus:ring-2 focus:ring-brand-red/20 px-4 py-3.5 text-sm text-gray-950 rounded-xl outline-none transition-all placeholder:text-gray-400 font-sans"
                  />
                </div>
                
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700">Телефон <span className="text-brand-red">*</span></label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={handlePhoneChange}
                    placeholder="+7 (999) 000-00-00"
                    className="w-full bg-[#FAF9F6] border border-stone-200 focus:border-brand-red focus:ring-2 focus:ring-brand-red/20 px-4 py-3.5 text-sm text-gray-950 rounded-xl outline-none transition-all placeholder:text-gray-400 font-sans"
                  />
                </div>

                <div className="pt-2">
                  <PrivacyConsent />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || !isPhoneValid}
                  className={`w-full py-4 rounded-xl text-xs uppercase tracking-wider font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm ${
                    isPhoneValid
                      ? 'bg-brand-red hover:bg-brand-red-hover text-white shadow-brand-red/20 hover:shadow-md'
                      : 'bg-stone-200 text-stone-400 cursor-not-allowed'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Отправка заявки...</span>
                    </>
                  ) : (
                    <>
                      <span>Получить условия сотрудничества</span>
                      <ArrowRight size={15} />
                    </>
                  )}
                </button>
              </motion.form>
            ) : (
              <motion.div
                key="partner-success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-8 text-center space-y-6"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-orange-50 border border-orange-200/70 text-brand-red mb-2">
                  <CheckCircle size={32} />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl sm:text-2xl font-extrabold uppercase tracking-tight text-gray-950">
                    Заявка принята
                  </h3>
                  <p className="text-gray-600 font-sans text-sm max-w-sm mx-auto leading-relaxed">
                    Мы свяжемся с вами в течение 15 минут для обсуждения условий сотрудничества.
                  </p>
                </div>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="bg-stone-100 hover:bg-stone-200 text-gray-800 text-xs uppercase tracking-wider font-bold px-8 py-3 rounded-xl transition-colors cursor-pointer"
                >
                  Отправить ещё раз
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
