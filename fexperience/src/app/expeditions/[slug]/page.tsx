import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { expeditions } from '@/data/expeditions';
import { programs } from '@/data/program';
import { config } from '@/data/config';
import { speakers } from '@/data/speakers';
import { expeditionEditorial } from '@/config/expeditionEditorial';
import { CountdownTimer } from '@/components/shared/CountdownTimer';
import { ExpeditionHero } from '@/components/sections/ExpeditionHero';
import { ExpeditionProgram } from '@/components/sections/ExpeditionProgram';
import { ExpeditionIncluded } from '@/components/sections/ExpeditionIncluded';
import { ExpeditionExperts } from '@/components/sections/ExpeditionExperts';

type Props = {
  params: Promise<{ slug: string }>;
};

const MONTHS_GEN = [
  '', 'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
  'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря',
];



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

  const heroDate = formatHeroDate(expedition);

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

      {/* ══════════════ HERO — светлый editorial (скетч + печать) ══════════════ */}
      <ExpeditionHero expedition={expedition} heroDate={heroDate} />

      {/* ══════════════ ПРОГРАММА — тёмный блок впритык к Hero ══════════════ */}
      <ExpeditionProgram program={program} status={expedition.status} />

      {/* ══════════════ ЧТО ВКЛЮЧЕНО — светлый блок после программы ══════════════ */}
      {expedition.includes && expedition.includes.length > 0 && (
        <ExpeditionIncluded includes={[...expedition.includes]} />
      )}

      {/* ══════════════ ЭКСПЕРТЫ — слайдер + команда Forbes ══════════════ */}
      <ExpeditionExperts externalExperts={externalExperts} forbesTeam={forbesTeam} />

      {/* ══════════════ НАРРАТИВ — только «Активна» с редакционным контентом ══════════════ */}
      {isActive && editorial && (
        <>
          {/* ТАЙМЕР — как на главной (светлое стекло) */}
          <CountdownTimer expeditionSlug={expedition.slug} variant="homepage" />

        </>
      )}

      {/* ══════════════ «Скоро» — lead + related ══════════════ */}
      {isUpcoming && (
        <section id="register" className="lead-section">
          <div className="container">
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