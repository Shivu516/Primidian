# 01 — Reconnaissance: `Obsidianite.css`

**Source file:** `Obsidianite.css` (unmodified, preserved)
**Declared version:** 2.1.0
**Author:** Benny Guo (`bennyxguo`, formerly `TriDiamond`)
**Upstream:** https://github.com/bennyxguo/Obsidian-Obsidianite
**Licence:** MIT (confirmed via repository metadata — see `10-licensing-and-attribution.md`)
**Size:** 1,481 lines, 34,286 bytes, unminified, hand-authored

---

## 1. High-level character

Obsidianite is a **small, opinionated, dark-only theme**. It is not a design system — it is a curated set of ~180 selector blocks that repaint Obsidian with a cyan/magenta "cyberpunk-ish" palette on a near-black violet background.

Key structural properties:

- **No `@settings` block.** It has zero Style Settings integration.
- **Dark-only.** The `.theme-light` block exists but is entirely commented out (lines 19–44) with an explicit note that light mode is "still working in progress".
- **Legacy-era selectors.** A large fraction of the file targets CodeMirror 5 (`.cm-s-obsidian .CodeMirror-line`, `pre.HyperMD-codeblock`, `div.HyperMD-codeblock-bg`). These are dead or partially dead on modern Obsidian (CM6 / Live Preview).
- **Hard-coded colours everywhere.** Even where a variable exists, raw hex is often used instead (`#191621`, `#100e17`, `#7aa2f7`, `#bb9af7`).
- **Bundled third-party code.** Lines 1163–1481 are a vendored copy of the **Dracula theme for Prism.js** (`@license MIT 2016-2018`, Gustavo Costa / Jon Leopard). This is a separately-licensed sub-component.

---

## 2. Section map

| Lines | Section | Notes |
|---|---|---|
| 1–11 | ASCII banner / version header | Contains authorship. **Must not be stripped** — see licensing doc. |
| 13–44 | Light theme block | **Entirely commented out.** Dead code. |
| 46–82 | `.theme-dark` variable block | The actual palette. 36 declarations. |
| 84–115 | `:root` font/typography variables | 5 declarations. |
| 117–180 | Hard-coded tag colours | Nine hard-coded tag names, incl. Chinese-language duplicates (`#待完成`, `#笔记`…). |
| 182–353 | General UI: scrollbars, titlebar, status bar, ribbon, nav, tabs | |
| 355–482 | **Checkboxes / task lists** | ⚠ Source of Bug #1 |
| 484–580 | Headings | |
| 582–610 | Horizontal rules | The `§` glyph divider |
| 612–642 | Bold/strong + `<kbd>` patch | ⚠ Source of Bug #2 |
| 644–659 | Italic | |
| 661–679 | Lists / indent guides | |
| 681–783 | Links | |
| 785–838 | Tags | |
| 840–872 | Inline code (editor) + highlight | |
| 874–990 | Code fences + language labels | |
| 992–1065 | Blockquotes | |
| 1067–1104 | Front-matter + inline code (reading mode) | ⚠ Bug #2 manifests here |
| 1106–1162 | Images + CM5 syntax colours | |
| 1163–1481 | **Vendored Prism.js Dracula theme** | Separate MIT licence header at 1165–1175 |

---

## 3. Variable inventory

### 3.1 `.theme-dark` palette (lines 46–82)

Obsidianite defines **36 variables**. It mixes three naming conventions:

**(a) Obsidian-native overrides** — these are Obsidian's own variables, being reassigned:

```
--background-primary          #100e17
--background-primary-alt      #0d0b12
--background-secondary        #191621
--background-secondary-alt    #0d0b12
--text-normal                 #bebebe
--text-accent                 #0fb6d6
--text-faint                  #7aa2f7      ← misuse: "faint" is a blue, not a faint grey
--text-highlight-bg           rgba(244, 86, 157, 0.25)
--background-modifier-border  rgba(14, 210, 247, 0.05)
--interactive-accent          rgba(14, 210, 247, 0.5)
--interactive-accent-hover    rgba(14, 210, 247, 0.8)
--interactive-accent-rgb      #3dd7fb      ← BUG: Obsidian expects "r, g, b" triplet, not hex
--code-background             var(--background-secondary)
```

**(b) Obsidianite-invented semantic tokens:**

