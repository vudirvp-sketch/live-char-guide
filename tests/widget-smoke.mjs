#!/usr/bin/env node
/**
 * @fileoverview Widget Smoke Test for Live Character Guide v7 (unified)
 * @module tests/widget-smoke
 * @version 2.0.0
 *
 * @description
 * IMP-36: Widget smoke test using Puppeteer.
 * Tests runtime behavior that static validation cannot detect.
 *
 * Migrated from L1/L2/L3 layer system to unified linear guide per Phase 6.7
 * of UNIFIED-GUIDE-MIGRATION-PLAN-v2.md. Removed:
 * - L2 selection via modal (page loads directly, no modal)
 * - Layer switch button tests
 * - data-layer-switch tests
 *
 * Test cases:
 * 1. Click OCEAN node → verify panel displays
 * 2. Move OCEAN slider → verify result display updates
 * 3. Click Enneagram node → verify panel displays
 * 4. Move MBTI slider/radio → verify result display updates
 * 5. TOC generation works after page load
 * 6. Glossary panel opens and displays terms
 * 7. Theme toggle works
 *
 * Usage:
 *   node tests/widget-smoke.mjs
 *   node tests/widget-smoke.mjs --url http://localhost:3000
 */

import puppeteer from 'puppeteer';
import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Configuration
const BASE_URL = process.env.TEST_URL || 'http://localhost:3000';
const TIMEOUT = 10000;

// Test results
let passed = 0;
let failed = 0;
const results = [];

/**
 * Run a single test
 */
async function test(name, fn) {
  try {
    await fn();
    passed++;
    results.push({ name, status: 'PASS' });
    console.log(`  ✓ ${name}`);
  } catch (err) {
    failed++;
    results.push({ name, status: 'FAIL', error: err.message });
    console.log(`  ❌ ${name}`);
    console.log(`     Error: ${err.message}`);
  }
}

/**
 * Wait for element to be visible
 */
async function waitForVisible(page, selector, timeout = TIMEOUT) {
  await page.waitForSelector(selector, { visible: true, timeout });
}

/**
 * Main test suite
 */
