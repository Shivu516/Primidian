# 09 — Gradient System and Animation System

Answers brief §9 and §10.

---

# Part A — Global Gradient System

## A1. Requirements

From brief §9:
- A global `Enable Gradients: ON / OFF`
- Global gradient colour 1, colour 2, angle
- Per-component overrides (headings, links, dividers, …)
- Graceful fallback to solid colours when disabled
- Architecture must allow adding gradient-enabled components later

## A2. The cascade design

Three levels, resolved entirely by CSS variable fallback chaining — no duplicated rules.

```
Level 1  GLOBAL     --primidian-grad-1 / --primidian-grad-2 / --primidian-grad-angle
Level 2  COMPONENT  --primidian-h-grad-1 (optional; falls back to global)
Level 3  RESOLVED   --primidian-h-gradient  (the value actually consumed)
```

```css
/* tokens/14-components.css */
body {
  /* Level 1 — global defaults */
  --primidian-grad-1: var(--primidian-accent);
  --primidian-grad-2: var(--primidian-accent-alt);
  --primidian-grad-angle: 62deg;                /* Obsidianite's bold-gradient angle */

  /* Level 2 — per-component, EMPTY by default so they fall through */
  --primidian-h-grad-1: var(--primidian-grad-1);
  --primidian-h-grad-2: var(--primidian-grad-2);
  --primidian-h-grad-angle: var(--primidian-grad-angle);

  --primidian-link-grad-1: var(--primidian-grad-1);
  --primidian-link-grad-2: var(--primidian-grad-2);

  --primidian-divider-grad-1: var(--primidian-grad-1);
  --primidian-divider-grad-2: var(--primidian-grad-2);

  --primidian-bold-grad-1: var(--primidian-grad-1);
  --primidian-bold-grad-2: var(--primidian-grad-2);
  --primidian-bold-grad-angle: var(--primidian-grad-angle);

  /* Level 3 — resolved */
  --primidian-h-gradient:    linear-gradient(var(--primidian-h-grad-angle),    var(--primidian-h-grad-1),    var(--primidian-h-grad-2));
  --primidian-bold-gradient: linear-gradient(var(--primidian-bold-grad-angle), var(--primidian-bold-grad-1), var(--primidian-bold-grad-2));
  --primidian-divider-gradient: linear-gradient(90deg, transparent, var(--primidian-divider-grad-1), var(--primidian-divider-grad-2), transparent);
}
```

A user who sets only the global colours gets consistent gradients everywhere. A user who sets `--primidian-h-grad-1` gets a different heading gradient while everything else still tracks the global. **No branching, no duplicated rules — just fallback chaining.**

## A3. The master off-switch

```css
/* systems/80-gradients.css — LAST in the cascade before compat */
body.primidian-gradients-off {
  --primidian-h-gradient:       none;
  --primidian-bold-gradient:    none;
  --primidian-divider-gradient: none;
  --primidian-link-gradient:    none;
}

body.primidian-gradients-off :is(strong, .cm-strong),
body.primidian-gradients-off :is(h1,h2,h3,h4,h5,h6) {
  background-image: none;
  -webkit-background-clip: initial;
  -webkit-text-fill-color: initial;
}

body.primidian-gradients-off :is(strong, .cm-strong) { color: var(--primidian-bold-color); }
body.primidian-gradients-off .markdown-rendered h1   { color: var(--primidian-h1-color);   }
/* …h2–h6… */
```

Every gradient-using rule is authored so that `background-image: none` degrades to the solid `color` already declared beneath it:

```css
/* components/53-emphasis.css */
:is(strong, .cm-strong):not(:has(code, kbd, mark, a, .tag)) {
  color: var(--primidian-bold-color);              /* ← always present: the fallback */
  background-image: var(--primidian-bold-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
```

With gradients off, `background-image: none` + the reset block restores plain `--primidian-bold-color`. **Nothing needs to be recomputed and nothing can end up invisible** — which is also the fifth layer of the Bug #2 fix.

## A4. Style Settings wiring

`class-toggle` with `id: primidian-gradients-off`, `default: false`, titled **"Enable Gradients"** — inverted in the description so the user-facing label reads positively while the class name reads as the *deviation from default*. (A `class-toggle` adds the class when ON, so the class must name the non-default state.)

Per-component groups follow the pattern in `07-*` §2 item 17.

## A5. Extending to a new component

