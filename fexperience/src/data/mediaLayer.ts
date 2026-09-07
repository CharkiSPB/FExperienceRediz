export type MediaStat = {
  kicker: string;
  number: string;
  label: string;
  description: string;
};

export const mediaLayer = {
  title: 'Участники экспедиции в центре внимания',
  subtitle:
    'Экспедиция с Forbes — это не только новые контакты и опыт, но и персональное медийное сопровождение. Всё, что вы делаете в рамках экспедиции, получает продолжение в медиаполе Forbes и выходит на многомиллионную аудиторию.',
  stats: [
    {
      kicker: 'Журнал',
      number: '>1 МЛН',
      label: 'охват читателей',
      description: 'Специальная секция FExperience.',
    },
    {
      kicker: 'Сайт',
      number: '>10 МЛН',
      label: 'читателей в месяц',
      description:
        'Статья по итогам экспедиции на главной странице Forbes.',
    },
    {
      kicker: 'Видео',
      number: '>100 ТЫС',
      label: 'просмотров',
      description: 'Специальный видеоматериал на каналах Forbes.',
    },
  ] as MediaStat[],
};