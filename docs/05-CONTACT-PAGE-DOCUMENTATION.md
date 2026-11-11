# 05. Contact Page Documentation (`pages/contact.html`)

This document covers the architectural layout, interactive inquiry form, validation logic, floating ambient orb, and custom footer for `pages/contact.html`.

---

## 1. Page Purpose & Architecture

The Contact page (`pages/contact.html`) is engineered to convert qualified commercial leads. Its design prioritizes frictionless input while upholding the agency’s dark luxury branding.

```
├── Global Navigation (Injected by layout.js)
├── <main id="main-content">
│   ├── 1. Contact Hero with Ambient Orb (.contact-hero & .contact-orb)
│   ├── 2. Interactive Inquiry Form (.contact-form-section)
│   └── 3. Bespoke Contact Footer (.contact-footer)
└── (Generic 3D folder footer is intentionally bypassed by layout.js)
```

---

## 2. Interactive Visuals: Ambient Floating Orb (`.contact-orb`)

- In `css/contact.css`, `.contact-orb` is an oversized radial element with heavy Gaussian blur (`filter: blur(80px)`), pulsating through keyframe animations (`@keyframes orbFloat`).
- It creates an organic, warm crimson glow behind the hero title without consuming significant CPU or GPU cycles (`transform: translate3d()` and `will-change: transform`).

---

## 3. Inquiry Form & Validation Logic (`ContactForm` in `js/main.js`)

### Form Fields:
1. **Name** (`#contact-name`): Required text string (minimum 2 characters).
2. **Email** (`#contact-email`): Required, validated against RFC 5322 standard regex.
3. **Phone / WhatsApp** (`#contact-phone`): Optional phone number with international format support.
4. **Services Interested In**: Multi-select pill buttons (Creative Direction, Commercial Video, Digital Experience, Brand Identity).
5. **Budget Tier**: Selectable range indicators ($5k-$15k, $15k-$30k, $30k+).
6. **Project Scope / Message** (`#contact-message`): Textarea for project overview.

### Developer Logic:
- **Real-Time Input Validation**:
  - Validates `input` and `blur` events.
  - Adds `.is-invalid` to the parent input container and displays clear error feedback beneath the field.
  - Clears error styling immediately when valid characters are keyed in.
- **Submission State & Micro-Interactions**:
  - Prevents standard HTML form reload via `event.preventDefault()`.
  - The submit button transitions to a loading state: disables clicks, swaps text for an animated spinner SVG.
  - Currently simulates an asynchronous transmission before displaying a luxury success toast card.

---

## 4. Why `layout.js` Skips Footer Injection on Contact

Unlike other pages (`index.html`, `about.html`, `services.html`, `work.html`) that share the automated 3D folder footer:
- `pages/contact.html` contains its own dedicated, full-width footer component (`.contact-footer`).
- In `js/layout.js`, lines 225-231 explicitly check:
  ```javascript
  const isContactPage =
    window.location.pathname.includes('contact.html') ||
    window.location.pathname.includes('/contact');

  if (!isContactPage) {
    document.body.insertAdjacentHTML('beforeend', footerHTML);
  }
  ```
- This prevents duplicate footers and keeps the contact page focused on direct outreach.

---

## 5. Developer Handover: Connecting a Real Backend Endpoint

To connect the form to an active email or CRM backend:

1. **Option A (Formspree / Basin / Formkeep — Recommended for static sites)**:
   - Change the `<form>` opening tag:
     ```html
     <form action="https://formspree.io/f/{YOUR_FORM_ID}" method="POST" id="tixContactForm">
     ```
   - Update `ContactForm` in `js/main.js` to send a `fetch(form.action, { method: 'POST', body: new FormData(form), headers: { 'Accept': 'application/json' } })`.

2. **Option B (Serverless / AWS Lambda / Cloudflare Worker / Node API)**:
   - Point the fetch URL to your REST endpoint:
     ```javascript
     const response = await fetch('https://api.tixstudio.com/v1/inquiry', {
       method: 'POST',
       headers: { 'Content-Type': 'application/json' },
       body: JSON.stringify(formData)
     });
     ```
