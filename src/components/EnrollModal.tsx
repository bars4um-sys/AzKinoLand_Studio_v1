import { useEffect, useRef, useState, type FormEvent, type ChangeEvent } from 'react';
import { X, Check, Send } from 'lucide-react';

const PLANS = [
  { id: 'plan-basic', label: 'БАЗОВЫЙ (24 900 ₽)' },
  { id: 'plan-pro', label: 'ПРОДВИНУТЫЙ (39 900 ₽)' },
  { id: 'plan-vip', label: 'НАСТАВНИЧЕСТВО (79 900 ₽)' },
];

export function EnrollModal({
  isOpen,
  onClose,
  selectedPlan,
  onSelectPlan,
}: {
  isOpen: boolean;
  onClose: () => void;
  selectedPlan: string;
  onSelectPlan: (plan: string) => void;
}) {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', comment: '' });
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    closeRef.current?.focus();
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: заменить на реальную отправку заявки
    // eslint-disable-next-line no-console
    console.log('Enroll form:', { ...formData, selectedPlan });
    setFormSubmitted(true);
  };

  const handleChange = (field: keyof typeof formData) => (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  return (
    <div
      className="fixed inset-0 z-[10000] bg-black/90 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-label="Запись на курс"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-lg bg-[#131313] border border-[#c9a84c] p-8 sm:p-10 my-auto shadow-2xl">
        <button
          ref={closeRef}
          onClick={onClose}
          aria-label="Закрыть форму"
          className="absolute top-6 right-6 text-[#f5f0e8]/60 hover:text-[#c9a84c] transition-colors cursor-pointer"
        >
          <X className="w-6 h-6" />
        </button>

        {!formSubmitted ? (
          <>
            <span className="font-mono-subtitle text-[11px] text-[#c9a84c] uppercase tracking-[0.2em] block mb-2">
              ЗАПИСЬ НА КУРС «АЗБУКА КИНО»
            </span>

            <h3 className="font-display text-3xl text-[#f5f0e8] mb-6">Заполните Анкету</h3>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="font-mono-subtitle text-[11px] text-[#d0c5b2] block mb-1">
                  ВАШЕ ИМЯ *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Александр Власов"
                  value={formData.name}
                  onChange={handleChange('name')}
                  className="w-full bg-[#0a0a0a] border border-[#f5f0e8]/20 focus:border-[#c9a84c] text-[#f5f0e8] p-3 text-sm focus:outline-none"
                />
              </div>

              <div>
                <label className="font-mono-subtitle text-[11px] text-[#d0c5b2] block mb-1">
                  EMAIL *
                </label>
                <input
                  type="email"
                  required
                  placeholder="cinema@azbukakino.ru"
                  value={formData.email}
                  onChange={handleChange('email')}
                  className="w-full bg-[#0a0a0a] border border-[#f5f0e8]/20 focus:border-[#c9a84c] text-[#f5f0e8] p-3 text-sm focus:outline-none"
                />
              </div>

              <div>
                <label className="font-mono-subtitle text-[11px] text-[#d0c5b2] block mb-1">
                  ТЕЛЕФОН / TELEGRAM *
                </label>
                <input
                  type="text"
                  required
                  placeholder="+7 (999) 000-00-00"
                  value={formData.phone}
                  onChange={handleChange('phone')}
                  className="w-full bg-[#0a0a0a] border border-[#f5f0e8]/20 focus:border-[#c9a84c] text-[#f5f0e8] p-3 text-sm focus:outline-none"
                />
              </div>

              <div>
                <label className="font-mono-subtitle text-[11px] text-[#d0c5b2] block mb-1">
                  ВЫБРАННЫЙ ТАРИФ
                </label>
                <select
                  value={selectedPlan}
                  onChange={(e: ChangeEvent<HTMLSelectElement>) => onSelectPlan(e.target.value)}
                  className="w-full bg-[#0a0a0a] border border-[#f5f0e8]/20 focus:border-[#c9a84c] text-[#c9a84c] p-3 text-sm focus:outline-none"
                >
                  {PLANS.map((plan) => (
                    <option key={plan.id} value={plan.id}>
                      {plan.label}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                className="w-full bg-[#c9a84c] text-[#0a0a0a] font-mono-subtitle text-xs tracking-[0.2em] py-4 uppercase font-bold hover:bg-[#f5f0e8] transition-colors mt-4 cursor-pointer flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                ПОДТВЕРДИТЬ ЗАЯВКУ
              </button>
            </form>
          </>
        ) : (
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 bg-[#c9a84c]/20 border border-[#c9a84c] rounded-full flex items-center justify-center mx-auto text-[#c9a84c]">
              <Check className="w-8 h-8" />
            </div>
            <h3 className="font-display text-3xl text-[#f5f0e8]">Заявка Принята</h3>
            <p className="font-sans text-sm text-[#d0c5b2] leading-relaxed">
              Спасибо, {formData.name || 'друг'}! Наш куратор свяжется с вами в Telegram или по указанному телефону в течение 30 минут.
            </p>
            <button
              onClick={onClose}
              className="bg-[#c9a84c] text-[#0a0a0a] font-mono-subtitle text-xs tracking-[0.2em] px-8 py-3 uppercase font-semibold hover:bg-[#f5f0e8] transition-colors mt-4 cursor-pointer"
            >
              ЗАКРЫТЬ
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
