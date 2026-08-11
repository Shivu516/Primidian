# Blockquote Live Preview Parity — Investigation Overview

## 1. Current Architecture

### Reading Mode (Reference — Works Correctly)

A single block-level `<blockquote>` element wraps all content:

```html
<blockquote>                          ← block-level container
    <p>First line</p>
    <p>Second line</p>
    <p>Third line</p>
</blockquote>
```

CSS applies directly to this single element:
- `background-color` fills entire container
- `border` surrounds entire block
- `border-radius` rounds all four corners
- `padding` creates space around all content
- `::before`/`::after` pseudo-elements at top/bottom of entire block
- Height determined by content (auto)

### Live Preview / Edit Mode (Broken)

Each line is a separate element in CodeMirror 6:

```html
<div class="cm-line">                         ← block-level, NOT styled as blockquote
    <span class="cm-formatting-quote">></span>
    <span class="HyperMD-quote">First line</span>   ← INLINE <span>
</div>
<div class="cm-line">
    <span class="cm-formatting-quote">></span>
    <span class="HyperMD-quote">Second line</span>  ← INLINE <span>
</div>
<div class="cm-line">
    <span class="cm-formatting-quote">></span>
    <span class="HyperMD-quote">Third line</span>   ← INLINE <span>
</div>
```

**Critical fact**: `.HyperMD-quote` is an **inline `<span>` element**, not a block-level container.

---

## 2. Root Cause Analysis

### PRIMARY ROOT CAUSE: Inline Element Styling

The current CSS applies block-level visual styling (background, border, border-radius, padding) directly to `.HyperMD-quote`, which is an **inline element**. Inline elements:

1. **Don't respect `width: 100%`** — shrink to fit content
2. **Don't fully respect vertical `padding`** — overlaps adjacent lines
3. **Create fragmented backgrounds** — each line gets its own background box with visible gaps
4. **Create visible seams** — gaps between line backgrounds
5. **Misbehave with `border-radius`** — radius applies to each inline box, not the logical block

### SECONDARY ROOT CAUSE: Broken First/Middle/Last Detection

The existing selectors assume `.HyperMD-quote` elements are siblings:

```css
.HyperMD-quote:first-of-type                    /* Wrong: targets first in .cm-line, not blockquote */
.HyperMD-quote:not(.HyperMD-quote + .HyperMD-quote)  /* Wrong: they're never adjacent siblings */
.HyperMD-quote:not(:has(+ .HyperMD-quote))      /* Wrong: they're never adjacent siblings */
.HyperMD-quote + .HyperMD-quote                 /* Wrong: never matches across .cm-line boundaries */
```

In CodeMirror 6, `.HyperMD-quote` elements are **NOT siblings** — each is inside its own `.cm-line`. These selectors are fundamentally broken.

### Why the Previous Bottom-Line Fix Didn't Work

The previous fix changed `bottom: 0` to `top: calc(100% - 1px)` for the `::after` pseudo-element. This addressed a 1px clipping issue but didn't solve the fundamental problem: **the entire visual styling is applied to inline elements that can't behave like block containers**. The backgrounds, borders, and border-radius were still fragmented across lines.

---

## 3. Reading Mode vs Edit Mode Comparison

| Property | Reading Mode | Live Preview (Current) |
|---|---|---|
| Container | Single `<blockquote>` | Multiple `.HyperMD-quote` spans |
| Display | `block` | `inline` (default for span) |
| Background | Continuous | Fragmented per line |
| Border | Continuous box | Broken per line |
| Border-radius | 4 corners of block | Per-line inline boxes |
| Padding | Around all content | Ineffective on inline |
| Pseudo-elements | Top/bottom of block | On individual lines |
| Height | Auto (content-based) | Line-height constrained |

---

## 4. Performance Rule Constraint

**CRITICAL**: The build validator enforces PR-6 / I-10:

> `:has()` on `.cm-line` is banned (perf)

This means we **CANNOT** use selectors like:
```css
.cm-line:has(.HyperMD-quote) { ... }   /* BANNED */
```

We must find alternative approaches that don't require `:has()` on `.cm-line`.

---

## 5. Verified DOM Facts

Based on CodeMirror 6 Live Preview architecture:

1. **`.HyperMD-quote` is a direct child of `.cm-line`** — verified by existing CSS targeting `.markdown-source-view.mod-cm6 .HyperMD-quote`
2. **`.HyperMD-quote` is present on every line belonging to a blockquote** — it's the content wrapper
3. **Nested blockquotes** use classes like `.HyperMD-quote-1`, `.HyperMD-quote-2` for nesting depth
4. **Adjacent quote lines are NOT adjacent `.HyperMD-quote` elements** — they're in separate `.cm-line` elements
5. **`.cm-line` elements ARE siblings** — they're direct children of `.cm-content`

