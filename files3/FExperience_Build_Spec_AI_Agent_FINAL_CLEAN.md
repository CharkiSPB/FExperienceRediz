# FExperience — Implementation Build Spec (для AI-агента)
## Поблочная сборка редизайна

Этот документ — исполнительная спецификация для реализации. Стратегия, контент-логика и обоснования — в `FExperience_Redesign_Spec_v4_FINAL.md`, здесь их не дублируем, только точные значения для вёрстки: шрифты, цвета, отступы, размеры, поведение по брейкпоинтам.

Порядок работы агента: сначала раздел 0 (глобальные токены) — завести в CSS/Tailwind config один раз, дальше каждый блок ссылается только на эти токены, никаких новых цветов/отступов "по месту" не создавать.

---

---

## ⚠️ ВАЖНО ДЛЯ АГЕНТА — КАРТА ФИНАЛЬНЫХ ВЕРСИЙ

Этот документ создавался итерационно. Некоторые компоненты описаны дважды:
**ранняя версия** в разделах 0–13 и **финальная версия** в разделах 14–15.

**Правило:** при конфликте между разделами — всегда использовать **более поздний раздел**.
Таблица ниже — единственный источник правды о том, где финальный код каждого компонента.

| Компонент / класс | Финальный раздел | Ранние упоминания — игнорировать |
|---|---|---|
| `.btn-liquid` (Liquid Glass кнопка) | **14.1** | 0.7 |
| `.glass-01` (базовое стекло) | **14.2** | 0.6 |
| `.glass-02` (hover стекло) | **14.2** | 0.6 |
| `.glass-signature` (featured карточка) | **14.3** | 0.6 |
| `.hero-tag` (теги в hero) | **14.5** | 5.1 |
| `.countdown-block/number/label` | **14.6** | 5.5.5, 10.5 |
| `.scroll-progress` | **14.8** | 11.6 |
| `.testimonial-card` | **14.9** | 2.8 |
| `.why-card / .why-card-featured` | **14.10** | 2.6 ⚠️ Но фоновые фото — только в 2.6 |
| `.form-panel` и поля формы | **14.11** | 5.6 |
| Карта континентов `MapContinent` | **14.13** | 4.5, 5.2 |
| `Preloader` компонент | **10.1** | (финальный — только здесь) |
| `.fade-up` + `useScrollReveal` | **Briefing Prompt** | 0.9 |
| `HeroSlider` (Embla) | **10.2** | (финальный — только здесь) |
| `CountdownTimer` через countup.js | **10.5 + 14.6** | кастомный хук убран |
| Шрифты в `layout.tsx` | **15.1** | 12.1 |
| `@theme` в `globals.css` | **12.2** | 0.2 (токены только для справки) |
| Данные экспедиций | **src/data/expeditions.ts** | Нет MDX, нет CMS, нет gray-matter |
| Статусы экспедиций | `'active'` / `'upcoming'` / `'completed'` | (подтверждено) |
| `RequestModal` | рестайл существующего | не создавать новую форму |
| `RootClientLayout` | структуру не менять | только рестайл Header/Footer/RequestModal |

**⚠️ Особый случай `.why-card-featured`:**
Раздел 2.6 — **единственный** где описаны фоновые изображения карточек и тег-пилюля.
Раздел 14.10 — финальный CSS этих карточек.
Использовать **оба раздела вместе**: структуру и фото из 2.6, CSS из 14.10.

**Порядок чтения документа:**
1. Прочитать весь документ целиком перед написанием кода
2. При наличии конфликта — таблица выше определяет приоритет
3. Разделы 14–15 всегда приоритетнее разделов 0–13

---


## 0. Глобальные основания

### 0.1 Брейкпоинты и контейнер

```
mobile:  ≤ 640px
tablet:  641–1024px
desktop: ≥ 1025px

Container max-width: 1280px
Padding контейнера: 24px (mobile), 32px (tablet), 64px (desktop)
Grid: 4 колонки (mobile), 8 колонок (tablet), 12 колонок (desktop)
Grid gap: 16px (mobile), 24px (tablet/desktop)
```

### 0.2 Цвет (повтор из мастер-спека — источник истины)

```css
--bg-canvas: #FFF8F3;
--bg-surface: #FFF1E8;
--bg-elevated: rgba(255,255,255,.72);

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

--gradient-signature: linear-gradient(45deg, #B7410E 0%, #FF7722 55%, #FFE8D6 100%);
--gradient-editorial-warm: linear-gradient(135deg, #FFF8F3 0%, #FFE8D6 48%, #FFF0E8 100%);
--continent-outline: #FFE6D8;

--border-hairline: rgba(26,26,26,.08);
```

### 0.3 Типографическая шкала

Шрифты подключаются локально через `next/font/local` (`localFont`): Playfair Display (weights 500/600/700) и HelveticaNeueCyr (нужные веса для body/UI). HelveticaNeueCyr используется для body/UI.

| Токен | Шрифт | Вес | Desktop | Mobile | Line-height | Letter-spacing | Цвет |
|---|---|---|---|---|---|---|---|
| `--type-display` (H1 hero) | Playfair Display | 700 | 64px | 36px | 1.05 | -0.02em | `--text-primary` |
| `--type-h2` (заголовок секции) | Playfair Display | 600 | 40px | 28px | 1.15 | -0.01em | `--text-primary` |
| `--type-h3` (заголовок карточки) | Playfair Display | 600 | 24px | 20px | 1.25 | 0 | `--text-primary` |
| `--type-stat` (крупная цифра) | Playfair Display | 700 | 56px | 40px | 1.0 | -0.02em | `--orange-600` |
| `--type-eyebrow` (лейбл над заголовком) | HelveticaNeueCyr | 600 | 13px | 12px | 1.4 | 0.08em, uppercase | `--orange-600` |
| `--type-body-lg` (вводный текст) | HelveticaNeueCyr | 400 | 18px | 16px | 1.6 | 0 | `--text-primary` |
| `--type-body` (основной текст) | HelveticaNeueCyr | 400 | 16px | 15px | 1.6 | 0 | `--text-secondary` |
| `--type-meta` (даты, подписи) | HelveticaNeueCyr | 400 | 13px | 13px | 1.5 | 0 | `--text-tertiary` |
| `--type-button` | HelveticaNeueCyr | 600 | 15px | 15px | 1 | 0.01em | наследуется |

### 0.4 Отступы (8px-сетка)

```
--space-1: 4px
--space-2: 8px
--space-3: 12px
--space-4: 16px
--space-5: 24px
--space-6: 32px
--space-7: 40px
--space-8: 56px
--space-9: 64px
--space-10: 96px
--space-11: 128px
```

Вертикальные отступы между секциями страницы: `96px` desktop / `56px` mobile (top и bottom секции). Внутри секции между заголовком и контентом: `40px` desktop / `24px` mobile.

### 0.5 Радиусы, тени, границы

```css
--radius-sm: 8px;   /* пилюли-теги, мелкие элементы */
--radius-md: 16px;  /* обычные карточки */
--radius-lg: 24px;  /* featured-карточки, крупные панели */
--radius-pill: 999px; /* кнопки, статус-бейджи, фильтры */

--shadow-resting: 0 4px 16px rgba(26,26,26,.05);
--shadow-hover: 0 12px 32px rgba(26,26,26,.09);
--shadow-glass: 0 8px 40px rgba(0,0,0,.06);
--shadow-glow: 0 0 24px rgba(255,107,44,.35);
--shadow-liquid: 0 0 40px rgba(255,107,44,.25);
```

### 0.6 Стекло — CSS-классы (переиспользуемые)

> **⚠️ ЧЕРНОВИК — финальный CSS в разделе 14.2 и 14.3. Этот раздел только для общего понимания.**
Раздел 0.6 содержит только базовые значения для быстрой справки.
Агент использует код из раздела 14, а не отсюда.

```css
/* Базовые значения — финальный код в разделе 14 */
.glass-01       { /* → раздел 14.2 */ }
.glass-02       { /* → раздел 14.2, hover-состояние */ }
.glass-signature { /* → раздел 14.3 */ }
```

### 0.7 Кнопки

> **⚠️ ЧЕРНОВИК — финальный CSS кнопки Liquid Glass в разделе 14.1. Этот раздел только для типологии.**
Раздел 0.7 содержит только типы кнопок для быстрой справки.

**Primary — Liquid Glass** → полный CSS в разделе 14.1.
Использовать: `Стать участником` / `Подать заявку` / `Подписаться`.

**Secondary — контурная пилюля** ("Подробнее" и всё остальное):
```css
.btn-outline {
  background: transparent;
  color: var(--text-primary);
  font: 600 15px/1 HelveticaNeueCyr;
  padding: 15px 31px;
  border: 1px solid var(--border-hairline);
  border-radius: var(--radius-pill);
  transition: border-color .2s, background .2s;
}
.btn-outline:hover {
  border-color: var(--orange-600);
  background: var(--orange-100);
}
```

**Tertiary — текстовая ссылка со стрелкой:**
```css
.btn-text {
  color: var(--orange-600);
  font: 600 15px/1 HelveticaNeueCyr;
  display: inline-flex;
  align-items: center;
  gap: 6px;
}
.btn-text svg { transition: transform .2s; }
.btn-text:hover svg { transform: translateX(4px); }
```

### 0.8 Статус-бейджи

```css
.badge-active {
  background: var(--orange-100);
  color: var(--orange-600);
  font: 600 12px/1 HelveticaNeueCyr;
  text-transform: uppercase;
  letter-spacing: .04em;
  padding: 6px 12px;
  border-radius: var(--radius-pill);
}
.badge-soon {
  background: transparent;
  color: var(--text-tertiary);
  border: 1px solid var(--text-tertiary);
  /* остальное — как .badge-active */
}
.badge-completed {
  background: var(--bg-surface);
  color: var(--text-secondary);
  /* остальное — как .badge-active */
}
```

### 0.9 Motion — тайминги и стратегия

```
--ease: cubic-bezier(0.16, 1, 0.3, 1);
--duration-fast: 150ms;
--duration-normal: 300ms;
--duration-slow: 500ms;

Карточки не имеют универсального hover-подъёма. Hover задаётся только компонентам, где он поддерживает смысл: image zoom, border/accent change или glass refraction. Массовый translateY для всех карточек запрещён.
Карта pulse: CSS @keyframes
Progress bar: нативный scroll event + CSS width
```

**Lenis (smooth scroll) — уже установлен в проекте**
Lenis переопределяет нативный скролл. `useScrollProgress` должен слушать Lenis, не `window`:
```tsx
// Если Lenis настроен глобально — получить инстанс и слушать его событие
lenis.on('scroll', ({ progress }) => {
  bar.style.width = `${progress * 100}%`
  bar.style.opacity = progress > 0.01 ? '1' : '0'
})
```
Intersection Observer для `useScrollReveal` работает корректно с Lenis без изменений.

**Scroll reveal — класс `.fade-up` + `useScrollReveal` хук (не Framer Motion):**
Все анимации появления при скролле используют класс `.fade-up` и глобальный хук из `hooks/useScrollReveal.ts` (полная реализация в Briefing Prompt и разделе 12.7).
Для stagger карточек добавлять `.delay-1` … `.delay-6`.

**Framer Motion — только для:**
Preloader (фазы), HeroSlider (свайп), AnimatePresence в layout (page transitions), FlipNumber в таймере. Загружать через `next/dynamic` с `ssr: false`.

---

## 1. Header (глобальный, все страницы)

**Контейнер:** fullwidth, sticky top:0, z-index:50, высота 80px desktop / 64px mobile.

**Фон:**
- В состоянии "наверху страницы" (scrollY < 40px) над hero — прозрачный, без блюра (если hero тёмный/фото, текст лого и nav — белый; если hero светлый — текст `--text-primary`).
- После scrollY > 40px — переключается на `.glass-01`, текст всегда `--text-primary` (кроме CTA-кнопки).
- Transition фона: 300ms ease.

**Layout:** flex, justify-content: space-between, align-items: center, padding: 0 64px (desktop) / 0 24px (mobile).

**Логотип:** слева, высота 28px (desktop) / 24px (mobile), format SVG.

**Навигация** (центр или справа от лого, перед CTA):
```
Рынки   Экспедиции   Статьи   О нас
```
- HelveticaNeueCyr 500, 15px, color `--text-primary` (или white, см. выше), letter-spacing 0
- gap между пунктами: 40px (desktop)
- Активный пункт (текущая страница): цвет `--orange-600`, снизу подчёркивание 2px `--orange-600`, offset 6px
- Hover неактивного: color transition to `--orange-600`, 200ms
- На mobile — скрыта, заменяется гамбургер-иконкой 24×24px справа от лого

**CTA-кнопка** справа: `.btn-liquid-glass`, но уменьшенная — padding: 12px 24px, font-size 14px. Текст "Стать участником". На mobile скрыта в хедере, дублируется в мобильном меню.

**Мобильное меню** (по тапу на гамбургер): fullscreen overlay, `.glass-01` фон поверх `--bg-canvas` с opacity перехода 250ms, пункты меню — Playfair Display 28px, вертикально, gap 24px, снизу — `.btn-liquid-glass` на всю ширину минус 48px паддинга.

---

## 2. Homepage

### 2.1 Hero — split 40/60 с пересекающим границу H1

**Высота:** 100vh desktop, min-height 720px; mobile — 90vh, min-height 640px.

**Фон:** fullbleed видео активной экспедиции. Видео занимает весь Hero, `object-fit: cover`. На mobile видео не загружается — используется `heroPoster`.

### Композиция

Hero — единая fullscreen-композиция: **40% glass / 60% open video**.

- Glass-зона занимает ровно 40% ширины desktop Hero и 100% его высоты.
- Оставшиеся ~60% — открытый video/background.
- Glass-зона не является floating-card.
- Не использовать `border-radius` у desktop glass-зоны.
- Видео продолжается визуально за стеклом.
- Использовать `.glass-02` и `backdrop-filter: blur(32px)`.

### H1

H1 — единый крупный типографический объект, который пересекает границу glass/video.
**Важно:** H1 не должен масштабироваться или переписываться агентом по собственной инициативе. Размер, переносы, иерархия и визуальная композиция должны соответствовать утверждённой Hero-композиции ниже и не превращаться в отдельный oversized title поверх видео.

```text
с Forbes   Бизнес —          ЭКСПЕДИЦИЯ
                                В ЮАР
```

Для другого слайда:

```text
с Forbes   Бизнес —          ЭКСПЕДИЦИЯ
                                Во Вьетнам
```

Правила:

- H1 значительно крупнее обычного display-текста: ориентир `140px` desktop, допускается адаптивный `clamp()`.
- `Бизнес —` находится в glass-зоне.
- `ЭКСПЕДИЦИЯ` находится на открытом видео.
- `В ЮАР` / `Во Вьетнам` — вторая строка того же H1.
- Вторая строка смещена вправо относительно `Бизнес —`.
- H1 не помещать внутрь стеклянной карточки.
- Не заменять H1 названием страны.
- Использовать `Playfair Display` для H1.

### Вертикальный маркер «с Forbes»

Слева непосредственно от буквы `Б` разместить `с Forbes`:

- вертикально;
- направление чтения снизу вверх;
- параллельно первой строке H1;
- высота визуально равна высоте буквы `Б`;
- не входит в текст H1;
- `HelveticaNeueCyr`;
- цвет соответствует текущему цвету H1;
- не влияет на ширину/перенос H1.

### Дата

Дата активной экспедиции находится **не внизу glass**, а непосредственно под `Бизнес —`.

- принадлежит glass-зоне;
- располагается под `Бизнес —`;
- `HelveticaNeueCyr`;
- берётся из данных активной экспедиции;
- при смене слайда меняется вместе с экспедицией.

### Удалённые элементы

В Hero **не использовать**:

- декоративное слово `FEXPERIENCE` внутри glass;
- `FORBES × БИЗНЕС-ЭКСПЕДИЦИИ`;
- eyebrow над H1;
- подзаголовок внутри glass;
- floating glass-card;
- отдельную карточку вокруг CTA.

Логотип Forbes Experience в Header остаётся без изменений.

### CTA

Две кнопки находятся **на одной горизонтальной линии** и располагаются ближе к центральной области Hero.

- `Стать участником` — внутри glass-зоны.
- `Подробнее` — на открытом video/background.
- кнопки не разносить к противоположным краям экрана;
- вертикально выровнять по одной оси;
- primary — существующий `.btn-liquid`;
- secondary — существующий `.btn-text`;
- обе ссылки привязаны к `slug` текущего слайда.

### Три тезиса

Три тезиса активной экспедиции отображаются в нижней части Hero в виде небольших pills.

- не карточки;
- визуально вторичны;
- размещаются преимущественно на открытой части Hero;
- не перекрывают H1 и CTA;
- тексты брать только из данных проекта;
- не придумывать новые формулировки.

### Плашка ближайшей экспедиции

Плашка ближайшей экспедиции остаётся отдельным компонентом **под Hero**.

Она не является частью HeroSlider и всегда показывает ближайшую по дате экспедицию независимо от активного слайда.

### Данные

Источник данных:

```text
src/data/expeditions.ts
```

CMS не используется.

Для Hero используются существующие поля экспедиции, включая:

```text
slug
status
startDate
endDate
heroVideo
heroPoster
```

`heroVideo` обязателен для desktop Hero активных экспедиций.

`heroPoster` используется на mobile и как `poster` для desktop video. Он не заменяет desktop video.

Если у активной экспедиции отсутствует `heroVideo`, агент **не должен молча заменять desktop video статичным изображением детальной страницы**. Это ошибка данных/ассетов, которую нужно явно зафиксировать.

### Mobile

- Hero сохраняет fullscreen-принцип.
- Glass не превращается в обычную floating-card.
- Видео на mobile не загружается.
- Используется `heroPoster`.
- H1 сохраняет разделение `Бизнес —` / `ЭКСПЕДИЦИЯ`.
- Вторая строка сохраняет смещение вправо.
- `с Forbes` остаётся вертикальным слева от `Б`.
- Дата остаётся под `Бизнес —`.
- CTA остаются одной логической парой и не перекрываются.
- Pills переносятся при необходимости.

### 2.2 Market Reality — editorial data field

**Задача:** после cinematic Hero не возвращаться к шаблону `3 одинаковые карточки на белом фоне`. Этот блок должен выглядеть как продолжение editorial-арт-дирекшна Hero: крупная типографика, воздух, асимметрия, тонкие линии и фирменный светлый оранжевый градиент.

**Фон секции:** `--gradient-editorial-warm`. Градиент должен быть мягким и светлым, без неонового свечения. Он занимает всю ширину секции и плавно переходит к следующей светлой секции.

**Контейнер:** max-width `1280px`; padding-top/bottom `--space-11` (128px) desktop / `--space-9` (64px) mobile.

**Композиция desktop:**
- Не использовать 3 отдельных карточки.
- Один общий editorial-композиционный блок без внешней карточной рамки.
- В верхней части слева — маленький eyebrow `01 / MARKET REALITY`.
- Справа или по центру — короткий H2 в Playfair Display, максимум 2 строки.
- Ниже — три статистических элемента в одной горизонтальной композиции, разделённых тонкими вертикальными линиями `--border-hairline`.
- Первый показатель визуально крупнее остальных и занимает примерно 40% ширины.
- Второй и третий — по ~30%.
- Допускается лёгкое перекрытие/смещение чисел относительно разделителей; запрещены одинаковые прямоугольные контейнеры.

**Цифры:**
- Playfair Display 700.
- Первый показатель: 96px desktop / 56px mobile.
- Остальные: 64px desktop / 48px mobile.
- Цвет `--text-primary`, а знак `%` / `+` может использовать `--orange-700`.
- Не делать все цифры оранжевыми.

**Подписи:** HelveticaNeueCyr, `--type-body`, `--text-primary` с пониженной opacity/secondary treatment. Максимум 3 строки.

**Деталь:** под первым показателем допускается короткая оранжевая линия 48–64px, но не карточка, не badge и не pill.

**Hover:** без translateY и без карточного box-shadow. Допускается только изменение opacity/цвета текста на 200–300ms.

**Контент (не менять):**
- `>60%` — "неудачных экспансий — из-за недостаточно глубокого анализа рынка"
- `50+` — "лояльных контактов — минимум для понимания специфики"
- `>40%` — "стартапов терпят провал из-за невостребованности продукта"

**Mobile:**
- Градиент сохраняется.
- Один общий вертикальный editorial-блок.
- Три показателя идут последовательно, разделяются горизонтальными линиями.
- Не превращать их в три карточки.
- Первый показатель остаётся визуально доминирующим.

### 2.3 Platform Statement — editorial statement

**Задача:** не повторять карточную/pill-композицию из предыдущих секций. Блок должен ощущаться как журнальный манифест и продолжать визуальный язык Hero.

**Фон:** `--bg-canvas` или очень мягкий переход из `--gradient-editorial-warm`; не использовать отдельную белую карточку на фоне.

**Контейнер:** max-width `1180px`; padding-top/bottom `--space-11` (128px) desktop / `--space-10` (96px) mobile.

**Композиция desktop:**
- Две колонки примерно `55% / 45%`.
- Слева — основной statement.
- Справа — три принципа/доказательства.
- Никакого центрированного `max-width 800px` блока.
- Никаких трёх одинаковых pills.
- Никакой большой стандартной CTA-кнопки по центру.

**Левая часть:**
- Над текстом тонкая оранжевая линия 64px × 2px.
- Eyebrow: `02 / FEXPERIENCE`.
- H2 / statement: Playfair Display 600, 48px desktop / 30px mobile, line-height ~1.12.
- Текст: "FExperience — специальный проект команды Forbes, который поможет оценить готовность вашего бизнеса к масштабированию, раскрыв основные риски и возможности экспансии."
- Подстрока: HelveticaNeueCyr 17px desktop / 15px mobile, `--text-secondary`: "Мы предлагаем авторские маршруты уникальных бизнес-экспедиций и собственный независимый дью-дилидженс."

**Правая часть — не карточки:**
Три принципа представить как вертикальный editorial-list:
```text
01  АНАЛИТИКА
    рынка

02  НАДЕЖНОСТЬ
    партнеров

03  ПРОВЕРКА
    product-market fit
```
- Между пунктами — тонкие горизонтальные линии.
- Номер — `--orange-600`, HelveticaNeueCyr 12–13px.
- Название — HelveticaNeueCyr 600, 14–15px, uppercase.
- Подпись — HelveticaNeueCyr 13–14px, `--text-secondary`.
- Не использовать `border-radius: 999px`, background-карточки или box-shadow.

**CTA:** `.btn-liquid`, текст "Участвовать в экспедиции", но визуально привязан к левой колонке и расположен сразу после подстроки. Не центрировать относительно всей секции.

**Mobile:**
- Одна колонка.
- Сначала statement, затем editorial-list.
- CTA сразу после statement.
- Список принципов ниже, с горизонтальными разделителями.

### 2.4 Continental Navigation — editorial market index

**Задача:** это навигация по рынкам, а не набор UI-карточек. Не использовать четыре одинаковых glass-card.

**Композиция:** 4 больших editorial-поля в сетке 2×2 desktop; на mobile — вертикальный поток с горизонтальным scroll-snap только если ширина экрана не позволяет сохранить крупную типографику. Каждое поле имеет собственный ритм, номер и контур региона.

```css
.market-index {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0;
  border-top: 1px solid var(--border-hairline);
}
.market-index-item {
  position: relative;
  min-height: 260px;
  padding: 40px 32px 36px;
  border-bottom: 1px solid var(--border-hairline);
}
.market-index-item:nth-child(odd) { border-right: 1px solid var(--border-hairline); }
```

**Внутри каждого региона:**
- номер `01–04` — `--type-meta`, но крупнее обычной мета-информации;
- название региона — Playfair Display 600, 34–44px;
- количество направлений — спокойная подпись;
- контур континента — большой, тонкий, opacity .35–.5, частично выходит за типографическую область;
- активная точка — `--orange-600`;
- стрелка/ссылка — текстовая, без pill.

**Стекло:** не используется как фон всех четырёх элементов. `.glass-01` разрешён только для active/focused state поверх отдельной области и не должен превращать блок в карточную сетку.

**Hover:** не `translateY`. Разрешены усиление контура, появление активной точки, лёгкое увеличение SVG-контура и изменение цвета ссылки.

**Mobile:** каждый регион остаётся крупным editorial-item; не уменьшать его до маленькой карточки.

### 2.5 Featured Markets — editorial market spread, не bento

**Главное правило:** не использовать механический bento-шаблон `1 большая карточка + несколько одинаковых`. Этот раздел должен ощущаться как разворот делового журнала.

**Desktop-композиция:** асимметричный editorial spread с одной доминирующей фотографией/видеокадром и 2–3 вторичными направлениями, разнесёнными по сетке. Размеры и высоты элементов различаются. Не все элементы имеют фон, рамку или скругление.

```text
БЛИЖАЙШИЕ ЭКСПЕДИЦИИ

ЮАР                         ВЬЕТНАМ
15—21 НОЯБРЯ 2026           14—20 МАРТА 2027
──────────────              ─────────────

        [ БОЛЬШОЕ ФОТО / ВИДЕО ]

ИНДИЯ
СЕНТЯБРЬ 2026

БРАЗИЛИЯ / КЕНИЯ / ... — вторичная навигация
```

**Featured-направление:**
- крупное изображение как главный материал;
- страна — Playfair Display 700, 48–72px;
- даты — `--type-meta`;
- статус — маленький функциональный бейдж;
- CTA — текстовая ссылка или `.btn-liquid`, но не отдельная floating-card.

**Вторичные направления:**
- без одинаковых белых карточек;
- допустимы тонкие hairline-разделители;
- одно направление может иметь Glass Signature label поверх изображения, остальные остаются типографическими.

**Glass:** максимум одна выразительная glass-поверхность в пределах секции. Не делать каждое направление стеклянной карточкой.

**Mobile:** сначала featured-направление, затем вторичные направления как крупные editorial rows. Не превращать их в 3 одинаковые карточки.

### 2.6 Почему FExperience — image + glass compositions

**Главное правило:** не делать 6 одинаковых стеклянных карточек. Glass здесь — материал композиции, а не универсальный компонент.

**Фон секции:** `--gradient-editorial-warm`, без чисто белого canvas.

**Композиция:** editorial mosaic из 6 причин с разным визуальным весом. Минимум две причины — большие визуальные поля, остальные — типографические/фотографические вставки.

- №01 — featured: большая фотография + крупная Apple-like glass panel внутри изображения.
- №02–03 — изображение с небольшой glass label, не полная карточка.
- №04 — типографическая строка с крупным номером и hairline.
- №05 — фото/данные без стекла.
- №06 — фотография + небольшая glass Signature detail.

**Apple-like glass panel:**
```css
.why-glass-panel {
  background: rgba(255,255,255,.48);
  backdrop-filter: blur(22px) saturate(125%);
  -webkit-backdrop-filter: blur(22px) saturate(125%);
  border: 1px solid rgba(255,255,255,.72);
  box-shadow:
    inset 0 1px 0 rgba(255,255,255,.9),
    0 18px 60px rgba(80,45,20,.10);
}
```

Добавить мягкий внутренний highlight сверху и очень слабый оранжевый edge-light. Не использовать сильный glow вокруг каждой панели.

**Пилюли:** не обязательны. Если тег нужен, он должен быть частью glass-панели и использоваться один раз в featured-композиции.

**Hover:** image scale 1.02–1.04 или изменение преломления glass. Не использовать общий `translateY`.

