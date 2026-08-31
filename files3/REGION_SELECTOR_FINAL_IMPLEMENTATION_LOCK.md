# REGION SELECTOR --- FINAL IMPLEMENTATION LOCK

## Блок «Выберите регион»

Этот документ является **самодостаточной инструкцией для AI-агента** по
реализации блока «Выберите регион» на главной странице.

Агент должен реализовать блок **ровно по этой спецификации** и не
принимать самостоятельных дизайнерских решений там, где они уже
зафиксированы ниже.

------------------------------------------------------------------------

# 1. Цель блока

Блок должен выглядеть как продолжение визуального языка Hero:

-   индивидуальный editorial / premium design;
-   тёплый светлый orange/cream фон;
-   реальные географические SVG-контуры;
-   очень деликатные контуры, не превращающиеся в обычную карту;
-   оранжевые точки только как маркеры реальных направлений;
-   аккуратное Apple-like liquid glass;
-   крупная Playfair Display типографика;
-   HelveticaNeueCyr для интерфейсного текста;
-   отсутствие типичного AI/Bento-шаблона;
-   никакой сетки из одинаковых белых карточек;
-   никаких декоративных route-lines;
-   никакого самостоятельного рисования континентов.

Главная идея:

> **Регион --- это editorial navigation object, а не обычная карточка.**

Карта является тихим визуальным слоем. Главными остаются название
региона и действие.

------------------------------------------------------------------------

# 2. ОБЯЗАТЕЛЬНЫЕ SVG-ASSETS

Используются только локальные SVG.

Структура:

``` text
/public
  /maps
    africa.svg
    asia.svg
    latam.svg
    russia.svg
```

### Файлы

``` text
africa.svg
```

Источник: утверждённый `Africa(1).svg`.

``` text
asia.svg
```

Источник: утверждённый `Asia(1).svg`.

``` text
latam.svg
```

Источник: утверждённый `Latm(1).svg`.

``` text
russia.svg
```

Источник: утверждённый `Sakhalin.svg`, который пользователь переименует
в `russia.svg`.

------------------------------------------------------------------------

# 3. КРИТИЧЕСКИЕ ЗАПРЕТЫ ПО SVG

Не разрешается:

-   перерисовывать континенты;
-   генерировать новые SVG через AI;
-   упрощать географическую форму;
-   заменять реальные контуры декоративными абстрактными линиями;
-   добавлять route-lines;
-   рисовать маршруты между точками;
-   добавлять подписи стран;
-   добавлять границы государств;
-   самостоятельно менять географическую геометрию;
-   заменять локальные SVG на внешние карты;
-   использовать CSS `clip-path` для имитации континентов;
-   использовать картинку карты из интернета вместо локального SVG.

SVG являются **утверждёнными географическими assets**.

Меняется только визуальное представление через CSS/implementation layer.

------------------------------------------------------------------------

# 4. ВАЖНО ПРО РОССИЮ

`russia.svg` --- отдельный asset.

Не использовать `asia.svg` для карточки России.

Россия является отдельным пунктом навигации:

``` text
Россия
1 направление
```

При этом Россия географически присутствует внутри `asia.svg`. Это
нормально и не является ошибкой.

Не удалять пункт «Россия» из-за наличия России внутри карты Азии.

------------------------------------------------------------------------

# 5. КОНЦЕПЦИЯ ВИЗУАЛА

Не делать:

``` text
[ белая карточка ]
[ белая карточка ]
[ белая карточка ]
[ белая карточка ]
```

Не делать стандартный AI Bento grid.

Вместо этого:

``` text
тёплый фон
    ↓
тонкая редакционная сетка
    ↓
glass material
    ↓
реальный контур региона
    ↓
оранжевая точка / точки
    ↓
крупное название
    ↓
минимальный navigation action
```

Контур должен быть настолько спокойным, чтобы пользователь воспринимал
его почти как часть материала страницы.

------------------------------------------------------------------------

# 6. ФОН

Фон блока не белый.

Использовать тёплый светлый orange/cream gradient.

Базовый фон:

``` css
background:
  radial-gradient(
    circle at 15% 15%,
    rgba(255, 220, 193, 0.72) 0%,
    rgba(255, 220, 193, 0) 38%
  ),
  radial-gradient(
    circle at 88% 65%,
    rgba(244, 107, 59, 0.10) 0%,
    rgba(244, 107, 59, 0) 38%
  ),
  linear-gradient(
    135deg,
    #fff8f2 0%,
    #fff1e6 48%,
    #fff7f1 100%
  );
```

