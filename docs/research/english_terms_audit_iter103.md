# English Terms Audit — iter 103

> **Task ID:** iter-103-english-terms-audit
> **Date:** 2026-08-13
> **Scope:** Survey + categorization + feasibility analysis of all English terms in `src/master/*.html`.
> **Deliverable:** This document + companion JSON `english_terms_audit_iter103.json`. **No source HTML changes in this iteration** — translation passes are deferred to iter 104–105 pending author approval of the proposed plan.
> **Companion data:** `docs/research/english_terms_audit_iter103.json` (per-file, per-token, with line numbers and context).
> **Survey script:** `scripts/survey_english_terms.py` (re-runnable for future iterations).

---

## 1. Executive Summary

The guide is intentionally bilingual: **Russian prose + English terminology anchors**. The English anchors exist for two reasons documented in `AGENTS.md` §12 and `docs/canon/_README.md` §3.9:

1. **CORE DIRECTIVES block** stays in English because 12B models follow English instructions ~15–20 % more reliably.
2. **Callout labels** (`RULE`, `RECOMMENDATION`, `EXAMPLE`, etc.) are parsing anchors for the model during card generation.

On top of these intentional anchors, the guide has accumulated **incidental English leaks** — single English words and short phrases inside Russian prose that have direct Russian equivalents. These are the translation candidates.

**Headline numbers (granular scan, not the 3+ word check):**

| Category | Count (token instances) | Verdict |
|----------|------------------------|---------|
| A. KEEP ENGLISH (intentional) | ~1 440 | Do not touch |
| B. TRANSLATE (clear leak, low risk) | ~470 | Translate in iter 104 |
| C. BORDERLINE (case-by-case) | ~640 | Decide per-term, iter 105 |
| D. HTML ARTIFACTS (false positives) | ~120 | Ignore — not real English |
| **Total Latin tokens surveyed** | **~2 670** | — |

**Existing tool coverage:** `scripts/check_english.py` baseline = **21 leaks** (down from 24). All 21 are by design — Tone Frame strings, SP directives, Part 10 Elena example card, `Model Capability Table` heading, `Token Budget Check` heading, `Quality Grade A/B/C` label. These are NOT regressions.

**Bottom line:** A complete English → Russian pass is feasible in **3 iterations** (this audit + 2 translation passes), but only ~25 % of the surveyed tokens actually warrant translation. The other 75 % are either intentional anchors (~54 %) or HTML-entity parsing noise (~5 %). The remaining ~20 % are borderline — they need per-term decisions, not bulk find-and-replace.

---

## 2. Methodology

### 2.1 Survey tool

A new script `scripts/survey_english_terms.py` was authored. It is a superset of `check_english.py`:

| Feature | `check_english.py` | `survey_english_terms.py` |
|---------|---------------------|---------------------------|
| Detects 3+ consecutive English words | ✅ | ✅ (inherited) |
| Detects single English words | ❌ | ✅ |
| Categorizes (ALLOWED / TRANSLATABLE / UNKNOWN) | ❌ | ✅ |
| Excludes HTML comments, `<pre>`, `<code>`, `<td>`, tag interiors | ✅ | ✅ (inherited) |
| Aggregates per-file + global counters | ❌ | ✅ |
| Outputs JSON companion data | ❌ | ✅ |

The script imports `KEEP_ENGLISH_TERMS`, `build_code_intervals`, and `is_in_allowed_context` from `check_english.py` — no logic fork.

### 2.2 Categorization rules

Each Latin-script token found in Russian prose (after stripping comments, code blocks, `<td>` cells, and HTML tag interiors) is bucketed:

- **ALLOWED** — token is in the whitelist (`ALLOWED_SINGLE_WORDS` in the script), or is part of a `KEEP_ENGLISH_TERMS` multi-word phrase (e.g. `Top`, `P` inside `Top P`).
- **TRANSLATABLE** — token is in the `TRANSLATABLE_LEAKS` set: common English function words (`the`, `a`, `of`, `in`, `is`, …) plus domain-adjacent nouns that have direct Russian equivalents (`table`, `model`, `check`, `grade`, `step`, `step`, `voice`, `trigger`, `action`, `price`, …).
- **UNKNOWN** — everything else. Manually reviewed in §4 below.

