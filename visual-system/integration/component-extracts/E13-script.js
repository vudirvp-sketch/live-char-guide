/**
 * Element: E13 — Diagnostic Decision Tree
 * Source: elements/E13-diagnostic-tree.html
 * Dependencies: None (vanilla JS)
 * Notes: Element-specific interaction logic. IntersectionObserver handles
 *        scroll-enter animations. Shared mini-map keyboard navigation removed
 *        (will be handled by global shell component).
 */

document.addEventListener('DOMContentLoaded', () => {
      // Привязка обработчиков через addEventListener (CSP-совместимо, без inline onclick)
      function toggleTree(el) {
        const subTree = el.nextElementSibling;
        const isOpen = subTree.classList.contains('is-open');
        subTree.classList.toggle('is-open');
        el.setAttribute('aria-expanded', String(!isOpen));
      }

      document.querySelectorAll('[data-toggle="tree"]').forEach(btn => {
        btn.addEventListener('click', () => toggleTree(btn));
        btn.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleTree(btn);
          }
        });
      });

      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) {
        document.querySelectorAll('.scroll-enter').forEach(el => el.classList.add('is-visible'));
        document.querySelectorAll('.sub-tree').forEach(el => el.classList.add('is-open'));
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
