export type PlatformPrinciple = {
  number: string;
  name: string;
  sub: string;
};

export const platformStatement = {
  eyebrow: '02 / FEXPERIENCE',
  statement:
    'FExperience — специальный проект команды Forbes, который поможет оценить готовность вашего бизнеса к масштабированию, раскрыв основные риски и возможности экспансии.',
  subText:
    'Мы предлагаем авторские маршруты уникальных бизнес-экспедиций и собственный независимый дью-дилидженс.',
  principles: [
    { number: '01', name: 'АНАЛИТИКА', sub: 'рынка' },
    { number: '02', name: 'НАДЕЖНОСТЬ', sub: 'партнеров' },
    { number: '03', name: 'ПРОВЕРКА', sub: 'product-market fit' },
  ] as PlatformPrinciple[],
  cta: 'Участвовать в экспедиции',
};