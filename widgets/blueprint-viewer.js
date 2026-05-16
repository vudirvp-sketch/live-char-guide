/**
 * VS Blueprint Viewer — просмотрщик чертежа (E15)
 * v2.0.0
 * FIX-04: Layer toggling removed in v8. All annotation layers are visible
 * simultaneously (unified approach). FIX-20: Removed dead setLayer: null API.
 */
(function() {
  'use strict';
  
  function initBlueprintViewer(container) {
    if (!container) return;
    // v8: All annotation layers are visible simultaneously — no toggling
    const annotations = container.querySelectorAll('[data-annotation-layer]');
    annotations.forEach(anno => {
      anno.classList.add('vs-annotation--visible');
      anno.classList.remove('vs-annotation--hidden');
    });
  }
  
  // Auto-init
  function initAll() {
    document.querySelectorAll('.vs-blueprint-viewer').forEach(initBlueprintViewer);
  }
  
  window.VsBlueprintViewer = { init: initBlueprintViewer, initAll };
  // Note: setLayer was a planned feature never implemented. Removed to prevent TypeError.
  // Layer toggling removed in v8 — all annotation layers are visible simultaneously.
  document.addEventListener('DOMContentLoaded', initAll);
})();
