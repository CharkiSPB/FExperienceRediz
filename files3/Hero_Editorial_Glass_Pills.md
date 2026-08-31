# HERO — Editorial Glass Pills v1
## Точечная замена трёх тезисов в Hero-блоке

> **Задача:** переработать только три верхних тезиса Hero-блока.  
> Не менять фотографию, главный заголовок, левую панель, навигацию, дату, стрелки и общую композицию Hero.
>
> Три тезиса являются содержательно важными преимуществами экспедиции. Они не должны выглядеть как вторичная навигация или набор обычных UI-кнопок.

---

## 1. Текущая проблема

Сейчас три элемента выглядят как обычные прозрачные pills:

- «Медийное сопровождение»
- «Бизнес-сессии, нетворкинг»
- «Культурные мероприятия»

На фотографии они слишком легко теряются.

Причина:

1. слишком слабый контраст с изображением;
2. слишком мало визуального веса;
3. они воспринимаются как технические chips/tags;
4. нет ощущения редакционного элемента;
5. они не связаны визуально с фирменным оранжевым акцентом.

**Не решать проблему простым увеличением размера или превращением элементов в большие карточки.**

Цель — сохранить минимализм Hero, но сделать три тезиса заметными и характерными.

---

# 2. Новая концепция

## Editorial Glass Labels

Три pills превратить в **три editorial glass labels**, объединённые общей тонкой горизонтальной линией.

Они должны выглядеть скорее как небольшой элемент журнальной верстки поверх фотографии, чем как интерфейс SaaS-продукта.

Структура:

```text
01  МЕДИЙНОЕ СОПРОВОЖДЕНИЕ   │   02  БИЗНЕС-СЕССИИ, НЕТВОРКИНГ   │   03  КУЛЬТУРНЫЕ МЕРОПРИЯТИЯ
```

При этом не делать три отдельных крупных карточки.

---

# 3. HTML / JSX-структура

Использовать существующий контейнер Hero и заменить только внутреннюю разметку текущих pills.

Пример:

```jsx
<div className="hero-editorial-pills">
  <div className="hero-editorial-pill">
    <span className="hero-editorial-pill__index">01</span>
    <span className="hero-editorial-pill__dot" />
    <span className="hero-editorial-pill__text">
      Медийное сопровождение
    </span>
  </div>

  <div className="hero-editorial-divider" />

  <div className="hero-editorial-pill">
    <span className="hero-editorial-pill__index">02</span>
    <span className="hero-editorial-pill__dot" />
    <span className="hero-editorial-pill__text">
      Бизнес-сессии, нетворкинг
    </span>
  </div>

  <div className="hero-editorial-divider" />

  <div className="hero-editorial-pill">
    <span className="hero-editorial-pill__index">03</span>
    <span className="hero-editorial-pill__dot" />
    <span className="hero-editorial-pill__text">
      Культурные мероприятия
    </span>
  </div>
</div>
```

Если проект использует другой framework, сохранить ту же структуру и семантику.

---

# 4. Визуальный контейнер

Три элемента должны находиться в единой группе:

```css
.hero-editorial-pills {
  display: flex;
  align-items: center;
  width: fit-content;
  max-width: calc(100% - 48px);

  padding: 6px 8px;

  border: 1px solid rgba(255, 255, 255, 0.30);
  border-radius: 999px;

  background: rgba(18, 18, 18, 0.20);

  backdrop-filter: blur(18px) saturate(115%);
  -webkit-backdrop-filter: blur(18px) saturate(115%);

  box-shadow:
    0 8px 30px rgba(0, 0, 0, 0.10),
    inset 0 1px 0 rgba(255, 255, 255, 0.14);
}
```

### Важно

Это не должно выглядеть как тёмная плашка.

Фон должен оставаться **полупрозрачным**, чтобы фотография продолжала просматриваться через стекло.

Не использовать:

```css
background: #111;
```

Не использовать:

```css
background: rgba(0, 0, 0, 0.65);
```

Не использовать сильный blur, который превращает фотографию за элементом в мутное пятно.

---

# 5. Внутренние labels

```css
.hero-editorial-pill {
  display: inline-flex;
  align-items: center;
  gap: 8px;

  min-height: 30px;
  padding: 5px 10px;

  white-space: nowrap;
}
```

