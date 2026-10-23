/**
 * ============================================================================
 * LIVE CHARACTER GUIDE - VS E10 Enneagram Interaction v1.1.0
 * ============================================================================
 *
 * Enneagram × SPINE Mapping hover/keyboard interaction.
 * Extracted from inline <script> in part_05.html (KI#12 fix, iter 5).
 *
 * Handles:
 * - Hover over .type-node → show mini-card with Enneagram data
 * - Keyboard focus on .type-node → show mini-card
 * - SVG→screen coordinate conversion for card positioning
 * - Right-edge clamp: the mini-card never overflows .enneagram-container
 *
 * Data (KI#76 fix, iter 124): reads the canonical `data/enneagram.json`
 * via WidgetUtils.fetchJson (fence #8: never hardcode widget data in JS) —
 * the same source enneagram-builder.js consumes. The previous hardcoded
 * enneagramData copy had already drifted from the JSON (names/wording).
 *
 * Uses MutationObserver to attach listeners to lazy-loaded content.
 */

(function() {
  'use strict';

  // Resolved data map: { typeNum: { name, fear, desire, lie, flaw } }
  var dataCache = null;

  var initialized = new WeakSet();

  function loadData() {
    if (dataCache) return Promise.resolve(dataCache);
    // WidgetUtils.fetchJson caches successful fetches; a failed fetch is NOT
    // cached (returns null), so the next hover/focus retries the load.
    return window.WidgetUtils.fetchJson('data/enneagram.json').then(function(json) {
      if (!json || !json.types) return null;
      var map = {};
      for (var i = 0; i < json.types.length; i++) {
        var t = json.types[i];
        map[t.id] = {
          name: t.name,
          fear: t.core_fear,
          desire: t.core_desire,
          lie: t.lie_template,
          flaw: t.flaw_pattern
        };
      }
      dataCache = map;
      return map;
    });
  }

  function applyAriaLabels(root, map) {
    var nodes = root.querySelectorAll('.type-node');
    for (var i = 0; i < nodes.length; i++) {
      var typeNum = parseInt(nodes[i].dataset.type, 10);
      var d = map[typeNum];
      if (d) {
        nodes[i].setAttribute('aria-label', 'Тип ' + typeNum + ' — ' + d.name);
      }
    }
  }

  function fillMiniCard(tn, d) {
    var miniCard = document.getElementById('mini-card');
    var mcType = document.getElementById('mc-type');
    var mcFear = document.getElementById('mc-fear');
    var mcDesire = document.getElementById('mc-desire');
    var mcLie = document.getElementById('mc-lie');
    var mcFlaw = document.getElementById('mc-flaw');
    if (!miniCard) return null;

    if (mcType) mcType.textContent = 'Тип ' + tn + ' — ' + d.name;
    if (mcFear) mcFear.textContent = d.fear;
    if (mcDesire) mcDesire.textContent = d.desire;
    if (mcLie) mcLie.textContent = d.lie;
    if (mcFlaw) mcFlaw.textContent = d.flaw;
    return miniCard;
  }

  function initEnneagramNodes(root) {
    var nodes = root.querySelectorAll('.type-node');
    for (var i = 0; i < nodes.length; i++) {
      var node = nodes[i];
      if (initialized.has(node)) continue;
      initialized.add(node);

      var typeNum = parseInt(node.dataset.type, 10);

      // Keyboard accessibility label (canonical names from data/enneagram.json
      // once loaded; plain type number until then, refined on data arrival)
      node.setAttribute('tabindex', '0');
      node.setAttribute('role', 'button');
      node.setAttribute('aria-label', 'Тип ' + typeNum);
      if (dataCache) applyAriaLabels(node.parentNode || root, dataCache);

      // Hover interaction
      node.addEventListener('mouseenter', function() {
        var self = this;
        var tn = parseInt(self.dataset.type, 10);
        loadData().then(function(map) {
          if (!map) return;
          var d = map[tn];
          if (!d) return;

          var miniCard = fillMiniCard(tn, d);
          if (!miniCard) return;
          self.setAttribute('aria-label', 'Тип ' + tn + ' — ' + d.name);

          // Position near the node using SVG→screen coordinate conversion.
          // Right-edge clamp: the card never overflows .enneagram-container
          // (prototype E10-enneagram-spine.html parity — was missing in
          // production, KI#76).
          var svgEl = document.querySelector('.enneagram-container svg');
          var circle = self.querySelector('circle');
          if (svgEl && circle) {
            var point = svgEl.createSVGPoint();
            point.x = parseFloat(circle.getAttribute('cx'));
            point.y = parseFloat(circle.getAttribute('cy'));
            var ctm = svgEl.getScreenCTM();
            if (ctm) {
              var screenPoint = point.matrixTransform(ctm);
              var wrapRect = document.getElementById('enneagram-wrap');
              if (wrapRect) {
                var wrapBounds = wrapRect.getBoundingClientRect();
                if (wrapBounds.width > 0 && wrapBounds.height > 0) {
                  var cardWidth = 220;
                  var maxLeft = wrapBounds.width - cardWidth - 10;
                  var rawLeft = screenPoint.x - wrapBounds.left + 30;
                  miniCard.style.left = Math.min(rawLeft, maxLeft) + 'px';
                  miniCard.style.top = (screenPoint.y - wrapBounds.top - 10) + 'px';
                }
              }
            }
          }
          miniCard.classList.add('is-visible');
        });
      });

      node.addEventListener('mouseleave', function() {
        var miniCard = document.getElementById('mini-card');
        if (miniCard) miniCard.classList.remove('is-visible');
      });

      node.addEventListener('focus', function() {
        var self = this;
        var tn = parseInt(self.dataset.type, 10);
        loadData().then(function(map) {
          if (!map) return;
          var d = map[tn];
          if (!d) return;

          var miniCard = fillMiniCard(tn, d);
          if (!miniCard) return;
          self.setAttribute('aria-label', 'Тип ' + tn + ' — ' + d.name);

          miniCard.style.left = '50%';
          miniCard.style.top = '10px';
          miniCard.classList.add('is-visible');
        });
      });

      node.addEventListener('blur', function() {
        var miniCard = document.getElementById('mini-card');
        if (miniCard) miniCard.classList.remove('is-visible');
      });
    }
  }

  // Initialize existing elements
  function tryInit() {
    if (!document.body) return;
    initEnneagramNodes(document.body);
    // Prefetch canonical data so mini-card interactions are instant and
    // aria-labels carry canonical type names.
    loadData().then(function(map) {
      if (map && document.body) applyAriaLabels(document.body, map);
    });
  }

  // Watch for future elements (lazy-loaded content)
  var mo = new MutationObserver(function(mutations) {
    for (var m = 0; m < mutations.length; m++) {
      var added = mutations[m].addedNodes;
      for (var n = 0; n < added.length; n++) {
        if (added[n].nodeType === 1) {
          initEnneagramNodes(added[n]);
        }
      }
    }
  });

  function startObserving() {
    tryInit();
    mo.observe(document.body, { childList: true, subtree: true });
  }

  if (document.body) {
    startObserving();
  } else {
    document.addEventListener('DOMContentLoaded', startObserving);
  }
})();
