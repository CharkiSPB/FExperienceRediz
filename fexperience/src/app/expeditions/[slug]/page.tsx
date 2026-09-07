import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { expeditions } from '@/data/expeditions';
import { programs } from '@/data/program';
import { config } from '@/data/config';
import { speakers } from '@/data/speakers';
import { regions } from '@/data/regions';
import { expeditionMapPoints } from '@/config/mapPoints';
import { expeditionEditorial } from '@/config/expeditionEditorial';
import { MapContinent } from '@/components/MapContinent';
import { ExpeditionDetailForm } from '@/components/shared/ExpeditionDetailForm';
import { CountdownTimer } from '@/components/shared/CountdownTimer';

type Props = {
  params: Promise<{ slug: string }>;
};

const MONTHS_GEN = [
  '', 'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
  'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря',
];

// Заголовки дней для программ, где в данных title пустой (sa-program)
const PROGRAM_DAY_TITLES: Record<string, Record<number, string>> = {
  'sa-program': {
    1: 'Ланзерак — открытие программы',
    2: 'Бизнес-сессия «Африка в фокусе»',
    3: 'Стелленбосский университет',
    4: 'Локальное предприятие и Кейптаун',
    5: 'Babylonstoren — «Говорят местные»',
    6: 'Мыс Доброй Надежды',
  },
};

function formatHeroDate(expedition: (typeof expeditions)[number]): string {
  if (expedition.startDate && expedition.endDate) {
    const start = new Date(`${expedition.startDate}T00:00:00`);
    const end = new Date(`${expedition.endDate}T00:00:00`);
    if (!Number.isNaN(start.getTime()) && !Number.isNaN(end.getTime())) {
      const month = MONTHS_GEN[start.getMonth() + 1];
      return `${start.getDate()}–${end.getDate()} ${month} ${start.getFullYear()}`;
    }
  }
  return expedition.dates || '';
}

function splitDescription(value: string) {
  return value.split('|').map(part => part.trim());
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  if (slug === 'new-delhi') notFound();
  const expedition = expeditions.find(e => e.slug === slug);

  if (!expedition) {
    return { title: 'Экспедиция не найдена | FExperience' };
  }

  return {
    title: `${expedition.title} | FExperience`,
    description: expedition.description || expedition.title,
    openGraph: {
      title: expedition.title,
      description: expedition.description || expedition.title,
      type: 'website',
      images: [{ url: expedition.image, width: 1200, height: 630, alt: expedition.title }],
    },
    alternates: { canonical: `${config.site.url}/expeditions/${slug}` },
  };
}

