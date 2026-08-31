# COUNTDOWN SECTION — BACKGROUND IMAGE + LIVING GLASS

## Цель

Доработать только секцию Countdown Timer на главной.

Сейчас таймер аккуратный, но находится на почти однотонном фоне. Нужно создать отдельную визуальную среду: **очень светлая editorial-фотография + тёплый молочный overlay + существующий стеклянный таймер**.

Это НЕ новый дизайн таймера. Не менять countdown-логику, структуру, цифры, шрифты и композицию.

---

## 1. Промпт для фонового изображения

```text
Cinematic editorial photograph of a premium business expedition destination In Cape Town, South Africa,
shot in the quiet early morning light just after sunrise,
wide architectural and landscape composition with a calm sense of depth,
a refined contemporary city and surrounding natural landscape subtly merging into the distance,
soft atmospheric haze between foreground and background,
large areas of uncluttered visual space designed to sit behind translucent glass UI,
gentle morning light entering from one side and creating very subtle highlights on architecture and terrain,
no dramatic contrast, no harsh shadows,
no dominant central object,
no close-up people,
if people are present they are distant, small and naturally integrated into the scene,
subtle signs of business life but no advertising,
the atmosphere should suggest international business, exploration and movement without becoming literal tourism imagery,
photograph has the quality of a premium international editorial magazine or sophisticated corporate annual report,
restrained, confident, intelligent and slightly formal,
colour palette: warm ivory, pale sandstone, muted terracotta, soft peach, warm grey and very light atmospheric blue,
elevated shadows, soft highlights, low visual contrast,
natural filmic colour grading,
fine photographic texture,
realistic optics,
Leica SL2, 35mm lens, f/4,
subtle depth of field,
photorealistic,
cinematic,
16:9,
no monuments,
no famous landmarks,
no tourist postcard aesthetic,
no oversaturated colours,
no neon,
no fantasy architecture,
no futuristic city,
no text,
no logos,
no UI elements
```

Для конкретной страны/города менять только описание места в первой части. Остальные ограничения сохранять.

---

## 2. Каким должно быть изображение

Фотография должна быть:

- photorealistic;
- cinematic;
- editorial;
- premium;
- спокойной;
- архитектурной или ландшафтной;
- с большими спокойными зонами;
- без крупного центрального объекта;
- без людей крупным планом;
- без текста и логотипов;
- без туристических достопримечательностей.

НЕ использовать сильный orange grade, тёмный ночной город, насыщенный закат, крупные здания, много людей или изображение, конкурирующее с Hero.

Фотография должна работать как **среда позади стекла**, а не как самостоятельный баннер.

---

## 3. Фон секции

Использовать отдельную локальную фотографию:

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
    url("/images/countdown-bg.jpg") center / cover no-repeat;
}
```

Не затемнять фотографию ради стекла. Если изображение слишком контрастное — сначала усилить молочный overlay.

Фотография должна быть видна как лёгкая фактура, но не конкурировать с таймером.

---

## 4. Glass Timer

Существующую композицию сохранить:

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

Добавить только тонкий светлый кант:

```css
.home-countdown {
  border: 1px solid rgba(255, 255, 255, 0.72);

  box-shadow:
    0 18px 50px rgba(120, 66, 30, 0.06),
    inset 0 1px 0 rgba(255, 255, 255, 0.90);
}
```

Не использовать оранжевую рамку.

---

## 5. Living Glass

Добавить очень слабое тёплое отражение:

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
```

И ещё более слабое:

```css
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
```

Контент выше свечения:

```css
.home-countdown__eyebrow,
.home-countdown__values,
.home-countdown__caption {
  position: relative;
  z-index: 1;
}
```

Свечение НЕ анимировать.

---

## 6. Визуальная иерархия

1. Hero — самый сильный визуальный блок.
2. Остальной контент — поддерживает бренд.
3. Countdown — отдельная атмосферная сцена.
4. Фотография — фон/фактура.
5. Glass Timer — главный объект сцены.
6. Цифры — главный объект внутри таймера.

Фотография не должна становиться вторым Hero.

---

## 7. Запрещено

Не добавлять:

- декоративные blobs;
- random gradients;
- glowing circles;
- floating shapes;
- лишние glass cards;
- отдельные карточки для дней/часов/минут/секунд;
- moving gradient;
- animated glow;
- excessive blur;
- neon orange;
- generic bento layout.

Не добавлять элементы только ради «эффектности».

Характер создаётся сочетанием:

**фотография + светлый overlay + физичное стекло + типографика.**

---

## 8. Acceptance checklist

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
- [ ] Hero и остальные секции не изменены.

## Главный критерий

> **Будто перед нами светлая фотографическая поверхность, а поверх неё действительно стоит тонкая полупрозрачная пластина из стекла.**

Если эффект выглядит как CSS-декорация — он слишком сильный.

Если секция снова выглядит как обычная белая карточка — фотография/overlay слишком слабые.

При сомнении выбирать более спокойный вариант.
