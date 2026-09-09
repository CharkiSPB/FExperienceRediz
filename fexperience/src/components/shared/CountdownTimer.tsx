'use client';
import { useState, useEffect, useMemo } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { expeditions } from '@/data/expeditions';

type TimeLeft = { days: number; hours: number; minutes: number; seconds: number };

type CountdownTimerProps = {
  expeditionSlug?: string;
  variant?: 'homepage';
};

function calcTimeLeft(targetDate: Date): TimeLeft {
  const diff = targetDate.getTime() - Date.now();
  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / 1000 / 60) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function HomeTimerUnit({ value, label }: { value: number; label: string }) {
  const reduceMotion = useReducedMotion();
  const display = String(value).padStart(2, '0');

  return (
    <div className="home-countdown__unit">
      <div className="home-countdown__number-wrap">
        {reduceMotion ? (
          <span className="home-countdown__number">{display}</span>
        ) : (
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span
              key={display}
              className="home-countdown__number"
              initial={{ y: '-35%', opacity: 0 }}
              animate={{ y: '0%', opacity: 1 }}
              exit={{ y: '35%', opacity: 0 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            >
              {display}
            </motion.span>
          </AnimatePresence>
        )}
      </div>
      <span className="home-countdown__label">{label}</span>
    </div>
  );
}

export function CountdownTimer({ expeditionSlug = 'south-africa', variant = 'homepage' }: CountdownTimerProps) {
  //  Находим экспедицию по slug (или берем Вьетнам по умолчанию)
  const expedition = useMemo(
    () => expeditions.find(e => e.slug === expeditionSlug),
    [expeditionSlug]
  );
  
  // Если экспедиция не найдена или у нее нет таймера — ничего не рендерим
  if (!expedition?.timer?.enabled || !expedition.timer.targetDate) {
    return null;
  }

  // 🔹 ИСПРАВЛЕНИЕ: Добавляем безопасный доступ (?.) и значение по умолчанию
  const targetDate = useMemo(() => {
    const dateStr = expedition?.timer?.targetDate || '';
    return dateStr ? new Date(dateStr) : new Date();
  }, [expedition?.timer?.targetDate]);
  
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !targetDate) return;

    const tick = () => {
      setTimeLeft(calcTimeLeft(targetDate));
    };

    tick();
    const interval = setInterval(tick, 1000);

    return () => clearInterval(interval);
  }, [targetDate, mounted]);

  if (!mounted) {
    return null;
  }

  return (
    <section className="home-countdown-section" aria-label="Обратный отсчёт до ближайшей экспедиции">
      <div className="home-countdown">
        <span className="eyebrow-dash eyebrow-dash--center" aria-hidden="true" />
        <p className="home-countdown__eyebrow">ДО НАЧАЛА ЭКСПЕДИЦИИ</p>
        <div className="home-countdown__values">
          <HomeTimerUnit value={timeLeft.days} label="ДНИ" />
          <HomeTimerUnit value={timeLeft.hours} label="ЧАСЫ" />
          <HomeTimerUnit value={timeLeft.minutes} label="МИНУТЫ" />
          <HomeTimerUnit value={timeLeft.seconds} label="СЕКУНДЫ" />
        </div>
        <p className="home-countdown__caption">
          {expedition.country} · {expedition.dates}
        </p>
      </div>
    </section>
  );
}
