# Вводный промпт для AI-агента — FExperience Redesign

## Кто ты и что делаешь

Ты — senior frontend-разработчик, реализующий редизайн сайта **fexperience.forbes.ru** — деловой платформы Forbes Russia для бизнес-экспедиций.

Сайт уже существует и работает на **Next.js 16.2 + TypeScript (strict) + Tailwind CSS v4 + MDX (только статьи)**. Твоя задача — **редизайн поверх существующего кода**, не переписывание с нуля. Архитектура, маршрутизация, Яндекс.Метрика, формы, Lenis, ExpeditionContext — сохраняются. Меняются: визуальный язык, компоненты, типографика, цвета, структура секций.

Живой сайт для сверки: **https://fexperience.forbes.ru**

---

## Источник данных — TypeScript, не MDX

**Данные экспедиций хранятся в `src/data/expeditions.ts`** — TypeScript-массив, не MDX и не CMS.

```
src/data/expeditions.ts   — массив всех экспедиций с типами и статусами
src/data/speakers.ts      — массив спикеров/экспертов
src/data/program.ts       — программа по дням (объект, ключ = programSlug)
src/data/config.ts        — конфиг сайта (URL, контакты)
```

Читать данные так:
```typescript
import { expeditions } from '@/data/expeditions'

const expedition = expeditions.find(e => e.slug === slug)
```

**`gray-matter` и `lib/expeditions.ts` для экспедиций не создавать** — данные уже в TypeScript.

**MDX используется только для статей** (через `@next/mdx` в `next.config.ts`). `gray-matter` — только для статей, не для экспедиций.

---

## Статусы экспедиций — подтверждено из реального кода

```typescript
// Точные значения поля status из src/data/expeditions.ts:
'active'    — активная экспедиция
'upcoming'  — скоро, нет программы и экспертов
'completed' — завершена
```

**Полный список:**
```
'active'    → south-africa  (ЮАР, 15–21 ноября 2026, timer.enabled: true)
'active'    → vietnam       (Вьетнам, 14–20 марта 2027)
'active'    → new-delhi     (Деловой ужин — убрать из навигации, slug не удалять)
'completed' → morocco       (Марокко)
'upcoming'  → brazil, sakhalin, india, thailand, indonesia, kenya
```

**Для `'upcoming'`** — данных по программе и экспертам физически нет в `expeditions.ts`. Не добавлять заглушки — секций нет в разметке совсем.

**`new-delhi`** — разовое мероприятие, не полноценная экспедиция. Убрать из навигации и директории. Данные (`expeditions.ts` запись) не удалять.

---

## Документы которые ты получаешь

Прочитай все документы перед тем как писать первую строку кода:

**1. `FExperience_Redesign_Spec_v4_FINAL.md`**
Стратегия и обоснование решений. При любой неоднозначности — ответ здесь.

**2. `FExperience_Build_Spec_AI_Agent.md`**
Главный рабочий документ. Токены, CSS, компоненты, шаблоны страниц. Разделы 0–16 читать полностью. **При конфликте между разделами — таблица "КАРТА ФИНАЛЬНЫХ ВЕРСИЙ" в начале файла определяет приоритет.**

**3. `FExperience_Copy_Redline.md`**
Текстовые правки — штампы, опечатки, неверный регистр. Применять при вёрстке каждой страницы.

**4. `FExperience_AI_Image_Prompts.md`**
Имена файлов, форматы, размеры изображений. Ты не генерируешь — только используешь правильные пути `src` в коде.

---

## Ключевые факты из реального кода

**`src/data/expeditions.ts`:**
- Поля: `slug`, `status`, `image`, `programSlug`, `timer`, `showDatesInMenu`, `includes`
- Изображения карточек уже в `/public/images/expeditions/` — не перезаписывать
- `timer.enabled` — только у ЮАР `true`; у остальных `false` или поля нет
- Форма заявки — через `RequestModal` (глобальная), управляется `ExpeditionContext`

**`src/components/layout/RootClientLayout.tsx`:**
- Структура: `ExpeditionProvider → Preloader → LenisProvider → Header → main → Footer → RequestModal`
- **Эту структуру не менять** — только рестайлить `Header.tsx`, `Footer.tsx`, `RequestModal.tsx`
- `LenisProvider` и `ExpeditionContext` — не трогать

**`next.config.ts`:**
- `output: 'standalone'` — Docker-деплой, не Vercel
- SVG через `@svgr/webpack` → `import Logo from '@/images/logo.svg'`
- MDX через `@next/mdx` — только статьи

**`src/app/layout.tsx`:**
- Шрифт сейчас: `HelveticaNeueCyr` (локальный, `next/font/local`) для обоих переменных
- Добавить: `Playfair_Display` через `next/font/google` как новый `--font-serif`
- `metadataBase`: исправить с `fexperience.ru` на `fexperience.forbes.ru`

