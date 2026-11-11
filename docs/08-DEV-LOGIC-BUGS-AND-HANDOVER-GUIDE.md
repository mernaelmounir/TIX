# 08. Developer Logic, Known Bugs & Handover Guide

This document is the **master developer handover guide** for any engineer or technical contributor continuing development on the TIX Creative Agency website. It details the runtime logic, JavaScript architecture, resolved issues, potential conflicts, and high-priority recommendations.

---

## 1. JavaScript Engine Architecture

The site runs on two clean, decoupled scripts located in `js/`:

```
js/
├── layout.js   # Shared DOM injection (Nav, Mobile Menu, Contextual Footer, i18n)
└── main.js     # Interactive choreography, animation loops, filtering & modals
```

### 1.1 `js/layout.js` (DOM Injection Pipeline)
- **Lifecycle**: Executes on `DOMContentLoaded`.
- **Logic**:
  1. Detects current page key via `getPageKey()` from `window.location.pathname` (`home`, `work`, `services`, `about`, `contact`).
  2. Detects Arabic language context via `/\/ar(?:\/|$)/i.test(...)`.
  3. Automatically resolves relative pathing (`../` vs root) so the same template functions on both the root index and subpages in `pages/`.
  4. Injects accessibility Skip-Link and responsive Navigation Bar (`#main-nav`).
  5. Injects the Mobile Drawer Menu (`#mobile-menu`).
  6. Contextual Footer Injection: Matches the current page key to its corresponding image triplet from `FOOTER_IMAGE_SETS` and renders the 3D folder component.
  7. **Exception**: Completely omits generic footer injection on `contact.html` (lines 225–231) to let the custom contact footer render cleanly.

### 1.2 `js/main.js` (Modular Module Breakdown)
All interactivity in `main.js` is structured using the **IIFE Module Pattern** (`const Module = (() => { ... })();`) and initialized cleanly at the bottom of the script:

| Module Name | Lines | Responsibility & Dev Logic |
|---|---|---|
| `Nav` | 10–68 | Sticky header class toggling on scroll (`window.scrollY > 40`), burger menu state, mobile drawer trapping, active link highlighting. |
| `Reveal` | 70–89 | Viewport scroll reveals powered by `IntersectionObserver`. Observes `[data-reveal]`, `[data-stagger]`, `.js-fade`. Adds `.is-visible` and immediately unobserves target to conserve memory. |
| `Parallax` | 92–119 | Subtle vertical parallax for designated elements via `translate3d(0, scrollY * speed, 0)`. |
| `Cursor` | 122–168 | Custom luxury cursor with LERP (Linear Interpolation `0.12`) following mouse movement. Expands ring on hovering links and buttons. Automatically disabled on touch devices. |
| `Marquees` | 170–185 | Initializes marquee duplication for continuous infinite scrolling. Pauses animation on hover. |
| `Pinboard` | 187–200 | Sticky pin choreography for editorial highlights. |
| `Counter` | 202–236 | Animated number increment counters (`data-target`) for quantitative proof stats on the Studio page. |
| `WorkFilter` | 238–279 | Client-side category filtering for portfolio cards (`data-category`). Manages smooth scale/fade transitions. |
| `ContactForm` | 281–306 | Real-time input validation (email regex, length constraints), submit button loading states, and simulated inquiry dispatch. |
| `HScroll` | 308–331 | Horizontal scroll sections translating horizontal mousewheel delta to horizontal container scroll. |
| `PageTransition`| 333–403 | Smooth page fade-outs before navigating to internal links for an app-like feel. |
| `HeroAnim` | 405–443 | Initial entrance timeline for hero typography and logos. |
| `PortfolioOverlay`| 445–993 | Fullscreen modal gallery overlay. Features in-memory preloading cache, arrow key navigation, swipe gesture detection, counter display, and focus trapping. |
| `FolderToggle` | 995–1005 | Interactivity for the 3D folder in the footer, opening the flap on hover/click. |
| `ServicesHero` | 1007–1087| Interactive container basket with left/right chevrons stage on `services.html`. |
| `SecurityHardening`| 1089–1130| Client-side script protection and DOM attribute validation. |
| `Lightbox` | 1132–1223| Single-image quick view modal fallback. |
| `WorkGallery` | 1225–1339| Masonry layout recalculation and responsive grid alignment. |
| `WorkLens` | 1341–1452| Interactive spotlight lens revealing high-res detail textures on portfolio cards. |
| `DisruptPin` | 1454–1568| Pinned scroll sequence on the homepage Disrupt section, orchestrating 3D perspective transitions. |
| `TouchpointFlight`| 1570–1648| Floating node physics animation. |

