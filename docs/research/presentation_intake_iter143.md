# Presentation-Layer External Analysis — Intake (iter 143)

> **Source:** two external analyses delivered by the owner in chat on 2026-09-15
> (preserved verbatim in §7: Analysis A — "migration vs UX" phasing assessment;
> Analysis B — 16-point presentation/overload diagnosis with recommendations).
> **Analyzed object:** this repository, v9.2.6 / iter 142 state (`HEAD e3391711`).
> **Method:** external consultation performed against a **partial text export** of the
> guide, not against the repository — no clone, no `BASE_COMMIT`, no validation runs at
> analysis time. The export was English-labelled (pre-DEC-16 label rendering; production
> labels are Russian) and partial (§2: no repository artifact matches the stated 2816
> lines). All claims were UNVERIFIED at delivery.
> **Intake (iter 143):** every quantitative and structural claim re-derived against the
> actual repository (evidence inline); each recommendation classified per §1. Durable
> findings are recorded as input to the owner-gated **v2 architecture phase** (§5, F1–F6).
> **Nothing DECIDED by this intake** — no DEC records changed, no PLAN rows executed,
> no KIs opened, v1 untouched (no `docs/canon/part_*.md` / `appendix_*.md`, no `src/master/`
> edits).
> **Numbering note:** the analyses' internal vocabulary (English label names, "KI-style"
> phrasing) is external and does not affect repository registries; the next free
> repository KI number remains KI#83.

---

## 0. Scope of this iteration

Owner-directed doc-only intake (chat 2026-09-15 «давай, оформляй»), following the
iter-118 precedent (`editorial_research_en.md`): external analysis preserved verbatim,
claims checked against the actual repository, durable findings routed to their owning
backlog rows. Scope = one new research file + the state files repo law requires
(STATUS / PLAN / AGENT_NAVIGATION §7 / worklog). No content, infrastructure, or data
files were touched.

## 1. Reading key (verdict vocabulary)

| Verdict | Meaning |
|---|---|
| CONFIRMED | claim matches measured repo state |
| PARTIALLY | matches with a material qualification |
| NOT REPLICATED | no matching artifact or counter exists |
| ALREADY LAW / RATIFIED / EXECUTED | the repo already carries the mechanism (law, DEC, or iteration cited) |
| NEW INPUT | no existing carrier; recorded as v2-architecture-phase input (§5) |
| NOT ADOPTABLE AS STATED | conflicts with ratified law / guardrails (§4) |

## 2. Count verification (Analysis B quantitative claims)

| Claim (as stated) | Measured in repo | Verdict | Evidence |
|---|---|---|---|
| "the file is 2816 lines" | No artifact matches: largest master file **1213** lines (`src/master/part_07a.html`); canon `part_*.md` total **3806**; canon incl. appendices + registries **5031**; master ≈ 6.6K lines across 13 files | **NOT REPLICATED** (partial export) | `wc -l` over `docs/canon/*.md`, `src/master/*.html` |
| "RULE: — 45" | `.callout.rule` = **45** (ПРАВИЛО label occurrences 46, incl. one non-callout context) | **CONFIRMED** (exact for callout blocks) | grep counts, `src/master/*.html` |
| "RECOMMENDATION: — 19" | `.callout.rec` = **21** | **CONFIRMED** (±2) | grep counts |
| "EXAMPLE — 139" | No single counter matches: word «пример» (case-insensitive) **116** master / **161** canon; labelled example blocks: ИЛЛЮСТРАЦИЯ **36** + `example-label` chips **52** + `.callout.ex` **5** | **NOT REPLICATED** (mixed counters; the abundance signal itself is real) | grep counts |
| "ILLUSTRATION — 30" | ИЛЛЮСТРАЦИЯ = **36** | **CONFIRMED** (±6) | grep counts |
| "TEMPLATE — 24" | ШАБЛОН = **16** | **PARTIALLY** (±8) | grep counts |
| "Copy 44 раза — технический мусор" | **0** content occurrences of a «Copy» label; `src/shell/lazy-loader.js` ("Copy buttons" block, ~L1144–1166) injects a per-codeblock copy button whose visible text is «Copy»; master carries **50** `<pre><code` blocks | **NOT CONTENT — category error** (shell UI chrome over code blocks, not document text; ~44 ≈ the code-block count of the partial export) | `lazy-loader.js` read; grep `<pre><code` |
| "чек-листы/чеклисты … десятки раз" | «чек-лист\|чеклист» word hits: **22** master / **28** canon | **CONFIRMED** | grep counts |
| WRONG/CORRECT example pairs (frequent) | **11** occurrences (master, case-insensitive) | **CONFIRMED** (present, modest volume) | grep counts |
| "Cross-ref" as a frequent visible label | **3** English hits in master; the production label is Russian «Ссылка» (DEC-16 label set) | **EXPORT ARTIFACT** (English-labelled rendering of RU labels) | grep; NAV pitfall #19 |