```
1. Add --primidian-<c>-grad-1/-2/-angle in tokens/14-components.css,
   each defaulting to the global equivalent.
2. Add --primidian-<c>-gradient composing them.
3. Consume it in the component file, with a solid `color`/`background-color`
   declared FIRST as the fallback.
4. Add --primidian-<c>-gradient: none; to the body.primidian-gradients-off block.
5. Add the 4 settings to section 17 of the settings YAML.
```

Five steps, no changes to existing components.

## A6. Accessibility guard

Gradient-clipped text has variable contrast along its length. Two mitigations:

1. **Constrain the ramp.** Both gradient stops must come from the same lightness band. Documented as a design rule; the default pairs (`cyan-500`/`magenta-500`) satisfy it.
2. **Offer the off-switch prominently.** Section 17 is a top-level heading, and the README will state that users who need guaranteed contrast should disable gradients.

Gradient-clipped text is also invisible to `forced-colors` / Windows High Contrast mode. Add:

```css
@media (forced-colors: active) {
  :is(strong, .cm-strong), :is(h1,h2,h3,h4,h5,h6) {
    background-image: none;
    -webkit-text-fill-color: initial;
    forced-color-adjust: auto;
  }
}
```

Neither source theme has this.

---

# Part B — Animation System

## B1. What was learned from Primary

| Finding | Implication for Primidian |
|---|---|
| 53 transitions vs 3 keyframes | Motion quality comes from **consistent short transitions on interactive states**, not choreography |
| Four named durations, four named easings, all tokenised | Adopt; expose both via Style Settings |
| `slideUp`/`slideDown` use `transform` + `opacity` with an overshoot stop at 50–60 % | Adopt the *technique*; author our own keyframes |
| `slideUpAlt` animates `margin-top` | **Reject** — layout thrash (brief §17) |
| `transition: border, box-shadow, transform var(--button-anim)` | **Reject** — malformed comma list; a real bug in Primary |
| No `prefers-reduced-motion` anywhere | **Add** (brief §10, §22.12) |

## B2. Token scale

```css
body {
  --primidian-motion-scale: 1;      /* global multiplier, 0.25–2.0 */

  --primidian-motion-superfast: calc( 80ms * var(--primidian-motion-scale));
  --primidian-motion-fast:      calc(160ms * var(--primidian-motion-scale));
  --primidian-motion-moderate:  calc(260ms * var(--primidian-motion-scale));
  --primidian-motion-slow:      calc(400ms * var(--primidian-motion-scale));

  --primidian-ease-standard:  cubic-bezier(0.40, 0.00, 0.20, 1.00);
  --primidian-ease-overshoot: cubic-bezier(0.34, 1.56, 0.64, 1.00);
  --primidian-ease-swing:     cubic-bezier(0.45, 0.05, 0.55, 0.95);
  --primidian-ease-exit:      cubic-bezier(0.40, 0.00, 1.00, 1.00);
}
```

The `calc()` multiplier means **one slider retimes the entire theme** — no per-duration editing required, while the four base durations remain individually settable for anyone who wants them.

### Usage guide

| Duration | Use for |
|---|---|
| `superfast` (80 ms) | Colour/tint feedback on hover; focus rings |
| `fast` (160 ms) | Buttons, icons, checkboxes, links, tags |
| `moderate` (260 ms) | Panels, tabs, popovers, callout collapse |
| `slow` (400 ms) | Sidebar reveal, large-surface transitions |

| Easing | Use for |
|---|---|
| `standard` | Almost everything |
| `overshoot` | Elements that *appear* — checkbox tick, popup entry |
| `swing` | Elements that *travel* — slide-out ribbon, drawer |
| `exit` | Elements that *leave* — accelerate away |

## B3. Keyframes (own implementation)

```css
/* systems/81-motion.css */
@keyframes primidian-enter-up {
  from { opacity: 0; transform: translate3d(0, 6px, 0) scale(0.985); }
  to   { opacity: 1; transform: translate3d(0, 0,   0) scale(1);     }
}

@keyframes primidian-enter-down {
  from { opacity: 0; transform: translate3d(0, -6px, 0); }
  to   { opacity: 1; transform: translate3d(0,  0,   0); }
}

@keyframes primidian-fade {
  from { opacity: 0; }
  to   { opacity: 1; }
}
```

