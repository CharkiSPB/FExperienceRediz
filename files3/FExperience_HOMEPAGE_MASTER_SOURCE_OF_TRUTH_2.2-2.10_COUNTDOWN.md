# FExperience Homepage — MASTER EXECUTION / SOURCE-OF-TRUTH LOCK

## 0. Назначение документа

Этот файл — **единственный исполнительный источник истины** для текущего рестайла главной страницы в части блоков **2.2–2.10 + Countdown Timer**.

AI-агент должен работать **только по этому файлу**. Не сравнивать его с более ранними Markdown-файлами, не выбирать «более красивую» версию из старых документов и не восстанавливать старые решения по памяти.

Если старые документы содержат другую реализацию — **она устарела**. Приоритет всегда у этого файла.

---

## 1. ЖЁСТКАЯ ПОСЛЕДОВАТЕЛЬНОСТЬ ВЫПОЛНЕНИЯ

Выполнять строго в таком порядке:

1. Прочитать этот файл целиком.
2. Зафиксировать глобальные токены и существующую визуальную систему проекта.
3. Не менять Hero: Hero уже является главным визуальным ориентиром проекта.
4. Реализовать блоки главной страницы строго в порядке **2.2 → 2.3 → 2.4 → 2.5 → 2.5A → 2.6 → 2.7 → 2.8 → 2.8A Countdown → 2.9 → 2.10**.
5. Для каждого блока сначала сохранить существующие данные/тексты, затем менять только визуальную реализацию согласно соответствующему разделу.
6. После завершения всех блоков выполнить acceptance-checklist этого документа.
7. Если визуальный результат начинает выглядеть как AI/Bento/SaaS-шаблон — остановиться и вернуться к правилам конкретного блока.

### 1.1 Приоритет решений

При любом конфликте приоритет такой:

**этот Master Lock → конкретный раздел блока → глобальные правила этого файла → всё остальное игнорировать.**

### 1.2 Что НЕ делать

- не создавать новый дизайн-системный слой поверх существующего;
- не добавлять новые CMS;
- не добавлять MDX/CMS/remote content;
- не менять Hero ради согласования с нижними секциями;
- не превращать каждый блок в glass-card;
- не превращать страницу в набор одинаковых Bento-карточек;
- не добавлять декоративные элементы только ради «дорогого» вида;
- не менять утверждённые тексты без отдельного запроса.

---

## 2. КАРТА ИСТОЧНИКА ИСТИНЫ

| Область | Источник в этом Master | Правило |
|---|---|---|
| 2.2 | раздел `2.2 MARKET REALITY` ниже | использовать новую editorial statistics composition |
| 2.3 | раздел `2.3` ниже | использовать текущую утверждённую версию |
| 2.4 | раздел `2.4` ниже | использовать реальные SVG-контуры регионов |
| 2.5 | раздел `2.5` ниже | использовать cinematic expedition portfolio, не список и не стандартный bento |
| 2.5A | раздел `2.5A` ниже | использовать рукописный editorial manifesto |
| 2.6 | раздел `2.6` ниже | сохранить текущую glass/photo концепцию; не упрощать до обычной сетки |
| 2.7 | раздел `2.7` ниже | использовать утверждённую media/editorial композицию |
| 2.8 | раздел `2.8` ниже | использовать утверждённую testimonial-композицию |
| Countdown | раздел `2.8A` ниже | этот раздел заменяет все старые инструкции по Countdown |
| 2.9 | раздел `2.9` ниже | использовать утверждённый FAQ |
| 2.10 | раздел `2.10` ниже | Final CTA оставить с существующим текстом; следующую экспедицию не добавлять |

---

## 3. ГЛАВНЫЙ ВИЗУАЛЬНЫЙ ПРИНЦИП

Hero остаётся самым сильным визуальным событием. Нижняя часть страницы не должна пытаться повторить Hero.

Характер создаётся через чередование:

**типографика → фотография → atlas/map → локальное стекло → editorial whitespace → фотографическая среда.**

Стекло используется только там, где оно действительно усиливает материал, фотографию или интерактив.

---

# FExperience — рестайлинг блоков 2.2–2.10

## Назначение

Это исполнительная инструкция для AI-агента. Переписать визуальную
реализацию блоков **2.2–2.10** так, чтобы главная страница продолжала
сильный Hero и выглядела как дорогой editorial/digital-проект, а не как
AI/Bento-шаблон.

**Смысл, данные и тексты не менять**, кроме визуальной композиции.
**Final CTA 2.10 оставить с существующим текстом и не добавлять
следующую экспедицию.**

## 0. Жёсткие правила

Не делать: - одинаковые белые карточки во всех секциях; - bento-grid как
универсальный паттерн; - одинаковые `border-radius + shadow + hover` для
всего; - glassmorphism на каждом элементе; - случайные иконки, неон,
декоративные линии и AI-tech элементы; - туристическую/стоковую
визуальность; - новые CMS/MDX/источники данных.

Главный принцип:

> **Hero — главный wow-блок. Остальные секции не конкурируют с ним, а
> создают editorial rhythm.**

Чередовать открытые типографические композиции, фотографии, тонкие
линии, atlas/map UI и локальное glass.

------------------------------------------------------------------------

# 1. Общая визуальная система

Использовать существующие токены:

``` css
--bg-canvas: #FAFAF8;
--bg-surface: #F5F2EC;
--bg-elevated: #FFFFFF;

--text-primary: #1A1A1A;
--text-secondary: #6D6D6D;
--text-tertiary: #A0A0A0;

--orange-700: #B7410E;
--orange-600: #FF6B2C;
--orange-500: #FF7722;
--orange-400: #FF8A54;
--orange-300: #FFB089;
--orange-200: #FFE8D6;
--orange-100: #FFF0E8;

--border-hairline: rgba(26,26,26,.08);
--continent-outline: #FFE6D8;

--radius-sm: 8px;
--radius-md: 16px;
--radius-lg: 24px;
--radius-pill: 999px;
```

Тёплый фон:

``` css
background:
  radial-gradient(
    900px 420px at 50% 0%,
    rgba(255,119,34,.045),
    transparent 72%
  ),
  var(--bg-canvas);
```

Не делать фон явно оранжевым. Он должен ощущаться как тёплая
бумага/материал.

Шрифты: `Playfair Display` для display/заголовков, `Inter` для UI/body.

