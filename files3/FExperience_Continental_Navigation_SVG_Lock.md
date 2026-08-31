# FExperience — Continental Navigation / Real SVG Markets Lock

## 0. STATUS ДОКУМЕНТА

Этот документ является **точной инструкцией для реализации блока Continental Navigation на Homepage**.



### Главная идея

Блок должен показывать не четыре обычные UI-карточки и не декоративную карту.

Он должен ощущаться как:

> **editorial geographic navigation: реальные контуры регионов + реальные точки направлений + типографика FExperience + очень деликатное Liquid Glass.**

### Критическое изменение относительно предыдущей версии

**Route lines / маршрутные линии на Homepage полностью отменены.**

Не реализовывать:
- `regionRoute`;
- `route-line`;
- SVG paths между странами;
- flight-tracker визуал;
- пунктирные маршруты;
- самолётики;
- GPS-style UI.

Маршрутная логика остаётся только там, где она уже предусмотрена для конкретной экспедиции через `MapContinent`.

---

# 1. ЧТО ИМЕННО НУЖНО ПОЛУЧИТЬ

На Homepage есть раздел:

```text
РЫНКИ

Выберите регион
```

Под ним располагаются четыре региональные области:

```text
01                         02
Африка                     Азия
3 направления              5 направлений
Смотреть направления →     Смотреть направления →

       [REAL SVG]                 [REAL SVG]
          ●                          ●
      ●        ●                 ●      ●


03                         04
Латинская Америка          Россия
1 направление              1 направление
Смотреть направления →     Смотреть направления →

       [REAL SVG]                 [REAL SVG]
           ●                           ●
```

Но это **не четыре одинаковых карточки**.

Вся секция должна восприниматься как одна большая editorial-композиция.

---

# 2. ОСНОВНОЙ ВИЗУАЛЬНЫЙ ПРИНЦИП

Каждый регион состоит из пяти элементов:

```text
REAL GEOGRAPHIC SVG
        +
REAL MARKET DOTS
        +
EDITORIAL TYPOGRAPHY
        +
SUBTLE GLASS / WARM SURFACE
        +
REGION LINK
```

### Не добавлять ничего сверх этого без необходимости.

Особенно не добавлять:
- декоративные линии;
- лишние badges;
- дополнительные CTA;
- искусственные диаграммы;
- процентные индикаторы;
- случайные декоративные точки;
- абстрактные геометрические формы.

---

# 3. ГЕОГРАФИЯ — САМЫЙ ВАЖНЫЙ LOCK

## 3.1. Только реальные SVG

Использовать реальные географические контуры.

Локальные assets:

```text
/public/maps/continents/
  africa.svg
  asia.svg
  latam.svg
  russia.svg
```

Названия файлов можно адаптировать к существующей структуре проекта, но принцип не менять:

**каждый регион получает отдельный локальный SVG.**

---

## 3.2. Что запрещено

Нельзя:

```text
AI-generated continent
CSS blob
abstract shape
generic world-map icon
random outline
decorative organic shape
PNG вместо SVG
```

Нельзя просить AI:

> «нарисуй красивый контур Африки»

и использовать результат как географический источник.

AI может стилизовать уже существующий SVG, но **не должен придумывать его геометрию**.

---

## 3.3. Геометрия должна быть узнаваемой

Пользователь должен сразу понимать:

```text
это Африка
это Азия
это Латинская Америка
это Россия
```

Если при уменьшении текста регион невозможно узнать по силуэту — SVG выбран или масштабирован неправильно.

---

# 4. РЕГИОНЫ

Использовать четыре существующих региона:

```ts
export const regions = [
  {
    id: 'africa',
    label: 'Африка',
    directionCount: 3,
    mapAsset: '/maps/continents/africa.svg',
  },
  {
    id: 'asia',
    label: 'Азия',
    directionCount: 5,
    mapAsset: '/maps/continents/asia.svg',
  },
  {
    id: 'latam',
    label: 'Латинская Америка',
    directionCount: 1,
    mapAsset: '/maps/continents/latam.svg',
  },
  {
    id: 'russia',
    label: 'Россия',
    directionCount: 1,
    mapAsset: '/maps/continents/russia.svg',
  },
] as const
```

