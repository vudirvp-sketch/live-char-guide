# Visual Component Registry — Live Character Guide v6

> **Version:** 1.0
> **Last Updated:** 2026-04-19
> **Status:** Canonical Reference

---

## Purpose

This document defines the **complete set of CSS classes and HTML structures** available for use in master HTML files. Authors MUST use only components from this registry. Creating new CSS classes requires infrastructure approval.

---

## Component Categories

1. **Callouts** — Highlighted information blocks
2. **Tags** — Inline badges
3. **Infographics** — Visual pipelines and diagrams
4. **Tables** — Responsive table wrappers
5. **Collapsible** — Interactive details blocks
6. **Cards** — Specialized card components
7. **Code** — Code blocks with copy button

---

## 1. CALLOUT — Highlighted Information Block

### Available Variants

| Class | Purpose | Visual |
|-------|---------|--------|
| `.callout` | Base callout (gray) | Gray left border |
| `.callout.warn` | Warning/anti-pattern | Red/orange accent |
| `.callout.tip` | Recommendation | Green accent |
| `.callout.important` | Important note | Blue/cyan accent |

### HTML Structure

```html
<div class="callout warn">
  <p><strong>⚠️ Warning:</strong> Description here.</p>
  <p>Additional details.</p>
</div>

<div class="callout tip">
  <p><strong>💡 Tip:</strong> Description here.</p>
</div>

<div class="callout important">
  <p><strong>📌 Important:</strong> Description here.</p>
</div>
```

### CSS Specification

```css
.callout {
  padding: 1rem;
  margin: 1rem 0;
  border-left: 4px solid var(--text-muted);
  background: rgba(128, 128, 128, 0.05);
}

.callout.warn {
  border-left-color: #ef4444;
  background: rgba(239, 68, 68, 0.1);
}

.callout.tip {
  border-left-color: #22c55e;
  background: rgba(34, 197, 94, 0.1);
}

.callout.important {
  border-left-color: #38bdf8;
  background: rgba(56, 189, 248, 0.1);
}
```

### BUG-3 Fix Note
`.callout.important` was used in v5.12 HTML but not defined in CSS. v6 adds this definition.

---

## 2. TAG — Inline Badge

### Available Variants

| Class | Purpose | Visual |
|-------|---------|--------|
| `.tag` | Base tag | Small rounded badge |
| `.tag.tip` | Recommended | Green background |
| `.tag.opt` | Optional | Blue background |
| `.tag.risk` | Risky/Warning | Orange background |
| `.tag.advanced` | Advanced | Purple background |
| `.tag.core` | Core/Required | Dark background |

### HTML Structure

```html
<span class="tag tip">✓ Tier 1</span>
<span class="tag opt">⚠ Optional</span>
<span class="tag risk">⚠ Risk</span>
<span class="tag advanced">🔬 L3</span>
<span class="tag core">Required</span>
```

### CSS Specification

```css
.tag {
  display: inline-block;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  font-size: 0.85em;
  font-weight: 500;
}

.tag.tip { background: rgba(34, 197, 94, 0.2); color: #22c55e; }
.tag.opt { background: rgba(59, 130, 246, 0.2); color: #3b82f6; }
.tag.risk { background: rgba(249, 115, 22, 0.2); color: #f97316; }
.tag.advanced { background: rgba(139, 92, 246, 0.2); color: #8b5cf6; }
.tag.core { background: rgba(100, 100, 100, 0.2); color: #888; }
```

### BUG-6 Fix Note
`.tag.warn` was used in v5.12 but not defined. v6 replaces `.tag.warn` with `.tag.risk` (closest semantic match).

---

## 3. INFOGRAPHIC — Visual Pipeline

### Available Variants

| Class | Purpose |
|-------|---------|
| `.infographic` | Container for visual diagrams |
| `.inf-pipeline` | Horizontal step pipeline |
| `.inf-pipeline-step` | Individual step in pipeline |
| `.inf-step-id` | Step number |
| `.inf-step-label` | Step label |
| `.inf-step-desc` | Step description |
| `.inf-step-code` | Code example |

### HTML Structure

