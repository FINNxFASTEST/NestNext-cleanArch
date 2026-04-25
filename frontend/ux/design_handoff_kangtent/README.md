# Handoff: Kangtent — Cozy Campsite Booking

## Overview
Kangtent is a Thai-language campsite booking platform (จองลานกางเต็นท์ทั่วไทย). Users browse, filter, and book campsites across Thailand; owners list their sites and publish blog-style activity posts that customers can read and book. This handoff covers the full desktop web experience plus the owner/admin back-office.

## About the Design Files
The files in this bundle are **design references created in HTML / React + Babel (inline JSX)** — prototypes showing intended look and behavior, not production code to copy directly. They live inside a `<DesignCanvas>` wrapper that simply lays each screen out as an artboard for review.

Your task is to **recreate these designs in the target codebase's existing environment** (e.g. Next.js + Tailwind, Remix, SvelteKit) using its established patterns, component library, and build system. If no environment exists yet, pick the most appropriate framework for the team and implement the designs there. Do not ship the raw HTML.

## Fidelity
**High-fidelity (hi-fi).** Colors, typography, spacing, radii, shadows, and interaction patterns are all intentional and should be reproduced pixel-perfectly using the target codebase's primitives. The scene illustrations in `components/Scene.jsx` are SVG placeholders — in production they should be replaced with real photography.

## Screens / Views

All screens render at a fixed **1440px** design width. Each lives as a component in `components/*.jsx`.

### 01. Home (`components/Home.jsx`)
- **Purpose:** landing page — pitch the brand, run a top search, showcase featured camps and destinations.
- **Layout:**
  - Hero section, 780px tall, full-width illustrated scene with dark gradient overlay, overlay nav, hero copy left-aligned, search bar floating at bottom (`max-width: 1100px`, overlaps next section by −44px).
  - Featured campsites grid: 3-column with a large 520px feature card on the left and two stacks of two 250px cards.
  - Popular destinations: 4×2 grid, each card 220px tall with dark bottom gradient.
  - "Why Kangtent" strip: cream-100 panel, 4-col grid (headline + 3 features).
  - Campfire stories: centered header, 3-column testimonial cards.
  - CTA banner: full-width night scene, 360px tall, centered headline + two buttons.
- **Key interactions:** tab-based section filter ("ลาน สมใจ", etc.), card hover-lift (translate −3px + shadow-card).

### 02. Search & filter (`components/Search.jsx`)
- **Purpose:** `ค้นหาลานกางเต็นท์` — filtered campsite list, blog/listing-style.
- **Layout:** solid nav → cream-100 search context bar (eyebrow + title + 4-col search row + quick-tag chips) → two-column body `300px` sidebar + flexible results.
- **Filter sidebar (sticky `top: 24`, border-radius 22, padding 24, border):**
  1. Price range — mini histogram (12 bars) + dual-handle track.
  2. Region chips — `ทั้งหมด / ภาคเหนือ / ภาคอีสาน / ภาคกลาง / ภาคตะวันออก / ภาคใต้`.
  3. Amenities — 2-col icon tile grid (8 items: ห้องน้ำ, ที่จอดรถ, ไฟฟ้า, Wi-Fi, น้ำประปา, จุดก่อไฟ, ร้านกาแฟ, สัตว์เลี้ยง).
  4. Tent types — custom-styled checkbox list.
  5. Rating — 4 pill buttons (ทั้งหมด / 7+ / 8+ / 9+).
  6. Toggles — "จองได้ทันที" + "รับสัตว์เลี้ยง" (`<FilterToggle>` component — NOTE: must be named uniquely, see Gotchas).
  7. Primary CTA — "ดูผลลัพธ์ N รายการ".
- **Results column:**
  - Header row: "พบ N ลานที่เหมาะกับคุณ" + sort dropdown + list/map view pill toggle.
  - Active filter chips row (dark pills with × to remove).
  - Horizontal campsite cards: 320px photo + content area with badges, name, blurb, rating pill, tent-type badge (moss-200), amenity chips, price, "ดูรายละเอียด" + "จองเลย" buttons.
  - **Infinite scroll** (not pagination): shows 4 initially, "โหลดเพิ่ม" button loads 2 more with a 600ms delay showing a spinner + shimmer skeleton card. Progress counter "แสดงแล้ว N จาก M รายการ". End state with tent icon + "คุณดูครบทุกลานแล้ว".

