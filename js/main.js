/**
 * TIX — Main JavaScript
 * Animations · Navigation · Scroll reveals · Interactions
 * Premium Portfolio Gallery Overlay
 */

"use strict";

/* ── NAV ─────────────────────────────────────────────────── */
const Nav = (() => {
  let nav, burger, mobile;
  const body = document.body;
  let isOpen = false;

  function handleScroll() {
    if (!nav) return;
    nav.classList.toggle('scrolled', window.scrollY > 40);
  }

  function toggleMenu() {
    isOpen = !isOpen;
    burger?.classList.toggle('open', isOpen);
    mobile?.classList.toggle('open', isOpen);
    burger?.setAttribute('aria-expanded', String(isOpen));
    mobile?.setAttribute('aria-hidden', String(!isOpen));
    body.style.overflow = isOpen ? 'hidden' : '';
  }

  function closeMenu() {
    if (!isOpen) return;
    isOpen = false;
    burger?.classList.remove('open');
    mobile?.classList.remove('open');
    burger?.setAttribute('aria-expanded', 'false');
    mobile?.setAttribute('aria-hidden', 'true');
    body.style.overflow = '';
  }

  function setActive() {
    const path = window.location.pathname;
    document.querySelectorAll('.nav__links a, .mobile-menu__links a').forEach(a => {
      const href = a.getAttribute('href') || '';
      const isActive =
        (href.includes('work') && path.includes('work')) ||
        (href.includes('services') && path.includes('services')) ||
        (href.includes('about') && path.includes('about')) ||
        (href.includes('contact') && path.includes('contact')) ||
        ((href === 'index.html' || href === '../index.html') && (path === '/' || path.endsWith('index.html') || path.endsWith('/tix2/')));
      a.classList.toggle('active', isActive);
    });
  }

  function init() {
    nav = document.querySelector('.nav');
    burger = document.querySelector('.nav__burger');
    mobile = document.querySelector('.mobile-menu');
    mobile?.setAttribute('aria-hidden', 'true');
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    burger?.addEventListener('click', toggleMenu);
    mobile?.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
    document.addEventListener('keydown', e => e.key === 'Escape' && closeMenu());
    setActive();
  }

  return { init };
})();

/* ── SCROLL REVEAL ──────────────────────────────────────── */
const Reveal = (() => {
  const CLASS = 'is-visible';

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add(CLASS);
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  function init() {
    document.querySelectorAll('[data-reveal], [data-stagger], .js-fade, .js-fade-left, .js-fade-right, .js-scale').forEach(el => {
      io.observe(el);
    });
  }

  return { init };
})();

/* ── PARALLAX ───────────────────────────────────────────── */
const Parallax = (() => {
  const items = [];

  function register(el, speed = 0.15) {
    items.push({ el, speed, top: el.getBoundingClientRect().top + window.scrollY });
  }

  function update() {
    const scrollY = window.scrollY;
    items.forEach(({ el, speed }) => {
      const offset = scrollY * speed;
      el.style.transform = `translate3d(0,${offset}px,0)`;
    });
  }

  function init() {
    document.querySelectorAll('[data-parallax]').forEach(el => {
      const speed = parseFloat(el.dataset.parallax) || 0.12;
      register(el, speed);
    });
    if (items.length > 0) {
      window.addEventListener('scroll', update, { passive: true });
      update();
    }
  }

  return { init };
})();

/* ── CURSOR (desktop) ───────────────────────────────────── */
const Cursor = (() => {
  let dot, ring, mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;
  const LERP = 0.12;

  function lerp(a, b, t) { return a + (b - a) * t; }

  function createElements() {
    dot = document.createElement('div');
    ring = document.createElement('div');
    dot.className = 'cursor-dot';
    ring.className = 'cursor-ring';
    document.body.appendChild(dot);
    document.body.appendChild(ring);
  }

  function tick() {
    ringX = lerp(ringX, mouseX, LERP);
    ringY = lerp(ringY, mouseY, LERP);
    dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
    ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
    requestAnimationFrame(tick);
  }

  function bindHoverTargets() {
    document.querySelectorAll('a,button,[role="button"],.gallery-item,.work-filter-btn,.gallery-arrow,.portfolio-overlay__nav-btn').forEach(el => {
      el.addEventListener('mouseenter', () => ring?.classList.add('hover'));
      el.addEventListener('mouseleave', () => ring?.classList.remove('hover'));
    });
  }

  function init() {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    createElements();
    document.body.classList.add('cursor-active');
    document.addEventListener('mousemove', e => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });
    document.addEventListener('mousedown', () => ring.classList.add('click'));
    document.addEventListener('mouseup', () => ring.classList.remove('click'));
    bindHoverTargets();
    tick();
  }

  return { init, bindHoverTargets };
})();

/* ── MARQUEE (duplicate content) ───────────────────────── */
const Marquees = (() => {
  function init() {
    document.querySelectorAll('.marquee__track').forEach(track => {
      if (track.dataset.cloned) return;
      track.dataset.cloned = 'true';
      if (track.closest('.trust-section')) {
        Array.from(track.children).forEach(item => track.appendChild(item.cloneNode(true)));
        return;
      }
      const clone = track.cloneNode(true);
      track.parentElement.appendChild(clone);
    });
  }
  return { init };
})();

/* ── PINBOARD HOVER ─────────────────────────────────────── */
const Pinboard = (() => {
  function init() {
    document.querySelectorAll('.pinboard__card').forEach(card => {
      card.addEventListener('mouseenter', () => {
        card.style.zIndex = '3';
      });
      card.addEventListener('mouseleave', () => {
        card.style.zIndex = '';
      });
    });
  }
  return { init };
})();

