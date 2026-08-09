# Primidian

**Obsidianite's visual identity, engineered.**

A dark-first Obsidian theme that takes the visual language of
[Obsidianite](https://github.com/bennyxguo/Obsidian-Obsidianite) — deep violet-black
surfaces, cyan and magenta accents, gradient headings, sweeping links — and rebuilds it
on a modern, fully-tokenised architecture with real light-mode support, deep Style
Settings customisation, and fixes for two long-standing rendering bugs.

---

## Overview

Primidian is **not** a merge of two stylesheets. It is a ground-up reimplementation
with three explicit goals:

1. **Preserve Obsidianite's look.** The palette, the gradient heading underline, the `§`
   divider, the sweeping link underline, the layered blockquote — these are the identity,
   and they are all here.
2. **Fix what was broken.** Obsidianite has two well-known rendering bugs. Both were
   root-caused rather than patched, and both fixes are architectural.
3. **Make everything customisable.** ~215 Style Settings entries, organised by what a
   user wants to change rather than by which selector implements it.

| | |
|---|---|
| **Modes** | Dark and Light, both deliberately designed |
| **Size** | ~257 KB (no bundled fonts) |
| **Functional `!important`** | **0** (Obsidianite: 25) |
| **Style Settings entries** | ~215 |
| **Licence** | MIT |

---

## Features

- **Dark and light mode**, each with an independently designed palette — not an inversion
- **~255 Style Settings options**, every one with a working *Restore default*
- **Five structurally distinct divider styles** — different in shape, not just colour
- **Five heading styles**, extensible variant architecture
- **Global glow system** — optional, intensity-controlled, derives from each element's own colour
- **Polished tab motion** — hover lift, press sink, raised active card, indicator wipe
- **Optional code-block line numbers** (Live Preview)
- **Global gradient system** with per-component overrides and a master off-switch
- **Motion system** with a named duration/easing scale and a single speed multiplier
- **Full `prefers-reduced-motion` support**, plus explicit user overrides
- **Independent dimension controls** for divider, underline and highlight geometry
- **Custom task states** — `[/]` `[-]` `[>]` `[<]` `[?]` `[!]` `[*]` and more, each with its own colour and glyph
- **Unified syntax highlighting** — one palette drives both Live Preview and Reading Mode
- **Callout support** — Obsidianite had none
- **Table, embed and properties styling** — Obsidianite had none
- **Mobile and tablet layer** — Obsidianite had none
- **Task List Kanban compatibility** — the headline fix
- **Reading Mode inline code fix** — the second headline fix

---

## Installation

### From the vault

1. Download `theme.css` and `manifest.json`.
2. Place them in `<your vault>/.obsidian/themes/Primidian/`.
3. Settings → Appearance → Themes → **Primidian**.

### Recommended companions

- **[Style Settings](https://github.com/mgmeyers/obsidian-style-settings)** — required for
  customisation. Without it the theme uses its defaults.
- **Fonts** — Primidian bundles none. Install *Rubik* or *Inter* for text and *JetBrains Mono*
  or *Cascadia Code* for code, then set them under **Typography**. The theme degrades
  gracefully to system fonts.

---

## Design Philosophy

### Obsidianite-inspired visual foundation

Obsidianite's identity is preserved deliberately, not incidentally. Its exact colours are
the anchors of Primidian's colour ramps, so the theme looks like Obsidianite the moment it is
enabled. Specifically retained:

| Element | What was kept |
|---|---|
| Palette | `#100e17` background, `#0fb6d6` cyan, `#f4569d` magenta |
| Headings | Magenta gradient underline fading out to the right |
| Dividers | The rotated `§` glyph on a fading gradient rule |
| Links | Background-gradient underline that sweeps up to fill on hover |
| Bold | Blue→lilac gradient-clipped text |
| Blockquotes | Left border plus asymmetric gradient bars |
| Tags | Small italic pills |
| Status bar | Floating, fades out until hovered |
| Checkboxes | The springy check animation — reimplemented on a sound mechanism |

### Primary-inspired animation system

[Primary](https://github.com/primary-theme/obsidian) by Cecilia May is the quality
benchmark for interaction design in the Obsidian ecosystem. Primidian learned three things
from studying it:

1. Motion quality comes from **consistent short transitions on interactive states**, not
   from elaborate choreography. Primary has ~53 transitions and only 3 keyframes.
2. A **named duration and easing scale** keeps a large theme coherent.
3. An **overshoot** on entry makes an animation feel physical rather than mechanical.

> **No code from Primary is included in Primidian.** Primary is GPLv3; Primidian is MIT.
> Every animation was independently written. See [Credits](#credits--attribution--licences).

Primidian also adds what Primary lacks: full `prefers-reduced-motion` support.

### Obsidian-native compatibility

Primidian assigns Obsidian's own CSS variables from its semantic tokens rather than
overriding selectors. This means Obsidian's native surfaces and third-party plugins get
correct styling automatically, without bespoke rules. It is why the Task List Kanban fix
also happens to fix Dataview, Canvas cards and hover previews.

### Customisation-first architecture

Every themeable value is a CSS custom property declared at a specificity Style Settings
can override, and consumed only via `var()` at the point of use. There are **zero
functional `!important` declarations** in the theme. If you can see it, you can change it.

---

## Customization

Open **Settings → Style Settings → Primidian**.

| Section | Contains |
|---|---|
| About & Guide | Orientation and reset guidance |
| Colours | Accent, backgrounds, text, borders — light and dark independently |
| Typography | Fonts, size, weight, line height, content width |
| Interface | Radii, icon opacity, status bar |
| Headings | Style variant, spacing, underline thickness and offset, accent bar, plus 6 per-level groups |
| Dividers | Style variant, line pattern, dimensions, glyph, animation, colours |
| Bold, Italic & Highlight | Colours, weights, highlight padding and radius |
| Links | Style variant, colours, sweep geometry |
| Inline Code | Colour, background, radius, size |
| Code Blocks | Background, radius, sizing, 8 syntax colours, **line numbers** |
| Callouts | Radius, accent width, tint strength |
| Blockquotes | Colours, border, background |
| Checkboxes & Tasks | Size, colours, plus 6 custom task-state colours |
| Tags | Colours, size, shape |
| Tables | Header, borders, striping |
| Lists, Embeds & Properties | Markers, guides, containers |
| Gradient System | Global colours plus per-component overrides |
| **Glow System** | Global controls + per-element toggles (headings, links, tags, dividers, tables, buttons, checkboxes, toggles, sliders, inputs, tabs, sidebar, borders, code) + pulse animation |
| Animations | Master switch, speed, durations, easings, **tab motion** |
| Plugin Compatibility | Task List Kanban options |
| Advanced | Blur, scrollbar, border width |

### Colour controls and transparency

Transparency is enabled only where it is meaningful. Solid colours — accent, backgrounds,
text, headings, syntax — present a plain swatch with no opacity slider. Eight settings whose
purpose is a translucent tint do offer alpha:

`Border` · `Highlight Background` · `Internal Link Underline` · `External Link Underline` ·
`Inline Code Background` · `Blockquote Background` · `Tag Background` · `Table Border`

> **Note on the colour swatch.** Style Settings v1.0.9 has an upstream bug: for a
> `variable-themed-color` you have *not yet changed*, it passes an empty string instead of the
> declared default when setting `--pcr-color`. Per CSSOM, `setProperty(name, "")` removes the
> property, so the swatch paints nothing and the transparency checkerboard behind it shows
> through. Saving any value fixes that control permanently. Primidian does **not** mask this with
> CSS, because doing so would also hide genuine transparency on the eight settings above.
> Full diagnosis in `docs/15` §6.

### Defaults and resetting

Every setting has a documented default. Style Settings provides four levels of reset:

| Level | How |
|---|---|
| One setting | The circular-arrow button beside it |
| One section | The circular-arrow button on the section heading |
| Entire theme | The circular-arrow button on the **Primidian** heading |
| Snapshot / restore | **Export** and **Import** at the top of the panel |

Export/Import is also how you keep multiple colour setups side by side until built-in
colour profiles ship.

---

## Components

| Component | Variants | Notes |
|---|---|---|
| **Headings** | Obsidianite · Minimal · Gradient · Bordered · Accent Bar | Full per-level control |
| **Dividers** | Decorative · Gradient · Standard · Minimal · Animated | Plus a Solid/Dashed/Dotted pattern axis |
| Links | Sweep | Architecture ready for more |
| Callouts | Standard | All 14 Obsidian types coloured |
| Code blocks | Standard | Unified across both modes; optional line numbers |
| Checkboxes | Rounded | Full custom task-state support |
| Tags | Pill | |
| Tables | Standard | |
| Blockquotes | Obsidianite | |

Single-option dropdowns are deliberate: the setting key and its default are locked in from
v1.0, so adding a variant later can never invalidate a saved configuration.

### Divider styles

The five styles differ in **shape**, not merely colour — so they stay distinguishable even
if you set every colour token to the same value.

| Style | Fill | Width | Thickness | End caps | Glyph | Motion |
|---|---|---|---|---|---|---|
| **Decorative** *(default)* | gradient | 92% | 1px | — | **yes** | hover |
| **Gradient** | gradient | 100% | 2px | — | — | — |
| **Standard** | flat | 100% | 2px | **dots** | — | — |
| **Minimal** | flat | **38%** | 1px | — | — | — |
| **Animated** | gradient | 100% | 2px | — | — | **travelling highlight** |

*Decorative* is the Obsidianite signature: a fading rule interrupted by a rotated `§`.
*Animated* is genuinely animated — a narrow highlight sweeps the rule on a loop, driven by
`transform: translate3d` only, and it stops cleanly under reduced motion or the global
animation toggle.

An independent **Line Pattern** control (Solid / Dashed / Dotted) composes with any of the
five, implemented as a mask so it works with gradient fills too.

### Dimension controls

Geometry is controlled independently of colour:

| Group | Controls |
|---|---|
| Divider | thickness · width · space above · space below · end-cap size |
| Divider glyph | character · rotation · size · clearance · weight |
| Divider animation | sweep duration · highlight width |
| Headings | underline thickness · underline offset · accent-bar thickness |
| Highlights | horizontal padding · vertical padding · corner radius |
| Line numbers | gutter width · gutter gap · font size · separator width |

`Space Above` and `Space Below` both default to the shared `Vertical Spacing` value, so an
existing configuration keeps working until you set them individually.

---

## Tab motion

Tabs use a small, coherent motion vocabulary rather than a generic transition:

| Interaction | Behaviour |
|---|---|
| Inactive hover | Lifts by `--primidian-tab-lift` (2px) |
| Inactive press | Sinks by `--primidian-tab-press` (1px) |
| Active tab | Reads as a raised card — layered inset highlight and shade plus a soft drop shadow |
| Tab switch | Accent indicator wipes out from the centre (`scaleX`) |
| Close button | Scales in on hover, fills with the accent, glyph flips to the on-accent colour |

Every property animated is `transform`, `opacity`, `color`, `background-color` or
`box-shadow` — nothing that triggers layout. **Disable Tab Motion** removes the movement
while keeping colour feedback, and everything is suppressed under the global animation
toggle and `prefers-reduced-motion`. On mobile the close button stays visible, since there
is no hover state.

This behaviour was **independently implemented** after studying Primary's tab interaction.
See [Credits](#credits--attribution--licences) and `docs/15` for the full clean-room record.

---

## Glow

An optional accent glow, off by default. Each element derives its glow from its **own
configured colour** rather than always from the global accent.

### How it works

```
Glow intensity ──┬──> --primidian-glow-alpha   (opacity)
                 └──> --primidian-glow-blur    (radius)
```

A component needs a single declaration, passing **its own** colour token:

```css
box-shadow: 0 0 var(--primidian-glow-blur) var(--primidian-glow-spread)
            color-mix(in srgb, var(--primidian-divider-color) var(--primidian-glow-alpha), transparent);
```

Because each element supplies its own colour, **recolouring an element recolours its glow
automatically** — a custom divider colour, or a custom `[!]` task colour, is picked up with
no extra settings and no duplicated CSS.

### Text glow vs UI glow

- **Text glow** uses `text-shadow` — clean glow without backgrounds, outlines, or blurry glyphs.
- **UI glow** uses `box-shadow` — appropriate for borders, controls, and surfaces.

### Per-element toggles

Each glow target can be enabled or disabled independently:

| Target | Default | Notes |
|---|---|---|
| Text | Off | Subtle glow on body text |
| Headings | On | Glow follows each heading's colour |
| Links | On | Glow on hover, follows link colour |
| Tags | On | Glow on hover, follows tag colour |
| Highlights | On | Glow follows highlight colour |
| Dividers | On | Glow follows divider colour/gradient |
| Tables | Off | Subtle border glow |
| Buttons | On | Glow on hover, follows accent colour |
| Checkboxes | On | Glow on checked state |
| Toggles | On | Glow on enabled state |
| Sliders | On | Glow on thumb |
| Inputs | On | Glow on focus |
| Tabs | On | Glow on active indicator |
| Sidebar | On | Glow on active items |
| Borders | Off | Glow on blockquote borders |
| Code | Off | Glow on line numbers |

### Global controls

- **Enable/Disable** — master switch (off by default)
- **Intensity** — scales blur and opacity (0–2, default 1)
- **Blur Radius** — base radius at intensity 1 (in pixels)
- **Opacity** — base opacity at intensity 1 (0–1, default 0.45)
- **Global Opacity** — multiplier for all glow effects (0–1, default 1)
- **Spread** — extra spread beyond blur (in pixels)
- **Corner Radius** — glow corner radius (in pixels)
- **Pulse Animation** — optional pulsing effect (off by default)
- **Pulse Duration** — pulse cycle duration (in seconds)

### Numeric settings

All numeric glow settings use predefined CSS units. Enter only the number:

| Setting | Unit | Example |
|---|---|---|
| Blur Radius | px | `8` (becomes `8px`) |
| Spread | px | `0` (becomes `0px`) |
| Corner Radius | px | `0` (becomes `0px`) |
| Pulse Duration | s | `3` (becomes `3s`) |

### Live Preview / Editing Mode support

The same glow effects are available in Live Preview / Editing Mode. Each glow
target uses the appropriate CodeMirror selectors so that glow appears on the
same elements in both modes:

| Reading Mode | Live Preview |
|---|---|
| `h1`–`h6` | `.cm-header-1`–`.cm-header-6` |
| `strong` | `.cm-strong` |
| `em` | `.cm-em` |
| `a.internal-link` | `.cm-hmd-internal-link` |
| `a.external-link` | `.cm-link` |
| `a.tag` | `.cm-hashtag` |
| `mark` | `.cm-highlight` |
| `code` | `.cm-inline-code` |
| `hr` | `.cm-line hr` |
| `table` | `.cm-table-widget table` |
| `blockquote` | `.HyperMD-quote` |

All glow settings are shared between modes — enabling a glow target in Style
Settings activates it in both Reading Mode and Live Preview simultaneously.

### Accessibility

- Glow is suppressed entirely in Windows High Contrast mode (`forced-colors: active`).
- Pulse animation respects `prefers-reduced-motion`.
- Glow reduces effective contrast at high intensities — use with care.

---

## Code block line numbers

Optional, off by default. **Live Preview only** — see below.

| Control | Default |
|---|---|
| Show Line Numbers | off |
| Line Number Colour | the main accent |
| Opacity | 0.45 |
| Gutter width / gap / font size / separator | 2.5em / 1em / 0.9em / 0 |

Numbers are `user-select: none`, so selecting and copying code never picks them up. Syntax
highlighting, scrolling, wrapping, the copy button, language labels and plugin-rendered
blocks are all untouched.

> **Reading Mode is not supported, and this is a structural limit rather than an oversight.**
> Obsidian renders a Reading Mode code block as a *single text node* containing newline
> characters — `<pre><code>line1\nline2</code></pre>`. There is no per-line element, and CSS
> counters increment per element, so no CSS-only technique can number those lines. Obsidianite
> shipped ~40 lines of CSS attempting this against `.line-numbers-rows > span`, a DOM produced
> by a Prism *JavaScript* plugin that Obsidian does not bundle — which is why it never worked
> there either. Rather than ship a fragile hack, Primidian supports the mode where the DOM allows
> it and documents the limit here.

---

## Gradients

Gradients resolve through a three-level cascade using nothing but CSS variable fallback:

```
Global      --primidian-grad-1 / --primidian-grad-2 / --primidian-grad-angle
   ↓ (each component defaults to the global)
Component   --primidian-bold-grad-1, --primidian-h-grad-1, --primidian-divider-grad-1, …
   ↓
Resolved    --primidian-bold-gradient, --primidian-h-gradient, --primidian-divider-gradient
```

Set the global colours once and everything follows. Override one component and the rest
keep tracking the global.

**Disable All Gradients** makes every gradient component fall back to the solid colour it
already declares. Nothing is recomputed and nothing can end up invisible — this is also a
guaranteed escape hatch for the inline-code bug described below.

---

## Animations

```
--primidian-motion-superfast   80ms   hover tints, focus rings
--primidian-motion-fast       160ms   buttons, icons, checkboxes, tags
--primidian-motion-moderate   260ms   panels, popovers, link sweeps
--primidian-motion-slow       400ms   large surfaces

--primidian-ease-standard    cubic-bezier(0.4, 0, 0.2, 1)
--primidian-ease-overshoot   cubic-bezier(0.34, 1.56, 0.64, 1)
--primidian-ease-swing       cubic-bezier(0.45, 0.05, 0.55, 0.95)
--primidian-ease-exit        cubic-bezier(0.4, 0, 1, 1)
```

All four durations are multiplied by `--primidian-motion-scale`, so a single slider retimes the
whole theme.

**Reduced motion** is handled in three independent layers:

1. `prefers-reduced-motion: reduce` is respected **by default**
2. *Disable All Animations* works regardless of the OS setting
3. Granular toggles for popups, the checkbox tick and button presses

*Ignore System Reduce-Motion* lets users who enable the OS setting for unrelated reasons
keep theme animation.

Only compositor-friendly properties are animated. `transition: all` is banned, and no
animation runs at idle.

---

## Plugin Compatibility

### Task List Kanban Checkbox Fix

> **Plugin:** [Task List Kanban](https://github.com/erikars/task-list-kanban) v2.13.0
> by Chris Kerr & Erika Rice Scherpelz

#### The original problem

Under Obsidianite, Task List Kanban checkboxes did not render. Cards showed a blank gap
where the status marker should be, and nested subtask checkboxes inside card previews were
invisible. Other themes, including Primary, rendered them correctly.

#### Investigation

Task List Kanban ships as a compiled Svelte bundle, so the component CSS and DOM templates
were extracted from string literals in `main.js` and compared against Obsidianite's rules.

**What Obsidianite did:**

```css
/* Obsidianite.css:365-436 */
.contains-task-list .task-list-item input[type='checkbox'] {
    opacity: 0;                       /* hide the real control      */
}
.contains-task-list .task-list-item {
    position: relative;
    padding-left: 30px;               /* reserve a gutter           */
}
.contains-task-list .task-list-item::before {
    position: absolute;
    left: -25px;                      /* draw a substitute in it    */
    width: 20px; height: 20px;
    border: 2px solid #9e9e9e;
}
.contains-task-list .is-checked.task-list-item::after {
    /* the tick */
}
```

**What Task List Kanban renders** (reconstructed from `main.js:15336-15342`):

```html
<span class="task-status-marker" style="--task-status-marker-size: 16px">
  <span class="task-list-item HyperMD-task-line" data-task="x">
    <input type="checkbox" class="task-list-item-checkbox source-status-checkbox"
           data-task="x" checked>
  </span>
</span>
```

with the plugin's own scoped CSS forcing:

```css
.task-status-marker .task-list-item        { display: contents !important; }
.task-status-marker .source-status-checkbox { appearance: none !important; }
```

#### Why Obsidianite's implementation worked for normal task lists

Obsidian's markdown renderer emits exactly the DOM Obsidianite assumed:

```html
<ul class="contains-task-list">   <!-- required ancestor            ✔ -->
  <li class="task-list-item">     <!-- positioned block-level box   ✔ -->
    <input type="checkbox">       <!-- hidden, used as a hit target -->
```

Both preconditions hold, the 30px gutter exists, and the substitute renders neatly inside
it. For canonical markdown lists the approach worked well.

#### Why it failed for Task List Kanban

Three independent failures, all caused by the same design decision:

1. **No `.contains-task-list` ancestor.** Every `::before` and `::after` rule requires it.
   None of them matched, so no box and no tick were ever drawn.
2. **`.task-list-item` is a `<span>` set to `display: contents`.** It generates no box,
   so even a matching absolutely-positioned pseudo-element would have had no containing
   block to position against.
3. **The plugin strips `appearance` and paints nothing itself** — it explicitly delegates
   rendering to the theme. Obsidianite contained exactly **one** `input[type=checkbox]`
   rule in 1,481 lines, and that rule only set `opacity: 0`. Nothing was left to draw the
   control.

Inside card bodies (where the plugin *does* use Obsidian's renderer, producing a real
list) the outcome was worse: the plugin's `padding-left: 0 !important` removed the gutter,
`.task { overflow: hidden }` clipped the substitute sitting at `left: -25px`, and
Obsidianite's `opacity: 0` still won on the nested inputs. Doubly invisible.

**Primary worked because it styles `input[type=checkbox]` directly** — no ancestor
requirement, no parent-box requirement, and no `opacity: 0`.

#### The solution

Primidian removes the structural assumption rather than working around it. The governing rule:

> A component's rendering must depend only on the element that semantically **is** that
> component — never on an ancestor.

Therefore **the checkbox is the input**:

```css
input[type='checkbox'] {
    appearance: none;
    position: relative;
    width:  var(--primidian-checkbox-size);
    height: var(--primidian-checkbox-size);
    background-color: var(--primidian-checkbox-bg);
    border: var(--primidian-checkbox-border-width) solid var(--primidian-checkbox-border-color);
    border-radius: var(--primidian-checkbox-shape-radius);
}

input[type='checkbox']::after {
    content: '';
    position: absolute;
    inset: 0;                                     /* inside its own box */
    background-color: var(--primidian-checkbox-marker-color);
    -webkit-mask-image: var(--primidian-checkbox-icon-check);
    transform: scale(0.4);
    opacity: 0;
    transition: transform var(--primidian-motion-fast) var(--primidian-ease-overshoot),
                opacity   var(--primidian-motion-superfast) linear;
}

input[type='checkbox']:checked::after {
    transform: scale(1);
    opacity: 1;
}
```

Task states are matched through three selector shapes so every DOM Obsidian and its
plugins produce is covered:

```css
input[type='checkbox']:checked[data-task='/']        /* Task List Kanban  */
li[data-task='/'] > input[type='checkbox']:checked   /* Obsidian tight    */
li[data-task='/'] > p > input[type='checkbox']:checked /* Obsidian loose  */
```

#### Affected selectors

| Removed | Added |
|---|---|
| `.contains-task-list .task-list-item input[type='checkbox'] { opacity: 0 }` | `input[type='checkbox']` — full native styling |
| `.contains-task-list .task-list-item::before` | `input[type='checkbox']::after` at `inset: 0` |
| `.contains-task-list .is-checked.task-list-item::after` | `input[type='checkbox']:checked::after` |
| `.contains-task-list .task-list-item { padding-left: 30px }` | *(no gutter needed)* |
| `.markdown-preview-view ul > li.task-list-item { text-indent: -3em }` | *(removed)* |
| `.list-collapse-indicator { margin-left: -80px !important }` | *(removed)* |
| `@keyframes bounce`, `@keyframes checked-box` | overshoot easing on `transform` |

#### Why the solution works

| Failure mode | Why it can no longer occur |
|---|---|
| Missing `.contains-task-list` ancestor | Primidian's selector has no ancestor requirement |
| `.task-list-item` is a `<span>` | Primidian never references it for painting |
| `display: contents` on the parent | The pseudo-element lives on the input, which generates a box |
| `padding-left: 0 !important` | Primidian reserves no gutter — the box *is* the input |
| `overflow: hidden` clipping | The marker is at `inset: 0` of the input, never outside it |
| `appearance: none !important` | Primidian sets `appearance: none` too — they agree |
| Plugin `width`/`height` overrides | The marker is at `inset: 0`, so it rescales automatically |

**The compatibility layer is two cosmetic rules with zero `!important`** — it only scales
the border width and glyph size to the plugin's own `--task-status-marker-size` token. The
size of that file is the measure of whether the root-cause fix was right.

Because the fix is architectural, it also resolves checkbox rendering in **Dataview
tables, Canvas cards, hover previews and note embeds** — contexts that were never
specifically targeted.

---

### Reading Mode Inline Code Fix

#### The original problem

Under Obsidianite, inline code in Reading Mode could render with no visible text. The
background pill appeared but the characters inside it did not.

#### Investigation

Two independent defects were found.

**Primary cause — inherited `-webkit-text-fill-color`:**

```css
/* Obsidianite.css:616-624 */
.cm-strong, strong {
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;   /* ← inherits */
    background-image: linear-gradient(62deg, #87c2fd 0%, #dcb9fc 100%) !important;
}

/* Obsidianite.css:1088-1099 */
.markdown-preview-view code {
    color: rgba(14, 210, 247, 0.9) !important;   /* ← powerless */
}
```

`-webkit-text-fill-color` is an **inherited** property and it takes precedence over `color`
for glyph fill. A `<code>` inside a `<strong>` therefore inherited `transparent` and
painted nothing — while its own `background-color` still rendered, producing an empty
coloured pill. The `!important` on `color` could not help, because the property that won
was a different one.

**Evidence the original author encountered this**, from Obsidianite itself:

```css
/* Obsidianite.css:639-642 */
.cm-strong kbd,
strong kbd {
    -webkit-text-fill-color: initial;
}
```

That rule exists for exactly one reason: `<kbd>` inside `<strong>` was rendering
invisible, so an escape hatch was added. **The identical reset was never added for `code`,
`mark`, `a` or tags.** The workaround confirms both the mechanism and that it was known.

**Secondary cause — selector scope too narrow:**

`.markdown-preview-view` is present only on the main reading pane. Inline code was
therefore **completely unstyled** in note embeds, hover popovers, Canvas cards, and any
plugin-rendered markdown — including Task List Kanban card previews.

#### The solution

Five layers. Layers 1–3 are each independently sufficient; defence in depth is warranted
because this property's inheritance is easy to reintroduce accidentally.

**Layer 1 — correct targeting, and set both properties:**

```css
.markdown-rendered code:not(pre > code),
.cm-s-obsidian .cm-inline-code:not(.cm-formatting):not(.cm-hmd-indented-code),
.cm-s-obsidian code:not(pre > code) {
    color: var(--primidian-inline-code-color);
    -webkit-text-fill-color: var(--primidian-inline-code-color);  /* neutralise inheritance */
    background-image: none;
    -webkit-background-clip: initial;
    background-color: var(--primidian-inline-code-bg);
    /* … */
}
```

`.markdown-rendered` is present in **every** context Obsidian renders markdown into, which
fixes the secondary cause in a single change.

**Layer 2 — reset the fill on every inline child**, generalising the `<kbd>` hatch:

```css
:is(strong, em, del, s, mark, a, h1, h2, h3, h4, h5, h6) :is(code, .cm-inline-code) {
    -webkit-text-fill-color: var(--primidian-inline-code-color);
    background-image: none;
    -webkit-background-clip: initial;
}
```

**Layer 3 — guard the gradient at its source:**

```css
body:not(.primidian-gradients-off)
    :is(.markdown-rendered strong, .cm-s-obsidian .cm-strong):not(
        :has(code, kbd, mark, a, .tag, .math, img, svg)
    ) {
    background-image: var(--primidian-bold-gradient);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}
```

A `<strong>` containing any nested inline element simply never receives the clipping
properties, and falls back to the solid `--primidian-bold-color` that is always declared.

**Layer 4 — the gradient master switch** removes the offending property from the theme
entirely, making the bug structurally impossible.

**Layer 5 — the `!important` is gone**, restoring Style Settings customisability.

#### Affected selectors

| Removed | Added |
|---|---|
| `.markdown-preview-view code { … !important }` | `.markdown-rendered code:not(pre > code)` |
| *(none — no fill reset existed for code)* | `-webkit-text-fill-color` on inline code |
| `strong { -webkit-text-fill-color: transparent }` (unguarded) | the same, with a `:has()` guard |
| *(only `strong kbd` was reset)* | reset for `code, kbd, mark, a, .tag, .math` |

#### Why the solution works

| Failure path | Neutralised by |
|---|---|
| `code` inherits `transparent` from `strong` | L1 explicit fill · L2 child reset · L3 gradient never applied |
| `code` inside a **bold link** | L2 and L3 — `a` is in both sets |
| `code` in embeds / popovers / Canvas / Kanban cards | L1 — `.markdown-rendered` covers them all |
| `!important` blocked recolouring | L5 |
| An unforeseen edge case | L4 — the user-facing off-switch |

Obsidianite's signature gradient bold is preserved for the common case of `**bold text**`
with no nested elements.

---

## Architecture

### Four-tier token system

```
Tier 1  --primidian-c-cyan-500        primitives · raw hsl() ramps, never used directly
   ↓
Tier 2  --primidian-accent            semantic   · what Style Settings writes to
   ↓
Tier 3  --primidian-h1-color          component  · per-component design tokens
   ↓
Tier 4  --text-accent             bridge     · Obsidian's own variables
   ↓
        .markdown-rendered h1 { color: var(--primidian-h1-color); }
```

**Tier 4 is the highest-leverage layer.** By assigning Obsidian's variables from Primidian's
tokens rather than overriding selectors, every native surface and every plugin that reads
`--interactive-accent`, `--background-primary` or `--checkbox-size` is styled correctly
without a single bespoke rule.

### The Primidian Directive

> Every themeable value is a custom property declared at `body`, `.theme-dark` or
> `.theme-light`, and consumed only via `var()` at the point of use.

Style Settings injects overrides at `body.css-settings-manager` (specificity `0,2,1`).
Any default declared above that specificity — or with `!important` — becomes permanently
uncustomisable. This one rule is why Primidian has zero functional `!important`.

### Rule 2 — no structural assumptions

> A component's rendering must depend only on the element that semantically **is** that
> component — never on an ancestor's tag, class or box model.

This is the generalised lesson from the Task List Kanban bug, and it is what makes the
checkbox a reusable component rather than a patch.

### Light and dark

Light mode is designed, not inverted. Notably, the accent **darkens** in light mode:
`#0fb6d6` on white gives roughly 2.3:1 contrast, well below WCAG AA, so light mode anchors
on a darker step of the same cyan ramp. Surfaces carry a faint violet tint to preserve the
family resemblance, and borders use higher alpha because a 12% tint that reads clearly on
near-black disappears on near-white.

---

## Development

### Layout

```
theme.css              ← BUILD OUTPUT — do not hand-edit
manifest.json
build.mjs              ← concatenate + validate, zero dependencies
src/
  00-banner.css        licence and attribution
  01-settings.css      Style Settings YAML
  tokens/    10-15     primitives → semantic → component → Obsidian bridge
  base/      20-21     reset, typography
  ui/        30-35     workspace, chrome, controls
  editor/    40-42     shared, Live Preview, Reading Mode
  components/50-66     headings … misc
  variants/  70-72     component variants
  systems/   80-82     gradients, motion, glow
  platform/  90        mobile
  compat/    95        Task List Kanban
docs/       00-15      the full R&D record
```

Files are concatenated in numeric order, so tokens always precede consumers, variants
always follow components, and compatibility layers always come last.

### Building

```bash
npm run build     # build + validate
npm run watch     # rebuild on change
npm run check     # validate only
```

The build fails on: `transition: all`, `@import`, a Tier-1 primitive referenced outside
`src/tokens/`, `:has()` on `.cm-line`, a setting with no default, a setting id with no
matching CSS variable, and a `class-select` option with no matching `body.<value>` rule.

### Adding a component variant

1. Ensure the value is already a token in `tokens/14-components.css`.
2. Add `body.primidian-<component>-<name> { --token: value; }` in `src/variants/`.
   **Reassign tokens only** — never write a non-custom property.
3. Add the option to that component's `class-select` in `src/01-settings.css`.
4. `npm run build` — the cross-check verifies the wiring.
5. Add a row to the Components table above.

### Adding plugin compatibility

Create `src/compat/9N-compat-<plugin>.css`. First ask whether the problem is a plugin
quirk or a structural assumption in a Primidian component — **if the latter, fix the
component.** A compat file that grows large is a signal the core is wrong.

### R&D record

`docs/` contains the full engineering record: teardowns of both source themes, the
conflict register, both bug investigations with evidence, the architecture rationale, and
the test checklist. This README summarises it; it does not replace it.

---

## Future Roadmap

Enabled by the current architecture, deliberately not built yet:

- **Colour profiles** — AMOLED, Midnight and others. A profile is ~8 re-anchored Tier-1
  primitives; the discipline that no Tier-3 rule touches Tier 1 directly is already enforced.
- **More component variants** — callouts, code blocks, tags, tables, links, blockquotes.
  Keys and defaults are already locked in.
- **Advanced code blocks** — language header labels, enhanced copy buttons, collapsible
  blocks, and Reading Mode line numbers (which would need a companion snippet — see below).
- **More plugin compatibility layers** — the `compat/` directory is isolated and documented.
- **Localised Style Settings** — the plugin supports `title.<lang>` keys.

---

## Known Limitations

- **Line numbers are Live Preview only.** Reading Mode renders a code block as a single text
  node with no per-line elements, so CSS counters cannot address individual lines. This is a
  structural property of the DOM. Documented rather than hacked; see the
  [Code block line numbers](#code-block-line-numbers) section.
- **Colour swatch checkerboard on untouched settings.** An upstream bug in Style Settings
  v1.0.9, diagnosed in `docs/15` §6. Saving any value fixes that control. Not masked with CSS,
  because that would also hide genuine transparency where it is intentional.
- **Divider glyph inside callouts.** The decorative `§` punches a hole in the rule using
  the page background colour. Inside a callout or blockquote that hole will be the wrong
  colour. Use the *Gradient* or *Minimal* divider style there. A two-segment approach is
  planned.
- **Divider end caps and the animated shimmer are mutually exclusive.** Both use the `hr`
  `::before` layer. By design — the styles that use them never overlap.
- **Glow reduces effective contrast at high intensity.** Default intensity is 1, glow is off
  by default, and it is suppressed entirely in Windows High Contrast mode.
- **Gradient text and contrast.** Gradient-clipped text varies in contrast along its
  length. Both default stops sit in the same lightness band, and *Disable All Gradients*
  is available if you need guaranteed contrast.
- **Fonts are not bundled.** Intentional — it keeps the theme small and avoids font
  licensing constraints. Install your preferred fonts and set them under Typography.

---

## Credits / Attribution / Licences

### Obsidianite — visual foundation

**[Obsidianite](https://github.com/bennyxguo/Obsidian-Obsidianite)** by
**Benny Guo** ([@bennyxguo](https://github.com/bennyxguo)) · **MIT License**

Primidian's visual identity is derived from Obsidianite. The palette, gradient
headings, `§` divider, sweeping links, gradient bold and layered blockquotes all originate
there. Portions of this theme's visual design and CSS are adapted from Obsidianite under
the terms of the MIT License, and its copyright notice is retained in `LICENSE`.

### Primary — design inspiration

**[Primary](https://github.com/primary-theme/obsidian)** by
**Cecilia May** ([@ceciliamay](https://github.com/ceciliamay)) · **GNU GPL v3**

☕ **[Support Cecilia's work on Ko-fi](https://ko-fi.com/ceciliamay)**

Primidian's token architecture, animation system and customisation approach were
**inspired by** Primary, which is the quality benchmark for interaction design in the
Obsidian theme ecosystem.

> **No code from Primary is included in Primidian.**
>
> Primary is licensed under GPLv3, which would require any work incorporating its code to
> also be GPLv3. Primidian is MIT. Every Primary-inspired feature — the named
> duration and easing scale, the transition-first motion philosophy, the overshoot entry
> animation, the three-tier token architecture, the native-input checkbox approach, and the
> tab interaction vocabulary — was **independently reimplemented** from an understanding of
> the underlying technique. Primary is not bundled, redistributed or modified by this project.
>
> **The clean-room method.** Primary's tab CSS was read to answer one question: *what
> behaviours create the feel?* The answer — hover lifts, press sinks, the active tab reads as
> a raised card via layered inset shadows, active emphasis is colour-coordinated, the close
> button fills on hover — was written down as prose in `docs/15` §4. The implementation was
> then authored against that description using Primidian's own tokens, values, selectors and
> keyframes. Where Primary's approach conflicted with Primidian's identity or standards it was
> deliberately not followed: Primidian uses a single accent rather than Primary's three-colour
> `:nth-child` rotation, and writes explicit `property duration easing` transition triplets
> rather than Primary's malformed comma lists. Primidian also adds an indicator wipe that Primary
> does not have. Interaction patterns of this kind are ideas, not protected expression.
>
> Cecilia asks that anyone inspired by Primary link to her Ko-fi and repository. Copyright
> does not attach to ideas or methods, so this is not a licence obligation — but it is a
> reasonable request from an author whose work materially raised the bar for this
> ecosystem, and it is honoured here gladly.

### Style Settings

**[Style Settings](https://github.com/mgmeyers/obsidian-style-settings)** by
**mgmeyers** · **MIT License**

No plugin code is included. Primidian only authors a configuration the plugin reads.

### Task List Kanban

**[Task List Kanban](https://github.com/erikars/task-list-kanban)** by
**Chris Kerr & Erika Rice Scherpelz**

Referenced for compatibility analysis only. No code is included. The plugin's DOM is
documented in `docs/04` to explain the checkbox fix.

### Removed third-party code

Obsidianite vendored the **Dracula theme for Prism.js** (© Gustavo Costa, Jon Leopard,
MIT). Primidian **does not** include it. Its palette clashed with Obsidianite's own
identity, it hard-coded a background colour that caused Reading Mode and Live Preview to
disagree, and it added a third-party copyright holder for no benefit. Syntax colours are
re-derived from the Primidian palette and now drive both highlighters from a single source.

### Fonts

None are bundled. Recommended: **Rubik** and **Inter** (SIL OFL), **JetBrains Mono**
(Apache 2.0), **Cascadia Code** (SIL OFL). Install them yourself and set them under
Typography.

### Reference files

`Primary.css` and `Obsidianite.css` are retained in the repository root as **immutable
reference material** for the R&D record. They are excluded from the build and are not part
of the distributed theme.

---

## Licence

**MIT** — see [`LICENSE`](LICENSE).
