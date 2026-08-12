# 11 — Master Feature Implementation Index

> The single master task list for all future Primary-inspired Primidian feature development.
> This document converts the research corpus (documents 01–10) and the Phase Implementation
> Prompts into ONE-FEATURE-AT-A-TIME implementation tasks with permanent, stable IDs.
>
> **THIS IS A PLANNING DOCUMENT ONLY.**
> It authorises no source changes by itself. Each future session implements exactly ONE task,
> then stops.
>
> Status of every task in this document: **NOT STARTED**.

---

## How To Use This Document

1. A future implementation prompt names a task ID, e.g. `Task 1.4 — Bold Modifier`.
2. Read the task entry below.
3. Read every research document listed under that task's **References**.
4. Inspect only the relevant `src/` files and the current `src/01-settings.css`.
5. Implement ONLY that task using the per-session workflow in [Implementation Workflow](#implementation-workflow).
6. Build, validate, test, check protected systems, commit — then stop.

Task IDs are **permanent**. Do not renumber tasks. New work must never reuse or split an
existing ID.

---

## Master Task Table

| Task ID | Phase | Feature | Provenance | User Tag | Risk | Difficulty | Dependencies | Status |
|---|---|---|---|---|---|---|---|---|
| 0.1 | Phase 0 | Style Settings Reorganization | New Primidian design (re-org) | None | Low–Medium | Medium | None | NOT STARTED |
| 1.1 | Phase 1 | Font Feature Settings | Primary-inspired | [NEW — from Primary] | Low | Small | 0.1 | NOT STARTED |
| 1.2 | Phase 1 | Per-Heading Font Family | Primary-inspired | [NEW — from Primary] | Low | Small | 0.1 | NOT STARTED |
| 1.3 | Phase 1 | Link Underline Controls | Primary-inspired | [NEW — from Primary] | Low | Small | 0.1 | NOT STARTED |
| 1.4 | Phase 1 | Bold Modifier | Primary-inspired | [NEW — from Primary] | Low | Small | 0.1 | NOT STARTED |
| 1.5 | Phase 1 | Non-Markdown Link Colors | Primary-inspired | [NEW — from Primary] | Low | Small | 0.1 | NOT STARTED |
| 1.6 | Phase 1 | Editor Gutter Colors | Primary-inspired | [NEW — from Primary] | Low | Small | 0.1 | NOT STARTED |
| 1.7 | Phase 1 | Font Size Tiers | Primary-inspired | [NEW — from Primary] | Low | Medium | 0.1 | NOT STARTED |
| 1.8 | Phase 1 | Font Weight Tiers | Primary-inspired | [NEW — from Primary] | Low | Medium | 0.1 | NOT STARTED |
| 2.1 | Phase 2 | Editor Background Patterns | Primary-inspired | [NEW — from Primary] | Medium | Medium | 0.1 | NOT STARTED |
| 2.2 | Phase 2 | Active Line Highlighting | Primary-inspired | [NEW — from Primary] | Medium | Medium | 0.1 | NOT STARTED |
| 2.3 | Phase 2 | Per-Heading Text Alignment | Primary-inspired | [NEW — from Primary] | Low–Medium | Small | 0.1, 1.2 | NOT STARTED |
| 2.4 | Phase 2 | Per-Heading Line Height | Primary-inspired | [NEW — from Primary] | Low–Medium | Small | 0.1, 1.2 | NOT STARTED |
| 2.5 | Phase 2 | Highlight Combinations | Primary-inspired | [NEW — from Primary] | Medium | Medium | 0.1 | NOT STARTED |
| 3.1 | Phase 3 | Status Bar Slide-Out Style | Primary-inspired | [NEW — from Primary] | Medium | Medium | 0.1 | NOT STARTED |
| 3.2 | Phase 3 | Ribbon Slide-Out on Hover | Primary-inspired | [NEW — from Primary] | Medium | Medium | 0.1 | NOT STARTED |
| 3.3 | Phase 3 | File Header Hover-Reveal | Primary-inspired | [NEW — from Primary] | Medium | Medium | 0.1 | NOT STARTED |
| 3.4 | Phase 3 | Note Embed Per-Side Border | Primary-inspired | [NEW — from Primary] | Medium | Medium | 0.1 | NOT STARTED |
| 4.1 | Phase 4 | Progress Bar Customization | Primary-inspired | [NEW — from Primary] | Medium | Large | 0.1 | NOT STARTED |
| 4.2 | Phase 4 | Simplified Folder Colors (6) | Simplified from Primary | [NEW — simplified from Primary] / [NEW — simplified] | High | Large | 0.1 | NOT STARTED |
| 4.3 | Phase 4 | Additional Task Types (incremental) | Primary-inspired | [NEW — from Primary] | High | Large | 0.1 | NOT STARTED |
| 5.1 | Phase 5 | Graph View Colors | Primary-inspired | [NEW — from Primary] + Experimental | High | Medium | 0.1, DOM investigation | NOT STARTED |
| 5.2 | Phase 5 | Canvas Colors | Primary-inspired | [NEW — from Primary] + Experimental | High | Medium | 0.1, DOM investigation | NOT STARTED |
| 5.3 | Phase 5 | Per-Heading Border (4 Sides) | Primary-inspired | [NEW — from Primary] + Experimental | High | Large | 0.1 | NOT STARTED |
| 5.4 | Phase 5 | Per-Heading Background | Primary-inspired | [NEW — from Primary] + Experimental | Medium | Medium | 0.1, per-heading vertical-align toggle (unmet) | NOT STARTED |

> **Tagging note escalated for 4.2:** document 08 applies `[NEW — simplified from Primary]` to
> `Folder Color Style` and `[NEW — simplified]` to `Folder Color 1-6`, while the enclosing
> `File Explorer` subcategory is tagged `[NEW — from Primary]`. All three labels are preserved in
> the task entry.

---

## Global Rules

These rules apply to every task in this index, every session, every commit.

1. **One feature at a time.** A session implements exactly one task and nothing else. Never
   "implement a whole phase" or combine unrelated tasks.
2. **Stable task IDs.** Task IDs are permanent. Never renumber, merge, or split them. Future
   prompts reference only these IDs.
3. **`theme.css` is a build output.** Never hand-edit it. Edit `src/` and run the build.
4. **The Primidian Directive.** Every themeable value is a CSS custom property declared at
   `body`, `.theme-dark` or `.theme-light`, consumed only via `var()` at the point of use.
   Zero functional `!important`.
5. **Token tiers.** Tier-1 primitives (`--primidian-c-*`) live in `src/tokens/` ONLY and must
   never be referenced elsewhere. New settings write Tier-2/Tier-3 tokens and consumers use
   `var()`.
6. **No structural assumptions.** A component's rendering depends only on the element that
   semantically IS that component — never on an ancestor's tag, class, or box model.
7. **Performance.** No `transition: all`, no `@import`, no `:has()` on `.cm-line`.
   Animation must use compositor-friendly properties (`transform`, `opacity`) with Primidian's
   duration/easing tokens, and must respect `prefers-reduced-motion` (primidian's default
   behavior, with off-ramps documented in `07-Animation-Architecture.md`).
8. **Research docs are frozen reference material.** Never modify documents 01–10, the
   `Phase Implementation Prompts.md` file, or `Primary.css` / `Obsidianite.css`.
9. **One feature, one commit.** Implement → build → validate → test → inspect `git diff` →
   commit the task independently. Never bundle unrelated work into a commit.
10. **Do not copy Primary internals.** No malformed transition lists, no margin-animating
    popups, no `nth-child` accent rotation, no bundled fonts, no `transition: all`, no
    flat-color architecture. Reimplement capabilities clean-room using Primidian architecture.
11. **When the research documents disagree**, the task entry records the disagreement
    explicitly (see the "Difficulty / Risk" and "Feature Description" sections of affected
    tasks). Do not silently resolve it.
12. **Investigation-first for experimental work.** Any task tagged Experimental follows the
    investigation gate defined in its Phase section: `INVESTIGATE → PLAN → IMPLEMENT → TEST`,
    and "investigated; not safe to ship yet" is a successful outcome.

---

## Feature Tag System

### Canonical user-facing tags

Primidian displays small provenance/status tags beside settings sections. The ONLY recognised
user-facing tag labels are:

| Label | Meaning |
|---|---|
| `Experimental` | Feature is experimental / architecture-sensitive / shipped with known compatibility risk. (Existing — proven by the Glow System badge architecture.) |
| `NEW — from Primary` | Capability genuinely newly introduced into Primidian, adapted from Primary. |
| `NEW — simplified from Primary` | Primary capability deliberately reduced/rebuilt in a simplified Primidian form. |
| `NEW — simplified` | Simplified feature whose label document 08 specifies as `[NEW — simplified]`. |

**Do NOT** convert internal/planning annotations into user-facing badges: `[UNCHANGED]`,
`[EXPANDED]`, `[REORGANIZED]`, developer migration notes, or "mentioned in research" status
are documentation classifications only.

**Tag only newly imported capabilities.** Existing Primidian features do not receive tags merely
because the research mentioned them. A feature that extends an existing category receives a tag
only for the genuinely new capability (see per-task notes).

### What is tagged and where

- Tags attach at Style Setting **section/subcategory headings**, not to individual settings rows.
- A feature may carry **two** tags (e.g. `NEW — from Primary` + `Experimental`) when it is both
  newly imported and experimental — required for all Phase 5 tasks.

### Reference implementation (already proven)

The Glow System's "Experimental" badge is the reference architecture:

```
.css-settings-manager
    .setting-item-heading[data-id="..."]
        .setting-item-name::after
```

with the label injected via:

```
content: "Experimental";
```

This avoids putting literal HTML into Style Settings title/description strings. The current
implementation draws on Primidian tokens (`--primidian-accent-muted`, `--primidian-accent`,
`--primidian-border`, `--primidian-radius-pill`, `--primidian-font-weight-semibold`) and uses
`color-mix(...)` for the badge background.

### Requirements for future provenance tags

The master implementation index defines that future provenance tags:

1. MUST use CSS pseudo-elements (`::after`) or the same proven DOM-based mechanism.
2. MUST NOT inject literal HTML into Style Settings title/description strings.
3. MUST use Primidian theme tokens.
4. MUST work in Dark and Light Mode.
5. MUST adapt appropriately to accent changes.
6. MUST NOT glow.
7. MUST NOT create layout shifts.
8. SHOULD use a reusable attribute/id/class mapping rather than one-off CSS per feature.
9. MUST allow multiple distinct tag labels where the roadmap requires them (e.g. Phase 5).
10. MUST remain visually consistent with the existing Experimental badge.

### Future generalisation (design only — do NOT implement yet)

The eventual implementation should generalise the existing `primidian-glow → Experimental`
mechanism into a reusable badge/tag system supporting labels:

```
Experimental
NEW — from Primary
NEW — simplified from Primary
NEW — simplified
```

Implement it as ONE reusable mechanism (a shared token-driven rule keyed off a
section→label mapping), not one-off CSS per section. Do not implement this generalised system
as part of any individual feature task unless that task's own requirements demand it.

---

## Blockquote Protection — ABSOLUTE RULE

**DO NOT MODIFY THE EXISTING BLOCKQUOTE IMPLEMENTATION.**

Frozen scope (untouchable by unrelated feature work):

- `src/components/57-blockquotes.css`
- existing blockquote tokens
- existing blockquote variants
- `.HyperMD-quote` selectors
- `.HyperMD-quote-*` selectors
- Reading Mode blockquote selectors
- Live Preview blockquote selectors
- existing Blockquote presets
- existing Blockquote glow behavior
- existing Blockquote Style Settings

Existing frozen presets:

- **Simple**
- **Boxy**
- **Minimal**
- **Fade**

### Special case — when a feature genuinely needs Blockquote visual behavior

If a future task requires Blockquote-specific behavior NOT already covered, it MUST NOT modify
the frozen presets. Instead its task plan must say:

> "Implement this as a NEW Blockquote preset/variant."

The new preset is added alongside Simple / Boxy / Minimal / Fade and must explicitly identify:

- proposed new preset name
- why a new preset is necessary
- what behavior differs
- which existing selectors/variants can be reused
- what new tokens/settings are needed
- how the new preset avoids modifying existing presets

If a feature can be implemented without touching Blockquotes, it MUST avoid Blockquote changes
entirely.

**Status for this index:** none of the 25 tasks below requires Blockquote specificity. Every
task's Blockquote obligation is to leave the frozen system byte-identical (verified by build and
regression checks). The Blockquote special-case rule applies only if a future task is added that
cannot comply.

---

## Other Protected Systems

The same preservation principle applies to every finished/sensitive system. A task may touch a
protected system ONLY when the feature specifically requires it (and that requirement must be
documented in the task entry). Default posture for every task: **do not modify**.

Global protected systems list:

- **Glow System** (`src/systems/82-glow.css`, Settings, UI Glow, all engines)
- **Gradient System** (`src/systems/80-gradients.css`)
- **Animation/Motion System** (`src/systems/81-motion.css`, its toggles, keyframes, tokens)
- **Dividers** (`src/components/51-dividers.css`, variants, tokens)
- **Tabs** (`src/ui/32-tabs.css`, tab motion)
- **Code Blocks** (`src/components/…code…`, Line Numbers, Syntax Colors)
- **Callouts**
- **Blockquotes** (see above)
- **Checkboxes/Task List Kanban compatibility** (`src/compat/95-compat-task-list-kanban.css`)
- **Colours architecture and core tokens** (`src/tokens/10–15`)
- **Mobile** (`src/platform/90-mobile.css`)
- **Build system and settings validation** (`build.mjs`)

Each task lists the specific protected systems it must test and leave unchanged.

---

## Phase 0 — Style Settings Reorganization

### Phase summary

| Field | Value |
|---|---|
| **Purpose** | Move the current Style Settings hierarchy to the proposed organization before any new features land, so every later task places settings in its FINAL home. |
| **Roadmap source** | Not a numbered roadmap phase in `09`; defined as **Phase 0** in `Phase Implementation Prompts.md` (§ "One extra prompt") using the structure of `08`. |
| **Risk profile** | Low–Medium. No behavior changes; risk is confined to accidentally dropping a setting, changing a default, or breaking Style Settings parsing. |
| **Tasks in execution order** | 0.1 |
| **Phase-level dependencies** | None at start; this phase **blocks every other phase** (all tasks place settings per this reorganized structure). |
| **Important constraints** | Organization ONLY. No new features, no removals, no behavior changes, no defaults changed, no selector/token changes, no visual changes, no new badges. |
| **Protected systems** | ALL. This phase touches only `src/01-settings.css` structure. |
| **Phase-level notes** | Document 10 open question #3 ("Settings reorganization: before or after adding new settings?") is answered here: it is Phase 0, executed first. |

### Task 0.1 — Style Settings Reorganization

**Task ID:** 0.1 (Phase 0)

**Feature Name:** Style Settings Reorganization

**Phase:** Phase 0

**Priority:** Prerequisite (not Tier-classified in `09`; organizational foundation defined in `Phase Implementation Prompts.md` and `08`)

**Source / Provenance:** New Primidian design (re-organization of existing settings only — no feature imported from Primary)

**User-facing tag:** None

**Primary References:**

- `08-Proposed-Primidian-Settings-Organization.md` — entire document. "Proposed Primidian Structure" (§3), "Migration Map" (§4), "Settings Preservation Checklist" (§7). Defines the target hierarchy, exact subcategory naming, and the mandate to preserve ALL ~120 settings.
- `04-Primidian-Style-Settings.md` — entire document. The authoritative inventory of the ~120 settings being moved; source of the "current structure" tree in `08` §1.
- `05-Style-Settings-Comparison.md` — § "GAP ANALYSIS". Context for why reorganization matters (scattered content categories).
- `09-Primary-Feature-Roadmap.md` — "RECOMMENDED IMPLEMENTATION ORDER" and "DEPENDENCY GRAPH". Establishes that later phases build on a settled settings layout.
- `10-Primary-Primidian-Master-Analysis.md` — §5.3 "Settings Organization" and §9 Open Question #3. States the reorganization preserves all ~120 settings and adds a new "Editor & Markdown" L1.
- Supplementary (non-corpus) source: `Phase Implementation Prompts.md` — "PHASE 0 — STYLE SETTINGS REORGANIZATION ONLY" section. Defines Phase 0's exact scope, special cases, and validation requirements.

**Feature Description:**

Primidian's 13 top-level categories scatter content settings (Headings, Dividers, Links, Code, Callouts, Blockquotes, Tags, Tables…) across the panel. Document 08 proposes collapsing content into a new **Editor & Markdown** L1, grouping interface chrome under an expanded **Interface**, and keeping the signature systems (Gradient, Glow, Animations) as L1. This task performs ONLY the reorganization: same settings, same IDs, same defaults, same behavior — new homes.

Primary does not perform this reorganization; it is a Primidian-native restructuring decision grounded in Primary's cleaner `Notes and Files` grouping (document 08 §6.1–6.3).

**Implementation Requirements:**

- Reorganize only `src/01-settings.css` YAML structure (section/heading nesting).
- Do NOT add, remove, duplicate, or rename settings.
- Do NOT change defaults, descriptions (beyond whitespace/format), types, or IDs — unless a typo-fix is strictly required, in which case record it explicitly in the task report.
- Do NOT touch CSS selectors, tokens, or any `src/` file other than `01-settings.css`.
- Do NOT add any provenance badges (existing badges, e.g. the Glow System `Experimental` heading badge, must remain functional).
- Target final high-level structure (from `08` §3.2), used by ALL later tasks:

```
About & Guide
Colours
Typography        → Fonts | Font Sizes | Font Weights | Font Features | Readability
Interface         → General | Workspace | File Header | Ribbon | Status Bar | File Explorer
Editor & Markdown → Headings | Text Emphasis | Links | Blockquotes | Callouts | Lists
                    | Checkboxes & Tasks | Tables | Tags | Code | Dividers | Embeds & Properties
Gradient System
Glow System
Animations
Plugin Compatibility
Advanced          → General | Graph View | Canvas
```

- Special cases mandated by Phase 0 prompt: Inline Code + Code Blocks → `Editor & Markdown → Code`; Headings → `Editor & Markdown → Headings`; Dividers → `Editor & Markdown → Dividers`; Bold/Italic/Highlight → `Editor & Markdown → Text Emphasis`; Blockquotes → `Editor & Markdown → Blockquotes`; Checkboxes & Tasks → `Editor & Markdown → Checkboxes & Tasks`; Tables/Tags/Lists/Embeds & Properties → their proposed homes.

**Style Settings Destination:**

```
Top-level category: (reorganizes all current L1 categories; see Migration Map in 08 §4)
Subcategory:        (per 08 §3.2 tree above)
Setting(s):         ALL ~120 existing settings, unchanged, in their new homes
```

(For the 12-18 feature tasks that follow, the per-task "Style Settings Destination" sections already assume this Phase 0 layout.)

**Protected Existing Systems:** everything — this task is structural-only.

**Dependencies:**

- Depends on: none.
- Blocks: every task in Phases 1–5 (all place settings into the reorganized tree). Tasks 1.x, 2.x, 3.x, 4.x, 5.x all list `0.1` as a dependency.

**Difficulty / Risk:**

- Difficulty: Medium (many settings to move carefully; must not break YAML parsing or overrides).
- Risk: Low–Medium. The risk is data-loss (dropped/duplicated settings) and breaking user overrides if the migration is sloppy; mitigated by the pre/post verification checklist in `08` §7 and the Phase 0 validation block.
- Documents agree: `08` §7 lists all ~120 settings as preserved; `10` §5.3 confirms intent.

**Testing Checklist:**

- Style Settings renders every section/subcategory heading correctly in the new order
- Every one of the ~120 settings still present — none lost, none duplicated
- Every setting ID unchanged
- Every default unchanged
- "Restore Default" works per setting
- No orphaned or misplaced settings
- Existing Glow `Experimental` heading badge still renders
- Dark/Light unaffected (should be trivially true — no CSS changes)
- Build passes and `theme.css` diff shows no visual rule changes (only reordering of the settings block)

**Subtasks:**

- **0.1.1 — Inventory & baseline**: snapshot current L1/L2/L3 structure, counts, all IDs and defaults (from `src/01-settings.css`).
- **0.1.2 — Map every current setting to its target** using the `08` §4 Migration Map.
- **0.1.3 — Rebuild `01-settings.css` structure**: create the `Editor & Markdown` L1; expand `Interface`; regroup content categories.
- **0.1.4 — Verify settings preservation**: every setting present, IDs and defaults unchanged, no duplicates/orphans.
- **0.1.5 — Verify headings render** and existing badges (Glow Experimental) still work.
- **0.1.6 — Build** (`node build.mjs`), fix parse errors if any.
- **0.1.7 — Diff review of `theme.css`**: confirm only settings-block reordering, zero visual rule changes.
- **0.1.8 — Restore Default spot-checks** and report old→new mapping table.

**Acceptance Criteria:**

- The Style Settings UI presents the `08` §3.2 hierarchy.
- All ~120 settings survive with unchanged IDs and defaults.
- No visual or behavioral CSS change anywhere.
- Build passes.
- No new badges introduced; existing badges functional.

---

## Phase 1 — Quick Wins

### Phase summary

| Field | Value |
|---|---|
| **Purpose** | Implement all eight Tier-1 (High Value / Low Risk) additive features. |
| **Roadmap source** | `09: TIER 1 — HIGH VALUE / LOW RISK` and `RECOMMENDED IMPLEMENTATION ORDER → Phase 1: Quick Wins (Tier 1)`. |
| **Risk profile** | All eight are Risk LOW, purely additive. No architectural disruption. |
| **Tasks in execution order** | 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8 |
| **Phase-level dependencies** | Task 0.1 (settled settings homes). Within the phase the tasks are independent — they may be committed in any order but should retain the listed IDs. |
| **Important constraints** | Defaults must preserve current appearance. No fonts bundled. No breakage of existing typography/link/editor systems. |
| **Protected systems** | Typography base tokens, Links sweep system, Code/Inline Code, Code Blocks Line Numbers, Glow, Dividers, Blockquotes, Callouts, reduced-motion/animations. |
| **Phase-level notes** | Portability doc (`06` Phase A) lists the same eight features as "quick wins / HIGH portability / LOW risk". Document 10 §8.1 confirms all eight are Low risk. |

### Task 1.1 — Font Feature Settings

**Task ID:** 1.1 (Phase 1)

**Feature Name:** Font Feature Settings

**Phase:** Phase 1 (Roadmap Tier 1.1)

**Priority:** High Value / Low Risk

**Source / Provenance:** Primary-inspired (direct adaptation — new capability in Primidian)

**User-facing tag:** `[NEW — from Primary]`

**Primary References:**

- `03-Primary-Style-Settings.md` — "Interface → Typography → Font Features". Documents Primary's 3 settings (Interface/Text/Monospace Font's Feature Settings), their types (`variable-text`) and exact OpenType defaults for each font.
- `05-Style-Settings-Comparison.md` — Typography table: "Font feature settings — MISSING" in Primidian.
- `06-Primary-Feature-Portability.md` — "HIGH PORTABILITY … Font Feature Settings": purely additive, 3 new settings, Risk LOW.
- `08-Proposed-Primidian-Settings-Organization.md` — §3.2 "Typography → Font Features [NEW — from Primary]" with Interface/Text/Monospace Font Features. Defines final placement and tag.
- `09-Primary-Feature-Roadmap.md` — TIER 1.1. "What Primidian currently does: nothing"; 3 new settings; Risk LOW; visual impact Medium.
- `10-Primary-Primidian-Master-Analysis.md` — §6.1 (`--primidian-font-feature-interface/text/monospace` tokens) and §7.1 (settings YAML with full Primary default feature lists). Open question #6: whether to match Primary's defaults or use simpler ones.

**Feature Description:**

Lets power users enable/disable OpenType features (`calt`, `ss03`, `cv05`, `zero`, …) per font (interface, text, monospace) without editing CSS. Primidian currently exposes none. This is an **adaptation** — a clean-room reimplementation of the capability, not a copy of Primary's CSS. Default values must preserve the current appearance; document 10 flags (Open Question #6) whether defaults should equal Primary's or be a simpler Primidian-appropriate set — resolve toward "preserve current appearance" per the Phase 1 prompt constraint.

**Implementation Requirements:**

- Style Settings: 3 `variable-text` settings — Interface, Text, Monospace Font's Feature Settings.
- Tokens: `--primidian-font-feature-interface`, `--primidian-font-feature-text`, `--primidian-font-feature-monospace` (declared in `src/tokens/`, Style Settings `variable-text` IDs matching).
- Selectors/consumers: apply `font-feature-settings: var(...)` to the interface, text/body, and monospace typography contexts respectively.
- Scope strictly per font — must not leak into code, inline code, UI controls, icons, headings, metadata, or plugin UI unless intended.
- Default behavior: preserve current rendering (document the chosen default set and why in the task report).
- Reduced motion: N/A (no animation). Dark/Light: N/A (typographic, theme-independent).

**Style Settings Destination:**

```
Top-level category: Typography
Subcategory: Font Features
Setting(s): Interface Font's Feature Settings,
            Text Font's Feature Settings,
            Monospace Font's Feature Settings
```
(Per `08` §3.2, where the subcategory header carries the tag.)

**Protected Existing Systems:** base Typography tokens, Code/Inline Code typography, headings, Links, Glow, Dividers, Blockquotes, Callouts, animations/reduced-motion.

**Dependencies:**

- Depends on: Task 0.1.
- Blocks: none documented by research.

**Difficulty / Risk:**

- Difficulty: Small. Risk: LOW (purely additive) — `06` and `09` agree.
- Scope: 3 settings + 3 token declarations + 3 consumer rules.
- DOM dependency: none beyond the three font contexts.
- Compatibility risk: low (font-feature is well supported). Mobile: none. Performance: none.

**Testing Checklist:**

- Dark Mode / Light Mode: identical typography appearance (feature lists are theme-independent)
- Reading Mode and Live Preview both consume the text feature settings
- Interface chrome (titlebar, sidebar, settings) reflects interface feature settings; monospace in code mirrors its feature settings
- Ensure no surprising change to code, inline code, icons, headings, metadata
- "Restore Default" returns the documented default feature strings
- Style Settings renders the 3 controls correctly

**Subtasks:**

