# Blockquote Rendering Forensics

> **Status:** Research complete — awaiting implementation
> **Date:** 2026-08-11
> **Scope:** Primidian blockquote rendering discrepancy between Reading Mode and Live Preview

---

## 1. Executive Summary

Primidian's blockquote rendering in Live Preview does not faithfully reproduce the Reading Mode appearance. The root cause is architectural: **Reading Mode uses a single block-level `<blockquote>` element, while Live Preview applies styling to individual inline `.HyperMD-quote` spans within separate `.cm-line` containers.** This fundamental DOM difference means the current "per-line inline background" approach cannot produce a continuous visual container.

The investigation confirms that the visual "cutoff" artifact is caused by each `.HyperMD-quote` being an inline element within its own `.cm-line`, where the background and pseudo-elements are scoped to individual line boxes rather than the logical blockquote as a whole.

---

## 2. Current Primidian Implementation

### 2.1 Source Files

| File | Purpose |
|------|---------|
| `src/components/57-blockquotes.css` | Main blockquote styles |
| `src/tokens/14-components.css` | Blockquote design tokens |
| `src/variants/72-variants-scaffold.css` | Preset variant definitions |
| `src/systems/82-glow.css` | Glow engine blockquote integration |
| `src/01-settings.css` | Style Settings YAML definitions |

### 2.2 Reading Mode Selectors

```css
.markdown-rendered blockquote:not(.callout)           /* Main container */
.markdown-rendered blockquote:not(.callout)::before   /* Top gradient bar */
.markdown-rendered blockquote:not(.callout)::after    /* Bottom gradient bar */
.markdown-rendered blockquote:not(.callout) > p       /* Paragraph spacing */
.markdown-rendered blockquote:not(.callout) > p:first-of-type::before  /* Glyph */
.markdown-rendered blockquote:not(.callout) blockquote:not(.callout)   /* Nested */
```

### 2.3 Live Preview Selectors

```css
.markdown-source-view.mod-cm6 .HyperMD-quote          /* All quote lines */
.markdown-source-view.mod-cm6 .HyperMD-quote::before  /* Top gradient bar (each line) */
.markdown-source-view.mod-cm6 .HyperMD-quote::after   /* Bottom gradient bar (each line) */
.markdown-source-view.mod-cm6 .HyperMD-quote-2        /* Nested level 2 */
.markdown-source-view.mod-cm6 .HyperMD-quote-3        /* Nested level 3 */
.markdown-source-view.mod-cm6 .HyperMD-quote-4        /* Nested level 4 */
```

### 2.4 Token Architecture

```
Tier 1 (primitives)     --primidian-c-*        Raw HSL ramps
Tier 2 (semantic)       --primidian-accent     Accent colors
Tier 3 (component)      --primidian-quote-*    Blockquote-specific
Tier 4 (bridge)         --text-accent          Obsidian's own
```

Blockquote-specific tokens in `14-components.css`:

```css
--primidian-quote-border-width: 3px
--primidian-quote-left-width: 3px
--primidian-quote-radius: var(--primidian-radius-s)
--primidian-quote-padding: var(--primidian-space-3) var(--primidian-space-5)
--primidian-quote-margin: 1.5em
--primidian-quote-style: normal
--primidian-quote-box-border-width: 0px
--primidian-blockquote-left-width: 3px
--primidian-blockquote-border-width: 1px
--primidian-blockquote-radius: 5px
--primidian-quote-bar-display: block
--primidian-quote-glyph-display: none
--primidian-quote-glyph: '"'
```

Color tokens (per theme scope):

```css
--primidian-quote-color: var(--primidian-text-muted)
--primidian-quote-border-color: var(--primidian-accent)
--primidian-quote-bg: color-mix(in srgb, var(--primidian-accent) 4%, transparent)
--primidian-quote-glyph-color: var(--primidian-accent)
```

### 2.5 Current CSS Rules (Reading Mode)

```css
.markdown-rendered blockquote:not(.callout) {
    position: relative;
    color: var(--primidian-quote-color);
    background-color: var(--primidian-quote-bg);
    font-style: var(--primidian-quote-style);
    border: var(--primidian-quote-box-border-width) solid var(--primidian-quote-border-color);
    border-left: var(--primidian-quote-border-width) solid var(--primidian-quote-border-color);
    margin-inline-start: 0;
    margin-block: var(--primidian-quote-margin);
    border-radius: var(--primidian-blockquote-radius);
    padding: var(--primidian-quote-padding);
}
```

### 2.6 Current CSS Rules (Live Preview)

