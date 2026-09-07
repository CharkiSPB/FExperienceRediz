export type Speaker = {
  id: number;
  name: string;
  role: string;
  company: string;
  photo: string;
  photoAlt: string;
  bio: string;
  isTop: boolean;
  // highlight?: string;
  topic?: string;
  achievement?: string;
  forbesBadge?: string; // текст бейджа Forbes на фото (если не указан — не показывается)
  forbesLabel?: string; // текст подписи Forbes в карточке (если не указан — не показывается)
  isForbes?: boolean; // команда Forbes Russia — блок «Наши эксперты» на /about
  linkedin?: string; // ссылка LinkedIn (иконка только при наличии)
  expeditionSlugs?: string[]; // slug экспедиций (спикер может быть на нескольких)
  category?: 'business' | 'investment' | 'government' | 'africa' | 'other' | 'pravo';
  country?: string;
};

export const speakers: Speaker[] = [
  {
    id: 1, name: 'Тимоти ван Маасдайк', role: 'Логистический стратег по направлениям Африка-Россия', company: 'DAS GLOBAL LOGISTIK Africa', photo: '/images/speakers/timotyVan.jpg', photoAlt: 'Тимоти ван Маасдайк',
    bio: '', isTop: true, topic: '', achievement: 'DAS GLOBAL LOGISTIK Africa - business Partner, Alpha Shipping Services LLC - Founder, Clarion Shipping Services (Pty) Ltd - Founder',
    expeditionSlugs: ['south-africa'], category: 'business'
  },
  // {
  //   id: 2, name: 'Алексей Фролов', role: 'Владелец группы компаний Flash, инвестор, миллиардер, архитектор бизнес систем', company: 'Flash', photo: '/images/speakers/frolovA.jpeg', photoAlt: 'Алексей Фролов — Владелец группы компаний Flash',
  //   bio: '', isTop: true, topic: '', achievement: 'Построил самую крупную частную сеть автозаправок ( более 500 АЗС) и успешно ее продал, инвестировал $100+ млн в загородный отель Utkino Country House 5* площадью 494 гектара. Менее года назад основал мастермайнд для предпринимателей, которые хотят расти и развиваться  и для которых важно окружение.',
  //   expeditionSlugs: ['south-africa'], category: 'business'
  // },
  // {
  //   id: 3, name: 'Алексей Васильчук', role: 'Российский ресторатор, предприниматель', company: '«Чайхона №1», холдинг Vasilchuki Reastaurant Group', photo: '/images/speakers/vasilchukA.jpg', photoAlt: 'Алексей Васильчук',
  //   bio: '', isTop: false, topic: '', achievement: 'Российский ресторатор, предприниматель, сооснователь сети ресторанов «Чайхона №1» и ресторанного холдинга Vasilchuki Reastaurant Group.',
  //   expeditionSlugs: ['south-africa'], category: 'business'
  // },
  {
    id: 2, name: 'Денис Косьяненко', role: 'Руководитель отдела развития международного бизнеса с 2014 года.', company: 'DAS GLOBAL LOGISTIK', photo: '/images/speakers/kosianenkoD.jpg', photoAlt: 'Денис Косьяненко — Руководитель отдела развития международного бизнеса',
    bio: '', isTop: true, topic: '', achievement: 'Более 15 лет опыта работы в международных экспедиторских компаниях. За последние 10 лет работы только ТОП позиции. Руководитель отдела международных операций и проектной логистики. Успешный запуск региональных офисов и расширение филиальной сети в России. Развитие глобальной сети в более 108 стран по всему миру.',
    expeditionSlugs: ['south-africa'], category: 'africa'
  },
  {
    id: 3, name: 'Питер Магнер', role: 'Директор Iridium', company: 'Iridium', photo: '/images/speakers/magnerP.jpg', photoAlt: 'Питер Магнер — Директор Iridium',
    bio: '', isTop: false, topic: '', achievement: 'Директор Iridium. Практические опыт ведения бухгалтерии и налоговогой отчетности в ЮАР',
    expeditionSlugs: ['south-africa'], category: 'business'
  },
  {
    id: 4, name: 'Эйтан Стерн', role: 'CEO Legaleze', company: 'Legaleze', photo: '/images/speakers/sternI.jpg', photoAlt: 'Эйтан Стерн — CEO Legaleze',
    bio: '', isTop: true, topic: '', achievement: 'Право в ЮАР: корпоративные вопросы, юридическое сопровождение',
    expeditionSlugs: ['south-africa'], category: 'business'
  },
  {
    id: 5, name: 'Григорий Ханбекян', role: 'CEO Fordewind', company: 'Fordewind', photo: '/images/speakers/hanbekyanG.jpg', photoAlt: 'Григорий Ханбекян — CEO Fordewind',
    bio: '', isTop: false, topic: '', achievement: 'Запуск и сопровождение бизнеса в ЮАР: структурирование, лицензирование, локальное развитие.',
    expeditionSlugs: ['south-africa'], category: 'business'
  },
  {
    id: 6, name: 'Стэйси Батлер', role: 'Executive Head: Transactional Sales and Solutions', company: 'Standard Bank', photo: '/images/speakers/batlerS.jpg', photoAlt: 'Стэйси Батлер — Executive Head: Transactional Sales and Solutions',
    bio: '', isTop: true, topic: '', achievement: 'Крупнейший коммерческий банк ЮАР с более чем 160-летней историей.',
    expeditionSlugs: ['south-africa'], category: 'business'
  },
  {
    id: 7, name: 'Ник Фергюсон', role: 'Executive Managing Director, RSA Aero Limited', company: '', photo: '/images/speakers/fergusonN.jpg', photoAlt: 'Ник Фергюсон — Executive Managing Director, RSA Aero Limited',
    bio: '', isTop: true, topic: '', achievement: 'Девелопмент, недвижимость и инвестиционные проекты.',
    expeditionSlugs: ['south-africa'], category: 'investment'
  },
  {
    id: 8, name: 'Деон ван Зейл', role: 'Chairman, WCPDF', company: '', photo: '/images/speakers/zeilD.jpg', photoAlt: 'Деон ван Зейл — Chairman, WCPDF',
    bio: '', isTop: true, topic: '', achievement: 'Девелопмент, недвижимость и инвестиционные проекты.',
    expeditionSlugs: ['south-africa'], category: 'investment'
  },
  
  {
    id: 9, name: 'Дэн Плато', role: 'Бывший мэр Кейптауна, имеет прочные связи в сообществе', company: '', photo: '/images/speakers/platoD.jpg', photoAlt: 'Дэн Плато — Бывший мэр Кейптауна, имеет прочные связи в сообществе',
    bio: '', isTop: false, topic: '', achievement: '',
    expeditionSlugs: ['south-africa'], category: 'business'
  },
  {
    id: 10, name: 'Марина Матыцина', role: 'Генеральный директор Forbes Russia.', company: 'Forbes Russia', photo: '/images/speakers/MaticinaM.jpeg', photoAlt: 'Марина Матыцина — Генеральный директор Forbes Russia.',
    bio: '', isTop: true, topic: '', achievement: '',
    isForbes: true,
    forbesBadge: 'Forbes',
    forbesLabel: 'Forbes Russia',
    expeditionSlugs: ['south-africa', 'vietnam']
  },
  {
    id: 11, name: 'Денис Кошкин', role: 'Исполнительный директор Forbes Russia', company: 'Forbes Russia', photo: '/images/speakers/koshkinD1.webp', photoAlt: 'Денис Кошкин — Исполнительный директор Forbes Russia',
    bio: '', isTop: true, topic: '', achievement: '',
    isForbes: true,
    forbesBadge: 'Forbes',
    forbesLabel: 'Forbes Russia',
    expeditionSlugs: ['south-africa', 'vietnam']
  },
  {
    id: 12, name: 'Анастасия Никитина', role: 'Директор по устойчивому развитию и международным проектам Forbes Russia', company: 'Forbes', photo: '/images/speakers/nicitinaA.jpg', photoAlt: 'Анастасия Никитина — Директор по устойчивому развитию и международным проектам Forbes Russia',
    bio: '', isTop: true, topic: '', achievement: '',
    isForbes: true,
    forbesBadge: 'Forbes',
    forbesLabel: 'Forbes Russia',
    expeditionSlugs: ['south-africa', 'vietnam']
  },
  {
    id: 13, name: 'Фам Динь Юинь', role: 'Бизнес-консультант, предприниматель', company: '', photo: '/images/speakers/FamDin.jpg', photoAlt: 'Фам Динь Юинь — Бизнес-консультант, предприниматель',
    bio: '', isTop: true, topic: '', achievement: '',
    expeditionSlugs: ['vietnam']
  },
  {
    id: 14, name: 'Иван Щербаков', role: 'Инвестор. Серийный предприниматель. Co-founder премиального консьерж-сервиса Beyond.', company: '', photo: '/images/speakers/sherbakovI.jpg', photoAlt: 'Иван Щербаков — Инвестор. Серийный предприниматель',
    bio: '', isTop: true, topic: '', achievement: '',
    expeditionSlugs: ['south-africa'], category: 'africa'
  },
] as const;