import React from 'react';
import './RegionSelector.css';
import { AfricaMap } from '@/components/maps/AfricaMap';
import { AsiaMap } from '@/components/maps/AsiaMap';
import { LatamMap } from '@/components/maps/LatamMap';
import { RussiaMap } from '@/components/maps/RussiaMap';

type Region = {
  id: string;
  index: string;
  title: string;
  desc: string;
  Map: React.ComponentType<{ className?: string }>;
};

const regions: Region[] = [
  {
    id: 'africa',
    index: '01',
    title: 'Африка',
    desc: 'Экспедиции по странам Африканского континента',
    Map: AfricaMap,
  },

  {
    id: 'asia',
    index: '02',
    title: 'Азия',
    desc: 'Экспедиции в странах Азиатско-Тихоокеанского региона',
    Map: AsiaMap,
  },

  {
    id: 'latam',
    index: '03',
    title: 'Латинская Америка',
    desc: 'Экспедиции в странах Латинской Америки',
    Map: LatamMap,
  },

  {
    id: 'russia',
    index: '04',
    title: 'Россия',
    desc: 'Бизнес-экспедиции по регионам России',
    Map: RussiaMap,
  },
];

export function RegionSelector() {
  return (
    <section className="region-selector" aria-labelledby="region-selector-title">
      <div className="container">
        <header className="region-selector__header">
          <span className="eyebrow-dash" aria-hidden="true" />
          <div className="region-selector__eyebrow">НАПРАВЛЕНИЯ</div>

          <h2 id="region-selector-title" className="region-selector__title">
            Выберите регион экспедиции
          </h2>
        </header>

        <div className="region-row">
          {regions.map((region) => {
            const MapComp = region.Map;
            return (
              <a
                key={region.id}
                href={`/expeditions?region=${region.id}`}
                className={`region-card region-card--${region.id}`}
              >
                <span className="region-card__num">{region.index}</span>

                <div className="region-card__map">
                  <MapComp className={`region-map region-map--${region.id}`} />
                </div>

                <h3 className="region-card__name">{region.title}</h3>
                <p className="region-card__desc">{region.desc}</p>

                <span className="region-card__arrow" aria-hidden="true">→</span>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}