### 03. Activities feed (`components/Activities.jsx` → `Activities`)
- **Purpose:** `กิจกรรมน่าสนใจ` — blog-style feed of bookable activities hosted by campsite owners.
- **Layout:**
  - Cream-100 header band: title + search pill + 7 category tabs (with counts).
  - Featured hero post: split card (image | article meta + CTA).
  - Two-column body: 2-col post grid (left) + 320px sticky sidebar (right) with "Upcoming" date-block list, tag cloud, and newsletter card with night-scene background.
  - Bottom "Explore by category" strip in cream-100 panel (4 scene tiles).
- **Post card:** 220px scene image with category badge + heart, then 22px padding content area with date/read-time meta, title, excerpt, location line, and footer row with author avatar, starting price, and "อ่านต่อ & จองกิจกรรม" ghost button.

### 04. Activity detail (`components/Activities.jsx` → `ActivityDetail`)
- **Purpose:** individual activity post with booking.
- **Layout:** breadcrumb → 520px full-bleed night-scene hero with title, rating, location → body grid: article column (max 720px) + 380px sticky booking card.
- **Article body:** author row with avatar + follow + share, italic serif lede/pull-quote, body paragraphs, H2 "สิ่งที่คุณจะได้" bullet list, inline 300px image break, quick-facts 4-col grid (ระยะเวลา / กลุ่ม / ระดับ / ภาษา) inside cream-100 panel, reviews section.
- **Booking card:** price + duration, rating pill, date field, guest stepper (±), price breakdown (dashed dividers), "จองกิจกรรมนี้" primary CTA, cancellation note, urgency hint ("เหลืออีก 4 ที่ คืนนี้เท่านั้น"), related camps list.

### 05. Campsite detail (`components/Detail.jsx`)
Existing — individual campsite page with photos, amenities, reviews, sticky booking card.

### 06. Booking checkout (`components/Booking.jsx`)
Existing — multi-step checkout.

### 07–10. Admin back-office (`components/Admin.jsx`)
Existing — `initial` prop switches between `dashboard` / `camps` / `bookings` / `users` / `coupons` / `settings`.

## Design Tokens

All defined as CSS custom properties in `styles.css`:

### Colors
| Token | Hex | Use |
|---|---|---|
| `--ink` | `#151814` | Default text |
| `--forest-900` | `#1B2620` | Deepest green (footer, CTAs) |
| `--forest-800` | `#263328` | Dark surfaces, active chips |
| `--forest-700` | `#2F4034` | Brand primary green, nav mark |
| `--forest-600` | `#3F5540` | Hover |
| `--sage-500` | `#7C8F6F` | Muted labels, icon strokes |
| `--sage-300` | `#A7B59A` | |
| `--moss-200` | `#C7D1B8` | Tent-type badge background |
| `--cream-50` | `#F7F2E7` | On-dark text / overlay content |
| `--cream-100` | `#EFE8D6` | Panel surfaces |
| `--paper` | `#FBF7EC` | Default background |
| `--ember` | `#C97B4A` | Primary accent (buttons, prices, italics) |
| `--ember-dark` | `#A96438` | Button hover |
| `--clay` | `#D9A273` | Secondary accent, eyebrow over dark |
| `--mist` | `#E7E4D8` | |
| `--line` | `rgba(27,38,32,.12)` | Hairline borders |
| `--line-strong` | `rgba(27,38,32,.22)` | Input borders |

### Typography
- **Primary font:** `Bai Jamjuree` (Thai + Latin) — included in `fonts/` as `.ttf`, weights 200/300/400/500/600/700, regular + italic. Loaded via `@font-face` in `styles.css`.
- **Font vars:** `--font-serif`, `--font-sans`, `--font-thai` all map to Bai Jamjuree. Serif scale uses `letter-spacing: -0.01em` (`-0.025em` on `.serif-tight`). Body Thai uses `letter-spacing: 0`.
- **Scale used across screens:**
  - H1 hero: 56–84px, weight 400, line-height 1.02–1.1.
  - H2 section title: 28–40px, weight 400–500.
  - Card title: 22–26px, weight 500.
  - Body: 14–16px, line-height 1.6–1.85.
  - Meta / eyebrow: 11px, letter-spacing 0.18em, uppercase, sage-500.
- Accent pattern: italicize one word per headline with `color: var(--ember)` or `var(--clay)` on dark.

### Spacing & layout
- Page padding: `56px` horizontal.
- Section rhythm: `120px` top padding between hero sections.
- Card radius: `18–22px`, hero/banner `28px`, pills `999px`.
- Gap inside cards: `20–28px`.
- Grid gap: `16–24px`.

