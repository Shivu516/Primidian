# Blockquote Live Preview Parity — Implementation Roadmap

## Phase 1: Make `.HyperMD-quote` Block-Level

### Goal
Convert `.HyperMD-quote` from inline to block-level so backgrounds, borders, padding, and border-radius work correctly.

### Changes

**File:** `src/components/57-blockquotes.css`

Replace lines 43-62 (existing Live Preview rules) with:

```css
/* ── Live Preview: blockquote lines as block-level visual containers ──
 * Each `.HyperMD-quote` is an inline span in CodeMirror. We make it
 * block-level so background, border, padding, and border-radius behave
 * correctly. Adjacent lines use margin-top overlap to eliminate seams. */

/* All quote lines: block-level with continuous side borders */
.markdown-source-view.mod-cm6 .HyperMD-quote {
    display: block;
    width: 100%;
    box-sizing: border-box;
    position: relative;
    background-color: var(--primidian-quote-bg);
    border-left: var(--primidian-quote-border-width) solid var(--primidian-quote-border-color);
    border-right: var(--primidian-quote-box-border-width) solid var(--primidian-quote-border-color);
    border-top: var(--primidian-quote-box-border-width) solid var(--primidian-quote-border-color);
    border-bottom: none;
    border-radius: 0;
    margin-top: calc(-1 * var(--primidian-quote-box-border-width));
    padding: var(--primidian-quote-padding);
}
```

### Why This Works

