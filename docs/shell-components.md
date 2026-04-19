# Shell Components — Live Character Guide v6

> **Version:** 1.0
> **Last Updated:** 2026-04-19
> **Status:** Canonical Reference

---

## Purpose

This document defines the **shell components** — UI elements that live outside the main content area and provide navigation, layer switching, glossary access, and other infrastructure features. Shell components are implemented in `src/shell/` and are NOT editable by content authors.

---

## Shell Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│  HEADER                                                         │
│  ├── Logo + Title                                               │
│  ├── Layer Switcher                                             │
│  └── Theme Toggle                                               │
├─────────────────────────────────────────────────────────────────┤
│  MAIN CONTENT AREA (#content)                                   │
│  └── Parts loaded dynamically by lazy-loader.js                 │
├─────────────────────────────────────────────────────────────────┤
│  PANELS (outside #content, survive layer switch)                │
│  ├── TOC Panel (left)                                           │
│  ├── Glossary Panel (right)                                     │
│  └── Notepad Panel (right)                                      │
├─────────────────────────────────────────────────────────────────┤
│  FAB (Floating Action Button)                                   │
│  └── Quick access to panels                                     │
└─────────────────────────────────────────────────────────────────┘
```

---

## 1. Layer Selector Modal

### Purpose
Entry point for selecting reading depth. Shown on first visit (no localStorage).

### HTML Location
`src/shell/index.html` — modal at page load

### Structure
```html
<div id="layer-modal" class="modal">
  <div class="modal-content">
    <h2>Выберите уровень детализации</h2>
    <div class="layer-cards">
      <div class="layer-card" data-layer="1">
        <div class="layer-icon" style="background: #22c55e">L1</div>
        <h3>Минимальный</h3>
        <p>~15 мин, 400-800 токенов карточки</p>
      </div>
      <div class="layer-card" data-layer="2">
        <div class="layer-icon" style="background: #38bdf8">L2</div>
        <h3>Глубокий</h3>
        <p>~30 мин, 800-1500 токенов карточки</p>
      </div>
      <div class="layer-card" data-layer="3">
        <div class="layer-icon" style="background: #8b5cf6">L3</div>
        <h3>Экспертный</h3>
        <p>~60 мин, 1500+ токенов карточки</p>
      </div>
    </div>
    <p class="layer-hint">Не уверены? <a href="#" data-layer="2">Начните с Глубокого</a></p>
  </div>
</div>
```

### CSS Classes
```css
.modal { /* overlay styles */ }
.modal-content { /* centered box */ }
.layer-card { /* clickable card */ }
.layer-card:hover { /* hover effect */ }
.layer-icon { /* colored badge */ }
.layer-hint { /* subtle text */ }
```

### JS Behavior
- Click on `.layer-card` → set localStorage `lcg-layer` → load selected layer
- Click on hint link → set layer to L2
- Modal hidden after selection
- If localStorage exists → skip modal

---

## 2. Layer Switcher (Header)

### Purpose
Switch between layers after initial selection. Located in header.

### HTML Structure
```html
<div class="layer-switcher">
  <button class="layer-btn" data-layer="1">L1</button>
  <button class="layer-btn active" data-layer="2">L2</button>
  <button class="layer-btn" data-layer="3">L3</button>
</div>
```

### CSS Classes
```css
.layer-switcher {
  display: flex;
  gap: 0.5rem;
}

.layer-btn {
  padding: 0.25rem 0.5rem;
  border: 1px solid var(--border);
  background: var(--bg-surface);
  cursor: pointer;
}

.layer-btn.active {
  background: var(--accent);
  color: white;
}
```

### JS Behavior
- Click → call `switchLayer(targetLayer)`
- Updates active state
- Triggers `loadLayerContent()`
- Updates TOC, glossary filter

---

## 3. Theme Toggle

### Purpose
Switch between light/dark/OLED themes.

### HTML Structure
```html
<button id="theme-toggle" class="theme-toggle">
  <span class="theme-icon-dark">🌙</span>
  <span class="theme-icon-light" hidden>☀️</span>
  <span class="theme-icon-oled" hidden>⚫</span>
</button>
```

### CSS Classes
```css
.theme-toggle {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.25rem;
}

body.theme-light .theme-icon-dark { display: none; }
body.theme-light .theme-icon-light { display: inline !important; }
body.theme-oled .theme-icon-dark { display: none; }
body.theme-oled .theme-icon-light { display: none; }
body.theme-oled .theme-icon-oled { display: inline !important; }
```

### JS Behavior
- Click → cycle through themes: light → dark → oled → light
- Set `body.theme-*` class
- Store preference in localStorage `lcg-theme`

---

## 4. TOC Panel

### Purpose
Auto-generated table of contents from current layer's `<h3>` and `<h4>` elements.

### HTML Structure
```html
<aside id="toc-panel" class="panel toc-panel">
  <div class="panel-header">
    <h3>Содержание</h3>
    <button class="panel-close">&times;</button>
  </div>
  <nav class="toc-content">
    <ul>
      <li><a href="#section-id">Section Title</a></li>
      <li>
        <a href="#section-id">Section Title</a>
        <ul class="toc-sub">
          <li><a href="#subsection-id">Subsection</a></li>
        </ul>
      </li>
    </ul>
  </nav>
</aside>
```

### CSS Classes
```css
.toc-panel {
  position: fixed;
  left: 0;
  top: 60px;
  bottom: 0;
  width: 280px;
  background: var(--bg-surface);
  border-right: 1px solid var(--border);
  overflow-y: auto;
  transform: translateX(-100%);
  transition: transform 0.3s ease;
}

.toc-panel.open {
  transform: translateX(0);
}

.toc-sub {
  margin-left: 1rem;
  font-size: 0.9em;
}
```

### JS Behavior
- `generateTOC()` called after every `loadLayerContent()`
- Extracts `<h3>` always, `<h4>` only when parent has `data-toc-level="4"`
- Click → smooth scroll to section
- Draggable and resizable (optional enhancement)

---

## 5. Glossary Panel

### Purpose
Searchable glossary with layer-aware filtering.

### HTML Structure
```html
<aside id="glossary-panel" class="panel glossary-panel">
  <div class="panel-header">
    <h3>Глоссарий</h3>
    <button class="panel-close">&times;</button>
  </div>
  <input type="search" id="glossary-search" placeholder="Поиск...">
  <div class="glossary-content">
    <dl>
      <dt data-term="anchor">
        Якорь (Anchor)
        <span class="layer-badge">📘 L1+</span>
      </dt>
      <dd>Определение термина...</dd>
    </dl>
  </div>
</aside>
```

### CSS Classes
```css
.glossary-panel {
  position: fixed;
  right: 0;
  top: 60px;
  bottom: 0;
  width: 320px;
  background: var(--bg-surface);
  border-left: 1px solid var(--border);
  overflow-y: auto;
  transform: translateX(100%);
  transition: transform 0.3s ease;
}

.glossary-panel.open {
  transform: translateX(0);
}

.layer-badge {
  font-size: 0.75em;
  padding: 0.1rem 0.3rem;
  border-radius: 3px;
  background: var(--bg-secondary);
}
```

### JS Behavior
- `updateGlossaryForLayer(currentLayer)` filters terms by `applicable_layers`
- Shows "Доступно на [Layer] слое" badge for terms not available at current layer
- Search filters by term name
- Data loaded from `data/glossary.json`

---

## 6. Notepad Panel

### Purpose
Global notepad for reader notes, shared across layers.

### HTML Structure
```html
<aside id="notepad-panel" class="panel notepad-panel">
  <div class="panel-header">
    <h3>Заметки</h3>
    <button class="panel-close">&times;</button>
  </div>
  <div class="notepad-content">
    <textarea id="notepad-textarea" placeholder="Ваши заметки..."></textarea>
    <div class="notepad-footer">
      <span class="char-count">0 символов</span>
      <button id="notepad-export">Экспорт .txt</button>
    </div>
    <div class="notepad-anchors">
      <h4>Якоря:</h4>
      <ul id="anchor-list"></ul>
    </div>
  </div>
</aside>
```

### CSS Classes
```css
.notepad-panel {
  position: fixed;
  right: 0;
  top: 60px;
  bottom: 0;
  width: 350px;
  background: var(--bg-surface);
  border-left: 1px solid var(--border);
  overflow-y: auto;
  transform: translateX(100%);
  transition: transform 0.3s ease;
}

#notepad-textarea {
  width: 100%;
  min-height: 200px;
  resize: vertical;
  font-family: inherit;
  padding: 0.5rem;
  border: 1px solid var(--border);
  background: var(--bg-input);
  color: var(--text);
}
```

### JS Behavior
- Single localStorage key: `lcg-notepad-v1`
- Auto-save on input (debounce 250ms)
- Format: `{ "notes": "...", "anchors": ["#spine", "#ocean"] }`
- Click on heading → add anchor to list
- Tab → 2 spaces
- Export as .txt file

---

## 7. FAB (Floating Action Button)

### Purpose
Quick access to panels on mobile/small screens.

### HTML Structure
```html
<div id="fab" class="fab">
  <button class="fab-main">☰</button>
  <div class="fab-menu">
    <button class="fab-item" data-panel="toc">📑 Содержание</button>
    <button class="fab-item" data-panel="glossary">📖 Глоссарий</button>
    <button class="fab-item" data-panel="notepad">📝 Заметки</button>
  </div>
</div>
```

### CSS Classes
```css
.fab {
  position: fixed;
  bottom: 1rem;
  right: 1rem;
  z-index: 1000;
}

.fab-main {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: var(--accent);
  color: white;
  border: none;
  cursor: pointer;
  font-size: 1.5rem;
}

.fab-menu {
  display: none;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.fab.open .fab-menu {
  display: flex;
}

.fab-item {
  padding: 0.5rem 1rem;
  background: var(--bg-surface);
  border: 1px solid var(--border);
  cursor: pointer;
}
```

---

## 8. Loading Indicator

### Purpose
Visual feedback during layer content loading.

### HTML Structure
```html
<div id="loading" class="loading hidden">
  <div class="loading-spinner"></div>
  <span>Загрузка...</span>
</div>
```

### CSS Classes
```css
.loading {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  z-index: 9999;
}

.loading.hidden {
  display: none;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 3px solid var(--border);
  border-top-color: var(--accent);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
```

---

## 9. OCEAN/Enneagram/MBTI Widget Styles

### OCEAN Pentagon
```css
#ocean-embed {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

#ocean-svg {
  max-width: 300px;
}

.ocean-node {
  cursor: pointer;
  transition: transform 0.2s ease;
}

.ocean-node:hover {
  transform: scale(1.1);
}

#ocean-panel {
  background: var(--bg-surface);
  border: 1px solid var(--border);
  padding: 1rem;
  border-radius: 8px;
  max-width: 400px;
}

.ocean-slider-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.ocean-slider-label {
  display: flex;
  justify-content: space-between;
}
```

### Enneagram SVG
```css
#enneagram-embed {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

#enneagram-svg {
  max-width: 400px;
}

