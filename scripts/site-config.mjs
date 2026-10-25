#!/usr/bin/env node
/**
 * Site-level SEO configuration — the single place the public origin is defined.
 *
 * WHY THIS FILE EXISTS: the head metadata, the sitemap and the `qa:seo` gate all
 * need the absolute site URL. Hard-coding it three times means a future move
 * (project site → `vudirvp-sketch.github.io` root site) silently leaves stale
 * canonicals behind. One import, one edit.
 *
 * NOT a data-widget file: `data/*.json` belongs to the runtime widgets.
 */

export const SITE = {
  /** Absolute URL of the deployed site, WITH trailing slash. */
  url: 'https://vudirvp-sketch.github.io/live-char-guide/',
  name: 'Live Character Guide',
  language: 'ru',
  locale: 'ru_RU',
  author: 'TITAN FUSE Team',
  /** Social card, 1200×630 (see docs/PROMOTION_PLAN.md §3 A4). */
  socialImage: 'assets/preview-card-1200x630.png',
};

/** Resolve a site-relative path to an absolute URL. */
export function absoluteUrl(path = '') {
  return new URL(path.replace(/^\/+/, ''), SITE.url).href;
}

/** Replace {{SITE_URL}} / {{SITE_ORIGIN}} tokens in a document. */
export function substituteSiteTokens(text) {
  return text
    .replaceAll('{{SITE_URL}}', SITE.url)
    .replaceAll('{{SITE_ORIGIN}}', new URL(SITE.url).origin);
}
