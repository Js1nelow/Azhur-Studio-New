import { useState } from 'react';
import type React from 'react';

/**
 * Custom hook that encapsulates phone input state and formatting logic.
 * Handles Russian phone numbers (7/8/9 prefix), international numbers,
 * and backspace/clearing behavior.
 */
export function usePhoneInput() {
  const [phone, setPhone] = useState('');

  const isPhoneValid = phone.replace(/\D/g, '').length >= 11;

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    
    if (!input) {
      setPhone('');
      return;
    }

    let numbers = input.replace(/\D/g, '');
    
    if (!numbers) {
      if (phone && input.length < phone.length) {
        setPhone('');
      } else {
        setPhone('+7');
      }
      return;
    }

    if (['7', '8', '9'].includes(numbers[0])) {
      if (numbers[0] === '9') {
        numbers = '7' + numbers;
      } else if (numbers[0] === '8') {
        numbers = '7' + numbers.substring(1);
      }

      let formatted = '+7';
      if (numbers.length > 1) formatted += ' (' + numbers.substring(1, 4);
      if (numbers.length >= 5) formatted += ') ' + numbers.substring(4, 7);
      if (numbers.length >= 8) formatted += '-' + numbers.substring(7, 9);
      if (numbers.length >= 10) formatted += '-' + numbers.substring(9, 11);
      
      setPhone(formatted);
    } else {
      setPhone('+' + numbers.substring(0, 15));
    }
  };

  const resetPhone = () => {
    setPhone('');
  };

  return { phone, setPhone, handlePhoneChange, isPhoneValid, resetPhone };
}
