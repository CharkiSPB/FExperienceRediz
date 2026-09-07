'use client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { FlipText } from '@/components/ui/FlipText';
import { expeditions } from '@/data/expeditions';

// 🔹 Схема с полем leadType
const formSchema = z.object({
  name: z.string().min(2, 'Имя слишком короткое'),
  phone: z.string().min(5, 'Введите корректный телефон'),
  email: z.string().email('Некорректный email').optional().or(z.literal('')),
  expedition: z.string().optional(),
  consent: z.boolean().refine((val) => val === true, {
    message: 'Необходимо согласие на обработку персональных данных',
  }),
  leadType: z.enum(['consultation', 'expedition']).default('expedition'), // 🔹
});

type FormValues = z.infer<typeof formSchema>;

type RequestModalProps = {
  isOpen: boolean;
  onClose: () => void;
  defaultLeadType?: 'consultation' | 'expedition'; // 🔹 Пропс для типа
};

export function RequestModal({ isOpen, onClose, defaultLeadType = 'expedition' }: RequestModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { consent: false, leadType: defaultLeadType }, // 🔹
  });

  const currentType = watch('leadType');

  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    try {
      // 🔹 Отключена реальная отправка для демо - данные не отправляются
      // Имитация задержки для реалистичного UX
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Реальная отправка на API закомментирована:
      // const response = await fetch('/api/lead', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(data),
      // });
      // if (!response.ok) throw new Error('Ошибка отправки');
      
      setIsSuccess(true);
      reset();
      setTimeout(() => {
        setIsSuccess(false);
        onClose();
      }, 2000);
    } catch {
      console.error('Не удалось отправить заявку');
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
            className="bg-[#110F0D] border border-[#2A2A2A] rounded-xl p-6 md:p-8 w-full max-w-md relative"
          >
            <button onClick={onClose} className="absolute top-4 right-4 text-[#666666] hover:text-white transition-colors">
              <X className="w-5 h-5" />
            </button>

            {isSuccess ? (
              <div className="text-center py-8">
                <h3 className="text-2xl font-serif font-bold text-white mb-2">Заявка отправлена!</h3>
                <p className="text-[#A0A0A0]">Эксперт свяжется с вами в ближайшее время.</p>
              </div>
            ) : (
              <>
                {/* 🔹 Заголовок меняется в зависимости от типа */}
                <h3 className="text-2xl font-serif font-bold text-white mb-2">
                  {defaultLeadType === 'consultation' ? 'Стать партнером' : 'Стать участником'}
                </h3>
                
                {/* 🔹 Бейдж типа заявки */}
                <div className="mb-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#F7931A]/10 text-[#F7931A]">
                    {currentType === 'consultation' ? 'Партнерство' : 'Экспедиция'}
                  </span>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <input type="hidden" {...register('leadType')} /> {/* 🔹 Скрытое поле */}

                  <div>
                    <input {...register('name')} placeholder="Ваше имя" className="w-full bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg px-4 py-3 text-white placeholder-[#666666] focus:outline-none focus:border-[#F7931A]" />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                  </div>

                  <div>
                    <input {...register('phone')} placeholder="Телефон" className="w-full bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg px-4 py-3 text-white placeholder-[#666666] focus:outline-none focus:border-[#F7931A]" />
                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
                  </div>

                  <div>
                    <input {...register('email')} placeholder="Email (необязательно)" className="w-full bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg px-4 py-3 text-white placeholder-[#666666] focus:outline-none focus:border-[#F7931A]" />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                  </div>

                  {/* Выпадающий список экспедиций */}
                  <div>
                    <label className="block text-sm text-[#A0A0A0] mb-1.5">Какая экспедиция интересует?</label>
                    <select {...register('expedition')} className="w-full bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#F7931A]">
                      <option value="">Не выбрано</option>
                      {expeditions.filter(e => e.status === 'active').map(exp => (
                        <option key={exp.slug} value={exp.slug}>{exp.country} — {exp.dates}</option>
                      ))}
                    </select>
                  </div>

                  <div className="flex items-start gap-2 pt-2">
                    <input id="consent" type="checkbox" {...register('consent')} className="mt-1 w-4 h-4 accent-[#F7931A] rounded border-[#2A2A2A] bg-[#1A1A1A] cursor-pointer" />
                    <label htmlFor="consent" className="text-xs text-[#A0A0A0] leading-tight cursor-pointer">
                      Я согласен с политикой <a href="/privacy" target="_blank" className="text-[#F7931A] hover:underline">обработки персональных данных</a>
                    </label>
                  </div>
                  {errors.consent && <p className="text-red-500 text-xs mt-1">{errors.consent.message}</p>}

                  <button type="submit" disabled={isSubmitting} className="group w-full mt-2 py-3 rounded-lg font-medium bg-gradient-to-r from-[#F7931A] to-[#E8850F] text-white hover:from-[#FFA733] hover:to-[#F7931A] transition-all shadow-lg shadow-[#F7931A]/20 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer">
                    {isSubmitting ? 'Отправка...' : <FlipText className="flex items-center justify-center">Оставить заявку</FlipText>}
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}