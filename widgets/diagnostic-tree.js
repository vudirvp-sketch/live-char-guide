/**
 * VS Diagnostic Tree — интерактивное дерево диагностики (E13)
 * v1.0.0
 * Поддерживает сворачивание/разворачивание веток, навигацию с клавиатуры.
 */
(function() {
  'use strict';
  
  function initDiagnosticTree(container) {
    if (!container) return;
    
    const toggles = container.querySelectorAll('[data-toggle="tree"]');
    
    toggles.forEach(toggle => {
      toggle.setAttribute('tabindex', '0');
      toggle.setAttribute('role', 'button');
      toggle.setAttribute('aria-expanded', 'false');
      
      const childList = toggle.nextElementSibling;
      if (childList) {
        childList.classList.add('vs-tree-collapsed');
      }
      
      function expandCollapse() {
        const expanded = toggle.getAttribute('aria-expanded') === 'true';
        toggle.setAttribute('aria-expanded', String(!expanded));
        
        if (childList) {
          childList.classList.toggle('vs-tree-collapsed', expanded);
          childList.classList.toggle('vs-tree-expanded', !expanded);
        }
      }
      
      toggle.addEventListener('click', expandCollapse);
      toggle.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          expandCollapse();
        }
      });
    });
  }
  
  // Auto-init all diagnostic trees on the page
  function initAll() {
    document.querySelectorAll('.vs-diagnostic-tree').forEach(initDiagnosticTree);
  }
  
  window.VsDiagnosticTree = { init: initDiagnosticTree, initAll };
  document.addEventListener('DOMContentLoaded', initAll);
})();
