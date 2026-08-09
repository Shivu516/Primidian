# 12 — Implementation Roadmap, Risks, and Open Questions

Answers brief §19, §20, §21, §23.6, §23.12, §23.13.

---

## 1. Phased roadmap

### ✅ Phase 1 — Reconnaissance *(COMPLETE)*

| Deliverable | Status |
|---|---|
| `Obsidianite.css` read in full and analysed | ✅ `01-*` |
| `Primary.css` structurally analysed (expanded from minified) | ✅ `02-*` |
| Task List Kanban source inspected | ✅ `04-*` |
| Style Settings plugin source inspected | ✅ `07-*` §1 |
| Licensing determined | ✅ `10-*` |
| Conflict register produced | ✅ `03-*` |
| Both bugs root-caused | ✅ `04-*`, `05-*` |

### ✅ Phase 2 — Architecture *(COMPLETE — this document set)*

| Deliverable | Status |
|---|---|
| CSS variable hierarchy | ✅ `06-*` §2 |
| File/module structure | ✅ `06-*` §4 |
| Style Settings structure | ✅ `07-*` §2 |
| Component variant system | ✅ `08-*` |
| Gradient system | ✅ `09-*` Part A |
| Animation system | ✅ `09-*` Part B |
| Compatibility layer design | ✅ `04-*` §7.4, `06-*` §4 |
| Testing strategy | ✅ `11-*` |

### ⛔ GATE — Approval required

Blocking items, in order of consequence:

| # | Decision | Consequence if wrong |
|---|---|---|
| G-1 | Licence: MIT + clean-room (Path A) | Licence infringement, or an unintended permanent GPLv3 obligation |
| G-2 | Replace (not patch) Obsidianite's checkbox implementation | Bug #1 cannot be fixed at the root |
| G-3 | Light mode in v1 vs v1.1 | Determines Phase 3 scope |
| G-4 | Drop the vendored Prism-Dracula block | Determines Phase 3 scope and licence surface |

### Phase 3 — Core (est. the largest single phase)

| Step | Output | Depends on |
|---|---|---|
| 3.1 | Repo scaffold: `src/` tree, `build.mjs`, `manifest.json`, `LICENSE`, banner | G-1 |
| 3.2 | Tier 1 primitives — colour ramps derived from Obsidianite's anchors | 3.1 |
| 3.3 | Tier 2 semantic — `body` structure/motion/type tokens | 3.2 |
| 3.4 | Tier 2 dark palette | 3.3 |
| 3.5 | Tier 2 light palette (deliberately designed, contrast-checked) | 3.3, G-3 |
| 3.6 | Tier 3 component tokens | 3.4/3.5 |
| 3.7 | Tier 4 Obsidian bridge — incl. the `--interactive-accent-rgb` fix | 3.6 |
| 3.8 | Base + typography | 3.7 |
| 3.9 | Core UI: workspace, ribbon, tabs, explorer, modals, controls, status bar | 3.8 |
| 3.10 | Editor shared / Live Preview / Reading Mode split | 3.8 |
| 3.11 | Components: headings, dividers, links, emphasis | 3.10 |
| 3.12 | Components: code blocks + unified syntax palette | 3.10, G-4 |
| 3.13 | Components: blockquotes **+ callouts** (new) | 3.10 |
| 3.14 | Components: lists, tables, tags, embeds, properties, media, misc | 3.10 |
| 3.15 | Motion system + `prefers-reduced-motion` | 3.3 |
| 3.16 | Gradient system | 3.6 |
| 3.17 | Mobile layer | 3.9 |
| **Exit** | T1 smoke + T2 component checklist pass; theme is usable | |

**Deliberately excluded from Phase 3:** Style Settings, variants, bug fixes. Phase 3 produces a *working, correct, static* theme first. Fixing bugs before the architecture is in place would mean fixing them twice.

### Phase 4 — Bug fixes

| Step | Output |
|---|---|
| 4.1 | Reproduce Bug #1 in the test vault under the Phase 3 build |
| 4.2 | Implement the native checkbox system (`60-checkboxes.css`), incl. `data-task` states |
| 4.3 | Implement the Task List Kanban compat layer (`95-*`) |
| 4.4 | Verify against the 10-step Bug #1 gate |
| 4.5 | Reproduce Bug #2 |
| 4.6 | Implement the five-layer inline-code fix (`54-inline-code.css` + `53-emphasis.css`) |
| 4.7 | Verify every line of `02 — Emphasis & Inline.md` |
| 4.8 | Write both bug write-ups for the README |
| **Exit** | Both regression gates pass; both documented |

### Phase 5 — Style Settings

