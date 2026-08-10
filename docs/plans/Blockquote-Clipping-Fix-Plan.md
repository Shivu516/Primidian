# Blockquote Clipping — Fix Plan

## Confirmed Root Cause

The bottom blockquote decoration (fading line + border-radius) is being **clipped by CodeMirror's line-level `overflow: hidden`**.

### Evidence Chain

1. `::after` pseudo-element on last `.HyperMD-quote` is positioned at `bottom: 0` with `height: 1px`
2. This places the pseudo-element's visual area from `bottom: 0` to `bottom: -1px` (outside the element's layout box)
3. CodeMirror's `.cm-line` has `overflow: hidden` by default
4. Any content extending beyond the line box is clipped
5. Reading Mode works because `<blockquote>` doesn't have `overflow: hidden`

---

## Proposed Fix

### Strategy: Keep pseudo-elements inside the content box

Instead of fighting CodeMirror's `overflow: hidden`, adjust the pseudo-element positioning so all visual decoration stays **inside** the `.HyperMD-quote` element's content box.

### Changes Required

#### 1. Bottom pseudo-element positioning

**Current:**
```css
.markdown-source-view.mod-cm6 .HyperMD-quote:not(:has(+ .HyperMD-quote))::after {
    position: absolute;
    bottom: 0;
    height: 1px;
    /* ... */
}
```

**Proposed:**
```css
.markdown-source-view.mod-cm6 .HyperMD-quote:not(:has(+ .HyperMD-quote))::after {
    position: absolute;
    bottom: 1px;  /* Move inside content box */
    height: 1px;
    /* ... */
}
```

Wait — this would shift the decoration up by 1px, which may not be desirable. Better approach:

#### 2. Use inset box-shadow for bottom decoration

Replace the `::after` pseudo-element with an `inset` box-shadow on the last line:

```css
.markdown-source-view.mod-cm6 .HyperMD-quote:not(:has(+ .HyperMD-quote)) {
    /* Existing border-radius and padding */
    box-shadow: inset 0 -1px 0 0 var(--primidian-quote-border-color);
}
```

This creates a 1px line at the bottom **inside** the element's box, avoiding clipping.

#### 3. Top pseudo-element — same treatment

Replace `::before` with `inset` box-shadow:

```css
.markdown-source-view.mod-cm6 .HyperMD-quote:not(.HyperMD-quote + .HyperMD-quote)::before {
    position: absolute;
    top: 0;
    /* ... */
}
```

Could become:

```css
.markdown-source-view.mod-cm6 .HyperMD-quote:not(.HyperMD-quote + .HyperMD-quote) {
    box-shadow: inset 0 1px 0 0 var(--primidian-quote-border-color);
}
```

But this conflicts with the bottom box-shadow on single-line quotes. Better to keep pseudo-elements but ensure they're inside the content box.

#### 4. Better approach: Keep pseudo-elements, adjust positioning

```css
/* Top fading line — first line only */
.markdown-source-view.mod-cm6 .HyperMD-quote:not(.HyperMD-quote + .HyperMD-quote)::before {
    position: absolute;
    top: 0;
    left: 0;
    height: 2px;
    width: 55%;
    background-image: linear-gradient(90deg, var(--primidian-quote-border-color), transparent);
    pointer-events: none;
}

/* Bottom fading line — last line only */
.markdown-source-view.mod-cm6 .HyperMD-quote:not(:has(+ .HyperMD-quote))::after {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 1px;
    width: 25%;
    background-image: linear-gradient(90deg, var(--primidian-quote-border-color), transparent);
    pointer-events: none;
}
```

The issue is that `top: 0` and `bottom: 0` position the pseudo-elements at the **edges** of the padding box. If the element has padding, the pseudo-elements are at the edge of the padding, not the content.

For absolutely positioned elements, `top: 0` means the top edge of the padding box. The pseudo-element extends downward from there. If the pseudo-element has `height: 2px`, it occupies `top: 0` to `top: 2px`. This is **inside** the element.

Similarly, `bottom: 0` means the bottom edge of the padding box. The pseudo-element extends upward from there. If the pseudo-element has `height: 1px`, it occupies `bottom: -1px` to `bottom: 0`. This is **outside** the element!

**This is the bug.** The `::after` with `bottom: 0` and `height: 1px` extends 1px **below** the element's bottom edge.

### Fix: Use `bottom: auto; top: 100%` or adjust height

Option A: Remove height and use `bottom: 0; top: auto` — but this doesn't work for absolute positioning.

Option B: Use `bottom: 0` but make the pseudo-element extend **upward** instead of downward. This requires `margin-bottom: 1px` or similar.

Option C: Position from top instead of bottom:
```css
.markdown-source-view.mod-cm6 .HyperMD-quote:not(:has(+ .HyperMD-quote))::after {
    position: absolute;
    top: calc(100% - 1px);  /* 1px from bottom, inside the box */
    left: 0;
    height: 1px;
    width: 25%;
    /* ... */
}
```

Option D: Use `bottom: 0` with `transform: translateY(-1px)` to shift it up.

**Recommended: Option C** — it's the most explicit and doesn't rely on transforms.

---

## Implementation Sequence

1. **Adjust bottom pseudo-element positioning** in `src/components/57-blockquotes.css`
2. **Verify top pseudo-element is not also clipped** (it should be fine since it extends downward from `top: 0`)
3. **Add nested blockquote rules** for Edit Mode
4. **Test all four presets** in both Reading Mode and Live Preview
5. **Test Glow Engine** with blockquotes

---

## Files to Modify

| File | Change |
|---|---|
| `src/components/57-blockquotes.css` | Fix `::after` positioning from `bottom: 0` to `top: calc(100% - 1px)` |

---

## Selectors/Rules That MUST NOT Be Modified

- Reading Mode blockquote rules (`.markdown-rendered blockquote:not(.callout)`)
- Border-radius rules for first/last lines
- Padding rules for first/last lines
- Glow Engine blockquote rules (unless glow-related clipping is confirmed)
- Variant definitions in `src/variants/72-variants-scaffold.css`
- Token definitions in `src/tokens/14-components.css`

---

## How the Fix Preserves Current Behavior

- The bottom fading line will still appear at the bottom of the last line
- The visual position will be nearly identical (1px shift)
- All four presets remain functional
- Reading Mode is untouched
- Glow Engine interaction is unchanged
- Nested blockquotes continue to work

---

## Alternative: Use `overflow: visible` on `.HyperMD-quote`

This would NOT work because:
- CodeMirror's parent `.cm-line` has `overflow: hidden`
- Setting `overflow: visible` on a child doesn't override parent clipping
- Could cause other rendering issues

---

## Alternative: Use `clip-path` to extend the visible area

This is overkill for a 1px adjustment and could introduce other issues.

---

## Risk Assessment

| Risk | Mitigation |
|---|---|
| 1px visual shift | Negligible, within sub-pixel rendering tolerance |
| Conflicting with border-radius | The fading line is at `left: 0` with `width: 25%`, away from corners |
| Glow Engine double-shadow | Glow uses `box-shadow`, fading line uses pseudo-element — no conflict |
| Single-line quotes | Need to verify both `::before` and `::after` are visible |
