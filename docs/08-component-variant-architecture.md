# 08 — Component Variant Architecture

Answers brief §8. Also establishes the extension pattern required by §8's
"design the architecture so more variants can be added later".

---

## 1. The mechanism

Style Settings `class-select` is the **only** mechanism that can swap structural styling. Verified in `main.js`:

```js
else if (i.type === he.CLASS_SELECT) {
  let c = this.getSetting(n, a);
  if (c === undefined && l.default) c = l.default;
  else if (c === undefined)         c = "none";
  if (c !== "none") document.body.classList.add(c);
}
```

So a variant is:

```
class-select setting  →  one class on <body>  →  a CSS block scoped to body.<class>
```

With `allowEmpty: false` and a declared `default`, **exactly one variant class is always present**, which means the theme can rely on it and never needs an "unstyled" fallback path.

---

## 2. The variant contract

Every variant-enabled component follows the same four-part contract. This is the pattern that makes future variants cheap.

```
1. TOKENS      Component tokens exist in src/tokens/14-components.css.
               They are variant-agnostic: --primidian-divider-color, --primidian-divider-thickness…

2. BASE        src/components/51-dividers.css defines everything COMMON to all variants
               and consumes only tokens. It must produce a complete, usable component
               on its own, with no variant class present.

3. VARIANTS    src/variants/70-variants-dividers.css contains one block per variant,
               each scoped `body.primidian-divider-<name>`. A variant may only:
                 (a) reassign component tokens, and/or
                 (b) add/remove decorative pseudo-elements.
               A variant must NEVER redefine layout that the base already owns.

4. SETTING     One class-select in src/01-settings.css, allowEmpty:false, with a default.
```

**The critical discipline is (3a).** A variant that *reassigns tokens* composes correctly with a user's own colour choices; a variant that *hard-codes values* does not. Example:

```css
/* ✅ CORRECT — reassigns a token; user colour choices still apply */
body.primidian-divider-minimal {
  --primidian-divider-thickness: 1px;
  --primidian-divider-margin: 2em;
  --primidian-divider-glyph-display: none;
}

/* ❌ WRONG — hard-codes; breaks user customisation and Style Settings resets */
body.primidian-divider-minimal hr {
  border-color: #333;
  margin: 2em 0;
}
```

---

## 3. Dividers — full v1 specification

Obsidianite's `hr` is the most distinctive divider in either theme, and the brief names it as the first target.

### 3.1 Base (`src/components/51-dividers.css`)

```css
:is(.markdown-rendered, .cm-line) hr {
  border: none;
  height: 0;
  margin-block: var(--primidian-divider-margin);
  border-bottom: var(--primidian-divider-thickness) solid var(--primidian-divider-color);
  border-image-slice: 1;
  border-image-source: var(--primidian-divider-image, none);
  position: relative;
}

:is(.markdown-rendered, .cm-line) hr::after {
  content: var(--primidian-divider-glyph);
  display: var(--primidian-divider-glyph-display, none);
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%) rotate(var(--primidian-divider-glyph-rotate));
  padding: var(--primidian-space-2);
  color: var(--primidian-divider-glyph-color);
  background-color: var(--primidian-bg-primary);
  transition: transform var(--primidian-motion-moderate) var(--primidian-ease-overshoot),
              color     var(--primidian-motion-fast)     var(--primidian-ease-standard);
}
```

Note `--primidian-divider-glyph-display` defaults to `none`, so the base renders a plain rule. Variants opt *in* to decoration.

### 3.2 The five variants

| Variant | Body class | Token reassignments | Visual |
|---|---|---|---|
| **Standard** *(default)* | `primidian-divider-standard` | `thickness: 1px`, solid `--primidian-border` | A clean 1px rule. Safe, neutral. |
| **Minimal** | `primidian-divider-minimal` | `thickness: 1px`, colour at 40% alpha, `margin: 2em` | Barely-there separator for dense notes. |
| **Gradient** | `primidian-divider-gradient` | `divider-image: linear-gradient(90deg, transparent, var(--primidian-divider-grad-1), var(--primidian-divider-grad-2), transparent)` | Obsidianite's fading cyan rule, without the glyph. |
| **Decorative** | `primidian-divider-decorative` | Gradient image **+** `glyph-display: inline-block` | The full Obsidianite `§` treatment. **Closest to stock Obsidianite.** |
| **Animated** | `primidian-divider-animated` | Decorative **+** a hover rule rotating the glyph and a slow gradient drift | Motion-forward. Gated by the animation master toggle. |

Sketch of the two most interesting:

```css
body.primidian-divider-decorative {
  --primidian-divider-image: linear-gradient(90deg,
      transparent, var(--primidian-divider-color), transparent);
  --primidian-divider-glyph-display: inline-block;
}

body.primidian-divider-animated {
  --primidian-divider-image: linear-gradient(90deg,
      transparent, var(--primidian-divider-color), transparent);
  --primidian-divider-glyph-display: inline-block;
}
body.primidian-divider-animated :is(.markdown-rendered, .cm-line) hr:hover::after {
  transform: translate(-50%, -50%) rotate(calc(var(--primidian-divider-glyph-rotate) + 180deg));
  color: var(--primidian-accent);
}
```

`Animated` deliberately uses a **hover-triggered transform** rather than an infinite keyframe animation. Per brief §17 and §10, an always-running animation on every divider in a long note is exactly the kind of thing to avoid; a hover response gives the same delight at zero idle cost.

### 3.3 Known limitation, to be documented

The glyph punches a hole in the rule using `background-color: var(--primidian-bg-primary)`. Inside a callout or blockquote (different background) the hole will be the wrong colour. Options considered:

- Use `background: inherit` — fails, because `hr` has no background to inherit.
- Split the rule into two `::before`/`::after` segments with a gap — more robust but changes the geometry.
- Accept and document.

**v1 decision: accept and document**, with a note that `Gradient` or `Minimal` should be preferred inside callouts. Revisit in v1.1 with the two-segment approach.

---

## 4. Headings — full v1 specification

### 4.1 Base (`src/components/50-headings.css`)

```css
:is(.markdown-rendered, .markdown-source-view.mod-cm6) :is(h1,h2,h3,h4,h5,h6),
.cm-header {
  font-family: var(--primidian-font-text);
  margin-top: var(--primidian-h-margin-top);
  margin-bottom: var(--primidian-h-margin-bottom);
  position: relative;
}

.markdown-rendered h1, .cm-header-1 {
  font-size: var(--primidian-h1-size);
  font-weight: var(--primidian-h1-weight);
  letter-spacing: var(--primidian-h1-spacing);
  text-transform: var(--primidian-h1-transform);
  color: var(--primidian-h1-color);
}
/* …h2–h6 identical, level-scoped tokens… */
```

Note `.markdown-rendered` rather than Obsidianite's `.markdown-preview-section` — this is the fix for defect F-8 (headings unstyled in embeds and hover popovers).

### 4.2 The five variants

| Variant | Body class | Description |
|---|---|---|
| **Obsidianite** *(default)* | `primidian-heading-obsidianite` | H2–H6 get the magenta→transparent gradient underline. H1 is accent-coloured with no rule. The stock look. |
| **Minimal** | `primidian-heading-minimal` | No underlines, no decoration. Size and weight only. |
| **Gradient** | `primidian-heading-gradient` | Gradient-clipped heading *text* (via the gradient system), no underlines. |
| **Bordered** | `primidian-heading-bordered` | Full-width solid rule under every heading, uniform thickness. Documentation-style. |
| **Accent Bar** | `primidian-heading-accentbar` | A short vertical accent bar to the left of each heading (`::before`). Primary-inspired. |

```css
body.primidian-heading-obsidianite {
  --primidian-h-underline-image: linear-gradient(to right,
      var(--primidian-h-underline-color), transparent 60%);
  --primidian-h-underline-display: block;
}

body.primidian-heading-accentbar {
  --primidian-h-underline-display: none;
  --primidian-h-bar-display: block;
  --primidian-h-bar-width: 3px;
}
```

**Deliberately not implemented in v1:** "Numbered headings" (CSS counters). It is popular but interacts badly with outline plugins and heading-fold, and the brief warns against inventing variants that do not fit (§8).

---

## 5. Scaffolded components (architecture only in v1)

Per brief §8's "do not attempt to implement every possible variant in the first pass", these get a `class-select` with **one** option in v1 — the default — plus the base + variant file structure, so adding option two later is a five-line change.

| Component | Variant class prefix | v1 options | Planned v1.1 |
|---|---|---|---|
| Callouts | `primidian-callout-` | Standard | Minimal, Bold Border, Solid |
| Code blocks | `primidian-codeblock-` | Standard | Bordered, Flat, Elevated |
| Checkboxes | `primidian-checkbox-` | Rounded | Square, Circle, Minimal |
| Tags | `primidian-tag-` | Pill | Outline, Minimal, Underline |
| Links | `primidian-link-` | Sweep | Underline, Minimal, Pill |
| Tables | `primidian-table-` | Standard | Bordered, Striped, Minimal |
| Blockquotes | `primidian-blockquote-` | Obsidianite | Minimal, Solid |

**Why ship a one-option dropdown?** Two reasons: the settings key and its default are locked in from day one (so a later addition never breaks an existing user's saved config), and the `src/variants/` file already exists with its base contract established. It costs almost nothing and removes all the friction from future additions.

---

## 6. Adding a new variant — the contributor recipe

Documented in the README (brief §21 "Development") and in `src/compat/96-compat-README.md`:

```
1. Ensure every value the variant needs is already a token in tokens/14-components.css.
   If not, add it there first, with an inert default.

2. Open src/variants/7x-variants-<component>.css. Append:

     body.primidian-<component>-<name> {
       --primidian-<component>-<token>: <value>;
     }

   Reassign tokens only. If you find yourself writing a property that is not a
   custom property, stop and ask whether the base file should own it instead.

3. Open src/01-settings.css. Add an option to that component's class-select:

     - label: <Human Name>
       value: primidian-<component>-<name>

4. Run `npm run build`. The build cross-check verifies that every class-select
   option value has a matching `body.<value>` selector in src/variants/.

5. Add a row to the variant table in README.md.
```

Five steps, no core-file edits, and the build catches the one mistake that would otherwise ship silently.

---

## 7. Interaction rules

Variants, gradients, and animations are three orthogonal axes and can all be active simultaneously. The precedence rules must be explicit or they will conflict.

| Rule | Statement |
|---|---|
| VR-1 | A variant may only reassign component tokens or toggle a decorative pseudo-element's `display`. |
| VR-2 | The **global gradient toggle outranks every variant.** `body.primidian-gradients-off` neutralises gradient tokens regardless of the selected variant. |
| VR-3 | The **animation master toggle and `prefers-reduced-motion` outrank every variant.** The `Animated` divider silently behaves as `Decorative`. |
| VR-4 | Variants never use `!important`. |
| VR-5 | Variants never introduce new selectors that the base file does not already style. |
| VR-6 | Exactly one variant class per component is present (guaranteed by `allowEmpty: false` + `default`). |

Cascade order in the built file is `components (50–66)` → `variants (70–72)` → `systems (80–81)`, so VR-2 and VR-3 hold by file ordering alone, with no specificity tricks required.
