'use client';

import { useCallback, useEffect, useState, forwardRef, useImperativeHandle } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';

type Speaker = {
  name: string;
  role?: string;
  photo: string;
  description?: string;
  bio?: string;
  forbesBadge?: string;
  forbesLabel?: string;
  expeditionSlugs?: string[];
  category?: string;
};

export type ExpertsSliderHandle = {
  scrollPrev: () => void;
  scrollNext: () => void;
  canScrollPrev: boolean;
  canScrollNext: boolean;
};

type ExpertsSliderProps = {
  speakersList: Speaker[];
  hideNav?: boolean;
  onNavChange?: (canPrev: boolean, canNext: boolean) => void;
};

export const ExpertsSlider = forwardRef<ExpertsSliderHandle, ExpertsSliderProps>(function ExpertsSlider({ speakersList, hideNav, onNavChange }, ref) {
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
    const prev = emblaApi.canScrollPrev();
    const next = emblaApi.canScrollNext();
    setCanScrollPrev(prev);
    setCanScrollNext(next);
    onNavChange?.(prev, next);
  }, [emblaApi, onNavChange]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
  }, [emblaApi, onSelect]);

  useImperativeHandle(ref, () => ({
    scrollPrev,
    scrollNext,
    canScrollPrev,
    canScrollNext,
  }), [scrollPrev, scrollNext, canScrollPrev, canScrollNext]);

  return (
    <div className="relative w-full">
      <div className="overflow-hidden pt-2 pb-10 pr-[100px]" ref={emblaRef}>
        <div className="flex gap-3 md:gap-8">
          {speakersList.map((speaker, index) => (
            <div key={index} className="flex-[0_0_280px] md:flex-[0_0_360px] min-w-0">
              {/* Карточка эксперта: контейнер для наложения */}
              <div className="relative flex flex-col items-center">
                
                {/* ЧАСТЬ 1: Изображение - лежит СВЕРХУ */}
                <div className="relative w-[180px] h-[180px] md:w-[220px] md:h-[220px] z-20 rounded-[17px] overflow-hidden shadow-xl">
                  <Image
                    src={speaker.photo}
                    alt={speaker.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 180px, 220px"
                  />
                  {/* Бейдж Forbes на фото */}
                  {speaker.forbesBadge && (
                    <div className="absolute top-3 left-0 bg-black/80 px-2 py-1 rounded flex items-center">
                      <Image
                        src="/images/forbes-logo-white.svg"
                        alt="Forbes"
                        width={50}
                        height={12}
                        className="h-3 w-auto"
                      />
                    </div>
                  )}
                </div>

                {/* ЧАСТЬ 2: Описание (Темная карточка) */}
                <div className="relative w-[230px] md:w-[275px] bg-[#1A1A1A] rounded-[20px] p-4 md:p-5 pt-12 md:pt-16 mt-[-40px] md:mt-[-50px] z-10 flex flex-col h-[300px] md:h-[361px] border border-[#FF6F00]/80">
                  {/* Подпись Forbes в карточке */}
                  {speaker.forbesLabel && (
                    <span className="text-[#898989] text-[10px] font-roman uppercase tracking-wide mb-1">
                      {speaker.forbesLabel}
                    </span>
                  )}
                  
                  <span className="text-[#FF6F00] text-xs font-bold uppercase tracking-wide mb-3">
                    Эксперт экспедиции
                  </span>

                  <div className="w-[225px] h-px bg-white/30 mb-4 mx-auto" />

                  <h3 className="text-white font-bold text-lg leading-tight mb-2 uppercase">
                    {speaker.name}
                  </h3>
                  
                  {speaker.role && (
                    <p className="text-white/80 text-sm mb-4">
                      {speaker.role}
                    </p>
                  )}
                  
                  <div className="w-[225px] h-px bg-white/30 mb-4 mx-auto" />
                  
                  {(speaker.description || speaker.bio) && (
                    <p className="text-[#A0A0A0] text-xs leading-relaxed mt-auto">
                      {speaker.description || speaker.bio}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {!hideNav && (
        <div className="flex justify-center gap-4 mt-8">
          <button
            onClick={scrollPrev}
            disabled={!canScrollPrev}
            className="w-10 h-10 flex items-center justify-center rounded-full border border-black/20 text-black hover:bg-black hover:text-white transition-all disabled:opacity-30 cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={scrollNext}
            disabled={!canScrollNext}
            className="w-10 h-10 flex items-center justify-center rounded-full border border-black bg-black text-white hover:opacity-80 transition-all disabled:opacity-30 cursor-pointer"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
});