/* ── SMOOTH COUNTER ─────────────────────────────────────── */
const Counter = (() => {
  function animateCount(el) {
    const target = parseInt(el.dataset.count, 10);
    const suffix = el.dataset.suffix || '';
    const duration = 1800;
    const start = performance.now();

    function easeOut(t) { return 1 - Math.pow(1 - t, 3); }

    function step(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const value = Math.round(easeOut(progress) * target);
      el.textContent = value + suffix;
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCount(entry.target);
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  function init() {
    document.querySelectorAll('[data-count]').forEach(el => io.observe(el));
  }

  return { init };
})();

/* ── WORK GALLERY FILTER ────────────────────────────────── */
const WorkFilter = (() => {
  function init() {
    const btns = document.querySelectorAll('.work-filter-btn');
    if (!btns.length) return;

    btns.forEach(btn => {
      btn.setAttribute('aria-pressed', btn.classList.contains('active') ? 'true' : 'false');
    });

    btns.forEach(btn => {
      btn.addEventListener('click', () => {
        btns.forEach(b => {
          b.classList.remove('active');
          b.setAttribute('aria-pressed', 'false');
        });
        btn.classList.add('active');
        btn.setAttribute('aria-pressed', 'true');
        const filter = btn.dataset.filter;
        const sections = document.querySelectorAll('.cat-section');
        sections.forEach(sec => {
          if (filter === 'all' || sec.dataset.category === filter) {
            sec.style.display = '';
            sec.style.opacity = '0';
            sec.style.transform = 'translateY(20px)';
            requestAnimationFrame(() => {
              sec.style.transition = 'opacity .4s ease, transform .4s ease';
              sec.style.opacity = '1';
              sec.style.transform = 'none';
            });
          } else {
            sec.style.transition = 'opacity .3s ease';
            sec.style.opacity = '0';
            setTimeout(() => { sec.style.display = 'none'; }, 300);
          }
        });
      });
    });
  }

  return { init };
})();

/* ── CONTACT FORM ───────────────────────────────────────── */
const ContactForm = (() => {
  function init() {
    const form = document.querySelector('.contact-form form');
    if (!form) return;

    form.addEventListener('submit', e => {
      e.preventDefault();
      const btn = form.querySelector('.form-submit');
      const original = btn.textContent;
      btn.textContent = 'Message Sent ✓';
      btn.style.background = 'var(--crimson)';
      btn.style.color = 'var(--white)';
      btn.disabled = true;
      setTimeout(() => {
        btn.textContent = original;
        btn.style.background = '';
        btn.style.color = '';
        btn.disabled = false;
        form.reset();
      }, 3500);
    });
  }

  return { init };
})();

/* ── HORIZONTAL SCROLL ──────────────────────────────────── */
const HScroll = (() => {
  function init() {
    document.querySelectorAll('.gallery-row').forEach(row => {
      let isDown = false, startX = 0, scrollLeft = 0;
      row.addEventListener('mousedown', e => {
        isDown = true;
        row.style.cursor = 'grabbing';
        startX = e.pageX - row.offsetLeft;
        scrollLeft = row.scrollLeft;
      });
      row.addEventListener('mouseleave', () => { isDown = false; row.style.cursor = ''; });
      row.addEventListener('mouseup', () => { isDown = false; row.style.cursor = ''; });
      row.addEventListener('mousemove', e => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - row.offsetLeft;
        const walk = (x - startX) * 1.2;
        row.scrollLeft = scrollLeft - walk;
      });
    });
  }
  return { init };
})();

/* ── PAGE TRANSITION (FIXED — Proper History Support) ──── */
const PageTransition = (() => {
  let overlay;
  let transitionTimer = 0;

  function hideOverlay() {
    if (!overlay) return;
    window.clearTimeout(transitionTimer);
    overlay.classList.remove('page-overlay--visible');
    overlay.setAttribute('aria-hidden', 'true');
  }

  function isInternalNavigableLink(link) {
    const href = link.getAttribute('href') || '';
    if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('javascript:')) return false;
    if (link.target && link.target !== '_self') return false;
    if (link.hasAttribute('download')) return false;

    let url;
    try {
      url = new URL(href, window.location.href);
    } catch {
      return false;
    }

    if (!['http:', 'https:', 'file:'].includes(url.protocol)) return false;
    if (url.origin !== window.location.origin) return false;
    if (url.pathname === window.location.pathname && url.search === window.location.search && url.hash) return false;
    return true;
  }

  function init() {
    // Create transition overlay
    overlay = document.createElement('div');
    overlay.id = 'page-overlay';
    overlay.setAttribute('aria-hidden', 'true');
    document.body.appendChild(overlay);

    // Fade in on page load — reveal the page
    overlay.classList.add('page-overlay--visible');
    requestAnimationFrame(() => {
      requestAnimationFrame(hideOverlay);
    });

    // Intercept internal link clicks for smooth transition
    document.addEventListener('click', e => {
      const link = e.target.closest('a[href]');
      if (!link) return;
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      if (!isInternalNavigableLink(link)) return;

      e.preventDefault();

      // Animate overlay in, then navigate
      const href = link.href;
      overlay.classList.add('page-overlay--visible');
      overlay.setAttribute('aria-hidden', 'false');
      transitionTimer = setTimeout(() => {
        window.location.assign(href);
      }, 320);
    });

    // Handle browser back/forward
    window.addEventListener('pageshow', hideOverlay);
    window.addEventListener('popstate', hideOverlay);
    window.addEventListener('pagehide', hideOverlay);
    window.addEventListener('beforeunload', () => window.clearTimeout(transitionTimer));
  }

  return { init };
})();

/* ── HERO TEXT ANIMATION ─────────────────────────────────── */
const HeroAnim = (() => {
  function init() {
    const heroTitle = document.querySelector('.hero__title, .impact-hero__logo');
    if (heroTitle) {
      heroTitle.style.opacity = '0';
      heroTitle.style.transform = 'translateY(30px)';
      setTimeout(() => {
        heroTitle.style.transition = 'opacity .9s var(--ease-out), transform .9s var(--ease-out)';
        heroTitle.style.opacity = '1';
        heroTitle.style.transform = 'none';
      }, 150);
    }

    const heroDesc = document.querySelector('.hero__desc, .impact-hero__headline');
    if (heroDesc) {
      heroDesc.style.opacity = '0';
      heroDesc.style.transform = 'translateY(20px)';
      setTimeout(() => {
        heroDesc.style.transition = 'opacity .8s var(--ease-out), transform .8s var(--ease-out)';
        heroDesc.style.opacity = '1';
        heroDesc.style.transform = 'none';
      }, 380);
    }

    const heroActions = document.querySelector('.hero__actions, .impact-hero__btn-row, .hero__tags');
    if (heroActions) {
      heroActions.style.opacity = '0';
      setTimeout(() => {
        heroActions.style.transition = 'opacity .7s ease';
        heroActions.style.opacity = '1';
      }, 550);
    }
  }

  return { init };
})();

/* ══════════════════════════════════════════════════════════
   PREMIUM PORTFOLIO GALLERY OVERLAY
   ══════════════════════════════════════════════════════════ */
