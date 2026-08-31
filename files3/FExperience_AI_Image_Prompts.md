# FExperience — AI Image Generation Prompts
## Высокохудожественные промпты для генерации всех визуальных материалов

Модели: Midjourney v6.1, Flux Pro, DALL·E 3, Grok, Firefly 3, Stable Diffusion XL.
Каждый промпт написан как режиссёрское задание — через физику материала, поведение света, атмосферу, а не через перечисление объектов.

---

## ЧАСТЬ 1 — UI-ЭЛЕМЕНТЫ И СТЕКЛЯННЫЕ ОБЪЕКТЫ

### 1.1 Liquid Glass кнопка "Стать участником" (светлая версия)

```
Ultra-glossy liquid glass UI pill button, 3D render,
elongated capsule shape with smooth organic curves and soft chamfered edges,
transparent amber-orange glass material with warm internal glow,
gradient from deep rust #B7410E through vibrant orange #FF7722 to
translucent peach #FFE8D6, realistic light refraction and caustics,
subtle internal light bloom emanating from center,
polished glossy surface with specular highlights at corners,
glass thickness visible on edges creating depth,
soft shadow beneath suggesting elevation above surface,
neomorphism meets liquid metal aesthetic,
minimalist studio lighting with single soft key light from upper left,
ultra realistic high-detail 3D render, no text, no label,
transparent PNG background, centered composition, 8K quality
```

---

### 1.2 Liquid Glass кнопка — тёмный вариант (для featured карточки на градиенте)

```
Frosted glass UI capsule button, 3D render,
pill-shaped form with perfectly smooth rounded ends,
translucent white glass material with 70% opacity,
internal milky diffusion creating soft glow from within,
subtle iridescent rainbow reflection on upper surface edge,
glass thickness visible on chamfered rim — 3mm beveled edge,
polished glossy top surface catching studio light,
matte frosted underbelly creating contrast with glossy top,
microscopic surface texture visible under magnification,
two-point studio lighting: warm fill from right, cool key from upper-left,
deep transparent shadow pooling beneath button,
ultra realistic glass material simulation, no text,
isolated on transparent background, centered, 8K render
```

---

### 1.2.5 Текстура дымки для стеклянных карточек (fog-texture.png)

> Один файл — используется на всём сайте как `::after` слой внутри `.glass-01`
> и `.glass-signature`. Генерировать один раз.

```
Soft white volumetric fog or mist cloud,
bottom-heavy composition — fog is denser and more opaque at the very bottom,
gradually becoming thinner, wispy and transparent toward the top,
organic irregular cloud shapes, not symmetrical, slightly asymmetric left-right,
the cloud has depth — foreground wisps are brighter, background wisps softer,
subtle cold blue-white coloring — pure, clean, like frozen breath,
microscopic water droplet texture visible up close,
pure transparent background — nothing behind the fog,
fog fills approximately bottom 60% of the frame,
top 40% is completely transparent — pure air above the cloud,
no hard edges anywhere — every boundary fades organically into transparency,
the fog has volume and weight — it sinks, it pools, it breathes,
studio lighting from directly above creating gentle shadows within the cloud body,
ultra realistic volumetric rendering, photorealistic,
PNG with transparent background, 800×400px, 8K quality
```

**Технические параметры финального файла:**
- Размер: 800×400px
- Формат: PNG с прозрачным фоном
- Вес: оптимизировать до <150KB через TinyPNG или squoosh.app
- Путь: `/public/images/ui/fog-texture.png`

---

### 1.3 Glass Signature карточка (featured, с оранжевым свечением)
> ⚠️ Glass Level 01 (базовая стеклянная карточка) — реализуется **только кодом**,
> см. раздел 14.2 Build Spec. PNG-изображение для неё не нужно и не используется.



```
Premium glass UI card with orange luminous corner accents, 3D render,
wide landscape format, large 24px rounded corners,
60% transparent warm frosted glass #FFFAF4 material,
subtle warm amber internal illumination — as if light source sits behind,
two glowing arc segments tracing upper-left and lower-right corners only,
corner arcs: 2px thick, saturated orange #FF7722,
glow spreading 12px beyond arc — bloom effect, warm amber haze,
the glow reflects faintly on the cream background surface beneath,
glass surface shows microscopic ripple when viewed close,
premium object sitting on warm cream surface #FAFAF8,
the card appears to be made of solidified morning light,
depth-of-field: sharp focus on glass edges, environment softly blurred,
volumetric light scattering through glass thickness,
studio lighting: one large soft box from upper left,
no text, no UI content, object-centered composition,
isolated for compositing, 8K photorealistic 3D render
```

---

### 1.5 Iridescent Glass иконки для Due Diligence блока

