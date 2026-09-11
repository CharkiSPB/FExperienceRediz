'use client';
import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Shield, ChevronDown, Check } from 'lucide-react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { expeditions } from '@/data/expeditions';
import { CustomSelect } from '@/components/shared/CustomSelect';
import { ModalAside, ModalSeal } from '@/components/shared/ModalAside';

// Извлекает месяц и год из строки даты: "11-16 октября 2026" → "октябрь 2026"
function formatMonthYear(dateStr: string): string {
  const match = dateStr.match(/([а-яА-ЯёЁ]+)\s+(\d{4})/);
  if (match) return `${match[1]} ${match[2]}`;
  return '';
}

// Схема — без изменений
const formSchema = z.object({
  expedition: z.string().min(1, 'Выберите экспедицию'),
  fullName: z.string().min(2, 'Минимум 2 символа'),
  position: z.string().min(2, 'Укажите должность'),
  company: z.string().min(2, 'Укажите компанию'),
  phone: z.string().min(10, 'Введите корректный телефон'),
  consent: z.boolean().refine((val) => val === true, {
    message: 'Необходимо согласие на обработку персональных данных',
  }),
});

type FormValues = z.infer<typeof formSchema>;

type PartnerModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function PartnerModal({ isOpen, onClose }: PartnerModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { consent: false },
  });

  const selectedSlug = watch('expedition');
  const selected = expeditions.find((e) => e.slug === selectedSlug);
  const photo = selected?.image ?? expeditions.find((e) => e.status === 'active')?.image;

  useEffect(() => {
    if (!isOpen) return;
    setIsSuccess(false);
    setSubmitError(null);
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
      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, formType: 'partner' }),
      });
      if (!response.ok) throw new Error('Ошибка отправки');
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
          aria-label="Форма партнёрства"
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
            <ModalAside photo={photo} eyebrow="Стать партнёром" />

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
                  <h3 className="request-modal__success-title">Заявка отправлена!</h3>
                  <p className="request-modal__success-text">
                    Мы свяжемся с вами для обсуждения партнёрства.
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
                  <h3 className="request-modal__title">Стать партнёром</h3>
                  <h3 className="request-modal__title-mobile">
                    Присоединяйтесь к бизнес-экспедициям <span>FExperience</span>
                  </h3>
                  <span className="request-modal__title-line" aria-hidden="true" />

                  <form onSubmit={handleSubmit(onSubmit)} className="request-modal__form" noValidate>
                    <div className="request-field">
                      <span className="request-field__label" id="partner-expedition-label">
                        <span className="req" aria-hidden="true">*</span>Бизнес-экспедиция
                      </span>
                      <div>
                        <CustomSelect
                          options={expeditions.map((exp) => ({
                            value: exp.slug,
                            label:
                              exp.status === 'active' && formatMonthYear(exp.dates)
                                ? `${exp.country} | ${formatMonthYear(exp.dates)}`
                                : exp.country,
                          }))}
                          value={watch('expedition') || ''}
                          onChange={(val) => setValue('expedition', val, { shouldValidate: true })}
                          placeholder="Выберите экспедицию"
                          error={errors.expedition?.message}
                        />
                      </div>
                    </div>

                    <div className="request-field">
                      <label className="request-field__label" htmlFor="partner-fullname">
                        <span className="req" aria-hidden="true">*</span>ФИО
                      </label>
                      <div>
                        <input
                          id="partner-fullname"
                          {...register('fullName')}
                          placeholder="Иванов Иван Иванович"
                          autoComplete="name"
                          className="request-input"
                          disabled={isSubmitting}
                        />
                        {errors.fullName && <p className="request-error">{errors.fullName.message}</p>}
                      </div>
                    </div>

                    <div className="request-field">
                      <label className="request-field__label" htmlFor="partner-position">
                        <span className="req" aria-hidden="true">*</span>Должность
                      </label>
                      <div>
                        <input
                          id="partner-position"
                          {...register('position')}
                          placeholder="Генеральный директор"
                          autoComplete="organization-title"
                          className="request-input"
                          disabled={isSubmitting}
                        />
                        {errors.position && <p className="request-error">{errors.position.message}</p>}
                      </div>
                    </div>

                    <div className="request-field">
                      <label className="request-field__label" htmlFor="partner-company">
                        <span className="req" aria-hidden="true">*</span>Компания
                      </label>
                      <div>
                        <input
                          id="partner-company"
                          {...register('company')}
                          placeholder="ООО «Компания»"
                          autoComplete="organization"
                          className="request-input"
                          disabled={isSubmitting}
                        />
                        {errors.company && <p className="request-error">{errors.company.message}</p>}
                      </div>
                    </div>

                    <div className="request-field">
                      <label className="request-field__label" htmlFor="partner-phone">
                        <span className="req" aria-hidden="true">*</span>Телефон
                      </label>
                      <div>
                        <input
                          id="partner-phone"
                          type="tel"
                          placeholder="+7 (___) ___ __ __"
                          {...register('phone')}
                          autoComplete="tel"
                          inputMode="tel"
                          className="request-input"
                          disabled={isSubmitting}
                        />
                        {errors.phone && <p className="request-error">{errors.phone.message}</p>}
                      </div>
                    </div>

                    <div className="request-consent">
                      <input
                        id="partner-consent"
                        type="checkbox"
                        {...register('consent')}
                        disabled={isSubmitting}
                      />
                      <label htmlFor="partner-consent">
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
