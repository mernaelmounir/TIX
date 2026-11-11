# 04. Work / Portfolio Documentation (`pages/work.html`)

This document details the portfolio gallery architecture, category filtering engine, interactive Bento hero, and the fullscreen modal overlay system for `pages/work.html`.

---

## 1. Page Purpose & Layout Architecture

The Work page is the central conversion driver of the TIX website. It showcases client case studies, commercial campaign films, and editorial photography across six primary industry verticals.

```
├── Global Navigation (Injected by layout.js)
├── <main id="main-content">
│   ├── 1. Work Hero & Bento Preview (.work-hero)
│   ├── 2. Category Filter Bar (.work-filter-bar)
│   ├── 3. Dynamic Portfolio Grid (.work-gallery)
│   └── 4. Case Study Details Section
├── Contextual Footer with Work Images (Injected by layout.js)
└── Fullscreen Portfolio Lightbox Overlay (.portfolio-overlay)
```

---

## 2. Interactive Bento Hero (`.work-hero`)

- **Copy Area**: Large editorial headline: *"SELECTED WORKS — 2024 TO PRESENT"*.
- **Interactive Bento**: An asymmetrical preview tile (`.work-hero__bento`) showing recent high-profile campaign snapshots with a smooth CSS parallax zoom on mouse hover.
- **Micro-Interactions**: Filter tags also exist as quick-jump pills in the hero header.

---

## 3. Filtering Engine (`WorkFilter` in `js/main.js`)

### Filter Categories:
1. `all` — Shows all available portfolio items.
2. `fashion` — High-fashion editorials and apparel campaigns (`assets/images/portfolio/fashion/`).
3. `jewelry` — Macro luxury jewelry and timepiece captures (`assets/images/portfolio/jewelry/`).
4. `food` — Culinary art, commercial beverage, and restaurant campaigns (`assets/images/portfolio/food/`).
5. `events` — High-scale corporate summits, red carpets, and launch galas (`assets/images/portfolio/events/`).
6. `realestate` — Architectural captures, luxury villas, and developments (`assets/images/portfolio/realestate/`).
7. `beauty` — Cosmetic, skincare, and perfume macro visuals (`assets/images/portfolio/beauty/`).

### Developer Logic:
- Each button has a `data-filter="category-name"` attribute.
- Each portfolio card in the DOM has a corresponding `data-category="category-name"`.
- When a filter button is clicked:
  1. The `.is-active` state moves to the clicked pill with an animated sliding background pill.
  2. Non-matching cards receive `opacity: 0` and `transform: scale(0.95)` before being hidden via `display: none` after a 250ms CSS transition.
  3. Matching cards are set to `display: block` and transition to `opacity: 1` and `transform: scale(1)`.
  4. The masonry grid layout recalculates positions automatically using CSS Grid.

---

## 4. Fullscreen Lightbox & Overlay Engine (`PortfolioOverlay`)

One of the most complex modules in `js/main.js` (~550 lines of code dedicated to a native-feeling gallery experience).

### Key Features:
1. **Dynamic Media Preloading**:
   - Maintains an in-memory cache (`imageCache = new Map()`) to prefetch adjacent images (the previous and next slide) so user transitions are instantaneous with zero loading flicker.
2. **Keyboard Navigation**:
   - `ArrowRight` / `KeyL`: Advance to next image.
   - `ArrowLeft` / `KeyH`: Go back to previous image.
   - `Escape`: Instantly close overlay and restore background scroll position.
3. **Touch Gestures (Swipe to Navigate)**:
   - Tracks `touchstart` and `touchend` coordinates with a threshold of 50px horizontal delta.
   - Left swipe advances; right swipe retreats.
4. **Scroll Lock & Accessibility**:
   - When opened, `body.style.overflow = 'hidden'` prevents accidental background scrolling.
   - Focus is trapped within the modal (`role="dialog"`, `aria-modal="true"`).
   - Once closed, focus returns gracefully to the element that triggered the modal.

---

## 5. Developer Handover Notes

1. **Adding New Portfolio Projects**:
   - Place optimized `.jpg` images into the corresponding directory inside `assets/images/portfolio/{category}/`.
   - Add a `<div class="work-card" data-category="{category}">` block in `pages/work.html`.
   - Ensure the image has `loading="lazy"` and explicit `width` and `height` attributes to prevent Cumulative Layout Shift (CLS).
2. **Asset Path Structure**:
   - Because `work.html` lives inside `pages/`, all image paths must begin with `../assets/images/portfolio/...`.
