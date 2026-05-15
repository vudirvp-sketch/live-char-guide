/**
 * Element: E10 — Enneagram × SPINE Mapping
 * Source: elements/E10-enneagram-spine.html
 * Dependencies: None (vanilla JS)
 * Notes: Element-specific interaction logic. IntersectionObserver handles
 *        scroll-enter animations. Shared mini-map keyboard navigation removed
 *        (will be handled by global shell component).
 */

document.addEventListener('DOMContentLoaded', () => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      // Enneagram data for mini-cards
      const enneagramData = {
        1: { name: 'Реформатор', fear: 'Быть коррумпированным/злым', desire: 'Быть добрым/целостным', lie: '"Я должен быть идеальным"', flaw: 'Критикует себя и других' },
        2: { name: 'Помощник', fear: 'Быть нелюбимым', desire: 'Чувствовать любовь', lie: '"Я должен заслужить любовь"', flaw: 'Манипулирует через отдачу' },
        3: { name: 'Достигатор', fear: 'Быть ничтожным', desire: 'Чувствовать ценность', lie: '"Я — то, чего я достиг"', flaw: 'Гонится за имиджем, а не за сутью' },
        4: { name: 'Индивидуалист', fear: 'Быть незначительным', desire: 'Быть уникальным', lie: '"Я фундаментально ущербен"', flaw: 'Уходит в себя когда ранен' },
        5: { name: 'Исследователь', fear: 'Быть неспособным', desire: 'Быть компетентным', lie: '"Я должен беречь энергию"', flaw: 'Отстраняется от эмоций' },
        6: { name: 'Лоялист', fear: 'Быть без поддержки', desire: 'Иметь безопасность', lie: '"Мир опасен"', flaw: 'Сомневается в себе, ищет определённость' },
        7: { name: 'Энтузиаст', fear: 'Быть лишённым', desire: 'Быть удовлетворённым', lie: '"Я должен избегать боли"', flaw: 'Убегает в новизну' },
        8: { name: 'Вызывающий', fear: 'Быть подконтрольным', desire: 'Защищать себя', lie: '"Уязвимость — слабость"', flaw: 'Доминирует чтобы чувствовать себя в безопасности' },
        9: { name: 'Миротворец', fear: 'Быть в конфликте', desire: 'Иметь внутреннюю стабильность', lie: '"Мои потребности не важны"', flaw: 'Отключается чтобы избежать напряжения' },
      };

      const miniCard = document.getElementById('mini-card');
      const mcType = document.getElementById('mc-type');
      const mcFear = document.getElementById('mc-fear');
      const mcDesire = document.getElementById('mc-desire');
      const mcLie = document.getElementById('mc-lie');
      const mcFlaw = document.getElementById('mc-flaw');

      // Hover interaction for type nodes
      document.querySelectorAll('.type-node').forEach(node => {
        const typeNum = parseInt(node.dataset.type);
        const data = enneagramData[typeNum];

        node.addEventListener('mouseenter', (e) => {
          mcType.textContent = `Тип ${typeNum} — ${data.name}`;
          mcFear.textContent = data.fear;
          mcDesire.textContent = data.desire;
          mcLie.textContent = data.lie;
          mcFlaw.textContent = data.flaw;

          // Position near the node using SVG→screen coordinate conversion
          const svgEl = document.querySelector('.enneagram-container svg');
          const circle = node.querySelector('circle');
          const point = svgEl.createSVGPoint();
          point.x = parseFloat(circle.getAttribute('cx'));
          point.y = parseFloat(circle.getAttribute('cy'));
          const ctm = svgEl.getScreenCTM();
          const screenPoint = point.matrixTransform(ctm);
          const wrapRect = document.getElementById('enneagram-wrap').getBoundingClientRect();
          miniCard.style.left = (screenPoint.x - wrapRect.left + 30) + 'px';
          miniCard.style.top = (screenPoint.y - wrapRect.top - 10) + 'px';
          miniCard.classList.add('is-visible');
        });

        node.addEventListener('mouseleave', () => {
          miniCard.classList.remove('is-visible');
        });

        // Keyboard accessibility
        node.setAttribute('tabindex', '0');
        node.setAttribute('role', 'button');
        node.setAttribute('aria-label', `Тип ${typeNum} — ${data.name}`);
        node.addEventListener('focus', (e) => {
          mcType.textContent = `Тип ${typeNum} — ${data.name}`;
          mcFear.textContent = data.fear;
          mcDesire.textContent = data.desire;
          mcLie.textContent = data.lie;
          mcFlaw.textContent = data.flaw;
          miniCard.style.left = '50%';
          miniCard.style.top = '10px';
          miniCard.classList.add('is-visible');
        });
        node.addEventListener('blur', () => {
          miniCard.classList.remove('is-visible');
        });
      });

      if (prefersReducedMotion) {
        document.querySelectorAll('.enneagram-anim, .type-node, .scroll-enter').forEach(el => el.classList.add('is-visible'));
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
      document.querySelectorAll('.enneagram-anim, .type-node, .scroll-enter').forEach(el => observer.observe(el));
    });