**Mobile:** композиция сохраняет разный визуальный вес; запрещено превращать всё в последовательность одинаковых карточек.

**Контент:** использовать существующие 6 текстов без переписывания.

### 2.7 Media Layer — "Участники экспедиции в центре внимания"

**Фон секции:** `--bg-surface`, padding `--space-10` 0.

**Layout desktop:** две колонки — левая (фото-блок, 45%) + правая (статистика + текст, 55%), gap 64px, align-items center.

**Левая колонка — фото-блок:**
Два изображения наложены друг на друга со смещением:
```css
.media-photos {
  position: relative;
  height: 420px;
}
.media-photo-main {   /* ноутбук с сайтом Forbes */
  position: absolute;
  width: 85%; border-radius: var(--radius-md);
  object-fit: cover; box-shadow: var(--shadow-hover);
  bottom: 0; left: 0;
}
.media-photo-mag {    /* журнал Forbes */
  position: absolute;
  width: 55%; border-radius: var(--radius-md);
  object-fit: cover;
  top: 0; right: 0;
  box-shadow: var(--shadow-hover);
  border: 3px solid var(--bg-elevated);
}
```
Источники: `/images/media/nout.webp` + `/images/media/zhyrnal1.webp` (уже на сайте).

**Правая колонка:**

Заголовок-секции:
```
H2 "Участники экспедиции в центре внимания"
  Playfair Display 600, 36px, --text-primary, margin-bottom 16px
Подзаголовок:
  HelveticaNeueCyr 400, 16px, --text-secondary, line-height 1.6, max-width 440px, margin-bottom 40px
  "Экспедиция с Forbes — это не только новые контакты и опыт,
  но и персональное медийное сопровождение."
```

Три строки статистики (вертикально, не сетка):
```css
.media-stat-row {
  display: flex;
  align-items: flex-start;
  gap: 20px;
  padding: 20px 0;
  border-bottom: 1px solid var(--border-hairline);
}
.media-stat-row:first-child { border-top: 1px solid var(--border-hairline); }
.media-stat-number {
  font: 700 40px/1 'Playfair Display', serif;
  color: var(--orange-600);
  min-width: 80px;
  flex-shrink: 0;
}
.media-stat-content { flex: 1; }
.media-stat-label {
  font: 600 14px HelveticaNeueCyr;
  color: var(--text-primary);
  margin-bottom: 4px;
}
.media-stat-desc {
  font: 400 13px HelveticaNeueCyr;
  color: var(--text-secondary);
  line-height: 1.5;
}
```

Три строки (данные с сайта):

| Число | Лейбл | Описание |
|---|---|---|
| >1 МЛН | ЖУРНАЛ | Специальная секция FExperience. Охват читателей. |
| >10 МЛН | САЙТ | Статья по итогам экспедиции на главной странице Forbes. Читателей в месяц. |
| >100 ТЫС | ВИДЕО | Специальный видеоматериал на каналах Forbes. |

**Mobile:** колонки стекуются вертикально, фото-блок вверху (height 280px), статистика под ним.

### 2.8 Testimonials — одна крупная glass-поверхность

**Главное правило:** не сетка из одинаковых testimonial cards.

Embla остаётся, но одновременно показывается один главный отзыв. Остальные отзывы являются соседними слайдами, не самостоятельной сеткой.

**Композиция desktop:**
- крупная цитата Playfair Display 32–48px;
- справа/сбоку — фотография автора или деловая фотография экспедиции;
- поверх изображения — одна прозрачная Apple-like glass information panel;
- внизу — `01 / 06` и тонкая progress-line.

**Glass:** только одна основная панель на viewport.

```css
.testimonial-stage {
  position: relative;
  min-height: 460px;
  overflow: hidden;
}
.testimonial-glass {
  background: rgba(255,255,255,.50);
  backdrop-filter: blur(24px) saturate(125%);
  -webkit-backdrop-filter: blur(24px) saturate(125%);
  border: 1px solid rgba(255,255,255,.75);
  box-shadow: inset 0 1px 0 rgba(255,255,255,.9), 0 20px 70px rgba(50,30,20,.10);
}
```

**Mobile:** фото сверху/на фоне, glass panel ниже с overlap 24–32px. Не превращать каждый отзыв в одинаковую карточку.

### 2.9 FAQ

**Контейнер:** max-width 800px, margin 0 auto.

**Аккордеон-строка:**
- padding 24px 0, border-bottom 1px solid `--border-hairline`
- Вопрос: HelveticaNeueCyr 500 17px, `--text-primary`, flex justify-between с плюс/минус-иконкой (24px, `--orange-600`, rotate 45deg при открытии, transition 200ms)
- Ответ: `--type-body`, padding-top 16px, max-height transition 300ms ease при раскрытии

### 2.10 Final CTA

**Фон:** `--gradient-editorial-warm` с очень мягким radial-gradient. Никакого чисто белого пустого поля.

**Layout:** text-align center, padding `--space-10` 0 (96px), max-width 640px margin auto.

**Типографика:** H2 40px Playfair Display, подзаголовок `--type-body-lg`, margin-bottom 40px.

**CTA:** `.btn-liquid-glass`, увеличенная — padding 20px 48px, font-size 17px.

### 2.11 Footer

**Фон:** `#F0ECE5`, border-top: 1px solid `rgba(255,107,44,.15)`, padding `--space-9` 0 `--space-6` (64px верх, 32px низ).

**Блок 1 — Newsletter:**
- Layout: flex space-between (desktop), stack (mobile)
- Заголовок "Узнайте первыми о предстоящих мероприятиях" — Playfair Display 24px
- Форма: input (height 48px, border 1px solid `--border-hairline`, border-radius `--radius-pill`, padding 0 20px, background white) + кнопка `.btn-liquid-glass` (compact) справа, gap 12px
- margin-bottom `--space-8` (56px), border-bottom 1px solid `rgba(26,26,26,.06)`, padding-bottom `--space-8`

**Блок 2 — Continental nav footer:** 4 текстовые ссылки в ряд (Africa/Asia/LATAM/Russia), HelveticaNeueCyr 500 14px, gap 32px, margin-bottom `--space-6`.

**Блок 3 — 4 колонки навигации:** grid 4 колонки desktop / 2 колонки mobile, gap 32px.
- Заголовок колонки: HelveticaNeueCyr 600 13px uppercase `--text-tertiary`, margin-bottom 16px
- Ссылки: HelveticaNeueCyr 400 15px `--text-secondary`, line-height 2.2 (вертикальный gap через line-height), hover color `--orange-600`

**Блок 4 — Platform statement + правовой блок:** margin-top `--space-8`, border-top 1px solid `rgba(26,26,26,.06)`, padding-top 24px. Текст `--type-meta`, layout flex space-between (лого + copyright слева, юр.адрес справа), stack на mobile.

**Реальные контакты для футера (хардкод):**
```
Телефон:  +7 (920) 194-90-03  → tel:+79201949003
Email:    FExperience@forbes.ru
Telegram: https://t.me/fexperience   ← уточнить единый username (см. 10.10)
Адрес:    123022, город Москва, 2-я Звенигородская ул., д. 13 стр 15
Copyright: © Forbes FExperience 2024-2026. Права защищены.
Ссылка на privacy: /privacy
Forbes-логотип: /images/logo/logoFExperience2.svg (существующий)
```

Контакты в футере рендерятся из конфиг-файла (`config/contacts.ts`), не разбросаны по компонентам — чтобы при смене телефона/email менять в одном месте.

---

## 3. О нас

### 3.1 Hero-манифест

**Контейнер:** max-width 900px, margin 0 auto, text-align center, padding `--space-10` 0 `--space-8`.

**Типографика:**
- Eyebrow "О НАС"
- H1: Playfair Display 700, 44px desktop / 30px mobile, line-height 1.2
- Ключевая фраза "МЫ ПРОВОДИМ БИЗНЕС-ЭКСПЕДИЦИИ" — выделена как отдельный крупный блок внутри текста, font-weight 700, с decorative подчёркиванием: линия `--orange-600`, height 2px, width 100% этой строки, margin-top 8px
- Остальной текст манифеста — `--type-body-lg`, color `--text-secondary`, margin-top 24px

### 3.2 Деловая программа — editorial photo field

**Не использовать bento-сетку 1+3.** Четыре существующие фотографии должны читаться как один визуальный рассказ.

**Layout desktop:** большое изображение занимает ~58% ширины; три остальных кадра — неравномерно справа/снизу, с разными размерами и смещениями. Между кадрами — большие спокойные промежутки, а не равномерная карточная сетка.

Текстовый блок располагается как отдельный editorial caption, а не как карточка. Разрешён один маленький glass caption поверх одного изображения.

**Фон:** `--gradient-editorial-warm` / тёплый canvas.

Mobile: вертикальный story-flow, без 4 одинаковых карточек и без обязательного scroll-snap.

### 3.3 Due Diligence — dossier list, не card grid

**Grid из 9 одинаковых карточек запрещён.** Блок должен выглядеть как деловое досье/индекс исследования.

**Композиция:** вертикальный список 01/09 → 09/09 с hairline-разделителями. Каждая строка имеет номер, название и короткое описание. На desktop часть строк может быть раскрыта в две колонки, но без boxed cards.

```css
.due-row {
  display: grid;
  grid-template-columns: 88px minmax(220px, .8fr) 1.2fr;
  gap: 24px;
  padding: 24px 0;
  border-top: 1px solid var(--border-hairline);
}
```

Иконка — тонкая line-icon 24–32px, оранжевый только как акцент. Большая Playfair-цифра может появляться в active row.

**Hover:** не подъём карточки. Разрешено изменение цвета номера/линии и появление небольшого inline-arrow.

### 3.4 Команда проекта — editorial roster

**Не использовать три одинаковые profile cards.**

Команда Forbes показывается как вертикальный editorial roster: большой портрет одного участника + имена/роли остальных в типографическом списке. При смене активного имени фотография плавно меняется. Если интерактив не нужен, оставить один большой портрет и три текстовые строки.

Forbes Russia badge — маленький функциональный маркер, не декоративная pill.

Фон — `--bg-surface` / тёплый градиент. Glass допускается только как небольшая caption-панель поверх фотографии.

## 4. Экспедиции — Directory

### 4.1 Hero (Directory)

Компактный — не fullscreen видео. Фон `--bg-canvas`, padding `--space-9` 0.

```
Eyebrow "НАПРАВЛЕНИЯ"  — --type-eyebrow
H1 "Бизнес-экспедиции с Forbes"  — Playfair Display 700, 48px / 30px mobile
Подзаголовок — HelveticaNeueCyr 400, 18px, --text-secondary, max-width 560px
  "Кураторские маршруты на перспективные рынки.
   Прямой доступ к людям, рынкам и возможностям."
margin-bottom: --space-7 (40px)
```

Под заголовком — горизонтальный ряд из 4 кнопок-фильтров по региону (Continental quick-filter), идентичный `.filter-pill` из раздела 4.3, но с иконкой-точкой цвета региона слева:
```
● Африка    ● Азия    ● LATAM    ● Россия
```
Клик фильтрует сетку ниже по полю `region` карточки.

### 4.2 Continental Navigation

Идентична 2.4 (переиспользуемый компонент), но здесь — не "точка входа для интереса", а рабочий фильтр: клик по региону — scroll+highlight соответствующих карточек в сетке ниже (либо фильтрует сетку, если решаете делать client-side filter).

### 4.3 Industry Explorer (фильтр по отрасли)

**Layout:** горизontal ряд пилюль, flex-wrap, gap 12px.

**Пилюля:**
```css
.filter-pill {
  padding: 10px 20px;
  border-radius: var(--radius-pill);
  border: 1px solid var(--border-hairline);
  font: 500 14px HelveticaNeueCyr;
  color: var(--text-secondary);
}
.filter-pill.active {
  background: var(--orange-100);
  border-color: var(--orange-600);
  color: var(--orange-600);
}
```

### 4.4 Сетка направлений — editorial directory

**Не использовать 3-колоночную сетку одинаковых карточек.** Директория должна ощущаться как каталог/журнальный разворот.

**Layout desktop:** variable-height editorial grid. Активные направления получают большие визуальные поля, upcoming — более компактные rows. Минимум 1 карточка может быть wide/full-width в каждом визуальном ряду.

Каждое направление содержит:
- крупное название страны — Playfair Display;
- город/регион и даты — `--type-meta`;
- статус-бейдж — функциональный, небольшой;
- изображение как главный материал;
- CTA — текстовая ссылка/стрелка.

Статус влияет на визуальный вес, а не на превращение всех элементов в одинаковые cards. `Завершена` — спокойнее, но без искусственного opacity всего изображения.

**Hover:** image zoom / underline / border accent. Общий `translateY` запрещён.

## 5. Детальная страница экспедиции

Общий для всех 3 шаблонов блок:

### 5.1 Hero (общий)
> ⚠️ Финальный CSS `.hero-tag` — в разделе 14.5. Здесь — только структура и контент.

**Высота:** 70vh desktop / 60vh mobile.

**Фон:** фото/видео направления, fullbleed. Overlay: `linear-gradient(180deg, rgba(26,26,26,.15) 0%, rgba(26,26,26,.55) 100%)`.

**Контент** — bottom-aligned, padding 48px 64px desktop / 24px mobile:

```
[Даты]                    — только шаблон "Активна"
[H1]
[Три тега — каскадом]
[CTA]
```

**Даты:**
```css
font: 500 14px HelveticaNeueCyr;
color: rgba(255,255,255,.75);
letter-spacing: .04em;
text-transform: uppercase;
margin-bottom: 16px;
```
Текст: "15–21 НОЯБРЯ 2026 · 7 ДНЕЙ"

**H1:**
```css
font: 700 52px/1.1 'Playfair Display', serif;
color: #fff;
letter-spacing: -.01em;
margin-bottom: 32px;
```
Mobile: 32px.

**Три тега — каскадное расположение:**

Не в строку. Каждый тег смещён относительно предыдущего: `translateX(0)` / `translateX(20px)` / `translateX(40px)` и `translateY(0)` / `translateY(8px)` / `translateY(16px)`. Это создаёт ощущение глубины без анимации.

```css
.hero-tags {
  display: flex;
  flex-direction: column;   /* столбцом, не в ряд */
  gap: 10px;
  margin-bottom: 36px;
  align-items: flex-start;
}
.hero-tag {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 9px 18px;
  border-radius: var(--radius-pill);
  background: rgba(255,255,255,.16);
  border: 1px solid rgba(255,255,255,.28);
  backdrop-filter: blur(12px);
  font: 500 13px HelveticaNeueCyr;
  color: rgba(255,255,255,.95);
  letter-spacing: .02em;
  transition: background .25s, transform .25s;
}
.hero-tag:hover {
  background: rgba(255,255,255,.26);
  transform: translateX(-4px);  /* лёгкое втягивание влево при hover */
}
/* иконка внутри каждого тега — SVG 14px, stroke white, fill none */
.hero-tag-icon { width: 14px; height: 14px; flex-shrink: 0; }

/* Каскадное смещение */
.hero-tag:nth-child(1) { transform: translateX(0); }
.hero-tag:nth-child(2) { transform: translateX(20px); }
.hero-tag:nth-child(3) { transform: translateX(40px); }
/* hover переопределяет transform через отдельный класс */
```

Иконки для каждого тега (line, stroke white):
- "Погружение в культуру" → компас
- "Эксклюзивный нетворкинг" → рукопожатие / people
- "Лучшие бизнес-практики" → chart-bar

**CTA:**
- Шаблон "Активна": `.btn-liquid` + рядом счётчик мест `"Осталось мест: 6"` (HelveticaNeueCyr 600 14px, color `rgba(255,255,255,.8)`)
- Шаблон "Скоро"/"Завершена": `.btn-outline` с инвертированными цветами (border/text white, hover — fill white, text primary)

### 5.2 Карта "свой континент"

**КРИТИЧЕСКИЙ VISUAL LOCK — НЕ УПРОЩАТЬ И НЕ ЗАМЕНЯТЬ.** Эта карта является обязательной частью детальной страницы экспедиции и одним из главных индивидуальных элементов FExperience. Она **не является декоративным SVG и не является заменяемой карточкой**. Агент не должен удалять её, заменять глобальной картой мира, превращать в маленький badge или объединять с Continental Navigation.

- На каждой `/expeditions/[slug]` карта показывает **конкретный континент/регион и конкретную активную точку этой экспедиции**.
- Homepage/Directory `Continental Navigation` и detail-page `MapContinent` — **два разных компонента и две разные задачи**. Не объединять их в один визуальный блок.
- Использовать реализацию раздела 14.13 и данные маршрута из `src/data/expeditions.ts`; не придумывать новые точки или геометрию.
- Для активных экспедиций карта может показывать маршрутную линию и города программы согласно данным; для `скоро` и `завершена` сохраняется соответствующая логика статуса из 14.13.

**Контейнер:** padding `--space-9` 0, max-width 800px margin auto.

**Компонент карты** — inline SVG с CSS-анимацией. Полная реализация в разделе 14.13.

**Плашка-подпись** над картой: `.glass-01` (раздел 14.2), padding 16px 24px,
position absolute top-left внутри контейнера карты.
Содержит: H3 названия страны 20px + `--type-meta` регион.

### 5.3 Что включено (только шаблон "Активна")

**Это главный пример Apple-like Liquid Glass внутри контентной части сайта.** Не делать 6 обычных карточек.

**Фон секции:** `--gradient-editorial-warm`.

**Композиция desktop:** 6 фото в неравномерном editorial layout. Первое — крупное featured; остальные имеют разный размер. Glass label/panel располагается внутри фотографии и частично выходит за её границу.

```css
.included-stage {
  position: relative;
}
.included-card {
  position: relative;
  overflow: visible;
  min-height: 300px;
  border-radius: var(--radius-lg);
}
.included-card-bg {
  position: absolute; inset: 0;
  width: 100%; height: 100%;
  object-fit: cover;
  border-radius: inherit;
}
.included-glass {
  position: absolute;
  left: 24px; bottom: 24px;
  max-width: min(78%, 420px);
  padding: 18px 22px;
  background: rgba(255,255,255,.46);
  backdrop-filter: blur(24px) saturate(125%);
  -webkit-backdrop-filter: blur(24px) saturate(125%);
  border: 1px solid rgba(255,255,255,.74);
  border-radius: 20px;
  box-shadow: inset 0 1px 0 rgba(255,255,255,.9), 0 18px 60px rgba(40,25,15,.12);
}
.included-glass::before {
  content: '';
  position: absolute; inset: 1px 1px auto; height: 1px;
  background: rgba(255,255,255,.9);
  opacity: .8;
}
```

**Материал glass:** прозрачный тёплый, без молочно-белой непрозрачной заливки. Он должен показывать фото под собой. Никакого сильного оранжевого glow.

**Ритм:**
- №1 — large featured, Glass Signature;
- №2 — medium photo + small glass label;
- №3 — photo + typography without glass;
- №4 — small glass label;
- №5 — large photo;
- №6 — photo + subtle glass caption.

Не использовать одинаковую высоту и одинаковую glass-панель на всех шести элементах.

Mobile: вертикальный story-flow; каждая следующая glass panel смещается относительно предыдущей на 16–32px.

Контент и изображения — существующие, без переписывания.

### 5.4 Программа экспедиции (только шаблон "Активна")

**Фото-разделитель перед секцией** (`program-bg.jpg` с сайта) — в новом дизайне заменяется на тёмный eyebrow-разделитель:
```css
.program-divider {
  background: #1A1A1A;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.program-divider-text {
  font: 600 13px/1 HelveticaNeueCyr;
  letter-spacing: .12em;
  text-transform: uppercase;
  color: rgba(255,255,255,.5);
}
/* Декоративная оранжевая линия слева от текста */
.program-divider-text::before {
  content: '';
  display: inline-block;
  width: 32px; height: 1px;
  background: var(--orange-600);
  margin-right: 16px;
  vertical-align: middle;
}
```
Текст: "ПРОГРАММА ЭКСПЕДИЦИИ". Это единственный тёмный разделитель на странице — создаёт ритм и визуально отделяет верхний блок (что включено) от нижнего (программа по дням).

**Фон секции программы:** `--bg-surface`, padding `--space-10` 0.

**Layout:** editorial timeline, gap 40px.
- Левая колонка (width 96px, flex-shrink 0): номера дней + вертикальная линия
- Правая колонка (flex 1): editorial rows, НЕ карточки.

**Вертикальная линия-связь:**
```css
.timeline-left {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0;
}
/* Линия, тянущаяся через все дни */
.timeline-left::before {
  content: '';
  position: absolute;
  top: 32px;        /* от центра первого кружка */
  bottom: 32px;     /* до центра последнего кружка */
  left: 50%;
  transform: translateX(-50%);
  width: 2px;
  background: var(--border-hairline);
  z-index: 0;
}
```

**Номер дня:**
```css
.timeline-day-number {
  width: 64px; height: 64px;
  border-radius: 50%;
  background: var(--gradient-signature);
  display: flex; align-items: center; justify-content: center;
  font: 700 22px/1 'Playfair Display', serif;
  color: #fff;
  position: relative; z-index: 1;
  flex-shrink: 0;
  /* Переход в активное состояние при скролле */
  transition: box-shadow .3s;
}
/* Активный день — при пересечении viewport */
.timeline-day-number.active {
  box-shadow: 0 0 0 4px var(--orange-200), 0 0 0 6px var(--orange-600);
}
/* Пройденные дни (выше viewport) — приглушены */
.timeline-day-number.passed {
  background: var(--bg-surface);
  color: var(--text-tertiary);
  border: 2px solid var(--border-hairline);
}
```

**Строка дня:**
```css
.timeline-card {
  background: transparent;
  border: 0;
  border-top: 1px solid var(--border-hairline);
  border-radius: 0;
  padding: 28px 0;
  margin-bottom: 0;
}
.timeline-card.active {
  border-top-color: var(--orange-600);
}
```

Не добавлять box-shadow, белый фон или rounded container. Визуальный вес создают номер дня, крупный serif-заголовок, фото и тонкая линия.

**Содержимое карточки:**
```
H3 заголовка дня — Playfair Display 600 20px --text-primary
  (напр. "День 1. Ланзерак — открытие программы")
margin-bottom: 12px

Текст описания — HelveticaNeueCyr 400 15px --text-secondary line-height 1.7
```

**Sticky номер дня** (desktop only): левая колонка с номером делается `position: sticky, top: 120px` только для desktop. На mobile — таймлайн линейный без sticky, номера встроены в поток над карточками.

**Данные (реальные с сайта ЮАР):**

| День | Содержание |
|---|---|
| 1 | Открытие программы, знакомство с участниками и ужин в Lanzerac Wine Estate |
| 2 | Бизнес-сессия «Африка в фокусе»: аналитика рынка, регуляторные особенности, ВЭД |
| 3 | Стелленбосский университет: предпринимательские экосистемы, ЮАР как точка входа в Африку |
| 4 | Локальное предприятие + экскурсия по Кейптауну |
| 5 | Babylonstoren: встреча с управляющим + «Говорят местные» |
| 6 | Мыс Доброй Надежды: знакомство с местной культурой и традициями |

### 5.5 Наши эксперты (только шаблон "Активна")

**Важно — фоны убираются:** на текущем сайте перед блоком экспертов два переключающихся декоративных фона (`experts-gray-bg.webp` и `experts-orange-bg.jpg`). В новом дизайне они не используются. Фон секции — плоский `--bg-canvas`. Агент должен удалить эту логику из компонента, не переносить.

Два визуально разных блока — внешние эксперты и команда Forbes — с чётким визуальным разграничением.

---

**Блок А — Внешние эксперты (9 человек)**

**Концепция:** горизонтальные карточки-строки, не квадратные фото-плитки. Читается как деловой список, а не фотогалерея — соответствует позиционированию платформы.

**Layout:** одна editorial-колонка с тонкими разделителями; на desktop имя/роль слева, фото в центре/справа, expertise — как маленькая мета-подпись. Не использовать boxed cards.

```css
.expert-card {
  display: grid;
  grid-template-columns: 72px minmax(220px, 1fr) auto;
  align-items: center;
  gap: 20px;
  padding: 20px 0;
  border-top: 1px solid var(--border-hairline);
}
.expert-card:hover .expert-photo img {
  transform: scale(1.05);
}
/* При hover — лёгкий зум фото */
.expert-card:hover .expert-photo img {
  transform: scale(1.06);
}
```

**Фото:**
```css
.expert-photo {
  width: 72px; height: 72px;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
  border: 2px solid var(--orange-200);
}
.expert-photo img {
  width: 100%; height: 100%;
  object-fit: cover;
  transition: transform .4s var(--ease);
}
```

**Текстовая часть:**
```css
.expert-info { flex: 1; min-width: 0; }
.expert-name {
  font: 600 15px HelveticaNeueCyr;
  color: var(--text-primary);
  margin-bottom: 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.expert-role {
  font: 400 13px HelveticaNeueCyr;
  color: var(--text-secondary);
  line-height: 1.4;
}
```

**Тег экспертизы** (справа в карточке, flex-shrink: 0):
```css
.expert-tag {
  padding: 5px 12px;
  background: transparent;
  color: var(--orange-700);
  font: 600 11px HelveticaNeueCyr;
  text-transform: uppercase;
  letter-spacing: .04em;
  border-radius: 0;
  border-bottom: 1px solid var(--orange-200);
  white-space: nowrap;
}
```

Теги для 9 экспертов ЮАР:

| Эксперт | Тег |
|---|---|
| Тимоти ван Маасдайк | Логистика |
| Денис Косьяненко | Бизнес-dev |
| Питер Магнер | Iridium |
| Эйтан Стерн | Право |
| Григорий Ханбекян | Форвардинг |
| Стэйси Батлер | Банкинг |
| Ник Фергюсон | Авиация |
| Деон ван Зейл | Торг. палата |
| Дэн Плато | Госструктуры |

---

**Блок Б — Команда Forbes Russia (3 человека)**

Размещается отдельно под Блоком А, визуально акцентированнее — это не просто эксперты, это организаторы со стороны Forbes.

**Заголовок блока:**
```
Eyebrow: "КОМАНДА ПРОЕКТА"
H3: "Forbes Russia" (с SVG-логотипом Forbes 20px рядом)
margin-bottom: 24px
```

**Композиция:** 3 участника не оформлять как три одинаковые profile-card. Использовать компактный editorial roster: одна вертикальная колонка с hairline-разделителями; имя и роль — слева, фото — справа/в центре строки. На desktop допускается разный размер портретов для первого и последующих участников. На mobile — последовательные editorial rows.

```css
.forbes-expert-card {
  background: transparent;
  border: 0;
  border-top: 1px solid var(--border-hairline);
  border-radius: 0;
  padding: 22px 0;
  text-align: left;
  position: relative;
  overflow: visible;
}
.forbes-expert-card:hover {
  background: transparent;
  box-shadow: none;
}
.forbes-expert-card::before {
  content: none;
}
```

**Фото:**
```css
.forbes-expert-photo {
  width: 88px; height: 88px;
  border-radius: 12px;
  overflow: hidden;
  margin: 0 0 12px;
  position: relative;
}
.forbes-expert-photo img {
  width: 100%; height: 100%; object-fit: cover;
  transition: transform .4s var(--ease);
}
.forbes-expert-card:hover .forbes-expert-photo img {
  transform: scale(1.05);
}
```

