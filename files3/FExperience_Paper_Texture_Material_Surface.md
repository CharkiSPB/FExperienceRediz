# FExperience — Paper Texture / Material Surface

## Задача

Добавить в текущий рестайл главной страницы очень тонкую **материальную зернистость тёплого бумажного фона**.

Это не film grain и не винтажный шум.

Идея:

> **дорогая редакционная бумага + цифровой экран + стеклянные информационные слои**

Фон должен перестать восприниматься как абсолютно плоский `#fff8f2`, но пользователь не должен сразу замечать texture.

---

# 1. Что НЕ нужно делать

Не превращать страницу в:

- vintage website;
- film photography aesthetic;
- retro paper;
- grainy poster;
- noisy background;
- «грязную» бумагу;
- чрезмерный glassmorphism.

Не использовать большую PNG/JPG-текстуру на весь сайт.

Не делать заметные точки/крапинки.

Не анимировать шум.

Не применять noise непосредственно к тексту или фотографиям.

Не менять существующую цветовую палитру.

Не менять структуру главной страницы.

---

# 2. Визуальная идея

Сейчас:

```text
плоский тёплый цвет
```

После:

```text
тёплая бумажная поверхность
+
почти незаметная микротекстура
```

На уровне ощущения:

> «Это не просто web background. Это поверхность.»

При первом взгляде пользователь должен видеть цвет.

При втором — ощущать материал.

Если пользователь сразу замечает зерно как отдельный эффект — эффект слишком сильный.

---

# 3. Материальная система

Ввести три визуальных типа поверхности.

## PAPER

Используется для:

- текстовых секций;
- редакционных блоков;
- FAQ;
- блока «Наша позиция»;
- секций вокруг карт;
- footer;
- спокойных информационных областей.

Характер:

```text
warm
matte
editorial
quiet
paper-like
```

## SCREEN

Фотографии и большие изображения.

Фотографии должны оставаться визуально чистыми.

**Не накладывать глобальный paper-noise поверх фотографии.**

## GLASS

Стеклянные элементы:

- карточки «Почему FExperience»;
- timer;
- Final CTA;
- glass overlays поверх фотографий.

Glass должен выглядеть как:

```text
прозрачность
+
blur
+
свет
+
очень слабое внутреннее свечение
```

Paper noise не должен делать glass грязным.

---

# 4. Архитектура

Предпочтительно:

```text
page / body
 └── paper surface
      ├── content
      ├── sections
      └── UI
```

Noise:

```text
paper surface
 └── ::before
      └── SVG noise
```

Обязательно:

```css
pointer-events: none;
```

Noise никогда не должен блокировать клики.

---

# 5. SVG noise

Создать:

```text
/public/textures/paper-noise.svg
```

Содержимое:

```svg
<svg
  xmlns="http://www.w3.org/2000/svg"
  width="180"
  height="180"
  viewBox="0 0 180 180"
>
  <filter
    id="paperNoise"
    x="0"
    y="0"
    width="100%"
    height="100%"
  >
    <feTurbulence
      type="fractalNoise"
      baseFrequency="0.72"
      numOctaves="3"
      seed="17"
      stitchTiles="stitch"
    />

    <feColorMatrix
      type="saturate"
      values="0"
    />

    <feComponentTransfer>
      <feFuncR type="linear" slope="0.42" />
      <feFuncG type="linear" slope="0.42" />
      <feFuncB type="linear" slope="0.42" />
      <feFuncA type="linear" slope="0.32" />
    </feComponentTransfer>
  </filter>

  <rect
    width="100%"
    height="100%"
    filter="url(#paperNoise)"
  />
</svg>
```

`feTurbulence` используется именно как процедурный генератор noise. `baseFrequency` регулирует масштаб зерна, `numOctaves` — детализацию. `fractalNoise` предпочтителен для мягкой органичной фактуры.

---

# 6. CSS-переменные

Добавить в глобальные tokens:

```css
:root {
  --paper-bg: #fff8f2;

  --paper-noise-opacity: 0.018;
  --paper-noise-opacity-quiet: 0.012;
  --paper-noise-opacity-editorial: 0.024;
}
```

