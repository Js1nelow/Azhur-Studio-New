import { Link } from 'react-router-dom';

export function PrivacyConsent() {
  return (
    <label className="flex cursor-pointer items-start gap-2.5 text-left text-xs leading-relaxed text-gray-600 select-none">
      <input 
        type="checkbox" 
        defaultChecked
        required 
        className="mt-0.5 h-4 w-4 shrink-0 rounded border-stone-300 text-brand-red focus:ring-brand-red/30 accent-brand-red cursor-pointer" 
      />
      <span>
        Нажимая кнопку, вы соглашаетесь на обработку персональных данных в соответствии с{' '}
        <Link 
          to="/privacy" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-gray-900 underline underline-offset-2 hover:text-brand-red font-medium transition-colors"
        >
          Политикой конфиденциальности
        </Link>
        .
      </span>
    </label>
  );
}
