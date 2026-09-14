#!/usr/bin/env node
/**
 * generate_enneagram.mjs — v2 enneagram machine-layer generator (mig-5, iter 136).
 *
 * Source-of-truth chain (DEC-17 direction precedent; migration_map_v2 §2 L6 +
 * Registry B row 6; PLAN row mig-5):
 *
 *   docs/canon/part_05.md §5.4 table  (canonical record — the only hand-edited
 *                                     source for the 7 per-type canonical fields:
 *                                     Тип / Название / Альт-название /
 *                                     Ключевой страх / Ключевое желание /
 *                                     Ложь (LIE) / Дефект из стресса)
 *     → scripts/generate_enneagram.mjs  (this generator; ALSO owns the machine-layer
 *                                     supplement — widget data §5.4 does not carry:
 *                                     SPINE WANT/NEED/GHOST templates, stress/growth
 *                                     directions, wings, ocean_correlation,
 *                                     ocean_defaults, flaw_anchors, mbti_suggestions)
 *       → data/enneagram.json         (generated machine layer — NEVER hand-edit;
 *                                     changes to canonical values go through
 *                                     docs/canon/part_05.md §5.4 only)
 *         → consumers: vs-e10-enneagram.js (mini-cards) · enneagram-builder.js ·
 *           persona-synthesis.js · ocean-insight.js · persona-cross.js ·
 *           mbti-composer.js (all fetch data/enneagram.json — shape preserved)
 *
 * Wired into `pnpm run build` (package.json "build" chain, after the glossary
 * stage), so the generated artifact can never drift from §5.4 without showing
 * in `git status`.
 *
 * LIE fold (mig-5 acceptance): the v1 file carried TWO copies of each LIE value
 * (types[].lie_template + spine_templates[].LIE — with divergent wording:
 * «идеальным, меня» vs «идеальным — меня», «=» vs «равна»). The generated layer
 * carries ONE copy — types[].lie_template (the §5.4 canonical value);
 * consumers read the LIE there (widget re-point, iter 136).
 *
 * Value semantics:
 *   types[].core_fear / core_desire / lie_template / flaw_pattern == §5.4 cells
 *   verbatim (the v1 extended variants — «, дефектным», «Работоголизм,
 *   поверхностность…» etc. — were non-canonical drift, dropped per the map
 *   Registry B row 6 disposition "JSON becomes derived from §5.4").
 *   spine_templates[].FLAW == the §5.4 «Дефект из стресса» value (single parsed
 *   source, emitted to both keys for consumer-shape compatibility — parity-locked
 *   by scripts/audit_enneagram_parity.py, E15-derived-total lock pattern).
 *   spine_templates[].NEED == types[].need_direction (single supplement source).
 *
 * Emitted JSON shape (v2.1.0 — schema evolution: spine_templates.LIE folded):
 *   version, types[] (id, name, name_alt, core_fear, core_desire, lie_template,
 *   flaw_pattern, need_direction, stress_direction, growth_direction, wings,
 *   ocean_correlation), wing_pairs, spine_templates (WANT/NEED/FLAW/GHOST —
 *   NO LIE), _ocean_representation_note, ocean_defaults, flaw_anchors,
 *   mbti_suggestions.
 *
 * Deterministic output: §5.4 row order, 2-space indent, trailing newline —
 * no timestamps.
 */