- **1.1.1 — Add Style Settings** (3 `variable-text` entries with IDs `primidian-font-feature-*`).
- **1.1.2 — Declare tokens** in `src/tokens/` per document 10 §6.1.
- **1.1.3 — Wire consumers** (interface/text/monospace contexts) via `var()`.
- **1.1.4 — Set defaults preserving current appearance** (document the choice re: open question #6).
- **1.1.5 — Add provenance badge** `[NEW — from Primary]` on the Font Features section heading.
- **1.1.6 — Build / validate** (`node build.mjs` — `variable-*` id ↔ `--` declaration cross-check must pass).
- **1.1.7 — Regression test** protected systems.

**Acceptance Criteria:**

- Three settings appear under Typography → Font Features with the badge.
- Default state is visually identical to pre-feature rendering.
- Each feature list applies only to its font context (verified in Reading Mode, Live Preview, UI, code).
- Build passes; no protected system changed.

### Task 1.2 — Per-Heading Font Family

**Task ID:** 1.2 (Phase 1)

**Feature Name:** Per-Heading Font Family

**Phase:** Phase 1 (Roadmap Tier 1.2)

**Priority:** High Value / Low Risk

**Source / Provenance:** Primary-inspired (adaptation — new capability in Primidian)

**User-facing tag:** `[NEW — from Primary]`

**Primary References:**

- `03-Primary-Style-Settings.md` — "Notes and Files → Heading 1-6 → Font Family" (per-heading `variable-text`).
- `05-Style-Settings-Comparison.md` — Headings table: "Per-heading font family — MISSING".
- `06-Primary-Feature-Portability.md` — "HIGH PORTABILITY … Per-Heading Font Family": simple token addition, 6 new settings, Risk LOW.
- `08-Proposed-Primidian-Settings-Organization.md` — §3.2 "Editor & Markdown → Headings → Heading 1–6". The per-heading level sections are the final home (alongside the existing per-heading colour/size/weight/spacing/transform).
- `09-Primary-Feature-Roadmap.md` — TIER 1.2. 6 new settings (one per heading level); Risk LOW; visual impact HIGH.
- `10-Primary-Primidian-Master-Analysis.md` — §6.1 (`--primidian-h1-font` … tokens). Dependency graph: per-heading font family feeds Phase 2 (supports 2.3 / 2.4).

**Feature Description:**

Allows each heading level (H1–H6) to use a distinct font family. Primidian currently renders all headings in the text font. This is an **adaptation** — new additive per-heading controls; defaults preserve current appearance (`inherit`/text font). Because it establishes the per-heading level token/consumer pattern, it also lays infrastructure for Phase 2's per-heading alignment and line-height tasks.

**Implementation Requirements:**

- Style Settings: 6 `variable-text` settings (one per heading level) or equivalent token-driven controls following existing Primidian heading control style.
- Tokens: `--primidian-h1-font` … `--primidian-h6-font` (declared in `src/tokens/`), default matching current behavior (the text font / `inherit`).
- Selectors: extend the existing per-heading token consumers in `src/components/50-headings.css` — do NOT duplicate heading CSS.
- Live Preview caution: target the actual heading DOM so ordinary editor text is unaffected (per Phase 1 prompt).
- Reading Mode + Live Preview must both be correct.
- No fonts bundled/downloaded; no external dependencies.

**Style Settings Destination:**

```
Top-level category: Editor & Markdown
Subcategory: Headings → Heading 1 … Heading 6
Setting(s): (per heading level) Font Family
```
(Per `08` §3.2 heading-level sections.)

**Protected Existing Systems:** heading style variants, heading underline/accent bar, heading gradients, Typography base tokens, Glow, Dividers, Blockquotes, Callouts, animations.

**Dependencies:**

- Depends on: Task 0.1.
- Blocks: Task 2.3 (Per-Heading Text Alignment) and Task 2.4 (Per-Heading Line Height) — per the `09` dependency graph ("Per-heading font family ─── Phase 2 (Content)") they build on the same per-heading infrastructure.

**Difficulty / Risk:**

- Difficulty: Small. Risk: LOW (purely additive) — `06` and `09` agree.
- Scope: 6 settings + 6 tokens + 6 consumer extensions.
- DOM dependency: heading element targeting in both Reading Mode and Live Preview (CM6). Risk of accidentally styling editor text — mitigated by scoping to heading elements only.
- Mobile/performance: none.

**Testing Checklist:**

- All six levels (H1–H6) in Reading Mode
- All six levels in Live Preview; ordinary editor paragraphs unaffected
- Default (all levels = current font) is visually identical to pre-feature
- Gradient/all-caps/letter-spacing heading modifiers still apply on top of the chosen family
- Long headings wrap correctly; light/dark identical; Restore Default; badge renders

**Subtasks:**

- **1.2.1 — Add Style Settings** (6 per-heading font controls).
- **1.2.2 — Declare `--primidian-hN-font` tokens** with current-appearance defaults.
- **1.2.3 — Connect H1–H6 consumers** in headings component (Reading + Live Preview).
- **1.2.4 — Preserve defaults** (text font / inherit).
- **1.2.5 — Add provenance badge** on the Headings section.
- **1.2.6 — Test Reading Mode** + **1.2.7 — Test Live Preview** (paragraph unaffected).
- **1.2.8 — Build / validation.**

**Acceptance Criteria:**

- 6 settings present under Editor & Markdown → Headings → Heading N with badge.
- Each heading level independently selectable; default rendering unchanged.
- Reading Mode and Live Preview both correct; editor text untouched.
- Build passes; protected systems untouched.

### Task 1.3 — Link Underline Controls

**Task ID:** 1.3 (Phase 1)

**Feature Name:** Link Underline Controls

**Phase:** Phase 1 (Roadmap Tier 1.3)

**Priority:** High Value / Low Risk

**Source / Provenance:** Primary-inspired (adaptation — extends existing Link system)

**User-facing tag:** `[NEW — from Primary]`

**Primary References:**

- `01-Primary-Animation-Forensics.md` — §5.2 "Links". Behavioural context: link normal→hover color/text-decoration transitions and pressed opacity, underlying the underline styling surface.
- `03-Primary-Style-Settings.md` — "Notes and Files → Link → All Links": Underline Offset (2px), Underline Thickness (1.5px), Underline Opacity (22%), Remove Link Underline toggle, pressed-opacity.
- `05-Style-Settings-Comparison.md` — Links table: offset/thickness/opacity/remove-underline all MISSING in Primidian.
- `06-Primary-Feature-Portability.md` — "HIGH PORTABILITY … Link Underline Controls": extends existing link underline tokens; 3 new settings; Risk LOW.
- `08-Proposed-Primidian-Settings-Organization.md` — §3.2 "Editor & Markdown → Links". Final home for new link controls (alongside existing Link Style / colours / sweep settings).
- `09-Primary-Feature-Roadmap.md` — TIER 1.3. 3 new settings; Risk LOW; subtle visual impact.
- `10-Primary-Primidian-Master-Analysis.md` — §4 Phase 1 list and §8.1 Low-risk list.

**Feature Description:**

Adds fine control over link underline appearance (offset, thickness, opacity) and underline removal — complementing, not replacing, Primidian's sweep animation link style. **Adaptation/simplification**: Primidian's sweep-based links stay intact; these controls govern the underline primitive. Defaults must keep the current appearance (the Phase 1 prompt: "Default behavior must remain visually compatible").

**Implementation Requirements:**

- Style Settings: offset, thickness, opacity (3 `variable-text`/numeric controls); consider a remove-underline toggle only if it does not re-implement the existing sweep system.
- Tokens: reuse existing link underline/accent tokens (`--primidian-link-internal-accent`, `--primidian-link-external-accent`, sweep tokens); add new underline geometry tokens as needed in `src/tokens/`.
- Selectors: apply to the markdown link underline element in Reading Mode AND Live Preview; must not remove existing link colors.
- Hover state and the sweep style must remain functional; visited state only if currently supported.

**Style Settings Destination:**

```
Top-level category: Editor & Markdown
Subcategory: Links → All Links
Setting(s): Link Underline Offset, Link Underline Thickness, Link Underline Opacity
```
(Per `08` §3.2 Links block.)

**Protected Existing Systems:** Links sweep style + existing link tokens, link colors, Inline Code, Glow, Dividers, Blockquotes, Callouts, Animations.

**Dependencies:**

- Depends on: Task 0.1.
- Blocks: none.

**Difficulty / Risk:**

- Difficulty: Small. Risk: LOW (extends existing system) — `06`, `09`, `10` agree.
- Scope: 3 settings + token additions + link consumer adjustments.
- DOM dependency: link element in Reading Mode and Live Preview (CM6).
- Compatibility/mobile/performance: low (no animation introduced).

**Testing Checklist:**

- Internal, external, unresolved links
- Reading Mode and Live Preview
- Hover state; sweep style co-existence; link colours unchanged
- Light/Dark; Restore Default; Style Settings rendering

**Subtasks:**

- **1.3.1 — Add Style Settings** (3 controls under Links → All Links).
- **1.3.2 — Add/extend underline tokens**.
- **1.3.3 — Wire Reading Mode consumer**; **1.3.4 — Wire Live Preview consumer**.
- **1.3.5 — Preserve defaults** visually compatible with current design.
- **1.3.6 — Add provenance badge** on the Links section.
- **1.3.7 — Build / validate**; **1.3.8 — Regression** links + protected systems.

**Acceptance Criteria:**

- 3 controls under Editor & Markdown → Links → All Links with badge.
- Default state matches current appearance; sweep styling intact.
- Reading Mode + Live Preview consistent; link colours untouched.
- Build passes.

### Task 1.4 — Bold Modifier

**Task ID:** 1.4 (Phase 1)

**Feature Name:** Bold Modifier

**Phase:** Phase 1 (Roadmap Tier 1.6 — note: execution order places it 4th in Phase 1)

**Priority:** High Value / Low Risk

**Source / Provenance:** Primary-inspired (adaptation — new setting)

**User-facing tag:** `[NEW — from Primary]`

**Primary References:**

- `03-Primary-Style-Settings.md` — "Interface → Typography → Font Weight → Bold Modifier" (`variable-number`, default 200, "Added to Normal for certain bold UI components").
- `05-Style-Settings-Comparison.md` — Typography table: "Bold modifier — MISSING".
- `06-Primary-Feature-Portability.md` — "Bold modifier: Addend … new setting + token", HIGH portability, Risk LOW.
- `08-Proposed-Primidian-Settings-Organization.md` — §3.2 "Typography → Font Weights → Bold Modifier [NEW]". (Subcategory header `Font Weights [NEW — from Primary]`.)
- `09-Primary-Feature-Roadmap.md` — TIER 1.6. 1 new setting + token; Risk LOW; subtle impact.
- `10-Primary-Primidian-Master-Analysis.md` — §6.1 (`--primidian-bold-modifier: 200`), §8.1 Low risk.

**Feature Description:**

Adds a configurable addend applied on top of the normal weight for bold UI/components. Primidian currently uses a fixed bold weight. This is an **adaptation** — a single additive token/setting that refines bold rendering. Must NOT replace the global font-weight architecture, distort headings, or change UI typography outside the documented bold contexts.

**Implementation Requirements:**

- Style Settings: 1 `variable-number` "Bold Modifier".
- Token: `--primidian-bold-modifier` (default 200 per research; verify it preserves current appearance).
- Consumer: the existing bold/`strong`/weighted UI rules reference `calc(var(--primidian-font-weight) + var(--primidian-bold-modifier))` where appropriate — applied in the correct contexts only.
- Verify interplay: normal markdown bold, bold in links, bold in headings, bold in blockquotes, bold in callouts (content-level bold must continue to render identically; no structural/blockquote selector changes).
- Reading Mode + Live Preview.

**Style Settings Destination:**

```
Top-level category: Typography
Subcategory: Font Weights
Setting(s): Bold Modifier
```
(Per `08` §3.2.)

**Protected Existing Systems:** base Typography tokens and font-weight architecture, heading weights, code/inline-code weights, Glow, Dividers, Blockquotes, Callouts, Animations.

**Dependencies:**

- Depends on: Task 0.1.
- Blocks: none.

**Difficulty / Risk:**

- Difficulty: Small. Risk: LOW (single setting) — `06`, `09`, `10` agree.
- Scope: 1 setting + 1 token + consumer adjustments.
- DOM dependency: bold/strong elements across views. Potential conflict with existing typography rules — the prompt explicitly says avoid selector conflicts.

**Testing Checklist:**

- Bold in body text, links, headings, blockquotes, callouts
- Reading Mode + Live Preview
- Default = current appearance; heading/UI weights unchanged
- Light/Dark; Restore Default; badge placement

**Subtasks:**

- **1.4.1 — Add Style Settings** (Bold Modifier under Typography → Font Weights).
- **1.4.2 — Add `--primidian-bold-modifier` token**.
- **1.4.3 — Connect bold consumers** via `calc()` without replacing architecture.
- **1.4.4 — Preserve defaults**.
- **1.4.5 — Add provenance badge**.
- **1.4.6 — Test bold contexts** (incl. blockquotes/callouts content).
- **1.4.7 — Build / validate**; **1.4.8 — Regression.**

**Acceptance Criteria:**

- Setting under Typography → Font Weights with badge; altering it changes bold weight in intended contexts only.
- Default rendering identical to pre-feature; heading/UI weights untouched.
- Build passes.

### Task 1.5 — Non-Markdown Link Colors

**Task ID:** 1.5 (Phase 1)

**Feature Name:** Non-Markdown Link Colors

**Phase:** Phase 1 (Roadmap Tier 1.7 — execution order places it 5th)

**Priority:** High Value / Low Risk

**Source / Provenance:** Primary-inspired (adaptation — new capability)

**User-facing tag:** `[NEW — from Primary]`

**Primary References:**

- `03-Primary-Style-Settings.md` — "Notes and Files → Link → Non-markdown Links" (color + hover color).
- `05-Style-Settings-Comparison.md` — Links table: "Non-markdown link color — MISSING".
- `06-Primary-Feature-Portability.md` — "Non-markdown link colors: 2 new settings only", HIGH, Risk LOW.
- `08-Proposed-Primidian-Settings-Organization.md` — §3.2 "Editor & Markdown → Links" (final home).
- `09-Primary-Feature-Roadmap.md` — TIER 1.7. 2 new settings; Risk LOW.
- `10-Primary-Primidian-Master-Analysis.md` — §4 (Phase 1) and §8.1.

**Feature Description:**

Lets users distinguish links that live outside note markdown (UI/interface links) from in-note links with dedicated colours. Primidian currently applies identical colours to all links. Adaptation — an additive colour pair; the existing markdown link system (internal/external/unresolved styling, hover) is preserved. The Phase 1 prompt requires verifying the actual Obsidian DOM context for "non-markdown" links rather than guessing selectors.

**Implementation Requirements:**

- Style Settings: 2 `variable-themed-color` settings (color + hover color) for non-markdown links.
- Tokens: matching `--primidian-*` tokens declared per the token cascade (theme-dark + theme-light as appropriate).
- Selectors: verified against real Obsidian DOM (Reading Mode, Live Preview, UI surfaces) — target ONLY the genuinely non-markdown link contexts.
- Preserve internal/external/unresolved link styling + hover + sweep.
- Use Primidian colour tokens; no arbitrary colours.

**Style Settings Destination:**

```
Top-level category: Editor & Markdown
Subcategory: Links → Non-markdown Links
Setting(s): Non-Markdown Links Colour, Non-Markdown Links Colour (Hover)
```

**Protected Existing Systems:** Links sweep/style, link colour system (internal/external/unresolved), Inline Code, Glow, Dividers, Blockquotes, Callouts, Animations.

**Dependencies:**

- Depends on: Task 0.1.
- Blocks: none.

**Difficulty / Risk:**

- Difficulty: Small. Risk: LOW (additive) — `06`, `09`, `10` agree.
- Scope: 2 settings + 2 tokens + targeted consumer rules.
- DOM dependency: identification of the non-markdown link context is the main risk; the prompt mandates verification before implementation.

**Testing Checklist:**

- Non-markdown/UI link color applies only where intended
- Internal/external/unresolved markdown links unchanged
- Hover colour works; sweep intact
- Reading Mode + Live Preview; Light/Dark; Restore Default

**Subtasks:**

- **1.5.1 — Verify non-markdown link DOM** (observe/verify context).
- **1.5.2 — Add Style Settings** (2 colour controls under Links → Non-markdown Links).
- **1.5.3 — Declare colour tokens** (dark/light per token architecture).
- **1.5.4 — Wire targeted consumers**.
- **1.5.5 — Add provenance badge**.
- **1.5.6 — Test markdown link systems unchanged**.
- **1.5.7 — Build / validate**; **1.5.8 — Regression.**

**Acceptance Criteria:**

- 2 controls under Editor & Markdown → Links → Non-markdown Links with badge.
- Non-markdown links use the configured colours; all markdown link styling unchanged.
- Build passes.

### Task 1.6 — Editor Gutter Colors

**Task ID:** 1.6 (Phase 1)

**Feature Name:** Editor Gutter Colors

**Phase:** Phase 1 (Roadmap Tier 1.8 — execution order places it 6th)

**Priority:** High Value / Low Risk

**Source / Provenance:** Primary-inspired (adaptation — new capability in the editor, distinct from code-block line numbers)

**User-facing tag:** `[NEW — from Primary]`

**Primary References:**

- `03-Primary-Style-Settings.md` — "Interface → Editor": Gutter Number Text Color and Active Line Gutter Number Text Color.
- `04-Primidian-Style-Settings.md` — §10.1 "Code Blocks → Line Numbers": Primidian's existing line-number colour system (scoped to code blocks) — the reference for what editor-gutter colours must NOT re-implement.
- `05-Style-Settings-Comparison.md` — "Interface → Editor — MISSING" (gutter colours).
- `06-Primary-Feature-Portability.md` — "Editor gutter colors: Medium, editor line number CSS". Phase A quick-win list includes "Editor gutter colors".
- `08-Proposed-Primidian-Settings-Organization.md` — §3.2 "Interface → Workspace". Editor chrome settings (Editor Background…, Active Line Highlighting) live here; editor gutter colours are placed as sibling Workspace settings. Document 08 does not name a "Gutter" subcategory explicitly — see placement note below.
- `09-Primary-Feature-Roadmap.md` — TIER 1.8. 1 new setting; Risk LOW.
- `10-Primary-Primidian-Master-Analysis.md` — §4 and §8.1.

**Placement note (explicit disagreement-safe):** document 08 defines `Interface → Workspace` as the home for editor-chrome settings but does not literally name gutter-colour settings. This task places "Editor Gutter Colours" there (adjacent to Active Line Highlighting, per the Phase 1 prompt's "EDITOR" grouping) and flag the placement in the task report.

**Feature Description:**

Makes the editor's line-number gutter (CodeMirror 6 editor gutter — NOT code-block line numbers) configurable, including a distinct active-line number colour. The Phase 1 prompt is strict: the feature must be scoped to the real editor/gutter DOM, verified against CM6 selectors before implementation, and must not style generic borders/backgrounds. **Adaptation** — a leaner, editor-scoped version of Primary's two gutter colours.

**Implementation Requirements:**

- Style Settings: at minimum 1 new setting for the active-line gutter number colour (Roadmap: "1 new setting"); reuse/maintain the existing editor line-number colour path for the rest. Do not create redundant duplicates of the code-block line-number system.
- Tokens: follow existing line-number tokens' architecture.
- Selectors: verified real CM6 gutter selectors (line-number gutter, active line gutter) — obey the build rule banning `:has()` on `.cm-line` and avoid `transition: all`.
- Live Preview must be tested carefully; ordinary editor content unaffected.
- Reduced motion: N/A (static colours).

**Style Settings Destination:**

```
Top-level category: Interface
Subcategory: Workspace
Setting(s): Editor Gutter Number Colour, Active Line Gutter Number Colour (new)
```
(Placement decision documented in the task report; `08` §3.2 Interface → Workspace is the closest authoritative home.)

**Protected Existing Systems:** Code Blocks → Line Numbers system (distinct), editor selection/caret styling, Glow, Dividers, Blockquotes, Callouts, Code Blocks, Animations.

**Dependencies:**

- Depends on: Task 0.1.
- Blocks: none (conceptually adjacent to but not a formal dependency of 2.2).

**Difficulty / Risk:**

- Difficulty: Small. Risk: LOW (additive). `06` table lists Medium portability for the DOM-sensitivity, `09`/`10` list LOW project risk — note the modest disagreement; treat implementation effort as small but selector-verification as mandatory.
- Scope: 1–2 settings + tokens + gutter consumers.
- DOM dependency: CM6 editor gutter structure (may shift between Obsidian versions — keep selectors minimal).

**Testing Checklist:**

- Line-number gutter colours in Live Preview (and Reading Mode only if applicable)
- Active-line number distinct from inactive
- Code-block line numbers (the separate system) unchanged
- Ordinary editor content untouched; selection/caret unaffected
- Dark/Light; Restore Default; performance on long documents

**Subtasks:**

- **1.6.1 — Verify CM6 editor-gutter DOM/selectors.**
- **1.6.2 — Add Style Settings** (gutter colour + active-line colour under Interface → Workspace).
- **1.6.3 — Declare tokens and wire gutter consumers** (scoped to editor gutter only).
- **1.6.4 — Preserve defaults**.
- **1.6.5 — Add provenance badge**.
- **1.6.6 — Test Live Preview** incl. long docs; **1.6.7 — Regression** on code-block line numbers.
- **1.6.8 — Build / validate.**

**Acceptance Criteria:**

- Settings under Interface → Workspace with badge; gutter colours apply only to the editor gutter.
- Code-block line-number system unchanged; editor content/selection unaffected.
- Build passes.

### Task 1.7 — Font Size Tiers

**Task ID:** 1.7 (Phase 1)

**Feature Name:** Font Size Tiers

**Phase:** Phase 1 (Roadmap Tier 1.4 — execution order places it 7th in Phase 1)

**Priority:** High Value / Low Risk

**Source / Provenance:** Primary-inspired (adaptation — new capability)

**User-facing tag:** `[NEW — from Primary]`

**Primary References:**

- `03-Primary-Style-Settings.md` — "Interface → Typography → Interface Font Sizes": 5 tiers (Smallest 11px / Smaller 12px / Small 13px / Medium 15px / Large 20px).
- `04-Primidian-Style-Settings.md` — §3 "Typography": Primidian exposes a single Base Font Size (`--primidian-font-size`, 17px).
- `05-Style-Settings-Comparison.md` — Typography table: "Font sizes (5 tiers) — MISSING".
- `06-Primary-Feature-Portability.md` — "Font Size Tiers": HIGH, 5 new settings + UI CSS, Risk LOW.
- `08-Proposed-Primidian-Settings-Organization.md` — §3.2 "Typography → Font Sizes [NEW — from Primary]": Base Font Size + Small/Medium/Large UI Font Size `[NEW]`.
- `09-Primary-Feature-Roadmap.md` — TIER 1.4: "4 new settings + UI CSS", Risk LOW.
- `10-Primary-Primidian-Master-Analysis.md` — §6.1 (`--primidian-font-size-small/medium/large`), §8.1.

**Disagreement to preserve:** `09` says "4 new settings" (implying 5 tiers minus an assumed existing base), while `08` lists 3 new tiers (Small/Medium/Large) alongside the existing Base size, and `03`/`06` describe 5 Primary tiers. The task report must record which tier set is implemented and why the choice preserves current appearance; the Phase 1 prompt also warns against "dozens of redundant font-size settings".

**Feature Description:**

Introduces a small set of named interface font-size tiers so Theme Settings / plugins that reference named sizes scale coherently, instead of a single base size. **Adaptation/simplification** — Primidian does not need Primary's full 5-tier system; document 08's simplified 3-tier addition (Small/Medium/Large) is the intended shape. Default values must preserve current sizes.

**Implementation Requirements:**

- Style Settings: size tier controls (Small/Medium/Large per `08`, pending the recorded disagreement).
- Tokens: `--primidian-font-size-small/medium/large` declared in `src/tokens/`; base size stays `--primidian-font-size`.
- UI CSS: tier consumers apply `var()` to the intended interface-text contexts; do NOT cascade into code blocks, inline code, settings UI, plugin UI, or headings.
- Preserve hierarchy coherence; verify Reading Mode + Live Preview.
- Reduced motion: N/A.

**Style Settings Destination:**

```
Top-level category: Typography
Subcategory: Font Sizes
Setting(s): Base Font Size (existing), Small UI Font Size, Medium UI Font Size, Large UI Font Size
```
(Per `08` §3.2; subcategory header carries the tag.)

**Protected Existing Systems:** base Typography, headings, code/inline-code sizes, UI controls, Glow, Dividers, Blockquotes, Callouts, Animations.

**Dependencies:**

- Depends on: Task 0.1.
- Blocks: none.

**Difficulty / Risk:**

- Difficulty: Medium (tier wiring). Risk: LOW (additive + CSS). `06`, `09`, `10` agree.
- Scope: 2–4 settings + tokens + UI consumer rules.
- Compatibility risk: minimal; mobile: test narrow widths; performance: none.

**Testing Checklist:**

- Tiers affect only intended interface text contexts
- Code, inline code, settings UI, plugin UI unscaled
- Reading Mode + Live Preview; Light/Dark; Restore Default; long setting names render

**Subtasks:**

- **1.7.1 — Resolve tier count** (record 09-vs-08 disagreement and choice).
- **1.7.2 — Add Style Settings** (Typography → Font Sizes).
- **1.7.3 — Declare size-tier tokens**.
- **1.7.4 — Wire UI consumers** (scoped).
- **1.7.5 — Preserve defaults** (current sizes).
- **1.7.6 — Add provenance badge**.
- **1.7.7 — Test non-targeted contexts unscaled**.
- **1.7.8 — Build / validate.**

**Acceptance Criteria:**

- Tier settings under Typography → Font Sizes with badge; defaults identical to current sizes.
- Code/inline-code/UI/plugin contexts not scaled.
- Build passes.

### Task 1.8 — Font Weight Tiers

**Task ID:** 1.8 (Phase 1)

**Feature Name:** Font Weight Tiers

**Phase:** Phase 1 (Roadmap Tier 1.5 — execution order places it 8th)

**Priority:** High Value / Low Risk

**Source / Provenance:** Primary-inspired (adaptation — new capability)

**User-facing tag:** `[NEW — from Primary]`

**Primary References:**

- `03-Primary-Style-Settings.md` — "Interface → Typography → Font Weight": 9 weights (Thin 150 … Black 900).
- `04-Primidian-Style-Settings.md` — §3 "Typography": Primidian exposes a single Body Font Weight (`--primidian-font-weight`, 400).
- `05-Style-Settings-Comparison.md` — Typography table: "Font weight (9 tiers) — MISSING".
- `06-Primary-Feature-Portability.md` — "Font Weight Tiers": HIGH, 9 new settings + UI CSS, Risk LOW.
- `08-Proposed-Primidian-Settings-Organization.md` — §3.2 "Typography → Font Weights [NEW — from Primary]": Body Font Weight (existing), Bold Weight `[NEW]`, Bold Modifier `[NEW]`.
- `09-Primary-Feature-Roadmap.md` — TIER 1.5: "8 new settings + UI CSS", Risk LOW.
- `10-Primary-Primidian-Master-Analysis.md` — §6.1 (`--primidian-font-weight-thin…black`), §8.1.

**Disagreement to preserve:** `09` describes 9 weight settings ("8 new"), while `08` reduces the intended additions to Bold Weight + Bold Modifier alongside the existing Body weight. Also note Task 1.4 already owns Bold Modifier within the same subcategory. Record the chosen tier set in the task report; do not introduce weights common fonts cannot support; preserve the current hierarchy by default.

**Feature Description:**

Introduces named font-weight tiers so interface/bold contexts can reference a coherent weight scale rather than fixed numbers. **Adaptation/simplification** of Primary's 9-tier system, bounded by document 08's simplified shape. Default values must preserve the current visual hierarchy (verify body text, headings, bold/strong, links, callouts, blockquotes, code, Reading Mode, Live Preview).

**Implementation Requirements:**

- Style Settings: added weight-tier controls per the chosen (recorded) tier set; do not restructure the existing weight architecture wholesale.
- Tokens: `--primidian-font-weight-*` declarations in `src/tokens/` (document 10 §6.1 gives the Primary values as the reference scale).
- Consumers: interface/bold contexts reference the tiers via `var()`; CSS fallback remains sensible for non-variable fonts.
- Do not unintentionally modify UI font weights outside the documented surface.
- Reduced motion: N/A.

**Style Settings Destination:**

```
Top-level category: Typography
Subcategory: Font Weights
Setting(s): Body Font Weight (existing), Bold Weight, (Bold Modifier — Task 1.4)
```
(Per `08` §3.2; subcategory header carries the tag.)

**Protected Existing Systems:** base Typography/font-weight architecture, headings, code/inline code, Glow, Dividers, Blockquotes, Callouts, Animations, Task 1.4's Bold Modifier setting.

**Dependencies:**

- Depends on: Task 0.1. Shares the Font Weights subcategory with Task 1.4 (implement sequentially; do not renumber).
- Blocks: none.

**Difficulty / Risk:**

- Difficulty: Medium. Risk: LOW (additive + CSS). `06`, `09`, `10` agree.
- Scope: 1–8 settings (per recorded decision) + tokens + consumers.
- Compatibility risk: fonts lacking the requested weights rely on CSS fallback — acceptable and documented.

**Testing Checklist:**

- Weight tiers apply to intended contexts; body/headings/bold/strong/links/callouts/blockquotes/code checked
- Default hierarchy identical to pre-feature
- Non-variable fonts fall back sensibly
- Reading Mode + Live Preview; Light/Dark; Restore Default

**Subtasks:**

- **1.8.1 — Resolve tier count** (record 09-vs-08 disagreement and choice; coordinate with 1.4).
- **1.8.2 — Add Style Settings** (Typography → Font Weights).
- **1.8.3 — Declare weight tokens**.
- **1.8.4 — Wire consumers** (scoped; preserve fallback).
- **1.8.5 — Preserve defaults**.
- **1.8.6 — Add provenance badge**.
- **1.8.7 — Verify hierarchy in all contexts**.
- **1.8.8 — Build / validate.**

**Acceptance Criteria:**

- Weight settings under Typography → Font Weights with badge; default hierarchy unchanged.
- No UI weight drift beyond intended surfaces; fallback sensible.
- Build passes.

---

## Phase 2 — Content Enhancements

### Phase summary

| Field | Value |
|---|---|
| **Purpose** | Implement the first half of Tier 2 (High Value / Medium Risk) — editor/content customization. |
| **Roadmap source** | `09: TIER 2 — HIGH VALUE / MEDIUM RISK` and `RECOMMENDED IMPLEMENTATION ORDER → Phase 2: Content Enhancements (Tier 2, first half)`. |
| **Risk profile** | Mixed: 2.1/2.2/2.5 Medium; 2.3/2.4 Low–Medium (roadmap marks 2.6/2.7 alignment/line-height as Risk LOW; they sit in a Tier-2 phase). |
| **Tasks in execution order** | 2.1, 2.2, 2.3, 2.4, 2.5 |
| **Phase-level dependencies** | Task 0.1 (all); Tasks 2.3 and 2.4 also depend on Task 1.2 (per-heading infrastructure). |
| **Important constraints** | Editor-DOM sensitivity (CM6); patterns must be subtle and readable; no `:has()` on `.cm-line`; no `transition: all`. |
| **Protected systems** | Editor surface, selection/caret, code blocks, callouts, blockquotes, tables, Glow, Gradient, Animations. |
| **Phase-level notes** | Portability doc `06` Phase B lists 2.1, 2.2, 2.3, 2.4, 2.5 as medium effort. Risk ratings *disagree slightly* between `06` (some LOW) and `09` (MEDIUM) for 2.1/2.2 — see task entries. |

### Task 2.1 — Editor Background Patterns

**Task ID:** 2.1 (Phase 2)

**Feature Name:** Editor Background Patterns

**Phase:** Phase 2 (Roadmap Tier 2.1)

**Priority:** High Value / Medium Risk

**Source / Provenance:** Primary-inspired (adaptation — new capability)

**User-facing tag:** `[NEW — from Primary]`

**Primary References:**

- `03-Primary-Style-Settings.md` — "Interface → Editor": Editor Background Type (Plain/Line Grid/Dot Grid), Background Color, Pattern Size (`50px 50px`), Pattern Color, Border Width/Color.
- `05-Style-Settings-Comparison.md` — Major gap #5: "Editor background patterns — Line grid / dot grid options".
- `06-Primary-Feature-Portability.md` — "Editor bg patterns (grid/dot): MEDIUM, background-image pattern, Risk LOW" (portability doc) vs roadmap.
- `08-Proposed-Primidian-Settings-Organization.md` — §3.2 "Interface → Workspace": Editor Background Type/Color/Pattern Size/Pattern Color, each `[NEW — from Primary]`. Defines placement and tags.
- `09-Primary-Feature-Roadmap.md` — TIER 2.1. 4 new settings + CSS background patterns; Risk MEDIUM; visual impact HIGH.
- `10-Primary-Primidian-Master-Analysis.md` — §6.2 (`--primidian-editor-bg-type`, `--primidian-editor-bg-pattern-size`), §8.2 Medium risk.

**Risk disagreement to preserve:** `09` and `10` classify Risk MEDIUM; `06` portability table says Risk LOW (self-contained). Record both; implementation should treat the feature as editor-surface-sensitive (Medium) while noting its low architectural blast radius.

**Feature Description:**

Allows an optional line-grid or dot-grid background on the editor, giving a "notebook" feel. Primidian currently uses a solid editor background. **Adaptation** — optional, off by default, using subtle `repeating-linear-gradient`/`radial-gradient` patterns scoped to the editor surface. The pattern must not impair readability or scroll/position incorrectly.

**Implementation Requirements:**

- Style Settings (per `08`): Editor Background Type (None / Line Grid / Dot Grid), Editor Background Colour, Editor Background Pattern Size, Editor Background Pattern Colour (4 controls).
- Tokens: `--primidian-editor-bg-type`, colour, pattern-size tokens per document 10 §6.2 (declared in `src/tokens/`).
- Selectors: applied to `.markdown-source-view` / `.workspace-leaf` surface per portability notes; must not leak onto UI chrome or content containers (code, callouts, blockquotes, tables render their own surfaces above/beside).
- Default: solid current behaviour (None).
- Performance: lightweight background-image; no per-frame work; no `transition: all`.
- Test Live Preview, Reading Mode (where relevant), long documents, dark/light.

**Style Settings Destination:**

```
Top-level category: Interface
Subcategory: Workspace
Setting(s): Editor Background Type, Editor Background Colour,
            Editor Background Pattern Size, Editor Background Pattern Colour
```
(Per `08` §3.2.)

**Protected Existing Systems:** editor font/line rendering, Selection/caret, Code Blocks, Callouts, Blockquotes, Dividers, Glow, Gradient, Animations, reduced-motion.

**Dependencies:**

- Depends on: Task 0.1.
- Blocks: none.

**Difficulty / Risk:**

- Difficulty: Medium. Risk: MEDIUM (`09`/`10`) vs LOW (`06`) — treat as Medium (editor-surface sensitive). Scope: 4 settings + tokens + pattern rules.
- DOM dependency: editor surface selectors (stable). Mobile: verify pattern scale on narrow viewports. Performance: patterns are static layers (low risk if subtle); avoid repaint-heavy methods.

**Testing Checklist:**

- None/Line Grid/Dot Grid switch; default = current solid background
- Pattern renders under editor content without harming readability of text, code, callouts, blockquotes, tables
- Pattern does not scroll/position incorrectly; long documents smooth
- Dark + Light; Reading Mode; Live Preview; Restore Default

**Subtasks:**

- **2.1.1 — Add Style Settings** (4 controls under Interface → Workspace).
- **2.1.2 — Declare background tokens**.
- **2.1.3 — Implement pattern CSS** (subtle repeating gradients; scoped selectors).
- **2.1.4 — Preserve solid default** (None).
- **2.1.5 — Add provenance badge**.
- **2.1.6 — Test readability & positioning** over content blocks.
- **2.1.7 — Build / validate**; **2.1.8 — Regression** across editor surfaces.

**Acceptance Criteria:**

- 4 settings under Interface → Workspace with badge; default unchanged (solid).
- Patterns subtle, readable, correctly positioned in Dark/Light, Reading/Live Preview.
- Code/callouts/blockquotes/tables unaffected.
- Build passes.

### Task 2.2 — Active Line Highlighting

**Task ID:** 2.2 (Phase 2)

**Feature Name:** Active Line Highlighting

**Phase:** Phase 2 (Roadmap Tier 2.2)

**Priority:** High Value / Medium Risk

**Source / Provenance:** Primary-inspired (adaptation — new capability)

**User-facing tag:** `[NEW — from Primary]`

**Primary References:**

- `01-Primary-Animation-Forensics.md` — §7.3 "Active Line Highlighting" (background-color transition on the active line; toggleable).
- `03-Primary-Style-Settings.md` — "Interface → Editor": Toggle Active Line Highlighting, Active Line Background Color.
- `04-Primidian-Style-Settings.md` — no active-line setting (current: none).
- `06-Primary-Feature-Portability.md` — "Active line highlighting: MEDIUM, editor line detection, Risk LOW" (portability) vs roadmap.
- `08-Proposed-Primidian-Settings-Organization.md` — §3.2 "Interface → Workspace → Active Line Highlighting [NEW — from Primary]". Definitive placement.
- `09-Primary-Feature-Roadmap.md` — TIER 2.2. 2 new settings + CSS; Risk MEDIUM; needs to work with various backgrounds.
- `10-Primary-Primidian-Master-Analysis.md` — §6.2 (`--primidian-active-line-bg`), §8.2.

**Risk disagreement to preserve:** `09`/`10` Risk MEDIUM; `06` lists Risk LOW — record both; treat as editor-line sensitive.

**Feature Description:**

Highlights the editor line under the cursor to help track position. Toggleable, with a configurable background colour. **Adaptation** — targets ONLY the active-line (`.cm-activeLine`/`.cm-line-active`-style) element; must not globally style all `.cm-line`, must not use banned expensive selectors, and must interoperate with the editor's existing background (incl. Task 2.1 patterns if enabled).

**Implementation Requirements:**

- Style Settings (per `08`): toggle + active line background colour (2 controls; `03` documents both).
- Token: `--primidian-active-line-bg` (document 10 §6.2) declared in `src/tokens/`, default transparent/off.
- Selectors: use Obsidian's active-line mechanism (no `:has()` on `.cm-line`; no `transition: all`).
- Behaviour: cursor movement, selection, scrolling, long documents must remain correct.
- Default: off / transparent (current appearance preserved).

**Style Settings Destination:**

```
Top-level category: Interface
Subcategory: Workspace
Setting(s): Toggle Active Line Highlighting, Active Line Background Colour
```
(Per `08` §3.2.)

**Protected Existing Systems:** editor text rendering, Selection/caret, Code Blocks, Callouts, Blockquotes, Tables, Glow, Gradient, Animations, reduced-motion, Task 1.6 gutter colours.

**Dependencies:**

- Depends on: Task 0.1.
- Blocks: none (adjacent to but not dependent on Task 1.6).

**Difficulty / Risk:**

- Difficulty: Medium. Risk: MEDIUM (per `09`/`10`) vs LOW (`06`); treat as editor-line sensitive.
- Scope: 2 settings + 1 token + active-line rule.
- DOM dependency: Obsidian active-line element/class (verify). Mobile: verify touch cursor focus. Performance: static background; low risk. Reduced motion: background colour transition must respect motion tokens/reduced-motion if animated.

**Testing Checklist:**

- Highlight tracks cursor; only ONE active line highlighted
- Selection, scrolling, long documents behave
- Works over solid and (if enabled) patterned editor backgrounds
- Live Preview (primary) + Reading Mode (if applicable); Dark/Light; Restore Default
- Toggle off restores current appearance

**Subtasks:**

- **2.2.1 — Verify active-line DOM mechanism.**
- **2.2.2 — Add Style Settings** (toggle + colour under Interface → Workspace).
- **2.2.3 — Declare `--primidian-active-line-bg` and wire the active-line rule.**
- **2.2.4 — Preserve defaults** (off/transparent).
- **2.2.5 — Add provenance badge.**
- **2.2.6 — Test cursor/selection/scroll behaviour** incl. long docs.
- **2.2.7 — Build / validate**; **2.2.8 — Regression** (gutter, editor surfaces, patterns).

**Acceptance Criteria:**

- Toggle + colour under Interface → Workspace with badge; default off.
- Only the active line highlights; interactions unchanged.
- Works in Dark/Light, with/without editor patterns; build passes.

### Task 2.3 — Per-Heading Text Alignment

**Task ID:** 2.3 (Phase 2)

**Feature Name:** Per-Heading Text Alignment

**Phase:** Phase 2 (Roadmap Tier 2.6 — execution order places it 11th overall)

**Priority:** High Value / Low Risk (roadmap marks Risk LOW; phase is Tier 2)

**Source / Provenance:** Primary-inspired (adaptation — new capability)

**User-facing tag:** `[NEW — from Primary]`

**Primary References:**

- `03-Primary-Style-Settings.md` — "Notes and Files → Heading 1-6 → Text Alignment" (`variable-text`, default `left`).
- `05-Style-Settings-Comparison.md` — Headings table: "Per-heading text align — MISSING".
- `06-Primary-Feature-Portability.md` — "Per-heading text align: HIGH, new settings only, Risk LOW". Phase B quick-win-adjacent list.
- `08-Proposed-Primidian-Settings-Organization.md` — §3.2 "Editor & Markdown → Headings → Heading 1–6". Placement of per-heading controls; `10` §6.2 example tokens.
- `09-Primary-Feature-Roadmap.md` — TIER 2.6. 6 new settings; Risk LOW.
- `10-Primary-Primidian-Master-Analysis.md` — §6.2 (`--primidian-h1-text-align` …), §8.2, and the Phase 2 dependency line from Phase 1 per-heading infrastructure.

**Feature Description:**

Lets each heading level use a different text alignment. Primidian currently left-aligns everything. **Adaptation** — 6 additive per-heading controls keyed off the per-heading infrastructure established in Task 1.2. Default `left` preserves the current appearance.

**Implementation Requirements:**

- Style Settings: 6 per-heading alignment controls (valid CSS `text-align` choices; e.g. `variable-select` or documented `variable-text`).
- Tokens: `--primidian-h1-text-align` … `--primidian-h6-text-align` (default `left`) declared in `src/tokens/`.
- Consumers: extend the per-heading consumers built in Task 1.2 (`src/components/50-headings.css`) — do not duplicate heading CSS.
- Reading Mode + Live Preview both correct; ordinary editor text unaffected.

**Style Settings Destination:**

```
Top-level category: Editor & Markdown
Subcategory: Headings → Heading 1 … Heading 6
Setting(s): (per heading level) Text Alignment
```

**Protected Existing Systems:** heading style variants (underline/accent-bar), heading gradients, Typography, Glow, Dividers, Blockquotes, Callouts, Animations.

**Dependencies:**

- Depends on: Task 0.1 and Task 1.2 (per-heading infrastructure; `09` dependency graph).
- Blocks: none.

**Difficulty / Risk:**

- Difficulty: Small. Risk: LOW (`09` marks Risk LOW even within Tier 2; `06` HIGH portability/LOW risk).
- Scope: 6 settings + 6 tokens + consumer extensions.
- DOM dependency: heading elements (verified in 1.2). No animation; mobile/performance negligible.

**Testing Checklist:**

- All 6 heading levels; alignment matches per-level config
- Opening paragraphs/lists unaffected; alignment wraps correctly
- Reading Mode + Live Preview; Light/Dark; Restore Default

**Subtasks:**

- **2.3.1 — Add Style Settings** (6 controls under Headings → Heading N).
- **2.3.2 — Declare `--primidian-hN-text-align` tokens** (default left).
- **2.3.3 — Wire per-heading consumers** (shared with Task 1.2 infrastructure).
- **2.3.4 — Preserve defaults**.
- **2.3.5 — Add provenance badge**.
- **2.3.6 — Test Reading Mode** + **2.3.7 — Test Live Preview**.
- **2.3.8 — Build / validate.**

**Acceptance Criteria:**

- 6 controls under Headings → Heading N with badge; default left.
- Alignment applies per level in both views; editor text untouched.
- Build passes.

### Task 2.4 — Per-Heading Line Height

**Task ID:** 2.4 (Phase 2)

**Feature Name:** Per-Heading Line Height

**Phase:** Phase 2 (Roadmap Tier 2.7 — execution order places it 12th)

**Priority:** High Value / Low Risk (roadmap marks Risk LOW)

**Source / Provenance:** Primary-inspired (adaptation — new capability)

**User-facing tag:** `[NEW — from Primary]`

**Primary References:**

- `03-Primary-Style-Settings.md` — "Notes and Files → Heading 1-6 → Line Height" (default `1.2`).
- `05-Style-Settings-Comparison.md` — Headings table: "Per-heading line height — MISSING".
- `06-Primary-Feature-Portability.md` — Phase B list includes "Per-heading line height".
- `08-Proposed-Primidian-Settings-Organization.md` — §3.2 "Editor & Markdown → Headings → Heading 1–6".
- `09-Primary-Feature-Roadmap.md` — TIER 2.7. 6 new settings; Risk LOW.
- `10-Primary-Primidian-Master-Analysis.md` — §6.2 (`--primidian-h1-line-height` …), §8.2.

**Feature Description:**

Each heading level can have its own line height. Primidian currently uses the default line height for all headings. **Adaptation** — 6 additive controls on the Task 1.2 per-heading infrastructure. Default values (1.2 per `03`) must preserve existing appearance; the UI should clearly state the value is a line height; prefer unitless values (per Phase 2 prompt).

**Implementation Requirements:**

- Style Settings: 6 per-heading line-height controls (unitless numeric, clearly labeled).
- Tokens: `--primidian-h1-line-height` … `--primidian-h6-line-height` (defaults matching current appearance).
- Consumers: extend per-heading consumers (`src/components/50-headings.css`).
- Guard against excessive/unsafe values (document a sensible clamp/validation philosophy; do not break surrounding layout).
- Reading Mode + Live Preview.

**Style Settings Destination:**

```
Top-level category: Editor & Markdown
Subcategory: Headings → Heading 1 … Heading 6
Setting(s): (per heading level) Line Height
```

**Protected Existing Systems:** heading style variants, heading gradients, base Typography, Glow, Dividers, Blockquotes, Callouts, Animations.

**Dependencies:**

- Depends on: Task 0.1 and Task 1.2 (per-heading infrastructure).
- Blocks: none.

**Difficulty / Risk:**

- Difficulty: Small. Risk: LOW. (`06` Phase B medium effort; `09` Risk LOW.)
- Scope: 6 settings + 6 tokens + consumer extensions.
- No DOM/performance/mobile risk beyond heading layout.

**Testing Checklist:**

- All 6 levels respond independently; heading spacing coherent
- Wrapping unchanged; neighbouring layout intact
- Reading Mode + Live Preview; Light/Dark; Restore Default; unsafe values guarded

**Subtasks:**

- **2.4.1 — Add Style Settings** (6 controls under Headings → Heading N).
- **2.4.2 — Declare `--primidian-hN-line-height` tokens.**
- **2.4.3 — Wire per-heading consumers.**
- **2.4.4 — Preserve defaults** (+ guard unsafe values).
- **2.4.5 — Add provenance badge.**
- **2.4.6 — Test Reading Mode** + **2.4.7 — Test Live Preview.**
- **2.4.8 — Build / validate.**

**Acceptance Criteria:**

- 6 controls with badge; defaults preserve spacing.
- Layout coherence kept; values guarded; both views correct.
- Build passes.

### Task 2.5 — Highlight Combinations

**Task ID:** 2.5 (Phase 2)

**Feature Name:** Highlight Combinations

**Phase:** Phase 2 (Roadmap Tier 2.9 — execution order places it 13th)

**Priority:** High Value / Medium Risk

**Source / Provenance:** Primary-inspired (adaptation — expands existing Highlight system)

**User-facing tag:** `[NEW — from Primary]`

**Primary References:**

- `03-Primary-Style-Settings.md` — "Notes and Files → Highlight": 5 combinations with 10 settings (Bold+Highlight, Italic+Highlight, Strikethrough+Highlight, Bold+Italic+Highlight — each with text colour and background).
- `04-Primidian-Style-Settings.md` — §7 "Bold, Italic & Highlight": single highlight style (bg, text colour, padding, radius).
- `05-Style-Settings-Comparison.md` — Highlight table: 5 combos vs 1 — PARTIAL; Minor gap #5.
- `06-Primary-Feature-Portability.md` — "Highlight combinations: MEDIUM, emphasis component expansion, Risk LOW".
- `08-Proposed-Primidian-Settings-Organization.md` — §3.2 "Editor & Markdown → Text Emphasis" (the expanded home for emphasis/highlight settings; combination sub-settings are extensions of this subcategory — document 08 does not name a dedicated "Highlight Combinations" node).
- `09-Primary-Feature-Roadmap.md` — TIER 2.9. 8 new settings + CSS; Risk MEDIUM; CSS complexity.
- `10-Primary-Primidian-Master-Analysis.md` — §8.2 (Medium risk).

**Risk disagreement to preserve:** `09` Risk MEDIUM vs `06` Risk LOW — record both; CSS-combination specificity is the real risk (selector conflicts with bold/italic/links/inline-code/headings).

**Feature Description:**

Adds distinct colour treatment for emphasised+highlighted combinations (bold+highlight, italic+highlight, bold+italic+highlight) so combination formatting is distinguishable. Primidian currently renders one highlight style for all composites. **Adaptation/simplification** — additive override granularity on top of the existing single highlight; defaults preserve current behaviour.

**Implementation Requirements:**

- Style Settings: combination colour controls (text + background per combo as appropriate; roadmap estimates 8 settings — do not blindly exceed what the emphasis component needs).
- Tokens: per-combo text/bg tokens declared in `src/tokens/` following the highlight token pattern (opacity-capable `variable-themed-color`).
- Selectors: target `strong mark`, `em mark`, `strong em mark`-style composites in Reading Mode and Live Preview; avoid selector conflicts with bold, italic, links, inline code, headings.
- Default behaviour: identical to today's single highlight.
- Reduce complexity per `08` §5 intent (leaner than Primary's 10 settings).

**Style Settings Destination:**

```
Top-level category: Editor & Markdown
Subcategory: Text Emphasis → Highlight Combinations
Setting(s): Bold+Highlight (colour/bg), Italic+Highlight (colour/bg),
            Bold+Italic+Highlight (colour/bg)
```
(Sub-note: `08` groups emphasis settings under Text Emphasis; the combination controls are recorded here as the intended final home.)

**Protected Existing Systems:** existing Highlight settings, Bold/Italic tokens, Links, Inline Code, Headings, Glow (Highlight Glow target), Gradient (Bold Text Gradient), Blockquotes, Callouts, Animations.

**Dependencies:**

- Depends on: Task 0.1.
- Blocks: none.

**Difficulty / Risk:**

- Difficulty: Medium. Risk: MEDIUM (CSS combination specificity).
- Scope: ~6–8 settings + tokens + combination rules.
- DOM dependency: mark/strong/em composites in CM6 + Reading Mode. Performance: static colours.

**Testing Checklist:**

- Bold+highlight, italic+highlight, bold+italic+highlight combinations all render distinctly
- Solo bold, italic, highlight unchanged
- Links, inline code, headings unaffected; blockquote/callout **content** renders (no blockquote selector changes)
- Reading Mode + Live Preview; Light/Dark; Restore Default

**Subtasks:**

- **2.5.1 — Resolve exact combination set** (record roadmap estimate vs needed granularity).
- **2.5.2 — Add Style Settings** (Text Emphasis → Highlight Combinations).
- **2.5.3 — Declare per-combo tokens.**
- **2.5.4 — Wire combination selectors** (Reading + Live Preview).
- **2.5.5 — Preserve defaults** (single-highlight behaviour).
- **2.5.6 — Add provenance badge.**
- **2.5.7 — Conflict-test** (bold/italic/links/inline-code/headings).
- **2.5.8 — Build / validate.**

**Acceptance Criteria:**

- Combination controls under Text Emphasis with badge; solo formats unchanged.
- All three combinations distinct in both views; no selector conflicts.
- Build passes.

---

## Phase 3 — Interface Enhancements

### Phase summary

| Field | Value |
|---|---|
| **Purpose** | Implement the second half of Tier 2 (interface/workflow chrome). |
| **Roadmap source** | `09: … RECOMMENDED IMPLEMENTATION ORDER → Phase 3: Interface Enhancements (Tier 2, second half)`. |
| **Risk profile** | All Medium — layout/behaviour changes; unlike Phase 1, these alter chrome behaviour. |
| **Tasks in execution order** | 3.1, 3.2, 3.3, 3.4 |
| **Phase-level dependencies** | Task 0.1 (all). None cross-task within the phase. |
| **Important constraints** | Defaults must preserve current chrome behaviour; compositor-friendly motion; reduced-motion respected; keyboard/focus accessible; mobile-safe. |
| **Protected systems** | Status bar (existing styles), ribbon, titlebar/file header architecture, embeds, Glow, Blockquotes, Dividers, Code Blocks, Animations. |
| **Phase-level notes** | All four are `[NEW — from Primary]`-tagged capabilities (even where they extend existing categories, the new variants/styles are the tagged additions — see per-task notes). Portability doc `06` Phase B lists all four. |

### Task 3.1 — Status Bar Slide-Out Style

**Task ID:** 3.1 (Phase 3)

**Feature Name:** Status Bar Slide-Out Style

**Phase:** Phase 3 (Roadmap Tier 2.3 — execution order places it 14th)

**Priority:** High Value / Medium Risk

**Source / Provenance:** Primary-inspired (adaptation — expands existing Status Bar system with new variants)

**User-facing tag:** `[NEW — from Primary]` on the newly introduced variant options (existing Floating/Docked remain untagged)

**Primary References:**

- `01-Primary-Animation-Forensics.md` — §3.11 "Status Bar": slide-up (`translateY` on hover), slide-out (`translateX`), floating (`opacity`).
- `02-Primary-UI-Effects.md` — §6.1 "Style Variants": 5 styles (On Top / Visible Full Length / Slide Up Full Length / Slide Out / Floating); §6.2 Floating details incl. configurable resting opacity.
- `03-Primary-Style-Settings.md` — "Interface → Status Bar": Style class-select (5 options), item visibility, bg, border width/roundness, floating opacities.
- `04-Primidian-Style-Settings.md` — §4.2 "Status Bar": current 2 styles (Floating default, Docked) + Floating Opacity at Rest.
- `05-Style-Settings-Comparison.md` — Status Bar PARTIAL (5 vs 2); minor gap #4.
- `06-Primary-Feature-Portability.md` — "Status bar slide-out: MEDIUM, new status bar styles, Risk LOW" (portability) vs `02`/roadmap risk view.
- `08-Proposed-Primidian-Settings-Organization.md` — §3.2 "Interface → Status Bar" (keeps Status Bar Style; adds Floating Opacity on Hover `[NEW — from Primary]`).
- `09-Primary-Feature-Roadmap.md` — TIER 2.3. 3 new CSS patterns + class-select options; Risk MEDIUM.
- `10-Primary-Primidian-Master-Analysis.md` — §3.1 "2.3 Status bar variants — 5 styles vs 2"; §8.2.

**Risk disagreement to preserve:** `06` lists Risk LOW for the new styles; `09`/`10` classify MEDIUM (behavioural change). Treat as MEDIUM.

**Feature Description:**

Adds Primary-inspired status bar variants — Slide Up (hidden below screen edge, slides up on hover), Slide Out (slides in from side on hover), Visible Full Length — alongside existing Floating/Docked. **Adaptation** — new class-select options on the existing "Status Bar Style" selector; existing modes untouched and independently selectable. Default must preserve current Floating behaviour. Use transform/opacity motion, respect reduced-motion.

**Implementation Requirements:**

- Style Settings: extend the existing `class-select` (Status Bar Style) with the new variant options; add Floating Opacity on Hover control (`08`).
- Tokens: existing status-bar tokens (`--primidian-statusbar-opacity`); new geometry/position tokens only where needed (declared in `src/tokens/`).
- Selectors/variants: new `body.*` variant rules in `src/variants/` + consumer rules in `src/ui/31-titlebar-statusbar.css`; follow the variant-add workflow (reassign tokens only).
- Verify: bottom positioning, workspace resizing, hover behaviour, status text, small screens, mobile; avoid layout-jank animation (transform/opacity only).
- Reduced motion: slide/in/out behaviours must respect `prefers-reduced-motion`.

**Style Settings Destination:**

```
Top-level category: Interface
Subcategory: Status Bar
Setting(s): Status Bar Style (class-select — extend options),
            Floating Opacity at Rest (existing),
            Floating Opacity on Hover (new)
```

**Protected Existing Systems:** existing Floating/Docked styles, workspace layout, Assets/Glow, Dividers, Blockquotes, Callouts, Animations, Plugins.

**Dependencies:**

- Depends on: Task 0.1.
- Blocks: none.

**Difficulty / Risk:**

- Difficulty: Medium. Risk: MEDIUM (behavioural chrome).
- Scope: class-select option extension + 1–2 new settings + variant CSS.
- DOM dependency: status-bar wrapper positioning (stable). Mobile risk: hover-based reveal needs a mobile fallback (tap or always-visible). Performance: transform/opacity only.

**Testing Checklist:**

- Each of the 5 styles independently selectable; existing 2 unchanged
- Hover behaviour correct; status text visible; workspace resize plays nicely
- Small/narrow windows + mobile
- Dark/Light; reduced-motion on/off; Restore Default; keyboard/focus reachability

**Subtasks:**

- **3.1.1 — Audit current status-bar architecture** (`04` §4.2, `src/ui/31-titlebar-statusbar.css`).
- **3.1.2 — Extend Status Bar Style class-select** with Primary-inspired options.
- **3.1.3 — Add variant rules** (slide-up / slide-out / visible-full) via `src/variants/`.
- **3.1.4 — Add Floating Opacity on Hover setting/token.**
- **3.1.5 — Preserve defaults** (current Floating behaviour).
- **3.1.6 — Add provenance badge.**
- **3.1.7 — Test resize/mobile/reduced-motion**.
- **3.1.8 — Build / validate** (class-select cross-check).

**Acceptance Criteria:**

- New styles available + old styles intact; default unchanged.
- Motion is transform/opacity, reduced-motion-safe; mobile usable.
- Build passes; class-select `body.*` cross-check passes.

### Task 3.2 — Ribbon Slide-Out on Hover

**Task ID:** 3.2 (Phase 3)

**Feature Name:** Ribbon Slide-Out on Hover

**Phase:** Phase 3 (Roadmap Tier 2.4 — execution order places it 15th)

**Priority:** High Value / Medium Risk

**Source / Provenance:** Primary-inspired (adaptation — new ribbon behaviour)

**User-facing tag:** `[NEW — from Primary]`

**Primary References:**

- `01-Primary-Animation-Forensics.md` — §3.10 "Ribbon": icon hover (colour/bg), slide-out ribbon `transform: translateX()` 0.15s.
- `02-Primary-UI-Effects.md` — §5 "Ribbon Effects": Docked mode and Slide Out on Hover architecture.
- `03-Primary-Style-Settings.md` — "Interface → Ribbon": Ribbon Style (Docked | Slide Out on Hover) + bg/border/width/icon size/icon spacing settings.
- `04-Primidian-Style-Settings.md` — §4 Interface: no ribbon settings (static ribbon today).
- `05-Style-Settings-Comparison.md` — Ribbon PARTIAL (Primary: extensive; Primidian: radius + icon opacity).
- `06-Primary-Feature-Portability.md` — "Ribbon slide-out on hover: MEDIUM, ribbon layout changes, Risk MEDIUM".
- `08-Proposed-Primidian-Settings-Organization.md` — §3.2 "Interface → Ribbon [EXPANDED — from Primary]" (internal annotation — NOT a user tag) with Ribbon Style, bg, border width/colour, width, icon size, icon spacing.
- `09-Primary-Feature-Roadmap.md` — TIER 2.4. New ribbon CSS + class-select option; Risk MEDIUM.
- `10-Primary-Primidian-Master-Analysis.md` — §3.1 "Ribbon slide-out … space-saving on hover"; §8.2.

**Feature Description:**

Adds an OPTIONAL ribbon behaviour: the ribbon is collapsed to save space and slides out on hover. Must be opt-in; the default preserves the current static ribbon. **Adaptation** — investigate the actual Obsidian ribbon DOM first; no brittle positional hacks; icons must remain clickable; no clipping/focus/mobile issues.

**Implementation Requirements:**

- Style Settings: extend Ribbon settings per `08` (Ribbon Style class-select with slide-out option; plus the documented bg/border/width/icon controls as applicable).
- Tokens: new ribbon tokens declared in `src/tokens/` (usage per Primidian token architecture).
- Selectors/variants: `src/ui` ribbon + `src/variants/` slide-out variant; transform-based motion.
- Behaviour safeguards: hover area usable, icons clickable, no overlap, no clipping, focus/accessibility OK, mobile fallback, reduced-motion.
- Default = current ribbon appearance (no forced behaviour).

**Style Settings Destination:**

```
Top-level category: Interface
Subcategory: Ribbon
Setting(s): Ribbon Style (class-select — add Slide Out on Hover option),
            Ribbon Background Colour, Ribbon Border Width, Ribbon Border Colour,
            Ribbon Width, Ribbon Icon Size, Ribbon Icons Spacing
```
(Per `08` §3.2.)

**Protected Existing Systems:** ribbon icons, workspace layout, sidebars, Glow, Dividers, Blockquotes, Callouts, Animations, mobile layout.

**Dependencies:**

- Depends on: Task 0.1.
- Blocks: none.

**Difficulty / Risk:**

- Difficulty: Medium. Risk: MEDIUM (`06` and `09`/`10` agree).
- Scope: class-select option + variant CSS + ribbon token additions.
- DOM dependency: ribbon DOM (verify before implementation). Mobile: hover-reveal needs tap/always-visible alternative. Performance: transform-only.

**Testing Checklist:**

- Slide-out opt-in; default unchanged (static ribbon)
- Hover area, icon clickability, no overlap/clipping
- Keyboard focus reachable; mobile behaviour; narrow windows
- Dark/Light; reduced-motion on/off; Restore Default

**Subtasks:**

- **3.2.1 — Verify ribbon DOM/architecture.**
- **3.2.2 — Extend Ribbon Style class-select** + add ribbon settings per `08`.
- **3.2.3 — Add tokens + slide-out variant** (transform motion, reduced-motion-safe).
- **3.2.4 — Preserve default** (static ribbon).
- **3.2.5 — Add provenance badge** (Ribbon subcategory).
- **3.2.6 — Test interactions/accessibility/mobile**.
- **3.2.7 — Build / validate.**

**Acceptance Criteria:**

- Ribbon slide-out available behind the style selector; default unchanged.
- No overlap/clipping; icons clickable; focus accessible; mobile/reduced-motion safe.
- Build passes.

### Task 3.3 — File Header Hover-Reveal

**Task ID:** 3.3 (Phase 3)

**Feature Name:** File Header Hover-Reveal

**Phase:** Phase 3 (Roadmap Tier 2.5 — execution order places it 16th)

**Priority:** High Value / Medium Risk

**Source / Provenance:** Primary-inspired (adaptation — new file-header behaviour)

**User-facing tag:** `[NEW — from Primary]`

**Primary References:**

- `01-Primary-Animation-Forensics.md` — §7.4 "File Header": three modes (Always Show / Hide Full — reveal on hover / Hide Title — reveal on hover) using opacity + transform.
- `03-Primary-Style-Settings.md` — "Interface → Editor → File Header": class-select (Always Show / Hide Full / Hide Title) + border width/colour.
- `05-Style-Settings-Comparison.md` — Major gap #6: "File header modes — 3 visibility modes"; Interface → Editor MISSING.
- `06-Primary-Feature-Portability.md` — "File header hover-reveal: MEDIUM, header layout, Risk MEDIUM".
- `08-Proposed-Primidian-Settings-Organization.md` — §3.2 "Interface → File Header [NEW — from Primary]": File Header Style, File Header Border Width, File Header Border Colour.
- `09-Primary-Feature-Roadmap.md` — TIER 2.5. New header CSS + class-select options; Risk MEDIUM.
- `10-Primary-Primidian-Master-Analysis.md` — §3.1 "Ribbon slide-out / File header…"; §8.2.

**Feature Description:**

Adds optional file-header modes where the header/title area is hidden and revealed on hover (Hide Full or Hide Title), saving vertical space — alongside the default Always Show. **Adaptation** — default remains current behaviour; never permanently hide important controls; keyboard/focus users must reach controls; investigate file-header DOM first; avoid absolute-position hacks that break at different widths.

**Implementation Requirements:**

- Style Settings (per `08`): File Header Style class-select (Always Show / Hide Full / Hide Title), File Header Border Width, File Header Border Colour.
- Tokens: header tokens per Primidian architecture.
- Selectors/variants: header CSS + variant rules; opacity/transform hover-reveal; reduced-motion-safe.
- Layout must hold across view widths; controls remain usable.

**Style Settings Destination:**

```
Top-level category: Interface
Subcategory: File Header
Setting(s): File Header Style, File Header Border Width, File Header Border Colour
```
(Per `08` §3.2.)

**Protected Existing Systems:** titlebar/tabbar architecture, workspace header, Glow, Dividers, Blockquotes, Callouts, Code Blocks, Animations.

**Dependencies:**

- Depends on: Task 0.1.
- Blocks: none.

**Difficulty / Risk:**

- Difficulty: Medium. Risk: MEDIUM (`06` and `09`/`10` agree).
- Scope: class-select + 2 border settings + header variant CSS.
- DOM dependency: file-header DOM (verify). Mobile: hover-reveal needs a non-hover fallback. Performance: transform/opacity only.

**Testing Checklist:**

- All three modes; default (Always Show) unchanged
- Hover reveal works; controls keyboard/focus reachable
- Various window widths; mobile; dark/light; reduced-motion; Restore Default

**Subtasks:**

- **3.3.1 — Verify file-header DOM.**
- **3.3.2 — Add File Header Style class-select + border settings.**
- **3.3.3 — Add tokens + variant rules** (opacity/transform reveal).
- **3.3.4 — Preserve default** (Always Show).
- **3.3.5 — Add provenance badge.**
- **3.3.6 — Test resize/focus/mobile/reduced-motion.**
- **3.3.7 — Build / validate.**

**Acceptance Criteria:**

- Modes available; default unchanged; controls never permanently hidden.
- Focus/mobile/reduced-motion safe; build passes.

### Task 3.4 — Note Embed Per-Side Border

**Task ID:** 3.4 (Phase 3)

**Feature Name:** Note Embed Per-Side Border

**Phase:** Phase 3 (Roadmap Tier 2.8 — execution order places it 17th)

**Priority:** High Value / Medium Risk

**Source / Provenance:** Primary-inspired (adaptation — expands existing Embeds system)

**User-facing tag:** `[NEW — from Primary]`

**Primary References:**

- `03-Primary-Style-Settings.md` — "Notes and Files → Note Embed": Max Height, bg, Title (10 settings), Border Radius, and per-side (Top/Right/Bottom/Left) width/style/colour.
- `04-Primidian-Style-Settings.md` — §16 "Lists, Embeds & Properties": current Embed Background, Title Colour, Corner Radius (uniform border today).
- `05-Style-Settings-Comparison.md` — Note Embed PARTIAL (Primary: extensive per-side control; Primidian: bg + title + radius).
- `06-Primary-Feature-Portability.md` — "Note embed per-side border: MEDIUM, embed CSS expansion, Risk MEDIUM".
- `08-Proposed-Primidian-Settings-Organization.md` — §3.2 "Editor & Markdown → Embeds & Properties" (final home for embed settings).
- `09-Primary-Feature-Roadmap.md` — TIER 2.8. 12 new settings + CSS; Risk MEDIUM; many settings.
- `10-Primary-Primidian-Master-Analysis.md` — §3.1 "2. Note embed customization — per-side border control is extensive"; §8.2.

**Feature Description:**

Lets users set each embed border side (top/right/bottom/left) independently for width/style/colour. Primidian currently renders a uniform border. **Adaptation** — a leaner version of Primary's per-side model; reuse existing embed tokens; do not create a parallel colour architecture. Emphasize the roadmap's scope (12 settings); document 10 notes Primary's full model is far larger — Primidian keeps it focused on border sides per the roadmap. Defaults preserve the current uniform border.

**Implementation Requirements:**

- Style Settings: per-side width/style/colour controls (12 per roadmap) under Embeds & Properties; keep existing Embed Background/Title/Radius untouched and in place.
- Tokens: per-side border tokens declared in `src/tokens/`, defaulting to the current border appearance.
- Selectors: embed border sides in Reading Mode and Live Preview; nested embeds and internal link embeds must remain functional.
- No new colour architecture — colours derive from existing embed/border tokens.

**Style Settings Destination:**

```
Top-level category: Editor & Markdown
Subcategory: Embeds & Properties → Note Embeds
Setting(s): Embed Border (Top/Right/Bottom/Left) → Width, Style, Colour
            (existing Embed Background / Title Colour / Corner Radius remain)
```

**Protected Existing Systems:** embed content rendering, nested embeds, internal links, Lists & Properties settings, Glow, Dividers, Blockquotes, Callouts, Animations.

**Dependencies:**

- Depends on: Task 0.1.
- Blocks: none.

**Difficulty / Risk:**

- Difficulty: Medium. Risk: MEDIUM (many settings; `06`, `09`, `10` agree).
- Scope: 12 settings + tokens + border-side rules.
- DOM dependency: embed container border (stable). Mobile/performance: cosmetic only.

**Testing Checklist:**

- Per-side border control works independently
- Default = current uniform border
- Nested embeds, internal-link embeds still functional
- Reading Mode + Live Preview; Dark/Light; Restore Default; long/narrow widths

**Subtasks:**

- **3.4.1 — Audit current embed CSS/tokens.**
- **3.4.2 — Add Style Settings** (per-side borders under Embeds & Properties).
- **3.4.3 — Declare per-side border tokens** (defaults match current border).
- **3.4.4 — Wire border-side consumers** (Reading + Live Preview, nested embeds).
- **3.4.5 — Add provenance badge.**
- **3.4.6 — Test embeds/nesting/internal links.**
- **3.4.7 — Build / validate.**

**Acceptance Criteria:**

- Per-side controls under Embeds & Properties with badge; default uniform border unchanged.
- Nested/internal embeds unaffected; both views correct.
- Build passes.

---

## Phase 4 — Major Features

### Phase summary

| Field | Value |
|---|---|
| **Purpose** | Implement the roadmap's simplified major features (Tier 3, deliberately reduced). |
| **Roadmap source** | `09: TIER 3 — EXPERIMENTAL` and `… → Phase 4: Major Features (Tier 3, simplified)`: progress bar, simplified folders (6), incremental task types. |
| **Risk profile** | Medium–High. Large setting counts; new components; larger CSS surfaces. |
| **Tasks in execution order** | 4.1, 4.2, 4.3 |
| **Phase-level dependencies** | Task 0.1 (all). Task 4.2 explicitly depends on Settings Reorganization per `09` TIER 3.1 ("Depends on: Settings reorganization"). |
| **Important constraints** | ONE feature at a time, build + visually test after each (explicitly mandated by the Phase 4 prompt). Defaults preserve current appearance. Do not implement Primary's full models (12/22-state). |
| **Protected systems** | Existing checkbox component + Kanban compatibility, file explorer hover, existing colour/token architecture, Glow, Gradient, Blockquotes, Dividers, Animations. |
| **Phase-level notes** | These are the first features where `08` models a "simplified" shape: 6 colours not 12 (`08` File Explorer), task states stay small and additive. The Phase 4 prompt forbids a huge untested diff. |

### Task 4.1 — Progress Bar Customization

**Task ID:** 4.1 (Phase 4)

**Feature Name:** Progress Bar Customization

**Phase:** Phase 4 (Roadmap Tier 2.10 — roadmap execution order places it 18th)

**Priority:** Medium Risk / New Component (roadmap: Risk MEDIUM, effort Large)

**Source / Provenance:** Primary-inspired (adaptation — new component)

**User-facing tag:** `[NEW — from Primary]`

**Primary References:**

- `01-Primary-Animation-Forensics.md` — §7.2 "Progress Bars": gradient animation on value bar; colour changes by percentage ranges (0-39/40-59/60-79/80-99/100%).
- `03-Primary-Style-Settings.md` — "Components → Progress": 14 settings (width, height, bg, border, radius, 4 range colours + 3-step 100% gradient).
- `04-Primidian-Style-Settings.md` — no progress settings (current: none).
- `05-Style-Settings-Comparison.md` — "Components → Progress — MISSING" (major gap #4).
- `06-Primary-Feature-Portability.md` — "Progress bar customization: MEDIUM, new component, ~15 settings, Risk MEDIUM"; Phase C large features.
- `08-Proposed-Primidian-Settings-Organization.md` — does **not** model a Progress category (see placement note). The design intent (`08` §5) is a 10–12 L1 layout with a token cascade rather than per-component flat colours.
- `09-Primary-Feature-Roadmap.md` — TIER 2.10. ~15 new settings + new component CSS; Risk MEDIUM; effort Large.
- `10-Primary-Primidian-Master-Analysis.md` — §3.1 "9. Progress bar — full customization"; §8.2.

**Placement note (explicit):** document 08 does not define a final home for Progress settings. The task report must record the chosen placement; proposed: a new `Progress` L2 under `Interface` (workspace/UI affordance) — reflecting Primary's `Components → Progress` intent — or an equally defensible home; do NOT silently invent an undocumented L1.

**Feature Description:**

Adds comprehensive progress-bar styling: dimensions, track/background, fill, per-range colours, radius, and a 100%-state gradient. Useful for embeds/progress bars users render in notes. **Adaptation** — reimagined on Primidian's token system (Primary's flat per-range colours become token-driven; percentage-based colour states are preserved as the researched behaviour). Do NOT copy Primary's flat colour architecture.

**Implementation Requirements:**

- Style Settings: group logically (general/visibility, track/background, fill, range states, dimensions, radius); roadmap estimates ~15 controls — group, do not dump blindly (Phase 4 prompt).
- Tokens: progress tokens declared in `src/tokens/` (colours on `.theme-dark/.theme-light`; structural on `body`).
- Selectors: verify the real Obsidian progress-bar DOM (file load, export, sync, task/card progress plugins) and target only reliably styled elements; do not overreach.
- Default behaviour: visually coherent with Primidian (not Primary's flat colours).
- Reference `01` §7.2 for the percentage-range + 100% gradient behaviour when reusing range-state logic.

**Style Settings Destination:**

```
Top-level category: Interface (proposed — see placement note; verify in Phase 0 layout)
Subcategory: Progress
Setting(s): Progress Bar Dimensions, Track/Background, Fill, Range-state colours,
            100% gradient colours, Radius
```
(Placement to be confirmed during Task 0.1 layout review; record the decision.)

**Protected Existing Systems:** existing component tokens, Glow (no interference), Gradient System, Blockquotes, Dividers, Code Blocks, Animations.

**Dependencies:**

- Depends on: Task 0.1.
- Blocks: none.

**Difficulty / Risk:**

- Difficulty: Large. Risk: MEDIUM (new component — `06`, `09`, `10` agree).
- Scope: ~15 grouped settings + new component CSS.
- DOM dependency: Obsidian progress DOM (verify — may vary by surface). Mobile/performance: static styling, low risk.

**Testing Checklist:**

- Progress bars at various completion states (0–100%)
- Range (0-39/40-59/60-79/80-99%) and 100% gradient behaviour
- Dark/Light; Reading Mode + Live Preview (if applicable)
- Plugin/UI progress surfaces render coherently
- Restore Default; existing surfaces unaffected

**Subtasks:**

- **4.1.1 — Investigate real progress-bar DOM/surfaces.**
- **4.1.2 — Add Style Settings** (grouped Progress controls at recorded location).
- **4.1.3 — Declare progress tokens.**
- **4.1.4 — Implement progress component CSS** (dimensions/track/fill/ranges/radius/100% gradient).
- **4.1.5 — Preserve Primidian coherence by default.**
- **4.1.6 — Add provenance badge.**
- **4.1.7 — Test completion states + plugin surfaces.**
- **4.1.8 — Build / validate.**

**Acceptance Criteria:**

- Progress styling available at the recorded location with badge; default coherent with Primidian.
- Range-colour and 100%-gradient behaviours match researched behaviour.
- No interference with Glow/Gradient systems; build passes.

### Task 4.2 — Simplified Folder Colors (6 Colours)

**Task ID:** 4.2 (Phase 4)

**Feature Name:** Simplified Folder Colors (6 Colours)

**Phase:** Phase 4 (Roadmap Tier 3.1 — simplified; execution order places it 19th)

**Priority:** High Risk / Large (roadmap TIER 3.1 Risk HIGH; Phase 4 mandates the 6-colour simplification)

**Source / Provenance:** Simplified from Primary

**User-facing tags (per `08`, preserved exactly):**

- File Explorer subcategory: `[NEW — from Primary]`
- Folder Color Style: `[NEW — simplified from Primary]`
- Folder Color 1-6: `[NEW — simplified]`

**Primary References:**

- `01-Primary-Animation-Forensics.md` — §7.1 "Colored Folders": colours cycle up to 12; hover bg transition; collapse rotate on expand.
- `02-Primary-UI-Effects.md` — §4.1 "Colored Folders System" + §4.2 "Folder Hover Effects": per-depth colour application to text, collapse indicator, bg, indent guide.
- `03-Primary-Style-Settings.md` — "File Explorer & Bookmarks": Folders 1-12 × 5 settings each, 6 behavior toggles, bookmarks folder colours.
- `04-Primidian-Style-Settings.md` — no folder colour system (current: single accent for folders).
- `05-Style-Settings-Comparison.md` — Folder & File Explorer: all MISSING (major gap #1).
- `06-Primary-Feature-Portability.md` — "12-color folder cycle: MEDIUM, token architecture expansion, Risk MEDIUM"; Phase C; also Phase D "Bookmark folder colors — needs investigation" (NOT ported as a separate task — see note).
- `08-Proposed-Primidian-Settings-Organization.md` — §3.2 "Interface → File Explorer": Folder Color Style `[NEW — simplified from Primary]`, Folder Color 1-6 `[NEW — simplified]`. §4/§6: simplified 6-colour model (vs 12) is the deliberate Primidian shape.
- `09-Primary-Feature-Roadmap.md` — TIER 3.1; Phase 4 = "Simplified folder colors (6 instead of 12)"; depends on Settings Reorganization; Risk HIGH; note: "Could be simplified to 6 colors".
- `10-Primary-Primidian-Master-Analysis.md` — §3.1 "1. Folder color system"; §9 Open Question #1 (12 vs 6 — answered in favour of 6 by `08`/Phase 4).

**Bookmarks note (preserve research without inventing a task):** document 06 Phase D #23 lists "Bookmark folder colors" as needs-investigation, and Primary has a separate 12-colour bookmark set (`03` §5.3). The roadmap does NOT create a separate bookmark task; Task 4.2 must keep bookmarks working (no colour behaviour change) and may optionally share the folder-colour tokens where Primary did — but no new bookmark settings are introduced by any roadmap task.

**Feature Description:**

Adds a simplified, optional folder colour cycle — 6 colours (not Primary's 12) — with a style toggle and 6 colour controls. Primary cycles 12 colours across text/collapse/bg/indent with 60+ settings; Primidian's `08` design reduces this to one style selector + 6 colours, respecting the token cascade. Default must keep today's uncoloured folders. **Simplification** — the canonical example of `[NEW — simplified from Primary]`.

**Implementation Requirements:**

- Style Settings (per `08`): Folder Color Style (class-select: e.g. Off/single-accent vs Sequential/alternating cycle) + Folder Color 1–6 (`variable-themed-color`).
- Tokens: folder colour tokens declared in `src/tokens/` (dark/light via token cascade).
- Selectors: folder items keyed by depth/cycle per the chosen robust architecture — do NOT use brittle `nth-child` hacks if a more robust tree-based targeting exists (Phase 4 prompt).
- Behaviour: nested folders, collapsed folders, hover highlight (from existing explorer system) all continue to work.
- Test files, folders, nested folders, bookmarks (unaffected), dark/light.
- Default: off / current single-accent appearance.

**Style Settings Destination:**

```
Top-level category: Interface
Subcategory: File Explorer
Setting(s): Folder Color Style, Folder Color 1, Folder Color 2, Folder Color 3,
            Folder Color 4, Folder Color 5, Folder Color 6
```
(Per `08` §3.2.)

**Protected Existing Systems:** file-explorer hover/active behaviour, folder collapse indicators, bookmarks, Glow, Dividers, Blockquotes, Callouts, Animations, existing colour architecture.

**Dependencies:**

- Depends on: Task 0.1 (explicitly — `09` TIER 3.1 "Depends on: Settings reorganization").
- Blocks: none.

**Difficulty / Risk:**

- Difficulty: Large. Risk: HIGH per `09` (setting scale/visual clutter) though `06` lists MEDIUM — preserve the disagreement; the 6-colour simplification mitigates the roadmap's risk.
- Scope: ~7 settings + tokens + folder-colour CSS.
- DOM dependency: file-explorer folder tree (fairly stable); avoid brittle positional/nth logic. Mobile: subtle. Performance: static colours.

**Testing Checklist:**

- Off (current appearance) default
- Cycle applies correctly across folders incl. nesting and collapse
- Hover/active explorer behaviour intact
- Bookmarks unchanged; Dark/Light; Restore Default
- No nth-child brittleness; large vault performance

**Subtasks:**

- **4.2.1 — Choose robust folder-colour targeting architecture** (record decision; no brittle hacks).
- **4.2.2 — Add Style Settings** (Folder Color Style + Folder Color 1-6).
- **4.2.3 — Declare folder colour tokens** (dark/light).
- **4.2.4 — Implement style variants + colour application.**
- **4.2.5 — Preserve defaults** (off).
- **4.2.6 — Add provenance badges** (three labels per `08`).
- **4.2.7 — Test nesting/collapse/bookmarks.**
- **4.2.8 — Build / validate** (class-select cross-check).

**Acceptance Criteria:**

- 6-colour system behind a style toggle; default unchanged.
- Folders/nesting/collapse/hover all behave; bookmarks untouched.
- Badges read `[NEW — simplified from Primary]` (style) and `[NEW — simplified]` (colours) per `08`.
- Build passes.

### Task 4.3 — Additional Task Types (incremental)

**Task ID:** 4.3 (Phase 4)

**Feature Name:** Additional Task Types (incremental)

**Phase:** Phase 4 (Roadmap Tier 3.2 — simplified/incremental; execution order places it 20th)

**Priority:** High Risk / Large (roadmap TIER 3.2 Risk HIGH; mandated incremental)

**Source / Provenance:** Primary-inspired (incremental adaptation of the existing Custom Task States system)

**User-facing tag:** `[NEW — from Primary]` (applied to newly added task-state sections)

**Primary References:**

- `01-Primary-Animation-Forensics.md` — §5.3 "Checkboxes": toggle colour transition, springy check-icon scale.
- `03-Primary-Style-Settings.md` — "Notes and Files → Checkbox Icons": 22 task marker types with per-type colours, icon colours, radius, decorations.
- `04-Primidian-Style-Settings.md` — §13 "Checkboxes & Tasks → Custom Task States": current 6 states (`[/]`, `[-]`, `[>]/[<]`, `[?]`, `[!]`, `[*]`).
- `05-Style-Settings-Comparison.md` — Checkbox/Checkbox Icons PARTIAL: 6 vs 22 (minor gap #3); full MISSING list for the 16 absent types.
- `06-Primary-Feature-Portability.md` — "22 checkbox task types: MEDIUM, checkbox component expansion, Risk MEDIUM"; Phase C.
- `08-Proposed-Primidian-Settings-Organization.md` — §3.2 "Editor & Markdown → Checkboxes & Tasks → Custom Task States (×6)": retains 6 states; document 08 does NOT model the expansion count.
- `09-Primary-Feature-Roadmap.md` — TIER 3.2; Phase 4 = "Additional task types (incremental)"; note: "Could be added incrementally (most popular types first)". Risk HIGH.
- `10-Primary-Primidian-Master-Analysis.md` — §9 Open Question #2: add all 16 at once or incrementally? (Answered: incrementally.)

**Risk disagreement to preserve:** `09`/`10` Risk HIGH vs `06` MEDIUM — record both; practical risk is mitigated by incremental delivery.

**Feature Description:**

Adds more checkbox task states (from Primary's 22) to Primidian's current 6, ONE increment at a time, starting with the most broadly useful/low-risk states identified from `05`'s MISSING list (`[n]` note, `[l]` location, `[i]` info, `[S]` amount, `[p]` pro, `[c]` con, `[b]` bookmark, `[r]` law, `[L]` language, `[t]` time, `[T]` telephone, `[u]` up-trend, `[d]` down-trend, `[I]` idea, `["]` quote — plus per-type inner-icon colours and radii where relevant). **Adaptation/simplification** — follows the existing 6-state rendering architecture; Task List Kanban compatibility preserved.

**Implementation Requirements:**

- Per newly added state: marker appearance, colour token, consumer CSS, and optional icon colour/radius per `03`.
- Style Settings: extend Custom Task States with the new states (each with a `variable-themed-color` token; the `--primidian-task-*` family).
- Must not conflict with normal checkboxes; Task List Kanban compatibility (`src/compat/95-compat-task-list-kanban.css`) untouched.
- Reading Mode + Live Preview per state.
- Incremental: each new state is its own self-contained addition; a task may add ONE subset, not all sixteen.
- Defaults: new states appear with researched default colours; existing 6 unchanged.

**Style Settings Destination:**

```
Top-level category: Editor & Markdown
Subcategory: Checkboxes & Tasks → Custom Task States
Setting(s): (existing 6) + newly added task-state colour controls
```
(Per `03` Checkbox Icons model and `08` §3.2.)

**Protected Existing Systems:** Checkbox component, existing 6 task states, Task List Kanban compatibility, checkbox animations/motion, Glow (Checkbox Glow), Blockquotes, Dividers, Animations.

**Dependencies:**

- Depends on: Task 0.1.
- Blocks: none.

**Difficulty / Risk:**

- Difficulty: Large (cumulative). Risk: HIGH per `09`/`10` vs MEDIUM per `06`; each increment is small.
- Scope: per-increment: 1-3 settings + tokens + one state's CSS (+ icon assets where applicable).
- DOM dependency: task-marker elements per state (CM6 + Reading). Mobile: cosmetic. Compatibility: Kanban via the protected compat file.

**Testing Checklist:**

- Each newly added state renders in Reading Mode + Live Preview
- Normal checkbox and existing 6 states unchanged
- Task List Kanban still displays checkbox proportions correctly
- Dark/Light; Restore Default; custom icons (where added) legible

**Subtasks (per increment — repeat the shape for each added state):**

- **4.3.1 — Select the next incremental state set** (reference `05` MISSING list / `03` icons).
- **4.3.2 — Add Style Settings** (Custom Task States addition).
- **4.3.3 — Declare colour tokens** (+ icon colour/radius tokens per `03`).
- **4.3.4 — Implement marker CSS** (following existing 6-state architecture).
- **4.3.5 — Add provenance badge** on the new state section.
- **4.3.6 — Test Reading Mode** + **4.3.7 — Test Live Preview**.
- **4.3.8 — Verify Task List Kanban compatibility**; **Build / validate.**

**Acceptance Criteria:**

- Incremental new states render correctly; existing states/checkboxes unchanged.
- Kanban compatibility intact (no change to protected compat file).
- Badge applied to newly added state sections only.
- Build passes after every increment.

---

## Phase 5 — Experimental / Investigation First

### Phase summary

| Field | Value |
|---|---|
| **Purpose** | Investigate → plan → implement ONE experimental feature at a time. |
| **Roadmap source** | `09: TIER 3 — EXPERIMENTAL` and `… → Phase 5: Investigation Needed (Tier 3, experimental)`. |
| **Risk profile** | High for DOM-uncertain features (Graph, Canvas); MEDIUM–HIGH for heading architecture work. |
| **Tasks in execution order** | 5.1, 5.2, 5.3, 5.4 |
| **Phase-level dependencies** | Task 0.1 for settings placement; 5.1/5.2 require DOM investigation first; 5.4 has an **unmet** documented dependency (see below). |
| **Important constraints** | Every Phase 5 feature MUST carry TWO badges: `[NEW — from Primary]` + `Experimental`. Investigation gate per feature; "investigated; not safe to ship yet" is a successful result. No brittle selectors are shipped on unstable DOM. |
| **Protected systems** | Graph/Canvas DOM-adjacent systems, heading architecture, gradients, Glow, Blockquotes, Dividers, Animations. |
| **Phase-level notes** | The Phase 5 prompt mandates recording investigation findings, DOM structure, selectors, compatibility considerations, why the feature is experimental, limitations, and a rollback procedure — as implementation notes kept SEPARATE from the frozen research documents. |

### Task 5.1 — Graph View Colors

**Task ID:** 5.1 (Phase 5)

**Feature Name:** Graph View Colors

**Phase:** Phase 5 (Roadmap Tier 3.3)

**Priority:** Experimental / High Risk (DOM uncertainty)

**Source / Provenance:** Primary-inspired (adaptation — new capability)

**User-facing tag:** `[NEW — from Primary]` + `Experimental`

**Primary References:**

- `03-Primary-Style-Settings.md` — "Graph": Resolved/Unresolved node colours, unresolved opacity, tag/attachment/active-file/hovered node colours, hovered-node line, text, line, arrow colours.
- `05-Style-Settings-Comparison.md` — "Graph — MISSING" (major gap #2).
- `06-Primary-Feature-Portability.md` — "Graph view colors: LOW, graph view DOM knowledge, Risk MEDIUM"; Phase C.
- `08-Proposed-Primidian-Settings-Organization.md` — §3.2 "Advanced → Graph View [NEW — from Primary]": Resolved/Unresolved/Tag/Attachment/Active File/Hovered Node colours, Text, Line, Arrow (9 settings).
- `09-Primary-Feature-Roadmap.md` — TIER 3.3. 10 settings; Risk HIGH; "Depends on: Graph view DOM investigation".
- `10-Primary-Primidian-Master-Analysis.md` — §8.3 High risk; §9 Open Question #4.

**Setting-count disagreement to preserve:** `08` lists 9 graph settings; `09` says ~10 (and the earlier corpus prose variously lists more); `03` has 10–11 including unresolved opacity and hovered-node line. Record the discrepancy at implementation; do not silently pick a count.

**Feature Description:**

Adds configurable colours for graph-view nodes (resolved/unresolved/tag/attachment/active/hovered), text, lines, and arrows. **Adaptation** — must be verified against the live Obsidian Graph view SVG DOM before any selector is written; if the DOM is unstable/unverifiable, the correct outcome is "investigated; not safe to ship yet" with documented evidence.

**Implementation Requirements:**

- Investigation MUST precede implementation: document SVG elements, classes, data attributes, inline styles, CSS variables, hover/selected states, and expected Obsidian-version stability (Phase 5 prompt).
- Style Settings (per `08`): Advanced → Graph View colour controls (record the setting-count decision).
- Tokens: graph colour tokens via the colour token cascade (dark/light).
- Ship as ONE coherent graph-colour subsystem only if reliably targetable; otherwise stop and report the blocker.
- Badges: both `[NEW — from Primary]` and `Experimental`.

**Style Settings Destination:**

```
Top-level category: Advanced
Subcategory: Graph View
Setting(s): Resolved/Tag/Attachment/Active File/Hovered Node Colour, Text, Line, Arrow Colour
            (+ Unresolved Node Colour/Opacity per recorded count)
```
(Per `08` §3.2.)

**Protected Existing Systems:** graph view behaviour, core colour architecture, Glow, Dividers, Blockquotes, Callouts, Animations.

**Dependencies:**

- Depends on: Task 0.1; Graph DOM investigation (mandatory).
- Blocks: none.

**Difficulty / Risk:**

- Difficulty: Medium. Risk: HIGH (`09`/`10` DOM-may-change) vs MEDIUM (`06`) — record both.
- Scope: ~9–10 settings + graph colour CSS.
- DOM dependency: GRAPH SVG DOM (uncertain — the blocking factor).
- Compatibility/mobile/performance: SVG target surface; keep selector count low.

**Testing Checklist:**

- Small and large graphs; tags/files/attachments nodes
- Hover + selected node states
- Text, lines, arrows colours
- Dark/Light; Restore Default; future-version drift watch

**Subtasks:**

- **5.1.1 — Investigate Graph DOM/SVG** (document findings; record stability assessment).
- **5.1.2 — Decision gate**: safe-to-style → proceed; else document blocker and STOP (successful outcome possible).
- **5.1.3 — Add Style Settings** (Advanced → Graph View) + badges (two).
- **5.1.4 — Declare tokens + implement graph-colour CSS**.
- **5.1.5 — Test node/line/arrow states** (small/large/hover/selected).
- **5.1.6 — Write implementation notes** (separate from research docs: DOM, selectors, compat, limitations, rollback).
- **5.1.7 — Build / validate.**

**Acceptance Criteria:**

- Either (a) a working graph-colour subsystem at Advanced → Graph View with both badges and build passes, or (b) a documented "investigated; not safe to ship yet" result with evidence. No brittle selectors shipped on unverified DOM.

### Task 5.2 — Canvas Colors

**Task ID:** 5.2 (Phase 5)

**Feature Name:** Canvas Colors

**Phase:** Phase 5 (Roadmap Tier 3.4)

**Priority:** Experimental / High Risk (DOM uncertainty)

**Source / Provenance:** Primary-inspired (adaptation — new capability)

**User-facing tag:** `[NEW — from Primary]` + `Experimental`

**Primary References:**

- `03-Primary-Style-Settings.md` — "Canvas": dot pattern colour, card label colour, Canvas Colors 1–7.
- `05-Style-Settings-Comparison.md` — "Canvas — MISSING" (major gap #3).
- `06-Primary-Feature-Portability.md` — "Canvas colors: LOW, canvas plugin DOM knowledge, Risk MEDIUM"; Phase C.
- `08-Proposed-Primidian-Settings-Organization.md` — §3.2 "Advanced → Canvas [NEW — from Primary]": Canvas Dot Pattern Colour, Canvas Card Label Colour, Canvas Colours (×7) → 9 settings.
- `09-Primary-Feature-Roadmap.md` — TIER 3.4. 9 settings; Risk HIGH; "Depends on: Canvas DOM investigation".
- `10-Primary-Primidian-Master-Analysis.md` — §8.3 High risk; §9 Open Question #4.

**Feature Description:**

Adds configurable Canvas colours: dot pattern, card label, and the 7-canvas colour palette. **Adaptation** — requires live Obsidian Canvas DOM investigation (nodes/cards, labels, dot pattern, backgrounds, connections, selection states) before implementation; do NOT blindly style generic canvas elements; if unstable, document the blocker and stop.

**Implementation Requirements:**

- Investigation first: canvas DOM structure, card/label/pattern/connection/selection selectors, stability across Obsidian versions.
- Style Settings (per `08`): Advanced → Canvas (9 controls).
- Tokens: canvas colour tokens via the token cascade.
- Ship only if reliably targetable; else document and stop.
- Badges: both `[NEW — from Primary]` and `Experimental`.

**Style Settings Destination:**

```
Top-level category: Advanced
Subcategory: Canvas
Setting(s): Canvas Dot Pattern Colour, Canvas Card Label Colour, Canvas Colours (1–7)
```
(Per `08` §3.2.)

**Protected Existing Systems:** Canvas behaviour, core colour architecture, Glow, Dividers, Blockquotes, Callouts, Animations.

**Dependencies:**

- Depends on: Task 0.1; Canvas DOM investigation (mandatory).
- Blocks: none.

**Difficulty / Risk:**

- Difficulty: Medium. Risk: HIGH (`09`/`10`) vs MEDIUM (`06`) — record both.
- Scope: 9 settings + canvas colour CSS.
- DOM dependency: CANVAS DOM (uncertain — blocking factor).

**Testing Checklist:**

- Empty canvas; multiple cards; selected card; labels; dot pattern; zoom
- Connections/selection states; Dark/Light; Restore Default

**Subtasks:**

- **5.2.1 — Investigate Canvas DOM** (document findings).
- **5.2.2 — Decision gate** → proceed or document blocker and STOP.
- **5.2.3 — Add Style Settings** (Advanced → Canvas) + badges (two).
- **5.2.4 — Declare tokens + implement canvas-colour CSS.**
- **5.2.5 — Test card/label/pattern/selection states.**
- **5.2.6 — Write implementation notes** (DOM, selectors, compat, limitations, rollback).
- **5.2.7 — Build / validate.**

**Acceptance Criteria:**

- Either a working Canvas-colour subsystem with both badges, or a documented "not safe to ship yet" result. No brittle selectors on unverified DOM; build passes if shipped.

### Task 5.3 — Per-Heading Border (4 Sides)

**Task ID:** 5.3 (Phase 5)

**Feature Name:** Per-Heading Border (4 Sides)

**Phase:** Phase 5 (Roadmap Tier 3.5)

**Priority:** Experimental / High Risk (CSS complexity)

**Source / Provenance:** Primary-inspired (adaptation — new capability)

**User-facing tag:** `[NEW — from Primary]` + `Experimental`

**Primary References:**

- `03-Primary-Style-Settings.md` — "Notes and Files → Heading 1-6": per-heading Border Thickness, Style, per-side (Top/Right/Bottom/Left) colours, Roundness.
- `05-Style-Settings-Comparison.md` — Headings table: per-heading border (4 sides) and radius — MISSING.
- `06-Primary-Feature-Portability.md` — "Per-heading border (4 sides): MEDIUM, heading CSS expansion, Risk MEDIUM"; Phase D.
- `08-Proposed-Primidian-Settings-Organization.md` — §3.2 "Editor & Markdown → Headings → Heading 1–6" (final home; per-heading settings are listed per level; document 08 does not model the 24-setting border model).
- `09-Primary-Feature-Roadmap.md` — TIER 3.5. 24 settings (6×4) + CSS; Risk HIGH; note: "Could be simplified to 'border all sides' + 'border radius'".
- `10-Primary-Primidian-Master-Analysis.md` — §5.3 (avoid flat per-component colour explosion); §9 Open Question #5 (is 4-side control needed or is "all sides" sufficient?).

**Feature Description:**

Adds heading border control per level — 4-sided (or, per the roadmap's suggested simplification, "all sides" + radius). Primidian currently has no heading borders. **Adaptation/simplification** — do NOT auto-add 24 settings; evaluate the usable architecture (enable/disable, colour, width, radius, style, optional per-level control) first. Defaults must keep borders OFF (current appearance preserved). **Adaptation via the `08` lean-heading philosophy (5 settings per level vs Primary's 16).**

**Implementation Requirements:**

- Investigate the heading architecture (post-Task 1.2 per-heading infrastructure).
- Design the smallest viable control set; record the decision (24 vs simplified).
- Style Settings: per `08` heading placement (per-level sections). Defaults off.
- Tokens: border tokens per the heading component token pattern.
- Interplay checks: wrapping, readability, heading gradients, underlines/accent bars, Reading Mode + Live Preview.
- Badges: both `[NEW — from Primary]` and `Experimental`.

**Style Settings Destination:**

```
Top-level category: Editor & Markdown
Subcategory: Headings → Heading 1 … Heading 6
Setting(s): (per heading level, per recorded design) Border Enable, Border Width,
            Border Style, Border Colour, Border Radius — or "all sides" + radius
```
(Per `08` §3.2 heading-level sections; model decision recorded at implementation.)

**Protected Existing Systems:** heading style variants (underline/accent bar), heading gradients, Typography, Glow, Dividers, Blockquotes, Callouts, Animations.

**Dependencies:**

- Depends on: Task 0.1. (Roadmap states "Depends on: None"; the per-heading infrastructure from Task 1.2 is a practical dependency — record this.)
- Blocks: none.

**Difficulty / Risk:**

- Difficulty: Large (per roadmap effort). Risk: HIGH (`09`) vs MEDIUM (`06` — "Risk MEDIUM") — record both.
- Scope: 6–24 settings + heading border CSS.
- DOM dependency: heading elements (stable). Mobile/performance: cosmetic.

**Testing Checklist:**

- All 6 levels; wrapping; readability; inline formatting
- Coexistence with heading gradients, underlines, accent bars, per-heading background (5.4 if later)
- Reading Mode + Live Preview; Dark/Light; Restore Default
- Default = no borders

**Subtasks:**

- **5.3.1 — Investigate heading CSS architecture/state** (post-Task 1.2 per-heading infrastructure).
- **5.3.2 — Decide control model** (record 24-setting vs simplified "all sides" + radius decision per roadmap note / open question #5).
- **5.3.3 — Add Style Settings** (Heading N → Border) + badges (two).
- **5.3.4 — Declare tokens + implement border CSS** (defaults OFF).
- **5.3.5 — Interplay checks** (wrapping, readability, gradients, underlines, accent bars).
- **5.3.6 — Test Reading Mode** + **5.3.7 — Test Live Preview.**
- **5.3.8 — Build / validate** + write implementation notes (limitations, rollback).

**Acceptance Criteria:**

- Border controls at Editor & Markdown → Headings → Heading N with both badges; default = no borders.
- Coexists with heading gradients/underline/accent-bar without breaking wrapping or readability.
- Reading Mode + Live Preview correct; build passes.

### Task 5.4 — Per-Heading Background

**Task ID:** 5.4 (Phase 5)

**Feature Name:** Per-Heading Background

**Phase:** Phase 5 (Roadmap Tier 3.6)

**Priority:** Experimental / Medium Risk

**Source / Provenance:** Primary-inspired (adaptation — new capability)

**User-facing tag:** `[NEW — from Primary]` + `Experimental`

**Primary References:**

- `03-Primary-Style-Settings.md` — "Notes and Files → Heading 1-6 → Background Color" (per-level `variable-themed-color`).
- `05-Style-Settings-Comparison.md` — Headings table: "Per-heading background — MISSING".
- `06-Primary-Feature-Portability.md` — "Per-heading background: MEDIUM, heading CSS expansion, Risk MEDIUM"; Phase D.
- `08-Proposed-Primidian-Settings-Organization.md` — §3.2 "Editor & Markdown → Headings → Heading 1–6" (final placement; per-heading level sections).
- `09-Primary-Feature-Roadmap.md` — TIER 3.6. 6 new settings + CSS; Risk MEDIUM; "Depends on: **Per-heading vertical align toggle**".
- `10-Primary-Primidian-Master-Analysis.md` — §9 Open Question #3 (organization order) and overall §5 (avoid flat per-component expansion).

**Dependency gap (explicit):** the roadmap documents a dependency of this task on a "Per-heading vertical align toggle" — a feature that is NOT present in the roadmap or document 08 as an independent task. This index therefore records Task 5.4's dependency as **unmet/errant**: implementation must proceed against the heading architecture as it exists, and the task report must state whether the vertical-align prerequisite matters or was a stale note.

**Feature Description:**

Lets each heading level receive an independent background colour/block highlight. Primidian currently gives headings no background. **Adaptation/simplification** — one colour per heading level, defaulting to none so current appearance is preserved. Must not interfere with heading gradients, underlines, accent bars, borders (Task 5.3), wrapping, or readability in either view.

**Implementation Requirements:**

- Investigate heading architecture (as built through Tasks 1.2/2.3/2.4/5.3).
- Style Settings: 6 per-heading background colour controls under Headings → Heading N (default transparent/off).
- Tokens: `--primidian-hN-bg`-style tokens via the colour cascade (dark/light where the design needs separate values; otherwise single neutral default).
- Selectors: heading elements in Reading Mode + Live Preview; wrapping-safe (background follows the box).
- Interplay: ensure background does not obscure gradient text, interplay with underline/accent-bar and per-heading borders (5.3) is coherent.
- Badges: both `[NEW — from Primary]` and `Experimental`.

**Style Settings Destination:**

```
Top-level category: Editor & Markdown
Subcategory: Headings → Heading 1 … Heading 6
Setting(s): (per heading level) Background Colour
```
(Per `08` §3.2 heading-level sections.)

**Protected Existing Systems:** heading style variants (underline/accent-bar), heading gradients, heading tokens, Typography, Glow, Dividers, Blockquotes, Callouts, Animations.

**Dependencies:**

- Depends on: Task 0.1. Roadmap states this depends on a per-heading vertical-align toggle which has no roadmap task — **unmet dependency recorded** (verify at implementation).
- Blocks: none.

**Difficulty / Risk:**

- Difficulty: Medium. Risk: MEDIUM (`09`) vs MEDIUM (`06`) — documents agree.
- Scope: 6 settings + tokens + heading background CSS.
- DOM dependency: heading elements (stable). Mobile/performance: cosmetic.

**Testing Checklist:**

- All 6 levels; wrapping; readability with long titles
- Coexistence with heading gradients, underline/accent-bar, per-heading border if later present
- Reading Mode + Live Preview; Dark/Light; Restore Default; default = no background

**Subtasks:**

- **5.4.1 — Investigate heading/background interplay** (incl. vertical-align prerequisite status).
- **5.4.2 — Add Style Settings** (Heading N → Background) + badges (two).
- **5.4.3 — Declare background tokens.**
- **5.4.4 — Implement heading background CSS** (wrapping-safe; defaults off).
- **5.4.5 — Test gradients/underline/accent-bar interplay.**
- **5.4.6 — Test Reading Mode** + **5.4.7 — Test Live Preview.**
- **5.4.8 — Build / validate** + write implementation notes (limitations, rollback).

**Acceptance Criteria:**

- Background controls at Headings → Heading N with both badges; default = no background.
- Wrapping/readability/gradient/underline/accent-bar behaviour intact in both views.
- Build passes; any unresolved vertical-align dependency documented.

---

## Master Dependency Graph

Text-based dependency map derived strictly from the research. Arrows mean "must be completed (or at least its prerequisite state established) before the target runs cleanly".

```
Phase 0
────────────────────────────────────────────────────────────────
Task 0.1  (Style Settings Reorganization)
   │   blocks ALL later tasks (settings homes)
   ▼
Phase 1  (independent, any order; IDs fixed)
   ├── Task 1.1  Font Feature Settings
   ├── Task 1.2  Per-Heading Font Family ──────────────┐   (blocks 2.3, 2.4)
   ├── Task 1.3  Link Underline Controls              │
   ├── Task 1.4  Bold Modifier                        │
   ├── Task 1.5  Non-Markdown Link Colors             │
   ├── Task 1.6  Editor Gutter Colors                 │
   ├── Task 1.7  Font Size Tiers                      │
   └── Task 1.8  Font Weight Tiers                    │
                                                      ▼
Phase 2                                               │
   ├── Task 2.1  Editor Background Patterns           │
   ├── Task 2.2  Active Line Highlighting             │
   ├── Task 2.3  Per-Heading Text Alignment ◄─────────┘   (depends on 1.2)
   ├── Task 2.4  Per-Heading Line Height ◄────────────┘   (depends on 1.2)
   └── Task 2.5  Highlight Combinations

Phase 3  (each depends only on 0.1)
   ├── Task 3.1  Status Bar Slide-Out Style
   ├── Task 3.2  Ribbon Slide-Out on Hover
   ├── Task 3.3  File Header Hover-Reveal
   └── Task 3.4  Note Embed Per-Side Border

Phase 4  (each depends on 0.1; 4.2 explicitly on Settings Reorganization)
   ├── Task 4.1  Progress Bar Customization
   ├── Task 4.2  Simplified Folder Colors (6)
   └── Task 4.3  Additional Task Types (incremental)

Phase 5  (each depends on 0.1; 5.1/5.2 gate on DOM investigation)
   ├── Task 5.1  Graph View Colors        — gate: Graph DOM investigation
   ├── Task 5.2  Canvas Colors            — gate: Canvas DOM investigation
   ├── Task 5.3  Per-Heading Border       — practical dependency: Task 1.2 infrastructure
   └── Task 5.4  Per-Heading Background   — documented (unmet) dependency: per-heading
                                            vertical align toggle (no roadmap task)
```

Documented dependency rules (only research-established edges are drawn):

1. `0.1` — prerequisite for every other task.
2. `1.2 → 2.3`, `1.2 → 2.4` — per `09` dependency graph ("Per-heading font family ─── Phase 2 (Content)").
3. `4.2 → 0.1` — explicitly "Depends on: Settings reorganization" in `09` TIER 3.1.
4. `5.1 → DOM investigation`, `5.2 → DOM investigation` — "Depends on: Graph/Canvas DOM investigation" in `09`.
5. `5.4 → per-heading vertical align toggle` — recorded in `09` but the prerequisite has no task; marked **unmet**.
6. `5.3` / `5.4` — practical reliance on the per-heading token/consumer infrastructure established by `1.2` (documented in the task entries, not drawn as a hard edge in `09`).

Everything else is phase-sequential only (Phase 1 → 2 → 3 → 4 → 5 is the roadmap's ordering discipline, not a hard per-task dependency chain).

---

## Master Regression Strategy

Every completed task must prove the protected systems still work. The global rule:

> A feature task is not complete until every system in its **Protected Existing Systems** list
> has been re-tested and any diff that touches them has been reviewed.

### Core regression suite (run after EVERY task)

- **Blockquotes** — all four presets (Simple / Boxy / Minimal / Fade) render identically; `.HyperMD-quote*` and Reading/Live Preview blockquote selectors untouched.
- **Code Blocks** — background, syntax colours, copy button, line numbers unchanged.
- **Glow System** — experimental badge renders; global glow + UI glow + glow targets still behave (verify no glow regression if the task touched `box-shadow`/`color-mix` surfaces).
- **Gradient System** — bold/heading/divider gradients unaffected where task touches text or headings.
- **Dividers** — all variants + divider shimmer unchanged.
- **Tabs** — tab motion, raised card, indicator, close button unchanged.
- **Callouts** — styling unchanged; callout content inside tested surfaces renders.
- **Task List Kanban compatibility** — checkbox proportions regression (especially Task 4.3).
- **Reading Mode + Live Preview** — both views for every touched component.
- **Reduced motion** — `prefers-reduced-motion` still respected; no new `transition: all`.
- **Performance** — no banned patterns (`transition: all`, `@import`, `:has()` on `.cm-line`); compositor-friendly motion only.

### Per-phase regression emphasis

| Phase | Regression emphasis |
|---|---|
| Phase 0 | Every existing setting, ID, default survives; no visual diff; Glow Experimental badge still renders |
| Phase 1 | Typography, Links (sweep), Code/Inline Code, Code Blocks Line Numbers |
| Phase 2 | Editor surface, selection/caret, Code Blocks, Callouts, Blockquotes, Tables |
| Phase 3 | Status bar (existing styles), ribbon, titlebar/tabs, embeds/nested embeds, mobile layout |
| Phase 4 | Checkboxes + Task List Kanban, file explorer hover, colour/token cascade, Glow/Gradient |
| Phase 5 | Heading gradients/underline/accent-bar; Graph/Canvas native behaviours; DOM drift watch |

Adapt the suite to the feature — a typography task does not need deep canvas regression, but every task lists its own protected systems explicitly.

---

## Implementation Workflow

The mandated ONE-FEATURE-AT-A-TIME workflow for every task:

1. Read the task entry in this index.
2. Read every research document referenced by that task.
3. Inspect only the relevant `src/` source files.
4. Inspect protected systems before modifying any shared tokens/selectors (per the task's Protected Existing Systems list).
5. Implement ONLY that task.
6. Build (`node build.mjs`).
7. Run validation (build validation errors: no `transition: all`, no `@import`, no Tier-1 leak outside `tokens/`, no `:has()` on `.cm-line`, class-select ↔ `body.*` wiring, `variable-*` ↔ token declaration, defaults present).
8. Test the task (its dedicated Testing Checklist).
9. Test protected systems for regressions (Master Regression Strategy).
10. Review the `git diff`.
11. Only then mark the task complete (in this index's status log).
12. Commit the task independently.

**Stop conditions.** Do not force a feature through: if the required Obsidian DOM does not exist or is fundamentally inaccessible, if the feature conflicts with a hard architectural constraint, if the build system prevents a safe implementation, or if implementing it would require modifying unrelated systems, stop and document the blocker. For Phase 5 tasks, "investigated; not safe to ship yet" is a successful result.

**Never.** Implement an entire phase automatically. Combine unrelated tasks. Renumber task IDs. Modify the research documents, `Primary.css`, `Obsidianite.css`, or `theme.css` directly.

---

## Master Index Validation Checklist

- [x] Every feature in document 09 appears in the master index (Phases 1–5: 24 features; Phase 1 tasks 1.1–1.6), plus Phase 0.
- [x] Every feature has a unique permanent task ID (0.1, 1.1–1.8, 2.1–2.5, 3.1–3.4, 4.1–4.3, 5.1–5.4).
- [x] Every feature is assigned to the same roadmap phase as document 09 (execution order preserved).
- [x] Every feature references every research document that actually discusses it.
- [x] Every feature uses the correct Style Settings organization from document 08; places not defined by 08 are flagged explicitly.
- [x] Every newly imported Primary feature has the correct provenance tag classification.
- [x] Internal/developer classifications (`[UNCHANGED]`, `[EXPANDED]`, `[REORGANIZED]`) are NOT turned into user-facing badges — clearly prohibited in the Feature Tag System section.
- [x] Blockquote protection rules are explicitly present (— extreme rules section).
- [x] No feature requires Blockquote customization; the NEW-preset mechanism is defined should a future task need it.
- [x] Dependencies are documented (per-task + Master Dependency Graph; disagreements left visible).
- [x] Risk/difficulty matches research; disagreements recorded rather than silently resolved.
- [x] Subtasks exist for every feature.
- [x] Acceptance criteria exist for every feature.
- [x] All statuses begin NOT STARTED.
- [x] No production/source files were modified.