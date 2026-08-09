# 06 — Proposed CSS Architecture

Answers brief §4, §5, §15, §16, §17, §18.

---

## 1. The one hard constraint that shapes everything

Style Settings injects user overrides as:

```css
body.css-settings-manager             { --token: value; }   /* specificity (0,2,1) */
body.theme-light.css-settings-manager { --token: value; }   /* specificity (0,3,1) */
body.theme-dark.css-settings-manager  { --token: value; }   /* specificity (0,3,1) */
```

Therefore:

> ### 🔒 The Primidian Primidian Directive
>
> **Every themeable value is a CSS custom property declared at `body`, `.theme-dark`, or `.theme-light`, and consumed only via `var()` at the point of use.**
>
> - No `!important` on any themeable property.
> - No themeable value declared at a selector more specific than `.theme-dark`.
> - Selectors at the usage site may be arbitrarily specific — they only read variables.

This single rule guarantees that every setting is customisable and every reset works, and it is why Obsidianite (25 `!important`s, values baked into selectors) could never have had good Style Settings support.

---

## 2. Three-tier token system

### Tier 1 — Primitives (`--primidian-c-*`)

Raw colour ramps. **Never referenced outside Tier 2.** Not exposed in Style Settings.

```css
:root {
  /* Neutral ramp — cool violet-tinted, derived from Obsidianite #100e17 / #191621 */
  --primidian-c-neutral-0:   hsl(258, 24%,  4%);
  --primidian-c-neutral-50:  hsl(258, 24%,  7%);   /* ≈ #0d0b12  background-primary-alt */
  --primidian-c-neutral-100: hsl(255, 26%,  7%);   /* ≈ #100e17  background-primary     */
  --primidian-c-neutral-200: hsl(255, 19%, 11%);   /* ≈ #191621  background-secondary   */
  --primidian-c-neutral-300: hsl(255, 16%, 16%);
  --primidian-c-neutral-400: hsl(252, 12%, 28%);
  --primidian-c-neutral-500: hsl(250, 10%, 45%);
  --primidian-c-neutral-600: hsl(250,  8%, 62%);
  --primidian-c-neutral-700: hsl(250,  6%, 75%);   /* ≈ #bebebe  text-normal            */
  --primidian-c-neutral-800: hsl(250,  8%, 88%);
  --primidian-c-neutral-900: hsl(250, 20%, 97%);

  /* Cyan ramp — Obsidianite's primary accent #0fb6d6 */
  --primidian-c-cyan-300: hsl(190, 88%, 72%);
  --primidian-c-cyan-400: hsl(190, 92%, 62%);      /* ≈ #3dd7fb */
  --primidian-c-cyan-500: hsl(190, 87%, 45%);      /* ≈ #0fb6d6  THE accent             */
  --primidian-c-cyan-600: hsl(190, 87%, 36%);
  --primidian-c-cyan-700: hsl(190, 84%, 27%);

  /* Magenta ramp — Obsidianite's secondary accent #f4569d */
  --primidian-c-magenta-300: hsl(333, 88%, 78%);
  --primidian-c-magenta-500: hsl(333, 88%, 65%);   /* ≈ #f4569d */
  --primidian-c-magenta-700: hsl(333, 70%, 45%);

  /* Support ramps — blue / purple / green / amber / red */
  --primidian-c-blue-500:   hsl(221, 89%, 72%);    /* ≈ #7aa2f7 */
  --primidian-c-purple-500: hsl(261, 87%, 78%);    /* ≈ #bb9af7 */
  --primidian-c-green-500:  hsl(151, 68%, 58%);
  --primidian-c-amber-500:  hsl( 42, 96%, 62%);
  --primidian-c-red-500:    hsl(358, 89%, 66%);
}
```