------------------------------------------------------------------------

# 2.2 MARKET REALITY — EDITORIAL STATISTICS COMPOSITION

## Цель

Полностью заменить прежнюю композицию из трёх одинаковых KPI-карточек.
Этот блок должен выглядеть как **редакционная инфографика / visual statement**, а не как Bento, dashboard или SaaS-блок.

Главный принцип: **один главный факт слева + два подтверждающих факта справа**. Не делать три равноправные карточки.

## Данные — НЕ ИЗМЕНЯТЬ

Сохранить существующие факты и смысл: 

- `>60%` неудачных экспансий — из-за недостаточно глубокого анализа рынка;
- `50+` лояльных контактов — минимум для понимания специфики;
- `>40%` стартапов терпят провал из-за невостребованности продукта.

Визуально знак `>` у первого и третьего показателя не должен превращать композицию в обычный KPI. Главные цифры визуально читаются как `60`, `50+`, `40`, а `%` у 60 и 40 выносится отдельным маленьким оранжевым акцентом. Семантически значения остаются `>60%` и `>40%`.

## Итоговая композиция

Desktop:

```text
РЕАЛЬНОСТЬ ЭКСПАНСИИ

┌───────────────────────────────┬───────────────────────────────┐
│                               │                               │
│  60   %                       │  50+                          │
│                               │  Прямых контактов — минимум   │
│  Неудачных попыток выхода     │  для понимания специфики      │
│  на новый рынок — из-за       │  рынка                         │
│  отсутствия живого знания     │                               │
│  о нём. Не аналитики.         │  ─────────────────────────    │
│  Присутствия.                │                               │
│                               │  40   %                       │
│                               │  Стартапов гибнут из-за       │
│                               │  невостребованности продукта  │
│                               │  в новой среде                 │
│                               │                               │
└───────────────────────────────┴───────────────────────────────┘
```

**Не рисовать внешнюю карточку вокруг всего блока.**

Нужны только:

- тонкая вертикальная разделительная линия;
- тонкая горизонтальная линия между `50+` и `40%`;
- много свободного пространства;
- тёплый светлый фон проекта;
- очень слабое тёплое свечение допустимо только как атмосферный фон, не как glow вокруг KPI.

## Визуальная иерархия

### 1. Eyebrow

Текст:

`РЕАЛЬНОСТЬ ЭКСПАНСИИ`

Оформление:

- Inter / HelveticaNeueCyr;
- 11–12px;
- `font-weight: 600`;
- `letter-spacing: .12em`;
- uppercase;
- `color: var(--orange-600)`;
- не делать pill, badge или карточку.

### 2. Главный показатель — 60

`60` — самый крупный элемент всей секции.

`%` не ставить на одной базовой линии с числом. Визуально вынести его вправо и немного вверх.

```text
60  %
```

`60`:

- Playfair Display;
- 96–120px desktop;
- font-weight 500–600;
- цвет `var(--text-primary)`;
- line-height `.82–.9`;
- letter-spacing отрицательный.

`%`:

- 34–42px;
- Playfair Display или matching editorial serif;
- цвет `var(--orange-600)`;
- vertical-align: super / transform translateY(-0.35em);
- не делать жирным.

Если проект использует знак `>` как отдельный визуальный элемент, он должен быть значительно меньше `60` и не конкурировать с цифрой. Не превращать `>60%` в обычный inline-text KPI.

### 3. Описание под 60

Текст:

`Неудачных попыток выхода на новый рынок — из-за отсутствия живого знания о нём. Не аналитики. Присутствия.`

Оформление:

- Inter / HelveticaNeueCyr;
- 17–19px desktop;
- line-height: 1.55–1.65;
- `color: var(--text-secondary)`;
- max-width: 360–400px.

Фразу `Не аналитики. Присутствия.` **не выделять оранжевым и не делать жирной**. Она должна работать через ритм и перенос строки, а не через декоративный акцент.

### 4. Правый показатель 50+

`50+` — второй по визуальному весу показатель.

Оформление:

- Playfair Display;
- 58–68px;
- `font-weight: 500–600`;
- цвет `var(--text-primary)`;
- `+` можно сделать фирменным оранжевым, как отдельный акцент.

Описание:

`Прямых контактов — минимум для понимания специфики рынка`

- 15–16px;
- line-height 1.5–1.6;
- `color: var(--text-secondary)`;
- max-width: 330px.

### 5. Правый показатель 40%

`40` — крупная serif-цифра.

`%` — отдельный маленький оранжевый акцент, по той же типографической механике, что и у `60`.

Описание:

`Стартапов гибнут из-за невостребованности продукта в новой среде`

Использовать те же размеры и ритм, что у `50+`, но не помещать блок в отдельную карточку.

## Структура HTML / React

```tsx
<section className="market-reality" aria-labelledby="market-reality-title">
  <div className="container">
    <div className="market-reality-eyebrow" id="market-reality-title">
      РЕАЛЬНОСТЬ ЭКСПАНСИИ
    </div>

    <div className="market-reality-layout">
      <article className="market-reality-primary">
        <div className="market-reality-primary-number" aria-label=">60 процентов">
          <span className="market-reality-number-main">60</span>
          <span className="market-reality-number-mark">%</span>
        </div>

        <p className="market-reality-primary-text">
          Неудачных попыток выхода на новый рынок — из-за отсутствия живого
          знания о нём. Не аналитики. Присутствия.
        </p>
      </article>

      <div className="market-reality-secondary">
        <article className="market-reality-secondary-item">
          <div className="market-reality-secondary-number">
            <span>50</span><span className="market-reality-plus">+</span>
          </div>
          <p>Прямых контактов — минимум для понимания специфики рынка</p>
        </article>

        <article className="market-reality-secondary-item">
          <div className="market-reality-secondary-number">
            <span className="market-reality-number-main-small">40</span>
            <span className="market-reality-number-mark-small">%</span>
          </div>
          <p>Стартапов гибнут из-за невостребованности продукта в новой среде</p>
        </article>
      </div>
    </div>
  </div>
</section>
```

## CSS — готовая реализация