```css
.markdown-source-view.mod-cm6 .HyperMD-quote {
    position: relative;
    color: var(--primidian-quote-color);
    background-color: var(--primidian-quote-bg);
    font-style: var(--primidian-quote-style);
    border: var(--primidian-quote-box-border-width) solid var(--primidian-quote-border-color);
    border-left: var(--primidian-quote-border-width) solid var(--primidian-quote-border-color);
    margin-inline-start: 0;
    background-color: var(--primidian-quote-bg);
    border-left: var(--primidian-quote-border-width) solid var(--primidian-quote-border-color);
    padding: 0.2em 0.5em;
    box-decoration-break: clone;
    -webkit-box-decoration-break: clone;
    border-radius: 0;
}
```

### 2.7 Pseudo-Element Strategy

**Reading Mode:**
- `::before` — top gradient bar (55%, 2px height, accent→transparent)
- `::after` — bottom gradient bar (25%, 2px height, accent→transparent)

**Live Preview:**
- `::before` — top gradient bar on EVERY line (55%, 2px)
- `::after` — bottom gradient bar on EVERY line (25%, 1px)

This is the primary visual discrepancy: Reading Mode has bars only at the top/bottom of the entire blockquote, while Live Preview has them on every line.

---

## 3. DOM Structure Analysis

### 3.1 Reading Mode DOM

```html
<div class="markdown-rendered">
    <blockquote>
        <p>Quote text content</p>
    </blockquote>
</div>
```

**Key characteristics:**
- Single block-level `<blockquote>` element
- Contains one or more `<p>` children
- `display: block` by default
- Background, border, radius applied to the block container
- Pseudo-elements positioned relative to the block container
- Nested blockquotes are child `<blockquote>` elements

### 3.2 Live Preview DOM (CodeMirror 6)

```html
<div class="markdown-source-view mod-cm6">
    <div class="cm-editor">
        <div class="cm-scroller">
            <div class="cm-content">
                <div class="cm-line">
                    <span class="cm-formatting cm-formatting-quote">></span>
                    <span class="HyperMD-quote HyperMD-quote-1">Quote line 1</span>
                </div>
                <div class="cm-line">
                    <span class="cm-formatting cm-formatting-quote">></span>
                    <span class="HyperMD-quote HyperMD-quote-1">Quote line 2</span>
                </div>
                <div class="cm-line">
                    <span class="cm-formatting cm-formatting-quote">></span>
                    <span class="HyperMD-quote HyperMD-quote-1">Quote line 3</span>
                </div>
            </div>
        </div>
    </div>
</div>
```

**Key characteristics:**
- Each line is a separate `.cm-line` block
- `.HyperMD-quote` is an **inline** span within `.cm-line`
- `.cm-formatting-quote` contains the `>` marker
- Quote content is inline text within the span
- No single container wraps all lines of a multi-line quote
- Nested quotes use `.HyperMD-quote-2`, `.HyperMD-quote-3`, etc.

### 3.3 Critical DOM Differences

| Property | Reading Mode | Live Preview |
|----------|-------------|--------------|
| Container | `<blockquote>` (block) | `.HyperMD-quote` (inline span) |
| Lines | Multiple `<p>` in one block | Separate `.cm-line` per line |
| Background | Applied to block container | Applied to inline span |
| Border radius | Applied to block container | Applied to inline span (per line) |
| Pseudo-elements | `::before`/`::after` on block | `::before`/`::after` on inline span |
| Positioning context | Block container | Inline span (problematic) |

---

## 4. Hypothesis Testing

### Hypothesis A — Actual overflow clipping
**Status: REJECTED**

No `overflow: hidden` is applied to blockquote elements. The clipping is not caused by overflow but by the inline nature of `.HyperMD-quote`.

### Hypothesis B — Wrong element geometry
**Status: CONFIRMED (primary cause)**

The `.HyperMD-quote` element is an inline span. Its geometry is determined by its text content, not by the logical blockquote boundaries. Each line's background is scoped to that line's text box, not the entire blockquote.

### Hypothesis C — Inline formatting behavior
**Status: CONFIRMED (contributing factor)**

`.HyperMD-quote` is `display: inline` by default. Inline elements:
- Do not establish a block formatting context
- Have backgrounds that break at line boundaries
- Cannot reliably contain block-level pseudo-elements
- Position pseudo-elements relative to the inline box, not a block container

### Hypothesis D — CodeMirror line-box behavior
**Status: CONFIRMED (structural cause)**

CodeMirror renders each line as a separate `.cm-line` block. Quote lines are not grouped into a single container. This is fundamental to CodeMirror's architecture and cannot be changed via CSS.

### Hypothesis E — Pseudo-element positioning
**Status: CONFIRMED (symptom)**

