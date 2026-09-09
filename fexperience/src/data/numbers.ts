export type NumberRow = {
  value?: number;
  suffix?: string;
  suffixLines?: string[];
  prefix?: string;
  textLine1?: string;
  textLine2?: string;
  isTextOnly?: boolean;
  textOnlyContent?: string;
};

export type NumberCard = {
  id: number;
  title: string;
  rows: NumberRow[];
};

export const numbers: NumberCard[] = [
  {
    id: 1,
    title: 'ПРОГРАММА',
    rows: [
      { value: 70, suffix: '%', textLine1: 'деловая', textLine2: 'часть' },
      { value: 30, suffix: '%', textLine1: 'культурное', textLine2: 'погружение' },
    ],
  },
  {
    id: 2,
    title: 'СПИКЕРЫ',
    rows: [
      { 
        value: 70, 
        suffix: '%', 
        textLine1: 'локальный', 
        textLine2: 'бизнес-истеблишмент' 
      },
      { 
        value: 20, 
        suffix: '%', 
        textLine1: 'представительства', 
        textLine2: 'российских компаний' 
      },
      { 
        value: 10, 
        suffix: '%', 
        textLine1: 'госорганы, регуляторы', 
        textLine2: 'торговая палата' 
      },
    ],
  },
  {
    id: 3,
    title: 'УЧАСТНИКИ',
    rows: [
      { 
        value: 1, 
        prefix: '>', 
        suffixLines: ['МЛРД', 'РУБ'], 
        textLine1: 'годовой', 
        textLine2: 'оборот' 
      },
      { 
        isTextOnly: true, 
        textOnlyContent: 'НЕТВОРКИНГ', 
        textLine1: 'на уровне', 
        textLine2: 'первых лиц' 
      },
    ],
  },
] as const;