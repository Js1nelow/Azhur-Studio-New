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
      icon: <Phone size={20} className="text-brand-red shrink-0" />,
      text: "Звонок мастера в течение 15 минут"
    },
    {
      icon: <Calculator size={20} className="text-brand-red shrink-0" />,
      text: "Точный расчет сметы без скрытых доплат"
    },
    {
      icon: <Ruler size={20} className="text-brand-red shrink-0" />,
      text: "Выезд технолога с каталогом полотен"
    }
  ];

  return (
    <section id="contact" className="relative bg-[#FAF9F6] py-20 md:py-28 border-t border-stone-200/80 overflow-hidden">
      {/* Ambient Warm Interior Glow */}
      <div className="absolute top-0 right-[-10%] w-[650px] h-[650px] bg-gradient-to-bl from-orange-200/30 via-amber-100/20 to-transparent blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-[-10%] w-[550px] h-[550px] bg-gradient-to-tr from-amber-200/25 via-orange-100/15 to-transparent blur-[130px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          
          {/* Left Column: Title & Info */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
            <div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-950 tracking-tight leading-tight mb-4">
                Обсудим ваш проект
              </h2>
              <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
                Оставьте номер — мастер свяжется с вами, ответит на любые технические вопросы и назовет ориентировочную стоимость.
              </p>
            </div>

            {/* Benefit list */}
            <div className="space-y-3 pt-6 border-t border-stone-200/80">
              {features.map((feature, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className="text-brand-red font-bold text-sm shrink-0">✓</span>
                  <span className="text-sm font-semibold text-gray-900">
                    {feature.text}
                  </span>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-2xl bg-white/80 backdrop-blur-xs border border-stone-200/80 text-xs text-gray-600 leading-relaxed shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
              Работаем по всей Москве и Московской области. Выезжаем на замер ежедневно без выходных.
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="lg:col-span-7">
            <div className="bg-white border border-stone-200/90 rounded-3xl p-6 sm:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.06)]">
              <AnimatePresence mode="wait">
                {!isSubmitted ? (
                  <motion.form
                    key="contact-form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-5"
                  >
                    {/* Honeypot field for bot protection */}
                    <div style={{ display: 'none', position: 'absolute', left: '-9999px' }} aria-hidden="true">
                      <label htmlFor="user_website_check">Не заполняйте это поле</label>
                      <input
                        id="user_website_check"
                        type="text"
                        name="user_website_check"
                        tabIndex={-1}
                        autoComplete="off"
                        value={honeypotValue}
                        onChange={(e) => setHoneypotValue(e.target.value)}
                      />
                    </div>

                    {error && (
                      <div className="p-4 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
                        {error}
                      </div>
                    )}

                    {/* Name input */}
                    <div className="space-y-1.5">
                      <label className="block text-xs font-semibold text-gray-700">
                        Ваше имя
                      </label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Как к вам обращаться"
                        className="w-full bg-white border border-gray-300 focus:border-brand-red focus:ring-2 focus:ring-brand-red/10 px-4 py-3.5 text-sm text-gray-950 rounded-lg outline-none transition-all placeholder:text-gray-400"
                      />
                    </div>

                    {/* Phone input */}
                    <div className="space-y-1.5">
                      <label className="block text-xs font-semibold text-gray-700">
                        Телефон <span className="text-brand-red">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={handlePhoneChange}
                        placeholder="+7 (999) 000-00-00"
                        className="w-full bg-white border border-gray-300 focus:border-brand-red focus:ring-2 focus:ring-brand-red/10 px-4 py-3.5 text-sm text-gray-950 rounded-lg outline-none transition-all placeholder:text-gray-400"
                      />
                    </div>

                    {/* Comment */}
                    <div className="space-y-1.5">
                      <label className="block text-xs font-semibold text-gray-700">
                        Комментарий или площадь (необязательно)
                      </label>
                      <textarea
                        rows={3}
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Например: 2-комнатная квартира 54 м², нужен теневой профиль"
                        className="w-full bg-white border border-gray-300 focus:border-brand-red focus:ring-2 focus:ring-brand-red/10 px-4 py-3.5 text-sm text-gray-950 rounded-lg outline-none transition-all resize-none placeholder:text-gray-400"
                      />
                    </div>

                    {/* Privacy */}
                    <PrivacyConsent />

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting || !isPhoneValid}
                      className={`w-full py-4 rounded-lg font-semibold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm ${
                        isPhoneValid
                          ? 'bg-brand-red hover:bg-brand-red-hover text-white hover:shadow-md'
                          : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      {isSubmitting ? (
                        <>
                          <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>Отправка заявки...</span>
                        </>
                      ) : (
                        <>
                          <span>Получить расчет сметы</span>
                          <ArrowRight size={16} />
                        </>
                      )}
                    </button>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success-message"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-10 text-center space-y-4"
                  >
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 mb-2">
                      <CheckCircle size={28} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-950">
                        Заявка принята!
                      </h3>
                      <p className="text-gray-600 text-sm max-w-sm mx-auto mt-2 leading-relaxed">
                        Спасибо! Олег свяжется с вами в течение 15 минут для уточнения деталей и расчета сметы.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