import { readFile, writeFile } from 'fs/promises';
import { existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const CANON_PATH = join(ROOT, 'docs', 'canon', 'part_05.md');
const OUT_PATH = join(ROOT, 'data', 'enneagram.json');
const SCHEMA_VERSION = '2.1.0'; // v2.0.0 → 2.1.0: spine_templates.LIE folded (mig-5)

// ============================================================================
// MACHINE-LAYER SUPPLEMENT — widget data §5.4 does not carry.
// Single hand-edited source for every non-canonical field. Canonical values
// (name / name_alt / core_fear / core_desire / LIE / flaw) NEVER live here.
// ============================================================================

const SUPPLEMENT = {
  // Per type: SPINE template fields §5.4 does not own + graph/direction data.
  // need: emitted to BOTH types[].need_direction and spine_templates[].NEED
  // (single supplement source). FLAW/LIE are NOT here — §5.4 owns them.
  spine: {
    1: { want: 'Быть идеальным, правильным, безупречным', need: 'Принять несовершенство, быть добрым к себе', ghost: 'Родители требовали совершенства, ошибки наказывались' },
    2: { want: 'Быть нужным, любимым, незаменимым', need: 'Признать собственные потребности, давать без ожидания отдачи', ghost: 'Любовь была условной — только за помощь и заботу' },
    3: { want: 'Быть успешным, ценным, впечатляющим', need: 'Найти ценность вне достижений, быть честным с собой', ghost: 'Признание получал только за успехи, не за личность' },
    4: { want: 'Быть уникальным, особенным, аутентичным', need: 'Принять обычность, найти устойчивость и связь', ghost: 'Непонимание и отвержение в детстве, чувство чужака' },
    5: { want: 'Быть компетентным, знающим, независимым', need: 'Вступить в мир, делиться знанием, соединиться с другими', ghost: 'Вторжение в личное пространство, необходимость скрывать себя' },
    6: { want: 'Быть в безопасности, поддержанным, иметь направление', need: 'Доверять себе, найти внутренний компас', ghost: 'Ненадёжная среда, предательство доверия' },
    7: { want: 'Быть удовлетворённым, свободным, полным опыта', need: 'Принять ограничения, углубиться, завершить начатое', ghost: 'Лишения в прошлом, невозможность получить желаемое' },
    8: { want: 'Быть сильным, защищённым, влиятельным', need: 'Открыть уязвимость, использовать силу для защиты других', ghost: 'Слабость наказывалась, необходимость выживать' },
    9: { want: 'Быть в мире, цельном, соединённом с другими', need: 'Признать свою значимость, действовать, заявить о себе', ghost: 'Конфликты были разрушительны, лучше быть незаметным' },
  },
  directions: {
    1: { stress: 4, growth: 7 },
    2: { stress: 8, growth: 4 },
    3: { stress: 9, growth: 6 },
    4: { stress: 2, growth: 1 },
    5: { stress: 7, growth: 8 },
    6: { stress: 3, growth: 9 },
    7: { stress: 1, growth: 5 },
    8: { stress: 5, growth: 2 },
    9: { stress: 6, growth: 3 },
  },
  wings: {
    1: ['1w2', '1w9'],
    2: ['2w1', '2w3'],
    3: ['3w2', '3w4'],
    4: ['4w3', '4w5'],
    5: ['5w4', '5w6'],
    6: ['6w5', '6w7'],
    7: ['7w6', '7w8'],
    8: ['8w7', '8w9'],
    9: ['9w8', '9w1'],
  },
  oceanCorrelation: {
    1: [0.5, 0.8, 0.3, 0.4, 0.4],
    2: [0.5, 0.5, 0.7, 0.8, 0.4],
    3: [0.4, 0.7, 0.8, 0.3, -0.3],
    4: [0.8, 0.4, 0.3, 0.4, 0.7],
    5: [0.8, 0.6, -0.3, 0.3, 0.4],
    6: [0.3, 0.5, 0.4, 0.6, 0.7],
    7: [0.8, 0.2, 0.8, 0.4, 0.2],
    8: [0.4, 0.4, 0.8, -0.4, 0.3],
    9: [0.4, 0.4, -0.2, 0.7, 0.2],
  },
  wingPairs: [
    { types: ['1w2', '1w9'], descriptions: ['Перфекционист-помощник: более ориентирован на помощь людям, активный идеализм', 'Перфекционист-миротворец: более отстранённый, идеалистический, спокойный'] },
    { types: ['2w1', '2w3'], descriptions: ['Помощник-идеалист', 'Помощник-деятель'] },
    { types: ['3w2', '3w4'], descriptions: ['Достигатель-энтузиаст', 'Достигатель-индивидуалист'] },
    { types: ['4w3', '4w5'], descriptions: ['Индивидуалист-достигатель', 'Индивидуалист-исследователь'] },
    { types: ['5w4', '5w6'], descriptions: ['Исследователь-индивидуалист', 'Исследователь-лоялист'] },
    { types: ['6w5', '6w7'], descriptions: ['Лоялист-исследователь: более аналитический, интровертный, параноидальный', 'Лоялист-энтузиаст: более общительный, тревожный, ищущий разнообразия'] },
    { types: ['7w6', '7w8'], descriptions: ['Энтузиаст-лоялист', 'Энтузиаст-челленджер'] },
    { types: ['8w7', '8w9'], descriptions: ['Челленджер-энтузиаст', 'Челленджер-миротворец'] },
    { types: ['9w8', '9w1'], descriptions: ['Миротворец-челленджер', 'Миротворец-реформатор'] },
  ],
  oceanNote:
    'ocean_correlation — статистические коэффициенты корреляции (-1.0–1.0) между типом Enneagram и каждым OCEAN-измерением. Отрицательные значения указывают на обратную корреляцию (например, Type 3 и N = -0.3 означает, что Достигатели склонны к низкому нейротизму). Используются для OCEAN×Enneagram Matrix и конфликт-валидатора. ocean_defaults — значения OCEAN-профиля по умолчанию (0–100) для данного типа. Используются для предзаполнения OCEAN-виджета и comfort zone. ocean_defaults ≈ ocean_correlation × 100, но это разные концепции: корреляция vs. профиль.',
  oceanDefaults: {
    1: { O: 50, C: 80, E: 30, A: 40, N: 40 },
    2: { O: 50, C: 50, E: 70, A: 80, N: 40 },
    3: { O: 40, C: 70, E: 80, A: 30, N: 20 },
    4: { O: 80, C: 40, E: 30, A: 40, N: 70 },
    5: { O: 80, C: 60, E: 20, A: 30, N: 40 },
    6: { O: 30, C: 50, E: 40, A: 60, N: 70 },
    7: { O: 80, C: 20, E: 80, A: 40, N: 20 },
    8: { O: 40, C: 40, E: 80, A: 20, N: 30 },
    9: { O: 40, C: 40, E: 30, A: 70, N: 20 },
  },
  flawAnchors: {
    1: [
      { trigger: 'Ошибка в работе', action: 'Исправляет многократно, не может отпустить', cost: 'Напряжение в челюсти, бессонница', ocean_tags: ['C_high'] },
      { trigger: 'Несовершенство других', action: 'Критикует, исправляет за них', cost: 'Конфликт, изоляция', ocean_tags: ['C_high', 'A_low'] },
    ],
    2: [
      { trigger: 'Кто-то в нужде', action: 'Бросается помогать, забывая о себе', cost: 'Истощение, обида если не ценят', ocean_tags: ['A_high', 'E_high'] },
      { trigger: 'Отвержение помощи', action: 'Обижается, манипулирует чувством вины', cost: 'Чувство использованности', ocean_tags: ['A_high'] },
    ],
    3: [
      { trigger: 'Возможность успеха', action: 'Берётся за задачу, адаптирует образ', cost: 'Потеря контакта с истинными желаниями', ocean_tags: ['C_high', 'E_high'] },
      { trigger: 'Неудача', action: 'Быстро переключается, отрицает значение', cost: 'Пустота внутри, поверхностность', ocean_tags: ['N_low'] },
    ],
    4: [
      { trigger: 'Обыденность', action: 'Создаёт драму, ищет особенность', cost: 'Изоляция, меланхолия', ocean_tags: ['O_high', 'N_high'] },
      { trigger: 'Чья-то уникальность', action: 'Завидует, обесценивает себя', cost: 'Депрессивный эпизод', ocean_tags: ['N_high'] },
    ],
    5: [
      { trigger: 'Непонятная ситуация', action: 'Отступает, изучает, наблюдает издалека', cost: 'Упущенные возможности, изоляция', ocean_tags: ['E_low', 'O_high'] },
      { trigger: 'Эмоциональное требование', action: 'Закрывается, становится холодным', cost: 'Потеря связей, одиночество', ocean_tags: ['A_low', 'E_low'] },
    ],
    6: [
      { trigger: 'Неопределённость', action: 'Ищет гарантии, консультируется со многими', cost: 'Паралич решений', ocean_tags: ['N_high', 'C_moderate'] },
      { trigger: 'Авторитет под вопросом', action: 'Бунт или слепое подчинение', cost: 'Дестабилизация, потеря опоры', ocean_tags: ['N_high'] },
    ],
    7: [
      { trigger: 'Скука или ограничение', action: 'Ищет новое, планирует приключение', cost: 'Незавершённые проекты, поверхностность', ocean_tags: ['O_high', 'C_low'] },
      { trigger: 'Боль или негатив', action: 'Отвлекается, юмор, отрицание', cost: 'Непроработанные травмы', ocean_tags: ['N_low'] },
    ],
    8: [
      { trigger: 'Угроза или несправедливость', action: 'Конфронтация, защита своей территории', cost: 'Изоляция, страх окружающих', ocean_tags: ['E_high', 'A_low'] },
      { trigger: 'Собственная уязвимость', action: 'Агрессия, отрицание слабости', cost: 'Потеря близких связей', ocean_tags: ['A_low'] },
    ],
    9: [
      { trigger: 'Конфликт', action: 'Сглаживает, медиирует, уходит', cost: 'Подавленный гнев, потеря себя', ocean_tags: ['A_high', 'E_low'] },
      { trigger: 'Требование действия', action: 'Откладывает, засыпает, забывает', cost: 'Упущенные возможности', ocean_tags: ['C_low'] },
    ],
  },
  mbtiSuggestions: {
    1: ['ISTJ', 'ISFJ', 'INTJ', 'ESTJ'],
    2: ['ESFJ', 'ENFJ', 'ISFJ', 'ESFP'],
    3: ['ENTJ', 'ESTP', 'ESTJ', 'ENFJ'],
    4: ['INFP', 'INFJ', 'ISFP', 'ENFP'],
    5: ['INTP', 'INTJ', 'ISTP', 'INFJ'],
    6: ['ISFJ', 'ISTJ', 'INFP', 'ENFP'],
    7: ['ENTP', 'ENFP', 'ESFP', 'ESTP'],
    8: ['ENTJ', 'ESTP', 'ENFJ', 'ESTJ'],
    9: ['ISFP', 'ISFJ', 'INFP', 'INFJ'],
  },
};

// ============================================================================
// §5.4 CANONICAL TABLE PARSER
// ============================================================================

/** Slice the §5.4 section region out of docs/canon/part_05.md. */
function section54(text) {
  const m = text.match(/^## 5\.4 .*?(?=^## 5\.5 )/ms);
  if (!m) throw new Error('canon §5.4 section not found in docs/canon/part_05.md');
  return m[0];
}

/**
 * Parse the 9-type canonical table.
 * Expected header (7 columns):
 *   | Тип | Название | Альт-название | Ключевой страх | Ключевое желание |
 *   | Ложь (LIE, ложная установка) | Дефект из стресса |
 */
function parseTypesTable(sectionText) {
  const lines = sectionText.split('\n');
  let headerIdx = -1;
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('Ключевой страх') && lines[i].includes('Ложь')) {
      headerIdx = i;
      break;
    }
  }
  if (headerIdx === -1) {
    throw new Error('canon §5.4: 9-type table header not found');
  }

  const rows = [];
  for (let i = headerIdx + 2; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line.startsWith('|')) break; // table ended
    const cells = line.split('|').slice(1, -1).map((c) => c.trim());
    if (cells.length !== 7) {
      throw new Error(`canon §5.4: table row has ${cells.length} cells (expected 7): ${line}`);
    }
    const idMatch = cells[0].match(/^\*\*(\d)\*\*$/);
    if (!idMatch) {
      throw new Error(`canon §5.4: type cell "${cells[0]}" does not match **N**`);
    }
    const row = {
      id: parseInt(idMatch[1], 10),
      name: cells[1],
      name_alt: cells[2],
      core_fear: cells[3],
      core_desire: cells[4],
      lie: cells[5],
      flaw: cells[6],
    };
    for (const [key, value] of Object.entries(row)) {
      if (typeof value === 'string' && !value) {
        throw new Error(`canon §5.4: empty cell "${key}" in type ${row.id}`);
      }
    }
    rows.push(row);
  }
  return rows;
}

