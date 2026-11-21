'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import Image from 'next/image';
import { useLocale } from 'next-intl';
import { useRef, type ReactNode } from 'react';

gsap.registerPlugin(useGSAP);

const photos = {
  left: ['/assets/images/mmm.webp', '/assets/images/ff.webp'],
  right: ['/assets/images/g.webp', '/assets/images/sherien.webp'],
} as const;

export function ContactEntrance({ children }: { children: ReactNode }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const locale = useLocale();

  useGSAP(() => {
    const root = rootRef.current;
    if (!root) return;
    const card = root.querySelector<HTMLElement>('[data-contact-pop-card]');
    const photoCards = Array.from(root.querySelectorAll<HTMLElement>('[data-contact-pop-photo]'));
    if (!card || photoCards.length !== 4) return;

    const media = gsap.matchMedia();
    media.add({ reduce: '(prefers-reduced-motion: reduce)', animate: '(prefers-reduced-motion: no-preference)' }, (context) => {
      if (context.conditions?.reduce) {
        root.dataset.contactEntrance = 'reduced-motion';
        return () => { delete root.dataset.contactEntrance; };
      }

      const cardRect = card.getBoundingClientRect();
      const centerX = cardRect.left + cardRect.width / 2;
      const centerY = cardRect.top + cardRect.height / 2;
      const offsets = photoCards.map((photo) => {
        const rect = photo.getBoundingClientRect();
        return { x: centerX - (rect.left + rect.width / 2), y: centerY - (rect.top + rect.height / 2) };
      });
      const finish = () => { root.dataset.contactEntrance = 'complete'; };
      gsap.set(card, { opacity: 0, scale: 0.82, y: 28, transformOrigin: '50% 50%' });
      photoCards.forEach((photo, index) => {
        gsap.set(photo, { opacity: 0, scale: 0.25, x: offsets[index].x, y: offsets[index].y, transformOrigin: '50% 50%' });
      });
      const timeline = gsap.timeline({ paused: true, defaults: { ease: 'back.out(1.25)' }, onComplete: finish });
      timeline.to(card, { opacity: 1, scale: 1, y: 0, duration: 0.75, clearProps: 'transform,opacity' }, 0);
      photoCards.forEach((photo, index) => {
        timeline.to(photo,
          { opacity: 1, scale: 1, x: 0, y: 0, duration: 0.95, clearProps: 'transform,opacity' },
          0.12 + (index % 2) * 0.1,
        );
      });
      root.dataset.contactEntrance = 'running';
      const startFrame = window.requestAnimationFrame(() => { timeline.play(0); });
      // An immediate keyboard/touch interaction must never fight an entrance transform.
      const settle = () => {
        window.cancelAnimationFrame(startFrame);
        timeline.progress(1);
        timeline.pause();
      };
      card.addEventListener('focusin', settle);
      card.addEventListener('pointerdown', settle, { once: true });
      return () => {
        window.cancelAnimationFrame(startFrame);
        card.removeEventListener('focusin', settle);
        card.removeEventListener('pointerdown', settle);
        delete root.dataset.contactEntrance;
      };
    });
    return () => media.revert();
  }, { scope: rootRef, dependencies: [locale], revertOnUpdate: true });

  const renderPhotos = (side: keyof typeof photos) => (
    <div className={`contact-entrance__photos contact-entrance__photos--${side}`} aria-hidden="true" data-contact-photo-side={side}>
      {photos[side].map((src, index) => (
        <div className="contact-entrance__photo" data-contact-pop-photo key={src}>
          <div className={`contact-entrance__photo-frame contact-entrance__photo-frame--${side}-${index}`}>
            <Image src={src} alt="" fill priority sizes="(min-width: 1100px) 220px, (min-width: 640px) 160px, 22vw" className="contact-entrance__photo-image" />
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="contact-single-section__inner contact-entrance" ref={rootRef} data-contact-entrance="idle" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      {renderPhotos('left')}
      <div className="contact-entrance__card" data-contact-pop-card dir={locale === 'ar' ? 'rtl' : 'ltr'}>{children}</div>
      {renderPhotos('right')}
    </div>
  );
}
