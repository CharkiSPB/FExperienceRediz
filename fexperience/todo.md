# Редизайн FExperience — чек-лист «Quiet Premium»

> Спеки: `files3/FExperience_Redesign_Spec_v4_FINAL_CLEAN.md` (стратегия) + `files3/FExperience_Build_Spec_AI_Agent_FINAL_CLEAN.md` (значения для вёрстки, раздел 14+ приоритетнее). Подход: светлый тёплый холст `#FFF8F3`, оранжевый 25–35% дизайна, Playfair Display + HelveticaNeueCyr, editorial-композиции вместо bento/одинаковых карточек, нет массового `translateY`. После Hero всё пересобрано по финальным спекам. Пометки: `[x]` — готово, `[ ]` — в работе/ожидает проверки.

## 1–7. Фундамент и оформление
- [x] Глобальная светлая тема: палитра `canvas/surface/elevated`, текст, бренд-оранжевый, радиусы, тени, blur (globals.css)
- [x] Локальные шрифты: Playfair Display (`--font-display`) + HelveticaNeueCyr (`--font-sans`)
- [x] Общие CSS-решения: `glass-01/02/signature`, кнопки `btn-liquid`/`btn-outline`
- [x] CookieBanner — создан и подключён в RootClientLayout; старый cookie-блок удалён из Hero
- [x] Header — рестайл: светлый липкий, `.glass-01` после скролла, оверлейное мобильное меню, CTA «Стать участником»/«Стать партнёром», Telegram `t.me/Milena_Amor`

## 2.1. Hero — готово
- [x] Embla-слайдер: видео (desktop) / постер (mobile), даты, CTA-ссылки «Стать участником» + «Подробнее» (два независимых элемента), стрелки, dots
- [x] Лесенка заголовка: «Бизнес —» на стекле (чёрный), «экспедиция» + страна на видеофоне (белый)
- [x] Строка страны — отдельные блоки под каждый slug (`hero-slide__title-country--{slug}`), смещение `margin-left` регулируется индивидуально для каждой экспедиции и брейкпоинта
- [x] «во Вьетнам» — в одну строку (nowrap + инд. font-size): `.9em` desktop / `.72em` tablet / `.55em` mobile
- [x] Вертикальное «с Forbes» — крупнее и жирнее (`clamp(17px, 1.55vw, 28px)`, вес 700)
- [x] Слайд Индии (временный): «Деловой» на стекле чёрный, «ужин с Forbes» на видео белый
- [x] Стекло hero: без бордеров/outline/inset-бликов, прозрачность `rgba(255,255,255,.05)`, blur 14px
- [x] Стрелки слайдера — левее к букве «Б» и ниже (`left:7%; top:63%`, tablet `8%/62%`)
- [x] Три тезиса (pills) — над словом «экспедиция`, ширина = длине слова, вертикаль настраивается через `top`

## 2.2–2.11. Секции главной (глава 2 финального BUILD спека) — hero не трогаем
- [x] Токены v4 FINAL: canvas `#FFF8F3`, surface `#FFF1E8`, elevated `rgba(255,255,255,.72)`, контур континентов `#FFE6D8`, фоновые градиенты `--gradient-editorial-warm` / `--gradient-signature`
- [x] 2.2 Market Reality — editorial data field (градиент, eyebrow `01 / MARKET REALITY`, H2, 3 цифры вилкой 40/30/30 с hairline-разделителями, доминирует первая, знак `%`/`+` в `--orange-700`; данные в `src/data/marketReality.ts`)
- [x] 2.3 Platform Statement — editorial statement (55/45, слева оранжевая линия + eyebrow `02 / FEXPERIENCE` + H2 48px + подстрока + CTA к левой колонке; справа вертикальный numbered-список `01/02/03` с hairline, без pills/cards; данные в `src/data/platformStatement.ts`)
- [x] 2.4 Continental Navigation — по `FExperience_Continental_Navigation_SVG_Lock.md`: реальные локальные SVG-контуры (Natural Earth 110m → `topojson.merge`, `/public/maps/continents/`, узнаваемая география), editorial-композиция 2×2 (номера 01–04, Playfair 34–48px, количество направлений, `Смотреть направления →`), market dots 8px #FF6B2C на реальных географических позициях (status: sakhalin completed / brazil soon / остальные active), деликатный glass на карточках (+ editorial hairline-borders), тёплый градиент `gradient-editorial-warm`; route lines / regionRoute полностью удалены; `MapContinent` и expedition-логика не тронуты; данные — единый Source of Truth `src/data/regions.ts`
- [x] 2.5 Featured Markets
- [x] 2.6 Почему FExperience — image/glass mosaic (финальный лок по `files3/2.6Why.md`: светлый liquid glass на всех панелях без тёмного glass, тёмная editorial-типографика, `#F29A72`-числа, №05 стал фото+light glass-sheet, body ≥15/16px, hover zoom 1.02 без translateY; фон секции `135deg #FFF8F0/#FFE8D6/#FFF3E8`; данные в `src/data/whyComposition.ts`)
- [x] 2.7 Media Layer — «Участники экспедиции в центре внимания»
- [x] 2.8 Testimonials
- [x] 2.9 FAQ
- [x] 2.10 Final CTA (секция `final-cta` на `gradient-editorial-warm` + мягкий радиальный свет, max-w 640, центр, H2 Playfair 40px, подзаголовок 16–17px, кнопка `.btn-liquid--lg` 20px/48px с текстом 17px; компонент `FinalCTA.tsx` подключён на главной после FAQ)
- [x] 2.11 Footer — светлый рестайл (фон `#F0ECE5`, top-border `rgba(255,107,44,.15)`): Newsletter (Playfair 24px «Узнайте первыми…», input h-48 pill white + компактная `btn-liquid--sm`, локальный статус подписки), continental-row по `marketRegions`, 4 колонки навигации (Разделы / Экспедиции / Контакты / Документы), правовой блок с лого + copyright + юр.адрес; контакты — из `src/data/contacts.ts`; footer-блок `TeamProject`/modal убраны по спеку
- [ ] 2.11 Footer

## Итог
- [ ] Визуальная проверка каждой секции (desktop / tablet / mobile)
- [ ] Финальный `npm run build`