**Бейдж Forbes** — над фото, не поверх него:
```css
.forbes-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 5px 12px;
  background: #1A1A1A;    /* тёмный, как цвет бренда Forbes */
  border-radius: var(--radius-pill);
  margin-bottom: 12px;
}
.forbes-badge img { height: 14px; }   /* SVG логотип Forbes white */
.forbes-badge-text {
  font: 600 11px HelveticaNeueCyr;
  color: #fff;
  text-transform: uppercase;
  letter-spacing: .04em;
}
/* Текст бейджа: "Forbes Russia" */
```

**Имя и должность:**
```css
.forbes-expert-name {
  font: 600 16px HelveticaNeueCyr;
  color: var(--text-primary);
  margin-bottom: 6px;
}
.forbes-expert-role {
  font: 400 13px HelveticaNeueCyr;
  color: var(--text-secondary);
  line-height: 1.45;
}
```

**Разделитель между Блоком А и Блоком Б:**
```css
.experts-divider {
  height: 1px;
  background: var(--border-hairline);
  margin: 40px 0;
  position: relative;
}
.experts-divider::before {
  content: 'Команда проекта';
  position: absolute;
  top: 50%; left: 50%;
  transform: translate(-50%, -50%);
  background: var(--bg-canvas);
  padding: 0 16px;
  font: 500 12px HelveticaNeueCyr;
  color: var(--text-tertiary);
  text-transform: uppercase;
  letter-spacing: .06em;
  white-space: nowrap;
}
```

---

### 5.5.5 Таймер обратного отсчёта (только шаблон "Активна")
> ⚠️ Финальный CSS таймера — в разделе 14.6. Здесь — только логика данных и позиционирование.

**Позиция:** между блоком экспертов и формой заявки. Пользователь прочитал программу и познакомился с экспертами — теперь видит дедлайн и форму. Психологически верный момент для CTA.

**Фон секции:** `--bg-surface` (#F5F2EC) — контраст с соседними белыми секциями.

**Layout:** padding 48px 0, text-align center.

**Структура (сверху вниз):**
```
Eyebrow: "ДО НАЧАЛА ЭКСПЕДИЦИИ"
  HelveticaNeueCyr 600 13px uppercase --orange-600 letter-spacing .08em
  margin-bottom: 24px

Счётчик: 4 блока в ряд, gap 16px desktop / 8px mobile
  [ДНИ]  [ЧАСЫ]  [МИНУТЫ]  [СЕКУНДЫ]

Подпись под счётчиком: "ЮАР · 15–21 ноября 2026"
  HelveticaNeueCyr 500 14px --text-tertiary, margin-top 20px
```

**Один блок счётчика:**
```css
.countdown-block {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  min-width: 96px;
}
.countdown-number {
  font: 700 64px/1 'Playfair Display', serif;
  color: var(--orange-600);
  /* Flip-анимация при смене числа */
  transition: transform .15s ease-in, opacity .15s;
}
.countdown-number.flip {
  transform: rotateX(90deg);
  opacity: 0;
}
.countdown-label {
  font: 600 11px/1 HelveticaNeueCyr;
  color: var(--text-tertiary);
  text-transform: uppercase;
  letter-spacing: .08em;
}
/* Разделитель ":" между блоками */
.countdown-colon {
  font: 700 48px 'Playfair Display', serif;
  color: var(--orange-200);
  align-self: flex-start;
  margin-top: 8px;
  /* между ДНИ/ЧАСЫ — опционально, между ЧАСЫ/МИН/СЕК — да */
}
```

**Логика flip-анимации:**
```typescript
// При изменении числа — добавить класс .flip на 150ms,
// обновить значение, убрать .flip
useEffect(() => {
  const el = ref.current
  el.classList.add('flip')
  setTimeout(() => {
    setValue(newValue)
    el.classList.remove('flip')
  }, 150)
}, [newValue])
```

**Дата экспедиции** для счётчика — из `src/data` поля `startDate` (ISO string). Агент не хардкодит дату. Когда `startDate` в прошлом — блок таймера скрывается (`display: none`), его место занимает статичная строка "Экспедиция началась".

Mobile: `countdown-number` 40px, `min-width` убрать, gap 8px.

---

### 5.6 Форма заявки (все статусы, содержание отличается)
> ⚠️ Финальный CSS панели формы — в разделе 14.11. Форма использует существующий `RequestModal.tsx` — только рестайл.

**Фон секции** (только шаблон "Активна"):
На сайте под формой стоит fullbleed фото `expeditions-form-bg.jpg` — это сильное решение, оставляем и усиливаем:
```css
.form-section {
  position: relative;
  padding: var(--space-10) 0;
  overflow: hidden;
}
.form-section-bg {
  position: absolute; inset: 0;
  object-fit: cover; width: 100%; height: 100%;
  z-index: 0;
}
.form-section-overlay {
  position: absolute; inset: 0;
  background: rgba(26,26,26,.50);
  z-index: 1;
}
```

**Стеклянная панель формы** — усиленный glass (форма на тёмном фото-фоне требует более сильного блюра чем обычный Level 01):
```css
.form-panel {
  position: relative; z-index: 2;
  max-width: 560px;
  margin: 0 auto;
  padding: 48px;
  background: rgba(255,255,255,.65);
  backdrop-filter: blur(32px);
  -webkit-backdrop-filter: blur(32px);
  border: 1px solid rgba(255,255,255,.9);
  border-radius: var(--radius-lg);
  box-shadow: 0 24px 64px rgba(0,0,0,.2);
}
```

**Заголовок панели:**
```
H2 "Стать участником экспедиции"
  Playfair Display 600, 28px, --text-primary, margin-bottom 8px
Подзаголовок:
  HelveticaNeueCyr 400, 14px, --text-secondary
  "Выберите экспедицию и оставьте заявку — мы свяжемся с вами в течение суток."
  margin-bottom: 28px
```

**Для "Активна" — полная форма:**
Форма уже реализована с `react-hook-form` + `zod` валидацией и `nodemailer` на бэкенде. **Не переписывать логику** — только рестайлить существующий компонент под новый дизайн (CSS-классы из раздела 14.11, поля `.form-input`, `.form-panel`).

```
Select "Выберите экспедицию" — динамический из `src/data` (см. 10.7)
Input "Ваше имя" ★
Input "Телефон" ★
Input "E-mail" ★
Checkbox + ссылка на /privacy
btn-liquid full-width "Стать участником"
```

**Для "Скоро" — compact lead-capture:**
Фон секции — плоский `--bg-surface` (без фото), панель `.glass-01` обычный.
```
H3 "Вам интересна локация?"
Текст "Оставьте заявку — и эта точка может стать следующей на карте FExperience."
Input "E-mail" ★
btn-liquid full-width "Оставить заявку"  ← не "Стать участником"
```

**Для "Завершена" — нет формы:**
Вместо формы — блок "Похожие активные направления" (2 карточки `.card.plain`) + `.btn-outline` "Смотреть все экспедиции" → `/expeditions`.

**Поля формы:**
```css
.form-input {
  width: 100%;
  height: 52px;
  border: 1px solid rgba(26,26,26,.15);
  border-radius: var(--radius-sm);
  padding: 0 16px;
  font: 400 15px HelveticaNeueCyr;
  background: rgba(255,255,255,.8);
  margin-bottom: 12px;
  transition: border-color .2s, background .2s;
}
.form-input:focus {
  border-color: var(--orange-600);
  background: #fff;
  outline: none;
  box-shadow: 0 0 0 3px var(--orange-100);
}
label {
  font: 500 13px HelveticaNeueCyr;
  color: var(--text-secondary);
  margin-bottom: 6px;
  display: block;
}
.form-checkbox-row {
  display: flex; align-items: flex-start; gap: 10px;
  margin-bottom: 20px; margin-top: 4px;
  font: 400 13px/1.5 HelveticaNeueCyr;
  color: var(--text-tertiary);
}
.form-checkbox-row a { color: var(--orange-600); }
.form-checkbox {
  width: 18px; height: 18px; flex-shrink: 0;
  accent-color: var(--orange-600);
  margin-top: 2px;
}
```

**Состояния формы:** loading / success / error — см. раздел 11.2.

### 5.7 Recap-блоки (только шаблон "Завершена")

- **Отзывы:** один крупный editorial testimonial-stage по принципу 2.8, без статичной сетки одинаковых карточек. Остальные отзывы доступны через горизонтальное переключение/слайды.
- **Читать по теме:** сетка карточек статей (см. 6.4), фильтр по категории = названию страны.

---

## 6. Статьи / Insights

### 6.1 Hero + Featured Insight

**Hero страницы** (компактный, фон `--bg-canvas`, padding `--space-8` 0 `--space-6`):
```
Eyebrow "СТАТЬИ И АНАЛИТИКА" — --type-eyebrow
H1 "Инсайты с рынков" — Playfair Display 700, 48px / 30px mobile
Подзаголовок — HelveticaNeueCyr 400 18px --text-secondary, max-width 480px
  "Материалы наших экспертов о рынках, возможностях
   и реалиях бизнеса за рубежом."
```

**Featured-карточка** сразу под hero: `.glass-signature`, height 400px, layout split (фото 50% + текст 50% padding 48px), H2 заголовка статьи 32px Playfair, excerpt `--type-body-lg`, `.btn-text` "Читать →".

Featured-статья — последняя опубликованная из `src/data` (`orderBy: publishedAt desc, limit: 1`), не хардкодить.

### 6.2 Фильтры

Идентично 4.3 (filter-pill), пункты: Все / Марокко / Африка / Прочее.

### 6.3 Сетка статей

**Не использовать 3 одинаковые article cards.** Это Insights Hub, поэтому лента должна выглядеть как журнал.

**Layout desktop:** первый материал — large editorial feature (примерно 2/3 ширины), второй/третий — stacked smaller stories; дальше — variable-width rows. Обложки без рамок.

Каждый материал: дата/категория → крупный Playfair title → короткая мета-информация. CTA — текстовая стрелка.

Hover: только лёгкий zoom изображения и/или появление короткой оранжевой линии под заголовком. Не поднимать карточку.

Фильтры остаются функциональными, но не доминируют визуально: тонкие текстовые tabs с активной линией вместо ряда одинаковых pills.

### 7.1 Hero

max-width 760px margin auto, padding-top `--space-9`.
- Категория-тег: `.badge-active`-подобный (`--orange-200` фон `--orange-600` текст)
- H1: Playfair Display 700, 40px desktop / 28px mobile, line-height 1.25, margin-top 16px
- Excerpt: `--type-body-lg`, margin-top 16px
- Метаданные (автор, дата, время чтения): flex gap 16px, `--type-meta`, margin-top 24px, border-top + border-bottom 1px solid `--border-hairline`, padding 16px 0

### 7.2 Тело статьи

max-width 720px margin auto, padding `--space-8` 0.

```css
.article-body { font: 400 18px/1.8 HelveticaNeueCyr; color: var(--text-primary); }
.article-body h2 { font: 600 28px Playfair Display; margin-top: 48px; margin-bottom: 16px; }
.article-body p { margin-bottom: 24px; }
.article-body blockquote {
  font: 500 24px/1.5 Playfair Display;
  color: var(--orange-700);
  border-left: 2px solid var(--orange-600);
  padding-left: 24px;
  margin: 40px 0;
}
```

**Inline data card:** `--bg-surface` фон, border-radius `--radius-md`, padding 24px, my 32px, стат-цифра `--type-stat` (меньше, 32px) + подпись `--type-body`.

### 7.3 Related блоки + Subscribe

Related Market / Related Insights — карточки как в 6.3, сетка 2 колонки, margin-top `--space-9`.

Subscribe CTA — идентичен footer newsletter-блоку (2.11), но как отдельная секция перед футером, фон `--bg-surface`.

---

## 8. Мобильная адаптация — сводные правила

```
Все горизонтальные grid → либо stack (vertical), либо horizontal scroll-snap
  (scroll-snap используется там, где карточек > 4 и они однотипные:
   Continental Nav, editorial photo field About, testimonial-stage)

Все паддинги секций: --space-10/--space-9 (96/64px desktop) → --space-8 (56px) mobile
Все H1/Display: -40-45% от desktop размера
Кнопки на mobile: full-width там, где это единственный CTA секции
Хедер: сокращается до лого + гамбургер, nav уходит в overlay-меню
Hero: видео можно заменить статичным фото на mobile для производительности
  (media query, poster fallback)
```

---

## 8.1 Визуальный Source-of-Truth Lock

Если в более раннем разделе встречается старое указание на одинаковые карточки, card-grid, массовый hover-lift, белый непрозрачный glass или общий world-map, оно считается устаревшей реализацией и не должно возвращаться в код. Приоритет имеют editorial rules разделов 2, 4.5, 5.2–5.3, 7 и финальные CSS-разделы.

**Карта экспедиции — исключение из любой оптимизации:** `MapContinent` на `/expeditions/[slug]` обязателен. Он не заменяется карточкой, декоративной иконкой, общей картой мира или `Continental Navigation`. Использовать route-specific контур, точку страны и маршрутные данные из `src/data/expeditions.ts` согласно разделу 14.13.


## 9. Порядок реализации (рекомендация для агента)

```
1.  Токены (раздел 0) → tailwind.config / CSS variables
2.  Общие компоненты: Button, Badge, Card, GlassPanel, FilterPill, Accordion,
    MapComponent, StatusBadge, HeroSlider, CookieBanner
3.  Preloader (10.1) — первое, что видит пользователь
4.  Header + Footer со всеми вариантами (10.4 — кнопка "Стать партнёром")
5.  Homepage секция за секцией (2.1 → 2.11), включая Hero-слайдер (10.2)
    и блок Программа/Спикеры/Участники (10.5)
6.  Expeditions Directory (4.1 → 4.5), без блока "Деловой ужин" (10.6)
7.  Expedition Detail — сначала шаблон "Активна" (ЮАР), включая
    динамический select (10.7); потом "Скоро"; потом "Завершена"
8.  About (3.1 → 3.4)
9.  Articles Hub + Article Template (6 → 7)
10. Privacy страница (10.8)
11. OG/SEO-теги для всех страниц (10.9)
12. Cookie-баннер (10.3)
13. Финальный проход: responsive-адаптация всех страниц (раздел 8),
    мобильное меню со всеми элементами (10.10)
```

---

## 10. Дополнения — пропущенные компоненты

### 10.1 Preloader

Анимированный preloader появляется при первом открытии любой страницы, блокирует интерфейс до готовности DOM, затем плавно уходит.

**Последовательность анимации:**

```
1. Экран: белый (#FFFFFF) или --bg-canvas, z-index: 9999, position: fixed, inset: 0
2. Фаза 1 (0–600ms): буква "F" появляется по центру экрана
   — Playfair Display 700, font-size: 96px (desktop) / 64px (mobile)
   — color: --text-primary
   — opacity: 0 → 1, ease-out 400ms
3. Фаза 2 (600–1000ms): "F" уменьшается и смещается влево
   — font-size: 96px → 28px
   — translateX: 0 → -[ширина слова "Experience" / 2]px
   — одновременно справа от "F" появляется "Experience"
     (opacity: 0 → 1, translateX: 16px → 0, ease-out 300ms)
   — итог: логотип "FExperience" целиком, выровненный по центру, размер хедера (28px)
4. Фаза 3 (1000–1300ms): пауза — логотип виден целиком
5. Фаза 4 (1300–1600ms): весь preloader-оверлей уходит вверх
   — translateY: 0 → -100%, ease-in 300ms
   — под ним открывается страница (уже загружена)
```

**Технически:** React-компонент `<Preloader />`, показывается через `useState(true)`, переключается в `false` после `onAnimationEnd` финальной фазы. Монтируется в `_app.tsx` / `layout.tsx` один раз. После первого показа — не повторяется в рамках SPA-навигации (только при hard refresh). Можно хранить флаг в `sessionStorage`.

```css
.preloader {
  position: fixed; inset: 0; z-index: 9999;
  background: var(--bg-canvas);
  display: flex; align-items: center; justify-content: center;
}
.preloader-logo {
  font-family: 'Playfair Display', serif;
  font-weight: 700; font-size: 96px;
  color: var(--text-primary);
  display: flex; align-items: baseline;
  overflow: hidden;
}
.preloader-f { display: inline-block; }
.preloader-rest {
  display: inline-block;
  font-size: 28px; /* финальный размер */
  opacity: 0;
}
```

Используйте CSS `@keyframes` + `setTimeout` для переключения фаз — Framer Motion в preloader избыточен (это первое что грузится, библиотека замедлит TTI):

```tsx
// components/Preloader.tsx
'use client'
import { useEffect, useState } from 'react'

export function Preloader() {
  const [phase, setPhase] = useState<'enter' | 'expand' | 'exit'>('enter')
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    // Фаза 1 (0ms): буква F появляется
    // Фаза 2 (600ms): F уменьшается, "Experience" вырастает справа
    const t1 = setTimeout(() => setPhase('expand'), 600)
    // Фаза 3 (1300ms): весь оверлей уходит вверх
    const t2 = setTimeout(() => setPhase('exit'), 1300)
    // Размонтировать после завершения анимации
    const t3 = setTimeout(() => setHidden(true), 1700)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [])

  if (hidden) return null

  return (
    <div className={`preloader preloader--${phase}`} aria-hidden="true">
      <div className="preloader-logo">
        <span className="preloader-f">F</span>
        <span className="preloader-rest">Experience</span>
      </div>
    </div>
  )
}
```

```css
/* globals.css — preloader */
.preloader {
  position: fixed; inset: 0; z-index: 9999;
  background: var(--bg-canvas);
  display: flex; align-items: center; justify-content: center;
  transition: transform .4s cubic-bezier(0.7, 0, 0.3, 1);
}
.preloader--exit {
  transform: translateY(-100%);
}
.preloader-logo {
  display: flex; align-items: baseline; overflow: hidden;
}
.preloader-f {
  font: 700 96px/1 'Playfair Display', serif;
  color: var(--text-primary);
  display: inline-block;
  animation: preloader-f-shrink .4s cubic-bezier(0.16,1,0.3,1) .6s both;
}
.preloader-rest {
  font: 700 28px/1 'Playfair Display', serif;
  color: var(--text-primary);
  display: inline-block;
  opacity: 0;
  transform: translateX(8px);
  animation: preloader-rest-appear .35s cubic-bezier(0.16,1,0.3,1) .75s both;
}
@keyframes preloader-f-shrink {
  from { font-size: 96px; }
  to   { font-size: 28px; }
}
@keyframes preloader-rest-appear {
  from { opacity: 0; transform: translateX(8px); }
  to   { opacity: 1; transform: translateX(0); }
}
```

---

### 10.2 Hero — ручной слайдер активных экспедиций

Hero главной — единый `HeroSlider` на Embla Carousel.

Слайды формируются из активных экспедиций существующего `src/data/expeditions.ts`.

CMS не используется.

Слайдер:
- ручное переключение стрелками;
- точки-индикаторы;
- touch/swipe через Embla;
- без autoplay.

### Данные

```tsx
import { expeditions } from '@/data/expeditions'

const activeExpeditions = expeditions
  .filter((expedition) => expedition.status === 'active')
  .sort(
    (a, b) =>
      new Date(a.startDate).getTime() -
      new Date(b.startDate).getTime()
  )
```

Не создавать CMS-механику. Не использовать Sanity, Strapi, Contentful, внешний API или другой источник данных.

### HeroSlide

Каждый слайд — fullscreen:

```tsx
<article className="hero-slide">
  <div className="hero-slide__media">
    <video
      className="hero-slide__video"
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      poster={expedition.heroPoster}
      aria-hidden="true"
    >
      <source src={expedition.heroVideo} type="video/webm" />
    </video>
  </div>

  <div className="hero-slide__overlay" />

  <div className="hero-slide__glass glass-02">
    <a
      className="hero-slide__join btn-liquid"
      href={`/expeditions/${expedition.slug}#form`}
    >
      Стать участником
    </a>
  </div>

  <div className="hero-slide__title-layer">
    <h1 className="hero-slide__title">
      <span className="hero-slide__title-glass">
        <span className="hero-slide__forbes" aria-hidden="true">
          с Forbes
        </span>
        Бизнес —
        <time className="hero-slide__date">
          {formatExpeditionDate(expedition.startDate, expedition.endDate)}
        </time>
      </span>

      <span className="hero-slide__title-open">
        ЭКСПЕДИЦИЯ
      </span>

      <span className="hero-slide__title-country">
        {getExpeditionDirection(expedition)}
      </span>
    </h1>

    <a
      className="hero-slide__details btn-text"
      href={`/expeditions/${expedition.slug}`}
    >
      Подробнее
    </a>
  </div>

  <div className="hero-slide__pills" aria-label="Ключевые особенности экспедиции">
    {expedition.heroPills?.slice(0, 3).map((pill) => (
      <span className="hero-slide__pill" key={pill}>
        {pill}
      </span>
    ))}
  </div>
</article>
```

### Критически важно: video background

Desktop Hero должен использовать **видео**, а не `heroPoster` как самостоятельный фон.

```tsx
<video
  autoPlay
  muted
  loop
  playsInline
  preload="metadata"
  poster={expedition.heroPoster}
>
  <source src={expedition.heroVideo} type="video/webm" />
</video>
```

`heroPoster` — только poster/fallback во время загрузки и mobile-источник. Не брать автоматически изображение детальной страницы как desktop Hero background.

Для активной экспедиции отсутствие `heroVideo` — ошибка данных/ассетов. Не скрывать её статичным изображением.

### Геометрия

```css
.hero-slider,
.hero-slider__viewport,
.hero-slider__container,
.hero-slider__slide {
  width: 100%;
  height: 100%;
}

.hero-slider {
  position: relative;
  height: 100vh;
  min-height: 720px;
  overflow: hidden;
}

.hero-slider__container { display: flex; }
.hero-slider__slide { flex: 0 0 100%; min-width: 0; }

.hero-slide {
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 720px;
  overflow: hidden;
  isolation: isolate;
}

.hero-slide__media,
.hero-slide__video,
.hero-slide__poster {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

.hero-slide__video,
.hero-slide__poster { object-fit: cover; }

.hero-slide__overlay {
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  background: linear-gradient(
    180deg,
    rgba(26,26,26,0) 40%,
    rgba(26,26,26,.28) 100%
  );
}

/* 40% glass / 60% open video */
.hero-slide__glass {
  position: absolute;
  inset: 0 auto 0 0;
  z-index: 2;
  width: 40%;
  height: 100%;
  border-radius: 0;
  padding: 0;
  backdrop-filter: blur(32px);
}

.hero-slide__title-layer {
  position: absolute;
  inset: 0;
  z-index: 3;
  pointer-events: none;
}

.hero-slide__title {
  position: absolute;
  top: 50%;
  left: 10%;
  width: max-content;
  margin: 0;
  transform: translateY(-50%);
  font: 700 clamp(112px, 9.2vw, 160px)/.82 'Playfair Display', serif;
  letter-spacing: -.055em;
}

.hero-slide__title-glass {
  position: relative;
  display: block;
  width: max-content;
  color: var(--text-primary);
}

.hero-slide__forbes {
  position: absolute;
  left: -0.72em;
  bottom: 0;
  height: 1em;
  display: flex;
  align-items: center;
  font: 500 clamp(13px, 1vw, 18px)/1 'HelveticaNeueCyr', sans-serif;
  white-space: nowrap;
  color: currentColor;
  writing-mode: vertical-rl;
  transform: rotate(180deg);
  transform-origin: center;
  pointer-events: none;
}

.hero-slide__date {
  display: block;
  margin-top: 18px;
  font: 500 clamp(17px, 1.25vw, 22px)/1.2 'HelveticaNeueCyr', sans-serif;
  letter-spacing: -.01em;
  color: var(--text-primary);
}

.hero-slide__title-open {
  display: block;
  margin-left: 40vw;
  margin-top: -1.18em;
  white-space: nowrap;
  color: #fff;
}

.hero-slide__title-country {
  display: block;
  margin-left: 52vw;
  margin-top: 18px;
  white-space: nowrap;
  color: #fff;
}

/* CTA на одной горизонтали и ближе к центру */
.hero-slide__join {
  position: absolute;
  left: 31%;
  bottom: 96px;
  z-index: 4;
  pointer-events: auto;
}

.hero-slide__details {
  position: absolute;
  left: 53%;
  bottom: 96px;
  z-index: 4;
  pointer-events: auto;
  white-space: nowrap;
  color: #fff;
}

.hero-slide__pills {
  position: absolute;
  left: 40%;
  right: 48px;
  bottom: 36px;
  z-index: 4;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 8px;
  pointer-events: none;
}

.hero-slide__pill {
  display: inline-flex;
  align-items: center;
  min-height: 32px;
  padding: 7px 14px;
  border: 1px solid rgba(255,255,255,.28);
  border-radius: var(--radius-pill);
  background: rgba(26,26,26,.12);
  color: rgba(255,255,255,.92);
  font: var(--type-meta);
}

.hero-slider__controls {
  position: absolute;
  z-index: 10;
  right: 48px;
  top: 50%;
  display: flex;
  gap: 12px;
  transform: translateY(-50%);
}

.hero-slider__arrow {
  width: 44px;
  height: 44px;
  padding: 0;
  display: grid;
  place-items: center;
  cursor: pointer;
}
```

### Responsive

```css
@media (max-width: 1024px) {
  .hero-slide__glass { width: 45%; }
  .hero-slide__title { left: 8%; font-size: clamp(88px, 10vw, 128px); }
  .hero-slide__title-open { margin-left: 44vw; }
  .hero-slide__title-country { margin-left: 54vw; }
  .hero-slide__join { left: 24%; }
  .hero-slide__details { left: 56%; }
}

@media (max-width: 767px) {
  .hero-slider,
  .hero-slide { height: 90vh; min-height: 640px; }

  .hero-slide__video { display: none; }
  .hero-slide__poster { display: block; }

  .hero-slide__glass { width: 58%; height: 100%; }

  .hero-slide__title {
    top: 38%;
    left: 24px;
    max-width: calc(100vw - 48px);
    transform: none;
    font-size: clamp(52px, 13vw, 82px);
    line-height: .86;
  }

  .hero-slide__title-open { margin-left: 35vw; margin-top: -.2em; }
  .hero-slide__title-country { margin-left: 42vw; margin-top: 10px; white-space: normal; }
  .hero-slide__date { margin-top: 12px; font-size: 15px; }

  .hero-slide__join { left: 24px; bottom: 88px; }
  .hero-slide__details { left: auto; right: 24px; bottom: 88px; }

  .hero-slide__pills {
    left: 24px;
    right: 24px;
    bottom: 24px;
    justify-content: flex-start;
  }

  .hero-slider__controls {
    right: 24px;
    top: auto;
    bottom: 140px;
    transform: none;
  }
}
```

### Удалить из старой реализации

```text
FEXPERIENCE внутри glass Hero
FORBES × БИЗНЕС-ЭКСПЕДИЦИИ
eyebrow Hero
подзаголовок Hero
floating glass-card
текст страны как единственный H1
старое разнесение CTA по краям
CMS / Sanity / Strapi / Contentful — запрещены
ручные touchstart/touchmove/touchend
```

### Acceptance criteria

1. Hero = `100vh` desktop.
2. На desktop фон — реально воспроизводимое видео, не статичное изображение.
3. `heroPoster` не заменяет desktop video.
4. Glass занимает ~40% ширины и 100% высоты Hero.
5. Glass не является floating-card.
6. Внутри glass нет декоративного `FEXPERIENCE`.
7. Нет `FORBES × БИЗНЕС-ЭКСПЕДИЦИИ`.
8. `Бизнес —` — крупный H1 в glass.
9. `ЭКСПЕДИЦИЯ` — продолжение H1 на открытом фоне.
10. `В ЮАР` / `Во Вьетнам` — вторая строка со смещением вправо.
11. `с Forbes` — вертикально слева от `Б`, снизу вверх.
12. Дата — непосредственно под `Бизнес —`.
13. `Стать участником` — на glass.
14. `Подробнее` — на открытом видео.
15. Обе кнопки находятся на одной горизонтали и ближе к центру.
16. Три тезиса — pills в нижней части Hero.
17. Источник данных — `src/data/expeditions.ts`.
18. CMS отсутствует.
19. Active Hero использует `heroVideo` на desktop.
20. На mobile используется `heroPoster`.
21. Смена slide меняет video, направление, дату, CTA и pills текущей экспедиции.
22. Swipe реализуется Embla, без собственных touch-handlers.

---

### 10.3 Cookie-баннер

Светлый, в стиле системы — не тёмная полоса на весь экран (как сейчас).

**Позиция:** fixed, bottom: 24px, left: 24px (desktop), bottom: 0 left: 0 width: 100% (mobile). z-index: 100 (ниже preloader, выше всего остального).

**Вид:**
```css
.cookie-banner {
  background: var(--bg-elevated);
  border: 1px solid var(--border-hairline);
  border-radius: var(--radius-md);
  padding: 20px 24px;
  max-width: 420px; /* desktop */
  box-shadow: var(--shadow-hover);
  display: flex; flex-direction: column; gap: 12px;
}
```

**Содержимое:**
- Текст: HelveticaNeueCyr 14px `--text-secondary`, "Мы используем cookies. Продолжая использование сайта, вы соглашаетесь с обработкой данных." Ссылка "Подробнее о политике" → `/privacy`, цвет `--orange-600`.
- Кнопки в ряд: `btn-liquid` compact "Принять" + `btn-outline` compact "Отклонить".
- Состояние хранится в `localStorage('cookie-consent')`. При наличии флага — баннер не показывается.

**Анимация появления:** slideUp — `translateY(24px)→0, opacity 0→1`, 400ms после загрузки страницы (не мгновенно, чтобы не конкурировать с preloader).

---

### 10.4 "Стать партнёром" — логика присутствия

Кнопка "Стать партнёром" **не входит** в глобальный Header по умолчанию.

**Правило присутствия:**

| Страница | Кнопка в Header |
|---|---|
| `/` (главная) | ❌ нет |
| `/about` | ❌ нет |
| `/articles` | ❌ нет |
| `/expeditions` | ❌ нет |
| `/expeditions/[slug]` — **любая детальная** | ✅ появляется |

**Реализация:** в `layout.tsx` или через `useRouter().pathname` — если путь матчит `/expeditions/[slug]` (не `/expeditions`), рендерить дополнительную кнопку в правой части хедера, между nav и основной CTA.

```
[Лого]  |  Рынки  Экспедиции  Статьи  О нас  |  [Стать партнёром]  [Стать участником]
```

**Стиль кнопки "Стать партнёром":** `btn-outline`, padding 12px 20px, font-size 14px — визуально тише, чем `btn-liquid` рядом. На mobile — только в overlay-меню, не в хедере (слишком тесно).

**Действие кнопки:** открывает отдельную форму или modal — нужно уточнить у команды, есть ли отдельная партнёрская форма или это email. До уточнения — ссылка `mailto:FExperience@forbes.ru?subject=Партнёрство`.

---

### 10.5 Блок "Программа / Спикеры / Участники" (главная)

Этот блок на живом сайте содержит три подсекции с анимированными счётчиками (сейчас рендерятся как "0%" в статичном фетче). Это самостоятельный блок между картой/Continental Navigation и "Почему FExperience".

**Layout блока:** тёмный (не чёрный) фон — `#1A1A1A`, padding `--space-10` 0. Это **единственная секция с тёмным фоном** на всём сайте — обоснованно используется как контрастный якорь между двумя светлыми секциями.

**Три подсекции в ряд** (grid 3 колонки desktop, 1 колонка mobile с разделителями):

**Подсекция 1 — ПРОГРАММА:**
- Заголовок: "ПРОГРАММА", HelveticaNeueCyr 600 13px, letter-spacing .08em, color `rgba(255,255,255,.5)`
- 2 счётчика рядом:
  - Цифра: Playfair Display 700, 64px, color `var(--orange-600)`
  - Подпись: HelveticaNeueCyr 400 14px, color `rgba(255,255,255,.7)`, "деловая часть" / "культурное погружение"
- Значения (из `src/data` для текущей featured экспедиции, например ЮАР): "70% деловая часть / 30% культурное погружение"

**Подсекция 2 — СПИКЕРЫ:**
- Заголовок: "СПИКЕРЫ", то же оформление
- 3 счётчика вертикально (или 3 строки):
  - "50% локальный бизнес-истеблишмент"
  - "30% представительства российских компаний"
  - "20% госорганы, регуляторы, торговая палата"
- Цифры: Playfair Display 700, 48px (меньше, т.к. их 3), `--orange-600`

**Подсекция 3 — УЧАСТНИКИ:**
- Заголовок: "УЧАСТНИКИ"
- Крупная строка: ">N МЛРД РУБ — годовой оборот", N — из `src/data`
- Подстрока: "НЕТВОРКИНГ на уровне первых лиц", HelveticaNeueCyr 600 15px, `--orange-400`

**Разделители** между подсекциями: вертикальная линия 1px, `rgba(255,255,255,.1)`.

**Анимация счётчиков:** через `countup.js` (уже установлен). Хук `useCountUp` — в разделе 14.6. Не писать кастомный счётчик. Реализовать кастомным хуком `useCountUp` — не подключать `react-countup` (лишняя зависимость):

```tsx
// hooks/useCountUp.ts
// countup.js уже установлен в проекте — используем его, не пишем кастомный
import { useEffect, useRef } from 'react'
import { CountUp } from 'countup.js'

export function useCountUp(target: number, duration = 1.2) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!ref.current) return
    const countUp = new CountUp(ref.current, target, {
      duration,
      useEasing: true,
      easingFn: (t, b, c, d) => c * Math.cbrt(t / d) + b, // ease-out cubic
    })

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        countUp.start()
        observer.disconnect()
      }
    }, { threshold: 0.3 })

    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [target, duration])

  return ref
}

// Использование:
// const ref = useCountUp(60)
// <span ref={ref}>0</span>
```

```css
.stats-block {
  background: #1A1A1A;
  padding: 80px 0;
}
.stats-grid {
  display: grid;
  grid-template-columns: 1fr 1px 1fr 1px 1fr;
  gap: 0;
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 64px;
}
.stats-divider {
  background: rgba(255,255,255,.1);
  margin: 0 40px;
}
.stat-number {
  font-family: 'Playfair Display', serif;
  font-weight: 700;
  font-size: 64px;
  color: var(--orange-600);
  line-height: 1;
}
.stat-label {
  font-size: 14px;
  color: rgba(255,255,255,.65);
  margin-top: 8px;
}
```

**Данные блока:** привязаны к "активной featured" экспедиции, которая показывается в Hero. Если экспедиций несколько активных — показываются данные той, что первая в слайдере, или усреднённые для всей программы. Решение — у команды.

---

### 10.6 Блок "Деловой ужин Forbes в Индии" — убирается

Отдельная посадочная страница для разового мероприятия "Деловой ужин" — временный контент, в новом дизайне не реализуется. Карточка Индии остаётся в директории со статусом "Скоро" (шаблон 2 из раздела 5.4). Если в будущем появится аналогичное разовое мероприятие — под него нужна отдельная landing-страница вне системы экспедиций, с простым шаблоном (hero + текст + форма).

---

### 10.7 Форма заявки — динамический select

Выпадающий список в форме заявки (на странице детальной экспедиции и, если есть, на главной) **не хардкодится**. Он формируется динамически из `src/data`: все записи с полем `status: "активна"`, отсортированные по дате по возрастанию.

**Формат опции в select:** `[Страна] — [даты], [город]`
Пример: "ЮАР — 15–21 ноября 2026", "Вьетнам — 14–20 марта 2027"

**При открытии страницы конкретной экспедиции** (напр. `/expeditions/south-africa`) — select предзаполнен этой экспедицией (`defaultValue = currentExpeditionId`), но пользователь может переключить на другую активную.

```typescript
// src/data/expeditions.ts — данные уже здесь, не в `src/data`
import { expeditions } from '@/data/expeditions'

const activeExpeditions = expeditions
  .filter(e => e.status === 'active' && e.showDatesInMenu !== false)
  .sort((a, b) => {
    // сортировка по дате начала если она есть
    if (!a.dates || !b.dates) return 0
    return a.dates.localeCompare(b.dates)
  })
```

---

### 10.8 Страница `/privacy`

Политика обработки персональных данных. Не требует сложного дизайна, нужен только чистый читаемый шаблон.

**Layout:** max-width 760px, margin 0 auto, padding `--space-9` `--space-5`.

**Структура:**
- H1 "Политика обработки персональных данных" — Playfair Display 600, 36px
- Дата последнего обновления — `--type-meta`, margin-top 8px, margin-bottom 40px
- Тело: HelveticaNeueCyr 400 17px, line-height 1.75, `--text-primary`
- H2 разделов — Playfair Display 600, 22px, margin-top 40px
- Ссылки — `--orange-600`
- Контакты организации (уже есть на сайте: 123022, Москва, 2-я Звенигородская ул., д. 13 стр. 15 + email FExperience@forbes.ru)

**Текст** политики — предоставляется командой, агент не генерирует юридический текст самостоятельно. Агент создаёт только шаблон страницы.

---

### 10.9 SEO / OG-теги — единый шаблон для всех страниц

В Next.js реализуется через `generateMetadata()` в каждом `page.tsx`.

**Обязательные поля для каждой страницы:**

```typescript
// Пример для детальной страницы экспедиции
export async function generateMetadata({ params }) {
  const expedition = await getExpedition(params.slug)
  return {
    title: `Бизнес-экспедиция в ${expedition.country} | FExperience`,
    description: expedition.shortDescription,
    openGraph: {
      title: `Бизнес-экспедиция в ${expedition.country}`,
      description: expedition.shortDescription,
      images: [{
        url: expedition.ogImage, // поле в `src/data`: 1200×630px
        width: 1200,
        height: 630,
        alt: `Бизнес-экспедиция в ${expedition.country}`,
      }],
      type: 'website',
      url: `https://fexperience.forbes.ru/expeditions/${params.slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: `Бизнес-экспедиция в ${expedition.country}`,
      description: expedition.shortDescription,
      images: [expedition.ogImage],
    },
  }
}
```

**Таблица OG-изображений по страницам** (нужно подготовить в `src/data`):

| Страница | og:image | Размер |
|---|---|---|
| `/` | `/images/og-home.jpg` | 1200×630 |
| `/about` | `/images/og-about.jpg` (уже есть) | 1200×630 |
| `/articles` | `/images/og-articles.jpg` | 1200×630 |
| `/expeditions` | `/images/og-expeditions.jpg` | 1200×630 |
| `/expeditions/[slug]` | из `src/data` поля `ogImage` | 1200×630 |
| `/privacy` | `/images/og-home.jpg` (fallback) | 1200×630 |

**Canonical URL:** все страницы должны иметь `canonical`. На `/about` сейчас canonical указывает на `fexperience.ru` (без `.forbes`), что создаёт дублирование — нужно исправить на `fexperience.forbes.ru`.

---

### 10.10 Мобильное меню — полная спецификация

Дополнение к краткому описанию из раздела 1 (Header).

**Структура overlay-меню (полный список элементов):**

```
[Крестик закрытия — top-right, 44×44px]