Pseudo-elements on inline `.HyperMD-quote` are positioned relative to the inline box, not a block container. This causes:
- `::before` to appear at the top of EVERY line (not just the first)
- `::after` to appear at the bottom of EVERY line (not just the last)
- Gradient bars to repeat on each line instead of appearing once

### Hypothesis F — Padding/line-height mismatch
**Status: PARTIALLY CONFIRMED**

The `padding: 0.2em 0.5em` on `.HyperMD-quote` is applied to an inline element. While this does create visual space, it does not create a continuous container. The padding is per-line, not per-blockquote.

### Hypothesis G — Nested quote structure
**Status: CONFIRMED (compounding factor)**

Nested quotes (`.HyperMD-quote-2`, `.HyperMD-quote-3`) are separate inline spans on separate lines. Each has its own background, creating visual discontinuity between nesting levels.

### Hypothesis H — Viewport / virtualization
**Status: REJECTED**

CodeMirror's viewport rendering does not cause the visual cutoff. The issue is present even for quotes fully within the viewport.

### Hypothesis I — Border/background painting order
**Status: REJECTED**

No element is painting over the blockquote decoration. The issue is the absence of a continuous container.

### Hypothesis J — Primidian's current selector architecture
**Status: CONFIRMED (root cause)**

The current architecture applies Reading Mode styling independently to each Live Preview line. This creates a "per-line" visual effect rather than a continuous blockquote container.

---

## 5. Reference Theme Analysis

### 5.1 Default Obsidian Theme

**Reading Mode:**
- Uses `blockquote` element directly
- Simple left border, no background
- No pseudo-elements

**Live Preview:**
- Styles `.HyperMD-quote` with `display: inline`
- Applies `background-color` to each line
- Uses `box-decoration-break: clone` for visual continuity
- No pseudo-elements for top/bottom bars

**Key insight:** Default theme accepts the per-line limitation and does not attempt to create a continuous container.

### 5.2 Obsidianite Theme

**Reading Mode:**
```css
.markdown-preview-view blockquote {
    position: relative;
    padding: 1rem 2rem 1rem 3rem;
    border-left: 3px rgba(14, 210, 247, 0.5) solid;
    background: linear-gradient(135deg, rgba(32, 28, 41, 0.45), #100e17);
}
```

**Live Preview:**
```css
.markdown-source-view.mod-cm6.is-live-preview .HyperMD-quote {
    /* Same styles as Reading Mode */
    padding: 1rem 2rem 1rem 3rem;
    border-left: 3px rgba(14, 210, 247, 0.5) solid;
    background: linear-gradient(135deg, rgba(32, 28, 41, 0.45), #100e17);
}

/* Hide top bar on consecutive quote lines */
.HyperMD-quote + .HyperMD-quote::before {
    display: none;
}
```

**Key insight:** Obsidianite uses the sibling selector `.HyperMD-quote + .HyperMD-quote` to hide the top bar on consecutive lines. This is a partial solution that works because:
1. Adjacent `.HyperMD-quote` spans are siblings within the same `.cm-line` (when a line wraps)
2. The selector hides the top bar on all but the first line

**Limitation:** This only works for the top bar. The bottom bar still appears on every line.

### 5.3 Primary Theme

**Reading Mode:**
- Uses `blockquote` element
- Customizable border thickness, color, background
- No decorative pseudo-elements

**Live Preview:**
- Styles `.HyperMD-quote` per-line
- No attempt at continuous container
- Accepts the per-line visual treatment

**Key insight:** Primary theme does not attempt to replicate Reading Mode's block container in Live Preview. It accepts the per-line treatment.

---

## 6. The Four Primidian Presets

### 6.1 Preset Definitions

| Preset | `quote-bar-display` | `quote-border-width` | `quote-box-border-width` |
|--------|---------------------|----------------------|-------------------------|
| Simple | `none` | `0px` | `0px` |
| Boxy | `none` | `3px` (left-width) | `1px` (border-width) |
| Minimal | `none` | `3px` (left-width) | `0px` |
| Fade | `block` | `3px` (left-width) | `0px` |

### 6.2 Visual Behavior Matrix

| Preset | Background | Left Accent | Top Bar | Bottom Bar | Box Border |
|--------|-----------|-------------|---------|------------|------------|
| Simple | Yes | No | No | No | No |
| Boxy | Yes | Yes (3px) | No | No | Yes (1px) |
| Minimal | Yes | Yes (3px) | No | No | No |
| Fade | Yes | Yes (3px) | Yes (gradient) | Yes (gradient) | No |

### 6.3 Preset Impact on Live Preview Architecture

The presets only affect decorative elements (bars, borders). The underlying structural problem (per-line vs. container) is the same for all four. A single structural solution can support all four presets.

---

## 7. Glow Engine Interaction

### 7.1 Current Glow Selectors for Blockquotes

