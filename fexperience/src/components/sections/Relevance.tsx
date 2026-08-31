'use client';

import { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { FlipText } from '@/components/ui/FlipText';
import { ParticipantModal } from '@/components/shared/ParticipantModal';

export function Relevance() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    skipSnaps: false,
    dragFree: false,
  });

  const [activeIndex, setActiveIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (!emblaApi) return;
    const interval = setInterval(() => emblaApi.scrollNext(), 10000);
    return () => clearInterval(interval);
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setActiveIndex(emblaApi.selectedScrollSnap());
    emblaApi.on('select', onSelect);
    return () => { emblaApi.off('select', onSelect); };
  }, [emblaApi]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <section className="relative py-12 md:py-24 px-4 sm:px-6 lg:px-8 overflow-visible">
      {/* 🔹 Двойной фон (эффект колоды) */}
      <div className="absolute inset-0 max-w-7xl mx-auto">
        {/* Нижний слой — тёмно-серый фон */}
        <div className="absolute inset-0 bg-[#2A2A2A] rounded-[48px] overflow-hidden">
          <Image src="/images/relevance/relevance-bg-1.webp" alt="" fill className="object-cover" priority />
          </div>
        
        {/* Верхний слой — изображение с картой */}
        <div className="absolute top-[-2rem] md:top-[-4rem] bottom-[2rem] md:bottom-[4rem] left-4 md:left-8 right-4 md:right-8 rounded-[48px] overflow-hidden shadow-2xl">
          <Image src="/images/relevance/relevance-bg-2.webp" alt="" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-white/20" />
        </div>
      </div>

      {/* 🔹 Контент слайдера */}
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="embla overflow-hidden relative" ref={emblaRef}>
          <div className="embla__container flex h-[550px] md:h-[450px]">
            
            {/*  СЛАЙД 1: НОВЫЕ ТОЧКИ */}
            <div className="embla__slide flex-[0_0_100%] min-w-0 h-full flex flex-col items-center justify-start pt-[26px] md:pt-[26px] px-4 md:px-12">
              <div className="max-w-5xl mx-auto text-center">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-4">
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold leading-tight">
                    <span className="text-[#F7931A] block">НОВЫЕ ТОЧКИ</span>
                    <span className="text-[#0D0805] block mt-1 text-xl md:text-2xl lg:text-3xl">НА КАРТЕ ВАШЕГО БИЗНЕСА</span>
                  </h2>
                </motion.div>

                <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="text-sm md:text-base text-[#0D0805]/80 leading-relaxed mb-6 max-w-3xl mx-auto">
                  Тысячи бизнесменов ежегодно стремятся покорить новые горизонты — от соседнего региона до зарубежной страны. Ключ к успеху один – знание локальной специфики.
                </motion.p>

                <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-12 mb-6">
                  <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.2 }} className="text-center">
                    <div className="text-3xl md:text-4xl lg:text-5xl font-bold font-serif text-[#0D0805] leading-none mb-2">&gt;60%</div>
                    <p className="text-xs md:text-sm text-[#0D0805]/70 max-w-[180px]">неудачных экспансий — из-за недостаточно глубокого анализа рынка</p>
                  </motion.div>

                  <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.3 }} className="text-center">
                    <div className="text-3xl md:text-4xl lg:text-5xl font-bold font-serif text-[#0D0805] leading-none mb-2">50+</div>
                    <p className="text-xs md:text-sm text-[#0D0805]/70 max-w-[180px]">лояльных контактов — минимум для понимания специфики и принятия решения о старте</p>
                  </motion.div>

                  <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.4 }} className="text-center">
                    <div className="text-3xl md:text-4xl lg:text-5xl font-bold font-serif text-[#0D0805] leading-none mb-2">&gt;40%</div>
                    <p className="text-xs md:text-sm text-[#0D0805]/70 max-w-[180px]">стартапов терпят провал из-за невостребованности продукта на рынке</p>
                  </motion.div>
                </div>
              </div>
            </div>

            {/*  СЛАЙД 2: FEXPERIENCE */}
            <div className="embla__slide flex-[0_0_100%] min-w-0 h-full flex flex-col items-center justify-start pt-[26px] md:pt-[26px] px-4 md:px-12">
              <div className="max-w-5xl mx-auto text-center">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-3">
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold leading-tight">
                    <span className="block text-[#0D0805]">
                      <span className="text-[#F7931A]">F</span>EXPERIENCE —
                    </span>
                    <span className="text-[#F7931A] block mt-1 text-xl md:text-2xl lg:text-3xl">СПЕЦИАЛЬНЫЙ ПРОЕКТ КОМАНДЫ FORBES,</span>
                  </h2>
                </motion.div>

                <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="text-sm md:text-lg text-[#0D0805] font-medium leading-relaxed mb-3 max-w-4xl mx-auto">
                  КОТОРЫЙ ПОМОЖЕТ ОЦЕНИТЬ ГОТОВНОСТЬ ВАШЕГО БИЗНЕСА К МАСШТАБИРОВАНИЮ,
                  РАСКРЫВ ОСНОВНЫЕ РИСКИ И ВОЗМОЖНОСТИ ЭКСПАНСИИ.
                </motion.p>

                <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="text-xs md:text-sm text-[#0D0805]/70 leading-relaxed mb-6 max-w-3xl mx-auto">
                  Мы предлагаем авторские маршруты уникальных бизнес-экспедиций и собственный независимый дью-дилидженс.
                </motion.p>

                <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-12 mb-6">
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }} className="text-center">
                    <div className="text-lg md:text-xl font-bold text-[#0D0805] mb-1">АНАЛИТИКА</div>
                    <p className="text-xs text-[#0D0805]/70">рынка</p>
                  </motion.div>

                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }} className="text-center">
                    <div className="text-lg md:text-xl font-bold text-[#0D0805] mb-1">НАДЕЖНОСТЬ</div>
                    <p className="text-xs text-[#0D0805]/70">партнеров</p>
                  </motion.div>

                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.5 }} className="text-center">
                    <div className="text-lg md:text-xl font-bold text-[#0D0805] mb-1">ПРОВЕРКА</div>
                    <p className="text-xs text-[#0D0805]/70">product-market fit</p>
                  </motion.div>
                </div>
              </div>
            </div>

          </div>

          {/* Точки-индикаторы (мобильные) */}
          <div className="md:hidden absolute bottom-2 left-1/2 -translate-x-1/2 z-20 flex gap-2">
            {[0, 1].map((index) => (
              <button key={index} onClick={() => emblaApi?.scrollTo(index)} className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer ${index === activeIndex ? 'bg-[#F7931A] scale-125' : 'bg-[#0D0805]/30 hover:bg-[#0D0805]/60'}`} aria-label={`Перейти к слайду ${index + 1}`} />
            ))}
          </div>

          {/* ◀️ Точки ▶️ (десктоп: стрелки по бокам точек) */}
          <div className="hidden md:flex absolute bottom-12 left-1/2 -translate-x-1/2 z-20 items-center gap-4">
            <button onClick={scrollPrev} className="p-2 bg-[#1A1A1A]/80 backdrop-blur-sm border border-[#2A2A2A] rounded-full text-white hover:bg-[#F7931A] hover:border-[#F7931A] transition-all duration-300 cursor-pointer" aria-label="Предыдущий слайд">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex gap-2">
              {[0, 1].map((index) => (
                <button key={index} onClick={() => emblaApi?.scrollTo(index)} className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer ${index === activeIndex ? 'bg-[#F7931A] scale-125' : 'bg-[#0D0805]/30 hover:bg-[#0D0805]/60'}`} aria-label={`Перейти к слайду ${index + 1}`} />
              ))}
            </div>
            <button onClick={scrollNext} className="p-2 bg-[#1A1A1A]/80 backdrop-blur-sm border border-[#2A2A2A] rounded-full text-white hover:bg-[#F7931A] hover:border-[#F7931A] transition-all duration-300 cursor-pointer" aria-label="Следующий слайд">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* 🔹 Кнопка на границе фонов */}
        {/* bottom-[2rem] md:bottom-[4rem] совпадает с нижним краем верхней карточки */}
        {/* translate-y-1/2 центрирует кнопку по этой линии */}
        <div className="absolute -bottom-[2rem] -md:bottom-[4rem] left-1/2 -translate-x-1/2 translate-y-1/2 z-30">
          <button 
            onClick={() => setIsModalOpen(true)} 
            className="group cursor-pointer px-10 py-3.5 rounded-full font-bold bg-[#F7931A] text-white border-2 border-transparent hover:bg-[#FFA733] hover:scale-[1.02] hover:shadow-xl hover:shadow-[#F7931A]/30 transition-all duration-300 text-base shadow-xl shadow-black/20 whitespace-nowrap"
          >
            <FlipText className="flex items-center justify-center">УЧАСТВОВАТЬ В ЭКСПЕДИЦИИ</FlipText>
          </button>
        </div>
      </div>

      <ParticipantModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
}