[Логотип — top-left, как в хедере]

--- навигация ---
Рынки
Экспедиции
Статьи
О нас

--- разделитель 1px rgba(26,26,26,.08) ---

[Телеграм-ссылка — иконка TG 20px + текст "Написать нам", --text-secondary]

--- CTA ---
[btn-liquid full-width "Стать участником"]
[btn-outline full-width "Стать партнёром"]  ← только на /expeditions/[slug]

--- низ ---
[copyright "© Forbes FExperience 2024-2026"]
[ссылка "Политика конфиденциальности" → /privacy]
```

**Анимация открытия:** оверлей появляется с правого края (`translateX(100%) → translateX(0)`), 350ms, `cubic-bezier(0.16,1,0.3,1)`. Фон — `rgba(250,250,248,.95)` + `backdrop-filter: blur(20px)`.

**Пункты навигации:** Playfair Display 600, 28px, `--text-primary`, line-height 1.8. Staggered появление — каждый пункт с задержкой 50ms (0ms, 50ms, 100ms, 150ms), `translateY(16px) → 0, opacity 0 → 1`.

**Telegram-ссылка:** в реальном коде используется `https://t.me/Milena_Amor` (видно в Header и Footer на живом сайте). Зашить в `config/contacts.ts` или `.env`:
```
NEXT_PUBLIC_TG_LINK=https://t.me/Milena_Amor
```
Уточнить у команды — это личный аккаунт менеджера или официальный канал проекта.

---

## 11. Финальные дополнения перед передачей агенту

### 11.1 Правило изображений — next/image везде

Все изображения на сайте используют компонент `next/image`, не нативный `<img>`. Без исключений.

```tsx
// Above-the-fold (hero, первый экран) — priority загрузка
<Image
  src="/images/expeditions/south-africaC.webp"
  alt="Бизнес-экспедиция в ЮАР"
  fill
  priority
  quality={85}
  style={{ objectFit: 'cover' }}
/>

// Всё остальное — lazy по умолчанию (next/image делает это сам)
<Image
  src={expert.photo}
  alt={expert.name}
  width={300}
  height={300}
  quality={80}
/>
```

**Форматы в `src/data`:** принимать только `.webp` или `.jpg`. PNG — только для логотипов с прозрачностью. Видео — `.webm` с `.mp4` fallback. Poster-изображение для видео — обязательно (загружается до начала воспроизведения).

**Размеры og:image** — строго 1200×630px, отдельный кроп для каждой экспедиции, не автоматический ресайз произвольного фото.

---

### 11.2 Состояния форм — loading / success / error

Применяется ко всем формам на сайте: форма заявки на экспедицию, newsletter в футере, lead-форма на страницах "Скоро".

**Состояние по умолчанию (idle):** форма в обычном виде, кнопка активна.

**Loading** (после нажатия кнопки, до ответа сервера):
```tsx
// Кнопка блокируется, внутри — spinner + текст
<button disabled className="btn-liquid opacity-70 cursor-not-allowed">
  <Spinner size={16} /> Отправляем...
</button>
```
```css
.spinner {
  width: 16px; height: 16px;
  border: 2px solid rgba(255,255,255,.3);
  border-top-color: #fff;
  border-radius: 50%;
  animation: spin .6s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }
```
Все поля формы — `pointer-events: none`, opacity `.6`.

**Success** (сервер вернул 200):
Форма целиком заменяется success-состоянием — не alert, не toast, а inline, внутри той же стеклянной панели:
```
[Иконка галочки в круге, --orange-600, 48px]

Заявка отправлена

Мы свяжемся с вами в ближайшее время.
Пока — читайте наши статьи об экспедициях.

[btn-text "Перейти в раздел Статьи →"]
```
Иконка появляется с анимацией scale(0)→scale(1), 400ms, spring. Текст — fade-in с задержкой 200ms.

**Error** (сетевая ошибка или 4xx/5xx):
Форма остаётся видимой, под кнопкой появляется строка ошибки:
```css
.form-error {
  font: 400 13px HelveticaNeueCyr;
  color: #C0392B; /* не из палитры — стандартный красный ошибки */
  margin-top: 8px;
  display: flex; align-items: center; gap: 6px;
}
```
Текст: "Не удалось отправить заявку. Попробуйте ещё раз или напишите нам напрямую: FExperience@forbes.ru"
Кнопка снова становится активной.

**Newsletter-форма в футере** — упрощённые состояния: success = текст "Вы подписаны!" вместо формы; error = текст под полем.

---

### 11.3 Page Transitions

SPA-навигация в Next.js по умолчанию мгновенная — на фоне всех анимаций сайта резкие переходы будут ощущаться как баг.

**Реализация через Framer Motion `AnimatePresence`** в `layout.tsx`:

```tsx
// app/layout.tsx
<AnimatePresence mode="wait">
  <motion.div
    key={pathname}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.2, ease: 'easeOut' }}
  >
    {children}
  </motion.div>
</AnimatePresence>
```

Длительность: 200ms — достаточно коротко, чтобы не раздражать, достаточно длинно, чтобы переход читался как осознанный. Не использовать slide/transform для page transition — только opacity. Движущийся контент при переходе между страницами создаёт дезориентацию.

---

### 11.4 Страница 404

Страница "не найдено" — полноценный дизайнерский элемент, не техническая заглушка. Пользователь попадает сюда редко, но именно в этот момент у него максимальная растерянность — страница должна мгновенно снять тревогу и предложить путь.

**Концепция:** "Эта точка ещё не на карте" — прямая метафора из языка продукта (карты рынков, экспедиции, точки на карте). Не банальное "404 — страница не найдена", а редакционный заголовок в тоне Forbes.

**Layout:** fullscreen, `--bg-canvas`, flexbox column center, без хедера (только логотип сверху-слева), без футера. Весь фокус — на содержимом центра страницы.

**Структура (сверху вниз):**

```
[Логотип FExperience — top-left, ссылка на /]

[Центр страницы, max-width 640px, text-align center]

  Decorative number "404"
  Playfair Display 700
  font-size: 180px (desktop) / 96px (mobile)
  color: var(--orange-200)          ← приглушённый, декоративный
  line-height: 1
  position: relative, z-index: 0

  SVG-контур континента поверх цифры
  position: absolute, centered over "404"
  opacity: .15, --continent-outline
  ← рандомный континент или Afrika как самая узнаваемая форма
  ← контур "прорастает сквозь" цифру как watermark

  H1 "Эта точка ещё не на карте"
  Playfair Display 600, 36px (desktop) / 26px (mobile)
  color: --text-primary
  margin-top: -24px (наезжает на нижнюю часть "404")
  position: relative, z-index: 1

  Подзаголовок
  HelveticaNeueCyr 400, 17px, --text-secondary, line-height 1.6
  max-width: 480px, margin: 16px auto 0
  "Возможно, эта экспедиция ещё готовится. Пока — выберите направление из тех, что уже открыты."

  [Разделитель — тонкая линия --orange-600, 48px, margin: 32px auto]

  CTA-блок: два варианта в ряд, gap 16px
  [btn-liquid "Смотреть экспедиции"]   → /expeditions
  [btn-outline "На главную"]            → /

  Ниже, через 40px — тихая подсказка:
  HelveticaNeueCyr 400 13px, --text-tertiary
  "или напишите нам: FExperience@forbes.ru"
  ссылка — --orange-600
```

**Декоративный слой — анимация карты:**
```css
/* Контур континента медленно пульсирует */
.continent-404 {
  animation: pulse404 4s ease-in-out infinite;
}
@keyframes pulse404 {
  0%, 100% { opacity: .1; transform: scale(1); }
  50%       { opacity: .2; transform: scale(1.03); }
}
```

**Анимация появления страницы** (CSS stagger, не Framer Motion — 404 грузится один раз, тяжёлая библиотека не нужна):

```css
/* Каждый элемент 404 появляется последовательно */
.not-found-number   { animation: fadeUp .5s cubic-bezier(0.16,1,0.3,1) .0s both; }
.not-found-h1       { animation: fadeUp .4s cubic-bezier(0.16,1,0.3,1) .2s both; }
.not-found-sub      { animation: fadeUp .4s cubic-bezier(0.16,1,0.3,1) .35s both; }
.not-found-divider  { animation: expandWidth .3s ease-out .5s both; }
.not-found-ctas     { animation: fadeUp .3s cubic-bezier(0.16,1,0.3,1) .65s both; }

@keyframes fadeUp {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes expandWidth {
  from { width: 0; }
  to   { width: 48px; }
}
```

**Мобильная адаптация:**
- "404" уменьшается до 96px, контур континента масштабируется вместе
- H1 — 26px
- CTA — stack вертикально, full-width

**Файл:** `app/not-found.tsx` в Next.js 13+. Не использовать `pages/404.js` — устаревший подход.

---

### 11.5 Pull Quote на детальных страницах экспедиций

Размещается между блоком "Программа по дням" и блоком "Наши эксперты" — разбивает длинный скролл живой цитатой.

**Источник:** реальный отзыв участника именно этой экспедиции из поля `testimonials` в `src/data`. Для ЮАР — любой из: Гайдарович, Демченко, Николаев. Поле в `src/data`: `pullQuote: { text, author, company }`.

**Layout:** fullwidth секция, фон `--bg-surface`, padding `--space-9` 0 (64px).

```
max-width: 860px, margin: 0 auto, text-align: center, position: relative

[Декоративная кавычка открытия]
  Playfair Display 700, font-size: 120px, line-height: 0
  color: var(--orange-200)
  position: absolute, top: -20px, left: -40px
  (не в потоке, декоративный элемент)

[Текст цитаты]
  Playfair Display 500 italic
  font-size: 26px (desktop) / 20px (mobile)
  line-height: 1.5
  color: var(--orange-700)      ← не 600, лучший контраст в длинной цитате
  max-width: 720px, margin: 0 auto

[Атрибуция — через 24px]
  HelveticaNeueCyr 600, 15px, --text-primary   → имя автора
  HelveticaNeueCyr 400, 13px, --text-tertiary  → должность / компания
  display: flex, flex-direction: column, align-items: center, gap: 4px

[Тонкая линия-разделитель перед атрибуцией]
  width: 32px, height: 2px, background: --orange-600
  margin: 20px auto
```

**Анимация:** появляется при скролле через класс `.fade-up` (глобальный хук `useScrollReveal`), не Framer Motion.

---

### 11.6 Sticky Progress Bar на детальных страницах экспедиций

Тонкая линия под хедером, отражающая прогресс чтения страницы. Только на `/expeditions/[slug]` — на длинных страницах (особенно шаблон "Активна" с программой + экспертами).

```tsx
// hooks/useScrollProgress.ts
// Обновляет CSS custom property — без re-render React-компонента
export function useScrollProgress() {
  useEffect(() => {
    const bar = document.getElementById('scroll-progress-bar')
    if (!bar) return

    const update = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement
      const pct = (scrollTop / (scrollHeight - clientHeight)) * 100
      bar.style.width = `${pct}%`
      bar.style.opacity = scrollTop > 80 ? '1' : '0'
    }

    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])
}
```

```tsx
// В layout или странице — один статичный div, позиция fixed
// Никакого state, никакого re-render — только прямая мутация style
<div
  id="scroll-progress-bar"
  style={{
    position: 'fixed',
    top: '80px',
    left: 0,
    height: '2px',
    width: '0%',
    opacity: 0,
    background: 'var(--gradient-signature)',
    zIndex: 49,
    transition: 'width 100ms linear, opacity 200ms',
    pointerEvents: 'none',
  }}
/>
```

Появляется только при `scrollY > 80px` (после прокрутки хедера), исчезает при возврате наверх — `opacity: scrollY > 80 ? 1 : 0`, transition 200ms.

---

### 11.7 Декоративный watermark числа дней в Hero экспедиции

На детальных страницах экспедиций — крупное число дней как фоновый watermark в правом углу hero. Добавляет глубину без усложнения вёрстки.

**Позиция:** `position: absolute`, right: 64px (desktop) / right: 24px (mobile), bottom: 48px. Внутри hero-контейнера с `overflow: hidden`.

```css
.hero-days-watermark {
  font-family: 'Playfair Display', serif;
  font-weight: 700;
  font-size: 200px;       /* desktop */
  line-height: 1;
  color: rgba(255,255,255,.06);
  pointer-events: none;
  user-select: none;
  position: absolute;
  right: 64px;
  bottom: -20px;          /* чуть выходит за нижний край */
  z-index: 1;             /* над фото, под текстом */
  letter-spacing: -0.04em;
}
```

**Контент:** `"6"` или `"7"` — число дней из поля `duration` в `src/data`. Не слово, только цифра.

**Mobile:** font-size уменьшается до 100px, right: 16px, bottom: -10px.

**Важно:** watermark должен быть строго за стеклянной hero-панелью (z-index ниже панели), но поверх фото/видео. Если панель занимает более 60% ширины экрана — watermark частично скрывается за ней, это ок, даже добавляет эффект глубины.

---

### 11.8 Hover-состояние экспертов

Экспертный roster не поднимается как карточка. Hover допускает только очень мягкий зум изображения или изменение accent-линии.

```css
.expert-card {
  transition: border-color .3s var(--ease);
}
.expert-card:hover {
  transform: none;
  box-shadow: none;
}
.expert-photo {
  overflow: hidden;
  border-radius: var(--radius-md);
}
.expert-photo img {
  transition: transform .4s var(--ease);
}
.expert-card:hover .expert-photo img {
  transform: scale(1.03);
}
```

Не добавлять при hover появление имени/должности — они видны постоянно. Не использовать `translateY` для roster-элементов.

---

### 11.9 Active-состояние навигации в мобильном меню

Дополнение к разделу 10.10.

```css
/* Мобильное overlay-меню */
.mobile-nav-link {
  font-family: 'Playfair Display', serif;
  font-weight: 600;
  font-size: 28px;
  color: var(--text-primary);
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 12px;
  transition: color .2s;
}
.mobile-nav-link.active {
  color: var(--orange-600);
}
.mobile-nav-link.active::before {
  content: '';
  display: block;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--orange-600);
  flex-shrink: 0;
}
```

Определяется через `usePathname()` — сравнивается с `href` каждого пункта меню.

---

## 12. Замечания по стеку — Next.js / Tailwind / TypeScript / MDX

Сайт уже работает на этом стеке. Задача — редизайн поверх существующего кода, не переписывание с нуля. Раздел описывает что менять, что не трогать, и какие ловушки стека важно обойти.

---

### 12.1 Next.js — что важно знать

**App Router уже используется** (судя по структуре `/_next/image` на живом сайте). Архитектура не меняется — `layout.tsx`, `page.tsx`, `not-found.tsx` работают ровно как описано в разделах 11.3 (transitions), 11.4 (404), 10.1 (preloader).

**Preloader сейчас — текстовая заглушка "Загрузка..."** внутри JSX. Заменить на компонент `<Preloader />` (см. раздел 10.1) в `layout.tsx`. Никакой дополнительной архитектуры не требуется.

**Hero-слайдер** — при редизайне использовать единый `<HeroSlider>` на Embla Carousel с данными из существующего `src/data/expeditions.ts`. Не создавать отдельную CMS-механику для экспедиций.

**Яндекс.Метрика** уже подключена (`mc.yandex.ru/watch/...`). При переписывании `layout.tsx` — вынести в отдельный компонент `<YandexMetrika />` и сохранить. Не удалять.

**`next/image`** уже используется везде правильно (`/_next/image?url=...&w=3840&q=75`). Не заменять на нативный `<img>`. Единственное что менять — параметр `sizes` при изменении сеток.

**Canonical URL** — на `/about` сейчас указывает на `fexperience.ru` (без `.forbes`). Исправить во всех `generateMetadata()` на `https://fexperience.forbes.ru/[path]`.

**Порядок файлов которые меняются / не меняются:**