Не добавлять:

-   сильный orange background;
-   шум;
-   текстуры;
-   mesh gradient;
-   декоративные blobs;
-   случайные AI-generated shapes.

------------------------------------------------------------------------

# 7. ШРИФТЫ

### Заголовки

Использовать:

``` text
Playfair Display
```

### Body / UI

Использовать:

``` text
HelveticaNeueCyr
```

Не заменять их на:

-   Inter;
-   Arial;
-   system-ui;
-   Roboto;
-   Montserrat;
-   другие случайные fonts.

------------------------------------------------------------------------

# 8. СТРУКТУРА БЛОКА

``` text
REGION SELECTOR
│
├── eyebrow
│   └── РЫНКИ
│
├── heading
│   └── Выберите регион
│
└── region grid
    │
    ├── Africa
    ├── Asia
    ├── Latin America
    └── Russia
```

Тексты:

``` text
РЫНКИ

Выберите регион

Африка
3 направления

Азия
5 направлений

Латинская Америка
1 направление

Россия
1 направление
```

Navigation label:

``` text
Смотреть направления →
```

Не переписывать эти тексты самостоятельно.

------------------------------------------------------------------------

# 9. ДАННЫЕ РЕГИОНОВ

Использовать такую структуру данных:

``` tsx
type Region = {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  map: string;
  points: {
    left: string;
    top: string;
  }[];
};
```

Базовый массив:

``` tsx
const regions: Region[] = [
  {
    id: "africa",
    number: "03",
    title: "Африка",
    subtitle: "3 направления",
    map: "/maps/africa.svg",
    points: [
      { left: "47%", top: "42%" },
      { left: "57%", top: "55%" },
      { left: "43%", top: "68%" },
    ],
  },

  {
    id: "asia",
    number: "05",
    title: "Азия",
    subtitle: "5 направлений",
    map: "/maps/asia.svg",
    points: [
      { left: "54%", top: "43%" },
      { left: "65%", top: "51%" },
      { left: "73%", top: "58%" },
      { left: "47%", top: "61%" },
      { left: "61%", top: "68%" },
    ],
  },

  {
    id: "latam",
    number: "01",
    title: "Латинская Америка",
    subtitle: "1 направление",
    map: "/maps/latam.svg",
    points: [
      { left: "46%", top: "62%" },
    ],
  },

  {
    id: "russia",
    number: "01",
    title: "Россия",
    subtitle: "1 направление",
    map: "/maps/russia.svg",
    points: [
      { left: "67%", top: "43%" },
    ],
  },
];
```

## Критический LOCK для точек

Координаты выше являются стартовой конфигурацией реализации.

Агент:

-   не придумывает новые направления;
-   не добавляет точки ради симметрии;
-   не удаляет точки ради красоты;
-   не перемещает точки произвольно;
-   не связывает точки линиями;
-   не добавляет названия стран рядом с точками.

Если фактические направления проекта отличаются от этих координат,
менять координаты можно **только по данным проекта**, а не по
эстетическому усмотрению агента.

------------------------------------------------------------------------

# 10. ГОТОВЫЙ REACT-КОД

Создать компонент:

``` text
RegionSelector.tsx
```

Код:

``` tsx
import React from "react";
import "./RegionSelector.css";

type Region = {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  map: string;
  points: {
    left: string;
    top: string;
  }[];
};

const regions: Region[] = [
  {
    id: "africa",
    number: "03",
    title: "Африка",
    subtitle: "3 направления",
    map: "/maps/africa.svg",
    points: [
      { left: "47%", top: "42%" },
      { left: "57%", top: "55%" },
      { left: "43%", top: "68%" },
    ],
  },

  {
    id: "asia",
    number: "05",
    title: "Азия",
    subtitle: "5 направлений",
    map: "/maps/asia.svg",
    points: [
      { left: "54%", top: "43%" },
      { left: "65%", top: "51%" },
      { left: "73%", top: "58%" },
      { left: "47%", top: "61%" },
      { left: "61%", top: "68%" },
    ],
  },

  {
    id: "latam",
    number: "01",
    title: "Латинская Америка",
    subtitle: "1 направление",
    map: "/maps/latam.svg",
    points: [
      { left: "46%", top: "62%" },
    ],
  },

  {
    id: "russia",
    number: "01",
    title: "Россия",
    subtitle: "1 направление",
    map: "/maps/russia.svg",
    points: [
      { left: "67%", top: "43%" },
    ],
  },
];

export default function RegionSelector() {
  return (
    <section
      className="region-selector"
      aria-labelledby="region-selector-title"
    >
      <div className="region-selector__inner">

        <header className="region-selector__header">
          <div className="region-selector__eyebrow">
            РЫНКИ
          </div>

          <h2
            id="region-selector-title"
            className="region-selector__title"
          >
            Выберите регион
          </h2>
        </header>

        <div className="region-grid">

          {regions.map((region) => (
            <a
              key={region.id}
              href={`/expeditions/${region.id}`}
              className={`region-card region-card--${region.id}`}
            >

              <div
                className="region-card__map"
                aria-hidden="true"
              >
                <img
                  src={region.map}
                  alt=""
                  className="region-card__map-image"
                />

                <div className="region-card__points">
                  {region.points.map((point, index) => (
                    <span
                      key={index}
                      className="region-card__point"
                      style={{
                        left: point.left,
                        top: point.top,
                      }}
                    />
                  ))}
                </div>
              </div>

              <div className="region-card__glass" />

              <div className="region-card__content">

                <div className="region-card__number">
                  {region.number}
                </div>

                <h3 className="region-card__name">
                  {region.title}
                </h3>

                <div className="region-card__meta">
                  {region.subtitle}
                </div>

                <span className="region-card__link">
                  <span>
                    Смотреть направления
                  </span>

                  <span
                    className="region-card__arrow"
                    aria-hidden="true"
                  >
                    →
                  </span>
                </span>

              </div>

            </a>
          ))}

        </div>

      </div>
    </section>
  );
}
```

------------------------------------------------------------------------

# 11. ПОЛНЫЙ CSS

Создать:

``` text
RegionSelector.css
```

Использовать:

``` css
.region-selector {
  --orange: #f46b3b;
  --orange-soft: #e0784f;

  --ink: #171515;
  --muted: rgba(23, 21, 21, 0.56);

  position: relative;
  width: 100%;
  overflow: hidden;

  background:
    radial-gradient(
      circle at 15% 15%,
      rgba(255, 220, 193, 0.72) 0%,
      rgba(255, 220, 193, 0) 38%
    ),
    radial-gradient(
      circle at 88% 65%,
      rgba(244, 107, 59, 0.10) 0%,
      rgba(244, 107, 59, 0) 38%
    ),
    linear-gradient(
      135deg,
      #fff8f2 0%,
      #fff1e6 48%,
      #fff7f1 100%
    );

  color: var(--ink);
}


.region-selector__inner {
  width: min(1280px, calc(100% - 80px));
  margin: 0 auto;
  padding: 130px 0 150px;
}


/* HEADER */

.region-selector__header {
  margin-bottom: 70px;
}


.region-selector__eyebrow {
  margin-bottom: 18px;

  font-family:
    "HelveticaNeueCyr",
    Arial,
    sans-serif;

  font-size: 13px;
  font-weight: 600;
  line-height: 1;

  letter-spacing: 0.12em;
  text-transform: uppercase;

  color: var(--orange);
}


.region-selector__title {
  margin: 0;

  font-family:
    "Playfair Display",
    Georgia,
    serif;

  font-size: clamp(52px, 5vw, 78px);
  font-weight: 500;
  line-height: 0.98;

  letter-spacing: -0.035em;

  color: var(--ink);
}


/* GRID */

.region-grid {
  display: grid;

  grid-template-columns:
    repeat(2, minmax(0, 1fr));

  border-top:
    1px solid rgba(23, 21, 21, 0.10);

  border-left:
    1px solid rgba(23, 21, 21, 0.10);
}


/* CARD */

.region-card {
  position: relative;

  min-height: 365px;

  overflow: hidden;

  border-right:
    1px solid rgba(23, 21, 21, 0.10);

  border-bottom:
    1px solid rgba(23, 21, 21, 0.10);

  text-decoration: none;

  isolation: isolate;

  cursor: pointer;

  transition:
    transform 450ms cubic-bezier(.2,.75,.25,1),
    box-shadow 450ms cubic-bezier(.2,.75,.25,1);
}


/* GLASS */

.region-card__glass {
  position: absolute;
  inset: 18px;

  z-index: 1;

  border-radius: 28px;

  background:
    linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.46),
      rgba(255, 244, 234, 0.20)
    );

  border:
    1px solid rgba(255, 255, 255, 0.58);

  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.72),
    0 18px 45px rgba(101, 54, 27, 0.045);

  backdrop-filter:
    blur(18px)
    saturate(110%);

  -webkit-backdrop-filter:
    blur(18px)
    saturate(110%);

  pointer-events: none;
}


/* MAP */

.region-card__map {
  position: absolute;
  inset: 0;

  z-index: 0;

  pointer-events: none;
}


.region-card__map-image {
  position: absolute;

  width: 70%;
  height: 76%;

  object-fit: contain;

  right: 2%;
  bottom: 3%;

  opacity: 0.16;

  transform-origin: center;

  filter:
    brightness(0)
    saturate(100%)
    invert(49%)
    sepia(25%)
    saturate(1117%)
    hue-rotate(329deg)
    brightness(101%)
    contrast(92%);

  transition:
    opacity 500ms cubic-bezier(.2,.75,.25,1),
    transform 700ms cubic-bezier(.2,.75,.25,1);
}


/* INDIVIDUAL MAP SIZES */

.region-card--africa .region-card__map-image {
  width: 42%;
  height: 78%;

  right: 7%;
  bottom: 4%;
}


.region-card--asia .region-card__map-image {
  width: 72%;
  height: 76%;

  right: -2%;
  bottom: 4%;
}


.region-card--latam .region-card__map-image {
  width: 43%;
  height: 80%;

  right: 7%;
  bottom: 2%;
}


.region-card--russia .region-card__map-image {
  width: 78%;
  height: 45%;

  right: -1%;
  top: 26%;
}


/* POINTS */

.region-card__points {
  position: absolute;
  inset: 0;

  z-index: 2;

  pointer-events: none;
}


.region-card__point {
  position: absolute;

  width: 7px;
  height: 7px;

  transform:
    translate(-50%, -50%);

  border-radius: 50%;

  background: #f46b3b;

  box-shadow:
    0 0 0 4px rgba(244, 107, 59, 0.08),
    0 0 16px rgba(244, 107, 59, 0.20);
}


/* CONTENT */

.region-card__content {
  position: relative;

  z-index: 3;

  height: 100%;
  min-height: 365px;

  padding: 48px 48px 44px;

  display: flex;
  flex-direction: column;
  align-items: flex-start;

  pointer-events: none;
}


.region-card__number {
  margin-bottom: 16px;

  font-family:
    "HelveticaNeueCyr",
    Arial,
    sans-serif;

  font-size: 12px;
  font-weight: 500;

  letter-spacing: 0.10em;

  color:
    rgba(23, 21, 21, 0.42);
}


.region-card__name {
  max-width: 85%;

  margin: 0;

  font-family:
    "Playfair Display",
    Georgia,
    serif;

  font-size:
    clamp(42px, 4vw, 62px);

  font-weight: 500;

  line-height: 0.96;

  letter-spacing: -0.035em;

  color: var(--ink);
}


.region-card__meta {
  margin-top: 12px;

  font-family:
    "HelveticaNeueCyr",
    Arial,
    sans-serif;

  font-size: 15px;
  line-height: 1.4;

  color: var(--muted);
}


.region-card__link {
  display: inline-flex;
  align-items: center;
  gap: 12px;

  margin-top: auto;

  font-family:
    "HelveticaNeueCyr",
    Arial,
    sans-serif;

  font-size: 14px;
  font-weight: 500;

  color: var(--ink);
}


.region-card__arrow {
  display: inline-block;

  font-size: 19px;
  line-height: 1;

  transition:
    transform 350ms cubic-bezier(.2,.75,.25,1);
}


/* HOVER */

.region-card:hover {
  z-index: 5;

  box-shadow:
    0 24px 60px rgba(101, 54, 27, 0.07);
}


.region-card:hover .region-card__glass {
  background:
    linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.56),
      rgba(255, 238, 224, 0.26)
    );

  border-color:
    rgba(255, 255, 255, 0.72);
}


.region-card:hover .region-card__map-image {
  opacity: 0.21;

  transform: scale(1.025);
}


.region-card:hover .region-card__arrow {
  transform: translateX(5px);
}


/* TABLET / MOBILE */

@media (max-width: 900px) {

  .region-selector__inner {
    width:
      min(
        100% - 40px,
        680px
      );

    padding:
      90px 0 100px;
  }


  .region-selector__header {
    margin-bottom: 45px;
  }


  .region-selector__title {
    font-size:
      clamp(46px, 10vw, 64px);
  }


  .region-grid {
    grid-template-columns: 1fr;
  }


  .region-card {
    min-height: 330px;
  }


  .region-card__content {
    min-height: 330px;

    padding:
      36px 32px 34px;
  }


  .region-card__name {
    max-width: 90%;

    font-size:
      clamp(40px, 10vw, 58px);
  }
}


/* SMALL MOBILE */

@media (max-width: 520px) {

  .region-selector__inner {
    width:
      calc(100% - 28px);

    padding:
      70px 0 80px;
  }


  .region-selector__header {
    margin-bottom: 34px;
  }


  .region-selector__eyebrow {
    font-size: 11px;
  }


  .region-selector__title {
    font-size: 44px;
  }


  .region-card {
    min-height: 300px;
  }


  .region-card__content {
    min-height: 300px;

    padding:
      30px 24px 28px;
  }


  .region-card__glass {
    inset: 10px;

    border-radius: 22px;
  }


  .region-card__name {
    font-size: 42px;
  }


  .region-card__link {
    font-size: 13px;
  }
}


/* REDUCED MOTION */

@media (prefers-reduced-motion: reduce) {

  .region-card,
  .region-card__map-image,
  .region-card__arrow {
    transition: none;
  }
}
```