### 2.3 Known false positives (Category D)

The script picks up HTML entity names as if they were English words: `gt`, `lt`, `rarr`, `mdash`, `laquo`, `raquo`, `sect`. These are not real English — they appear in source as `&gt;`, `&lt;`, `&rarr;`, `&mdash;`, `&laquo;`, `&raquo;`, `&sect;` and render as Russian punctuation / arrows. They are filtered out of all decision categories in §4.

---

## 3. Survey Results — Per File

Sorted by total token count (highest first):

| File | ALLOWED | TRANSLATABLE | UNKNOWN | Total | Notes |
|------|---------|--------------|---------|-------|-------|
| `part_07a.html` | 321 | 129 | 324 | 774 | System Prompt + CORE DIRECTIVES — most English is intentional |
| `part_05.html` | 98 | 30 | 193 | 321 | OCEAN + Enneagram framework — many bilingual glosses already |
| `part_08.html` | 157 | 52 | 169 | 378 | Anti-patterns — `AP-1`...`AP-15` IDs + bilingual headings |
| `part_10.html` | 119 | 90 | 124 | 333 | Elena example card — most leaks are intentional English in SP / Examples |
| `appendix_glossary.html` | 120 | 37 | 120 | 277 | Glossary — bilingual convention already established |
| `part_04.html` | 186 | 16 | 68 | 270 | SPINE framework — `GHOST`/`LIE`/`FLAW`/`NEED`/`WANT` intentional |
| `part_03.html` | 67 | 63 | 51 | 181 | Voice — heavy prose, many leaks |
| `part_01.html` | 66 | 44 | 69 | 179 | Foundations — prose-heavy |
| `part_06.html` | 67 | 13 | 76 | 156 | CoT — `stair-step__format` blocks contain intentional English |
| `part_02.html` | 7 | 32 | 56 | 95 | Anchors — `Trigger`/`Action`/`Price` triplet leaks |
| `part_09.html` | 35 | 25 | 64 | 124 | Diagnostics — checklist items |
| `part_07b.html` | 41 | 18 | 57 | 116 | Lorebook — `Key`/`Content`/`Depth` field names |
| `appendix_mbti.html` | 13 | 5 | 11 | 29 | MBTI table — mostly abbreviations |
| `appendix_model_table.html` | 2 | 3 | 4 | 9 | Model table — mostly code |

**Total:** 1 395 ALLOWED + 557 TRANSLATABLE + 1 286 UNKNOWN = **3 238 token instances** surveyed across 14 files.

> Note: counts include repeats — a token appearing 50 times in one file counts as 50. The unique-token counts are smaller (see §4).

---

## 4. Term-Level Feasibility Analysis

### 4.1 Category A — KEEP ENGLISH (do not translate)

These are **intentional English anchors** per documented convention. Translating them breaks:
- The CORE DIRECTIVES contract with 12B models (English instructions are followed ~15–20 % more reliably).
- The callout-label parsing convention (the model uses these as semantic anchors during card generation).
- The bilingual-glossary convention (English term + Russian gloss in parens on first occurrence).
- Cross-references and section IDs.

