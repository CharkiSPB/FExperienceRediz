// Редакционный контент детальной страницы экспедиции (редизайн: detailed_expedition_page_redesign.md).
// Композиция: HERO (с glass map) → КОНТЕКСТ РЫНКА → МАРШРУТ → ОПЫТ → ПРОГРАММА → ЛЮДИ → РЕЗУЛЬТАТ → ТАЙМЕР → FINAL CTA.
// Данные для шаблона «Активна». Для «Скоро» / «Завершена» страница использует описание и recap.

export type EditorialShot = {
  src: string;
  caption: string;
  variant: 'main' | 'small' | 'wide';
};

export type EditorialRouteStop = {
  name: string;
  city: string;
  description: string;
};

export type ExpeditionEditorial = {
  heroPitch: string;
  context: {
    eyebrow: string;
    headline: string;
    paragraphs: string[];
    photo: string;
    fact?: { value: string; label: string };
  };
  route: {
    eyebrow: string;
    headline: string;
    text: string;
    stops: EditorialRouteStop[];
  };
  experience: {
    eyebrow: string;
    headline: string;
    text: string;
    shots: EditorialShot[];
  };
  result: {
    eyebrow: string;
    headline: string;
    numbers: { value: string; label: string }[];
    statements: string[];
  };
  finalCta: {
    eyebrow: string;
    headline: string;
    text: string;
  };
};

