# 00. Overview & Architecture — TIX Creative Agency Website

Welcome to the technical documentation for the official **TIX Creative Agency** website. This document is written for engineers, developers, and technical maintainers taking over the project to provide complete clarity on the architectural foundation, tech stack, directory organization, and deployment workflows.

---

## 1. Project Overview & Philosophy

**TIX** is a full-service creative, strategy, and production studio based in Alexandria, Egypt. The website serves as a flagship digital experience designed to reflect the studio's high-end, luxury aesthetic: dark editorial styling, bold serif & sans typography, fluid motion choreography, and high-performance interactive components.

### Core Development Principles:
1. **Zero Runtime Framework Overhead**: Built using standard HTML5, CSS3 with CSS Custom Properties, and vanilla ES6+ JavaScript. No React, Vue, jQuery, or bloated libraries. This delivers near-instant Time to First Byte (TTFB), minimal First Contentful Paint (FCP), and exceptional Core Web Vitals.
2. **Motion with Purpose**: Smooth scroll triggers, custom cursor, 3D folder interactions, and parallax animations without blocking the main browser thread.
3. **Bilingual Foundation**: Engineered for English (`/`) and Arabic (`/ar/`) with bidirectional support (`ltr` and `rtl`).
4. **Resilient GitHub Pages Deployment**: Fully static architecture capable of hosting on GitHub Pages, Netlify, Cloudflare Pages, or traditional static hosting.

---

## 2. Technology Stack

| Layer | Technology | Details |
|---|---|---|
| **Markup** | HTML5 Semantic Web Standards | Valid, accessible, screen-reader ready semantics (`<header>`, `<nav>`, `<main>`, `<article>`, `<section>`, `<footer>`). |
| **Styling** | Modern CSS3 & CSS Variables | Tokens-driven design system (`tokens.css`), responsive `clamp()` typography, CSS Grid, Flexbox, custom keyframes. |
| **Interactivity** | Vanilla ES6+ JavaScript | Modular IIFE patterns (`js/layout.js`, `js/main.js`), `IntersectionObserver`, `requestAnimationFrame` render loops. |
| **Typography** | Google Fonts | **Montserrat** (geometric sans for body/nav), **Playfair Display** (editorial luxury serif for accents), **Space Grotesk** (technical modern accents). |
| **Version Control** | Git & GitHub | Main branch `main`, remote origin `https://github.com/mernaelmounir/TIX.git`. |
| **Hosting & CI/CD** | GitHub Pages | Automated builds via GitHub Pages Actions deployment workflow. |

---

## 3. Directory & File Structure

Following the code cleanup, the root directory is kept pristine and clean:

```
tixmerna/
├── .github/                       # GitHub configurations (if applicable)
├── .gitignore                     # Ignores backups, IDE files, OS cache
├── _headers                       # Security headers (CSP, HSTS, X-Frame-Options)
├── index.html                     # English Homepage (Main entry point)
├── robots.txt                     # Crawler directives for search engines
├── sitemap.xml                    # Canonical XML sitemap for SEO
├── site.webmanifest               # PWA and mobile bookmark manifest
├── README.md                      # Master repository README & doc index
│
├── ar/                            # Arabic Localization
│   └── index.html                 # Arabic Homepage (RTL, translated schema)
│
├── assets/                        # Static Media Assets
│   └── images/                    # Core brand & site imagery
│       ├── HERO.png               # High-res hero background image
│       ├── events.JPG             # Oval card visual - Events
│       ├── fashion.JPG            # Oval card visual - Fashion
│       ├── food.JPG               # Oval card visual - Food
│       ├── jewelry.JPG            # Oval card visual - Jewelry
│       ├── Perfumes.JPG           # Oval card visual - Perfumes
│       ├── tix.png                # Primary brand icon / favicon
│       ├── tixlogo.png            # Extended brand mark
│       ├── footer-placeholders/   # Contextual footer images per page
│       │   ├── home-01..03.jpg
│       │   ├── work-01..03.jpg
│       │   ├── services-01..03.jpg
│       │   └── about-01..03.jpg
│       └── portfolio/             # Gallery portfolio organized by industry
│           ├── beauty/
│           ├── events/
│           ├── fashion/
│           ├── food/
│           ├── jewelry/
│           └── realestate/
│
├── css/                           # Stylesheet Architecture
│   ├── tokens.css                 # Global CSS variables (colors, fonts, spacing, shadows)
│   ├── components.css             # Shared UI components (nav, footer, buttons, modal, cursor)
│   ├── home.css                   # Styles exclusive to the homepage
│   ├── about.css                  # Styles exclusive to the Studio / About page
│   ├── services.css               # Styles exclusive to the Services page
│   ├── work.css                   # Styles exclusive to the Work / Portfolio page
│   └── contact.css                # Styles exclusive to the Contact page
│
├── js/                            # Script Architecture
│   ├── layout.js                  # Shared layout injector (Dynamic Nav, Footer, i18n switcher)
│   └── main.js                    # Core animation engine, interactions, lightbox, filters
│
├── pages/                         # Subpages
│   ├── about.html                 # Studio narrative, philosophy, BTS gallery
│   ├── services.html              # Service pillars, capabilities, interactive stage
│   ├── work.html                  # Filterable work portfolio & lightbox
│   └── contact.html               # Inquiry form, studio coordinates
│
├── scripts/                       # Maintenance & Automation Utility Scripts
│   ├── extract_chevrons.ps1       # Asset extraction utility
│   └── test_crop_right.ps1        # Image cropping utility
│
└── docs/                          # Comprehensive Technical Handover Docs
    ├── 00-OVERVIEW-AND-ARCHITECTURE.md
    ├── 01-HOMEPAGE-DOCUMENTATION.md
    ├── 02-STUDIO-PAGE-DOCUMENTATION.md
    ├── 03-SERVICES-PAGE-DOCUMENTATION.md
    ├── 04-WORK-PORTFOLIO-DOCUMENTATION.md
    ├── 05-CONTACT-PAGE-DOCUMENTATION.md
    ├── 06-ASSETS-AND-MEDIA-GUIDE.md
    ├── 07-SEO-PERFORMANCE-AND-SECURITY.md
    ├── 08-DEV-LOGIC-BUGS-AND-HANDOVER-GUIDE.md
    └── archive/
        └── HERO-PART.MD           # Early architectural draft
```

---

## 4. Design System & CSS Tokens (`tokens.css`)

All color, typography, spacing, and depth values are centralized in `css/tokens.css`. Never hardcode hexadecimal colors or arbitrary font sizes directly in component rules.

### Key CSS Custom Properties:
- **Primary Accent**: `--crimson: #8B0000` / `--crimson-bright: #e60026`
- **Backgrounds**: `--bg-dark: #000000` / `--surface: #0a0a0c` / `--surface-card: #111116`
- **Borders**: `--border-subtle: rgba(255, 255, 255, 0.08)` / `--border-active: rgba(255, 255, 255, 0.2)`
- **Typography Families**:
  - `--font-sans: 'Montserrat', sans-serif;`
  - `--font-serif: 'Playfair Display', serif;`
  - `--font-display: 'Space Grotesk', sans-serif;`
- **Fluid Font Sizes**: Managed through `clamp(min, preferred, max)` to ensure proportional scaling on all mobile screens without requiring hundreds of media queries.
- **Layer Z-Index System**:
  - `z-index: -1` Background glows & hero grids
  - `z-index: 10` Content layer
  - `z-index: 100` Sticky navigation & marquees
  - `z-index: 500` Mobile menu overlay
  - `z-index: 1000` Fullscreen portfolio modal & custom cursor

---

## 5. Deployment & Hosting Strategy

The site is built and served statically through **GitHub Pages**:
- **Repository**: `https://github.com/mernaelmounir/TIX`
- **Live Production URL**: `https://mernaelmounir.github.io/TIX/`
- **Branch Configuration**: `main` branch, `/ (root)` directory.
- **Pathing Rule**: All assets, stylesheets, and internal page links use relative paths (`assets/...`, `pages/...`, `../assets/...`). This ensures the site runs seamlessly under subpaths (like `/TIX/`) or custom top-level domains.
