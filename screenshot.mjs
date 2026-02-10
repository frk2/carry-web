import { chromium } from 'playwright';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

(async () => {
    const browser = await chromium.launch();
    const context = await browser.newContext({
        viewport: { width: 1440, height: 900 },
    });
    const page = await context.newPage();

    // Use HTTP server for proper font loading
    await page.goto('http://localhost:8765/index.html', { waitUntil: 'networkidle' });

    // Wait for fonts to load
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(1500);

    // Trigger all reveals to be visible for screenshot
    await page.evaluate(() => {
        document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
        // Trigger stat counters manually
        document.querySelectorAll('.stat__number[data-count]').forEach((el, i) => {
            const target = parseInt(el.getAttribute('data-count'), 10);
            el.textContent = target.toLocaleString();
        });
    });

    await page.waitForTimeout(500);

    // Full page screenshot
    await page.screenshot({
        path: resolve(__dirname, 'screenshots/full-page.png'),
        fullPage: true,
    });

    // Hero section
    await page.screenshot({
        path: resolve(__dirname, 'screenshots/hero.png'),
        clip: { x: 0, y: 0, width: 1440, height: 900 },
    });

    // Stats section
    const statsBox = await page.locator('.stats').boundingBox();
    if (statsBox) {
        await page.screenshot({
            path: resolve(__dirname, 'screenshots/stats.png'),
            clip: { x: 0, y: statsBox.y - 10, width: 1440, height: statsBox.height + 20 },
        });
    }

    // Scroll to features and screenshot
    await page.evaluate(() => {
        document.getElementById('features')?.scrollIntoView();
    });
    await page.waitForTimeout(500);
    await page.screenshot({
        path: resolve(__dirname, 'screenshots/features.png'),
    });

    // Scroll to gallery
    await page.evaluate(() => {
        document.getElementById('gallery')?.scrollIntoView();
    });
    await page.waitForTimeout(500);
    await page.screenshot({
        path: resolve(__dirname, 'screenshots/gallery.png'),
    });

    // Scroll to specs
    await page.evaluate(() => {
        document.getElementById('specs')?.scrollIntoView();
    });
    await page.waitForTimeout(500);
    await page.screenshot({
        path: resolve(__dirname, 'screenshots/specs.png'),
    });

    // Scroll to FAQ
    await page.evaluate(() => {
        document.getElementById('faq')?.scrollIntoView();
    });
    await page.waitForTimeout(500);
    await page.screenshot({
        path: resolve(__dirname, 'screenshots/faq.png'),
    });

    // Scroll to origin
    const originSection = page.locator('.origin');
    await originSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    await page.screenshot({
        path: resolve(__dirname, 'screenshots/origin.png'),
    });

    // Scroll to reserve
    await page.evaluate(() => {
        document.getElementById('reserve')?.scrollIntoView();
    });
    await page.waitForTimeout(500);
    await page.screenshot({
        path: resolve(__dirname, 'screenshots/reserve.png'),
    });

    // Mobile viewport
    const mobilePage = await context.newPage();
    await mobilePage.setViewportSize({ width: 390, height: 844 });
    await mobilePage.goto('http://localhost:8765/index.html', { waitUntil: 'networkidle' });
    await mobilePage.evaluate(() => document.fonts.ready);
    await mobilePage.waitForTimeout(1500);
    await mobilePage.evaluate(() => {
        document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
        document.querySelectorAll('.stat__number[data-count]').forEach((el) => {
            el.textContent = parseInt(el.getAttribute('data-count'), 10).toLocaleString();
        });
    });
    await mobilePage.waitForTimeout(500);
    await mobilePage.screenshot({
        path: resolve(__dirname, 'screenshots/mobile-hero.png'),
        clip: { x: 0, y: 0, width: 390, height: 844 },
    });
    await mobilePage.screenshot({
        path: resolve(__dirname, 'screenshots/mobile-full.png'),
        fullPage: true,
    });

    await browser.close();
    console.log('Screenshots saved to ./screenshots/');
})();