```css
.market-reality {
  position: relative;
  padding: 116px 0 112px;
  overflow: hidden;
  background:
    radial-gradient(720px 360px at 18% 42%, rgba(255,119,34,.035), transparent 72%),
    var(--bg-canvas);
}

.market-reality-eyebrow {
  margin-bottom: 34px;
  color: var(--orange-600);
  font: 600 12px/1.2 Inter, HelveticaNeueCyr, sans-serif;
  letter-spacing: .12em;
  text-transform: uppercase;
}

.market-reality-layout {
  display: grid;
  grid-template-columns: minmax(0, 1.05fr) minmax(360px, .95fr);
  min-height: 430px;
  border-top: 1px solid var(--border-hairline);
  border-bottom: 1px solid var(--border-hairline);
}

.market-reality-primary {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 58px 72px 58px 0;
}

.market-reality-primary-number {
  display: flex;
  align-items: flex-start;
  width: fit-content;
  line-height: .82;
}

.market-reality-number-main {
  font: 500 clamp(92px, 9vw, 124px)/.82 "Playfair Display", Georgia, serif;
  letter-spacing: -.055em;
  color: var(--text-primary);
}

.market-reality-number-mark {
  margin: 10px 0 0 10px;
  font: 500 clamp(32px, 3vw, 44px)/1 "Playfair Display", Georgia, serif;
  color: var(--orange-600);
  transform: translateY(-.08em);
}

.market-reality-primary-text {
  max-width: 390px;
  margin: 30px 0 0;
  font: 400 clamp(17px, 1.4vw, 19px)/1.62 Inter, HelveticaNeueCyr, sans-serif;
  color: var(--text-secondary);
}

.market-reality-secondary {
  display: flex;
  flex-direction: column;
  border-left: 1px solid var(--border-hairline);
}

.market-reality-secondary-item {
  flex: 1 1 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 42px 0 42px 64px;
}

.market-reality-secondary-item + .market-reality-secondary-item {
  border-top: 1px solid var(--border-hairline);
}

.market-reality-secondary-number {
  display: flex;
  align-items: flex-start;
  width: fit-content;
  font: 500 clamp(58px, 5vw, 72px)/.9 "Playfair Display", Georgia, serif;
  letter-spacing: -.045em;
  color: var(--text-primary);
}

.market-reality-plus {
  margin-left: 3px;
  color: var(--orange-600);
}

.market-reality-number-main-small {
  line-height: .9;
}

.market-reality-number-mark-small {
  margin: 2px 0 0 7px;
  font: 500 28px/1 "Playfair Display", Georgia, serif;
  color: var(--orange-600);
  transform: translateY(-.08em);
}

.market-reality-secondary-item p {
  max-width: 340px;
  margin: 8px 0 0;
  font: 400 15px/1.58 Inter, HelveticaNeueCyr, sans-serif;
  color: var(--text-secondary);
}

@media (max-width: 900px) {
  .market-reality {
    padding: 88px 0;
  }

  .market-reality-layout {
    grid-template-columns: 1fr;
  }

  .market-reality-primary {
    padding: 48px 0 56px;
  }

  .market-reality-secondary {
    border-left: 0;
    border-top: 1px solid var(--border-hairline);
  }

  .market-reality-secondary-item {
    padding: 36px 0;
  }
}

@media (max-width: 560px) {
  .market-reality {
    padding: 72px 0;
  }

  .market-reality-eyebrow {
    margin-bottom: 24px;
  }

  .market-reality-primary-text {
    max-width: 330px;
    font-size: 16px;
  }

  .market-reality-secondary-number {
    font-size: 54px;
  }

  .market-reality-secondary-item {
    padding: 30px 0;
  }
}
```

## Что запрещено в 2.2

- Не делать три белые карточки.
- Не делать три стеклянные карточки.
- Не использовать `box-shadow` вокруг каждого показателя.
- Не использовать одинаковые rounded rectangles.
- Не центрировать все три показателя.
- Не делать оранжевыми все цифры.
- Не добавлять иконки, графики, pie charts, arrows или декоративные иллюстрации.
- Не добавлять hover-анимацию `translateY` для всей секции.
- Не превращать блок в dashboard.

## Анимация

Анимация минимальная. При появлении секции допускается только мягкий `opacity + translateY(8px)` для содержимого. Длительность 500–700ms.

Не использовать count-up для этих показателей, если он уже не является частью текущей реализации: цифры должны восприниматься как редакционный факт, а не как dashboard live-data.

## Acceptance check

После реализации агент обязан проверить:

1. На desktop сразу читается иерархия `60` → `50+ / 40%`.
2. Нет ощущения трёх одинаковых KPI-карточек.
3. `60` визуально доминирует.
4. `%` у `60` и `40` остаётся отдельным оранжевым акцентом.
5. Вертикальная линия реально разделяет левую и правую части.
6. Горизонтальная линия разделяет `50+` и `40%`.
7. Нет внешней карточки/рамки вокруг всей секции.
8. Фон остаётся тёплым и светлым, без явного orange fill.
9. На mobile композиция становится вертикальной, но сохраняет иерархию.
10. Тексты и факты не изменены.

------------------------------------------------------------------------

# 2.3 PLATFORM STATEMENT

Сохранить существующие тексты:

> FExperience — специальный проект команды Forbes, который поможет
> оценить готовность вашего бизнеса к масштабированию, раскрыв основные
> риски и возможности экспансии.

> Мы предлагаем авторские маршруты уникальных бизнес-экспедиций и
> собственный независимый дью-дилидженс.

Убрать шаблон `линия → H2 → текст → три pill-card → кнопка`.

Сделать большой editorial statement:

``` css
.platform-statement {
  padding: 128px 0;
  background: var(--bg-canvas);
}

.platform-statement-inner {
  max-width: 1120px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 180px minmax(0,760px);
  gap: 64px;
}

.platform-statement-index {
  padding-top: 12px;
  color: var(--orange-600);
  font: 600 12px/1.4 Inter,sans-serif;
  letter-spacing: .12em;
  text-transform: uppercase;
}

.platform-statement-index::before {
  content: "";
  display: block;
  width: 48px;
  height: 1px;
  margin-bottom: 18px;
  background: var(--orange-600);
}

.platform-statement-title {
  font: 600 clamp(34px,4vw,52px)/1.12 "Playfair Display",serif;
  letter-spacing: -.025em;
}

.platform-statement-subtitle {
  max-width: 640px;
  margin-top: 28px;
  font: 400 17px/1.7 Inter,sans-serif;
  color: var(--text-secondary);
}
```