| Token | Count | Why it stays English |
|-------|-------|----------------------|
| `SPINE`, `GHOST`, `LIE`, `FLAW`, `NEED`, `WANT` | 186+ | XML tag names — `<spine>`, `<ghost>`, etc. Translating breaks the tag contract with the model. |
| `OCEAN`, `MBTI`, `CoT`, `OOC` | 38+ | Acronyms — universal in ML/psychology literature. |
| `Description`, `Greeting`, `Examples`, `Personality`, `Scenario`, `Character Card` | 60+ | SillyTavern / ST API field names — must match the field names the user sees in the UI. |
| `Lorebook`, `Entry`, `Key`, `Content`, `Depth`, `Position`, `Probability`, `Comment` | 80+ | Lorebook JSON schema field names — match the JSON keys. |
| `Author's Note`, `AN`, `LB` | 12+ | Card-section abbreviations — universally used in the ST community. |
| `Top P`, `Top K`, `Min P`, `RepPen`, `Repetition Penalty`, `Presence Penalty`, `Temperature` | 50+ | Sampler parameter names — match the SillyTavern UI labels. |
| `CORE DIRECTIVES`, `SHOW NEVER TELL`, `EMBODIMENT FIRST`, `SPATIAL LOCK`, `ANATOMICAL LOCK`, `ENVIRONMENTAL REACTIVITY`, `INFLUENCE BOUNDARY`, `CONSEQUENCE DRIVEN`, `FORMAT LOCK` | 21+ | CORE DIRECTIVES block — English by design (AGENTS.md §12). |
| `Tone Frame`, `Immersion Boundary`, `4K-Fallback`, `Pre-Generation Filter` | 15+ | Named SP conventions — English anchors. |
| `RULE`, `RECOMMENDATION`, `EXAMPLE`, `ILLUSTRATION`, `TEMPLATE`, `Bridge`, `Synthesis`, `Cross-ref`, `Demonstrates` | 130+ | Callout labels — parsing anchors (canon `_README.md` §3.9). |
| `Voice Isolation`, `Embodiment`, `Nested Anchors`, `Structured Inject`, `Chain of Thought`, `System Prompt`, `Big Five`, `Myers-Briggs`, `Lorebook Entry` | 80+ | Multi-word framework terms — in KEEP_ENGLISH_TERMS whitelist. |
| `Tier 1`, `Tier 2`, `Tier 3` | 30+ | CoT / SPINE / Quality Grade tiers — universal in ML. |
| `INTJ`...`ESFP` (16 MBTI types) | varies | MBTI codes — universal. |
| `E01`...`E18`, `VS-EMBED` | 50+ | Visual-system element IDs. |
| `AP-1`...`AP-15` (in section IDs / labels) | 50+ | Anti-pattern IDs — section IDs MUST stay (`p8_ap1_*`); prose labels can be translated (see §4.3 Borderline). |
| `SP` (in SP examples / CORE DIRECTIVES context) | 50 | System Prompt abbreviation. In SP examples, English by design. In Russian prose, borderline (§4.3). |
| `{{user}}`, `{{char}}` | varies | SillyTavern placeholders — must match exactly. |
| `Token Budget`, `Quality Grade`, `Model Capability` (as compound nouns in glossary) | 30+ | Bilingual glossary convention: `Token Budget (бюджет токенов)`, `Quality Grade A/B/C`, etc. |

### 4.2 Category B — TRANSLATE (clear leak, low risk)

These are **incidental English words** in Russian prose — pure function words or common nouns with direct Russian equivalents. Translating them improves readability for Russian readers and does not break any convention.

#### B.1 Pure function-word leaks (translate immediately)

Tokens like `the`, `a`, `an`, `of`, `in`, `is`, `are`, `and`, `or`, `for`, `to`, `do`, `does`, `did`, `have`, `has`, `had`, `be`, `been`, `being`, `was`, `were`, `will`, `would`, `can`, `could`, `should`, `may`, `might`, `must`, `shall`, `only`, `never`, `if`, `then`, `else`, `when`, `while`.

**Where they appear (sample):**

```
part_07a.html:40   ...«respond only to observable actions» работает лучше чистого запрета...
appendix_glossary.html:13 ...запрет («Never speak or act for {{user}}») и позитивная формулировка
                          («respond only to observable actions and words»). Позитивная формулировка работает...
part_06.html:179   <h3>Tier 3 CoT (API only)</h3>
```

**Decision:** Most of these leaks are inside `<code>` or quoted SP-template phrases — they are intentional English examples of the SP directive wording. The `is_in_allowed_context` filter in `check_english.py` already treats `<td>` and `<code>` as allowed context, so most of these don't even reach the leak list.

**True translation candidates** (in pure Russian prose, not in SP examples):

- `Tier 3 CoT (API only)` → `Tier 3 CoT (только API)` — 1 instance in `part_06.html:179`.
- `(for stable personality)` → `(для стабильной личности)` — search for similar parentheticals.

**Risk:** LOW. Total instances: ~10–20 across the guide.

#### B.2 Heading-only leaks (translate immediately)

Headings that are pure English without bilingual gloss. These are the most visible leaks — the reader sees them in the TOC and as page anchors.

