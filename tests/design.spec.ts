import { expect, test } from '@playwright/test';
import { routes } from '../src/data/site';

test('every page reflows at 320 and 768 pixels with usable navigation', async ({
  page,
}) => {
  for (const width of [320, 768]) {
    await page.setViewportSize({ width, height: 844 });
    for (const path of routes) {
      await page.goto(path);
      const layout = await page.evaluate(() => {
        const headings = Array.from(
          document.querySelectorAll('main h1, main h2, main h3'),
        );
        const badHeadings = headings.filter((heading) => {
          const rect = heading.getBoundingClientRect();
          return (
            rect.left < 0 ||
            rect.right > innerWidth ||
            heading.scrollWidth > heading.clientWidth
          );
        });
        const nav = Array.from(document.querySelectorAll('header a'));
        return {
          overflow: document.documentElement.scrollWidth > innerWidth,
          clippedHeadings: badHeadings.map((heading) => heading.textContent),
          navigationSizes: nav.map((link) => {
            const { width, height } = link.getBoundingClientRect();
            return { width, height };
          }),
          levels: headings.map((heading) => Number(heading.tagName.slice(1))),
        };
      });
      expect(layout.overflow, `${path} at ${width}px`).toBe(false);
      expect(layout.clippedHeadings, `${path} at ${width}px`).toEqual([]);
      expect(
        layout.navigationSizes.every(
          ({ width, height }) => width >= 44 && height >= 44,
        ),
      ).toBe(true);
      for (let i = 1; i < layout.levels.length; i++) {
        expect(
          layout.levels[i] - layout.levels[i - 1],
          `${path} heading hierarchy`,
        ).toBeLessThanOrEqual(1);
      }
    }
  }
});

for (const chinese of [false, true]) {
  test(`${chinese ? 'Chinese' : 'English'} visible keyboard focus and reduced motion remain available`, async ({
    page,
    browserName,
  }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto(chinese ? '/zh' : '/');
    const tabKey =
      browserName === 'webkit' && process.platform === 'darwin'
        ? 'Alt+Tab'
        : 'Tab';
    await page.keyboard.press(tabKey);
    const skip = page.getByRole('link', {
      name: chinese ? '跳至正文' : 'Skip to content',
    });
    await expect(skip).toBeFocused();
    await expect(skip).toBeInViewport();
    await page.keyboard.press('Enter');
    await expect(page.locator('main')).toBeFocused();
    await page.keyboard.press(tabKey);
    const products = page.getByRole('link', {
      name: chinese ? '了解我们的产品' : 'Meet our products',
    });
    await expect(products).toBeFocused();
    const focus = await products.evaluate((link) => {
      const style = getComputedStyle(link);
      return {
        outline: style.outlineStyle,
        width: parseFloat(style.outlineWidth),
        transition: style.transitionDuration,
      };
    });
    expect(focus.outline).not.toBe('none');
    expect(focus.width).toBeGreaterThanOrEqual(2);
    expect(focus.transition).toBe('0s');
    await page.keyboard.press('Enter');
    await expect(page).toHaveURL(/\/products$/);
  });
}