.enneagram-node {
  cursor: pointer;
  transition: transform 0.2s ease, fill 0.2s ease;
}

.enneagram-node:hover {
  transform: scale(1.1);
}

.enneagram-node.active {
  fill: var(--accent);
}

#enneagram-panel {
  background: var(--bg-surface);
  border: 1px solid var(--border);
  padding: 1rem;
  border-radius: 8px;
  max-width: 500px;
}
```

### MBTI Filter Grid
```css
#mbti-embed {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.mbti-controls {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
}

.mbti-axis {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.mbti-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.5rem;
}

.mbti-card {
  padding: 1rem;
  border: 1px solid var(--border);
  border-radius: 8px;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s ease;
}

.mbti-card.highlighted {
  border-color: var(--accent);
  background: rgba(56, 189, 248, 0.1);
}

.mbti-card[data-temperament="NT"] { border-left: 3px solid #8b5cf6; }
.mbti-card[data-temperament="NF"] { border-left: 3px solid #ec4899; }
.mbti-card[data-temperament="SJ"] { border-left: 3px solid #3b82f6; }
.mbti-card[data-temperament="SP"] { border-left: 3px solid #f97316; }
```

---

## 10. Animations

### Panel Slide
```css
.panel {
  transition: transform 0.3s ease;
}
```

### Button Hover
```css
.layer-btn:hover,
.fab-item:hover {
  background: var(--bg-hover);
}

.layer-btn:active,
.fab-item:active {
  transform: scale(0.98);
}
```

### Content Fade
```css
#content {
  opacity: 1;
  transition: opacity 0.2s ease;
}

#content.loading {
  opacity: 0.5;
}
```

---

## Panel Lifecycle on Layer Switch

1. User clicks layer button
2. `switchLayer()` called
3. `#content.innerHTML = ''` (full clear)
4. New parts fetched and inserted
5. `initInteractiveElements()` called
6. `generateTOC()` rebuilds TOC
7. `updateGlossaryForLayer()` filters glossary
8. Panels (TOC, Glossary, Notepad) survive — they are outside `#content`

---

## No-JS Fallback

Each layer has a `<section id="glossary" class="no-js-only">` generated by `build-layers.mjs`:

```html
<noscript>
  <section id="glossary" class="no-js-only">
    <h2>Глоссарий</h2>
    <dl>
      <dt>Термин</dt>
      <dd>Определение</dd>
    </dl>
  </section>
</noscript>
```

---

*Document prepared for Live Character Guide v6 rebuild project*