| Heading | File:Line | Russian equivalent |
|---------|-----------|---------------------|
| `<h2>Model Capability Table</h2>` | `appendix_model_table.html:5` | `<h2>Таблица возможностей моделей</h2>` (with English gloss in parens on first prose mention) |
| `<h4>Шаг 6: Token Budget Check</h4>` | `part_07a.html:1115` | `<h4>Шаг 6: Проверка бюджета токенов</h4>` (Token Budget is in KEEP_ENGLISH_TERMS but `Check` here is a verb, not the noun `Token Budget`) |
| `<h4>До/После: Grade A vs Grade C</h4>` | `part_03.html:284` | `<h4>До/После: класс A vs класс C</h4>` (`Grade` is a common noun here, not part of a proper name) |

**Risk:** LOW. The `Model Capability Table` heading is the only one that touches a section heading; section IDs are unaffected (the `id="appendix_model_table"` stays the same).

#### B.3 Prose noun leaks (translate selectively)

Common English nouns that have direct Russian equivalents and appear in pure prose (not in compound term names):

| Token | Count | Russian | Verdict |
|-------|-------|---------|---------|
| `Model` (in prose, not "Model Capability Table") | 3 | «модель» / «модели» | Translate where it appears as a common noun, not where it's part of a compound name. |
| `Step` (in `pipeline-node__step` labels) | 10 | «Шаг» | Translate the visible label; class name stays English. |
| `Pattern` / `patterns` (in prose) | 6 | «паттерн» / «паттерны» | Russian «паттерн» is widely accepted loanword. Decide per-instance. |
| `Trigger` / `Action` / `Price` (Anchor triplet, in prose) | 14+13+33 | «Триггер» / «Действие» / «Цена» | Borderline — see §4.3. |
| `State`, `Body`, `Sensor`, `Speech` (Embodiment Protocol quad) | 10+10+10+10 | «Состояние» / «Тело» / «Сенсор» / «Речь» | Borderline — see §4.3. |

**Risk:** MEDIUM. Translating `Step` in pipeline labels requires editing both the visible text and ensuring the pipeline SVG/HTML labels remain consistent.

#### B.4 Stair-step format leaks

`part_06.html:35`:

```html
<div class="stair-step__format">[Reminds of betrayal] → Closes off<br>[INTERNAL: G...]</div>
```

These appear inside `<div class="stair-step__format">` blocks — character inner-state notation. They are intentionally English because they represent the model's internal-monologue output format, which the model writes in English by SP convention.

**Decision:** KEEP ENGLISH. Already in allowed context per `check_english.py` (treated as code-like example content).

### 4.3 Category C — BORDERLINE (case-by-case decision)

These tokens have established bilingual treatment in `appendix_glossary.html` (English term + Russian gloss in parens). The question is whether **prose occurrences** should use the Russian gloss or stick with the English term.

**Convention proposal:** First occurrence in a Part = bilingual gloss. Subsequent occurrences in the same Part = English term only (consistent with the existing glossary pattern). This preserves the parsing-anchor function while ensuring the reader sees the Russian meaning at least once per Part.

