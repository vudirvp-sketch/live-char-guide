/**
 * VS Blueprint Viewer — просмотрщик чертежа (E15)
 * v2.1.0
 * FIX-04: Layer toggling removed in v8. All annotation layers are visible
 * simultaneously (unified approach). FIX-20: Removed dead setLayer: null API.
 * FIX-22: Added destroy() method for proper cleanup.
 */
(function() {
  'use strict';

  // Track initialized containers for cleanup
  const _initializedContainers = new Set();
  let _domContentLoadedHandler = null;

  function initBlueprintViewer(container) {
    if (!container) return;
    _initializedContainers.add(container);
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

  /**
   * FIX-22: Destroy method — cleans up event listeners and DOM references.
   * Removes all containers from tracking and disconnects the DOMContentLoaded listener.
   */
  function destroy() {
    // Remove DOMContentLoaded listener
    if (_domContentLoadedHandler) {
      document.removeEventListener('DOMContentLoaded', _domContentLoadedHandler);
      _domContentLoadedHandler = null;
    }
    // Clear tracking set
    _initializedContainers.clear();
  }

  _domContentLoadedHandler = initAll;

  window.VsBlueprintViewer = { init: initBlueprintViewer, initAll, destroy };
  // Note: setLayer was a planned feature never implemented. Removed to prevent TypeError.
  // Layer toggling removed in v8 — all annotation layers are visible simultaneously.
  document.addEventListener('DOMContentLoaded', _domContentLoadedHandler);
})();