```
--text-sub-accent    #f4569d   (magenta — the secondary brand colour)
--text-dim           #45aaff
--text-title-h1..h5
--text-link          #b4b4b4
--text-a / --text-a-hover  #6bcafb
--text-mark          #263d92
--blockquote-border  #4aa8fb
--tag-background     rgba(14, 210, 247, 0.15)
--interactive-before #5e6565
--editor-border-color #101014
```

**(c) Pre-computed alpha variants** (a primitive attempt at a scale):

```
--bg-sub-accent-55  rgba(244, 86, 157, 0.55)
--bg-accent-55      rgba(14, 210, 247, 0.55)
--bg-accent-25      rgba(14, 210, 247, 0.25)
--table-border-color rgb(14, 210, 247, 0.15)
--test-color        rgb(122, 162, 247)   ← literally named "test-color"; debug leftover
```

### 3.2 Observations / defects in the variable layer

| Defect | Detail | Impact on Primidian |
|---|---|---|
| `--interactive-accent-rgb: #3dd7fb` | Obsidian expects a comma-separated RGB triplet (`61, 215, 251`). Any core or plugin CSS doing `rgba(var(--interactive-accent-rgb), 0.3)` produces an invalid colour. | **Must fix.** Emit both `--primidian-accent` and a correct `--interactive-accent-rgb` triplet. |
| `--text-faint: #7aa2f7` | Semantically wrong. `--text-faint` should be the *least* prominent text. Assigning a saturated blue breaks every core UI element that relies on it for de-emphasis. | **Must fix.** Primidian needs a real faint grey and a separate `--primidian-accent-alt` for the blue. |
| `--table-border-color: rgb(14, 210, 247, 0.15)` | `rgb()` with 4 args is legal in CSS Color 4 but was historically inconsistent; also `--table-border-color` is not an Obsidian variable name (Obsidian uses `--table-border-color` only since 1.x — this is fine but only half-applied). | Normalise. |
| `--test-color` | Debug leftover, unused. | Drop. |
| No `--interactive-accent` contrast pair | `--interactive-accent` is set to a **50%-alpha** cyan. Obsidian uses this as a *solid* accent for buttons/toggles. Semi-transparent accents wash out over varied backgrounds. | **Must fix.** Primidian uses solid accent + separate alpha tokens. |
| Hard-coded `#100e17` inside `border-image-source` | Lines 512, 568 hard-code the background colour into gradients so the gradient can "fade to background". If a user changes the background via Style Settings, these gradients break. | **Must fix.** Use `transparent` or `var(--primidian-bg-primary)`. |

---

## 4. Component-by-component analysis

### 4.1 Headings (lines 494–580)

```css
.markdown-preview-section h1, .cm-header-1 { font-size: 34px; color: var(--text-title-h1); }
/* …h2 26px, h3 22px, h4/h5/h6 all 18px… */
```

Reading mode `h2`–`h6` get a **gradient underline** via `border-image-source`:

```css
border-image-source: linear-gradient(to right, var(--text-sub-accent), #100e17, #100e17, #100e17);
```

Live Preview equivalents (`.HyperMD-header-2` … `-6`) get the same treatment separately.

**Assessment:**
- ✅ **Keep the visual idea.** The magenta-fading-to-background underline is Obsidianite's most recognisable signature and belongs in Primidian as the `heading-obsidianite` variant.
- ⚠ `border-width: 35%` on line 566 is **invalid CSS** — `border-width` does not accept percentages. It is silently discarded; the effective width comes from `border-bottom: 1px solid`. This is a latent bug.
- ⚠ H4/H5/H6 all share `18px`, identical to body text. No visual hierarchy below H3.
- ⚠ `.HyperMD-header { padding: 20px; }` (line 515) applies 20px padding on **all four sides** of every heading line in Live Preview, which causes a noticeable jump between Live Preview and Reading Mode.
- ⚠ Reading mode uses `.markdown-preview-section h1` but Live Preview uses `.cm-header-1`. Modern Obsidian also renders reading-mode content in `.markdown-rendered`, and embeds/popovers/hover-previews use `.markdown-rendered` **without** `.markdown-preview-section`. **Headings inside hover popovers and embeds are therefore unstyled.** This is a real, currently-shipping gap.

### 4.2 Horizontal rules (lines 582–610)

```css
.cm-line hr, .markdown-preview-view hr {
  margin-block: 4em;
  border-image-source: linear-gradient(to right, transparent, var(--text-accent), transparent);
}
.cm-line hr::after, .markdown-preview-view hr::after {
  content: '§';
  transform: translate(-50%, -50%) rotate(60deg);
  color: var(--text-sub-accent);
  background-color: var(--background-primary);
}
```

