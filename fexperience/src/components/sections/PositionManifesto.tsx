export function PositionManifesto() {
  return (
    <section className="position-section" aria-labelledby="position-title">
      <div className="position-section__inner">
        <div className="position-section__line" aria-hidden="true" />

        <div className="position-section__content">
          <div className="position-section__label" id="position-title">
            НАША ПОЗИЦИЯ
          </div>

          <h2 className="position-section__title">
            Мы не организуем туристические поездки. Мы проводим{' '}
            <span className="position-section__accent">бизнес-экспедиции</span>
            . Результат — ваше взвешенное решение об экспансии.
          </h2>

          <div className="position-section__footer">
            FExperience by Forbes Russia
          </div>
        </div>

        <div className="position-section__illustration" aria-hidden="true">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/position-illustration.webp" alt="" />
        </div>
      </div>
    </section>
  );
}