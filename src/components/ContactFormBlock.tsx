import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Phone, Calculator, Ruler, CheckCircle, ArrowRight } from 'lucide-react';
import { reachMetrikaGoal } from './YandexMetrika';
import { PrivacyConsent } from './PrivacyConsent';
import { usePhoneInput } from '../hooks/usePhoneInput';

export function ContactFormBlock() {
  const [name, setName] = useState('');
  const { phone, handlePhoneChange, isPhoneValid, resetPhone } = usePhoneInput();
  const [comment, setComment] = useState('');
  const [honeypotValue, setHoneypotValue] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
          comment,
          source: 'Блок контактов'
        })
      });
      
      const data = await response.json().catch(() => null);

      if (response.ok && data?.success) {
        reachMetrikaGoal('lead_form_success');
        reachMetrikaGoal('lead_submit');
        reachMetrikaGoal('lead_contact');
        setIsSubmitted(true);
        setName('');
        resetPhone();
        setComment('');
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

  const features = [
    {
      icon: <Phone size={18} strokeWidth={1.5} className="text-brand-red shrink-0" />,
      text: "Звонок в течение 15 минут"
    },
    {
      icon: <Calculator size={18} strokeWidth={1.5} className="text-brand-red shrink-0" />,
      text: "Бесплатный расчёт сметы"
    },
    {
      icon: <Ruler size={18} strokeWidth={1.5} className="text-brand-red shrink-0" />,
      text: "Выезд специалиста на объект"
    }
  ];

  return (
    <section id="contact" className="relative bg-brand-black py-24 md:py-32 overflow-hidden border-t border-brand-light/5">
      {/* Decorative ambient elements */}
      <div className="absolute top-0 right-1/3 w-[1px] h-32 bg-gradient-to-b from-brand-red/10 to-transparent" />
      <div className="absolute bottom-0 right-10 w-[300px] h-[300px] rounded-full bg-brand-red/5 blur-[120px] pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          
          {/* Left Column: Title & Info */}
          <div className="lg:col-span-5 space-y-8 lg:sticky lg:top-24">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-brand-red uppercase tracking-widest">[ ОБРАТНАЯ СВЯЗЬ ]</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold leading-[1.1] text-brand-light uppercase tracking-tight text-balance">
                Обсудим ваш проект
              </h2>
              <p className="text-brand-gray text-sm md:text-base leading-relaxed max-w-md font-sans">
                Оставьте заявку — перезвоним в течение 15 минут и ответим на все вопросы
              </p>
            </div>

            {/* Icon list */}
            <div className="space-y-4 pt-4 border-t border-brand-light/10">
              {features.map((feature, i) => (
                <div key={i} className="flex items-center gap-4 group">
                  <div className="w-10 h-10 rounded-none bg-brand-card border border-brand-light/5 flex items-center justify-center transition-colors group-hover:border-brand-red/30">
                    {feature.icon}
                  </div>
                  <span className="font-mono text-xs md:text-sm uppercase tracking-wider text-brand-light">
                    — {feature.text}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Interactive Form */}
          <div className="lg:col-span-7">
            <div className="bg-brand-card/30 border border-brand-light/5 p-8 md:p-10 relative">
              
              <AnimatePresence mode="wait">
                {!isSubmitted ? (
                  <motion.form
                    key="contact-form"
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
                      <div className="p-4 bg-brand-red/10 border border-brand-red/20 text-brand-red text-sm">
                        {error}
                      </div>
                    )}
                    {/* Name input */}
                    <div className="space-y-2">
                      <label className="block font-mono text-[10px] uppercase text-brand-gray tracking-wider">Ваше имя</label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Как к вам обращаться"
                        className="w-full bg-brand-black border border-brand-light/10 focus:border-brand-red/50 px-4 py-4 text-sm text-brand-light rounded-none outline-none transition-colors font-sans placeholder:text-brand-gray/50"
                      />
                    </div>

                    {/* Phone input */}
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

                    {/* Comment (Optional) */}
                    <div className="space-y-2">
                      <label className="block font-mono text-[10px] uppercase text-brand-gray tracking-wider">Комментарий (необязательно)</label>
                      <textarea
                        rows={3}
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Расскажите о вашем проекте"
                        className="w-full bg-brand-black border border-brand-light/10 focus:border-brand-red/50 px-4 py-4 text-sm text-brand-light rounded-none outline-none transition-colors font-sans resize-none placeholder:text-brand-gray/50"
                      />
                    </div>

                    {/* Submit Button */}
                    <PrivacyConsent />
                    <button
                      type="submit"
                      disabled={isSubmitting || !isPhoneValid}
                      className={`w-full font-mono text-xs uppercase tracking-widest py-5 transition-all font-medium flex items-center justify-center gap-2 cursor-pointer ${
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
                          <span>Отправить заявку</span>
                          <ArrowRight size={14} />
                        </>
                      )}
                    </button>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success-message"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-12 text-center space-y-6"
                  >
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-none bg-brand-red/10 border border-brand-red/30 text-brand-red mb-2">
                      <CheckCircle size={32} />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-xl md:text-2xl font-display uppercase tracking-tight text-brand-light">
                        Заявка принята!
                      </h3>
                      <p className="text-brand-gray font-sans text-sm max-w-sm mx-auto leading-relaxed">
                        Спасибо за обращение. Мы перезвоним вам в течение 15 минут для детального обсуждения вашего проекта.
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

              {/* Top and bottom designer lines */}
              <div className="absolute top-0 left-0 w-0 h-[1px] bg-brand-red transition-all duration-700 group-hover:w-full" />
              <div className="absolute bottom-0 right-0 w-0 h-[1px] bg-brand-red transition-all duration-700 group-hover:w-full" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
