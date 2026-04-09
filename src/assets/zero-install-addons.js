// === ZERO-INSTALL ADDITIONS ===
// This code is only included in the zero-install (offline) version
// Provides diagnostics and storage indicators for file:// protocol usage

// Storage mode indicator
(function() {
  function updateStorageIndicator() {
    var mode = window.__lc_store && window.__lc_store.getMode ? window.__lc_store.getMode() : 'unknown';
    var indicators = document.querySelectorAll('[data-storage-indicator]');
    indicators.forEach(function(el) {
      el.textContent = mode === 'persistent' ? '💾' : '🧠';
      el.title = mode === 'persistent'
        ? 'Данные сохранены постоянно'
        : 'Данные сохранятся до закрытия вкладки';
      el.setAttribute('aria-label', el.title);
    });
  }

  // Update on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', updateStorageIndicator);
  } else {
    updateStorageIndicator();
  }
})();

// Diagnostic panel (Ctrl+Shift+V)
(function() {
  var diagnosticMode = false;
  document.addEventListener('keydown', function(e) {
    if (e.ctrlKey && e.shiftKey && e.key === 'V') {
      e.preventDefault();
      showDiagnosticPanel();
    }
  });

  function showDiagnosticPanel() {
    var existingPanel = document.getElementById('lc-diagnostic-panel');
    if (existingPanel) {
      existingPanel.remove();
      return;
    }

    var panel = document.createElement('div');
    panel.id = 'lc-diagnostic-panel';
    panel.style.cssText = 'position:fixed;top:10px;right:10px;background:#1a1a2e;color:#eee;padding:1rem;border-radius:8px;font-family:monospace;font-size:12px;z-index:10000;max-width:300px;box-shadow:0 4px 20px rgba(0,0,0,0.5);';
    panel.setAttribute('role', 'status');
    panel.setAttribute('aria-live', 'polite');

    var checks = [
      { name: 'Хранилище', pass: !!(window.__lc_store), detail: window.__lc_store && window.__lc_store.getMode ? window.__lc_store.getMode() : 'N/A' },
      { name: 'OCEAN виджет', pass: !!document.querySelector('#ocean-svg svg') },
      { name: 'MBTI виджет', pass: !!document.querySelector('#mbti-types-grid svg') },
      { name: 'Блокнот', pass: !!document.querySelector('#notepad-panel') },
      { name: 'Тема', pass: !!document.querySelector('#fab-theme') },
      { name: 'Протокол', pass: location.protocol === 'file:', detail: location.protocol }
    ];

    var allPass = checks.every(function(c) { return c.pass; });

    var html = '<strong>🔍 Диагностика Live Char</strong><br><br>';
    checks.forEach(function(c) {
      html += (c.pass ? '✅' : '⚠️') + ' ' + c.name + ': ' + (c.detail || (c.pass ? 'OK' : 'FAIL')) + '<br>';
    });
    html += '<br><strong>' + (allPass ? '✓ Все системы в норме' : '⚠ Обнаружены проблемы') + '</strong><br>';
    html += '<small>Нажмите вне панели или Esc для закрытия</small>';

    panel.innerHTML = html;
    document.body.appendChild(panel);

    var close = function() { panel.remove(); };
    panel.addEventListener('click', function(e) { e.stopPropagation(); });
    document.addEventListener('click', close, { once: true });
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') close();
    }, { once: true });
  }
})();

// Global error handler
window.addEventListener('error', function(e) {
  console.error('[LiveChar] Runtime error:', e.message);
});
window.addEventListener('unhandledrejection', function(e) {
  console.warn('[LiveChar] Unhandled promise:', e.reason);
});