| Step | Output |
|---|---|
| 5.1 | `src/01-settings.css` skeleton — all headings, correct nesting |
| 5.2 | Sections 1–3 (colours, typography, interface) |
| 5.3 | Sections 4–16 (components) |
| 5.4 | Sections 17–18 (gradients, animations) |
| 5.5 | Sections 19–20 (compatibility, advanced) |
| 5.6 | Build-time validation checks (`11-*` §10) |
| 5.7 | Full T4 settings test |
| **Exit** | Every setting works, has a default, and resets. Zero console errors. |

### Phase 6 — Component variants

| Step | Output |
|---|---|
| 6.1 | Divider variants — all 5 |
| 6.2 | Heading variants — all 5 |
| 6.3 | Scaffold one-option `class-select`s for the 7 deferred components |
| 6.4 | Contributor recipe in the README |
| **Exit** | Variants switch cleanly; adding a new one is a 5-step change |

### Phase 7 — Testing, docs, release

| Step | Output |
|---|---|
| 7.1 | Full T1–T8 sweep |
| 7.2 | Plugin compatibility sweep |
| 7.3 | Performance + accessibility passes |
| 7.4 | Complete `README.md` per brief §21 |
| 7.5 | Screenshots for both modes |
| 7.6 | `manifest.json`, version, release notes |
| **Exit** | Release gate (`11-*` §11) fully checked |

---

## 2. Explicitly deferred (brief §20)

| Feature | Target | Architectural readiness |
|---|---|---|
| Code block language labels (`python`, `markdown`) | v1.1 | ✅ Flair pill styling exists; needs a working detection mechanism |
| Code block line numbers | v1.2 | ✅ Tokens reserved |
| Copy buttons | v1.1 | ✅ Obsidian provides the button; only styling is needed |
| Collapsible code blocks | v1.2 | ⚠ Likely requires JS — may be out of scope for a theme |
| Additional code block variants | v1.1 | ✅ `class-select` scaffolded |
| Built-in colour profiles (AMOLED, Midnight, …) | v1.1 | ✅ `06-*` §7 — a profile is ~8 re-anchored primitives |
| User profile management | v1.x | ✅ Style Settings Export/Import already covers this; document it |
| Additional variants for the 7 scaffolded components | v1.1 | ✅ 5-step recipe |
| More plugin compatibility layers | Ongoing | ✅ `compat/` is isolated and documented |
| Advanced animation customisation | v1.2 | ✅ Tokens already exposed |
| Localised Style Settings titles | v2 | ✅ Plugin supports `title.<lang>` |

**The discipline for v1: none of these may expand Phase 3–7 scope.** Each is enabled by the architecture and costs nothing to defer.

---

## 3. Risk register

| ID | Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|---|
| R-1 | **Licence path not approved / changed late** | Low | **Critical** | Gate G-1 before any code. Never paste Primary text (L-1). |
| R-2 | Bug #1 diagnosis wrong (cannot run Obsidian here) | Low | High | The fix is architecturally correct *regardless* — native checkbox styling is better under every scenario. Even if the mechanism differs, the fix stands. |
| R-3 | Bug #2 has a second, unidentified cause | Medium | Medium | Five defence-in-depth layers, three of which are independently sufficient. |
| R-4 | Style Settings YAML syntax error kills the whole panel | **High** | High | Isolate in one file; build-time YAML parse check; incremental section-by-section addition. |
| R-5 | Settings panel becomes unusable at 150+ entries | Medium | Medium | `collapsed: true` everywhere; max depth 3; the plugin's fuzzy search; good descriptions. |
| R-6 | Obsidian API/DOM changes break selectors | Medium | Medium | Prefer semantic classes (`.markdown-rendered`) over structural ones; avoid deep chains; test on the current release. |
| R-7 | Light mode looks like an afterthought | Medium | High | Design it as a first-class palette (`06-*` §2), not an inversion; contrast-check every token. |
| R-8 | Gradient text fails accessibility | Medium | Medium | Same-lightness-band rule; prominent off-switch; `forced-colors` block. |
| R-9 | Performance regression from `:has()` | Low | Medium | PR-6 restricts `:has()` to `strong`/headings; build check; T7 measurement. |
| R-10 | Scope creep from deferred features | **High** | Medium | §2 above is the contract. Log ideas, do not build them. |
| R-11 | Variant × gradient × animation combinations conflict | Medium | Medium | VR-1…VR-6 precedence rules; cascade order enforces them without specificity tricks. |
| R-12 | Users lose customisations on update | Low | High | Never rename a setting `id` after release. If a token must be renamed, keep the old `id` as an alias. **This is a permanent constraint from v1 onward.** |
| R-13 | The build step deters contributors | Low | Low | `theme.css` remains directly editable; the build is optional convenience, documented as such. |
| R-14 | Obsidianite's `hr` glyph limitation inside callouts | **Certain** | Low | Documented; `Gradient`/`Minimal` variants recommended for that context; two-segment approach in v1.1. |
| R-15 | Recommended fonts unavailable to users | High | Low | Robust fallback stacks; document; never bundle. |

