'use client';

import { useRef, useState, useCallback } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { TeamSlider, type TeamSliderHandle } from './TeamSlider';
import type { TeamMember } from '@/data/team';

type Props = {
  members: TeamMember[];
};

export function TeamSectionClient({ members }: Props) {
  const sliderRef = useRef<TeamSliderHandle>(null);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const handleScrollPrev = useCallback(() => {
    sliderRef.current?.scrollPrev();
  }, []);

  const handleScrollNext = useCallback(() => {
    sliderRef.current?.scrollNext();
  }, []);

  const handleNavChange = useCallback((canPrev: boolean, canNext: boolean) => {
    setCanScrollPrev(canPrev);
    setCanScrollNext(canNext);
  }, []);

  return (
    <div className="relative w-full">
      
      {/* Слой 1: Серый фон */}
      <div className="h-[470px] w-full relative -mt-37 z-0">
        <Image
          src="/images/expeditions/experts-gray-bg.webp"
          alt=""
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Слой 2: Оранжевый блок (ширина контейнера, подтянут вверх над серым) */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-170 md:-mt-180">
        
        {/* Оранжевый фон с закруглением */}
        <div className="relative overflow-hidden rounded-t-[44px]">
          <div className="relative w-full h-[401px]">
            <Image
              src="/images/expeditions/experts-orange-bg.jpg"
              alt=""
              fill
              className="object-cover"
              priority
            />
          </div>
          
          {/* Контент поверх оранжевого фона — поднят наверх */}
          <div className="relative z-20 px-4 sm:px-6 lg:px-8 pt-8 -mt-[400px] pb-16">
            {/* Заголовок + кнопки навигации справа */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#0D0805] uppercase tracking-wide">
                Команда проекта
              </h2>
              <div className="flex gap-3">
                <button
                  onClick={handleScrollPrev}
                  disabled={!canScrollPrev}
                  className="w-10 h-10 flex items-center justify-center rounded-full border border-black/20 text-black hover:bg-black hover:text-white transition-all disabled:opacity-30 cursor-pointer"
                  aria-label="Предыдущий"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={handleScrollNext}
                  disabled={!canScrollNext}
                  className="w-10 h-10 flex items-center justify-center rounded-full border border-black bg-black text-white hover:opacity-80 transition-all disabled:opacity-30 cursor-pointer"
                  aria-label="Вправо"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            <TeamSlider ref={sliderRef} members={members} hideNav onNavChange={handleNavChange} />
          </div>
        </div>
      </div>

    </div>
  );
}