export const expeditionEditorial: Record<string, ExpeditionEditorial> = {
  'south-africa': {
    heroPitch:
      'ЮАР — крупнейшая экономика континента и точка входа в Африку: энергетика, агропром и банковский сектор Западного Кейпа.',
    context: {
      eyebrow: 'Контекст рынка',
      headline: 'Почему ЮАР',
      paragraphs: [
        'Южно-Африканская Республика остаётся крупнейшей экономикой Африки и главным транспортно-логистическим узлом континента. Кейптаун и Стелленбос концентрируют банковский сектор, экспортно-ориентированное производство и предпринимательские сообщества, с которыми мы встретимся лично.',
        'Для российского бизнеса это точка входа в Африку: от регуляторики и ВЭД до прямых переговоров с локальными партнёрами, торговыми палатами и представителями государства.',
      ],
      photo: '/images/program/UarDay2.webp',
      fact: { value: '5', label: 'рабочих дней деловой программы' },
    },
    route: {
      eyebrow: 'Маршрут',
      headline: 'География экспедиции',
      text: 'От Кейптауна через винодельческую провинцию до мыса Доброй Надежды — маршрут выстроен так, чтобы каждый день добавлял к деловой программе ещё один слой понимания рынка.',
      stops: [
        { name: '01', city: 'Кейптаун', description: 'Вход в рынок: деловой ландшафт Западного Кейпа, банковский и юридический сектор.' },
        { name: '02', city: 'Стелленбос', description: 'Стелленбошский университет и предпринимательские экосистемы региона.' },
        { name: '03', city: 'Babylonstoren', description: 'Историческая усадьба как международный бизнес премиального уровня.' },
        { name: '04', city: 'Мыс Доброй Надежды', description: 'Культурный контекст и закрытие программы.' },
      ],
    },
    experience: {
      eyebrow: 'Опыт экспедиции',
      headline: 'Что вы увидите и с кем встретитесь',
      text: 'Программа построена вокруг живых встреч: с экспертами, локальными предпринимателями и представителями государства — без туристического балласта.',
      shots: [
        { src: '/images/program/UarDay3.webp', caption: 'Стелленбошский университет', variant: 'main' },
        { src: '/images/program/UarDay4.webp', caption: 'Локальное предприятие и Кейптаун', variant: 'small' },
        { src: '/images/program/south-africa-day2.1.webp', caption: 'Babylonstoren — «Говорят местные»', variant: 'small' },
        { src: '/images/program/UarDay6.webp', caption: 'Мыс Доброй Надежды', variant: 'wide' },
      ],
    },
    result: {
      eyebrow: 'Результат',
      headline: 'Что вы увезёте с собой',
      numbers: [
        { value: '15–30', label: 'предпринимателей в группе' },
        { value: '9', label: 'локальных экспертов и спикеров' },
        { value: '6', label: 'дней полного погружения' },
      ],
      statements: [
        'Новые деловые контакты и партнёрства',
        'Понимание локального рынка и регуляторики',
        'Проверенные гипотезы входа на рынок',
        'Доступ к предпринимательскому сообществу ЮАР',
      ],
    },
    finalCta: {
      eyebrow: 'Присоединяйтесь',
      headline: 'Стать участником экспедиции',
      text: 'Оставьте заявку — команда FExperience свяжется с вами в течение суток и расскажет об условиях участия.',
    },
  },
  vietnam: {
    heroPitch:
      'Вьетнам — одна из самых динамичных экономик Юго-Восточной Азии: промышленность, логистика и растущий внутренний рынок.',
    context: {
      eyebrow: 'Контекст рынка',
      headline: 'Почему Вьетнам',
      paragraphs: [
        'Поездка во Вьетнам — это возможность погрузиться в один из самых динамичных рынков Юго-Восточной Азии. За пять дней вы проведёте деловые встречи с представителями торговых палат, локальными производителями и дистрибьюторами.',
        'Вы узнаете о регуляторных особенностях ведения бизнеса, построите контакты для долгосрочного партнёрства и увидите страну изнутри — от Ханоля до Хошимина.',
      ],
      photo: '/images/program/vietnam-day2.jpg',
      fact: { value: '6', label: 'рабочих дней деловой программы' },
    },
    route: {
      eyebrow: 'Маршрут',
      headline: 'География экспедиции',
      text: 'С севера на юг: от политической и деловой столицы Ханоля до коммерческого центра Хошимина — два экономических полюса страны в одной программе.',
      stops: [
        { name: '01', city: 'Ханой', description: 'Прибытие, welcome-брифинг и обзор рынка Вьетнама.' },
        { name: '02', city: 'Промышленный пояс', description: 'Деловая среда, логистические цепочки и погружение в культуру.' },
        { name: '03', city: 'Хошимин', description: 'Бизнес-сессия и модели экономического роста юга.' },
        { name: '04', city: 'Хошимин', description: 'Кейсы, нетворкинг и завершение программы.' },
      ],
    },
    experience: {
      eyebrow: 'Опыт экспедиции',
      headline: 'Что вы увидите и с кем встретитесь',
      text: 'Живые встречи с локальным бизнесом и представителями РФ на рынке — от производств до торговых палат.',
      shots: [
        { src: '/images/program/vietnam-day3.jpg', caption: 'Особенности деловой среды', variant: 'main' },
        { src: '/images/program/vietnam-day4.jpg', caption: 'Перелёт в Хошимин', variant: 'small' },
        { src: '/images/program/vietnam-day5.jpg', caption: 'Кейсы и культурное погружение', variant: 'small' },
        { src: '/images/program/vietnam-day6.jpg', caption: 'Нетворкинг и завершение', variant: 'wide' },
      ],
    },
    result: {
      eyebrow: 'Результат',
      headline: 'Что вы увезёте с собой',
      numbers: [
        { value: '15–30', label: 'предпринимателей в группе' },
        { value: '6', label: 'дней полного погружения' },
        { value: '2', label: 'экономических центра страны' },
      ],
      statements: [
        'Контакты с торговыми палатами и производителями',
        'Понимание регуляторных особенностей рынка',
        'Проверенные гипотезы для партнёрства',
        'Стратегия выхода на рынок Юго-Восточной Азии',
      ],
    },
    finalCta: {
      eyebrow: 'Присоединяйтесь',
      headline: 'Стать участником экспедиции',
      text: 'Оставьте заявку — команда FExperience свяжется с вами в течение суток и расскажет об условиях участия.',
    },
  },
};