```
{ICON: [SHIELD / TRENDING_ARROW / DOCUMENT / TRUCK / MAGNIFIER /
SPEECH_BUBBLE / DOLLAR_SIGN / WIFI_SIGNAL / CALCULATOR]}
shaped as a minimal line icon,
the entire icon form made of flowing liquid crystal glass,
transparent and translucent glass material,
smooth organic curves following icon silhouette,
fluid glass deformation — edges slightly melting and reforming,
high internal refraction distorting background subtly,
subtle iridescent rainbow spectrum visible inside glass body:
violet at edges fading to clear at center,
microscopic internal light caustics,
polished glossy outer surface, visible glass wall thickness 3-4mm,
glass casts soft prismatic light on surface below,
minimalist studio lighting: single overhead soft box,
object floating 5px above pure white surface,
ultra realistic high-detail 3D render,
icon centered in square frame, transparent background,
no color fills — pure glass only, PNG 800x800px, 8K
```

---

### 1.6 Плашка ближайшей экспедиции (pill-badge)

```
Frosted glass information badge, elongated pill shape, 3D render,
high transparency — 70% clear, content visible through glass,
thin 1px perimeter highlight catching studio light,
glass appears freshly cooled — surface has slight thermal distortion,
edges catch two specular highlights: upper-left bright, lower-right soft,
glass pill casts diffused shadow on background surface,
the shape is perfectly smooth — no seams, no joins,
appears as single cast piece of optical glass,
warm neutral tint: barely-there #FFF8F4 internal color,
anti-gravity feel — hovering 6px above surface,
soft box lighting from above creating gentle top highlight,
transparent background, centered, PNG, 8K
```

---

## ЧАСТЬ 2 — HERO-ИЗОБРАЖЕНИЯ ЭКСПЕДИЦИЙ

*Все hero-фото: формат 16:9, минимум 1920×1080px, экспорт .webp quality 85*

---

### 2.1 ЮАР — Кейптаун

```
Aerial cinematic photograph of Cape Town Central Business District
at the precise moment between golden hour and blue hour — the sky
is a gradient from deep cobalt at zenith to molten copper at horizon,
glass office towers on De Waal Drive catching the last oblique sunlight,
their facades become mirrors of orange and violet sky,
Table Mountain looms in background — not as tourist symbol
but as geological force giving scale to human commerce below,
the photograph reads as economic power: cranes in harbour,
container ships in Table Bay, financial district density,
camera position: 400 meters altitude, 35mm equivalent lens,
slight motion blur on freeway traffic suggesting economic velocity,
colour grade: desaturated blues, warm shadows, retained orange in highlights,
cinematic anamorphic lens flare from setting sun catching one tower edge,
no people visible from this altitude — pure infrastructure and geography,
professional aerial photography, Phase One IQ4 quality,
16:9 horizontal, .webp
```

---

### 2.2 Вьетнам — Хошимин

```
Cinematic dusk photograph of Ho Chi Minh City financial district,
Bitexco Financial Tower and surrounding glass skyscrapers
reflect the indigo sky in their curtain walls,
Saigon River curves through mid-ground carrying cargo vessels —
economic arteries, not tourist boats,
the scene is shot from rooftop level of a neighbouring tower,
foreground: rooftop HVAC infrastructure and communication antennae
creating industrial foreground texture,
mid-ground: the luminous canyon of Nguyen Hue boulevard,
background: the river delta spreading toward South China Sea,
neon commercial signage on lower buildings creates warm red-gold
pools of light in the blue-grey dusk,
the city reads as a place of furious economic becoming,
colour palette: deep indigo sky, warm amber commercial lighting,
cool grey building facades, golden river reflections,
cinematic grade, no tourists, no food stalls, pure commercial cityscape,
anamorphic horizontal format, photorealistic, 8K
```

---

### 2.3 Индия — Нью-Дели

```
Cinematic photograph of New Delhi Connaught Place business district,
shot from street level at 7AM — the precise hour when corporate India arrives,
long colonnade of Connaught Place's Georgian arcade stretches into distance,
morning light enters horizontally under the colonnade casting long shadow columns,
suited professionals walk purposefully — motion-blurred, 1/30s shutter,
foreground: polished marble reflecting the sky and passing figures,
background: Central Park green with morning mist,
the frame has architectural geometry — pure circles of radial planning,
the photograph has the quality of a corporate annual report cover:
composed, confident, slightly formal,
colour palette: warm sandstone architecture, cool morning sky,
deep shadow under colonnades, bright patches of direct sun,
shot on Leica SL2, 28mm, f/2.8, colour grade with elevated shadows,
no monuments, no Red Fort, no Lotus Temple, purely commercial Connaught,
photorealistic, cinematic, 16:9
```

---

### 2.4 Бразилия — Сан-Паулу