Текст:

```css
.hero-editorial-pill__text {
  font-size: 12px;
  line-height: 1;
  font-weight: 500;
  letter-spacing: -0.01em;

  color: rgba(255, 255, 255, 0.94);
}
```

Не делать текст крупным.

Его задача — быть хорошо читаемым, но не конкурировать с огромным заголовком Hero.

---

# 6. Нумерация

Номера `01 / 02 / 03` должны создать редакционный характер.

```css
.hero-editorial-pill__index {
  font-size: 9px;
  line-height: 1;

  font-weight: 600;
  letter-spacing: 0.10em;

  color: rgba(255, 255, 255, 0.56);
}
```

Номер должен быть визуально второстепенным.

Не делать номера оранжевыми.

---

# 7. Фирменная оранжевая точка

Добавить маленький orange indicator между номером и текстом:

```css
.hero-editorial-pill__dot {
  width: 5px;
  height: 5px;

  flex: 0 0 5px;

  border-radius: 50%;

  background: #FF6A2A;

  box-shadow:
    0 0 10px rgba(255, 106, 42, 0.42);
}
```

Это единственный яркий акцент внутри группы.

### Почему

Оранжевый должен работать как **сигнал**, а не как заливка.

Не делать:

```css
background: #FF6A2A;
```

для всего pill.

Не делать оранжевый текст всех трёх тезисов.

Не делать оранжевые borders.

---

# 8. Разделители

Между тремя тезисами использовать очень тонкие вертикальные разделители.

```css
.hero-editorial-divider {
  width: 1px;
  height: 18px;

  background: rgba(255, 255, 255, 0.20);

  flex: 0 0 1px;
}
```

Разделители должны быть почти незаметными.

Их задача — структурировать группу, а не рисовать декоративную сетку.

---

# 9. Верхняя светлая грань стекла

Чтобы стекло выглядело физическим, а не просто прозрачным фоном:

```css
.hero-editorial-pills::before {
  content: "";

  position: absolute;
  inset: 0;

  border-radius: inherit;

  pointer-events: none;

  background:
    linear-gradient(
      180deg,
      rgba(255,255,255,0.12) 0%,
      rgba(255,255,255,0.00) 42%
    );
}
```

У контейнера:

```css
.hero-editorial-pills {
  position: relative;
  overflow: hidden;
}
```

Эффект должен быть едва заметным.

Это **не glossy UI** и не «мокрое стекло».

---

# 10. Положение в Hero

Не прижимать группу к верхнему краю фотографии.

Оставить достаточно воздуха между pills и главным заголовком.

Рекомендуемая логика:

```text
верх фотографии

       [ 01 ● ... | 02 ● ... | 03 ● ... ]

                 ↓ воздух

          ЭКСПЕДИЦИЯ
             В ЮАР

                 ↓
             фотография
```

Группа должна восприниматься как **вводная информация к экспедиции**, а не как навигационная панель.

---

# 11. Не конкурировать с главным заголовком

Главный заголовок Hero остаётся самым сильным элементом правой части.

Приоритет:

```text
1. Главный заголовок
2. Фотография / место
3. Три тезиса
4. Остальные элементы
```

Поэтому:

- не увеличивать pills до размера карточек;
- не делать их слишком яркими;
- не использовать крупный bold;
- не добавлять большие иконки;
- не использовать emoji;
- не добавлять тени вокруг каждого отдельного элемента.

---

# 12. Hover

Hover допустим, но крайне спокойный.

```css
.hero-editorial-pill {
  transition:
    background-color 180ms ease,
    border-color 180ms ease;
}

.hero-editorial-pill:hover {
  background: rgba(255, 255, 255, 0.07);
}
```

Не делать:

- масштабирование;
- прыжок элемента;
- яркое оранжевое свечение;
- сильный glow;
- вращение;
- morphing.

Это не интерактивные кнопки.

---

# 13. Responsive

На мобильном не пытаться сохранить длинную горизонтальную строку любой ценой.

При ширине до `768px`:

```css
.hero-editorial-pills {
  width: auto;
  max-width: calc(100% - 32px);

  overflow-x: auto;

  scrollbar-width: none;
}

.hero-editorial-pills::-webkit-scrollbar {
  display: none;
}

.hero-editorial-pill {
  flex: 0 0 auto;
}
```

