/**
 * ============================================================================
 * LIVE CHARACTER GUIDE - VS E13 Diagnostic Tree Interaction v1.0.0
 * ============================================================================
 *
 * Diagnostic Decision Tree expand/collapse interaction.
 * Extracted from inline <script> in part_09.html (KI#12 fix, iter 5).
 *
 * Handles:
 * - Click on [data-toggle="tree"] → toggle .sub-tree visibility
 * - Keyboard Enter/Space → toggle
 * - ARIA expanded state management
 *
 * Uses MutationObserver to attach listeners to lazy-loaded content.
 */

(function() {
  'use strict';

  var initialized = new WeakSet();

  function toggleTree(btn) {
    var subTree = btn.nextElementSibling;
    if (!subTree) return;
    var isOpen = subTree.classList.contains('is-open');
    subTree.classList.toggle('is-open');
    btn.setAttribute('aria-expanded', String(!isOpen));
  }

  function initDiagnosticTree(root) {
    var buttons = root.querySelectorAll('[data-toggle="tree"]');
    for (var i = 0; i < buttons.length; i++) {
      var btn = buttons[i];
      if (initialized.has(btn)) continue;
      initialized.add(btn);

      btn.addEventListener('click', function() {
        toggleTree(this);
      });

      btn.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          toggleTree(this);
        }
      });

      // Set initial ARIA attribute
      btn.setAttribute('aria-expanded', 'false');
    }

    // Reduced motion: expand all sub-trees
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      var subTrees = root.querySelectorAll('.sub-tree');
      for (var j = 0; j < subTrees.length; j++) {
        subTrees[j].classList.add('is-open');
      }
    }
  }

  function tryInit() {
    if (!document.body) return;
    initDiagnosticTree(document.body);
  }

  // Watch for future elements (lazy-loaded content)
  var mo = new MutationObserver(function(mutations) {
    for (var m = 0; m < mutations.length; m++) {
      var added = mutations[m].addedNodes;
      for (var n = 0; n < added.length; n++) {
        if (added[n].nodeType === 1) {
          initDiagnosticTree(added[n]);
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
