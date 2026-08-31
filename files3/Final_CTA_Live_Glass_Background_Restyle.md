# FINAL CTA — BACKGROUND IMAGE + LIVE GLASS RESTYLE

## ЦЕЛЬ

Переделать существующий Final CTA на главной странице:

**«Откройте новый рынок раньше других»**

Текст и смысл блока НЕ менять.

Изменить только визуальную подачу.

Новая задача:
- тёплое атмосферное фотографическое изображение на фоне;
- поверх него — очень светлая жидкостеклянная панель;
- тонкий светлый контур;
- мягкое внутреннее тёплое свечение;
- минимальный blur;
- никаких дополнительных карточек;
- никакого bento;
- никакой сетки UI-элементов;
- никакого стандартного gradient blob;
- никакого тяжёлого orange glow.

Блок должен выглядеть как дорогой editorial / luxury business experience, а не как SaaS landing page.

---

# 1. ФАЙЛ ИЗОБРАЖЕНИЯ

Сначала найти в проекте существующее изображение, которое было создано/подобрано для нового Final CTA. backgroundFinalCta.webp

**НЕ придумывать новое имя файла.**

Использовать фактический существующий файл из проекта.



Рекомендуемая папка:

```text
/public/images/
```

или существующая папка проекта для фоновых изображений.

Не перемещать существующие файлы без необходимости.

---

# 2. КАКИМ ДОЛЖЕН БЫТЬ ФОН

Фон Final CTA должен быть:
- светлым;
- тёплым;
- кинематографичным;
- деловым;
- связанным с бизнес-экспедициями;
- без туристической открытки;
- без очевидного stock-photo ощущения.

Изображение должно иметь достаточно спокойную область в центре, чтобы поверх него можно было разместить стеклянную панель.

Предпочтительная композиция:

```text
IMAGE BACKGROUND
       ↓
soft atmospheric photograph
       ↓
very light warm glass panel
       ↓
editorial typography
       ↓
orange CTA
```

Не делать фотографию слишком контрастной.
Не делать фон полностью белым.
Не использовать чистый orange gradient вместо фотографии.

---

# 3. СТРУКТУРА FINAL CTA

Существующий текст сохранить.

### Заголовок

```text
Откройте новый рынок
раньше других
```

### Текст

```text
Присоединяйтесь к бизнес-экспедиции FExperience с Forbes — доступ к предпринимателям, локальным экспертам и людям, принимающим решения на новом рынке.
```

### CTA

```text
Стать участником
```

Ничего из текста не переписывать.

Не добавлять:
- следующую экспедицию;
- список преимуществ;
- отзывы;
- цифры;
- иконки;
- второй CTA.

---

# 4. ВНЕШНЯЯ СЕКЦИЯ

Не использовать обычный `background: var(--bg-canvas)` на всей секции.

```css
.final-cta {
  position: relative;
  overflow: hidden;
  isolation: isolate;

  min-height: 560px;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 96px 24px;
}
```

Фоновое изображение:

```css
.final-cta__background {
  position: absolute;
  inset: 0;
  z-index: -3;

  background-image: url("/images/backgroundFinalCta.webp");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
```


Агент обязан подставить реальный существующий путь к изображению.

---

# 5. СВЕТОВОЙ СЛОЙ НАД ФОТО

```css
.final-cta::before {
  content: "";
  position: absolute;
  inset: 0;
  z-index: -2;

  background:
    linear-gradient(
      180deg,
      rgba(255, 248, 242, 0.18) 0%,
      rgba(255, 244, 234, 0.30) 100%
    );
}
```

Не затемнять изображение сильно.
Не делать overlay оранжевым.

Задача overlay — связать фотографию с тёплой палитрой сайта.

---

# 6. GLASS PANEL

Существующую CTA-карточку оставить как центральную glass-панель.

```css
.final-cta__panel {
  position: relative;

  width: min(820px, calc(100vw - 48px));

  padding: 76px 72px;

  border-radius: 32px;

  background:
    linear-gradient(
      135deg,
      rgba(255,255,255,0.48),
      rgba(255,255,255,0.25)
    );

  border: 1px solid rgba(255,255,255,0.72);

  backdrop-filter: blur(24px) saturate(115%);
  -webkit-backdrop-filter: blur(24px) saturate(115%);

  box-shadow:
    inset 0 1px 0 rgba(255,255,255,0.82),
    inset 0 -1px 0 rgba(255,255,255,0.22),
    0 24px 70px rgba(98,55,32,0.10);
}
```

НЕ использовать плотный белый:

```css
background: #fff;
```

НЕ использовать:

```css
background: rgba(255,255,255,0.9);
```

---

# 7. ЖИВОЕ СТЕКЛО

Добавить очень слабое внутреннее тёплое свечение.