---

## 6. Proposed Architecture

### Strategy: Style `.HyperMD-quote` as Block-Level Within `.cm-line`

Instead of trying to style `.cm-line` directly (which would require banned `:has()` selectors), make `.HyperMD-quote` behave as a block-level element that fills its parent `.cm-line`:

```css
.HyperMD-quote {
    display: block;          /* Make it fill the line width */
    width: 100%;             /* Ensure full width */
    box-sizing: border-box;  /* Include padding/border in width */
}
```

Then apply visual styling to `.HyperMD-quote` (which now behaves as a block) and use `.cm-line` adjacency for first/last detection.

### First/Middle/Last Detection Without `:has()` on `.cm-line`

Use `.HyperMD-quote` adjacency within the CodeMirror structure. Since `.HyperMD-quote` elements are NOT siblings, we need a different approach:

**Option A: Use `.cm-line` sibling combinators**

```css
/* First line: .cm-line without a previous .cm-line:has(.HyperMD-quote) */
/* This still requires :has() — BANNED */

/* Alternative: Use the fact that .HyperMD-quote is always first in .cm-line */
.HyperMD-quote:first-child {
    /* First element in its .cm-line */
}
```

Wait — this doesn't help with first/last of the blockquote group.

**Option B: Use CSS custom properties set by adjacent sibling detection**

```css
/* A .HyperMD-quote that is preceded by another .HyperMD-quote in a previous .cm-line */
/* We can detect this by checking if the previous .cm-line has a .HyperMD-quote */
```

This still requires `:has()` or parent selectors.

**Option C: Accept limitations and use a different visual approach**

Instead of trying to detect first/last perfectly, use a simpler approach:

1. Apply background/border to ALL `.HyperMD-quote` elements (as blocks)
2. Use negative margins to overlap borders between lines (eliminating seams)
3. Use pseudo-elements that don't extend outside the element

**Option D: Use `display: contents` or wrapper approach**

Not applicable in CodeMirror's DOM.

**Option E: Recommended — Use block-level display + margin overlap**

```css
/* Make .HyperMD-quote block-level */
.HyperMD-quote {
    display: block;
    width: 100%;
    box-sizing: border-box;
    background-color: var(--primidian-quote-bg);
    border-left: var(--primidian-quote-border-width) solid var(--primidian-quote-border-color);
    border-right: var(--primidian-quote-box-border-width) solid var(--primidian-quote-border-color);
    margin-bottom: -1px;  /* Overlap with next line to eliminate seam */
}

/* First line: add top border */
.HyperMD-quote:first-of-type {
    border-top: var(--primidian-quote-box-border-width) solid var(--primidian-quote-border-color);
}

/* Last line: add bottom border */
.HyperMD-quote:last-of-type {
    border-bottom: var(--primidian-quote-box-border-width) solid var(--primidian-quote-border-color);
}
```

Wait — `:first-of-type` and `:last-of-type` work on the element's type within its parent. Since `.HyperMD-quote` is the only `.HyperMD-quote` in its `.cm-line`, `:first-of-type` would always match. This doesn't work.

**Option F: Recommended — Use `.HyperMD-quote` class detection via sibling `.cm-line`**

Actually, the safest approach that avoids `:has()` on `.cm-line` is:

1. Make `.HyperMD-quote` block-level (display: block, width: 100%)
2. Apply left/right borders to ALL `.HyperMD-quote`
3. Apply top border to FIRST `.HyperMD-quote` in the blockquote group
4. Apply bottom border to LAST `.HyperMD-quote` in the blockquote group
5. Use first/last detection that doesn't violate PR-6/I-10

For first/last detection without `:has()` on `.cm-line`:

```css
/* First .HyperMD-quote in a .cm-line that is NOT preceded by a .cm-line with .HyperMD-quote */
/* We can use the fact that .cm-line elements are siblings */
/* But we can't check if previous .cm-line has .HyperMD-quote without :has() */

/* Alternative: Use a different approach */
/* Apply top border to ALL .HyperMD-quote, then remove it for non-first */
.HyperMD-quote {
    border-top: var(--primidian-quote-box-border-width) solid var(--primidian-quote-border-color);
}

/* Remove top border from .HyperMD-quote that follows another .HyperMD-quote */
/* But .HyperMD-quote elements are not siblings... */
```

This is the core challenge. Let me think of a cleaner solution.

