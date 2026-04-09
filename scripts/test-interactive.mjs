#!/usr/bin/env node
/**
 * Interactive Tests for Live Char Guide
 * Puppeteer-based smoke tests for critical functionality
 */

import puppeteer from 'puppeteer';
import { readFile } from 'fs/promises';

const BASE_URL = process.env.TEST_URL || 'http://localhost:3000';
const TIMEOUT = 30000;

// Test cases
const TESTS = [
  {
    name: 'Build hash matches meta tag',
    async run(page) {
      const hashFile = await readFile('build.hash', 'utf-8');
      const buildHash = hashFile.trim();
      
      const metaHash = await page.$eval(
        'meta[name="build-hash"]',
        el => el.getAttribute('content')
      );
      
      if (metaHash !== buildHash) {
        throw new Error(`Hash mismatch: meta=${metaHash}, file=${buildHash}`);
      }
    }
  },
  {
    name: 'Theme toggle persists',
    async run(page) {
      // Toggle to light theme
      await page.click('#fab-theme');
      await page.waitForTimeout(100);
      
      const isLight = await page.$eval('body', el => el.classList.contains('theme-light'));
      if (!isLight) throw new Error('Light theme not applied');
      
      // Reload
      await page.reload();
      await page.waitForSelector('body');
      
      const stillLight = await page.$eval('body', el => el.classList.contains('theme-light'));
      if (!stillLight) throw new Error('Theme did not persist after reload');
    }
  },
  {
    name: 'Anchor #spine scrolls into view',
    async run(page) {
      await page.goto(`${BASE_URL}/#spine`);
      await page.waitForTimeout(500);
      
      const spineVisible = await page.$eval('#spine', el => {
        const rect = el.getBoundingClientRect();
        return rect.top >= 0 && rect.top < window.innerHeight;
      });
      
      if (!spineVisible) throw new Error('#spine not visible after navigation');
    }
  },
  {
    name: 'TOC panel opens and closes',
    async run(page) {
      // Open TOC
      await page.click('#fab-toc');
      await page.waitForTimeout(200);
      
      const isOpen = await page.$eval('#toc-panel', el => el.classList.contains('open'));
      if (!isOpen) throw new Error('TOC panel did not open');
      
      // Close TOC
      await page.click('#toc-panel .panel-btn[data-action="close"]');
      await page.waitForTimeout(200);
      
      const isClosed = await page.$eval('#toc-panel', el => !el.classList.contains('open'));
      if (!isClosed) throw new Error('TOC panel did not close');
    }
  },
  {
    name: 'First Tab target is interactive',
    async run(page) {
      await page.keyboard.press('Tab');
      await page.waitForTimeout(100);
      
      const focused = await page.$eval(':focus', el => el.tagName);
      const interactive = ['BUTTON', 'A', 'INPUT', 'SELECT', 'TEXTAREA'];
      
      if (!interactive.includes(focused)) {
        throw new Error(`First Tab target is ${focused}, expected interactive element`);
      }
    }
  },
  {
    name: 'Mobile viewport (375px): no horizontal scroll',
    async run(page) {
      await page.setViewport({ width: 375, height: 667 });
      await page.waitForTimeout(200);
      
      const scrollWidth = await page.$eval('body', el => el.scrollWidth);
      const clientWidth = await page.$eval('body', el => el.clientWidth);
      
      if (scrollWidth > clientWidth + 10) {
        throw new Error(`Horizontal scroll detected: ${scrollWidth}px > ${clientWidth}px`);
      }
    }
  }
];

// Main test runner
async function runTests() {
  console.log('============================================');
  console.log('Live Char Guide Interactive Tests');
  console.log('============================================\n');
  
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  let passed = 0;
  let failed = 0;
  
  for (const test of TESTS) {
    const page = await browser.newPage();
    
    try {
      await page.goto(BASE_URL, { waitUntil: 'networkidle0', timeout: TIMEOUT });
      await test.run(page);
      
      console.log(`✓ ${test.name}`);
      passed++;
    } catch (err) {
      console.log(`✗ ${test.name}`);
      console.log(`  Error: ${err.message}`);
      failed++;
    } finally {
      await page.close();
    }
  }
  
  await browser.close();
  
  console.log('\n============================================');
  console.log(`Results: ${passed} passed, ${failed} failed`);
  console.log('============================================');
  
  process.exit(failed > 0 ? 1 : 0);
}

runTests().catch(err => {
  console.error('Test runner failed:', err);
  process.exit(1);
});