```
Vertiginous aerial photograph of São Paulo's Faria Lima financial corridor,
the avenue stretching to the vanishing point like a canyon of glass and steel,
shot from helicopter at 200 meters: buildings compress into dense urban texture,
the scale of Latin America's largest financial district becomes visceral,
Itaú, BTG Pactual, Goldman Sachs towers identify the power centres,
morning overcast sky diffuses light evenly — every facade equally lit,
the grey sky is not weather but atmosphere — industrial resolution,
from this altitude the city reads as pure economic mass:
parking structures, corporate campuses, access roads, green corridors,
the photograph has the quality of a satellite image but intimate enough
to see individual window panes catching ambient light,
no favelas in frame, no carnival, no beach, no nature — pure business district,
colour grade: desaturated, elevated blacks, slight green in glass facades,
professional aerial photography, Phase One quality, 16:9, photorealistic
```

---

### 2.5 Кения — Найроби

```
Golden hour photograph of Nairobi CBD from Upperhill district,
the photograph is shot from a rooftop showing the Central Business District
compressed against the distant Ngong Hills,
glass towers of the financial district catch the 5PM sun:
The Pinnacle, UAP Tower, PTA Bank Tower become pillars of amber light,
middle ground: the organised chaos of Haile Selassie Avenue —
matatus, corporate sedans, pedestrians in business attire,
the city is shot to reveal its modernity, not its poverty or its savanna,
this is Silicon Savannah: cables, satellites, fintech infrastructure visible,
the light is specifically East African golden hour —
more saturated than European equivalents, with a warm copper cast,
the sky has dramatic cumulus clouds typical of the Kenyan highlands,
no wildlife, no Maasai, no safari imagery, no Kenyatta statue,
pure contemporary urban commercial photography,
Nikon Z9, 70mm, f/5.6, golden hour, photorealistic, 16:9, 8K
```

---

### 2.6 Марокко — Касабланка (recap)

```
Architectural photograph of Casablanca Finance City at blue hour,
Morocco's financial centre shot to emphasise its paradox:
ultramodern glass towers behind Art Deco facades of the French protectorate era,
the Mohammed V Boulevard as foreground — wide, empty, ceremonial,
Moroccan modernity in specific light: the sky holds the precise colour
between end of Maghrib prayer and full darkness — deep indigo with
one last trace of orange at the horizon,
the Hassan II Mosque minaret is deliberately excluded from frame —
this image is about finance, not religion or tourism,
street lamps have just activated: warm tungsten contrasting cold blue sky,
the photograph has the quality of a Jacques-Henri Lartigue assignment
for a financial magazine — composed, historical, yet forward-looking,
colour palette: deep indigo sky, warm amber street lamps,
pale limestone architecture, dark glass towers,
shot on Leica M11, 35mm, f/4, blue hour, photorealistic, 16:9
```

---

## ЧАСТЬ 3 — ПРОГРАММА ПО ДНЯМ

*Формат: 3:2, минимум 1200×800px, .webp quality 80*

---

### 3.1 День 1 — Вечерняя встреча / Ужин (Lanzerac, ЮАР)

```
Documentary photograph of an intimate business dinner
in a Cape Winelands estate, late evening,
long table set for twelve — white linen catching candlelight,
crystal glasses multiplying reflections into constellations of light,
the guests are mid-conversation: gestures arrested by the 1/60s shutter,
wine being poured at one end of the table creates motion blur,
the interior is a converted 18th century cellar: arched stone ceiling,
thick whitewashed walls, a single pendant light fixture casting
a cone of warm light on the table centrepiece,
through a large window at the end of the room: dark vineyard under stars,
the photograph is shot at f/1.8 from a standing position, 35mm,
depth of field isolates the near end of the table while the far end
softens into warm bokeh of faces and light,
this is not a gala dinner, not a wedding, not a conference —
it is business people discovering they share more than an agenda,
colour grade: warm amber interior, cool blue darkness outside,
photorealistic, documentary style, no posed smiles
```

---

### 3.2 День 2 — Бизнес-сессия (конференц-зал)

```
Documentary photograph of a business intelligence presentation,
a presenter stands at the far end of a modern conference room,
data visualisation on a large display behind them —
not PowerPoint clichés but actual financial charts, heat maps,
the audience of eight business professionals is in sharp focus:
some lean forward, one takes notes, one checks phone,
all faces show the particular expression of people
receiving information that costs them something to hear,
the room: floor-to-ceiling glass wall on right shows city skyline,
conference table surface reflects the presentation screen,
the lighting is mixed: natural daylight from window, blue glow from screen,
warm ambient from recessed ceiling lights,
shot at f/2.8, 28mm, from the rear corner of the room,
no pointers, no laser dots, no motivational signage,
pure business intelligence transfer,
photorealistic, candid documentary, grain 400 ISO aesthetic
```

---

### 3.3 День 3 — Визит на предприятие / Университет

