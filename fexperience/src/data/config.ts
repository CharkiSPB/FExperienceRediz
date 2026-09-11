import { SiteConfig } from '@/types/config';

export const config: SiteConfig = {
  site: {
    name: 'FExperience',
    url: 'https://fexperience.ru',
    description: 'Бизнес-экспедиции с Forbes',
  },
  partnerBlock: {
    enabled: true,
    headerVisible: true,
    pageVisible: true,
    pagePosition: 'after-hero',
  },
  timer: {
    enabled: true,
    targetDate: '2026-10-11T00:00:00Z',
    label: 'До старта экспедиции во Вьетнам',
  },
  faqPreview: { showCount: 5 },
  map: { activeExpedition: 'vietnam' },
  hero: {
    teamProject: {
      enabled: true,
      label: 'Проект команды:',
      logo: '/images/partners/team-logo.svg',
      website: 'https://forbes.ru',
    },
  },
  header: {
    slogan: 'Новые точки на карте вашего бизнеса',
    phone: '+7 (900) 190-90-03',
    partnerLogo: {
      enabled: true,
      src: '/images/partners/tochka.png',
      alt: 'Лого — генеральный партнёр',
      url: 'https://tochka.com',
    },
  },
  social: {
    telegram: 'https://t.me/fexperience',
    whatsapp: 'https://wa.me/79001909003',
    max: '#',
  },
} as const;