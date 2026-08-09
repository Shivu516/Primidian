# Primidian — R&D Documentation Index

> **Status:** Phase 1 (Reconnaissance) and Phase 2 (Architecture Proposal) complete.
> **No theme code has been written.** No reference file has been modified or deleted.
> This documentation set is the deliverable required by section 23 of the project brief.

---

## Reading Order

| # | Document | Purpose |
|---|----------|---------|
| 00 | `00-INDEX.md` (this file) | Entry point, executive summary, decision log |
| 01 | `01-reconnaissance-obsidianite.md` | Full teardown of `Obsidianite.css` |
| 02 | `02-reconnaissance-primary.md` | Full teardown of `Primary.css` |
| 03 | `03-comparison-and-conflicts.md` | Side-by-side, keep/drop/port decisions, conflict register |
| 04 | `04-bug-01-task-list-kanban.md` | Root-cause analysis of the Kanban checkbox bug |
| 05 | `05-bug-02-inline-code-reading-mode.md` | Root-cause analysis of the inline-code bug |
| 06 | `06-css-architecture.md` | Proposed token system, file layout, build strategy |
| 07 | `07-style-settings-architecture.md` | Proposed Style Settings config, verified against plugin source |
| 08 | `08-component-variant-architecture.md` | Variant system for dividers, headings, and beyond |
| 09 | `09-gradient-and-animation-systems.md` | Global gradient system + motion system design |
| 10 | `10-licensing-and-attribution.md` | License findings, obligations, and risk assessment |
| 11 | `11-testing-strategy.md` | Test matrix and manual verification checklist |
| 12 | `12-implementation-roadmap.md` | Phased plan, risks, unknowns, open questions |
| 13 | `13-phase3-final-architecture.md` | Locked decisions and build order for the v1.0 implementation |
| 14 | `14-test-checklist.md` | Reproducible in-Obsidian test checklist |
| 15 | `15-v1.1-feature-pass.md` | v1.1: divider redesign, dimensions, tab motion, glow, colour-picker fix, line numbers |

---

## Executive Summary

### What was inspected

| Artifact | Size | What it is |
|---|---|---|
| `Obsidianite.css` | 1,481 lines / 34 KB | Obsidianite **v2.1.0** by Benny Guo. Hand-written, unminified, dark-only. |
| `Primary.css` | 3,878 lines / 1.72 MB | Primary by Cecilia May. Minified CSS (4 mega-lines) + embedded base64 webfonts + a 3,708-line `@settings` YAML block. |
| `references/task-list-kanban/` | main.js 1.25 MB, styles.css 33 KB | Task List Kanban **v2.13.0** (Chris Kerr / Erika Rice Scherpelz). Svelte-compiled. |
| `references/obsidian-style-settings/` | main.js 155 KB | Style Settings **v1.0.9** (mgmeyers). Used to verify supported setting types. |

### The single most important finding

**The two themes are licensed incompatibly for a naive merge.**