Диапазон настройки:

```text
0.012 — почти незаметно
0.018 — основной вариант
0.024 — более выраженная бумага
0.030 — верхняя граница теста
```

Не поднимать выше `0.035` без очень веской причины.

---

# 7. Глобальный вариант

Если текущая архитектура проекта позволяет:

```css
body {
  position: relative;
  background: var(--paper-bg);
}

body::before {
  content: "";
  position: fixed;
  inset: 0;

  z-index: 9990;
  pointer-events: none;

  background-image:
    url("/textures/paper-noise.svg");

  background-repeat: repeat;
  background-size: 180px 180px;

  opacity: var(--paper-noise-opacity);

  mix-blend-mode: multiply;
}
```

Проверить stacking context.

Noise не должен перекрывать:

- navigation;
- buttons;
- links;
- modals;
- dropdowns;
- glass surfaces.

---

# 8. Безопасный вариант через page wrapper

Если `body::before` конфликтует с проектом:

```html
<div class="site-shell">
  <div class="site-paper-noise" aria-hidden="true"></div>

  <main>
    ...
  </main>
</div>
```

```css
.site-shell {
  position: relative;
  isolation: isolate;
  background: var(--paper-bg);
}

.site-paper-noise {
  position: fixed;
  inset: 0;
  z-index: -1;

  pointer-events: none;

  background-image:
    url("/textures/paper-noise.svg");

  background-repeat: repeat;
  background-size: 180px 180px;

  opacity: var(--paper-noise-opacity);

  mix-blend-mode: multiply;
}
```

Выбрать вариант, который лучше соответствует существующей архитектуре. Не переписывать layout ради texture.

---

# 9. Не накладывать texture на фотографии

Нужно:

```text
PAPER
  ↓
PHOTO
  ↓
GLASS
```

Не:

```text
PAPER
  ↓
NOISE
  ↓
PHOTO
  ↓
NOISE
```

Фотография должна оставаться чистой.

Если секция использует `background-image`, проверить, что noise-overlay не находится поверх фотографии.

---

# 10. Glass

Paper noise не добавлять внутрь glass автоматически.

Базовая поверхность:

```css
.glass-surface {
  background:
    linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.54),
      rgba(255, 248, 242, 0.30)
    );

  border: 1px solid rgba(255, 255, 255, 0.68);

  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);
}
```

Glass должен отличаться от paper за счёт:

```text
прозрачности
+
blur
+
светлого border
+
очень слабого warm glow
```

---

# 11. Разные уровни noise

Не делать одинаковую интенсивность абсолютно везде.

Обычная бумага:

```css
.paper-surface {
  --surface-noise-opacity: 0.018;
}
```

Тихая секция:

```css
.paper-surface--quiet {
  --surface-noise-opacity: 0.012;
}
```

Editorial:

```css
.paper-surface--editorial {
  --surface-noise-opacity: 0.024;
}
```

Универсальный компонент:

```css
.paper-surface {
  position: relative;
}

.paper-surface::before {
  content: "";
  position: absolute;
  inset: 0;

  pointer-events: none;

  background:
    url("/textures/paper-noise.svg")
    repeat;

  background-size: 180px 180px;

  opacity: var(
    --surface-noise-opacity,
    var(--paper-noise-opacity)
  );

  mix-blend-mode: multiply;

  z-index: 0;
}

.paper-surface > * {
  position: relative;
  z-index: 1;
}
```

---

# 12. «Наша позиция»

Для уже разработанного блока использовать:

```css
.position-section {
  --surface-noise-opacity: 0.024;
}
```

Это один из лучших кандидатов для чуть более выраженной материальности.

Там уже есть:

- рукописный текст;
- тонкая вертикальная линия;
- редакционный характер;
- бледный цветной sketch;
- много воздуха.

Эффект должен ощущаться как:

```text
editorial paper
+
field notes
+
research document
```

а не как декоративный шум.

---

# 13. Блок регионов

Использовать более спокойный уровень:

```css
.regions-section {
  --surface-noise-opacity: 0.015;
}
```

Контуры континентов должны оставаться чистыми.

Особенно важно не ухудшить:

- SVG-контуры;
- оранжевые точки;
- названия;
- glass-поверхности карточек.

---

# 14. Таймер

Таймер не должен становиться зернистым.

Правильная логика:

```text
paper background
        ↓
   [ glass timer ]
```

а не:

```text
[ noisy glass timer ]
```

Noise остаётся на бумажной секции вокруг таймера.

Сам timer сохраняет:

- светлый border;
- glass;
- очень слабый warm glow;
- чистые цифры.

---

# 15. Final CTA

Final CTA сохраняет текущую идею с фотографическим фоном и стеклянной панелью.

Paper noise:

- не накладывать поверх фотографии;
- можно оставить на окружающем paper margin;
- не делать glass зернистым.

---

# 16. Цвет noise

Noise не должен быть оранжевым.

Не использовать:

```css
rgba(255, 100, 43, ...)
```

Noise должен быть нейтральным тёмно-светлым luminance variation.

Тёплый оттенок уже создаётся:

```css
#fff8f2
```

Так texture будет ощущаться как материал, а не как фирменный цветовой эффект.

---

# 17. Не анимировать

Noise должен быть статичным.

Не делать:

```css
animation: noise ...
```

Не менять `background-position`.

Не делать random movement.

Бумага неподвижна.

---

# 18. Performance / accessibility

Обязательно:

```css
pointer-events: none;
```

Для декоративного overlay:

```html
aria-hidden="true"
```

Не использовать JavaScript для генерации grain.

Не использовать canvas.

Не использовать большую bitmap-текстуру.

SVG `feTurbulence` выбран именно для лёгкой процедурной текстуры.

---

# 19. prefers-reduced-motion

```css
@media (prefers-reduced-motion: reduce) {
  .paper-surface,
  .site-paper-noise {
    animation: none !important;
    transition: none !important;
  }
}
```

---

# 20. Визуальный тест

Сделать три варианта:

### A

```text
без texture
```

### B

```text
noise = 0.018
```

### C

```text
noise = 0.035
```

Выбрать **самый слабый вариант, который всё ещё даёт ощущение материала**.

Предпочтение:

```text
B
```

а не:

```text
C
```

---

# 21. Критерии приёмки

После реализации:

- [ ] создан `/public/textures/paper-noise.svg`;
- [ ] используется SVG `feTurbulence`;
- [ ] нет JavaScript для noise;
- [ ] noise не блокирует клики;
- [ ] noise не лежит поверх фотографий;
- [ ] glass остаётся чистым;
- [ ] основной opacity около `0.018`;
- [ ] editorial-секции могут использовать около `0.024`;
- [ ] тихие секции около `0.012`;
- [ ] нет animation;
- [ ] нет оранжевого noise;
- [ ] текст полностью читаем;
- [ ] SVG контуры регионов остаются чёткими;
- [ ] фотографии не становятся «бумажными»;
- [ ] фон ощущается как дорогая бумага, а не как шум;
- [ ] существующий дизайн FExperience не переделан.

---

# 22. Что нельзя менять в рамках задачи

НЕ менять:

- layout;
- grid;
- typography;
- тексты;
- контент;
- фотографии;
- SVG континентов;
- timer;
- Final CTA;
- navigation;
- CTA buttons;
- существующую систему glass;
- существующую оранжевую палитру.

Это **локальный material enhancement**, а не новый редизайн.

Меняется только:

```text
плоский paper background
        ↓
материальная paper surface
```

---

# 23. Финальная дизайн-формула

Не:

> «Добавили grain, чтобы было красивее».

А:

> **Мы разделили страницу на материальные поверхности.**

### PAPER

Редакционная среда.

### SCREEN

Реальный мир / фотография.

### GLASS

Информация / интерфейс.

### HANDWRITING

Человеческий голос.

### ORANGE

Фирменный акцент.

### SVG MAPS

Исследовательская география.

Вместе:

**редакционный журнал + field research + современный цифровой интерфейс.**

---

# Главное правило

**Если пользователь замечает texture раньше, чем содержание секции — texture слишком сильная.**

Она должна работать как дорогая бумага в хорошем журнале:

**её не рассматривают — её чувствуют.**
