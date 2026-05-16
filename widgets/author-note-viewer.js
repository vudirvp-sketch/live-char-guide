/**
 * VS Author's Note Viewer — переключатель шаблонов A/B (E16)
 * v1.0.0
 * Поддерживает переключение между Template A (3-section) и Template B (4-section).
 */
(function() {
  'use strict';
  
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
      
      btn.addEventListener('click', () => setTemplate(btn.dataset.template));
      btn.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          setTemplate(btn.dataset.template);
        }
      });
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
  
  window.VsAuthorNoteViewer = { init: initAuthorNoteViewer, initAll };
  document.addEventListener('DOMContentLoaded', initAll);
})();
