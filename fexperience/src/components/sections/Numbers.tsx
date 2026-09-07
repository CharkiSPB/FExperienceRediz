'use client';
import { useState, useEffect, useRef, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { numbers, NumberCard, NumberRow } from '@/data/numbers';

function StatItem({ row, inView, onAnimationComplete }: { 
  row: NumberRow; 
  inView: boolean;
  onAnimationComplete: () => void;
}) {
  const [value, setValue] = useState(0);
  const hasAnimated = useRef(false);
  const hasNotified = useRef(false);
  const prefersReducedMotion = typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false;

  useEffect(() => {
    if (!inView) {
      hasNotified.current = false;
      return;
    }

    if (row.isTextOnly && !hasNotified.current) {
      hasNotified.current = true;
      onAnimationComplete();
    }
  }, [row.isTextOnly, inView, onAnimationComplete]);

  useEffect(() => {
    if (row.isTextOnly) return;

    if (!inView) {
      setValue(0);
      hasAnimated.current = false;
      hasNotified.current = false;
      return;
    }
    
    if (hasAnimated.current || prefersReducedMotion) {
      if (prefersReducedMotion && row.value) setValue(row.value);
      if (!hasNotified.current) {
        hasNotified.current = true;
        onAnimationComplete();
      }
      return; 
    }

    hasAnimated.current = true;
    const duration = 2000;
    const startTime = performance.now();
    
    const animate = (currentTime: number) => {
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      if (row.value) setValue(Math.round(row.value * ease));
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else if (!hasNotified.current) {
        hasNotified.current = true;
        onAnimationComplete();
      }
    };
    requestAnimationFrame(animate);
  }, [inView, row, prefersReducedMotion, onAnimationComplete]);

  if (row.isTextOnly && row.textOnlyContent) {
    return (
      <div className="flex flex-col items-center justify-center min-w-[140px]">
          <span className="text-[14px] md:text-[36px] font-bold text-[#FF8800] uppercase leading-none mb-0 md:mb-1 mt-2.5 md:mt-6">
          {row.textOnlyContent}
        </span>
        {row.textLine1 && (
          <span className="text-[#000004] text-[10px] md:text-sm mt-0 md:mt-1 text-center font-bold">
            {row.textLine1}
          </span>
        )}
        {row.textLine2 && (
          <span className="text-[#000004] text-[10px] md:text-sm text-center font-bold">
            {row.textLine2}
          </span>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-w-[100px]">
      <div className="flex items-baseline">
        {row.prefix && (
          <span className="text-[20px] md:text-[48px] font-bold font-serif text-[#FF8800]">
            {row.prefix}
          </span>
        )}
        <span className="text-[20px] md:text-[56px] font-bold font-serif text-[#FF8800] tabular-nums">
          {value}
        </span>
        
        {row.suffix && (
          <span className="text-[20px] md:text-[48px] font-bold font-serif text-[#FF8800]">
            {row.suffix}
          </span>
        )}
        
        {row.suffixLines && (
          <div className="flex flex-col ml-1 leading-none -translate-y-[10px] md:-translate-y-[17px]">
            {row.suffixLines.map((line, i) => (
              <span key={`suffix-${i}`} className="text-[10px] md:text-[18px] font-bold text-[#FF8800] uppercase">
                {line}
              </span>
            ))}
          </div>
        )}
      </div>
      
      {(row.textLine1 || row.textLine2) && (
        <div className="flex flex-col -mt-2 text-center leading-tight font-bold max-w-[200px]">
          {row.textLine1 && (
            <span className="text-[#000004] text-[10px] md:text-sm">
              {row.textLine1}
            </span>
          )}
          {row.textLine2 && (
            <span className="text-[#000004] text-[10px] md:text-sm">
              {row.textLine2}
            </span>
          )}
        </div>
      )}
    </div>
  );
}

function SlideCard({ card, inView, onAnimationComplete }: { 
  card: NumberCard; 
  inView: boolean;
  onAnimationComplete: () => void;
}) {
  const completedRef = useRef<Set<number>>(new Set());

  const handleItemComplete = useCallback((index: number) => {
    completedRef.current.add(index);
    if (completedRef.current.size >= card.rows.length) {
      onAnimationComplete();
    }
  }, [card.rows.length, onAnimationComplete]);

  useEffect(() => {
    if (!inView) {
      completedRef.current.clear();
    }
  }, [inView]);

  return (
    <div className="flex items-center justify-between w-full h-full px-2 md:px-16">
      <h3 className="text-[12px] md:text-[32px] font-bold text-[#000004] uppercase tracking-wide whitespace-nowrap">
        {card.title}
      </h3>
      <div className="flex items-center gap-1 md:gap-8">
        {card.rows.map((row, index) => (
          <div key={`row-${index}`} className="flex items-center">
            <StatItem 
              row={row} 
              inView={inView} 
              onAnimationComplete={() => handleItemComplete(index)} 
            />
            {index < card.rows.length - 1 && (
              <div 
                key={`divider-${index}`} 
                className="w-[2px] h-[40px] md:h-[100px] bg-[#000004] transform rotate-[15deg] flex-shrink-0 opacity-80 mx-0.2 md:mx-8" 
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export function Numbers() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true, 
    skipSnaps: false, 
    dragFree: false,
  });
  
  const [activeIndex, setActiveIndex] = useState(0);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!emblaApi) return;
    autoPlayRef.current = setTimeout(() => {
      emblaApi.scrollNext();
    }, 5000);

    return () => {
      if (autoPlayRef.current) {
        clearTimeout(autoPlayRef.current);
      }
    };
  }, [emblaApi, activeIndex]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => {
      setActiveIndex(emblaApi.selectedScrollSnap());
      if (autoPlayRef.current) {
        clearTimeout(autoPlayRef.current);
        autoPlayRef.current = setTimeout(() => {
          emblaApi.scrollNext();
        }, 5000);
      }
    };
    emblaApi.on('select', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
      if (autoPlayRef.current) clearTimeout(autoPlayRef.current);
    };
  }, [emblaApi]);

  const scrollPrev = useCallback(() => {
    emblaApi?.scrollPrev();
    if (autoPlayRef.current) {
      clearTimeout(autoPlayRef.current);
      autoPlayRef.current = setTimeout(() => emblaApi?.scrollNext(), 5000);
    }
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    emblaApi?.scrollNext();
    if (autoPlayRef.current) {
      clearTimeout(autoPlayRef.current);
      autoPlayRef.current = setTimeout(() => emblaApi?.scrollNext(), 5000);
    }
  }, [emblaApi]);

  return (
    <section className="relative w-full max-w-[1124px] mx-auto h-[170px] md:h-[176px] overflow-visible pb-12 mt-7 md:mt-9">
      {/* 🔹 Слайдер с исправленным наложением */}
      <div className="h-full mx-2 md:mx-12 overflow-hidden rounded-[28px]" ref={emblaRef}>
        <div className="flex h-full">
          {numbers.map((card, index) => (
            <div 
              key={card.id} 
              className="embla__slide flex-[0_0_100%] min-w-0 h-full relative overflow-hidden rounded-[28px]"
              style={{ backfaceVisibility: 'hidden' }}
            >
              <div className="absolute inset-0 bg-cover bg-center opacity-90" style={{ backgroundImage: `url(/images/sliderNumbers/slider-${card.id}.webp)` }} />
              {/* <div className="absolute inset-0 bg-white/90" /> */}
              <div className="relative z-10 h-full flex items-center">
                <SlideCard 
                  card={card} 
                  inView={activeIndex === index}
                  onAnimationComplete={() => {}} 
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 🔹 Кнопки и точки внизу */}
      <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-4">
        {/* Кнопка влево */}
        <button 
          onClick={scrollPrev} 
          className="p-2 bg-[#1A1A1A]/60 backdrop-blur-md border border-white/10 rounded-full text-white hover:bg-[#F7931A] transition-all cursor-pointer"
          aria-label="Предыдущий слайд"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Точки пагинации */}
        <div className="flex gap-2">
          {numbers.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                emblaApi?.scrollTo(index);
                if (autoPlayRef.current) {
                  clearTimeout(autoPlayRef.current);
                  autoPlayRef.current = setTimeout(() => emblaApi?.scrollNext(), 5000);
                }
              }}
              className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer ${
                index === activeIndex ? 'bg-[#F7931A] scale-125' : 'bg-[#0D0805]/30'
              }`}
              aria-label={`Перейти к слайду ${index + 1}`}
            />
          ))}
        </div>

        {/* Кнопка вправо */}
        <button 
          onClick={scrollNext} 
          className="p-2 bg-[#1A1A1A]/60 backdrop-blur-md border border-white/10 rounded-full text-white hover:bg-[#F7931A] transition-all cursor-pointer"
          aria-label="Следующий слайд"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </section>
  );
}