**Design notes**
- All values in **`hsl()`** — required for Style Settings `hsl-split` derivation and for programmatic lightness shifts.
- Obsidianite's exact colours are preserved as the ramp anchors (`-500`), so Primidian looks like Obsidianite out of the box.
- The ramp numbering is **light → dark ascending in the light set, and reused unchanged for dark** — i.e. one ramp, two mappings, rather than Primary's two parallel ramps. This halves the token count and makes future colour profiles a matter of swapping ~8 hue anchors.

### Tier 2 — Semantic tokens (`--primidian-*`)

The layer users actually customise. Split across the three Style-Settings-compatible scopes.

```css
/* ---- Structure: mode-independent ---- */
body {
  --primidian-radius-s: 4px;
  --primidian-radius-m: 8px;
  --primidian-radius-l: 12px;

  --primidian-space-1: 4px;
  --primidian-space-2: 8px;
  --primidian-space-3: 12px;
  --primidian-space-4: 16px;
  --primidian-space-6: 24px;
  --primidian-space-8: 32px;

  --primidian-border-width: 1px;

  --primidian-font-text: 'Rubik', var(--font-text-theme), sans-serif;
  --primidian-font-interface: var(--primidian-font-text);
  --primidian-font-monospace: 'JetBrains Mono', 'Cascadia Code', var(--font-monospace-theme), monospace;
  --primidian-font-size: 18px;
  --primidian-font-weight: 450;

  /* Motion — see 09-* */
  --primidian-motion-superfast: 80ms;
  --primidian-motion-fast:      160ms;
  --primidian-motion-moderate:  260ms;
  --primidian-motion-slow:      400ms;
  --primidian-motion-scale:     1;              /* global multiplier */
  --primidian-ease-standard:  cubic-bezier(0.4, 0.0, 0.2, 1);
  --primidian-ease-overshoot: cubic-bezier(0.34, 1.56, 0.64, 1);
  --primidian-ease-swing:     cubic-bezier(0.45, 0.05, 0.55, 0.95);
  --primidian-ease-exit:      cubic-bezier(0.4, 0.0, 1, 1);
}

/* ---- Dark palette ---- */
.theme-dark {
  --primidian-bg-primary:     var(--primidian-c-neutral-100);
  --primidian-bg-primary-alt: var(--primidian-c-neutral-50);
  --primidian-bg-secondary:   var(--primidian-c-neutral-200);
  --primidian-bg-elevated:    var(--primidian-c-neutral-300);

  --primidian-text-normal: var(--primidian-c-neutral-700);
  --primidian-text-muted:  var(--primidian-c-neutral-600);
  --primidian-text-faint:  var(--primidian-c-neutral-500);   /* ← FIXED: a real faint grey */
  --primidian-text-on-accent: var(--primidian-c-neutral-0);

  --primidian-accent:        var(--primidian-c-cyan-500);
  --primidian-accent-hover:  var(--primidian-c-cyan-400);
  --primidian-accent-muted:  var(--primidian-c-cyan-600);
  --primidian-accent-alt:    var(--primidian-c-magenta-500);
  --primidian-accent-alt-hover: var(--primidian-c-magenta-300);

  --primidian-border:       color-mix(in srgb, var(--primidian-accent) 12%, transparent);
  --primidian-border-hover: color-mix(in srgb, var(--primidian-accent) 40%, transparent);
}

/* ---- Light palette — deliberately designed, NOT inverted (brief §16) ---- */
.theme-light {
  --primidian-bg-primary:     hsl(250, 30%, 99%);
  --primidian-bg-primary-alt: hsl(250, 24%, 96%);
  --primidian-bg-secondary:   hsl(250, 22%, 97%);
  --primidian-bg-elevated:    hsl(  0,  0%,100%);

  --primidian-text-normal: hsl(255, 22%, 16%);
  --primidian-text-muted:  hsl(253, 12%, 40%);
  --primidian-text-faint:  hsl(252,  9%, 58%);
  --primidian-text-on-accent: hsl(0, 0%, 100%);

  --primidian-accent:       var(--primidian-c-cyan-600);   /* darker — cyan-500 fails AA on white */
  --primidian-accent-hover: var(--primidian-c-cyan-700);
  --primidian-accent-muted: var(--primidian-c-cyan-500);
  --primidian-accent-alt:   var(--primidian-c-magenta-700);
  --primidian-accent-alt-hover: var(--primidian-c-magenta-500);

  --primidian-border:       color-mix(in srgb, var(--primidian-accent) 18%, transparent);
  --primidian-border-hover: color-mix(in srgb, var(--primidian-accent) 45%, transparent);
}
```

