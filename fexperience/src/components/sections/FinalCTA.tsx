import Link from 'next/link';

export function FinalCTA() {
  return (
    <section className="final-cta">
      <div className="final-cta__background" aria-hidden="true" />
      <div className="final-cta__panel">
        <h2 className="final-cta__title">Откройте новый рынок раньше других</h2>
        <p className="final-cta__description">
          Присоединяйтесь к бизнес-экспедиции FExperience с Forbes —
          доступ к предпринимателям, локальным экспертам и людям, принимающим решения на новом рынке.
        </p>
        <div className="final-cta__action">
          <Link href="/expeditions#form" className="btn-liquid btn-liquid--lg">
            <span className="btn-liquid-text">Стать участником</span>
          </Link>
        </div>
      </div>
    </section>
  );
}