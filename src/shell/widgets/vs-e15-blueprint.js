/**
 * ============================================================================
 * LIVE CHARACTER GUIDE - VS E15 Blueprint Layer Toggle v1.0.0
 * ============================================================================
 *
 * Annotated Blueprint layer switching interaction.
 * Extracted from inline <script> in part_10.html (KI#12 fix, iter 5).
 *
 * Handles:
 * - Click on .layer-toggle[data-layer] → switch active annotation layer
 * - ARIA selected state management
 * - CSP-compliant: no inline onclick handlers
 *
 * Uses MutationObserver to attach listeners to lazy-loaded content.
 */

(function() {
  'use strict';

  var initialized = new WeakSet();

  function setLayer(layerName) {
    // Deactivate all toggle buttons
    var buttons = document.querySelectorAll('.layer-toggle');
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].classList.remove('layer-toggle--active');
      buttons[i].setAttribute('aria-selected', 'false');
    }

    // Activate the selected button
    var activeBtn = document.querySelector('.layer-toggle--' + layerName);
    if (activeBtn) {
      activeBtn.classList.add('layer-toggle--active');
      activeBtn.setAttribute('aria-selected', 'true');
    }

    // Deactivate all annotation layers
    var layers = document.querySelectorAll('.annotation-layer');
    for (var j = 0; j < layers.length; j++) {
      layers[j].classList.remove('annotation-layer--active');
    }

    // Activate the selected layer
    var activeLayer = document.querySelector('[data-layer="' + layerName + '"]');
    if (activeLayer) {
      activeLayer.classList.add('annotation-layer--active');
    }
  }

  function initBlueprint(root) {
    var buttons = root.querySelectorAll('.layer-toggle[data-layer]');
    for (var i = 0; i < buttons.length; i++) {
      var btn = buttons[i];
      if (initialized.has(btn)) continue;
      initialized.add(btn);

      btn.addEventListener('click', function() {
        setLayer(this.dataset.layer);
      });

      // Set ARIA role
      btn.setAttribute('role', 'tab');
      btn.setAttribute('aria-selected', 'false');
    }

    // Also handle elements that match the selector themselves
    if (root.matches && root.matches('.layer-toggle[data-layer]') && !initialized.has(root)) {
      initialized.add(root);
      root.addEventListener('click', function() {
        setLayer(this.dataset.layer);
      });
      root.setAttribute('role', 'tab');
      root.setAttribute('aria-selected', 'false');
    }
  }

  function tryInit() {
    if (!document.body) return;
    initBlueprint(document.body);
  }

  // Watch for future elements (lazy-loaded content)
  var mo = new MutationObserver(function(mutations) {
    for (var m = 0; m < mutations.length; m++) {
      var added = mutations[m].addedNodes;
      for (var n = 0; n < added.length; n++) {
        if (added[n].nodeType === 1) {
          initBlueprint(added[n]);
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
