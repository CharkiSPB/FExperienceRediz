import { Partner } from '@/types/partner';

export const partners: Partner[] = [
  {
    name: 'Лого',
    logo: '/images/partners/tochka.png',
    website: 'https://forbes.ru',
    description: 'Лучший журнал',
    headerLabel: 'Партнёр:',
    mainLabel: 'Генеральный партнер:',
    role: 'general',
  },
] as const;