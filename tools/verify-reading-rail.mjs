/**
 * One-shot browser proof for iter-193 (reading rail + dock + 3-theme cycle).
 * Run against the built artifact: node tools/verify-reading-rail.mjs
 * Requires the static server on :3000 (pnpm run serve).
 */
import puppeteer from 'puppeteer';

const URL_BASE = process.env.VERIFY_URL || 'http://localhost:3000/';
const results = [];
const ok = (name) => results.push({ name, pass: true });
const bad = (name, detail) => results.push({ name, pass: false, detail });

const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
try {
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto(URL_BASE, { waitUntil: 'networkidle2', timeout: 60000 });

  // 0. Fresh profile (no stored theme): the default is the soft dark, and the
  //    body carries it in the markup, so the first paint is already #0f1218.
  //    Runs FIRST — the theme-cycle check below starts clicking.
  const bootTheme = await page.evaluate(() => ({
    bodyClass: document.body.className,
    btnTheme: document.getElementById('fab-theme').dataset.theme,
    bg: getComputedStyle(document.body).backgroundColor,
    stored: localStorage.getItem('theme')
  }));
  bootTheme.bodyClass.includes('theme-dark') && bootTheme.btnTheme === 'dark' && bootTheme.bg === 'rgb(15, 18, 24)' && !bootTheme.stored
    ? ok(`default theme is soft dark, first paint ${bootTheme.bg}`)
    : bad('default theme', JSON.stringify(bootTheme));

  // 1. Rail exists and is populated (≥ 60 section links)
  const railLinks = await page.$$eval('#toc-rail [data-rail-target]', (n) => n.length);
  railLinks >= 60 ? ok(`rail built (${railLinks} section links)`) : bad('rail', `${railLinks} links`);

  // 2. Dock owns the FAB buttons; fab-group is empty (iter-194: 5 buttons —
  //    the retired ↔ content-width toggle is gone)
  const dockBtns = await page.$$eval('#tool-dock .fab-btn', (n) => n.length);
  const groupKids = await page.$$eval('#fab-group .fab-btn', (n) => n.length);
  const widthBtn = await page.$$eval('#fab-width', (n) => n.length);
  dockBtns === 5 && groupKids === 0 && widthBtn === 0
    ? ok(`dock holds all 5 buttons (${dockBtns}), no #fab-width`)
    : bad('dock', `dock=${dockBtns}, group=${groupKids}, fab-width=${widthBtn}`);

  // 3. Reading bar hidden on wide screen
  const barHidden = await page.$eval('#reading-bar', (el) => el.hidden);
  barHidden ? ok('reading bar hidden ≥1220px') : bad('reading bar', 'visible on wide screen');

  // 4. Scrollspy: scroll to a deep section → its link gets .on, part expands
  await page.evaluate(() => document.getElementById('p4_spine_overview').scrollIntoView());
  await new Promise((r) => setTimeout(r, 600));
  const spy = await page.evaluate(() => {
    const on = document.querySelector('#toc-rail a.on');
    const li = on && on.closest('.rail-part');
    return { id: on && on.dataset.railTarget, partOpen: li && li.classList.contains('open'), partOn: li && li.classList.contains('on') };
  });
  spy.id === 'p4_spine_overview' && spy.partOpen && spy.partOn
    ? ok(`scrollspy: p4 highlighted, part open (${JSON.stringify(spy)})`)
    : bad('scrollspy', JSON.stringify(spy));

  // 5. Read-dots: sections before current carry .read
  const readCount = await page.$$eval('#toc-rail a.read', (n) => n.length);
  readCount > 0 ? ok(`${readCount} sections marked read`) : bad('read dots', 'none marked');

  // 6. Rail progress % updated
  const pct = await page.$eval('.toc-rail-pct', (el) => el.textContent);
  /%$/.test(pct) && pct !== '0%' ? ok(`rail progress ${pct}`) : bad('rail progress', pct);

  // 7. Theme cycle: from ANY start state, 3 clicks visit all three themes
  //    and the 4th click returns to the start (closed oled→dark→light cycle).
  const startTheme = await page.evaluate(() => document.getElementById('fab-theme').dataset.theme);
  const visited = new Set([startTheme]);
  for (let i = 0; i < 3; i++) {
    await page.click('#fab-theme');
    await new Promise((r) => setTimeout(r, 150));
    const state = await page.evaluate(() => ({
      cls: document.body.className,
      bg: getComputedStyle(document.body).backgroundColor,
      theme: document.getElementById('fab-theme').dataset.theme
    }));
    visited.add(state.theme);
  }
  const backToStart = await page.evaluate(() => document.getElementById('fab-theme').dataset.theme);
  visited.size === 3 && backToStart === startTheme
    ? ok(`theme cycle closed: ${startTheme} → ${[...visited].join(' → ')} → ${backToStart}`)
    : bad('theme cycle', `visited ${[...visited].join(',')}, ended ${backToStart}`);

  // 8. fab-toc toggles the rail on wide screens
  await page.click('#fab-toc');
  await new Promise((r) => setTimeout(r, 200));
  const railHidden = await page.evaluate(() => document.body.classList.contains('rail-hidden'));
  await page.click('#fab-toc');
  await new Promise((r) => setTimeout(r, 200));
  const railBack = await page.evaluate(() => !document.body.classList.contains('rail-hidden'));
  railHidden && railBack ? ok('fab-toc toggles rail visibility (wide)') : bad('fab-toc toggle', `${railHidden}/${railBack}`);

  // 9. Narrow screen: bar appears, rail hides
  await page.setViewport({ width: 900, height: 900 });
  await new Promise((r) => setTimeout(r, 400));
  const narrow = await page.evaluate(() => ({
    bar: !document.getElementById('reading-bar').hidden,
    rail: getComputedStyle(document.getElementById('toc-rail')).display
  }));
  narrow.bar && narrow.rail === 'none' ? ok(`narrow: bar on, rail off (${JSON.stringify(narrow)})`) : bad('narrow', JSON.stringify(narrow));

  // 10. Narrow: ☰ opens the sheet with the full tree
  await page.click('#reading-bar-btn');
  await new Promise((r) => setTimeout(r, 200));
  const sheetOpen = await page.evaluate(() => {
    const bar = document.getElementById('reading-bar');
    const links = document.querySelectorAll('#toc-rail-sheet [data-rail-target]').length;
    return { open: bar.classList.contains('open'), links };
  });
  sheetOpen.open && sheetOpen.links >= 60 ? ok(`sheet opens (${sheetOpen.links} links)`) : bad('sheet', JSON.stringify(sheetOpen));

  // 11. No horizontal scroll at 375px
  await page.setViewport({ width: 375, height: 667 });
  await new Promise((r) => setTimeout(r, 300));
  const hscroll = await page.evaluate(() => document.body.scrollWidth - document.body.clientWidth);
  hscroll <= 10 ? ok(`mobile: no horizontal scroll (+${hscroll}px)`) : bad('mobile hscroll', `+${hscroll}px`);

  // 12. Composition geometry (wide): rail | content | dock, and the whole
  //     composition is CENTRED — equal outer gutters (iter-194; before it hugged
  //     the left edge and left 783px dead on the right at 1920px).
  const geoAt = async (w) => {
    await page.setViewport({ width: w, height: 900 });
    await new Promise((r) => setTimeout(r, 400));
    return page.evaluate(() => {
      const r = document.getElementById('toc-rail').getBoundingClientRect();
      const c = document.getElementById('content').getBoundingClientRect();
      const d = document.getElementById('tool-dock').getBoundingClientRect();
      return {
        vw: window.innerWidth,
        rail: { l: Math.round(r.left), r: Math.round(r.right), w: Math.round(r.width) },
        content: { l: Math.round(c.left), r: Math.round(c.right), w: Math.round(c.width) },
        dock: { l: Math.round(d.left), r: Math.round(d.right), w: Math.round(d.width) },
        hscroll: document.documentElement.scrollWidth - document.documentElement.clientWidth
      };
    });
  };

  for (const w of [1440, 1920]) {
    const g = await geoAt(w);
    const leftGutter = g.rail.l;
    const rightGutter = g.vw - g.dock.r;
    const structure = g.rail.l < g.content.l && g.rail.r <= g.content.l && g.content.r < g.dock.l;
    const centred = Math.abs(leftGutter - rightGutter) <= 4;
    const measure = g.content.w >= 600;
    const noOverflow = g.hscroll <= 1;
    structure && centred && measure && noOverflow
      ? ok(`composition @${w}: rail@${g.rail.l}-${g.rail.r}, content@${g.content.l}-${g.content.r} (${g.content.w}), dock@${g.dock.l}-${g.dock.r}, gutters ${leftGutter}/${rightGutter}`)
      : bad(`composition @${w}`, JSON.stringify({ ...g, leftGutter, rightGutter, structure, centred, measure, noOverflow }));
  }

  // 13. The retired E01–E18 mini-map nav must not be injected any more (iter-194).
  const miniMap = await page.evaluate(() => !!document.querySelector('.vs-mini-map'));
  const miniMapScript = await page.evaluate(() => typeof window.VsMiniMap !== 'undefined');
  !miniMap && !miniMapScript
    ? ok('retired mini-map nav absent (no .vs-mini-map, no window.VsMiniMap)')
    : bad('mini-map', `dom=${miniMap}, global=${miniMapScript}`);
} finally {
  await browser.close();
}

const failed = results.filter((r) => !r.pass);
for (const r of results) console.log(`${r.pass ? 'PASS' : 'FAIL'}: ${r.name}${r.detail ? ` — ${r.detail}` : ''}`);
console.log('');
if (failed.length) { console.log(`FAILED: ${failed.length} check(s)`); process.exit(1); }
console.log('PASSED: reading rail verified in a real browser');
