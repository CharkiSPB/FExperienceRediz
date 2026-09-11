'use client';
import { useState, useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';

/**
 * Хук для плавного параллакса на основе скролла.
 * @param speed Коэффициент смещения (0.1–0.5). 0.2 = 20% скорости скролла.
 */
export function useParallax(speed: number = 0.2) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    if (reducedMotion) return;

    let rafId: number;
    const handleScroll = () => {
      // Читаем scrollY напрямую (Lenis уже сгладил его)
      const scrollY = window.scrollY;
      // Запрашиваем следующий кадр для синхронизации с рендером
      rafId = requestAnimationFrame(() => {
        setOffset(scrollY * speed);
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Инициализация при маунте
    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, [speed, reducedMotion]);

  return { ref, offset: reducedMotion ? 0 : offset };
}