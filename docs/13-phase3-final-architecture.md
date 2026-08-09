# 13 — Phase 3 Final Architecture & Implementation Order

**Status:** Decisions locked. This document supersedes ambiguity in `06`–`09`; those remain the detailed rationale.
**Approved:** 2026-08-08 — all four gates (G-1 … G-4) plus additional requirements A–F.

---

## 1. Locked decisions

| # | Decision | Locked value |
|---|---|---|
| G-1 | Licence | **MIT.** Clean-room reimplementation of Primary's techniques. Zero Primary CSS text. `Primary.css` is reference-only, excluded from the build, never redistributed as part of the theme. |
| G-2 | Checkboxes | **Replace**, not patch. Native `input[type="checkbox"]` component + isolated compatibility layer. |
| G-3 | Light mode | **In v1.** Full token foundation, Style Settings-customisable. Curated *profiles* deferred. |
| G-4 | Prism-Dracula | **Dropped.** No documented dependency exists. Syntax colours re-derived from the Primidian palette, covering both CM6 (`.cm-*`) and Obsidian's Prism output (`.token.*`). |
| A | R&D docs | **Preserved.** All 13 documents retained. README summarises; it does not replace. |
| B | Checkbox scope | **Component-oriented.** Core system is plugin-agnostic. TLK support is an additive compat layer. |
| C | Inline code | **Systemic fix**, not a one-off selector. Covers Reading, Live Preview, embeds, popovers, Canvas, plugin-rendered markdown. |
| D | Tokens | **Primitives → Semantic → Component → Obsidian bridge.** No unnecessary `!important`. User-facing setting categories only. |
| E | Scope | Ten items in. Seven items explicitly out. |
| F | Testing | Reproducible checklist, verified by **rendered result**, not CSS inspection. |

---

## 2. The two governing rules

### Rule 1 — The Primidian Directive (customisability)

> Every themeable value is a CSS custom property declared at `body`, `.theme-dark`, or `.theme-light`, and consumed only via `var()` at the point of use.

Because Style Settings injects at `body.css-settings-manager` (specificity `0,2,1`), any theme default declared at higher specificity — or with `!important` — becomes permanently uncustomisable. Usage-site selectors may be as specific as necessary **provided they only read variables**.

### Rule 2 — No structural assumptions about ancestors (robustness)

> A component's visual rendering must depend only on the element that semantically *is* that component — never on an ancestor's tag, class, or box model.

This is the generalised lesson from Bug #1. Obsidianite drew a checkbox on `li.task-list-item::before`, so the checkbox ceased to exist wherever that `li` did not. Rule 2 forbids that class of design outright. It is what makes the checkbox fix a *component*, not a *patch*, and what will make future task-plugin support nearly free.

---

## 3. Layer model and cascade order

Ordering is by numeric filename prefix. The build concatenates in sorted order. No `@import`, no `@layer` (see `06-*` §5).

```
00  banner            Licence + attribution. Always first, never stripped.
01  settings          /* @settings */ YAML for Style Settings.

10  primitives        Tier 1 — colour ramps. hsl(). Never referenced outside tokens/.
11  semantic-shared   Tier 2 — body scope: spacing, radius, motion, typography.
12  semantic-dark     Tier 2 — .theme-dark palette.
13  semantic-light    Tier 2 — .theme-light palette (designed, not inverted).
14  components        Tier 3 — component tokens, with inert defaults.
15  obsidian-bridge   Tier 4 — assign Obsidian's own vars from Tier 2/3.

20  reset             Scrollbars, selection, focus rings.
21  typography        Body text, paragraphs, headings base metrics.

30  workspace         Ribbon, sidebars, splits, drop overlay, vault profile.
31  titlebar-statusbar
32  tabs
33  explorer          File explorer, bookmarks, outline, search, backlinks.
34  modals            Modals, popovers, suggesters, command palette, notices.
35  controls          Buttons, inputs, dropdowns, toggles, sliders, settings panel.

40  editor-shared     Valid in BOTH Live Preview and Reading Mode.
41  live-preview      .markdown-source-view.mod-cm6 only.
42  reading-mode      .markdown-rendered only.

50  headings
51  dividers
52  links
53  emphasis          bold / italic / highlight / strike.  ← Bug #2 source guarded here
54  inline-code                                            ← Bug #2 fixed here
55  code-blocks
56  syntax            CM6 + Prism token colours, one palette. Replaces Dracula.
57  blockquotes
58  callouts          NEW — Obsidianite had none.
59  lists
60  checkboxes                                             ← Bug #1 fixed here
61  tables            NEW
62  tags
63  embeds            NEW
64  properties        NEW
65  media
66  misc              footnotes, math, mermaid, tooltips.

70  variants-dividers
71  variants-headings
72  variants-scaffold  One-option class-selects for deferred components.

80  gradients          Global gradient system + master off-switch.
81  motion             Keyframes + prefers-reduced-motion + master off-switch.

90  mobile             .is-phone / .is-mobile / .is-tablet.

95  compat-task-list-kanban
```

