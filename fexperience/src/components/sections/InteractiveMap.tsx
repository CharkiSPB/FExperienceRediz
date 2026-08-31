'use client';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
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
  { id: 'morocco', name: 'Марокко', x: 452, y: 232, status: 'completed', dates: '12-18 мар 2024', slug: 'morocco' },
  { id: 'india', name: 'Индия', x: 685.09, y: 255, status: 'soon', slug: 'india' },
  { id: 'thailand', name: 'Таиланд', x: 760, y: 280, status: 'soon', slug: 'thailand' },
  { id: 'indonesia', name: 'Индонезия', x: 810, y: 332, status: 'soon', slug: 'indonesia' },
  { id: 'brazil', name: 'Бразилия', x: 318.70, y: 347, status: 'soon', slug: 'brazil' },
  { id: 'kenya', name: 'Кения', x: 575, y: 321.80, status: 'soon', slug: 'kenya' },
  { id: 'sakhalin', name: 'Сахалин', x: 870, y: 166, status: 'soon', slug: 'sakhalin' },
];

const ROUTES = MAP_POINTS.filter(p => ['vietnam', 'south-africa', 'morocco'].includes(p.id))
  .map(p => ({ 
    from: { x: 579, y: 143 }, 
    to: { x: p.x, y: p.y }, 
    status: p.status, 
    curveFactor: p.id === 'morocco' ? 0.25 : p.id === 'vietnam' ? -0.22 : 0.22, 
  }));

const STATUS_COLORS = {
  active: '#F7931A',
  completed: '#666666',
  soon: '#999999',
} as const;

