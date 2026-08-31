export type RelevanceItem = {
  id: number;
  value: string;      // Числовое значение для анимации (без префиксов/суффиксов)
  displayValue: string; // Визуальное представление (напр. "> 60%")
  text: string;
  typewriterLabel: string;
};

export const relevanceItems: RelevanceItem[] = [
  {
    id: 1,
    value: '60',
    displayValue: '> 60%',
    text: 'неудачных экспансий - из-за недостаточно глубокого анализа рынка',
    typewriterLabel: 'АНАЛИТИКА РЫНКА',
  },
  {
    id: 2,
    value: '50',
    displayValue: '50',
    text: 'локальных контактов - минимум для понимания специфики и принятия решения о старте',
    typewriterLabel: 'НАДЕЖНЫЕ ПАРТНЕРЫ',
  },
  {
    id: 3,
    value: '40',
    displayValue: '~ 40%',
    text: 'стартапов терпят провал из-за невостребованности продукта на рынке',
    typewriterLabel: 'ПРОВЕРКА PRODUCT-MARKET FIT',
  },
  // {
  //   id: 4,
  //   value: '20',
  //   displayValue: '20%',
  //   text: 'Прирост клиентской базы благодаря участию в бизнес-экспедиции',
  // },
] as const;