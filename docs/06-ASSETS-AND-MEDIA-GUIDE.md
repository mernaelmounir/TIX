# 06. Assets & Media Production Guide

This guide details the asset catalog, naming conventions, exact aspect ratios, compression standards, and case-sensitivity rules for all imagery across the TIX website.

---

## 1. Directory Organization

Following the architectural cleanup, all static media is organized strictly within `assets/images/`:

```
assets/images/
├── Core Site Imagery (HERO.png, fire.png, tix.png, tixlogo.png, tixx.png, etc.)
├── Oval Cards (events.JPG, fashion.JPG, food.JPG, jewelry.JPG, Perfumes.JPG)
├── Section Highlights (mmm.jpg, ppp.jpg, digital.png, production.png, visual.png)
├── Behind-the-Scenes (bts1.png, bts2.jpg, bts3.jpg, bts4.jpg, bts5.jpg)
│
├── footer-placeholders/           # Contextual footer images loaded per page
│   ├── home-01.jpg .. home-03.jpg
│   ├── work-01.jpg .. work-03.jpg
│   ├── services-01.jpg .. services-03.jpg
│   └── about-01.jpg .. about-03.jpg
│
└── portfolio/                     # Categorized client work
    ├── beauty/       (beauty-01.jpg .. beauty-15.jpg)
    ├── events/       (events-01.jpg .. events-09.jpg)
    ├── fashion/      (fashion-01.jpg .. fashion-15.jpg)
    ├── food/         (food-01.jpg .. food-15.jpg)
    ├── jewelry/      (jewelry-01.jpg .. jewelry-15.jpg)
    └── realestate/   (realestate-01.jpg .. realestate-12.jpg)
```

---

## 2. Linux & GitHub Pages Case-Sensitivity Rules (CRITICAL)

On Windows developer machines, the file system is case-insensitive: `events.jpg`, `events.JPG`, and `Events.jpg` refer to the same file.

**On Linux servers (such as GitHub Pages, Netlify, Ubuntu VPS):**
The file system is strictly **case-sensitive**. A single mismatched letter will cause an immediate HTTP 404 error.

### Current Case Rules for Key Images:
- `assets/images/events.JPG` (uppercase `.JPG`)
- `assets/images/fashion.JPG` (uppercase `.JPG`)
- `assets/images/food.JPG` (uppercase `.JPG`)
- `assets/images/jewelry.JPG` (uppercase `.JPG`)
- `assets/images/Perfumes.JPG` (capital `P`, uppercase `.JPG`)
- `assets/images/HERO.png` (uppercase `HERO`)

> **Best Practice for the incoming developer:**
> When adding new imagery, standardize all future files to strict lowercase: e.g. `brand-campaign-01.webp`.

---

## 3. Component Dimensions & Aspect Ratio Cheatsheet

| Component | Target Aspect Ratio | Recommended Resolution | Compression Format | Loading Strategy |
|---|---|---|---|---|
| **Hero Background** (`index.html`) | 16:9 | 1920 × 1080 px | WebP / Progressive JPG | `loading="eager"` `fetchpriority="high"` |
| **Oval Cards (Center)** | 1:2.2 (Vertical Pill) | 480 × 1056 px | JPG (80-85% quality) | `loading="lazy"` |
| **Oval Cards (Sides/Edges)** | 1:1.8 to 1:2 | 400 × 760 px | JPG (80-85% quality) | `loading="lazy"` |
| **Bento Hero Tiles** (`work.html`) | 16:9 & 1:1 | 800 × 450 px / 600 × 600 px | WebP / JPG | `loading="eager"` |
| **BTS Grid (Wide Tile)** | 16:9 | 960 × 540 px | WebP / JPG | `loading="lazy"` |
| **BTS Grid (Tall Tile)** | 3:4 | 600 × 800 px | WebP / JPG | `loading="lazy"` |
| **BTS Grid (Square Tile)** | 1:1 | 600 × 600 px | WebP / JPG | `loading="lazy"` |
| **Footer Folder Cards** | 4:3 | 400 × 300 px | JPG (75-80% quality) | `loading="lazy"` `decoding="async"` |
| **Brand Logos & Monograms** | Vector / Clean Alpha | Scalable SVG or 300 × 300 PNG | SVG / Transparent PNG | Direct inline or eager |

---

## 4. Performance & Core Web Vitals Rules

1. **Always Set `width` and `height` in HTML**:
   Setting explicit dimensions on `<img>` tags reserves the aspect ratio box before the image finishes downloading, completely eliminating Cumulative Layout Shift (CLS).
2. **Use `decoding="async"`**:
   Tells the browser to decode the image off the main rendering thread, keeping scroll animations at 60fps.
3. **Lazy-Load Offscreen Images**:
   Every image beneath the primary viewport fold must declare `loading="lazy"`.