------------------------------------------------------------------------

# 12. ОЧЕНЬ ВАЖНО: SVG НЕ ДОЛЖЕН ПРЕВРАТИТЬСЯ В ЗАЛИВКУ

Текущие SVG могут содержать чёрную/серую заливку.

Не менять исходную геометрию.

Если SVG используется как `<img>`, разрешается визуально окрашивать его
через CSS filter, как в коде выше.

Цель:

``` text
не чёрная карта
не серая карта
не белая карта

а:

очень тонкий
тёплый
почти прозрачный
географический силуэт
```

Если после применения filter SVG визуально остаётся слишком плотным,
сначала уменьшить:

``` css
opacity: 0.16;
```

до:

``` css
opacity: 0.10;
```

или:

``` css
opacity: 0.08;
```

Не менять SVG ради решения этой проблемы.

------------------------------------------------------------------------

# 13. СТЕКЛО --- НЕ ДЕЛАТЬ СИЛЬНЫМ

Стекло должно быть заметно только при внимательном взгляде.

Правильное ощущение:

``` text
фон
   ↓
легчайшая стеклянная поверхность
   ↓
география
   ↓
типографика
```

Неправильное:

``` text
белая карточка
+
сильный blur
+
сильная тень
+
толстая белая рамка
```

Не добавлять:

-   neon glow;
-   excessive blur;
-   glass shine animation;
-   rainbow glass;
-   сильную прозрачность, из-за которой текст теряет контраст.

------------------------------------------------------------------------

# 14. ТИПОГРАФИКА

Заголовок:

``` css
font-family: "Playfair Display", Georgia, serif;
```

Размер:

``` css
font-size: clamp(52px, 5vw, 78px);
```

Названия регионов:

``` css
font-family: "Playfair Display", Georgia, serif;
font-weight: 500;
```

Интерфейс:

``` css
font-family:
  "HelveticaNeueCyr",
  Arial,
  sans-serif;
```

Не использовать жирный grotesk для названий регионов.

------------------------------------------------------------------------

# 15. RESPONSIVE

Desktop:

``` text
2 × 2
```

Tablet/mobile:

``` text
1 × 4
```

Не превращать каждую карточку в отдельный огромный экран.

На мобильном карта остаётся вторичным слоем.

------------------------------------------------------------------------

# 16. ACCESSIBILITY

Каждый регион является ссылкой.

Пример:

``` tsx
<a
  href="/expeditions/asia"
  className="region-card region-card--asia"
>
```

SVG:

``` tsx
<img
  src="/maps/asia.svg"
  alt=""
  aria-hidden="true"
/>
```

Карта является декоративным слоем.

Название региона является доступным текстом.

------------------------------------------------------------------------

# 17. ROUTING

Базовая схема:

``` text
/expeditions/africa
/expeditions/asia
/expeditions/latam
/expeditions/russia
```