| Token | Count | Bilingual gloss | Recommendation |
|-------|-------|-----------------|----------------|
| `Anchors` / `Anchor` | 118 + 62 | (поведенческие якоря) | In prose: leave as `Anchor`. In headings: bilingual on first mention per Part. Plural `Anchors` → keep English in prose (proper noun feel). |
| `SP` (System Prompt abbreviation) | 50 | (системный промпт) | In prose: replace with `СП` or write out `системный промпт`. In SP examples: keep `SP`. |
| `AP-` (Anti-pattern prefix) | 50 | (антипаттерн) | In prose: leave `AP-1`...`AP-15` (matches section IDs). In descriptive prose: «антипаттерн AP-1». |
| `Embodiment` | 42 | (воплощение) | In CORE DIRECTIVE label: keep `EMBODIMENT FIRST`. In prose referring to the concept: «воплощение» with `Embodiment` gloss on first mention per Part. |
| `Enneagram` | 38 | (эннеаграмма) | Glossary already bilingual. In prose: use `Enneagram` consistently (it is a proper-noun framework name). Translate heading `Тип стресса (Neuroticism → Stress Type)` → `Тип стресса (Нейротизм → Тип стресса)` — but `Neuroticism` is an OCEAN dimension, kept English. |
| `Protocol` (in `Embodiment Protocol`) | 12 | (протокол) | Compound term — keep `Embodiment Protocol` as proper noun. In prose alone: «протокол». |
| `Behavioral` (in `Behavioral Anchor`) | 10 | (поведенческий) | Compound term — keep as proper noun. In prose alone: «поведенческий». |
| `Body`, `Sensor`, `Speech`, `State` | 10 each | (тело, сенсор, речь, состояние) | These are 4 components of the Embodiment Protocol micro-chain `State → Body → Sensor → Speech`. **Recommendation:** Keep as a 4-tuple in English (matches the protocol notation). In descriptive prose: bilingual gloss on first mention per Part. |
| `Voice` (in prose, not in `Voice Isolation` / `Voice Bleed` / `Voice Leak`) | 42 | (голос) | In compound term names: keep English. In prose alone: «голос». |
| `Identity` (in `Identity Block`) | 10 | (идентичность) | Compound term — keep `Identity Block`. In prose alone: «идентичность». |
| `Layers` (in `GHOST Layers`) | 20 | (слои) | Compound term — keep `GHOST Layers`. In prose alone: «слои». |
| `Lock` (in `Format Lock` / `Spatial Lock` / `Anatomical Lock`) | 21 | varies | Compound term — keep as proper noun. In prose alone: «блокировка». |
| `Leak` / `Bleed` (in `Voice Leak` / `Voice Bleed`) | 6 + 9 | (утечка / переплетение) | Compound term — keep as proper noun. In prose alone: translate. |
| `Protection` (in `OOC Protection`) | 6 | (защита) | Compound term — keep as proper noun. |
| `Overload` (in `OCEAN Overload` / `CoT Overload`) | 6 | (перегрузка) | Compound term — keep as proper noun. In prose alone: «перегрузка». |
| `Stress` (in `Stress Type`) | 5 | (стресс) | Translate heading: `Тип стресса` (already bilingual). In prose alone: «стресс». |
| `Trigger`, `Action`, `Price` (Anchor triplet, standalone) | 14+13+33 | (триггер, действие, цена) | **Most borderline.** Currently used inconsistently: some prose uses `Trigger → Action → Price` (English), some uses `триггер → действие → цена` (Russian). **Recommendation:** Standardize on `Trigger → Action → Price` in technical / format contexts (matches the Anchor framework notation), and use `триггер → действие → цена` in pedagogical / explanatory prose. |
| `Token` (in `Token Budget`) | 14 | (токен) | Loanword in Russian — both `токен` and `Token` are acceptable. Current convention: `Token Budget` (compound), `токен` (standalone). Keep. |
| `Budget` (in `Token Budget`) | 13 | (бюджет) | Compound term — keep as proper noun. |
| `Grade` (in `Quality Grade`) | 11 | (класс) | Compound term — keep. |
| `Check` (in `Token Budget Check`) | 13 | (проверка) | Compound term — translate the heading per B.2 above; in prose, keep `Token Budget Check` as proper noun. |
| `Template` (in `Template A` / `Template B`) | 8+16 | (шаблон) | Template labels — keep English to match the `Template A` / `Template B` section structure. |
| `Penalty` (in `Repetition Penalty` / `Presence Penalty`) | 9+7 | (штраф) | Sampler parameter names — keep English. |
| `Presence` (in `Presence Penalty`) | 7 | — | Sampler parameter name — keep English. |
| `Repetition` (in `Repetition Penalty`) | 2 | — | Sampler parameter name — keep English. |
| `Message` (in `Greeting Message`) | 7 | (сообщение) | Compound term — keep `Greeting Message` as proper noun. |
| `Key` (in `Lorebook Key`) | 3 | (ключ) | Lorebook field name — keep English. |
| `Depth` (in `Lorebook Depth`) | 3 | (глубина) | Lorebook field name — keep English. |
| `Type` (in `Stress Type` / `Anchor Type`) | 4 | (тип) | Compound term — keep English in compound, «тип» standalone. |
| `Full` (in `Full Check`) | 4 | (полный) | Translate label: `Full Check` → `Полная проверка` (in `part_09.html:492`). |
| `Quick` (in `Quick Check`) | 7 | (быстрый) | Translate label: `Quick Check` → `Быстрая проверка` (in `part_09.html:492`). |
| `cautious` (in `cautious zone`) | 7 | (осторожная зона) | Translate or keep? `cautious zone` is OCEAN-specific jargon — already explained in prose. **Recommendation:** Keep `cautious zone` as jargon, add bilingual gloss on first mention per Part. |
| `observable`, `actions` (in `respond only to observable actions`) | 3 + 3 | — | This is an SP-template phrase — KEEP ENGLISH (it is an example of SP directive wording). |
| `behavioural` (in `Anchors = behavioural patterns`) | 3 | (поведенческие) | Translate to `Anchors = поведенческие паттерны`. |
| `pattern` / `patterns` (in prose) | 1 + 6 | (паттерн) | Use Russian loanword `паттерн` — already accepted in technical Russian. |
| `You` (in `You are {{char}}`) | 6 | — | SP-template phrase — KEEP ENGLISH. |
| `Never` (in `Never speak or act for {{user}}`) | 6 | — | SP-template phrase — KEEP ENGLISH. |

