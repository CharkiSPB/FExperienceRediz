import type { ExpeditionRegion } from '@/types/expedition';

export type MarketRegion = {
  id: ExpeditionRegion;
  label: string;
};

export type MarketPoint = {
  id: string;
  label: string;
  x: number;
  y: number;
  status?: 'active' | 'soon' | 'completed';
};

export type Region = {
  id: ExpeditionRegion;
  index: string;
  label: string;
  directionCount: number;
  mapAsset: string;
  markets: MarketPoint[];
};

export const regions: readonly Region[] = [
  {
    id: 'africa',
    index: '01',
    label: 'Африка',
    directionCount: 3,
    mapAsset: '/maps/continents/africa.svg',
    markets: [
      { id: 'south-africa', label: 'ЮАР', x: 63.14, y: 73.24, status: 'active' },
      { id: 'morocco', label: 'Марокко', x: 45.47, y: 16.15, status: 'completed' },
      { id: 'kenya', label: 'Кения', x: 74.99, y: 53.29, status: 'active' },
    ],
  },
  {
    id: 'asia',
    index: '02',
    label: 'Азия',
    directionCount: 4,
    mapAsset: '/maps/continents/asia.svg',
    markets: [
      { id: 'vietnam', label: 'Вьетнам', x: 74.35, y: 48.13, status: 'active' },
      { id: 'india', label: 'Индия', x: 58.17, y: 50.06, status: 'active' },
      { id: 'thailand', label: 'Таиланд', x: 73.26, y: 50.58, status: 'active' },
      { id: 'indonesia', label: 'Индонезия', x: 78.06, y: 59.32, status: 'active' },
    ],
  },
  {
    id: 'latam',
    index: '03',
    label: 'Латинская Америка',
    directionCount: 1,
    mapAsset: '/maps/continents/latam.svg',
    markets: [
      { id: 'brazil', label: 'Бразилия', x: 65.03, y: 49, status: 'soon' },
    ],
  },
  {
    id: 'russia',
    index: '04',
    label: 'Россия',
    directionCount: 1,
    mapAsset: '/maps/continents/russia.svg',
    markets: [
      { id: 'sakhalin', label: 'Сахалин', x: 76.35, y: 50.71, status: 'active' },
    ],
  },
];

export const continentalNavigation = {
  eyebrow: 'Рынки',
  title: 'Выберите регион',
  openLink: 'Смотреть направления',
};