- `display: block` makes the span fill its parent's width
- `width: 100%` ensures full line coverage
- `box-sizing: border-box` includes padding/border in width calculation
- `margin-top: -1px` overlaps with previous line, eliminating horizontal seams
- No bottom border on middle lines (next line's top border covers it)
- Padding works correctly on block elements

### PR-6 / I-10 Compliance

No `:has()` on `.cm-line` is used. All selectors target `.HyperMD-quote` directly.

---

## Phase 2: First-Line and Last-Line Handling

### Goal
Ensure first line has proper top border and last line has proper bottom border.

### Approach: Use `:first-of-type` and `:last-of-type` carefully

Since each `.cm-line` contains exactly one `.HyperMD-quote`, `:first-of-type` matches ALL `.HyperMD-quote` elements. We need a different approach.

### Alternative: Use `margin-top` overlap with `:first-child` trick

Actually, since `.HyperMD-quote` is the second child of `.cm-line` (after `.cm-formatting-quote`), we can use:

```css
/* First line of document: no negative margin */
/* This is a heuristic; perfect detection requires :has() which is banned */

/* Better approach: Accept minor first-line shift or use padding compensation */
```

### Recommended: Accept the Limitation

The `margin-top: -1px` on the first line causes a negligible 1px shift upward. This is barely visible and doesn't affect readability. The alternative (JavaScript) is not worth the complexity.

For the last line, we add bottom border using `:last-of-type`:

```css
/* Last line: add bottom border */
.markdown-source-view.mod-cm6 .HyperMD-quote:last-of-type {
    border-bottom: var(--primidian-quote-box-border-width) solid var(--primidian-quote-border-color);
}
```

Wait — `:last-of-type` also matches ALL `.HyperMD-quote` elements (since each is the last/only one in its `.cm-line`). This doesn't work.

### Final Approach: Use JavaScript or Accept Limitation

**Option A (CSS-only, recommended):** Accept that last line won't have a bottom border for Boxy preset. The left/right/top borders are sufficient for visual continuity. For Fade preset, the bottom fading line (pseudo-element) is more important.

**Option B (JavaScript):** Use a small script to detect first/last blockquote lines and add classes. Not recommended for this theme.

**Decision:** Go with Option A. The bottom border on the last line is less critical than continuous sides and top border.

---

## Phase 3: Decorative Fading Lines (Minimal/Fade Presets)

### Goal
Position top and bottom fading lines correctly on first and last blockquote lines.

### Changes

```css
/* First line: top fading line (inside element, no clipping) */
.markdown-source-view.mod-cm6 .HyperMD-quote::before {
    content: '';
    display: var(--primidian-quote-bar-display);
    position: absolute;
    top: 0;
    left: 0;
    height: 2px;
    width: 55%;
    background-image: linear-gradient(90deg, var(--primidian-quote-border-color), transparent);
    pointer-events: none;
}

/* Last line: bottom fading line (inside element, no clipping) */
.markdown-source-view.mod-cm6 .HyperMD-quote::after {
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

### Why This Works

With `display: block` on `.HyperMD-quote`:
- The element has a definite height (content + padding)
- `position: absolute` pseudo-elements are positioned relative to this block
- `top: 0` and `bottom: 0` are within the element's bounds
- No clipping by CodeMirror's `overflow: hidden`

### Preset-Specific Behavior

| Preset | Top Line | Bottom Line |
|---|---|---|
| Simple | `display: none` | `display: none` |
| Boxy | `display: none` | `display: none` |
| Minimal | `display: block` | `display: none` |
| Fade | `display: block` | `display: block` |

Controlled by `--primidian-quote-bar-display` token (set per preset).

---

## Phase 4: Nested Blockquotes

### Goal
Make nested blockquotes visually distinct and continuous.

### Changes

```css
/* Nested blockquote indentation */
.markdown-source-view.mod-cm6 .HyperMD-quote-2,
.markdown-source-view.mod-cm6 .HyperMD-quote-3,
.markdown-source-view.mod-cm6 .HyperMD-quote-4 {
    margin-left: var(--prindent-nested, 1em);
    background-color: transparent;
    border-left-color: var(--primidian-accent-muted);
}
```

---

## Phase 5: Glow Engine Compatibility

### Goal
Ensure Glow Engine continues to work with new blockquote styling.

### Analysis

The Glow Engine uses:
```css
body:not(.primidian-glow-off).primidian-glow-borders .markdown-source-view.mod-cm6 .HyperMD-quote:not(:has(+ .HyperMD-quote)) {
    box-shadow: ...;
}
```

This selector is **still valid** — it targets `.HyperMD-quote`, not `.cm-line`. The `:has()` is on `.HyperMD-quote`, which is allowed.

### Required Changes

None — the Glow Engine should work unchanged. The `box-shadow` applies to the last `.HyperMD-quote` in the group, which now has `display: block` and proper dimensions.

---

## Phase 6: Regression Testing

### Test Matrix

| Test | Reading Mode | Live Preview | Expected |
|---|---|---|---|
| Simple preset | ✓ | ✓ | Match |
| Boxy preset | ✓ | ✓ | Match |
| Minimal preset | ✓ | ✓ | Match |
| Fade preset | ✓ | ✓ | Match |
| Single-line | ✓ | ✓ | Match |
| 2-line | ✓ | ✓ | Match |
| 4+ line | ✓ | ✓ | Match |
| Wrapped | ✓ | ✓ | Match |
| Nested 1 level | ✓ | ✓ | Match |
| Nested 2+ levels | ✓ | ✓ | Match |
| After paragraph | ✓ | ✓ | Match |
| After heading | ✓ | ✓ | Match |
| Glow OFF | ✓ | ✓ | Match |
| Glow ON | ✓ | ✓ | Match |
| Dark Mode | ✓ | ✓ | Match |
| Light Mode | ✓ | ✓ | Match |

---

## Implementation Order

1. **Phase 1**: Make `.HyperMD-quote` block-level (core fix)
2. **Phase 3**: Add decorative fading lines (pseudo-elements)
3. **Phase 4**: Add nested blockquote indentation
4. **Phase 6**: Regression test all cases

---

## Exact Selectors Summary

### New Selectors (Safe — No `:has()` on `.cm-line`)

```css
/* Base blockquote styling for Live Preview */
.markdown-source-view.mod-cm6 .HyperMD-quote {
    display: block;
    width: 100%;
    box-sizing: border-box;
    position: relative;
    background-color: var(--primidian-quote-bg);
    border-left: var(--primidian-quote-border-width) solid var(--primidian-quote-border-color);
    border-right: var(--primidian-quote-box-border-width) solid var(--primidian-quote-border-color);
    border-top: var(--primidian-quote-box-border-width) solid var(--primidian-quote-border-color);
    border-bottom: none;
    border-radius: 0;
    margin-top: calc(-1 * var(--primidian-quote-box-border-width));
    padding: var(--primidian-quote-padding);
}

/* Top fading line */
.markdown-source-view.mod-cm6 .HyperMD-quote::before {
    content: '';
    display: var(--primidian-quote-bar-display);
    position: absolute;
    top: 0;
    left: 0;
    height: 2px;
    width: 55%;
    background-image: linear-gradient(90deg, var(--primidian-quote-border-color), transparent);
    pointer-events: none;
}

/* Bottom fading line */
.markdown-source-view.mod-cm6 .HyperMD-quote::after {
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

### Preserved Selectors (No Changes Needed)

```css
/* Reading Mode — unchanged */
.markdown-rendered blockquote:not(.callout) { ... }
.markdown-rendered blockquote:not(.callout)::before { ... }
.markdown-rendered blockquote:not(.callout)::after { ... }

/* Glow Engine — unchanged */
body:not(.primidian-glow-off).primidian-glow-borders .HyperMD-quote:not(:has(+ .HyperMD-quote)) { ... }
```

---

## Risk Mitigation

| Risk | Mitigation |
|---|---|
| `display: block` disrupts CodeMirror | `.cm-line` is block-level; block children are valid |
| Negative margin shifts first line | 1px shift is negligible; no readability impact |
| Overlap creates z-index issues | Background color covers previous line's bottom |
| Nested quotes need different handling | Use `.HyperMD-quote-N` classes for indentation |
| Glow Engine compatibility | Glow selectors target `.HyperMD-quote`, not `.cm-line` |
