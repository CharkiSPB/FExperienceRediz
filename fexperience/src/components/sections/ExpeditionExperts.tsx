'use client';

import { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import type { Speaker } from '@/data/speakers';

function LinkedInIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function ExpertCard({ expert }: { expert: Speaker }) {
  return (
    <article className="about-expert-card">
      <div className="about-expert-card__photo">
        <Image
          src={expert.photo}
          alt={expert.photoAlt || expert.name}
          fill
          loading="lazy"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {expert.forbesBadge && (
          <span className="about-forbes-badge">{expert.forbesBadge}</span>
        )}
      </div>
      <div className="about-expert-card__panel">
        <p className="about-expert-meta">
          {expert.forbesLabel || expert.company}
        </p>
        <h3 className="about-expert-name">{expert.name}</h3>
        <p className="about-expert-role">{expert.role}</p>
        {expert.linkedin && (
          <a
            href={expert.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${expert.name} — LinkedIn`}
            className="about-expert-linkedin"
          >
            <LinkedInIcon />
          </a>
        )}
      </div>
    </article>
  );
}

type ExpeditionExpertsProps = {
  externalExperts: Speaker[];
  forbesTeam: Speaker[];
};

export function ExpeditionExperts({ externalExperts, forbesTeam }: ExpeditionExpertsProps) {
  useScrollReveal();

  const [emblaRef, emblaApi] = useEmblaCarousel({ align: 'start', skipSnaps: false });
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanPrev(emblaApi.canScrollPrev());
    setCanNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
    };
  }, [emblaApi, onSelect]);

  if (externalExperts.length === 0 && forbesTeam.length === 0) return null;

  return (
    <section className="exp-experts" aria-label="Эксперты экспедиции">
      <div className="exp-experts__container">
        {externalExperts.length > 0 && (
          <>
            <div className="exp-experts__head fade-up">
              <h2 className="exp-experts__title">Эксперты экспедиции</h2>
              <div className="exp-experts__controls">
                <button
                  type="button"
                  onClick={scrollPrev}
                  disabled={!canPrev}
                  className="exp-experts__btn"
                  aria-label="Предыдущие эксперты"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={scrollNext}
                  disabled={!canNext}
                  className="exp-experts__btn"
                  aria-label="Следующие эксперты"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="exp-experts__viewport fade-up delay-1" ref={emblaRef}>
              <div className="exp-experts__track">
                {externalExperts.map((expert) => (
                  <div key={expert.id} className="exp-experts__slide">
                    <ExpertCard expert={expert} />
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {forbesTeam.length > 0 && (
          <div className="exp-experts__forbes fade-up">
            <p className="exp-experts__forbes-label" aria-label="Команда Forbes Russia">
              Команда Forbes Russia
            </p>
            <div className="about-experts-grid">
              {forbesTeam.map((member) => (
                <ExpertCard key={member.id} expert={member} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