```
Documentary photograph of a business delegation tour through
an active [industry: manufacturing / research / logistics] facility,
six professionals in smart-casual attire walk a raised platform
overlooking the production floor below,
a local host gestures toward a specific machine or process,
the visitors look where directed — genuine curiosity in body language,
depth of field: hosts and two nearest delegates sharp, industrial
machinery background in soft focus revealing scale and complexity,
the light is industrial: large skylights creating shafts of daylight
mixed with the blue-white of fluorescent work lights,
the photograph reads as: knowledge transfer between two worlds,
shot at f/2, 35mm, ISO 3200, handheld — slight grain adds documentary truth,
no hard hats unless functionally appropriate, no high-visibility vests,
pure business intelligence gathering in the field,
photorealistic, candid, editorial quality
```

---

### 3.4 День 4 — Городская инфраструктура

```
Street-level photograph of a commercial district in [city],
7:30 AM — the hour of maximum business energy, minimum tourism,
the frame: wide-angle view down a major commercial avenue,
business professionals walking toward camera, slightly motion-blurred,
architecture on both sides: a mix of colonial and contemporary
that defines [city's] visual character,
foreground: polished granite pavement reflecting the sky and passing figures,
a delivery vehicle partially frames the left edge — economic activity marker,
the photograph is shot into the low morning sun — moderate flare,
creates a rim-lit halo on the silhouettes of approaching professionals,
colour grade: warm morning light, long cool shadows, saturated sky,
this is the city as economic organism at its most vital hour,
no tourists, no children, no recreational activity —
purely commercial human movement,
Fujifilm GFX 100S, 32mm, f/5.6, morning light, photorealistic
```

---

### 3.5 День 5 — "Говорят местные" (встреча с бизнесменами)

```
Documentary photograph of a cross-cultural business conversation,
four people at a round table in an informal meeting space —
two expedition participants facing two local entrepreneurs,
the table has: espresso cups, a printed document someone is pointing at,
one mobile phone showing data, one notebook,
the lighting is natural — from a large window to the left,
this creates: highlights on the far faces, rim light on near faces,
the photograph is shot at the moment of a specific exchange:
one local entrepreneur is mid-sentence, one expedition participant
leans forward with focused expression, others listen,
the body language is: not agreement, not disagreement — genuine inquiry,
this is how market intelligence actually feels,
shot at f/1.4, 50mm, natural light only, no flash,
grain characteristic of Kodak Portra 800 pushed one stop,
photorealistic, candid, editorial
```

---

### 3.6 День 6 — Культурный контекст (финал)

```
Architectural photograph of [specific landmark location]
as economic and cultural artefact rather than tourist attraction,
the composition excludes tour buses, souvenirs, other tourists —
instead frames the location through the perspective of someone
trying to understand the civilisation that produced it,
foreground: one expedition participant photographed from behind
contemplating the scene — figure provides human scale,
the light is late afternoon directional — creates strong shadow geometry,
the photograph has the quality of a National Geographic assignment
for a business publication: visually stunning, intellectually weighted,
this place is important not because it is beautiful
but because understanding it is prerequisite to understanding
how business operates here,
shot on Leica Q3, 28mm, f/5.6, afternoon directional light,
colour grade: desaturated, elevated mid-tones, warm shadows,
photorealistic, contemplative, editorial
```

---

## ЧАСТЬ 4 — БЛОК "ЧТО ВКЛЮЧЕНО" (фон-карточки)

*Формат: 4:3, минимум 800×600px, тёмные или средние по тону — текст поверх должен читаться*

---

### 4.1 Медийное сопровождение

```
Editorial backstage photograph of a professional video production setup,
a cinematographer adjusts a large Aputure 600D softbox
while a journalist in business attire reviews notes,
the set: a purpose-built corporate interview environment —
dark acoustic panels, one hero chair, camera on fluid head,
the lighting creates: strong key light from large softbox,
warm ambient from practical lamp in background,
the photograph is shot through the camera support structure
creating geometric framing within the frame,
all equipment suggests serious editorial production, not content creation —
this is Forbes quality, not YouTube quality,
the photograph reads as: your story will be told with resources
usually reserved for national magazine features,
shot at f/2.8, 35mm, production lighting, photorealistic,
dark enough at edges for white text overlay
```

---

### 4.2 Бизнес-сессии и нетворкинг

```
Cinematic photograph of a business gathering at a decisive moment,
shot from an elevated position looking down at a cluster of professionals
in animated conversation, drinks in hand, faces engaged,
the architectural space: a rooftop or atrium venue in [city],
city visible in background at blue hour through floor-to-ceiling glass,
the light comes from below (uplighting from the venue floor)
creating dramatic face lighting unusual for a business event,
the photograph captures: the specific energy of people who have just
shared an intense day of intellectual experience and are now
processing it together — the room temperature of a good meeting continuing,
shot at f/2, 24mm, slight fisheye distortion suggests immersion,
colour grade: rich jewel tones, strong shadows, warm skin tones,
photorealistic, cinematic, dark enough at edges for text overlay
```

---

### 4.3 Культурные мероприятия

