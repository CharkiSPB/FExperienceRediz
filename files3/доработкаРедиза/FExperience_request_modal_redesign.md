# FExperience — RequestModal (форма заявки): инструкция AI-агенту

## 0. Задача

Рестайл существующего `src/components/shared/RequestModal.tsx` под макет:
полноэкранное модальное окно из двух половин — слева фото-панель
выбранной экспедиции с заголовком, печатью и панелью преимуществ,
справа тёмная форма заявки. Логику НЕ переписывать: react-hook-form + zod,
nodemailer, динамический select из `src/data`, преселект через
`ExpeditionContext`, состояния loading/success/error (спека 11.2) —
сохраняются полностью.

Палитра: правая панель — `--color-paper-dark` (#272421), не #000;
текст светлый #FFF6EE / rgba(255,246,238,.6); orange `--color-brand-600`
(на тёмном допустим `--color-brand-500` для мелкого оранжевого текста).

## 1. Тексты — зафиксированы (посимвольно из макета)

Левая панель:
- Eyebrow: `СТАТЬ УЧАСТНИКОМ`
- Заголовок: `Присоединяйтесь к бизнес-экспедициям FExperience`
  (`FExperience` — orange)
- Подстрока: `Оставьте заявку — мы свяжемся с вами и подберем экспедицию под ваши цели.`
- Панель преимуществ (4 пункта, иконка + титул + описание):
  1. `Новые рынки` — `Выход на перспективные рынки и регионы` (Globe)
  2. `Сильное окружение` — `Предприниматели, эксперты, инвесторы` (Users)
  3. `Стратегические решения` — `Идеи и партнерства для роста бизнеса` (Compass)
  4. `Практический результат` — `Конкретные шаги по итогам экспедиции` (TrendingUp)

Правая панель:
- H2 desktop: `Стать участником` + короткая оранжевая линия под ним
- Лейблы полей (обязательные — с orange `*`):
  `Бизнес-экспедиция` / `Ваше имя` / `Телефон` / `E-mail`
- Плейсхолдеры: `Выберите экспедицию` / `Иван Иванов` /
  `+7 (___) ___ __ __` / `example@mail.ru`
- Чекбокс: `Я согласен с политикой обработки персональных данных`
  (ссылка на `/privacy` — оранжевая)
- Кнопка: `Оставить заявку`
- Низ: `Мы гарантируем конфиденциальность ваших данных и не передаем их третьим лицам`

## 2. Композиция desktop (≥768px)

```css
.request-modal {
  position: fixed; inset: 0; z-index: 200;
  display: grid;
  grid-template-columns: 1fr 1fr;
  background: var(--color-paper-dark);
}
.request-modal__media {
  position: relative;
  overflow: hidden;
}
.request-modal__media img {
  position: absolute; inset: 0;
  width: 100%; height: 100%;
  object-fit: cover;
  transition: opacity .3s var(--ease);   /* crossfade при смене экспедиции */
}
.request-modal__media-overlay {
  position: absolute; inset: 0;
  background: linear-gradient(
    180deg,
    rgba(26,26,26,.30) 0%,
    rgba(26,26,26,.62) 100%
  );
}
```

### Левая панель (сверху вниз)
- Лого Forbes FExperience (белое) — top-left, 24px отступы.
- Eyebrow `СТАТЬ УЧАСТНИКОМ` — brand-500, 12px, uppercase, ls .1em.
- Заголовок — Playfair 600 clamp(28px, 2.6vw, 40px)/1.2, #FFF6EE;
  `FExperience` — brand-500.
- Подстрока — 15px/1.6 rgba(255,246,238,.72), max-width 380px.
- Контент прижат к верхней трети; панель преимуществ — внизу.
- Печать: стандарт фирмы, СВЕТЛАЯ версия под тёмный фон:
  - 132px; `position: absolute; right: 40px; top: 38%;`
  - круг и текст по окружности `rgba(255,246,238,.55)`:
    `FORBES FEXPERIENCE · FORBES FEXPERIENCE · FORBES FEXPERIENCE ·`
    (ровно три повтора, круг замкнут);
  - центр: `F`, Playfair 700, `var(--color-brand-500)`;
  - без заливки, glow, теней, rotation.

### Панель преимуществ (низ левой панели)
```css
.request-modal__benefits {
  position: absolute; left: 24px; right: 24px; bottom: 24px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  padding: 20px 24px;
  background: rgba(20,16,13,.55);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-radius: 16px;
}
.request-modal__benefit svg {
  width: 24px; height: 24px;
  stroke-width: 1.5; fill: none;
  color: var(--color-brand-500);
}
.request-modal__benefit-title {
  margin-top: 12px;
  font: 600 13px/1.3 HelveticaNeueCyr;
  color: #FFF6EE;
}
.request-modal__benefit-desc {
  margin-top: 6px;
  font: 400 11.5px/1.45 HelveticaNeueCyr;
  color: rgba(255,246,238,.6);
}
```

### Правая панель — форма
```css
.request-modal__form-panel {
  position: relative;
  background: var(--color-paper-dark);   /* #272421 */
  padding: 64px 72px 48px;
  overflow-y: auto;
}
.request-modal__close {
  position: absolute; top: 24px; right: 24px;
  width: 44px; height: 44px;
  color: rgba(255,246,238,.7);
}
.request-modal__title {
  font: 600 clamp(28px, 2.4vw, 38px)/1.2 var(--font-display);
  color: #FFF6EE;
}
.request-modal__title-line {
  width: 40px; height: 2px;
  background: var(--color-brand-600);
  margin-top: 16px;
}
/* Строка поля: лейбл слева, контрол справа */
.request-field {
  display: grid;
  grid-template-columns: 150px 1fr;
  gap: 24px;
  align-items: center;
  margin-top: 28px;
}
.request-field__label {
  font: 500 14px HelveticaNeueCyr;
  color: rgba(255,246,238,.85);
}
.request-field__label .req { color: var(--color-brand-500); margin-right: 6px; }
.request-input,
.request-select {
  width: 100%;
  height: 52px;
  padding: 0 16px;
  background: rgba(255,255,255,.06);
  border: 1px solid rgba(255,255,255,.14);
  border-radius: 10px;
  color: #FFF6EE;
  font: 400 15px HelveticaNeueCyr;
  transition: border-color .2s, box-shadow .2s;
}
.request-input::placeholder { color: rgba(255,246,238,.35); }
.request-input:focus,
.request-select:focus {
  outline: none;
  border-color: var(--color-brand-600);
  box-shadow: 0 0 0 3px rgba(255,107,44,.18);
}
.request-select {
  appearance: none;   /* кастомный ChevronDown справа, rgba(255,246,238,.6) */
}
.request-select option { color: #1A1A1A; }   /* нативный дропдаун читаемый */
```

### Чекбокс, кнопка, конфиденциальность
```css
.request-consent {
  display: flex; align-items: flex-start; gap: 10px;
  margin-top: 28px;
  font: 400 13px/1.5 HelveticaNeueCyr;
  color: rgba(255,246,238,.75);
}
.request-consent a { color: var(--color-brand-500); }
.request-consent input {
  width: 18px; height: 18px; flex-shrink: 0; margin-top: 2px;
  accent-color: var(--color-brand-600);
}
.request-submit {
  width: 100%;
  height: 52px;
  margin-top: 28px;
  border: 0;
  border-radius: 10px;              /* прямоугольник со скруглением, НЕ пилюля */
  background: var(--color-brand-600);
  color: #fff;
  font: 600 15px/1 HelveticaNeueCyr;
  transition: background .2s, transform .2s;
}
.request-submit:hover { background: var(--color-brand-500); }
.request-privacy-note {
  display: flex; align-items: flex-start; gap: 12px;
  margin-top: 40px;
  font: 400 13px/1.5 HelveticaNeueCyr;
  color: rgba(255,246,238,.55);
}
.request-privacy-note svg {
  width: 20px; height: 20px; flex-shrink: 0;
  stroke-width: 1.5; fill: none;
  color: rgba(255,246,238,.5);      /* Shield */
}
```

## 3. Динамика и состояния

- Select — динамический из `src/data` (active-экспедиции, формат опции
  по спеке 10.7); преселект — экспедиция текущей страницы или ближайшая.
- Фото левой панели = `expedition.image` ВЫБРАННОЙ в select экспедиции;
  при смене значения — crossfade 300ms. Не хардкодить фото.
- Состояния формы — по спеке 11.2: loading (spinner + `Отправляем...`,
  поля заблокированы), success (inline-замена формы: галочка,
  `Заявка отправлена`, текст, btn-text «Перейти в раздел Статьи →»),
  error (строка под кнопкой, кнопка активна).
- Закрытие: крестик, Esc; body scroll lock и focus trap — существующие.
- Появление: overlay opacity 0→1 250ms + контент translateY(12px)→0.

## 4. Mobile (≤767px)

- Левая панель СКРЫТА целиком (фото, лого, eyebrow, подстрока, преимущества).
- В форм-панели вместо H2 `Стать участником`:
  - печать уменьшенная 72px — вверху панели справа (под крестиком);
  - заголовок `Присоединяйтесь к бизнес-экспедициям FExperience`
    (Playfair 600 26px, `FExperience` — orange) + оранжевая линия;
  - далее форма как есть.
- Строки полей: `grid-template-columns: 1fr` (лейбл над контролом).
- Padding панели 32px 24px; кнопка full-width сохраняется.

## 5. Что сохранить / не трогать

- Логику `RequestModal.tsx`: react-hook-form + zod, nodemailer endpoint,
  `ExpeditionContext`, преселект, focus trap, scroll lock.
- Глобальные кнопки страниц (btn-liquid и др.) — модалка имеет собственную
  кнопку-прямоугольник, глобальные стили кнопок не менять.
- Header/Footer, соседние блоки страниц.

## 6. Что запрещено

- Переписывать тексты раздела 1; добавлять новые поля формы.
- Переписывать логику отправки / endpoint / валидацию.
- Светлая/стеклянная панель формы вместо тёмной (модалка — тёмный слой).
- Кнопка-пилюля вместо прямоугольника radius 10px; текст кнопки ≠
  `Оставить заявку`.
- Печать с другим текстом, монограмма `FX`, тёмная печать на тёмном фоне
  (на фото — светлая версия), glow/заливка.
- Статичное фото левой панели (фото обязано следовать select).
- H2 `Стать участником` на mobile (заменяется заголовком присоединения).
- Панель преимуществ на mobile.
- Изменения соседних компонентов и глобальных стилей.

## 7. Критерии готовности

Модалка читается как дорогой разворот: слева cinematic-фото выбранной
экспедиции с заголовком присоединения, светлой печатью и панелью четырёх
преимуществ; справа — тёмная форма с ровными строками «лейбл — контрол»,
полноширинной оранжевой кнопкой `Оставить заявку` и нотой о
конфиденциальности. Смена экспедиции в select меняет фото слева.
На mobile — только форма с печатью и заголовком присоединения.

## 8. Checklist

- [ ] Две половины 50/50; левая — фото выбранной экспедиции + оверлей
- [ ] Лого, eyebrow `СТАТЬ УЧАСТНИКОМ`, заголовок и подстрока посимвольно
- [ ] Печать 132px светлая: круг+текст rgba(255,246,238,.55), три повтора
      `FORBES FEXPERIENCE ·`, центр `F` orange
- [ ] Панель преимуществ: 4 пункта посимвольно, иконки Globe/Users/Compass/
      TrendingUp, тёмное полупрозрачное стекло radius 16px
- [ ] Справа: H2 `Стать участником` + оранжевая линия; крестик 44px
- [ ] Строки полей: лейбл слева 150px + контрол; инпуты тёмные radius 10px
- [ ] Select динамический из данных, преселект; фото слева следует select
- [ ] Чекбокс + ссылка `/privacy`; кнопка `Оставить заявку` full-width,
      radius 10px
- [ ] Нота конфиденциальности с Shield посимвольно
- [ ] Состояния loading/success/error по спеке 11.2
- [ ] ≤767px: левая скрыта; печать 72px + заголовок присоединения вместо
      H2 `Стать участником`; лейблы над контролами
- [ ] Логика формы не переписана; focus trap и scroll lock работают
- [ ] Соседние компоненты и глобальные стили не изменены