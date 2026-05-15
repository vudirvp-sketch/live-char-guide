/**
 * Element: E01 — Card Anatomy
 * Source: elements/E01-card-anatomy.html
 * Dependencies: None (vanilla JS)
 * Notes: Element-specific interaction logic. IntersectionObserver handles
 *        scroll-enter animations. Shared mini-map keyboard navigation removed
 *        (will be handled by global shell component).
 */

// Scroll-triggered animations via IntersectionObserver
    document.addEventListener('DOMContentLoaded', () => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (prefersReducedMotion) {
        document.querySelectorAll('.scroll-enter').forEach(el => {
          el.classList.add('is-visible');
        });
        return;
      }

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

      document.querySelectorAll('.scroll-enter').forEach(el => {
        observer.observe(el);
      });
    });
