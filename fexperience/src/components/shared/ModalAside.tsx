'use client';

import Image from 'next/image';
import { Globe, Users, Compass, TrendingUp } from 'lucide-react';

export const MODAL_BENEFITS = [
  { icon: Globe, title: 'Новые рынки', desc: 'Выход на перспективные рынки и регионы' },
  { icon: Users, title: 'Сильное окружение', desc: 'Предприниматели, эксперты, инвесторы' },
  { icon: Compass, title: 'Стратегические решения', desc: 'Идеи и партнерства для роста бизнеса' },
  { icon: TrendingUp, title: 'Практический результат', desc: 'Конкретные шаги по итогам экспедиции' },
];

/* Светлая фирменная печать для тёмного фона */
export function ModalSeal({ size = 132 }: { size?: number }) {
  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      aria-hidden="true"
    >
      <defs>
        <path
          id="request-seal-circle"
          d="M 100,100 m -74,0 a 74,74 0 1,1 148,0 a 74,74 0 1,1 -148,0"
        />
      </defs>
      <circle
        cx="100"
        cy="100"
        r="91"
        stroke="rgba(255,246,238,.55)"
        strokeWidth="1"
        fill="none"
      />
      <text
        fill="rgba(255,246,238,.55)"
        fontSize="10"
        letterSpacing="1.8"
        style={{ fontFamily: 'var(--font-sans), sans-serif' }}
      >
        <textPath href="#request-seal-circle" startOffset="0%">
          FORBES FEXPERIENCE · FORBES FEXPERIENCE · FORBES FEXPERIENCE ·
        </textPath>
      </text>
      <text
        x="100"
        y="100"
        textAnchor="middle"
        dominantBaseline="central"
        fill="var(--color-brand-500)"
        fontSize="72"
        fontWeight="700"
        style={{ fontFamily: 'var(--font-display), serif' }}
      >
        F
      </text>
    </svg>
  );
}

type ModalAsideProps = {
  photo?: string;
  eyebrow: string;
};

/* Левая половина модалки: фото + лого + заголовок + печать + преимущества */
export function ModalAside({ photo, eyebrow }: ModalAsideProps) {
  return (
    <>
      <div className="request-modal__media" aria-hidden="true">
        {photo && (
          <Image
            key={photo}
            src={photo}
            alt=""
            fill
            sizes="50vw"
            className="request-modal__media-img"
            priority
          />
        )}
        <div className="request-modal__media-overlay" />
      </div>

      <div className="request-modal__content">
        <Image
          src="/images/logo/logoFExperience2.svg"
          alt="Forbes FExperience"
          width={150}
          height={33}
          className="request-modal__logo"
        />
        <p className="request-modal__eyebrow">{eyebrow}</p>
        <h2 className="request-modal__heading">
          Присоединяйтесь к бизнес-экспедициям <span>FExperience</span>
        </h2>
        <p className="request-modal__sub">
          Оставьте заявку — мы свяжемся с вами и подберем экспедицию под ваши цели.
        </p>

        <div className="request-modal__seal">
          <ModalSeal size={132} />
        </div>

        <ul className="request-modal__benefits">
          {MODAL_BENEFITS.map((b) => (
            <li key={b.title} className="request-modal__benefit">
              <b.icon size={24} strokeWidth={1.5} aria-hidden="true" />
              <p className="request-modal__benefit-title">{b.title}</p>
              <p className="request-modal__benefit-desc">{b.desc}</p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