```html
<div class="infographic">
  <div class="infographic-title">Format Title</div>
  <div class="inf-pipeline">
    <div class="inf-pipeline-step">
      <div class="inf-step-id">01</div>
      <div class="inf-step-label">TRIGGER</div>
      <div class="inf-step-desc">External stimulus</div>
      <div class="inf-step-code">Someone lies</div>
    </div>
    <div class="inf-pipeline-step">
      <div class="inf-step-id">02</div>
      <div class="inf-step-label">ACTION</div>
      <div class="inf-step-desc">Observable reaction</div>
      <div class="inf-step-code">Jaw clenches</div>
    </div>
    <div class="inf-pipeline-step">
      <div class="inf-step-id">03</div>
      <div class="inf-step-label">PRICE</div>
      <div class="inf-step-desc">Physical reaction</div>
      <div class="inf-step-code">Hands shake</div>
    </div>
  </div>
</div>
```

### Vertical Pipeline Variant

| Class | Purpose |
|-------|---------|
| `.inf-pipeline-vertical` | Vertical step pipeline (mobile-friendly) |

### HTML Structure

```html
<div class="infographic">
  <div class="infographic-title">Vertical Pipeline Title</div>
  <div class="inf-pipeline-vertical">
    <div class="inf-pipeline-step">
      <div class="inf-step-id">01</div>
      <div class="inf-step-label">STEP ONE</div>
      <div class="inf-step-desc">Description here</div>
      <div class="inf-step-code">Code example</div>
    </div>
    <!-- More steps -->
  </div>
</div>
```

---

## 4. TABLE — Responsive Table Wrapper

### HTML Structure

```html
<div class="table-wrap">
  <table>
    <thead>
      <tr>
        <th>Column 1</th>
        <th>Column 2</th>
        <th>Column 3</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Data 1</td>
        <td>Data 2</td>
        <td>Data 3</td>
      </tr>
    </tbody>
  </table>
</div>
```

### CSS Specification

```css
.table-wrap {
  overflow-x: auto;
  margin: 1rem 0;
}

.table-wrap table {
  width: 100%;
  border-collapse: collapse;
}

.table-wrap th,
.table-wrap td {
  padding: 0.75rem;
  text-align: left;
  border-bottom: 1px solid var(--border);
}

.table-wrap th {
  font-weight: 600;
  background: var(--bg-secondary);
}
```

---

## 5. COLLAPSIBLE — Interactive Details Block

### HTML Structure

```html
<details class="interactive" aria-labelledby="summary-id">
  <summary id="summary-id">🎯 Click to expand</summary>
  
  <p>Hidden content here.</p>
  
</details>
```

### Criteria for Use

Use collapsible blocks when:
- Content is supplementary (not required for main flow)
- Content is long (>200 words)
- Content is technical reference
- Content is optional advanced material

**Do NOT use for:**
- Core concepts (should always be visible)
- Short content (<100 words)
- Required reading

### CSS Specification

```css
details.interactive {
  margin: 1rem 0;
  padding: 1rem;
  border: 1px solid var(--border);
  border-radius: 8px;
}

details.interactive summary {
  cursor: pointer;
  font-weight: 500;
  list-style: none;
}

details.interactive summary::-webkit-details-marker {
  display: none;
}

details.interactive[open] summary {
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid var(--border);
}
```

---

## 6. CARDS — Specialized Card Components

### Antipattern Card

**BUG-5 Fix:** `.antipattern-card` was used in v5.12 but not styled. v6 adds complete styling.

```html
<div class="antipattern-card">
  <div class="problem-block">
    <h4>❌ Problem</h4>
    <p>Description of the problem.</p>
  </div>
  <div class="solution-block">
    <h4>✅ Solution</h4>
    <p>Description of the solution.</p>
  </div>
  <div class="example-block">
    <h4>📝 Example</h4>
    <pre><code>Example code here</code></pre>
  </div>
</div>
```

### CSS Specification

```css
.antipattern-card {
  margin: 1.5rem 0;
  padding: 1rem;
  border: 1px solid var(--border);
  border-radius: 8px;
  background: var(--bg-secondary);
}

.antipattern-card .problem-block {
  padding: 0.75rem;
  margin-bottom: 0.75rem;
  border-left: 3px solid #ef4444;
  background: rgba(239, 68, 68, 0.05);
}

.antipattern-card .solution-block {
  padding: 0.75rem;
  margin-bottom: 0.75rem;
  border-left: 3px solid #22c55e;
  background: rgba(34, 197, 94, 0.05);
}

.antipattern-card .example-block {
  padding: 0.75rem;
  border-left: 3px solid #3b82f6;
  background: rgba(59, 130, 246, 0.05);
}
```

