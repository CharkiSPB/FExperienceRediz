'use client';
import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';

export type Speaker = {
  id: number;
  name: string;
  role: string;
  company: string;
  photo: string;
  photoAlt: string;
  bio: string;
  isTop: boolean;
  topic?: string;
  achievement?: string;
  expeditionSlugs?: string[]; // slug экспедиций (спикер может быть на нескольких)
  category?: 'business' | 'investment' | 'government' | 'africa' | 'other' | 'pravo';
  country?: string;
};

type SpeakersSliderProps = {
  speakers: Speaker[];
};

export function SpeakersSlider({ speakers }: SpeakersSliderProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  // Проверка видимости кнопок навигации
  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    const el = scrollRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.85;
    el.scrollBy({ left: direction === 'left' ? -amount : amount, behavior: 'smooth' });
  };

  if (!speakers.length) return null;

  return (
    <div className="relative">
      {/* 🔹 Кнопки навигации — правый верхний угол */}
      <div className="flex gap-2 mb-4 justify-end">
        <button
          onClick={() => scroll('left')}
          className={`p-2 rounded-full bg-[#110F0D]/90 border border-[#2A2A2A] text-white backdrop-blur-md transition-all duration-300 cursor-pointer ${
            canScrollLeft ? 'opacity-100' : 'opacity-30 pointer-events-none'
          }`}
          aria-label="Предыдущий спикер"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        
        <button
          onClick={() => scroll('right')}
          className={`p-2 rounded-full bg-[#110F0D]/90 border border-[#2A2A2A] text-white backdrop-blur-md transition-all duration-300 cursor-pointer ${
            canScrollRight ? 'opacity-100' : 'opacity-30 pointer-events-none'
          }`}
          aria-label="Следующий спикер"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* 🔹 Контейнер слайдера */}
      <div
        ref={scrollRef}
        onScroll={checkScroll}
        className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 px-1"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {speakers.map((speaker, index) => (
          <motion.div
            key={speaker.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.08, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="snap-center shrink-0 w-[280px] md:w-[320px] bg-[#110F0D] border border-[#2A2A2A] rounded-xl p-5 flex flex-col"
          >
            <div className="w-20 h-20 rounded-full overflow-hidden mb-4 bg-[#1A1A1A] flex-shrink-0 border-2 border-[#2A2A2A]">
              <Image 
                src={speaker.photo} 
                alt={speaker.photoAlt} 
                width={80}
                height={80}
                className="object-cover" 
                loading="lazy"
              />
            </div>
            <h4 className="text-lg font-medium text-white mb-1">{speaker.name}</h4>
            <p className="text-sm text-[#F7931A] font-medium mb-3">{speaker.role}</p>
            {speaker.company && (
              <p className="text-xs text-[#666666] mb-3">{speaker.company}</p>
            )}
            <p className="text-sm text-[#A0A0A0] leading-relaxed flex-1">
              {speaker.achievement || speaker.bio || 'Эксперт экспедиции'}
            </p>
            {speaker.category && (
              <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-[#2A2A2A] text-[#A0A0A0] mt-3 w-fit">
                {speaker.category}
              </span>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}