```
Intimate documentary photograph of a private cultural evening event,
a local traditional music ensemble performs in the corner of a historic venue —
perhaps a riad courtyard, a wine cellar, a colonial mansion salon,
the expedition participants are in the foreground, backs to camera,
watching — the photograph is shot over their shoulders into the performance,
the performers are sharp, the audience is silhouettes,
the light source is entirely practical: candles, lanterns,
or the warm glow of traditional oil lamps,
this creates: pools of warm amber light on performers,
deep shadow in corners, a theatrical chiaroscuro,
the photograph reads as: access to something most business travellers
never see, organised by someone who knows this culture intimately,
this is exclusivity through knowledge rather than money,
shot at f/1.4, 35mm, available light, ISO 6400,
grain is film-like, photorealistic, dark at edges for text
```

---

### 4.4 Отель 5★

```
Architectural photograph of a premium hotel suite interior,
the frame: large bed in left foreground, floor-to-ceiling window in background
showing [city] skyline at dusk,
the light comes entirely from outside — the room is in natural shadow,
the exterior blue hour light streams through the window
creating blue-grey gradients on white linen,
the bed is immaculately made: geometric precision of folded corners,
one bedside lamp creates a warm circle of amber light
as counterpoint to the cool exterior light,
no minibar, no remote controls, no hotel branding visible —
the photograph reads as architecture, not hospitality marketing,
the window becomes a living painting: city lights activating
as the sky darkens, the suite observing from above,
shot on Hasselblad X2D, 21mm, dusk, available light only,
photorealistic, architectural, cool palette with warm accent,
dark at edges for white text readability
```

---

### 4.5 VIP-трансферы

```
Interior photograph from rear seat of a premium executive vehicle,
camera position: low, wide, facing forward between the two front headrests,
the driver's hands on the wheel are partially visible but not the face,
through the windscreen: a blurred urban expressway at dusk,
city lights trail into light paintings from motion,
the interior: supple dark leather seats, ambient lighting in door cards,
a crystal water glass in the centre console holder,
the climate control display glows blue in the dashboard darkness,
no logos, no brand markings on the car visible,
the photograph reads as: private, smooth, the city passing outside
while the interior remains a sealed space of calm,
shot at f/1.4, 24mm, 1/15s shutter for motion blur on exterior,
sharp interior, blurred exterior — the psychology of executive travel,
colour grade: deep shadow interior, warm amber exterior lights,
photorealistic, cinematic, dark composition
```

---

### 4.6 Питание

```
Intimate photograph of a private dinner mise en scène,
the frame: a single perfect plate of contemporary [regional] cuisine
shot from 45° angle at table level, f/1.4,
the plate is razor-sharp, the background is dark bokeh of dining room,
the plating: architectural, intentional, not decorative —
a chef who thinks in flavour rather than Instagram,
warm light source from left: a single candle just outside frame
creates specular highlights on the sauce, rim light on plate edge,
the table setting: dark linen, one wine glass catching the light,
a fold of napkin at the edge of frame,
the background bokeh resolves into: other tables, soft candlelight,
the gentle energy of a private dinner,
this is not a restaurant photograph — it is a document
of the particular civilisation visible in how a place feeds its guests,
shot on Sony A7R V, 85mm, f/1.4, candlelight, ISO 3200,
colour grade: warm amber, deep blacks, photorealistic, editorial
```

---

## ЧАСТЬ 5 — О НАС (фото деловой программы)

*Формат: квадрат 1:1 или 4:3, минимум 800px*

---

### 5.1 Групповая дискуссия

```
Candid documentary photograph of six business professionals
in animated group discussion, standing in a circle,
one person holds a tablet showing data, gesturing with it,
the setting: a hotel lobby meeting area or an atrium,
the architecture suggests: expensive, foreign, significant,
the light: diffused natural light from a large skylight above,
creates even illumination across all faces —
documentary photography prerequisite: no one in shadow, all readable,
body language: open, energetic, not polite — genuinely engaged,
no chairs — everyone standing suggests this conversation
was not planned but became important,
shot at f/2.8, 35mm, natural light, slight grain,
colour grade: neutral with elevated clarity to read faces,
photorealistic, editorial quality, no posed elements
```

---

### 5.2 Рабочая встреча с данными

```
Documentary photograph of four professionals reviewing documents
and screens in a hotel suite converted into temporary working space,
two laptops open, one physical document spread on the table,
one person is pointing to specific data on screen,
the moment: before a decision, not after —
the faces show calculation, not satisfaction,
the light: floor lamp to the left creating warm ambient,
window to the right providing cool natural light,
the two light sources create: warm shadow side,
cool highlight side — three-dimensional face rendering,
the table is organised chaos: documents, phones, coffee cups,
a marker board with handwritten frameworks,
shot at f/1.8, 35mm, mixed light, ISO 800,
the grain suggests: real work, not a photo opportunity,
photorealistic, candid documentary, editorial
```

---

### 5.3 Вечерний нетворкинг

