export type MarketStat = {
  prefix: string;
  value: string;
  suffix: string;
  text: string;
};

export const marketReality = {
  eyebrow: '01 / MARKET REALITY',
  title: 'Новые точки на карте вашего бизнеса',
  description:
    'Тысячи бизнесменов ежегодно стремятся покорить новые горизонты — от соседнего региона до зарубежной страны. Ключ к успеху один — знание локальной специфики.',
  stats: [
    {
      prefix: '>',
      value: '60',
      suffix: '%',
      text: 'неудачных экспансий — из-за недостаточно глубокого анализа рынка',
    },
    {
      prefix: '',
      value: '50',
      suffix: '+',
      text: 'лояльных контактов — минимум для понимания специфики',
    },
    {
      prefix: '>',
      value: '40',
      suffix: '%',
      text: 'стартапов терпят провал из-за невостребованности продукта',
    },
  ] as MarketStat[],
};