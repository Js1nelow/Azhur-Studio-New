import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Check, Calculator, Phone } from 'lucide-react';
import { reachMetrikaGoal } from './YandexMetrika';
import { PrivacyConsent } from './PrivacyConsent';
import { usePhoneInput } from '../hooks/usePhoneInput';

interface CostModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedService?: string;
}

export function CostModal({ isOpen, onClose, selectedService = 'Натяжные потолки' }: CostModalProps) {
  const [services, setServices] = useState<string[]>([selectedService]);
  const [area, setArea] = useState(25);
  const [name, setName] = useState('');
  const { phone, handlePhoneChange, isPhoneValid, resetPhone } = usePhoneInput();
  const [honeypotValue, setHoneypotValue] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Sync state with selectedService prop when modal opens
  useEffect(() => {
    if (isOpen && selectedService) {
      setServices([selectedService]);
    }
  }, [isOpen, selectedService]);

  const toggleService = (item: string) => {
    if (services.includes(item)) {
      setServices(services.filter((s) => s !== item));
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
            className="fixed inset-0 bg-brand-black/95 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className="relative w-full max-w-lg bg-brand-card border border-brand-light/10 p-6 md:p-8 rounded-none text-brand-light z-10 shadow-2xl overflow-y-auto max-h-[90vh]"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-brand-gray hover:text-brand-light transition-colors p-2 cursor-pointer"
              aria-label="Close modal"
              id="close-modal-btn"
            >
              <X size={24} strokeWidth={1.5} />
            </button>

            {!isSubmitted ? (
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-brand-red/10 text-brand-red">
                    <Calculator size={24} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="text-xl md:text-2xl font-display uppercase tracking-tight text-brand-light">
                      Рассчитать проект
                    </h3>
                    <p className="text-brand-gray font-mono text-xs mt-1">
                      Укажите параметры — перезвоним в течение 15 минут
                    </p>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
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
                  {/* Service Selection */}
                  <div className="space-y-2">
                    <label className="block font-mono text-xs uppercase text-brand-gray">Выбор решения (можно несколько)</label>
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
                            className={`text-left px-4 py-3 text-xs font-mono uppercase border transition-all cursor-pointer ${
                              isSelected
                                ? 'border-brand-red text-brand-red bg-brand-red/5'
                                : 'border-brand-light/10 text-brand-gray hover:text-brand-light hover:border-brand-light/30'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <span>{item}</span>
                              {isSelected && <span className="w-1.5 h-1.5 bg-brand-red rounded-full" />}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Area Slider */}
                  <div className="space-y-2 pt-2">
                    <div className="flex justify-between font-mono text-xs uppercase">
                      <span className="text-brand-gray">Площадь помещения</span>
                      <span className="text-brand-light font-bold">{area} м²</span>
                    </div>
                    <input
                      type="range"
                      min="5"
                      max="120"
                      value={area}
                      onChange={(e) => setArea(Number(e.target.value))}
                      className="w-full accent-brand-red cursor-pointer bg-brand-light/10 h-1 rounded-lg outline-none"
                    />
                    <div className="flex justify-between font-mono text-[10px] text-brand-gray">
                      <span>5 м²</span>
                      <span>120 м²</span>
                    </div>
                  </div>

                  {/* Lead capture */}
                  <div className="space-y-4 pt-2">
                    <div className="grid grid-cols-1 gap-4">
                      <div>
                        <label className="block font-mono text-[10px] uppercase text-brand-gray mb-1">Ваше имя</label>
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Иван"
                          className="w-full bg-brand-black border border-brand-light/10 px-4 py-3 text-sm text-brand-light focus:border-brand-red focus:outline-none transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block font-mono text-[10px] uppercase text-brand-gray mb-1">
                          Телефон <span className="text-brand-red">*</span>
                        </label>
                        <input
                          type="tel"
                          required
                          value={phone}
                          onChange={handlePhoneChange}
                          placeholder="+7 (999) 000-00-00"
                          className="w-full bg-brand-black border border-brand-light/10 px-4 py-3 text-sm text-brand-light focus:border-brand-red focus:outline-none transition-colors"
                        />
                      </div>
                    </div>
                  </div>

                  <PrivacyConsent />

                  <button
                    type="submit"
                    disabled={isSubmitting || !isPhoneValid}
                    className={`w-full font-mono text-xs uppercase tracking-widest py-4 transition-all font-medium flex items-center justify-center gap-2 cursor-pointer ${
                      isPhoneValid
                        ? 'bg-brand-red hover:bg-brand-red/90 text-white shadow-[0_0_20px_rgba(255,51,51,0.3)]'
                        : 'bg-brand-black border border-brand-light/10 text-brand-gray cursor-not-allowed'
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Отправка заявки...
                      </>
                    ) : (
                      <>
                        <Phone size={14} />
                        Получить расчёт стоимости
                      </>
                    )}
                  </button>

                  <p className="text-[10px] text-brand-gray font-mono text-center">
                    Нажимая кнопку, вы соглашаетесь на обработку персональных данных.
                  </p>
                </form>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8 space-y-6"
              >
                <div className="w-16 h-16 bg-brand-red/10 text-brand-red rounded-full flex items-center justify-center mx-auto">
                  <Check size={32} strokeWidth={1.5} />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-display uppercase tracking-tight text-brand-light">
                    Заявка принята!
                  </h3>
                  <p className="text-brand-gray font-mono text-sm max-w-md mx-auto">
                    Спасибо, {name || 'уважаемый клиент'}! Наш ведущий технолог свяжется с вами в течение 15 минут для уточнения деталей и подбора оптимальных решений под ваш бюджет.
                  </p>
                </div>
                <div>
                  <button
                    onClick={handleReset}
                    className="bg-transparent border border-brand-light/20 hover:border-brand-light text-brand-light font-mono text-xs uppercase tracking-wider px-8 py-3 transition-colors cursor-pointer"
                  >
                    Закрыть окно
                  </button>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
