'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect } from 'react';
import { useTranslations } from 'next-intl';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function PageInteractions({ page }: { page: 'home' | 'about' | 'services' | 'work' | 'contact' }) {
  const t = useTranslations('ContactForm');
  const copy = useTranslations('RevisionCopy');
  useGSAP(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) {
      if (page === 'services') {
        const stage = document.querySelector<HTMLElement>('#svchero-stage');
        stage?.classList.add('is-open');
        return () => stage?.classList.remove('is-open');
      }
      return;
    }
    const isPhoneViewport = window.matchMedia('(max-width: 900px)').matches;
    let cleanupServicesStage: (() => void) | undefined;
    let cleanupBrandTrack: (() => void) | undefined;
    let cleanupDisruptObserver: (() => void) | undefined;
    gsap.utils.toArray<HTMLElement>('[data-reveal], .observer-target').forEach((target) => {
      const isAboutHero = page === 'about' && Boolean(target.closest('.impact-hero'));
      const isServiceCallReveal = page === 'services' && target.matches('.svc-calls__button-wrap, .svc-calls__phone-stage, .svc-calls__side--left, .svc-calls__side--right');
      if (isServiceCallReveal) return;
      const revealOffset = isPhoneViewport ? 8 : isAboutHero ? 18 : 28;
      const resetAboutPhoneX = page === 'about' && isPhoneViewport && target.matches('[data-reveal="left"], [data-reveal="right"]');
      if (resetAboutPhoneX) gsap.set(target, { x: 0 });
      const revealFrom = { autoAlpha: 0, y: revealOffset, ...(resetAboutPhoneX ? { x: 0 } : {}) };
      const revealTo = {
        autoAlpha: 1,
        y: 0,
        ...(resetAboutPhoneX ? { x: 0 } : {}),
        duration: isPhoneViewport ? 0.34 : 0.6,
        ease: 'power2.out',
        immediateRender: false,
        ...(isAboutHero ? {} : { scrollTrigger: { trigger: target, start: 'top 86%', once: true } }),
      };
      gsap.fromTo(target, revealFrom, revealTo);
    });
    gsap.utils.toArray<HTMLElement>('[data-stagger]').forEach((group) => {
      const children = Array.from(group.children) as HTMLElement[];
      if (!children.length) return;
      const isAboutHero = page === 'about' && Boolean(group.closest('.impact-hero'));
      const staggerOffset = isPhoneViewport ? 6 : isAboutHero ? 14 : 28;
      gsap.fromTo(children, { autoAlpha: 0, y: staggerOffset }, { autoAlpha: 1, y: 0, duration: isPhoneViewport ? 0.3 : 0.55, stagger: isPhoneViewport ? 0.03 : 0.08, ease: 'power2.out', immediateRender: false, ...(isAboutHero ? {} : { scrollTrigger: { trigger: group, start: 'top 86%', once: true } }) });
    });
    if (page === 'home') {
      const hero = document.querySelector('.hero__content');
      if (hero) gsap.fromTo(hero, { autoAlpha: 0, y: 18 }, { autoAlpha: 1, y: 0, duration: 0.7, ease: 'power2.out' });

      const brandSection = document.querySelector<HTMLElement>('[data-home-brands]');
      const brandViewport = brandSection?.querySelector<HTMLElement>('[data-home-brands-viewport]');
      const brandTrack = brandSection?.querySelector<HTMLElement>('[data-home-brands-track]');
      const brandSlides = brandTrack?.querySelectorAll<HTMLElement>('[data-brand-slide]') ?? [];
      const canPinBrandShowcase = window.matchMedia('(min-width: 901px) and (pointer: fine)').matches;

      if (brandSection && brandViewport && brandTrack && brandSlides.length > 1 && canPinBrandShowcase) {
        brandSection.dataset.scrollDriven = 'true';
        const getBrandTravel = () => Math.max(0, brandTrack.scrollWidth - brandViewport.clientWidth);
        if (getBrandTravel() > 0) {
          gsap.to(brandTrack, {
            x: () => -getBrandTravel(),
            ease: 'none',
            scrollTrigger: {
              id: 'home-brand-showcase',
              trigger: brandSection,
              start: 'top top',
              end: () => `+=${Math.ceil(getBrandTravel())}`,
              pin: brandSection,
              scrub: 0.75,
              invalidateOnRefresh: true,
              anticipatePin: 1,
            },
          });
          cleanupBrandTrack = () => { delete brandSection.dataset.scrollDriven; };
        } else {
          delete brandSection.dataset.scrollDriven;
        }
      }
    }
    if (page === 'services') {
      const stage = document.querySelector<HTMLElement>('#svchero-stage');
      const basket = stage?.querySelector<HTMLElement>('.svchero__basket-wrap');
      const calls = document.querySelector<HTMLElement>('#creativity-calls');
      const phone = document.querySelector<HTMLElement>('.svc-calls__phone-wrapper');
      const phoneStage = document.querySelector<HTMLElement>('.svc-calls__phone-stage');
      const button = document.querySelector<HTMLElement>('.svc-calls__button-wrap');
      const leftHeading = document.querySelector<HTMLElement>('.svc-calls__side--left');
      const rightHeading = document.querySelector<HTMLElement>('.svc-calls__side--right');
      if (stage && basket) {
        const chevrons = stage.querySelectorAll<HTMLElement>('.svchero__chevron-item');
        stage.classList.remove('is-open');
        gsap.timeline({ delay: isPhoneViewport ? 0.08 : 0.45, onStart: () => stage.classList.add('is-open') })
          .fromTo(chevrons, { autoAlpha: 0.8 }, { autoAlpha: 1, duration: 0.35, stagger: 0.04 }, 0);
        cleanupServicesStage = () => stage.classList.remove('is-open');
      } else if (stage) {
        stage.classList.add('is-open');
        cleanupServicesStage = () => stage.classList.remove('is-open');
      }
      if (calls && phone && phoneStage && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        const isPhone = isPhoneViewport;
        const phoneTimeline = gsap.timeline({ paused: true, scrollTrigger: { trigger: calls, start: 'top 82%', once: true, onEnter: () => { calls.classList.add('is-visible'); phoneStage.classList.add('is-visible'); } } });
        if (isPhone) {
          phoneTimeline
            .fromTo([button, leftHeading, rightHeading], { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.3, ease: 'power1.out' }, 0);
        } else {
          phoneTimeline
            .fromTo(button, { autoAlpha: 0, y: -24 }, { autoAlpha: 1, y: 0, duration: 0.55, ease: 'power2.out' }, 0)
            .fromTo([leftHeading, rightHeading], { autoAlpha: 0, x: (index) => index ? 28 : -28 }, { autoAlpha: 1, x: 0, duration: 0.55, stagger: 0.08, ease: 'power2.out' }, 0.08)
            .fromTo(phone, { autoAlpha: 0, y: -130, scaleY: 0.7, scaleX: 1.08 }, { autoAlpha: 1, y: 0, scaleY: 1, scaleX: 1, duration: 1.6, ease: 'elastic.out(1, 0.55)' }, 0.16);
        }
      }
      const folderCards = gsap.utils.toArray<HTMLElement>('.folder-card');
      folderCards.forEach((card, index) => gsap.fromTo(card, { autoAlpha: 0.35, y: isPhoneViewport ? 10 : 32 }, { autoAlpha: 1, y: 0, duration: isPhoneViewport ? 0.36 : 0.65, delay: isPhoneViewport ? 0 : index * 0.05, ease: 'power2.out', scrollTrigger: { trigger: card, start: 'top 88%', once: true } }));
    }
    if (page === 'about') {
      const section = document.querySelector<HTMLElement>('[data-touchpoints]');
      const stage = section?.querySelector<HTMLElement>('.touchpoints__stage');
      const cards = section ? gsap.utils.toArray<HTMLElement>('[data-flight-card]', section) : [];

      if (section && stage && cards.length === 4) {
        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const rotations = [-8, 8, -6, 7];
        const entryRotations = [-30, 29, -26, 28];
        const shadow = 'drop-shadow(0 24px 24px rgba(0, 0, 0, 0.25))';

        if (reducedMotion || isPhoneViewport) {
          gsap.set(cards, { x: 0, y: 0, rotation: 0, scale: 1, autoAlpha: 1, filter: shadow });
        } else {
          const timeline = gsap.timeline({
            defaults: { duration: 0.82, ease: 'power3.out' },
            scrollTrigger: {
              trigger: section,
              start: 'top 86%',
              end: 'bottom 14%',
              scrub: 0.65,
              invalidateOnRefresh: true,
            },
          });

          cards.forEach((card, index) => {
            const side = index % 2 === 0 ? -1 : 1;
            const vertical = index < 2 ? -18 : 18;
            timeline.fromTo(card,
              {
                x: side * 24,
                y: vertical,
                rotation: entryRotations[index],
                scale: 0.98,
                autoAlpha: 1,
                filter: shadow,
                transformOrigin: 'center center',
                force3D: true,
              },
              {
                x: 0,
                y: 0,
                rotation: rotations[index],
                scale: 1,
                autoAlpha: 1,
                filter: shadow,
                force3D: true,
              },
              index * 0.08,
            );
          });

        }
      }
    }

    const disrupt = document.querySelector<HTMLElement>('[data-disrupt-pin]');
    const disruptSticky = disrupt?.querySelector<HTMLElement>('.disrupt__sticky');
    const disruptTrack = disrupt?.querySelector<HTMLElement>('[data-disrupt-track]');
    const disruptViewport = disrupt?.querySelector<HTMLElement>('.disrupt__viewport');
    if (disrupt && disruptSticky && disruptTrack && disruptViewport) {
      const outro = disrupt.querySelector<HTMLElement>('[data-disrupt-outro]');
      if (isPhoneViewport) {
        if (outro && 'IntersectionObserver' in window) {
          const observer = new IntersectionObserver((entries) => {
            if (entries.some((entry) => entry.isIntersecting)) {
              disruptSticky.classList.add('is-outro');
              observer.disconnect();
            }
          }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
          observer.observe(outro);
          cleanupDisruptObserver = () => observer.disconnect();
        }
      } else {
        const getTravel = () => Math.max(0, disruptTrack.scrollHeight - disruptViewport.clientHeight);
        ScrollTrigger.create({
          trigger: disrupt,
          start: 'top top',
          end: () => `+=${Math.ceil(getTravel() * 1.28)}`,
          pin: disruptSticky,
          scrub: true,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            disruptTrack.style.transform = `translate3d(0, ${(-self.progress * getTravel()).toFixed(1)}px, 0)`;
            disruptSticky.classList.toggle('is-outro', self.progress >= 0.92);
          },
        });
      }
    }
    const lens = document.querySelector<HTMLElement>('[data-work-lens]');
    const lensSticky = lens?.querySelector<HTMLElement>('.work-lens__sticky');
    const lensTrack = lens?.querySelector<HTMLElement>('[data-work-lens-track]');
    const lensWrapper = lens?.querySelector<HTMLElement>('.image-grid-wrapper');
    if (lens && lensSticky && lensTrack && lensWrapper) {
      const getTravel = () => Math.max(0, lensTrack.scrollWidth - lensWrapper.clientWidth);
      ScrollTrigger.create({ trigger: lens, start: 'top top', end: () => `+=${Math.ceil(getTravel())}`, pin: lensSticky, scrub: true, invalidateOnRefresh: true, onUpdate: self => { lensTrack.style.transform = `translate3d(${(-self.progress * getTravel()).toFixed(1)}px, 0, 0)`; } });
    }
    return () => {
      cleanupServicesStage?.();
      cleanupBrandTrack?.();
      cleanupDisruptObserver?.();
    };
  }, { dependencies: [page], revertOnUpdate: true });

  useEffect(() => {
    const main = document.querySelector<HTMLElement>('#main-content');
    if (!main) return;

    let refreshFrame: number | undefined;
    let refreshTimer: number | undefined;
    const scheduleRefresh = () => {
      if (refreshTimer !== undefined) return;
      refreshTimer = window.setTimeout(() => {
        refreshTimer = undefined;
        if (refreshFrame !== undefined) return;
        refreshFrame = window.requestAnimationFrame(() => {
          refreshFrame = undefined;
          ScrollTrigger.refresh();
        });
      }, 100);
    };
    const images = Array.from(main.querySelectorAll('img'));
    const pendingImages = images.filter((image) => !image.complete);
    pendingImages.forEach((image) => {
      image.addEventListener('load', scheduleRefresh);
      image.addEventListener('error', scheduleRefresh);
    });
    window.addEventListener('resize', scheduleRefresh, { passive: true });
    document.fonts?.ready.then(scheduleRefresh).catch(() => undefined);
    scheduleRefresh();

    return () => {
      if (refreshTimer !== undefined) window.clearTimeout(refreshTimer);
      if (refreshFrame !== undefined) window.cancelAnimationFrame(refreshFrame);
      pendingImages.forEach((image) => {
        image.removeEventListener('load', scheduleRefresh);
        image.removeEventListener('error', scheduleRefresh);
      });
      window.removeEventListener('resize', scheduleRefresh);
    };
  }, [page]);

  useEffect(() => {
    const cleanups: Array<() => void> = [];
    const on = <T extends EventTarget>(target: T | null, type: string, listener: EventListenerOrEventListenerObject) => { if (target) { target.addEventListener(type, listener); cleanups.push(() => target.removeEventListener(type, listener)); } };
    const form = document.querySelector<HTMLFormElement>('.contact-form form');
    if (form) {
      const submit = async (event: Event) => {
        event.preventDefault();
        const submitter = form.querySelector<HTMLButtonElement>('.form-submit');
        if (!submitter || submitter.disabled) return;
        const oldLabel = submitter.textContent;
        submitter.disabled = true; submitter.textContent = t('sending');
        let status = form.querySelector<HTMLElement>('.form-status');
        if (!status) { status = document.createElement('p'); status.className = 'form-status'; status.setAttribute('role', 'status'); form.append(status); }
        try {
          const response = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(Object.fromEntries(new FormData(form))) });
          const body = await response.json().catch(() => ({}));
          if (!response.ok) throw new Error(body.error || 'Unable to send your message.');
          status.textContent = t('success'); form.reset();
        } catch (error) { status.textContent = error instanceof Error ? error.message : t('error'); }
        submitter.disabled = false; submitter.textContent = oldLabel;
      };
      const trap = document.createElement('input'); trap.name = 'company'; trap.tabIndex = -1; trap.setAttribute('autocomplete', 'off'); trap.setAttribute('aria-hidden', 'true'); trap.style.cssText = 'position:absolute;left:-10000px'; form.append(trap);
      on(form, 'submit', submit);
      cleanups.push(() => trap.remove());
    }
    if (page === 'services' && !window.matchMedia('(prefers-reduced-motion: reduce)').matches && window.matchMedia('(pointer: fine)').matches) {
      const serviceHero = document.querySelector<HTMLElement>('#svchero');
      const basket = document.querySelector<HTMLElement>('.svchero__basket-wrap');
      if (serviceHero && basket) {
        const rotateX = gsap.quickTo(basket, 'rotationX', { duration: 0.35, ease: 'power2.out' });
        const rotateY = gsap.quickTo(basket, 'rotationY', { duration: 0.35, ease: 'power2.out' });
        const onMove = (event: Event) => {
          const pointer = event as PointerEvent;
          const rect = basket.getBoundingClientRect();
          rotateX(gsap.utils.clamp(-8, 8, -((pointer.clientY - (rect.top + rect.height / 2)) / (rect.height / 2)) * 6));
          rotateY(gsap.utils.clamp(-10, 10, ((pointer.clientX - (rect.left + rect.width / 2)) / (rect.width / 2)) * 8));
        };
        const reset = () => { rotateX(0); rotateY(0); };
        serviceHero.addEventListener('pointermove', onMove, { passive: true });
        serviceHero.addEventListener('pointerleave', reset, { passive: true });
        cleanups.push(() => { serviceHero.removeEventListener('pointermove', onMove); serviceHero.removeEventListener('pointerleave', reset); reset(); });
      }
    }
    if (page === 'work') {
      const gallery = document.querySelector<HTMLElement>('.work-gallery');
      const categoryTrack = gallery?.querySelector<HTMLElement>('[data-category-track]');
      const categories = Array.from(gallery?.querySelectorAll<HTMLElement>('.wg-cat') ?? []);
      const filterButton = gallery?.querySelector<HTMLButtonElement>('#work-filter-btn');
      const filterMenu = gallery?.querySelector<HTMLElement>('#work-filter-menu');
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const scrollBehavior: ScrollBehavior = prefersReducedMotion ? 'auto' : 'smooth';
      const closeFilter = () => { filterButton?.classList.remove('is-open'); filterButton?.setAttribute('aria-expanded', 'false'); filterMenu?.classList.remove('is-open'); filterMenu?.setAttribute('hidden', ''); };
      const toggleFilter = () => { const next = !filterButton?.classList.contains('is-open'); filterButton?.classList.toggle('is-open', next); filterButton?.setAttribute('aria-expanded', String(next)); filterMenu?.classList.toggle('is-open', next); if (next) filterMenu?.removeAttribute('hidden'); else filterMenu?.setAttribute('hidden', ''); };
      if (filterButton) on(filterButton, 'click', toggleFilter);
      filterMenu?.querySelectorAll<HTMLElement>('[data-jump]').forEach(link => on(link, 'click', (event) => {
        event.preventDefault();
        const key = link.dataset.jump;
        const category = gallery?.querySelector<HTMLElement>(`.wg-cat[data-category="${key}"]`);
        closeFilter();
        category?.scrollIntoView({ behavior: scrollBehavior, block: 'start', inline: 'nearest' });
      }));
      categories.forEach((category, index) => {
        const panel = category.querySelector<HTMLElement>('.wg-panel');
        if (panel) panel.hidden = false;
        category.classList.remove('is-open');

        const nextButton = category.querySelector<HTMLButtonElement>('.wg-arrow--second');
        if (nextButton) {
          nextButton.removeAttribute('aria-expanded');
          nextButton.removeAttribute('aria-controls');
          nextButton.setAttribute('aria-label', copy('nextCategory'));
          nextButton.disabled = index === categories.length - 1;
          on(nextButton, 'click', () => categories[index + 1]?.scrollIntoView({
            behavior: scrollBehavior,
            block: 'start',
            inline: 'nearest',
          }));
        }
      });
      if (categoryTrack) on(categoryTrack, 'keydown', (event) => {
        const keyboardEvent = event as KeyboardEvent;
        if (keyboardEvent.key !== 'ArrowUp' && keyboardEvent.key !== 'ArrowDown') return;
        const focusedIndex = categories.findIndex(category => category.contains(document.activeElement));
        const startIndex = focusedIndex < 0
          ? (keyboardEvent.key === 'ArrowDown' ? -1 : categories.length)
          : focusedIndex;
        const targetIndex = startIndex + (keyboardEvent.key === 'ArrowDown' ? 1 : -1);
        const target = categories[targetIndex];
        if (!target) return;
        keyboardEvent.preventDefault();
        target.scrollIntoView({ behavior: scrollBehavior, block: 'start', inline: 'nearest' });
        target.querySelector<HTMLButtonElement>('.wg-arrow--second')?.focus({ preventScroll: true });
      });
      gallery?.querySelectorAll<HTMLElement>('[data-strip]').forEach(strip => {
        const isMobileLayout = window.matchMedia('(max-width: 900px)').matches;
        const hasCoarsePointer = window.matchMedia('(pointer: coarse)').matches;
        // Mobile uses native horizontal scroll-snap galleries; keep desktop flex expansion out of this layout.
        if (isMobileLayout || hasCoarsePointer) return;
        const cards = [...strip.querySelectorAll<HTMLElement>('.wg-card')];
        const lockHeight = () => { const height = strip.getBoundingClientRect().height; if (!height) return; strip.style.height = `${height}px`; cards.forEach(card => { card.style.height = `${height}px`; }); };
        window.requestAnimationFrame(lockHeight);
        const restore = () => gsap.to(cards, { flexBasis: '0%', duration: 0.45, ease: 'power2.out', overwrite: true });
        const expand = (active: HTMLElement) => gsap.to(cards, { flexBasis: (_index, card) => card === active ? '38%' : '12.4%', duration: 0.55, ease: 'power3.out', overwrite: true });
        cards.forEach(card => { on(card, 'pointerenter', () => expand(card)); on(card, 'focusin', () => expand(card)); });
        on(strip, 'pointerleave', restore);
        on(strip, 'focusout', () => { window.setTimeout(() => { if (!strip.contains(document.activeElement)) restore(); }, 0); });
        cleanups.push(() => { restore(); strip.style.removeProperty('height'); cards.forEach(card => card.style.removeProperty('height')); });
      });
      on(document, 'click', (event) => { if (filterButton && filterMenu && !filterButton.contains(event.target as Node) && !filterMenu.contains(event.target as Node)) closeFilter(); });
      on(document, 'keydown', (event) => { if ((event as KeyboardEvent).key === 'Escape') closeFilter(); });
    }
    return () => cleanups.forEach(cleanup => cleanup());
  }, [page, copy]);
  return null;
}
