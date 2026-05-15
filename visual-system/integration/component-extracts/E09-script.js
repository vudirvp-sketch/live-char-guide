/**
 * Element: E09 — OCEAN Pentagon
 * Source: elements/E09-ocean-pentagon.html
 * Dependencies: None (vanilla JS)
 * Notes: Element-specific interaction logic. IntersectionObserver handles
 *        scroll-enter animations. Shared mini-map keyboard navigation removed
 *        (will be handled by global shell component).
 */

document.addEventListener('DOMContentLoaded', () => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) {
        document.querySelectorAll('.pentagon-anim, .profile-anim, .scroll-enter').forEach(el => el.classList.add('is-visible'));
        return;
      }
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.15 });
      document.querySelectorAll('.pentagon-anim, .profile-anim, .scroll-enter').forEach(el => observer.observe(el));
    });
