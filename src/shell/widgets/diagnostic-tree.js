/**
 * VS Diagnostic Tree — интерактивное дерево диагностики (E13)
 * v1.1.0
 * Поддерживает сворачивание/разворачивание веток, навигацию с клавиатуры.
 * FIX-22: Added destroy() method.
 */
(function() {
  'use strict';
  
  // Track bound handlers for cleanup
  const _boundHandlers = [];
  
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
      const keydownHandler = (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          expandCollapse();
        }
      };
      toggle.addEventListener('keydown', keydownHandler);
      
      _boundHandlers.push({ element: toggle, type: 'click', handler: expandCollapse });
      _boundHandlers.push({ element: toggle, type: 'keydown', handler: keydownHandler });
    });
  }
  
  // Auto-init all diagnostic trees on the page
  function initAll() {
    document.querySelectorAll('.vs-diagnostic-tree').forEach(initDiagnosticTree);
  }
  
  // FIX-22: destroy() method — remove all event listeners
  function destroy() {
    _boundHandlers.forEach(({ element, type, handler }) => {
      if (element) element.removeEventListener(type, handler);
    });
    _boundHandlers.length = 0;
  }
  
  window.VsDiagnosticTree = { init: initDiagnosticTree, initAll, destroy };

  // FIX-23: Standardized widget initialization — EventBus.whenReady() with 500ms fallback
  function autoInit() {
    initAll();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      (window.EventBus && window.EventBus.whenReady ? window.EventBus.whenReady(autoInit) : setTimeout(autoInit, 500));
    });
  } else {
    (window.EventBus && window.EventBus.whenReady ? window.EventBus.whenReady(autoInit) : setTimeout(autoInit, 500));
  }
})();