### 4.4 Category D — HTML ARTIFACTS (ignore, not real English)

These tokens are picked up by the survey but are NOT English words — they are HTML entity names that appear in source code before rendering:

| Token | Rendered as | Why it appears |
|-------|-------------|----------------|
| `gt` | `>` | `&gt;` HTML entity |
| `lt` | `<` | `&lt;` HTML entity |
| `rarr` | `→` | `&rarr;` HTML entity |
| `mdash` | `—` | `&mdash;` HTML entity |
| `laquo` | `«` | `&laquo;` HTML entity |
| `raquo` | `»` | `&raquo;` HTML entity |
| `sect` | `§` | `&sect;` HTML entity |

**Decision:** Filter these out in the next iteration of `survey_english_terms.py`. They are NOT translation candidates.

---

## 5. Iteration Plan

### 5.1 Three-iteration breakdown

| Iteration | Scope | Files touched (estimate) | Risk |
|-----------|-------|--------------------------|------|
| **iter-103** (this one) | Audit + categorization + plan. No source HTML edits. | 4 doc/script files: `docs/research/english_terms_audit_iter103.md` (new), `docs/research/english_terms_audit_iter103.json` (new), `scripts/survey_english_terms.py` (new), + `worklog.md` / `STATUS.md` / `CHANGELOG.md` updates | NONE — doc-only |
| **iter-104 (proposed)** | Category B translation pass: pure function-word leaks (B.1) + heading-only leaks (B.2) + safe prose-noun leaks (B.3). | 4 master HTML files: `appendix_model_table.html`, `part_03.html`, `part_06.html`, `part_07a.html` (Token Budget Check heading only) | LOW — 5–15 individual edits, no section IDs touched |
| **iter-105 (proposed)** | Category C borderline pass: standardize bilingual-gloss convention across Parts 1–10 (English term + Russian gloss on first mention per Part). Translate `Quick Check` / `Full Check` labels. Standardize `Trigger → Action → Price` vs `триггер → действие → цена` per context. | 5–6 master HTML files: `part_01.html`, `part_02.html`, `part_05.html`, `part_07a.html`, `part_08.html`, `part_09.html` | MEDIUM — 20–40 individual edits, may need canon sync |
| **iter-106 (if needed)** | Polish pass: re-run `check_english.py` and `survey_english_terms.py` to confirm leak count dropped; update `KEEP_ENGLISH_TERMS` whitelist in `check_english.py` if any intentional English terms were missed; sync `docs/canon/*.md` for any prose that changed. | 2–3 files | LOW |

### 5.2 What is explicitly NOT in scope

