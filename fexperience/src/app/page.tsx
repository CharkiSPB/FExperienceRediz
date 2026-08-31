import { Hero } from '@/components/sections/Hero';
import { CountdownTimer } from '@/components/shared/CountdownTimer';
import { ErrorBoundary } from '@/components/ui/ErrorBoundary';
import { getNearestExpedition } from '@/data/expeditions';
import dynamic from 'next/dynamic';

const MarketReality = dynamic(() => import('@/components/sections/MarketReality').then(m => ({ default: m.MarketReality })), {
  loading: () => <div className="bg-canvas py-24" />
});

const PlatformStatement = dynamic(() => import('@/components/sections/PlatformStatement').then(m => ({ default: m.PlatformStatement })), {
  loading: () => <div className="bg-canvas py-24" />
});

const RegionSelector = dynamic(() => import('@/components/sections/RegionSelector').then(m => ({ default: m.RegionSelector })), {
  loading: () => <div className="bg-canvas py-24" />
});

const FeaturedMarkets = dynamic(() => import('@/components/sections/FeaturedMarkets').then(m => ({ default: m.FeaturedMarkets })), {
  loading: () => <div className="bg-canvas py-24" />
});

const PositionManifesto = dynamic(() => import('@/components/sections/PositionManifesto').then(m => ({ default: m.PositionManifesto })), {
  loading: () => <div className="bg-canvas py-24" />
});

// Секции ниже первого экрана — загружаются отдельно (code splitting)
const WhyFExperience = dynamic(() => import('@/components/sections/WhyFExperience').then(m => ({ default: m.WhyFExperience })), {
  loading: () => <div className="py-24 bg-[#0D0805]" />
});

const MediaCoverage = dynamic(() => import('@/components/sections/MediaCoverage').then(m => ({ default: m.MediaCoverage })), {
  loading: () => <div className="py-24 bg-surface" />
});

const Reviews = dynamic(() => import('@/components/sections/Reviews').then(m => ({ default: m.Reviews })), {
  loading: () => <div className="py-24 bg-canvas" />
});

const FAQ = dynamic(() => import('@/components/sections/FAQ').then(m => ({ default: m.FAQ })), {
  loading: () => <div className="py-24 bg-canvas" />
});

const FinalCTA = dynamic(() => import('@/components/sections/FinalCTA').then(m => ({ default: m.FinalCTA })), {
  loading: () => <div className="py-24 gradient-editorial-warm" />
});

export default function HomePage() {
  const nearestExpedition = getNearestExpedition();

  return (
    <>
      <ErrorBoundary fallback={<div className="h-screen bg-[#0D0805] flex items-center justify-center text-[#A0A0A0]">Ошибка загрузки Hero</div>}>
        <Hero />
      </ErrorBoundary>

      {/* 2.2 Market Reality — editorial data field (бесшовно под Hero) */}
      <MarketReality />

      {/* 2.3 Platform Statement */}
      <PlatformStatement />

      {/* 2.4 Region Selector */}
      <RegionSelector />

      {/* 2.5 Featured Markets — editorial market spread */}
      <FeaturedMarkets />

      {/* 2.5A Наша позиция — рукописный editorial manifesto */}
      <PositionManifesto />

      <WhyFExperience />

      <MediaCoverage />

      <Reviews />

      {/* Countdown — единый стеклянный объект после отзывов */}
      {nearestExpedition && (
        <CountdownTimer expeditionSlug={nearestExpedition.slug} variant="homepage" />
      )}

      <FAQ />
      <FinalCTA />

      {/* 
        Блок генерального партнёра временно скрыт.
        Чтобы вернуть:
          1. Добавить dynamic import: const PartnerBlock = dynamic(() => import('@/components/layout/PartnerBlock').then(m => ({ default: m.PartnerBlock })), { loading: () => <div className="py-16 bg-[#0D0805]" /> })
          2. Добавить <PartnerBlock variant="section" /> в JSX выше
          3. Проверить src/data/partner.ts (role: general) и config.ts (pageVisible: true)
      */}
    </>
  );
}
