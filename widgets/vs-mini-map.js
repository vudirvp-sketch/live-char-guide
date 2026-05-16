/**
 * VS Mini-Map — глобальная навигация по элементам визуальной системы
 * v1.1.0
 * Заменяет 17 встроенных мини-карт из прототипов.
 * Вставляется один раз в shell и обновляется при навигации.
 * FIX-22: Added destroy() method. FIX-31: Remove tabindex after blur.
 */
(function() {
  'use strict';
  
  const SECTIONS = [
    { label: 'Основа', elements: ['E01', 'E02'] },
    { label: 'Механики ядра', elements: ['E03', 'E04', 'E07', 'E08'] },
    { label: 'Личность', elements: ['E05', 'E06', 'E09', 'E10'] },
    { label: 'Продвинутые', elements: ['E11', 'E12', 'E13', 'E14', 'E15', 'E16', 'E17'] }
  ];

  // Stored click handlers for cleanup
  let _navElement = null;
  
  function createMiniMap() {
    const nav = document.createElement('nav');
    nav.className = 'vs-mini-map';
    nav.setAttribute('role', 'navigation');
    nav.setAttribute('aria-label', 'Навигация по элементам визуальной системы');
    
    SECTIONS.forEach(section => {
      const sectionDiv = document.createElement('div');
      sectionDiv.className = 'vs-mini-map__section';
      
      const label = document.createElement('span');
      label.className = 'vs-mini-map__section-label';
      label.textContent = section.label;
      sectionDiv.appendChild(label);
      
      section.elements.forEach(elId => {
        const span = document.createElement('span');
        span.className = 'vs-mini-map__el';
        span.setAttribute('tabindex', '0');
        span.setAttribute('role', 'link');
        span.setAttribute('aria-label', elId);
        span.textContent = elId;
        span.dataset.element = elId;
        
        span.addEventListener('click', () => navigateToElement(elId));
        span.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            navigateToElement(elId);
          }
        });
        
        sectionDiv.appendChild(span);
      });
      
      nav.appendChild(sectionDiv);
    });
    
    return nav;
  }
  
  // FIX-31: Remove tabindex="-1" after blur to avoid polluting DOM
  function navigateToElement(elId) {
    const target = document.querySelector(`[data-vs-element="${elId}"]`);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'center' });
      target.setAttribute('tabindex', '-1');
      target.focus();
      // Remove tabindex after blur to avoid polluting DOM
      target.addEventListener('blur', function handler() {
        target.removeAttribute('tabindex');
        target.removeEventListener('blur', handler);
      });
    }
  }
  
  function setActive(elId) {
    document.querySelectorAll('.vs-mini-map__el').forEach(el => {
      el.classList.remove('vs-mini-map__el--active');
      el.removeAttribute('aria-current');
    });
    const active = document.querySelector(`.vs-mini-map__el[data-element="${elId}"]`);
    if (active) {
      active.classList.add('vs-mini-map__el--active');
      active.setAttribute('aria-current', 'true');
    }
  }
  
  // Initialize when DOM is ready
  function init() {
    const existing = document.querySelector('.vs-mini-map');
    if (existing) existing.remove();
    
    const content = document.getElementById('content');
    if (content) {
      const map = createMiniMap();
      _navElement = map;
      content.insertBefore(map, content.firstChild);
    }
  }
  
  // FIX-22: destroy() method for cleanup
  function destroy() {
    if (_navElement && _navElement.parentNode) {
      _navElement.parentNode.removeChild(_navElement);
    }
    _navElement = null;
  }
  
  // Public API
  window.VsMiniMap = { init, setActive, navigateToElement, destroy };
  
  // Auto-init when content loads
  document.addEventListener('DOMContentLoaded', init);
})();
