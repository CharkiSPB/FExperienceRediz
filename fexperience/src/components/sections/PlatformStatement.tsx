'use client';

import Image from 'next/image';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { platformStatement } from '@/data/platformStatement';

function ProjectSeal() {
  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="project-media__seal-svg"
      aria-hidden="true"
    >
      <defs>
        <path
          id="project-seal-circle"
          d="M 100,100 m -74,0 a 74,74 0 1,1 148,0 a 74,74 0 1,1 -148,0"
        />
      </defs>
      {/* Тонкая круговая линия — контур печати (чёрная, полупрозрачная) */}
      <circle
        cx="100"
        cy="100"
        r="91"
        stroke="rgba(26,26,26,.55)"
        strokeWidth="1"
        fill="none"
      />
      {/* Текст по окружности — ровно три повтора */}
      <text
        fill="rgba(26,26,26,.55)"
        fontSize="10"
        letterSpacing="1.8"
        style={{ fontFamily: 'var(--font-sans), sans-serif' }}
      >
        <textPath href="#project-seal-circle" startOffset="0%">
          FORBES FEXPERIENCE · FORBES FEXPERIENCE · FORBES FEXPERIENCE ·
        </textPath>
      </text>
      {/* Центр — буква F из фирменного логотипа (кроп viewBox по зоне F) */}
      <svg x="68" y="66" width="64" height="68" viewBox="0 0 320 344">
        <image
          href="/images/logo/F_logo.svg"
          x="0"
          y="0"
          width="1971"
          height="344"
        />
      </svg>
    </svg>
  );
}

export function PlatformStatement() {
  useScrollReveal();

  return (
    <section className="project-section" aria-labelledby="project-title">
      <div className="project-grid">
        <div className="project-grid__text">
          <div className="project-eyebrow" id="project-title">
            <span className="project-eyebrow-line" aria-hidden="true" />
            {platformStatement.eyebrow}
          </div>

          <h2 className="project-statement">
            {(() => {
              const phrase = 'готовность вашего бизнеса к масштабированию';
              const parts = platformStatement.statement.split(phrase);
              if (parts.length < 2) return platformStatement.statement;
              return (
                <>
                  {parts[0]}
                  <em className="project-statement-accent">{phrase}</em>
                  {parts[1]}
                </>
              );
            })()}
          </h2>

          <p className="project-subtext">{platformStatement.subText}</p>

          <ul className="platform-pills">
            {platformStatement.principles.map((principle) => (
              <li key={principle.number} className="platform-pill">
                <span>{principle.name}</span>
                <span className="platform-pill-sub">{principle.sub}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="project-media fade-up delay-2">
          <span className="project-media__frame" aria-hidden="true" />
          <Image
            src="/images/why/02FExperience-bg.webp"
            alt="Деловая встреча у окна с видом на город"
            width={720}
            height={900}
            sizes="(max-width: 767px) 100vw, (max-width: 1024px) 46vw, 45vw"
            className="project-media__photo"
          />
          <div className="project-media__seal">
            <ProjectSeal />
          </div>
        </div>
      </div>
    </section>
  );
}