---

## 2. Identified Bugs, Conflicts & How They Were Resolved

### Bug 1: Linux Case Sensitivity on GitHub Pages (RESOLVED)
- **The Issue**: On Windows, file paths are case-insensitive. On GitHub’s Linux environment, files like `events.JPG` and `Perfumes.JPG` failed to load when referenced as `events.jpg` and `perfumes.jpg`.
- **The Fix**: Standardized all references in `index.html` and `ar/index.html` to match the exact casing of files on disk.

### Bug 2: Root-Relative Leading Slash Paths on Subpaths (RESOLVED)
- **The Issue**: Images and favicons referenced with a leading slash (e.g. `src="/assets/images/mmm.jpg"` or `href="/assets/images/tix.png"`) resolve to `https://mernaelmounir.github.io/assets/...` instead of the project directory `https://mernaelmounir.github.io/TIX/assets/...`.
- **The Fix**: Replaced all root-relative leading slashes with relative paths (`assets/...` on root, `../assets/...` on subpages).

### Bug 3: Custom Domain (CNAME) Conflict Halting Deployment (RESOLVED)
- **The Issue**: Entering `tix.com` in GitHub Pages settings created a `CNAME` file. Because `tix.com` did not have DNS pointing to GitHub, GitHub Pages failed verification and hid the live website link.
- **The Fix**: Removed the `CNAME` file and pushed the change, enabling immediate deployment to `https://mernaelmounir.github.io/TIX/`.

### Bug 4: Root Directory Asset Pollution (RESOLVED)
- **The Issue**: Several large JPG images (`events.JPG`, `fashion.JPG`, etc.) and PowerShell utility scripts were loose in the project root.
- **The Fix**: Moved all images to `assets/images/`, utility scripts to `scripts/`, and reference docs to `docs/archive/`. Updated all HTML references.

---

## 3. Subtle Quirks & Items for the Incoming Developer

### Quirk A: Inline Script in `index.html` vs `Reveal` Module in `main.js`
- `index.html` lines 514–545 contains an inline `DOMContentLoaded` listener that creates an `IntersectionObserver` observing `.observer-target` to add the `.show` class.
- `main.js` also has a global `Reveal` module observing `[data-reveal]` to add `.is-visible`.
- **Recommendation**: To keep the codebase unified, the incoming developer should migrate the oval cards in `index.html` to use `data-reveal` and delete the redundant inline `<script>`.

### Quirk B: Temporary Placeholders in `pages/about.html`
- In `pages/about.html`, lines 158–163 and lines 211–250 contain placeholder `<div>` tags with `style="... background: linear-gradient(...)"` and text `REPLACE`.
- **Action Required**: Once final commercial client photography is ready, delete these placeholder divs.

### Quirk C: Inquiry Form Submission Endpoint
- The form in `pages/contact.html` currently simulates successful submission on the client side.
- **Action Required**: Connect the form to an active endpoint (e.g. Formspree, Basin, or an AWS Lambda / Cloudflare Worker) as documented in `docs/05-CONTACT-PAGE-DOCUMENTATION.md`.

### Quirk D: Custom Mobile Viewport Height
- On mobile devices, `100vh` often causes layout shifts when browser URL bars collapse.
- **Recommendation**: Ensure critical full-screen wrappers use `min-height: 100dvh` (Dynamic Viewport Height) with `min-height: 100vh` as a fallback.

---

## 4. Local Development & Deployment Cheatsheet

### Running Locally:
Because this is a static site, no Node.js build step is required:
1. Open the project in VS Code / Antigravity IDE.
2. Use **Live Server** or run a simple local web server:
   ```bash
   # Python
   python -m http.server 8000
   
   # Or Node npx
   npx serve .
   ```
3. Open `http://localhost:8000` in your browser.

### Pushing Changes to Production:
Whenever you make changes to HTML, CSS, or JS:
```bash
git add .
git commit -m "Describe your changes"
git push origin main
```
GitHub Pages will automatically build and publish the changes within 60–90 seconds to:
**`https://mernaelmounir.github.io/TIX/`**