**Не менять данные самостоятельно.**

Если в существующем проекте эти данные уже находятся в другом объекте или файле, использовать существующий Source of Truth, а не создавать второй набор данных.

---

# 5. MARKET POINTS — ЧТО ОНИ ОЗНАЧАЮТ

Оранжевая точка на SVG означает:

> **существующее направление / страну экспедиции внутри данного региона.**

Это не декоративный элемент.

Поэтому точка должна находиться географически правильно.

---

## 5.1. Структура данных

```ts
type MarketPoint = {
  id: string
  label: string
  x: number
  y: number
  status?: 'active' | 'soon' | 'completed'
}

type Region = {
  id: string
  label: string
  directionCount: number
  mapAsset: string
  markets: MarketPoint[]
}
```

`x` и `y` — координаты относительно области SVG.

Например:

```ts
markets: [
  {
    id: 'south-africa',
    label: 'ЮАР',
    x: 72,
    y: 82,
    status: 'active',
  },
]
```

**Не копировать эти координаты буквально, если реальный SVG имеет другую viewBox.**

Сначала определить геометрию конкретного SVG, затем поставить точки.

---

# 6. ГЕОГРАФИЧЕСКИЕ ТОЧКИ

Использовать существующие направления проекта.

В предыдущей версии зафиксирована следующая логика:

### Африка

```text
ЮАР
Марокко
Кения
```

### Азия

```text
Вьетнам
Индия
Таиланд
Индонезия
```

### Латинская Америка

```text
Бразилия
```

### Россия

```text
Сахалин
```

Если в текущем Spec/source of truth проекта названия или статусы отличаются, **приоритет имеет текущий Source of Truth проекта**.

Не придумывать новые направления.

---

# 7. КАК ДОЛЖНЫ ВЫГЛЯДЕТЬ ТОЧКИ

Default:

```css
.marketPoint {
  position: absolute;

  width: 8px;
  height: 8px;

  border-radius: 50%;

  background: #FF6B2C;

  transform: translate(-50%, -50%);

  z-index: 3;

  box-shadow: none;
}
```

Точка должна быть:

- маленькой;
- оранжевой;
- чёткой;
- без glow;
- без пульсации;
- без кольца;
- без иконки.

---

## 7.1. Статусы

Если проект уже использует статусы, допускается:

```css
.marketPoint[data-status="active"] {
  background: #FF6B2C;
}

.marketPoint[data-status="soon"] {
  background: #FFB089;
}

.marketPoint[data-status="completed"] {
  background: #FF8A54;
}
```

Но если визуальная разница статусов не нужна в существующей системе, **все точки могут оставаться одним фирменным orange**.

Не вводить новую сложную систему цветов самостоятельно.

---

# 8. HOVER ДЛЯ ТОЧКИ

Hover должен быть минимальным.

Допустимо:

```css
.marketPoint {
  transition: transform 180ms ease;
}

.regionCard:hover .marketPoint {
  /* никаких массовых animations */
}

.marketPoint:hover {
  transform: translate(-50%, -50%) scale(1.25);
}
```

Если точка находится под декоративным слоем и не является отдельным интерактивным элементом, hover можно вообще не делать.

**Не использовать:**

```css
box-shadow: 0 0 20px orange;
animation: pulse ...
```

---

# 9. SVG КАК ВИЗУАЛЬНЫЙ ОБЪЕКТ

Контур должен быть большим.

Он не должен выглядеть как маленькая иконка справа от текста.

Неправильно:

```text
Африка

3 направления                    маленькая Африка
```

Правильно:

```text
Африка                         ╭──────────╮
3 направления                 │  AFRICA   │
                              │     ●     │
Смотреть направления →        │ ●      ●  │
                              ╰──────────╯
```

---

# 10. РАЗМЕР SVG

Базовая реализация:

```css
.regionMap {
  position: absolute;

  width: 48%;
  height: 82%;

  right: 4%;
  top: 9%;

  display: flex;
  align-items: center;
  justify-content: center;

  pointer-events: none;

  z-index: 0;
}

.regionMap img,
.regionMap svg {
  width: 100%;
  height: 100%;

  object-fit: contain;
  object-position: center;
}
```

SVG должен занимать ориентировочно:

```text
40–55% ширины региональной области
70–90% её высоты
```

Но это не абсолютное число.

Форма конкретного континента имеет приоритет.

---

# 11. ИНДИВИДУАЛЬНЫЙ SCALE ДЛЯ РЕГИОНОВ

Не заставлять четыре разных географических формы иметь одинаковый размер.

Допускается:

```css
.regionCard--africa .regionMap {
  height: 78%;
  width: 44%;
}

.regionCard--asia .regionMap {
  width: 54%;
  height: 76%;
}

.regionCard--latam .regionMap {
  width: 42%;
  height: 88%;
}

.regionCard--russia .regionMap {
  width: 56%;
  height: 72%;
}
```

Причина:

**разные реальные формы имеют разные пропорции.**

Это не декоративная вариативность.

---

# 12. SVG STYLE

Контур должен быть очень тонким и тёплым.

Рекомендуемая основа:

```css
.regionMap path {
  fill: rgba(255, 190, 155, 0.045);
  stroke: rgba(224, 116, 75, 0.28);
  stroke-width: 1.5;

  vector-effect: non-scaling-stroke;
}
```

Если SVG используется через `<img>`, цвет должен быть задан внутри самого SVG.

---

# 13. SVG НЕ ДОЛЖЕН БЫТЬ СЛИШКОМ БЛЕДНЫМ

На предыдущем варианте карта практически исчезла.

Цель:

```text
фон
████████████████

      очень тонкий,
      но реально
      различимый
      контур
```

Контур не должен:
- конкурировать с заголовком;
- быть главным акцентом;
- исчезать при первом взгляде.

Он должен считываться на втором уровне.

---

# 14. SVG НЕ ДОЛЖЕН БЫТЬ ТЁМНЫМ

Не использовать:

```css
stroke: #111;
```

или:

```css
stroke: #000;
```

Не превращать карту в техническую инфографику.

Стиль должен оставаться:

```text
warm
editorial
premium
minimal
```

---

# 15. ТЕКСТОВАЯ КОМПОЗИЦИЯ

Текст должен находиться поверх/рядом с картой, но карта не должна перекрывать текст.

Структура:

```tsx
<div className="regionContent">
  <span className="regionIndex">
    01
  </span>

  <h3 className="regionTitle">
    Африка
  </h3>

  <p className="regionMeta">
    3 направления
  </p>

  <a
    className="regionLink"
    href="/expeditions?region=africa"
  >
    Смотреть направления
    <span aria-hidden="true">→</span>
  </a>
</div>
```

---

# 16. ТИПОГРАФИКА

Использовать существующую систему проекта:

```css
.regionIndex {
  font-family: "HelveticaNeueCyr", sans-serif;
  font-size: 13px;
  letter-spacing: 0.08em;
  color: rgba(23, 20, 17, 0.45);
}

.regionTitle {
  font-family: "Playfair Display", serif;
  font-weight: 600;
  font-size: clamp(34px, 3vw, 48px);
  line-height: 0.98;
  letter-spacing: -0.025em;
  color: #171411;
}

.regionMeta {
  font-family: "HelveticaNeueCyr", sans-serif;
  font-size: 15px;
  line-height: 1.4;
  color: rgba(23, 20, 17, 0.60);
}

.regionLink {
  font-family: "HelveticaNeueCyr", sans-serif;
  font-size: 15px;
  font-weight: 500;
  color: #171411;
}
```

Не менять шрифтовую пару.

---

# 17. GLASS — ОЧЕНЬ ДЕЛИКАТНО

Главная ошибка — делать четыре одинаковых белых карточки.

Glass здесь должен быть почти физической поверхностью, а не стандартным UI-component.

Допустимо:

```css
.regionCard {
  background:
    linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.34),
      rgba(255, 248, 240, 0.18)
    );

  backdrop-filter: blur(12px) saturate(105%);
  -webkit-backdrop-filter: blur(12px) saturate(105%);

  border: 1px solid rgba(255, 255, 255, 0.38);

  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.45);
}
```

Glass должен:
- слегка отделять область;
- сохранять видимость карты;
- не превращать секцию в white bento;
- не перекрывать SVG.

---

# 18. НЕ НУЖНО ЧЕТЫРЕХ ОДИНАКОВЫХ BENTO CARDS

Если текущая структура использует:

```css
grid-template-columns: repeat(2, 1fr);
```

это допустимо.

Но визуально:

**не делать одинаковые floating cards с одинаковым border-radius, одинаковой тенью и одинаковой внутренней сеткой.**

Предпочтительная композиция:

```css
.continentalGrid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
}
```

А разделение сделать тонкими editorial borders:

```css
.regionCard {
  position: relative;
  min-height: 330px;
  padding: 34px;
}

.regionCard:nth-child(odd) {
  border-right: 1px solid rgba(80, 50, 35, 0.08);
}

.regionCard:nth-child(-n + 2) {
  border-bottom: 1px solid rgba(80, 50, 35, 0.08);
}
```

Если существующая композиция сайта уже использует другой grid, не ломать её без необходимости.

---

# 19. ОБЩИЙ BACKGROUND

Секция должна продолжать тёплый визуальный язык сайта.

Не возвращать холодный белый фон.

Допустимый базовый фон:

```css
.continentalNavigation {
  background:
    linear-gradient(
      135deg,
      #FFF4EC 0%,
      #FFE9DC 48%,
      #FFF7F1 100%
    );
}
```

Если в существующем design system уже есть утверждённый тёплый градиент, использовать именно его.

Не создавать второй независимый gradient token.

---

# 20. ИЕРАРХИЯ

Правильная иерархия:

```text
1. Section title
2. Region title
3. Real continent silhouette
4. Orange market points
5. Region metadata
6. Link
```

Но SVG и typography должны работать вместе.

Ни один элемент не должен визуально «кричать».

---

# 21. НИКАКИХ ROUTE LINES

Это отдельный абсолютный lock.

Не создавать:

```tsx
<svg className="regionRoute">
```

Не создавать:

```css
.regionRoute {}
```

Не создавать:

```css
.regionRoute path {}
```

Не использовать:

```css
stroke-dasharray
```

для изображения маршрута.

Не использовать:

```text
M...
C...
S...
```

как декоративный маршрут между market points.

**Market points — да. Route line — нет.**

---

# 22. REACT STRUCTURE

Рекомендуемая структура:

```tsx
<article className={`regionCard regionCard--${region.id}`}>
  <div className="regionMap" aria-hidden="true">
    <img
      src={region.mapAsset}
      alt=""
    />
  </div>

  <div className="marketPoints" aria-hidden="true">
    {region.markets.map((market) => (
      <span
        key={market.id}
        className="marketPoint"
        data-status={market.status}
        style={{
          left: `${market.x}%`,
          top: `${market.y}%`,
        }}
      />
    ))}
  </div>

  <div className="regionContent">
    <span className="regionIndex">
      {region.index}
    </span>

    <h3 className="regionTitle">
      {region.label}
    </h3>

    <p className="regionMeta">
      {region.directionCount} направления
    </p>

    <a
      className="regionLink"
      href={`/expeditions?region=${region.id}`}
    >
      Смотреть направления
      <span aria-hidden="true">→</span>
    </a>
  </div>
</article>
```

---

# 23. ВАЖНО: MARKET POINTS ДОЛЖНЫ БЫТЬ ПРИВЯЗАНЫ К SVG

Если SVG меняет aspect ratio, нельзя оставлять точки в случайных абсолютных координатах.

Лучше использовать SVG с предсказуемой `viewBox`.

Например:

```xml
<svg
  viewBox="0 0 1000 700"
  preserveAspectRatio="xMidYMid meet"
>
```

И использовать одну систему координат.