**Note the light-mode accent shift.** `--primidian-c-cyan-500` (#0fb6d6) on white gives a contrast ratio of roughly 2.3 : 1 — well below WCAG AA. Light mode therefore uses `cyan-600`. This is the kind of decision the brief means by "do not simply invert colors" (§16).

### Tier 3 — Component tokens

Derived from Tier 2, with inert defaults so every token exists and is settable even when unused (Primary's pattern, P-9).

```css
body {
  /* Headings */
  --primidian-h1-size: 34px;  --primidian-h1-weight: 600;  --primidian-h1-spacing: normal;
  --primidian-h2-size: 26px;  --primidian-h2-weight: 600;  --primidian-h2-spacing: normal;
  --primidian-h3-size: 22px;  --primidian-h3-weight: 600;
  --primidian-h4-size: 19px;  --primidian-h4-weight: 600;   /* was 18px — restores hierarchy */
  --primidian-h5-size: 17px;  --primidian-h5-weight: 600;
  --primidian-h6-size: 16px;  --primidian-h6-weight: 600;
  --primidian-h-underline-width: 1px;
  --primidian-h-margin-top: var(--primidian-space-8);
  --primidian-h-margin-bottom: var(--primidian-space-4);

  /* Checkbox */
  --primidian-checkbox-size: 17px;
  --primidian-checkbox-radius: var(--primidian-radius-s);
  --primidian-checkbox-border-width: 2px;
  --primidian-checkbox-gap: var(--primidian-space-2);
  --primidian-checkbox-marker-size: 68%;

  /* Inline code */
  --primidian-inline-code-radius: var(--primidian-radius-s);
  --primidian-inline-code-padding: 1px 5px;

  /* Divider */
  --primidian-divider-thickness: 1px;
  --primidian-divider-margin: 4em;
  --primidian-divider-glyph: '§';
  --primidian-divider-glyph-rotate: 60deg;
}

.theme-dark, .theme-light {
  --primidian-h1-color: var(--primidian-accent);
  --primidian-h2-color: var(--primidian-text-normal);
  /* …h3–h6… */
  --primidian-h-underline-color: var(--primidian-accent-alt);

  --primidian-checkbox-bg:             transparent;
  --primidian-checkbox-border:         var(--primidian-text-faint);
  --primidian-checkbox-checked-bg:     var(--primidian-accent);
  --primidian-checkbox-checked-border: var(--primidian-accent);
  --primidian-checkbox-marker:         var(--primidian-bg-primary);

  --primidian-inline-code-color: var(--primidian-accent);
  --primidian-inline-code-bg:    color-mix(in srgb, var(--primidian-accent) 8%, transparent);

  --primidian-divider-color: var(--primidian-accent);
  --primidian-divider-glyph-color: var(--primidian-accent-alt);
}
```

### Tier 4 — Obsidian bridge

**Critical for compatibility.** Primidian assigns Obsidian's own variables *from* Tier 2. This is what makes native features and third-party plugins (including Task List Kanban, which reads `--background-primary`, `--interactive-accent`, `--text-muted`, `--radius-s`, `--size-4-2`) look correct without any plugin-specific CSS.

```css
.theme-dark, .theme-light {
  --background-primary:       var(--primidian-bg-primary);
  --background-primary-alt:   var(--primidian-bg-primary-alt);
  --background-secondary:     var(--primidian-bg-secondary);
  --background-secondary-alt: var(--primidian-bg-primary-alt);
  --background-modifier-border:        var(--primidian-border);
  --background-modifier-border-hover:  var(--primidian-border-hover);
  --background-modifier-border-focus:  var(--primidian-accent);

  --text-normal: var(--primidian-text-normal);
  --text-muted:  var(--primidian-text-muted);
  --text-faint:  var(--primidian-text-faint);
  --text-accent: var(--primidian-accent);
  --text-accent-hover: var(--primidian-accent-hover);
  --text-on-accent: var(--primidian-text-on-accent);

  --interactive-accent:       var(--primidian-accent);
  --interactive-accent-hover: var(--primidian-accent-hover);
  --interactive-accent-rgb:   var(--primidian-accent-rgb);   /* ← FIXED: real r,g,b triplet */

  --checkbox-size:   var(--primidian-checkbox-size);
  --checkbox-radius: var(--primidian-checkbox-radius);
  --checkbox-color:  var(--primidian-checkbox-checked-bg);
  --checkbox-border-color: var(--primidian-checkbox-border);

  --radius-s: var(--primidian-radius-s);
  --radius-m: var(--primidian-radius-m);
  --radius-l: var(--primidian-radius-l);

  --font-text-theme: var(--primidian-font-text);
  --font-monospace-theme: var(--primidian-font-monospace);
}
```

`--primidian-accent-rgb` is produced by Style Settings' `alt-format` on the accent colour setting, emitting `rgb-values` alongside the main value. This resolves Obsidianite defect F-6.

---

## 3. Data flow

```
Tier 1  --primidian-c-cyan-500        (primitive; fixed ramp; not user-facing)
   ↓
Tier 2  --primidian-accent            (semantic; ← Style Settings writes here)
   ↓
Tier 3  --primidian-h1-color          (component; ← Style Settings may also write here)
   ↓
Tier 4  --text-accent             (Obsidian bridge; plugins read here)
   ↓
        .markdown-rendered h1 { color: var(--primidian-h1-color); }
```

A user changing one accent colour cascades to headings, links, checkboxes, tags, inline code, borders, and every plugin that reads `--interactive-accent` — while still being able to override any individual component token afterwards.

---

## 4. File / module structure

Obsidian loads exactly **one** `theme.css`. Maintainability requires many files. Resolution: multi-file source + a trivial concatenating build.

```
Primidian/
├── theme.css                    ← BUILD OUTPUT (the shipped file; do not hand-edit)
├── manifest.json
├── README.md
├── LICENSE
├── package.json                 ← build script only, no runtime deps
├── build.mjs                    ← ~40 lines: read order, concat, banner, minify (optional)
│
├── src/
│   ├── 00-banner.css                 Licence + attribution header (always first)
│   ├── 01-settings.css               The /* @settings */ YAML block
│   │
│   ├── tokens/
│   │   ├── 10-primitives.css         Tier 1 ramps
│   │   ├── 11-semantic-shared.css    Tier 2 — body scope (structure/motion/type)
│   │   ├── 12-semantic-dark.css      Tier 2 — .theme-dark palette
│   │   ├── 13-semantic-light.css     Tier 2 — .theme-light palette
│   │   ├── 14-components.css         Tier 3
│   │   └── 15-obsidian-bridge.css    Tier 4
│   │
│   ├── base/
│   │   ├── 20-reset.css              Scrollbars, selection, focus rings
│   │   └── 21-typography.css         Body text, paragraphs, emphasis
│   │
│   ├── ui/
│   │   ├── 30-workspace.css          Ribbon, sidebars, splits, drop overlay
│   │   ├── 31-titlebar-statusbar.css
│   │   ├── 32-tabs.css
│   │   ├── 33-explorer.css           File explorer, bookmarks, outline, search
│   │   ├── 34-modals.css             Modals, popovers, suggesters, command palette
│   │   ├── 35-controls.css           Buttons, inputs, dropdowns, toggles, sliders
│   │   └── 36-settings-panel.css
│   │
│   ├── editor/
│   │   ├── 40-editor-shared.css      Rules valid in BOTH Live Preview and Reading
│   │   ├── 41-live-preview.css       .markdown-source-view.mod-cm6 only
│   │   └── 42-reading-mode.css       .markdown-rendered only
│   │
│   ├── components/
│   │   ├── 50-headings.css
│   │   ├── 51-dividers.css
│   │   ├── 52-links.css
│   │   ├── 53-emphasis.css           bold / italic / highlight / strikethrough
│   │   ├── 54-inline-code.css        ← Bug #2 fix lives here
│   │   ├── 55-code-blocks.css
│   │   ├── 56-syntax.css             CM6 + Prism token colours, one palette
│   │   ├── 57-blockquotes.css
│   │   ├── 58-callouts.css           ← NEW (Obsidianite had none)
│   │   ├── 59-lists.css
│   │   ├── 60-checkboxes.css         ← Bug #1 fix lives here
│   │   ├── 61-tables.css             ← NEW
│   │   ├── 62-tags.css
│   │   ├── 63-embeds.css             ← NEW
│   │   ├── 64-properties.css         ← NEW
│   │   ├── 65-media.css
│   │   └── 66-misc.css               footnotes, math, mermaid, hr in odd contexts
│   │
│   ├── variants/
│   │   ├── 70-variants-dividers.css
│   │   ├── 71-variants-headings.css
│   │   └── 72-variants-scaffold.css  ← empty stubs for future components
│   │
│   ├── systems/
│   │   ├── 80-gradients.css          Global gradient system
│   │   └── 81-motion.css             Keyframes + prefers-reduced-motion
│   │
│   ├── platform/
│   │   └── 90-mobile.css             .is-phone / .is-mobile / .is-tablet
│   │
│   └── compat/
│       ├── 95-compat-task-list-kanban.css
│       └── 96-compat-README.md       How to add a new compatibility layer
```

### Why this structure

| Principle | Realisation |
|---|---|
| Cascade order is explicit | Numeric filename prefixes; the build reads them in sorted order. No `@import`, no implicit ordering. |
| Tokens before consumers | `10–15` always precede `20+`. A token can never be used before it is defined. |
| Variants after components | `70+` after `50–66`, so a variant only needs to override, never to fight. |
| Compatibility last and isolated | `95+`. Deleting a compat file can never break the core theme (brief §18). |
| Mode separation is physical | `41-live-preview` vs `42-reading-mode` vs `40-editor-shared`. Prevents Obsidianite's divergence problem (F-9). |
| One concern per file | The largest file should stay under ~300 lines. |

### Build script contract

```
build.mjs
  → read src/**/*.css in lexicographic order
  → prepend 00-banner.css verbatim (licence/attribution — never stripped)
  → concatenate with `/* ══ <filename> ══ */` separators
  → write theme.css
  → --watch flag for development
  → optional --minify (off by default; readable output aids user debugging)
```

Zero runtime dependencies. Node's built-in `fs` only. The theme remains hand-editable by anyone who does not want to run the build — they can edit `theme.css` directly, they just lose the source-of-truth guarantee.

---

## 5. `@layer` consideration

CSS Cascade Layers would express ordering more elegantly:

```css
@layer primidian.tokens, primidian.base, primidian.ui, primidian.editor,
       primidian.components, primidian.variants, primidian.systems, primidian.compat;
```

**Recommendation: do not use `@layer` in v1.**

Reason: everything inside any `@layer` loses to unlayered CSS regardless of specificity. Obsidian core styles and most plugin styles are unlayered. A layered theme would therefore lose to plugin CSS in unexpected places. The numeric-filename ordering achieves the same maintainability with none of the cascade risk. Revisit if Obsidian core ever adopts layers.

---

## 6. Performance rules (brief §17)

| # | Rule | Rationale |
|---|---|---|
| PR-1 | `transition: all` is **banned** | Animates layout properties; forces recalc |
| PR-2 | Animate only `transform`, `opacity`, `background-color`, `box-shadow`, `border-color`, `color` | Compositor-friendly or cheap paint |
| PR-3 | Never animate `width`, `height`, `margin`, `padding`, `top/left` | Layout thrash (why Primary's `slideUpAlt` is rejected) |
| PR-4 | Max selector depth: 4 | Obsidianite has depth-5 chains |
| PR-5 | No `*` or unqualified descendant selectors in animated rules | |
| PR-6 | `:has()` only on stable, low-frequency elements (`strong`, `h1`) — never on `.cm-line` | `:has()` invalidation on editor lines is expensive |
| PR-7 | Prefer `color-mix()` over pre-computed alpha variables | One token instead of four |
| PR-8 | `!important` budget: **≤ 5 in the entire theme**, each with a comment justifying it | Primary manages 2; Obsidianite has 25 |
| PR-9 | No `backdrop-filter` without a Style Settings off-switch | Expensive; Primary gates it too |
| PR-10 | No embedded fonts | 1.24 MB in Primary; slows theme load |
| PR-11 | Use `:where()` for defaults that Style Settings must override | Zero specificity |
| PR-12 | Every `transition` written as explicit `property duration easing` per comma segment | Avoids the malformed lists found in both source themes |

---

## 7. Future colour-profile readiness (brief §15)

The architecture supports profiles **without any additional plugin**, because a profile is simply "a different set of Tier-1 anchors".

```css
/* Future: a profile is one body class that re-anchors the ramps */
body.primidian-profile-amoled.theme-dark {
  --primidian-c-neutral-100: hsl(0, 0%, 0%);
  --primidian-c-neutral-200: hsl(0, 0%, 4%);
  --primidian-c-neutral-50:  hsl(0, 0%, 0%);
}

body.primidian-profile-midnight.theme-dark {
  --primidian-c-neutral-100: hsl(222, 40%, 8%);
  --primidian-c-cyan-500:    hsl(199, 90%, 55%);
}
```

Delivered via a `class-select` in Style Settings. Because Tier 2 and Tier 3 reference Tier 1 exclusively, re-anchoring ~8 primitives re-tints the entire theme coherently. Nothing needs to be built now beyond keeping the discipline: **no Tier-3 or usage-site rule may reference a Tier-1 primitive directly.**

User-defined profiles are already covered by Style Settings' built-in **Export / Import JSON** (verified in plugin source: `ExportModal` / `ImportModal`). Documenting that is sufficient for v1; no custom plugin needed.

---

## 8. Naming conventions

| Kind | Pattern | Example |
|---|---|---|
| Tier 1 primitive | `--primidian-c-<hue>-<step>` | `--primidian-c-cyan-500` |
| Tier 2 semantic | `--primidian-<role>[-<modifier>]` | `--primidian-accent-hover` |
| Tier 3 component | `--primidian-<component>-<property>` | `--primidian-h1-color` |
| Body variant class | `primidian-<component>-<variant>` | `primidian-divider-gradient` |
| Body feature toggle | `primidian-<feature>-<on/off>` | `primidian-gradients-off` |
| Style Settings id | must equal the variable name **without** `--` | `primidian-accent` |
| Compat section | `/* PLUGIN COMPATIBILITY — <Name> */` | |

**Rule:** the Style Settings `id` field *is* the CSS variable name minus the leading dashes. This is how the plugin works (it emits `--${id}: value`), and keeping the mapping mechanical eliminates an entire class of typo bugs.
