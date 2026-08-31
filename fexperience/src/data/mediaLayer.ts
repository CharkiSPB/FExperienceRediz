export type MediaStat = {
  number: string;
  label: string;
  description: string;
};

export const mediaLayer = {
  title: 'Участники экспедиции в центре внимания',
  subtitle:
    'Экспедиция с Forbes — это не только новые контакты и опыт, но и персональное медийное сопровождение.',
  stats: [
    {
      number: '>1 МЛН',
      label: 'охват читателей',
      description: 'Специальная секция FExperience.',
    },
    {
      number: '>10 МЛН',
      label: 'читателей в месяц',
      description:
        'Статья по итогам экспедиции на главной странице Forbes.',
    },
    {
      number: '>100 ТЫС',
      label: 'просмотров',
      description: 'Специальный видеоматериал на каналах Forbes.',
    },
  ] as MediaStat[],
};