async function runTests() {
  console.log('=== IMP-36: Widget Smoke Test (Unified Guide) ===\n');
  console.log(`Base URL: ${BASE_URL}\n`);

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });

  try {
    // Navigate to page
    console.log('Loading page...');
    await page.goto(BASE_URL, { waitUntil: 'networkidle0', timeout: 30000 });

    // No modal to dismiss — unified guide auto-loads content directly
    // Wait for content to render
    await page.waitForTimeout(2000);

    console.log('\nRunning tests...\n');

    // Test 1: OCEAN Pentagon Interaction
    await test('OCEAN: Click node displays panel', async () => {
      const oceanNode = await page.$('.ocean-node, #ocean-svg circle');
      if (!oceanNode) {
        throw new Error('OCEAN node not found');
      }
      await oceanNode.click();
      await page.waitForTimeout(500);

      const panel = await page.$('#ocean-panel, .ocean-panel');
      if (!panel) {
        throw new Error('OCEAN panel not visible after click');
      }
    });

    // Test 2: OCEAN Slider
    await test('OCEAN: Slider updates display', async () => {
      const sliders = await page.$$('input[type="range"].ocean-slider, .ocean-slider-group input[type="range"]');
      if (sliders.length === 0) {
        // Skip if sliders not present in current page
        console.log('     (Skipped - no OCEAN sliders found on this page)');
        return;
      }

      // Move first slider
      const slider = sliders[0];
      await slider.evaluate((el) => {
        el.value = 75;
        el.dispatchEvent(new Event('input', { bubbles: true }));
      });
      await page.waitForTimeout(300);

      // Verify value displayed
      const valueDisplay = await page.$('.ocean-value, .slider-value');
      if (valueDisplay) {
        const text = await valueDisplay.evaluate(el => el.textContent);
        if (!text.includes('75')) {
          throw new Error(`Slider value not reflected in display: ${text}`);
        }
      }
    });

    // Test 3: Enneagram Interaction
    await test('Enneagram: Click node displays panel', async () => {
      const enneaNode = await page.$('.enneagram-node, #enneagram-svg .node');
      if (!enneaNode) {
        throw new Error('Enneagram node not found');
      }
      await enneaNode.click();
      await page.waitForTimeout(500);

      const panel = await page.$('#enneagram-panel, .enneagram-panel');
      if (!panel) {
        throw new Error('Enneagram panel not visible after click');
      }
    });

    // Test 4: MBTI Filter Grid
    await test('MBTI: Axis selection updates grid', async () => {
      const mbtiControls = await page.$('.mbti-controls, .mbti-axis');
      if (!mbtiControls) {
        // Skip if MBTI not present
        console.log('     (Skipped - MBTI widget not found on this page)');
        return;
      }

      // Click an axis button
      const axisBtn = await page.$('.mbti-axis button, .axis-btn');
      if (axisBtn) {
        await axisBtn.click();
        await page.waitForTimeout(300);

        // Verify a card is highlighted
        const highlighted = await page.$('.mbti-card.highlighted, .mbti-card.active');
        if (!highlighted) {
          throw new Error('No MBTI card highlighted after axis selection');
        }
      }
    });

    // Test 5: TOC Panel
    await test('TOC: Panel opens and displays items', async () => {
      // Open TOC panel
      const tocBtn = await page.$('#fab-toc, .toc-toggle, [data-panel="toc"]');
      if (tocBtn) {
        await tocBtn.click();
        await page.waitForTimeout(500);
      }

      const tocPanel = await page.$('#toc-panel, .toc-panel');
      if (!tocPanel) {
        throw new Error('TOC panel not found');
      }

      const tocItems = await page.$$('#toc-content a, .toc-content a');
      if (tocItems.length === 0) {
        throw new Error('TOC panel has no items');
      }
    });

    // Test 6: Glossary Panel
    await test('Glossary: Panel opens and displays terms', async () => {
      // Open glossary panel
      const glossaryBtn = await page.$('#fab-glossary, .glossary-tab, [data-panel="glossary"]');
      if (glossaryBtn) {
        await glossaryBtn.click();
        await page.waitForTimeout(500);
      }

      const glossaryPanel = await page.$('#glossary-panel, .glossary-panel');
      if (!glossaryPanel) {
        throw new Error('Glossary panel not found');
      }

      // Check for terms
      const terms = await page.$$('#glossary-panel dt, .glossary-panel dt');
      if (terms.length === 0) {
        throw new Error('Glossary panel has no terms');
      }
    });

    // Test 7: Theme Toggle
    await test('Theme: Toggle switches between light/dark', async () => {
      const themeBtn = await page.$('#fab-theme, .theme-toggle, [data-action="theme"]');
      if (!themeBtn) {
        throw new Error('Theme toggle button not found');
      }

      // Get initial theme
      const initialTheme = await page.$eval('body', el => el.className.match(/theme-\w+/)?.[0] || 'theme-dark');

      // Click theme toggle
      await themeBtn.click();
      await page.waitForTimeout(300);

      // Verify theme changed
      const newTheme = await page.$eval('body', el => el.className.match(/theme-\w+/)?.[0] || 'theme-dark');

      if (initialTheme === newTheme) {
        throw new Error('Theme did not change after toggle');
      }
    });

    // Test 8: No layer modal or switcher present
    await test('No layer modal or switcher present in DOM', async () => {
      const layerModal = await page.$('#layer-modal, .layer-modal');
      const layerSwitcher = await page.$('#layer-switcher, .layer-switcher');
      const layerSwitchBtn = await page.$('.layer-switch-btn');

      if (layerModal) {
        throw new Error('Layer modal (#layer-modal/.layer-modal) found — should not exist in unified mode');
      }
      if (layerSwitcher) {
        throw new Error('Layer switcher (#layer-switcher/.layer-switcher) found — should not exist in unified mode');
      }
      if (layerSwitchBtn) {
        throw new Error('Layer switch button (.layer-switch-btn) found — should not exist in unified mode');
      }
    });

    // Test 9: Body has data-layer="3" for unified mode
    await test('Body has data-layer="3" (unified mode)', async () => {
      const dataLayer = await page.$eval('body', el => el.getAttribute('data-layer'));
      if (dataLayer !== '3') {
        throw new Error(`Body data-layer is "${dataLayer}" — expected "3" for unified mode`);
      }
    });

  } finally {
    await browser.close();
  }
}

// ============================================================================
// ENTRY POINT
// ============================================================================

runTests()
  .then(() => {
    console.log('\n============================================');
    console.log('WIDGET SMOKE TEST RESULTS');
    console.log('============================================');
    console.log(`Passed: ${passed}`);
    console.log(`Failed: ${failed}`);
    console.log(`Total:  ${passed + failed}`);
    console.log('============================================');

    if (failed > 0) {
      console.log('\nFailed tests:');
      for (const r of results.filter(r => r.status === 'FAIL')) {
        console.log(`  - ${r.name}: ${r.error}`);
      }
      process.exit(1);
    }

    process.exit(0);
  })
  .catch(err => {
    console.error('❌ Test suite failed:', err.message);
    console.error(err);
    process.exit(1);
  });