Три существующие метки `АНАЛИТИКА / НАДЕЖНОСТЬ / ПРОВЕРКА` оставить, но
сделать маленькими editorial pills, а не карточками:

``` css
.platform-pill {
  padding: 10px 16px;
  border: 1px solid rgba(255,107,44,.18);
  border-radius: var(--radius-pill);
  background: rgba(255,255,255,.38);
  color: var(--text-secondary);
  font: 500 12px/1 Inter,sans-serif;
}
```

------------------------------------------------------------------------

# 2.4 CONTINENTAL NAVIGATION

Это **не переделывать в обычный bento**. Сохранить идею atlas:

- Африка;
- Азия;
- Латинская Америка;
- Россия;
- реальные локальные SVG;
- оранжевые точки на реальных регионах;
- стекло.

SVG:

``` text
/public/images/continents/africa.svg
/public/images/continents/asia.svg
/public/images/continents/latam.svg
/public/images/continents/russia.svg
```

**Не рисовать маршруты и линии между точками.**

Карточка:

``` css
.region-card {
  position: relative;
  min-height: 280px;
  overflow: hidden;
  border-radius: var(--radius-lg);

  background:
    linear-gradient(
      135deg,
      rgba(255,255,255,.52),
      rgba(255,255,255,.26)
    );

  border: 1px solid rgba(255,255,255,.82);

  box-shadow:
    0 10px 36px rgba(26,26,26,.045),
    inset 0 1px 0 rgba(255,255,255,.7);

  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);
}
```

SVG использовать как `<Image>`/`img`, не перерисовывать path:

``` tsx
<Image
  src={region.mapSrc}
  alt=""
  fill
  aria-hidden="true"
  className="region-map"
/>
```

``` css
.region-map {
  position: absolute;
  width: 58%;
  height: 78%;
  right: 3%;
  top: 50%;
  transform: translateY(-50%);
  object-fit: contain;
  opacity: .42;
  pointer-events: none;
}
```

Точки:

``` tsx
{region.markers.map(marker => (
  <span
    key={marker.id}
    className="region-marker"
    style={{left:`${marker.x}%`,top:`${marker.y}%`}}
  />
))}
```

``` css
.region-marker {
  position: absolute;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--orange-500);
  box-shadow: 0 0 0 4px rgba(255,107,44,.10);
  z-index: 3;
}
```

Текст поверх SVG:

``` css
.region-card-content {
  position: relative;
  z-index: 4;
  min-height: 280px;
  padding: 30px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.region-card-title {
  margin-top: auto;
  font: 600 clamp(28px,3vw,42px)/1 "Playfair Display",serif;
  color: var(--text-primary);
}

.region-card-meta {
  margin-top: 8px;
  font: 400 13px/1.4 Inter,sans-serif;
  color: var(--text-secondary);
}
```

Hover — только очень лёгкий:

``` css
.region-card:hover {
  transform: translateY(-3px);
  box-shadow:
    0 18px 48px rgba(26,26,26,.07),
    inset 0 1px 0 rgba(255,255,255,.8);
}
```

------------------------------------------------------------------------

# 2.5 FEATURED MARKETS — ВИЗУАЛЬНЫЙ ПОРТФЕЛЬ ЭКСПЕДИЦИЙ

**Не делать простой список и не возвращать стандартный bento.**

2.4 уже отвечает за географию и выбор региона через реальные SVG-контуры. 2.5 должен показать **сами экспедиции как продукт**: фотографию, атмосферу страны, статус и конкретную дату.

Главная композиция: **одна крупная cinematic-фотография + локальная liquid-glass панель**, ниже — вторичные направления как editorial-полоса. Это не второй Hero и не каталог карточек.

### Desktop-композиция

```text
БЛИЖАЙШИЕ ЭКСПЕДИЦИИ

┌─────────────────────────────────────────────────────────────┐
│                                                             │
│                 БОЛЬШОЕ ФОТО НАПРАВЛЕНИЯ                   │
│                                                             │
│                                      ┌───────────────────┐  │
│                                      │ БЛИЖАЙШАЯ         │  │
│                                      │ ЭКСПЕДИЦИЯ        │  │
│                                      │                   │  │
│                                      │ ЮАР               │  │
│                                      │ Бизнес-экспедиция │  │
│                                      │ 15—21 ноября 2026 │  │
│                                      │ Подробнее →       │  │
│                                      └───────────────────┘  │
└─────────────────────────────────────────────────────────────┘

┌──────────────────────────┬────────────────────────────────┐
│ ВЬЕТНАМ                  │ ИНДИЯ                           │
│ фото / статус / дата  ↗ │ фото / статус / дата          ↗ │
└──────────────────────────┴────────────────────────────────┘
```

### Правила

- Использовать реальные данные из `src/data/expeditions.ts`; ничего не придумывать.
- Главному направлению дать наибольший визуальный вес.
- Не использовать градиент `--gradient-signature` как фон вместо фотографии.
- Не затемнять фотографию полностью: она должна оставаться главным материалом.
- Glass только локально — вокруг информации, а не поверх всей фотографии.
- Вторичные направления не делать одинаковыми «карточками SaaS».
- Не добавлять иконки ради декора.
- Не добавлять карту континента: она уже находится в 2.4.
- Не добавлять постоянный parallax/3D.

### TSX

```tsx
<section className="featured-markets">
  <div className="container">
    <header className="featured-markets-header">
      <span className="eyebrow">БЛИЖАЙШИЕ ЭКСПЕДИЦИИ</span>
      <h2>Бизнес начинается там, где заканчивается знакомое</h2>
    </header>

    <article className="featured-expedition">
      <Image
        src={featured.image}
        alt=""
        fill
        className="featured-expedition-image"
      />

      <div className="featured-expedition-panel glass-surface">
        <span className="featured-expedition-status">{featured.statusLabel}</span>
        <h3>{featured.country}</h3>
        <p className="featured-expedition-type">Бизнес-экспедиция</p>
        <p className="featured-expedition-date">{featured.date}</p>
        <a href={featured.href} className="btn-liquid">Подробнее →</a>
      </div>
    </article>

    <div className="secondary-expeditions">
      {secondary.map((expedition) => (
        <a key={expedition.id} href={expedition.href} className="secondary-expedition">
          <div className="secondary-expedition-image">
            <Image src={expedition.image} alt="" fill />
          </div>
          <div className="secondary-expedition-content">
            <span>{expedition.statusLabel}</span>
            <h3>{expedition.country}</h3>
            <p>{expedition.date}</p>
          </div>
          <span className="secondary-expedition-arrow">↗</span>
        </a>
      ))}
    </div>
  </div>
</section>
```

