'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { expeditions } from '@/data/expeditions';
import { regions } from '@/data/regions';
import type { Expedition, ExpeditionRegion } from '@/types/expedition';

const REGION_META: Record<ExpeditionRegion, string> = {
  africa: 'Африка',
  asia: 'Азия',
  latam: 'LATAM',
  russia: 'Россия',
};

const STATUS_EDITORIAL = {
  active: 'АКТИВНА',
  upcoming: 'СКОРО',
  completed: 'ЗАВЕРШЕНО',
} as const;

type RegionFilter = 'all' | ExpeditionRegion;

function formatDates(dates: string) {
  return dates.replace(/-/g, '—');
}

export function ExpeditionsDirectory() {
  const [regionFilter, setRegionFilter] = useState<RegionFilter>('all');
  const [industryFilter, setIndustryFilter] = useState<string>('all');

  const industries = useMemo(() => {
    const set = new Set<string>();
    expeditions.forEach((e) => (e.industries ?? []).forEach((i) => set.add(i)));
    return Array.from(set);
  }, []);

  const filtered = useMemo(() => {
    return expeditions.filter((e) => {
      const byRegion = regionFilter === 'all' || e.region === regionFilter;
      const byIndustry = industryFilter === 'all' || (e.industries ?? []).includes(industryFilter);
      return byRegion && byIndustry;
    });
  }, [regionFilter, industryFilter]);

  const active = filtered.filter((e) => e.status === 'active');
  const upcoming = filtered.filter((e) => e.status === 'upcoming');
  const completed = filtered.filter((e) => e.status === 'completed');

  // Одна большая экспедиция + вторичные
  const featured = active.find((e) => e.slug === 'south-africa') ?? active[0];
  const secondaryActive = active.filter((e) => e.slug !== featured?.slug);

  return (
    <div className="directory">
      {/* 1. INTRO — без hero-image */}
      <section className="dir-intro">
        <div className="container">
          <span className="dir-label">Направления</span>
          <h1 className="dir-intro__title">Бизнес-экспедиции с Forbes</h1>
          <p className="dir-intro__sub">
            Эксклюзивные программы бизнес-экспедиций FExperience разрабатываются с учетом специфики каждого региона.
          </p>
        </div>
      </section>

      {/* 2. ГЕОГРАФИЯ — единая editorial-композиция */}
      <section className="dir-geo" aria-label="География">
        <div className="container">
          <div className="dir-geo__head">
            <span className="dir-label">География</span>
            <button
              type="button"
              className={`dir-geo__reset${regionFilter === 'all' ? ' is-idle' : ''}`}
              onClick={() => setRegionFilter('all')}
            >
              Все регионы
            </button>
          </div>

          <div className="dir-geo__grid">
            {regions.map((region) => {
              const isActive = regionFilter === region.id;
              return (
                <button
                  key={region.id}
                  type="button"
                  className={`geo-region geo-region--${region.id}${isActive ? ' is-active' : ''}`}
                  onClick={() => setRegionFilter(isActive ? 'all' : region.id)}
                >
                  <span className="geo-region__index">{region.index}</span>

                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={region.mapAsset}
                    alt=""
                    aria-hidden="true"
                    className="geo-region__map"
                  />

                  {region.markets.map((market) => (
                    <span
                      key={market.id}
                      className={`geo-region__point${market.status === 'completed' ? ' geo-region__point--muted' : ''}`}
                      style={{ left: `${market.x}%`, top: `${market.y}%` }}
                    />
                  ))}

                  <span className="geo-region__name">{region.label}</span>
                  <span className="geo-region__count">{region.directionCount} направления</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. ФИЛЬТР РЕГИОНОВ — вторичный */}
      <section className="dir-regions" aria-label="Быстрый фильтр по региону">
        <div className="container">
          <div className="dir-regions__row">
            <button
              type="button"
              className={`dir-tab${regionFilter === 'all' ? ' is-active' : ''}`}
              onClick={() => setRegionFilter('all')}
            >
              Все регионы
            </button>
            {(Object.keys(REGION_META) as ExpeditionRegion[]).map((region) => (
              <button
                key={region}
                type="button"
                className={`dir-tab${regionFilter === region ? ' is-active' : ''}`}
                onClick={() => setRegionFilter(region)}
              >
                {REGION_META[region]}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 4. ФИЛЬТР ОТРАСЛЕЙ — editorial index */}
      <section className="dir-industry" aria-label="Фильтр по отрасли">
        <div className="container">
          <div className="dir-industry__scroll">
            <div className="dir-industry__row">
              <button
                type="button"
                className={`dir-index${industryFilter === 'all' ? ' is-active' : ''}`}
                onClick={() => setIndustryFilter('all')}
              >
                Все отрасли
              </button>
              {industries.map((industry) => (
                <button
                  key={industry}
                  type="button"
                  className={`dir-index${industryFilter === industry ? ' is-active' : ''}`}
                  onClick={() => setIndustryFilter(industry)}
                >
                  {industry}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. СЕЙЧАС — активные */}
      {active.length > 0 && (
        <section className="dir-now" aria-label="Активные экспедиции">
          <div className="container">
            <div className="dir-section-head">
              <span className="dir-section-head__label">Активные</span>
              <span className="dir-section-head__meta">
                {String(active.length).padStart(2, '0')} — сейчас
              </span>
            </div>

            {featured && <ExpeditionCard expedition={featured} featured />}

            {secondaryActive.length > 0 && (
              <div className="dir-now__secondary">
                {secondaryActive.map((expedition) => (
                  <ExpeditionCard key={expedition.slug} expedition={expedition} />
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* 6. СКОРО — редакционный список */}
      {upcoming.length > 0 && (
        <section className="dir-soon" aria-label="Будущие экспедиции">
          <div className="container">
            <div className="dir-section-head">
              <span className="dir-section-head__label">Скоро</span>
            </div>
            <div className="dir-soon__list">
              {upcoming.map((expedition) => (
                <EditorialRow key={expedition.slug} expedition={expedition} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 7. АРХИВ */}
      {completed.length > 0 && (
        <section className="dir-arch" aria-label="Завершённые экспедиции">
          <div className="container">
            <div className="dir-section-head">
              <span className="dir-section-head__label">Архив</span>
            </div>
            <div className="dir-arch__list">
              {completed.map((expedition) => (
                <ArchiveRow key={expedition.slug} expedition={expedition} />
              ))}
            </div>
          </div>
        </section>
      )}

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

function ExpeditionCard({
  expedition,
  featured = false,
}: {
  expedition: Expedition;
  featured?: boolean;
}) {
  return (
    <Link
      href={`/expeditions/${expedition.slug}`}
      className={`dir-card ${featured ? 'dir-card--featured' : ''}`}
    >
      <div className={`dir-card__media${featured ? ' dir-card__media--featured' : ''}`}>
        <Image
          src={expedition.image}
          alt={expedition.title}
          fill
          sizes={featured ? '(min-width: 768px) 100vw, 100vw' : '(min-width: 768px) 45vw, 100vw'}
          className="dir-card__image"
        />
      </div>
      <div className="dir-card__body">
        <span className="dir-card__status">{STATUS_EDITORIAL[expedition.status]}</span>
        <p className="dir-card__meta">
          {expedition.country}
          {expedition.dates ? ` · ${formatDates(expedition.dates)}` : ''}
        </p>
        <h3 className="dir-card__title">{expedition.title}</h3>
        <span className="dir-card__cta">
          Подробнее <span aria-hidden="true">→</span>
        </span>
      </div>
    </Link>
  );
}

function EditorialRow({ expedition }: { expedition: Expedition }) {
  return (
    <Link href={`/expeditions/${expedition.slug}`} className="dir-editorial">
      <div className="dir-editorial__thumb">
        <Image
          src={expedition.image}
          alt={expedition.title}
          fill
          sizes="(min-width: 768px) 160px, 120px"
          className="dir-editorial__image"
        />
      </div>
      <div className="dir-editorial__body">
        <span className="dir-editorial__status">{STATUS_EDITORIAL[expedition.status]}</span>
        <h3 className="dir-editorial__title">{expedition.title}</h3>
        <p className="dir-editorial__desc">{expedition.description}</p>
        <span className="dir-editorial__cta">
          Подробнее <span aria-hidden="true">→</span>
        </span>
      </div>
    </Link>
  );
}

function ArchiveRow({ expedition }: { expedition: Expedition }) {
  return (
    <article className="dir-archive">
      <div className="dir-archive__thumb">
        <Image
          src={expedition.image}
          alt={expedition.title}
          fill
          sizes="(min-width: 768px) 120px, 80px"
          className="dir-archive__image"
        />
      </div>
      <div className="dir-archive__body">
        <h3 className="dir-archive__title">{expedition.title}</h3>
        <p className="dir-archive__meta">
          {expedition.country}
          {expedition.dates ? ` · ${formatDates(expedition.dates)}` : ''}
        </p>
      </div>
      <span className="dir-archive__status">{STATUS_EDITORIAL[expedition.status]}</span>
    </article>
  );
}