```
Documentary photograph of informal evening gathering,
professionals in conversation in pairs and small groups
across a rooftop or garden venue in [country],
the photograph is shot at 10pm — the hour when conversations
stop being business and start being honest,
the light: practical only — string lights, candles, city glow,
the city skyline is the backdrop,
the photograph is shot wide: f/4, 24mm, to include the spatial relationships
between different clusters of conversation,
in the near foreground: two people exchange phone contacts,
in the mid-ground: three people laugh at something,
in the background: one person stands alone looking at the view —
processing the day,
colour grade: warm amber practical lights, cool blue sky,
deep shadow in foreground, the whole frame reads as:
the informal education that happens between formal sessions,
photorealistic, wide, candid, editorial
```

---

### 5.4 Посещение объекта / локальная встреча

```
Documentary photograph of a formal meeting between
two delegations in a local [business type] setting,
one side of the table: expedition participants in business casual,
the other: local executives in their professional attire,
the table between them has: company materials, water glasses,
a laptop showing a presentation,
the moment captured: the host is speaking, pointing to something
on a document, the delegation listens —
the specific body language of people hearing something
that changes their understanding of the market,
the setting is authentically local — not a generic conference room
but a space that reveals the business culture of [country]:
perhaps an office with specific local architectural elements,
shot at f/2.8, 35mm, interior mixed light,
colour grade: neutral, elevated shadows to reveal room character,
photorealistic, documentary, editorial quality
```

---

## ЧАСТЬ 6 — ИКОНКИ И UI-ЭЛЕМЕНТЫ

### 6.1 Набор liquid glass иконок (9 штук для Due Diligence)

*Один промпт с заменой [ICON_NAME]. Генерировать каждую отдельно.*

```
[SHIELD / TRENDING_UP_ARROW / DOCUMENT_PAGE / DELIVERY_TRUCK /
MAGNIFYING_GLASS / SPEECH_BUBBLE / CURRENCY_COIN /
WIFI_SIGNAL_BARS / CALCULATOR]

icon form made of flowing liquid crystal optical glass,
transparent borosilicate glass material — same as scientific equipment,
the icon outline is the glass object itself — solid walls 3-4mm thick,
internal refraction distorts the space behind subtly,
surface shows: polished glossy exterior, matte frosted in recessed areas,
glass thickness visible on all edges — architectural precision,
subtle iridescent spectrum at refraction points:
blue-violet at one edge, amber-green at opposite,
microscopic caustic light patterns projected on white surface below,
the object appears heavy yet weightless — paradox of optical glass,
minimalist studio lighting: one large overhead softbox,
perfectly white background #FFFFFF,
object casts crisp transparent shadow showing glass colour,
ultra realistic 3D render, photorealistic glass simulation,
PNG with transparent background, 800×800px, centered, 8K quality
```

---

### 6.2 Светящаяся оранжевая CTA-кнопка (pill)

```
Glowing amber-orange UI button capsule, 3D render,
elongated pill shape proportioned 3:1 width-to-height ratio,
the material is crystallised molten amber — geological, ancient, warm,
colour: deep rust #B7410E at edges transitions to
vibrant orange #FF7722 in centre transitions to
translucent warm peach #FFE8D6 at the very top highlight,
the button appears to generate its own light source from within:
warm orange bloom emanates 20px beyond the button boundary,
the glow softens on the clean background like a hot coal on snow,
surface: polished gem-cutter facets on side edges — prismatic,
top face: mirror gloss with one perfect specular catchlight,
bottom: semi-transparent allowing background to read through,
the button has weight: sits slightly indented on the surface
as if it is genuinely heavy and warm,
depth-of-field: tack sharp focus, environment light bokeh background,
no text, no label, transparent PNG background, centered,
8K quality photorealistic 3D render
```

---

### 6.3 Навигационная пилюля с оранжевой точкой (активный пункт меню)

```
Minimal frosted glass navigation pill, 3D render,
narrow horizontal capsule, 120×36px proportions,
ultra-thin glass walls — 1.5mm — barely there,
interior: 80% transparent, slight warm tint,
one perfect 6px luminous orange dot at the left interior:
a small sphere of compressed light, #FF6B2C,
the dot appears to glow with gentle pulse —
its orange light warms the interior of the glass capsule,
the capsule is a container for this small point of light,
thin perimeter highlight: 0.5px white line, top and left edges,
the object reads as: precise, intentional, refined,
shot on perfectly clean neutral background,
minimal studio lighting: diffuse overhead,
PNG transparent background, centered, 8K
```

---

### 6.4 Контур карты Африки (SVG-декор для 404-страницы и карты экспедиций)

```
Minimal line drawing of African continent outline,
single continuous stroke — 1.5px width, warm peach colour #FFE6D8,
the continent rendered as if drawn by a single unbroken thread of light,
no fill — negative space is as important as the line,
the coastline has documentary precision — not stylised,
the line has microscopic variation suggesting hand of an instrument
rather than computer generation,
isolated on transparent background,
the object exists as pure topology — knowledge encoded as line,
SVG format, 400×500px, single colour, transparent background
```

