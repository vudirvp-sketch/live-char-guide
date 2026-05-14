# AP Reference Inventory — Live Character Guide v8

> **NOTE:** Updated post-Phase 2: AP-16 renumbered to AP-15, Part 7 split into 7A/7B

> **Version:** 9.0.0 (Phase 0 creation)
> **Last Updated:** 2026-05-15
> **Purpose:** Complete inventory of all AP-numbered references across the repository. Essential for renumbering in Phase 2.3.

---

## Summary

| AP # | Name | Section ID | Severity |
|------|------|-----------|----------|
| AP-1 | Token Bloat | p8_ap1_token_bloat | Высокая |
| AP-2 | Missing Price | p8_ap2_missing_price | Высокая |
| AP-3 | Voice in Description | p8_ap3_voice_in_description | Высокая |
| AP-4 | GHOST в SP | p8_ap4_ghost_in_sp | Высокая |
| AP-5 | RepPen > 1.10 | p8_ap5_reppen_high | Средняя |
| AP-6 | No Anti-Godmoding | p8_ap6_no_anti_godmoding | Высокая |
| AP-7 | Presence Penalty > 0 | p8_ap7_presence_penalty | Средняя |
| AP-8 | GHOST без якорей | p8_ap8_ghost_no_anchors | Средняя |
| AP-9 | Broken SPINE | p8_ap9_spine_broken | Высокая |
| AP-10 | CoT Overload | p8_ap10_cot_overload | Средняя |
| AP-11 | Voice Bleed | p8_ap11_voice_bleed | Высокая |
| AP-12 | XML Malformed | p8_ap12_xml_malformed | Средняя |
| AP-13 | Lorebook Conflict | p8_ap13_lorebook_conflict | Средняя |
| AP-14 | Context Violation | p8_ap14_context_violation | Высокая |
| AP-15 | OCEAN Overload | p8_ap15_ocean_overload | Средняя |
| AP-15 | Nested Anchors | p8_ap15_nested_anchors | Средняя |

---

## File-by-File Reference Inventory

### src/master/part_01.html
| Line (approx) | AP Reference | Context |
|---------------|-------------|---------|
| ~181 | AP-6 | Link to anti-godmoding: `AP-6 → Part 8` |

### src/master/part_03.html
| Line (approx) | AP Reference | Context |
|---------------|-------------|---------|
| ~265 | AP-11 | Voice Bleed: `AP-11: Voice Bleed → Part 8` |
| ~364 | AP-11 | Voice Bleed: `AP-11 → Part 8` |

### src/master/part_05.html
| Line (approx) | AP Reference | Context |
|---------------|-------------|---------|
| ~30 | AP-15 | OCEAN golden rule violation = AP-15 |
| ~32 | AP-15 | Link: `AP-15: OCEAN Overload (Part 8)` |
| ~35 | AP-15 | Link: `AP-15: OCEAN Overload → Part 8` |

### src/master/part_06.html
| Line (approx) | AP Reference | Context |
|---------------|-------------|---------|
| ~33 | AP-10 | CoT rule: overload = AP-10 |
| ~171 | AP-10 | Warning: link `AP-10 в Part 8` |

### src/master/part_07a.html / part_07b.html
| Line (approx) | AP Reference | Context |
|---------------|-------------|---------|
| ~270 | AP-5 | RepPen never > 1.10 (AP-5) |
| ~272 | AP-7 | Presence Penalty = 0 (AP-7) |
| ~282 | AP-7 | Ollama/LM Studio hardcoded PP=0.7 (AP-7) |

