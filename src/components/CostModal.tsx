import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle, Calculator, ArrowRight } from 'lucide-react';
import { reachMetrikaGoal } from './YandexMetrika';
import { PrivacyConsent } from './PrivacyConsent';
import { usePhoneInput } from '../hooks/usePhoneInput';

interface CostModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedService?: string;
}

export function CostModal({ isOpen, onClose, selectedService }: CostModalProps) {
  const [services, setServices] = useState<string[]>(['Натяжные потолки']);
  const [area, setArea] = useState<number>(20);
  const [name, setName] = useState('');
  const { phone, handlePhoneChange, isPhoneValid, resetPhone } = usePhoneInput();
  const [honeypotValue, setHoneypotValue] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen && selectedService) {
      setServices([selectedService]);
    }
  }, [isOpen, selectedService]);

  const toggleService = (item: string) => {
    if (services.includes(item)) {
      if (services.length > 1) {
        setServices(services.filter((s) => s !== item));
      }
    } else {
      setServices([...services, item]);
    }
  };

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
          source: 'Модальное окно расчёта',
          details: `Интересует: ${services.join(', ')}. Площадь: ${area} м²`
        })
      });
      
      const data = await response.json().catch(() => null);

      if (response.ok && data?.success) {
        reachMetrikaGoal('lead_form_success');
        reachMetrikaGoal('lead_submit');
        reachMetrikaGoal('lead_calculator');
        setIsSubmitted(true);
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

  const handleReset = () => {
    setName('');
    resetPhone();
    setHoneypotValue('');
    setIsSubmitted(false);
    setError(null);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 15 }}
            transition={{ type: 'spring', duration: 0.3 }}
            className="relative w-full max-w-lg bg-white border border-gray-200 p-6 sm:p-8 rounded-2xl text-gray-900 z-10 shadow-2xl overflow-y-auto max-h-[90vh]"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-800 transition-colors p-2 cursor-pointer rounded-lg"
              aria-label="Закрыть окно"
            >
              <X size={20} />
            </button>

            {!isSubmitted ? (
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2.5 rounded-lg bg-orange-50 text-brand-red border border-orange-100">
                    <Calculator size={22} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-950">
                      Рассчитайте стоимость сметы
                    </h3>
                    <p className="text-xs text-gray-600 mt-0.5">
                      Подберём решение под ваш бюджет и пришлём точный расчет без наценок
                    </p>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Honeypot field */}
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
                    <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg">
                      {error}
                    </div>
                  )}

                  {/* Service Selection */}
                  <div className="space-y-2">
                    <label className="block text-xs font-semibold text-gray-700">
                      Что планируете сделать?
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {[
                        'Натяжные потолки',
                        'Теневой профиль',
                        'Карнизные решения',
                        'Световые линии и треки',
                      ].map((item) => {
                        const isSelected = services.includes(item);
                        return (
                          <button
                            key={item}
                            type="button"
                            onClick={() => toggleService(item)}
                            className={`text-left px-3.5 py-3 text-xs rounded-lg border transition-all cursor-pointer font-medium ${
                              isSelected
                                ? 'border-brand-red text-brand-red bg-orange-50 font-semibold'
                                : 'border-gray-200 text-gray-700 hover:border-gray-300 bg-white'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <span>{item}</span>
                              {isSelected && <span className="w-2 h-2 bg-brand-red rounded-full" />}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Area Slider */}
                  <div className="space-y-2 pt-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-600 font-medium">Примерная площадь помещения:</span>
                      <span className="text-gray-950 font-bold">{area} м²</span>
                    </div>
                    <input
                      type="range"
                      min="5"
                      max="120"
                      value={area}
                      onChange={(e) => setArea(Number(e.target.value))}
                      className="w-full accent-brand-red cursor-pointer bg-gray-200 h-2 rounded-lg"
                    />
                    <div className="flex justify-between text-[11px] text-gray-400">
                      <span>5 м²</span>
                      <span>120 м²</span>
                    </div>
                  </div>

                  {/* Contact Fields */}
                  <div className="space-y-3 pt-1">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        Ваше имя
                      </label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Как к вам обращаться"
                        className="w-full bg-white border border-gray-300 focus:border-brand-red px-3.5 py-2.5 text-sm text-gray-900 rounded-lg outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        Телефон <span className="text-brand-red">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={handlePhoneChange}
                        placeholder="+7 (999) 000-00-00"
                        className="w-full bg-white border border-gray-300 focus:border-brand-red px-3.5 py-2.5 text-sm text-gray-900 rounded-lg outline-none transition-colors"
                      />
                    </div>
                  </div>

                  {/* Privacy Consent */}
                  <PrivacyConsent />

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting || !isPhoneValid}
                    className={`w-full py-3.5 rounded-xl font-semibold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm ${
                      isPhoneValid
                        ? 'bg-brand-red hover:bg-brand-red-hover text-white hover:shadow-md'
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Отправка...</span>
                      </>
                    ) : (
                      <>
                        <span>Получить точный расчет сметы</span>
                        <ArrowRight size={16} />
                      </>
                    )}
                  </button>

                  <div className="flex items-center justify-center gap-1.5 text-[11px] text-gray-500 pt-0.5">
                    <span>🔒 Никакого спама. Точный расчет в WhatsApp или звонком за 15 минут</span>
                  </div>
                </form>
              </div>
            ) : (
              <div className="py-8 text-center space-y-4">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 mb-2">
                  <CheckCircle size={28} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-950">
                    Заявка принята!
                  </h3>
                  <p className="text-xs text-gray-600 max-w-xs mx-auto mt-2 leading-relaxed">
                    Мастер перезвонит вам в течение 15 минут с расчетом под ваши параметры ({area} м²).
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleReset}
                  className="mt-4 px-6 py-2.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-semibold transition-colors cursor-pointer"
                >
                  Закрыть
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
