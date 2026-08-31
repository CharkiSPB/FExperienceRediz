export type WhyVariant = 'featured' | 'image-label' | 'typographic' | 'image-glass' | 'signature';

export type WhyCompositionItem = {
  id: number;
  variant: WhyVariant;
  image?: string;
  alt?: string;
  full?: boolean;
};

export const whySection = {
  eyebrow: 'FEXPERIENCE',
  title: 'Почему FExperience',
};

export const whyComposition: WhyCompositionItem[] = [
  {
    id: 1,
    variant: 'featured',
    image: '/images/why/why-01-networking.webp',
    alt: 'Деловой нетворкинг на экспедиции FExperience',
  },
  {
    id: 2,
    variant: 'image-label',
    image: '/images/why/why-02-media.webp',
    alt: 'Публикации о партнёрах на площадках Forbes',
  },
  {
    id: 3,
    variant: 'image-label',
    image: '/images/why/why-03-expansion.webp',
    alt: 'Бизнес-экспедиция — выход на новый рынок',
  },
  {
    id: 4,
    variant: 'typographic',
  },
  {
    id: 5,
    variant: 'image-glass',
    image: '/images/why/why-05-analytics.webp',
    alt: 'Оценка бизнес-модели локальными экспертами',
  },
  {
    id: 6,
    variant: 'signature',
    image: '/images/why/why-06-culture.webp',
    alt: 'Культурное погружение в локальную среду',
    full: true,
  },
];