- **Obsidianite → MIT** (permissive; attribution required, otherwise free to copy/modify/relicense).
- **Primary → GNU GPL v3** (copyleft; *any* derivative work that includes Primary's code must itself be GPLv3).

Primary's own header states the licence explicitly and adds *additional* social requirements (a visible Ko-fi link and a visible link to the original repo).

**Consequence for the project:** Primidian can freely use Obsidianite as its visual baseline under MIT. It **cannot** copy Primary's CSS text and remain MIT. Two viable paths exist (detailed in `10-licensing-and-attribution.md`); the recommendation is **Path A: clean-room reimplementation of animation *concepts* only**, which keeps the project MIT and avoids copyleft entirely. This is also what the brief already asks for in §3.6 and §22.2.

### The two bugs — root causes identified

**Bug #1 — Task List Kanban checkboxes.** Not a specificity war and not an `appearance` conflict. Obsidianite deliberately sets the real `<input type="checkbox">` to `opacity: 0` and paints a fake checkbox with `::before`/`::after` on the **parent `<li class="task-list-item">`**, positioned with hard-coded negative offsets (`left: -25px`). Task List Kanban never renders that parent `<li>` in a normal list context — its `TaskStatusMarker.svelte` emits a bare `<input class="task-list-item-checkbox source-status-checkbox">` inside a `<span class="task-status-marker">`, and it forces the wrapping `.task-list-item` to `display: contents`. Result: the real input is invisible (opacity 0, inherited from Obsidianite's descendant selector) while the `::before` that would replace it either never renders or is positioned 25px outside a 16px flex box. Full evidence chain in `04-*`.

**Bug #2 — Inline code in Reading Mode.** Obsidianite applies `-webkit-background-clip: text; -webkit-text-fill-color: transparent` to bare `strong` (line 616–624). `-webkit-text-fill-color` **inherits**. Any `<code>` nested inside a `<strong>` — and, more commonly, `<code>` inside a bolded link or a heading — inherits `transparent` fill while the gradient background is clipped to the *parent's* text box, so the code text renders with no visible glyphs. Obsidianite's own inline-code rule (line 1088–1099) sets `color` but **never resets `-webkit-text-fill-color`**, so `color` is overridden by the inherited fill. The theme already proves it knows about this class of bug — it patches exactly this for `<kbd>` at line 639–642 (`-webkit-text-fill-color: initial`) but forgot `code`. Full evidence chain in `05-*`.

### Architectural recommendation in one paragraph

Build Primidian as a **source-of-truth multi-file SCSS-less CSS project** (plain CSS `@layer`-ordered partials) concatenated by a trivial build script into a single distributable `theme.css`, because Obsidian only loads one file. Drive everything from a **three-tier token system**: Tier 1 primitive palettes (`--primidian-c-*`), Tier 2 semantic tokens (`--primidian-bg-primary`, `--primidian-accent`), Tier 3 component tokens (`--primidian-h1-color`). Obsidian's own `--background-primary` etc. are then *assigned from* Tier 2, which means the theme cooperates with (rather than fights) Obsidian native styling and any plugin that reads Obsidian variables — including Task List Kanban, which reads `--background-primary`, `--interactive-accent`, `--text-muted`, and `--checkbox-size`.

---

## Decision Log (proposed, pending your review)

| ID | Decision | Rationale | Status |
|---|---|---|---|
| D-01 | Licence Primidian as **MIT** | Matches Obsidianite (the actual code baseline); avoids GPL contamination | **Needs approval** |
| D-02 | Do **not** copy any Primary CSS text | Primary is GPLv3; copying forces relicensing | **Needs approval** |
| D-03 | Reimplement Primary's *motion vocabulary* clean-room | Timing/easing values are facts, not expression; concepts are not copyrightable | **Needs approval** |
| D-04 | Credit Primary as *design inspiration* in README + Ko-fi link | Goodwill; honours the author's stated wish even where not legally binding | Proposed |
| D-05 | Replace Obsidianite's pseudo-element checkbox with **native `input` styling** | Fixes Bug #1 at the root and is more plugin-compatible | Proposed |
| D-06 | Ship both light and dark palettes from day one | Obsidianite is dark-only; the brief requires real light mode | Proposed |
| D-07 | Multi-file source + build script → single `theme.css` | Obsidian loads one file; maintainability requires many | Proposed |
| D-08 | Use `class-select` for component variants, `variable-*` for tokens | Verified as the only mechanism Style Settings offers for structural swaps | Confirmed |
| D-09 | Do **not** embed webfonts | Primary embeds ~1.5 MB of base64 fonts; this is 87% of its file size | Proposed |
| D-10 | Namespace all custom variables `--primidian-*` | Prevents collisions with Obsidian core and other plugins | Proposed |

---

## What I still need from you

Listed in full in `12-implementation-roadmap.md` §5. The blocking ones:

1. **Licence choice approval** (D-01/D-02/D-03) — this gates everything.
2. Confirmation that **replacing Obsidianite's checkbox implementation** (rather than patching it) is acceptable, since it slightly changes the check animation.
3. Whether **light mode** is a v1 requirement or can be v1.1.
4. Whether you want the **font embedding** dropped (recommended) or preserved.
