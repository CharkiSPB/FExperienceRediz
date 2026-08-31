// Координаты карты экспедиции (раздел 14.13 Build Spec).
// Все координаты — проценты (0–100) относительно карты континента,
// совпадают с координатной сеткой src/data/regions.ts.
// moscowEntry: точка входа линии перелёта за пределами карты (может быть <0 или >100).
// flightControlPoint: контрольная точка кривой Безье дуги перелёта.
// programCities: города программы — только шаблон «Активна».

export type MapPoint = { x: number; y: number };
export type MapPointLabel = MapPoint & { label?: string };
export type MapCity = MapPoint & { name: string };

export type ExpeditionMapData = {
  continent: 'africa' | 'asia' | 'latam' | 'russia';
  // Естественное соотношение сторон SVG континента (ширина/высота),
  // задаёт контейнеру ту же пропорцию, чтобы координаты ложились точно.
  aspect: number;
  activePoint: MapPointLabel;
  moscowEntry: MapPoint;
  flightControlPoint: MapPoint;
  programCities?: MapCity[];
};

export const expeditionMapPoints: Record<string, ExpeditionMapData> = {
  'south-africa': {
    continent: 'africa',
    aspect: 7425.8 / 7794.3,
    activePoint: { x: 63.14, y: 73.24, label: 'ЮАР · Кейптаун' },
    moscowEntry: { x: 10, y: -6 },
    flightControlPoint: { x: 28, y: 30 },
    programCities: [
      { x: 63.14, y: 73.24, name: 'Кейптаун' },
      { x: 66, y: 70, name: 'Стелленбос' },
      { x: 61, y: 77, name: 'Мыс Доброй Надежды' },
    ],
  },
  vietnam: {
    continent: 'asia',
    aspect: 13633.8 / 7100.4,
    activePoint: { x: 74.35, y: 48.13, label: 'Вьетнам · Хошимин' },
    moscowEntry: { x: 30, y: -6 },
    flightControlPoint: { x: 55, y: 12 },
    programCities: [
      { x: 74.35, y: 48.13, name: 'Хошимин' },
      { x: 70.5, y: 41, name: 'Ханой' },
    ],
  },
  india: {
    continent: 'asia',
    aspect: 13633.8 / 7100.4,
    activePoint: { x: 58.17, y: 50.06, label: 'Индия · Нью-Дели' },
    moscowEntry: { x: 48, y: -6 },
    flightControlPoint: { x: 44, y: 18 },
    programCities: [],
  },
  brazil: {
    continent: 'latam',
    aspect: 5041.2 / 7349.3,
    activePoint: { x: 65.03, y: 49, label: 'Бразилия · Сан-Паулу' },
    moscowEntry: { x: 106, y: 12 },
    flightControlPoint: { x: 80, y: 24 },
    programCities: [],
  },
  kenya: {
    continent: 'africa',
    aspect: 7425.8 / 7794.3,
    activePoint: { x: 74.99, y: 53.29, label: 'Кения · Найроби' },
    moscowEntry: { x: 55, y: -6 },
    flightControlPoint: { x: 62, y: 15 },
    programCities: [],
  },
  morocco: {
    continent: 'africa',
    aspect: 7425.8 / 7794.3,
    activePoint: { x: 45.47, y: 16.15, label: 'Марокко · Касабланка' },
    moscowEntry: { x: 25, y: -6 },
    flightControlPoint: { x: 28, y: 8 },
    programCities: [],
  },
  sakhalin: {
    continent: 'russia',
    aspect: 18407.5 / 4330.6,
    activePoint: { x: 76.35, y: 50.71, label: 'Сахалин · Южно-Сахалинск' },
    moscowEntry: { x: -8, y: 45 },
    flightControlPoint: { x: 35, y: 28 },
    programCities: [],
  },
  thailand: {
    continent: 'asia',
    aspect: 13633.8 / 7100.4,
    activePoint: { x: 73.26, y: 50.58, label: 'Таиланд · Бангкок' },
    moscowEntry: { x: 30, y: -6 },
    flightControlPoint: { x: 52, y: 15 },
    programCities: [],
  },
  indonesia: {
    continent: 'asia',
    aspect: 13633.8 / 7100.4,
    activePoint: { x: 78.06, y: 59.32, label: 'Индонезия · Джакарта' },
    moscowEntry: { x: 30, y: -6 },
    flightControlPoint: { x: 55, y: 18 },
    programCities: [],
  },
};