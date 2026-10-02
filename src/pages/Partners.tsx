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
      icon: <Handshake className="text-brand-red w-8 h-8 stroke-[1.25]" />,
      title: "Вы наш главный заказчик",
      text: "Не лезем с ненужными советами, но если попросите — дадим рекомендации по улучшению проекта"
    },
    {
      icon: <Calculator className="text-brand-red w-8 h-8 stroke-[1.25]" />,
      title: "Проведём расчёты перед стартом",
      text: "Поможем решить технические и инженерные вопросы до начала монтажа"
    },
    {
      icon: <MessageSquare className="text-brand-red w-8 h-8 stroke-[1.25]" />,
      title: "Умеем общаться с вашими клиентами",
      text: "Ответим на их вопросы доступным языком, поможем объяснить решение"
    },
    {
      icon: <MapPin className="text-brand-red w-8 h-8 stroke-[1.25]" />,
      title: "Точный расчёт сразу на объекте",
      text: "Делаем смету и эскиз на месте, фиксируем цену сразу"
    }
  ];

  return (
    <div className="pt-32 md:pt-40 pb-24 min-h-screen bg-brand-black text-brand-light">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16">
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-brand-gray hover:text-brand-light font-mono text-xs uppercase tracking-wider transition-colors mb-12 md:mb-16"
        >
          <ArrowLeft size={16} />
          Назад на главную
        </Link>
        
        <div className="max-w-3xl mb-16 md:mb-24 space-y-6">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs text-brand-red uppercase tracking-widest">[ Сотрудничество ]</span>
            <div className="h-[1px] w-8 bg-brand-red/50" />
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold uppercase tracking-tight text-brand-light">
            Партнёрам
          </h1>
          <p className="text-brand-gray text-lg md:text-xl font-sans max-w-2xl leading-relaxed">
            Реализуем ваш проект точно и без компромиссов, какой бы сложный он ни был
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          {cards.map((card, idx) => (
            <div key={idx} className="bg-brand-card/30 border border-brand-light/5 p-8 flex flex-col items-start transition-all hover:border-brand-red/30 group">
              <div className="mb-6 bg-brand-black p-4 border border-brand-light/5 group-hover:border-brand-red/20 transition-colors">
                {card.icon}
              </div>
              <h3 className="text-brand-light text-lg font-display uppercase tracking-wide mb-4 line-clamp-2">
                {card.title}
              </h3>
              <p className="text-brand-gray text-sm leading-relaxed font-sans">
                {card.text}
              </p>
            </div>
          ))}
        </div>

        <div className="max-w-2xl mx-auto bg-brand-card/30 border border-brand-light/5 p-8 md:p-12">
          <div className="mb-8 text-center">
            <h3 className="text-2xl md:text-3xl font-display uppercase tracking-tight text-brand-light mb-2">
              Оставьте заявку
            </h3>
            <p className="text-brand-gray text-sm font-sans">
              Обсудим условия сотрудничества
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
                className="space-y-6"
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
                  <div className="p-3 bg-brand-red/10 border border-brand-red/20 text-brand-red text-sm mb-4">
                    {error}
                  </div>
                )}
                <div className="space-y-2">
                  <label className="block font-mono text-[10px] uppercase text-brand-gray tracking-wider">Имя</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ваше имя"
                    className="w-full bg-brand-black border border-brand-light/10 focus:border-brand-red/50 px-4 py-4 text-sm text-brand-light rounded-none outline-none transition-colors font-sans placeholder:text-brand-gray/50"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="block font-mono text-[10px] uppercase text-brand-gray tracking-wider">Телефон <span className="text-brand-red">*</span></label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={handlePhoneChange}
                    placeholder="+7 (999) 000-00-00"
                    className="w-full bg-brand-black border border-brand-light/10 focus:border-brand-red/50 px-4 py-4 text-sm text-brand-light rounded-none outline-none transition-colors font-sans placeholder:text-brand-gray/50"
                  />
                </div>

                <PrivacyConsent />

                <button
                  type="submit"
                  disabled={isSubmitting || !isPhoneValid}
                  className={`w-full font-mono text-xs uppercase tracking-widest py-5 transition-all font-medium flex items-center justify-center gap-2 mt-8 cursor-pointer ${
                    isPhoneValid
                      ? 'bg-brand-red hover:bg-brand-red/90 text-white shadow-[0_0_20px_rgba(255,51,51,0.3)]'
                      : 'bg-brand-black border border-brand-light/10 text-brand-gray cursor-not-allowed'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Отправка...</span>
                    </>
                  ) : (
                    <>
                      <span>Оставить заявку</span>
                      <ArrowRight size={14} />
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
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-none bg-brand-red/10 border border-brand-red/30 text-brand-red mb-2">
                  <CheckCircle size={32} />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl md:text-2xl font-display uppercase tracking-tight text-brand-light">
                    Заявка принята
                  </h3>
                  <p className="text-brand-gray font-sans text-sm max-w-sm mx-auto leading-relaxed">
                    Мы свяжемся с вами в ближайшее время для обсуждения деталей.
                  </p>
                </div>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="bg-transparent border border-brand-light/20 hover:border-brand-light text-brand-light font-mono text-xs uppercase tracking-wider px-8 py-3 transition-colors cursor-pointer"
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
