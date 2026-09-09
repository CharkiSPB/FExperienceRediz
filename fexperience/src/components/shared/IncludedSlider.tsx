'use client';

import { useCallback, useEffect, useState, useRef } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';

type IncludedSliderProps = {
  items: string[];
  slug?: string; // slug экспедиции для индивидуальных изображений
};

// Очищает текст от форматирования для alt-тегов
const cleanAltText = (text: string) => {
  return text.replace(/~/g, '').replace(/\|/g, ', ');
};

const renderFormattedText = (text: string) => {
  if (!text.includes('~')) {
    // Если нет раскраски, но есть перенос строки
    if (text.includes('|')) {
      return (
        <>
          {text.split('|').map((line, i) => (
            <span key={i}>
              {line}
              {i < text.split('|').length - 1 && <br />}
            </span>
          ))}
        </>
      );
    }
    return <span className="text-white">{text}</span>;
  }

  // Разбиваем на части по ~
  const parts = text.split('~');
  
  return (
    <>
      {parts.map((part, i) => {
        
        if (part.includes('|')) {
          return (
            <span key={i} className={i % 2 === 1 ? 'text-[#000004]' : 'text-white'}>
              {part.split('|').map((line, j) => (
                <span key={j}>
                  {line}
                  {j < part.split('|').length - 1 && <br />}
                </span>
              ))}
            </span>
          );
        }
        
        return (
          <span key={i} className={i % 2 === 1 ? 'text-[#000004]' : 'text-white'}>
            {part}
          </span>
        );
      })}
    </>
  );
};

export function IncludedSlider({ items, slug }: IncludedSliderProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: false, 
    align: 'start', 
    dragFree: false 
  });
  
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
  }, [emblaApi, onSelect]);

  return (
    <div className="lg:col-span-8 relative">
      <div className="overflow-hidden py-20 pl-2" ref={emblaRef}>
        <div className="flex">
          {items.map((item, index) => (
            <div key={index} className="flex-[0_0_300px] sm:flex-[0_0_420px] md:flex-[0_0_380px] min-w-0 pl-4 md:pl-12">
              {/* Контейнер карточки с фиксированной высотой */}
              <div className="relative w-full h-[260px] md:h-[300px]">

                {/* 1. Нижняя карточка-подложка (Серый фон) */}
                <div className="absolute bottom-0 left-0 w-full h-[200px] md:h-[220px] bg-[#555555] rounded-[17px] md:rounded-[23px] overflow-hidden">
                  <Image
                    src={`/images/expeditions/included-bg-${index + 1}.webp`}
                    alt={cleanAltText(item)}
                    width={361}
                    height={254}
                    className="object-cover w-full h-full"
                    priority={index < 2}
                  />
                </div>

                {/* 2. Верхняя карточка (Сдвинута ВВЕРХ и ВПРАВО) */}
                <div className="absolute -top-4 md:-top-3 right-[-16px] md:right-[-20] w-[85%] h-[150px] md:h-[190px] rounded-[20px] md:rounded-[28px] overflow-hidden shadow-xl z-10 bg-[#1A1A1A]">
                  <Image
                    src={slug ? `/images/expeditions/included-${slug}-top-${index + 1}.webp` : `/images/expeditions/included-top-${index + 1}.webp`}
                    alt={cleanAltText(item)}
                    width={339}
                    height={227}
                    className="object-cover w-full h-full"
                    priority={index < 2}
                  />
                </div>

                {/* 3. Текст (Абсолютно внизу, поверх серой подложки) */}
                <div className="absolute bottom-6 left-6 right-14 z-20 pointer-events-none">
                  <p className="font-bold text-xl md:text-2xl leading-snug uppercase tracking-wide drop-shadow-lg">
                    {renderFormattedText(item)}
                  </p>
                </div>

              </div>
            </div>
          ))}
          {/* Спейсер после последнего слайда — чтобы правая часть последней карточки не обрезалась */}
          <div className="flex-[0_0_48px] md:flex-[0_0_64px] min-w-0" />
        </div>
      </div>

      

      {/* Кнопки навигации — на десктопе слева, на мобилке снизу */}
      <div className="flex flex-row lg:flex-col gap-3 justify-center mt-6 lg:absolute lg:top-1/2 lg:-translate-y-1/2 lg:left-[-50px] lg:mt-0">
        <button
          onClick={scrollPrev}
          disabled={!canScrollPrev}
          className="w-10 h-10 flex items-center justify-center rounded-full border border-white/20 text-white hover:bg-[#F7931A] hover:border-[#F7931A] transition-all cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
          aria-label="Предыдущий слайд"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={scrollNext}
          disabled={!canScrollNext}
          className="w-10 h-10 flex items-center justify-center rounded-full border border-[#F7931A] bg-[#F7931A] text-white hover:bg-[#FFA733] hover:border-[#FFA733] hover:shadow-lg hover:shadow-[#F7931A]/30 transition-all cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
          aria-label="Следующий слайд"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}