Если в текущем проекте уже существует другой утверждённый routing, **не
менять его ради этого блока**.

В этом случае сохранить существующие маршруты проекта.

Не создавать CMS.

Не подключать Sanity.

Не подключать Strapi.

Не добавлять API.

Не добавлять database.

Все данные блока остаются hardcoded, если архитектура проекта
предусматривает hardcoded content.

------------------------------------------------------------------------

# 18. ЧТО АГЕНТУ ЗАПРЕЩЕНО ДЕЛАТЬ

Не разрешается самостоятельно:

1.  менять тексты;
2.  менять количество регионов;
3.  придумывать новые регионы;
4.  генерировать новые карты;
5.  менять SVG;
6.  добавлять route-lines;
7.  добавлять страны;
8.  добавлять подписи стран;
9.  добавлять дополнительные карточки;
10. превращать блок в обычный Bento UI;
11. делать белый фон;
12. заменять Playfair Display;
13. заменять HelveticaNeueCyr;
14. усиливать glassmorphism без необходимости;
15. добавлять декоративные blobs;
16. добавлять случайные gradients;
17. добавлять AI-generated illustrations;
18. добавлять CMS;
19. подключать внешний map service;
20. изменять другие секции сайта для «согласования» с этим блоком.

------------------------------------------------------------------------

# 19. ПОРЯДОК РЕАЛИЗАЦИИ

Агент должен работать строго в таком порядке.

### STEP 1

Проверить наличие:

``` text
/public/maps/africa.svg
/public/maps/asia.svg
/public/maps/latam.svg
/public/maps/russia.svg
```

### STEP 2

Не изменять SVG.

### STEP 3

Создать/обновить:

``` text
RegionSelector.tsx
```

### STEP 4

Создать/обновить:

``` text
RegionSelector.css
```

### STEP 5

Подключить компонент к существующей странице.

### STEP 6

Проверить, что:

-   используются локальные SVG;
-   Россия использует `russia.svg`;
-   Азия использует `asia.svg`;
-   нет route-lines;
-   нет новых карт;
-   нет CMS;
-   нет новых API.

### STEP 7

Проверить визуально desktop.

### STEP 8

Проверить tablet.

### STEP 9

Проверить mobile.

### STEP 10

Проверить, что карта остаётся вторичной относительно typography.

### STEP 11

Проверить контраст текста.

### STEP 12

Проверить hover.

### STEP 13

Проверить reduced-motion.

------------------------------------------------------------------------

# 20. FINAL VISUAL CHECKLIST

Результат считается правильным только если одновременно выполнено всё:

-   [ ] фон тёплый, не чисто белый;
-   [ ] заголовок «Выберите регион» выполнен Playfair Display;
-   [ ] UI-текст выполнен HelveticaNeueCyr;
-   [ ] используются реальные локальные SVG;
-   [ ] Африка использует `africa.svg`;
-   [ ] Азия использует `asia.svg`;
-   [ ] Латинская Америка использует `latam.svg`;
-   [ ] Россия использует отдельный `russia.svg`;
-   [ ] Россия не заменена `asia.svg`;
-   [ ] контуры очень деликатные;
-   [ ] внутри нет route-lines;
-   [ ] оранжевые точки небольшие;
-   [ ] точки не соединены линиями;
-   [ ] стекло лёгкое;
-   [ ] текст читается поверх стекла;
-   [ ] нет стандартного AI-Bento вида;
-   [ ] нет белых однотипных карточек;
-   [ ] нет случайных декоративных элементов;
-   [ ] нет CMS;
-   [ ] нет внешнего map service;
-   [ ] существующая архитектура проекта не сломана;
-   [ ] остальные секции сайта не изменены.

------------------------------------------------------------------------

# 21. FINAL PRINCIPLE

Если при реализации возникает желание:

> «немного улучшить»,\
> «сделать современнее»,\
> «добавить красивую линию»,\
> «сделать карту заметнее»,\
> «добавить ещё glass-effect»,\
> «сделать карточки интереснее»,

**не делать это самостоятельно.**

Визуальная сила блока должна возникать из сочетания:

``` text
Playfair Display
        +
тёплый editorial background
        +
реальная география
        +
тихое glass
        +
оранжевые expedition points
        +
пространство
        +
точная типографическая иерархия
```

А не из количества декоративных эффектов.

**Главный принцип: меньше UI-декора, больше характера.**
