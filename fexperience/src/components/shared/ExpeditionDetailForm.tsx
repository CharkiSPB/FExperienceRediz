'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Check, Loader2 } from 'lucide-react';
import { expeditions } from '@/data/expeditions';

const fullSchema = z.object({
  expedition: z.string().min(1, 'Выберите экспедицию'),
  name: z.string().min(2, 'Минимум 2 символа'),
  phone: z.string().min(10, 'Введите корректный телефон'),
  email: z.string().email('Некорректный email'),
  consent: z.boolean().refine(val => val === true, {
    message: 'Необходимо согласие на обработку персональных данных',
  }),
});

const compactSchema = z.object({
  email: z.string().email('Некорректный email'),
  consent: z.boolean().refine(val => val === true, {
    message: 'Необходимо согласие на обработку персональных данных',
  }),
});

type FormValues = {
  expedition?: string;
  name?: string;
  phone?: string;
  email: string;
  consent: boolean;
};

const SUBMITTED_EMAILS_KEY = 'fexperience_submitted_emails';

function hasSubmittedEmail(email: string): boolean {
  if (typeof window === 'undefined') return false;
  const stored = localStorage.getItem(SUBMITTED_EMAILS_KEY);
  if (!stored) return false;
  try {
    const emails: string[] = JSON.parse(stored);
    return emails.includes(email.toLowerCase().trim());
  } catch {
    return false;
  }
}

function saveSubmittedEmail(email: string): void {
  if (typeof window === 'undefined') return;
  const stored = localStorage.getItem(SUBMITTED_EMAILS_KEY);
  const emails: string[] = stored ? JSON.parse(stored) : [];
  emails.push(email.toLowerCase().trim());
  localStorage.setItem(SUBMITTED_EMAILS_KEY, JSON.stringify(emails));
}

export function ExpeditionDetailForm({ variant = 'full' }: { variant?: 'full' | 'compact' }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const schema = variant === 'full' ? fullSchema : compactSchema;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { consent: false },
  });

  const activeExpeditions = expeditions.filter(e => e.status === 'active');

  const onSubmit = async (data: FormValues) => {
    setError(null);
    if (hasSubmittedEmail(data.email)) {
      setError('Вы уже отправили заявку');
      return;
    }
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          formType: variant === 'full' ? 'participant' : 'interest',
        }),
      });
      if (!response.ok) throw new Error('Ошибка отправки');
      saveSubmittedEmail(data.email);
      setIsSuccess(true);
    } catch {
      setError('Произошла ошибка. Попробуйте позже.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="detail-form-success">
        <div className="detail-form-success__icon">
          <Check className="w-8 h-8 text-white" />
        </div>
        <h3 className="detail-form-success__title">Заявка отправлена!</h3>
        <p className="detail-form-success__text">Эксперт свяжется с вами в ближайшее время.</p>
        <button
          onClick={() => {
            setIsSuccess(false);
            reset();
          }}
          className="detail-form-success__again"
        >
          Отправить еще одну
        </button>
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <form onSubmit={handleSubmit(onSubmit)} className="detail-form">
        <div className="detail-form__field">
          <label className="detail-form__label">E-mail ★</label>
          <input
            type="email"
            placeholder="example@mail.ru"
            {...register('email')}
            className="detail-form__input"
            disabled={isSubmitting}
          />
          {errors.email && <p className="detail-form__error">{errors.email.message}</p>}
        </div>

        <div className="detail-form__checkbox-row">
          <input
            id="detail-consent-compact"
            type="checkbox"
            {...register('consent')}
            className="detail-form__checkbox"
            disabled={isSubmitting}
          />
          <label htmlFor="detail-consent-compact" className="detail-form__consent">
            Я согласен с политикой{' '}
            <a href="/privacy" target="_blank">обработки персональных данных</a>
          </label>
        </div>
        {errors.consent && <p className="detail-form__error">{errors.consent.message}</p>}

        <button type="submit" disabled={isSubmitting} className="btn-liquid w-full detail-form__submit">
          <span className="btn-liquid-text">
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" /> Отправка...
              </>
            ) : (
              'Оставить заявку'
            )}
          </span>
        </button>

        {error && <p className="detail-form__error detail-form__error--center">{error}</p>}
      </form>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="detail-form">
      <div className="detail-form__field">
        <label className="detail-form__label">Бизнес-экспедиция ★</label>
        <select
          {...register('expedition')}
          className="detail-form__input"
          disabled={isSubmitting}
        >
          <option value="">Выберите экспедицию</option>
          {activeExpeditions.map(exp => (
            <option key={exp.slug} value={exp.slug}>
              {exp.country} — {exp.dates}
            </option>
          ))}
        </select>
        {errors.expedition && <p className="detail-form__error">{errors.expedition.message}</p>}
      </div>

      <div className="detail-form__field">
        <label className="detail-form__label">Ваше имя ★</label>
        <input
          placeholder="Иван Иванов"
          {...register('name')}
          className="detail-form__input"
          disabled={isSubmitting}
        />
        {errors.name && <p className="detail-form__error">{errors.name.message}</p>}
      </div>

      <div className="detail-form__field">
        <label className="detail-form__label">Телефон ★</label>
        <input
          type="tel"
          placeholder="+7 (___) ___ __ __"
          {...register('phone')}
          className="detail-form__input"
          disabled={isSubmitting}
        />
        {errors.phone && <p className="detail-form__error">{errors.phone.message}</p>}
      </div>

      <div className="detail-form__field">
        <label className="detail-form__label">E-mail ★</label>
        <input
          type="email"
          placeholder="example@mail.ru"
          {...register('email')}
          className="detail-form__input"
          disabled={isSubmitting}
        />
        {errors.email && <p className="detail-form__error">{errors.email.message}</p>}
      </div>

      <div className="detail-form__checkbox-row">
        <input
          id="detail-consent-full"
          type="checkbox"
          {...register('consent')}
          className="detail-form__checkbox"
          disabled={isSubmitting}
        />
        <label htmlFor="detail-consent-full" className="detail-form__consent">
          Я согласен с политикой{' '}
          <a href="/privacy" target="_blank">обработки персональных данных</a>
        </label>
      </div>
      {errors.consent && <p className="detail-form__error">{errors.consent.message}</p>}

      <button type="submit" disabled={isSubmitting} className="btn-liquid w-full detail-form__submit">
        <span className="btn-liquid-text">
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" /> Отправка...
            </>
          ) : (
            'Стать участником'
          )}
        </span>
      </button>

      {error && <p className="detail-form__error detail-form__error--center">{error}</p>}
    </form>
  );
}