---

## 7. CODE — Code Blocks with Copy Button

### HTML Structure

```html
<pre><code>Your code here
Multiple lines supported</code></pre>
```

### Automatic Copy Button

Copy buttons are **automatically added** by `lazy-loader.js` to all `<pre>` blocks. No additional markup required.

---

## 8. CROSS-LAYER LINKS

### Layer Remark (data-layer-switch)

```html
<p class="layer-remark">
  <span class="remark-icon">→</span>
  Подробнее о SPINE → <a href="javascript:void(0)" data-layer-switch="2#p4_spine_overview">Слой 2</a>
</p>
```

### CSS Specification

```css
.layer-remark {
  margin: 1rem 0;
  padding: 0.75rem;
  background: var(--bg-secondary);
  border-radius: 4px;
  font-size: 0.95em;
}

.remark-icon {
  color: var(--accent);
  margin-right: 0.5rem;
}
```

---

## 9. DIFF VIEW — Before→After Comparison

### Available Variants

| Class | Purpose | Visual |
|-------|---------|--------|
| `.diff-view` | Grid container for before/after | Two-column grid |
| `.diff-card` | Individual card in diff view | Bordered card |
| `.diff-del` | "Before" (removed) card | Red border and background |
| `.diff-add` | "After" (added) card | Green border and background |
| `.diff-label` | Label inside diff card | Uppercase, colored |

### HTML Structure

```html
<div class="diff-view">
  <div class="diff-card diff-del">
    <div class="diff-label">До (ошибка)</div>
    <p>Content showing the problem...</p>
  </div>
  <div class="diff-card diff-add">
    <div class="diff-label">После (исправлено)</div>
    <p>Content showing the solution...</p>
  </div>
</div>
```

### CSS Specification

```css
.diff-view { display: grid; grid-template-columns: 1fr 1fr; gap: 1em; }
.diff-card { padding: 1em; border: 1px solid var(--border); border-radius: 8px; }
.diff-del { border-color: rgba(239,68,68,0.4); background: rgba(239,68,68,0.05); }
.diff-add { border-color: rgba(34,197,94,0.4); background: rgba(34,197,94,0.05); }
```

---

## 10. SPINE STACK — Layered SPINE Diagram

### Available Variants

| Class | Purpose |
|-------|---------|
| `.spine-stack` | Vertical stack container |
| `.spine-stack-item` | Individual SPINE element row |
| `.spine-stack-label` | Element name (GHOST/LIE/FLAW/NEED/WANT) |
| `.spine-stack-desc` | Element description |

### HTML Structure

```html
<div class="spine-stack">
  <div class="spine-stack-item"><span class="spine-stack-label">GHOST</span><span class="spine-stack-desc">Событие прошлого → формирует LIE</span></div>
  <div class="spine-stack-item"><span class="spine-stack-label">LIE</span><span class="spine-stack-desc">Ложная установка → порождает FLAW</span></div>
  <div class="spine-stack-item"><span class="spine-stack-label">FLAW</span><span class="spine-stack-desc">Конкретное поведение → блокирует NEED</span></div>
  <div class="spine-stack-item"><span class="spine-stack-label">NEED</span><span class="spine-stack-desc">Истинная потребность → конфликтует с WANT</span></div>
  <div class="spine-stack-item"><span class="spine-stack-label">WANT</span><span class="spine-stack-desc">Осознанное желание → поверхность</span></div>
</div>
```

---

## Prohibited Patterns

### DO NOT Use

| Prohibited | Reason | Alternative |
|------------|--------|-------------|
| `.callout.info` | Not defined | Use `.callout.important` |
| `.tag.warn` | Not defined | Use `.tag.risk` |
| Inline `<style>` | All styles in CSS file | Use registry classes |
| Custom CSS classes | Not in registry | Request infrastructure approval |

### BUG-4 Fix Note
`.callout.info` used in v5.12 L3/09 is replaced with `.callout.important` during migration.

---

## Component Request Process

If you need a new CSS class:

1. Check this registry — class may already exist under different name
2. Document the need in PHASE_REPORT
3. Wait for infrastructure approval
4. Class added to registry before use

---

*Document prepared for Live Character Guide v6 rebuild project*
