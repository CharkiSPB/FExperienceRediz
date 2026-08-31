# Homepage Countdown Timer — Restyle Lock

## Назначение

Это отдельное дополнение к текущей спецификации **только для рестайла таймера обратного отсчёта на главной странице**.

Не создавать новый таймер и не переписывать существующую countdown-логику.

Существующий компонент:

```text
src/components/shared/CountdownTimer.tsx
```

Его логика, props и вычисление времени должны быть сохранены. Меняется только визуальная подача и место использования на главной.

---

## 1. Место на главной

Структура:

```text
HERO
↓
Плашка ближайшей экспедиции
↓
COUNTDOWN TIMER
↓
Market Reality / следующий блок
```

Таймер относится к **ближайшей по дате экспедиции**, а не к активному слайду Hero.

HeroSlider и Countdown независимы.

---

## 2. Источник данных

Использовать:

```text
src/data/expeditions.ts
```

CMS не использовать.

Не добавлять Sanity, Strapi, API или другую CMS.

Дата должна приходить из объекта ближайшей экспедиции:

```tsx
<CountdownTimer
  targetDate={nearestExpedition.targetDate}
  variant="homepage"
/>
```

Если фактическое имя поля даты в проекте другое — использовать существующее поле, не менять модель данных.

Не хардкодить дату внутри CountdownTimer.

---

## 3. Что запрещено менять

Не:

- переписывать CountdownTimer с нуля;
- создавать второй countdown-компонент;
- менять бизнес-логику расчёта времени;
- менять HeroSlider;
- связывать таймер с `currentIndex`;
- менять структуру данных экспедиций;
- добавлять CMS;
- добавлять новые зависимости;
- менять Hero;
- менять блок «Выберите регион»;
- менять страницы экспедиций;
- переносить таймер внутрь Hero;
- делать отдельный таймер для каждого Hero-слайда.

Задача — **вернуть таймер на главную и сделать его частью нового премиального визуального языка**.

---

## 4. Визуальная идея

Сохранить фирменную роль старого **оранжевого таймера**, но полностью привести его к новому дизайну.

Нужное ощущение:

> тёплый светлый фон + тонкое Liquid Glass + выразительные оранжевые цифры Playfair Display.

Не делать:

- стандартный AI-dashboard;
- четыре независимые Bento-карточки;
- дешёвый digital clock;
- gaming/neon countdown;
- четыре белых карточки с серой рамкой.

Таймер должен выглядеть как **единый премиальный объект**, а не как вставленный готовый UI-компонент.

---

## 5. Фон

Не использовать чистый белый.

Использовать существующий тёплый фон/градиент проекта. Если отдельного токена нет:

```css
background:
  radial-gradient(
    circle at 50% 20%,
    rgba(255, 232, 214, 0.72) 0%,
    rgba(255, 246, 239, 0.9) 38%,
    rgba(250, 244, 238, 1) 100%
  );
```

Не создавать новый самостоятельный цветовой стиль.

---

## 6. Единый стеклянный контейнер

```css
.home-countdown {
  position: relative;
  width: min(920px, calc(100% - 48px));
  margin: 0 auto;
  padding: 34px 40px 30px;

  border: 1px solid rgba(255, 255, 255, 0.72);
  border-radius: 28px;

  background:
    linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.58),
      rgba(255, 255, 255, 0.30)
    );

  backdrop-filter: blur(22px) saturate(135%);
  -webkit-backdrop-filter: blur(22px) saturate(135%);

  box-shadow:
    0 18px 50px rgba(120, 66, 30, 0.08),
    inset 0 1px 0 rgba(255, 255, 255, 0.82);

  overflow: hidden;
}
```

Стекло должно быть светлым, тёплым и полупрозрачным.

Не затемнять контейнер.

---

## 7. Мягкий оранжевый акцент

```css
.home-countdown::before {
  content: "";
  position: absolute;
  width: 280px;
  height: 180px;
  left: 50%;
  top: -120px;
  transform: translateX(-50%);

  background: rgba(255, 107, 44, 0.12);
  filter: blur(55px);

  pointer-events: none;
}
```

Свечение должно быть почти незаметным. Не использовать неоновый эффект.

---

## 8. Eyebrow

Текст:

```text
ДО НАЧАЛА ЭКСПЕДИЦИИ
```

