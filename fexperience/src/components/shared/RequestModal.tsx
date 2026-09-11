'use client';
import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
  X,
  Shield,
  ChevronDown,
  Check,
} from 'lucide-react';
import { ModalAside, ModalSeal } from '@/components/shared/ModalAside';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { expeditions, getNearestExpedition } from '@/data/expeditions';
import { useExpedition } from '@/components/providers/ExpeditionContext';

// Схема — без изменений
const formSchema = z.object({
  name: z.string().min(2, 'Имя слишком короткое'),
  phone: z.string().min(5, 'Введите корректный телефон'),
  email: z.string().email('Некорректный email').optional().or(z.literal('')),
  expedition: z.string().optional(),
  consent: z.boolean().refine((val) => val === true, {
    message: 'Необходимо согласие на обработку персональных данных',
  }),
  leadType: z.enum(['consultation', 'expedition']).default('expedition'),
});

type FormValues = z.infer<typeof formSchema>;

type RequestModalProps = {
  isOpen: boolean;
  onClose: () => void;
  defaultLeadType?: 'consultation' | 'expedition';
  defaultExpeditionSlug?: string;
};

export function RequestModal({ isOpen, onClose, defaultLeadType = 'expedition', defaultExpeditionSlug }: RequestModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const { activeExpeditionSlug } = useExpedition();
  const activeExpeditions = expeditions.filter((e) => e.status === 'active');
  const nearest = getNearestExpedition(expeditions);
  const preselect =
    (defaultExpeditionSlug && activeExpeditions.some((e) => e.slug === defaultExpeditionSlug))
      ? defaultExpeditionSlug
      : activeExpeditions.some((e) => e.slug === activeExpeditionSlug)
        ? activeExpeditionSlug
        : (nearest?.slug ?? '');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { consent: false, leadType: defaultLeadType, expedition: preselect },
  });

  const selectedSlug = watch('expedition');
  const selected =
    activeExpeditions.find((e) => e.slug === selectedSlug) ??
    activeExpeditions.find((e) => e.slug === preselect) ??
    nearest;
  const photo = selected?.image;

  // Сброс состояний при открытии + преселект текущей/ближайшей
  useEffect(() => {
    if (!isOpen) return;
    setIsSuccess(false);
    setSubmitError(null);
    reset({ consent: false, leadType: defaultLeadType, expedition: preselect });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  // Esc + focus trap
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if (e.key !== 'Tab' || !panelRef.current) return;
      const list = Array.from(
        panelRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )
      ).filter((el) => !el.hasAttribute('disabled'));
      if (list.length === 0) return;
      const first = list[0];
      const last = list[list.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      // Отключена реальная отправка для демо - данные не отправляются
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Реальная отправка на API закомментирована:
      // const response = await fetch('/api/lead', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(data),
      // });
      // if (!response.ok) throw new Error('Ошибка отправки');

      setIsSuccess(true);
      reset();
    } catch {
      setSubmitError('Не удалось отправить заявку. Попробуйте ещё раз.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="request-modal"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label="Форма заявки"
        >
          <motion.div
            ref={panelRef}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.25 }}
            onClick={(e) => e.stopPropagation()}
            className="request-modal__grid"
          >
            <ModalAside photo={photo} eyebrow="Стать участником" />

            {/* Правая панель — форма */}
            <div className="request-modal__form-panel">
              <button
                type="button"
                onClick={onClose}
                className="request-modal__close"
                aria-label="Закрыть форму"
              >
                <X className="w-5 h-5" />
              </button>

              {isSuccess ? (
                <div className="request-modal__success">
                  <span className="request-modal__success-check" aria-hidden="true">
                    <Check className="w-6 h-6" />
                  </span>
                  <h3 className="request-modal__success-title">Заявка отправлена</h3>
                  <p className="request-modal__success-text">
                    Спасибо за заявку. Эксперт свяжется с вами в ближайшее время.
                  </p>
                  <Link href="/articles" className="btn-text request-modal__articles-link" onClick={onClose}>
                    Перейти в раздел Статьи <span aria-hidden="true">→</span>
                  </Link>
                </div>
              ) : (
                <>
                  <div className="request-modal__mobile-head" aria-hidden="true">
                    <ModalSeal size={72} />
                  </div>
                  <h3 className="request-modal__title">
                    {defaultLeadType === 'consultation' ? 'Стать партнером' : 'Стать участником'}
                  </h3>
                  <h3 className="request-modal__title-mobile">
                    Присоединяйтесь к бизнес-экспедициям <span>FExperience</span>
                  </h3>
                  <span className="request-modal__title-line" aria-hidden="true" />

                  <form onSubmit={handleSubmit(onSubmit)} className="request-modal__form" noValidate>
                    <input type="hidden" {...register('leadType')} />

                    <div className="request-field">
                      <label className="request-field__label" htmlFor="request-expedition">
                        <span className="req" aria-hidden="true">*</span>Бизнес-экспедиция
                      </label>
                      <div className="request-select-wrap">
                        <select
                          id="request-expedition"
                          {...register('expedition')}
                          className="request-select"
                          disabled={isSubmitting}
                        >
                          <option value="">Выберите экспедицию</option>
                          {activeExpeditions.map((exp) => (
                            <option key={exp.slug} value={exp.slug}>
                              {exp.country} — {exp.dates}
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="request-select__chevron" aria-hidden="true" />
                      </div>
                    </div>

                    <div className="request-field">
                      <label className="request-field__label" htmlFor="request-name">
                        <span className="req" aria-hidden="true">*</span>Ваше имя
                      </label>
                      <div>
                        <input
                          id="request-name"
                          {...register('name')}
                          placeholder="Иван Иванов"
                          autoComplete="name"
                          className="request-input"
                          disabled={isSubmitting}
                        />
                        {errors.name && <p className="request-error">{errors.name.message}</p>}
                      </div>
                    </div>

                    <div className="request-field">
                      <label className="request-field__label" htmlFor="request-phone">
                        <span className="req" aria-hidden="true">*</span>Телефон
                      </label>
                      <div>
                        <input
                          id="request-phone"
                          {...register('phone')}
                          placeholder="+7 (___) ___ __ __"
                          autoComplete="tel"
                          inputMode="tel"
                          className="request-input"
                          disabled={isSubmitting}
                        />
                        {errors.phone && <p className="request-error">{errors.phone.message}</p>}
                      </div>
                    </div>

                    <div className="request-field">
                      <label className="request-field__label" htmlFor="request-email">
                        E-mail
                      </label>
                      <div>
                        <input
                          id="request-email"
                          {...register('email')}
                          placeholder="example@mail.ru"
                          autoComplete="email"
                          inputMode="email"
                          className="request-input"
                          disabled={isSubmitting}
                        />
                        {errors.email && <p className="request-error">{errors.email.message}</p>}
                      </div>
                    </div>

                    <div className="request-consent">
                      <input
                        id="request-consent"
                        type="checkbox"
                        {...register('consent')}
                        disabled={isSubmitting}
                      />
                      <label htmlFor="request-consent">
                        Я согласен с политикой{' '}
                        <a href="/privacy" target="_blank" rel="noopener noreferrer">
                          обработки персональных данных
                        </a>
                      </label>
                    </div>
                    {errors.consent && <p className="request-error">{errors.consent.message}</p>}

                    <button type="submit" disabled={isSubmitting} className="request-submit">
                      {isSubmitting ? (
                        <>
                          <span className="request-submit__spinner" aria-hidden="true" />
                          Отправляем...
                        </>
                      ) : (
                        'Оставить заявку'
                      )}
                    </button>
                    {submitError && (
                      <p className="request-error request-error--submit" role="alert">
                        {submitError}
                      </p>
                    )}
                  </form>

                  <p className="request-privacy-note">
                    <Shield aria-hidden="true" />
                    <span>
                      Мы гарантируем конфиденциальность ваших данных и не передаем их третьим лицам
                    </span>
                  </p>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
