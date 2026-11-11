# 01. Homepage Documentation (`index.html` & `ar/index.html`)

This document covers the architectural layout, UI components, animations, and developer logic for the primary landing page of TIX Creative Agency.

---

## 1. Page Structure & Section Breakdown

The homepage is structured as an immersive, narrative journey with smooth vertical flow:

```
[Skip to Content Link] (Injected by layout.js)
[Navigation Bar] (Injected by layout.js)
├── <main id="main-content">
│   ├── 1. Hero Section (.hero)
│   ├── 2. Infinite Ticker Band (.ticker-band)
│   ├── 3. Dynamic Oval Cards Showcase (.tix-cards-section)
│   ├── 4. Philosophy Section (.connection)
│   ├── 5. Disruptive 3D Pinned Showcase (.disrupt)
│   └── 6. Dual Marquee Social Proof (.trust-section)
└── [Contextual Interactive Footer & 3D Folder] (Injected by layout.js)
```

---

## 2. Deep-Dive by Section

### Section 1: Hero (`.hero`)
- **Visual Core**: Full-bleed background (`assets/images/HERO.png`), overlaid with a radial gradient vignette and a subtle tech grid pattern (`.hero__grid-pattern`).
- **Performance Optimization**:
  - `loading="eager"` and `fetchpriority="high"` are set on the hero image to optimize the Largest Contentful Paint (LCP).
  - Preconnected to Google Fonts to prevent Font Flashes of Unstyled Text (FOUT).
- **Typography Choreography**:
  - Small uppercase kicker: *"Creative Marketing & Production Agency"*.
  - Headline split into two weights: light geometric sans (`.hero__headline-light`) and heavyweight serif italic (`.hero__headline-bold`).
  - Staggered entry animation driven by `@keyframes heroFadeUp` in `css/home.css`.

### Section 2: Infinite Ticker (`.ticker-band`)
- Seamless horizontal scrolling marquee featuring the core studio capabilities:
  `TIX STUDIO ✦ CREATIVE DIRECTION ✦ CAMPAIGN PRODUCTION ✦ BRAND IDENTITY ✦ DIGITAL EXPERIENCES ✦ STRATEGY`
- **Implementation**: Pure CSS `@keyframes ticker` with `will-change: transform`. Duplicated content chunks ensure no empty gaps during loop resets. Paused on mouse hover (`animation-play-state: paused`).

### Section 3: Oval Cards Drop-In Showcase (`.tix-cards-section`)
- **Concept**: Five high-fashion vertical pill-shaped cards representing TIX's key creative pillars:
  1. **Fashion** (`assets/images/fashion.JPG`) — Tallest center card.
  2. **Perfumes** (`assets/images/Perfumes.JPG`) — Mid-left card.
  3. **Jewelry** (`assets/images/jewelry.JPG`) — Mid-right card.
  4. **Events** (`assets/images/events.JPG`) — Edge-left card.
  5. **Food** (`assets/images/food.JPG`) — Edge-right card.
- **Animation Choreography**:
  - In CSS (`css/home.css`), cards start translated off-axis with reduced opacity.
  - Staggered delay classes (`.delay-1`: 0.1s, `.delay-2`: 0.35s, `.delay-3`: 0.6s) ensure the center card drops in first, followed symmetrically by the inner sides, then the edges.
  - Triggered when the container enters the viewport via `IntersectionObserver` observing `.observer-target`.

### Section 4: Brand Philosophy (`.connection`)
- Editorial typographic statement: *"Connection isn't optional."*
- Minimalist dark aesthetic with subtle borders and bold uppercase typography, reinforcing TIX’s positioning as a strategic partner rather than just an execution vendor.

### Section 5: Disruptive Pinned Showcase (`.disrupt`)
- **Dev Logic**: Powered by `DisruptPin` in `js/main.js`.
- As the user scrolls through this section, the viewport pins in place while internal editorial tiles (`.disrupt__tile`) transition with a 3D perspective shift.
- A soft radial vignette (`.disrupt__cloud`) smooths out transitions between this section and the following trust marquee.

### Section 6: Dual Ribbon Social Proof (`.trust-section`)
- Dual-track opposing marquees:
  - **Upper Ribbon (`--light`)**: Studio deliverables (`CREATIVE DIRECTION ✦ STRATEGY ✦ PRODUCTION ✦ DIGITAL EXPERIENCE ✦ LUXURY CAMPAIGNS`).
  - **Lower Ribbon (`--crimson`, reversed scroll direction)**: Client roll call (`ZEN DIAMOND ✦ KENZ GOLD ✦ ALMASAT ELKHALIJ ✦ GAWHARA ✦ LUGANO ✦ ZARA ✦ H&M ✦ LOCATION CAFE ✦ SWEET DOOR ✦ MAAMOL ✦ DR IDOL ✦ FUNDIK`).
- Huge editorial typography: *"They Trusted Us"*, followed by a call-to-action button linking directly to `pages/work.html`.

---

## 3. Arabic Version (`ar/index.html`)

The Arabic homepage mirrors the English visual system with deep architectural localization:
1. `html[lang="ar"][dir="rtl"]` sets standard Right-to-Left bidirectional layout.
2. Directional values (paddings, margins, marquee movement directions, flex orders) are flipped appropriately in `css/home.css` using `html[lang="ar"]` selectors.
3. Schema metadata (`script[type="application/ld+json"]`) contains Arabic descriptions and names for local SEO.
4. The Language Switcher button toggles seamlessly between `EN` and `AR` via relative paths.

---

## 4. Key Developer Logic & Potential Gotchas

1. **Inline Intersection Observer vs `main.js`**:
   - `index.html` has a small inline `<script>` at the bottom observing `.observer-target` to add the `.show` class to oval cards.
   - `main.js` also contains a global `Reveal` module. Keep this in mind when tweaking animation triggers: ensure class names (`.show` vs `.is-visible`) don't collide or cause duplicate triggers.
2. **Case Sensitivity of Oval Card Images**:
   - The images on disk are named `events.JPG`, `fashion.JPG`, `food.JPG`, `jewelry.JPG`, `Perfumes.JPG` with uppercase `.JPG` and capitalized `Perfumes`.
   - Never change the HTML `src` to lowercase `.jpg` unless the actual files on disk are renamed, as Linux servers (GitHub Pages) will fail to resolve them.
