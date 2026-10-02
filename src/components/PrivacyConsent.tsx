import { Link } from 'react-router-dom';

export function PrivacyConsent() {
  return (
    <label className="flex cursor-pointer items-start gap-3 text-left text-[11px] leading-relaxed text-brand-gray">
      <input type="checkbox" required className="mt-0.5 h-4 w-4 shrink-0 accent-brand-red" />
      <span>Я согласен на обработку персональных данных и принимаю <Link to="/privacy/" target="_blank" className="text-brand-light underline underline-offset-2 hover:text-brand-red">Политику конфиденциальности</Link>.</span>
    </label>
  );
}