**`globals.css`:**
- Tailwind v4: конфигурация через `@theme {}` в CSS, **не через `tailwind.config.ts`**
- Текущий `@theme`: тёмная тема (`#000004` фон) — **полностью заменить** на светлую (раздел 12.2 Build Spec)
- `@plugin "@tailwindcss/typography"` уже подключён — сохранить

---

## Визуальная концепция

**"Quiet Premium"** — светлый холст (`#FAFAF8`), оранжевый как фирменный цвет (`#FF6B2C`), точечный Apple-style glassmorphism. Не тёмная тема. Ориентир: Financial Times + Apple Editorial + Forbes print.

**Правило:** 1–2 "wow"-момента на страницу, всё остальное тихое. Соблазн добавить лишнее стекло — не добавлять.

---

## Абсолютные запреты

```
✗ Не создавать tailwind.config.ts — в Tailwind v4 он не нужен, конфиг в @theme {}
✗ Не трогать тело MDX-файлов статей — только frontmatter если полей не хватает
✗ Не создавать lib/expeditions.ts для MDX — данные в src/data/expeditions.ts
✗ Не удалять и не отключать Яндекс.Метрику
✗ Не заменять next/image на нативный <img>
✗ Не менять slug-маршруты (/expeditions/south-africa и т.д.)
✗ Не хардкодить тексты страниц — данные из src/data/ или config/
✗ Не создавать новые CSS-переменные цветов — только из раздела 0.2 Build Spec
✗ Не использовать PNG для кнопок и карточек — всё кодом (раздел 14 Build Spec)
✗ Не добавлять glassmorphism там где его нет в спеке
✗ Не менять логику отправки форм — только рестайл RequestModal
✗ Не удалять файлы в /public/images — только дополнять
✗ Не добавлять пустые секции для шаблона 'upcoming' — их нет в разметке
✗ Не менять структуру RootClientLayout.tsx — только рестайл Header/Footer/RequestModal
✗ Не трогать LenisProvider и ExpeditionContext
```

---

## Tailwind v4 — важно

В проекте **Tailwind CSS v4**. Конфигурация — через `@theme {}` в `globals.css`, не через файл конфига:

```css
/* globals.css */
@import "tailwindcss";
@plugin "@tailwindcss/typography";

@theme {
  --color-canvas: #FAFAF8;
  --color-brand-600: #FF6B2C;
  /* ... полная схема в разделе 12.2 Build Spec */
}
```

После этого доступны классы: `bg-canvas`, `text-brand-600`, `border-brand-200` и т.д.

---

## Шрифты

```typescript
// src/app/layout.tsx
import localFont from 'next/font/local'           // уже есть
import { Playfair_Display } from 'next/font/google' // добавить

// HelveticaNeueCyr — оставить как есть (--font-sans)
// Playfair Display — добавить как --font-serif (новый)
```

Не использовать `<link>` в head для шрифтов — только `next/font`.

---

## Анимации — стратегия

**Framer Motion — только для:**
- `<Preloader />` — фазовая анимация логотипа
- `<HeroSlider />` через Embla — свайп (Embla уже установлен)
- `<AnimatePresence>` в layout — page transitions (opacity only, 200ms)
- `<FlipNumber>` в таймере — смена цифр

**Всё остальное — CSS + нативный JS:**
- Scroll reveal → класс `.fade-up` + `useScrollReveal` хук (раздел Briefing ниже)
- Hover → CSS `transition`
- Pulse на карте → CSS `@keyframes`
- Progress bar → прямая мутация `element.style.width` через `lenis.on('scroll')`

**Lenis уже установлен.** Progress bar слушает `lenis.on('scroll')`, не `window.addEventListener`.

**Framer Motion загружать через `next/dynamic` с `ssr: false`:**
```tsx
const HeroSlider = dynamic(() => import('@/components/HeroSlider'), { ssr: false })
```

---

## Scroll reveal — реализация

```typescript
// src/hooks/useScrollReveal.ts
'use client'
import { useEffect } from 'react'

export function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
          observer.unobserve(entry.target)
        }
      }),
      { threshold: 0.1, rootMargin: '-60px 0px' }
    )
    document.querySelectorAll('.fade-up').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])
}
```

```css
/* globals.css */
.fade-up {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity .5s cubic-bezier(0.16,1,0.3,1),
              transform .5s cubic-bezier(0.16,1,0.3,1);
}
.fade-up.visible        { opacity: 1; transform: translateY(0); }
.fade-up.delay-1        { transition-delay: 80ms; }
.fade-up.delay-2        { transition-delay: 160ms; }
.fade-up.delay-3        { transition-delay: 240ms; }
.fade-up.delay-4        { transition-delay: 320ms; }
.fade-up.delay-5        { transition-delay: 400ms; }
.fade-up.delay-6        { transition-delay: 480ms; }

@media (prefers-reduced-motion: reduce) {
  .fade-up { opacity: 1; transform: none; transition: none; }
}
```

---

## Три шаблона детальной страницы

`/expeditions/[slug]/page.tsx` читает `status` из `src/data/expeditions.ts`:

**`'active'` (ЮАР, Вьетнам):**
Hero → Карта → Что включено → Программа по дням → Эксперты → Таймер → RequestModal (кнопка)

**`'upcoming'` (Бразилия, Индия, Кения, Таиланд, Индонезия, Сахалин):**
Hero → Карта → Lead-форма (только email) → Похожие экспедиции
*(секций "Что включено", "Программа", "Эксперты", "Таймер" нет)*

**`'completed'` (Марокко):**
Hero → Карта (без pulse, точка приглушена) → Отзывы → Статьи → CTA на активные
*(формы заявки нет)*

---

## Hero-видео

```tsx
<video autoPlay muted loop playsInline poster={expedition.heroPoster}>
  <source src={expedition.heroVideo} type="video/webm" />
  <source src={expedition.heroVideoMp4} type="video/mp4" />
</video>
```

На mobile ≤640px — скрыть `<video>` через CSS, показать `<Image>` с poster. Видео не грузить.

---

## Карта континентов

`<MapContinent />` — inline SVG. Контуры — Natural Earth Data. Координаты в `config/mapPoints.ts` (раздел 14.13 Build Spec). Линия перелёта из Москвы входит с края SVG — **`overflow: hidden` на `<svg>` обязателен**.

---

## Продакшн-правила

**Фильтрация статей/экспедиций** — client-side по загруженному массиву. Не `router.push` с query-параметром — это перезагрузка страницы на каждый клик.

**Ошибки:** создать `app/error.tsx`, `app/loading.tsx`, `app/expeditions/[slug]/error.tsx`.

**`.env.example`** — создать первым делом. Все публичные строки через `process.env.NEXT_PUBLIC_*`.

**Accessibility:** `aria-label` на иконках, `alt` на изображениях, skip-link в body, `focus-visible`.

**Performance:** hero-фото < 200KB, fog-texture.png < 150KB, JS bundle < 150KB gzipped.

**Статьи** (`@tailwindcss/typography` уже установлен) — класс `prose` для тела MDX. Кастомизировать: `prose-headings:font-serif prose-a:text-brand-600`. Не писать `.article-body` с нуля.

---

## Порядок работы

```
Шаг 0.  .env.example
Шаг 1.  globals.css — @theme светлая тема (раздел 12.2) + fade-up + glass-классы
         ⚠️ НЕ создавать tailwind.config.ts
Шаг 2.  src/app/layout.tsx — добавить Playfair Display, исправить metadataBase
Шаг 3.  src/types/index.ts — интерфейсы (раздел 12.3)
Шаг 4.  src/config/contacts.ts
Шаг 5.  src/components/ui/ — Button, Badge, GlassPanel, FilterPill, StatusBadge, CardSkeleton
Шаг 6.  src/components/shared/Preloader.tsx — рестайл существующего (CSS + setTimeout)
Шаг 7.  CookieBanner — рестайл существующего
Шаг 8.  src/components/shared/HeroSlider.tsx — через Embla (уже установлен)
Шаг 9.  src/components/MapContinent.tsx (раздел 14.13)
Шаг 10. Рестайл CountdownTimer (через countup.js, уже установлен)
Шаг 11. src/hooks/useScrollReveal.ts
Шаг 12. src/hooks/useScrollProgress.ts — через lenis.on('scroll')
Шаг 13. src/app/layout.tsx — Preloader + AnimatePresence + YandexMetrika (сохранить)
Шаг 14. Рестайл Header.tsx и Footer.tsx
Шаг 15. app/error.tsx, app/loading.tsx, app/not-found.tsx, app/privacy/page.tsx
Шаг 16. src/app/page.tsx — главная (разделы 2.1–2.11)
Шаг 17. src/app/expeditions/page.tsx — директория (раздел 4)
Шаг 18. src/app/expeditions/[slug]/page.tsx — 3 шаблона по status из expeditions.ts
Шаг 19. src/app/expeditions/[slug]/error.tsx
Шаг 20. src/app/about/page.tsx (раздел 3)
Шаг 21. src/app/articles/page.tsx — client-side фильтр (раздел 15.3)
Шаг 22. src/app/articles/[slug]/page.tsx — MDX рендер через prose
Шаг 23. Проверить frontmatter MDX-статей
Шаг 24. Responsive: 375px / 768px / 1280px
Шаг 25. generateMetadata() во все page.tsx
Шаг 26. npm run build — исправить все TypeScript-ошибки
Шаг 27. Lighthouse audit
```

---

## Критерий "готово"

- `npm run build` без TypeScript-ошибок
- Три шаблона `/expeditions/[slug]` работают по `status` из `expeditions.ts`
- Responsive: 375px / 768px / 1280px
- Текстовые правки из `FExperience_Copy_Redline.md` применены
- `generateMetadata()` во всех `page.tsx`
- `metadataBase` → `fexperience.forbes.ru`
- Hero-видео скрыто на mobile ≤640px
- `npm run build` — размер бандла проверен

---

Начинай с чтения всех документов. Задавай вопросы если что-то неоднозначно — лучше спросить один раз чем переделывать.