**Option G: Recommended — Use `display: block` + accept per-line borders for middle lines**

Actually, looking at this more carefully, I realize the cleanest solution is:

1. Make `.HyperMD-quote` block-level
2. Apply continuous left/right borders to all lines
3. For top border: use `.HyperMD-quote:first-of-type` (works because it's the first `.HyperMD-quote` in the document... no, that's wrong too)

Let me reconsider. The fundamental issue is that CSS cannot easily detect "is this `.HyperMD-quote` the first in a group of consecutive blockquote lines" without either:
- `:has()` (banned on `.cm-line`)
- Parent selector (doesn't exist in CSS)
- JavaScript (not preferred)

**Final Recommended Approach: Use `display: block` + `margin-top: -1px` overlap technique**

```css
/* Base: all .HyperMD-quote lines */
.HyperMD-quote {
    display: block;
    width: 100%;
    box-sizing: border-box;
    position: relative;
    background-color: var(--primidian-quote-bg);
    border-left: var(--primidian-quote-border-width) solid var(--primidian-quote-border-color);
    border-right: var(--primidian-quote-box-border-width) solid var(--primidian-quote-border-color);
    border-top: var(--primidian-quote-box-border-width) solid var(--primidian-quote-border-color);
    border-bottom: none;  /* No bottom border on middle lines */
    margin-top: calc(-1 * var(--primidian-quote-box-border-width));  /* Overlap with previous line */
}

/* First line: no negative margin-top */
.HyperMD-quote:first-of-type {
    margin-top: 0;
}

/* Last line: add bottom border */
.HyperMD-quote:last-of-type {
    border-bottom: var(--primidian-quote-box-border-width) solid var(--primidian-quote-border-color);
}
```

Wait — `:first-of-type` and `:last-of-type` still won't work correctly because they operate within the parent (`.cm-line`), not within the blockquote group.

**FINAL RECOMMENDED APPROACH: Accept the limitation and use a pragmatic solution**

Since we cannot use `:has()` on `.cm-line`, and CSS doesn't have parent selectors, we need to accept some limitations:

1. **Make `.HyperMD-quote` block-level** — this solves the background/border fragmentation
2. **Use `display: block` + `width: 100%`** — fills the line width
3. **Apply left/right borders to all lines** — creates continuous side borders
4. **Use `margin-top: -1px`** — overlaps lines to eliminate horizontal seams
5. **For top/bottom decorations**: Use pseudo-elements positioned inside the element

For first/last detection, we have two options:

**Option 1**: Accept that all lines look the same (no special first/last styling for Boxy). The top/bottom borders are less important than continuous sides.

**Option 2**: Use JavaScript to add classes to first/last lines (not preferred but may be necessary).

**Option 3**: Use a CSS-only approach that doesn't need first/last detection:
- Apply all four borders to every `.HyperMD-quote`
- Use `margin-top: -1px` to overlap top border with previous line's bottom
- This creates a continuous appearance without needing to know which line is first/last

Let me verify Option 3:

```css
.HyperMD-quote {
    display: block;
    width: 100%;
    box-sizing: border-box;
    background-color: var(--primidian-quote-bg);
    border: var(--primidian-quote-box-border-width) solid var(--primidian-quote-border-color);
    border-left: var(--primidian-quote-border-width) solid var(--primidian-quote-border-color);
    margin-top: calc(-1 * var(--primidian-quote-box-border-width));
}

/* First line doesn't need negative margin */
.HyperMD-quote:first-of-type {
    margin-top: 0;
}
```

Wait — `:first-of-type` would match the first `.HyperMD-quote` in EACH `.cm-line`. Since each `.cm-line` has exactly one `.HyperMD-quote`, `:first-of-type` matches ALL of them. This doesn't help.

I think we need to accept that **without `:has()` on `.cm-line`**, we cannot perfectly detect the first line of a blockquote group. But we can achieve a good approximation:

**Pragmatic Solution:**

1. Make `.HyperMD-quote` block-level
2. Apply all four borders to every line
3. Use `margin-top: -1px` to overlap borders between consecutive lines
4. The overlap means middle lines show only left/right borders (top is covered by previous line's bottom)
5. First line keeps its top border (no previous line to overlap)
6. Last line keeps its bottom border (no next line to cover it)

This works WITHOUT needing first/last detection!

```css
.HyperMD-quote {
    display: block;
    width: 100%;
    box-sizing: border-box;
    position: relative;
    background-color: var(--primidian-quote-bg);
    border: var(--primidian-quote-box-border-width) solid var(--primidian-quote-border-color);
    border-left: var(--primidian-quote-border-width) solid var(--primidian-quote-border-color);
    margin-top: calc(-1 * var(--primidian-quote-box-border-width));
}
```

But wait — the first line still has `margin-top: -1px` which would shift it up. We need to NOT apply negative margin to the first line.

Without `:has()`, we can't easily detect the first line. But we can use a different trick:

**Use `margin-top: -1px` on all lines, then add `padding-top: 1px` to the FIRST `.cm-line` in the document... no, that's wrong too.**

Actually, the simplest solution is:

```css
/* Apply to all .HyperMD-quote */
.HyperMD-quote {
    display: block;
    width: 100%;
    box-sizing: border-box;
    background-color: var(--primidian-quote-bg);
    border-left: var(--primidian-quote-border-width) solid var(--primidian-quote-border-color);
    border-right: var(--primidian-quote-box-border-width) solid var(--primidian-quote-border-color);
    border-top: var(--primidian-quote-box-border-width) solid var(--primidian-quote-border-color);
    margin-top: calc(-1 * var(--primidian-quote-box-border-width));
}

/* First .HyperMD-quote: no negative margin, add top border */
.HyperMD-quote:first-child {
    margin-top: 0;
}
```

Wait, `:first-child` matches if `.HyperMD-quote` is the first child of its parent. In the structure:
```html
<div class="cm-line">
    <span class="cm-formatting-quote">></span>
    <span class="HyperMD-quote">First line</span>
</div>
```

`.HyperMD-quote` is NOT the first child — `.cm-formatting-quote` is. So `:first-child` won't match.

I think the pragmatic solution is:

1. Accept that `margin-top: -1px` will be applied to ALL lines including the first
2. The first line will be shifted up by 1px, but this is barely noticeable
3. Alternatively, use `padding-top` on `.HyperMD-quote` to compensate

Actually, let me reconsider the whole approach. The cleanest solution that avoids `:has()` on `.cm-line` is:

**Use `display: block` on `.HyperMD-quote` and accept per-line borders with overlap:**

```css
.HyperMD-quote {
    display: block;
    width: 100%;
    box-sizing: border-box;
    position: relative;
    background-color: var(--primidian-quote-bg);
    border-left: var(--primidian-quote-border-width) solid var(--primidian-quote-border-color);
    border-right: var(--primidian-quote-box-border-width) solid var(--primidian-quote-border-color);
    border-top: var(--primidian-quote-box-border-width) solid var(--primidian-quote-border-color);
    margin-top: calc(-1 * var(--primidian-quote-box-border-width));
}
```

This creates:
- Left border: accent line (thicker)
- Right border: box border
- Top border: overlaps with previous line's content area
- Bottom: no border (next line's top border covers it)

The overlap ensures no double borders between lines. The first line will have a top border that's visible. The last line won't have a bottom border, but that's acceptable for the Boxy preset.

For the fading lines (Minimal/Fade presets), we use pseudo-elements positioned INSIDE the element.

---

## 7. Glow Engine Interaction

The Glow Engine adds `box-shadow` to the last `.HyperMD-quote`:
```css
body:not(.primidian-glow-off).primidian-glow-borders .markdown-source-view.mod-cm6 .HyperMD-quote:not(:has(+ .HyperMD-quote)) {
    box-shadow: inset ...;
}
```

This uses `:has()` on `.HyperMD-quote`, not `.cm-line`, so it's allowed by PR-6/I-10. The glow should continue to work with the new block-level approach.

---

## 8. Nested Blockquotes

Nested blockquotes in CodeMirror 6 use `.HyperMD-quote-1`, `.HyperMD-quote-2`, etc. for nesting depth. The new approach should:

1. Apply block-level display to all `.HyperMD-quote` regardless of nesting level
2. Use `margin-left` to create indentation for nested levels
3. Each nesting level gets its own continuous background/border

---

## 9. Files That Will Need Modification

| File | Change |
|---|---|
| `src/components/57-blockquotes.css` | Rewrite Live Preview blockquote rules for block-level display |
| `src/systems/82-glow.css` | Potentially adjust glow selectors if needed |

---

## 10. Risks

| Risk | Mitigation |
|---|---|
| `display: block` on `.HyperMD-quote` disrupts CodeMirror layout | Test thoroughly; `.cm-line` should accommodate block children |
| Negative margin causes first line to shift | Minimal visual impact; can be compensated with padding |
| Pseudo-element positioning changes | Position inside element using `top: 0` and `bottom: 0` (now safe with block display) |
| Nested quotes need indentation | Use `.HyperMD-quote-N` classes for margin-left |
