'use client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Image from 'next/image';
import { expeditions } from '@/data/expeditions';
import { CustomSelect } from '@/components/shared/CustomSelect';

// 🔹 Извлекает месяц и год из строки даты: "11-16 октября 2026" → "октябрь 2026"
function formatMonthYear(dateStr: string): string {
  const match = dateStr.match(/([а-яА-ЯёЁ]+)\s+(\d{4})/);
  if (match) return `${match[1]} ${match[2]}`;
  return '';
}

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
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, formType: 'partner' }),
      });
      if (!response.ok) throw new Error('Ошибка отправки');
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
                  <p className="text-[#A0A0A0]">Мы свяжемся с вами для обсуждения партнёрства.</p>
                </div>
              ) : (
                <>
                  <h3 className="text-2xl font-serif font-bold text-white mb-5 text-center w-full">Стать партнёром</h3>

                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                    {/* Бизнес-экспедиция */}
                    <div className="flex items-start gap-3">
                      <label className="w-[180px] flex-shrink-0 flex items-start gap-1.5 text-sm text-white/80 pt-2.5">
                        <span className="text-[#FF8800] text-[8px] leading-none flex-shrink-0 ">★</span>
                        Бизнес-экспедиция
                      </label>
                      <div className="flex-1 min-w-0">
                        <CustomSelect
                          options={expeditions.map(exp => ({
                            value: exp.slug,
                            label: exp.status === 'active' && formatMonthYear(exp.dates)
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

                    {/* ФИО */}
                    <div className="flex items-start gap-3">
                      <label className="w-[180px] flex-shrink-0 flex items-start gap-1.5 text-sm text-white/80 pt-2.5">
                        <span className="text-[#FF8800] text-[8px] leading-none flex-shrink-0 ">★</span>
                        ФИО
                      </label>
                      <div className="flex-1 min-w-0">
                        <input {...register('fullName')} placeholder="Иванов Иван Иванович" className="w-full bg-[#1A1A1A]/80 border border-[#2A2A2A] rounded-lg px-3 py-2 text-white text-sm placeholder-[#666666] focus:outline-none focus:border-[#FF8800] transition-colors" />
                        {errors.fullName && <p className="text-red-500 text-xs mt-0.5">{errors.fullName.message}</p>}
                      </div>
                    </div>

                    {/* Должность */}
                    <div className="flex items-start gap-3">
                      <label className="w-[180px] flex-shrink-0 flex items-start gap-1.5 text-sm text-white/80 pt-2.5">
                        <span className="text-[#FF8800] text-[8px] leading-none flex-shrink-0 ">★</span>
                        Должность
                      </label>
                      <div className="flex-1 min-w-0">
                        <input {...register('position')} placeholder="Генеральный директор" className="w-full bg-[#1A1A1A]/80 border border-[#2A2A2A] rounded-lg px-3 py-2 text-white text-sm placeholder-[#666666] focus:outline-none focus:border-[#FF8800] transition-colors" />
                        {errors.position && <p className="text-red-500 text-xs mt-0.5">{errors.position.message}</p>}
                      </div>
                    </div>

                    {/* Компания */}
                    <div className="flex items-start gap-3">
                      <label className="w-[180px] flex-shrink-0 flex items-start gap-1.5 text-sm text-white/80 pt-2.5">
                        <span className="text-[#FF8800] text-[8px] leading-none flex-shrink-0 ">★</span>
                        Компания
                      </label>
                      <div className="flex-1 min-w-0">
                        <input {...register('company')} placeholder="ООО «Компания»" className="w-full bg-[#1A1A1A]/80 border border-[#2A2A2A] rounded-lg px-3 py-2 text-white text-sm placeholder-[#666666] focus:outline-none focus:border-[#FF8800] transition-colors" />
                        {errors.company && <p className="text-red-500 text-xs mt-0.5">{errors.company.message}</p>}
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

                    {/* Согласие */}
                    <div className="flex items-start gap-2 pt-2">
                      <input id="partner-consent" type="checkbox" {...register('consent')} className="mt-1 w-4 h-4 accent-[#FF8800] rounded border-[#2A2A2A] bg-[#1A1A1A] cursor-pointer flex-shrink-0" />
                      <label htmlFor="partner-consent" className="text-xs text-[#A0A0A0] leading-tight cursor-pointer">
                        Я согласен с политикой <a href="/privacy" target="_blank" className="text-[#FF8800] hover:underline">обработки персональных данных</a>
                      </label>
                    </div>
                    {errors.consent && <p className="text-red-500 text-xs mt-1">{errors.consent.message}</p>}

                    <button
                      type="submit"
                      disabled={isSubmitting}
                       className="w-full mt-2 py-3 rounded-lg font-medium bg-gradient-to-r from-[#FF8800] to-[#E8850F] text-white hover:from-[#FFA733] hover:to-[#FF8800] hover:shadow-xl hover:shadow-[#FF8800]/30 transition-all duration-300 shadow-lg shadow-[#FF8800]/20 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? 'Отправка...' : 'Оставить заявку'}
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
