# REGION BLOCK V2 — EDITORIAL MAPS RESTYLE

## Цель

Улучшить блок **«Выберите регион»**, не меняя структуру 2×2 и не добавляя шаблонные AI-элементы.

Сохранить:
- 4 карточки;
- реальные SVG-контуры;
- оранжевые точки экспедиций;
- светлый фон сайта.

Изменить:
- композицию;
- выразительность карт;
- точки;
- стекло;
- типографическую иерархию.

---

## Что НЕ делать

Запрещено:

- bento;
- иконки;
- большие стрелки;
- маршруты;
- neon glow;
- сильный glassmorphism;
- одинаковые карты одинакового масштаба;
- одинаковые композиции.

---

## Принцип

Не:

```text
карточка → внутри лежит карта
```

А:

```text
карта = главный объект
типографика = поддерживает карту
```

---

## Структура карточки

```text
┌────────────────────┐
│ 01            SVG  │
│                    │
│ Африка             │
│ 3 направления      │
│ Смотреть →         │
└────────────────────┘
```

---

## Стекло

```css
.region-card{
  background:
    linear-gradient(
      135deg,
      rgba(255,255,255,.62),
      rgba(255,248,243,.34)
    );

  border:1px solid rgba(255,255,255,.78);

  backdrop-filter:blur(12px);

  box-shadow:
    0 14px 40px rgba(87,54,34,.045);
}
```

Стекло почти незаметное.

---

## SVG

Использовать:

```text
/public/maps/
africa.svg
asia.svg
latam.svg
russia.svg
```

---

## Цвет карт

Не:

```css
fill:#999;
```

Использовать:

```css
--map-color:#8f8b87;
```

```css
.region-map{
  fill:var(--map-color);
  opacity:.92;
}
```

Россия:

```css
.russia-map{
  opacity:.72;
}
```

---

## Индивидуальная композиция

### Африка

```css
scale:1.15;
top:-10px;
right:20px;
```

---

### Азия

```css
scale:1.08;
right:10px;
```

---

### Латинская Америка

```css
scale:1.12;
right:35px;
top:-20px;
```

---

### Россия

```css
width:78%;
opacity:.72;
```

Карты не должны выглядеть одинаково.

---

## Точки экспедиций

```css
.region-point{
  width:7px;
  height:7px;

  background:#ff6428;

  border-radius:50%;

  box-shadow:
    0 0 0 4px rgba(255,100,40,.10),
    0 0 18px rgba(255,100,40,.18);
}
```

---

## Hover точек

```css
.region-point::after{
  content:"";
  position:absolute;
  inset:-5px;

  border:1px solid rgba(255,100,40,.28);

  border-radius:50%;
}
```

Очень слабый эффект.

---

## Типографика

```html
<span class="region-index">01</span>

<h3>Африка</h3>

<p>3 направления</p>

<span class="region-link">
Смотреть →
</span>
```

---

## Номер

```css
.region-index{
  font-size:11px;
  letter-spacing:.12em;
  color:rgba(29,27,25,.38);
}
```

---

## Заголовок

```css
.region-title{
  font-family:"Playfair Display", serif;
  color:#1D1B19;
}
```

---

## Ссылка

Не кнопка.

```css
.region-link{
  font-size:14px;
  color:rgba(29,27,25,.7);
}
```

---

## Финальный принцип

Блок должен восприниматься как:

```text
ГЕОГРАФИЯ
+
ЭКСПЕДИЦИИ
+
РЕАЛЬНЫЕ РЫНКИ
+
EDITORIAL ДИЗАЙН
```

А не как:

```text
4 одинаковые карточки UI
```
