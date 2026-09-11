'use client';

import { useId } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { continentPaths, type ContinentKey } from '@/config/continentPaths';

type MapPoint = { x: number; y: number };
type MapCity = MapPoint & { name: string };

type ExpeditionMapProps = {
  continent: ContinentKey;
  aspect: number;
  activePoint: MapPoint & { label?: string };
  neighborPoints?: MapPoint[];
  programCities?: MapCity[];
  status: 'активна' | 'скоро' | 'завершена';
};

export function MapContinent({
  continent,
  aspect,
  activePoint,
  neighborPoints = [],
  programCities = [],
  status,
}: ExpeditionMapProps) {
  const reduceMotion = useReducedMotion();
  const uid = useId().replace(/:/g, '');
  const glowId = `exp-map-glow-${uid}`;
  const glassId = `exp-map-glass-${uid}`;

  const path = continentPaths[continent];
  const scale = `scale(${100 / path.vbW}, ${100 / path.vbH})`;

  const routeLine =
    programCities.length >= 2
      ? `M ${programCities.map(c => `${c.x},${c.y}`).join(' L ')}`
      : '';

  const continentLabel =
    continent === 'africa'
      ? 'Африка'
      : continent === 'asia'
        ? 'Азия'
        : continent === 'latam'
          ? 'Латинская Америка'
          : 'Россия';

  return (
    <div className="expedition-map" style={{ aspectRatio: aspect }}>
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="expedition-map__svg"
        aria-hidden="true"
      >
        <defs>
          <filter id={glowId} x="-200%" y="-200%" width="500%" height="500%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="0.9" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient id={glassId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="rgba(255,255,255,.14)" />
            <stop offset=".55" stopColor="rgba(255,255,255,.03)" />
            <stop offset="1" stopColor="rgba(255,255,255,.09)" />
          </linearGradient>
        </defs>

        {/* Стеклянная поверхность — сам силуэт континента, без карточки */}
        <motion.path
          d={path.d}
          transform={scale}
          className="expedition-map__glass"
          fill={`url(#${glassId})`}
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.6, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        />

        {/* Контур — тонкая светлая линия по краю стеклянного силуэта */}
        <motion.g
          transform={scale}
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.4, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <path d={path.d} className="expedition-map__outline expedition-map__outline--glow" />
          <path d={path.d} className="expedition-map__outline" />
        </motion.g>

        {/* Маршрут — тонкая оранжевая линия прямо на континенте */}
        {routeLine && (
          <motion.path
            d={routeLine}
            className="expedition-map__route"
            initial={reduceMotion ? false : { pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.6, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          />
        )}

        {/* Соседние точки — контекст масштаба (без маршрута) */}
        {neighborPoints.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r="0.35" className="expedition-map__neighbor" />
        ))}

        {/* Точки маршрута — маленькие оранжевые точки, появляются последовательно */}
        {programCities.map((city, i) => (
          <motion.circle
            key={i}
            cx={city.x}
            cy={city.y}
            r="0.45"
            className="expedition-map__stop"
            initial={reduceMotion ? false : { opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.55, delay: 1.0 + i * 0.25, ease: [0.16, 1, 0.3, 1] }}
          />
        ))}

        {/* Активная точка — мягкий orange glow */}
        <motion.g
          transform={`translate(${activePoint.x}, ${activePoint.y})`}
          initial={reduceMotion ? false : { opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 1.9, ease: [0.16, 1, 0.3, 1] }}
        >
          {status !== 'завершена' && (
            <circle r="2.2" className="expedition-map__pulse" />
          )}
          <circle r="0.9" className="expedition-map__dot" filter={`url(#${glowId})`} />
          <circle r="0.9" className="expedition-map__dot-ring" />
        </motion.g>
      </svg>

      {/* Подписи городов — HTML-слой поверх контура */}
      <div className="expedition-map__labels" aria-hidden="true">
        {programCities.map((city, i) => (
          <span
            key={i}
            className="expedition-map__label"
            style={{ left: `${city.x}%`, top: `${city.y}%` }}
          >
            <span className="expedition-map__label-name">{city.name}</span>
          </span>
        ))}
      </div>

      {/* Очень лёгкая подпись континента — часть картографического слоя */}
      <span className="expedition-map__continent" aria-hidden="true">
        {continentLabel}
      </span>
    </div>
  );
}