```css
.final-cta__panel::before {
  content: "";
  position: absolute;
  inset: 0;

  border-radius: inherit;

  background:
    radial-gradient(
      circle at 50% 0%,
      rgba(255, 157, 105, 0.10),
      transparent 55%
    );

  pointer-events: none;
}
```

Дополнительно:

```css
.final-cta__panel::after {
  content: "";
  position: absolute;
  inset: 1px;

  border-radius: inherit;

  background:
    linear-gradient(
      135deg,
      rgba(255,255,255,0.20),
      transparent 35%
    );

  pointer-events: none;
}
```

Это НЕ neon glow и НЕ яркое orange-свечение.

Это ощущение, что стекло слегка ловит окружающий тёплый свет.

---

# 8. ТОНКИЙ БОРДЕР

```css
border: 1px solid rgba(255,255,255,0.72);
```

Можно добавить небольшой верхний highlight.

Нельзя использовать:

```css
border: 2px solid orange;
```

Нельзя использовать яркий orange border.

Нельзя делать glass похожим на пластиковую карточку.

---

# 9. ТИПОГРАФИКА

Использовать существующий editorial serif шрифт проекта.

```css
.final-cta__title {
  position: relative;
  z-index: 2;

  max-width: 680px;

  margin: 0 auto;

  font-family: "Playfair Display", serif;

  font-size: clamp(42px, 5vw, 72px);

  line-height: 0.98;

  letter-spacing: -0.035em;

  text-align: center;

  color: #1D1B19;
}
```

Не использовать Inter, Arial, стандартный sans-serif или жирный SaaS-style heading.

---

# 10. ОСНОВНОЙ ТЕКСТ

```css
.final-cta__description {
  position: relative;
  z-index: 2;

  max-width: 620px;

  margin: 28px auto 0;

  font-family: "Helvetica Neue", sans-serif;

  font-size: 16px;

  line-height: 1.65;

  text-align: center;

  color: rgba(29,27,25,0.70);
}
```

Не делать текст чисто чёрным.
Не делать его белым.

---

# 11. CTA BUTTON

Использовать существующую систему `.btn-liquid`.

Не создавать новую систему кнопок.

```css
.final-cta .btn-liquid {
  position: relative;
  z-index: 2;

  margin-top: 36px;
}
```

Существующее мягкое orange glow можно оставить, но сделать умеренным.

Кнопка должна быть единственным действительно ярким оранжевым объектом внутри панели.

---

# 12. ВАЖНЫЙ ВИЗУАЛЬНЫЙ ПРИНЦИП

```text
        атмосферная фотография

      ┌─────────────────────┐
      │                     │
      │   Откройте новый    │
      │   рынок раньше      │
      │   других            │
      │                     │
      │     description     │
      │                     │
      │ [ Стать участником ]│
      │                     │
      └─────────────────────┘

        фотография продолжается
```

Glass должен ощущаться частью фотографии, а не карточкой, приклеенной поверх сайта.

---

# 13. ЧЕГО НЕ ДЕЛАТЬ

КАТЕГОРИЧЕСКИ НЕ ДЕЛАТЬ:
- bento-grid;
- floating cards;
- несколько glass cards;
- декоративные blob shapes;
- большие orange gradients;
- neon glow;
- excessive blur;
- glassmorphism как UI-стиль 2020-х;
- огромные drop shadows;
- абстрактные 3D сферы;
- иконки;
- статистику;
- дополнительные CTA;
- следующую экспедицию;
- стандартный SaaS CTA;
- шаблонный gradient background.

Это должен быть editorial luxury-блок.

---

# 14. RESPONSIVE

На desktop:
- фотография занимает всю секцию;
- glass panel примерно 760–820px;
- панель находится по центру;
- вокруг панели должно оставаться достаточно фотографии.

На tablet:

```css
padding: 64px 32px;
```

На mobile:

```css
.final-cta {
  min-height: auto;
  padding: 64px 16px;
}

.final-cta__panel {
  width: 100%;
  padding: 48px 24px;
  border-radius: 24px;
}
```

Заголовок:

```css
font-size: clamp(36px, 10vw, 48px);
```

Не превращать mobile-версию в обычную белую карточку.

Фоновая фотография должна оставаться видимой.

---

# 15. ИТОГОВЫЙ LOCK

Final CTA должен восприниматься как:

```text
EDITORIAL PHOTOGRAPH
        +
WARM ATMOSPHERE
        +
VERY LIGHT LIQUID GLASS
        +
DARK EDITORIAL TYPOGRAPHY
        +
ONE ORANGE CTA
```

А НЕ как:

```text
WHITE CARD
      +
GRADIENT
      +
TEXT
      +
BUTTON
```

Главная задача — создать ощущение дорогой физической поверхности, на которую попадает тёплый свет фотографии.

Стекло должно быть почти незаметным.

Если пользователь смотрит на блок и первым делом видит «glassmorphism effect» — эффект слишком сильный.

Если он видит атмосферную фотографию, красивую типографику и ощущение глубины — реализация правильная.
