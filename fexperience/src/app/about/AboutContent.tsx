'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { teamMembers } from '@/data/team';
import { dueDiligenceItems } from '@/data/dueDiligence';

const programPhotos = [
  '/images/about/photo1.jpg',
  '/images/about/photo2.jpg',
  '/images/about/photo3.webp',
  '/images/about/photo4.webp',
];

export function AboutContent() {
  useScrollReveal();
  const [activeMember, setActiveMember] = useState(0);
  const [activeDue, setActiveDue] = useState(-1);

  return (
    <main className="about-page">
      {/* Первый экран — editorial, не corporate */}
      <section className="about-hero">
        <div className="about-hero__inner">
          <div className="about-eyebrow fade-up">О нас</div>
          <h1 className="about-hero__title fade-up delay-1">
            FExperience — новый проект команды Forbes Russia.
          </h1>
          <p className="about-hero__lead fade-up delay-2">
            Мы помогаем предпринимателям открывать новые горизонты на самых
            перспективных рынках.
          </p>
          <div className="about-hero__rule fade-up delay-3" aria-hidden="true" />
        </div>
      </section>

      {/* Editorial-манифест */}
      <section className="about-manifest" aria-labelledby="about-manifest-title">
        <div className="about-manifest__inner">
          <div className="about-manifest__line" aria-hidden="true" />

          <div className="about-manifest__content">
            <div className="about-manifest__label" id="about-manifest-title">
              Наша позиция
            </div>

            <h2 className="about-manifest__title">
              Мы не организуем туристические поездки. Мы проводим{' '}
              <span className="about-manifest__accent">бизнес-экспедиции</span>.
              Результат — ваше взвешенное стратегическое решение об экспансии.
            </h2>
          </div>
        </div>

        <div className="about-manifest__illustration" aria-hidden="true">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/about/about-manifest-editorial-sketch.webp" alt="" />
        </div>
      </section>

      {/* Деловая программа — editorial photo essay */}
      <section className="about-photoessay">
        <div className="about-container">
          <div className="about-photoessay__head">
            <div className="about-eyebrow fade-up">Деловая программа</div>
            <h2 className="about-h2 fade-up delay-1">
              Деловая программа и погружение в локальную культуру
            </h2>
          </div>

          <p className="about-photoessay__caption fade-up delay-2">
            Встречи с госструктурами, локальным бизнесом, отраслевыми экспертами
            и русскоязычными предпринимателями, уже работающими в регионе,
            помогают оценить потребности рынка во внешних инвестициях, установить
            деловые контакты и наметить взаимовыгодные партнерства. Не менее
            важно знакомство с традициями и понимание местной культуры — это
            основа для адекватного восприятия бизнес-среды и правил
            взаимодействия.
          </p>

          <div className="about-story fade-up delay-2">
            {/* Большое главное фото — якорь блока */}
            <figure>
              <div className="as-photo as-photo--main">
                <Image
                  src={programPhotos[0]}
                  alt="Деловая программа FExperience — бизнес-сессии"
                  fill
                  priority
                  sizes="(max-width: 900px) 100vw, 1280px"
                />
              </div>
              <figcaption className="as-caption">
                <span className="as-caption__num">01</span>
                <span className="as-caption__title">Бизнес-сессии</span>
                <span className="as-caption__desc">
                  Встречи с предпринимателями и локальным бизнесом
                </span>
              </figcaption>
            </figure>

            {/* Два следующих эпизода */}
            <div className="as-row">
              <figure>
                <div className="as-photo as-photo--small">
                  <Image
                    src={programPhotos[1]}
                    alt="Деловая программа FExperience — погружение"
                    fill
                    loading="lazy"
                    sizes="(max-width: 900px) 100vw, 50vw"
                  />
                </div>
                <figcaption className="as-caption">
                  <span className="as-caption__num">02</span>
                  <span className="as-caption__title">Погружение</span>
                  <span className="as-caption__desc">
                    Среда, в которой принимаются бизнес-решения
                  </span>
                </figcaption>
              </figure>

              <figure>
                <div className="as-photo as-photo--small">
                  <Image
                    src={programPhotos[2]}
                    alt="Деловая программа FExperience — локальная среда"
                    fill
                    loading="lazy"
                    sizes="(max-width: 900px) 100vw, 50vw"
                  />
                </div>
                <figcaption className="as-caption">
                  <span className="as-caption__num">03</span>
                  <span className="as-caption__title">Локальная среда</span>
                  <span className="as-caption__desc">
                    То, что невозможно понять из презентации
                  </span>
                </figcaption>
              </figure>
            </div>

            {/* Широкое завершающее фото */}
            <figure>
              <div className="as-photo as-photo--wide">
                <Image
                  src={programPhotos[3]}
                  alt="Деловая программа FExperience — культура"
                  fill
                  loading="lazy"
                  sizes="(max-width: 900px) 100vw, 1280px"
                />
              </div>
              <figcaption className="as-caption">
                <span className="as-caption__num">04</span>
                <span className="as-caption__title">Культура</span>
                <span className="as-caption__desc">
                  Контекст, который определяет рынок не меньше цифр
                </span>
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* Ключевое отличие FExperience — редакционная классификация */}
      <section className="about-due" aria-labelledby="about-due-title">
        <div className="about-container about-due__grid">
          <div className="about-due__intro">
            <div className="about-eyebrow fade-up">Due diligence</div>
            <h2 className="about-h2 fade-up delay-1" id="about-due-title">
              Ключевое отличие FExperience
            </h2>
            <p className="about-due__desc fade-up delay-2">
              Собственный независимый дью-дилидженс (due diligence). Наши
              эксперты проводят комплексную проверку инвестиционной
              привлекательности и потенциала выбранного региона.
            </p>
          </div>

          <ol className="due-list fade-up delay-2">
            {dueDiligenceItems.map((item, index) => (
              <li key={item.text}>
                <button
                  type="button"
                  className={`due-row ${activeDue === index ? 'is-active' : ''}`}
                  onClick={() => setActiveDue(index)}
                  onMouseEnter={() => setActiveDue(index)}
                  onFocus={() => setActiveDue(index)}
                  onBlur={() => setActiveDue(-1)}
                  onMouseLeave={() => setActiveDue(-1)}
                >
                  <span className="due-row__num">
                    {String(index + 1).padStart(2, '0')} / 09
                  </span>
                  <span className="due-row__marker" aria-hidden="true" />
                  <span className="due-row__body">
                    <span className="due-row__title">{item.text}</span>
                    <span className="due-row__hint" aria-hidden="true" />
                  </span>
                </button>
              </li>
            ))}
          </ol>
        </div>

        <div className="about-container">
          <p className="about-due__statement fade-up">
            Due diligence — основа нашей методологии.
          </p>
        </div>
      </section>

      {/* Команда — люди, которые ведут экспедицию */}
      <section className="about-team" aria-labelledby="about-team-title">
        <div className="about-container">
          <div className="about-team__head">
            <div className="about-eyebrow fade-up">Команда</div>
            <h2 className="about-h2 fade-up delay-1" id="about-team-title">
              Люди, которые ведут экспедицию
            </h2>
          </div>

          <div className="about-team__roster">
            <div className="about-team__photo fade-up delay-1">
              {teamMembers.map((member, index) => (
                <div
                  key={member.name}
                  className={`at-photo__slide ${
                    activeMember === index ? 'is-active' : ''
                  }`}
                >
                  <Image
                    src={member.photo}
                    alt={member.name}
                    fill
                    priority={index === 0}
                    sizes="(max-width: 900px) 100vw, 48vw"
                  />
                </div>
              ))}
              <div className="at-photo__badge">Forbes Russia</div>
            </div>

            <ol className="about-team__list fade-up delay-2">
              {teamMembers.map((member, index) => (
                <li key={member.name}>
                  <button
                    type="button"
                    className={`at-member ${
                      activeMember === index ? 'is-active' : ''
                    }`}
                    onClick={() => setActiveMember(index)}
                  >
                    <span className="at-member__name">{member.name}</span>
                    <span className="at-member__role">{member.description}</span>
                  </button>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>
    </main>
  );
}
