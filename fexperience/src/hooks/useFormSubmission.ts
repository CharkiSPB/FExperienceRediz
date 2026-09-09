'use client';
import { useState } from 'react';

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

export function useFormSubmission() {
  const [status, setStatus] = useState<FormStatus>('idle');
  const [message, setMessage] = useState('');

  const submit = async (action: (data: FormData) => Promise<{ success: boolean; message: string }>, formData: FormData) => {
    setStatus('loading');
    try {
      const result = await action(formData);
      setStatus(result.success ? 'success' : 'error');
      setMessage(result.message);
      return result;
    } catch {
      setStatus('error');
      setMessage('Произошла ошибка при отправке');
    }
  };

  return { status, message, submit, reset: () => { setStatus('idle'); setMessage(''); } };
}