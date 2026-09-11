'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, MapPin } from 'lucide-react';
import { useExpedition } from '@/components/providers/ExpeditionContext';
import { RequestModal } from '@/components/shared/RequestModal';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { DEFAULT_HERO_THESES } from '@/data/expeditions';
import type { Expedition } from '@/types/expedition';

/* Фирменная круглая печать — тот же стандарт (центр: F из логотипа) */
function ExpeditionSeal() {
  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="expedition-seal__svg"
      aria-hidden="true"
    >
      <defs>
        <path
          id="expedition-seal-circle"
          d="M 100,100 m -74,0 a 74,74 0 1,1 148,0 a 74,74 0 1,1 -148,0"
        />
      </defs>
      <circle
        cx="100"
        cy="100"
        r="91"
        stroke="rgba(26,26,26,.8)"
        strokeWidth="1"
        fill="none"
      />
      <text
        fill="rgba(26,26,26,.8)"
        fontSize="10"
        letterSpacing="1.8"
        style={{ fontFamily: 'var(--font-sans), sans-serif' }}
      >
        <textPath href="#expedition-seal-circle" startOffset="0%">
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
  );
}

type ExpeditionHeroProps = {
  expedition: Expedition;
  heroDate: string;
};

export function ExpeditionHero({ expedition, heroDate }: ExpeditionHeroProps) {
  useScrollReveal();
  const { setActiveExpeditionSlug } = useExpedition();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const isActive = expedition.status === 'active';
  const isUpcoming = expedition.status === 'upcoming';

  // ЗАМЕНИТЬ: временная заглушка hero-фона — фото ЮАР для всех экспедиций без своего скетча.
  // Когда будет своё фото: положить файл в /public/images/expeditions/
  // и прописать путь в поле heroSketch этой экспедиции в src/data/expeditions.ts
  const HERO_BG_FALLBACK = '/images/expeditions/south-africaC.webp';
  const sketchSrc = expedition.heroSketch || HERO_BG_FALLBACK;

  const openModal = () => {
    setActiveExpeditionSlug(expedition.slug);
    setIsModalOpen(true);
  };

  return (
    <section className="expedition-hero">
      <div className="expedition-hero__bgpaint fade-up delay-2" aria-hidden="true">
        <Image
          src={sketchSrc}
          alt=""
          fill
          priority
          quality={90}
          sizes="(max-width: 1024px) 100vw, 60vw"
          className="expedition-hero__sketch"
        />
        <div className="expedition-seal">
          <ExpeditionSeal />
        </div>
      </div>

      <div className="expedition-hero__grid">
        <div className="expedition-hero__content">
          <nav className="expedition-breadcrumbs fade-up" aria-label="Хлебные крошки">
            <Link href="/">Главная</Link>
            {' / '}
            <Link href="/expeditions">Экспедиции</Link>
            {' / '}
            <span aria-current="page">{expedition.country}</span>
          </nav>

          <h1 className="expedition-hero__title fade-up delay-1">
            {expedition.title}
          </h1>

          <div className="expedition-hero__meta fade-up delay-1">
            {heroDate && (
              <span className="expedition-hero__meta-item">
                <Calendar size={16} strokeWidth={1.5} aria-hidden="true" />
                {heroDate}
              </span>
            )}
            {expedition.city && (
              <span className="expedition-hero__meta-item">
                <MapPin size={16} strokeWidth={1.5} aria-hidden="true" />
                {expedition.city}
              </span>
            )}
          </div>

          {(expedition.heroTheses ?? DEFAULT_HERO_THESES).length > 0 ? (
            <ul className="expedition-hero__theses fade-up delay-2" aria-label="Ключевые преимущества экспедиции">
              {(expedition.heroTheses ?? DEFAULT_HERO_THESES).map((thesis) => (
                <li key={thesis.title} className="expedition-hero__thesis">
                  <span className="expedition-hero__thesis-title">{thesis.title}</span>
                  <span className="expedition-hero__thesis-sub">{thesis.sub}</span>
                </li>
              ))}
            </ul>
          ) : (
            expedition.shortDescription && (
              <p className="expedition-hero__desc fade-up delay-2">
                {expedition.shortDescription}
              </p>
            )
          )}

          {isUpcoming && (
            <p className="expedition-hero__lead fade-up delay-2">
              Вам интересна локация? Оставьте заявку — и эта точка может стать следующей на карте FExperience.
            </p>
          )}

          <div className="expedition-hero__cta fade-up delay-2">
            {isActive ? (
              <button type="button" onClick={openModal} className="btn-liquid">
                <span className="btn-liquid-text">Стать участником</span>
              </button>
            ) : isUpcoming ? (
              <button type="button" onClick={openModal} className="btn-liquid">
                <span className="btn-liquid-text">Оставить заявку</span>
              </button>
            ) : (
              <Link href="/expeditions" className="btn-text">
                Смотреть активные экспедиции <span aria-hidden="true">→</span>
              </Link>
            )}
          </div>
        </div>
      </div>

      <RequestModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        defaultExpeditionSlug={expedition.slug}
      />
    </section>
  );
}