### Shadows
- `--shadow-soft: 0 1px 2px rgba(27,38,32,.04), 0 8px 24px rgba(27,38,32,.06)` — card default.
- `--shadow-card: 0 2px 4px rgba(27,38,32,.05), 0 16px 40px rgba(27,38,32,.10)` — hover-lift.

### Interaction primitives (from `styles.css`)
- `.liftable` → `transition: transform .2s, box-shadow .2s`; `:hover { translateY(-3px) + shadow-card }`.
- `.btn`, `.btn--primary` (ember), `.btn--dark` (forest-800), `.btn--ghost`, `.btn--lg`, `.btn--block`.
- `.badge`, `.badge--dark`, `.badge--sage`.
- `.eyebrow`, `.section-title`, `.section-sub`.
- `.stars`, `.dot` (3px divider dot).

## Interactions & Behavior

- **Search filter state:** local state per control. Active chips render as dark pills with remove (×) button.
- **Infinite scroll on Search list:** initial 4 cards; "โหลดเพิ่ม" → spinner + shimmer skeleton (1.4s keyframe) → 600ms delay → reveal 2 more. End state when `visible >= total`.
- **Hover-lift:** every card uses `.liftable`.
- **Sticky filter/booking sidebars:** `position: sticky; top: 24`.
- **Switch toggle:** custom, 38×22 pill, 18px knob, 150ms transition.
- **Guest stepper:** ± round buttons (26px).

## State Management

For the search page:
- `price [min, max]`, `region`, `amenities[]`, `tentTypes[]`, `minRating`, `pets`, `instant`, `sort`, `view (list|map)`, `visible`, `loading`.

For activity detail booking card:
- `date`, `guests`, computed `subtotal`.

Backend contracts implied by the UI:
- `GET /campsites?filters…` returning `{ id, name, sub, region, rating, reviews, price, photos[], badges[], amenities[], tentType, instant, pet, blurb, lat, lng }`.
- `GET /activities?category=…` returning `{ id, title, excerpt, body, author, camp, location, category, date, readMins, price, duration, rating, reviews, seatsLeft }`.
- `POST /bookings` for both campsite and activity bookings.

## Assets

- **Fonts:** `fonts/BaiJamjuree-*.ttf` — bundle these with the app.
- **Scene illustrations:** `components/Scene.jsx` generates SVG scenes by `variant` (`hero | forest | dusk | meadow | lake | cabin | night`). These are placeholders — replace with real campsite photography. Variant → stock-photo mapping is up to the team.
- **Icons:** `components/Shared.jsx` → `Icon` object contains inline SVGs for all icons used. Safe to replace with lucide-react or heroicons.
- **Logo mark:** `KangtentMark` in `Shared.jsx` — circular badge with a tent glyph.

## Gotchas / Notes for the implementer

- **Component-name collisions:** the inline-JSX version had `Toggle` defined in two files, which shadowed each other at `window` scope. In a real codebase with modules this is a non-issue, but it highlights that `Search.jsx` renames its toggle to `FilterToggle` — name things uniquely.
- **Thai copy is final.** Do not translate or paraphrase without product sign-off.
- **Italics as an accent device.** Every major headline uses one italic word in `--ember` or `--clay`. Preserve this.
- **Card hover lift is part of the brand feel.** Don't strip it when moving to production.
- **Responsive:** current mocks are desktop (1440px) only. Mobile and tablet breakpoints are TBD — ask product before implementing.
- **Mini histogram on the price filter** is decorative in the mock; wire it to real distribution data in production.

## Files in this bundle

- `Kangtent.html` — root artboard document (design canvas wrapper + app shell).
- `styles.css` — design tokens + primitives (`.btn`, `.card`, `.badge`, `.nav`, etc.).
- `design-canvas.jsx` — canvas wrapper (not production code; for browsing screens).
- `components/Shared.jsx` — `Icon`, `Stars`, `KangtentMark`, `Nav`, `Footer`.
- `components/Scene.jsx` — SVG scene illustrations (placeholder imagery).
- `components/Home.jsx` — screen 01.
- `components/Search.jsx` — screen 02 (filters + infinite-scroll list).
- `components/Activities.jsx` — screens 03 (feed) + 04 (detail).
- `components/Detail.jsx` — screen 05 (campsite detail).
- `components/Booking.jsx` — screen 06 (checkout).
- `components/Admin.jsx` — screens 07–12 (admin back-office, `initial` prop selects tab).
- `fonts/` — Bai Jamjuree TTF family.

Open `Kangtent.html` in a browser to browse all screens as artboards on a pan/zoom canvas.
