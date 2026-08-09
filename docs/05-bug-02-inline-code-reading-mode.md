# 05 — Bug #2: Inline Code Not Rendering Correctly in Reading Mode

**Status:** Root cause identified. Corroborated by an upstream Obsidianite issue describing the same failure mechanism for a sibling element.
**Confidence:** High (~85%) for the primary cause; a secondary contributing cause is also documented.
**Affected file:** `Obsidianite.css`

---

## 1. Reported behaviour

> Inline code enclosed in Markdown backticks does not render correctly in Reading Mode.
> The inline code text is not rendered correctly / appears missing.

```markdown
This is `inline code`.
```

---

## 2. The relevant Obsidianite rules

### 2.1 The bold/strong rule — lines 616–624

```css
.cm-strong,
strong {
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;      /* ← the culprit */
  padding: 0;
  color: #7aa2f7;
  background-color: #7aa2f7;
  background-image: linear-gradient(62deg, #87c2fd 0%, #dcb9fc 100%) !important;
}
```

### 2.2 The inline-code rule — lines 1088–1099

```css
.cm-s-obsidian span.cm-inline-code:not(.cm-formatting):not(.cm-hmd-indented-code):not(.obsidian-search-match-highlight),
.markdown-preview-view code {
  overflow-wrap: break-word;
  background-color: rgba(14, 210, 247, 0.05);
  word-wrap: break-word;
  padding: 0 5px;
  border-radius: 0.3rem;
  color: rgba(14, 210, 247, 0.9) !important;   /* ← sets `color`, NOT `-webkit-text-fill-color` */
}
```

### 2.3 The proof the author knew about this bug class — lines 639–642

```css
/**-------------------**
| <KBD> STYLING
**--------------------**/
.cm-strong kbd,
strong kbd {
  -webkit-text-fill-color: initial;    /* ← the escape hatch, added for kbd only */
}
```

**This rule exists for exactly one reason:** `<kbd>` inside `<strong>` was rendering invisible, so the author added a fill reset. **The identical reset was never added for `code`, `mark`, `.tag`, or `a`.**

---

## 3. Root cause — primary mechanism

### 3.1 The CSS property behaviour

`-webkit-text-fill-color` is an **inherited** property (per the WebKit/Chromium implementation and the CSS Text Decoration draft it derives from). When set, it takes **absolute precedence over `color`** for glyph fill. Setting `color` afterwards on a descendant does nothing, because `-webkit-text-fill-color` is still inherited and still wins.

So:

```
strong { -webkit-text-fill-color: transparent }
   └── code { color: rgba(14,210,247,.9) !important }
         → computed fill = transparent (inherited)   ← !important on `color` is irrelevant
         → glyphs are painted with zero alpha        ← TEXT IS INVISIBLE
```

### 3.2 The second half: `-webkit-background-clip: text`

`strong` also sets `-webkit-background-clip: text` with a gradient background. Background-clip is **not** inherited, so the `code` element gets its own `background-color: rgba(14,210,247,0.05)` normally.

Result: the code chip's **pill background renders** (faint cyan) but its **glyphs do not**. This matches the report precisely — "not rendered correctly / appears missing". The user sees an empty highlighted chip where the code text should be.

### 3.3 Reproduction cases

All of these produce invisible inline-code text in Reading Mode:

```markdown
**bold with `inline code` inside**
**[a bold link with `code`](https://example.com)**
## Heading with **bold** and `code`        ← if the heading contains bold
- **Term** — `value`                        ← common in documentation notes
| **Col** | `code` |                        ← table cells
```

The most common real-world trigger is the documentation idiom
`**Setting name** — \`--variable-name\``, which is extremely frequent in exactly the kind of vault where someone would notice.

### 3.4 Corroborating evidence

Upstream Obsidianite issue #7 ("Text isn't properly formatted in certain situations") reports precisely this failure mode for a sibling element:

> "The exact issue I had was that if links were also bold, their text would not be rendered until hovered over."

A community member's fix in that thread:

```css
.cm-strong:not(.cm-hmd-barelink):not(.cm-hmd-internal-link):not(.cm-highlight),
strong { … }
```

i.e. **exclude nested inline formats from the gradient rule** — the same class of fix required here. The maintainer's own `<kbd>` patch (line 639) is the second corroboration.

---

## 4. Root cause — secondary contributing mechanism

Independent of the bold interaction, Obsidianite's reading-mode selector has a **scope defect**:

```css
.markdown-preview-view code { … }
```

`.markdown-preview-view` is applied only to the **main reading pane**. It is **not** present on:

| Context | Container class |
|---|---|
| Transclusion / note embeds | `.markdown-embed-content .markdown-rendered` |
| Hover page previews | `.hover-popover .markdown-rendered` |
| Canvas card content | `.canvas-node-content .markdown-rendered` |
| Plugin-rendered markdown | `.markdown-rendered` (e.g. Task List Kanban's `.content-preview.markdown-rendered`) |
| Backlink / search snippet previews | `.markdown-rendered` |

In all of these, inline code receives **no Obsidianite styling at all** — no cyan colour, no background pill, no radius. It falls back to Obsidian's defaults, which under Obsidianite's overridden `--code-background` / `--text-*` variables can be low-contrast or, in bold contexts, invisible for the same inheritance reason.

Depending on where the user observed the bug, this may be the actual cause rather than §3. **Both are real defects; the fix addresses both.**

Primary avoids this entirely by targeting `.markdown-rendered code:not(pre code)` (see `02-reconnaissance-primary.md` §5).

---

## 5. Ruled-out hypotheses

For completeness, each candidate from brief §12 was checked against the source:

| Hypothesis | Verdict | Evidence |
|---|---|---|
| `display: none` on code | ❌ Ruled out | `display: none` appears once, line 1031, on `.HyperMD-quote + .HyperMD-quote::before` |
| `visibility: hidden` | ❌ Ruled out | String absent from the file |
| `opacity: 0` on code | ❌ Ruled out | `opacity: 0` appears once, line 394, on the task checkbox |
| Pseudo-element covering the text | ❌ Ruled out | No `::before`/`::after` on any code selector |
| Background === foreground colour | ❌ Ruled out | bg is `rgba(14,210,247,0.05)`, fg is `rgba(14,210,247,0.9)` — 18× alpha difference |
| Font not available (`OperatorMonoSSmLig-Book`) | ⚠ Contributing, not causal | Commercial font, not bundled. Missing → fallback renders. Would change metrics, not visibility. |
| `font-size: 0` | ❌ Ruled out | Not present |
| Colour contrast too low | ⚠ Possible in light mode | `rgba(14,210,247,0.9)` cyan on a light background is poor, but the report specifies "missing", not "faint" |
| **`-webkit-text-fill-color` inheritance** | ✅ **CONFIRMED PRIMARY CAUSE** | Lines 619 + 1098; `kbd` escape hatch at 641 proves the mechanism |
| **`.markdown-preview-view` scope too narrow** | ✅ **CONFIRMED SECONDARY CAUSE** | Line 1092 |

---

## 6. Proposed fix

### 6.1 Design goals

Per brief §12: minimal, compatible, and **preserving the intended Primidian visual style**. Specifically: keep the gradient bold — it is an Obsidianite signature (keeper K-5).

### 6.2 Layer 1 — Correct inline-code targeting

```css
/* Covers reading mode, embeds, popovers, Canvas, and plugin-rendered markdown */
.markdown-rendered code:not(pre > code),
.cm-s-obsidian .cm-inline-code:not(.cm-formatting):not(.cm-hmd-indented-code) {
  color: var(--primidian-inline-code-color);
  -webkit-text-fill-color: var(--primidian-inline-code-color);   /* neutralise inheritance */
  background-color: var(--primidian-inline-code-bg);
  border-radius: var(--primidian-inline-code-radius);
  padding: var(--primidian-inline-code-padding);
  font-family: var(--primidian-font-monospace);
  overflow-wrap: break-word;
}
```

Setting **both** `color` and `-webkit-text-fill-color` is the direct, minimal neutralisation. It is safe: on any engine where `-webkit-text-fill-color` is unsupported, the property is simply ignored and `color` applies.

Note `:not(pre > code)` (child combinator) rather than Primary's `:not(pre code)` — slightly tighter and marginally cheaper to match.

### 6.3 Layer 2 — Explicit resets for every inline child of gradient-clipped text

Generalising the author's `kbd` patch to the full set:

```css
:is(strong, .cm-strong) :is(code, kbd, mark, a, .tag, .math) {
  -webkit-text-fill-color: initial;
  -webkit-background-clip: initial;
  background-image: none;
}
```

### 6.4 Layer 3 — Guard the gradient rule itself

```css
:is(strong, .cm-strong):not(:has(code, kbd, mark, a, .tag)) {
  background-image: var(--primidian-bold-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
```

`:has()` is supported in the Electron/Chromium version underlying all currently-supported Obsidian releases. This means a `strong` containing *any* nested inline element simply does not receive the gradient at all — it falls back to a solid colour — which is both safer and visually more coherent than a half-gradient.

### 6.5 Layer 4 — Global gradient toggle integration (brief §9)

```css
body:not(.primidian-gradients-on) :is(strong, .cm-strong) {
  background-image: none;
  -webkit-background-clip: initial;
  -webkit-text-fill-color: initial;
  color: var(--primidian-bold-color);
}
```

With gradients disabled the bug is **structurally impossible**, because the offending property is never set. This gives users a guaranteed escape hatch and satisfies brief §9's "graceful fallback to solid colours" requirement.

### 6.6 Layer 5 — Remove the `!important`

Obsidianite's `color: … !important` on line 1098 was almost certainly added *while chasing this very bug*, in the mistaken belief that specificity was the problem. It is not needed once the fill colour is set correctly, and it actively blocks Style Settings customisation (see `03-comparison-and-conflicts.md` §4.8). **It goes.**

### 6.7 Layer summary

| Layer | Purpose | Fixes |
|---|---|---|
| 1 | Correct selector scope + explicit fill | Secondary cause + primary cause |
| 2 | Reset inheritance on all inline children | Primary cause, all nested-element variants |
| 3 | `:has()` guard on the gradient source | Primary cause, at the root |
| 4 | Global gradient off-switch | Guaranteed user escape hatch |
| 5 | Remove `!important` | Restores Style Settings customisability |

Layers 1–3 are independently sufficient; together they are defence in depth against a property whose inheritance behaviour is easy to reintroduce accidentally.

### 6.8 Why the fix works

| Failure path | Neutralised by |
|---|---|
| `code` inherits `transparent` fill from `strong` | L1 (explicit fill on code) + L2 (reset on children) + L3 (gradient never applied) |
| `code` inside a bold **link** | L2/L3 — `a` is in both the reset set and the `:has()` guard |
| `code` inside an embed / hover popover / Canvas / Kanban card | L1 — `.markdown-rendered` covers all of them |
| `!important` blocks user recolouring | L5 |
| User dislikes gradients / hits an unforeseen edge case | L4 |

---

## 7. Verification plan

| # | Markdown | Mode | Expected |
|---|---|---|---|
| 1 | `` `code` `` | Reading | Cyan text on faint cyan pill |
| 2 | `` `code` `` | Live Preview | Identical |
| 3 | `` **`code`** `` | Reading | **Code text visible** ← the bug |
| 4 | `` **bold `code` bold** `` | Reading | Bold solid-coloured (no gradient, per L3), code visible |
| 5 | `` **[link with `code`](url)** `` | Reading | Both visible |
| 6 | `` ## Head with **b** and `c` `` | Reading | Both visible |
| 7 | `` \| **Col** \| `code` \| `` | Reading | Visible in table cell |
| 8 | `` > quote with `code` `` | Reading | Visible in blockquote |
| 9 | `` > [!note] with `code` `` | Reading | Visible in callout |
| 10 | Note embed containing `` `code` `` | Reading | **Styled** (previously unstyled) |
| 11 | Hover popover containing `` `code` `` | — | **Styled** (previously unstyled) |
| 12 | Task List Kanban card containing `` `code` `` | — | **Styled** (previously unstyled) |
| 13 | Fenced code block | Both | **Unaffected** — `:not(pre > code)` |
| 14 | `` **bold** `` alone | Both | Gradient still applied (signature preserved) |
| 15 | Gradients toggled OFF | Both | Solid bold, code visible |
| 16 | Light mode, all of the above | Reading | Adequate contrast |

---

## 8. Additional information that would raise confidence

| # | Item | Why |
|---|---|---|
| 1 | A screenshot of the actual failure | Distinguishes "empty pill visible" (§3 confirmed) from "no styling at all" (§4 confirmed) |
| 2 | The exact markdown that triggers it | Confirms whether bold is involved |
| 3 | Whether it also fails in Live Preview | Live Preview uses `.cm-inline-code`, a different selector — failing in both implicates the bold rule; failing only in Reading implicates the scope defect |
| 4 | Obsidian version | Reading-mode container class emission has changed across 1.x |
| 5 | Whether `OperatorMonoSSmLig-Book` is installed | Rules out a font-fallback red herring |
