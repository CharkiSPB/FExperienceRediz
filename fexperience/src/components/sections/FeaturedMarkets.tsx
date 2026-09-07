import Link from 'next/link';
import Image from 'next/image';
import { getNearestExpedition, expeditions } from '@/data/expeditions';
import { regions } from '@/data/regions';
import type { Expedition } from '@/types/expedition';

const statusLabels: Record<Expedition['status'], string> = {
  active: 'Активна',
  upcoming: 'Скоро',
  completed: 'Завершена',
};

function formatDates(dates: string) {
  return dates.replace(/-/g, '—');
}

export function FeaturedMarkets() {
  const nearest = getNearestExpedition(expeditions);
  if (!nearest) return null;

  const region = regions.find((r) => r.id === nearest.region);

  // Три карточки тёмной панели: первая — Вьетнам, дальше — две со статусом «скоро»
  const vietnam = expeditions.find((e) => e.slug === 'vietnam');
  const soon = expeditions
    .filter((e) => e.status === 'upcoming' && e.slug !== vietnam?.slug)
    .slice(0, 2);
  const cards = [vietnam, ...soon].filter((e): e is Expedition => Boolean(e)).slice(0, 3);

  // Контекстный абзац правой половины — собран из данных экспедиции
  const lead =
    nearest.fullDescription ||
    nearest.description ||
    `Бизнес-экспедиция в ${nearest.country}`;
  const industries =
    nearest.industries && nearest.industries.length
      ? nearest.industries.join(', ')
      : '';
  const paragraph = [lead, industries ? `Направления: ${industries}` : '']
    .filter(Boolean)
    .join(' ');

  return (
    <section className="program-block">
      {/* Левая половина — full-bleed фото + существующая glass-card */}
      <div className="program-block__media">
        <Image
          src={nearest.image}
          alt={`Бизнес-экспедиция в ${nearest.country}`}
          fill
          priority
          sizes="(min-width: 1025px) 48vw, 100vw"
        />

        <div className="featured-expedition-panel">
          <span className="featured-expedition-status">
            {statusLabels[nearest.status]}
          </span>
          <h3>{nearest.country}</h3>
          <p className="featured-expedition-type">Бизнес-экспедиция</p>
          <p className="featured-expedition-date">{formatDates(nearest.dates)}</p>
          <Link
            href={`/expeditions/${nearest.slug}`}
            className="btn-liquid btn-liquid--sm"
          >
            <span className="btn-liquid-text">Подробнее →</span>
          </Link>
        </div>
      </div>

      {/* Правая половина — единая тёмная поверхность */}
      <div className="program-block__panel">
        <span className="eyebrow-dash" aria-hidden="true" />
        <span className="program-block__eyebrow">Ближайшие экспедиции</span>
        <h2 className="program-block__title">
          Бизнес начинается там, где заканчивается знакомое.
        </h2>
        {/* <p className="program-block__paragraph">{paragraph}</p> */}
        <p className="program-block__paragraph">Благодаря участию в деловых мероприятиях, встречам с органами власти и местными предпринимателями, вы сможете оценить не только потенциал развития бизнеса, но и скрытые угрозы нового рынка - в России и зарубежом.</p>

        {cards.length > 0 && (
          <div className="program-days">
            {cards.map((exp) => (
              <Link
                href={`/expeditions/${exp.slug}`}
                className="program-day"
                key={exp.slug}
              >
                <div className="program-day__imgwrap">
                  <Image
                    src={exp.image}
                    alt={`Бизнес-экспедиция в ${exp.country}`}
                    fill
                    sizes="(min-width: 1025px) 17vw, 72vw"
                  />
                </div>
                <span className="program-day__num">{exp.country}</span>
                <p className="program-day__text">
                  {exp.dates ? formatDates(exp.dates) : statusLabels[exp.status]}
                </p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
