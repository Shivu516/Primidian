# 03 — Comparison, Conflicts, and Merge Decisions

This document answers brief §23.2, §23.3, and §23.4:
what to retain from Obsidianite, what to import from Primary, and which conflicts need resolution.

---

## 1. Head-to-head summary

| Dimension | Obsidianite | Primary | Winner for Primidian |
|---|---|---|---|
| Visual identity | Cyan/magenta on violet-black | Warm sepia Bauhaus | **Obsidianite** (brief mandate) |
| Colour architecture | 36 flat vars, hard-coded hex | 3-tier, 2064 vars, all `hsla` | **Primary** (method only) |
| Light mode | None (commented out) | Full | **Primary** (method) |
| Motion | 8 rules, 2 invalid | 53 transitions + 3 keyframes, tokenised | **Primary** (method) |
| Style Settings | None | 517 entries | **Primary** (method) |
| Checkboxes | Fake `::before` on parent `li` | Native `input`, full `data-task` | **Primary** (method) |
| Inline code | Broken in reading mode | Correct, broad targeting | **Primary** (method) |
| Headings | Gradient underline (signature) | Token-driven, plain | **Obsidianite** look + **Primary** tokens |
| Dividers | `§` glyph on gradient (signature) | Plain `--hr-thickness` | **Obsidianite** |
| Links | Background-gradient sweep (signature) | Conventional underline | **Obsidianite** |
| Blockquotes | Layered gradient bars | Token-driven | **Obsidianite** look |
| Callouts | **None** | Full, `color-mix`-based | **Primary** (method) |
| Code blocks | Two divergent impls, broken labels | Unified, `.code-block-flair` | **Primary** (method) |
| Tables/embeds/props | None | Full | **Primary** (method) |
| Mobile | None | `.is-phone` / `.is-mobile` / `.is-tablet` | **Primary** (method) |
| `!important` count | 25 | 2 | **Primary** (discipline) |
| Licence | MIT | GPLv3 | **Obsidianite** (see §4) |

**The pattern is unmistakable:** Primidian = Obsidianite's *pixels*, Primary's *engineering*.

---

## 2. Retain from Obsidianite (§23.2)

These are the elements that constitute Obsidianite's visual identity and must survive into Primidian.

### 2.1 Retain as-is (re-tokenised)

| Element | Source lines | Primidian treatment |
|---|---|---|
| Core palette (violet-black bg, `#0fb6d6` cyan, `#f4569d` magenta) | 46–82 | Becomes Tier-1 ramp `--primidian-c-*`; original values are the `-50` anchor of each ramp |
| Heading gradient underline | 504–513, 556–569 | `heading-obsidianite` variant; gradient endpoint changed from hard-coded `#100e17` to `transparent` |
| `§` glyph divider | 587–610 | `divider-decorative` variant; glyph exposed as `variable-text` so users can change it |
| Gradient HR line | 587–597 | `divider-gradient` variant |
| Link background-sweep | 710–754 | Default link style; transition narrowed to `background-size` |
| Gradient bold | 616–624 | Default bold style — **but guarded** (see §3.2) |
| Blockquote dual gradient bars | 1003–1043 | Default blockquote variant |
| Tag pill (italic, 0.86rem, alpha-cyan) | 789–829 | Default tag variant |
| Floating fade status bar | 211–232 | Default; also exposed as a `class-select` (docked / floating) |
| Code-flair pill styling | 878–888 | Reused for the (future) language label |
| Checkbox bounce + tick-draw motion | 403–482 | **Motion retained, mechanism replaced** (see §3.1) |
| Indent-guide accent tint | 669–679 | Retained; the invalid easing is fixed |

### 2.2 Retain conceptually but rebuild