### CSS

```css
.featured-markets {
  padding: 120px 0;
  background:
    radial-gradient(800px 380px at 50% 0%, rgba(255,119,34,.055), transparent 72%),
    var(--bg-canvas);
}

.featured-markets-header { max-width: 760px; margin-bottom: 48px; }
.featured-markets-header h2 {
  margin-top: 14px;
  font: 600 clamp(36px,4vw,54px)/1.08 "Playfair Display", serif;
  letter-spacing: -.025em;
}

.featured-expedition {
  position: relative;
  min-height: 590px;
  overflow: hidden;
  border-radius: 28px;
  isolation: isolate;
}

.featured-expedition-image {
  object-fit: cover;
  z-index: 0;
  transition: transform 800ms var(--ease);
}

.featured-expedition::after {
  content: "";
  position: absolute;
  inset: 0;
  z-index: 1;
  background: linear-gradient(90deg, rgba(20,16,12,.02), rgba(20,16,12,.18));
  pointer-events: none;
}

.featured-expedition:hover .featured-expedition-image { transform: scale(1.018); }

.featured-expedition-panel {
  position: absolute;
  z-index: 3;
  right: 32px;
  bottom: 32px;
  width: min(420px, calc(100% - 64px));
  padding: 30px;
  border-radius: 22px;
  background: linear-gradient(135deg, rgba(255,255,255,.42), rgba(255,248,240,.20));
  border: 1px solid rgba(255,255,255,.68);
  backdrop-filter: blur(20px) saturate(112%);
  -webkit-backdrop-filter: blur(20px) saturate(112%);
  box-shadow: inset 0 1px 0 rgba(255,255,255,.62), 0 20px 55px rgba(20,16,12,.12);
}

.featured-expedition-status {
  display: inline-block;
  margin-bottom: 18px;
  color: var(--orange-600);
  font: 600 11px/1 HelveticaNeueCyr, sans-serif;
  letter-spacing: .10em;
  text-transform: uppercase;
}

.featured-expedition-panel h3 {
  font: 600 clamp(38px,4vw,58px)/.95 "Playfair Display", serif;
  letter-spacing: -.03em;
}

.featured-expedition-type { margin-top: 12px; font: 500 14px/1.4 HelveticaNeueCyr, sans-serif; }
.featured-expedition-date { margin: 6px 0 24px; font: 400 14px/1.5 HelveticaNeueCyr, sans-serif; color: var(--text-secondary); }

.secondary-expeditions {
  display: grid;
  grid-template-columns: 1.15fr .85fr;
  margin-top: 28px;
  border-top: 1px solid var(--border-hairline);
}

.secondary-expedition {
  display: grid;
  grid-template-columns: 170px 1fr auto;
  align-items: center;
  gap: 24px;
  min-height: 150px;
  padding: 20px 24px 20px 0;
  color: inherit;
  text-decoration: none;
  border-bottom: 1px solid var(--border-hairline);
}

.secondary-expedition + .secondary-expedition { padding-left: 24px; border-left: 1px solid var(--border-hairline); }
.secondary-expedition-image { position: relative; width: 170px; height: 108px; overflow: hidden; border-radius: 14px; }
.secondary-expedition-image img { object-fit: cover; transition: transform 500ms var(--ease); }
.secondary-expedition:hover img { transform: scale(1.03); }
.secondary-expedition-content > span { font: 600 10px/1 HelveticaNeueCyr, sans-serif; color: var(--orange-600); letter-spacing: .08em; text-transform: uppercase; }
.secondary-expedition-content h3 { margin-top: 8px; font: 600 28px/1 "Playfair Display", serif; }
.secondary-expedition-content p { margin-top: 8px; font: 400 13px/1.4 HelveticaNeueCyr, sans-serif; color: var(--text-secondary); }
.secondary-expedition-arrow { color: var(--orange-600); font-size: 22px; transition: transform 300ms var(--ease); }
.secondary-expedition:hover .secondary-expedition-arrow { transform: translate(3px,-3px); }

@media (max-width: 760px) {
  .featured-markets { padding: 80px 0; }
  .featured-expedition { min-height: 520px; }
  .featured-expedition-panel { left: 16px; right: 16px; bottom: 16px; width: auto; padding: 24px; }
  .secondary-expeditions { grid-template-columns: 1fr; }
  .secondary-expedition, .secondary-expedition + .secondary-expedition { padding: 18px 0; border-left: 0; }
  .secondary-expedition-image { width: 120px; height: 90px; }
}
```


# 2.5A НАША ПОЗИЦИЯ — РУКОПИСНЫЙ EDITORIAL MANIFESTO

**Разместить сразу после блока 2.5 FEATURED MARKETS — ВИЗУАЛЬНЫЙ ПОРТФЕЛЬ ЭКСПЕДИЦИЙ и до 2.6 WHY FEXPERIENCE.**

Этот блок — короткая визуальная пауза после экспедиций. Он не является карточкой, CTA, Bento, glass-компонентом или обычным блоком «О компании».

Главная идея — **личная редакционная позиция FExperience**, оформленная как рукописный манифест.

## Текст — НЕ ИЗМЕНЯТЬ

Label:

`НАША ПОЗИЦИЯ`

Основной текст:

> Мы не организуем туристические поездки. Мы проводим **бизнес-экспедиции**. Результат — ваше взвешенное решение об экспансии.

Подпись:

`FExperience by Forbes Russia`

## Ключевое правило типографики

Основная часть манифеста должна быть **рукописной**.

Использовать реальный handwritten / editorial handwriting font. Не имитировать рукопись через `italic` у обычного serif и не использовать дешёвый декоративный cursive.

**Основной рукописный текст — чёрный / очень тёмный графит.**

Только слова **«бизнес-экспедиции»** должны отличаться:

- печатный editorial serif / display serif;
- фирменный оранжевый цвет;
- при необходимости очень тонкое underline.

Таким образом визуальная формула строго такая:

`ЧЁРНАЯ РУКОПИСЬ → ОРАНЖЕВОЕ ПЕЧАТНОЕ АКЦЕНТНОЕ СЛОВО → ЧЁРНАЯ РУКОПИСЬ`