| Файл | Действие |
|---|---|
| `app/layout.tsx` | Изменить: добавить Preloader, AnimatePresence, сохранить YandexMetrika |
| `app/page.tsx` | Переписать структуру секций |
| `app/about/page.tsx` | Переписать структуру |
| `app/expeditions/page.tsx` | Переписать структуру |
| `app/expeditions/[slug]/page.tsx` | Переписать, добавить шаблоны по статусу |
| `app/articles/page.tsx` | Переписать структуру |
| `app/articles/[slug]/page.tsx` | Только CSS-классы, MDX-механику не трогать. Использовать класс `prose` из `@tailwindcss/typography` — кастомизировать, не переписывать |
| `app/not-found.tsx` | Создать новый (раздел 11.4) |
| `app/privacy/page.tsx` | Создать новый (раздел 10.8) |
| `components/ui/*` / `components/shared/*` | Использовать существующие компоненты и рестайлить их; новые базовые компоненты создавать только если их действительно нет |
| `src/data/config.ts` | Использовать существующий источник конфигурации и контактных данных |
| `types/index.ts` | Создать: интерфейсы (раздел 12.3) |
| `hooks/useScrollProgress.ts` | Создать (раздел 11.6) |
| `src/app/globals.css` | Изменить: заменить @theme на светлую палитру, сохранить/обновить глобальные классы и финальные CSS из раздела 14 |
| `tailwind.config.ts` | Не создавать и не изменять: Tailwind v4 настраивается через `@theme` в `src/app/globals.css` |
| `public/images/*` | Не трогать — существующие файлы переиспользуются |
| `content/**/*.mdx` | Не использовать для данных экспедиций; MDX относится к статьям и не требует смены механики |

---

### 12.2 Tailwind v4 — CSS-first конфигурация

**Важно:** в проекте установлен **Tailwind CSS v4** (`"tailwindcss": "^4"`). В v4 нет `tailwind.config.ts` — конфигурация делается через `@theme` директиву прямо в CSS-файле. Весь синтаксис v3-конфига (extend, theme, plugins) не работает в v4.

Добавить в начало `globals.css` (или в отдельный `theme.css` который импортируется первым):

```css
/* globals.css — ЗАМЕНИТЬ существующий @theme блок целиком */
/* Текущий @theme: тёмная тема (#000004 фон, белый текст) */
/* Новый @theme: светлая тема (Quiet Premium) */

@import "tailwindcss";
@plugin "@tailwindcss/typography"; /* уже есть в проекте */

@theme {
  /* ── Фон ── */
  --color-canvas:   #FAFAF8;
  --color-surface:  #F5F2EC;
  --color-elevated: #FFFFFF;

  /* ── Текст ── */
  --color-text-primary:   #1A1A1A;
  --color-text-secondary: #6D6D6D;
  --color-text-tertiary:  #A0A0A0;

  /* ── Оранжевая шкала (фирменный FExperience) ── */
  --color-brand-100: #FFF0E8;
  --color-brand-200: #FFE8D6;
  --color-brand-300: #FFB089;
  --color-brand-400: #FF8A54;
  --color-brand-500: #FF7722;
  --color-brand-600: #FF6B2C;
  --color-brand-700: #B7410E;

  /* ── Радиусы ── */
  --radius-sm:   8px;
  --radius-md:   16px;
  --radius-lg:   24px;
  --radius-pill: 999px;

  /* ── Шрифты (переменные заполняются через next/font в layout.tsx) ── */
  --font-display: var(--font-playfair);
  --font-serif:   var(--font-helvetica-serif);
  --font-sans:    var(--font-helvetica-sans);

  /* ── Blur для стекла ── */
  --blur-glass:        20px;
  --blur-glass-strong: 32px;

  /* ── Тени ── */
  --shadow-resting: 0 4px 16px rgba(26,26,26,.05);
  --shadow-hover:   0 12px 32px rgba(26,26,26,.09);
  --shadow-glass:   0 8px 40px rgba(0,0,0,.06);
  --shadow-glow:    0 0 24px rgba(255,107,44,.35);
  --shadow-liquid:  0 0 40px rgba(255,107,44,.25);

  /* ── Брейкпоинты (сохранить из текущего globals.css) ── */
  --breakpoint-sm:  640px;
  --breakpoint-md:  768px;
  --breakpoint-lg:  1024px;
  --breakpoint-xl:  1280px;
  --breakpoint-xxl: 1440px;
}

@layer base {
  body {
    /* Было: bg-[#0D0805] text-white */
    /* Стало: светлый фон */
    background-color: var(--color-canvas);
    color: var(--color-text-primary);
    font-family: var(--font-sans), 'HelveticaNeueCyr', sans-serif;
  }
  h1, h2, h3, h4, h5, h6 {
    font-family: var(--font-display), var(--font-serif);
  }
}

/* Масштабирование для 1024–1280px (из текущего globals.css — сохранить) */
@media (min-width: 1024px) and (max-width: 1280px) {
  html { font-size: 14px; }
}
```

**Что из текущего `globals.css` убирается:**
```
--color-bg-primary: #000004    → заменяется на --color-canvas
--color-bg-card: #110F0D       → заменяется на --color-elevated
--color-accent: #FF8800        → заменяется на --color-brand-600 (#FF6B2C)
--color-border: #2A2A2A        → заменяется на rgba(26,26,26,.08)
--color-divider: #FDF2E4       → убирается (не используется в новом дизайне)
bg-[#0D0805] в body            → заменяется на bg-canvas
text-white в body              → заменяется на text-text-primary
```

После этого Tailwind v4 автоматически генерирует утилиты:
```
bg-canvas, bg-surface, bg-elevated
text-text-primary, text-text-secondary, text-text-tertiary
bg-brand-600, text-brand-600, border-brand-600
rounded-sm, rounded-md, rounded-lg, rounded-pill
font-serif, font-sans
shadow-resting, shadow-hover, shadow-glass
```

**`backdrop-filter` в Tailwind v4** — встроен без дополнительной настройки:
```
backdrop-blur-xl  → backdrop-filter: blur(24px)
backdrop-blur-2xl → backdrop-filter: blur(40px)
```
Для нестандартных значений (blur(20px) для glass-01) — добавить в `@theme`:
```css
@theme {
  --blur-glass:        20px;
  --blur-glass-strong: 32px;
}
/* Использовать: backdrop-blur-glass, backdrop-blur-glass-strong */
```

**`-webkit-backdrop-filter`** — в v4 добавляется автоматически через autoprefixer. Убедиться что `@tailwindcss/postcss` настроен в `postcss.config.js`.

**`cn()` утилита** — в проекте уже есть `clsx` и `tailwind-merge`. Создать если не существует:
**Структура проекта:** весь код в `src/` (`tsconfig.json` paths: `@/* → ./src/*`).
Все импорты используют `@/components/...`, `@/data/...`, `@/lib/...`, `@/hooks/...`.

```typescript
// src/lib/utils.ts  (не /lib/utils.ts)
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

---

### 12.3 TypeScript — интерфейсы

Создать файл `types/index.ts`. Агент использует эти типы во всех компонентах — не придумывает типы по месту:

```typescript
export type ExpeditionStatus = 'активна' | 'скоро' | 'завершена'
export type ExpeditionRegion = 'africa' | 'asia' | 'latam' | 'russia'

export interface Expedition {
  slug: string
  country: string
  region: ExpeditionRegion
  status: ExpeditionStatus
  startDate: string        // ISO string "2026-11-15"
  endDate: string          // ISO string "2026-11-21"
  duration: number         // количество дней (для watermark в hero)
  city: string             // "Кейптаун, Стелленбос"
  shortDescription: string // для hero подзаголовка и og:description
  heroVideo?: string       // путь к .webm, опционально
  heroPoster: string       // путь к .webp, обязательно
  ogImage: string          // 1200×630px для OG
  pullQuote?: {
    text: string
    author: string
    company: string
  }
  liveStats?: {
    businessPercent: number
    culturePercent: number
    localBusinessPercent: number
    russianCompaniesPercent: number
    govPercent: number
    participantsTurnover: string   // ">28 МЛРД РУБ"
  }
  completedStats?: {         // только для status === 'завершена'
    speakersCount: number
    participantsCount: number
  }
}

export interface Expert {
  name: string
  role: string
  company: string
  photo: string
  tag: string              // "Логистика", "Право", "Финансы"...
  isForbes: boolean        // true = Forbes Russia team, рендерится в отдельном блоке
}

export interface Testimonial {
  name: string
  role: string
  company: string
  photo: string
  text: string
  expeditionTag: string    // "ЮАР 2025", "Марокко 2025"
}

export interface Article {
  slug: string
  title: string
  excerpt: string
  cover: string
  category: 'марокко' | 'африка' | 'прочее'
  publishedAt: string      // ISO string
  readTime: number         // минут
  author: string
}

export interface ContactsConfig {
  phone: string            // "+7 (920) 194-90-03"
  phoneHref: string        // "tel:+79201949003"
  email: string            // "FExperience@forbes.ru"
  telegram: string         // "https://t.me/fexperience"
  address: string
  copyright: string
}
```

---

### 12.4 Архитектура данных — TypeScript файлы, не MDX

**Критическое уточнение после изучения реального кода проекта.**

Данные экспедиций хранятся в **TypeScript-файлах** в `src/data/`, не в MDX:

```typescript
// src/data/expeditions.ts — массив всех экспедиций
// src/data/speakers.ts    — массив спикеров/экспертов  
// src/data/program.ts     — программа по дням (объект, ключ = programSlug)
// src/data/config.ts      — конфиг сайта (URL, контакты)
```

Страница экспедиции читает данные так:
```typescript
const expedition = expeditions.find(e => e.slug === slug)
const program = programs[expedition?.programSlug || ''] || []
const expeditionSpeakers = speakers.filter(s => s.expeditionSlugs?.includes(slug))
```

**Статусы — подтверждены из `src/data/expeditions.ts`:**
```typescript
'active'    — активная (ЮАР, Вьетнам, new-delhi)
'upcoming'  — скоро, нет программы/экспертов (Сахалин, Индия, Таиланд, Индонезия, Бразилия, Кения)
'completed' — завершена (Марокко)
```

**Ключевые поля из реальных данных:**
```typescript
expedition.programSlug  // 'sa-program' | 'vietnam-program' | 'morocco-program' | ''
expedition.timer?       // { enabled: boolean, targetDate: string, label: string }
expedition.image        // путь к существующему файлу в /public/images/expeditions/
expedition.showDatesInMenu // boolean — показывать даты в навигации
```

**`new-delhi`** — особый slug, это "Деловой ужин", не полноценная экспедиция.
В редизайне убирается из навигации и директории (раздел 10.6), но данные не удалять.

**`RequestModal`** в `RootClientLayout` — глобальная форма заявки. Кнопки
"Стать участником" открывают эту модалку через `ExpeditionContext`.
Рестайлить `RequestModal.tsx`, не дублировать форму на страницах.

**Агент НЕ меняет структуру data-файлов** — только добавляет новые поля если нужны для редизайна (например `moscowEntry` для компонента карты). Типы в `src/types/` расширяются, не переписываются.

**MDX используется только для статей** (через `@next/mdx` в `next.config.ts`). `gray-matter` — только для статей, не для экспедиций.

**Существующие компоненты — рестайл, не переписывание:**
```
src/components/shared/CountdownTimer.tsx       → рестайл (раздел 14.6)
src/components/shared/IncludedSlider.tsx       → рестайл (раздел 5.3) — Embla уже используется
src/components/shared/ExpertsSectionClient.tsx → рестайл (раздел 5.5)
src/components/shared/ExpeditionForm.tsx       → рестайл (раздел 14.11) — логика не трогать
src/components/shared/HeroImageSwitch.tsx      → рестайл или заменить на HeroSlider (раздел 10.2)
src/components/layout/Header.tsx               → рестайл под новый дизайн
src/components/layout/Footer.tsx               → рестайл под новый дизайн
src/components/layout/RootClientLayout.tsx     → НЕ ТРОГАТЬ структуру (Preloader, LenisProvider,
                                                 Header, main, Footer, RequestModal, ExpeditionProvider)
                                                 — только рестайл дочерних компонентов
src/components/shared/RequestModal.tsx         → рестайл (стеклянная панель, раздел 14.11)
src/components/providers/LenisProvider.tsx     → НЕ ТРОГАТЬ
src/components/providers/ExpeditionContext.tsx → НЕ ТРОГАТЬ
src/components/shared/YandexMetrika.tsx        → НЕ ТРОГАТЬ
```

**Инлайн `<style>` в `page.tsx`** (медиа-запросы по `max-height`) — убрать в редизайне, перенести в `globals.css` или Tailwind классы. Это технический долг текущей реализации.
---

### 12.5 Cookie-баннер — рестайл, не пересоздание

Cookie-баннер уже существует на сайте (виден в HTML: "Мы используем cookies. Продолжая использование сайта..."). Агент **не создаёт новый компонент с нуля** — находит существующий и рестайлит под новый дизайн:

- Убрать тёмный фон (текущий — тёмная полоса)
- Применить `.glass-01` стиль
- Заменить кнопку на `.btn-liquid` (compact) + `.btn-outline` (compact)
- Позиционирование: fixed bottom-left, max-width 420px, border-radius `--radius-md`

Логика хранения согласия (`localStorage`) — не трогать.

---

### 12.6 Что не трогать — список явных запретов

Агент **не изменяет** следующее ни при каких условиях:

```
✗ Яндекс.Метрика script/компонент — только вынести в <YandexMetrika />, не удалять
✗ Тело MDX-файлов статей — только frontmatter
✗ next/image → не заменять на <img>
✗ Маршрутизацию (slugи экспедиций) — /expeditions/south-africa и т.д. остаются
✗ Существующие изображения в /public/images — переиспользовать, не удалять
✗ Логику хранения cookie-consent в localStorage
✗ Форму заявки — только рестайл, не смена endpoint/логики отправки
```

---

### 12.7 Порядок реализации — финальный (с учётом стека)

```
Шаг 1.  styles/globals.css          — CSS-переменные (раздел 0) + glass-классы + .article-body
Шаг 2.  tailwind.config.ts          — регистрация переменных (раздел 12.2)
Шаг 3.  types/index.ts              — интерфейсы (раздел 12.3)
Шаг 4.  config/contacts.ts          — контактные данные (раздел 2.11)
Шаг 5.  components/ui/*             — Button, Badge, GlassPanel, FilterPill, StatusBadge
Шаг 6.  components/Preloader.tsx    — раздел 10.1
Шаг 7.  components/CookieBanner.tsx — рестайл существующего (раздел 10.3)
Шаг 8.  components/HeroSlider.tsx   — раздел 10.2
Шаг 9.  components/MapContinent.tsx — раздел 4.5
Шаг 10. components/Countdown.tsx    — раздел 5.5.5
Шаг 11. hooks/useScrollProgress.ts  — раздел 11.6
Шаг 12. app/layout.tsx              — Preloader + AnimatePresence + YandexMetrika (сохранить)
Шаг 13. app/not-found.tsx           — раздел 11.4 (создать)
Шаг 14. app/privacy/page.tsx        — раздел 10.8 (создать шаблон)
Шаг 15. app/page.tsx                — главная, секции 2.1 → 2.11
Шаг 16. app/expeditions/page.tsx    — директория, секции 4.1 → 4.5
Шаг 17. app/expeditions/[slug]/page.tsx — детальная, 3 шаблона по статусу (раздел 5)
Шаг 18. app/about/page.tsx          — раздел 3
Шаг 19. app/articles/page.tsx       — раздел 6
Шаг 20. app/articles/[slug]/page.tsx — только шаблон рендера, раздел 7
Шаг 21. content/**/*.mdx            — проверить frontmatter, добавить недостающие поля
Шаг 22. Responsive-проход           — все страницы, раздел 8
Шаг 23. generateMetadata()          — все page.tsx, раздел 10.9
```

**Важно:** шаги 1–4 — до написания любого компонента. Шаги 5–11 — компоненты до страниц. Шаги 13–14 (not-found, privacy) — до основных страниц, чтобы ссылки из footer и cookie-баннера работали сразу.

---

## 13. Изображения и иконки — руководство для генерации нейросетью

Все фото генерируются нейросетью (Midjourney, Flux, DALL·E 3 или аналог). Раздел содержит точные промпты по каждой категории и правила которые нельзя нарушать. Иконки — отдельная система.

---

### 13.1 Принцип отбора — что можно и что нельзя

**Разрешено:**
- Деловая среда, переговоры, рабочие встречи за столом
- Городская инфраструктура: офисные кварталы, порты, аэропорты, рынки
- Промышленные объекты: заводы, склады, логистические центры
- Предприниматели в действии: презентации, handshake, co-working
- Природа как контекст делового региона: горные пейзажи ЮАР, сельскохозяйственные угодья Бразилии — без туристической подачи
- Архитектура как маркер рынка: современные бизнес-центры, исторические деловые кварталы

**Запрещено категорически:**
- Туристы с рюкзаками, пляжи, курорты
- Достопримечательности как главный объект (Эйфелева башня, пирамиды и т.д.)
- Животные (сафари, дикая природа)
- Отели снаружи и внутри (ресепшн, лобби, номера)
- Еда и рестораны как главный сюжет
- Самолёты, аэропорты как туристическое место
- Стоковый "бизнес" с белозубыми улыбками в костюмах
- Флаги и туристические символы стран

---

### 13.2 Hero-изображения экспедиций

Используются как fullbleed фон на детальных страницах. Поверх — тёмный оверлей (уже описан в разделе 5.1), поэтому изображение должно работать затемнённым.

**Требования:** горизонтальный формат 16:9 минимум 1920×1080px, экспортировать в `.webp`, качество 85%. Сохранять как `hero-[slug].webp`.

**ЮАР** (`hero-south-africa.webp`) — уже есть видео, нужна фото-замена для mobile poster:
```
Prompt: aerial view of Cape Town business district at golden hour,
modern glass office buildings, ocean in background, cinematic composition,
no tourists, no landmarks, professional business atmosphere,
dramatic sky, wide angle, photorealistic, 8k
```

**Вьетнам** (`hero-vietnam.webp`):
```
Prompt: Ho Chi Minh City skyline at dusk, modern skyscrapers,
busy commercial district, river with cargo ships,
economic growth visual metaphor, no tourists, cinematic wide shot,
warm orange and gold tones, photorealistic, 8k
```

**Индия** (`hero-india.webp`):
```
Prompt: New Delhi Connaught Place business district,
modern office buildings mixed with historic architecture,
business professionals walking, golden hour lighting,
no tourists no landmarks no monuments, cinematic, photorealistic, 8k
```

**Бразилия** (`hero-brazil.webp`):
```
Prompt: Sao Paulo financial district Faria Lima avenue,
glass skyscrapers, modern urban business environment,
aerial view, blue hour lighting, no favelas no carnival no nature,
pure business district aesthetic, photorealistic, 8k
```

**Кения** (`hero-kenya.webp`):
```
Prompt: Nairobi CBD business district aerial view,
modern glass office towers, Silicon Savannah tech hub atmosphere,
daytime, no safari no wildlife no nature, purely urban business,
cinematic composition, photorealistic, 8k
```

**Таиланд** (`hero-thailand.webp`):
```
Prompt: Bangkok business district Sathorn road,
glass towers reflecting in modern corporate architecture,
business professionals, no temples no tourists no tuk-tuks,
golden hour, wide cinematic shot, photorealistic, 8k
```

**Индонезия** (`hero-indonesia.webp`):
```
Prompt: Jakarta SCBD financial district, modern skyscrapers,
corporate office buildings, busy business street level,
no temples no beaches no tourism, contemporary business hub feel,
overcast dramatic sky, photorealistic, 8k
```

**Сахалин** (`hero-sakhalin.webp`):
```
Prompt: Sakhalin island industrial infrastructure,
oil and gas facilities, modern port with cargo ships,
dramatic Far East landscape, professional industrial photography,
no tourism, wide cinematic shot, photorealistic, 8k
```

**Марокко** (`hero-morocco.webp`) — для recap-страницы:
```
Prompt: Casablanca Morocco Finance City business district,
modern glass office towers, contemporary North African architecture,
business professionals, no medina no souks no camels no tourists,
golden morning light, cinematic, photorealistic, 8k
```

---

### 13.3 Программа по дням — фото в таймлайн

Каждый день экспедиции имеет своё фото. Существующие файлы уже есть (`/images/program/UarDay1-6.webp`). При создании для новых экспедиций:

**Формат:** 3:2 или 4:3, минимум 1200×800px, `.webp` 80%.

**День 1 — открытие / ужин / знакомство:**
```
Prompt: elegant business dinner in [region], long table,
professionals networking, warm candlelight ambiance,
no formal gala no tuxedos, relaxed high-end atmosphere,
photorealistic, editorial style
```

**День 2 — бизнес-сессия:**
```
Prompt: business conference room in modern [city] office,
professionals presenting data on screen, attentive audience,
diverse group, no stock photo feel, real documentary style,
photorealistic
```

**День 3 — посещение локального объекта:**
```
Prompt: industrial facility tour in [country], business delegation
walking through modern manufacturing plant, no hard hats tourism,
authentic business visit atmosphere, photorealistic, wide shot
```

**День 4 — городская инфраструктура:**
```
Prompt: [city name] urban business environment from street level,
professionals walking, modern commercial district,
local business atmosphere, no tourists, golden hour, photorealistic
```

**День 5 — встреча с местными:**
```
Prompt: business meeting between international and local entrepreneurs
in [country], informal setting, genuine conversation,
diverse cultures, no stock photo handshake,
documentary photography style, natural light
```

**День 6 — культурный контекст:**
```
Prompt: [specific location from program], viewed through business lens,
architectural detail, local economic context,
no tourist photography style, editorial quality, photorealistic
```

---

### 13.4 Блок "Что включено" — 6 карточек

Фото-фон для каждой карточки. Существующие файлы: `included-bg-1.webp` ... `included-bg-6.webp`. В новом дизайне overlay-фото (`included-south-africa-top-*.webp`) убираются — нужен только один качественный фон.

**Формат:** 4:3, минимум 800×600px, `.webp` 80%. Изображения тёмные или средние по тону — текст поверх должен читаться.

**1. Медийное сопровождение:**
```
Prompt: professional video interview setup, journalist with camera,
corporate media production, Forbes magazine aesthetic,
dark moody background, professional lighting, no cheap stock feel,
photorealistic
```

**2. Бизнес-сессии и нетворкинг:**
```
Prompt: business professionals in small group discussion,
modern conference setting, active conversation,
diverse international participants, no suits + smiles cliche,
documentary candid style, photorealistic
```

**3. Культурные мероприятия:**
```
Prompt: cultural evening event in [region] setting,
local musicians or performers in background,
business guests observing, elegant atmosphere,
no tourist experience, exclusive private event feel, photorealistic
```

**4. Отель 5★:**
```
Prompt: luxury hotel suite interior, minimalist premium design,
warm lighting, crisp white linens, large window with city view,
no lobby no pool no beach, pure room quality,
architectural photography style, photorealistic
```

**5. VIP-трансферы:**
```
Prompt: premium business car interior, leather seats,
blurred city outside window from rear seat perspective,
executive travel, no driver visible, clean minimal aesthetic,
photorealistic
```

**6. Питание:**
```
Prompt: private business dinner table setting,
fine dining plating of local [country] cuisine,
no restaurant crowd, intimate private dining atmosphere,
editorial food photography, warm tones, photorealistic
```

---

### 13.5 About — фото деловой программы

Существующие 4 фото уже подходят по стилю (взять за эталон). При добавлении новых:

**Формат:** квадрат 1:1 или 4:3, минимум 800px по меньшей стороне, `.webp`.

```
Prompt: [one of the following scenarios]

1. Business expedition participants listening to expert presentation
   in meeting room, engaged, diverse group, no stock feel,
   documentary photography, natural light

2. HelveticaNeueCyrnational business delegation visiting local [industry] company,
   authentic workplace environment, no staged handshakes,
   candid business documentary style

3. Evening networking event, professionals in relaxed conversation,
   warm ambient lighting, private venue, no tourist bar feel

4. Group of entrepreneurs reviewing documents and laptops,
   co-working or hotel meeting space, collaborative atmosphere,
   no generic stock imagery
```

---

### 13.6 Hero главной страницы — видеопостер

Для desktop — видео (существующее `hero-south-africa.webm`). Для mobile и как poster к видео нужен статичный кадр:

```
Prompt: aerial cinematic shot of major financial district,
glass skyscrapers at golden hour, business energy and dynamism,
no specific city recognizable, universal premium business aesthetic,
16:9 ratio, dramatic lighting, photorealistic, 8k, suitable as website hero
```

---

### 13.7 OG-изображения (социальные сети)

**Размер:** строго 1200×630px, `.jpg` или `.webp`.

**Шаблон для каждой экспедиции:**
```
Prompt: premium business travel editorial image,
[country/region specific business landmark or skyline],
horizontal format, space for text overlay on left third,
dark bottom gradient, Forbes aesthetic, photorealistic,
1200x630 pixels
```

Поверх сгенерированного фото наложить текст вёрсткой:
- Логотип FExperience (верхний левый угол)
- Название экспедиции (Playfair Display)
- Даты

---

### 13.8 Иконки — система

Все иконки на сайте — единая библиотека **Lucide Icons** (уже совместима с React, TypeScript, Next.js). Устанавливается: `npm install lucide-react`.

```typescript
import { Compass, Users, BarChart2, Building2,
         Globe, MapPin, Shield, TrendingUp,
         FileText, Wifi, DollarSign, Film,
         Star, Car, Coffee, ChevronRight,
         ArrowRight, Check, X, Menu, Play } from 'lucide-react'
```

**Правила использования:**

```css
/* Все иконки — stroke, не fill */
stroke-width: 1.5   /* основной вес */
stroke-width: 1     /* декоративные, мелкие */

/* Размеры */
14px — внутри тегов-пилюль, метаданные
16px — кнопки btn-text, ссылки
20px — навигация, мобильное меню
24px — карточки, заголовки разделов
28px — иконки в due diligence карточках
32px — декоративные (раздел 3.3 О нас)
```

**Маппинг иконок по блокам:**

| Блок | Иконка | Lucide name |
|---|---|---|
| Рынки / Continental Nav | Глобус | `Globe` |
| Экспедиции / маршрут | Компас | `Compass` |
| Нетворкинг | Пользователи | `Users` |
| Аналитика / данные | График | `BarChart2` |
| Госструктуры | Здание | `Building2` |
| Локация / пин на карте | Пин | `MapPin` |
| Безопасность (due diligence) | Щит | `Shield` |
| Деловой климат | Тренд вверх | `TrendingUp` |
| Регуляторная среда | Документ | `FileText` |
| Цифровизация | WiFi / Signal | `Wifi` |
| Финансовая инфраструктура | Деньги | `DollarSign` |
| Медийное сопровождение | Плёнка | `Film` |
| Отель 5★ | Звезда | `Star` |
| Трансферы | Автомобиль | `Car` |
| Питание | Кофе / приборы | `Coffee` |
| Погружение в культуру | Компас | `Compass` |
| Кнопка "Подробнее →" | Стрелка | `ChevronRight` |
| btn-text ссылки | Стрелка | `ArrowRight` |
| Success форма | Галочка в круге | `CheckCircle` |
| Закрыть (меню, модал) | X | `X` |
| Гамбургер | Меню | `Menu` |
| Play (видео) | Треугольник | `Play` |
| Логистика | Грузовик | `Truck` |
| Культурные барьеры | Речевой пузырь | `MessageSquare` |
| Стоимость выхода | Калькулятор | `Calculator` |
| Реальный спрос | Поиск | `Search` |
| Telegram | — | Используй SVG из Lucide нет — взять из SimpleIcons: `si-telegram` |

**Иконки тегов в hero экспедиции:**

```typescript
// Погружение в культуру
<Compass size={14} strokeWidth={1.5} />

