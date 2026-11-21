import { expect, test } from '@playwright/test';

const englishRoutes = ['/', '/about', '/services', '/work', '/contact'];

test.describe('mobile and locale regressions', () => {
  test('default-locale English routes render without redirect loops', async ({ page }) => {
    for (const route of englishRoutes) {
      const response = await page.goto(route, { waitUntil: 'domcontentloaded' });
      expect(response?.status(), `${route} should render directly`).toBe(200);
      expect(new URL(page.url()).pathname).toBe(route);
      await expect(page.locator('main')).toHaveCount(1);
    }
  });

  test('English routes remain stable when the default-locale cookie is present', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await page.context().addCookies([{ name: 'NEXT_LOCALE', value: 'en', url: new URL(page.url()).origin }]);

    const response = await page.goto('/work', { waitUntil: 'domcontentloaded' });
    expect(response?.status()).toBe(200);
    expect(new URL(page.url()).pathname).toBe('/work');
    await expect(page.locator('.work-gallery')).toBeVisible();
  });

  test('explicit /en locale routes render once without redirect loops', async ({ page }) => {
    for (const route of ['/en', '/en/work', '/en/services']) {
      const response = await page.goto(route, { waitUntil: 'domcontentloaded' });
      expect(response?.status(), `${route} should render directly`).toBe(200);
      expect(new URL(page.url()).pathname).toBe(route);
      await expect(page.locator('main')).toHaveCount(1);
    }
  });

  test('mobile menu keeps a clear three-line hamburger without a background or border', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/', { waitUntil: 'domcontentloaded' });

    const burger = page.locator('.nav__burger');
    const menu = page.locator('#mobile-menu');
    const iconPath = burger.locator('svg path');
    await expect(burger).toBeVisible();
    await expect(iconPath).toHaveAttribute('d', /M4 6\.5h16M4 12h16M4 17\.5h16/);
    const buttonStyle = await burger.evaluate((element) => {
      const style = getComputedStyle(element);
      return { background: style.backgroundColor, borderWidth: style.borderTopWidth, boxShadow: style.boxShadow };
    });
    expect(buttonStyle.background).toBe('rgba(0, 0, 0, 0)');
    expect(buttonStyle.borderWidth).toBe('0px');
    expect(buttonStyle.boxShadow).toBe('none');

    await burger.click();
    await expect(menu).toBeVisible();
    await expect(burger).toHaveAttribute('aria-expanded', 'true');
    await expect(iconPath).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(menu).toBeHidden();
  });

  test('mobile Work galleries are horizontal snap carousels with per-section hints and no expansion animation', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/work', { waitUntil: 'domcontentloaded' });

    const categoryKeys = ['fashion', 'realestate', 'events', 'food', 'beauty', 'jewelry'];
    const categories = page.locator('.wg-cat');
    await expect(categories).toHaveCount(categoryKeys.length);
    for (const categoryKey of categoryKeys) {
      const category = page.locator(`.wg-cat[data-category="${categoryKey}"]`);
      const hint = category.locator('.wg-strip__hint');
      const strip = category.locator('[data-strip]');
      const cards = strip.locator('.wg-card');
      await expect(hint).toBeVisible();
      await expect(hint).toHaveText('Scroll horizontally to explore');
      await expect(cards).toHaveCount(5);
      await strip.scrollIntoViewIfNeeded();
      const layout = await strip.evaluate((element) => ({
        direction: getComputedStyle(element).flexDirection,
        overflowX: getComputedStyle(element).overflowX,
        clientWidth: element.clientWidth,
        scrollWidth: element.scrollWidth,
        bounds: element.getBoundingClientRect().toJSON(),
        cards: [...element.querySelectorAll<HTMLElement>('.wg-card')].map((card) => {
          const rect = card.getBoundingClientRect();
          const image = card.querySelector('img');
          return {
            left: rect.left,
            right: rect.right,
            top: rect.top,
            width: rect.width,
            transitionDuration: getComputedStyle(card).transitionDuration,
            imageTransitionDuration: image ? getComputedStyle(image).transitionDuration : '',
            imageTransform: image ? getComputedStyle(image).transform : '',
          };
        }),
      }));
      expect(layout.direction).toBe('row');
      expect(layout.overflowX).toBe('auto');
      expect(layout.scrollWidth).toBeGreaterThan(layout.clientWidth + 1);
      expect(layout.cards[0].width).toBeGreaterThan(layout.clientWidth * 0.7);
      expect(layout.cards[0].width).toBeLessThan(layout.clientWidth);
      expect(Math.abs(layout.cards[0].top - layout.cards[1].top)).toBeLessThan(2);
      expect(await hint.evaluate((element) => element.getBoundingClientRect().bottom <= element.parentElement!.querySelector('[data-strip]')!.getBoundingClientRect().top + 1)).toBe(true);
      for (const card of layout.cards) {
        expect(card.transitionDuration).toBe('0s');
        expect(card.imageTransitionDuration).toBe('0s');
        expect(card.imageTransform).toBe('none');
      }

      const firstCard = cards.first();
      const firstImage = firstCard.locator('.wg-card__media img');
      await firstImage.scrollIntoViewIfNeeded();
      await expect(firstImage).toBeVisible();
      await expect.poll(() => firstImage.evaluate((image) => (image as HTMLImageElement).naturalWidth > 0)).toBe(true);
      const widthBeforeHover = await firstCard.evaluate((element) => element.getBoundingClientRect().width);
      await firstCard.hover();
      await page.mouse.move(5, 5);
      await expect.poll(() => firstCard.evaluate((element) => element.getBoundingClientRect().width)).toBe(widthBeforeHover);
      await expect.poll(() => firstImage.evaluate((image) => getComputedStyle(image).transform)).toBe('none');
      const beforeScroll = await strip.evaluate((element) => element.scrollLeft);
      await strip.evaluate((element) => { element.scrollLeft = element.scrollWidth; });
      await expect.poll(() => strip.evaluate((element) => element.scrollLeft)).toBeGreaterThan(beforeScroll + 1);
      await strip.evaluate((element) => { element.scrollLeft = 0; });
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  });

  test('mobile About copy and imagery stay inside the viewport in English and Arabic', async ({ page }) => {
    for (const route of ['/about', '/ar/about'] as const) {
      for (const width of [390, 467]) {
        await page.setViewportSize({ width, height: 900 });
        await page.goto(route, { waitUntil: 'domcontentloaded' });
        await page.locator('.connection').scrollIntoViewIfNeeded();
        const layout = await page.evaluate(() => {
          const getBox = (element: Element) => {
            const rect = element.getBoundingClientRect();
            return { left: rect.left, right: rect.right };
          };
          const content = [
            '.connection__label', '.connection__title', '.connection__body',
            '.connection .btn', '.connection__watch', '.connection__watch img',
          ].map((selector) => getBox(document.querySelector(selector)!));
          const directionalReveals = [...document.querySelectorAll('main [data-reveal="left"], main [data-reveal="right"]')].map(getBox);
          return {
            width: window.innerWidth,
            documentWidth: document.documentElement.scrollWidth,
            language: document.documentElement.lang,
            direction: document.documentElement.dir,
            content,
            directionalReveals,
          };
        });
        expect(layout.documentWidth).toBeLessThanOrEqual(layout.width);
        for (const box of [...layout.content, ...layout.directionalReveals]) {
          expect(box.left).toBeGreaterThanOrEqual(-1);
          expect(box.right).toBeLessThanOrEqual(layout.width + 1);
        }
        if (route.startsWith('/ar')) {
          expect(layout.language).toBe('ar');
          expect(layout.direction).toBe('rtl');
        }
      }
    }
  });

  test('About touchpoints headline stays dark and legible on the light artwork in both locales', async ({ page }) => {
    for (const route of ['/about', '/ar/about'] as const) {
      for (const width of [390, 1440]) {
        await page.setViewportSize({ width, height: 900 });
        await page.goto(route, { waitUntil: 'domcontentloaded' });
        const heading = page.locator('[data-touchpoints] .touchpoints__copy h2');
        await expect(heading).toBeVisible();
        await expect(heading).toHaveCSS('color', 'rgb(81, 0, 0)');
        expect(await page.evaluate(() => document.documentElement.lang)).toBe(route.startsWith('/ar') ? 'ar' : 'en');
      }
    }
  });

  test('mobile Contact character sits against the split headline while desktop anchoring stays unchanged', async ({ page }) => {
    for (const route of ['/contact', '/ar/contact'] as const) {
      for (const width of [375, 390, 449]) {
        await page.setViewportSize({ width, height: 844 });
        await page.goto(route, { waitUntil: 'domcontentloaded' });
        const footer = page.locator('[data-contact-footer]');
        const character = footer.locator('[data-contact-character]');
        await expect(character).toBeVisible();
        await expect.poll(() => character.evaluate((image) => (image as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
        const mobileGeometry = await footer.evaluate((root) => {
          const image = root.querySelector<HTMLElement>('[data-contact-character]')!;
          const heading = root.querySelector<HTMLElement>('.contact-footer__headlines')!;
          const imageBox = image.getBoundingClientRect();
          return {
            top: parseFloat(getComputedStyle(image).top),
            visibleBottom: imageBox.top + imageBox.height * (804 / 833),
            headlineTop: heading.getBoundingClientRect().top,
          };
        });
        expect(mobileGeometry.top).toBeGreaterThan(0);
        expect(mobileGeometry.visibleBottom - mobileGeometry.headlineTop).toBeGreaterThanOrEqual(-8);
        expect(mobileGeometry.visibleBottom - mobileGeometry.headlineTop).toBeLessThanOrEqual(12);
      }

      await page.setViewportSize({ width: 1440, height: 900 });
      await page.goto(route, { waitUntil: 'domcontentloaded' });
      await expect(page.locator('[data-contact-footer] [data-contact-character]')).toHaveCSS('top', '0px');
    }
  });

  test('mobile Work categories stack vertically with all panels open', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/work', { waitUntil: 'domcontentloaded' });

    const track = page.locator('[data-category-track]');
    const categories = page.locator('.wg-cat');
    await expect(categories).toHaveCount(6);
    const expectedCategoryKeys = ['fashion', 'realestate', 'events', 'food', 'beauty', 'jewelry'];
    const expectedCategoryNames = ['FASHION', 'REAL ESTATE & CORPORATES', 'EVENTS & CONCERTS', 'FOOD & BEVERAGE', 'PERFUME & BEAUTY', 'JEWELRY & LUXURY'];
    expect(await categories.evaluateAll((items) => items.map((item) => item.getAttribute('data-category')))).toEqual(expectedCategoryKeys);
    await expect(track.locator('.wg-cat__name')).toHaveText(expectedCategoryNames);
    await expect(track).toHaveAttribute('tabindex', '0');
    for (const category of await categories.all()) {
      await expect(category.locator('.wg-panel')).toBeVisible();
      await expect(category.locator('.wg-panel')).not.toHaveAttribute('hidden');
      await expect(category.locator('.wg-arrow--second')).not.toHaveAttribute('aria-expanded');
    }
    const geometry = await track.evaluate((element) => ({
      clientWidth: element.clientWidth,
      scrollWidth: element.scrollWidth,
      bounds: element.getBoundingClientRect().toJSON(),
      cards: [...element.querySelectorAll<HTMLElement>('.wg-cat')].map((card) => card.getBoundingClientRect().toJSON()),
    }));
    expect(geometry.scrollWidth).toBeLessThanOrEqual(geometry.clientWidth + 1);
    for (let index = 0; index < geometry.cards.length; index += 1) {
      const card = geometry.cards[index];
      expect(card.left).toBeGreaterThanOrEqual(geometry.bounds.left - 1);
      expect(card.right).toBeLessThanOrEqual(geometry.bounds.right + 1);
      if (index > 0) expect(card.top).toBeGreaterThanOrEqual(geometry.cards[index - 1].bottom);
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);

    await track.focus();
    await page.keyboard.press('ArrowDown');
    await expect(categories.nth(0).locator('.wg-arrow--second')).toBeFocused();
    await page.keyboard.press('ArrowDown');
    await expect(categories.nth(1).locator('.wg-arrow--second')).toBeFocused();

    await categories.first().scrollIntoViewIfNeeded();
    const beforeNext = await page.evaluate(() => window.scrollY);
    await categories.first().locator('.wg-arrow--second').click();
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(beforeNext);
    await expect(categories.nth(1)).toBeInViewport();

    await page.locator('#work-filter-btn').click();
    await page.locator('#work-filter-menu [data-jump="realestate"]').click();
    await expect(page.locator('#work-filter-menu')).toBeHidden();
    await expect(page.locator('.wg-cat[data-category="realestate"] .wg-panel')).toBeVisible();
    await page.locator('#work-filter-btn').click();
    await page.locator('#work-filter-menu [data-jump="jewelry"]').click();
    await expect(page.locator('#work-filter-menu')).toBeHidden();
    await expect(page.locator('.wg-cat[data-category="jewelry"] .wg-panel')).toBeVisible();
    const jewelryImages = page.locator('.wg-cat[data-category="jewelry"] .wg-card__media img');
    await expect(jewelryImages).toHaveCount(5);
    for (const image of await jewelryImages.all()) {
      await image.scrollIntoViewIfNeeded();
      await expect.poll(() => image.evaluate((element) => (element as HTMLImageElement).naturalWidth > 0)).toBe(true);
    }
  });

  test('desktop Work categories stack vertically without horizontal overflow', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/work', { waitUntil: 'domcontentloaded' });
    const track = page.locator('[data-category-track]');
    const categories = page.locator('.wg-cat');
    await expect(categories).toHaveCount(6);
    const expectedCategoryKeys = ['fashion', 'realestate', 'events', 'food', 'beauty', 'jewelry'];
    const expectedCategoryNames = ['FASHION', 'REAL ESTATE & CORPORATES', 'EVENTS & CONCERTS', 'FOOD & BEVERAGE', 'PERFUME & BEAUTY', 'JEWELRY & LUXURY'];
    expect(await categories.evaluateAll((items) => items.map((item) => item.getAttribute('data-category')))).toEqual(expectedCategoryKeys);
    await expect(track.locator('.wg-cat__name')).toHaveText(expectedCategoryNames);
    for (const category of await categories.all()) {
      await expect(category.locator('.wg-panel')).toBeVisible();
      await expect(category.locator('.wg-panel')).not.toHaveAttribute('hidden');
      await expect(category.locator('.wg-arrow--second')).not.toHaveAttribute('aria-expanded');
    }
    const geometry = await track.evaluate((element) => ({
      clientWidth: element.clientWidth,
      scrollWidth: element.scrollWidth,
      bounds: element.getBoundingClientRect().toJSON(),
      cards: [...element.querySelectorAll<HTMLElement>('.wg-cat')].map((card) => card.getBoundingClientRect().toJSON()),
    }));
    expect(geometry.scrollWidth).toBeLessThanOrEqual(geometry.clientWidth + 1);
    for (let index = 0; index < geometry.cards.length; index += 1) {
      const card = geometry.cards[index];
      expect(card.left).toBeGreaterThanOrEqual(geometry.bounds.left - 1);
      expect(card.right).toBeLessThanOrEqual(geometry.bounds.right + 1);
      if (index > 0) expect(card.top).toBeGreaterThanOrEqual(geometry.cards[index - 1].bottom);
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  });

  test('Arabic Work rail presents the six requested categories in RTL order', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/ar/work', { waitUntil: 'domcontentloaded' });
    const track = page.locator('[data-category-track]');
    const categories = page.locator('.wg-cat');
    await expect(track).toHaveAttribute('dir', 'rtl');
    expect(await categories.evaluateAll((items) => items.map((item) => item.getAttribute('data-category')))).toEqual([
      'fashion', 'realestate', 'events', 'food', 'beauty', 'jewelry',
    ]);
    await expect(track.locator('.wg-cat__name')).toHaveText([
      'الأزياء', 'العقارات والشركات', 'الفعاليات والحفلات', 'الطعام والمشروبات', 'العطور والجمال', 'المجوهرات والفخامة',
    ]);
    for (const category of await categories.all()) {
      await expect(category.locator('.wg-panel')).toBeVisible();
      await expect(category.locator('.wg-strip__hint')).toBeVisible();
      await expect(category.locator('.wg-strip__hint')).toHaveText('Scroll horizontally to explore');
    }
    const geometry = await track.evaluate((element) => ({
      clientWidth: element.clientWidth,
      scrollWidth: element.scrollWidth,
      cards: [...element.querySelectorAll<HTMLElement>('.wg-cat')].map((card) => card.getBoundingClientRect().toJSON()),
    }));
    expect(geometry.scrollWidth).toBeLessThanOrEqual(geometry.clientWidth + 1);
    for (let index = 1; index < geometry.cards.length; index += 1) {
      expect(geometry.cards[index].top).toBeGreaterThanOrEqual(geometry.cards[index - 1].bottom);
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  });

  test('mobile Disrupt keeps the girl and copy inside the frame and reveals four service cards', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    for (const [route, expectedTitles] of [
      ['/', ['Strategy', 'Media Production', 'Marketing', 'Digital Presence']],
      ['/ar', ['الاستراتيجية', 'الإنتاج المرئي', 'التسويق', 'الحضور الرقمي']],
    ] as const) {
      await page.goto(route, { waitUntil: 'networkidle' });
      const section = page.locator('.disrupt');
      const sticky = section.locator('.disrupt__sticky');
      const girl = section.locator('.disrupt__girl');
      const title = section.locator('.disrupt__tagline');
      const outro = section.locator('[data-disrupt-outro]');
      await expect(girl).toBeHidden();
      await expect(title).toBeVisible();
      await expect(sticky).not.toHaveClass(/is-outro/);
      const framing = await section.evaluate((element) => {
        const bounds = element.getBoundingClientRect();
        const within = (selector: string) => {
          const el = element.querySelector<HTMLElement>(selector);
          if (!el) return true;
          const rect = el.getBoundingClientRect();
          return rect.left >= bounds.left - 1 && rect.right <= bounds.right + 1
            && rect.top >= bounds.top - 1 && rect.bottom <= bounds.bottom + 1;
        };
        return { titleInside: within('.disrupt__tagline') };
      });
      expect(framing.titleInside).toBe(true);
      await outro.scrollIntoViewIfNeeded();
      await expect(sticky).toHaveClass(/is-outro/);
      await expect(outro).toHaveCSS('opacity', '1');
      expect(await outro.locator('.disrupt__tile-title').allTextContents()).toEqual(expectedTitles);
      await expect(outro.locator('.disrupt__tile-img')).toHaveCount(4);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
    }
  });

  test('mobile services phone entrance does not use the long spring-bounce animation', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    for (const route of ['/services', '/ar/services']) {
      await page.goto(route, { waitUntil: 'domcontentloaded' });
      await expect(page.locator('html')).toHaveAttribute('dir', route.startsWith('/ar/') ? 'rtl' : 'ltr');
      const calls = page.locator('#creativity-calls');
      const phone = page.locator('.svc-calls__phone-wrapper');

      await calls.scrollIntoViewIfNeeded();
      await expect(calls).toHaveClass(/is-visible/);
      await expect.poll(() => phone.evaluate((element) => getComputedStyle(element).animationName)).toBe('none');
      await expect(phone).toBeVisible();
      const composition = await calls.evaluate((element) => {
        const heading = element.querySelector<HTMLElement>('.svc-calls__heading')!;
        const handset = element.querySelector<HTMLElement>('.svc-calls__phone-stage')!.getBoundingClientRect();
        return { headingSize: parseFloat(getComputedStyle(heading).fontSize), phoneWidth: handset.width, phoneHeight: handset.height };
      });
      expect(composition.headingSize).toBeGreaterThanOrEqual(18);
      expect(composition.phoneWidth).toBeGreaterThanOrEqual(84);
      expect(composition.phoneHeight).toBeGreaterThanOrEqual(300);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
    }
  });
});
