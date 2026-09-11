import Image from 'next/image';
import { mediaLayer } from '@/data/mediaLayer';

export function MediaCoverage() {
  return (
    <section className="bg-surface px-6 py-20 md:px-16 md:py-32">
      <div className="mx-auto max-w-[1280px]">
        <div className="grid grid-cols-1 items-center gap-y-8 md:grid-cols-[45%_55%] md:gap-16">
          {/* Фото-блок: ноутбук с сайтом Forbes + журнал Forbes */}
          <div className="media-photos">
            <div className="media-photo-main">
              <Image
                src="/images/media/nout.webp"
                alt="Forbes media"
                fill
                sizes="(min-width: 768px) 38vw, 85vw"
                className="object-cover"
              />
            </div>
            <div className="media-photo-mag">
              <Image
                src="/images/media/zhyrnal1.webp"
                alt="FExperience Forbes Magazine"
                fill
                sizes="(min-width: 768px) 21vw, 55vw"
                className="object-cover"
              />
            </div>
          </div>

          {/* Заголовок + три строки статистики */}
          <div>
            <h2 className="font-display text-[28px] font-semibold leading-[1.15] text-text-primary md:text-[36px]">
              {mediaLayer.title}
            </h2>
            <p className="mt-4 max-w-[440px] font-sans text-[16px] leading-[1.6] text-text-secondary">
              {mediaLayer.subtitle}
            </p>
            <div className="media-stats">
              {mediaLayer.stats.map((stat) => (
                <div key={stat.label} className="media-stat-row">
                  <span className="media-stat-kicker">{stat.kicker}</span>
                  <span className="media-stat-number">{stat.number}</span>
                  <span className="media-stat-label">{stat.label}</span>
                  <div className="media-stat-desc">{stat.description}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}