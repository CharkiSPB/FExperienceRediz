'use client';

import Image from 'next/image';
import { useCountUp } from '@/hooks/useCountUp';
import { useScrollReveal } from '@/hooks/useScrollReveal';

interface StatColumn {
  iconSrc: string;
  iconAlt: string;
  end: number;
  sign: { prefix?: string; suffix?: string };
  label: string;
  description: string;
  delay: string;
}

const columns: StatColumn[] = [
  {
    iconSrc: '/images/icons/01_Market_analysis.svg',
    iconAlt: 'Анализ рынка',
    end: 60,
    sign: { prefix: '> ', suffix: '%' },
    label: 'неудачных экспансий',
    description: 'из-за недостаточно глубокого анализа рынка',
    delay: 'delay-1',
  },
  {
    iconSrc: '/images/icons/02_Loyal_contacts.svg',
    iconAlt: 'Лояльные контакты',
    end: 50,
    sign: { suffix: '+' },
    label: 'лояльных контактов',
    description: 'минимум для понимания специфики рынка',
    delay: 'delay-2',
  },
  {
    iconSrc: '/images/icons/03_Unclaimed_product.svg',
    iconAlt: 'Невостребованный продукт',
    end: 40,
    sign: { prefix: '> ', suffix: '%' },
    label: 'стартапов терпят провал',
    description: 'из-за невостребованности продукта',
    delay: 'delay-3',
  },
];

function StatNumber({ stat }: { stat: StatColumn }) {
  // countup.js анимирует только цифры; знаки (> % +) рендерятся отдельно
  // оранжевыми (countup не умеет красить префикс/суффикс по отдельности).
  const { ref } = useCountUp(stat.end, {
    duration: 1.8,
    useInView: true,
  });

  return (
    <>
      {stat.sign.prefix && <span className="stat-col-sign">{stat.sign.prefix}</span>}
      <span ref={ref} />
      {stat.sign.suffix && <span className="stat-col-sign">{stat.sign.suffix}</span>}
    </>
  );
}

export function MarketReality() {
  useScrollReveal();

  return (
    <section className="stats-band-section" aria-label="Статистика экспансии">
      {/* Editorial-шапка: цифры ниже — без изменений */}
      <div className="stats-band-header fade-up">
        <div className="stats-band-head">
          <span className="eyebrow-dash" aria-hidden="true" />
          <p className="stats-band-eyebrow">Экспансия</p>
          <h2 className="stats-band-title">
            Новые точки на карте вашего бизнеса
          </h2>
        </div>
        <p className="stats-band-lead">
          Тысячи бизнесменов ежегодно стремятся покорить новые горизонты —
          от соседнего региона до зарубежной страны. Ключ к успеху один —
          знание локальной специфики.
        </p>
      </div>
      <div className="stats-band-container">
        <div className="stats-band">
          {columns.map((stat) => {
            return (
              <div key={stat.label} className={`stat-col fade-up ${stat.delay}`}>
                <Image src={stat.iconSrc} alt={stat.iconAlt} width={92} height={92} className="stat-col-icon" />
                <div className="stat-col-body">
                  <div className="stat-col-number">
                    <StatNumber stat={stat} />
                  </div>
                  <div className="stat-col-label">{stat.label}</div>
                  <p className="stat-col-desc">{stat.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