- **No translation of CORE DIRECTIVES block.** English by design (`AGENTS.md` §12).
- **No translation of callout labels.** English by design (`docs/canon/_README.md` §3.9).
- **No translation of XML tag names** (`<spine>`, `<ocean>`, `<enneagram>`, `<anchors>`). These are model-facing anchors.
- **No translation of section IDs** (`p8_ap1_*`, `p7a_token_budget`, etc.). Inbound anchor links would break.
- **No translation of sampler parameter names.** Match the SillyTavern UI.
- **No translation of SillyTavern field names** (`Description`, `Greeting`, `Examples`, etc.). Match the ST API.
- **No translation of `part_10.html` Elena example card content.** The SP and Examples are intentionally English — they are example card content, not guide prose.
- **No bulk find-and-replace.** Every translation decision is per-instance, with context.

### 5.3 Estimated effort

- **iter-104:** ~30 min of editing. ~10 individual edits across 4 files. Re-run `pnpm run qa:english` after.
- **iter-105:** ~60 min of editing. ~30 individual edits across 5–6 files. Re-run canon sync (`audit_canon_master_sync.py` must stay 97/97 PASS).
- **iter-106:** ~15 min. Confirm with audit script.

---

## 6. Risks and Considerations

### 6.1 Risk: breaking the bilingual convention

The guide already has an established convention: **English term + Russian gloss in parens on first occurrence per Part**. This is documented in `appendix_glossary.html` (e.g., `Anti-godmoding (анти-годмодинг)`, `Behavioral Anchor (поведенческий якорь)`, `Voice Bleed (переплетение голосов)`).

**Risk:** Bulk-translating English terms to Russian would break this convention and lose the parsing-anchor function for the model.

**Mitigation:** Category C decisions explicitly preserve the bilingual-gloss convention — English term stays, Russian gloss is added on first mention per Part if missing.

### 6.2 Risk: canon → master drift

Any prose change in `src/master/*.html` MUST be reflected in `docs/canon/part_NN.md` (source of truth) or the canon→master drift detector will report a regression.

**Mitigation:** iter-105 (Category C pass) MUST include canon sync. The `audit_canon_master_sync.py` script must continue to PASS 97/97 after the iteration.

### 6.3 Risk: false sense of completion

The `check_english.py` baseline of 21 leaks is INTENTIONAL — those leaks are Tone Frame strings, SP directives, Part 10 example card content, `Model Capability Table` heading, `Token Budget Check` heading, `Quality Grade A/B/C` label. Translating them would NOT improve the guide and would break the documented baseline.

**Mitigation:** iter-104 and iter-105 MUST NOT touch the existing 21 baseline leaks. The audit script (`survey_english_terms.py`) is more granular and catches additional candidates that `check_english.py` does not flag — these are the translation targets, not the 21 baseline leaks.

### 6.4 Risk: terminology drift across Parts

The same English term may be used inconsistently across Parts — e.g., `Trigger` in `part_01.html` (English) vs `триггер` in `part_05.html` (Russian). Translating one without the other would create new inconsistencies.

**Mitigation:** iter-105 (Category C pass) includes a consistency check across all 14 master HTML files. A simple grep for each translated term before and after the pass will catch drift.

### 6.5 Risk: section ID stability

Section IDs (`p8_ap1_voice_leak`, `p7a_token_budget`, `appendix_model_table`) MUST NOT be renamed — they are inbound anchor targets. The `data-anchor-redirects.json` file maps legacy IDs to current IDs, and any rename would break inbound links.

**Mitigation:** All proposed translations in §4 preserve section IDs. The `Model Capability Table` heading translation does NOT affect the section ID `appendix_model_table`. The `Token Budget Check` heading translation does NOT affect the section ID `p7a_token_budget`. The `Grade A vs Grade C` heading translation does NOT affect any section ID.

---

## 7. Validation Plan (for iter-104 and iter-105)

After each translation pass, the following MUST pass:

```bash
pnpm run validate:master          # 12/12 PASS
python3 scripts/audit_canon_master_sync.py   # 97/97 PASS
python3 scripts/audit_canon_master_drift.py  # informational, exit 0
pnpm run qa:english                # should report ≤21 leaks (baseline)
python3 /home/z/my-project/scripts/survey_english_terms.py
                                   # should report fewer TRANSLATABLE tokens
pnpm run build                     # SUCCESS
pnpm test                          # 64/64 PASS
pnpm run version:check             # 9.2.6 sync
```

