/**
 * TIX - Shared Layout Injector
 * Injects the shared navigation and footer into every page.
 */

"use strict";

const Layout = (() => {
  const SKIP_LINK = `<a class="skip-link" href="#main-content">Skip to main content</a>`;

  const assetPath = (path, isRoot) => (isRoot ? path.replace('../', '') : path);

  const getPageKey = () => {
    const path = window.location.pathname.toLowerCase();

    if (path.includes('work')) return 'work';
    if (path.includes('services')) return 'services';
    if (path.includes('about')) return 'about';
    if (path.includes('contact')) return 'contact';
    return 'home';
  };

  const escapeAttr = value => String(value).replace(/[&<>"']/g, char => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  })[char]);

  const NAV_HTML = `
<nav class="nav" id="main-nav" role="navigation" aria-label="Main navigation">
  <div class="container">
    <div class="nav__inner">
      <a href="../index.html" class="nav__logo" aria-label="TIX Home">
        <img
          src="../assets/images/tix.png"
          alt="TIX Logo"
          class="nav__logo-img"
          width="60"
          height="60"
        >
      </a>

      <ul class="nav__links">
        <li><a href="../pages/work.html">Work</a></li>
        <li><a href="../pages/services.html">Services</a></li>
        <li><a href="../pages/about.html">Studio</a></li>
      </ul>

      <div class="nav__actions">
        <a href="../pages/contact.html" class="nav__cta">
          <span data-nav-contact>Contact</span>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
            <path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </a>

        {{LANGUAGE_SWITCH}}
      </div>

      <button class="nav__burger" aria-label="Toggle menu" aria-expanded="false" aria-controls="mobile-menu">
        <span></span><span></span><span></span>
      </button>
    </div>
  </div>
</nav>

<div class="mobile-menu" id="mobile-menu" role="dialog" aria-modal="true" aria-label="Navigation">
  <nav class="mobile-menu__links">
    <a href="../pages/work.html">Work</a>
    <a href="../pages/services.html">Services</a>
    <a href="../pages/about.html">Studio</a>
  </nav>
  <div class="mobile-menu__cta">
    <a href="../pages/contact.html">Let's Build It -></a>
  </div>
  <div class="mobile-menu__meta">TIX - Alexandria / Est. 2025</div>
</div>
`;

  const NAV_HTML_ROOT = NAV_HTML
    .replace(/href="\.\.\/index\.html"/g, 'href="index.html"')
    .replace(/href="\.\.\/pages\//g, 'href="pages/')
    .replace(/src="\.\.\/assets\//g, 'src="assets/');

  const FOOTER_IMAGE_SETS = {

    home: [
      { src: '../assets/images/footer-placeholders/home-01.jpg', alt: 'TIX home footer image 1' },
      { src: '../assets/images/footer-placeholders/home-02.jpg', alt: 'TIX home footer image 2' },
      { src: '../assets/images/footer-placeholders/home-03.jpg', alt: 'TIX home footer image 3' }
    ],

    work: [
      { src: '../assets/images/footer-placeholders/work-01.jpg', alt: 'TIX work footer image 1' },
      { src: '../assets/images/footer-placeholders/work-02.jpg', alt: 'TIX work footer image 2' },
      { src: '../assets/images/footer-placeholders/work-03.jpg', alt: 'TIX work footer image 3' }
    ],


    services: [
      { src: '../assets/images/footer-placeholders/services-01.jpg', alt: 'TIX services footer image 1' },
      { src: '../assets/images/footer-placeholders/services-02.jpg', alt: 'TIX services footer image 2' },
      { src: '../assets/images/footer-placeholders/services-03.jpg', alt: 'TIX services footer image 3' }
    ],


    about: [
      { src: '../assets/images/footer-placeholders/about-01.jpg', alt: 'TIX studio footer image 1' },
      { src: '../assets/images/footer-placeholders/about-02.jpg', alt: 'TIX studio footer image 2' },
      { src: '../assets/images/footer-placeholders/about-03.jpg', alt: 'TIX studio footer image 3' }
    ]
  };

  const buildFooterImage = (image, index, isRoot) => `
                    <div class="img-card">
                        <img src="${escapeAttr(assetPath(image.src, isRoot))}" alt="${escapeAttr(image.alt)}" loading="lazy" decoding="async" width="400" height="300" data-footer-image-slot="${index + 1}">
                    </div>`;

  const buildFooterHTML = (isRoot, pageKey) => {
    const pagesPath = isRoot ? 'pages/' : '../pages/';
    const firePath = assetPath('../assets/images/fire.png', isRoot);
    const imagesHTML = (FOOTER_IMAGE_SETS[pageKey] || FOOTER_IMAGE_SETS.home)
      .map((image, index) => buildFooterImage(image, index, isRoot))
      .join('');

    return `
<section class="tix-section">
    <div class="tix-bg-glow"></div>
    <div class="tix-vignette"></div>

    <div class="folder-stage">
        <div class="folder" id="folder" role="img" aria-label="Folder with project images">
            <div class="folder__tab"></div>
            <div class="folder__back">
                <div class="folder__images">
${imagesHTML}
                </div>
            </div>
            <div class="folder__front"></div>
        </div>
    </div>

    <div class="cta-card">
        <div class="cta-logo" aria-hidden="true">
            <img src="${firePath}" alt="TIX flame logo" loading="lazy" decoding="async" width="170" height="88">
        </div>

        <div class="cta-inner">
            <h2 class="cta-headline">Let's make something impossible to ignore.</h2>
            <p class="cta-sub">Creative direction, production, and digital experiences designed to leave a mark.</p>
            <a href="${pagesPath}contact.html" class="cta-btn">Let's Build It -></a>
        </div>
    </div>

    <footer class="tix-footer" role="contentinfo">
        <div class="tix-footer__inner">
            <ul class="tix-footer__links">
                <li><a href="#">Support</a></li>
                <li><a href="#">Terms & Conditions</a></li>
                <li><a href="#">Privacy Policy</a></li>
            </ul>

            <span class="tix-footer__copy">
                &copy; Copyright 2026, All Rights Reserved FOR TIX
            </span>
        </div>
    </footer>
</section>
`;
  };

  function inject() {
    const isRoot = !window.location.pathname.includes('/pages/');
    const pageKey = getPageKey();
    const isArabic = /\/ar(?:\/|$)/i.test(window.location.pathname);
    const hasArabicHome = pageKey === 'home';
    let navHTML = isArabic ? NAV_HTML : (isRoot ? NAV_HTML_ROOT : NAV_HTML);
    let footerHTML = buildFooterHTML(isRoot && !isArabic, pageKey);

    if (isArabic) {
      navHTML = navHTML
        .replace('href="../index.html" class="nav__logo"', 'href="index.html" class="nav__logo"')
        .replace('aria-label="TIX Home"', 'aria-label="الصفحة الرئيسية لـ TIX"')
        .replace('alt="TIX Logo"', 'alt="شعار TIX"')
        .replace('Work</a>', 'الأعمال</a>')
        .replace('Services</a>', 'الخدمات</a>')
        .replace('Studio</a>', 'الاستوديو</a>')
        .replace('Main navigation', 'التنقل الرئيسي')
        .replace('aria-label="Navigation"', 'aria-label="التنقل"')
        .replace('aria-label="Toggle menu"', 'aria-label="فتح قائمة التنقل"')
        .replace('data-nav-contact>Contact', 'data-nav-contact>تواصل معنا')
        .replace("Let's Build It -></a>", 'لنبدأ مشروعك</a>')
        .replace('TIX - Alexandria / Est. 2025', 'TIX - الإسكندرية / منذ 2025');
      footerHTML = footerHTML
        .replace('Folder with project images', 'ملف يضم صور المشاريع')
        .replace("Let's make something impossible to ignore.", 'لنصنع معًا ما لا يمكن تجاهله.')
        .replace('Creative direction, production, and digital experiences designed to leave a mark.', 'استراتيجية وإنتاج وتجارب رقمية تترك أثرًا.')
        .replace("Let's Build It ->", 'لنبدأ مشروعك')
        .replace('Support</a>', 'الدعم</a>')
        .replace('Terms & Conditions</a>', 'الشروط والأحكام</a>')
        .replace('Privacy Policy</a>', 'سياسة الخصوصية</a>')
        .replace('&copy; Copyright 2026, All Rights Reserved FOR TIX', '&copy; 2026 TIX. جميع الحقوق محفوظة.');
    }

    const switchHref = isArabic ? '../index.html' : 'ar/index.html';
    const switchLabel = isArabic ? 'EN' : 'AR';
    const switchAriaLabel = isArabic ? 'التبديل إلى الإنجليزية' : 'Switch to Arabic';
    const switchMarkup = hasArabicHome
      ? `<a class="nav__language" href="${switchHref}" lang="${isArabic ? 'en' : 'ar'}" hreflang="${isArabic ? 'en' : 'ar'}" aria-label="${switchAriaLabel}">${switchLabel}</a>`
      : '';
    navHTML = navHTML.replace('{{LANGUAGE_SWITCH}}', switchMarkup);

    if (isArabic) {
      document.documentElement.lang = 'ar';
      document.documentElement.dir = 'rtl';
    }

    const skipLink = isArabic
      ? '<a class="skip-link" href="#main-content">انتقل إلى المحتوى الرئيسي</a>'
      : SKIP_LINK;
    document.body.insertAdjacentHTML('afterbegin', skipLink + navHTML);

    const isContactPage =
      window.location.pathname.includes('contact.html') ||
      window.location.pathname.includes('/contact');

    if (!isContactPage) {
      document.body.insertAdjacentHTML('beforeend', footerHTML);
    }

    const path = window.location.pathname;
    document.querySelectorAll('.nav__links a, .mobile-menu__links a').forEach(a => {
      const href = a.getAttribute('href') || '';
      const isActive =
        (href.includes('work') && path.includes('work')) ||
        (href.includes('services') && path.includes('services')) ||
        (href.includes('about') && path.includes('about')) ||
        (href.includes('contact') && path.includes('contact')) ||
        (href === 'index.html' && (path === '/' || path.endsWith('index.html')));
      a.classList.toggle('active', isActive);
    });
  }

  return { inject };
})();

document.addEventListener('DOMContentLoaded', () => Layout.inject());
