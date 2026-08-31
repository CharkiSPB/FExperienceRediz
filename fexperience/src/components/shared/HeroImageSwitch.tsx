'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';

type Props = {
  dayImage: string;
  eveningImage?: string;
  alt: string;
  /** Server-side computed: is it evening (≥20:00 MSK) right now */
  initialIsEvening: boolean;
  priority?: boolean;
};

/**
 * Переключает изображение hero на вечернее (≥20:00 по Москве).
 * Сервер отдаёт правильное состояние при загрузке,
 * клиент каждую минуту проверяет время и переключает с кроссфейдом.
 * Если eveningImage не передан — всегда показывает dayImage.
 */
export function HeroImageSwitch({
  dayImage,
  eveningImage,
  alt,
  initialIsEvening,
  priority,
}: Props) {
  const [isEvening, setIsEvening] = useState(initialIsEvening);

  useEffect(() => {
    if (!eveningImage) return;

    const checkTime = () => {
      const utcHour = new Date().getUTCHours();
      const mskHour = (utcHour + 3) % 24;
      setIsEvening(mskHour >= 20);
    };

    // перепроверить после гидратации
    checkTime();

    const interval = setInterval(checkTime, 60_000);
    return () => clearInterval(interval);
  }, [eveningImage]);

  // Если вечернего изображения нет — показываем только дневное
  if (!eveningImage) {
    return (
      <Image
        src={dayImage}
        alt={alt}
        fill
        className="object-cover"
        priority={priority}
      />
    );
  }

  return (
    <>
      {/* Дневное изображение — исчезает вечером */}
      <Image
        src={dayImage}
        alt={alt}
        fill
        className={`object-cover transition-opacity duration-1000 ${
          isEvening ? 'opacity-0' : 'opacity-100'
        }`}
        priority={priority}
      />
      {/* Вечернее изображение — появляется вечером */}
      <Image
        src={eveningImage}
        alt={alt}
        fill
        className={`object-cover transition-opacity duration-1000 ${
          isEvening ? 'opacity-100' : 'opacity-0'
        }`}
        priority={priority}
      />
    </>
  );
}