**Reading of §2.** The frequency signal itself is honest — the guide is genuinely
marker-dense (45 `.callout.rule` + 21 `.callout.rec` normative callouts, 52 example
chips, 28 canon-side checklist-word hits). But the specific numbers were taken from a
partial English-labelled export and must not be used for volume planning; the
repo-derived numbers above are the planning baseline. The «Copy ×44» case is recorded
explicitly as a category error: those are the shell's runtime-injected code-copy
buttons (reader-facing UI over the 50 master code blocks, with the Clipboard API guard
of pitfall #11), not document content — "remove Copy from the user layer" is not a
content action.

## 3. Claim-by-claim verification

### 3.1 Analysis B (16 points + closing)

| # | Claim (condensed) | Verdict | Repo state / evidence |
|---|---|---|---|
| B1 | 3 presentation layers (Core / Explain / Reference); micro-format `Rule + ▸Why / ▸Example / ▸Edge case` | **NEW INPUT** (model) | Maps onto research §25 layer model (Teach / Apply / Verify / Reference) and the PLAN v2 reader modes — but is NOT implementable as v8-style per-block tiers: fence #2 forbids `data-layer` / `data-layer-switch` / `layer-remark` (removed in v8 by design). Must be structural (reader paths + disclosure components) — see F1 / F5 / F6 |
| B2 | Checklists serve 3 different functions (teach / decide / verify); the Pre-build checklist is really a **decision input** → reframe as "build profile"; keep checkbox affordances only for real validation (Pre-Deploy, SPINE consistency) | **CONFIRMED** (facts) + **NEW INPUT** (F3) | Pre-build checklist exists exactly as described: canon `part_01.md` (6 questions: model / context window / complexity / GHOST / CoT / Lorebook — a «Вопрос → Варианты → Что это определяет» decision table). True validation checklists exist and were verified in mig-3: §9.3 basic checklist, §9.11 pre-deploy |
| B3 | "Rule → explanation → table → example → re-rule" chains — would clean "very aggressively" | **PARTIALLY** | The pattern inventory exists and is already classified: `editorial_matrix.md` (99 section IDs / 500 block rows, full-guide coverage, per-part compression-candidate verdicts; foundation §2 summarizes 20 candidates). "Aggressively" is not adoptable — DEC-15 functional-load gate + research §24 classification + map §1 (repetition ≠ duplication; UNKNOWN never deleted) govern intensity |
| B4 | Reduce to 4 semantic types (RULE / GUIDELINE / EXAMPLE / REFERENCE); drop RECOMMENDATION as a visual label | **ALREADY RATIFIED** (different axis) + **NOT ADOPTABLE** as stated | Rule **strength** classes are ratified: DEC-20 (RULE / GUIDELINE / OBSERVATION / EXPERIMENTAL + UNKNOWN, applied incrementally per slice). Labels are Russian (DEC-16: ПРАВИЛО / РЕКОМЕНДАЦИЯ / …). Folding РЕКОМЕНДАЦИЯ into plain paragraphs would remove `.callout.rec` from the sanctioned component registry (fence #7, `docs/components.md`) |
| B5 | Distinguish inline example vs deep/worked example; small examples need no heading | **NEW INPUT** (F4) | No existing tiering rule; the mechanism exists (`example-label` chips ×52, ИЛЛЮСТРАЦИЯ ×36) |
| B6 | "Copy — вообще убрать из пользовательского слоя" | **NOT ADOPTABLE** (category error) | «Copy» = runtime-injected code-copy buttons (`src/shell/lazy-loader.js`, "Copy buttons" block) over 50 `<pre><code` blocks; functional shell UI (Clipboard guard, pitfall #11), not content — see §2 |
| B7 | Viz answers "what?" → minimal main text; `▸Why / ▸How to use / ▸Edge cases` disclosure | **ALREADY LAW** + **NEW INPUT** (F6) | `viz > dry text` is ratified law (NAV pitfall #12: visualization = replacement, not addition). The why/how/edge disclosure split has no carrier yet; the sanctioned mechanism exists: `<details class="interactive">` (`docs/components.md` #5 Collapsible), 16 usages in master (7B×8, 10×4, 7A×2, 5×1, 9×1) |
| B8 | Tutorial vs Reference conflict; split navigation Learn / Build / Diagnose / Reference | **ALREADY PLANNED** | Third independent convergence: research §23 → PLAN row v2-architecture (Learn → Build → Debug → Reference). Adds no new mode; adds navigation-split emphasis → folded into F1 |
| B9 | One rule → one canonical definition, everywhere else summarize + link (cited example: Voice Isolation repeated in ~7 places) | **ALREADY EXECUTED** (for the cited example) | NAV §10 + fence #11 (IMP-48) + six executed clusters iter 133–142. The analysis's own example was the iter-142 DEC-21 slice: §3.2 = canonical owner, E07 re-pointed, widget constants parity-locked. Residual rule-wording repetition (the term appears across 12 canon files) rides the per-slice matrix / Registry C seeding |
| B10 | Spoiler list: methodology disclaimers, rationale, alternatives, long WRONG/CORRECT, edge cases, extra worked examples, model-specific nuance, glossary-like re-definitions | **NEW INPUT** (classification) + one cited example **ALREADY EXECUTED** | The methodology-with-percentages disclaimer is already canonical-once + deferred link: `part_01.md` §1.1 (full statement) / `part_03.md` (one-line `[ref: part_01.md §1.1]`) — exactly the proposed "canonical note + [methodology] link" pattern. The general spoiler classification = F2 / F6 input |
| B11 | Keep operational rules open (T→A→P; Voice → Examples/Greeting; Psychology → Description; Anti-godmoding; Price immediate; One Change Rule) | **CONFIRMED** (alignment) | All exist and are canonical: NAV §5 three key principles; `p9_one_change_rule` (One Change Rule); matches the Editorial Policy progressive-disclosure clause ("do not defer information whose absence could cause an incorrect implementation") + research §20 useful-repetition whitelist |
| B12 | Soften marker language (RULE: → "Rule."), fewer "IDE/manual" titres | **NOT ADOPTABLE** as stated | Conflicts with DEC-16 (fence #12: the Russian label set is guide prose) and the closed component registry (fence #7); label semantics are owner-gated |
| B13 | Reduce meta-language ("таблица ниже дополняет…", "как показано выше…") | **CONFIRMED** (queued family) | The quoted example exists verbatim: canon `part_02.md` (E03 complement note; same pattern for E04 two blocks later). Family already recorded: ed-6 / research KI-7 (reader-facing prose carrying document-architecture commentary); rides Registry C seeding |
| B14 | Rebuild the guide opening into a hard 5-item start | **ALREADY RECORDED** | research §26 P0-1 ("Reduce Part 1 to a true foundation/orientation layer") = backlog row ed-1. Part 1 today = 5 sections (value proposition / card overview / structure / core rules / pre-build checklist) |
| B15 | Keep the Part decomposition; one presentation micro-template per Part | **NEW INPUT** (F5) | Part decomposition intact and ratified as the teaching gradient (`docs/architecture.md`, NAV §3). The micro-template (Concept → Rule → Core example → ▸Why / ▸Failure modes / ▸Edge cases / ▸Reference) has no carrier — pattern-catalog candidate for the v2 phase |
| B16 | Delete / collapse / hide / keep-open / transfer-to-reference classification of "noise" | **NEW INPUT** (F2) | Largely isomorphic to the matrix compression-candidate machinery + research §22 functional-load test + §20 whitelist; what it adds is the **presentation axis** (open vs collapsible vs relocate) currently missing from Registry C |
| B-final | Next step = a per-Parts redesign map (open / spoiler / delete / canonical / transfer) | **NEW INPUT** (F2) — ⅔ already exists | `editorial_matrix.md` = the full-coverage block inventory (500 machine-checkable rows); Registry C = the per-block migration back-pointer mechanism. Missing piece = the presentation-disposition column |

### 3.2 Analysis A (migration vs UX phasing)

| # | Claim (condensed) | Verdict | Repo state / evidence |
|---|---|---|---|
| A1 | The migration solves the root architectural part (canonical ownership) but not the whole UX defect | **CONFIRMED** | Ownership work lives in `migration_map_v2.md` Registries A/B; presentation defects live in research §9/§10/§13/§23 (cognitive density, information timing, reading modes) — different owners, both real |
| A2 | ownership ≠ presentation | **CONFIRMED** | Same evidence as A1 |
| A3 | A presentation/reader-layer pass is NOT automatically a consequence of the migration | **PARTIALLY** | The **reader-mode design is in scope of the v2 architecture phase** (PLAN row v2-architecture: reader modes Learn → Build → Debug → Reference; foundation §6–§8) — i.e. stage 3 of the ratified migration order, *before* the switch. What is true: presentation-**compression execution** follows canonical stabilization and is not performed by the ownership slices themselves |
| A4 | Do not widen the current migration to treat the "wall" | **CONFIRMED** | Matches the migration-freeze discipline (v1 frozen; AGENTS.md scope discipline) |
| A5 | "v2 ownership first → затем reader/UX compression поверх стабилизированного canon" | **CONFIRMED** (with the A3 refinement) | Presentation-**model** = v2 architecture phase (in order); presentation-**compression** = post-stabilization slices |

## 4. Guardrail conflicts (explicit)

Proposals from the analyses that ratified repo law forbids or tempers:

1. **"Чистил бы очень агрессивно" (B3).** DEC-15 / hard fence #13 (Editorial Policy):
   5-point functional-load check, UNCLEAR ≠ delete, success ≠ word count; map §1:
   repetition is not automatically duplication, `UNKNOWN` never deleted; research §24
   classification precedes any disposition; research KI-14 is the recorded risk of
   exactly this aggression.
2. **Label-set reduction / language softening (B4, B12).** DEC-16 (fence #12): the
   Russian label set is guide prose; DEC-20 already ratified the strength vocabulary;
   fence #7 + `docs/components.md`: callout classes are a closed registry. Any change =
   owner content decision, not an editorial default.
3. **"Copy" removal (B6).** Shell UI, not content (§2); the buttons are functional
   (Clipboard API guard, pitfall #11).
4. **Volume planning by export counts.** §2: the stated numbers come from a partial
   English-labelled export; planning must use repo-derived counts.
5. **Layer/tier mechanics (B1).** Fence #2: `data-layer` / `data-layer-switch` /
   `class="layer-remark"` were removed in v8 by design. Presentation modes must be
   structural (reader paths + disclosure components), not per-block tier attributes.
   The `Collapsible` component (`docs/components.md` #5) is the sanctioned
   progressive-disclosure mechanism.

## 5. Durable findings → v2 architecture phase input (F1–F6)

Consumed only when the owner opens the phase (PLAN row v2-architecture); nothing here
is auto-executed:

- **F1 — Reader-mode specification.** Per mode (Learn / Build / Debug / Reference):
  entry point, default visibility, on-demand disclosure. Source: A3 refinement + B8.
  Strengthens the phase's acceptance criteria.
- **F2 — Presentation-disposition column.** Extend the matrix / Registry C rows with a
  presentation axis: `open / collapsible / reference-relocate / delete-candidate /
  canonical-link`. This *is* the "per-Parts redesign map" (B-final) — built on the
  existing 500-row inventory, not a new audit. Source: B16 + B-final.
- **F3 — Checklist triage rule.** Teaching vs decision-input vs validation. Reframe the
  Part 1 pre-build checklist as a build-profile decision input (it already is one
  structurally); reserve checkbox affordances for true validation moments (§9.3,
  §9.11). Source: B2.
- **F4 — Example tiering rule.** inline (no heading, no chip) vs worked (labelled).
  Source: B5.
- **F5 — Per-Part presentation micro-template.** Concept → Rule → Core example →
  ▸Why / ▸Common failure modes / ▸Edge cases / ▸Reference — pattern-catalog candidate.
  Source: B15 + the B1 micro-format.
- **F6 — Disclosure-component policy.** `<details class="interactive">`
  (`docs/components.md` #5; 16 existing usages) = the sanctioned progressive-disclosure
  mechanism; no new infrastructure, no v8-style tiers. Source: B7 + B10.

## 6. What was actually verified (this iteration)

- `BASE_COMMIT = e33917113032521d3b676ce9592c2010e91f7bdf` (iter 142);
  `git status --short` empty at start and at delivery.
- Counts (§2) re-derived by grep in this clone: `.callout.rule` 45 / `.callout.rec` 21 /
  `.callout.ex` 5; ПРАВИЛО 46 · РЕКОМЕНДАЦИЯ 21 · ИЛЛЮСТРАЦИЯ 36 · ШАБЛОН 16;
  `example-label` 52; «пример» (ci) 116 master / 161 canon; «чек-лист\|чеклист» 22 / 28;
  `WRONG\|CORRECT` 11; `<pre><code` 50; `<details` 16; `wc -l`: canon `part_*.md` 3806,
  canon all 5031, largest master file 1213.
- Structural checks: pre-build checklist (canon `part_01.md`, exactly 6 questions incl.
  Lorebook); `p9_one_change_rule` (glossary registry alias row); methodology disclaimer
  canonical + deferred pair (`part_01.md` §1.1 / `part_03.md` `[ref:]`); E03/E04
  complement notes (`part_02.md`); voice-isolation term across 12 canon files; Part 1 =
  5 sections; Part 4 = 11 sections (SPINE inventory claim); `lazy-loader.js` Copy-buttons
  block; `docs/components.md` #5 Collapsible + 16 master usages.
- Audits (doc-only battery — no production file touched, iter-131 doc-only precedent):
  `audit_canon_master_sync.py` **97/97 PASS** (exit 0) ·
  `audit_canon_master_drift.py --actionable-only` **159** actionable (baseline exact,
  exit 0) · parity **×6 PASS** (glossary / core-directives / token-budget / enneagram /
  diagnostics / voice) · `git diff --check` clean. No `pnpm build` / `pnpm test` run —
  nothing in `src/`, `data/`, or root fallbacks changed.

## 7. Verbatim source texts

Delivered in chat 2026-09-15; preserved **as received** (Russian). Chat delivery lost
some table markup inside Analysis B point 4 (rendered as run-together lines); preserved
as received, not repaired.

### 7.1 Analysis A — migration vs UX phasing

> **Не полностью.** Миграция решает **корневую архитектурную часть**, но не весь UX-дефект из этого текста.
>
> #### Что миграция реально решит
>
> Она как раз устраняет главную системную причину перегруза:
>
> > **одно знание → один canonical owner → остальные представления не являются отдельными источниками истины.**
>
> Это уберёт многократное существование одного правила в canon / master / prototype / extracts / runtime и снизит drift. То есть проблема **«один и тот же материал живёт в пяти местах и развивается независимо»** — это именно цель миграции.
>
> В этом смысле тезис файла про **canonical source для каждого правила** очень хорошо совпадает с тем, что мы сейчас делаем.
>
> #### Что миграция сама по себе НЕ решит
>
> Она не гарантирует, что пользователь будет видеть меньше шума.
>
> Например, вполне можно построить идеальную v2-архитектуру, где есть:
>
> **canonical rule → master implementation → generated/reference/UI**
>
> и при этом на странице всё равно оставить:
>
> `RULE → explanation → table → example → recommendation → cross-ref → checklist`
>
> То есть **ownership ≠ presentation**.
>
> Именно файл жалуется прежде всего на второй слой: документ одновременно ведёт себя как tutorial, reference, diagnostic tool и validation system.
>
> #### Поэтому я бы разделил результат так
>
> **Миграция отвечает на вопрос:**
>
> > «Где живёт истина и как не плодить конкурирующие копии?»
>
> **UX-реорганизация отвечает на вопрос:**
>
> > «Что пользователь должен увидеть сейчас, а что только при необходимости?»
>
> И второе пока **не является автоматически следствием первого**.
>
> #### Самый важный вывод
>
> Текст файла **не доказывает, что нужна ещё одна большая миграция**.
>
> Скорее он говорит:
>
> > **архитектурную миграцию мы делаем в правильном направлении; после неё потребуется отдельный presentation/reader-layer pass, чтобы progressive disclosure действительно проявился в UI.**
>
> Иначе получится **чистая внутренняя архитектура, но всё ещё перегруженный интерфейс**.
>
> #### В одной фразе
>
> **Да — миграция решает проблему дублей и ownership; нет — она сама по себе не решает проблему “стены документа”.**
>
> И я бы **не расширял текущую миграцию**, чтобы лечить эту стену. Это лучше оформить следующим отдельным этапом: **v2 ownership first → затем reader/UX compression поверх уже стабилизированного canonical content**.

### 7.2 Analysis B — 16-point presentation/overload diagnosis

> Да. После просмотра структуры файла и повторяющихся паттернов я бы сказал так: перегруз есть, но лечить его сокращением содержания нельзя. Основная проблема — не количество материала, а то, что один и тот же материал одновременно работает как учебник, справочник, спецификация, чекер и UI-эксплейнер.
>
> В файле 2816 строк; при этом повторяющиеся маркеры очень часты: RULE: — 45 раз, RECOMMENDATION: — 19, EXAMPLE — 139, ILLUSTRATION — 30, TEMPLATE — 24, а только варианты чек-листов/чеклистов встречаются десятки раз. Это уже сигнал, что читатель постоянно переключает режим восприятия.
>
> ##### Главный диагноз
>
> Я бы сформулировал проблему одним предложением:
>
> Сейчас документ не различает “что нужно знать”, “что нужно сделать”, “как понять”, “почему это так” и “что посмотреть, если нужен полный разбор”.
>
> Из-за этого возникает визуальный шум даже там, где содержание само по себе хорошее.
>
> Причём у вас уже есть очень правильная интуиция: таблица/визуализация должна давать быстрый ответ, а длинное объяснение не обязано постоянно находиться раскрытым рядом с ней.
>
> Например, вы прямо пишете, что таблица дополняет визуализацию и не дублирует её, но дальше снова идёт достаточно длинное текстовое объяснение того же принципа. Это повторяется в нескольких местах: Card Anatomy, Anchors, Embodiment, Voice hierarchy, SPINE mapping, диагностика.
>
> ##### 1. Я бы НЕ делал “короче”. Я бы сделал 3 слоя
>
> Это, на мой взгляд, самое важное изменение.
>
> **Слой A — Core**
>
> То, что читатель обязан увидеть.
>
> Здесь только:
>
> принцип;
> минимальное правило;
> короткий пример;
> куда идти дальше.
>
> Например:
>
> Anchor = Trigger → Action → Price
> Price must be immediate and observable.
>
> И всё.
>
> Не нужно тут же ещё раз рассказывать философию Price, типы Price, неправильный Price, историю появления Price и полный кейс.
>
> **Слой B — Explain**
>
> Раскрытие почему правило такое и как оно работает.
>
> Именно сюда я бы массово отправлял ваши нынешние:
>
> EXAMPLE;
> ILLUSTRATION;
> “почему”;
> альтернативы;
> edge cases;
> методологические пояснения;
> длинные walkthrough.
>
> То есть формат:
>
> Rule
> короткое правило
>
> ▸ Почему
> раскрывающийся блок
>
> ▸ Пример
> раскрывающийся блок
>
> ▸ Edge case
> раскрывающийся блок
>
> Это особенно хорошо работает для вашего документа, потому что он одновременно является и учебником, и справочником.
>
> **Слой C — Reference**
>
> То, что нужно не читать последовательно, а искать.
>
> Например:
>
> model tables;
> sampling parameters;
> anti-pattern catalog;
> symptom → diagnosis;
> test scenario matrix;
> appendix;
> glossary;
> compatibility tables.
>
> Сейчас часть этого материала визуально оформлена как будто читателю надо проходить его линейно. На самом деле это lookup-материал.
>
> ##### 2. Чек-листы действительно перегружены
>
> Здесь я с вами скорее согласен.
>
> Но я бы не уничтожил их полностью.
>
> Проблема не в checklist как таковом, а в том, что сейчас checklist используется для трёх разных функций:
>
> обучение;
> принятие решения;
> финальная проверка.
>
> Это надо развести.
>
> Например, текущий Pre-build checklist — 6 вопросов о модели, контексте, сложности, GHOST, CoT, Lorebook. Это больше похоже не на checklist, а на Decision Input.
>
> Его лучше назвать примерно:
>
> Choose your build profile
>
> а не checklist.
>
> И дать:
>
> 12B / 8K / Simple / 1 GHOST / no CoT / no Lorebook
>
> как быстрый путь.
>
> А сам длинный checklist спрятать.
>
> Настоящие чек-листы оставить только там, где есть действие
>
> Например:
>
> Pre-Deploy Validation
>
> Вот здесь checkbox оправдан, потому что человек реально должен пройти проверки перед deployment.
>
> То же самое для SPINE consistency, если это действительно рабочий инструмент проверки.
>
> А вот превращать каждую систему правил в чек-лист — не нужно.
>
> Например, вместо:
>
> ☐ GHOST → LIE
> ☐ LIE → FLAW
> ☐ FLAW → NEED
> ☐ NEED ← WANT
> ...
>
> можно прямо показать причинную цепочку:
>
> GHOST → LIE → FLAW → blocks NEED ↔ WANT
>
> и под ней:
>
> ▸ Validation criteria
>
> с раскрывающимися деталями.
>
> Сейчас чек-лист фактически повторяет уже объяснённую структуру SPINE.
>
> ##### 3. Самая большая проблема — не чек-листы, а повторение “Rule → explanation → example → re-rule”
>
> Вот это я бы чистил очень агрессивно.
>
> Типичный паттерн сейчас:
>
> RULE → explanation → table → example → another RULE → another example → recommendation → cross-ref
>
> Это очень дорого для внимания.
>
> Например, Voice Isolation неоднократно сообщает одну и ту же идею:
>
> linguistic voice → Examples/Greeting
> physical voice → Description/Embodiment
>
> Она появляется в общем правиле, потом в разграничении, потом в таблице, потом в 12B-specific rule, потом в WRONG/CORRECT, потом снова в пояснении.
>
> Здесь я бы сделал одно canonical rule, а всё остальное — раскрывающимся материалом.
>
> ##### 4. RULE, RECOMMENDATION, EXAMPLE, ILLUSTRATION у вас слишком много как визуальных титров
>
> Это ещё один источник мусора.
>
> Сам механизм полезен, но 45 RULE: превращают правило в визуальный фон.
>
> Я бы ввёл только четыре семантических типа:
>
> ТипЧто означает
>
> RULE — нельзя нарушать
> GUIDELINE — желательно
> EXAMPLE — демонстрация
> REFERENCE — справочная информация
>
> И убрал бы отдельный визуальный слой RECOMMENDATION, когда это просто обычный абзац.
>
> Например вместо:
>
> RECOMMENDATION:
> Каждый Example должен содержать минимум одну физическую реакцию...
>
> просто:
>
> Guideline: Every Example should contain at least one physical reaction.
>
> Так визуальная иерархия становится намного спокойнее.
>
> ##### 5. EXAMPLE у вас используется слишком широко
>
> 139 раз — это очень много.
>
> Но это не обязательно означает, что примеров слишком много.
>
> Скорее проблема в том, что любой кусок демонстрационного текста получает отдельный громкий заголовок.
>
> Получается:
>
> EXAMPLE
> пример
>
> EXAMPLE
> ещё пример
>
> EXAMPLE
> WRONG
>
> EXAMPLE
> CORRECT
>
> Я бы различал:
>
> inline example
>
> и
>
> deep example.
>
> Маленький пример:
>
> Anchor: lie → squints → jaw tension
>
> вообще не должен иметь заголовка.
>
> А большой worked example уже:
>
> Worked example — Elena
>
> Это сильно снизит шум.
>
> ##### 6. Copy — вообще убрать из пользовательского слоя
>
> Если это следствие экспорта/инструмента, это прямой кандидат на чистку.
>
> Copy 44 раза — это уже технический мусор, а не содержание.
>
> То же относится к кускам вроде:
>
> TEMPLATE
> Copy
>
> если это не реально интерактивный компонент.
>
> В финальной документации должен остаться:
>
> Template
>
> и непосредственно блок.
>
> ##### 7. Визуализация + текст: да, длинное описание стоит прятать
>
> Причём не всё подряд.
>
> Я бы использовал очень конкретное правило:
>
> Если визуализация отвечает на вопрос “что?”
> → основной текст должен быть минимальным.
>
> Если пользователь задаётся вопросом “почему?”
> → ▸ Why / rationale
>
> Если вопрос “как применить?”
> → ▸ How to use
>
> Если вопрос “что делать в edge case?”
> → ▸ Edge cases
>
> Это идеально ложится на ваш материал.
>
> Например SPINE сейчас имеет:
>
> диаграмму;
> определение;
> таблицу;
> отдельные GHOST/LIE/FLAW/NEED/WANT;
> полную цепочку;
> mapping;
> consistency checklist.
>
> Это хороший материал, но его не надо показывать как одну непрерывную стену.
>
> Я бы оставил открытыми только:
>
> SPINE → причинная диаграмма → одна каноническая карточка
>
> а всё остальное:
>
> ▸ Element definitions
> ▸ SPINE → Anchor mapping
> ▸ Validation
> ▸ Edge cases
>
> ##### 8. У вас есть ещё один структурный конфликт: Tutorial vs Reference
>
> Это, пожалуй, глубже, чем просто “много текста”.
>
> Оглавление показывает линейный tutorial:
>
> Part 1 → 2 → 3 → 4 → 5 → 6 → 7…
>
> Но внутри документа постоянно появляются:
>
> Cross-ref
> Part X
> Appendix
> Model table
> Diagnostics
> Full example
>
> То есть реально человек работает с документом двумя способами:
>
> Mode 1 — Learn
>
> Читает от начала до конца.
>
> Mode 2 — Build/debug
>
> Приходит с конкретной проблемой:
>
> Voice Leak
> → открыть диагностику
> → понять симптом
> → перейти к Voice Isolation
> → проверить Examples.
>
> Это надо признать архитектурно.
>
> Я бы прямо разделил навигацию:
>
> Learn path
> Build path
> Diagnose path
> Reference
>
> Тогда отпадёт необходимость постоянно объяснять читателю, куда ему идти.
>
> ##### 9. Самое полезное изменение — “canonical source” для каждого правила
>
> Сейчас одно правило может жить в пяти местах.
>
> Например:
>
> Voice only in Examples/Greeting
>
> имеет:
>
> базовый принцип;
> Voice Isolation;
> 12B-specific rule;
> example;
> anti-pattern;
> diagnostics;
> model checklist.
>
> Это нормально только если они ссылаются на canonical definition, а не повторяют её.
>
> Я бы ввёл внутреннее правило документа:
>
> One rule → one canonical definition. Everywhere else: summarize + link.
>
> Например:
>
> Voice Isolation
> Canonical rule: linguistic voice lives in Examples/Greeting.
> → details
>
> А в Model Checklist:
>
> Voice → Examples/Greeting.
> → Voice Isolation
>
> Не надо повторно объяснять всё правило.
>
> ##### 10. Что я бы спрятал под spoiler почти наверняка
>
> Однозначно:
>
> подробные методологические disclaimers;
> расширенные rationale;
> альтернативные варианты;
> длинные WRONG/CORRECT;
> edge cases;
> дополнительные worked examples;
> implementation details;
> model-specific нюансы, если они не влияют на текущий выбор;
> длинные объяснения визуализаций;
> glossary-like определения, если термин уже введён.
>
> Методология с процентами — хороший пример. Сейчас disclaimer появляется и в начале, и в Voice Isolation. Его можно один раз сделать canonical note и дальше давать маленькую ссылку [methodology].
>
> ##### 11. Что я бы НЕ прятал
>
> Не стоит делать spoiler из того, что пользователь должен принимать как операционное правило.
>
> Например:
>
> Anchor = T→A→P
> Voice → Examples/Greeting
> Psychology → Description
> Anti-godmoding
> Price must be immediate
> One Change Rule
>
> Это должно быть открыто.
>
> Иначе человек вынужден раскрывать 10 блоков просто чтобы понять основу системы.
>
> ##### 12. Я бы изменил язык самого текста
>
> Сейчас язык местами очень “инструкционный” и рубленый:
>
> RULE
> RECOMMENDATION
> Cross-ref
> EXAMPLE
> TEMPLATE
> Copy
> ILLUSTRATION
>
> Это создаёт впечатление IDE/manual, а не хорошо спроектированной исследовательской документации.
>
> Я бы перешёл к более естественной схеме:
>
> Rule
>
> одно предложение.
>
> Why
>
> одно короткое объяснение.
>
> Example
>
> пример.
>
> Details
>
> раскрываемое содержание.
>
> И вместо:
>
> RECOMMENDATION:
>
> чаще просто:
>
> Guideline: ...
>
> ##### 13. Ещё один важный перегруз — слишком много “метаязыка”
>
> Например:
>
> “этот раздел показывает…”
> “таблица ниже дополняет…”
> “как показано выше…”
> “подробности → Part X”
> “полный разбор →…”
>
> Таких переходов должно быть меньше.
>
> Документ начинает объяснять сам себя, вместо того чтобы объяснять предмет.
>
> Особенно заметно в местах вроде:
>
> “Таблица ниже — конкретные примеры… (дополняет E03, не дублирует описания).”
>
> Если таблица действительно не дублирует — достаточно её поставить. Не обязательно объяснять пользователю архитектуру таблицы.
>
> ##### 14. Я бы пересобрал начало документа
>
> Сейчас начало старается сразу сделать слишком много: показать философию, архитектуру, токены, базовые блоки, правила, примеры, критические ошибки и pre-build checklist.
>
> Я бы сделал начало гораздо жёстче:
>
> 1. What this guide does
>
> 2–3 предложения.
>
> 2. The 3 invariants
>
> Три главных правила.
>
> 3. Card anatomy
>
> Одна визуализация.
>
> 4. Choose a build profile
>
> Короткая таблица.
>
> 5. Build path
>
> 5 шагов.
>
> И всё.
>
> А “топ-3 ошибки”, подробный disclaimer, длинные объяснения и checklist — ниже/в раскрытии.
>
> Это резко улучшит первый экран.
>
> ##### 15. Что сделать с существующей структурой Parts
>
> Я бы не ломал Parts.
>
> У вас логическая декомпозиция в целом хорошая:
>
> foundations;
> Anchors;
> Voice;
> SPINE;
> Psychology;
> CoT;
> Assembly;
> Anti-patterns;
> Diagnostics;
> Full examples.
>
> Проблема не в этой структуре.
>
> Проблема в том, что внутри Part одновременно находятся tutorial, reference и validation material.
>
> То есть я бы не перестраивал книгу полностью.
>
> Я бы сделал внутри каждого Part один и тот же микрошаблон:
>
> ## Concept
> 1–3 paragraphs
>
> ## Rule
> canonical rule
>
> ## Core example
> 1 example
>
> ▸ Why it works
> ▸ Common failure modes
> ▸ Edge cases
> ▸ Reference / model-specific details
>
> И тогда весь документ начинает ощущаться как единая система.
>
> ##### 16. Моё итоговое решение по “мусору”
>
> Я бы классифицировал так:
>
> Удалить
>
> Copy, дублирующие пояснения, повторные формулировки одного и того же правила, служебные фразы о визуализациях.
>
> Свернуть
>
> RULE, RECOMMENDATION, большие EXAMPLE, повторные cross-ref, методологические disclaimers.
>
> Спрятать
>
> rationale, edge cases, extended examples, model-specific nuance, diagnostic detail, appendix material.
>
> Оставить открытым
>
> core rule, основной пример, decision point, минимальную таблицу, navigation.
>
> Перенести в reference
>
> sampling, model capability tables, anti-pattern catalog, diagnostics matrix, glossary.
>
> И самое главное
>
> Мне кажется, вы правильно чувствуете, что “всё чек-листами” — плохой UX.
>
> Для такого документа гораздо лучше модель:
>
> Principle → Rule → Example → optional depth
>
> а не:
>
> Principle → checklist → another checklist → validation checklist → decision tree → another table
>
> Плюс я бы держал очень жёсткое правило:
>
> Не повторять информацию только потому, что она находится в другом формате.
>
> Таблица уже сказала — не нужно ещё раз проговаривать таблицу абзацем.
> Диаграмма уже показала причинную связь — не нужно повторять её списком, если список ничего нового не добавляет.
> Checklist уже проверяет правило — не нужно перед checklist снова переписывать тот же набор условий.
>
> При этом не надо удалять содержательное объяснение. Нужно превратить его в progressive disclosure: основной путь остаётся очень плотным, а глубина доступна именно там, где она нужна.
>
> Именно такой подход, на мой взгляд, позволит сохранить практически весь ваш исследовательский материал, но убрать ощущение “стены документа”. Это особенно важно здесь, потому что сам текст уже явно различает краткие визуальные представления и расширенные объяснения; значит, эту архитектуру не надо изобретать заново — её надо последовательно довести до UI.
>
> Если идти дальше, я бы сделал следующим шагом не переписывание всего документа, а конкретную карту редизайна: что оставить open / что spoiler / что удалить / что сделать canonical / куда перенести, прямо по Parts 01–10. Это даст намного более точную картину объёма работы.


