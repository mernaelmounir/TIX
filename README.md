# TIX — Creative Marketing & Production Agency

Official digital flagship for **TIX Creative Agency** (Alexandria, Egypt). Built with vanilla HTML5, modern CSS3 with Custom Properties, and modular ES6+ JavaScript.

**Live Website**: [https://mernaelmounir.github.io/TIX/](https://mernaelmounir.github.io/TIX/)  
**Arabic Version**: [https://mernaelmounir.github.io/TIX/ar/](https://mernaelmounir.github.io/TIX/ar/)

---

## 📚 Complete Technical Documentation Suite

For developers, designers, and maintainers taking over the project, comprehensive technical documentation is organized in the [`docs/`](docs/) directory:

| # | Document | Focus Areas |
|---|---|---|
| **00** | [**Overview & Architecture**](docs/00-OVERVIEW-AND-ARCHITECTURE.md) | Tech stack, directory structure, design tokens, Git & GitHub Pages deployment workflow. |
| **01** | [**Homepage Documentation**](docs/01-HOMEPAGE-DOCUMENTATION.md) | `index.html` & `ar/index.html`, Hero, Marquees, Oval Cards drop-in sequence, Disrupt section, Arabic RTL. |
| **02** | [**Studio / About Page Documentation**](docs/02-STUDIO-PAGE-DOCUMENTATION.md) | `pages/about.html`, Impact Hero, Brand manifesto, Watch showcase, BTS photography grid, animation triggers. |
| **03** | [**Services Page Documentation**](docs/03-SERVICES-PAGE-DOCUMENTATION.md) | `pages/services.html`, Interactive Chevrons & Basket hero stage, 4 capability pillars, production roadmap. |
| **04** | [**Work / Portfolio Documentation**](docs/04-WORK-PORTFOLIO-DOCUMENTATION.md) | `pages/work.html`, Bento hero, Category filtering engine, Fullscreen Lightbox & Overlay system. |
| **05** | [**Contact Page Documentation**](docs/05-CONTACT-PAGE-DOCUMENTATION.md) | `pages/contact.html`, Ambient floating orb, Validation logic, Custom contact footer, Backend API integration. |
| **06** | [**Assets & Media Production Guide**](docs/06-ASSETS-AND-MEDIA-GUIDE.md) | Image catalog, Aspect ratios, WebP optimization, Linux / GitHub Pages case-sensitivity rules. |
| **07** | [**SEO, Performance & Security Audit**](docs/07-SEO-PERFORMANCE-AND-SECURITY.md) | Meta tags, OpenGraph, JSON-LD Schema, Core Web Vitals, Content Security Policy (`_headers`). |
| **08** | [**Developer Logic, Bugs & Handover Guide**](docs/08-DEV-LOGIC-BUGS-AND-HANDOVER-GUIDE.md) | **Must-read for the incoming engineer**: Module-by-module breakdown of `main.js` and `layout.js`, resolved bugs, and upcoming tasks. |

---

## 🚀 Quick Start (Local Development)

Because this website is built with zero runtime framework dependencies, you do not need to install `npm` packages or build tools:

1. Clone or open the repository:
   ```bash
   git clone https://github.com/mernaelmounir/TIX.git
   cd TIX
   ```
2. Start any local static web server:
   ```bash
   # Option 1: Python
   python -m http.server 8000
   
   # Option 2: Node npx
   npx serve .
   ```
3. Open `http://localhost:8000` in your browser.

---

## 🚢 Production Deployment

Deployments are automated through **GitHub Pages**:
- Any commit pushed to the `main` branch automatically triggers the Pages deployment workflow.
- In 60–90 seconds, changes go live at `https://mernaelmounir.github.io/TIX/`.

```bash
git add .
git commit -m "Your descriptive commit message"
git push origin main
```

© 2026 TIX Creative Agency. All Rights Reserved.