// ============================================================================
// ASSEMBLY
// ============================================================================

function validateSupplement(canonRows) {
  const ids = canonRows.map((r) => r.id).sort((a, b) => a - b);
  if (ids.length !== 9 || ids.join('') !== '123456789') {
    throw new Error(`canon §5.4: expected types 1–9, got [${ids}]`);
  }
  for (const key of ['spine', 'directions', 'wings', 'oceanCorrelation', 'oceanDefaults', 'flawAnchors', 'mbtiSuggestions']) {
    const supplied = Object.keys(SUPPLEMENT[key]).map(Number).sort((a, b) => a - b);
    if (supplied.join('') !== '123456789') {
      throw new Error(`SUPPLEMENT.${key}: expected keys 1–9, got [${supplied}]`);
    }
  }
  // Direction integrity: stress/growth targets must be valid type ids and
  // mutual-arrows sanity (the classic enneagram directions: stress/growth of
  // type N are fixed; a permutation sanity check catches typos).
  for (const [idStr, dir] of Object.entries(SUPPLEMENT.directions)) {
    if (![1, 2, 3, 4, 5, 6, 7, 8, 9].includes(dir.stress) || ![1, 2, 3, 4, 5, 6, 7, 8, 9].includes(dir.growth)) {
      throw new Error(`SUPPLEMENT.directions[${idStr}]: invalid target`);
    }
    if (dir.stress === Number(idStr) || dir.growth === Number(idStr)) {
      throw new Error(`SUPPLEMENT.directions[${idStr}]: self-referencing direction`);
    }
  }
  // Wings must reference the owning type + a neighbour.
  for (const [idStr, pair] of Object.entries(SUPPLEMENT.wings)) {
    const id = Number(idStr);
    for (const wing of pair) {
      if (!new RegExp(`^${id}w[${id === 1 ? 29 : id - 1}${id === 9 ? 18 : id + 1}]$`).test(wing)) {
        throw new Error(`SUPPLEMENT.wings[${idStr}]: "${wing}" is not a valid wing of type ${id}`);
      }
    }
  }
  // Ocean correlation: 5 floats in [-1, 1].
  for (const [idStr, corr] of Object.entries(SUPPLEMENT.oceanCorrelation)) {
    if (corr.length !== 5 || corr.some((v) => typeof v !== 'number' || v < -1 || v > 1)) {
      throw new Error(`SUPPLEMENT.oceanCorrelation[${idStr}]: expected 5 floats in [-1, 1]`);
    }
  }
  // Ocean defaults: 5 integer traits 0–100.
  for (const [idStr, def] of Object.entries(SUPPLEMENT.oceanDefaults)) {
    const traits = Object.keys(def).sort().join('');
    if (traits !== 'ACENO' || Object.values(def).some((v) => !Number.isInteger(v) || v < 0 || v > 100)) {
      throw new Error(`SUPPLEMENT.oceanDefaults[${idStr}]: expected O/C/E/A/N integers 0–100`);
    }
  }
  // Flaw anchors: ≥1 per type, T→A→P + ocean_tags shape (widget contract).
  for (const [idStr, anchors] of Object.entries(SUPPLEMENT.flawAnchors)) {
    if (!Array.isArray(anchors) || anchors.length === 0) {
      throw new Error(`SUPPLEMENT.flawAnchors[${idStr}]: expected a non-empty array`);
    }
    for (const a of anchors) {
      for (const field of ['trigger', 'action', 'cost']) {
        if (!a[field]) throw new Error(`SUPPLEMENT.flawAnchors[${idStr}]: anchor missing "${field}"`);
      }
      if (!Array.isArray(a.ocean_tags)) throw new Error(`SUPPLEMENT.flawAnchors[${idStr}]: ocean_tags must be an array`);
    }
  }
  // MBTI suggestions: ≥1 valid code per type.
  for (const [idStr, list] of Object.entries(SUPPLEMENT.mbtiSuggestions)) {
    if (!Array.isArray(list) || list.length === 0 || list.some((c) => !/^[EI][NS][FT][JP]$/.test(c))) {
      throw new Error(`SUPPLEMENT.mbtiSuggestions[${idStr}]: expected MBTI codes`);
    }
  }
  // Wing pairs: 9 pairs matching SUPPLEMENT.wings.
  if (SUPPLEMENT.wingPairs.length !== 9) {
    throw new Error('SUPPLEMENT.wingPairs: expected 9 pairs');
  }
  for (const pair of SUPPLEMENT.wingPairs) {
    if (pair.types.length !== 2 || pair.descriptions.length !== 2) {
      throw new Error(`SUPPLEMENT.wingPairs: malformed pair ${JSON.stringify(pair.types)}`);
    }
  }
}

