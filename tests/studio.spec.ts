import { expect, test } from '@playwright/test';

for (const prefix of ['', '/zh']) {
  test(`${prefix || 'English'} studio hero keeps real imagery, conversion and reduced motion`, async ({
    page,
  }) => {
    await page.goto(prefix || '/');
    await expect(page.locator('.hero-showcase img')).toHaveCount(2);
    for (const image of await page.locator('.hero-showcase img').all()) {
      await expect(image).toBeVisible();
      await expect
        .poll(() =>
          image.evaluate((el) => (el as HTMLImageElement).naturalWidth),
        )
        .toBeGreaterThan(0);
    }
    const action = page.locator('.hero .button');
    await action.focus();
    await expect(action).toBeFocused();
    expect(
      await action.evaluate((el) =>
        parseFloat(getComputedStyle(el).outlineWidth),
      ),
    ).toBeGreaterThanOrEqual(2);
    await page.emulateMedia({ reducedMotion: 'reduce' });
    const motion = await page.locator('.hero-showcase').evaluate((el) => ({
      animation: getComputedStyle(el).animationName,
      transition: getComputedStyle(el).transitionDuration,
    }));
    expect(motion.animation).toBe('none');
    expect(motion.transition).toBe('0s');
    expect(
      await page
        .locator('.screen-primary')
        .evaluate((el) => getComputedStyle(el).transform),
    ).toBe('none');
    await page.keyboard.press('Enter');
    await expect(page).toHaveURL(new RegExp(`${prefix}/products$`));
    await expect(page.locator('.matrix-card')).toHaveCount(15);
    await page.locator('.category-links a[href="#family"]').click();
    await expect(page.locator('#family')).toBeInViewport();
  });

  test(`${prefix || 'English'} studio reading text maintains accessible contrast`, async ({
    page,
  }) => {
    for (const route of [
      prefix || '/',
      `${prefix}/products`,
      `${prefix}/support`,
      `${prefix}/products/samejob/privacy`,
    ]) {
      await page.goto(route);
      const failures = await page
        .locator(
          'h1, .hero-bottom p, .card-category, .card-value, .card-description, .availability, .catalog-count, .showcase-heading, .hero-showcase figcaption span, .policy p, .policy h2, header nav a',
        )
        .evaluateAll((elements) => {
          const rgb = (s: string) => (s.match(/[\d.]+/g) || []).map(Number);
          const luminance = (c: number[]) =>
            c
              .slice(0, 3)
              .map((v) => {
                v /= 255;
                return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
              })
              .reduce((sum, v, i) => sum + v * [0.2126, 0.7152, 0.0722][i], 0);
          return elements.flatMap((el) => {
            if (!(el instanceof HTMLElement) || !el.innerText.trim()) return [];
            const s = getComputedStyle(el);
            if (el.querySelector('span') && el.matches('h1')) return [];
            let bg = 'rgb(255, 255, 255)';
            for (
              let node: Element | null = el;
              node;
              node = node.parentElement
            ) {
              const b = getComputedStyle(node).backgroundColor;
              if (b !== 'rgba(0, 0, 0, 0)' && b !== 'transparent') {
                bg = b;
                break;
              }
            }
            const foreground = luminance(rgb(s.color)),
              background = luminance(rgb(bg));
            const contrast =
              (Math.max(foreground, background) + 0.05) /
              (Math.min(foreground, background) + 0.05);
            const large =
              parseFloat(s.fontSize) >= 24 ||
              (parseFloat(s.fontSize) >= 18.66 && Number(s.fontWeight) >= 700);
            return contrast + 0.01 < (large ? 3 : 4.5)
              ? [
                  {
                    text: el.innerText.slice(0, 70),
                    contrast,
                    color: s.color,
                    background: bg,
                  },
                ]
              : [];
          });
        });
      expect(failures, route).toEqual([]);
    }
  });
}
