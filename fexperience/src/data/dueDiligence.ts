// 🔹 РЕДАКТИРУЙТЕ ЗДЕСЬ — меняйте текст, иконки, порядок карточек
export type DueDiligenceItem = {
  text: string;           // Текст на карточке
  icon: string;           // Путь к иконке (например '/images/about/icons/safety.svg')
  iconWidth?: number;     // Ширина иконки в px (по умолчанию 92)
  iconHeight?: number;    // Высота иконки в px (по умолчанию 92)
  iconLeftOffset?: number; // Сдвиг иконки влево в px (по умолчанию -16)
};

export const dueDiligenceItems: DueDiligenceItem[] = [
  {
    text: 'Безопасность в стране',
    icon: '/images/about/icons/safety.svg',
    iconWidth: 76,
    iconHeight: 92,
    iconLeftOffset: -24,
  },
  {
    text: 'Деловой климат',
    icon: '/images/about/icons/business.svg',
    iconWidth: 121,
    iconHeight: 121,
    iconLeftOffset: -44,
  },
  {
    text: 'Регуляторная среда',
    icon: '/images/about/icons/regulatory.svg',
    iconWidth: 122,
    iconHeight: 90,
    iconLeftOffset: -44,
  },
  {
    text: 'Особенности логистики',
    icon: '/images/about/icons/logistics.svg',
    iconWidth: 76.69,
    iconHeight: 92.34,
    iconLeftOffset: -24,
  },
  {
    text: 'Реальный запрос бизнеса',
    icon: '/images/about/icons/request.svg',
    iconWidth: 103,
    iconHeight: 103,
    iconLeftOffset: -44,
  },
  {
    text: 'Культурные барьеры',
    icon: '/images/about/icons/culture.svg',
    iconWidth: 162,
    iconHeight: 107,
    iconLeftOffset: -64,
  },
  {
    text: 'Финансовая инфраструктура',
    icon: '/images/about/icons/finance.svg',
    iconWidth: 122,
    iconHeight: 122,
    iconLeftOffset: -40,
  },
  {
    text: 'Цифровизация экономики',
    icon: '/images/about/icons/staff.svg',
    iconWidth: 114,
    iconHeight: 114,
    iconLeftOffset: -36,
  },
  {
    text: 'Стоимость выхода на рынок',
    icon: '/images/about/icons/cost.svg',
    iconWidth: 167,
    iconHeight: 167,
    iconLeftOffset: -64,
  },
];