```css
.home-countdown__eyebrow {
  position: relative;
  z-index: 1;

  margin: 0 0 22px;

  font-family: "HelveticaNeueCyr", sans-serif;
  font-size: 12px;
  line-height: 1;
  font-weight: 600;

  letter-spacing: 0.12em;
  text-transform: uppercase;

  color: var(--orange-600);
  text-align: center;
}
```

---

## 9. Четыре значения

Использовать:

```text
ДНИ
ЧАСЫ
МИНУТЫ
СЕКУНДЫ
```

Но **не делать четыре самостоятельные карточки**.

```css
.home-countdown__values {
  position: relative;
  z-index: 1;

  display: grid;
  grid-template-columns: repeat(4, 1fr);

  max-width: 760px;
  margin: 0 auto;

  border-top: 1px solid rgba(112, 76, 50, 0.10);
  border-bottom: 1px solid rgba(112, 76, 50, 0.10);
}
```

```css
.home-countdown__unit {
  position: relative;

  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 18px 24px 16px;
}
```

Разделители:

```css
.home-countdown__unit + .home-countdown__unit::before {
  content: "";

  position: absolute;
  left: 0;
  top: 20%;
  bottom: 20%;

  width: 1px;

  background: rgba(112, 76, 50, 0.10);
}
```

Получается одна типографическая система внутри стеклянного контейнера.

---

## 10. Числа

Главный акцент — оранжевые цифры.

```css
.home-countdown__number {
  display: block;

  font-family: "Playfair Display", serif;
  font-size: clamp(48px, 5vw, 72px);
  line-height: 0.95;
  font-weight: 500;

  color: var(--orange-600);
  letter-spacing: -0.035em;

  text-shadow:
    0 4px 22px rgba(255, 107, 44, 0.16);
}
```

Не использовать кислотный/неоновый оранжевый.

Использовать существующий:

```css
var(--orange-600)
```

---

## 11. Подписи

```css
.home-countdown__label {
  margin-top: 9px;

  font-family: "HelveticaNeueCyr", sans-serif;
  font-size: 10px;
  line-height: 1;
  font-weight: 600;

  letter-spacing: 0.12em;
  text-transform: uppercase;

  color: rgba(26, 26, 26, 0.48);
}
```

Числа — главный визуальный элемент. Подписи должны быть спокойными.

---

## 12. Подпись экспедиции

Под таймером показывать данные ближайшей экспедиции, например:

```text
ЮАР · 15–21 ноября 2026
```

Данные динамические:

```tsx
<p className="home-countdown__caption">
  {nearestExpedition.country} · {nearestExpedition.dates}
</p>
```

```css
.home-countdown__caption {
  position: relative;
  z-index: 1;

  margin: 22px 0 0;

  font-family: "HelveticaNeueCyr", sans-serif;
  font-size: 14px;
  line-height: 1.4;
  font-weight: 500;

  color: rgba(26, 26, 26, 0.58);

  text-align: center;
}
```

---

## 13. Анимация

Сохранить существующую идею смены цифр через Framer Motion, но сделать её спокойной.

```tsx
<AnimatePresence mode="popLayout">
  <motion.span
    key={value}
    className="home-countdown__number"
    initial={{ y: "-35%", opacity: 0 }}
    animate={{ y: "0%", opacity: 1 }}
    exit={{ y: "35%", opacity: 0 }}
    transition={{
      duration: 0.22,
      ease: [0.16, 1, 0.3, 1],
    }}
  >
    {value}
  </motion.span>
</AnimatePresence>
```

Не использовать:

- вращение;
- bounce;
- масштабирование;
- flashing;
- сильное свечение.

---

## 14. Интеграция с существующим CountdownTimer

Предпочтительно сохранить существующий API и добавить только визуальный variant:

```tsx
<CountdownTimer
  targetDate={nearestExpedition.targetDate}
  variant="homepage"
/>
```

Если фактический API отличается, **не переписывать компонент ради этого примера**. Использовать существующие props и добавить минимально необходимую стилизацию.

Существующие классы можно сохранить:

```text
.countdown-block
.countdown-number-wrap
.countdown-number
.countdown-label
```

и переопределить/расширить их для homepage.

---

## 15. Получение ближайшей экспедиции

