import { expect, test } from '@playwright/test';

test.describe('Contact GSAP entrance', () => {
  test('pops the card and four photos out from the center and replays on return', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.addInitScript(() => {
      const snapshots: Array<{ cardScale: number; photoScales: number[]; distances: number[] }> = [];
      Object.assign(window, { contactPopSnapshots: snapshots });
      new MutationObserver((changes) => {
        for (const change of changes) {
          const root = change.target as HTMLElement;
          if (root.dataset.contactEntrance !== 'running') continue;
          const card = root.querySelector<HTMLElement>('[data-contact-pop-card]');
          if (!card) continue;
          const rect = card.getBoundingClientRect();
          const photos = Array.from(root.querySelectorAll<HTMLElement>('[data-contact-pop-photo]'));
          snapshots.push({
            cardScale: new DOMMatrix(getComputedStyle(card).transform).a,
            photoScales: photos.map((photo) => new DOMMatrix(getComputedStyle(photo).transform).a),
            distances: photos.map((photo) => {
              const photoRect = photo.getBoundingClientRect();
              return Math.hypot(photoRect.left + photoRect.width / 2 - rect.left - rect.width / 2, photoRect.top + photoRect.height / 2 - rect.top - rect.height / 2);
            }),
          });
        }
      }).observe(document, { subtree: true, attributes: true, attributeFilter: ['data-contact-entrance'] });
    });
    await page.goto('/ar/contact', { waitUntil: 'domcontentloaded' });
    const entrance = page.locator('[data-contact-entrance]');
    await expect(entrance).toHaveAttribute('data-contact-entrance', 'complete');
    await expect(entrance.locator('[data-contact-photo-side="left"] [data-contact-pop-photo]')).toHaveCount(2);
    await expect(entrance.locator('[data-contact-photo-side="right"] [data-contact-pop-photo]')).toHaveCount(2);
    const snapshots = await page.evaluate(() => (window as unknown as { contactPopSnapshots: Array<{ cardScale: number; photoScales: number[]; distances: number[] }> }).contactPopSnapshots);
    expect(snapshots.length).toBeGreaterThan(0);
    expect(snapshots[0].cardScale).toBeLessThan(1);
    expect(snapshots[0].photoScales.every((scale) => scale < 0.5)).toBe(true);
    expect(snapshots[0].distances.every((distance) => distance < 50)).toBe(true);
    const positions = await entrance.evaluate((root) => {
      const center = (target: Element) => { const r = target.getBoundingClientRect(); return r.left + r.width / 2; };
      const card = root.querySelector('[data-contact-pop-card]')!;
      return {
        card: center(card),
        left: Array.from(root.querySelectorAll('[data-contact-photo-side="left"] [data-contact-pop-photo]')).map(center),
        right: Array.from(root.querySelectorAll('[data-contact-photo-side="right"] [data-contact-pop-photo]')).map(center),
        formDirection: getComputedStyle(card).direction,
      };
    });
    if (positions.formDirection === 'rtl') {
      expect(positions.left.every((x) => x > positions.card)).toBe(true);
      expect(positions.right.every((x) => x < positions.card)).toBe(true);
    } else {
      expect(positions.left.every((x) => x < positions.card)).toBe(true);
      expect(positions.right.every((x) => x > positions.card)).toBe(true);
    }
    expect(positions.formDirection).toBe('rtl');
    await expect(entrance.locator('[data-contact-pop-card]')).toHaveCSS('transform', 'none');
    await page.locator('#main-nav a[href$="/about"]').first().click();
    await expect(page).toHaveURL(/\/ar\/about$/);
    await expect(entrance).toHaveCount(0);
    await page.locator('#main-nav a[href$="/contact"]').first().click();
    await expect(page).toHaveURL(/\/ar\/contact$/);
    await expect(entrance).toHaveAttribute('data-contact-entrance', 'complete');
    expect(await page.evaluate(() => (window as unknown as { contactPopSnapshots: unknown[] }).contactPopSnapshots.length)).toBeGreaterThanOrEqual(2);
  });

  test('keeps padded headings below the header and all four photos usable at small widths with reduced motion', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    for (const width of [320, 375, 390, 768, 1024, 1440, 1920]) {
      await page.setViewportSize({ width, height: 1000 });
      await page.goto('/ar/contact', { waitUntil: 'networkidle' });
      const entrance = page.locator('[data-contact-entrance]');
      await expect(entrance).toHaveAttribute('data-contact-entrance', 'reduced-motion');
      await expect(entrance.locator('[data-contact-pop-photo]')).toHaveCount(4);
      await expect(entrance.getByRole('heading', { level: 1 })).toHaveText('ما الشعور الذي تريد أن يختبره العالم؟');
      const layout = await entrance.evaluate((root) => {
        const heading = root.querySelector<HTMLElement>('.contact-entrance__heading-pill')!;
        const padding = getComputedStyle(heading);
        const card = root.querySelector<HTMLElement>('[data-contact-pop-card]')!;
        const rect = card.getBoundingClientRect();
        const nav = document.querySelector('#main-nav')!.getBoundingClientRect();
        return {
          paddingX: parseFloat(padding.paddingLeft),
          paddingY: parseFloat(padding.paddingTop),
          headingTop: heading.getBoundingClientRect().top,
          navBottom: nav.bottom,
          cardCenter: rect.left + rect.width / 2,
          overflow: document.documentElement.scrollWidth - window.innerWidth,
          photos: Array.from(root.querySelectorAll<HTMLElement>('[data-contact-pop-photo]')).map((photo) => {
            const image = photo.querySelector('img')!;
            const photoRect = photo.getBoundingClientRect();
            return { opacity: getComputedStyle(photo).opacity, transform: getComputedStyle(photo).transform, imageWidth: image.naturalWidth, width: photoRect.width, height: photoRect.height };
          }),
        };
      });
      expect(layout.paddingX).toBeGreaterThanOrEqual(16);
      expect(layout.paddingY).toBeGreaterThanOrEqual(12);
      expect(layout.headingTop - layout.navBottom).toBeGreaterThanOrEqual(20);
      expect(Math.abs(layout.cardCenter - width / 2)).toBeLessThanOrEqual(2);
      expect(layout.overflow).toBeLessThanOrEqual(0);
      expect(layout.photos.every((p) => p.opacity === '1' && p.transform === 'none' && p.imageWidth > 0)).toBe(true);
      expect(layout.photos.every((p) => p.width > (width >= 1100 ? 130 : 45) && p.height > 60)).toBe(true);
      await expect(entrance.locator('input[name="name"]')).toBeVisible();
      await entrance.locator('input[name="name"]').focus();
      await expect(entrance.locator('input[name="name"]')).toBeFocused();
      await expect(entrance.locator('textarea[name="building"]')).toBeVisible();
    }
  });

  test('decorative photos do not enter the tab order and runtime reduced motion settles the pop', async ({ page }) => {
    await page.goto('/ar/contact', { waitUntil: 'domcontentloaded' });
    const entrance = page.locator('[data-contact-entrance]');
    await expect(entrance.locator('[data-contact-photo-side][aria-hidden="true"]')).toHaveCount(2);
    await expect(entrance.locator('[data-contact-photo-side] a, [data-contact-photo-side] button, [data-contact-photo-side] [tabindex]')).toHaveCount(0);
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await expect(entrance).toHaveAttribute('data-contact-entrance', 'reduced-motion');
    await expect(entrance.locator('[data-contact-pop-card]')).toHaveCSS('opacity', '1');
    await expect(entrance.locator('[data-contact-pop-card]')).toHaveCSS('transform', 'none');
    for (const photo of await entrance.locator('[data-contact-pop-photo]').all()) {
      await expect(photo).toHaveCSS('opacity', '1');
      await expect(photo).toHaveCSS('transform', 'none');
    }
  });

  test('early keyboard focus and a touch tap settle the entry without blocking the form', async ({ browser, baseURL }) => {
    const context = await browser.newContext({ baseURL, hasTouch: true, isMobile: true, viewport: { width: 390, height: 844 } });
    const page = await context.newPage();
    try {
      await page.goto('/ar/contact', { waitUntil: 'domcontentloaded' });
      const entrance = page.locator('[data-contact-entrance]');
      await expect(entrance).toHaveAttribute('data-contact-entrance', 'running');
      await entrance.locator('input[name="name"]').focus();
      await expect(entrance).toHaveAttribute('data-contact-entrance', 'complete');
      await expect(entrance.locator('input[name="name"]')).toBeFocused();
      await page.reload({ waitUntil: 'domcontentloaded' });
      await expect(entrance).toHaveAttribute('data-contact-entrance', 'running');
      const box = await entrance.locator('[data-contact-pop-card]').boundingBox();
      expect(box).not.toBeNull();
      await page.touchscreen.tap(box!.x + box!.width / 2, box!.y + box!.height / 2);
      await expect(entrance).toHaveAttribute('data-contact-entrance', 'complete');
      await expect(entrance.locator('[data-contact-pop-card]')).toHaveCSS('transform', 'none');
      await entrance.locator('input[name="email"]').fill('reader@example.com');
      await expect(entrance.locator('input[name="email"]')).toHaveValue('reader@example.com');
    } finally {
      await context.close();
    }
  });
});
