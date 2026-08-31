'use client';
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FlipText } from '@/components/ui/FlipText';

type MapPoint = {
  id: string;
  name: string;
  x: number;
  y: number;
  status: 'active' | 'completed' | 'soon';
  dates?: string;
  slug: string;
};

const MAP_POINTS: MapPoint[] = [
  { id: 'ru', name: 'Россия', x: 579.18, y: 143.04, status: 'active', slug: 'russia' },
  { id: 'vietnam', name: 'Вьетнам', x: 772, y: 283, status: 'active', dates: '11.10.2026 – 16.10.2026', slug: 'vietnam' },
  { id: 'south-africa', name: 'ЮАР', x: 528.50, y: 407, status: 'active', dates: '15.11.2026 - 21.11.2026', slug: 'south-africa' },
  { id: 'morocco', name: 'Марокко', x: 452, y: 232, status: 'completed', slug: 'morocco' },
  { id: 'india', name: 'Индия', x: 685.09, y: 255, status: 'active', slug: 'new-delhi' },
  { id: 'thailand', name: 'Таиланд', x: 760, y: 280, status: 'soon', slug: 'thailand' },
  { id: 'indonesia', name: 'Индонезия', x: 810, y: 332, status: 'soon', slug: 'indonesia' },
  { id: 'brazil', name: 'Бразилия', x: 318.70, y: 347, status: 'soon', slug: 'brazil' },
  { id: 'kenya', name: 'Кения', x: 575, y: 321.80, status: 'soon', slug: 'kenya' },
  { id: 'sakhalin', name: 'Сахалин', x: 870, y: 166, status: 'soon', slug: 'sakhalin' },
];

type Route = {
  from: { x: number; y: number };
  to: { x: number; y: number };
  status: 'active' | 'completed' | 'soon';
  curveFactor: number;
  strokeWidth?: number;
  color?: string;
};

const ROUTES: Route[] = [
  ...MAP_POINTS.filter(p => ['vietnam', 'south-africa', 'morocco'].includes(p.id))
    .map(p => ({ 
      from: { x: 579, y: 143 }, 
      to: { x: p.x, y: p.y }, 
      status: p.status, 
      curveFactor: p.id === 'morocco' ? 0.25 : p.id === 'vietnam' ? -0.22 : 0.22, 
    })),
  // Маршрут до Индии — толще, со стрелкой
  {
    from: { x: 579, y: 143 },
    to: { x: 685.09, y: 255 },
    status: 'active',
    curveFactor: -0.15,
    strokeWidth: 2.6,
    color: '#FF6F00',
  },
];

const STATUS_COLORS = {
  active: '#F7931A',
  completed: '#666666',
  soon: '#999999',
} as const;