**R-12 deserves emphasis.** Style Settings persists values keyed by `sectionId@@settingId`. Renaming a setting after release silently discards that user's value (`setConfig` deletes orphaned keys). The naming scheme in `06-*` §8 must be treated as frozen from v1.0.

---

## 4. Unknowns — and what would resolve them

| # | Unknown | Impact | How to resolve |
|---|---|---|---|
| U-1 | Exact visual symptom of Bug #1 (blank gap vs misplaced box) | Confirms which of §5.1/§5.2 dominates | A screenshot; both are fixed regardless |
| U-2 | Exact markdown triggering Bug #2 | Confirms whether bold is involved | The failing snippet + a screenshot |
| U-3 | Obsidian version in use | DOM class emission has shifted across 1.x | Settings → About |
| U-4 | Which plugins are installed | Determines the compat priority list | Screenshot of the community plugins list |
| U-5 | Desktop-only or mobile too? | Determines whether Phase 3.17 is optional | Your answer |
| U-6 | Is `Rubik` / `OperatorMonoSSmLig-Book` installed? | Affects how the default font stack should be ordered | Your answer |
| U-7 | Is light mode required for v1? | Phase 3 scope | Gate G-3 |
| U-8 | Community-directory submission intended? | Affects manifest and licence requirements | Your answer |
| U-9 | Does Task List Kanban's "status marker" mode need enabling? | The plugin has a Lucide-icon fallback path that is theme-independent | Plugin settings screenshot |
| U-10 | Unminified Primary source available? | Would improve analysis fidelity — though under Path A we deliberately avoid reading it closely | Not needed under Path A |

---

## 5. What I need from you to proceed

**Blocking (Phase 3 cannot start):**

1. **G-1 — Approve the licence path.** MIT + clean-room reimplementation (Path A), no Primary code copied. *(This is the single most important decision in the project.)*
2. **G-2 — Approve replacing Obsidianite's checkbox mechanism** rather than patching it. It changes the check animation slightly, in exchange for fixing Bug #1 at the root and gaining `data-task` state support.
3. **G-3 — Light mode: v1 or v1.1?**
4. **G-4 — Approve dropping the vendored Prism-Dracula block** and re-deriving syntax colours from the Primidian palette.

**Helpful but not blocking:**

5. A screenshot of each bug as it actually appears (U-1, U-2).
6. Your Obsidian version (U-3).
7. Your installed-plugin list (U-4).
8. Desktop-only or mobile too (U-5).
9. Copyright holder name for `LICENSE` (Q-2).

---

## 6. README outline (Phase 7.4, brief §21)

For reference, so the documentation obligation is visible now rather than discovered later:

```
# Primidian
  Hero screenshot (dark) · Hero screenshot (light) · Badges

## Overview
## Features
## Design Philosophy
     Obsidianite-inspired visual foundation
     Primary-inspired animation system
     Obsidian-native compatibility
     Customization-first architecture
## Installation
## Customization  → Style Settings, how defaults/resets work, Export/Import
## Components     → table of every component + its variants + its settings
## Gradients      → global + per-component, the off-switch, accessibility note
## Animations     → the token scale, speed control, reduced-motion behaviour
## Plugin Compatibility
     ### Task List Kanban Checkbox Fix
         Original problem / Investigation / Root cause /
         Solution / Affected selectors / Why it works
     ### Reading Mode Inline Code Fix
         Original problem / Investigation / Root cause /
         Solution / Affected selectors / Why it works
## Architecture   → the three tiers + the Obsidian bridge + the Primidian Directive
## Development    → file layout, build, how to add a variant, how to add a compat layer
## Future Roadmap
## Credits / Attribution / Licenses
     Obsidianite — Benny Guo — MIT — visual foundation
     Primary — Cecilia May — GPLv3 — design inspiration (no code included) + Ko-fi
     Style Settings — mgmeyers — MIT
     Task List Kanban — Chris Kerr & Erika Rice Scherpelz
     Recommended fonts and their licences
```

The two bug sections are called out explicitly in brief §21 and are, in a sense, the project's proof of work — they are the difference between "another merged theme" and an engineered one.

---

## 7. Summary

Phase 1 and Phase 2 are complete. Twelve documents describe what both themes do, what to keep, what to reimplement, why both bugs happen, how to fix them, and how the whole thing should be built and tested.

**No code has been written. No reference file has been modified.** `Primary.css` and `Obsidianite.css` are byte-for-byte as supplied.

The project is blocked on four approvals, of which the licence decision is by far the most consequential.