// Эксклюзивный нетворкинг
<Users size={14} strokeWidth={1.5} />

// Лучшие бизнес-практики
<BarChart2 size={14} strokeWidth={1.5} />
```

**Иконки фильтров-пилюль (Articles / Directory):**
Не использовать — только текст. Иконки в пилюлях создают визуальный шум при маленьком размере.

**Иконки статус-бейджей:**
Не использовать — только текст и цвет фона.

**Иконки Due Diligence (раздел 3.3 О нас):**

```typescript
const dueDiligenceIcons = [
  { label: 'Безопасность в стране',       icon: Shield },
  { label: 'Деловой климат',              icon: TrendingUp },
  { label: 'Регуляторная среда',          icon: FileText },
  { label: 'Особенности логистики',       icon: Truck },
  { label: 'Реальный спрос на продукт',   icon: Search },
  { label: 'Культурные барьеры',          icon: MessageSquare },
  { label: 'Финансовая инфраструктура',   icon: DollarSign },
  { label: 'Цифровизация экономики',      icon: Wifi },
  { label: 'Стоимость выхода на рынок',   icon: Calculator },
]
```

**SVG-карты континентов** (компонент `MapContinent`, раздел 4.5):
Это не иконки — отдельные SVG-файлы для каждого региона. Источник: Natural Earth Data или simplemaps.com (бесплатные SVG контуров). Файлы: `africa.svg`, `asia.svg`, `latam.svg`, `russia-far-east.svg`. Цвет контура — CSS variable `--continent-outline`, заливка none. Активная точка — SVG `<circle>` с pulse-анимацией (раздел 4.5 спека).

---

## 14. Реализация стеклянных эффектов и свечений — чистый код

Все визуальные эффекты ниже реализуются CSS + SVG + Framer Motion без PNG-текстур.
PNG от нейросети используется только в одном случае — иконки с иридесцентным переливом (Due Diligence), потому что многоцветный спектральный эффект внутри стекла кодом не воспроизвести убедительно. Всё остальное — чистый код.

---

### 14.1 Liquid Glass кнопка — полная реализация

Кнопка которую хочется нажать: объём, внутреннее свечение, преломление на краях, реакция на hover.

```css
/* globals.css */

.btn-liquid {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 16px 36px;
  border-radius: 999px;
  border: none;
  cursor: pointer;
  overflow: hidden;
  isolation: isolate;

  /* Основной градиент — тело кнопки */
  background: linear-gradient(
    160deg,
    #FF9966 0%,     /* светлый верх — как будто свет падает сверху */
    #FF6B2C 40%,    /* основной цвет */
    #CC4A1A 100%    /* тёмный низ — объём */
  );

  /* Внешнее свечение */
  box-shadow:
    0 0 0 1px rgba(255, 107, 44, .3),       /* тонкий контурный обод */
    0 0 20px rgba(255, 107, 44, .35),        /* ближний glow */
    0 0 60px rgba(255, 107, 44, .15),        /* дальний рассеянный glow */
    0 8px 32px rgba(183, 65, 14, .4),        /* тень с оранжевым оттенком */
    inset 0 1px 0 rgba(255, 200, 150, .5);  /* верхний внутренний блик */

  transition:
    transform 350ms cubic-bezier(0.16, 1, 0.3, 1),
    box-shadow 350ms cubic-bezier(0.16, 1, 0.3, 1);
}

/* Слой 1: Имитация преломления/линзы — радиальный градиент */
.btn-liquid::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: radial-gradient(
    ellipse 80% 50% at 50% 0%,
    rgba(255, 220, 180, .55) 0%,   /* яркий блик вверху */
    rgba(255, 140, 80, .1) 50%,
    transparent 100%
  );
  pointer-events: none;
}

/* Слой 2: Нижний контровой свет — ощущение толщины */
.btn-liquid::after {
  content: '';
  position: absolute;
  bottom: 0; left: 10%; right: 10%;
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 180, 120, .6) 30%,
    rgba(255, 200, 150, .8) 50%,
    rgba(255, 180, 120, .6) 70%,
    transparent
  );
  pointer-events: none;
}

/* Hover — кнопка "приподнимается" и свечение усиливается */
.btn-liquid:hover {
  transform: translateY(-2px) scale(1.02);
  box-shadow:
    0 0 0 1px rgba(255, 107, 44, .4),
    0 0 30px rgba(255, 107, 44, .5),
    0 0 80px rgba(255, 107, 44, .2),
    0 12px 40px rgba(183, 65, 14, .5),
    inset 0 1px 0 rgba(255, 200, 150, .6);
}

/* Active — кнопка "продавливается" */
.btn-liquid:active {
  transform: translateY(1px) scale(0.99);
  box-shadow:
    0 0 0 1px rgba(255, 107, 44, .3),
    0 0 15px rgba(255, 107, 44, .3),
    0 4px 16px rgba(183, 65, 14, .4),
    inset 0 2px 4px rgba(100, 30, 0, .2),  /* продавленность */
    inset 0 1px 0 rgba(255, 200, 150, .3);
}

/* Текст внутри */
.btn-liquid-text {
  position: relative;
  z-index: 1;
  font: 600 15px/1 'HelveticaNeueCyr', sans-serif;
  color: #fff;
  letter-spacing: .01em;
  text-shadow: 0 1px 2px rgba(100, 30, 0, .3); /* глубина текста */
}
```

```tsx
// components/ui/ButtonLiquid.tsx
'use client'
import { motion } from 'framer-motion'

interface ButtonLiquidProps {
  children: React.ReactNode
  onClick?: () => void
  href?: string
  size?: 'sm' | 'md' | 'lg'
}

export function ButtonLiquid({ children, onClick, href, size = 'md' }: ButtonLiquidProps) {
  const sizeStyles = {
    sm:  { padding: '11px 24px', fontSize: '14px' },
    md:  { padding: '16px 36px', fontSize: '15px' },
    lg:  { padding: '20px 52px', fontSize: '17px' },
  }

  return (
    <motion.button
      className="btn-liquid"
      style={sizeStyles[size]}
      onClick={onClick}
      whileHover={{ y: -2, scale: 1.02 }}
      whileTap={{ y: 1, scale: 0.99 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
    >
      <span className="btn-liquid-text">{children}</span>
    </motion.button>
  )
}
```

---

### 14.2 Glass Level 01 — базовая стеклянная карточка

Карточка реализует эффект как на референсе: прозрачное стекло с голубоватой гранью, дымка плотнее снизу и прозрачнее сверху, тёплая тень под карточкой, верхний блик от источника света.

**Гибридный подход:** основа — чистый CSS, дымка — PNG-текстура наложенная как `::after` слой. Это даёт органичную облачную форму которую математический CSS-градиент не воспроизведёт. Карточка работает корректно и без PNG (только CSS-градиент) — текстура улучшает, но не ломает без неё.

```css
.glass-01 {
  position: relative;
  background: rgba(255, 255, 255, .55);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: var(--radius-md);
  overflow: hidden;  /* дымка не вылезает за края */

  /* Голубоватая холодная грань — как на референсе */
  border: 1px solid rgba(255, 248, 240, .74);
  outline: 1px solid rgba(255, 255, 255, .15);
  outline-offset: -2px;

  box-shadow:
    0 12px 48px rgba(180, 150, 120, .12),   /* тень с тёплым оттенком */
    0 4px 16px rgba(0, 0, 0, .06),
    inset 0 1px 0 rgba(255, 255, 255, .95), /* верхний блик — свет сверху */
    inset -1px 0 0 rgba(255, 255, 255, .4), /* правый блик */
    inset 0 -1px 0 rgba(255, 255, 255, .2); /* нижний приглушённый */

  transition: box-shadow .3s, border-color .3s;
}

/* Слой 1: CSS-градиент дымки — математическая база */
.glass-01::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, .0)   0%,    /* верх — чистое стекло */
    rgba(255, 255, 255, .0)  35%,
    rgba(255, 248, 240, .20) 65%,    /* тёплая дымка начинается */
    rgba(255, 244, 235, .46) 85%,
    rgba(255, 238, 226, .62) 100%    /* максимум внизу */
  );
  pointer-events: none;
  z-index: 0;
}

/* Слой 2: PNG-текстура — органичная облачная форма */
/* Файл: /images/ui/fog-texture.png (промпт ниже) */
.glass-01::after {
  content: '';
  position: absolute;
  bottom: 0; left: 0; right: 0;
  height: 55%;
  background: url('/images/ui/fog-texture.png') center bottom / cover no-repeat;
  opacity: .45;
  pointer-events: none;
  z-index: 0;
  mix-blend-mode: screen; /* дымка добавляет свет, не затемняет */
}

/* Весь контент поверх слоёв дымки */
.glass-01 > * { position: relative; z-index: 1; }

.glass-01:hover {
  /* Базовое стекло не поднимается. При необходимости усиленное состояние использует .glass-02. */
  box-shadow:
    0 16px 48px rgba(180, 150, 120, .13),
    0 6px 20px rgba(0, 0, 0, .06),
    inset 0 1px 0 rgba(255, 255, 255, .95),
    inset -1px 0 0 rgba(255, 255, 255, .4),
    inset 0 -1px 0 rgba(255, 255, 255, .2);
}
```

**Промпт для fog-texture.png** — генерировать один раз, использовать на всём сайте:
```
Soft warm-white volumetric fog or mist cloud,
bottom-heavy composition — fog is denser and more opaque at the very bottom,
gradually becoming thinner, wispy and transparent toward the top,
organic irregular cloud shapes, not symmetrical,
subtle warm-white coloring — clean, soft, editorial,
microscopic water droplet texture visible up close,
pure transparent background,
fog fills approximately bottom 60% of the frame,
top 40% completely transparent,
no hard edges — fog fades organically into transparency,
studio lighting from above creating soft shadows within the fog,
photorealistic volumetric rendering,
PNG with transparent background, 800×400px, 8K quality
```

**Glass Signature — тёплая дымка** (переопределить поверх базового класса):
```css
.glass-signature::before {
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, .0)   0%,
    rgba(255, 248, 240, .15) 45%,
    rgba(255, 235, 210, .40) 75%,
    rgba(255, 225, 190, .60) 100%
  );
}
.glass-signature::after { opacity: .35; } /* чуть мягче на тёплом фоне */
```
---

### 14.3 Glass Signature — карточка с оранжевым свечением и угловыми дугами

Это самый сложный элемент. Реализуется тремя слоями: основной блок + SVG угловые дуги + радиальный glow под карточкой.

```css
.glass-signature {
  position: relative;
  background: rgba(255, 250, 244, .65);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: var(--radius-lg);
  isolation: isolate;

  /* Внешнее оранжевое свечение */
  box-shadow:
    0 0 0 1px rgba(255, 119, 34, .2),
    0 0 30px rgba(255, 107, 44, .18),
    0 0 80px rgba(255, 107, 44, .08),
    0 20px 60px rgba(0, 0, 0, .08),
    inset 0 1px 0 rgba(255, 255, 255, .9);
}

/* Слой: тонкое внутреннее свечение (как будто внутри тёплый источник) */
.glass-signature::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: radial-gradient(
    ellipse 70% 50% at 30% 0%,
    rgba(255, 232, 214, .5) 0%,
    transparent 70%
  );
  pointer-events: none;
  z-index: 0;
}

/* Контент поверх */
.glass-signature > * { position: relative; z-index: 1; }
```

```tsx
// components/ui/GlassSignatureCard.tsx
// Угловые дуги реализованы через SVG — это точнее чем ::before/::after
// потому что позволяет контролировать длину дуги и blur через filter

// Анимация через CSS .fade-up — Framer Motion не нужен для этого компонента
interface GlassSignatureCardProps {
  children: React.ReactNode
  className?: string
}

export function GlassSignatureCard({ children, className }: GlassSignatureCardProps) {
  return (
    <div className={`glass-signature fade-up ${className ?? ''}`}>
      <GlassCornerArcs />
      {children}
    </div>
  )
}

function GlassCornerArcs() {
  // Дуги отрисовываются через SVG border-image — точное позиционирование
  // по углам независимо от размера карточки
  return (
    <>
      {/* Верхний левый угол */}
      <svg
        style={{
          position: 'absolute', top: -1, left: -1,
          width: 80, height: 80, pointerEvents: 'none', zIndex: 2,
        }}
        viewBox="0 0 80 80" fill="none"
      >
        <path
          d="M 80 2 L 24 2 Q 2 2 2 24 L 2 80"
          stroke="#FF7722"
          strokeWidth="1.5"
          strokeLinecap="round"
          filter="url(#glow-tl)"
        />
        <defs>
          <filter id="glow-tl" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      </svg>

      {/* Нижний правый угол */}
      <svg
        style={{
          position: 'absolute', bottom: -1, right: -1,
          width: 80, height: 80, pointerEvents: 'none', zIndex: 2,
        }}
        viewBox="0 0 80 80" fill="none"
      >
        <path
          d="M 0 78 L 56 78 Q 78 78 78 56 L 78 0"
          stroke="#FF7722"
          strokeWidth="1.5"
          strokeLinecap="round"
          filter="url(#glow-br)"
        />
        <defs>
          <filter id="glow-br" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      </svg>

      {/* Радиальный оранжевый glow ПОД карточкой (не внутри) */}
      <div
        style={{
          position: 'absolute',
          inset: '-20px',
          borderRadius: 'inherit',
          background: 'radial-gradient(ellipse at 30% 0%, rgba(255,107,44,.12) 0%, transparent 60%)',
          pointerEvents: 'none',
          zIndex: -1,
          filter: 'blur(12px)',
        }}
      />
    </>
  )
}
```

---

### 14.4 Featured-карточка экспедиции на фирменном градиенте

```css
.card-featured {
  position: relative;
  border-radius: var(--radius-lg);
  overflow: hidden;
  isolation: isolate;

  /* Фирменный градиент */
  background: linear-gradient(
    45deg,
    #B7410E 0%,
    #CC5520 20%,
    #FF7722 55%,
    #FFAB7A 85%,
    #FFE8D6 100%
  );

  /* Свечение под карточкой */
  box-shadow:
    0 0 0 1px rgba(183, 65, 14, .3),
    0 8px 32px rgba(183, 65, 14, .25),
    0 24px 80px rgba(255, 107, 44, .15);

  transition: box-shadow .4s, filter .4s;
}

.card-featured:hover {
  transform: none;
  box-shadow:
    0 0 0 1px rgba(183, 65, 14, .4),
    0 16px 48px rgba(183, 65, 14, .35),
    0 40px 100px rgba(255, 107, 44, .2);
}

/* Внутренний highlight-слой — имитация объёма градиента */
.card-featured::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 50%;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, .12) 0%,
    transparent 100%
  );
  pointer-events: none;
  z-index: 1;
}

/* Текстурный шум — убирает "пластиковость" плоского градиента */
.card-featured::after {
  content: '';
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
  pointer-events: none;
  z-index: 2;
  mix-blend-mode: overlay;
}

/* Контент карточки поверх */
.card-featured > * { position: relative; z-index: 3; }
```

---

### 14.5 Hero-тег пилюля (каскад на тёмном фоне)

```css
.hero-tag {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 9px 18px;
  border-radius: 999px;

  /* Стекло на тёмном фоне — инвертированная версия */
  background: rgba(255, 255, 255, .12);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);

  /* Многослойная рамка */
  border: 1px solid rgba(255, 255, 255, .25);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, .3),   /* верхний блик */
    inset 0 -1px 0 rgba(255, 255, 255, .08),  /* нижний блик */
    0 4px 16px rgba(0, 0, 0, .2);             /* тень */

  font: 500 13px 'HelveticaNeueCyr', sans-serif;
  color: rgba(255, 255, 255, .95);
  letter-spacing: .02em;

  transition: background .25s, transform .25s, box-shadow .25s;
}

.hero-tag:hover {
  background: rgba(255, 255, 255, .2);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, .4),
    inset 0 -1px 0 rgba(255, 255, 255, .1),
    0 4px 20px rgba(0, 0, 0, .25);
}
```

---

### 14.6 Таймер обратного отсчёта — блок с числами

```css
.countdown-block {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

/* Фон под цифрой — стеклянная плашка */
.countdown-number-wrap {
  position: relative;
  padding: 16px 24px;
  border-radius: var(--radius-md);
  background: rgba(26, 26, 26, .4);
  border: 1px solid rgba(255, 255, 255, .08);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, .05),
    0 8px 24px rgba(0, 0, 0, .3);
  min-width: 88px;
  text-align: center;
}

/* Разделительная линия посередине — эффект split-flap */
.countdown-number-wrap::before {
  content: '';
  position: absolute;
  left: 8px; right: 8px;
  top: 50%;
  height: 1px;
  background: rgba(255, 255, 255, .06);
}

.countdown-number {
  font: 700 64px/1 'Playfair Display', serif;
  color: var(--orange-600);
  /* Свечение цифры */
  text-shadow:
    0 0 20px rgba(255, 107, 44, .4),
    0 0 60px rgba(255, 107, 44, .15);
  display: block;
}

.countdown-label {
  font: 600 11px/1 'HelveticaNeueCyr', sans-serif;
  color: rgba(255, 255, 255, .4);
  text-transform: uppercase;
  letter-spacing: .1em;
  margin-top: 4px;
}
```

```tsx
// Flip-анимация смены цифр через Framer Motion
// components/Countdown.tsx
'use client'
import { motion, AnimatePresence } from 'framer-motion'

function FlipNumber({ value }: { value: string }) {
  return (
    <div style={{ position: 'relative', overflow: 'hidden', height: '1em' }}>
      <AnimatePresence mode="popLayout">
        <motion.span
          key={value}
          className="countdown-number"
          initial={{ y: '-100%', opacity: 0 }}
          animate={{ y: '0%',    opacity: 1 }}
          exit={{    y: '100%',  opacity: 0 }}
          transition={{ duration: .25, ease: [0.16, 1, 0.3, 1] }}
        >
          {value}
        </motion.span>
      </AnimatePresence>
    </div>
  )
}
```

---

### 14.7 Pulse-анимация активной точки на карте

```css
/* Точка на карте континента */
.map-point-active {
  position: relative;
  width: 12px;
  height: 12px;
}

/* Залитый центр */
.map-point-dot {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background: var(--orange-600);
  box-shadow: 0 0 8px rgba(255, 107, 44, .5);
  z-index: 1;
}

/* Пульсирующее кольцо */
.map-point-pulse {
  position: absolute;
  inset: -4px;
  border-radius: 50%;
  background: rgba(255, 107, 44, .3);
  animation: pulse-ring 2s cubic-bezier(.4, 0, .6, 1) infinite;
}

/* Второе кольцо с задержкой — двойной pulse */
.map-point-pulse-2 {
  position: absolute;
  inset: -8px;
  border-radius: 50%;
  background: rgba(255, 107, 44, .15);
  animation: pulse-ring 2s cubic-bezier(.4, 0, .6, 1) .6s infinite;
}

@keyframes pulse-ring {
  0%   { transform: scale(.8); opacity: .8; }
  70%  { transform: scale(2);  opacity: 0;  }
  100% { transform: scale(2);  opacity: 0;  }
}
```

---

### 14.8 Progress Bar скролла (детальная страница экспедиции)

```css
.scroll-progress {
  position: fixed;
  top: 80px; /* высота хедера */
  left: 0;
  height: 2px;
  background: var(--gradient-signature);
  z-index: 49;
  transform-origin: left;

  /* Свечение линии */
  box-shadow:
    0 0 6px rgba(255, 107, 44, .5),
    0 0 12px rgba(255, 107, 44, .2);

  /* Плавное обновление */
  transition: width 100ms linear, opacity 200ms;
}

/* Скруглённый правый конец */
.scroll-progress::after {
  content: '';
  position: absolute;
  right: -3px;
  top: 50%;
  transform: translateY(-50%);
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #FF8A54;
  box-shadow: 0 0 8px rgba(255, 107, 44, .8);
}
```

---

### 14.9 Testimonial stage — одна Apple-like glass-поверхность

Не использовать `.testimonial-card` как повторяемую сетку. Компонент должен рендерить один главный отзыв в viewport и переключать остальные через Embla.

```css
.testimonial-stage {
  position: relative;
  min-height: 460px;
  overflow: hidden;
  border-radius: var(--radius-lg);
}
.testimonial-stage-media {
  position: absolute; inset: 0;
  object-fit: cover;
}
.testimonial-card {
  position: absolute;
  left: clamp(20px, 5vw, 72px);
  bottom: clamp(20px, 5vw, 72px);
  width: min(620px, calc(100% - 40px));
  padding: 36px 40px 32px;
  background: rgba(255,255,255,.50);
  backdrop-filter: blur(24px) saturate(125%);
  -webkit-backdrop-filter: blur(24px) saturate(125%);
  border: 1px solid rgba(255,255,255,.76);
  border-radius: 22px;
  box-shadow:
    inset 0 1px 0 rgba(255,255,255,.92),
    0 20px 70px rgba(50,30,20,.12);
}
.testimonial-card:hover {
  /* Никакого translateY: glass только слегка меняет прозрачность/свет. */
  background: rgba(255,255,255,.56);
}
.testimonial-quote-mark {
  position: absolute;
  top: 10px; left: 24px;
  font: 700 96px/.8 'Playfair Display', serif;
  color: rgba(255,119,34,.16);
  pointer-events: none;
}
.testimonial-tag {
  display: inline-block;
  margin-bottom: 18px;
  font: 600 11px/1 'HelveticaNeueCyr', sans-serif;
  color: var(--orange-700);
  text-transform: uppercase;
  letter-spacing: .06em;
}
.testimonial-photo {
  width: 56px; height: 56px;
  border-radius: 50%;
  border: 2px solid rgba(255,255,255,.85);
  box-shadow: 0 4px 18px rgba(0,0,0,.12);
  overflow: hidden;
}
```

**Навигация:** `01 / 06` + тонкая progress-line. Не использовать ряд из шести dots как главный визуальный элемент.

### 14.10 Why-блок — final CSS для image/glass composition

**Важно:** этот раздел заменяет старую реализацию `6 одинаковых glass cards`. Использовать структуру из 2.6: разные визуальные веса, изображения и отдельные glass overlays.

```css
.why-grid {
  display: grid;
  grid-template-columns: 1.25fr .75fr;
  gap: 0;
}
.why-card {
  position: relative;
  min-height: 280px;
  overflow: visible;
  border-top: 1px solid var(--border-hairline);
}
.why-card-bg-image {
  position: absolute; inset: 0;
  width: 100%; height: 100%;
  object-fit: cover;
  border-radius: var(--radius-lg);
}
.why-card-content {
  position: relative;
  z-index: 2;
}
.why-card-featured {
  min-height: 520px;
}
.why-glass-panel {
  position: absolute;
  left: 28px; bottom: 28px;
  max-width: min(78%, 520px);
  padding: 28px 32px;
  background: rgba(255,255,255,.48);
  backdrop-filter: blur(22px) saturate(125%);
  -webkit-backdrop-filter: blur(22px) saturate(125%);
  border: 1px solid rgba(255,255,255,.74);
  border-radius: 22px;
  box-shadow:
    inset 0 1px 0 rgba(255,255,255,.92),
    0 18px 60px rgba(50,30,20,.10);
}
.why-card:not(.why-card-featured) {
  padding: 28px 0;
  background: transparent;
}
.why-card:not(.why-card-featured) .why-card-content {
  padding: 24px 28px;
  border-bottom: 1px solid var(--border-hairline);
}
.why-card-number {
  font: 700 42px/1 'Playfair Display', serif;
  color: var(--orange-300);
}
.why-card-title {
  font: 600 24px/1.25 'Playfair Display', serif;
  color: var(--text-primary);
  margin: 10px 0;
}
.why-card-text {
  font: 400 15px/1.65 'HelveticaNeueCyr', sans-serif;
  color: var(--text-secondary);
}
.why-card-pill {
  display: inline-flex;
  margin-top: 18px;
  padding: 8px 0;
  background: transparent;
  border: 0;
  border-bottom: 1px solid var(--orange-200);
  border-radius: 0;
  font: 600 11px/1 'HelveticaNeueCyr', sans-serif;
  text-transform: uppercase;
  letter-spacing: .05em;
  color: var(--orange-700);
}
```

**Не добавлять:** общий shadow, общий hover-lift, шесть glow-эффектов, шесть rounded glass containers.

### 14.11 Форма заявки — стекло на тёмном фото-фоне

```css
.form-panel {
  position: relative;
  max-width: 560px;
  margin: 0 auto;
  padding: 48px;

  /* Сильное стекло — фото-фон тёмный, нужен контраст */
  background: rgba(255, 255, 255, .72);
  backdrop-filter: blur(40px);
  -webkit-backdrop-filter: blur(40px);
  border-radius: var(--radius-lg);

  border: 1px solid rgba(255, 255, 255, .95);
  box-shadow:
    0 0 0 1px rgba(255, 255, 255, .3),
    0 32px 80px rgba(0, 0, 0, .3),
    inset 0 1px 0 rgba(255, 255, 255, 1);
}

/* Верхний тонкий блик — стекло поймало свет */
.form-panel::before {
  content: '';
  position: absolute;
  top: 0; left: 10%; right: 10%;
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, .9) 40%,
    white 50%,
    rgba(255, 255, 255, .9) 60%,
    transparent
  );
  border-radius: 1px;
}
```

---

### 14.13 SVG-карта континента со стеклянным контуром — полная реализация

**Почему SVG, не PNG:** точное позиционирование точки локации по координатам, анимация маршрутной линии, адаптивность под любой размер экрана, стеклянный эффект через SVG-фильтры без потери резкости.

**Источник SVG-контуров:** Natural Earth Data (naturalearthdata.com) — бесплатные векторные контуры континентов. Скачать: `ne_110m_admin_0_countries.shp`, конвертировать в SVG через mapshaper.org. Упростить до 110m resolution (достаточно для декоративного использования).

**Файлы:** `public/maps/africa.svg`, `asia.svg`, `latam.svg`, `russia-fe.svg`

---

**Полная React-реализация компонента:**

```tsx
// components/MapContinent.tsx
'use client'
import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

interface MapContinentProps {
  continent: 'africa' | 'asia' | 'latam' | 'russia'
  activePoint: { x: number; y: number; label: string }
  neighborPoints?: Array<{ x: number; y: number }>
  // moscowEntry: точка входа линии перелёта из Москвы
  // на краю SVG viewBox (за пределами континента)
  moscowEntry: { x: number; y: number }
  // Кривая Безье для линии перелёта: контрольная точка
  // определяет изгиб дуги (как авиамаршрут на глобусе)
  flightControlPoint: { x: number; y: number }
  // Города внутри программы (только шаблон "Активна")
  programCities?: Array<{ x: number; y: number; name: string }>
  status: 'активна' | 'скоро' | 'завершена'
}