---

## ПАРАМЕТРЫ ДЛЯ MIDJOURNEY (добавлять в конце всех промптов)

```
Основные параметры:
--ar 16:9          (для hero-фото)
--ar 4:3           (для программа/включено)
--ar 1:1           (для иконок и about-фото)
--ar 3:2           (для карточек дней)
--v 6.1            (версия модели)
--style raw        (меньше MJ-стилизации, больше фотореализма)
--q 2              (максимальное качество)

Для 3D render UI-элементов:
--ar 1:1 --v 6.1 --style raw --q 2

Добавлять в конце фото-промптов:
"photorealistic, editorial photography, no AI aesthetics,
no oversaturation, no HDR look, no lens flare excess,
professional colour grade" --v 6.1 --style raw
```

---

## ПАРАМЕТРЫ ДЛЯ FLUX PRO / GROK / DALL·E 3

```
В конце каждого промпта добавлять:
"Ultra realistic, photorealistic rendering, professional quality,
no artificial sharpening, no HDR, no oversaturation,
editorial photography aesthetic, grain if film-style requested,
high detail, 8K equivalent resolution"

Для UI/3D объектов:
"3D render, photorealistic material simulation,
product visualization quality, isolated on transparent/white background,
no watermarks, no text unless specified"
```

---

## ТЕХНИЧЕСКИЕ ТРЕБОВАНИЯ К ФИНАЛЬНЫМ ФАЙЛАМ

| Тип | Формат | Разрешение | Качество | Именование |
|---|---|---|---|---|
| Hero-фото | `.webp` | 1920×1080 min | 85% | `hero-[slug].webp` |
| Дни программы | `.webp` | 1200×800 min | 80% | `day-[n]-[slug].webp` |
| Что включено | `.webp` | 800×600 min | 80% | `included-[n]-[slug].webp` |
| About фото | `.webp` | 800×800 min | 80% | `about-program-[n].webp` |
| OG-изображения | `.jpg` | 1200×630 exact | 90% | `og-[slug].jpg` |
| Иконки liquid glass | `.png` | 800×800 | transparent bg | `icon-[name]-glass.png` |
| Кнопки/UI | `.png` | 1200×400 | transparent bg | `btn-[name].png` |
| SVG карты | `.svg` | vector | — | `map-[region].svg` |

---

### 13.9 Фото экспертов и команды Forbes

*Формат: квадрат 1:1, минимум 400×400px, .webp quality 85. Сохранять: `expert-[lastname].webp`, `team-[lastname].webp`*

**Внешние эксперты (9 человек) — деловой портрет:**
```
Professional business portrait of [nationality] executive,
natural studio lighting with single large softbox from upper-left,
background: clean architectural blur — office interior or
neutral architectural surface, not white seamless backdrop,
the subject is captured mid-thought: not smiling for camera,
not grimacing — the specific neutral expression of someone
whose intelligence is their professional identity,
clothing: smart business or smart-casual, no suits with ties
unless culturally appropriate for the specific nationality,
the photograph should feel like a Financial Times person profile —
authoritative, characterful, honest,
camera: Sony A7R V, 85mm, f/1.8, shallow depth of field,
colour grade: neutral, elevated shadows, natural skin tones,
no heavy retouching, pores and character lines preserved,
photorealistic, editorial portrait
```

**Forbes Russia команда (3 человека) — редакционный портрет:**
```
Editorial magazine portrait of Russian business media professional,
environment: a suggestion of the Forbes Russia editorial space —
books, screens, architectural details softly blurred in background,
the subject projects: editorial authority and approachability simultaneously,
lighting: soft natural light from large window left,
warm ambient fill from right, ratio 3:1 creating dimension,
expression: direct eye contact with camera, calm confidence,
clothing: smart but not formal — the dress code of someone who
interviews billionaires but also rides the metro,
Forbes magazine visible in soft focus background — not staged, contextual,
camera: Leica SL2, 50mm, f/2, natural light,
colour grade: warm neutral, clean skin tones, Forbes aesthetic,
photorealistic, editorial, magazine quality
```

---

### 13.10 Фото авторов отзывов (Testimonials)

*Формат: circle crop 1:1, минимум 200×200px, .webp quality 85. Сохранять: `testimonial-[lastname].webp`*

```
Candid portrait of a Russian entrepreneur in their element —
not in a photo studio, but in their natural business environment:
at a desk with computer, in a meeting room, at a factory floor overview,
the photograph is cropped tightly: face and shoulders only,
caught in a moment of confident expression — not a posed headshot,
background: pleasantly blurred suggestion of their business context,
the face reads as: real person with real business, not stock model,
lighting: whatever is naturally present in their environment,
slightly corrected for flattering result,
no heavy retouching — natural skin, genuine character,
camera: any modern DSLR or mirrorless, portrait lens,
the photograph should feel like: this is someone you'd trust
to give an honest opinion because they have something to lose,
photorealistic, candid portrait, editorial quality
```