```css
/* Automatic engine */
body:not(.primidian-glow-off).primidian-glow-borders .markdown-rendered blockquote:not(.callout),
body:not(.primidian-glow-off).primidian-glow-borders .markdown-source-view.mod-cm6 .HyperMD-quote:not(:has(+ .HyperMD-quote)) {
    box-shadow: inset var(--primidian-quote-border-width) 0 var(--primidian-glow-blur)
        calc(-1 * var(--primidian-quote-border-width))
        color-mix(in srgb, var(--primidian-quote-border-color) var(--primidian-glow-alpha), transparent);
}
```

### 7.2 Glow Engine Observations

1. **`:has()` usage:** The glow selector uses `:has(+ .HyperMD-quote)` to detect the last line of a quote. This is one of only three `:has()` usages in Primidian.

2. **`:has()` on `.HyperMD-quote`:** This is NOT on `.cm-line`, so it does not violate the PR-6/I-10 ban. However, it is still a performance concern if quotes are long.

3. **Glow method:** Uses `box-shadow` (rectangular), which is appropriate for blockquote containers.

4. **Compatibility requirement:** Any new architecture must preserve the glow's ability to target the "last line" of a quote for the inner shadow effect.

---

## 8. Why Previous Fixes Failed

### 8.1 `bottom: 0` → `top: calc(100% - 1px)` Change

**Hypothesis:** The bottom pseudo-element was being clipped by the inline element's box.

**Why it failed:**
- The pseudo-element was still positioned relative to an inline span
- `top: calc(100% - 1px)` on an inline element positions relative to the line box, not the blockquote
- The fundamental issue is not positioning but the lack of a block container
- Moving the pseudo-element's position does not change the geometry of its containing block

### 8.2 `.HyperMD-quote { display: block; }` Experiment

**Hypothesis:** Making `.HyperMD-quote` a block element would create a block-level container.

**Why it failed:**
- `.HyperMD-quote` is a span within `.cm-line`; making it block causes it to break out of the inline flow
- This disrupts CodeMirror's line layout, causing:
  - Cursor positioning errors
  - Selection issues
  - Line height miscalculations
  - Wrapping problems
- CodeMirror expects `.HyperMD-quote` to be inline; changing this breaks editor functionality
- The artifacts observed were CodeMirror's layout engine fighting the display change

---

## 9. Confirmed Root Causes

### Primary Cause
**CodeMirror 6's line-based architecture does not provide a single container for multi-line blockquotes.** Each line is a separate `.cm-line` block, and `.HyperMD-quote` is an inline span within it.

### Contributing Cause
**The current CSS applies Reading Mode's block-container styling to inline elements.** Backgrounds, borders, and pseudo-elements on inline spans produce per-line visual effects, not continuous containers.

### Structural Limitation
**Pure CSS cannot create a continuous visual container across multiple `.cm-line` elements.** CSS has no selector that can group sibling `.cm-line` elements into a single visual container.

---

## 10. Unresolved Questions

1. **Can CodeMirror decorations solve this?** Line decorations or mark decorations might allow painting a background across multiple lines, but this requires JavaScript (a plugin or theme script).

2. **Is there a CSS-only approximation?** The "per-line with sibling selectors" approach (like Obsidianite) can approximate the top bar but not the bottom bar or continuous border.

3. **What is the performance impact of `:has()` on `.HyperMD-quote`?** The glow engine's `:has(+ .HyperMD-quote)` selector may cause performance issues with long quotes.

4. **How do nested quotes interact with any proposed solution?** Nested quotes add complexity because they require per-level styling within the line-based architecture.

---

## 11. Architecture Decision

The investigation concludes that:

1. **Pure CSS cannot achieve perfect parity** between Reading Mode and Live Preview for multi-line blockquotes due to CodeMirror's line-based DOM.

2. **The best CSS-only approach** is to:
   - Accept per-line backgrounds (with `box-decoration-break: clone`)
   - Use sibling selectors to hide top bars on non-first lines
   - Use the last-line detection for bottom bars (via `:has()` or structural selectors)
   - Apply left border to all lines (continuous visual effect)
   - Apply border-radius to first and last lines only

3. **A CodeMirror decoration-based approach** could achieve better parity but requires JavaScript and increases complexity.

4. **The recommended approach** is a hybrid: CSS-only for the visual treatment, accepting minor differences between modes, while ensuring the Reading Mode appearance is faithfully preserved.

---

## 12. Next Steps

See the companion documents:
- `Blockquote-Rendering-Architecture.md` — Recommended architecture
- `Blockquote-Implementation-Roadmap.md` — Phased implementation plan
- `Blockquote-Visual-Regression-Matrix.md` — Comprehensive test matrix
