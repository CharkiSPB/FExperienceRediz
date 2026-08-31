'use client';

import { useCallback, useEffect, useState, forwardRef, useImperativeHandle } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import type { TeamMember } from '@/data/team';

export type TeamSliderHandle = {
  scrollPrev: () => void;
  scrollNext: () => void;
  canScrollPrev: boolean;
  canScrollNext: boolean;
};

type TeamSliderProps = {
  members: TeamMember[];
  hideNav?: boolean;
  onNavChange?: (canPrev: boolean, canNext: boolean) => void;
};

export const TeamSlider = forwardRef<TeamSliderHandle, TeamSliderProps>(function TeamSlider(
  { members, hideNav, onNavChange },
  ref
) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: 'start',
    dragFree: false,
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

  useImperativeHandle(
    ref,
    () => ({
      scrollPrev,
      scrollNext,
      canScrollPrev,
      canScrollNext,
    }),
    [scrollPrev, scrollNext, canScrollPrev, canScrollNext]
  );

  if (members.length === 0) {
    return null;
  }

  return (
    <div className="relative w-full">
      <div className="overflow-hidden py-10" ref={emblaRef}>
        <div className="flex gap-3 md:gap-8">
          {members.map((member, index) => (
            <div
              key={index}
              className="flex-[0_0_280px] md:flex-[0_0_360px] min-w-0"
            >
              {/* Карточка участника команды: контейнер для наложения */}
              <div className="relative flex flex-col items-center">
                {/* Фото — лежит СВЕРХУ */}
                <div className="relative w-[180px] h-[180px] md:w-[220px] md:h-[220px] z-20 rounded-[17px] overflow-hidden shadow-xl">
                  <Image
                    src={member.photo}
                    alt={member.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 180px, 220px"
                  />
                  {/* Бэдж Forbes на фото */}
                  <div className="absolute top-3 left-0 bg-black/80 px-2 py-1 rounded flex items-center">
                    <Image
                      src="/images/forbes-logo-white.svg"
                      alt="Forbes"
                      width={50}
                      height={12}
                      className="h-3 w-auto"
                    />
                  </div>
                </div>

                {/* Карточка с именем и описанием */}
                <div className="relative w-[230px] md:w-[275px] bg-[#1A1A1A] rounded-[20px] p-4 md:p-5 pt-12 md:pt-16 mt-[-40px] md:mt-[-50px] z-10 flex flex-col border border-[#FF6F00]/80"
                  style={{ minHeight: '340px' }}
                >
                  {/* Forbes Russia */}
                  <span className="text-[#898989] text-[10px] font-roman uppercase tracking-wide mb-1">
                    Forbes Russia
                  </span>
                  
                  {/* Имя участника (оранжевый) */}
                  <span className="text-[#FF6F00] text-xs font-bold uppercase tracking-wide mb-3">
                    {member.name}
                  </span>

                  <div className="w-[225px] h-px bg-white/30 mb-4 mx-auto" />

                  {/* Должность / роль — нормальный размер (не мелкий) */}
                  {member.description && (
                    <p className="text-white/80 text-sm leading-relaxed">
                      {member.description}
                    </p>
                  )}

                  {/* Вторая разделительная линия + биография (на будущее) */}
                  {member.bio && (
                    <>
                      <div className="w-[225px] h-px bg-white/30 my-4 mx-auto" />
                      <p className="text-[#A0A0A0] text-xs leading-relaxed mt-auto">
                        {member.bio}
                      </p>
                    </>
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
            className="w-10 h-10 flex items-center justify-center rounded-full border border-white/20 text-white hover:bg-[#F7931A] hover:border-[#F7931A] transition-all disabled:opacity-30 cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={scrollNext}
            disabled={!canScrollNext}
            className="w-10 h-10 flex items-center justify-center rounded-full border border-[#F7931A] bg-[#F7931A] text-white hover:bg-[#FFA733] hover:border-[#FFA733] hover:shadow-lg hover:shadow-[#F7931A]/30 transition-all disabled:opacity-30 cursor-pointer"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
});