Three keyframes, matching Primary's discipline. All `transform` + `opacity` only, and `translate3d` to force compositor promotion. The overshoot Primary achieves with extra keyframe stops, Primidian achieves with `--primidian-ease-overshoot` — same visual, fewer stops, and it becomes user-tunable.

## B4. Motion inventory

| Target | Property | Duration | Easing |
|---|---|---|---|
| Buttons, clickable icons | `background-color`, `box-shadow` | fast | standard |
| Ribbon / tab icons | `opacity`, `color` | fast | standard |
| Nav items | `background-color`, `border-color` | fast | standard |
| Internal/external links | `background-size`, `color` | moderate | standard |
| Checkbox box | `background-color`, `border-color` | fast | standard |
| Checkbox tick (`::after`) | `transform`, `opacity` | fast | **overshoot** |
| Status bar | `opacity` | moderate | standard |
| Tags | `background-color`, `border-color` | fast | standard |
| Callout collapse chevron | `transform` | fast | standard |
| Modals / popovers / suggesters | `primidian-enter-up` | moderate | overshoot |
| Menus dismissing | `primidian-enter-down` reversed | fast | exit |
| Divider glyph (Animated variant) | `transform`, `color` | moderate | overshoot |
| Progress bars | `width` | moderate | standard |

**Explicitly rejected:**

| Rejected | Reason |
|---|---|
| `transition: all` | Brief §17; animates layout properties |
| Any `margin`/`padding`/`width`/`height` transition (except progress bars) | Layout thrash |
| Infinite/idle animations | Battery + CPU cost with zero information value |
| Animations on `.cm-line` or list items | Fires on every keystroke and every scroll |
| Heading entry animations | Would re-fire on scroll and on every edit — actively distracting |
| `backdrop-filter` transitions | Very expensive |

## B5. Reduced motion (brief §10, §22.12)

Three independent off-ramps, in precedence order:

```css
/* 1. System preference — respected by default, but user-overridable */
@media (prefers-reduced-motion: reduce) {
  body:not(.primidian-motion-force) * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}

/* 2. Explicit user off-switch, independent of the OS setting */
body.primidian-animations-off * {
  animation-duration: 0.01ms !important;
  transition-duration: 0.01ms !important;
}

/* 3. Granular toggles */
body.primidian-anim-no-popups :is(.modal, .menu, .suggestion-container) { animation: none; }
body.primidian-anim-no-hover-lift .clickable-icon:hover { transform: none; }
body.primidian-anim-no-checkbox input[type="checkbox"]::after { transition: none; }
```

**Note on `!important`:** the reduced-motion blocks are the one legitimate exception to PR-8 (the `!important` budget). Accessibility overrides are precisely the case the specification intends `!important` for, and this is the standard idiom recommended by the WCAG techniques and by every major CSS reset. Three occurrences, all inside accessibility guards, all commented. Budget accounted for.

`0.01ms` rather than `0s` is deliberate: it lets `animationend` / `transitionend` events still fire, so any Obsidian or plugin JS waiting on them does not hang.

The `body:not(.primidian-motion-force)` escape hatch exists because some users enable OS-level reduced motion for reasons unrelated to vestibular sensitivity and still want theme animation. Default is to respect the system.

## B6. Style Settings exposure

See `07-*` §2 section 18. The three most useful controls:

| Control | Type | Why |
|---|---|---|
| Enable Animations | `class-toggle` | The blunt instrument; always available |
| Animation Speed | `variable-select` | Instant / Fast / Normal / Relaxed — sets `--primidian-motion-scale` to `0.01` / `0.6` / `1` / `1.5`. One dropdown, whole-theme effect. |
| Speed Multiplier | `number-slider` 0.25–2.0 | For users who want precision |

Individual durations and easings are exposed too, but nested one level deeper — most users will only ever touch the dropdown.

## B7. Performance budget

| Metric | Target | Rationale |
|---|---|---|
| Elements with an active transition at rest | 0 | Transitions only fire on state change |
| Distinct `@keyframes` | ≤ 4 | Primary manages 3 |
| Animated properties | `transform`, `opacity`, `background-color`, `box-shadow`, `border-color`, `color` only | Compositor-friendly or cheap paint |
| `will-change` declarations | 0 | Premature promotion costs memory; the browser's own heuristics are better here |
| Animations inside the editor content area | 0 | Would re-fire on every keystroke |
| `:has()` in animated selectors | 0 | Invalidation cost |
