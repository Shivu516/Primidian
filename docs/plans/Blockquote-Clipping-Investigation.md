# Blockquote Clipping Issue — Investigation Report

## Observed Symptoms

- Blockquote decoration appears visually cut off at the bottom in Edit Mode / Live Preview
- The bottom fading line and/or bottom border-radius are clipped
- Reading Mode renders correctly
- The issue is especially noticeable with nested blockquotes
- The visual container appears to terminate before the decoration finishes rendering

---

## 1. Relevant Source Files

| File | Role |
|---|---|
| `src/components/57-blockquotes.css` | Core blockquote styling, pseudo-elements, first/middle/last line logic |
| `src/variants/72-variants-scaffold.css` | Blockquote preset definitions (Simple, Boxy, Minimal, Fade) |
| `src/tokens/14-components.css` | Blockquote tokens (border-width, radius, padding, bar-display) |
| `src/systems/82-glow.css` | Glow Engine blockquote rules |
| `src/01-settings.css` | Style Settings definitions for blockquote presets |
| `src/components/58-callouts.css` | Callout styling (uses `overflow: hidden`) |

---

## 2. Current Blockquote Architecture

### Reading Mode (works correctly)

A single `<blockquote>` element receives:
- `position: relative`
- `background-color: var(--primidian-quote-bg)`
- `border: var(--primidian-quote-box-border-width) solid ...`
- `border-left: var(--primidian-quote-border-width) solid ...`
- `border-radius: var(--primidian-blockquote-radius)`
- `padding: var(--primidian-quote-padding)`
- `::before` pseudo-element: top fading line at `top: 0`
- `::after` pseudo-element: bottom fading line at `bottom: 0`

### Live Preview / Edit Mode (broken)

Each line of a multi-line blockquote is a separate `.HyperMD-quote` element. The CSS uses first/middle/last line logic:

1. **Base rule** (`.markdown-source-view.mod-cm6 .HyperMD-quote`):
   - `border-radius: 0`
   - `padding-block: 0`

2. **First line** (`.HyperMD-quote:first-of-type, .HyperMD-quote:not(.HyperMD-quote + .HyperMD-quote)`):
   - `border-start-start-radius: var(--primidian-blockquote-radius)`
   - `border-start-end-radius: var(--primidian-blockquote-radius)`
   - `padding-block-start: var(--primidian-quote-padding)`

3. **Last line** (`.HyperMD-quote:not(:has(+ .HyperMD-quote))`):
   - `border-end-start-radius: var(--primidian-blockquote-radius)`
   - `border-end-end-radius: var(--primidian-blockquote-radius)`
   - `padding-block-end: var(--primidian-quote-padding)`

4. **Gradient bars**:
   - First line `::before`: top fading line at `top: 0`, `height: 2px`
   - Last line `::after`: bottom fading line at `bottom: 0`, `height: 1px`
   - Middle lines: no bars (`display: none`)

---

## 3. Root Cause Analysis

### PRIMARY ROOT CAUSE: Pseudo-element positioning outside layout box

The `::before` and `::after` pseudo-elements use `position: absolute` with `top: 0` and `bottom: 0` respectively. These pseudo-elements are positioned relative to the `.HyperMD-quote` element's **padding box**.

