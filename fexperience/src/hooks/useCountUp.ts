'use client';
import { useState, useEffect, useRef } from 'react';
import { CountUp } from 'countup.js';

interface UseCountUpOptions {
  duration?: number;
  useInView?: boolean;
  prefix?: string;
  suffix?: string;
}

export function useCountUp(end: number, { duration = 2, useInView = false, prefix = '', suffix = '' }: UseCountUpOptions = {}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [start, setStart] = useState(false);

  useEffect(() => {
    if (!ref.current || !useInView) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStart(true);
          observer.disconnect();
        }
      },
      { rootMargin: '-100px 0px' }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [useInView]);

  useEffect(() => {
    if (!ref.current || !start) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const countUp = new CountUp(ref.current, end, {
      duration: prefersReducedMotion ? 0 : duration,
      useGrouping: false,
      prefix,
      suffix,
    });
    countUp.start();
  }, [start, end, duration, prefix, suffix]);

  return { ref, start };
}