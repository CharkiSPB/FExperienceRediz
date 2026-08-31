import Image from 'next/image';
import { whySection, whyComposition } from '@/data/whyComposition';
import { whyUsItems } from '@/data/whyUs';

const ITEMS = new Map(whyUsItems.map((item) => [item.id, item]));

export function WhyFExperience() {
  return (
    <section id="why" className="why-section px-6 py-20 md:px-16 md:py-32">
      <div className="mx-auto max-w-[1280px]">
        <header className="mb-12 md:mb-16">
          <p className="font-sans text-[13px] font-semibold uppercase tracking-[.08em] text-brand-600">
            {whySection.eyebrow}
          </p>
          <h2 className="mt-4 font-display text-[30px] font-semibold leading-[1.12] text-text-primary md:text-[48px]">
            {whySection.title}
          </h2>
        </header>

        <div className="why-grid">
          {whyComposition.map((cell) => {
            const content = ITEMS.get(cell.id);
            if (!content) return null;

            const number = String(cell.id).padStart(2, '0');

            return (
              <div
                key={cell.id}
                className={`why-card ${cell.id === 1 ? 'why-card-featured' : ''} ${cell.full ? 'why-card-full' : ''}`}
              >
                {cell.image && (
                  <Image
                    src={cell.image}
                    alt={cell.alt ?? ''}
                    fill
                    sizes="(min-width: 1025px) 50vw, 100vw"
                    className="why-card-bg-image"
                  />
                )}

                {cell.variant === 'featured' && (
                  <div className="why-glass-panel">
                    <div className="why-card-number">{number}</div>
                    <h3 className="why-card-title">{content.title}</h3>
                    <p className="why-card-text">{content.text}</p>
                  </div>
                )}

                {cell.variant === 'image-label' && (
                  <div className="why-card-label">
                    <div className="why-card-number">{number}</div>
                    <h3 className="why-card-title">{content.title}</h3>
                    <p className="why-card-text">{content.text}</p>
                  </div>
                )}

                {cell.variant === 'typographic' && (
                  <div className="why-card-content why-card-typographic">
                    <div className="why-card-number">{number}</div>
                    <h3 className="why-card-title">{content.title}</h3>
                    <p className="why-card-text">{content.text}</p>
                  </div>
                )}

                {cell.variant === 'image-glass' && (
                  <div className="why-card-sheet">
                    <div className="why-card-number">{number}</div>
                    <h3 className="why-card-title">{content.title}</h3>
                    <p className="why-card-text">{content.text}</p>
                  </div>
                )}

                {cell.variant === 'signature' && (
                  <div className={`why-card-signature glass-signature ${cell.full ? 'md:left-8 md:right-auto' : ''}`}>
                    <div className="why-card-number">{number}</div>
                    <h3 className="why-card-title">{content.title}</h3>
                    <p className="why-card-text">{content.text}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}