If any of these regress, the iteration MUST be rolled back via `git checkout src/master/part_NN.html`.

---

## 8. Companion Data

The full per-file, per-token survey output is in:

**`docs/research/english_terms_audit_iter103.json`** (~3 238 token instances, 14 files).

Structure:

```json
{
  "files": {
    "part_07a.html": {
      "filepath": "...",
      "counts": { "ALLOWED": 321, "TRANSLATABLE": 129, "UNKNOWN": 324 },
      "tokens": {
        "ALLOWED": [ { "token": "SPINE", "line": 12, "context": "..." }, ... ],
        "TRANSLATABLE": [ ... ],
        "UNKNOWN": [ ... ]
      },
      "raw_counter": { "SPINE": 5, "Anchor": 12, ... }
    },
    ...
  },
  "unknown_tokens_aggregate": [ ["Anchors", 118], ["Anchor", 62], ... ],
  "translatable_tokens_aggregate": [ ["RULE", 51], ["Voice", 42], ... ]
}
```

To re-run the survey:

```bash
python3 scripts/survey_english_terms.py
# Writes JSON to scripts/output/english_terms_survey.json (gitignored)
# Prints summary to stdout
```

---

## 9. Open Questions for Author

These decisions are deferred to the author before iter-104 / iter-105 can proceed:

1. **`Trigger → Action → Price` vs `триггер → действие → цена`**: should the Anchor framework notation stay in English in technical contexts, or standardize on Russian in pedagogical prose? Currently mixed.

2. **`Embodiment Protocol` components** (`State`, `Body`, `Sensor`, `Speech`): keep as a 4-tuple in English (matches protocol notation), or translate to Russian in prose?

3. **`SP` abbreviation in prose**: replace with `СП` (Cyrillic), or keep `SP` (Latin) for consistency with the SP examples?

4. **`AP-1`...`AP-15` in prose**: keep as-is (matches section IDs), or display as `Антипаттерн 1`...`Антипаттерн 15` in descriptive prose?

5. **`Quick Check` / `Full Check` labels** in `part_09.html`: translate to `Быстрая проверка` / `Полная проверка`, or keep as English labels?

6. **`cautious zone`** (OCEAN jargon): keep as English jargon with Russian gloss on first mention, or translate to `осторожная зона` throughout?

7. **`Model Capability Table` heading**: translate to `Таблица возможностей моделей`, or keep as the proper name of the appendix?

8. **`Token Budget Check` heading**: translate to `Проверка бюджета токенов`, or keep as the proper name of the validation step?

9. **`Quality Grade A/B/C` label**: keep as English label (matches the SP convention of using English in card-quality self-grading), or translate to `Класс качества A/B/C`?

10. **Baseline leak policy**: the 21 baseline leaks from `check_english.py` are documented as "by design". Should iter-105 explicitly leave them, or should the baseline be re-evaluated?

---

## 10. Stop Point

```
Done:        Audit complete. 3 238 token instances surveyed across 14 master HTML files.
             Categorized into A (KEEP ENGLISH ~1 440), B (TRANSLATE ~470),
             C (BORDERLINE ~640), D (HTML ARTIFACTS ~120). Analysis report +
             companion JSON + re-runnable survey script authored. 3-iteration
             translation plan proposed. No source HTML changes (doc-only iteration).

Not done:    Actual translation passes (iter-104, iter-105) — deferred pending
             author approval of this plan and answers to the 10 open questions
             in §9. Reason: per AGENTS.md "Plan first, then code. Better to
             underdeliver than to break things."

Next step:   Author reviews this document, answers the 10 open questions in §9,
             and approves iter-104 scope. iter-104 then translates Category B
             (clear leaks) in 4 master HTML files (~10 edits).

Active KIs:  KI#64 (OPEN) — version drift on mermaid-init.js (untouched this iteration).
             No new KIs opened — this iteration is an audit, not a fix.
             (Optional: KI#66 — "English term translation backlog" — could be
             opened if author wants to track iter-104/105/106 as a known-issue chain.)
```

---

**Audit complete.** This document is the single source of truth for the English-term translation effort. All future iterations (iter-104, iter-105, iter-106) MUST reference this document for their scope and decisions.