### src/master/part_08.html
| Line (approx) | AP Reference | Context |
|---------------|-------------|---------|
| 27 | AP-1 | Overview table link |
| 28 | AP-2 | Overview table link |
| 29 | AP-3 | Overview table link |
| 30 | AP-4 | Overview table link |
| 31 | AP-5 | Overview table link |
| 32 | AP-6 | Overview table link |
| 33 | AP-7 | Overview table link |
| 34 | AP-8 | Overview table link |
| 35 | AP-9 | Overview table link |
| 36 | AP-10 | Overview table link |
| 37 | AP-11 | Overview table link |
| 38 | AP-12 | Overview table link |
| 39 | AP-13 | Overview table link |
| 40 | AP-14 | Overview table link |
| 41 | AP-15 | Overview table link |
| 42 | AP-15 | Overview table link |
| 50 | AP-1 | Section heading |
| 66 | AP-2 | Section heading |
| 73 | AP-3 | Section heading |
| 80 | AP-4 | Section heading |
| 91 | AP-5 | Section heading |
| 98 | AP-6 | Section heading |
| 109 | AP-7 | Section heading |
| 117 | AP-8 | Section heading |
| 129 | AP-9 | Section heading |
| 157 | AP-10 | Section heading |
| 177 | AP-11 | Section heading |
| 186 | AP-12 | Section heading |
| 207 | AP-13 | Section heading |
| 216 | AP-14 | Section heading |
| 224 | AP-15 | Section heading |
| 255 | AP-15 | Section heading |

### src/master/part_09.html
| Line (approx) | AP Reference | Context |
|---------------|-------------|---------|
| 56 | AP-5, AP-7 | Quick Check: RepPen/PP links |
| 76 | AP-5, AP-7 | Step 4: RepPen/PP fix |
| 100 | AP-2 | Symptom table: Missing Price |
| 101 | AP-9 | Symptom table: Broken SPINE |
| 102 | AP-5 | Symptom table: RepPen |
| 105 | AP-14 | Symptom table: Context violation |
| 123 | AP-3 | Decision tree: Voice Leak |
| 126 | AP-6 | Decision tree: No anti-godmoding |
| 127 | AP-15 | Decision tree: OCEAN overload |
| 128 | AP-5, AP-7 | Decision tree: RepPen/PP |

### docs/content_map.md
| Line | AP Reference | Context |
|------|-------------|---------|
| 124-139 | AP-1 through AP-15 | Full content ownership table for all 15 APs |

### docs/migration_map.md
| Line (approx) | AP Reference | Context |
|---------------|-------------|---------|
| 90 | AP-11 | Voice bleed mapping |
| 150-165 | AP-1 through AP-15 | Layer migration entries |
| 219 | AP-15 | Extended entry |
| 253 | AP-11 | Character replacement note |
| 366 | AP-15 | Nested Anchors |
| 394 | AP-15 | OCEAN cross-ref |
| 537 | AP-15 | Split/merge history |

### docs/transition_guide.md
| Line (approx) | AP Reference | Context |
|---------------|-------------|---------|
| 122 | AP-15 | Merge note |
| 123 | AP-1 through AP-15 | Sequential ordering note |

### docs/architecture.md
| Line (approx) | AP Reference | Context |
|---------------|-------------|---------|
| 345 | AP-15 | Split history |

### docs/user_journeys.md
| Line (approx) | AP Reference | Context |
|---------------|-------------|---------|
| 285 | AP-1 through AP-15 | Catalog reference |

### CHANGELOG.md
| Line (approx) | AP Reference | Context |
|---------------|-------------|---------|
| 35 | AP-15 | Extended entry update |
| 58 | AP-15 | Cross-ref note |
| 61 | AP-11 | Layer fix |
| 72 | AP-11 | Layer correction |

### parts/ (build output — mirrors src/master/)
Same AP references as in src/master/ files above. Will be regenerated on build.

---

## Phase 2 Impact Assessment

AP-15 (OCEAN Overload) was moved from Part 8 to Part 5 (Phase 2.2), and AP-16 was renumbered to AP-15 (completed):
- **Renumbering cascade:** AP-16 → AP-15 (completed)
- **Files requiring updates:**
  1. `src/master/part_08.html` — Remove AP-15 section, renumber AP-16→AP-15, update overview table
  2. `src/master/part_05.html` — Add OCEAN Warning callout
  3. `src/master/part_09.html` — Update AP-15 reference (now in Part 5), update AP-16→AP-15
  4. `docs/content_map.md` — Update AP-15 location, renumber AP-16→AP-15
  5. `docs/migration_map.md` — Update AP-15 and AP-16 entries
  6. `docs/transition_guide.md` — Update AP numbering notes
  7. `docs/architecture.md` — Update AP-15 history
  8. `data/glossary.json` — Update AP-15/16 references if any
  9. `README.md` — Update AP count note

---

*Inventory prepared for Live Character Guide v9 restructure — Phase 0*