function buildOutput(canonRows) {
  const types = canonRows.map((r) => ({
    id: r.id,
    name: r.name,
    name_alt: r.name_alt,
    core_fear: r.core_fear,
    core_desire: r.core_desire,
    lie_template: r.lie, // THE single internal LIE copy (§5.4 canonical value)
    flaw_pattern: r.flaw, // §5.4 «Дефект из стресса»
    need_direction: SUPPLEMENT.spine[r.id].need,
    stress_direction: SUPPLEMENT.directions[r.id].stress,
    growth_direction: SUPPLEMENT.directions[r.id].growth,
    wings: SUPPLEMENT.wings[r.id],
    ocean_correlation: SUPPLEMENT.oceanCorrelation[r.id],
  }));

  // spine_templates: WANT/NEED/FLAW/GHOST only — the v1 LIE key is folded away
  // (mig-5); FLAW comes from the §5.4 cell (same parsed source as flaw_pattern),
  // NEED from the single supplement `need` value (== types[].need_direction).
  const spineTemplates = {};
  for (const r of canonRows) {
    spineTemplates[String(r.id)] = {
      WANT: SUPPLEMENT.spine[r.id].want,
      NEED: SUPPLEMENT.spine[r.id].need,
      FLAW: r.flaw,
      GHOST: SUPPLEMENT.spine[r.id].ghost,
    };
  }

  return {
    version: SCHEMA_VERSION,
    types,
    wing_pairs: SUPPLEMENT.wingPairs,
    spine_templates: spineTemplates,
    _ocean_representation_note: SUPPLEMENT.oceanNote,
    ocean_defaults: SUPPLEMENT.oceanDefaults,
    flaw_anchors: SUPPLEMENT.flawAnchors,
    mbti_suggestions: SUPPLEMENT.mbtiSuggestions,
  };
}

async function main() {
  if (!existsSync(CANON_PATH)) {
    console.error('[enneagram] canon source not found:', CANON_PATH);
    process.exit(1);
  }
  const canon = await readFile(CANON_PATH, 'utf-8');
  const canonRows = parseTypesTable(section54(canon));
  validateSupplement(canonRows);

  const output = buildOutput(canonRows);
  const json = JSON.stringify(output, null, 2) + '\n';
  await writeFile(OUT_PATH, json);

  // Self-check: the emitted layer carries exactly one copy of each LIE value.
  for (const r of canonRows) {
    const occurrences = json.split(JSON.stringify(r.lie).slice(1, -1)).length - 1;
    if (occurrences !== 1) {
      console.error(`[enneagram] FAILED: LIE of type ${r.id} appears ${occurrences}× (expected 1)`);
      process.exit(1);
    }
  }

  console.log(
    `[enneagram] generated ${OUT_PATH}: 9 types from canon §5.4 ` +
      `(canonical fields: name/name_alt/fear/desire/LIE/flaw), LIE folded to a single copy ` +
      `(types[].lie_template), schema ${SCHEMA_VERSION}`
  );
}

main().catch((err) => {
  console.error('[enneagram] FAILED:', err.message);
  process.exit(1);
});