export function InteractiveMap() {
  const ref = useRef<HTMLDivElement>(null);
  const [activePopup, setActivePopup] = useState<MapPoint | null>(null);
  const [interestPoint, setInterestPoint] = useState<MapPoint | null>(null);
  const [reducedMotion, setReducedMotion] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);
  const interestRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Закрытие попапа при клике вне его
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        const svg = event.target as SVGElement;
        if (!svg.closest('svg')) {
          setActivePopup(null);
        }
      }
      if (interestRef.current && !interestRef.current.contains(event.target as Node)) {
        setInterestPoint(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <section 
      ref={ref} 
      className="relative w-full min-h-[60vh] md:min-h-[100vh] bg-[#0D0805] overflow-hidden flex items-center justify-center py-12 md:py-0"
      aria-label="Интерактивная карта экспедиций"
    >
      {/* 🔹 Текстовая карточка (слева) — glassmorphism */}
      <div className="hidden md:block absolute left-6 md:left-12 lg:left-16 xl:left-20 top-1/2 -translate-y-1/2 z-20 w-72 md:w-80 xl:w-72 xxl:w-98 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 md:p-6 xl:p-8 shadow-2xl">
        <p className="text-white/70 text-sm md:text-sm leading-relaxed font-light">
          Эксклюзивные программы бизнес-экспедиций FExperience разрабатываются с учетом специфики каждого региона.
          <br /><br />
          Благодаря участию в деловых мероприятиях, встречам с органами власти и местными предпринимателями, вы сможете оценить не только потенциал развития бизнеса, но и скрытые угрозы нового рынка - в России и за рубежом.
        </p>
      </div>

      {/* 🗺️ Карта (десктоп) */}
      <div className="hidden md:block absolute inset-0 w-full h-full">
        {/* Фоновое изображение карты */}
        <motion.img
          src="/images/map/world-map.svg"
          alt=""
          aria-hidden="true"
          loading="lazy"
          className="absolute inset-0 w-full h-full pointer-events-none object-contain opacity-40" 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />

        {/* SVG слой для анимаций (точки и маршруты) */}
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
                stroke={STATUS_COLORS[route.status]}
                strokeWidth="0.8"
                strokeDasharray={route.status === 'active' ? "0" : "3 3"}
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1.2, delay: 0.3 + i * 0.2, ease: "easeInOut" }}
              />
            );
          })}

          {/* Точки */}
          {MAP_POINTS.map((point) => {
            const isActive = point.status === 'active';
            const color = STATUS_COLORS[point.status];
            const isPopupOpen = activePopup?.id === point.id;
            
            return (
              <g 
                key={point.id} 
                className={point.id === 'ru' ? 'pointer-events-auto' : 'cursor-pointer pointer-events-auto'} 
                  onClick={() => {
                    if (point.id === 'ru') return;
                    if (isActive) {
                      setActivePopup(point);
                    } else if (point.status === 'soon') {
                      setInterestPoint(point);
                    }
                  }}
                  role={point.status === 'soon' ? "button" : undefined}
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (point.status === 'soon' && (e.key === 'Enter' || e.key === ' ')) {
                      e.preventDefault();
                      setInterestPoint(point);
                    }
                  }}
              >
                {(point.status === 'active' || point.status === 'soon') && !reducedMotion && (
                  <circle
                    cx={point.x}
                    cy={point.y}
                    r="8"
                    fill={color}
                    opacity={point.status === 'active' ? "0.4" : "0.2"}
                  >
                    <animate
                      attributeName="r"
                      from="8"
                      to={point.status === 'active' ? "24" : "18"}
                      dur={point.status === 'active' ? "2s" : "3s"}
                      repeatCount="indefinite"
                    />
                    <animate
                      attributeName="opacity"
                      from={point.status === 'active' ? "0.6" : "0.3"}
                      to="0"
                      dur={point.status === 'active' ? "2s" : "3s"}
                      repeatCount="indefinite"
                    />
                  </circle>
                )}
                <circle 
                  cx={point.x} 
                  cy={point.y} 
                  r={isActive ? 4 : 4} 
                  fill={color} 
                  className="transition-all duration-200"
                  style={{ 
                    filter: isPopupOpen && isActive ? 'drop-shadow(0 0 8px rgba(247,147,26,0.8))' : 'none' 
                  }} 
                />
              </g>
            );
          })}
        </svg>
      </div>

      {/* 🔹 Попап для АКТИВНЫХ экспедиций — glassmorphism (более прозрачный) */}
      <AnimatePresence>
        {activePopup && (
          <motion.div
            ref={popupRef}
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="hidden md:block absolute z-30 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-5 w-72 shadow-2xl"
            style={{
              left: `${(activePopup.x / 1000) * 100}%`,
              top: `${(activePopup.y / 500) * 100}%`,
              transform: 'translate(-50%, calc(100% + 16px))',
            }}
          >
            {/* Кнопка закрытия */}
            <button 
              onClick={() => setActivePopup(null)} 
              className="absolute top-3 right-3 text-white/40 hover:text-white transition-colors"
              aria-label="Закрыть"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Название */}
            <h3 className="text-[#F7931A] text-xl font-bold font-serif mb-2 uppercase">
              {activePopup.name}
            </h3>
            
            {/* Даты */}
            {activePopup.dates && (
              <p className="text-white/80 text-sm font-medium mb-4">
                {activePopup.dates}
              </p>
            )}
            
            {/* Кнопка */}
            <Link
              href={`/expeditions/${activePopup.slug}`}
              className="group block w-full py-3 px-4 rounded-xl font-medium bg-[#F7931A] text-white text-center hover:bg-[#FFA733] hover:scale-[1.02] hover:shadow-xl hover:shadow-[#F7931A]/30 transition-all duration-300 shadow-lg"
            >
              <FlipText className="flex items-center justify-center">СТАТЬ УЧАСТНИКОМ</FlipText>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 🟡 Попап для НЕАКТИВНЫХ (soon) экспедиций — интерес к локации */}
      <AnimatePresence>
        {interestPoint && (
          <motion.div
            ref={interestRef}
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="hidden md:block absolute z-30 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-5 w-72 shadow-2xl"
            style={{
              left: `${(interestPoint.x / 1000) * 100}%`,
              top: `${(interestPoint.y / 500) * 100}%`,
              transform: 'translate(-50%, calc(100% + 16px))',
            }}
          >
            {/* Кнопка закрытия */}
            <button 
              onClick={() => setInterestPoint(null)} 
              className="absolute top-3 right-3 text-white/40 hover:text-white transition-colors"
              aria-label="Закрыть"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Название */}
            <h3 className="text-[#F7931A] text-xl font-bold font-serif mb-2 uppercase">
              {interestPoint.name}
            </h3>
            
            {/* Текст */}
            <p className="text-white/80 text-sm font-light mb-4 leading-relaxed">
              Вам интересна локация? Оставьте заявку — и эта точка может стать следующей на карте FExperience
            </p>
            
            {/* Кнопка */}
            <Link
              href={`/expeditions/${interestPoint.slug}`}
              onClick={() => setInterestPoint(null)}
              className="block w-full py-3 px-4 rounded-xl font-medium bg-[#F7931A] text-white text-center hover:bg-[#FFA733] hover:scale-[1.02] hover:shadow-xl hover:shadow-[#F7931A]/30 transition-all duration-300 shadow-lg"
            >
              ОСТАВИТЬ ЗАЯВКУ
            </Link>
          </motion.div>
        )}
      </AnimatePresence>



      {/* 📱 Мобильная адаптация */}
      <div className="md:hidden w-full px-4 flex flex-col gap-6 py-8">
        {/* Текстовая карточка */}
        <div className="w-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5">
          <p className="text-white/70 text-sm leading-relaxed font-light">
            Эксклюзивные программы бизнес-экспедиций FExperience разрабатываются с учетом специфики каждого региона.
            <br /><br />
            Благодаря участию в деловых мероприятиях, встречам с органами власти и местными предпринимателями, вы сможете оценить не только потенциал развития бизнеса, но и скрытые угрозы нового рынка.
          </p>
        </div>

          {/* Уменьшенная карта */}
          <div className="relative w-full aspect-[2/1] bg-[#0D0805] rounded-2xl overflow-hidden border border-white/10">
            <img
              src="/images/map/world-map.svg"
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
                    stroke={STATUS_COLORS[route.status]}
                    strokeWidth="0.8"
                    strokeDasharray={route.status === 'active' ? "0" : "3 3"}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    opacity="0.5"
                  />
                );
              })}

              {MAP_POINTS.map((point) => {
                const isActive = point.status === 'active';
                const color = STATUS_COLORS[point.status];
                
                return (
                  <g 
                    key={point.id}
                    className={point.id === 'ru' ? 'pointer-events-auto' : 'cursor-pointer pointer-events-auto'}
                    onClick={() => {
                      if (point.id === 'ru') return;
                      if (isActive) {
                        setActivePopup(point);
                      } else if (point.status === 'soon') {
                        setInterestPoint(point);
                      }
                    }}
                    role={point.status === 'soon' ? "button" : undefined}
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (point.status === 'soon' && (e.key === 'Enter' || e.key === ' ')) {
                        e.preventDefault();
                        setInterestPoint(point);
                      }
                    }}
                  >
                    {(point.status === 'active' || point.status === 'soon') && !reducedMotion && (
                      <circle
                        cx={point.x}
                        cy={point.y}
                        r="8"
                        fill={color}
                        opacity={point.status === 'active' ? "0.4" : "0.2"}
                      >
                        <animate
                          attributeName="r"
                          from="8"
                          to={point.status === 'active' ? "24" : "18"}
                          dur={point.status === 'active' ? "2s" : "3s"}
                          repeatCount="indefinite"
                        />
                        <animate
                          attributeName="opacity"
                          from={point.status === 'active' ? "0.6" : "0.3"}
                          to="0"
                          dur={point.status === 'active' ? "2s" : "3s"}
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

            {/* 📱 Мобильная модалка интереса для soon-точек */}
            <AnimatePresence>
              {interestPoint && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0 z-40 flex items-center justify-center p-4 bg-black/60"
                  onClick={() => setInterestPoint(null)}
                >
                  <div
                    className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-5 w-full max-w-xs shadow-2xl"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-[#F7931A] text-lg font-bold font-serif uppercase">
                        {interestPoint.name}
                      </h3>
                      <button 
                        onClick={() => setInterestPoint(null)} 
                        className="text-white/40 hover:text-white transition-colors"
                        aria-label="Закрыть"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-white/80 text-sm font-light mb-4 leading-relaxed">
                      Вам интересна локация? Оставьте заявку — и эта точка может стать следующей на карте FExperience
                    </p>
                    <Link
                      href={`/expeditions/${interestPoint.slug}`}
                      onClick={() => setInterestPoint(null)}
                      className="block w-full py-3 px-4 rounded-xl font-medium bg-[#F7931A] text-white text-center hover:bg-white hover:text-[#F7931A] transition-all duration-300 shadow-lg text-sm"
                    >
                      ОСТАВИТЬ ЗАЯВКУ
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
    </section>
  );
}