Не красить весь манифест в оранжевый.

## Иерархия

### Label

`НАША ПОЗИЦИЯ` — небольшой sans-serif uppercase.

```css
.position-label {
  margin-bottom: 34px;
  font-family: var(--font-sans, Inter), sans-serif;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: .16em;
  text-transform: uppercase;
  color: var(--orange-600);
}
```

### Основной манифест

```css
.position-manifesto {
  margin: 0;
  max-width: 760px;

  font-family: var(--font-handwritten);
  font-size: clamp(38px, 3.2vw, 58px);
  line-height: 1.06;
  font-weight: 400;
  letter-spacing: -.015em;

  /* ВЕСЬ РУКОПИСНЫЙ ТЕКСТ — ЧЁРНЫЙ */
  color: var(--text-primary);
}
```

### Акцент

```css
.position-accent {
  /* Только это слово становится печатным */
  font-family: var(--font-display-serif, "Playfair Display"), serif;
  font-weight: 500;

  /* Только это слово — оранжевое */
  color: var(--orange-600);

  text-decoration: underline;
  text-decoration-thickness: 1px;
  text-underline-offset: 5px;
}
```

Underline не обязателен. Если без него слово уже достаточно выразительно, убрать underline.

### Подпись

```css
.position-signature {
  margin-top: 42px;
  font-family: var(--font-sans, Inter), sans-serif;
  font-size: 14px;
  line-height: 1.4;
  letter-spacing: .02em;
  color: var(--text-secondary);
}
```

## Композиция

Не центрировать весь блок как стандартный landing-page statement.

Использовать editorial-композицию с тонкой вертикальной линией слева от текстовой колонки.

```text
        │
        │    НАША ПОЗИЦИЯ
        │
        │    Мы не организуем туристические поездки.
        │    Мы проводим бизнес-экспедиции.
        │    Результат — ваше взвешенное решение
        │    об экспансии.
        │
        │    FExperience by Forbes Russia
```

CSS:

```css
.position-section {
  position: relative;
  padding: 140px 0 160px;
  background: var(--bg-canvas);
}

.position-content {
  width: min(760px, calc(100% - 48px));
  margin-left: clamp(120px, 18vw, 280px);
}

.position-line {
  position: absolute;
  left: clamp(48px, 8vw, 120px);
  top: 140px;
  width: 1px;
  height: 220px;
  background: rgba(26,26,26,.14);
}
```

Линия — не рамка и не декоративный UI-элемент. Она должна ощущаться как тонкая редакционная направляющая.

## TSX-структура

```tsx
<section className="position-section" aria-labelledby="position-title">
  <div className="position-line" aria-hidden="true" />

  <div className="position-content">
    <div className="position-label" id="position-title">
      НАША ПОЗИЦИЯ
    </div>

    <p className="position-manifesto">
      Мы не организуем туристические поездки. Мы проводим{' '}
      <span className="position-accent">
        бизнес-экспедиции
      </span>
      . Результат — ваше взвешенное решение об экспансии.
    </p>

    <div className="position-signature">
      FExperience by Forbes Russia
    </div>
  </div>
</section>
```

## Фон и материал

Не использовать glassmorphism.

Не помещать манифест внутрь белой карточки.

Не добавлять:

- фотографии;
- иконки;
- pills;
- CTA;
- статистику;
- blobs;
- glow вокруг текста;
- декоративные круги;
- стрелки;
- вторую кнопку.

Фон — существующий тёплый фон проекта. Можно использовать тот же `var(--bg-canvas)` и существующий очень слабый тёплый radial-gradient, если он уже применяется глобально.

## Mobile

На мобильном сохранить левую editorial-композицию и вертикальную линию.

```css
@media (max-width: 760px) {
  .position-section {
    padding: 88px 0 100px;
  }

  .position-content {
    width: calc(100% - 72px);
    margin-left: 56px;
  }

  .position-line {
    left: 24px;
    top: 88px;
    height: 190px;
  }

  .position-manifesto {
    font-size: clamp(30px, 8vw, 40px);
    line-height: 1.08;
  }

  .position-signature {
    margin-top: 30px;
  }
}
```

## Жёсткие запреты для AI-агента

Не делать этот блок:

- печатным serif целиком;
- полностью оранжевым;
- центрированным как обычный H2 + paragraph;
- стеклянной карточкой;
- Bento;
- «О нас» с тремя преимуществами;
- CTA-секцией;
- набором декоративных элементов.

**Главный визуальный контраст блока:** рукописный чёрный текст + одно печатное оранжевое акцентное слово.

Блок должен восприниматься как **личная редакционная запись бренда**, а не как очередная UI-секция.


# 2.6 WHY FEXPERIENCE — СОХРАНИТЬ ТЕКУЩУЮ КОНЦЕПЦИЮ

**Этот блок не переделывать в обычную сетку фотографий.** В текущем Spec уже есть правильная индивидуальная идея: фото на всю карточку → живое frosted glass → оранжевые угловые дуги → HTML-контент. Первая карточка featured, остальные спокойнее. Сохранять именно эту концепцию.

### Что оставить без изменения

- 6 существующих фотографий и их тематику.
- 6 существующих смысловых блоков и тексты.
- featured-карточку №1 с большим визуальным весом.
- карточки №2–6 как вторичные.
- номер карточки.
- тег-пилюлю.
- оранжевые угловые дуги.
- разницу между featured Glass Signature и обычным glass.
- сетку `1.5fr 1fr 1fr`, где первая карточка занимает две строки.

Именно это зафиксировано в исходной спецификации.

### Что аккуратно улучшить

1. Не превращать glass в непрозрачную молочную заливку.
2. Фото должно быть заметно за стеклом.
3. Затемнять только ту область, где реально находится текст.
4. Featured допускает более сильное тёплое свечение; остальные — без заметного glow.
5. Не добавлять дополнительные иконки или декоративные элементы.
6. Не менять тексты и не придумывать новые преимущества.
7. Угловые оранжевые дуги должны быть тонкими и материальными, а не neon.

### Финальный принцип

Это должен выглядеть как **одна большая художественно оформленная система карточек**, а не как шесть одинаковых AI-компонентов. Контраст создаётся размером, фотографией, стеклом и количеством декора, а не разными случайными эффектами.

### Контент

