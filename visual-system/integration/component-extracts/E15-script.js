/**
 * Element: E15 — Annotated Blueprint
 * Source: elements/E15-annotated-blueprint.html
 * Dependencies: None (vanilla JS)
 * Notes: Element-specific interaction logic. IntersectionObserver handles
 *        scroll-enter animations. Shared mini-map keyboard navigation removed
 *        (will be handled by global shell component).
 */

document.addEventListener('DOMContentLoaded', () => {
      // Переключение слоёв через addEventListener (CSP-совместимо, без inline onclick)
      function setLayer(layerName) {
        document.querySelectorAll('.layer-toggle').forEach(btn => {
          btn.classList.remove('layer-toggle--active');
          btn.setAttribute('aria-selected', 'false');
        });
        const activeBtn = document.querySelector(`.layer-toggle--${layerName}`);
        if (activeBtn) {
          activeBtn.classList.add('layer-toggle--active');
          activeBtn.setAttribute('aria-selected', 'true');
        }

        document.querySelectorAll('.annotation-layer').forEach(layer => {
          layer.classList.remove('annotation-layer--active');
        });
        const activeLayer = document.querySelector(`[data-layer="${layerName}"]`);
        if (activeLayer) {
          activeLayer.classList.add('annotation-layer--active');
        }
      }

      document.querySelectorAll('.layer-toggle[data-layer]').forEach(btn => {
        btn.addEventListener('click', () => setLayer(btn.dataset.layer));
      });

      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) {
        document.querySelectorAll('.scroll-enter').forEach(el => el.classList.add('is-visible'));
        return;
      }
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1 });
      document.querySelectorAll('.scroll-enter').forEach(el => observer.observe(el));
    });
