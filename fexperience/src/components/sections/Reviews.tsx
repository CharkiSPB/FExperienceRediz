'use client';
import { useState, useEffect, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { reviews } from '@/data/reviews';

export function Reviews() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'start',
  });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on('select', onSelect);
    onSelect();
  }, [emblaApi, onSelect]);

  const total = reviews.length;
  const counter = `${String(selectedIndex + 1).padStart(2, '0')} / ${String(total).padStart(2, '0')}`;
  const progress = ((selectedIndex + 1) / total) * 100;

  return (
    <section id="reviews" className="reviews-section px-6 py-20 md:px-16 md:py-32">
      <div className="mx-auto max-w-[1280px]">
        <header className="mb-12 flex items-center justify-between gap-6">
          <p className="font-sans text-[13px] font-semibold uppercase tracking-[.08em] text-brand-600">
            Отзывы участников
          </p>
          <div className="flex gap-3">
            <button
              onClick={scrollPrev}
              disabled={!emblaApi}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-border text-text-primary transition-colors hover:border-brand-600 hover:text-brand-600 disabled:opacity-30"
              aria-label="Предыдущий отзыв"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={scrollNext}
              disabled={!emblaApi}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-border text-text-primary transition-colors hover:border-brand-600 hover:text-brand-600 disabled:opacity-30"
              aria-label="Следующий отзыв"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </header>

        <div className="overflow-hidden" ref={emblaRef}>
          <div className="testimonials-track">
            {reviews.map((review) => (
              <article key={review.id} className="testimonial-card">
                <span className="testimonial-quote-mark" aria-hidden="true">
                  &ldquo;
                </span>
                <p className="testimonial-eyebrow">{review.expeditionLabel}</p>
                <blockquote className="testimonial-quote">{review.text}</blockquote>
                <footer className="testimonial-author">
                  <div className="testimonial-author-photo">
                    <Image
                      src={review.photo}
                      alt={review.photoAlt}
                      width={96}
                      height={96}
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-display text-base leading-tight text-text-primary">
                      {review.name}
                    </p>
                    <p className="mt-1 text-[13px] leading-snug text-text-secondary">
                      {review.company}
                    </p>
                  </div>
                </footer>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-8 flex items-center gap-5">
          <span className="font-sans text-[13px] font-semibold tabular-nums tracking-[.08em] text-text-primary">
            {counter}
          </span>
          <div className="relative h-px flex-1 overflow-hidden bg-border">
            <div
              className="absolute inset-y-0 left-0 bg-brand-600 transition-[width] duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