export default async function ExpeditionDetailPage({ params }: Props) {
  const { slug } = await params;
  if (slug === 'new-delhi') notFound();
  const expedition = expeditions.find(e => e.slug === slug);
  const program = programs[expedition?.programSlug || ''] || [];

  if (!expedition) {
    notFound();
  }

  const isCompleted = expedition.status === 'completed';
  const isUpcoming = expedition.status === 'upcoming';
  const isActive = expedition.status === 'active';
  const editorial = expeditionEditorial[slug];

  // Данные карты «свой континент»
  const region = regions.find(r => r.id === expedition.region);
  const mapData = expeditionMapPoints[slug];
  const neighborPoints = (region?.markets ?? [])
    .filter(m => m.id !== slug)
    .map(m => ({ x: m.x, y: m.y }));

  const expeditionSpeakers = speakers.filter(s =>
    s.expeditionSlugs?.includes(slug) || s.category === 'other'
  );
  const forbesTeam = expeditionSpeakers.filter(s => s.forbesBadge);
  const externalExperts = expeditionSpeakers.filter(s => !s.forbesBadge);

  // Похожие активные направления (для Скоро / Завершена)
  const related = expeditions
    .filter(e => e.status === 'active' && e.slug !== slug)
    .sort((a, b) => {
      const aSame = a.region === expedition.region ? 0 : 1;
      const bSame = b.region === expedition.region ? 0 : 1;
      return aSame - bSame;
    })
    .slice(0, 2);

  // Отзывы для шаблона «Завершена»
  const completedReviews = isCompleted
    ? (await import('@/data/reviews')).reviews.filter(r => r.expeditionLabel.includes('Марокко'))
    : [];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: expedition.title,
    description: expedition.description || expedition.title,
    url: `${config.site.url}/expeditions/${slug}`,
    image: `${config.site.url}${expedition.image}`,
    organizer: { '@type': 'Organization', name: 'FExperience', url: config.site.url },
    eventStatus: isCompleted
      ? 'https://schema.org/EventCancelled'
      : 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    location: { '@type': 'Place', name: expedition.country },
    offers: expedition.price
      ? {
          '@type': 'Offer',
          price: expedition.price,
          priceCurrency: 'RUB',
          availability:
            expedition.spots && expedition.spots > 0
              ? 'https://schema.org/InStock'
              : 'https://schema.org/LimitedAvailability',
        }
      : undefined,
  };

  const mapStatus = isCompleted ? 'завершена' : isUpcoming ? 'скоро' : 'активна';

  const heroDate = formatHeroDate(expedition);
  const heroPitch = editorial?.heroPitch || expedition.description || expedition.fullDescription || '';

  return (
    <article className="expedition-detail min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Главная', item: config.site.url },
              { '@type': 'ListItem', position: 2, name: 'Экспедиции', item: `${config.site.url}/expeditions` },
              { '@type': 'ListItem', position: 3, name: expedition.title, item: `${config.site.url}/expeditions/${slug}` },
            ],
          }),
        }}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* ══════════════ HERO — первый кадр экспедиции, 100svh, география внутри ══════════════ */}
      <section className="exp-hero">
        <Image
          src={expedition.image}
          alt={expedition.title}
          fill
          priority
          sizes="100vw"
          className="exp-hero__bg"
        />
        <div className="exp-hero__overlay" />
        <div className="exp-hero__content container">
          <div className="exp-hero__grid">
            <div className="exp-hero__left">
              <p className="exp-hero__eyebrow">Бизнес-экспедиция</p>

              <h1 className="exp-hero__title">{expedition.country}</h1>

              {heroDate && <p className="exp-hero__dates">{heroDate}</p>}

              {heroPitch && <p className="exp-hero__pitch">{heroPitch}</p>}

              <div className="exp-hero__cta">
                {isActive ? (
                  <>
                    <a href="#register" className="btn-liquid">
                      <span className="btn-liquid-text">Стать участником</span>
                    </a>
                    {expedition.spots && expedition.spots > 0 && (
                      <span className="exp-hero__spots">Осталось мест: {expedition.spots}</span>
                    )}
                  </>
                ) : isUpcoming ? (
                  <a href="#register" className="detail-hero__btn-outline">
                    Оставить заявку
                  </a>
                ) : (
                  <Link href="/expeditions" className="detail-hero__btn-outline">
                    Смотреть активные экспедиции
                  </Link>
                )}
              </div>
            </div>

            <div className="exp-hero__right">
              {mapData && region && (
                <MapContinent
                  continent={mapData.continent}
                  aspect={mapData.aspect}
                  activePoint={mapData.activePoint}
                  neighborPoints={neighborPoints}
                  programCities={mapData.programCities}
                  status={mapStatus}
                />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════ НАРРАТИВ — только «Активна» с редакционным контентом ══════════════ */}
      {isActive && editorial && (
        <>
          {/* КОНТЕКСТ РЫНКА */}
          <section className="exp-context">
            <div className="container">
              <div className="exp-context__grid">
                <div className="exp-context__intro">
                  <p className="dir-label">{editorial.context.eyebrow}</p>
                  <h2 className="exp-context__headline">{editorial.context.headline}</h2>
                  {editorial.context.paragraphs.map((paragraph, i) => (
                    <p key={i} className="exp-context__text">
                      {paragraph}
                    </p>
                  ))}
                  {editorial.context.fact && (
                    <div className="exp-context__fact">
                      <span className="exp-context__fact-value">{editorial.context.fact.value}</span>
                      <span className="exp-context__fact-label">{editorial.context.fact.label}</span>
                    </div>
                  )}
                </div>
                <div className="exp-context__photo">
                  <Image
                    src={editorial.context.photo}
                    alt={editorial.context.headline}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* МАРШРУТ */}
          <section className="exp-route">
            <div className="container">
              <div className="exp-route__grid">
                <div className="exp-route__intro">
                  <p className="dir-label">{editorial.route.eyebrow}</p>
                  <h2 className="exp-route__headline">{editorial.route.headline}</h2>
                  <p className="exp-route__text">{editorial.route.text}</p>
                </div>
                <ol className="exp-route__stops">
                  {editorial.route.stops.map((stop, i) => (
                    <li key={i} className="exp-route__stop">
                      <span className="exp-route__num">{stop.name}</span>
                      <div className="exp-route__body">
                        <h3 className="exp-route__city">{stop.city}</h3>
                        <p className="exp-route__desc">{stop.description}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </section>

          {/* ОПЫТ */}
          <section className="exp-experience">
            <div className="container">
              <div className="exp-experience__head">
                <p className="dir-label">{editorial.experience.eyebrow}</p>
                <h2 className="exp-experience__headline">{editorial.experience.headline}</h2>
                <p className="exp-experience__text">{editorial.experience.text}</p>
              </div>
              <div className="exp-experience__grid">
                {editorial.experience.shots.map((shot, i) => (
                  <figure key={i} className={`exp-experience__item exp-experience__item--${shot.variant}`}>
                    <Image
                      src={shot.src}
                      alt={shot.caption}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover"
                    />
                    <figcaption className="exp-experience__caption">{shot.caption}</figcaption>
                  </figure>
                ))}
              </div>
            </div>
          </section>

          {/* ПРОГРАММА — editorial-главы */}
          {program.length > 0 && (
            <section className="exp-program">
              <div className="container">
                <div className="exp-program__head">
                  <p className="dir-label">Программа</p>
                  <h2 className="exp-program__headline">Как построены дни</h2>
                </div>
                <div className="exp-program__chapters">
                  {program.map((day, i) => {
                    const title =
                      day.title ||
                      PROGRAM_DAY_TITLES[expedition.programSlug || '']?.[day.day] ||
                      `День ${day.day}`;
                    const layout = i % 4; // 0: image right · 1: image left · 2: full-width · 3: image left
                    return (
                      <article key={day.day} className={`exp-program__chapter exp-program__chapter--${layout}`}>
                        <div className="exp-program__text">
                          <span className="exp-program__num">{String(day.day).padStart(2, '0')}</span>
                          <h3 className="exp-program__title">{title}</h3>
                          <p className="exp-program__desc">
                            {splitDescription(day.description).map((part, j, arr) => (
                              <span key={j}>
                                {part}
                                {j < arr.length - 1 && <br />}
                              </span>
                            ))}
                          </p>
                        </div>
                        <figure className="exp-program__photo">
                          <Image
                            src={day.image}
                            alt={title}
                            fill
                            sizes="(max-width: 768px) 100vw, 50vw"
                            className="object-cover"
                          />
                        </figure>
                      </article>
                    );
                  })}
                </div>
              </div>
            </section>
          )}

          {/* ЛЮДИ — editorial-list */}
          {expeditionSpeakers.length > 0 && (
            <section className="exp-people">
              <div className="container">
                <div className="exp-people__head">
                  <p className="dir-label">Люди экспедиции</p>
                  <h2 className="exp-people__headline">С кем вы будете взаимодействовать</h2>
                </div>

                {externalExperts.length > 0 && (
                  <div className="exp-people__list">
                    {externalExperts.map(expert => (
                      <div key={expert.id} className="exp-person">
                        <div className="exp-person__photo">
                          <Image
                            src={expert.photo}
                            alt={expert.photoAlt}
                            width={96}
                            height={96}
                            className="object-cover"
                          />
                        </div>
                        <div className="exp-person__info">
                          <h3 className="exp-person__name">{expert.name}</h3>
                          <p className="exp-person__role">{expert.role}</p>
                          {expert.company && <p className="exp-person__org">{expert.company}</p>}
                        </div>
                        {expert.achievement && (
                          <p className="exp-person__why">{expert.achievement}</p>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {forbesTeam.length > 0 && (
                  <>
                    <div className="exp-people__divider">Команда Forbes Russia</div>
                    <div className="exp-people__list">
                      {forbesTeam.map(member => (
                        <div key={member.id} className="exp-person">
                          <div className="exp-person__photo">
                            <Image
                              src={member.photo}
                              alt={member.photoAlt}
                              width={96}
                              height={96}
                              className="object-cover"
                            />
                          </div>
                          <div className="exp-person__info">
                            <span className="forbes-badge">{member.forbesLabel}</span>
                            <h3 className="exp-person__name">{member.name}</h3>
                            <p className="exp-person__role">{member.role}</p>
                          </div>
                          {member.achievement && (
                            <p className="exp-person__why">{member.achievement}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </section>
          )}

          {/* РЕЗУЛЬТАТ */}
          <section className="exp-result">
            <div className="container">
              <div className="exp-result__head">
                <p className="dir-label">{editorial.result.eyebrow}</p>
                <h2 className="exp-result__headline">{editorial.result.headline}</h2>
              </div>

              <div className="exp-result__numbers">
                {editorial.result.numbers.map((number, i) => (
                  <div key={i} className="exp-result__number">
                    <span className="exp-result__value">{number.value}</span>
                    <span className="exp-result__label">{number.label}</span>
                  </div>
                ))}
              </div>

              <ul className="exp-result__statements">
                {editorial.result.statements.map((statement, i) => (
                  <li key={i} className="exp-result__statement">
                    {statement}
                  </li>
                ))}
              </ul>

              {expedition.includes && expedition.includes.length > 0 && (
                <div className="exp-result__included">
                  <p className="dir-label">В программе</p>
                  <ul className="exp-result__included-list">
                    {expedition.includes.map((item, i) => (
                      <li key={i} className="exp-result__included-item">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </section>

          {/* ТАЙМЕР — стеклянный объект на фотографии */}
          {expedition.timer?.enabled && (
            <section className="exp-timer">
              <Image
                src={expedition.image}
                alt=""
                fill
                sizes="100vw"
                className="exp-timer__bg"
              />
              <div className="exp-timer__overlay" />
              <div className="container exp-timer__inner">
                <CountdownTimer expeditionSlug={expedition.slug} variant="detail" />
              </div>
            </section>
          )}

          {/* FINAL CTA — приглашение к текущей экспедиции */}
          <section className="exp-final">
            <Image
              src={expedition.image}
              alt=""
              fill
              sizes="100vw"
              className="exp-final__bg"
            />
            <div className="exp-final__overlay" />
            <div className="container exp-final__inner">
              <div className="exp-final__card">
                <p className="exp-final__eyebrow">{editorial.finalCta.eyebrow}</p>
                <h2 className="exp-final__title">{editorial.finalCta.headline}</h2>
                <p className="exp-final__text">{editorial.finalCta.text}</p>
                <a href="#register" className="btn-liquid">
                  <span className="btn-liquid-text">Стать участником</span>
                </a>
              </div>
            </div>
          </section>
        </>
      )}

      {/* ══════════════ ФОРМА — только «Активна» ══════════════ */}
      {isActive && (
        <section id="register" className="form-section">
          <Image
            src="/images/expeditions/expeditions-form-bg.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="form-section__bg"
          />
          <div className="form-section__overlay" />
          <div className="container form-section__inner">
            <div className="form-panel">
              <h2 className="form-panel__title">Стать участником экспедиции</h2>
              <p className="form-panel__subtitle">
                Выберите экспедицию и оставьте заявку — мы свяжемся с вами в течение суток.
              </p>
              <ExpeditionDetailForm variant="full" />
            </div>
          </div>
        </section>
      )}

      {/* ══════════════ «Скоро» — lead + related ══════════════ */}
      {isUpcoming && (
        <section id="register" className="lead-section">
          <div className="container">
            <div className="glass-01 lead-panel">
              <h3 className="lead-panel__title">Вам интересна локация?</h3>
              <p className="lead-panel__text">
                {expedition.description ||
                  'Оставьте заявку — и эта точка может стать следующей на карте FExperience.'}
              </p>
              <ExpeditionDetailForm variant="compact" />
            </div>

            {related.length > 0 && (
              <div className="related-block">
                <p className="dir-label">Похожие экспедиции</p>
                <div className="related-grid">
                  {related.map(exp => (
                    <Link key={exp.slug} href={`/expeditions/${exp.slug}`} className="related-card">
                      <Image
                        src={exp.image}
                        alt={exp.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="related-card__bg"
                      />
                      <span className="related-card__dates">{exp.dates.toUpperCase()}</span>
                      <span className="related-card__title">{exp.title}</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* ══════════════ «Завершена» — recap + related ══════════════ */}
      {isCompleted && (
        <section className="recap-section">
          <div className="container">
            <div className="recap-stats">
              <div className="recap-stat">
                <span className="recap-stat__num">{expedition.speakersCount ?? 0}</span>
                <span className="recap-stat__label">спикеров</span>
              </div>
              <div className="recap-stat">
                <span className="recap-stat__num">{expedition.completedStats?.participantsCount ?? '—'}</span>
                <span className="recap-stat__label">участников</span>
              </div>
              <div className="recap-stat">
                <span className="recap-stat__num">5</span>
                <span className="recap-stat__label">дней программы</span>
              </div>
            </div>

            {completedReviews.length > 0 && (
              <div className="recap-reviews">
                <p className="dir-label">Отзывы участников</p>
                <h3 className="recap-reviews__title">Экспедиция в Марокко 2025</h3>
                {completedReviews.slice(0, 3).map(review => (
                  <blockquote key={review.id} className="recap-review">
                    <p className="recap-review__text">&ldquo;{review.text}&rdquo;</p>
                    <footer className="recap-review__author">
                      <div className="recap-review__photo">
                        <Image
                          src={review.photo}
                          alt={review.photoAlt}
                          width={96}
                          height={96}
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <p className="recap-review__name">{review.name}</p>
                        <p className="recap-review__company">{review.company}</p>
                      </div>
                    </footer>
                  </blockquote>
                ))}
              </div>
            )}

            {related.length > 0 && (
              <div className="related-block">
                <p className="dir-label">Похожие активные направления</p>
                <div className="related-grid">
                  {related.map(exp => (
                    <Link key={exp.slug} href={`/expeditions/${exp.slug}`} className="related-card">
                      <Image
                        src={exp.image}
                        alt={exp.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="related-card__bg"
                      />
                      <span className="related-card__dates">{exp.dates.toUpperCase()}</span>
                      <span className="related-card__title">{exp.title}</span>
                    </Link>
                  ))}
                </div>
                <div className="recap-cta">
                  <Link href="/expeditions" className="btn-outline">
                    Смотреть все экспедиции
                  </Link>
                  <Link href="/articles" className="btn-outline">
                    Читать отчёты участников
                  </Link>
                </div>
              </div>
            )}
          </div>
        </section>
      )}
    </article>
  );
}