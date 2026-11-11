# 03. Services Page Documentation (`pages/services.html`)

This document covers the architectural layout, interactive hero stage, capability pillars, and dev logic for the **Services** page of TIX Creative Agency.

---

## 1. Page Concept & Architecture

The Services page (`pages/services.html`) details the agency's end-to-end capabilities across commercial production, branding, and digital execution. It features a unique interactive stage component in the hero section that introduces a playful, tactile dimension to the user experience.

---

## 2. Interactive Hero Stage (`.svchero` & `ServicesHero` Logic)

### Visual Anatomy:
- Centered stage (`.svchero__stage`) flanked by animated editorial text: *"WHAT'S INSIDE THE STUDIO?"*
- **Central Element**: A stylized container/basket (`assets/images/basket-clean.png`).
- **Interactive Flaps / Chevrons**:
  - Left Chevron: `assets/images/chevron-left-final.png`
  - Right Chevron: `assets/images/chevron-right-final.png`

### Developer Logic (`ServicesHero` in `js/main.js`):
1. **State Management**:
   - The stage toggles between collapsed and expanded states via the `.is-open` CSS class on `.svchero__stage`.
   - In the collapsed state, the chevrons frame the basket tightly.
   - When clicked or hovered, `.is-open` activates CSS transitions defined in `css/services.css`, translating the left chevron negatively (`transform: translate3d(-40px, -20px, 0) rotate(-15deg)`) and the right chevron positively.
2. **Keyboard Accessibility**:
   - The stage element has `tabindex="0"`, `role="button"`, and `aria-expanded` attributes.
   - Listening for `Enter` and `Space` keydown events toggles the stage for keyboard-only visitors.
3. **Hover Intent & Touch Fallbacks**:
   - On desktop, CSS `:hover` initiates a soft preview bounce.
   - On touchscreens (mobile/tablet), a single tap locks the open state so users can inspect the details without erratic hover flickering.

---

## 3. Four Core Service Pillars

The page breaks down agency capabilities into 4 modular sections:

```
┌─────────────────────────────────┬─────────────────────────────────┐
│ 01. CREATIVE DIRECTION          │ 02. COMMERCIAL PRODUCTION       │
│ • Brand narrative & positioning │ • Cinema-grade film shoots      │
│ • Campaign concepting           │ • Fashion & product photography │
│ • Visual aesthetics & mood      │ • Post-production & color grade │
├─────────────────────────────────┼─────────────────────────────────┤
│ 03. DIGITAL PRESENCE            │ 04. LUXURY BRAND IDENTITY       │
│ • High-performance web apps     │ • Visual identity systems       │
│ • UI/UX interface architecture  │ • Packaging & print typography  │
│ • Interactive WebGL/3D motion   │ • Comprehensive brand guidelines│
└─────────────────────────────────┴─────────────────────────────────┘
```

Each pillar card contains:
- Numerated identifier (`01`, `02`, etc.).
- Pillar title and summary description.
- Interactive list of deliverables with pill badges.
- Expandable capability details.

---

## 4. Production Process & Workflow Roadmap

Following the pillars is a sequential roadmap detailing how TIX engages with clients:
1. **Discovery & Brand Immersion** (Research, audit, competitive positioning).
2. **Creative Concepting** (Mood boards, art direction, scripts, storyboards).
3. **Full-Scale Production** (Casting, set design, film crew, high-speed lighting).
4. **Post-Production & Polish** (Offline editing, high-end color grading, sound design).
5. **Deployment & Growth** (Asset handoff, cross-channel launch strategy, performance review).

---

## 5. Developer Handover Notes

1. **Chevron Extraction Utilities**:
   - If the studio redesigns the hero stage graphics, the script `scripts/extract_chevrons.ps1` can be run to slice and export new left/right chevrons from raw PSD or PNG artwork.
2. **CSS Scope**:
   - All styles specific to the stage and pillar cards live in `css/services.css`.
   - Shared components (buttons, badges, pills) inherit directly from `css/tokens.css` and `css/components.css`.
