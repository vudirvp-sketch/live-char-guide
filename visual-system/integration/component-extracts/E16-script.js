/**
 * Element: E16 — Author's Note Mechanics
 * Source: elements/E16-author-note.html
 * Dependencies: None (vanilla JS)
 * Notes: Element-specific interaction logic. IntersectionObserver handles
 *        scroll-enter animations. Shared mini-map keyboard navigation removed
 *        (will be handled by global shell component).
 */

document.addEventListener('DOMContentLoaded', () => {
      // Переключение шаблонов через addEventListener (CSP-совместимо, без inline onclick)
      function setTemplate(btn, type) {
        document.querySelectorAll('.template-btn').forEach(b => {
          b.classList.remove('template-btn--active');
          b.setAttribute('aria-selected', 'false');
        });
        btn.classList.add('template-btn--active');
        btn.setAttribute('aria-selected', 'true');

        document.getElementById('template-a').style.display = type === 'a' ? 'block' : 'none';
        document.getElementById('template-b').style.display = type === 'b' ? 'block' : 'none';
      }

      document.querySelectorAll('.template-btn[data-template]').forEach(btn => {
        btn.addEventListener('click', () => setTemplate(btn, btn.dataset.template));
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
