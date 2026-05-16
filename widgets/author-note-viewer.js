/**
 * VS Author's Note Viewer — переключатель шаблонов A/B (E16)
 * v1.1.0
 * Поддерживает переключение между Template A (3-section) и Template B (4-section).
 * FIX-22: Added destroy() method.
 */
(function() {
  'use strict';
  
  // Track bound handlers for cleanup
  const _boundHandlers = [];
  
  function initAuthorNoteViewer(container) {
    if (!container) return;
    
    const templateBtns = container.querySelectorAll('[data-template]');
    const templates = container.querySelectorAll('[data-template-content]');
    
    // Default: Template A
    setTemplate('a');
    
    templateBtns.forEach(btn => {
      btn.setAttribute('tabindex', '0');
      btn.setAttribute('role', 'tab');
      btn.setAttribute('aria-selected', btn.dataset.template === 'a' ? 'true' : 'false');
      
      function clickHandler() { setTemplate(btn.dataset.template); }
      function keydownHandler(e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          setTemplate(btn.dataset.template);
        }
      }
      
      btn.addEventListener('click', clickHandler);
      btn.addEventListener('keydown', keydownHandler);
      
      _boundHandlers.push({ element: btn, type: 'click', handler: clickHandler });
      _boundHandlers.push({ element: btn, type: 'keydown', handler: keydownHandler });
    });
    
    function setTemplate(templateId) {
      // Update buttons
      templateBtns.forEach(btn => {
        const isActive = btn.dataset.template === templateId;
        btn.classList.toggle('vs-template-btn--active', isActive);
        btn.setAttribute('aria-selected', String(isActive));
      });
      
      // Update template content
      templates.forEach(tmpl => {
        const show = tmpl.dataset.templateContent === templateId;
        tmpl.classList.toggle('vs-template--visible', show);
        tmpl.classList.toggle('vs-template--hidden', !show);
        
        // Announce change for screen readers
        if (show) {
          tmpl.removeAttribute('aria-hidden');
        } else {
          tmpl.setAttribute('aria-hidden', 'true');
        }
      });
    }
  }
  
  // Auto-init
  function initAll() {
    document.querySelectorAll('.vs-author-note-viewer').forEach(initAuthorNoteViewer);
  }
  
  // FIX-22: destroy() method — remove all event listeners
  function destroy() {
    _boundHandlers.forEach(({ element, type, handler }) => {
      if (element) element.removeEventListener(type, handler);
    });
    _boundHandlers.length = 0;
  }
  
  window.VsAuthorNoteViewer = { init: initAuthorNoteViewer, initAll, destroy };

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
