# 07. SEO, Performance & Security Audit

This document details the search engine optimization (SEO), performance engineering, and security hardening implemented across the TIX website.

---

## 1. Technical SEO Architecture

Every page in the project includes production-ready metadata, social graph tags, and JSON-LD structured data.

### 1.1 Essential Meta Tags
- **Charset & Viewport**: `<meta charset="UTF-8">` and `<meta name="viewport" content="width=device-width, initial-scale=1.0">`.
- **Title Tag Pattern**: `TIX Studio | Creative Marketing & Production Agency in Alexandria`.
- **Meta Description**: Concise, high-converting summary of capabilities under 160 characters.
- **Canonical Tags**:
  ```html
  <link rel="canonical" href="https://tixstudio.com/">
  <link rel="alternate" hreflang="en" href="https://tixstudio.com/">
  <link rel="alternate" hreflang="ar" href="https://tixstudio.com/ar/">
  ```

### 1.2 OpenGraph & Twitter Cards
Configured for rich preview cards when shared on WhatsApp, LinkedIn, iMessage, and X (Twitter):
- `og:type` = `website`
- `og:site_name` = `TIX Studio`
- `og:image` = `assets/images/hero-bg.png` (1200 × 630 px standard ratio)
- `twitter:card` = `summary_large_image`

### 1.3 Structured Data (`JSON-LD`)
Implemented on `index.html` and `ar/index.html` via Schema.org:
- **`@type: "Organization"`**: Declares official name, logo URL, address locality (`Alexandria, EG`), and official domain.
- **`@type: "WebSite"`**: Establishes search authority and publisher identity.
- **`@type: "WebPage"`**: Defines individual page context and hierarchy.

### 1.4 Crawler Directives
- **`robots.txt`**: Grants full crawler access (`User-agent: *`, `Allow: /`) and specifies the sitemap path (`Sitemap: https://tixstudio.com/sitemap.xml`).
- **`sitemap.xml`**: Lists canonical URLs for `/`, `/ar/`, `/pages/work.html`, `/pages/services.html`, `/pages/about.html`, and `/pages/contact.html` with explicit priority and change frequencies.

---

## 2. Performance & Core Web Vitals Optimization

The site is engineered to achieve 95+ scores on Google Lighthouse.

### 2.1 Critical Rendering Path
1. **Font Optimization**:
   ```html
   <link rel="preconnect" href="https://fonts.googleapis.com">
   <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
   ```
   Establishes DNS lookup and TLS handshake early, reducing font download delays.
2. **Hero Image Preload (LCP)**:
   ```html
   <link rel="preload" as="image" href="assets/images/hero-bg.png" fetchpriority="high">
   ```
3. **Non-Blocking Scripts**:
   All scripts declare `defer` to ensure the HTML parser is never blocked:
   ```html
   <script src="js/layout.js" defer></script>
   <script src="js/main.js" defer></script>
   ```

---

## 3. Security Hardening (`_headers` & CSP)

The project includes an enterprise-grade `_headers` file utilized by Cloudflare Pages and modern static CDNs, as well as a fallback `<meta http-equiv="Content-Security-Policy">`.

### Content Security Policy (CSP):
- **`default-src 'self'`**: Disallows external scripts from unauthorized origins.
- **`font-src 'self' https://fonts.gstatic.com`**: Restricts font downloads to verified Google CDN endpoints.
- **`style-src 'self' 'unsafe-inline' https://fonts.googleapis.com`**: Allows Google Fonts and component animations.
- **`frame-ancestors 'none'`**: Completely blocks framing (prevents clickjacking attacks).
- **`object-src 'none'`**: Disallows Flash and legacy Java plugins.

### Security HTTP Headers:
- `X-Content-Type-Options: nosniff` (Prevents MIME-type sniffing).
- `X-Frame-Options: DENY` (Anti-clickjacking protection).
- `Referrer-Policy: strict-origin-when-cross-origin` (Protects referrer data).
- `Permissions-Policy: camera=(), microphone=(), geolocation=()` (Disables unnecessary device sensor access).

---

## 4. Accessibility (a11y) Standards

1. **Skip-to-Content Link**: Injected as the very first DOM element by `layout.js` (`#main-content`).
2. **ARIA Roles**:
   - Navigation: `role="navigation"`, `aria-label="Main navigation"`.
   - Modals: `role="dialog"`, `aria-modal="true"`.
   - Interactive Buttons: `aria-expanded="false"`, `aria-controls="mobile-menu"`.
3. **Contrast Compliance**: Meets WCAG AA contrast ratios for white and crimson typography against obsidian/onyx backgrounds.
