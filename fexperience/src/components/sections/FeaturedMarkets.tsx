import Link from 'next/link';
import Image from 'next/image';
import { getNearestExpedition, expeditions } from '@/data/expeditions';
import { programs } from '@/data/program';
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

/** Короткий тизер описания дня — для preview-карточки. */
function teaser(text: string, max = 108): string {
  const clean = text.replace(/\|/g, ' ').replace(/\s+/g, ' ').trim();
  if (clean.length <= max) return clean;
  return clean.slice(0, max).trimEnd() + '…';
}

/** Первое предложение описания — контекстная строка тёмной зоны. */
function firstSentence(text: string): string {
  const clean = text.replace(/\|/g, ' ').replace(/\s+/g, ' ').trim();
  const idx = clean.indexOf('.');
  return idx > 30 ? clean.slice(0, idx + 1) : clean;
}

export function FeaturedMarkets() {
  const nearest = getNearestExpedition(expeditions);
  if (!nearest) return null;

  const program = nearest.programSlug ? programs[nearest.programSlug] ?? [] : [];
  const days = program.slice(0, 3);
  const region = regions.find((r) => r.id === nearest.region);

  // Контекстный абзац правой половины — собран из данных экспедиции
  const lead =
    (days[0] ? firstSentence(days[0].description) : '') ||
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
        <span className="program-block__eyebrow">Ближайшие экспедиции</span>
        <h2 className="program-block__title">
          Бизнес начинается там, где заканчивается знакомое.
        </h2>
        <p className="program-block__paragraph">{paragraph}</p>

        {days.length > 0 && (
          <div className="program-days">
            {days.map((day) => (
              <article className="program-day" key={day.day}>
                <div className="program-day__imgwrap">
                  <Image
                    src={day.image}
                    alt={day.title || `${nearest.country}, день ${day.day}`}
                    fill
                    sizes="(min-width: 1025px) 17vw, 72vw"
                  />
                </div>
                <span className="program-day__num">
                  День {String(day.day).padStart(2, '0')}
                </span>
                <p className="program-day__text">{teaser(day.description)}</p>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
