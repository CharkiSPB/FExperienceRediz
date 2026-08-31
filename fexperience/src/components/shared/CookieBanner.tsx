'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  // Логика хранения согласия — не менять (ключ localStorage 'cookiesAccepted')
  useEffect(() => {
    if (typeof window === 'undefined') return;
    // Анимация появления — slideUp через 400ms, чтобы не конкурировать с preloader
    const timer = setTimeout(() => {
      const accepted = window.localStorage.getItem('cookiesAccepted');
      if (accepted === 'true') {
        setDismissed(true);
      } else {
        setVisible(true);
      }
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  const accept = () => {
    window.localStorage.setItem('cookiesAccepted', 'true');
    setDismissed(true);
  };

  if (dismissed) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Уведомление об использовании cookies"
      className={[
        'cookie-banner glass-01 fixed z-[100]',
        'bottom-0 left-0 w-full md:bottom-6 md:left-6 md:w-auto md:max-w-[420px]',
        visible ? 'cookie-banner--visible' : '',
      ].join(' ')}
    >
      <p className="cookie-banner__text">
        Мы используем cookies. Продолжая использование сайта, вы соглашаетесь с обработкой данных.{' '}
        <Link href="/privacy" className="cookie-banner__link">
          Подробнее о политике
        </Link>
      </p>
      <div className="flex flex-wrap items-center gap-3">
        <button type="button" onClick={accept} className="btn-liquid btn-liquid--sm">
          <span className="btn-liquid-text">Принять</span>
        </button>
        <button type="button" onClick={accept} className="btn-outline btn-outline--sm">
          Отклонить
        </button>
      </div>
    </div>
  );
}
