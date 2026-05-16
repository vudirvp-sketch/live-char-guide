/**
 * VS Blueprint Viewer — просмотрщик чертежа с переключением слоёв (E15)
 * v1.0.0
 * Поддерживает 4 слоя аннотаций: Structure, Anchors, SPINE, Directives.
 */
(function() {
  'use strict';
  
  const LAYERS = ['structure', 'anchors', 'spine', 'directives'];
  
  function initBlueprintViewer(container) {
    if (!container) return;
    
    const layerBtns = container.querySelectorAll('[data-layer]');
    const annotations = container.querySelectorAll('[data-annotation-layer]');
    
    // Default: structure layer active
    setLayer('structure');
    
    layerBtns.forEach(btn => {
      btn.setAttribute('tabindex', '0');
      btn.setAttribute('role', 'tab');
      btn.setAttribute('aria-selected', btn.dataset.layer === 'structure' ? 'true' : 'false');
      
      btn.addEventListener('click', () => setLayer(btn.dataset.layer));
      btn.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          setLayer(btn.dataset.layer);
        }
      });
    });
    
    function setLayer(layerName) {
      // Update buttons
      layerBtns.forEach(btn => {
        const isActive = btn.dataset.layer === layerName;
        btn.classList.toggle('vs-layer-btn--active', isActive);
        btn.setAttribute('aria-selected', String(isActive));
      });
      
      // Update annotations
      annotations.forEach(anno => {
        const annoLayer = anno.dataset.annotationLayer;
        anno.classList.toggle('vs-annotation--visible', annoLayer === layerName);
        anno.classList.toggle('vs-annotation--hidden', annoLayer !== layerName);
      });
    }
  }
  
  // Auto-init
  function initAll() {
    document.querySelectorAll('.vs-blueprint-viewer').forEach(initBlueprintViewer);
  }
  
  window.VsBlueprintViewer = { init: initBlueprintViewer, initAll, setLayer: null };
  document.addEventListener('DOMContentLoaded', initAll);
})();