---

### 13.11 Фон формы заявки (`expeditions-form-bg.jpg`)

*Формат: 1920×1080px, .jpg quality 90 (не webp — фон в CSS background-image)*

```
Cinematic atmospheric photograph suitable as dark website section background,
subject: a business environment in one of FExperience's expedition regions —
perhaps a conference room overlooking a city at dusk,
or a rooftop terrace with city lights activating,
or an empty elegant event space between sessions,
the image is naturally dark in its lower two-thirds:
this is where the glass form panel will sit,
upper third: lighter, atmospheric, provides breathing room,
no people, no text, no specific identifiable locations,
the photograph should feel: exclusive access, significant venue,
the calm before or after something important,
colour palette: deep blues, warm amber accent lighting,
slight atmospheric haze or bokeh creating depth,
the image works as a background: not distracting but elevating,
camera: wide angle 24mm, f/4, available light + minimal fill,
colour grade: deep, cinematic, 40% overall darkening,
photorealistic, architectural atmosphere, 8K
```
---

### 13.12 Фоновые изображения для блока "Почему FExperience" (6 карточек)

*Формат: 4:3, минимум 800×600px, .webp quality 80. Путь: `/public/images/why/`*
*Тематика: деловая среда, не туристическая. Тон: тёплый, живой, но профессиональный.*
*Изображение будет под стеклянной панелью — детали важны, но не должны перегружать.*

**why-01-networking.webp — Уникальный нетворкинг Forbes:**
```
Warm intimate business networking moment,
two or three professionals in genuine engaged conversation,
foreground: hands partially visible suggesting active dialogue,
background: softly blurred warm interior — hotel lobby, private club, or rooftop venue,
the light is golden hour or warm evening ambient,
no handshake poses, no business cards being exchanged —
the moment just before or after, when rapport is established,
faces show genuine interest, not performance,
colour palette: warm amber, cream, deep shadow,
the image reads as: exclusive access to people who matter,
photorealistic, documentary candid, 800×600px
```

**why-02-media.webp — Медийное сопровождение Forbes:**
```
Professional video production setup in an editorial context,
a camera on a fluid head points at an off-frame subject,
in soft background focus: a large monitor showing Forbes digital publication,
the production space reads as premium editorial, not YouTube studio —
large softboxes, dark acoustic panels, precise equipment,
colour palette: cool studio lighting, warm screen glow,
no people visible — the equipment tells the story,
the image conveys: your story will be told with resources
reserved for major media features,
photorealistic, editorial production photography, 800×600px
```

**why-03-expansion.webp — Экспансия бизнеса без купюр:**
```
Dawn photograph of an unfamiliar city's commercial district,
shot from elevated position — a rooftop or hill overlooking the business quarter,
the city is awakening: a few lit windows, morning mist in valleys between buildings,
no recognisable landmarks — this is a generic but specific emerging market city,
the mood: potential, the feeling of standing at the edge of something new,
foreground: architectural detail or railing creating depth,
colour palette: deep blue pre-dawn sky, warm amber first lights, cool grey buildings,
the image reads as: a market that exists and is accessible to those who know how,
photorealistic, cinematic, architectural, 800×600px
```

**why-04-government.webp — Контакты с госструктурами:**
```
Interior of a formal government or trade institution meeting room,
long conference table with water glasses and documents,
flags visible in soft background focus — deliberately non-specific nationality,
the architectural style suggests: official, significant, but not intimidating,
warm natural light from tall windows,
no people — the room itself conveys access and formality,
the image reads as: doors that are usually closed are open,
colour palette: warm wood tones, cream walls, pale flag colours,
photorealistic, architectural interior, institutional aesthetic, 800×600px
```

**why-05-analytics.webp — Оценка бизнес-модели:**
```
Close-up of a professional analyst's workspace,
laptop screen showing financial data, charts, market analysis,
screen content: graphs with upward trends, data tables, not generic PowerPoint,
foreground: notebook with handwritten notes partially visible,
the analyst's hands are at keyboard — motion implies active work,
background: blurred second screen and architectural office environment,
the light source is the screen itself mixed with natural window light,
colour palette: cool blue-white screen light, warm natural ambient,
the image reads as: intelligence gathering that changes decisions,
photorealistic, documentary, workplace close-up, 800×600px
```

**why-06-culture.webp — Культурное погружение:**
```
Architectural or environmental detail from a specific market region,
not a tourist attraction — a working piece of local commercial or civic life:
a covered market with traders, a historic commercial arcade still in use,
a craftsman's workshop in a business district, a local food market at work,
one expedition participant is visible from behind, observing —
their presence gives human scale and perspective,
they are clearly an outsider who has been given access,
the image reads as: understanding a place through its economic life, not its postcards,
colour palette: warm local tones specific to the region,
shot at f/2.8, available light, documentary, 800×600px
```

---

END OF DOCUMENT (раздел 13)