Использовать только существующий список из Build Spec: 01 «Уникальный нетворкинг Forbes», 02 «Медийное сопровождение», 03 «Экспансия бизнеса без купюр», 04 «Контакты с госструктурами», 05 «Оценка бизнес-модели», 06 «Культурное погружение».

# 2.7 MEDIA LAYER — EDITORIAL MEDIA SPREAD

**Не превращать блок в набор карточек со статистикой.** В исходной структуре уже есть правильная композиция: слева два наложенных реальных изображения Forbes, справа заголовок, текст и три вертикальные строки статистики. Эту идею сохранить.

### Layout

```text
┌──────────────────────────────┐    Участники экспедиции
│                              │    в центре внимания
│       НОУТБУК / FORBES       │
│                              │    текст
│             ┌───────────┐    │
│             │  ЖУРНАЛ   │    │    >1 МЛН  ЖУРНАЛ
│             └───────────┘    │    >10 МЛН САЙТ
│                              │    >100 ТЫС ВИДЕО
└──────────────────────────────┘
```

### Важные правила

- Использовать существующие `/images/media/nout.webp` и `/images/media/zhyrnal1.webp`.
- Сохранить наложение изображений.
- Статистику оставить вертикальным editorial-list, не grid.
- Не добавлять glass-card вокруг каждой цифры.
- Не добавлять логотипы/иконки ради заполнения пустого места.
- Сохранять реальный контент и цифры из Spec.

### CSS-акцент

Фото должны иметь собственную глубину через положение и тень. Не использовать одинаковые glass-панели поверх обоих изображений.

```css
.media-photos { position: relative; height: 420px; }
.media-photo-main {
  position: absolute; width: 85%; bottom: 0; left: 0;
  border-radius: var(--radius-md);
  object-fit: cover;
  box-shadow: var(--shadow-hover);
}
.media-photo-mag {
  position: absolute; width: 55%; top: 0; right: 0;
  border-radius: var(--radius-md);
  object-fit: cover;
  box-shadow: var(--shadow-hover);
  border: 3px solid var(--bg-elevated);
}
```

Статистика — тонкие разделители, крупная Playfair-цифра оранжевого цвета и спокойный HelveticaNeueCyr-текст.

# 2.8 TESTIMONIALS — РЕДАКЦИОННАЯ КАРУСЕЛЬ

Сохранить Embla Carousel и реальные отзывы. Не превращать отзывы в одинаковую сетку карточек.

### Композиция

Один отзыв должен восприниматься как **цитата из editorial-материала**, а соседний частично виден и подсказывает продолжение. Это создаёт движение без лишних эффектов.

```css
.testimonials-track {
  display: flex;
  gap: 18px;
}

.testimonial-card {
  flex: 0 0 min(720px, 78vw);
  padding: 40px;
  background: rgba(255,255,255,.34);
  border: 1px solid rgba(255,255,255,.74);
  border-radius: 24px;
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);
  box-shadow:
    inset 0 1px 0 rgba(255,255,255,.65),
    0 14px 40px rgba(26,26,26,.045);
}
```

### Не добавлять

- одинаковые аватары-кружки, если нет качественных реальных фотографий;
- декоративные иконки;
- разноцветные карточки;
- большие тени;
- 3D/parallax.

Декоративная кавычка должна быть типографической, а не иконкой. Реальные имена, компании, теги и цитаты не менять. Данные карусели указаны в Build Spec.

# 2.9 FAQ — ТИПОГРАФИЧЕСКИЙ ACCORDION

FAQ должен быть самым спокойным блоком страницы. Его задача — снять вопросы перед Final CTA, а не создавать очередной визуальный эффект.

Не использовать карточки, плитку, иконки в квадратных контейнерах или bento.

```css
.faq {
  padding: 120px 0;
  background: var(--bg-canvas);
}

.faq-inner {
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 80px;
}

.faq-list {
  border-top: 1px solid var(--border-hairline);
}

.faq-item {
  border-bottom: 1px solid var(--border-hairline);
}

.faq-question {
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: 24px;
  padding: 25px 0;
  background: transparent;
  border: 0;
  text-align: left;
  font: 500 17px/1.4 HelveticaNeueCyr, sans-serif;
  color: var(--text-primary);
}

.faq-icon {
  width: 30px;
  height: 30px;
  flex: 0 0 30px;
  display: grid;
  place-items: center;
  border: 1px solid rgba(255,107,44,.22);
  border-radius: 50%;
  color: var(--orange-600);
  transition: transform .3s var(--ease), background .3s var(--ease);
}

.faq-item.is-open .faq-icon {
  transform: rotate(45deg);
  background: var(--orange-100);
}
```

На mobile перейти в одну колонку. Анимация открытия — только высота/opacity существующего ответа, без пружинящих эффектов.

# 2.10 FINAL CTA — СПОКОЙНАЯ ФИНАЛЬНАЯ ТОЧКА

**Существующий текст Final CTA не менять.** Не добавлять следующую экспедицию, рекомендации страны, каталог направлений или дополнительный продуктовый блок.

Это не второй Hero. Это спокойное завершение страницы после FAQ.

### Визуальная идея

Тёплый фон + один центральный glass-панельный контейнер + существующий CTA. Стекло здесь должно быть почти невидимым материалом, а не главным эффектом.

```css
.final-cta {
  position: relative;
  overflow: hidden;
  padding: 136px 24px;
  background:
    radial-gradient(
      700px 340px at 50% 50%,
      rgba(255,107,44,.10),
      transparent 70%
    ),
    var(--bg-surface);
}

.final-cta-panel {
  max-width: 820px;
  margin: 0 auto;
  padding: 64px 56px;
  text-align: center;
  border-radius: 28px;
  background: linear-gradient(135deg, rgba(255,255,255,.48), rgba(255,255,255,.22));
  border: 1px solid rgba(255,255,255,.78);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  box-shadow:
    inset 0 1px 0 rgba(255,255,255,.72),
    0 20px 60px rgba(26,26,26,.045);
}

.final-cta h2 {
  max-width: 680px;
  margin: 0 auto;
  font: 600 clamp(34px,4vw,52px)/1.08 "Playfair Display", serif;
  letter-spacing: -.025em;
}
```

CTA оставить существующим `.btn-liquid`. Не добавлять вторую кнопку только ради композиции.

---

