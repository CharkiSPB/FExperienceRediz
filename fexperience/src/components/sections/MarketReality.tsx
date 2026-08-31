'use client';

import { StatsIcon } from '@/components/icons/StatsIcon';
import { useCountUp } from '@/hooks/useCountUp';
import { useScrollReveal } from '@/hooks/useScrollReveal';

interface StatColumn {
  icon: 'compass' | 'partnerstvo' | 'trending';
  end: number;
  sign: { prefix?: string; suffix?: string };
  label: string;
  description: string;
  delay: string;
}

const columns: StatColumn[] = [
  {
    icon: 'compass',
    end: 60,
    sign: { prefix: '> ', suffix: '%' },
    label: 'неудачных экспансий',
    description: 'из-за недостаточно глубокого анализа рынка',
    delay: 'delay-1',
  },
  {
    icon: 'partnerstvo',
    end: 50,
    sign: { suffix: '+' },
    label: 'лояльных контактов',
    description: 'минимум для понимания специфики рынка',
    delay: 'delay-2',
  },
  {
    icon: 'trending',
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
      <div className="stats-band-container">
        <div className="stats-band">
          {columns.map((stat) => {
            return (
              <div key={stat.label} className={`stat-col fade-up ${stat.delay}`}>
                <StatsIcon name={stat.icon} size={51} className="stat-col-icon" />
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