export function NewDelhiMap() {
  const ref = useRef<HTMLDivElement>(null);
  const [hoveredIndia, setHoveredIndia] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  return (
    <section 
      ref={ref} 
      className="relative w-full min-h-[60vh] md:min-h-[85vh] bg-[#000004] overflow-hidden flex items-center justify-center py-12 md:py-0"
      aria-label="Карта Индии"
    >
      {/* 🔹 Текстовая карточка (слева) — две части: изображение наезжает на текст */}
      <div className="hidden md:flex flex-col items-center absolute left-6 md:left-12 lg:left-16 xl:left-20 top-1/2 -translate-y-1/2 z-20">
        {/* Верхняя карточка-изображение, заходит на нижнюю на 24px */}
        <div className="relative z-10 w-[300px] h-[158px] rounded-[13px] overflow-hidden -mb-6 shadow-xl">
          <Image
            src="/images/newDeli/newDeliKarta.webp"
            alt=""
            fill
            className="object-cover"
          />
        </div>

        {/* Нижняя карточка с текстом */}
        <div className="w-[351px] min-h-[340px] bg-white/10 backdrop-blur-xl border border-white/20 rounded-[26px] p-6 pt-10 shadow-2xl">
          <div className="text-left">
            <h3 className="font-roman leading-none mb-1">
              <span className="block text-white" style={{ fontSize: '34.23px' }}>
                Индия — новый
              </span>
              <span className="block text-[#FF6F00]" style={{ fontSize: '34.23px' }}>
                драйвер роста
              </span>
            </h3>

            <p className="text-white font-roman text-left mt-4 leading-relaxed" style={{ fontSize: '15px' }}>
              Сегодня Индия — одна из самых горячих точек на инвестиционной карте мира. Экономика региона развивается быстрее прогнозов, создавая колоссальный спрос на инфраструктурные проекты, цифровые платформы и долгосрочные вложения.
            </p>
          </div>
        </div>
      </div>

      {/* 🗺️ Карта (десктоп) */}
      <div className="hidden md:block absolute inset-0 w-full h-full">
        <motion.img
          src="/images/map/NewDeliMap.svg"
          alt=""
          aria-hidden="true"
          loading="lazy"
          className="absolute inset-0 w-full h-full pointer-events-none object-contain opacity-20" 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />

        {/* Градиентные затемнения (под SVG, чтобы точки были поверх) */}
        <div className="absolute inset-x-0 top-0 h-120 bg-gradient-to-b from-[#000004] to-transparent pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-[263px] bg-gradient-to-l from-[#000004] to-transparent pointer-events-none" />
        <div className="absolute inset-y-0 left-0 w-[550px] bg-gradient-to-r from-[#000004] to-transparent pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-[300px] bg-gradient-to-t from-[#000004] to-transparent pointer-events-none" />

        <svg
          viewBox="0 0 1000 500"
          preserveAspectRatio="xMidYMid meet"
          className="absolute inset-0 w-full h-full pointer-events-auto"
          aria-hidden="true"
        >
          {/* Маршруты */}
          {ROUTES.map((route, i) => {
            const dx = route.to.x - route.from.x;
            const dy = route.to.y - route.from.y;
            const mx = (route.from.x + route.to.x) / 2;
            const my = (route.from.y + route.to.y) / 2;
            const factor = route.curveFactor ?? 0.22;
            const cx = mx - dy * factor;
            const cy = my + dx * factor;
            const pathD = `M ${route.from.x} ${route.from.y} Q ${cx} ${cy} ${route.to.x} ${route.to.y}`;

            return (
              <motion.path
                key={`route-${i}`}
                d={pathD}
                fill="none"
                stroke={route.color || STATUS_COLORS[route.status]}
                strokeWidth={route.strokeWidth || 0.8}
                strokeDasharray={route.status === 'active' ? "0" : "3 3"}
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1.2, delay: 0.3 + i * 0.2, ease: "easeInOut" }}
              />
            );
          })}

          {/* Стрелка на маршруте до Индии */}
          <g transform="translate(685.09, 255) rotate(-30)">
            <image
              href="/images/newDeli/deliStrelka.svg"
              x="-12"
              y="-28"
              width="25"
              height="25"
              style={{ filter: 'drop-shadow(0 0 6px rgba(255,111,0,0.6))' }}
            />
          </g>

          {/* Точки — все видны, но интерактивна только Индия (hover) */}
          {MAP_POINTS.map((point) => {
            const isActive = point.status === 'active';
            const color = STATUS_COLORS[point.status];
            const isIndia = point.id === 'india';

            return (
              <g key={point.id} className="pointer-events-auto">
                {/* Для Индии — пульсирующий круг */}
                {(point.status === 'active' || point.status === 'soon') && !reducedMotion && isIndia && (
                  <circle
                    cx={point.x}
                    cy={point.y}
                    r="8"
                    fill={color}
                    opacity="0.4"
                  >
                    <animate
                      attributeName="r"
                      from="8"
                      to="24"
                      dur="2s"
                      repeatCount="indefinite"
                    />
                    <animate
                      attributeName="opacity"
                      from="0.6"
                      to="0"
                      dur="2s"
                      repeatCount="indefinite"
                    />
                  </circle>
                )}
                {/* Невидимая зона захвата для Индии (больше, чем точка) */}
                {isIndia && (
                  <circle
                    cx={point.x}
                    cy={point.y}
                    r="20"
                    fill="transparent"
                    onMouseEnter={() => setHoveredIndia(true)}
                    onMouseLeave={() => setHoveredIndia(false)}
                  />
                )}
                <circle 
                  cx={point.x} 
                  cy={point.y} 
                  r={isActive ? 4 : 4} 
                  fill={color} 
                  className={isIndia ? 'cursor-pointer transition-all duration-200' : ''}
                  style={{ 
                    filter: isIndia && hoveredIndia ? 'drop-shadow(0 0 8px rgba(255,111,0,0.6))' : 'none' 
                  }}
                  onMouseEnter={() => isIndia && setHoveredIndia(true)}
                  onMouseLeave={() => isIndia && setHoveredIndia(false)}
                />
              </g>
            );
          })}
        </svg>
      </div>

      {/* 🔸 Попап Индии — при наведении */}
      {hoveredIndia && (
        <div className="hidden md:block absolute z-30 pointer-events-none"
          style={{
            left: `${(MAP_POINTS.find(p => p.id === 'india')!.x / 1000) * 100}%`,
            top: `${(MAP_POINTS.find(p => p.id === 'india')!.y / 500) * 100}%`,
            transform: 'translate(-50%, calc(-100% - 20px))',
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            onMouseEnter={() => setHoveredIndia(true)}
            onMouseLeave={() => setHoveredIndia(false)}
            className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-5 w-72 shadow-2xl pointer-events-auto"
          >
            <h3 className="text-[#F7931A] text-xl font-bold font-serif mb-2 uppercase">
              Нью-Дели
            </h3>
            <p className="text-white/80 text-sm font-light mb-4 leading-relaxed">
              Деловой ужин Forbes в Индии. Закрытая встреча с лидерами индийского бизнеса и государства.
            </p>
            <Link
              href="/expeditions/new-delhi#form"
              className="group block w-full py-3 px-4 rounded-xl font-medium bg-[#F7931A] text-white text-center hover:bg-[#FFA733] hover:scale-[1.02] hover:shadow-xl hover:shadow-[#F7931A]/30 transition-all duration-300 shadow-lg"
            >
              <FlipText className="flex items-center justify-center">УЧАСТВОВАТЬ</FlipText>
            </Link>
          </motion.div>
        </div>
      )}

      {/* 📱 Мобильная адаптация */}
      <div className="md:hidden w-full px-4 flex flex-col gap-6 py-8">
        <div className="w-full bg-black/5 backdrop-blur-xl border border-white/20 rounded-2xl p-5">
          <h3 className="font-roman leading-none mb-1">
            <span className="block text-white" style={{ fontSize: '28px' }}>
              Индия — новый
            </span>
            <span className="block text-[#FF6F00]" style={{ fontSize: '28px' }}>
              драйвер роста
            </span>
          </h3>
          <p className="text-white/90 text-sm leading-relaxed font-light mt-4">
            Сегодня Индия — одна из самых горячих точек на инвестиционной карте мира. Экономика региона развивается быстрее прогнозов, создавая колоссальный спрос на инфраструктурные проекты, цифровые платформы и долгосрочные вложения.
          </p>
        </div>

        <div className="relative w-full aspect-[2/1] bg-[#0D0805] rounded-2xl overflow-hidden border border-white/10">
          <img
            src="/images/map/NewDeliMap.svg"
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full pointer-events-none object-contain opacity-60"
          />
          <svg
            viewBox="0 0 1000 500"
            preserveAspectRatio="xMidYMid meet"
            className="absolute inset-0 w-full h-full"
            aria-hidden="true"
          >
            {ROUTES.map((route, i) => {
              const dx = route.to.x - route.from.x;
              const dy = route.to.y - route.from.y;
              const mx = (route.from.x + route.to.x) / 2;
              const my = (route.from.y + route.to.y) / 2;
              const factor = route.curveFactor ?? 0.22;
              const cx = mx - dy * factor;
              const cy = my + dx * factor;
              const pathD = `M ${route.from.x} ${route.from.y} Q ${cx} ${cy} ${route.to.x} ${route.to.y}`;

              return (
                <path
                  key={`route-${i}`}
                  d={pathD}
                  fill="none"
                  stroke={route.color || STATUS_COLORS[route.status]}
                  strokeWidth={route.strokeWidth || 0.8}
                  strokeDasharray={route.status === 'active' ? "0" : "3 3"}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  opacity="0.5"
                />
              );
            })}

            {/* Стрелка на маршруте до Индии (моб.) */}
            <g transform="translate(685.09, 255) rotate(-23)">
              <image
                href="/images/newDeli/deliStrelka.svg"
                x="-12"
                y="-12"
                width="24"
                height="24"
              />
            </g>

            {MAP_POINTS.map((point) => {
              const isActive = point.status === 'active';
              const color = STATUS_COLORS[point.status];
              const isIndia = point.id === 'india';

              return (
                <g key={point.id} className="pointer-events-auto">
                  {(point.status === 'active' || point.status === 'soon') && !reducedMotion && isIndia && (
                    <circle
                      cx={point.x}
                      cy={point.y}
                      r="8"
                      fill={color}
                      opacity="0.4"
                    >
                      <animate
                        attributeName="r"
                        from="8"
                        to="24"
                        dur="2s"
                        repeatCount="indefinite"
                      />
                      <animate
                        attributeName="opacity"
                        from="0.6"
                        to="0"
                        dur="2s"
                        repeatCount="indefinite"
                      />
                    </circle>
                  )}
                  <circle 
                    cx={point.x} 
                    cy={point.y} 
                    r={isActive ? 4 : 4} 
                    fill={color} 
                  />
                </g>
              );
            })}
          </svg>
        </div>
      </div>
    </section>
  );
}
