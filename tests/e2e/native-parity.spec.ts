import { expect, test } from '@playwright/test';
import enMessages from '../../messages/en.json';

const routes = ['/', '/ar', '/about', '/services', '/work', '/contact'];
const legacyRoutes = ['/index.html', '/ar/index.html', '/pages/about.html', '/pages/services.html', '/pages/work.html', '/pages/contact.html'];

test.describe('native route parity', () => {
  for (const route of routes) {
    test(`${route} renders native layout without legacy injector`, async ({ page }) => {
      const errors: string[] = [];
      page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
      const response = await page.goto(route, { waitUntil: 'networkidle' });
      expect(response?.status()).toBe(200);
      await expect(page.locator('#main-nav')).toBeVisible();
      await expect(page.locator('main')).toHaveCount(1);
      expect(await page.locator('script').evaluateAll(scripts => scripts.filter(script => script.src.includes('/js/')).length)).toBe(0);
      expect(errors).toEqual([]);
    });
  }

  test('homepage disrupt composition preserves editorial card geometry and layering', async ({ page }) => {
    const viewports = [
      { width: 1920, height: 1080 },
      { width: 1440, height: 900 },
      { width: 1024, height: 768 },
      { width: 768, height: 1024 },
      { width: 390, height: 844 },
      { width: 375, height: 812 },
    ];

    for (const viewport of viewports) {
      await page.setViewportSize(viewport);
      await page.goto('/', { waitUntil: 'networkidle' });
      const section = page.locator('.disrupt');
      const firstCard = section.locator('.disrupt__card').first();
      const metrics = await section.evaluate((element) => {
        const sticky = element.querySelector<HTMLElement>('.disrupt__sticky')!;
        const logo = element.querySelector<HTMLElement>('.disrupt__tix')!.getBoundingClientRect();
          const stage = sticky.getBoundingClientRect();
          const card = element.querySelector<HTMLElement>('.disrupt__card')!;
          const title = element.querySelector<HTMLElement>('.disrupt__tagline')!;
          const girl = element.querySelector<HTMLElement>('.disrupt__girl')!;
          const row = element.querySelector<HTMLElement>('.disrupt__list li')!;
          const titleRule = element.querySelector<HTMLElement>('.disrupt__card-title')!;
          return {
          logoCenterDelta: Math.abs((logo.left + logo.width / 2) - (stage.left + stage.width / 2)),
          logoWidth: logo.width,
          cardHeight: card.getBoundingClientRect().height,
          cardBackground: getComputedStyle(card).backgroundColor,
          cardColor: getComputedStyle(card).color,
          cardBorderWidth: getComputedStyle(card).borderTopWidth,
          cardTitleColor: getComputedStyle(titleRule).color,
          titleZ: Number.parseInt(getComputedStyle(title).zIndex || '0', 10),
          girlZ: Number.parseInt(getComputedStyle(girl).zIndex || '0', 10),
          girlBlendMode: getComputedStyle(girl).mixBlendMode,
          rowBackground: getComputedStyle(row).backgroundColor,
          rowBottomBorder: getComputedStyle(row).borderBottomStyle,
          titleBottomBorder: getComputedStyle(titleRule).borderBottomStyle,
        };
      });

      await expect(firstCard).toBeVisible();
      expect(metrics.logoCenterDelta).toBeLessThan(2);
      expect(metrics.logoWidth).toBeGreaterThan(viewport.width <= 900 ? 80 : 200);
      expect(metrics.cardHeight).toBeGreaterThan(180);
      expect(metrics.cardBackground).toBe('rgb(255, 255, 255)');
      expect(metrics.cardColor).toBe('rgb(17, 17, 17)');
      expect(metrics.cardTitleColor).toBe('rgb(97, 0, 0)');
      if (viewport.width <= 900) expect(metrics.cardBorderWidth).toBe('6px');
      expect(await section.locator('.disrupt__card').count()).toBe(6);
      expect(await section.locator('.disrupt__tile').count()).toBe(4);
      expect(metrics.titleZ).toBeLessThan(metrics.girlZ);
      expect(metrics.girlBlendMode).toBe(viewport.width <= 900 ? 'normal' : 'lighten');
      expect(metrics.rowBackground).toBe('rgba(0, 0, 0, 0)');
      expect(metrics.rowBottomBorder).toBe('solid');
      expect(metrics.titleBottomBorder).toBe('solid');
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
    }
  });

  test('HOME trust ribbons remain English and use equal seamless cycles in Arabic', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/ar', { waitUntil: 'networkidle' });
    const headline = page.locator('.trust-section__headline');
    await expect(headline).toHaveAttribute('lang', 'en');
    await expect(headline).toHaveAttribute('dir', 'ltr');
    await expect(headline).toHaveAttribute('aria-label', 'THEY TRUSTED US');
    await expect(headline.locator('.trust-section__word')).toHaveCount(3);
    expect(await headline.locator('.trust-section__word').allTextContents()).toEqual(['THEY', 'TRUSTED', 'US']);

    const cycles = await page.locator('.trust-section__ribbon').evaluateAll((ribbons) =>
      ribbons.map((ribbon) => Array.from(ribbon.querySelectorAll<HTMLElement>('.marquee__group')).map((group) => ({
        text: group.textContent?.replace(/\s+/g, ' ').trim(),
        direction: group.getAttribute('dir'),
        width: group.getBoundingClientRect().width,
      }))),
    );
    expect(cycles).toHaveLength(2);
    for (const [first, duplicate] of cycles) {
      expect(first.text).toBe(duplicate.text);
      expect(first.direction).toBe('ltr');
      expect(duplicate.direction).toBe('ltr');
      expect(Math.abs(first.width - duplicate.width)).toBeLessThan(1);
    }
    const animations = await page.locator('.trust-section__ribbon .marquee__track').evaluateAll((tracks) =>
      tracks.map((track) => getComputedStyle(track).animationName),
    );
    expect(animations).toEqual(['marquee', 'marquee']);
  });

  test('HOME brand showcase displays five three-photo entries with integrated English names', async ({ page }) => {
    const expectedNames = ['ZEN DIAMOND', 'AMR DIAB / TAMER HOSNY', 'KENZ', 'H&M', 'ALMASAT ALKHALIJ'];
    for (const viewport of [{ width: 1440, height: 900 }, { width: 375, height: 812 }]) {
      await page.setViewportSize(viewport);
      await page.goto('/ar', { waitUntil: 'networkidle' });
      const section = page.locator('[data-home-brands]');
      await section.scrollIntoViewIfNeeded();
      const slides = section.locator('[data-brand-slide]');
      await expect(slides).toHaveCount(5);
      expect(await slides.locator('.home-brands__brand-name').allTextContents()).toEqual(expectedNames);
      for (const slide of await slides.all()) {
        await expect(slide).toHaveAttribute('lang', 'en');
        await expect(slide).toHaveAttribute('dir', 'ltr');
        await expect(slide.locator('.home-brands__brand-name')).toBeVisible();
        await expect(slide.locator('[data-brand-photo]')).toHaveCount(3);
        const srcs = await slide.locator('img').evaluateAll((images) => images.map((image) => image.getAttribute('src')));
        expect(new Set(srcs).size).toBe(3);
      }
      await section.locator('img').evaluateAll((images) => {
        (images as HTMLImageElement[]).forEach((image) => { image.loading = 'eager'; });
      });
      await expect.poll(() => section.locator('img').evaluateAll((images) =>
        (images as HTMLImageElement[]).every((image) => image.complete && image.naturalWidth > 0),
      )).toBe(true);
      const firstCollage = slides.first().locator('.home-brands__collage');
      const layout = await firstCollage.evaluate((element) => {
        const collage = element.getBoundingClientRect();
        const rect = (position: string) => {
          const box = element.querySelector<HTMLElement>(`[data-brand-photo="${position}"]`)!.getBoundingClientRect();
          return { x: box.left - collage.left, y: box.top - collage.top, width: box.width, height: box.height };
        };
        return { large: rect('large'), upper: rect('upper'), lower: rect('lower') };
      });
      expect(layout.large.width).toBeGreaterThan(layout.upper.width);
      expect(layout.upper.x).toBeGreaterThan(layout.large.x);
      expect(layout.upper.y).toBeLessThan(layout.large.y);
      expect(layout.lower.x).toBeLessThan(layout.large.x);
      expect(layout.lower.y).toBeGreaterThan(layout.large.y);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
    }
  });

  test('HOME brand sequence follows vertical scroll on desktop and stays swipeable on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/ar', { waitUntil: 'networkidle' });
    const section = page.locator('[data-home-brands]');
    const track = section.locator('[data-home-brands-track]');
    await section.scrollIntoViewIfNeeded();
    await expect.poll(() => section.getAttribute('data-scroll-driven')).toBe('true');
    const top = await section.evaluate((element) => element.getBoundingClientRect().top + window.scrollY);
    await page.evaluate((scrollTop) => window.scrollTo({ top: scrollTop + 5, behavior: 'instant' }), top);
    await page.waitForTimeout(120);
    const startTransform = await track.evaluate((element) => getComputedStyle(element).transform);
    await page.evaluate((scrollTop) => window.scrollTo({ top: scrollTop + 900, behavior: 'instant' }), top);
    await expect.poll(() => track.evaluate((element) => getComputedStyle(element).transform)).not.toBe(startTransform);

    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/ar', { waitUntil: 'networkidle' });
    const mobileSection = page.locator('[data-home-brands]');
    const viewport = mobileSection.locator('[data-home-brands-viewport]');
    const scrollHint = mobileSection.locator('.home-brands__scroll-hint');
    await mobileSection.scrollIntoViewIfNeeded();
    await expect(mobileSection).not.toHaveAttribute('data-scroll-driven');
    await expect(scrollHint).toBeVisible();
    const hintPosition = await mobileSection.evaluate((element) => {
      const hint = element.querySelector<HTMLElement>('.home-brands__scroll-hint')!;
      const gallery = element.querySelector<HTMLElement>('[data-home-brands-viewport]')!;
      return {
        precedesGallery: Boolean(hint.compareDocumentPosition(gallery) & Node.DOCUMENT_POSITION_FOLLOWING),
        hintBottom: hint.getBoundingClientRect().bottom,
        galleryTop: gallery.getBoundingClientRect().top,
      };
    });
    expect(hintPosition.precedesGallery).toBe(true);
    expect(hintPosition.hintBottom).toBeLessThanOrEqual(hintPosition.galleryTop + 1);
    await expect.poll(() => viewport.evaluate((element) => element.scrollWidth > element.clientWidth)).toBe(true);
    await viewport.evaluate((element) => element.scrollTo({ left: element.scrollWidth, behavior: 'instant' }));
    await expect.poll(() => viewport.evaluate((element) => element.scrollLeft)).toBeGreaterThan(0);
  });

  test('Arabic HOME keeps the model in front of the correctly-directed Disrupt headline', async ({ page }) => {
    for (const viewport of [{ width: 1440, height: 900 }, { width: 375, height: 812 }]) {
      await page.setViewportSize(viewport);
      await page.goto('/ar', { waitUntil: 'networkidle' });
      const section = page.locator('[data-disrupt-pin]');
      const title = section.locator('.disrupt__tagline');
      const girl = section.locator('.disrupt__girl');
      await expect(title).toHaveAttribute('lang', 'ar');
      await expect(title).toHaveAttribute('dir', 'rtl');
      const layers = await section.evaluate((element) => ({
        titleZ: Number.parseInt(getComputedStyle(element.querySelector<HTMLElement>('.disrupt__tagline')!).zIndex, 10),
        girlZ: Number.parseInt(getComputedStyle(element.querySelector<HTMLElement>('.disrupt__girl')!).zIndex, 10),
      }));
      expect(layers.girlZ).toBeGreaterThan(layers.titleZ);
      await expect(title).toBeVisible();
      await expect(girl).toBeVisible();
      if (viewport.width > 900) {
        const layout = await section.evaluate((element) => {
          const sticky = element.querySelector<HTMLElement>('.disrupt__sticky')!;
          const girlRect = element.querySelector<HTMLElement>('.disrupt__girl')!.getBoundingClientRect();
          const cardRect = element.querySelector<HTMLElement>('.disrupt__card')!.getBoundingClientRect();
          return {
            direction: getComputedStyle(sticky).direction,
            girlCenter: girlRect.left + girlRect.width / 2,
            cardCenter: cardRect.left + cardRect.width / 2,
            gap: Math.max(0, cardRect.left - girlRect.right, girlRect.left - cardRect.right),
          };
        });
        expect(layout.direction).toBe('rtl');
        expect(layout.girlCenter).toBeGreaterThan(layout.cardCenter);
        expect(layout.gap).toBeLessThanOrEqual(24);
      }
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
    }
  });



  test('language switch remains visible on every public route', async ({ page }) => {
    await page.goto('/ar/', { waitUntil: 'networkidle' });
    await expect.poll(() => new URL(page.url()).pathname).toBe('/ar');
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', 'https://tixstudio.com/ar');
    await page.context().clearCookies();

    for (const route of routes) {
      await page.context().clearCookies();
      await page.goto(route, { waitUntil: 'networkidle' });
      const languageSwitch = page.locator(`#main-nav .nav__language[hreflang="${route === '/ar' ? 'en' : 'ar'}"]:visible`);
      await expect(languageSwitch).toBeVisible();
      const expectedPath = route === '/' ? '/ar' : route === '/ar' ? '/' : `/ar${route}`;
      await languageSwitch.click();
      await expect.poll(() => new URL(page.url()).pathname).toBe(expectedPath);
    }
  });

  test('Studio images use root asset URLs and contain no migration placeholders', async ({ page }) => {
    await page.goto('/ar/about', { waitUntil: 'networkidle' });
    const firstGalleryImage = page.locator('.bts__group:not(.bts__group--duplicate) .bts__img img').first();
    await page.locator('.bts__carousel').scrollIntoViewIfNeeded();
    await expect(firstGalleryImage).toBeVisible();
    await expect(page.locator('.refused')).toHaveCount(0);
    await expect(page.locator('.bts__group:not(.bts__group--duplicate) .bts__img')).toHaveCount(5);
    await expect(page.locator('.bts__group--duplicate .bts__img')).toHaveCount(5);
    await expect(page.locator('.bts__ticker + .bts')).toHaveCount(1);
    await page.locator('.bts__carousel img').evaluateAll((images) => {
      (images as HTMLImageElement[]).forEach((image) => { image.loading = 'eager'; });
    });
    await expect.poll(() => page.locator('.bts__carousel img').evaluateAll((images) =>
      (images as HTMLImageElement[]).every((image) => image.complete && image.naturalWidth > 0),
    )).toBe(true);
    await expect(page.locator('.bts__img > div')).toHaveCount(0);
    const invalidSources = await page.locator('.impact-hero img, .touchpoints img, .connection img, .bts__carousel img').evaluateAll((images) =>
      images.map((image) => image.getAttribute('src') || '').filter((src) => src.startsWith('../assets/')),
    );
    expect(invalidSources).toEqual([]);
    const brokenImages = await page.locator('.impact-hero img, .touchpoints img, .connection img, .bts__carousel img').evaluateAll((images) =>
      (images as HTMLImageElement[]).filter((image) => !image.complete || image.naturalWidth === 0).map((image) => image.getAttribute('src')),
    );
    expect(brokenImages).toEqual([]);
    const imageSources = await page.locator('.impact-hero img, .touchpoints img, .connection img, .bts__carousel img').evaluateAll((images) =>
      images.map((image) => image.getAttribute('src') || ''),
    );
    const imageStatuses = await Promise.all(imageSources.map(async (src) => ({
      src,
      status: (await page.request.get(new URL(src, page.url()).toString())).status(),
    })));
    expect(imageStatuses).toEqual(imageSources.map((src) => ({ src, status: 200 })));
  });

  test('Studio Inside the Frame keeps the MarQEE first and uses a seamless full-width photo loop', async ({ page }) => {
    expect(enMessages.AboutPage.pauseGallery).toBe('Pause carousel');
    expect(enMessages.AboutPage.resumeGallery).toBe('Resume carousel');
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/ar/about', { waitUntil: 'networkidle' });
    await expect(page.locator('.bts__ticker + .bts')).toHaveCount(1);
    const carousel = page.locator('.bts__carousel');
    const track = carousel.locator('.bts__track');
    await expect(carousel).toHaveAttribute('tabindex', '0');
    await expect(carousel.locator('.bts__group:not(.bts__group--duplicate) .bts__img')).toHaveCount(5);
    await expect(carousel.locator('.bts__group--duplicate .bts__img')).toHaveCount(5);
    await expect(carousel.locator('.bts__group--duplicate')).toHaveAttribute('aria-hidden', 'true');
    const groupWidths = await carousel.locator('.bts__group').evaluateAll((groups) =>
      groups.map((group) => group.getBoundingClientRect().width),
    );
    expect(Math.abs(groupWidths[0] - groupWidths[1])).toBeLessThan(1);
    await expect.poll(() => track.evaluate((element) => getComputedStyle(element).animationName)).toBe('btsPhotoLoop');
    const initialTransform = await track.evaluate((element) => getComputedStyle(element).transform);
    await expect.poll(() => track.evaluate((element) => getComputedStyle(element).transform)).not.toBe(initialTransform);

    const pauseButton = page.locator('.bts__motion-toggle');
    await expect(pauseButton).toBeVisible();
    await expect(pauseButton).toHaveAccessibleName('إيقاف عرض الصور مؤقتاً');
    await expect(pauseButton).not.toHaveAttribute('aria-pressed');
    await pauseButton.focus();
    await page.keyboard.press('Space');
    await expect(pauseButton).toHaveAccessibleName('استئناف عرض الصور');
    await expect(pauseButton).toHaveClass(/is-paused/);
    await expect(pauseButton).not.toHaveAttribute('aria-pressed');
    await expect(track).toHaveCSS('animation-play-state', 'paused');
    await page.keyboard.press('Space');
    await expect(pauseButton).toHaveAccessibleName('إيقاف عرض الصور مؤقتاً');
    await expect(pauseButton).not.toHaveClass(/is-paused/);
    await expect(pauseButton).not.toHaveAttribute('aria-pressed');
    await expect(track).toHaveCSS('animation-play-state', 'running');

    await page.emulateMedia({ reducedMotion: 'reduce' });
    await expect.poll(() => track.evaluate((element) => getComputedStyle(element).animationName)).toBe('none');
    await expect(carousel.locator('.bts__group--duplicate')).toBeHidden();
    await expect(carousel).toHaveCSS('overflow-x', 'auto');
    await expect(page.locator('.bts__carousel-tools')).toBeHidden();
  });

  test('Studio carousel pause control responds to touch input', async ({ browser }) => {
    const context = await browser.newContext({
      viewport: { width: 390, height: 844 },
      isMobile: true,
      hasTouch: true,
    });
    try {
      const page = await context.newPage();
      await page.emulateMedia({ reducedMotion: 'no-preference' });
      await page.goto('/ar/about', { waitUntil: 'networkidle' });
      const button = page.locator('.bts__motion-toggle');
      await button.scrollIntoViewIfNeeded();
      await expect(button).toBeVisible();
      await expect(button).toHaveCSS('min-height', '44px');
      await expect(button).toHaveAccessibleName('إيقاف عرض الصور مؤقتاً');
      await expect(button).not.toHaveAttribute('aria-pressed');
      const box = await button.boundingBox();
      expect(box).not.toBeNull();
      await page.touchscreen.tap(box!.x + box!.width / 2, box!.y + box!.height / 2);
      await expect(button).toHaveAccessibleName('استئناف عرض الصور');
      await expect(button).toHaveClass(/is-paused/);
      await expect(button).not.toHaveAttribute('aria-pressed');
      await expect(page.locator('.bts__track')).toHaveCSS('animation-play-state', 'paused');
    } finally {
      await context.close();
    }
  });

  test('Studio touchpoint cards respond to scroll progress', async ({ page }) => {
    await page.goto('/about', { waitUntil: 'networkidle' });
    const section = page.locator('[data-touchpoints]');
    await expect(section.locator('[data-flight-card]')).toHaveCount(4);
    await section.evaluate((element) => {
      const top = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: top + element.clientHeight * 0.42, behavior: 'instant' });
    });
    await expect.poll(async () => {
      const opacities = await section.locator('[data-flight-card]').evaluateAll((elements) =>
        elements.map((element) => Number.parseFloat(getComputedStyle(element).opacity)),
      );
      return opacities.some((opacity) => opacity > 0.85);
    }).toBe(true);
    const stageBox = await section.locator('.touchpoints__stage').boundingBox();
    expect((stageBox?.y ?? 0) + (stageBox?.height ?? 0)).toBeGreaterThan(0);
    const cards = await section.locator('[data-flight-card]').evaluateAll((elements) => elements.map((element) => ({
      opacity: Number.parseFloat(getComputedStyle(element).opacity),
      transform: getComputedStyle(element).transform,
    })));
    expect(cards.some((card) => card.opacity > 0.85)).toBeTruthy();
  });

  test('Studio six-word sequence is complete and The Signal paragraph moves left in Arabic', async ({ page }) => {
    const versions = [
      {
        route: '/about', direction: 'ltr', animation: 'brandWordRollSix',
        stable: 'For brands that need',
        words: ['ATTENTION', 'IMPACT', 'PRESENCE', 'MOVEMENT', 'DIRECTION', 'CULTURE'],
      },
      {
        route: '/ar/about', direction: 'rtl', animation: 'brandWordRollSixArabic',
        stable: 'للعلامات التي تحتاج إلى',
        words: ['الاهتمام', 'الأثر', 'الحضور', 'الحركة', 'التوجّه', 'الثقافة'],
      },
    ] as const;
    const colors = ['word-red', 'word-beige', 'word-red', 'word-beige', 'word-beige', 'word-red', 'word-red'];
    for (const version of versions) {
      for (const viewport of [{ width: 1440, height: 900 }, { width: 390, height: 844 }]) {
        await page.setViewportSize(viewport);
        await page.goto(version.route, { waitUntil: 'networkidle' });
        const stable = page.locator('.brand-focus__stable');
        const wordWindow = page.locator('.brand-focus__window');
        const track = page.locator('.brand-focus__track');
        await expect(stable).toHaveText(version.stable);
        await expect(stable).toHaveAttribute('dir', version.direction);
        await expect(wordWindow).toHaveAttribute('dir', version.direction);
        const wordSpans = track.locator(':scope > span');
        expect(await wordSpans.allTextContents()).toEqual([...version.words, version.words[0]]);
        expect(await wordSpans.evaluateAll((spans) => spans.map((span) => span.className))).toEqual(colors);
        await expect.poll(() => track.evaluate((element) => getComputedStyle(element).animationName)).toBe(version.animation);
        const signal = page.locator('#signal-intro');
        await signal.scrollIntoViewIfNeeded();
        await expect(signal.locator('.signal-intro__right .signal-intro__p').first()).toBeVisible();
        if (version.direction === 'rtl' && viewport.width > 900) {
          const columns = await signal.evaluate((element) => {
            const center = (selector: string) => {
              const rect = element.querySelector<HTMLElement>(selector)!.getBoundingClientRect();
              return rect.left + rect.width / 2;
            };
            return { paragraph: center('.signal-intro__right'), heading: center('.signal-intro__left') };
          });
          expect(columns.paragraph).toBeLessThan(columns.heading);
        }
      }
    }
  });

  test('Studio touchpoints preserve the portrait reference composition', async ({ page }) => {
    const viewports = [
      { width: 1920, height: 1080 },
      { width: 1440, height: 900 },
      { width: 1024, height: 768 },
      { width: 768, height: 1024 },
      { width: 390, height: 844 },
      { width: 375, height: 812 },
    ];

    for (const viewport of viewports) {
      await page.setViewportSize(viewport);
      await page.goto('/about', { waitUntil: 'networkidle' });
      const section = page.locator('[data-touchpoints]');
      const stage = section.locator('.touchpoints__stage');
      const heading = section.locator('.touchpoints__copy h2');
      const subtitle = section.locator('.touchpoints__copy > p:last-child');
      await expect(heading).toHaveText('Built across every touchpoint.');
      await expect(subtitle).toHaveText('One studio. Multiple creative systems. Unified brand experiences.');
      await expect(section.locator('[data-flight-card]')).toHaveCount(4);
      await expect(section.locator('.touchpoints__logo')).toBeVisible();
      await expect(section.locator('.touchpoints__chevron, .touchpoints__wipe')).toHaveCount(0);
      const transition = await stage.evaluate((element) => ({
        clipPath: getComputedStyle(element).clipPath,
        fade: getComputedStyle(element, '::after').backgroundImage,
        background: getComputedStyle(element).backgroundColor,
      }));
      expect(transition.clipPath).toBe('none');
      expect(transition.fade).toContain('linear-gradient');
      expect(transition.background).toBe('rgb(0, 0, 0)');

      const stageBox = await stage.boundingBox();
      expect(stageBox).not.toBeNull();
      expect(stageBox!.width).toBeGreaterThanOrEqual(Math.min(viewport.width, 1480) - 2);
      expect(stageBox!.width).toBeLessThanOrEqual(viewport.width + 1);
      expect(Math.abs((stageBox!.width / stageBox!.height) - (3704 / 4994))).toBeLessThan(0.01);
      expect(Math.abs((await section.boundingBox())!.height - stageBox!.height)).toBeLessThan(3);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);

      await stage.scrollIntoViewIfNeeded();
      const headingBox = await heading.boundingBox();
      const navBox = await page.locator('#main-nav').boundingBox();
      const positionedStageBox = await stage.boundingBox();
      expect((headingBox?.y ?? 0) - (positionedStageBox?.y ?? 0)).toBeGreaterThanOrEqual((navBox?.height ?? 0) - 2);
    }
  });

  test('Arabic Studio touchpoint cards stay sharp, smaller, and within the frame', async ({ page }) => {
    for (const viewport of [
      { width: 320, height: 740 },
      { width: 360, height: 780 },
      { width: 375, height: 812 },
      { width: 390, height: 844 },
      { width: 430, height: 900 },
      { width: 768, height: 1024 },
      { width: 1024, height: 768 },
      { width: 1440, height: 900 },
      { width: 1920, height: 1080 },
    ]) {
      await page.setViewportSize(viewport);
      await page.goto('/ar/about', { waitUntil: 'networkidle' });
      const section = page.locator('[data-touchpoints]');
      await expect(section.locator('[data-flight-card]')).toHaveCount(4);
      const metrics = await section.evaluate((element) => {
        const stage = element.querySelector<HTMLElement>('.touchpoints__stage')!;
        const stageStyle = getComputedStyle(stage);
        const cards = Array.from(element.querySelectorAll<HTMLImageElement>('[data-flight-card]'));
        return {
          clipPath: stageStyle.clipPath,
          fade: getComputedStyle(stage, '::after').backgroundImage,
          stageWidth: stage.clientWidth,
          cardWidths: cards.map((card) => Number.parseFloat(getComputedStyle(card).width)),
          filters: cards.map((card) => getComputedStyle(card).filter),
          loaded: cards.every((card) => card.complete && card.naturalWidth > 0),
          documentWidth: document.documentElement.scrollWidth,
        };
      });
      expect(metrics.clipPath).toBe('none');
      expect(metrics.fade).toContain('linear-gradient');
      expect(metrics.loaded).toBe(true);
      expect(metrics.filters.every((filter) => filter.includes('drop-shadow') && !filter.includes('blur'))).toBe(true);
      const maxCardRatio = Math.max(...metrics.cardWidths) / metrics.stageWidth;
      expect(maxCardRatio).toBeLessThan(viewport.width <= 900 ? 0.4 : 0.3);
      expect(metrics.documentWidth).toBeLessThanOrEqual(viewport.width);
    }
  });

  test('Studio Touchpoints central logo stays aligned to the frame center', async ({ page }) => {
    for (const viewport of [
      { width: 1920, height: 1080 },
      { width: 1440, height: 900 },
      { width: 1024, height: 768 },
      { width: 768, height: 1024 },
      { width: 390, height: 844 },
    ]) {
      await page.setViewportSize(viewport);
      await page.goto('/about', { waitUntil: 'networkidle' });
      const centers = await page.evaluate(() => {
        const stage = document.querySelector<HTMLElement>('.touchpoints__stage')?.getBoundingClientRect();
        const logo = document.querySelector<HTMLElement>('.touchpoints__logo')?.getBoundingClientRect();
        return {
          stage: stage ? stage.left + stage.width / 2 : null,
          logo: logo ? logo.left + logo.width / 2 : null,
        };
      });
      expect(centers.stage).not.toBeNull();
      expect(centers.logo).not.toBeNull();
      expect(Math.abs((centers.logo ?? 0) - (centers.stage ?? 0))).toBeLessThan(1);
    }
  });

  test('Studio touchpoint motion reverses without duplicate triggers', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/about', { waitUntil: 'networkidle' });
    const section = page.locator('[data-touchpoints]');
    const card = section.locator('[data-flight-card]').first();
    await section.evaluate((element) => {
      window.scrollTo({ top: element.getBoundingClientRect().top + window.scrollY, behavior: 'instant' });
    });
    await page.waitForTimeout(250);
    const start = await card.evaluate((element) => getComputedStyle(element).transform);
    await section.evaluate((element) => {
      window.scrollTo({ top: element.getBoundingClientRect().top + window.scrollY + element.clientHeight - innerHeight, behavior: 'instant' });
    });
    await page.waitForTimeout(500);
    const end = await card.evaluate((element) => getComputedStyle(element).transform);
    expect(end).not.toBe(start);
    await section.evaluate((element) => {
      window.scrollTo({ top: element.getBoundingClientRect().top + window.scrollY, behavior: 'instant' });
    });
    await page.waitForTimeout(700);
    const reversed = await card.evaluate((element) => getComputedStyle(element).transform);
    expect(reversed).not.toBe(end);
  });

  test('mobile navigation opens and closes with Escape', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/', { waitUntil: 'networkidle' });
    const burger = page.locator('.nav__burger');
    const menu = page.locator('#mobile-menu');
    await burger.click();
    await expect(menu).toBeVisible();
    await expect(burger).toHaveAttribute('aria-expanded', 'true');
    await expect.poll(() => page.evaluate(() => Array.from(document.body.children).some((element) => (element as HTMLElement).inert))).toBe(true);
    const firstMenuLink = menu.locator('[data-menu-links] a').first();
    await expect(firstMenuLink).toBeVisible();
    await firstMenuLink.focus();
    await expect(firstMenuLink).toBeFocused();
    await page.keyboard.press('Shift+Tab');
    await expect(menu.locator('button').first()).toBeFocused();
    await page.keyboard.press('Tab');
    await expect(firstMenuLink).toBeFocused();
    await page.keyboard.press('Escape');
    await expect(menu).toBeHidden();
    await expect(burger).toHaveAttribute('aria-expanded', 'false');
    await expect.poll(() => page.evaluate(() => Array.from(document.body.children).some((element) => (element as HTMLElement).inert))).toBe(false);
    await expect(burger).toBeFocused();

    await burger.click();
    await expect(menu).toBeVisible();
    await menu.locator('[data-menu-links] a[href="/about"]').click();
    await expect.poll(() => new URL(page.url()).pathname).toBe('/about');
    await expect(menu).toBeHidden();
    await expect(burger).toHaveAttribute('aria-expanded', 'false');
  });

  test('Arabic mobile drawer preserves RTL focus, inert background, scroll lock and responsive breakpoint behavior', async ({ page }) => {
    for (const width of [320, 360, 375, 390, 430, 768]) {
      await page.setViewportSize({ width, height: width === 768 ? 1024 : 844 });
      await page.goto('/ar', { waitUntil: 'networkidle' });
      const burger = page.locator('.nav__burger');
      const menu = page.locator('#mobile-menu');
      await expect(burger).toBeVisible();
      await burger.click();
      await expect(menu).toBeVisible();
      await expect(menu).toHaveAttribute('dir', 'rtl');
      await expect(menu).toHaveAttribute('aria-modal', 'true');
      await expect(burger).toHaveAttribute('aria-expanded', 'true');
      await expect.poll(() => page.evaluate(() => Array.from(document.body.children).some((element) => (element as HTMLElement).inert))).toBe(true);
      await expect.poll(() => page.evaluate(() => document.body.style.overflow)).toBe('hidden');
      const firstMenuLink = menu.locator('[data-menu-links] a').first();
      await expect(firstMenuLink).toBeFocused();

      if (width === 390) {
        await page.keyboard.press('Shift+Tab');
        await expect(menu.locator('button').first()).toBeFocused();
        await page.keyboard.press('Tab');
        await expect(firstMenuLink).toBeFocused();
      }

      await page.keyboard.press('Escape');
      await expect(menu).toBeHidden();
      await expect(burger).toHaveAttribute('aria-expanded', 'false');
      await expect.poll(() => page.evaluate(() => Array.from(document.body.children).some((element) => (element as HTMLElement).inert))).toBe(false);
      await expect.poll(() => page.evaluate(() => document.body.style.overflow)).toBe('');
      await expect(burger).toBeFocused();

      await burger.click();
      await expect(menu).toBeVisible();
      await menu.locator('[data-menu-links] a[href$="/about"]').click();
      await expect.poll(() => new URL(page.url()).pathname).toBe('/ar/about');
      await expect(menu).toBeHidden();
      await expect(burger).toHaveAttribute('aria-expanded', 'false');
      await expect.poll(() => page.evaluate(() => document.body.style.overflow)).toBe('');
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
    }
  });

  for (const route of legacyRoutes) {
    test(`${route} redirects to the clean route`, async ({ page }) => {
      const response = await page.goto(route, { waitUntil: 'networkidle' });
      expect(response?.status()).toBe(200);
      const expectedPath = route === '/index.html'
        ? '/'
        : route === '/ar/index.html'
          ? '/ar'
          : route.replace('/pages', '').replace('.html', '');
      await expect.poll(() => new URL(page.url()).pathname).toBe(expectedPath);
      await expect(page.locator('#main-nav')).toBeVisible();
    });
  }

  test('work gallery expands width without changing height', async ({ page }) => {
    await page.goto('/pages/work.html', { waitUntil: 'networkidle' });
    const card = page.locator('[data-strip] .wg-card').first();
    const before = await card.boundingBox();
    await card.hover();
    await page.waitForTimeout(650);
    const expanded = await card.boundingBox();
    expect(expanded?.width).toBeGreaterThan((before?.width ?? 0) * 1.2);
    expect(Math.abs((expanded?.height ?? 0) - (before?.height ?? 0))).toBeLessThan(3);
    await page.mouse.move(10, 10);
    await page.waitForTimeout(650);
    const restored = await card.boundingBox();
    expect(restored?.width).toBeLessThan((expanded?.width ?? Infinity) * 0.85);
  });

  test('services reconstructs chevron and phone scroll motion', async ({ page }) => {
    await page.goto('/services', { waitUntil: 'networkidle' });
    await page.waitForTimeout(700);
    await expect(page.locator('#svchero-stage')).toHaveClass(/is-open/);
    await page.locator('#creativity-calls').scrollIntoViewIfNeeded();
    await page.waitForTimeout(900);
    await expect(page.locator('#creativity-calls')).toHaveClass(/is-visible/);
    await expect(page.locator('.svc-calls__phone-stage')).toHaveClass(/is-visible/);
  });

  test('Arabic Services hero stays RTL and chevrons reopen after returning to the page', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/ar/services', { waitUntil: 'networkidle' });
    const stage = page.locator('#svchero-stage');
    const heroHeading = page.locator('.svchero__title-wrap--top h1');
    const studioHeading = page.locator('.svchero__title-wrap--bottom h2');
    await expect(heroHeading).toHaveAttribute('lang', 'ar');
    await expect(heroHeading).toHaveAttribute('dir', 'rtl');
    await expect(studioHeading).toHaveAttribute('lang', 'ar');
    await expect(studioHeading).toHaveAttribute('dir', 'rtl');
    await expect.poll(() => heroHeading.evaluate((element) => getComputedStyle(element.parentElement!).textAlign)).toBe('right');
    await expect.poll(() => studioHeading.evaluate((element) => getComputedStyle(element.parentElement!).textAlign)).toBe('left');
    const layout = await page.evaluate(() => {
      const center = (selector: string) => {
        const rect = document.querySelector<HTMLElement>(selector)!.getBoundingClientRect();
        return rect.left + rect.width / 2;
      };
      return {
        content: center('.svchero__title-wrap--top'),
        stage: center('#svchero-stage'),
        studio: center('.svchero__title-wrap--bottom'),
      };
    });
    expect(layout.content).toBeGreaterThan(layout.stage);
    expect(layout.studio).toBeLessThan(layout.stage);
    await expect(stage).toHaveClass(/is-open/);

    await page.locator('#main-nav a[href$="/about"]').first().click();
    await expect(page).toHaveURL(/\/ar\/about$/);
    await expect(stage).toHaveCount(0);
    await page.locator('#main-nav a[href$="/services"]').first().click();
    await expect(page).toHaveURL(/\/ar\/services$/);
    await expect(stage).toHaveClass(/is-open/);
  });

  test('Arabic Services localizes the phone intro and removes the handset shadow', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/ar/services', { waitUntil: 'networkidle' });
    const intro = page.locator('.svc-calls__button-copy');
    const phone = page.locator('.svc-calls__phone-img');
    await expect(intro).toHaveAttribute('lang', 'ar');
    await expect(intro).toHaveAttribute('dir', 'rtl');
    await expect(intro).toHaveText('توجيه إبداعي واستراتيجية وإنتاج وأنظمة رقمية تصوغ علامات تجارية عصرية.');
    await expect(intro).not.toContainText('Creative direction');
    await expect(phone).toHaveAttribute('alt', 'سماعة هاتف كلاسيكي معلّقة بسلك حلزوني');
    await page.locator('#creativity-calls').scrollIntoViewIfNeeded();
    await expect(page.locator('#creativity-calls')).toHaveClass(/is-visible/);
    await expect(page.locator('.svc-calls__phone-stage')).toHaveClass(/is-visible/);
    await expect(phone).toHaveCSS('filter', 'none');
  });


  test('shared footer is present on non-contact public routes', async ({ page }) => {
    for (const route of ['/', '/ar', '/about', '/services', '/work']) {
      await page.goto(route, { waitUntil: 'networkidle' });
      await expect(page.locator('.tix-section .cta-card')).toHaveCount(1);
      await expect(page.locator('.tix-footer')).toHaveCount(1);
      await expect(page.locator('.tix-footer')).toBeVisible();
    }
  });

  test('Arabic Contact boy section stays centered across viewport sizes', async ({ page }) => {
    for (const viewport of [
      { width: 1920, height: 1080 },
      { width: 1440, height: 900 },
      { width: 390, height: 844 },
    ]) {
      await page.setViewportSize(viewport);
      await page.goto('/ar/contact', { waitUntil: 'networkidle' });
      const footer = page.locator('[data-contact-footer]');
      await footer.scrollIntoViewIfNeeded();
      const centers = await footer.evaluate((element) => {
        const center = (target: Element) => {
          const rect = target.getBoundingClientRect();
          return rect.left + rect.width / 2;
        };
        const inner = element.querySelector<HTMLElement>('.contact-footer__inner')!;
        const panel = element.querySelector<HTMLElement>('[data-contact-panel]')!;
        const boy = element.querySelector<HTMLElement>('[data-contact-character]')!;
        const headingRow = element.querySelector<HTMLElement>('.contact-footer__headlines')!;
        return {
          viewport: window.innerWidth / 2,
          inner: center(inner),
          panel: center(panel),
          boy: center(boy),
          headingRow: center(headingRow),
        };
      });
      expect(Math.abs(centers.inner - centers.viewport)).toBeLessThanOrEqual(2);
      expect(Math.abs(centers.panel - centers.viewport)).toBeLessThanOrEqual(2);
      expect(Math.abs(centers.boy - centers.viewport)).toBeLessThanOrEqual(2);
      if (viewport.width > 640) {
        expect(Math.abs(centers.headingRow - centers.viewport)).toBeLessThanOrEqual(2);
      }
    }
  });

  test('Contact preserves the form and renders the dedicated reference footer', async ({ page }) => {
    const formCard = page.locator('.contact-single-section .contact-form');
    const viewports = [
      { width: 1440, height: 900 },
      { width: 1024, height: 768 },
      { width: 768, height: 1024 },
      { width: 390, height: 844 },
      { width: 375, height: 812 },
    ];
    await page.goto('/contact', { waitUntil: 'networkidle' });
    await expect(page.locator('#contact-form-heading')).toHaveText('What do you want the world to feel?');
    await expect(page.locator('.contact-copy__eyebrow')).toHaveText("LET'S GET IN TOUCH");
    await expect(page.locator('.contact-copy__service')).toHaveText('Strategy. Production. Digital. Visual.');
    await expect(page.locator('.contact-copy__body')).toHaveText("Tell us what you're building, what you're imagining, what your brand is missing.");
    await expect(page.locator('textarea[name="building"]')).toBeVisible();
    const footerCopy = await page.locator('[data-contact-footer] .contact-footer__headlines').textContent();
    expect((footerCopy || '').replace(/\s+/g, ' ').trim()).toBe("Let's make something impossible to ignore.");
    for (const viewport of viewports) {
      await page.setViewportSize(viewport);
      await expect(page.locator('#main-content > section')).toHaveCount(2);
      await expect(page.locator('.contact-hero, .contact-footer-section')).toHaveCount(0);
      await expect(page.locator('.contact-single-section')).toBeVisible();
      await expect(page.locator('#contact-hero-heading')).toHaveCount(0);
      await expect(formCard).toBeVisible();
      const rect = await formCard.boundingBox();
      expect(rect).not.toBeNull();
      expect(Math.abs((rect!.x + rect!.width / 2) - viewport.width / 2)).toBeLessThan(8);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
      await expect(formCard.locator('input[name="name"]')).toBeVisible();
      await expect(formCard.locator('input[name="email"]')).toBeVisible();
      await expect(formCard.locator('textarea[name="building"]')).toBeVisible();
      await expect(page.locator('[data-contact-footer]')).toBeVisible();
      await expect(page.locator('[data-contact-footer] [data-contact-character]')).toBeVisible();
      await expect(page.locator('[data-contact-footer] [aria-label^="TIX on "]')).toHaveCount(5);
      await expect(formCard.locator('.form-submit')).toHaveText('Send message →');
      await expect(page.locator('[data-contact-footer] > div > a')).toHaveCount(0);
      const panelRect = await page.locator('[data-contact-panel]').boundingBox();
      const contactInfoRect = await page.locator('[data-contact-footer] h3').first().boundingBox();
      expect(panelRect).not.toBeNull();
      expect(contactInfoRect).not.toBeNull();
      expect(contactInfoRect!.x).toBeGreaterThanOrEqual(panelRect!.x - 1);
      expect(contactInfoRect!.x + contactInfoRect!.width).toBeLessThanOrEqual(panelRect!.x + panelRect!.width + 1);
      if (viewport.width <= 640) {
        const heroRect = await page.locator('.contact-single-section').boundingBox();
        const formSectionRect = await page.locator('.contact-single-section').boundingBox();
        const footerRect = await page.locator('[data-contact-footer]').boundingBox();
        const characterRect = await page.locator('[data-contact-character]').boundingBox();
        const legalRect = await page.locator('[data-contact-footer] nav[aria-label="Legal links"]').boundingBox();
        expect(heroRect?.height).toBeGreaterThan(0);
        expect(formSectionRect?.height).toBeGreaterThan(0);
        expect(footerRect?.height).toBeGreaterThan(0);
        expect(characterRect).not.toBeNull();
        expect(Math.abs((characterRect!.x + characterRect!.width / 2) - viewport.width / 2)).toBeLessThan(2);
        expect(legalRect).not.toBeNull();
        expect(legalRect!.y + legalRect!.height).toBeLessThanOrEqual((footerRect?.y ?? 0) + (footerRect?.height ?? 0) + 1);
      }
    }
    await expect(page.locator('.tix-section, .tix-footer')).toHaveCount(0);
    const footerFollowsMain = await page.evaluate(() => {
      const main = document.querySelector('#main-content');
      const footer = document.querySelector('[data-contact-footer]');
      return Boolean(main && footer && (main.compareDocumentPosition(footer) & Node.DOCUMENT_POSITION_FOLLOWING));
    });
    expect(footerFollowsMain).toBe(true);
    const webpResponse = await page.request.get(new URL('/assets/images/contact_boy.webp', page.url()).toString());
    expect(webpResponse.status()).toBe(200);
    expect(webpResponse.headers()['content-type']).toContain('image/webp');
  });

  test('Contact form submits to the contact API', async ({ page }) => {
    await page.route('**/api/contact', async (route) => {
      expect(route.request().method()).toBe('POST');
      expect(route.request().postDataJSON()).toMatchObject({
        name: 'Test Sender',
        email: 'sender@example.com',
        building: 'A new campaign',
      });
      await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ ok: true }) });
    });
    await page.goto('/contact', { waitUntil: 'networkidle' });
    await page.locator('input[name="name"]').fill('Test Sender');
    await page.locator('input[name="email"]').fill('sender@example.com');
    await page.locator('textarea[name="building"]').fill('A new campaign');
    await page.locator('.form-submit').click();
    await expect(page.locator('.form-status')).toHaveText('Message sent. We will be in touch soon.');
  });

  test('Arabic Contact preserves the form and handles a mocked successful submission', async ({ page }) => {
    await page.route('**/api/contact', async (route) => {
      expect(route.request().method()).toBe('POST');
      expect(route.request().postDataJSON()).toMatchObject({
        name: 'مرسل للاختبار',
        email: 'sender@example.com',
        building: 'حملة جديدة',
      });
      await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ ok: true }) });
    });
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/ar/contact', { waitUntil: 'networkidle' });
    await expect(page.locator('html')).toHaveAttribute('lang', 'ar');
    await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');
    await expect(page.locator('#contact-form-heading')).toHaveText('ما الشعور الذي تريد أن يختبره العالم؟');
    await expect(page.locator('.contact-copy__service')).toHaveText('استراتيجية. إنتاج. رقمي. بصري.');
    await expect(page.locator('.contact-copy__body')).toHaveText('أخبرنا بما تعمل عليه، وما تتخيله، وما ينقص علامتك التجارية.');
    const formCard = page.locator('.contact-single-section .contact-form');
    await expect(formCard).toBeVisible();
    await expect(formCard.locator('input[name="name"]')).toBeVisible();
    await expect(formCard.locator('input[name="email"]')).toBeVisible();
    await expect(formCard.locator('textarea[name="building"]')).toBeVisible();
    await formCard.locator('input[name="name"]').fill('مرسل للاختبار');
    await formCard.locator('input[name="email"]').fill('sender@example.com');
    await formCard.locator('textarea[name="building"]').fill('حملة جديدة');
    await formCard.locator('.form-submit').click();
    await expect(formCard.locator('.form-status')).toHaveText('تم إرسال رسالتك. سنتواصل معك قريباً.');
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  });

  test('Studio touchpoint cards remain visible with reduced motion', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/about', { waitUntil: 'networkidle' });
    const cards = page.locator('[data-touchpoints] [data-flight-card]');
    await expect(cards).toHaveCount(4);
    const opacities = await cards.evaluateAll((items) =>
      items.map((item) => Number.parseFloat(getComputedStyle(item).opacity)),
    );
    expect(opacities.every((opacity) => opacity > 0.9)).toBeTruthy();
    await expect(page.locator('[data-touchpoints] .touchpoints__copy h2')).toBeVisible();
  });

  test('Studio Touchpoints do not remain as an empty black scroll section', async ({ page }) => {
    const viewports = [
      { width: 1440, height: 900 },
      { width: 1024, height: 768 },
      { width: 768, height: 1024 },
      { width: 390, height: 844 },
      { width: 375, height: 812 },
    ];
    for (const viewport of viewports) {
      await page.setViewportSize(viewport);
      await page.goto('/about', { waitUntil: 'networkidle' });
      const section = page.locator('[data-touchpoints]');
      const stage = section.locator('.touchpoints__stage');
      await expect(stage).toBeVisible();
      await expect(section.locator('[data-flight-card]')).toHaveCount(4);
      await section.evaluate((element) => {
        const top = element.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({ top: top + element.clientHeight - window.innerHeight, behavior: 'instant' });
      });
      const transition = await stage.evaluate((element) => ({
        clipPath: getComputedStyle(element).clipPath,
        fade: getComputedStyle(element, '::after').backgroundImage,
      }));
      expect(transition.clipPath).toBe('none');
      expect(transition.fade).toContain('linear-gradient');
      await expect.poll(async () => {
        const cards = await section.locator('[data-flight-card]').evaluateAll((items) =>
          items.map((item) => {
            const rect = item.getBoundingClientRect();
            return {
              opacity: Number.parseFloat(getComputedStyle(item).opacity),
              loaded: (item as HTMLImageElement).complete && (item as HTMLImageElement).naturalWidth > 0,
              onScreen: rect.bottom > 0 && rect.top < innerHeight && rect.right > 0 && rect.left < innerWidth,
            };
          }),
        );
        return cards.every((card) => card.opacity > 0.9 && card.loaded && card.onScreen);
      }).toBe(true);
      const stageBox = await stage.boundingBox();
      expect((stageBox?.y ?? 0) + (stageBox?.height ?? 0)).toBeGreaterThan(0);
      await expect(section.locator('.touchpoints__copy h2')).toBeVisible();
    }
  });

});
