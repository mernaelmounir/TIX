# 02. Studio / About Page Documentation (`pages/about.html`)

This document covers the architectural layout, narrative flow, media grids, and styling logic for the **Studio / About** page of TIX Creative Agency.

---

## 1. Page Purpose & Narrative Concept

The Studio page (`pages/about.html`) articulates TIX’s creative philosophy, methodology, and pedigree. Rather than a conventional corporate "About Us", this page is framed as an editorial manifesto establishing TIX as high-end brand architects who refuse mediocrity.

---

## 2. Section Breakdown & Components

```
├── Header & Nav (Injected by layout.js)
├── <main id="main-content">
│   ├── 1. Impact Hero (.impact-hero)
│   ├── 2. Studio Narrative & Manifesto (.narrative)
│   ├── 3. Precision Showcase: Watch / Connection (.connection)
│   ├── 4. Editorial Spotlight: Refuse To Be Ignored (.refused)
│   └── 5. Behind-The-Scenes Gallery Grid (.bts)
└── Contextual Footer with About Images (Injected by layout.js)
```

### 1. Impact Hero (`.impact-hero`)
- Minimalist dark aesthetic with full-width container.
- Large typographic title: *"WE DON'T JUST PRODUCE CONTENT — WE BUILD CULTURAL IMPACT."*
- Supported by quantitative proof statistics:
  - Total commercial productions delivered.
  - Client retention and satisfaction metrics.
  - Years of creative direction mastery.
- Designed with `css/about.css` and enhanced by `data-reveal` attributes for smooth viewport entrance.

### 2. Precision Showcase: Luxury Watch (`.connection`)
- **Visual Asset**: `../assets/images/mmm.jpg` (Luxury watch close-up).
- Paired with high-impact copy emphasizing precision, craft, and attention to micro-details.
- Responsive split layout: text block on the left (`data-reveal="left"`), full-bleed precision watch imagery on the right (`data-reveal="right"`).

### 3. Editorial Spotlight: "For Brands That Refuse To Be Ignored" (`.refused`)
- **Visual Asset**: `../assets/images/ppp.jpg` (Luxury perfume bottle product shot).
- Central thesis card outlining why average marketing fails and how bold art direction creates lasting brand equity.
- **Developer Note**: Contains a fallback visual block with a gradient overlay. When replacing the perfume photography, ensure the replacement maintains an aspect ratio of roughly 4:5 or 1:1.

### 4. Behind-The-Scenes Photo Grid (`.bts`)
- An asymmetric masonry-style bento grid featuring actual on-set production stills:
  - **Tile 1 (Wide - 16:9)**: `../assets/images/bts1.png` — Main set overhead.
  - **Tile 2 (Tall - 3:4)**: `../assets/images/bts2.jpg` — Lighting & camera crew.
  - **Tile 3 (Square - 1:1)**: `../assets/images/bts3.jpg` — Monitor & directing station.
  - **Tile 4 (Square - 1:1)**: `../assets/images/bts5.jpg` — Wardrobe & talent preparation.
  - **Tile 5 (Tall - 3:4)**: `../assets/images/bts4.jpg` — Detailed camera rig.
- **Animation Choreography**:
  - The parent grid is marked with `data-stagger`.
  - The `Reveal` module in `js/main.js` observes this container and applies sequential stagger delays to each child image tile.

---

## 3. Developer Handover Notes & Pending Tasks

1. **Inline Placeholder Elements**:
   - In lines 158-163 and lines 211-250 of `pages/about.html`, there are temporary fallback `<div>` tags with `REPLACE` notes styled with inline styles.
   - These were intentionally left so the visual grid would not collapse if an image failed to load during production.
   - Once final commercial client imagery is approved, these placeholder divs can be safely deleted, leaving only the clean `<img>` tags.
2. **Path Reference Integrity**:
   - All assets in `pages/about.html` must always be referenced with `../assets/images/...` (relative up one level) rather than absolute `/assets/...`, ensuring full compatibility with GitHub Pages subfolder hosting.
