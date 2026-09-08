'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { expeditions } from '@/data/expeditions';
import type { Expedition, ExpeditionRegion } from '@/types/expedition';

const REGION_PILLS: { id: RegionFilter; label: string }[] = [
  { id: 'all', label: 'Все регионы' },
  { id: 'africa', label: 'Африка' },
  { id: 'asia', label: 'Азия' },
  { id: 'latam', label: 'Латинская Америка' },
  { id: 'russia', label: 'Россия' },
];

/* Фирменная круглая печать — тот же стандарт, что на главной и About */
function DirectorySeal() {
  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="directory-seal__svg"
      aria-hidden="true"
    >
      <defs>
        <path
          id="directory-seal-circle"
          d="M 100,100 m -74,0 a 74,74 0 1,1 148,0 a 74,74 0 1,1 -148,0"
        />
      </defs>
      <circle
        cx="100"
        cy="100"
        r="91"
        stroke="rgba(26,26,26,.55)"
        strokeWidth="1"
        fill="none"
      />
      <text
        fill="rgba(26,26,26,.55)"
        fontSize="10"
        letterSpacing="1.8"
        style={{ fontFamily: 'var(--font-sans), sans-serif' }}
      >
        <textPath href="#directory-seal-circle" startOffset="0%">
          FORBES FEXPERIENCE · FORBES FEXPERIENCE · FORBES FEXPERIENCE ·
        </textPath>
      </text>
      <text
        x="100"
        y="122"
        textAnchor="middle"
        fontSize="64"
        fontWeight="700"
        fill="var(--color-brand-600)"
        style={{ fontFamily: 'var(--font-display), serif' }}
      >
        F
      </text>
    </svg>
  );
}

const REGION_RU: Record<ExpeditionRegion, string> = {
  africa: 'Африка',
  asia: 'Азия',
  latam: 'Латинская Америка',
  russia: 'Россия',
};

type RegionFilter = 'all' | ExpeditionRegion;

const MONTHS_GEN = [
  'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
  'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря',
];

/** Дата active-карточки из startDate/endDate: «15–21 ноября 2026» */
function formatRange(expedition: Expedition): string {
  if (!expedition.startDate || !expedition.endDate) return expedition.dates || '';
  const start = new Date(expedition.startDate);
  const end = new Date(expedition.endDate);
  if (
    start.getMonth() === end.getMonth() &&
    start.getFullYear() === end.getFullYear()
  ) {
    return `${start.getDate()}–${end.getDate()} ${MONTHS_GEN[start.getMonth()]} ${start.getFullYear()}`;
  }
  return `${start.getDate()} ${MONTHS_GEN[start.getMonth()]} – ${end.getDate()} ${MONTHS_GEN[end.getMonth()]} ${end.getFullYear()}`;
}

export function ExpeditionsDirectory() {
  useScrollReveal();
  const [regionFilter, setRegionFilter] = useState<RegionFilter>('all');

  // Донаблюдение карточек после каждой смены фильтра: перерисованные
  // узлы обязаны попасть под IntersectionObserver заново
  useEffect(() => {
    const targets = Array.from(
      document.querySelectorAll('.directory-grid .fade-up:not(.visible)'),
    );
    if (targets.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '-60px 0px' },
    );
    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [regionFilter]);

  const filtered = useMemo(() => {
    return expeditions.filter((e) => {
      return regionFilter === 'all' || e.region === regionFilter;
    });
  }, [regionFilter]);

  // Единая сетка: active по дате → upcoming порядком данных; completed вне сетки
  const active = filtered
    .filter((e) => e.status === 'active')
    .sort((a, b) => (a.startDate ?? '').localeCompare(b.startDate ?? ''));
  const upcoming = filtered.filter((e) => e.status === 'upcoming');
  const cards = [...active, ...upcoming];

  return (
    <div className="directory">
      {/* 1. HERO — текст слева, карта слоем до края окна (как скетч на About) */}
      <section className="directory-hero">
        <div className="directory-hero__bgpaint fade-up delay-2" aria-hidden="true">
          <Image
            src="/maps/cartaDirectoriaExpeditions.webp"
            alt=""
            fill
            priority
            quality={90}
            sizes="70vw"
            className="directory-map__image"
          />
        </div>
        <div className="directory-hero__grid">
          <div className="directory-hero__content">
            <nav className="directory-breadcrumbs fade-up" aria-label="Хлебные крошки">
              <Link href="/">Главная</Link>
              {' / '}
              <span aria-current="page">Директория экспедиций</span>
            </nav>
            <p className="directory-eyebrow fade-up delay-1">Направления</p>
            <h1 className="directory-title fade-up delay-1">
              <span className="block">Бизнес-экспедиции</span>
              <span className="block">с Forbes</span>
            </h1>
            <p className="directory-subtitle fade-up delay-2">
              Эксклюзивные программы бизнес-экспедиций FExperience разрабатываются с учетом специфики каждого региона.
            </p>
          </div>
        </div>
        <div className="directory-seal">
          <DirectorySeal />
        </div>
      </section>

      {/* 3. ФИЛЬТР РЕГИОНОВ — pills под Hero */}
      <section className="directory-filter" aria-label="Фильтр по региону">
        <div className="directory-filter__row">
          {REGION_PILLS.map((pill) => (
            <button
              key={pill.id}
              type="button"
              className={`filter-pill${regionFilter === pill.id ? ' active' : ''}`}
              onClick={() => setRegionFilter(pill.id)}
            >
              {pill.label}
            </button>
          ))}
        </div>
      </section>

      {/* 5. СТАТУС + ЕДИНАЯ СЕТКА */}
      <section className="directory-catalog" aria-label="Экспедиции">
        <div className="container">
          {active.length > 0 && (
            <div className="directory-status">
              <span className="directory-status__title">Активные</span>
              <span className="directory-status__count">
                {String(active.length).padStart(2, '0')} — сейчас
              </span>
            </div>
          )}

          <div className="directory-grid">
            {cards.map((expedition, index) => {
              const isActive = expedition.status === 'active';
              return (
                <Link
                  key={expedition.slug}
                  href={`/expeditions/${expedition.slug}`}
                  className={`exp-card fade-up delay-${(index % 6) + 1}`}
                >
                  <Image
                    src={expedition.image}
                    alt={expedition.title}
                    fill
                    sizes="(min-width: 1025px) 33vw, (min-width: 641px) 50vw, 100vw"
                    className="exp-card__img"
                  />
                  <div className="exp-card__overlay" aria-hidden="true" />
                  {isActive && (
                    <span className="exp-card__badge">Активна</span>
                  )}
                  <div className="exp-card__content">
                    {expedition.region && (
                      <p className="exp-card__region">
                        {REGION_RU[expedition.region]}
                      </p>
                    )}
                    <h3 className="exp-card__name">{expedition.country}</h3>
                    <div className="exp-card__foot">
                      {isActive ? (
                        <span className="exp-card__date">
                          {formatRange(expedition)}
                        </span>
                      ) : (
                        <span className="exp-card__date exp-card__date--soon">
                          Скоро
                        </span>
                      )}
                      <span className="exp-card__arrow" aria-hidden="true">
                        <ArrowUpRight size={18} />
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* 10. Финальная editorial-строка */}
      <section className="dir-outro">
        <div className="container">
          <p className="dir-outro__phrase">
            Мы не собираем коллекцию стран.
            <br />
            Мы выбираем рынки, где есть что понять.
          </p>
          <Link href="/expeditions" className="dir-outro__link">
            Все экспедиции <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>
    </div>
  );
}

