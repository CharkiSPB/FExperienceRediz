'use client';

import { Fragment, useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { expeditions } from '@/data/expeditions';
import { useExpedition } from '@/components/providers/ExpeditionContext';

const MONTHS_GEN = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
const MONTHS_NOM = ['январь', 'февраль', 'март', 'апрель', 'май', 'июнь', 'июль', 'август', 'сентябрь', 'октябрь', 'ноябрь', 'декабрь'];

// Дата активной экспедиции (раздел 2.1): «15-21 ноября 2026», «сентябрь 2026»
function formatExpeditionDate(start?: string, end?: string): string {
  if (!start) return '';
  const s = new Date(`${start}T00:00:00Z`);
  const e = end ? new Date(`${end}T00:00:00Z`) : s;
  const sameMonth = s.getUTCMonth() === e.getUTCMonth() && s.getUTCFullYear() === e.getUTCFullYear();
  const lastDay = new Date(Date.UTC(s.getUTCFullYear(), s.getUTCMonth() + 1, 0)).getUTCDate();
  const isFullMonth = sameMonth && s.getUTCDate() === 1 && e.getUTCDate() === lastDay;
  if (isFullMonth) {
    return `${MONTHS_NOM[s.getUTCMonth()]} ${s.getUTCFullYear()}`;
  }
  if (sameMonth) {
    return `${s.getUTCDate()}-${e.getUTCDate()} ${MONTHS_GEN[s.getUTCMonth()]} ${s.getUTCFullYear()}`;
  }
  return `${s.getUTCDate()} ${MONTHS_GEN[s.getUTCMonth()]} — ${e.getUTCDate()} ${MONTHS_GEN[e.getUTCMonth()]} ${e.getUTCFullYear()}`;
}

// Порядок слайдов задан разделом 10.2 (Индия → ЮАР → Вьетнам) — сортировка по startDate
const HERO_EXPEDITIONS = expeditions
  .filter(e => e.status === 'active')
  .sort(
    (a, b) =>
      new Date(a.startDate ?? '1970-01-01').getTime() -
      new Date(b.startDate ?? '1970-01-01').getTime()
  );

function HeroSeal() {
  return (
    <div className="hero-seal" aria-hidden="true">
      <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="hero-seal__svg">
        {/* Тонкая внешняя окружность — основной контур печати */}
        <circle cx="100" cy="100" r="93.5" stroke="rgba(26,26,26,0.13)" strokeWidth="1.1" fill="none" />
        {/* Внутренняя тонкая окружность — лёгкая вторая линия */}
        <circle cx="100" cy="100" r="88" stroke="rgba(26,26,26,0.07)" strokeWidth="0.6" fill="none" />
        <defs>
          <path id="hero-seal-circle" d="M 100,100 m -76,0 a 76,76 0 1,1 152,0 a 76,76 0 1,1 -152,0" />
        </defs>
        <text fill="rgba(26,26,26,0.6)" fontSize="9.8" letterSpacing="3.2">
          <textPath href="#hero-seal-circle" startOffset="0%">
            FORBES FEXPERIENCE · FORBES FEXPERIENCE · FORBES FEXPERIENCE ·
          </textPath>
        </text>
        {/* Центр — буква F из фирменного логотипа (кроп viewBox по зоне F) */}
        <svg x="68" y="66" width="64" height="68" viewBox="0 0 320 344">
          <image
            href="/images/logo/F_logo.svg"
            x="0"
            y="0"
            width="1971"
            height="344"
          />
        </svg>
      </svg>
    </div>
  );
}

export function Hero() {
  const [activeIndex, setActiveIndex] = useState(0);
  const { setActiveExpeditionSlug } = useExpedition();

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: HERO_EXPEDITIONS.length > 1,
    skipSnaps: false,
    dragFree: false,
  });

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => {
      const idx = emblaApi.selectedScrollSnap();
      setActiveIndex(idx);
      setActiveExpeditionSlug(HERO_EXPEDITIONS[idx]?.slug ?? 'vietnam');
    };
    emblaApi.on('select', onSelect);
    return () => { emblaApi.off('select', onSelect); };
  }, [emblaApi, setActiveExpeditionSlug]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <section className="hero-slider" aria-label="Активные экспедиции">
      <div className="hero-slider__viewport h-full" ref={emblaRef}>
        <div className="hero-slider__container">
          {HERO_EXPEDITIONS.map((expedition) => {
            let titleLine1 = `${expedition.heroTitlePrimary} ${expedition.heroTitleOpen}`.replace(/\s+/g, ' ').trim().replace(/Бизнес\s*[—-]\s*/, 'Бизнес-');
            if (!titleLine1.includes('Forbes')) titleLine1 = `${titleLine1} с Forbes`;
            const titleLine2 = expedition.heroTitleCountry;
            return (
              <article key={expedition.slug} className="hero-slider__slide">
                <div className="hero-slide">
                  {/* Медиа: видео (desktop) / постер (mobile) */}
                  <div className="hero-slide__media">
                    <video
                      className="hero-slide__video"
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      poster={expedition.heroPoster}
                      aria-hidden="true"
                    >
                      <source src={expedition.heroVideo} type="video/webm" />
                    </video>
                    <Image
                      src={expedition.heroPoster ?? expedition.image}
                      alt={expedition.title}
                      fill
                      priority
                      sizes="100vw"
                      className="hero-slide__poster"
                    />
                  </div>

                  <div className="hero-slide__overlay" />

                  {/* 40% glass / 60% открытое видео */}
                  <div className="hero-slide__glass" />

                  {/* Компактный контент внутри левого стекла (по spec: pills → заголовок → CTA) */}
                  <div className="hero-compact">
                    {/* Три тезиса */}
                    <div className="hero-compact__pills" aria-label="Ключевые особенности экспедиции">
                      {expedition.heroPills?.slice(0, 3).map((pill, index) => (
                        <span key={pill} className="hero-compact__pill">
                          {pill}
                        </span>
                      ))}
                    </div>

                    <h1 className="hero-compact__title">
                      <span className="hero-compact__line1">{titleLine1}</span>
                      <span className="hero-compact__line2">{titleLine2}</span>
                      <time className="hero-compact__date">
                        {formatExpeditionDate(expedition.startDate, expedition.endDate)}
                      </time>
                    </h1>

                    <div className="hero-compact__cta">
                      <Link className="hero-slide__join btn-liquid btn-liquid--on-light" href={`/expeditions/${expedition.slug}#form`}>
                        <span className="btn-liquid-text">Стать участником</span>
                      </Link>
                      <Link className="hero-slide__details btn-outline" href={`/expeditions/${expedition.slug}`}>
                        <span>Подробнее</span>
                      </Link>
                    </div>
                  </div>

                  {/* Круглая печать на границе стекло | видео */}
                  <HeroSeal />
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {HERO_EXPEDITIONS.length > 1 && (
        <>
          <div className="hero-slider__controls">
            <button onClick={scrollPrev} className="hero-slider__arrow" aria-label="Предыдущий слайд">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button onClick={scrollNext} className="hero-slider__arrow" aria-label="Следующий слайд">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
          <div className="hero-slider__dots">
            {HERO_EXPEDITIONS.map((_, index) => (
              <button
                key={index}
                onClick={() => emblaApi?.scrollTo(index)}
                className={`hero-slider__dot ${index === activeIndex ? 'is-active' : ''}`}
                aria-label={`Перейти к слайду ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}
