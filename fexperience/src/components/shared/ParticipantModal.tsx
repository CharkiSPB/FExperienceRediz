'use client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Image from 'next/image';
import { expeditions } from '@/data/expeditions';
import { FlipText } from '@/components/ui/FlipText';
import { CustomSelect } from '@/components/shared/CustomSelect';

// 🔹 Извлекает месяц и год из строки даты: "11-16 октября 2026" → "октябрь 2026"
function formatMonthYear(dateStr: string): string {
  const match = dateStr.match(/([а-яА-ЯёЁ]+)\s+(\d{4})/);
  if (match) return `${match[1]} ${match[2]}`;
  return '';
}

const formSchema = z.object({
  expedition: z.string().min(1, 'Выберите экспедицию'),
  name: z.string().min(2, 'Минимум 2 символа'),
  phone: z.string().min(10, 'Введите корректный телефон'),
  email: z.string().email('Некорректный email'),
  consent: z.boolean().refine((val) => val === true, {
    message: 'Необходимо согласие на обработку персональных данных',
  }),
});

type FormValues = z.infer<typeof formSchema>;

type ParticipantModalProps = {
  isOpen: boolean;
  onClose: () => void;
  /** Если передано — этот slug будет предвыбран в поле "Бизнес-экспедиция" */
  defaultExpeditionSlug?: string;
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

export function ParticipantModal({ isOpen, onClose, defaultExpeditionSlug }: ParticipantModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [duplicateError, setDuplicateError] = useState<string | null>(null);

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

  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  const onSubmit = async (data: FormValues) => {
    setDuplicateError(null);

    // Проверка на повторную отправку
    if (hasSubmittedEmail(data.email)) {
      setDuplicateError('Вы уже отправили заявку');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, formType: 'participant' }),
      });
      if (!response.ok) throw new Error('Ошибка отправки');
      saveSubmittedEmail(data.email);
      setIsSuccess(true);
      reset();
      setTimeout(() => {
        setIsSuccess(false);
        onClose();
      }, 2000);
    } catch {
      console.error('Ошибка отправки');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Активные экспедиции + экспедиция по умолчанию (если она не active)
  const activeExpeditions = expeditions.filter(e => e.status === 'active');
  const expeditionOptions = (() => {
    const options = activeExpeditions.map(exp => ({
      value: exp.slug,
      label: formatMonthYear(exp.dates)
        ? `${exp.country}  |  ${formatMonthYear(exp.dates)}`
        : exp.country,
    }));
    // Если передан defaultExpeditionSlug, и его нет в списке — добавляем
    if (defaultExpeditionSlug && !activeExpeditions.some(e => e.slug === defaultExpeditionSlug)) {
      const defaultExp = expeditions.find(e => e.slug === defaultExpeditionSlug);
      if (defaultExp) {
        options.unshift({
          value: defaultExp.slug,
          label: defaultExp.country,
        });
      }
    }
    return options;
  })();

  // При открытии модалки с предвыбранной экспедицией — устанавливаем значение
  useEffect(() => {
    if (isOpen && defaultExpeditionSlug) {
      setValue('expedition', defaultExpeditionSlug, { shouldValidate: false });
    }
  }, [isOpen, defaultExpeditionSlug, setValue]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md overflow-hidden rounded-xl"
          >
            {/* Фоновое изображение */}
            <div className="absolute inset-0 -z-10">
              <Image
                src="/images/media/modalki.webp"
                alt=""
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-b from-[#110F0D]/40 via-[#110F0D]/30 to-[#110F0D]/40" />
            </div>

            <div className="relative p-6 md:p-8">
              <button onClick={onClose} className="absolute top-4 right-4 text-[#666666] hover:text-white transition-colors z-10">
                <X className="w-5 h-5" />
              </button>

              {isSuccess ? (
                <div className="text-center py-8">
                  <h3 className="text-2xl font-serif font-bold text-white mb-2">Заявка отправлена!</h3>
                  <p className="text-[#A0A0A0]">Эксперт свяжется с вами в ближайшее время.</p>
                </div>
              ) : (
                <>
                  <h3 className="text-2xl font-serif font-bold text-white mb-5 text-center w-full">Стать участником</h3>

                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                    {/* Бизнес-экспедиция */}
                    <div className="flex items-start gap-3">
                      <label className="w-[180px] flex-shrink-0 flex items-start gap-1.5 text-sm text-white/80 pt-2.5">
                        <span className="text-[#FF8800] text-[8px] leading-none flex-shrink-0 ">★</span>
                        Бизнес-экспедиция
                      </label>
                      <div className="flex-1 min-w-0">
                        <CustomSelect
                          options={expeditionOptions}
                          value={watch('expedition') || ''}
                          onChange={(val) => setValue('expedition', val, { shouldValidate: true })}
                          placeholder="Выберите экспедицию"
                          error={errors.expedition?.message}
                        />
                      </div>
                    </div>

                    {/* Ваше имя */}
                    <div className="flex items-start gap-3">
                      <label className="w-[180px] flex-shrink-0 flex items-start gap-1.5 text-sm text-white/80 pt-2.5">
                        <span className="text-[#FF8800] text-[8px] leading-none flex-shrink-0 ">★</span>
                        Ваше имя
                      </label>
                      <div className="flex-1 min-w-0">
                        <input {...register('name')} placeholder="Иван Иванов" className="w-full bg-[#1A1A1A]/80 border border-[#2A2A2A] rounded-lg px-3 py-2 text-white text-sm placeholder-[#666666] focus:outline-none focus:border-[#FF8800] transition-colors" />
                        {errors.name && <p className="text-red-500 text-xs mt-0.5">{errors.name.message}</p>}
                      </div>
                    </div>

                    {/* Телефон */}
                    <div className="flex items-start gap-3">
                      <label className="w-[180px] flex-shrink-0 flex items-start gap-1.5 text-sm text-white/80 pt-2.5">
                        <span className="text-[#FF8800] text-[8px] leading-none flex-shrink-0 ">★</span>
                        Телефон
                      </label>
                      <div className="flex-1 min-w-0">
                        <input
                          type="tel"
                          placeholder="+7 (___) ___ __ __"
                          {...register('phone')}
                          className="w-full bg-[#1A1A1A]/80 border border-[#2A2A2A] rounded-lg px-3 py-2 text-white text-sm placeholder-[#666666] focus:outline-none focus:border-[#FF8800] transition-colors"
                        />
                        {errors.phone && <p className="text-red-500 text-xs mt-0.5">{errors.phone.message}</p>}
                      </div>
                    </div>

                    {/* E-mail */}
                    <div className="flex items-start gap-3">
                      <label className="w-[180px] flex-shrink-0 flex items-start gap-1.5 text-sm text-white/80 pt-2.5">
                        <span className="text-[#FF8800] text-[8px] leading-none flex-shrink-0 ">★</span>
                        E-mail
                      </label>
                      <div className="flex-1 min-w-0">
                        <input
                          type="email"
                          placeholder="example@mail.ru"
                          {...register('email')}
                          className="w-full bg-[#1A1A1A]/80 border border-[#2A2A2A] rounded-lg px-3 py-2 text-white text-sm placeholder-[#666666] focus:outline-none focus:border-[#FF8800] transition-colors"
                        />
                        {errors.email && <p className="text-red-500 text-xs mt-0.5">{errors.email.message}</p>}
                        {duplicateError && !errors.email && <p className="text-red-500 text-xs mt-0.5">{duplicateError}</p>}
                      </div>
                    </div>

                    {/* Согласие */}
                    <div className="flex items-start gap-2 pt-2">
                      <input id="participant-consent" type="checkbox" {...register('consent')} className="mt-1 w-4 h-4 accent-[#FF8800] rounded border-[#2A2A2A] bg-[#1A1A1A] cursor-pointer flex-shrink-0" />
                      <label htmlFor="participant-consent" className="text-xs text-[#A0A0A0] leading-tight cursor-pointer">
                        Я согласен с политикой <a href="/privacy" target="_blank" className="text-[#FF8800] hover:underline">обработки персональных данных</a>
                      </label>
                    </div>
                    {errors.consent && <p className="text-red-500 text-xs mt-1">{errors.consent.message}</p>}

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="group w-full mt-2 py-3 rounded-lg font-medium bg-gradient-to-r from-[#FF8800] to-[#E8850F] text-white hover:from-[#FFA733] hover:to-[#FF8800] hover:shadow-xl hover:shadow-[#FF8800]/30 transition-all duration-300 shadow-lg shadow-[#FF8800]/20 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                    >
                      {isSubmitting ? 'Отправка...' : <FlipText className="flex items-center justify-center">Оставить заявку</FlipText>}
                    </button>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