На главной:

```tsx
const nearestExpedition = getNearestExpedition(expeditions)
```

или использовать существующую в проекте функцию определения ближайшей экспедиции.

Далее:

```tsx
<HeroSlider ... />

<UpcomingExpedition ... />

{nearestExpedition && (
  <section
    className="home-countdown-section"
    aria-label="Обратный отсчёт до ближайшей экспедиции"
  >
    <CountdownTimer
      targetDate={nearestExpedition.targetDate}
      variant="homepage"
    />
  </section>
)}

<MarketReality ... />
```

Если `UpcomingExpedition` уже называется иначе, использовать фактическое имя существующего компонента.

Не создавать дубликаты данных.

---

## 16. Критически важная независимость от HeroSlider

Правильно:

```text
HeroSlider
→ показывает текущий слайд

CountdownTimer
→ считает до ближайшей экспедиции
```

Например:

```text
Hero slide #1 = Индия
Countdown = ЮАР
```

если ЮАР является ближайшей по дате.

Запрещено:

```tsx
slides[currentIndex].targetDate
```

для Countdown.

Использовать дату ближайшей экспедиции.

---

## 17. Mobile

```css
@media (max-width: 700px) {
  .home-countdown {
    width: calc(100% - 32px);
    padding: 28px 16px 24px;
    border-radius: 22px;
  }

  .home-countdown__values {
    max-width: 100%;
  }

  .home-countdown__unit {
    padding: 16px 6px 14px;
  }

  .home-countdown__number {
    font-size: clamp(34px, 10vw, 48px);
  }

  .home-countdown__label {
    font-size: 8px;
    letter-spacing: 0.08em;
  }
}

@media (max-width: 420px) {
  .home-countdown__unit {
    padding-left: 3px;
    padding-right: 3px;
  }

  .home-countdown__number {
    font-size: 32px;
  }
}
```

---

## 18. Reduced motion

```css
@media (prefers-reduced-motion: reduce) {
  .home-countdown__number {
    transition: none !important;
    animation: none !important;
  }
}
```

---

## 19. Запрещённый результат

Не превращать блок в:

```text
┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐
│  12  │ │  04  │ │  18  │ │  42  │
│ days │ │hours │ │ mins │ │ secs │
└──────┘ └──────┘ └──────┘ └──────┘
```

с четырьмя стандартными Bento-карточками.

Правильное ощущение:

```text
        ДО НАЧАЛА ЭКСПЕДИЦИИ

        12       04       18       42
       ДНИ      ЧАСЫ     МИНУТЫ    СЕКУНДЫ
        ───────── тонкая система ─────────

              ЮАР · 15–21 ноября 2026
```

То есть **один светлый стеклянный объект**, внутри которого находится единая типографическая композиция.

---

## 20. Acceptance checklist

Перед завершением агент обязан проверить:

- [ ] Таймер есть на главной.
- [ ] Он расположен после Hero/плашки ближайшей экспедиции.
- [ ] Он считает до ближайшей по дате экспедиции.
- [ ] Он не зависит от `currentIndex` HeroSlider.
- [ ] Дата не захардкожена внутри CountdownTimer.
- [ ] Используются существующие данные `src/data/expeditions.ts`.
- [ ] CMS не используется.
- [ ] Существующая countdown-логика сохранена.
- [ ] `Playfair Display` используется для чисел.
- [ ] `HelveticaNeueCyr` используется для подписей.
- [ ] Оранжевый цвет берётся из `--orange-600`.
- [ ] Контейнер — светлое Liquid Glass.
- [ ] Нет четырёх отдельных Bento-карточек.
- [ ] Нет тёмных карточек.
- [ ] Нет неонового glow.
- [ ] Нет агрессивной flip-анимации.
- [ ] Mobile остаётся читаемым.
- [ ] Учитывается `prefers-reduced-motion`.

---

## 21. Главное правило

**Не изобретать новую countdown-архитектуру.**

Взять существующий:

```text
src/components/shared/CountdownTimer.tsx
```

сохранить его логику и рестайлить его для homepage как:

> **единый светлый стеклянный объект с фирменными оранжевыми цифрами Playfair Display.**

Это дополнение относится только к главной странице и не должно менять визуальную/функциональную логику таймера на детальных страницах экспедиций.