export function MapContinent({
  continent, activePoint, neighborPoints = [],
  moscowEntry, flightControlPoint,
  programCities = [], status
}: MapContinentProps) {

  // Два отдельных ref для двух анимаций
  const flightRef  = useRef<SVGPathElement>(null)  // перелёт из Москвы
  const programRef = useRef<SVGPathElement>(null)  // маршрут по городам

  // Утилита: запускает strokeDashoffset анимацию при попадании в viewport
  function animatePath(ref: React.RefObject<SVGPathElement>, delay = '0s', duration = '1.8s') {
    if (!ref.current) return
    const path = ref.current
    const length = path.getTotalLength()
    path.style.strokeDasharray  = `${length}`
    path.style.strokeDashoffset = `${length}`

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        path.style.transition = `stroke-dashoffset ${duration} cubic-bezier(0.16,1,0.3,1) ${delay}`
        path.style.strokeDashoffset = '0'
        observer.disconnect()
      }
    }, { threshold: 0.2 })

    observer.observe(path)
    return () => observer.disconnect()
  }

  useEffect(() => {
    const c1 = animatePath(flightRef,  '0.2s', '2s')    // перелёт — первым
    const c2 = animatePath(programRef, '2.2s', '1.4s')  // маршрут — после
    return () => { c1?.(); c2?.() }
  }, [])

  // Дуга перелёта: квадратичная кривая Безье
  // M = точка входа с края SVG (сверху/сбоку — "из Москвы")
  // Q = контрольная точка изгиба
  // T = activePoint (место назначения)
  const flightPath = `M ${moscowEntry.x},${moscowEntry.y}
    Q ${flightControlPoint.x},${flightControlPoint.y}
    ${activePoint.x},${activePoint.y}`

  // Прямые линии между городами программы
  const programPath = programCities.length >= 2
    ? `M ${programCities.map(c => `${c.x},${c.y}`).join(' L ')}`
    : ''

  return (
    <div style={{ position: 'relative', maxWidth: 800, margin: '0 auto' }}>

      {/* Плашка-подпись — стекло поверх карты */}
      <div className="glass-01" style={{
        position: 'absolute', top: 24, left: 24, zIndex: 2,
        padding: '12px 20px', borderRadius: 'var(--radius-md)',
        display: 'flex', flexDirection: 'column', gap: 4,
      }}>
        <span style={{ font: '600 18px Playfair Display', color: 'var(--text-primary)' }}>
          {activePoint.label}
        </span>
        <span style={{ font: '400 12px HelveticaNeueCyr', color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '.06em' }}>
          {continent.toUpperCase()}
        </span>
      </div>

      <svg
        viewBox="0 0 800 600"
        style={{ width: '100%', height: 'auto' }}
        aria-hidden="true"
      >
        <defs>
          {/* Фильтр стеклянного свечения для контура */}
          <filter id="glass-contour-glow" x="-20%" y="-20%" width="140%" height="140%">
            {/* Слой 1: размытое свечение */}
            <feGaussianBlur in="SourceGraphic" stdDeviation="2.5" result="blur1"/>
            <feColorMatrix in="blur1" type="matrix"
              values="1.2 0.5 0.2 0 0
                      0.4 0.2 0.1 0 0
                      0.1 0.05 0 0 0
                      0   0   0  0.5 0"
              result="orange-glow"/>
            {/* Слой 2: чёткая линия поверх */}
            <feMerge>
              <feMergeNode in="orange-glow"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>

          {/* Градиент для основной линии — имитация стекла */}
          <linearGradient id="glass-line-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%"   stopColor="#FFE8D6" stopOpacity="0.5"/>
            <stop offset="25%"  stopColor="#FF8A54" stopOpacity="1"/>
            <stop offset="50%"  stopColor="#FFE8D6" stopOpacity="0.7"/>
            <stop offset="75%"  stopColor="#FF7722" stopOpacity="1"/>
            <stop offset="100%" stopColor="#FFE8D6" stopOpacity="0.5"/>
          </linearGradient>

          {/* Фильтр мягкого свечения для активной точки */}
          <filter id="point-glow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur"/>
            <feMerge>
              <feMergeNode in="blur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/*
          Контур континента — два слоя:
          Слой 1: толстая размытая линия = свечение (имитация amber glow)
          Слой 2: тонкая линия с градиентом = "стеклянный" контур

          PATH DATA: заменить на реальный path из Natural Earth SVG.
          Пример для Африки — схематичный, заменить на точный:
        */}

        {/* Слой свечения */}
        <path
          d="M 320,80 C 380,60 420,70 440,100 L 460,180 C 480,220 490,260 480,300
             C 470,340 450,370 430,400 C 410,430 390,450 370,460
             C 340,475 310,465 290,450 C 260,430 240,400 230,370
             C 215,330 210,290 215,250 C 220,210 230,170 250,140
             C 270,110 290,90 320,80 Z"
          stroke="rgba(255,119,34,0.3)"
          strokeWidth="8"
          fill="none"
          filter="url(#glass-contour-glow)"
        />

        {/* Слой стеклянного контура */}
        <path
          d="M 320,80 C 380,60 420,70 440,100 L 460,180 C 480,220 490,260 480,300
             C 470,340 450,370 430,400 C 410,430 390,450 370,460
             C 340,475 310,465 290,450 C 260,430 240,400 230,370
             C 215,330 210,290 215,250 C 220,210 230,170 250,140
             C 270,110 290,90 320,80 Z"
          stroke="url(#glass-line-grad)"
          strokeWidth="1.5"
          fill="none"
        />

        {/*
          ЛИНИЯ ПЕРЕЛЁТА ИЗ МОСКВЫ → activePoint
          Дуга входит с края SVG viewBox (за пределами континента),
          изгибается по контрольной точке и заканчивается в activePoint.
          Анимируется первой — создаёт ощущение "самолёт летит к точке".
        */}
        <path
          ref={flightRef}
          d={flightPath}
          stroke="var(--orange-600)"
          strokeWidth="1"
          strokeDasharray="6 5"     /* пунктир — авиатрек */
          fill="none"
          opacity="0.6"
        />

        {/* Иконка самолёта в начале линии (точка входа) */}
        <text
          x={moscowEntry.x}
          y={moscowEntry.y - 8}
          textAnchor="middle"
          fontSize="12"
          opacity="0.5"
          style={{ userSelect: 'none' }}
        >
          ✈
        </text>

        {/* Подпись "Москва" у точки входа */}
        <text
          x={moscowEntry.x}
          y={moscowEntry.y - 20}
          textAnchor="middle"
          fontSize="9"
          fill="var(--text-tertiary)"
          fontFamily="HelveticaNeueCyr, sans-serif"
          letterSpacing="0.06em"
          opacity="0.6"
        >
          МОСКВА
        </text>

        {/*
          МАРШРУТ ПО ГОРОДАМ ПРОГРАММЫ (только шаблон "Активна")
          Прямые линии между городами внутри страны назначения.
          Анимируется второй — после того как линия перелёта дошла.
          Другой стиль: тоньше, другой dasharray — визуально отличается.
        */}
        {programCities.length >= 2 && (
          <path
            ref={programRef}
            d={programPath}
            stroke="var(--orange-400)"
            strokeWidth="0.8"
            strokeDasharray="3 6"   /* более редкий пунктир */
            fill="none"
            opacity="0.5"
          />
        )}

        {/* Точки городов программы с подписями */}
        {programCities.map((city, i) => (
          <g key={i} transform={`translate(${city.x}, ${city.y})`}>
            <circle r="3" fill="var(--orange-300)" stroke="white" strokeWidth="1"/>
            <text
              x="8" y="4"
              fontSize="8"
              fill="var(--text-secondary)"
              fontFamily="HelveticaNeueCyr, sans-serif"
              opacity="0.7"
            >
              {city.name}
            </text>
          </g>
        ))}

        {/* Соседние точки — контекст масштаба */}
        {neighborPoints.map((p, i) => (
          <circle
            key={i}
            cx={p.x} cy={p.y} r="3.5"
            fill="none"
            stroke="rgba(160,160,160,0.35)"
            strokeWidth="1"
          />
        ))}

        {/* Активная точка — три концентрических слоя */}
        <g transform={`translate(${activePoint.x}, ${activePoint.y})`}>

          {/* Pulse кольца — CSS анимация, Framer Motion не нужен */}
          {status !== 'завершена' && (
            <>
              <circle r="18" fill="rgba(255,107,44,0.08)" className="map-pulse-outer"/>
              <circle r="12" fill="rgba(255,107,44,0.15)" className="map-pulse-inner"/>
            </>
          )}
          {/* CSS в globals.css:
          .map-pulse-outer { animation: pulse-ring 2s ease-out infinite; }
          .map-pulse-inner { animation: pulse-ring 2s ease-out .5s infinite; }
          @keyframes pulse-ring {
            0%   { transform: scale(.8); opacity: .8; }
            70%  { transform: scale(2.2); opacity: 0; }
            100% { transform: scale(2.2); opacity: 0; }
          } */

          {/* Центральная точка */}
          <circle
            r="5.5"
            fill="var(--orange-600)"
            filter="url(#point-glow)"
          />
          {/* Белое кольцо вокруг центра */}
          <circle
            r="5.5"
            fill="none"
            stroke="white"
            strokeWidth="1.5"
          />
          {/* Для "завершена" — точка приглушена */}
          {status === 'завершена' && (
            <circle r="8" fill="rgba(255,107,44,0.1)" stroke="rgba(255,107,44,0.3)" strokeWidth="1"/>
          )}
        </g>
      </svg>
    </div>
  )
}
```

---

**Координаты точек для каждой экспедиции** (в пространстве SVG viewBox 0 0 800 600):

```typescript
// config/mapPoints.ts
//
// moscowEntry: точка входа линии перелёта на краю SVG viewBox.
//   Находится ЗА пределами континента — обычно сверху или сбоку.
//   Подбирается под каждый continent SVG индивидуально.
//
// flightControlPoint: контрольная точка кривой Безье.
//   Определяет изгиб дуги перелёта. Располагается "над" маршрутом —
//   чем дальше от прямой M→T, тем сильнее изгиб (как реальный авиатрек).
//
// programCities: города из программы экспедиции (только "Активна").
//   Соединяются прямыми линиями внутри контура континента.
//   Отдельный визуальный слой от linii perelta.

export const expeditionMapPoints = {

  'south-africa': {
    continent: 'africa' as const,
    activePoint: { x: 330, y: 430, label: 'ЮАР · Кейптаун' },
    // Москва входит сверху-слева, за пределами Африки
    moscowEntry: { x: 80, y: -30 },
    // Контрольная точка: дуга огибает Средиземноморье, заходит с запада
    flightControlPoint: { x: 200, y: 180 },
    neighborPoints: [
      { x: 310, y: 200 }, // Марокко
      { x: 380, y: 300 }, // Кения
      { x: 290, y: 340 }, // ДРК
    ],
    programCities: [
      { x: 310, y: 422, name: 'Кейптаун' },
      { x: 325, y: 408, name: 'Стелленбос' },
      { x: 305, y: 438, name: 'Мыс Доброй Надежды' },
    ],
  },

  'vietnam': {
    continent: 'asia' as const,
    activePoint: { x: 620, y: 265, label: 'Вьетнам · Хошимин' },
    // Москва входит сверху-слева за пределами Азии
    moscowEntry: { x: 200, y: -30 },
    // Дуга идёт через Центральную Азию, изгибается над Китаем
    flightControlPoint: { x: 450, y: 80 },
    neighborPoints: [
      { x: 570, y: 200 }, // Китай
      { x: 590, y: 300 }, // Таиланд
      { x: 640, y: 310 }, // Индонезия
    ],
    programCities: [
      { x: 618, y: 288, name: 'Хошимин' },
      { x: 612, y: 228, name: 'Ханой' },
    ],
  },

  'india': {
    continent: 'asia' as const,
    activePoint: { x: 490, y: 225, label: 'Индия · Нью-Дели' },
    // Москва входит сверху, примерно по меридиану Дели
    moscowEntry: { x: 420, y: -30 },
    // Почти вертикальная линия — небольшой изгиб на запад
    flightControlPoint: { x: 380, y: 80 },
    neighborPoints: [
      { x: 520, y: 170 }, // Китай
      { x: 460, y: 180 }, // Пакистан
      { x: 510, y: 260 }, // Шри-Ланка
    ],
    programCities: [
      { x: 488, y: 218, name: 'Нью-Дели' },
    ],
  },

  'brazil': {
    continent: 'latam' as const,
    activePoint: { x: 280, y: 320, label: 'Бразилия · Сан-Паулу' },
    // Москва входит справа сверху (Атлантика) — реальный маршрут
    moscowEntry: { x: 830, y: 80 },
    // Дуга через Атлантику, огибает по большой дуге
    flightControlPoint: { x: 580, y: 120 },
    neighborPoints: [
      { x: 220, y: 280 }, // Колумбия
      { x: 240, y: 360 }, // Аргентина
      { x: 200, y: 310 }, // Перу
    ],
    programCities: [
      { x: 288, y: 314, name: 'Сан-Паулу' },
    ],
  },

  'kenya': {
    continent: 'africa' as const,
    activePoint: { x: 390, y: 295, label: 'Кения · Найроби' },
    // Москва входит сверху, чуть правее центра Африки
    moscowEntry: { x: 380, y: -30 },
    // Почти вертикально — небольшой изгиб
    flightControlPoint: { x: 440, y: 80 },
    neighborPoints: [
      { x: 310, y: 200 }, // Марокко
      { x: 330, y: 430 }, // ЮАР
      { x: 350, y: 255 }, // Эфиопия
    ],
    programCities: [
      { x: 388, y: 288, name: 'Найроби' },
    ],
  },

  'morocco': {
    continent: 'africa' as const,
    activePoint: { x: 310, y: 200, label: 'Марокко · Касабланка' },
    // Марокко близко к Европе — линия короткая, входит сверху-слева
    moscowEntry: { x: 220, y: -30 },
    flightControlPoint: { x: 240, y: 60 },
    neighborPoints: [
      { x: 330, y: 430 }, // ЮАР
      { x: 380, y: 300 }, // Кения
      { x: 345, y: 218 }, // Алжир
    ],
    // Завершена — programCities пусто, маршрут не анимируется
    programCities: [],
  },

  'sakhalin': {
    continent: 'russia' as const,
    activePoint: { x: 680, y: 185, label: 'Сахалин · Южно-Сахалинск' },
    // Сахалин — внутри России, Москва на том же континенте
    // Линия входит слева, длинная горизонтальная дуга
    moscowEntry: { x: -30, y: 140 },
    flightControlPoint: { x: 320, y: 60 },
    neighborPoints: [
      { x: 648, y: 202 }, // Хабаровск
      { x: 618, y: 222 }, // Владивосток
    ],
    programCities: [],
  },

  'thailand': {
    continent: 'asia' as const,
    activePoint: { x: 590, y: 288, label: 'Таиланд · Бангкок' },
    moscowEntry: { x: 200, y: -30 },
    flightControlPoint: { x: 420, y: 60 },
    neighborPoints: [
      { x: 620, y: 262 }, // Вьетнам
      { x: 558, y: 262 }, // Мьянма
      { x: 608, y: 312 }, // Малайзия
    ],
    programCities: [],
  },

  'indonesia': {
    continent: 'asia' as const,
    activePoint: { x: 650, y: 342, label: 'Индонезия · Джакарта' },
    moscowEntry: { x: 200, y: -30 },
    // Дуга идёт дальше Вьетнама — более крутой изгиб
    flightControlPoint: { x: 480, y: 40 },
    neighborPoints: [
      { x: 620, y: 262 }, // Вьетнам
      { x: 590, y: 288 }, // Таиланд
      { x: 682, y: 322 }, // Папуа
    ],
    programCities: [],
  },

} as const

// TypeScript тип для использования в компоненте
export type ExpeditionSlug = keyof typeof expeditionMapPoints
```

---

**Использование компонента на странице:**

```tsx
// app/expeditions/[slug]/page.tsx
import { MapContinent } from '@/components/MapContinent'
import { expeditionMapPoints } from '@/config/mapPoints'

export default function ExpeditionPage({ params }: { params: { slug: string }}) {
  const mapData = expeditionMapPoints[params.slug as keyof typeof expeditionMapPoints]

  return (
    <>
      {/* Hero ... */}

      {/* Карта — сразу под hero */}
      {mapData && (
        <section style={{ padding: 'var(--space-9) 0', background: 'var(--bg-canvas)' }}>
          <MapContinent
            continent={mapData.continent}
            activePoint={mapData.activePoint}
            neighborPoints={mapData.neighborPoints}
            moscowEntry={mapData.moscowEntry}
            flightControlPoint={mapData.flightControlPoint}
            programCities={mapData.programCities}
            status={expedition.status}
          />
        </section>
      )}

      {/* Остальной контент ... */}
    </>
  )
}
```

---

**Важное замечание про SVG viewBox и обрезку:**

Москва (`moscowEntry`) намеренно находится за пределами viewBox (отрицательный y или x > 800). Это создаёт эффект "линия приходит из-за края экрана". SVG по умолчанию не обрезает содержимое за пределами viewBox — нужно явно добавить `overflow: hidden` на контейнер:

```tsx
<svg
  viewBox="0 0 800 600"
  style={{
    width: '100%',
    height: 'auto',
    overflow: 'hidden',  // ← обязательно: обрезает хвост линии за краем
  }}
  aria-hidden="true"
>
```

Иконка ✈ и подпись "МОСКВА" у `moscowEntry` тоже окажутся за краем — это правильно, они не видны. Видна только линия, входящая с края SVG, что создаёт ощущение что маршрут идёт "откуда-то издалека" — именно тот эффект который нужен.

---

### 14.14 Правило применения — сводная таблица

| Элемент | Реализация | Где |
|---|---|---|
| Кнопка Liquid Glass | ✅ CSS + Framer Motion | раздел 14.1 |
| Glass Level 01/02 | ✅ CSS | раздел 14.2 |
| Glass Signature карточка | ✅ CSS + SVG угловые дуги | раздел 14.3 |
| Featured градиент карточка | ✅ CSS | раздел 14.4 |
| Hero теги-пилюли (каскад) | ✅ CSS | раздел 14.5 |
| Таймер блоки | ✅ CSS + Framer Motion | раздел 14.6 |
| Карта континента со стеклом | ✅ inline SVG + CSS-фильтры | раздел 14.13 |
| Pulse-точка на карте | ✅ SVG + Framer Motion | раздел 14.13 |
| Маршрутная линия (анимация) | ✅ SVG strokeDashoffset | раздел 14.13 |
| Progress Bar скролла | ✅ CSS | раздел 14.8 |
| Testimonial stage | ✅ CSS | раздел 14.9 |
| Why image/glass compositions | ✅ CSS | раздел 14.10 |
| Форма заявки на фото | ✅ CSS (усиленный blur) | раздел 14.11 |
| Hero-изображения (9 направлений) | 🖼 .webp генерация | промпты 13.2 |
| Программа по дням (6 фото) | 🖼 .webp генерация | промпты 13.3 |
| Что включено (6 карточек) | 🖼 .webp генерация | промпты 13.4 |
| About — деловые фото (4 шт) | 🖼 .webp генерация | промпты 13.5 |
| Фон формы заявки | 🖼 .jpg генерация | промпты 13.11 |
| Фото экспертов (9 человек) | 🖼 .webp генерация | промпты 13.9 |
| Фото команды Forbes (3 чел) | 🖼 .webp генерация | промпты 13.9 |
| Фото авторов отзывов (6 чел) | 🖼 .webp генерация | промпты 13.10 |
| Иконки Due Diligence (9 шт) | 🖼 .png прозр. фон | промпты 13.8/6.1 |
| Текстура дымки (fog-texture.png) | 🖼 .png прозр. фон | промпты 1.2.5 |
| SVG контуры континентов | 🗺 Natural Earth Data | mapshaper.org |
| OG-изображения (все страницы) | 🖼 .jpg генерация | промпты 13.7 |

---

## Финальная схема шрифтов — source of truth

- **Body / основной текст:** `HelveticaNeueCyr`
- **Заголовки / display:** `Playfair Display`
- **Подключение:** оба шрифта локально через `next/font/local` (`localFont`)
- **HelveticaNeueCyr:** используется для body / sans текста
- Файлы шрифтов размещаются в `/public/fonts/`

---

## 15. Продакшн-уточнения и финальная конфигурация

> **Правило приоритета:** этот раздел объединяет все production-уточнения. Если более ранние разделы документа содержат другую реализацию, использовать финальную реализацию из раздела 15 и раздела 16. Старые варианты не являются дополнительными инструкциями.

### 15.1 Структура папок — src/

`tsconfig.json` содержит `"paths": { "@/*": ["./src/*"] }` — весь код лежит в `src/`.
Все пути в этом документе читать с префиксом `src/`:

```
app/layout.tsx          → src/app/layout.tsx
app/page.tsx            → src/app/page.tsx
components/             → src/components/
hooks/                  → src/hooks/
lib/                    → src/lib/
config/                 → src/config/
types/index.ts          → src/types/index.ts
```

Импорты через алиас `@/`:
```tsx
import { ButtonLiquid } from '@/components/ui/ButtonLiquid'
import { getExpeditions } from '@/lib/getExpeditions'
import type { Expedition } from '@/types'
```

---

### 15.2 Tailwind v4 — конфигурация через CSS, не JS

Проект использует **Tailwind CSS v4** (`"tailwindcss": "^4"`).
В v4 **нет `tailwind.config.ts`** — всё настраивается через CSS директиву `@theme`.
Раздел 12.2 (регистрация переменных через tailwind.config.ts) **не применяется**.

Вместо этого добавить в `src/app/globals.css`:

```css
@import "tailwindcss";

@theme {
  /* Цвета */
  --color-canvas:   #FAFAF8;
  --color-surface:  #F5F2EC;
  --color-elevated: #FFFFFF;

  --color-text-primary:   #1A1A1A;
  --color-text-secondary: #6D6D6D;
  --color-text-tertiary:  #A0A0A0;

  --color-brand-100: #FFF0E8;
  --color-brand-200: #FFE8D6;
  --color-brand-300: #FFB089;
  --color-brand-400: #FF8A54;
  --color-brand-500: #FF7722;
  --color-brand-600: #FF6B2C;
  --color-brand-700: #B7410E;

  /* Шрифты — подключаются через next/font variables в layout.tsx */
  --font-display: var(--font-playfair);
  --font-serif:   var(--font-helvetica-serif);
  --font-sans:    var(--font-helvetica-sans);

  /* Радиусы */
  --radius-sm:   8px;
  --radius-md:   16px;
  --radius-lg:   24px;
  --radius-pill: 9999px;

  /* Тени — через стандартные CSS переменные, не Tailwind-токены */
}
```

После этого в JSX доступны классы вида `bg-canvas`, `text-brand-600`,
`font-serif`, `rounded-lg` и т.д. — Tailwind v4 генерирует их из `@theme`.

**`@tailwindcss/typography`** уже установлен — класс `prose` работает для MDX-контента статей.
Использовать на странице статьи: `<div className="prose prose-neutral max-w-none">`.

---

### 15.3 Embla Carousel — HeroSlider и Testimonials

`embla-carousel-react` **уже установлен** — использовать его для слайдеров.
Не писать кастомный свайп вручную (раздел 10.2 устарел в части реализации свайпа).

```tsx
// src/components/HeroSlider.tsx
'use client'
import useEmblaCarousel from 'embla-carousel-react'
import { useCallback } from 'react'

export function HeroSlider({ slides }: { slides: Expedition[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,      // не зацикливать — 2 слайда, пользователь видит оба
    dragFree: false,  // чёткий snap между слайдами
  })

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])

  return (
    <div className="hero-slider" ref={emblaRef}>
      <div className="hero-slider__container">
        {slides.map(slide => (
          <div key={slide.slug} className="hero-slider__slide">
            <HeroSlide expedition={slide} />
          </div>
        ))}
      </div>
      <SliderControls onPrev={scrollPrev} onNext={scrollNext} />
      <SliderDots api={emblaApi} count={slides.length} />
    </div>
  )
}
```

```tsx
// src/components/TestimonialsCarousel.tsx — та же механика
const [emblaRef] = useEmblaCarousel({
  loop: true,
  align: 'start',
  containScroll: 'trimSnaps',
})
```

```css
/* globals.css */
.hero-slider          { overflow: hidden; }
.hero-slider__container { display: flex; }
.hero-slider__slide   { flex: 0 0 100%; min-width: 0; }
```

Embla даёт touch-свайп на мобильном бесплатно — `draggable: true` по умолчанию.
Раздел 10.2 про кастомные `touchstart`/`touchend` — **не применять**, Embla это делает сам.

---

### 15.4 react-hook-form + zod — форма заявки

`react-hook-form` и `zod` **уже установлены** — форма заявки использует их.
Не писать `useState` для полей вручную.

```tsx
// src/components/ApplicationForm.tsx
'use client'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const schema = z.object({
  expedition: z.string().min(1, 'Выберите экспедицию'),
  name:       z.string().min(2, 'Введите имя'),
  phone:      z.string().min(10, 'Введите телефон'),
  email:      z.email('Введите корректный email'),
  consent:    z.boolean().refine(v => v, 'Необходимо согласие'),
})

type FormData = z.infer<typeof schema>

export function ApplicationForm({ expeditions }: { expeditions: Expedition[] }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<FormData>({ resolver: zodResolver(schema) })

  const onSubmit = async (data: FormData) => {
    await fetch('/api/apply', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  if (isSubmitSuccessful) return <FormSuccess />

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      {/* поля... */}
      <button type="submit" className="btn-liquid" disabled={isSubmitting}>
        <span className="btn-liquid-text">
          {isSubmitting ? 'Отправляем...' : 'Стать участником'}
        </span>
      </button>
    </form>
  )
}
```

```tsx
// src/app/api/apply/route.ts — nodemailer уже установлен
import nodemailer from 'nodemailer'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const data = await req.json()
  // отправить письмо через nodemailer
  // конфиг транспорта — из .env (SMTP_HOST, SMTP_USER, SMTP_PASS)
  return NextResponse.json({ ok: true })
}
```

Добавить в `.env.example`:
```bash
SMTP_HOST=
SMTP_PORT=465
SMTP_USER=
SMTP_PASS=
SMTP_TO=FExperience@forbes.ru
```

---

### 15.5 countup.js — счётчики статистики

`countup.js` **уже установлен** — использовать его вместо кастомного `useCountUp` хука
(раздел 14.6 в части счётчика — заменить):

```tsx
// src/components/StatCounter.tsx
'use client'
import { useEffect, useRef } from 'react'
import { CountUp } from 'countup.js'

export function StatCounter({ end, suffix = '' }: { end: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (!ref.current) return
    const cu = new CountUp(ref.current, end, {
      duration: 1.8,
      suffix,
      useEasing: true,
      easingFn: (t, b, c, d) => {   // ease-out cubic
        return c * ((t = t / d - 1) * t * t + 1) + b
      },
      enableScrollSpy: true,         // встроенный IntersectionObserver
      scrollSpyOnce: true,           // запустить один раз
    })
    cu.start()
  }, [end, suffix])

  return <span ref={ref}>0</span>
}
```

---

### 15.6 lenis — smooth scroll

`lenis` **уже установлен** — это smooth scroll библиотека. Два важных следствия:

**Следствие 1 — `useScrollProgress`:** Lenis перехватывает нативный скролл.
`window.scrollY` может вести себя иначе. Читать позицию скролла через Lenis API:

```tsx
// src/hooks/useScrollProgress.ts
import { useLenis } from 'lenis/react'  // если используется React-обёртка