const PortfolioOverlay = (() => {
  let overlayEl, galleryContainer, titleEl, descEl, counterEl, closeBtn;
  let prevBtn, nextBtn, imageWrapper;
  let currentIndex = 0;
  let images = [];
  let previousFocus = null;
  let touchStartX = 0;
  let touchStartY = 0;
  let isSwiping = false;
  let isOpen = false;

  // Category data with images + descriptions
  const categoryData = {};

  function makeGalleryImages(categoryTitle, paths) {
    return paths.map((src, index) => ({
      src,
      alt: `${categoryTitle} portfolio image ${String(index + 1).padStart(2, '0')}`,
      placeholder: `${categoryTitle} ${String(index + 1).padStart(2, '0')}`
    }));
  }

  const PORTFOLIO_GALLERY_IMAGES = {
    // ============================
    // PLACE YOUR FASHION IMAGES HERE
    // Replace placeholder files with your real images
    // ============================
    fashion: [
      '../assets/images/portfolio/fashion/fashion-01.jpg',
      '../assets/images/portfolio/fashion/fashion-02.jpg',
      '../assets/images/portfolio/fashion/fashion-03.jpg',
      '../assets/images/portfolio/fashion/fashion-04.jpg',
      '../assets/images/portfolio/fashion/fashion-05.jpg',
      '../assets/images/portfolio/fashion/fashion-06.jpg',
      '../assets/images/portfolio/fashion/fashion-07.jpg',
      '../assets/images/portfolio/fashion/fashion-08.jpg',
      '../assets/images/portfolio/fashion/fashion-09.jpg',
      '../assets/images/portfolio/fashion/fashion-10.jpg',
      '../assets/images/portfolio/fashion/fashion-11.jpg',
      '../assets/images/portfolio/fashion/fashion-12.jpg',
      '../assets/images/portfolio/fashion/fashion-13.jpg',
      '../assets/images/portfolio/fashion/fashion-14.jpg',
      '../assets/images/portfolio/fashion/fashion-15.jpg'
    ],

    // ============================
    // PLACE YOUR JEWELRY & LUXURY IMAGES HERE
    // Replace placeholder files with your real images
    // ============================
    jewelry: [
      '../assets/images/portfolio/jewelry/jewelry-01.jpg',
      '../assets/images/portfolio/jewelry/jewelry-02.jpg',
      '../assets/images/portfolio/jewelry/jewelry-03.jpg',
      '../assets/images/portfolio/jewelry/jewelry-04.jpg',
      '../assets/images/portfolio/jewelry/jewelry-05.jpg',
      '../assets/images/portfolio/jewelry/jewelry-06.jpg',
      '../assets/images/portfolio/jewelry/jewelry-07.jpg',
      '../assets/images/portfolio/jewelry/jewelry-08.jpg',
      '../assets/images/portfolio/jewelry/jewelry-09.jpg',
      '../assets/images/portfolio/jewelry/jewelry-10.jpg',
      '../assets/images/portfolio/jewelry/jewelry-11.jpg',
      '../assets/images/portfolio/jewelry/jewelry-12.jpg',
      '../assets/images/portfolio/jewelry/jewelry-13.jpg',
      '../assets/images/portfolio/jewelry/jewelry-14.jpg',
      '../assets/images/portfolio/jewelry/jewelry-15.jpg'
    ],

    // ============================
    // PLACE YOUR PERFUME / BEAUTY IMAGES HERE
    // Replace placeholder files with your real images
    // ============================
    beauty: [
      '../assets/images/portfolio/beauty/beauty-01.jpg',
      '../assets/images/portfolio/beauty/beauty-02.jpg',
      '../assets/images/portfolio/beauty/beauty-03.jpg',
      '../assets/images/portfolio/beauty/beauty-04.jpg',
      '../assets/images/portfolio/beauty/beauty-05.jpg',
      '../assets/images/portfolio/beauty/beauty-06.jpg',
      '../assets/images/portfolio/beauty/beauty-07.jpg',
      '../assets/images/portfolio/beauty/beauty-08.jpg',
      '../assets/images/portfolio/beauty/beauty-09.jpg',
      '../assets/images/portfolio/beauty/beauty-10.jpg',
      '../assets/images/portfolio/beauty/beauty-11.jpg',
      '../assets/images/portfolio/beauty/beauty-12.jpg',
      '../assets/images/portfolio/beauty/beauty-13.jpg',
      '../assets/images/portfolio/beauty/beauty-14.jpg',
      '../assets/images/portfolio/beauty/beauty-15.jpg'
    ],

    // ============================
    // PLACE YOUR FOOD & BEVERAGE IMAGES HERE
    // Replace placeholder files with your real images
    // ============================
    food: [
      '../assets/images/portfolio/food/food-01.jpg',
      '../assets/images/portfolio/food/food-02.jpg',
      '../assets/images/portfolio/food/food-03.jpg',
      '../assets/images/portfolio/food/food-04.jpg',
      '../assets/images/portfolio/food/food-05.jpg',
      '../assets/images/portfolio/food/food-06.jpg',
      '../assets/images/portfolio/food/food-07.jpg',
      '../assets/images/portfolio/food/food-08.jpg',
      '../assets/images/portfolio/food/food-09.jpg',
      '../assets/images/portfolio/food/food-10.jpg',
      '../assets/images/portfolio/food/food-11.jpg',
      '../assets/images/portfolio/food/food-12.jpg',
      '../assets/images/portfolio/food/food-13.jpg',
      '../assets/images/portfolio/food/food-14.jpg',
      '../assets/images/portfolio/food/food-15.jpg'
    ],

    // ============================
    // PLACE YOUR EVENTS & CONCERTS IMAGES HERE
    // Replace placeholder files with your real images
    // ============================
    events: [
      '../assets/images/portfolio/events/events-01.jpg',
      '../assets/images/portfolio/events/events-02.jpg',
      '../assets/images/portfolio/events/events-03.jpg',
      '../assets/images/portfolio/events/events-04.jpg',
      '../assets/images/portfolio/events/events-05.jpg',
      '../assets/images/portfolio/events/events-06.jpg',
      '../assets/images/portfolio/events/events-07.jpg',
      '../assets/images/portfolio/events/events-08.jpg',
      '../assets/images/portfolio/events/events-09.jpg',
      '../assets/images/portfolio/events/events-10.jpg',
      '../assets/images/portfolio/events/events-11.jpg',
      '../assets/images/portfolio/events/events-12.jpg',
      '../assets/images/portfolio/events/events-13.jpg',
      '../assets/images/portfolio/events/events-14.jpg',
      '../assets/images/portfolio/events/events-15.jpg'
    ],

    // ============================
    // PLACE YOUR REAL ESTATE & CORPORATE IMAGES HERE
    // Replace placeholder files with your real images
    // ============================
    realestate: [
      '../assets/images/portfolio/realestate/realestate-01.jpg',
      '../assets/images/portfolio/realestate/realestate-02.jpg',
      '../assets/images/portfolio/realestate/realestate-03.jpg',
      '../assets/images/portfolio/realestate/realestate-04.jpg',
      '../assets/images/portfolio/realestate/realestate-05.jpg',
      '../assets/images/portfolio/realestate/realestate-06.jpg',
      '../assets/images/portfolio/realestate/realestate-07.jpg',
      '../assets/images/portfolio/realestate/realestate-08.jpg',
      '../assets/images/portfolio/realestate/realestate-09.jpg',
      '../assets/images/portfolio/realestate/realestate-10.jpg',
      '../assets/images/portfolio/realestate/realestate-11.jpg',
      '../assets/images/portfolio/realestate/realestate-12.jpg',
      '../assets/images/portfolio/realestate/realestate-13.jpg',
      '../assets/images/portfolio/realestate/realestate-14.jpg',
      '../assets/images/portfolio/realestate/realestate-15.jpg'
    ]
  };

  function gatherCategoryData() {
    document.querySelectorAll('.cat-section').forEach(section => {
      const category = section.dataset.category;
      const titleEl = section.querySelector('.cat-title');
      const descEl = section.querySelector('.cat-sub');

      // Extract category display name (text only, no SVG)
      let catName = '';
      if (titleEl) {
        catName = titleEl.childNodes[0]?.textContent?.trim() || titleEl.textContent.trim();
      }

      categoryData[category] = {
        title: catName,
        description: descEl?.textContent?.trim() || '',
        images: makeGalleryImages(catName, PORTFOLIO_GALLERY_IMAGES[category] || [])
      };
    });
  }

  function createOverlay() {
    overlayEl = document.createElement('div');
    overlayEl.id = 'portfolio-overlay';
    overlayEl.className = 'portfolio-overlay';
    overlayEl.setAttribute('role', 'dialog');
    overlayEl.setAttribute('aria-modal', 'true');
    overlayEl.setAttribute('aria-label', 'Portfolio gallery');
    overlayEl.setAttribute('aria-hidden', 'true');

    const backdrop = document.createElement('div');
    backdrop.className = 'portfolio-overlay__backdrop';

    const content = document.createElement('div');
    content.className = 'portfolio-overlay__content';

    const header = document.createElement('header');
    header.className = 'portfolio-overlay__header';

    const headerLeft = document.createElement('div');
    headerLeft.className = 'portfolio-overlay__header-left';

    const brand = document.createElement('span');
    brand.className = 'portfolio-overlay__brand';
    brand.textContent = 'TIX';

    const divider = document.createElement('span');
    divider.className = 'portfolio-overlay__divider';
    divider.textContent = '|';

    titleEl = document.createElement('h2');
    titleEl.className = 'portfolio-overlay__title';
    headerLeft.append(brand, divider, titleEl);

    const headerRight = document.createElement('div');
    headerRight.className = 'portfolio-overlay__header-right';

    counterEl = document.createElement('span');
    counterEl.className = 'portfolio-overlay__counter';

    closeBtn = document.createElement('button');
    closeBtn.className = 'portfolio-overlay__close';
    closeBtn.type = 'button';
    closeBtn.setAttribute('aria-label', 'Close gallery');
    closeBtn.textContent = '×';
    headerRight.append(counterEl, closeBtn);
    header.append(headerLeft, headerRight);

    const stage = document.createElement('div');
    stage.className = 'portfolio-overlay__stage';

    prevBtn = document.createElement('button');
    prevBtn.className = 'portfolio-overlay__nav-btn portfolio-overlay__nav-btn--prev';
    prevBtn.type = 'button';
    prevBtn.setAttribute('aria-label', 'Previous image');
    prevBtn.textContent = '‹';

    imageWrapper = document.createElement('div');
    imageWrapper.className = 'portfolio-overlay__image-wrapper';
    imageWrapper.tabIndex = 0;
    imageWrapper.setAttribute('aria-label', 'Project image gallery');

    galleryContainer = document.createElement('div');
    galleryContainer.className = 'portfolio-overlay__image-track';
    imageWrapper.appendChild(galleryContainer);

    nextBtn = document.createElement('button');
    nextBtn.className = 'portfolio-overlay__nav-btn portfolio-overlay__nav-btn--next';
    nextBtn.type = 'button';
    nextBtn.setAttribute('aria-label', 'Next image');
    nextBtn.textContent = '›';

    stage.append(prevBtn, imageWrapper, nextBtn);

    descEl = document.createElement('div');
    descEl.className = 'portfolio-overlay__desc';

    const dots = document.createElement('div');
    dots.className = 'portfolio-overlay__dots';

    content.append(header, stage, descEl, dots);
    overlayEl.append(backdrop, content);

    document.body.appendChild(overlayEl);

    // Event listeners
    closeBtn.addEventListener('click', close);
    prevBtn.addEventListener('click', () => navigate(-1));
    nextBtn.addEventListener('click', () => navigate(1));

    // Click outside to close
    backdrop.addEventListener('click', close);
    overlayEl.addEventListener('click', e => {
      if (e.target === overlayEl) close();
    });

    // Keyboard
    overlayEl.addEventListener('keydown', handleKeydown);

    // Touch/swipe support
    imageWrapper.addEventListener('touchstart', handleTouchStart, { passive: true });
    imageWrapper.addEventListener('touchmove', handleTouchMove, { passive: false });
    imageWrapper.addEventListener('touchend', handleTouchEnd, { passive: true });
  }

  function handleKeydown(e) {
    if (!isOpen) return;
    switch (e.key) {
      case 'Escape':
        close();
        break;
      case 'ArrowLeft':
        navigate(-1);
        break;
      case 'ArrowRight':
        navigate(1);
        break;
      case 'Tab':
        trapFocus(e);
        break;
    }
  }

  function trapFocus(e) {
    const focusable = overlayEl.querySelectorAll('button:not(:disabled), [href], [tabindex]:not([tabindex="-1"])');
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }

  function handleTouchStart(e) {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
    isSwiping = false;
  }

  function handleTouchMove(e) {
    if (!touchStartX) return;
    const diffX = e.touches[0].clientX - touchStartX;
    const diffY = e.touches[0].clientY - touchStartY;
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 10) {
      isSwiping = true;
      e.preventDefault();
    }
  }

  function handleTouchEnd(e) {
    if (!isSwiping) return;
    const endX = e.changedTouches[0].clientX;
    const diff = endX - touchStartX;
    if (Math.abs(diff) > 50) {
      navigate(diff < 0 ? 1 : -1);
    }
    touchStartX = 0;
    touchStartY = 0;
    isSwiping = false;
  }

  function open(category) {
    const data = categoryData[category];
    if (!data || !data.images.length) return;

    previousFocus = document.activeElement;
    images = data.images;
    currentIndex = 0;
    isOpen = true;

    // Set text
    titleEl.textContent = data.title;
    descEl.textContent = data.description;

    // Build image track
    buildImageTrack();
    updateCounter();
    updateDots();
    updateNavButtons();

    // Show overlay with animation
    overlayEl.classList.add('is-active');
    overlayEl.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    // Stagger animation
    requestAnimationFrame(() => {
      overlayEl.classList.add('is-visible');
    });

    // Focus trap
    closeBtn.focus();
  }

  function close() {
    if (!isOpen) return;
    isOpen = false;
    overlayEl.classList.remove('is-visible');
    setTimeout(() => {
      overlayEl.classList.remove('is-active');
      overlayEl.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      if (previousFocus) {
        previousFocus.focus();
        previousFocus = null;
      }
    }, 450);
  }

  function buildImageTrack() {
    galleryContainer.replaceChildren();
    images.forEach((img, i) => {
      const slide = document.createElement('div');
      slide.className = 'portfolio-overlay__slide' + (i === 0 ? ' is-active' : '');
      slide.dataset.placeholder = img.placeholder || img.alt;
      slide.classList.add('is-loading');
      const imgEl = document.createElement('img');
      imgEl.alt = img.alt;
      imgEl.loading = i < 2 ? 'eager' : 'lazy';
      imgEl.decoding = 'async';
      imgEl.classList.add('is-loading');
      imgEl.addEventListener('load', () => {
        imgEl.classList.remove('is-loading');
        slide.classList.remove('is-loading');
        slide.classList.add('is-loaded');
      }, { once: true });
      imgEl.addEventListener('error', () => {
        imgEl.classList.remove('is-loading');
        slide.classList.remove('is-loading');
        slide.classList.add('has-missing-image');
      }, { once: true });
      if (i < 2) {
        imgEl.src = img.src;
      } else {
        imgEl.dataset.src = img.src;
        imgEl.classList.add('lazy');
      }
      slide.appendChild(imgEl);
      galleryContainer.appendChild(slide);
    });
  }

  function navigate(direction) {
    goTo(currentIndex + direction);
  }

  function goTo(newIndex) {
    if (newIndex < 0 || newIndex >= images.length) return;
    if (newIndex === currentIndex) return;

    const slides = galleryContainer.querySelectorAll('.portfolio-overlay__slide');
    const currentSlide = slides[currentIndex];
    const nextSlide = slides[newIndex];
    const direction = newIndex > currentIndex ? 1 : -1;

    // Lazy load upcoming image
    const nextImg = nextSlide.querySelector('img.lazy');
    if (nextImg && nextImg.dataset.src) {
      nextImg.src = nextImg.dataset.src;
      nextImg.classList.remove('lazy');
      delete nextImg.dataset.src;
    }

    // Also preload the one after
    if (newIndex + 1 < images.length) {
      const preloadSlide = slides[newIndex + 1];
      const preloadImg = preloadSlide?.querySelector('img.lazy');
      if (preloadImg && preloadImg.dataset.src) {
        preloadImg.src = preloadImg.dataset.src;
        preloadImg.classList.remove('lazy');
        delete preloadImg.dataset.src;
      }
    }

    // Determine animation direction
    const exitClass = direction > 0 ? 'slide-exit-left' : 'slide-exit-right';
    const enterClass = direction > 0 ? 'slide-enter-right' : 'slide-enter-left';

    // Animate out current
    currentSlide.classList.add(exitClass);
    currentSlide.classList.remove('is-active');

    // Animate in next
    nextSlide.classList.add(enterClass);
    nextSlide.classList.add('is-active');

    // Clean up classes after animation
    setTimeout(() => {
      currentSlide.classList.remove(exitClass);
      nextSlide.classList.remove(enterClass);
    }, 500);

    currentIndex = newIndex;
    updateCounter();
    updateDots();
    updateNavButtons();
  }

  function updateCounter() {
    counterEl.textContent = `${currentIndex + 1} / ${images.length}`;
  }

  function updateNavButtons() {
    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex === images.length - 1;
    prevBtn.style.opacity = currentIndex === 0 ? '0.3' : '1';
    nextBtn.style.opacity = currentIndex === images.length - 1 ? '0.3' : '1';
  }

  function updateDots() {
    const dotsContainer = overlayEl.querySelector('.portfolio-overlay__dots');
    if (images.length <= 1) {
      dotsContainer.replaceChildren();
      return;
    }

    const dots = images.map((_, i) => {
      const dot = document.createElement('button');
      dot.className = 'portfolio-overlay__dot' + (i === currentIndex ? ' is-active' : '');
      dot.type = 'button';
      dot.setAttribute('aria-label', `Go to image ${i + 1}`);
      dot.dataset.index = String(i);
      dot.addEventListener('click', () => {
        const targetIdx = parseInt(dot.dataset.index, 10);
        if (Number.isInteger(targetIdx)) goTo(targetIdx);
      });
      return dot;
    });

    dotsContainer.replaceChildren(...dots);
  }

  function bindArrows() {
    document.querySelectorAll('.gallery-arrow').forEach(arrow => {
      // Find the parent cat-section
      const section = arrow.closest('.cat-section');
      if (!section) return;
      const category = section.dataset.category;

      // Make it a button-like interactive element
      arrow.setAttribute('role', 'button');
      arrow.setAttribute('tabindex', '0');
      arrow.style.cursor = 'pointer';

      arrow.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        open(category);
      });

      arrow.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          open(category);
        }
      });
    });
  }

  function init() {
    // Only init on work page
    if (!document.querySelector('.cat-section')) return;
    gatherCategoryData();
    createOverlay();
    bindArrows();
  }

  return { init };
})();

