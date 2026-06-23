/**
 * ============================================================================
 * LIVE CHARACTER GUIDE - VS E10 Enneagram Interaction v1.0.0
 * ============================================================================
 *
 * Enneagram × SPINE Mapping hover/keyboard interaction.
 * Extracted from inline <script> in part_05.html (KI#12 fix, iter 5).
 *
 * Handles:
 * - Hover over .type-node → show mini-card with Enneagram data
 * - Keyboard focus on .type-node → show mini-card
 * - SVG→screen coordinate conversion for card positioning
 *
 * Uses MutationObserver to attach listeners to lazy-loaded content.
 */

(function() {
  'use strict';

  // Enneagram data for mini-cards
  var enneagramData = {
    1: { name: 'Реформатор', fear: 'Быть коррумпированным/злым', desire: 'Быть добрым/целостным', lie: '"Я должен быть идеальным"', flaw: 'Критикует себя и других' },
    2: { name: 'Помощник', fear: 'Быть нелюбимым', desire: 'Чувствовать любовь', lie: '"Я должен заслужить любовь"', flaw: 'Манипулирует через отдачу' },
    3: { name: 'Достигатор', fear: 'Быть ничтожным', desire: 'Чувствовать ценность', lie: '"Я — то, чего я достиг"', flaw: 'Гонится за имиджем, а не за сутью' },
    4: { name: 'Индивидуалист', fear: 'Быть незначительным', desire: 'Быть уникальным', lie: '"Я фундаментально ущербен"', flaw: 'Уходит в себя когда ранен' },
    5: { name: 'Исследователь', fear: 'Быть неспособным', desire: 'Быть компетентным', lie: '"Я должен беречь энергию"', flaw: 'Отстраняется от эмоций' },
    6: { name: 'Лоялист', fear: 'Быть без поддержки', desire: 'Иметь безопасность', lie: '"Мир опасен"', flaw: 'Сомневается в себе, ищет определённость' },
    7: { name: 'Энтузиаст', fear: 'Быть лишённым', desire: 'Быть удовлетворённым', lie: '"Я должен избегать боли"', flaw: 'Убегает в новизну' },
    8: { name: 'Вызывающий', fear: 'Быть подконтрольным', desire: 'Защищать себя', lie: '"Уязвимость — слабость"', flaw: 'Доминирует чтобы чувствовать себя в безопасности' },
    9: { name: 'Миротворец', fear: 'Быть в конфликте', desire: 'Иметь внутреннюю стабильность', lie: '"Мои потребности не важны"', flaw: 'Отключается чтобы избежать напряжения' }
  };

  var initialized = new WeakSet();

  function initEnneagramNodes(root) {
    var nodes = root.querySelectorAll('.type-node');
    for (var i = 0; i < nodes.length; i++) {
      var node = nodes[i];
      if (initialized.has(node)) continue;
      initialized.add(node);

      var typeNum = parseInt(node.dataset.type, 10);
      var data = enneagramData[typeNum];
      if (!data) continue;

      // Hover interaction
      node.addEventListener('mouseenter', function(e) {
        var tn = parseInt(this.dataset.type, 10);
        var d = enneagramData[tn];
        if (!d) return;

        var miniCard = document.getElementById('mini-card');
        var mcType = document.getElementById('mc-type');
        var mcFear = document.getElementById('mc-fear');
        var mcDesire = document.getElementById('mc-desire');
        var mcLie = document.getElementById('mc-lie');
        var mcFlaw = document.getElementById('mc-flaw');
        if (!miniCard) return;

        if (mcType) mcType.textContent = 'Тип ' + tn + ' — ' + d.name;
        if (mcFear) mcFear.textContent = d.fear;
        if (mcDesire) mcDesire.textContent = d.desire;
        if (mcLie) mcLie.textContent = d.lie;
        if (mcFlaw) mcFlaw.textContent = d.flaw;

        // Position near the node using SVG→screen coordinate conversion
        var svgEl = document.querySelector('.enneagram-container svg');
        var circle = this.querySelector('circle');
        if (svgEl && circle) {
          var point = svgEl.createSVGPoint();
          point.x = parseFloat(circle.getAttribute('cx'));
          point.y = parseFloat(circle.getAttribute('cy'));
          var ctm = svgEl.getScreenCTM();
          var screenPoint = point.matrixTransform(ctm);
          var wrapRect = document.getElementById('enneagram-wrap');
          if (wrapRect) {
            var wrapBounds = wrapRect.getBoundingClientRect();
            miniCard.style.left = (screenPoint.x - wrapBounds.left + 30) + 'px';
            miniCard.style.top = (screenPoint.y - wrapBounds.top - 10) + 'px';
          }
        }
        miniCard.classList.add('is-visible');
      });

      node.addEventListener('mouseleave', function() {
        var miniCard = document.getElementById('mini-card');
        if (miniCard) miniCard.classList.remove('is-visible');
      });

      // Keyboard accessibility
      node.setAttribute('tabindex', '0');
      node.setAttribute('role', 'button');
      node.setAttribute('aria-label', 'Тип ' + typeNum + ' — ' + data.name);

      node.addEventListener('focus', function() {
        var tn = parseInt(this.dataset.type, 10);
        var d = enneagramData[tn];
        if (!d) return;

        var miniCard = document.getElementById('mini-card');
        var mcType = document.getElementById('mc-type');
        var mcFear = document.getElementById('mc-fear');
        var mcDesire = document.getElementById('mc-desire');
        var mcLie = document.getElementById('mc-lie');
        var mcFlaw = document.getElementById('mc-flaw');
        if (!miniCard) return;

        if (mcType) mcType.textContent = 'Тип ' + tn + ' — ' + d.name;
        if (mcFear) mcFear.textContent = d.fear;
        if (mcDesire) mcDesire.textContent = d.desire;
        if (mcLie) mcLie.textContent = d.lie;
        if (mcFlaw) mcFlaw.textContent = d.flaw;

        miniCard.style.left = '50%';
        miniCard.style.top = '10px';
        miniCard.classList.add('is-visible');
      });

      node.addEventListener('blur', function() {
        var miniCard = document.getElementById('mini-card');
        if (miniCard) miniCard.classList.remove('is-visible');
      });
    }
  }

  // Initialize existing elements
  function tryInit() {
    if (!document.body) return;
    initEnneagramNodes(document.body);
  }

  // Watch for future elements (lazy-loaded content)
  var mo = new MutationObserver(function(mutations) {
    for (var m = 0; m < mutations.length; m++) {
      var added = mutations[m].addedNodes;
      for (var n = 0; n < added.length; n++) {
        if (added[n].nodeType === 1) {
          initEnneagramNodes(added[n]);
        }
      }
    }
  });

  function startObserving() {
    tryInit();
    mo.observe(document.body, { childList: true, subtree: true });
  }

  if (document.body) {
    startObserving();
  } else {
    document.addEventListener('DOMContentLoaded', startObserving);
  }
})();