export function useScrollProgress() {
  useLenis(({ scroll, limit }) => {
    const bar = document.getElementById('scroll-progress-bar')
    if (!bar) return
    const pct = (scroll / limit) * 100
    bar.style.width = `${pct}%`
    bar.style.opacity = scroll > 80 ? '1' : '0'
  })
}
```

**Следствие 2 — Intersection Observer:** с Lenis работает корректно, дополнительных настроек не нужно.

**Инициализация Lenis** — проверить как подключена в текущем коде (скорее всего в `layout.tsx` или отдельном `LenisProvider`). Не переподключать — только убедиться что существующая инициализация сохранена при редизайне.

---

### 15.7 next-mdx-remote vs @next/mdx

Оба установлены. Определить какой реально используется в текущем коде:
- Если в `src/app/articles/[slug]/page.tsx` есть `import { MDXRemote }` → используется `next-mdx-remote`
- Если контент читается через `import content from './article.mdx'` → используется `@next/mdx`

При редизайне **не менять** механику MDX — только обновить JSX-обёртку страницы.
Если используется `next-mdx-remote`, то `@tailwindcss/typography` применяется так:

```tsx
<div className="prose prose-neutral max-w-none">
  <MDXRemote source={content} />
</div>
```

---

### 15.8 Performance budget

Целевые показатели для каждой страницы (измерять через Lighthouse и WebPageTest):

| Метрика | Цель | Критично если |
|---|---|---|
| LCP (Largest Contentful Paint) | < 2.5s | > 4s |
| FID / INP | < 100ms | > 300ms |
| CLS | < 0.1 | > 0.25 |
| Бандл JS (gzipped) | < 150KB | > 300KB |
| Вес hero-изображения | < 200KB | > 400KB |
| Вес страницы total | < 1MB | > 2MB |

**Практические правила для агента:**

```tsx
// Все изображения ниже hero — lazy loading (по умолчанию в next/image)
// Hero-изображение — priority (загружается первым)
<Image src={hero} priority quality={85} />

// Видео — poster обязателен, preload="none" на мобильном
<video preload="none" poster={poster} autoPlay muted loop playsInline />

// Динамические импорты для тяжёлых компонентов
const HeroSlider = dynamic(() => import('@/components/HeroSlider'), {
  ssr: false,
  loading: () => <div className="hero-skeleton" />,  // skeleton пока грузится
})
```

**Hero-skeleton** (пока грузится HeroSlider):
```css
.hero-skeleton {
  height: 100vh;
  background: linear-gradient(
    110deg,
    var(--bg-surface) 30%,
    var(--bg-canvas) 50%,
    var(--bg-surface) 70%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s linear infinite;
}
@keyframes shimmer {
  0%   { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
```

---

### 15.9 Error Boundary — error.tsx

Next.js App Router требует `error.tsx` рядом с каждым `page.tsx` для graceful degradation. Если MDX-файл сломан или frontmatter неполный — страница падает в error boundary, а не с 500.

```tsx
// app/expeditions/[slug]/error.tsx
'use client'  // Error boundaries должны быть Client Components

import { useEffect } from 'react'
import Link from 'next/link'

export default function ExpeditionError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Логировать ошибку (можно подключить Sentry позже)
    console.error('Expedition page error:', error)
  }, [error])

  return (
    <div style={{
      minHeight: '60vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 24,
      padding: '64px 24px',
      textAlign: 'center',
    }}>
      <h2 style={{ font: '600 28px Playfair Display', color: 'var(--text-primary)' }}>
        Не удалось загрузить страницу экспедиции
      </h2>
      <p style={{ font: '400 16px HelveticaNeueCyr', color: 'var(--text-secondary)' }}>
        Попробуйте обновить страницу или вернитесь к списку экспедиций.
      </p>
      <div style={{ display: 'flex', gap: 16 }}>
        <button className="btn-outline" onClick={reset}>
          Попробовать снова
        </button>
        <Link href="/expeditions" className="btn-liquid">
          Все экспедиции
        </Link>
      </div>
    </div>
  )
}
```

Создать `error.tsx` для каждого роута:
```
app/error.tsx                        — глобальный fallback
app/expeditions/error.tsx            — директория
app/expeditions/[slug]/error.tsx     — детальная страница
app/articles/error.tsx
app/articles/[slug]/error.tsx
```

---

### 15.10 Фильтрация статей — client-side, не router.push

Фильтры на странице `/articles` — client-side фильтрация по уже загруженному массиву. **Не использовать `router.push` с query-параметрами** — это вызывает перезагрузку страницы при каждом клике на фильтр.

```tsx
// app/articles/page.tsx
// Все статьи загружены один раз на сервере
export default async function ArticlesPage() {
  const articles = await getAllArticles() // читает все MDX из content/articles/

  return <ArticlesClient articles={articles} />
}

// components/ArticlesClient.tsx — client компонент с фильтром
'use client'
import { useState, useMemo } from 'react'

type Category = 'все' | 'марокко' | 'африка' | 'прочее'

export function ArticlesClient({ articles }: { articles: Article[] }) {
  const [active, setActive] = useState<Category>('все')

  const filtered = useMemo(() =>
    active === 'все'
      ? articles
      : articles.filter(a => a.category === active),
    [articles, active]
  )

  return (
    <>
      {/* Фильтры */}
      <div className="filter-pills">
        {(['все', 'марокко', 'африка', 'прочее'] as Category[]).map(cat => (
          <button
            key={cat}
            className={`filter-pill ${active === cat ? 'active' : ''}`}
            onClick={() => setActive(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Сетка */}
      {filtered.length === 0
        ? <ArticlesEmptyState onReset={() => setActive('все')} />
        : <ArticlesGrid articles={filtered} />
      }
    </>
  )
}
```

**URL обновлять без перезагрузки** (для шаринга ссылки с активным фильтром):
```tsx
// После setActive — обновить URL без навигации
import { useRouter, usePathname } from 'next/navigation'
const router = useRouter()
const pathname = usePathname()

const handleFilter = (cat: Category) => {
  setActive(cat)
  const url = cat === 'все' ? pathname : `${pathname}?category=${cat}`
  router.replace(url, { scroll: false })  // scroll: false — не прыгать наверх
}
```

---

### 15.11 Skeleton-состояния загрузки

Для client-side компонентов которые грузятся после гидрации — skeleton вместо пустого экрана:

```css
/* Универсальный shimmer-скелетон */
.skeleton {
  background: linear-gradient(
    110deg,
    var(--bg-surface) 30%,
    rgba(255,255,255,.7) 50%,
    var(--bg-surface) 70%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s linear infinite;
  border-radius: var(--radius-sm);
}

@keyframes shimmer {
  0%   { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

/* Размеры под конкретные элементы */
.skeleton-card   { height: 320px; border-radius: var(--radius-md); }
.skeleton-text   { height: 16px; width: 80%; }
.skeleton-text-sm { height: 12px; width: 60%; }
.skeleton-circle { width: 72px; height: 72px; border-radius: 50%; }
```

Использовать в `loading.tsx` (Next.js App Router):
```tsx
// app/expeditions/loading.tsx
export default function Loading() {
  return (
    <div className="container" style={{ paddingTop: 96 }}>
      <div className="skeleton skeleton-card" />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 24, marginTop: 24 }}>
        {[...Array(6)].map((_, i) => (
          <div key={i} className="skeleton skeleton-card" />
        ))}
      </div>
    </div>
  )
}
```

---

### 15.12 Переменные окружения — .env.example

Создать файл `.env.example` в корне проекта. Агент заполняет реальные значения в `.env.local` (не коммитить):

```bash
# .env.example

# Контакты (публичные — NEXT_PUBLIC_ префикс)
NEXT_PUBLIC_TG_LINK=https://t.me/fexperience
NEXT_PUBLIC_EMAIL=FExperience@forbes.ru
NEXT_PUBLIC_PHONE=+79201949003

# URL сайта (для OG-тегов и canonical)
NEXT_PUBLIC_SITE_URL=https://fexperience.forbes.ru

# Яндекс.Метрика
NEXT_PUBLIC_YM_ID=your_metrika_id_here

# Форма заявки — через nodemailer (уже в проекте). Настроить SMTP:
SMTP_HOST=
SMTP_PORT=587
SMTP_USER=
SMTP_PASS=
SMTP_TO=FExperience@forbes.ru

# Если используется CMS в будущем
# SANITY_PROJECT_ID=
# SANITY_DATASET=
# SANITY_API_TOKEN=
```

Все `NEXT_PUBLIC_` переменные доступны на клиенте — не класть туда секреты. Телефон, email, TG — публичные, ок. API-токены — только без `NEXT_PUBLIC_` префикса.

**Правило для агента:** любая строка которая может отличаться между dev/prod (URL, ID, endpoint) — в `.env`, не хардкод.

---

### 15.13 Accessibility — минимальный чеклист

Выполнить перед финальным деплоем:

```tsx
// 1. Все кнопки без текста — aria-label
<button aria-label="Следующий слайд">→</button>
<button aria-label="Закрыть меню"><X /></button>

// 2. Все декоративные изображения — пустой alt
<Image src={bg} alt="" role="presentation" />

// 3. Все контентные изображения — описательный alt
<Image src={expert.photo} alt={`Фото эксперта ${expert.name}`} />

// 4. Фокус-кольцо — не убирать outline полностью
// В globals.css:
:focus-visible {
  outline: 2px solid var(--orange-600);
  outline-offset: 3px;
  border-radius: 4px;
}
:focus:not(:focus-visible) { outline: none; } /* убрать только при клике мышью */

// 5. SVG-иконки — скрыть от скринридеров
<svg aria-hidden="true" focusable="false">...</svg>

// 6. Карусель testimonials — управление с клавиатуры
<div role="region" aria-label="Отзывы участников" aria-live="polite">

// 7. prefers-reduced-motion — уже в .fade-up, проверить для:
//    - preloader (останавливать анимацию)
//    - pulse на карте
//    - прогресс-бар
@media (prefers-reduced-motion: reduce) {
  .map-pulse-outer, .map-pulse-inner { animation: none; }
  .scroll-progress { transition: none; }
  .preloader { transition: none; }
}
```

**Контрастность:** все текстовые элементы должны соответствовать WCAG AA:
- `--text-primary` (#1A1A1A) на `--bg-canvas` (#FAFAF8) → ✅ контраст 19:1
- `--orange-600` (#FF6B2C) на белом → ⚠️ 3.1:1 — **не использовать для мелкого текста** (<18px), только для крупных акцентов и иконок
- `--text-secondary` (#6D6D6D) на белом → ✅ 5.9:1 для текста от 18px
- Белый текст на `--orange-600` кнопке → ✅ 3.1:1 достаточно для кнопки (крупный текст)

---


## 16. Уточнения на основе реального кода проекта — финальная версия

> **Источник истины для реального проекта:** этот раздел является последней редакцией уточнений по фактическому коду. Он заменяет более ранние версии раздела 16, которые были удалены при консолидации только потому, что их сведения уже перенесены сюда или были уточнены позднее.

### 16.1 Шрифты — HelveticaNeueCyr локально + Playfair Display через next/font/google

В проекте используются **локальные HelveticaNeueCyr** через `next/font/local`. Для заголовков добавляется **Playfair Display** через `next/font/google`:
- `HelveticaNeueCyr` — для body; в `@theme` он подключается через `--font-sans` и `--font-serif`
- Файлы лежат в `public/fonts/HelveticaNeue/`
- Подключены в `layout.tsx`

**Задача для редизайна:** добавить `Playfair Display` для заголовков через `next/font/google`. Существующий `HelveticaNeueCyr` остаётся локальным шрифтом для body/текста:

```typescript
// layout.tsx — добавить рядом с существующими шрифтами
import { Playfair_Display } from 'next/font/google'

const playfair = Playfair_Display({
  subsets: ['latin', 'cyrillic'],
  weight: ['500', '600', '700'],
  variable: '--font-display',  // ← новая переменная, не перезаписывать --font-serif
  display: 'swap',
})

// В html className добавить:
className={`${helveticaSans.variable} ${helveticaSerif.variable} ${playfair.variable}`}
```

```css
/* globals.css — обновить @theme */
@theme {
  /* Шрифты подключаются через next/font variables на <html> */
  --font-display: var(--font-playfair);
  --font-serif:   var(--font-helvetica-serif);
  --font-sans:    var(--font-helvetica-sans);
}
```

**Важно:** не удалять существующие Helvetica-шрифты из layout.tsx — они нужны для body/текстов. Playfair добавляется как третья переменная для заголовков. Везде в спеке где написано `font-family: 'Playfair Display'` — использовать `var(--font-display)`.

---

### 16.2 globals.css — реальное текущее состояние

Текущий globals.css уже использует Tailwind v4 с `@theme` (подтверждает раздел 12.2).
Текущая тема — **тёмная**: `--color-bg-primary: #000004`, `body bg-[#0D0805] text-white`.

**Задача:** полностью заменить `@theme` блок на светлую палитру из раздела 12.2. Структура файла сохраняется, меняются только значения переменных. Добавить новые токены, убрать старые тёмные:

```css
/* globals.css — полная замена @theme блока */
@import "tailwindcss";
@plugin "@tailwindcss/typography";

@theme {
  /* === НОВАЯ СВЕТЛАЯ ПАЛИТРА === */
  --color-canvas:         #FAFAF8;
  --color-surface:        #F5F2EC;
  --color-elevated:       #FFFFFF;
  --color-footer:         #F0ECE5;

  --color-text-primary:   #1A1A1A;
  --color-text-secondary: #6D6D6D;
  --color-text-tertiary:  #A0A0A0;
  --color-border:         rgba(26,26,26,.08);

  /* Оранжевая шкала */
  --color-brand-100: #FFF0E8;
  --color-brand-200: #FFE8D6;
  --color-brand-300: #FFB089;
  --color-brand-400: #FF8A54;
  --color-brand-500: #FF7722;
  --color-brand-600: #FF6B2C;
  --color-brand-700: #B7410E;

  /* Шрифты */
  --font-display: var(--font-playfair);
  --font-serif:   var(--font-helvetica-serif);
  --font-sans:    var(--font-helvetica-sans);

  /* Радиусы */
  --radius-sm:   8px;
  --radius-md:   16px;
  --radius-lg:   24px;
  --radius-pill: 999px;

  /* Тени */
  --shadow-resting: 0 4px 16px rgba(26,26,26,.05);
  --shadow-hover:   0 12px 32px rgba(26,26,26,.09);
  --shadow-glass:   0 8px 40px rgba(0,0,0,.06);
  --shadow-glow:    0 0 24px rgba(255,107,44,.35);
  --shadow-liquid:  0 0 40px rgba(255,107,44,.25);

  /* Blur для стекла */
  --blur-glass:        20px;
  --blur-glass-strong: 32px;

  /* Брейкпоинты — сохранить существующие */
  --breakpoint-sm:  640px;
  --breakpoint-md:  768px;
  --breakpoint-lg:  1024px;
  --breakpoint-xl:  1280px;
  --breakpoint-xxl: 1440px;
}

@layer base {
  * { @apply border-border; }
  body {
    @apply bg-canvas text-text-primary font-sans antialiased;
  }
  h1, h2, h3, h4, h5, h6 {
    font-family: var(--font-display), var(--font-serif);
  }
}

/* Масштабирование 1024-1280px — СОХРАНИТЬ без изменений */
@media (min-width: 1024px) and (max-width: 1280px) {
  html { font-size: 14px !important; }
}

/* fade-up scroll reveal */
.fade-up {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity .5s cubic-bezier(0.16,1,0.3,1),
              transform .5s cubic-bezier(0.16,1,0.3,1);
}
.fade-up.visible { opacity: 1; transform: translateY(0); }
.fade-up.delay-1 { transition-delay: 80ms; }
.fade-up.delay-2 { transition-delay: 160ms; }
.fade-up.delay-3 { transition-delay: 240ms; }
.fade-up.delay-4 { transition-delay: 320ms; }
.fade-up.delay-5 { transition-delay: 400ms; }
.fade-up.delay-6 { transition-delay: 480ms; }

@media (prefers-reduced-motion: reduce) {
  .fade-up { opacity: 1; transform: none; transition: none; }
  *, *::before, *::after {
    animation-duration: .01ms !important;
    transition-duration: .01ms !important;
  }
}
```

---

### 16.3 layout.tsx — что менять, что сохранить

```
✅ СОХРАНИТЬ:
  - localFont конфиги для HelveticaNeueCyr (обе переменные)
  - YandexMetrika компонент и его импорт
  - RootClientLayout — не трогать внутренности
  - suppressHydrationWarning на body
  - verification (yandex, google) в metadata

✏️ ИЗМЕНИТЬ:
  - body className: убрать bg-[#0D0805] text-white
    → добавить bg-canvas text-text-primary
  - metadata.metadataBase: 'https://fexperience.ru'
    → исправить на 'https://fexperience.forbes.ru' (canonical URL)
  - добавить переменную playfair в html className

➕ ДОБАВИТЬ:
  - import Playfair_Display из next/font/google
  - Preloader компонент внутри body (перед RootClientLayout)
  - AnimatePresence для page transitions (обернуть children в RootClientLayout или здесь)
  - skip-link как первый элемент body
```

Итоговый layout.tsx:
```tsx
import type { Metadata } from 'next'
import localFont from 'next/font/local'
import { Playfair_Display } from 'next/font/google'
import './globals.css'
import { RootClientLayout } from '@/components/layout/RootClientLayout'
import { YandexMetrika } from '@/components/shared/YandexMetrika'
import { Preloader } from '@/components/Preloader'

const helveticaSans = localFont({
  src: [
    { path: '../../public/fonts/HelveticaNeue/HelveticaNeueCyr-Roman.woff2', weight: '400', style: 'normal' },
    { path: '../../public/fonts/HelveticaNeue/HelveticaNeueCyr-Medium.woff2', weight: '500', style: 'normal' },
    { path: '../../public/fonts/HelveticaNeue/HelveticaNeueCyr-Bold.woff2', weight: '700', style: 'normal' },
    { path: '../../public/fonts/HelveticaNeue/HelveticaNeueCyr-Light.woff2', weight: '300', style: 'normal' },
  ],
  variable: '--font-helvetica-sans',
  display: 'swap',
})

// --font-serif оставляем на Helvetica (используется в body)
const helveticaSerif = localFont({
  src: [
    { path: '../../public/fonts/HelveticaNeue/HelveticaNeueCyr-Roman.woff2', weight: '400', style: 'normal' },
    { path: '../../public/fonts/HelveticaNeue/HelveticaNeueCyr-Medium.woff2', weight: '500', style: 'normal' },
    { path: '../../public/fonts/HelveticaNeue/HelveticaNeueCyr-Bold.woff2', weight: '700', style: 'normal' },
    { path: '../../public/fonts/HelveticaNeue/HelveticaNeueCyr-Light.woff2', weight: '300', style: 'normal' },
  ],
  variable: '--font-helvetica-serif',
  display: 'swap',
})

// Playfair Display — только для заголовков H1/H2/H3
const playfair = Playfair_Display({
  subsets: ['latin', 'cyrillic'],
  weight: ['500', '600', '700'],
  variable: '--font-playfair',
  display: 'swap',
})

export const metadata: Metadata = {
  title: { template: '%s | FExperience', default: 'Бизнес-экспедиции с Forbes | FExperience' },
  description: 'Бизнес-экспедиции для российских предпринимателей на перспективные зарубежные рынки',
  metadataBase: new URL('https://fexperience.forbes.ru'), // ← исправлено
  verification: {
    yandex: '4facb07931b3fd31',
    google: 'TTyyANnmVGkerAJNk4ZQOK5xdvLODbXOLkfKjSnNByA',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={`${helveticaSans.variable} ${helveticaSerif.variable} ${playfair.variable}`}>
      <body className="antialiased bg-canvas text-text-primary" suppressHydrationWarning>
        {/* Skip link для accessibility */}
        <a href="#main-content" className="skip-link">
          Перейти к основному содержимому
        </a>
        <Preloader />
        <RootClientLayout>{children}</RootClientLayout>
        <YandexMetrika />
      </body>
    </html>
  )
}
```

---

### 16.4 Данные экспедиций — `@/data/expeditions`, не MDX

**Критически важное уточнение.** Из `page.tsx` видно:
```typescript
import { expeditions } from '@/data/expeditions'
import { programs } from '@/data/program'
import { speakers } from '@/data/speakers'
import { config } from '@/data/config'
```

Данные экспедиций хранятся **в TypeScript-файлах в папке `src/data/`**, а не в MDX. MDX используется только для статей (`/articles`). Это полностью меняет подход:

- **Не нужен** `lib/getExpeditions.ts` с `gray-matter`
- **Не нужен** `content/expeditions/*.mdx`
- Агент работает с существующими `src/data/expeditions.ts`, `src/data/program.ts`, `src/data/speakers.ts`
- Структура данных уже определена — нужно только добавить поля если их нет

**Существующие поля у объекта экспедиции** (из page.tsx):
```typescript
expedition.slug           // string
expedition.status         // 'active' | 'upcoming' | 'completed'
expedition.title          // string
expedition.description    // string
expedition.image          // string (путь к фото)
expedition.imageEvening   // string (вечернее фото — смена по времени суток!)
expedition.dates          // string
expedition.timer          // { enabled: boolean }
expedition.includes       // array (для слайдера)
expedition.spots          // number
expedition.price          // number
expedition.country        // string
expedition.programSlug    // string (ключ в programs{})
expedition.additionalInfo // string | undefined
```

**Важная находка:** `imageEvening` — уже реализована смена фото по времени суток (Москва, 20:00+). Это именно та "AI-персонализация по времени суток" которая была в мудборде. Она уже сделана! Не переписывать, сохранить `HeroImageSwitch` компонент.

**Статусы в коде:** `'completed'`, `'upcoming'`, `'active'` — не `'завершена'`, `'скоро'`, `'активна'`. В спеке везде русские названия статусов — агент должен использовать английские из реального кода:

```typescript
const isCompleted = expedition.status === 'completed'
const isUpcoming  = expedition.status === 'upcoming'
const isActive    = expedition.status === 'active'
```

---

### 16.5 next.config.ts — важные детали

**SVG через `@svgr/webpack`** — уже настроен. SVG-иконки и карты континентов можно импортировать как React-компоненты:
```typescript
import AfricaMap from '@/assets/maps/africa.svg'
// Использовать: <AfricaMap className="..." />
```
Это идеальный подход для SVG-карт континентов из раздела 14.13 — не нужно inline SVG в JSX, файл отдельный и переиспользуемый.

**`output: 'standalone'`** — сайт деплоится как standalone Next.js. Учитывать при работе с путями к файлам.

**`images.formats: ['image/avif', 'image/webp']`** — `next/image` уже настроен на AVIF + WebP. Исходники можно загружать в JPG, Next.js сам конвертирует.

**`optimizePackageImports: ['lucide-react', 'framer-motion']`** — уже оптимизированы. Не нужно вручную делать tree-shaking этих библиотек.

**MDX через `@next/mdx`** — статьи рендерятся как страницы Next.js, не через `next-mdx-remote`. Файлы `.mdx` в `src/app/` работают как обычные `page.tsx`. Это проще чем `next-mdx-remote`, но означает что `gray-matter` нужен только если есть отдельные MDX-файлы вне `app/`.

---

### 16.6 Программа по дням — реальная структура

Из page.tsx видно что программа хранится в `src/data/program.ts` как объект `programs[programSlug]`, каждый день имеет поля:
```typescript
day.day         // number
day.title       // string
day.image       // string
day.description // string (разделитель '|' для переносов строк)
```

В новом дизайне (вертикальный таймлайн из раздела 5.4) используется та же структура — менять data-файл не нужно, только компонент рендеринга.

---

### 16.7 Компоненты которые существуют и используются повторно

Из page.tsx импортируются компоненты которые уже реализованы. Агент их **рестайлит, не переписывает**:

| Компонент | Путь | Действие |
|---|---|---|
| `HeroImageSwitch` | `@/components/shared/` | Сохранить логику смены день/вечер, рестайлить CSS |
| `ExpeditionForm` | `@/components/shared/` | Сохранить react-hook-form + zod логику, рестайлить |
| `CountdownTimer` | `@/components/shared/` | Сохранить логику, рестайлить под светлый дизайн |
| `IncludedSlider` | `@/components/shared/` | Сохранить Embla, заменить карточки на новый дизайн |
| `ExpertsSectionClient` | `@/components/shared/` | Рестайлить под горизонтальные карточки (раздел 5.5) |
| `FlipText` | `@/components/ui/` | Сохранить как есть |
| `UpcomingCta` | `@/components/shared/` | Рестайлить под новый дизайн |
| `YandexMetrika` | `@/components/shared/` | Не трогать вообще |
| `RootClientLayout` | `@/components/layout/` | Уточнить что внутри (Lenis?) — рестайлить осторожно |

---

### 16.8 JSON-LD разметка — сохранить

В page.tsx уже реализована полная JSON-LD разметка (BreadcrumbList + Event schema). Это ценно для SEO — **не удалять** при редизайне, перенести как есть в новый шаблон.

---

### 16.9 Обновлённый порядок работы для агента

С учётом реального кода — уточнённый порядок (заменяет раздел 15.8):

```
Шаг 0.  Изучить src/data/ — понять структуру expeditions.ts, program.ts, speakers.ts
Шаг 1.  globals.css — заменить @theme на светлую палитру (раздел 16.2)
Шаг 2.  layout.tsx — добавить Playfair, исправить body классы и metadataBase (раздел 16.3)
Шаг 3.  types/index.ts — добавить TypeScript типы совместимые с src/data/ структурой
Шаг 4.  Добавить CSS-классы: glass-01, glass-signature, btn-liquid, fade-up (раздел 14)
Шаг 5.  components/Preloader.tsx — создать (раздел 10.1)
Шаг 6.  components/CookieBanner.tsx — рестайлить существующий (раздел 10.3)
Шаг 7.  components/layout/Header.tsx — редизайн навигации
Шаг 8.  components/layout/Footer.tsx — редизайн футера
Шаг 9.  Рестайл существующих shared-компонентов (таблица раздела 16.7)
Шаг 10. app/page.tsx (главная) — секции 2.1→2.11
Шаг 11. app/expeditions/page.tsx — директория (раздел 4)
Шаг 12. app/expeditions/[slug]/page.tsx — 3 шаблона, сохранить существующую логику (раздел 5)
Шаг 13. app/about/page.tsx — раздел 3
Шаг 14. app/articles/* — раздел 6-7, MDX через @next/mdx
Шаг 15. app/not-found.tsx — раздел 11.4
Шаг 16. app/error.tsx + app/loading.tsx — раздел 15.9
Шаг 17. app/privacy/page.tsx — раздел 10.8
Шаг 18. SVG карты континентов — в src/assets/maps/, импорт через @svgr/webpack (раздел 16.5)
Шаг 19. Responsive-проход — 375px / 768px / 1280px / 1440px (xxl брейкпоинт!)
Шаг 20. generateMetadata() — исправить metadataBase везде на fexperience.forbes.ru
Шаг 21. Lighthouse audit — Core Web Vitals (раздел 15.8)
```

---

### 16.10 Дополнение к layout.tsx — progress bar

При переносе layout-изменений сохранить требование из предыдущего чеклиста: добавить `<div id="scroll-progress-bar" />` для progress bar из раздела 14.8. Это единственный пункт удалённого чеклиста, который не был отдельно повторён в финальной редакции layout.

---

END OF DOCUMENT