**Why this order works:** tokens precede consumers; variants can only override, never fight; the two system layers (gradients, motion) sit after everything they must be able to neutralise; compatibility is last and deletable without consequence.

---

## 4. Bug #1 — final implementation design

### Root cause (preserved, per requirement 2)

Obsidianite hid the real `<input>` with `opacity: 0` and painted a substitute on **`li.task-list-item::before`** at `left: -25px`, inside 30px of reserved parent padding.

- **Why it worked for normal task lists:** Obsidian's Reading Mode emits exactly `<ul class="contains-task-list"><li class="task-list-item"><input type="checkbox">…`. The required ancestor and the required positioned block box are both present, so the substitute rendered in the reserved gutter.
- **Why it failed for Task List Kanban:** TLK's `TaskStatusMarker.svelte` emits `<span class="task-status-marker"><span class="task-list-item HyperMD-task-line"><input class="source-status-checkbox">`. There is **no `.contains-task-list` ancestor** (so the substitute rules never match) and the `.task-list-item` element is a `<span>` forced to `display: contents` (so it generates no box to position against). TLK additionally sets `appearance: none` with no fallback paint, explicitly delegating rendering to the theme — a delegation Obsidianite could not accept, having zero `input[type="checkbox"]` rules. Inside card bodies the selectors *do* match, and the outcome is worse: TLK's `padding-left: 0 !important` removes the gutter and `.task { overflow: hidden }` clips the substitute, while Obsidianite's `opacity: 0` still wins on the input.

### The new design

```
The checkbox IS the input.
  - appearance: none on the input itself
  - the box     = the input's own border/background
  - the marker  = the input's own ::after, mask-image, inset: 0
  - no ancestor is referenced for painting
  - opacity is never used to hide it
```

This satisfies Rule 2 by construction. It works in any DOM that contains an `<input type="checkbox">`, which is the only thing the component semantically requires.

**Task state support** uses a three-way selector so every DOM shape TLK and Obsidian produce is covered:

```
input[data-task="X"]            ← TLK sets data-task on the input itself
li[data-task="X"] > input       ← Obsidian Live Preview / Reading Mode
li[data-task="X"] > p > input   ← Obsidian loose-list Reading Mode
```

**Compat layer** (`95-*`) contains only what the core cannot know: harmonising with TLK's own `--task-status-marker-size` token. Two rules, zero `!important`.

---

## 5. Bug #2 — final implementation design

### Root cause (preserved, per requirement C)

`Obsidianite.css:619` applies `-webkit-text-fill-color: transparent` to bare `strong`. That property **inherits**, and it takes precedence over `color` for glyph fill. A `<code>` inside a `<strong>` therefore inherits `transparent` and paints no glyphs — while its own `background-color` still renders, producing an empty pill.

`Obsidianite.css:1098` sets `color: … !important` on inline code, which cannot help: `!important` on `color` does not defeat an inherited `-webkit-text-fill-color`.

**Evidence the original author knew this failure mode:** `Obsidianite.css:639–642` adds `-webkit-text-fill-color: initial` for `strong kbd` — the exact escape hatch required — but the equivalent reset was never added for `code`, `mark`, `a`, or `.tag`.

