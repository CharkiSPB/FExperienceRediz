'use client';

import { useScrollReveal } from '@/hooks/useScrollReveal';

type ExpeditionIncludedProps = {
  includes: string[];
};

export function ExpeditionIncluded({ includes }: ExpeditionIncludedProps) {
  useScrollReveal();

  if (includes.length === 0) return null;

  return (
    <section className="expedition-included" aria-label="Что включено">
      <div className="expedition-included__container">
        <div className="included-head fade-up">
          <span className="eyebrow-dash" aria-hidden="true" />
          <p className="included-label">Что включено</p>
          <p className="included-subtitle">
            Мы полностью берём на себя организацию экспедиции и решение всех операционных вопросов.
            Вы занимаетесь бизнесом и нетворкингом — обо всём остальном позаботится команда FExperience.
          </p>
        </div>

        <ul className="included-items">
          {includes.map((item, i) => (
            <li key={`${item}-${i}`} className={`included-item fade-up delay-${Math.min(i + 1, 6)}`}>
              <span className="included-item__num" aria-hidden="true">
                {String(i + 1).padStart(2, '0')}/
              </span>
              <span className="included-item__name">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