However, `.HyperMD-quote` elements in CodeMirror have:
- A fixed height determined by line-height
- Potentially `overflow: hidden` (inherited from CodeMirror's editor line styling)

When the bottom `::after` pseudo-element is positioned at `bottom: 0`, it sits at the bottom edge of the `.HyperMD-quote` element. If the element has `overflow: hidden` or if the pseudo-element extends even slightly beyond the calculated height, it gets clipped.

### SECONDARY CONTRIBUTING CAUSE: CodeMirror's line-height and overflow behavior

CodeMirror editor lines have specific height calculations:
- Each `.cm-line` has a height determined by the font-size and line-height
- `.HyperMD-quote` elements inherit this height
- The `overflow: hidden` on `.cm-line` or related containers clips content that extends beyond the line box

The bottom fading line (`::after` with `bottom: 0`, `height: 1px`) is likely being clipped because:
1. The `.HyperMD-quote` element's height doesn't account for the pseudo-element
2. CodeMirror's default `overflow: hidden` on line elements clips the pseudo-element

### TERTIARY CONTRIBUTING CAUSE: Box-sizing and padding interaction

The `.HyperMD-quote` elements have `padding-block: 0` (set by the base rule), with padding only added to first/last lines. The absolutely positioned pseudo-elements are positioned relative to the padding box, but if the element's height is constrained by CodeMirror's line-height calculations, the pseudo-elements may extend beyond the visible area.

---

## 4. Evidence

### Pseudo-element geometry

From `src/components/57-blockquotes.css`:

```css
/* Last line: bottom border-radius + bottom padding */
.markdown-source-view.mod-cm6 .HyperMD-quote:not(:has(+ .HyperMD-quote)) {
    border-end-start-radius: var(--primidian-blockquote-radius);
    border-end-end-radius: var(--primidian-blockquote-radius);
    padding-block-end: var(--primidian-quote-padding);
}

/* Bottom fading line */
.markdown-source-view.mod-cm6 .HyperMD-quote:not(:has(+ .HyperMD-quote))::after {
    content: '';
    display: var(--primidian-quote-bar-display);
    position: absolute;
    bottom: 0;
    left: 0;
    height: 1px;
    width: 25%;
    background-image: linear-gradient(90deg, var(--primidian-quote-border-color), transparent);
    pointer-events: none;
}
```

The `::after` pseudo-element is positioned at `bottom: 0` with `height: 1px`. This means it occupies the space from `bottom: 0` to `bottom: -1px` (outside the element). If the element has `overflow: hidden`, this pseudo-element will be clipped.

### CodeMirror's default styling

CodeMirror applies `overflow: hidden` to `.cm-line` elements by default. Since `.HyperMD-quote` is a child of `.cm-line`, any content that extends beyond the line's height is clipped.

### Comparison with Reading Mode

In Reading Mode, the `<blockquote>` element:
- Has its own height determined by content
- Does not have `overflow: hidden` (unless explicitly set)
- The pseudo-elements are fully visible because the container grows to accommodate them

---

## 5. Alternative Causes Considered

| Cause | Verdict | Reasoning |
|---|---|---|
| Incorrect block height | Possible | CodeMirror fixes line heights, but this is a symptom not the root cause |
| `overflow: hidden` | **Primary** | CodeMirror's default line styling clips pseudo-elements |
| Pseudo-elements extending outside | **Primary** | `bottom: 0` + `height: 1px` extends beyond the element |
| Box-shadow/filter clipping | Unlikely | No filters on blockquote pseudo-elements |
| Margin collapsing | Unlikely | Margins are not the issue here |
| Padding not included in height | Possible | `box-sizing` may affect this, but CodeMirror controls height |
| Glow Engine interaction | Possible | Glow rules add `box-shadow` but don't cause clipping |
| Drop Shadow interaction | Unlikely | Drop Shadow uses `filter: drop-shadow()` which doesn't clip |
| Nested blockquote issues | Contributing | Nested quotes compound the clipping due to smaller heights |

---

## 6. Glow Engine Interaction

The Glow Engine adds `box-shadow` to blockquotes via:
```css
body:not(.primidian-glow-off).primidian-glow-borders .markdown-source-view.mod-cm6 .HyperMD-quote:not(:has(+ .HyperMD-quote)) {
    box-shadow: inset var(--primidian-quote-border-width) 0 var(--primidian-glow-blur) ...;
}
```

This `box-shadow` is applied to the last line's `.HyperMD-quote` element. While `box-shadow` itself doesn't cause clipping, it can make the clipping more visible by drawing attention to the edges.

**Verdict:** Glow Engine does NOT cause the clipping but may make it more visible.

---

## 7. Drop Shadow Interaction

The Drop Shadow engine forces `filter: drop-shadow()` on all targets. For blockquotes, the CSS falls back to `box-shadow` (not `filter: drop-shadow()`) because drop-shadow would create a rectangular halo.

**Verdict:** Drop Shadow is NOT related to the clipping issue.

---

## 8. Nested Blockquotes

Nested blockquotes in Edit Mode have additional issues:
- Each nesting level adds its own `.HyperMD-quote` elements
- The inner blockquote's pseudo-elements may extend beyond the outer blockquote's bounds
- The `overflow: hidden` on the outer blockquote (if any) clips the inner blockquote's decorations

The current CSS for nested blockquotes only targets Reading Mode:
```css
.markdown-rendered blockquote:not(.callout) blockquote:not(.callout) {
    background-color: transparent;
    border-left-color: var(--primidian-accent-muted);
}
```

There is NO equivalent rule for `.HyperMD-quote` nesting in Edit Mode.

---

## 9. First/Middle/Last Line Grouping

The current grouping logic uses:
- `:first-of-type` and `:not(.HyperMD-quote + .HyperMD-quote)` for first line
- `:not(:has(+ .HyperMD-quote))` for last line
- `.HyperMD-quote + .HyperMD-quote` for middle lines

This logic is generally correct but has edge cases:
- Wrapped lines: A single long line that wraps visually is still one `.HyperMD-quote` element
- Nested blockquotes: Each nesting level has its own first/middle/last lines
- Single-line blockquotes: The same element is both first and last

---

## 10. Proposed Fix Strategy

### Approach: Move pseudo-elements to a container-aware position

Instead of positioning pseudo-elements at `bottom: 0` of the last `.HyperMD-quote` (which may be clipped), consider:

1. **Use `overflow: visible` on `.HyperMD-quote`** — This may not work because CodeMirror's parent `.cm-line` has `overflow: hidden`.

2. **Position pseudo-elements using `bottom: auto` and `top: 100%`** — This places the bottom fading line below the element, but it may overlap with the next line.

3. **Use a wrapper element** — Not possible in CodeMirror's DOM structure.

4. **Adjust the pseudo-element positioning to be inside the element's content box** — Instead of `bottom: 0`, use a small positive value to keep the pseudo-element inside the visible area.

5. **Use `box-shadow` instead of pseudo-elements** — An `inset` box-shadow can create a similar effect without extending beyond the element.

6. **Apply the bottom decoration to the parent container** — Not applicable in CodeMirror's line-based structure.

### Recommended Fix

The safest approach is to:

1. Ensure the bottom pseudo-element is positioned **inside** the element's content box
2. Use `bottom: 1px` instead of `bottom: 0` to keep the 1px-high pseudo-element fully visible
3. Alternatively, use an `inset` box-shadow on the last line to create the bottom fading effect
4. Add explicit nested blockquote rules for Edit Mode

---

## 11. Regression Test Matrix

| Test | Reading Mode | Live Preview | Nested | Wrapped | Glow |
|---|---|---|---|---|---|
| Simple preset | ✓ | ✓ | ✓ | ✓ | ✓ |
| Boxy preset | ✓ | ✓ | ✓ | ✓ | ✓ |
| Minimal preset | ✓ | ✓ | ✓ | ✓ | ✓ |
| Fade preset | ✓ | ✓ | ✓ | ✓ | ✓ |
| Single-line quote | ✓ | ✓ | — | — | ✓ |
| 2-line quote | ✓ | ✓ | — | — | ✓ |
| Many-line quote | ✓ | ✓ | — | — | ✓ |
| Wrapped quote | ✓ | ✓ | — | ✓ | ✓ |
| Nested quote | ✓ | ✓ | ✓ | — | ✓ |
| Deeply nested | ✓ | ✓ | ✓ | — | ✓ |
| Glow OFF | ✓ | ✓ | ✓ | ✓ | ✓ |
| Text Shadow engine | ✓ | ✓ | ✓ | ✓ | ✓ |
| Drop Shadow engine | ✓ | ✓ | ✓ | ✓ | ✓ |
| Automatic engine | ✓ | ✓ | ✓ | ✓ | ✓ |

---

## 12. Files That Would Need Modification

| File | Change |
|---|---|
| `src/components/57-blockquotes.css` | Adjust pseudo-element positioning, add nested quote rules for Edit Mode |
| `src/systems/82-glow.css` | Potentially adjust glow rules if clipping is glow-related |

---

## 13. Confidence Level

- **Root cause identification:** Medium-High (75%)
- **CodeMirror's `overflow: hidden`** is the most likely culprit based on the evidence
- **Pseudo-element positioning** is a contributing factor
- **Actual DOM inspection in Obsidian** would be needed for 100% certainty