**Assessment:**
- ✅ Beautiful and highly characteristic. This becomes Primidian's `divider-decorative` variant (the `§`) and `divider-gradient` variant (the gradient line alone).
- ⚠ `4em` top/bottom margin is very large; should be tokenised.
- ⚠ The `::after` sits on `hr`, which is a **void element** — pseudo-elements on `hr` work in Chromium but are technically undefined behaviour in older specs. Safe in Electron, but worth noting.
- ⚠ Hard-codes `background-color: var(--background-primary)` to punch a hole in the line. Breaks if the `hr` is inside a callout or blockquote with a different background. **Primidian should render the glyph on a `::before` of a wrapper, or accept the limitation and document it.**

### 4.3 Bold / strong (lines 616–633) — ⚠ **Bug #2 origin**

```css
.cm-strong, strong {
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  padding: 0;
  color: #7aa2f7;
  background-color: #7aa2f7;
  background-image: linear-gradient(62deg, #87c2fd 0%, #dcb9fc 100%) !important;
}
```

This is the gradient-bold effect. It is applied to **bare `strong`** with no `:not()` guards.

**Known consequences** (confirmed by upstream issue #7 in the Obsidianite repo):
1. Bold links render invisible until hovered.
2. Bold text containing `<code>`, `<kbd>`, `<mark>`, or nested inline elements loses those children's colour.
3. The author added a `<kbd>` escape hatch (lines 639–642) but **never added one for `code`**.

**This is the direct cause of Bug #2.** Full analysis in `05-bug-02-inline-code-reading-mode.md`.

### 4.4 Checkboxes / task lists (lines 355–482) — ⚠ **Bug #1 origin**

The implementation strategy is:

1. **Hide the real input:** `opacity: 0` (line 394), while keeping it clickable via `z-index: 10`.
2. **Draw a fake box** on the parent `li.task-list-item::before` — 20×20px, 2px grey border, absolutely positioned at `left: -25px; top: 2px`.
3. **Draw a fake tick** on `li.task-list-item.is-checked::after` — a rotated two-sided border, animated in via `@keyframes checked-box`.
4. **Animate the box** filling in via `@keyframes bounce` (border-width 2px → 10px).

```css
.contains-task-list .task-list-item input[type='checkbox'] {
  position: relative; top: 2px; left: -8px;
  width: 20px; height: 20px; margin: 0;
  opacity: 0;          /* ← the real checkbox is invisible */
  z-index: 10;
}
.contains-task-list .task-list-item::before { /* fake box at left: -25px */ }
.contains-task-list .is-checked.task-list-item::after { /* fake tick */ }
```

Supporting hacks:
- `.markdown-preview-view ul > li.task-list-item { text-indent: -3em; }` (line 383)
- `.markdown-preview-view .list-collapse-indicator { margin-left: -80px !important; }` (line 398)
- `.contains-task-list .task-list-item ul.contains-task-list::before { left: -46px !important; }` (line 371)

**Assessment:**
- ❌ **This entire approach must be replaced.** It is fragile, uses magic negative pixel offsets, requires two `!important`s, and — critically — it hides the real input while relying on a parent that plugins do not reliably provide.
- ❌ It also does **not** support Obsidian's `data-task` custom checkbox states (`[ ]`, `[x]`, `[/]`, `[-]`, `[?]`, `[>]`, …), which is a widely-used feature and which Primary supports comprehensively.
- ✅ The *bounce* and *tick-draw* animations are worth preserving as an aesthetic — but reimplemented on the native input's own `::after`.

Detail in `04-bug-01-task-list-kanban.md`.

### 4.5 Links (lines 681–783)

Obsidianite's link treatment is genuinely clever: instead of `text-decoration`, it paints a **repeating 5×5px background gradient** anchored at `0 100%`, so it reads as a thick underline. On hover it grows the background to `4px 50px`, producing a "highlighter fill" sweep, transitioned over 350 ms.

```css
.internal-link, .external-link {
  background-position: 0 100%;
  background-repeat: repeat-x;
  background-size: 5px 5px;
  transition: background 350ms ease-in-out;
}
.internal-link:hover { background-size: 4px 50px; -webkit-text-fill-color: #fff; }
```

Internal links use `--bg-accent-55` (cyan), external links use `--bg-sub-accent-55` (magenta).

**Assessment:**
- ✅ **Strong keeper.** This is the second-most recognisable Obsidianite signature and is already animated, which fits the brief's "Primary-quality motion" goal.
- ⚠ Line 696 has a **typo**: `cm-s-obsidian span.cm-link…` is missing the leading `.` — the whole rule is dead. Editor-mode external links therefore never get the magenta gradient. Easy fix.
- ⚠ Transitioning `background` (the shorthand) rather than `background-size` forces the compositor to re-rasterise. `transition: background-size 350ms` is cheaper. Performance note for Primidian.
- ⚠ `a, .internal-link, … { color: var(--text-normal); position: relative; }` on line 757 is what causes the bold-link invisibility reported upstream (issue #7), by creating a stacking context that interacts badly with the `strong` background-clip.

### 4.6 Blockquotes (lines 992–1065)

Gradient background, 3px cyan left border, plus **three** decorative pseudo-elements: a 60%-width gradient bar at the top (`::before`), a 25%-width gradient bar at the bottom (`::after`), and a `!!` glyph before the first paragraph.

**Assessment:**
- ✅ Visually distinctive; keep as the default blockquote variant.
- ⚠ The `!!` glyph (line 1056) is injected via `content` on `p:first-of-type::before`. This is **not screen-reader safe** and will be read aloud. Primidian should add `aria-hidden` semantics via `content: '!!' / ''` (the alt-text syntax) or make it opt-in.
- ⚠ Hard-codes `#100e17`, `#13111a`, `#15131c` — three different near-blacks that must all track the background token.
- ⚠ Obsidian **callouts** (`.callout`) are rendered as `<blockquote data-callout=…>`. Obsidianite has **no callout rules at all**, so every callout inherits the blockquote styling — including the `!!` glyph and the left border — which fights the callout's own icon and title bar. **This is a significant, currently-shipping visual defect.**

### 4.7 Code blocks (lines 874–990, 1163–1481)

Two entirely separate implementations:

**Live Preview / CM5** (`div.HyperMD-codeblock-bg`, `pre.HyperMD-codeblock`) — hard-coded `#191621`, plus a `::before` pseudo-element on `.HyperMD-codeblock-begin-bg` that paints an extra rectangle to fake rounded top corners. This is the mechanism implicated in upstream issue #44 ("code block not working in live preview"), where `position: absolute` on that pseudo-element covers the first line of code.

**Reading Mode** — vendored Prism.js Dracula theme with a hard-coded `rgb(40, 41, 54)` background that does **not** match the Live Preview `#191621`. Code blocks therefore look different in the two modes.

Language labels are done with a brittle attribute-suffix trick:

```css
pre[class$='javascript']:before, pre[class$='js']:before { content: 'JavaScript'; }
```

`[class$=…]` matches the **end of the entire class attribute string**. Obsidian emits `class="language-js is-loaded"`, so `[class$='js']` **fails** whenever any class follows. Only ~12 languages are covered and most of them do not actually match in current Obsidian.

**Assessment:**
- ❌ Replace both implementations with a single unified one.
- ❌ Drop the `[class$=…]` label hack entirely — Obsidian has native `.code-block-flair` in Live Preview and `data-language` support; the brief already defers language labels to a future phase.
- ⚠ The vendored Prism/Dracula block carries its own MIT header (lines 1165–1175) which **must be preserved** if that code is retained. Recommendation: reimplement the token colours against Primidian's palette instead, and drop the vendored block.
- ⚠ Lines 1241–1263 define `.limit-300` … `.limit-800` utility classes with `!important`. These are unrelated to code blocks and appear to be a personal snippet leak. Drop.

### 4.8 Tags (lines 785–838)

Editor-mode tags use `.cm-hashtag`; reading-mode uses `a.tag`. Both italic, 0.86 rem, weight 500, cyan on 15%-alpha cyan.

Nine tag names are hard-coded with bespoke colours (lines 117–180), including Simplified Chinese aliases. Each has a matching `.cm-tag-<name>` rule.

**Assessment:**
- ✅ Keep the base tag pill style.
- ❌ Drop the nine hard-coded tag names. They are personal to the original author, unusable to anyone else, and bloat the file. If wanted, expose 3–6 *user-definable* tag colour slots via Style Settings instead.
- ⚠ `--tag-radius`, `--tag-padding-y`, `--tag-padding-x` are **referenced but never defined** by Obsidianite (line 814–815). They happen to work because Obsidian core defines them. Fine, but should be explicit in Primidian.
- ⚠ `a.tag:hover { background-color: var(--tag-background) !important; }` — an `!important` used only to defeat Obsidian's own hover. Avoidable with correct specificity.

### 4.9 Global / miscellaneous

**Line 349–353** is a notable hack:

```css
span.cm-formatting-list,
span.cm-formatting-code-block.cm-hmd-codeblock,
span.cm-formatting-header {
  display: inline !important;
}
```

This forces list markers, code fence backticks, and heading hashes to remain visible in Live Preview. It is a workaround for other rules in the file that set these to `display: none` or `inline-flex`. In Primidian this should be unnecessary if the underlying rules are written correctly.

**Line 359–363:**
```css
.markdown-source-view.mod-cm6 .task-list-label { position: relative; top: -2px; }
```
A 2px nudge to compensate for the fake-checkbox alignment. Becomes unnecessary once checkboxes are reimplemented natively.

---

## 5. Animation inventory (Obsidianite)

Obsidianite has **very little motion**. Complete list:

| Location | Property | Duration | Easing |
|---|---|---|---|
| L226 | `.status-bar` opacity | 0.5 s | default (`ease`) |
| L231 | `.status-bar:hover` | 0.2 s | default |
| L266 | side-dock icons `all` | 350 ms | `ease-in-out` |
| L415 | checkbox `::before` `all` | 0.3 s | default |
| L422 | `@keyframes bounce` | 300 ms | — |
| L434 | `@keyframes checked-box` | 125 ms, 250 ms delay | forwards |
| L674 | `.cm-indent::before` opacity | 500 ms | **`linear ease-in-out` — invalid** |
| L721/731/737 | links `background` | 350 ms | `ease-in-out` |

**Defects:**
- Line 674: `transition: opacity 500ms linear ease-in-out;` — two timing functions. The whole declaration is invalid and dropped by the parser. Indent guides do not animate.
- `transition: all` on line 266 animates every animatable property including layout properties. Should be an explicit property list.
- Total: **8 motion rules**. This is why the brief asks to import Primary's motion quality.

---

## 6. What Obsidianite gets *right* (the keeper list)

| # | Feature | Why it matters |
|---|---|---|
| K-1 | Deep violet-black background with cyan + magenta dual accents | The core identity. Non-negotiable. |
| K-2 | Gradient heading underline fading to background | Signature look. |
| K-3 | `§` glyph divider on a gradient rule | Signature look. |
| K-4 | Background-gradient "highlighter" links with hover sweep | Signature look **and** already animated. |
| K-5 | Gradient-clipped bold text | Signature look — but must be made safe (Bug #2). |
| K-6 | Layered blockquote with dual gradient bars | Distinctive. |
| K-7 | Small italic tag pills | Clean. |
| K-8 | Floating, fade-on-hover status bar | Nice touch; Primary has an equivalent as a *setting*. |
| K-9 | Code-fence language flair pill (`.code-block-flair`) styling | Good; the *label* mechanism is broken but the pill styling is reusable. |
| K-10 | Checkbox bounce + tick-draw animation | Good motion; wrong implementation. Reimplement on native input. |

## 7. What Obsidianite gets *wrong* (the fix list)

| # | Problem | Severity |
|---|---|---|
| F-1 | No light mode | High (brief requirement) |
| F-2 | No Style Settings | High (brief requirement) |
| F-3 | Checkbox implementation breaks plugins | High (Bug #1) |
| F-4 | Inline code invisible inside bold (Bug #2) | High |
| F-5 | No callout styling at all | High |
| F-6 | `--interactive-accent-rgb` is a hex, not a triplet | Medium |
| F-7 | `--text-faint` semantically wrong | Medium |
| F-8 | Headings unstyled in embeds/popovers (`.markdown-rendered` not targeted) | Medium |
| F-9 | Code blocks differ between Live Preview and Reading Mode | Medium |
| F-10 | Language-label `[class$=…]` selectors are broken | Medium |
| F-11 | Nine hard-coded personal tag names | Low |
| F-12 | Dead rule at L696 (missing `.`) | Low |
| F-13 | Invalid `border-width: 35%` (L566) | Low |
| F-14 | Invalid `transition: … linear ease-in-out` (L674) | Low |
| F-15 | Debug leftovers (`--test-color`, `.limit-*`) | Low |
| F-16 | No `data-task` custom checkbox states | Medium |
| F-17 | No table, embed, properties, footnote, math, or search styling | Medium |
| F-18 | Vendored Prism theme creates a third-party licence dependency | Low |
| F-19 | No mobile-specific rules | Low |
| F-20 | No `prefers-reduced-motion` support | Medium (accessibility) |