Если текущая мобильная версия Hero не позволяет горизонтальный scroll, допустимо перейти к двум строкам, но **не превращать каждый тезис в отдельную карточку**.

---

# 14. Что запрещено

Агент НЕ должен:

- превращать три тезиса в Bento Grid;
- превращать их в три большие карточки;
- добавлять иконки;
- использовать стандартный Tailwind/SaaS chip style;
- делать толстую белую рамку;
- делать сильный чёрный overlay;
- делать яркое оранжевое стекло;
- добавлять сильный glow;
- использовать одинаковые карточки с одинаковыми тенями;
- менять Hero-композицию;
- менять главный заголовок;
- менять фотографию;
- добавлять дополнительные тезисы.

---

# 15. Критерий результата

После изменения пользователь должен сразу понимать:

**«Это три важных составляющих экспедиции»**

а не:

**«Это три кнопки / фильтра / тега».**

При этом Hero должен сохранить ощущение:

- дорогого editorial-дизайна;
- Forbes-like журнальной композиции;
- живой фотографии;
- физического стекла;
- редкого фирменного orange accent;
- минимализма;
- индивидуального арт-дирекшена.

Главное правило:

> **Не делать красивый UI. Сделать красивую редакционную подпись поверх фотографии.**

---

# 16. Финальный CSS-блок

Если существующая архитектура позволяет, базовую реализацию можно начать с этого блока:

```css
.hero-editorial-pills {
  position: relative;
  display: flex;
  align-items: center;
  width: fit-content;
  max-width: calc(100% - 48px);

  padding: 6px 8px;

  border: 1px solid rgba(255, 255, 255, 0.30);
  border-radius: 999px;

  background: rgba(18, 18, 18, 0.20);

  backdrop-filter: blur(18px) saturate(115%);
  -webkit-backdrop-filter: blur(18px) saturate(115%);

  box-shadow:
    0 8px 30px rgba(0, 0, 0, 0.10),
    inset 0 1px 0 rgba(255, 255, 255, 0.14);

  overflow: hidden;
}

.hero-editorial-pills::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  pointer-events: none;

  background:
    linear-gradient(
      180deg,
      rgba(255, 255, 255, 0.12) 0%,
      rgba(255, 255, 255, 0.00) 42%
    );
}

.hero-editorial-pill {
  position: relative;
  z-index: 1;

  display: inline-flex;
  align-items: center;
  gap: 8px;

  min-height: 30px;
  padding: 5px 10px;

  white-space: nowrap;

  transition:
    background-color 180ms ease,
    border-color 180ms ease;
}

.hero-editorial-pill:hover {
  background: rgba(255, 255, 255, 0.07);
}

.hero-editorial-pill__index {
  font-size: 9px;
  line-height: 1;
  font-weight: 600;
  letter-spacing: 0.10em;
  color: rgba(255, 255, 255, 0.56);
}

.hero-editorial-pill__dot {
  width: 5px;
  height: 5px;
  flex: 0 0 5px;

  border-radius: 50%;

  background: #FF6A2A;

  box-shadow:
    0 0 10px rgba(255, 106, 42, 0.42);
}

.hero-editorial-pill__text {
  font-size: 12px;
  line-height: 1;
  font-weight: 500;
  letter-spacing: -0.01em;
  color: rgba(255, 255, 255, 0.94);
}

.hero-editorial-divider {
  position: relative;
  z-index: 1;

  width: 1px;
  height: 18px;
  flex: 0 0 1px;

  background: rgba(255, 255, 255, 0.20);
}

@media (max-width: 768px) {
  .hero-editorial-pills {
    width: auto;
    max-width: calc(100% - 32px);

    overflow-x: auto;
    scrollbar-width: none;
  }

  .hero-editorial-pills::-webkit-scrollbar {
    display: none;
  }

  .hero-editorial-pill {
    flex: 0 0 auto;
  }
}
```

**Важно:** этот код предназначен именно для существующего Hero. Не создавать новый отдельный компонент страницы и не перестраивать Hero целиком. Заменить только визуальный слой трёх существующих тезисов.
