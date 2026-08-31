'use client';
import { useEffect, useRef, useState } from 'react';
import { useParallax } from '@/hooks/useParallax';
import Image from 'next/image';

type HeroVideoProps = {
  videoSrc: string; // e.g. '/videos/hero-vietnam' или '/videos/hero-vietnam.mp4'
  poster: string;
  alt: string;
};

export function HeroVideo({ videoSrc, poster, alt }: HeroVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const { ref: bgRef, offset: parallaxY } = useParallax(0.25);

  // Приводим путь к базовому виду (убираем расширение, если оно передано)
  const basePath = videoSrc.replace(/\.(mp4|webm)$/i, '');

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    if (isMobile) return;
    const video = videoRef.current;
    if (!video) return;

    // Загружаем видео только после монтирования — не блокируем первый рендер
    video.load();

    console.log('🎥 Попытка загрузки форматов:', `${basePath}.webm`, `${basePath}.mp4`);

    const attemptPlay = async () => {
      console.log('✅ Метаданные готовы. Запускаем воспроизведение...');
      try {
        video.muted = true;
        video.playsInline = true;
        await video.play();
        console.log('▶️ Видео воспроизводится');
      } catch (err) {
        console.warn('⚠️ Автоплей заблокирован браузером:', err);
      }
    };

    const handleError = () => console.error('❌ Ошибка загрузки видео. Убедитесь, что в /public/videos/ лежат .webm и/или .mp4 файлы');

    video.addEventListener('loadeddata', attemptPlay, { once: true });
    video.addEventListener('error', handleError);

    return () => {
      video.removeEventListener('loadeddata', attemptPlay);
      video.removeEventListener('error', handleError);
    };
  }, [isMobile, basePath]);

  // Мобильные устройства → всегда постер (оптимизированный через Next/Image)
  if (isMobile) {
    return (
      <div className="absolute inset-0 w-full h-full">
        <Image
          src={poster}
          alt={alt}
          fill
          className="object-cover"
          sizes="100vw"
          priority
          fetchPriority="high"
        />
      </div>
    );
  }

  return (
    <>
      <div ref={bgRef} className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          style={{ transform: `translateY(${parallaxY}px) scale(1.05)` }}
          muted
          loop
          playsInline
          preload="metadata"
          poster={poster}
        >
          {/* 🥇 WebM (лучшее сжатие, современные браузеры) */}
          <source src={`${basePath}.webm`} type="video/webm" />
          {/* 🥈 MP4 (универсальный фоллбэк) */}
          <source src={`${basePath}.mp4`} type="video/mp4" />
          Ваш браузер не поддерживает видео.
        </video>
      </div>
      {/* Затемнение поверх видео */}
      <div className="absolute inset-0 bg-black/60 pointer-events-none" />
    </>
  );
}