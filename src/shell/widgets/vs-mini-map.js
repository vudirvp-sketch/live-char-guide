/**
 * VS Mini-Map — глобальная навигация по элементам визуальной системы
 * v1.0.0
 * Заменяет 17 встроенных мини-карт из прототипов.
 * Вставляется один раз в shell и обновляется при навигации.
 */
(function() {
  'use strict';
  
  const SECTIONS = [
    { label: 'Основа', elements: ['E01', 'E02'] },
    { label: 'Механики ядра', elements: ['E03', 'E04', 'E07', 'E08'] },
    { label: 'Личность', elements: ['E05', 'E06', 'E09', 'E10'] },
    { label: 'Продвинутые', elements: ['E11', 'E12', 'E13', 'E14', 'E15', 'E16', 'E17'] }
  ];
  
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
  
  function navigateToElement(elId) {
    // Find the target element section in the current page
    const target = document.querySelector(`[data-vs-element="${elId}"]`);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'center' });
      target.setAttribute('tabindex', '-1');
      target.focus();
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
      content.insertBefore(map, content.firstChild);
    }
  }
  
  // Public API
  window.VsMiniMap = { init, setActive, navigateToElement };
  
  // Auto-init when content loads
  document.addEventListener('DOMContentLoaded', init);
})();
