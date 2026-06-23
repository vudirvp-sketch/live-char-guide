/**
 * ============================================================================
 * LIVE CHARACTER GUIDE - VS Scroll Observer v1.0.0
 * ============================================================================
 *
 * Global IntersectionObserver for all .scroll-enter elements.
 * Replaces 17 inline <script> blocks from visual-system integration
 * (E01–E17) that each duplicated the same IntersectionObserver pattern.
 *
 * Architecture:
 * - MutationObserver watches for new .scroll-enter elements added to DOM
 *   (handles lazy-loaded content from lazy-loader.js)
 * - IntersectionObserver triggers .is-visible class when element enters viewport
 * - Respects prefers-reduced-motion: all elements immediately visible
 * - Also handles .enneagram-anim and .type-node classes (E10-specific)
 *
 * Load order: must be loaded AFTER widget-utils.js in shell/index.html
 *
 * KI#12 fix (iter 5): migrated inline scripts → shell widget module.
 */

(function() {
  'use strict';

  var SCROLL_ENTER_SELECTOR = '.scroll-enter, .enneagram-anim, .type-node';
  var VISIBLE_CLASS = 'is-visible';

  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function observeElement(el, observer) {
    if (observer) {
      observer.observe(el);
    }
  }

  function makeElementsVisible(el) {
    if (el.classList) {
      // Add is-visible to the element itself if it matches
      var selectors = SCROLL_ENTER_SELECTOR.split(',').map(function(s) { return s.trim(); });
      for (var i = 0; i < selectors.length; i++) {
        if (el.matches(selectors[i])) {
          el.classList.add(VISIBLE_CLASS);
          break;
        }
      }
    }
    // Also check children
    var children = el.querySelectorAll(SCROLL_ENTER_SELECTOR);
    for (var j = 0; j < children.length; j++) {
      children[j].classList.add(VISIBLE_CLASS);
    }
  }

  function setupObserver(el, observer) {
    if (!el.querySelectorAll) return;

    var selectors = SCROLL_ENTER_SELECTOR.split(',').map(function(s) { return s.trim(); });
    for (var i = 0; i < selectors.length; i++) {
      if (el.matches(selectors[i])) {
        observer.observe(el);
      }
    }

    var children = el.querySelectorAll(SCROLL_ENTER_SELECTOR);
    for (var j = 0; j < children.length; j++) {
      observer.observe(children[j]);
    }
  }

  if (prefersReducedMotion) {
    // Reduced motion: make everything visible immediately
    var existing = document.querySelectorAll(SCROLL_ENTER_SELECTOR);
    for (var i = 0; i < existing.length; i++) {
      existing[i].classList.add(VISIBLE_CLASS);
    }

    // Watch for future elements (lazy-loaded content)
    var reducedMo = new MutationObserver(function(mutations) {
      for (var m = 0; m < mutations.length; m++) {
        var added = mutations[m].addedNodes;
        for (var n = 0; n < added.length; n++) {
          if (added[n].nodeType === 1) {
            makeElementsVisible(added[n]);
          }
        }
      }
    });
    reducedMo.observe(document.body || document.documentElement, { childList: true, subtree: true });
    return;
  }

  // Normal mode: IntersectionObserver for scroll-triggered animations
  var scrollObserver = new IntersectionObserver(function(entries) {
    for (var i = 0; i < entries.length; i++) {
      if (entries[i].isIntersecting) {
        entries[i].target.classList.add(VISIBLE_CLASS);
        scrollObserver.unobserve(entries[i].target);
      }
    }
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  // Observe existing elements
  var existingEls = document.querySelectorAll(SCROLL_ENTER_SELECTOR);
  for (var e = 0; e < existingEls.length; e++) {
    scrollObserver.observe(existingEls[e]);
  }

  // Watch for future elements added to DOM (lazy-loaded parts)
  var domMo = new MutationObserver(function(mutations) {
    for (var m = 0; m < mutations.length; m++) {
      var added = mutations[m].addedNodes;
      for (var n = 0; n < added.length; n++) {
        if (added[n].nodeType === 1) {
          setupObserver(added[n], scrollObserver);
        }
      }
    }
  });

  // Wait for body to be available
  function startObserving() {
    domMo.observe(document.body, { childList: true, subtree: true });
  }

  if (document.body) {
    startObserving();
  } else {
    document.addEventListener('DOMContentLoaded', startObserving);
  }
})();