Если используются HTML `%`-координаты поверх `<img>`, проверить визуально каждую точку.

---

# 24. ЕСЛИ НУЖНА МАКСИМАЛЬНАЯ ТОЧНОСТЬ

Предпочтительный вариант — хранить точки в координатах исходного SVG:

```ts
type SvgMarketPoint = {
  id: string
  label: string
  x: number
  y: number
}
```

А затем преобразовывать их в экранные координаты через одну систему `viewBox`.

Если это усложняет реализацию для текущего проекта, допускается `%`-позиционирование поверх SVG, но оно должно быть проверено на desktop и mobile.

---

# 25. HOVER КАРТЫ

Hover должен быть очень спокойным.

Допустимо:

```css
.regionMap img {
  transition:
    opacity 500ms ease,
    transform 700ms cubic-bezier(.2,.7,.2,1);
}

.regionCard:hover .regionMap img {
  opacity: 0.95;
  transform: scale(1.015);
}
```

Не поднимать всю карточку:

```css
/* ЗАПРЕЩЕНО */
.regionCard:hover {
  transform: translateY(-8px);
}
```

Не использовать сильный shadow.

Не делать glow.

Не превращать блок в SaaS UI.

---

# 26. ACCESSIBILITY

SVG-контур декоративен:

```html
aria-hidden="true"
```

Market points в default состоянии тоже декоративны:

```html
aria-hidden="true"
```

Название региона:

```html
<h3>Африка</h3>
```

Ссылка:

```html
<a href="/expeditions?region=africa">
  Смотреть направления
</a>
```

Если точки позже становятся самостоятельными интерактивными элементами, им потребуется доступное имя. Не делать интерактивными просто ради hover.

---

# 27. MOBILE

На mobile сохранить контуры.

Не делать:

```css
.regionMap {
  display: none;
}
```

Вместо этого уменьшить композицию:

```css
@media (max-width: 767px) {
  .continentalGrid {
    grid-template-columns: 1fr;
  }

  .regionCard {
    min-height: 290px;
    padding: 24px;
  }

  .regionMap {
    width: 52%;
    height: 78%;
    right: 2%;
    top: 11%;
  }

  .regionTitle {
    font-size: 36px;
  }
}
```

Если SVG начинает конфликтовать с текстом, сначала изменить его масштаб/позицию, а не удалять карту.

---

# 28. COMPONENT ARCHITECTURE

Создать один переиспользуемый компонент:

```tsx
<ContinentalNavigation regions={regions} />
```

Внутри:

```tsx
<RegionMarket />
```

при необходимости.

Не создавать четыре полностью независимых компонента:

```text
AfricaCard
AsiaCard
LatamCard
RussiaCard
```

Данные должны управлять представлением.

---

# 29. HOMEPAGE И MAPCONTINENT — НЕ СМЕШИВАТЬ

Это критически важно.

## Homepage

Использует:

```text
ContinentalNavigation
```

Задача:

```text
регион
+
реальный SVG
+
market dots
+
navigation
```

## Expedition page

Использует существующий:

```text
MapContinent
```

Задача:

```text
конкретная экспедиция
+
active point
+
neighbor points
+
Moscow entry
+
flight/control point
+
program cities
+
status
```

Не переносить сложную route/control-логику `MapContinent` в Homepage.

---

# 30. НЕ ЛОМАТЬ СУЩЕСТВУЮЩУЮ MAPCONTINENT ЛОГИКУ

Если проект уже содержит:

```tsx
<MapContinent
  continent={mapData.continent}
  activePoint={mapData.activePoint}
  neighborPoints={mapData.neighborPoints}
  moscowEntry={mapData.moscowEntry}
  flightControlPoint={mapData.flightControlPoint}
  programCities={mapData.programCities}
  status={expedition.status}
/>
```

не удалять и не переписывать эти props только потому, что Homepage теперь использует SVG-контуры.

`ContinentalNavigation` и `MapContinent` — разные уровни интерфейса.

---

# 31. PERFORMANCE

SVG должен быть:

