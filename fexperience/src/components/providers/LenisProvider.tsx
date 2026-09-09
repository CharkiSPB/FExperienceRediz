'use client';
import { createContext, useContext, useEffect, useRef, ReactNode, useState } from 'react';
import { usePathname } from 'next/navigation';
import Lenis from 'lenis';

type LenisContextType = {
  pause: () => void;
  resume: () => void;
  scrollTo: (target: string | number | HTMLElement, options?: { offset?: number; duration?: number }) => void;
};

const LenisContext = createContext<LenisContextType>({ pause: () => {}, resume: () => {}, scrollTo: () => {} });
export const useLenis = () => useContext(LenisContext);

/** Подписывается на смену роута и скроллит к hash-секции если есть # */
function HashScrollWatcher() {
  const pathname = usePathname();
  const lenis = useLenis();

  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) return;
    // Небольшая задержка чтобы DOM отрендерился
    const timer = setTimeout(() => {
      if (lenis?.scrollTo) {
        lenis.scrollTo(hash, { offset: -80 });
      } else {
        document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
    return () => clearTimeout(timer);
  }, [pathname, lenis]);

  return null;
}

export function LenisProvider({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  // Состояние для проверки, чтобы не блокировать рендер
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const isMobile = window.innerWidth < 768;
    const saveData = (navigator as any).connection?.saveData;

    // Если предпочитает уменьшение движения, мобильный или экономия трафика — отключаем
    if (prefersReducedMotion.matches || isMobile || saveData) {
      setIsDisabled(true);
      return;
    }

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    const rafId = requestAnimationFrame(raf);

    // Слушатели для модалок
    const handlePause = () => lenis.stop();
    const handleResume = () => lenis.start();
    document.addEventListener('lenis:pause', handlePause);
    document.addEventListener('lenis:resume', handleResume);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      document.removeEventListener('lenis:pause', handlePause);
      document.removeEventListener('lenis:resume', handleResume);
    };
  }, []);

  const pause = () => lenisRef.current?.stop();
  const resume = () => lenisRef.current?.start();
  const scrollTo = (target: string | number | HTMLElement, options?: { offset?: number; duration?: number }) => {
    lenisRef.current?.scrollTo(target, options);
  };

  return (
    <LenisContext.Provider value={{ pause, resume, scrollTo }}>
      {children}
      <HashScrollWatcher />
    </LenisContext.Provider>
  );
}