| Element | Why rebuild |
|---|---|
| Code block styling | Two divergent implementations must unify; Prism-Dracula must be re-derived from the Primidian palette |
| Checkbox | Parent-dependency breaks plugins (Bug #1) |
| Headings | Must additionally target `.markdown-rendered` for embeds/popovers |

### 2.3 Drop from Obsidianite

| Element | Lines | Reason |
|---|---|---|
| Nine hard-coded tag names (`#todo`, `#笔记`, …) | 117–180 | Personal to the original author; unusable generally. Replaced by N user-definable tag colour slots. |
| `.limit-300` … `.limit-800` | 1241–1263 | Unrelated personal snippet with `!important`. |
| `--test-color` | 80 | Debug leftover. |
| Commented-out light theme | 19–44 | Superseded by a real light palette. |
| Vendored Prism-Dracula block | 1163–1481 | Third-party licence dependency; colours clash with the Primidian palette. Re-derive token colours. |
| `[class$='javascript']:before` label hack | 946–990 | Selector does not match modern Obsidian output. Deferred to a future phase per brief §14/§20. |
| `display: inline !important` triad | 349–353 | A workaround for the theme's own bugs; unnecessary once rules are written correctly. |
| `.list-collapse-indicator { margin-left: -80px !important }` | 398 | Magic offset tied to the fake checkbox. Dies with it. |
| `text-indent: -3em` on task items | 383 | Same. |

---

## 3. Import from Primary (§23.3) — as reimplemented technique

Reminder: because of GPLv3 (`10-licensing-and-attribution.md`), these are ported as **understood technique with freshly-written code**, never as copied text.

### 3.1 Checkbox architecture — the highest-value import

**What Primary does:** styles `input[type=checkbox]` directly; draws the marker on the input's own `::after` with `-webkit-mask-image`; supports `data-task` states via a dual selector (`input[data-task=…]` **and** `li[data-task=…] > input`).

**What Primidian will do:**

```
Style the native input only.
Never set opacity: 0 on it.
Never position a pseudo-element relative to a parent <li>.
Draw the box on the input, the marker on input::after.
Support data-task via input[data-task], li[data-task] > input, li[data-task] > p > input.
Keep Obsidianite's bounce + tick-draw feel via a scale/clip-path transition on input::after.
```

**Why this specific import matters:** it is simultaneously (a) the Primary quality upgrade, (b) the fix for Bug #1, and (c) the enabler of `data-task` states that Obsidianite lacks entirely. One change, three wins.

### 3.2 Safe gradient text

**What Primary does:** avoids `-webkit-text-fill-color` on `strong` entirely.

**What Primidian will do:** keep Obsidianite's gradient bold — it is a signature — but make it safe:

```
Apply gradient-clip only where it is safe:
  strong:not(:has(code, kbd, mark, .tag, a))     ← modern :has() guard
Reset the inherited fill on every nested inline element:
  strong code, strong kbd, strong mark, strong .tag, strong a { -webkit-text-fill-color: initial; }
Gate the whole effect behind the gradient system toggle (brief §9):
  when gradients are OFF, bold falls back to a solid --primidian-bold-color.
```

This is the fix for Bug #2 and simultaneously satisfies the brief's gradient-toggle requirement. See `05-*`.

### 3.3 Token architecture

Three-tier, three-scope, all-`hsla`. Detailed in `06-css-architecture.md`.

### 3.4 Motion system

Named duration + easing scales, transition-first, compositor-only properties, plus a `prefers-reduced-motion` block Primary lacks. Detailed in `09-gradient-and-animation-systems.md`.

### 3.5 Inline code targeting

`.markdown-rendered code:not(pre code)` instead of `.markdown-preview-view code`. This single selector change extends correct inline-code rendering to embeds, hover popovers, Canvas cards, and plugin-rendered markdown — including Task List Kanban's own `.content-preview.markdown-rendered` container.

### 3.6 Callout system

Obsidianite has **zero** callout rules, so callouts currently inherit blockquote styling including the `!!` glyph. Primidian adopts Primary's approach: `color-mix(in srgb, rgba(var(--callout-color)) <opacity>, var(--editor-bg))`, and explicitly excludes `.callout` from the blockquote rules.

### 3.7 Style Settings organisation

Nested collapsed headings, `info-text` guidance, per-component token groups, `class-select` for variants.

### 3.8 Mobile scoping

`.is-phone` / `.is-mobile` / `.is-tablet` guards, since Obsidianite has none.

### 3.9 Modern CSS idioms

- `color-mix()` instead of pre-computed alpha variables
- `:where()` (zero specificity) for defaults that Style Settings must be able to override
- `:is()` for selector compression

---

## 4. Conflict register (§23.4)

### 4.1 Licence conflict — **BLOCKING**

| | |
|---|---|
| **Conflict** | Obsidianite is MIT (permissive). Primary is GPLv3 (copyleft). A work containing both must be GPLv3. |
| **Impact** | If any Primary CSS text is copied, Primidian must be released under GPLv3, its full source must be offered, and it can never be relicensed. |
| **Resolution** | **Do not copy Primary text.** Reimplement technique clean-room (D-02/D-03). Primidian stays MIT. Credit Primary generously as inspiration anyway. |
| **Status** | ⛔ Requires your approval before Phase 3 begins. |

### 4.2 Palette conflict

| | |
|---|---|
| **Conflict** | Obsidianite = cool cyan/magenta on violet-black. Primary = warm sepia. Mixing produces mud. |
| **Resolution** | Obsidianite's palette wins outright (brief mandate). Primary contributes only the *ramp method*. |
| **Status** | ✅ Resolved by brief. |

### 4.3 Checkbox selector conflict

| | |
|---|---|
| **Conflict** | Obsidianite: `opacity: 0` on the input + `::before` on parent `li`. Primary: styles the input directly. These are mutually exclusive — if both were present, Obsidianite's `opacity: 0` (more specific: `.contains-task-list .task-list-item input[type='checkbox']`, `(0,3,1)`) would win and hide Primary's styled box, producing an *empty gap*. |
| **Resolution** | Adopt the native approach exclusively. Delete Obsidianite's `opacity: 0`, `::before`, `::after`, the `-3em` text-indent, and the `-80px` collapse-indicator offset as one atomic change. |
| **Status** | ✅ Resolved. Fixes Bug #1. |

### 4.4 Bold/strong inheritance conflict

| | |
|---|---|
| **Conflict** | Obsidianite's `-webkit-text-fill-color: transparent` on `strong` inherits into all descendants. Primary's inline-code rule sets `color` only, which cannot defeat an inherited `-webkit-text-fill-color`. Naively combining them still leaves code invisible inside bold. |
| **Resolution** | Explicit `-webkit-text-fill-color: initial` resets on every inline child of `strong` + a `:has()` guard on `strong` itself + gradient-system toggle fallback. |
| **Status** | ✅ Resolved. Fixes Bug #2. |

### 4.5 Heading selector-scope conflict

| | |
|---|---|
| **Conflict** | Obsidianite targets `.markdown-preview-section h2`; Primary targets token-driven `h2` broadly. `.markdown-preview-section` misses embeds, hover popovers, Canvas, and plugin-rendered markdown. |
| **Resolution** | Target `.markdown-rendered h2` (covers all reading contexts) + `.cm-header-2` / `.HyperMD-header-2` (Live Preview). Drop `.markdown-preview-section`. |
| **Status** | ✅ Resolved. Also fixes latent defect F-8. |

### 4.6 Code-block conflict

| | |
|---|---|
| **Conflict** | Obsidianite Live Preview `#191621` vs Reading Mode `rgb(40,41,54)` (Prism-Dracula). Two different backgrounds for the same content. Plus the `.HyperMD-codeblock-begin-bg::before` absolute rectangle implicated in upstream issue #44 (covers first line of code). |
| **Resolution** | Single `--primidian-code-bg` token drives both. Delete the fake-rounded-corner `::before` entirely and use `border-radius` on the real container. Re-derive syntax token colours from the Primidian palette rather than vendoring Dracula. |
| **Status** | ✅ Resolved. |

### 4.7 Callout / blockquote conflict

| | |
|---|---|
| **Conflict** | Callouts are `<blockquote data-callout>`. Obsidianite's blockquote rules (left border, dual gradient bars, `!!` glyph) apply to them and fight the callout's own icon/title. |
| **Resolution** | Scope all blockquote rules with `:not(.callout)`. Add a proper callout implementation. |
| **Status** | ✅ Resolved. |

### 4.8 Specificity-vs-Style-Settings conflict

| | |
|---|---|
| **Conflict** | Style Settings writes to `body.css-settings-manager` (specificity `0,2,1`). Obsidianite declares many values at higher specificity and with `!important` (25 occurrences). Any such value would be **unchangeable** through Style Settings. |
| **Resolution** | Mandatory rule for Primidian: **all themeable values are set on a variable declared at `body`, `.theme-dark`, or `.theme-light`, and consumed via `var()` at the usage site.** Zero `!important` on themeable properties. Selectors may be as specific as needed *as long as they only reference variables*. |
| **Status** | ✅ Resolved by architecture. This is the single most important structural rule in the project. |

### 4.9 Font conflict

| | |
|---|---|
| **Conflict** | Obsidianite requires `Rubik` + `OperatorMonoSSmLig-Book` (neither bundled — the mono font is commercial). Primary bundles Inter + Cascadia Code as 1.24 MB of base64. |
| **Resolution** | Bundle nothing. Use a robust font stack that degrades to Obsidian's own `--font-text`/`--font-monospace`, and expose font family as `variable-text` settings. Document the recommended fonts in the README. |
| **Status** | ✅ Resolved (D-09). |

### 4.10 `--interactive-accent-rgb` format conflict

| | |
|---|---|
| **Conflict** | Obsidianite sets it to a hex string; Obsidian and many plugins expect `r, g, b`. |
| **Resolution** | Use Style Settings `alt-format` or `rgb-values` format so one accent setting emits both the colour and the correct triplet. |
| **Status** | ✅ Resolved. |

### 4.11 Motion-easing validity conflict

| | |
|---|---|
| **Conflict** | Obsidianite L674 `linear ease-in-out` (invalid). Primary's `transition: border, box-shadow, transform var(--button-anim)` (malformed comma list). |
| **Resolution** | Neither is replicated. All transitions written as explicit `property duration easing` triplets, one per comma segment. Add a lint step. |
| **Status** | ✅ Resolved. |

### 4.12 Animation-philosophy conflict

| | |
|---|---|
| **Conflict** | Obsidianite uses `transition: all`; Primary uses explicit properties. `all` on frequently-updated elements is a performance hazard (brief §17). |
| **Resolution** | Explicit property lists everywhere. `transition: all` is banned. |
| **Status** | ✅ Resolved. |

---

## 5. Conflict resolution priority

| Priority | Conflict | Blocks |
|---|---|---|
| P0 | 4.1 Licence | Everything |
| P0 | 4.8 Specificity vs Style Settings | Phases 3, 5 |
| P1 | 4.3 Checkbox | Phase 4 (Bug #1) |
| P1 | 4.4 Bold inheritance | Phase 4 (Bug #2) |
| P1 | 4.2 Palette | Phase 3 |
| P2 | 4.5 Heading scope, 4.6 Code blocks, 4.7 Callouts | Phase 3 |
| P3 | 4.9–4.12 | Phase 3 polish |
