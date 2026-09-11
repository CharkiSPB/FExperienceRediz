'use client';

import Image from 'next/image';
import Link from 'next/link';
import {
  CircleCheckBig,
} from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { speakers } from '@/data/speakers';

/* Круглая полупрозрачная печать — тот же стандарт, что на главной */
function AboutSeal() {
  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="about-hero__seal-svg"
      aria-hidden="true"
    >
      <defs>
        <path
          id="about-seal-circle"
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
        <textPath href="#about-seal-circle" startOffset="0%">
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

/* Слоты иконок: вставь свой SVG вместо <MissionIconPlaceholder>
   в блоке полосы ниже (ищи комментарий ВСТАВЬ SVG). */
const missionColumns = [
  {
    slot: 'mission' as const,
    title: 'Наша миссия',
    desc: 'Помогать предпринимателям принимать смелые решения и находить возможности там, где другие их не видят.',
  },
  {
    slot: 'audience' as const,
    title: 'Для кого',
    desc: 'Для собственников бизнеса, инвесторов и топ-менеджеров, ориентированных на рост и новые рынки.',
  },
  {
    slot: 'approach' as const,
    title: 'Наш подход',
    desc: 'Экспедиционный формат, локальная экспертиза и глубокое погружение в деловую среду каждого региона.',
  },
  {
    slot: 'values' as const,
    title: 'Наши ценности',
    desc: 'Экспертность, открытость, партнёрство и результат, который остаётся с вами надолго.',
  },
];

/* LinkedIn-круг: бренд-иконок в lucide-react v1 нет, поэтому инлайн-SVG.
   Рендерится только при наличии ссылки в данных (сейчас ссылок нет). */
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

/* Checklist методологии: 6 пунктов, тексты — посимвольно из спеки */
const methodChecklist = [
  'Правовая и регуляторная проверка',
  'Анализ рыночной и отраслевой среды',
  'Финансовый и налоговый анализ',
  'Оценка операционных и логистических рисков',
  'Проверка партнёров и ключевых контрагентов',
  'Культурные и репутационные факторы',
];

/* Тёмная полоса «Ключевое отличие»: 9 пунктов, тексты — посимвольно из спеки */
const ICONS_ABOUT = '/images/icons/about';
const diffColumns: { iconSrc: string | null; title: string; desc: string }[] = [
  { iconSrc: `${ICONS_ABOUT}/01_Security_in_the_country.svg`, title: 'Безопасность в стране', desc: 'Проверенные партнёры и сопровождение на всех этапах.' },
  { iconSrc: `${ICONS_ABOUT}/02_Business_climate.svg`, title: 'Деловой климат', desc: 'Доступ к ключевым игрокам и понимание локальной повестки.' },
  { iconSrc: `${ICONS_ABOUT}/03_Regulatory_environment.svg`, title: 'Регуляторная среда', desc: 'Актуальная информация о правилах и особенностях ведения бизнеса.' },
  { iconSrc: `${ICONS_ABOUT}/04_Logistics_specifics.svg`, title: 'Особенности логистики', desc: 'Продуманная логистика и комфорт в каждой детали поездки.' },
  { iconSrc: `${ICONS_ABOUT}/05_A_real_business_need.svg`, title: 'Реальный запрос бизнеса', desc: 'Программа формируется под ваши цели и задачи.' },
  { iconSrc: `${ICONS_ABOUT}/06_Cultural_barriers.svg`, title: 'Культурные барьеры', desc: 'Понимание культурного контекста и тонкостей делового диалога.' },
  { iconSrc: `${ICONS_ABOUT}/07_Financial_infrastructure.svg`, title: 'Финансовая инфраструктура', desc: 'Навигация по финансовой системе и возможностям для бизнеса.' },
  { iconSrc: `${ICONS_ABOUT}/08_Digitalization_of_the_economy.svg`, title: 'Цифровизация экономики', desc: 'Анализируем цифровые тренды и точки роста в регионе.' },
  { iconSrc: `${ICONS_ABOUT}/09_Market_entry_cost.svg`, title: 'Стоимость выхода на рынок', desc: 'Прозрачный расчёт затрат на вход в новый рынок.' },
];

const MISSION_ICONS: Record<string, { src: string; alt: string }> = {
  mission: { src: '/images/icons/about/01_Our_mission.svg', alt: 'Наша миссия' },
  audience: { src: '/images/icons/about/02_For_whom.svg', alt: 'Для кого' },
  approach: { src: '/images/icons/about/03_Our_approach.svg', alt: 'Наш подход' },
  values: { src: '/images/icons/about/04_Our_values.svg', alt: 'Наши ценности' },
};

function MissionIconPlaceholder({ slot }: { slot: string }) {
  const icon = MISSION_ICONS[slot];
  if (!icon) return <span className="mission-icon" data-slot={slot} aria-hidden="true" />;
  return (
    <Image
      src={icon.src}
      alt=""
      width={40}
      height={40}
      className={`mission-icon mission-icon--img mission-icon--${slot}`}
      aria-hidden="true"
    />
  );
}

const forbesTeam = speakers.filter((speaker) => speaker.isForbes);

export function AboutContent() {
  useScrollReveal();

  return (
    <main className="about-page">
      {/* Первый экран: слева чистый фон + текст, справа скетч до края окна */}
      <section className="about-hero">
        <div className="about-hero__bgpaint" aria-hidden="true">
          <Image
            src="/images/about/FonHeroAbout.webp"
            alt=""
            fill
            priority
            sizes="70vw"
            className="about-hero__sketch"
          />
        </div>
        <div className="about-hero__grid">
          <div className="about-hero__content">
            <nav className="about-breadcrumbs fade-up" aria-label="Хлебные крошки">
              <Link href="/">Главная</Link>
              {' / '}
              <span aria-current="page">О нас</span>
            </nav>
            <h1 className="about-hero__title fade-up delay-1">О нас</h1>
            <p className="about-hero__statement fade-up delay-2">
              <span className="accent">FExperience</span> — новый проект команды Forbes Russia
              для предпринимателей и лидеров, которые создают будущее.
            </p>
            <p className="about-hero__text fade-up delay-3">
              Мы объединяем бизнес, знания и новые географии, чтобы вы могли
              увидеть мир шире, найти сильных партнёров и принять решения,
              которые меняют ваш бизнес.
            </p>
          </div>
        </div>
        <div className="about-hero__seal">
          <AboutSeal />
        </div>
      </section>

      {/* Полоса: миссия / для кого / подход / ценности */}
      <section className="about-mission" aria-label="О подходе FExperience">
        <div className="about-mission__grid">
          {missionColumns.map((col, index) => (
            <div
              key={col.title}
              className={`about-mission__col fade-up delay-${index + 1}`}
            >
              <div className="mission-head">
                <MissionIconPlaceholder slot={col.slot} />
                <h2 className="mission-title">{col.title}</h2>
              </div>
              <p className="mission-desc">{col.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Тёмная полоса: ключевое отличие FExperience */}
      <section className="about-diff" aria-label="Ключевое отличие FExperience">
        <div className="about-diff__head fade-up">
          <span className="eyebrow-dash" aria-hidden="true" />
          <p className="about-diff__eyebrow">Нас выбирают за</p>
          <h2 className="about-diff__title">
            Ключевое отличие <span className="accent">F</span>Experience
          </h2>
        </div>
        <div className="about-diff__grid">
          {diffColumns.map((col, index) => (
            <div
              key={col.title}
              className={`about-diff__col fade-up delay-${(index % 6) + 1}`}
            >
              {col.iconSrc ? (
                <Image
                  src={col.iconSrc}
                  alt=""
                  width={41}
                  height={41}
                  className="diff-icon diff-icon--img"
                  aria-hidden="true"
                />
              ) : (
                <span className="diff-icon diff-icon--empty" aria-hidden="true" />
              )}
              <h3 className="diff-title">{col.title}</h3>
              <p className="diff-desc">{col.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Наша методология: тезис → checklist → фото */}
      <section className="about-method" aria-labelledby="about-method-title">
        <div className="about-method__grid">
          <div className="fade-up">
            <span className="eyebrow-dash" aria-hidden="true" />
            <p className="method-eyebrow">Наша методология</p>
            <h2 className="method-title" id="about-method-title">
              Независимый <span className="accent">due diligence</span> — основа
              наших решений
            </h2>
            <p className="method-text">
              Собственный комплексный due diligence позволяет нам обеспечивать
              объективную оценку рисков и возможностей в каждом регионе.
            </p>
          </div>

          <ul className="method-checklist fade-up delay-2">
            {methodChecklist.map((item) => (
              <li key={item}>
                <CircleCheckBig size={20} strokeWidth={1.5} aria-hidden="true" />
                <p>{item}</p>
              </li>
            ))}
          </ul>

          <div className="method-photo fade-up delay-3">
            <Image
              src="/images/about/duiDiligensFoto.webp"
              alt="Due diligence FExperience — аналитическая сессия"
              width={880}
              height={660}
              loading="lazy"
              sizes="(max-width: 1024px) 100vw, 33vw"
            />
          </div>
        </div>
      </section>

      {/* Наши эксперты — деловой roster без слайдера (3→5 без правок) */}
      <section className="about-experts" aria-labelledby="about-experts-title">
        <div className="about-experts__container">
          <span className="eyebrow-dash fade-up" aria-hidden="true" />
          <p className="about-experts__eyebrow fade-up">Команда</p>
          <h2
            className="about-experts__title fade-up delay-1"
            id="about-experts-title"
          >
            Наши эксперты
          </h2>

          <div className="about-experts-grid fade-up delay-2">
            {forbesTeam.map((expert) => (
              <article key={expert.id} className="about-expert-card">
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
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