- локальным;
- оптимизированным;
- без embedded raster images;
- без лишних path nodes;
- без внешних network dependencies.

Не использовать:

```text
PNG
JPG
canvas
video
external map iframe
```

для самого континентального контура.

---

# 32. FINAL VISUAL TARGET

При просмотре секции должно быть ощущение:

```text
FExperience
    ↓
редакционный журнал
    ↓
география рынков
    ↓
реальные регионы
    ↓
реальные направления
```

А не:

```text
AI landing page
    ↓
4 bento cards
    ↓
generic map blobs
```

---

# 33. КРИТЕРИИ ПРИЁМКИ

Работа считается выполненной только если одновременно выполнены все пункты:

### География

- [ ] Африка — настоящий SVG-контур.
- [ ] Азия — настоящий SVG-контур.
- [ ] LATAM — настоящий SVG-контур.
- [ ] Россия — настоящий SVG-контур.
- [ ] Контуры узнаваемы.
- [ ] SVG локальные.

### Точки

- [ ] Точки оранжевые.
- [ ] Точки соответствуют реальным направлениям.
- [ ] Точки находятся географически правильно.
- [ ] Нет случайных декоративных точек.
- [ ] Нет glow/pulse.

### Маршруты

- [ ] Route lines полностью отсутствуют.
- [ ] Нет `regionRoute`.
- [ ] Нет decorative route SVG.
- [ ] Нет flight-tracker стилистики.

### Typography

- [ ] `Playfair Display` для заголовков.
- [ ] `HelveticaNeueCyr` для body/UI.
- [ ] Региональный заголовок остаётся editorial, а не UI-style.

### Glass

- [ ] Glass используется умеренно.
- [ ] Нет четырёх одинаковых белых bento cards.
- [ ] SVG остаётся видимым.
- [ ] Нет сильных теней.

### Архитектура

- [ ] Homepage использует `ContinentalNavigation`.
- [ ] Expedition pages продолжают использовать `MapContinent`.
- [ ] Существующая expedition map logic не удалена.
- [ ] Нет второй параллельной системы данных для экспедиций без необходимости.

---

# 34. FINAL AI-AGENT LOCK

Перед началом работы агент должен принять следующие правила как обязательные:

```text
1. Не создавать новый дизайн вместо описанного.

2. Не использовать AI-generated continent shapes.

3. Использовать реальные локальные SVG.

4. Контур региона должен быть крупным и узнаваемым.

5. Использовать orange market dots на реальных географических позициях.

6. Не использовать route lines на Homepage.

7. Не создавать flight-tracker UI.

8. Не добавлять самолётики, GPS icons или Google Maps styling.

9. Не превращать четыре региона в четыре одинаковых generic bento cards.

10. Не добавлять лишние badges, metrics, labels или CTA.

11. Не менять существующие данные регионов без явного указания.

12. Не менять `MapContinent` и его expedition logic ради этого блока.

13. Не удалять существующие expedition map points.

14. Не создавать вторую независимую систему данных, если нужные данные уже существуют.

15. Не менять HelveticaNeueCyr + Playfair Display.

16. Не менять общий визуальный характер сайта на generic SaaS.

17. Не добавлять декоративные элементы только ради заполнения пустого пространства.

18. Если между двумя вариантами возникает выбор — выбирать более простой, географически точный и editorial вариант.

19. Если чего-то не хватает для точного выполнения — не выдумывать данные. Использовать существующий Source of Truth проекта или остановиться на минимальном безопасном решении.

20. После реализации проверить каждый SVG и каждую market point отдельно.
```

---

# 35. ГЛАВНЫЙ ПРИНЦИП

> **Не рисуй карту ради красоты. Покажи реальную географию ради смысла.**

Континент — настоящий SVG.

Точка — реальное направление.

Типографика — FExperience.

Glass — только как материал.

Никаких декоративных маршрутов.

Никаких AI-blobs.

Никакого generic bento.

Итог должен выглядеть не как «AI придумал красивый блок», а как **индивидуальная editorial-система FExperience, в которой география является частью бренда и навигации.**
