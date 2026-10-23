/**
 * ============================================================================
 * LIVE CHARACTER GUIDE - VS E16 Author's Note Template Toggle v1.0.0
 * ============================================================================
 *
 * Author's Note Mechanics template switching interaction.
 * Extracted from inline <script> in part_07a.html (KI#12 fix, iter 5).
 *
 * Handles:
 * - Click on .template-btn[data-template] → switch active template display
 * - ARIA selected state management
 * - CSP-compliant: no inline onclick handlers
 *
 * Uses MutationObserver to attach listeners to lazy-loaded content.
 */

(function() {
  'use strict';

  var initialized = new WeakSet();

  function setTemplate(btn, type) {
    // Deactivate all template buttons
    var buttons = document.querySelectorAll('.template-btn');
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].classList.remove('template-btn--active');
      buttons[i].setAttribute('aria-selected', 'false');
    }

    // Activate the clicked button
    btn.classList.add('template-btn--active');
    btn.setAttribute('aria-selected', 'true');

    // Toggle template visibility
    var templateA = document.getElementById('template-a');
    var templateB = document.getElementById('template-b');
    if (templateA) templateA.style.display = type === 'a' ? 'block' : 'none';
    if (templateB) templateB.style.display = type === 'b' ? 'block' : 'none';
  }

  function initAuthorNote(root) {
    var buttons = root.querySelectorAll('.template-btn[data-template]');
    for (var i = 0; i < buttons.length; i++) {
      var btn = buttons[i];
      if (initialized.has(btn)) continue;
      initialized.add(btn);

      btn.addEventListener('click', function() {
        setTemplate(this, this.dataset.template);
      });

      // Set ARIA role
      btn.setAttribute('role', 'tab');
      btn.setAttribute('aria-selected', 'false');
    }

    // Also handle elements that match the selector themselves
    if (root.matches && root.matches('.template-btn[data-template]') && !initialized.has(root)) {
      initialized.add(root);
      root.addEventListener('click', function() {
        setTemplate(this, this.dataset.template);
      });
      root.setAttribute('role', 'tab');
      root.setAttribute('aria-selected', 'false');
    }
  }

  function tryInit() {
    if (!document.body) return;
    initAuthorNote(document.body);
  }

  // Watch for future elements (lazy-loaded content)
  var mo = new MutationObserver(function(mutations) {
    for (var m = 0; m < mutations.length; m++) {
      var added = mutations[m].addedNodes;
      for (var n = 0; n < added.length; n++) {
        if (added[n].nodeType === 1) {
          initAuthorNote(added[n]);
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