/* ── FOLDER TOUCH TOGGLE ───────────────────────────────── */
const FolderToggle = (() => {
  function init() {
    const folder = document.getElementById('folder');
    if (!folder) return;
    folder.addEventListener('click', () => {
      folder.classList.toggle('is-open');
    });
  }
  return { init };
})();

/* ── SERVICES HERO: CHEVRONS & PHONE BOUNCE ────────────── */
const ServicesHero = (() => {
  function init() {
    const stage = document.getElementById('svchero-stage');
    const heroSection = document.getElementById('svchero');
    const basketWrap = stage ? stage.querySelector('.svchero__basket-wrap') : null;

    if (stage) {
      // 1. Sliding Chevron Opening Transition
      let hasOpened = false;
      const triggerOpen = () => {
        if (!hasOpened) {
          hasOpened = true;
          stage.classList.add('is-open');
        }
      };

      // Entrance opening after slight delay
      window.setTimeout(triggerOpen, 450);

      // Open on user mouse entrance
      if (heroSection) {
        heroSection.addEventListener('mouseenter', triggerOpen, { passive: true });
        heroSection.addEventListener('mousemove', triggerOpen, { once: true, passive: true });
      }
      document.addEventListener('mouseenter', triggerOpen, { once: true, passive: true });

      // Interactive 3D tilt on mousemove
      if (basketWrap && window.matchMedia('(pointer: fine)').matches) {
        heroSection?.addEventListener('mousemove', (e) => {
          const rect = basketWrap.getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;
          const deltaX = (e.clientX - centerX) / (rect.width / 2);
          const deltaY = (e.clientY - centerY) / (rect.height / 2);

          const rotX = Math.max(-8, Math.min(8, -deltaY * 6));
          const rotY = Math.max(-10, Math.min(10, deltaX * 8));

          basketWrap.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-4px)`;
        }, { passive: true });

        heroSection?.addEventListener('mouseleave', () => {
          basketWrap.style.transform = '';
        });
      }

      // Chevrons only open once when entering frame and stay open permanently
      // (click-to-close removed per user preference)
    }

    // 2. Section 2 Phone Bounce on Scroll & Spring Physics
    const callsSection = document.getElementById('creativity-calls');
    const phoneStage = document.querySelector('.svc-calls__phone-stage');
    const phoneWrapper = document.querySelector('.svc-calls__phone-wrapper');
    const buttonWrap = document.querySelector('.svc-calls__button-wrap');

    if (callsSection && phoneStage) {
      // IntersectionObserver: trigger bounce once when entering frame
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            callsSection.classList.add('is-visible');
            phoneStage.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -30px 0px' });

      observer.observe(callsSection);

      if (window.location.hash === '#creativity-calls') {
        window.setTimeout(() => {
          callsSection.scrollIntoView({ behavior: 'auto', block: 'center' });
        }, 150);
      }
    }
  }

  return { init };
})();

/* FRONTEND SECURITY HARDENING */
const SecurityHardening = (() => {
  function hardenLinks() {
    document.querySelectorAll('a[href]').forEach(link => {
      const rawHref = (link.getAttribute('href') || '').trim();

      if (/^javascript:/i.test(rawHref)) {
        link.removeAttribute('href');
        link.setAttribute('aria-disabled', 'true');
        return;
      }

      if (link.target === '_blank') {
        const rel = new Set((link.getAttribute('rel') || '').split(/\s+/).filter(Boolean));
        rel.add('noopener');
        rel.add('noreferrer');
        link.setAttribute('rel', Array.from(rel).join(' '));
      }
    });
  }

  function hardenMedia() {
    document.querySelectorAll('img').forEach((img, index) => {
      if (!img.hasAttribute('decoding')) img.decoding = 'async';
      if (!img.hasAttribute('loading') && index > 2) img.loading = 'lazy';
      if (!img.hasAttribute('alt')) img.alt = '';
    });
  }

  function hardenInlineSvg() {
    document.querySelectorAll('svg:not([focusable])').forEach(svg => {
      svg.setAttribute('focusable', 'false');
    });
  }

  function init() {
    hardenLinks();
    hardenMedia();
    hardenInlineSvg();
  }

  return { init };
})();

const Lightbox = (() => {
  let previousFocus = null;
  let lb, lbImg, lbClose;

  function create() {
    lb = document.createElement('div');
    lb.id = 'lightbox';
    lb.setAttribute('role', 'dialog');
    lb.setAttribute('aria-modal', 'true');
    lb.setAttribute('aria-label', 'Image preview');
    lb.className = 'tix-lightbox';

    const inner = document.createElement('div');
    inner.className = 'tix-lightbox__inner';

    lbImg = document.createElement('img');
    lbImg.id = 'lightbox-img';
    lbImg.className = 'tix-lightbox__img';
    lbImg.alt = '';
    lbImg.decoding = 'async';

    lbClose = document.createElement('button');
    lbClose.id = 'lightbox-close';
    lbClose.className = 'tix-lightbox__close';
    lbClose.type = 'button';
    lbClose.setAttribute('aria-label', 'Close image preview');

    const closeMark = document.createElement('span');
    closeMark.setAttribute('aria-hidden', 'true');
    closeMark.textContent = '×';

    const closeText = document.createElement('span');
    closeText.textContent = 'CLOSE';

    lbClose.append(closeMark, closeText);
    inner.append(lbImg, lbClose);
    lb.appendChild(inner);
    document.body.appendChild(lb);

    function closeLightbox() {
      lb.classList.remove('is-active');
      document.body.style.overflow = '';
      if (previousFocus) {
        previousFocus.focus();
        previousFocus = null;
      }
    }

    lb.addEventListener('click', e => {
      if (e.target === lb || e.target.closest('#lightbox-close')) {
        closeLightbox();
      }
    });
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && lb.classList.contains('is-active')) closeLightbox();
    });
  }

  function init() {
    // Skip on work page — portfolio overlay handles it
    if (document.querySelector('.cat-section')) return;

    create();

    document.querySelectorAll('.gallery-item img, .bts__img img').forEach(img => {
      img.style.cursor = 'pointer';
      img.setAttribute('tabindex', '0');
      img.setAttribute('role', 'button');
      img.setAttribute('aria-label', 'View ' + (img.alt || 'image') + ' in full size');

      function openLightbox() {
        previousFocus = document.activeElement;
        lbImg.src = img.src || '';
        lbImg.alt = img.alt || '';
        lb.classList.add('is-active');
        document.body.style.overflow = 'hidden';
        lbClose.focus();
      }

      img.addEventListener('click', openLightbox);
      img.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openLightbox();
        }
      });
    });
  }

  return { init };
})();

/* ── WORK GALLERY ACCORDION ─────────────────────────────── */
const WorkGallery = (() => {
  function markArrowPng(img) {
    if (!img) return;
    const apply = () => {
      if (img.naturalWidth > 0) img.closest('.wg-arrow')?.classList.add('has-png');
    };
    if (img.complete) apply();
    else img.addEventListener('load', apply, { once: true });
    img.addEventListener('error', () => {
      img.style.display = 'none';
      img.closest('.wg-arrow')?.classList.remove('has-png');
    }, { once: true });
  }

  function setOpen(cat, open) {
    const panel = cat.querySelector('.wg-panel');
    const toggles = cat.querySelectorAll('.wg-arrow--second');
    cat.classList.toggle('is-open', open);
    if (panel) {
      if (open) panel.removeAttribute('hidden');
      else panel.setAttribute('hidden', '');
    }
    toggles.forEach(btn => btn.setAttribute('aria-expanded', open ? 'true' : 'false'));
  }

  function initStrips(root) {
    const desktop = window.matchMedia('(min-width: 901px)');
    root.querySelectorAll('[data-strip]').forEach(strip => {
      const cards = [...strip.querySelectorAll('.wg-card')];
      cards.forEach(card => {
        const activate = () => {
          if (!desktop.matches) return;
          cards.forEach(c => c.classList.toggle('is-active', c === card));
        };
        card.addEventListener('mouseenter', activate);
        card.addEventListener('focus', activate);
        card.addEventListener('click', activate);
      });
    });
  }

  function initFilter(gallery) {
    const btn = gallery.querySelector('#work-filter-btn');
    const menu = gallery.querySelector('#work-filter-menu');
    if (!btn || !menu) return;

    const close = () => {
      btn.classList.remove('is-open');
      btn.setAttribute('aria-expanded', 'false');
      menu.classList.remove('is-open');
      menu.setAttribute('hidden', '');
    };

    const open = () => {
      btn.classList.add('is-open');
      btn.setAttribute('aria-expanded', 'true');
      menu.classList.add('is-open');
      menu.removeAttribute('hidden');
    };

    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (btn.classList.contains('is-open')) close();
      else open();
    });

    menu.querySelectorAll('[data-jump]').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const key = link.getAttribute('data-jump');
        const cat = gallery.querySelector(`.wg-cat[data-category="${key}"]`);
        close();
        if (!cat) return;
        setOpen(cat, true);
        cat.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });

    document.addEventListener('click', (e) => {
      if (!gallery.querySelector('.work-gallery__filter-wrap')?.contains(e.target)) close();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') close();
    });
  }

  function init() {
    const gallery = document.querySelector('.work-gallery');
    if (!gallery) return;

    gallery.querySelectorAll('.wg-arrow__img').forEach(markArrowPng);

    gallery.querySelectorAll('.wg-cat').forEach(cat => {
      // default: keep panels visible like the design
      if (!cat.classList.contains('is-open')) setOpen(cat, true);

      const toggles = [...cat.querySelectorAll('.wg-arrow--second')];
      const name = cat.querySelector('.wg-cat__name');
      const toggle = () => setOpen(cat, !cat.classList.contains('is-open'));
      toggles.forEach(btn => btn.addEventListener('click', toggle));
      if (name) {
        name.style.cursor = 'pointer';
        name.addEventListener('click', toggle);
      }
    });

    initFilter(gallery);
    initStrips(gallery);
  }

  return { init };
})();


/* ── WORK LENS — scroll-triggered horizontal ribbon ─────── */
const WorkLens = (() => {
  const reduceMotion = () =>
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function bind(section) {
    const sticky = section.querySelector('.work-lens__sticky');
    const track = section.querySelector('[data-work-lens-track]');
    const wrapper = section.querySelector('.image-grid-wrapper');
    if (!sticky || !track || !wrapper) return;

    let maxTravel = 0;
    let pinDistance = 0;
    let ticking = false;

    const setTrackX = (progress) => {
      const x = -progress * maxTravel;
      track.style.transform = `translate3d(${x}px, 0, 0)`;
    };

    const clearPinClasses = () => {
      sticky.classList.remove('is-fixed', 'is-ended');
    };

    const measure = () => {
      if (reduceMotion()) {
        section.style.height = '';
        clearPinClasses();
        track.style.transform = '';
        return;
      }

      // Reset pin state so widths measure from in-flow layout
      clearPinClasses();
      sticky.style.removeProperty('height');

      const viewportH = window.innerHeight;
      const viewW = wrapper.clientWidth || window.innerWidth;
      maxTravel = Math.max(0, track.scrollWidth - viewW);

      // Section must stay locked for the full horizontal distance
      pinDistance = Math.ceil(maxTravel);
      section.style.height = `${viewportH + pinDistance}px`;
      update();
    };

    const update = () => {
      if (reduceMotion()) return;

      const viewportH = window.innerHeight;
      const rect = section.getBoundingClientRect();

      // Before the section reaches the top — natural flow
      if (rect.top > 0) {
        clearPinClasses();
        setTrackX(0);
        return;
      }

      // After every photo has been covered — release to footer/CTA
      if (pinDistance <= 0 || -rect.top >= pinDistance) {
        sticky.classList.remove('is-fixed');
        sticky.classList.add('is-ended');
        setTrackX(1);
        return;
      }

      // Locked: vertical scroll drives the photo strip until the end
      sticky.classList.add('is-fixed');
      sticky.classList.remove('is-ended');
      sticky.style.height = `${viewportH}px`;

      const progress = Math.min(1, Math.max(0, -rect.top / pinDistance));
      setTrackX(progress);
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        update();
        ticking = false;
      });
    };

    track.querySelectorAll('img').forEach((img) => {
      if (img.complete) return;
      img.addEventListener('load', measure, { once: true });
    });

    if (typeof ResizeObserver !== 'undefined') {
      const ro = new ResizeObserver(() => measure());
      ro.observe(track);
      ro.observe(wrapper);
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', measure);

    measure();
    requestAnimationFrame(measure);
    // Late pass after fonts / injected footer settle
    window.setTimeout(measure, 150);
  }

  function init() {
    document.querySelectorAll('[data-work-lens]').forEach(bind);
  }

  return { init };
})();


/* ── DISRUPT PIN — sticky scroll-driven vertical services ─ */
const DisruptPin = (() => {
  const reduceMotion = () =>
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function bind(section) {
    const sticky = section.querySelector('.disrupt__sticky');
    const track = section.querySelector('[data-disrupt-track]');
    const viewport = section.querySelector('.disrupt__viewport');
    if (!sticky || !track || !viewport) return;

    let maxTravel = 0;
    let pinDistance = 0;
    let ticking = false;

    const setTrackY = (progress) => {
      const y = -progress * maxTravel;
      track.style.transform = `translate3d(0, ${y}px, 0)`;
    };

    const setOutro = (on) => {
      sticky.classList.toggle('is-outro', on);
    };

    const clearPinClasses = () => {
      sticky.classList.remove('is-fixed', 'is-ended', 'is-outro');
    };

    const measure = () => {
      if (reduceMotion()) {
        section.style.height = '';
        clearPinClasses();
        track.style.transform = '';
        setOutro(true);
        return;
      }

      clearPinClasses();
      sticky.style.removeProperty('height');

      const viewportH = window.innerHeight;
      const viewH = viewport.clientHeight || Math.floor(viewportH * 0.55);
      maxTravel = Math.max(0, track.scrollHeight - viewH);

      // Extra room after last card so outro tiles can rise
      pinDistance = Math.ceil(maxTravel * 1.28);
      section.style.height = `${viewportH + pinDistance}px`;
      update();
    };

    const update = () => {
      if (reduceMotion()) return;

      const viewportH = window.innerHeight;
      const rect = section.getBoundingClientRect();

      if (rect.top > 0) {
        clearPinClasses();
        setTrackY(0);
        return;
      }

      if (pinDistance <= 0 || -rect.top >= pinDistance) {
        sticky.classList.remove('is-fixed');
        sticky.classList.add('is-ended');
        setOutro(true);
        setTrackY(1);
        return;
      }

      sticky.classList.add('is-fixed');
      sticky.classList.remove('is-ended');
      sticky.style.height = `${viewportH}px`;

      const progress = Math.min(1, Math.max(0, -rect.top / pinDistance));
      setTrackY(progress);

      // Rise cover tiles once services are nearly done
      setOutro(progress >= 0.86);
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        update();
        ticking = false;
      });
    };

    section.querySelectorAll('img').forEach((img) => {
      if (img.complete) return;
      img.addEventListener('load', measure, { once: true });
    });

    if (typeof ResizeObserver !== 'undefined') {
      const ro = new ResizeObserver(() => measure());
      ro.observe(track);
      ro.observe(viewport);
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', measure);

    measure();
    requestAnimationFrame(measure);
    window.setTimeout(measure, 150);
  }

  function init() {
    document.querySelectorAll('[data-disrupt-pin]').forEach(bind);
  }

  return { init };
})();

/* ── STUDIO TOUCHPOINTS — scroll-driven flying image cards ─── */
const TouchpointFlight = (() => {
  const clamp = (value) => Math.min(1, Math.max(0, value));
  const easeOut = (value) => 1 - Math.pow(1 - value, 3);

  function bind(section) {
    const stage = section.querySelector('.touchpoints__stage');
    const cards = [...section.querySelectorAll('[data-flight-card]')];
    const wipes = [...section.querySelectorAll('.touchpoints__wipe')];
    if (!stage || cards.length !== 4) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          stage.classList.add('is-entered');
          observer.unobserve(stage);
        }
      });
    }, { threshold: 0.02 });
    revealObserver.observe(stage);
    if (reducedMotion) return;

    const rotations = [-8, 8, -6, 7];
    const entryRotations = [-30, 29, -26, 28];
    const wipeScales = [1.08, 1.05, 1.02];
    const wipeStarts = [0.82, 0.87, 0.92];
    const frame = () => {
      const rect = section.getBoundingClientRect();
      const scrollRange = Math.max(1, section.offsetHeight - window.innerHeight);
      const progress = clamp(-rect.top / scrollRange);
      const travelX = window.innerWidth * 1.05;
      const travelY = window.innerHeight * 0.2;

      cards.forEach((card, index) => {
        const start = 0.02 + index * 0.19;
        const enter = easeOut(clamp((progress - start) / 0.15));
        const side = index % 2 === 0 ? -1 : 1;
        const vertical = index < 2 ? -travelY : travelY;
        const rotation = entryRotations[index] * (1 - enter) + rotations[index] * enter;
        const x = side * travelX * (1 - enter);
        const y = vertical * (1 - enter);
        const scale = 0.58 + (0.42 * enter);
        const blur = (1 - enter) * 14;

        card.style.opacity = enter.toFixed(3);
        card.style.filter = `blur(${blur.toFixed(2)}px) drop-shadow(0 24px 24px rgba(0, 0, 0, 0.25))`;
        card.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0) rotate(${rotation.toFixed(2)}deg) scale(${scale.toFixed(3)})`;
        card.style.zIndex = '4';
      });

      wipes.forEach((wipe, index) => {
        const wipeProgress = clamp((progress - wipeStarts[index]) / (1 - wipeStarts[index]));
        const y = window.innerHeight * 0.72 * (1 - wipeProgress);
        wipe.style.opacity = wipeProgress > 0 ? '1' : '0';
        wipe.style.transform = `translate3d(0, ${y.toFixed(1)}px, 0) scale(${wipeScales[index]})`;
      });
    };

    let frameQueued = false;
    const scheduleFrame = () => {
      if (frameQueued) return;
      frameQueued = true;
      requestAnimationFrame(() => {
        frame();
        frameQueued = false;
      });
    };

    window.addEventListener('scroll', scheduleFrame, { passive: true });
    window.addEventListener('resize', scheduleFrame);
    scheduleFrame();
  }

  function init() {
    document.querySelectorAll('[data-touchpoints]').forEach(bind);
  }

  return { init };
})();

document.addEventListener('DOMContentLoaded', () => {
  Nav.init();
  Reveal.init();
  Parallax.init();
  Cursor.init();
  Marquees.init();
  Pinboard.init();
  Counter.init();
  WorkFilter.init();
  WorkGallery.init();
  WorkLens.init();
  DisruptPin.init();
  TouchpointFlight.init();
  ContactForm.init();
  HScroll.init();
  PageTransition.init();
  HeroAnim.init();
  Lightbox.init();
  PortfolioOverlay.init();
  FolderToggle.init();
  ServicesHero.init();
  SecurityHardening.init();
});