# 2.8A COUNTDOWN — ОТДЕЛЬНАЯ АТМОСФЕРНАЯ СЦЕНА

> **Это финальная инструкция для Countdown Timer. Она имеет приоритет над любыми более ранними инструкциями по Countdown в других документах проекта.**

## Цель

Существующий таймер не переделывать в новый компонент. Создать для него отдельную визуальную среду: **очень светлая editorial-фотография + тёплый молочный overlay + существующий стеклянный таймер**.

Не менять countdown-логику, структуру, цифры, шрифты и утверждённую композицию таймера.

## 2.8A.1 Фоновое изображение

Использовать отдельную локальную фотографию `/images/countdown-bg.webp`.

Фотография должна быть спокойной, editorial, premium, с большими свободными зонами и без объекта, конкурирующего с таймером. Она работает как **среда позади стекла**, а не как второй Hero.

## 2.8A.2 Фон секции

```css
.countdown-section {
  position: relative;
  overflow: hidden;

  background:
    linear-gradient(
      90deg,
      rgba(255, 246, 238, 0.96) 0%,
      rgba(255, 242, 232, 0.78) 50%,
      rgba(255, 246, 238, 0.96) 100%
    ),
    url("/images/countdown-bg.webp") center / cover no-repeat;
}
```

Не затемнять фотографию ради стекла. Если изображение слишком контрастное — сначала усилить молочный overlay.

## 2.8A.3 Glass Timer

Сохранить:

- размер;
- высоту;
- расположение;
- четыре значения;
- Playfair Display для цифр;
- HelveticaNeueCyr для служебного текста;
- оранжевые цифры;
- разделители;
- подпись экспедиции;
- countdown-логику.

Добавить только тонкий светлый кант и очень мягкую глубину:

```css
.home-countdown {
  border: 1px solid rgba(255, 255, 255, 0.72);

  box-shadow:
    0 18px 50px rgba(120, 66, 30, 0.06),
    inset 0 1px 0 rgba(255, 255, 255, 0.90);
}
```

Не использовать оранжевую рамку.

## 2.8A.4 Living Glass

Добавить только очень слабое тёплое отражение. Оно должно ощущаться как свет, отражённый в стекле, а не как CSS-glow.

```css
.home-countdown::before {
  content: "";
  position: absolute;
  width: 320px;
  height: 220px;
  top: -150px;
  right: 80px;
  background: rgba(255, 107, 44, 0.055);
  filter: blur(70px);
  border-radius: 50%;
  pointer-events: none;
  z-index: 0;
}

.home-countdown::after {
  content: "";
  position: absolute;
  width: 260px;
  height: 160px;
  left: -100px;
  bottom: -110px;
  background: rgba(255, 145, 90, 0.035);
  filter: blur(65px);
  border-radius: 50%;
  pointer-events: none;
  z-index: 0;
}

.home-countdown__eyebrow,
.home-countdown__values,
.home-countdown__caption {
  position: relative;
  z-index: 1;
}
```

Свечение **не анимировать**.

## 2.8A.5 Визуальная иерархия

1. Hero — самый сильный визуальный блок.
2. Countdown — отдельная атмосферная сцена.
3. Фотография — фон/фактура.
4. Glass Timer — главный объект сцены.
5. Цифры — главный объект внутри таймера.

Фотография не должна становиться вторым Hero.

## 2.8A.6 Запрещено

- decorative blobs;
- random gradients;
- glowing circles;
- floating shapes;
- дополнительные glass cards;
- отдельные карточки для дней/часов/минут/секунд;
- moving gradient;
- animated glow;
- excessive blur;
- neon orange;
- generic bento layout.

Не добавлять элементы только ради «эффектности».

## 2.8A.7 Acceptance checklist

- [ ] Фон Countdown отличается от обычного фона сайта.
- [ ] Используется отдельная локальная фотография.
- [ ] Фотография светлая и спокойная.
- [ ] Видна лёгкая фотографическая фактура.
- [ ] Overlay тёплый и молочный, не оранжевый.
- [ ] Фотография не конкурирует с Hero.
- [ ] Таймер остаётся главным объектом.
- [ ] Стекло имеет тонкий светлый кант.
- [ ] Есть очень слабое тёплое отражение.
- [ ] Нет neon glow.
- [ ] Нет оранжевой рамки.
- [ ] Нет анимации свечения.
- [ ] Нет дополнительных карточек внутри таймера.
- [ ] Countdown-логика не изменена.
- [ ] Шрифты не изменены.
- [ ] Размеры и композиция таймера не изменены.

### Главный критерий Countdown

> **Будто перед нами светлая фотографическая поверхность, а поверх неё действительно стоит тонкая полупрозрачная пластина из стекла.**

Если эффект выглядит как CSS-декорация — он слишком сильный. Если секция снова выглядит как обычная белая карточка — фотография/overlay слишком слабые. При сомнении выбирать более спокойный вариант.

---

# 4. ФИНАЛЬНЫЙ MASTER ACCEPTANCE CHECK

Перед завершением агент обязан проверить:

- [ ] Hero не изменён.
- [ ] 2.2 не является тремя KPI-карточками.
- [ ] 2.4 использует реальные SVG-контуры континентов/регионов, а не абстрактные фигуры.
- [ ] 2.5 не является простым списком направлений и не является стандартным Bento.
- [ ] 2.5A расположен после 2.5 и использует рукописный чёрный текст с одним печатным оранжевым акцентным словом.
- [ ] 2.6 сохраняет утверждённую фотографию + glass + editorial карточную концепцию.
- [ ] 2.7–2.9 не превращены в одинаковые карточки.
- [ ] Countdown имеет отдельную editorial-фотографическую среду.
- [ ] Countdown glass имеет тонкий светлый кант и едва заметное тёплое отражение.
- [ ] Final CTA сохраняет существующий текст.
- [ ] Следующая экспедиция в Final CTA не добавлена.
- [ ] Нет новых CMS/MDX/remote data sources.
- [ ] Нет случайных UI-паттернов, blobs, neon, generic AI decoration.
- [ ] Страница выглядит как единый дорогой editorial-проект, а не как коллекция компонентов из UI-библиотеки.

## Критический принцип

**Не улучшать утверждённые решения по собственной инициативе. Сначала реализовать Master буквально. Любая дополнительная креативная интерпретация, меняющая структуру, данные, порядок или характер блока, запрещена без отдельного запроса.**