Secondary cause: `.markdown-preview-view code` scopes inline code to the main reading pane only, leaving embeds, hover popovers, Canvas cards, and plugin-rendered markdown unstyled.

### The five-layer fix

| Layer | Where | Action |
|---|---|---|
| 1 | `54-inline-code` | Target `.markdown-rendered code:not(pre > code)` + `.cm-inline-code`; set **both** `color` and `-webkit-text-fill-color`. |
| 2 | `54-inline-code` | Reset `-webkit-text-fill-color: initial` on every inline child of gradient-clipped text (`code, kbd, mark, a, .tag, .math`). |
| 3 | `53-emphasis` | Guard the gradient at source: `strong:not(:has(code, kbd, mark, a, .tag))`. |
| 4 | `80-gradients` | Master off-switch makes the offending property structurally absent. |
| 5 | `54-inline-code` | Remove the `!important`, restoring Style Settings customisability. |

Layers 1–3 are each independently sufficient. Defence in depth is warranted because `-webkit-text-fill-color` inheritance is easy to reintroduce accidentally.

---

## 6. Implementation order

Dependency-ordered. Each step is buildable and inspectable.

| # | Step | Files |
|---|---|---|
| 1 | Repo scaffold | `manifest.json`, `LICENSE`, `package.json`, `build.mjs`, `.gitignore` |
| 2 | Banner | `src/00-banner.css` |
| 3 | Token foundation | `src/tokens/10` … `15` |
| 4 | Base + reset | `src/base/20`, `21` |
| 5 | Core UI | `src/ui/30` … `35` |
| 6 | Editor split | `src/editor/40` … `42` |
| 7 | Text components | `src/components/50` … `53` |
| 8 | **Inline code (Bug #2)** | `src/components/54` |
| 9 | Code blocks + syntax | `src/components/55`, `56` |
| 10 | Block components | `src/components/57` … `59` |
| 11 | **Checkboxes (Bug #1)** | `src/components/60` |
| 12 | Remaining components | `src/components/61` … `66` |
| 13 | Variants | `src/variants/70` … `72` |
| 14 | Systems | `src/systems/80`, `81` |
| 15 | Mobile | `src/platform/90` |
| 16 | **TLK compat** | `src/compat/95` |
| 17 | Style Settings YAML | `src/01-settings.css` |
| 18 | Build → `theme.css` | |
| 19 | Test checklist | `docs/14-test-checklist.md` |
| 20 | README | `README.md` |

Style Settings YAML is written **last** because every setting `id` must correspond to a token that already exists — writing it after the tokens are final eliminates an entire class of dangling-setting bugs, and the build's cross-check verifies it.

---

## 7. Scope contract (requirement E)

**In Phase 3:** core architecture · Obsidianite visual foundation · clean-room Primary-inspired motion · light + dark foundations · robust checkbox component · TLK compatibility · inline-code fix · initial Style Settings · initial variants (dividers, headings) · gradient system.

**Not in Phase 3:** colour-profile management · preset library · code-block line numbers · code-block language headers · copy buttons · advanced code-block features · large variant collections · unrelated plugin integrations.

Deferred items must remain *enabled* by the architecture and *absent* from the implementation.

---

## 8. Invariants for the build

| # | Invariant |
|---|---|
| I-1 | `Primary.css` and `Obsidianite.css` are never modified, never built, never redistributed. |
| I-2 | No Primary CSS text appears in `src/`. |
| I-3 | The banner in `src/00-banner.css` is always first and never altered. |
| I-4 | No Tier-1 primitive (`--primidian-c-*`) is referenced outside `src/tokens/`. |
| I-5 | `!important` budget: ≤ 5 functional, plus accessibility guards, each commented. |
| I-6 | No `transition: all`. |
| I-7 | Every Style Settings entry declares a default. |
| I-8 | Setting `id` == CSS variable name minus `--`. |
| I-9 | Setting ids are frozen from v1.0 — renaming discards user data. |
| I-10 | `:has()` only on `strong` and headings; never on `.cm-line`. |
