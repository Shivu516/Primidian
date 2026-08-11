# Blockquote Visual Parity — Definitive Forensic Investigation

> **Status:** Investigation complete
> **Date:** 2026-08-11
> **Scope:** Determine whether CSS alone can achieve blockquote visual parity between Reading Mode and Live Preview

---

## 1. Executive Summary

**Conclusion: CSS alone CANNOT achieve the desired blockquote visual parity.**

The desired result — a single continuous visual container for multi-line blockquotes in Live Preview — is structurally impossible with CSS alone due to CodeMirror 6's line-based DOM architecture. This is not a limitation of CSS selectors or techniques; it is a fundamental limitation of how CSS operates on the box model.

**The only ways to achieve true visual parity are:**
1. **A CodeMirror plugin** that adds structural information (classes/attributes) to quote boundary lines
2. **A redesign** of the blockquote visual treatment to work within CSS's per-element constraints
3. **Acceptance of per-line styling** with `box-decoration-break: clone` (the current approach, which the user has rejected)

---

## 2. The Structural Problem

### 2.1 Reading Mode DOM

```html
<blockquote>                          ← ONE block-level container
    <p>Line 1</p>
    <p>Line 2</p>
    <p>Line 3</p>
</blockquote>
```

CSS applies to the single `<blockquote>` element:
- `background-color` fills the entire container
- `border` surrounds the entire block
- `border-radius` rounds all four corners
- `::before`/`::after` pseudo-elements at top/bottom of the entire block
- Height is determined by content (auto)

### 2.2 Live Preview DOM (CodeMirror 6)

```html
<div class="cm-line">                 ← block-level, NOT a blockquote container
    <span class="cm-formatting-quote">></span>
    <span class="HyperMD-quote">Line 1</span>  ← inline span
</div>
<div class="cm-line">                 ← separate block-level element
    <span class="cm-formatting-quote">></span>
    <span class="HyperMD-quote">Line 2</span>  ← separate inline span
</div>
<div class="cm-line">                 ← separate block-level element
    <span class="cm-formatting-quote">></span>
    <span class="HyperMD-quote">Line 3</span>  ← separate inline span
</div>
```

**Critical facts:**
1. Each line is a separate `.cm-line` block element
2. `.HyperMD-quote` is an **inline** span within `.cm-line`
3. There is NO element that wraps all lines of a multi-line blockquote
4. `.HyperMD-quote` elements are NOT siblings — they are children of different `.cm-line` parents
5. CodeMirror 6 does NOT provide any class or attribute indicating "first line of blockquote" or "last line of blockquote"

### 2.3 Why This Is Fundamentally a CSS Limitation

CSS operates on individual elements. It can:
- Style an element based on its own class/attributes
- Style an element based on its ancestors (via descendant selectors)
- Style an element based on its siblings (via `+` and `~` selectors)
- Style an element based on its children (via `:has()`)

CSS CANNOT:
- Group multiple sibling elements into a visual container
- Apply a background/border that spans multiple elements
- Detect "the first element of a group" without a common parent or explicit class
- Create a box that wraps elements that don't share a parent

This is not a missing CSS feature — it is how the CSS box model works. A background is painted on a single box. A border surrounds a single box. There is no mechanism to "merge" multiple boxes into one visual container.

---

## 3. Exhaustive Investigation of CSS Techniques

### 3.1 Technique: `box-decoration-break: clone`

**What it does:** When an inline element wraps across multiple lines, `box-decoration-break: clone` ensures each line fragment gets its own background, border, and padding.

**Why it doesn't solve the problem:**
- It only works within a SINGLE inline element that wraps
- It does NOT create continuity across multiple `.cm-line` elements
- Each line fragment gets its OWN background/border, creating the "stack of boxes" effect
- This is exactly the artifact the user rejected

**Verdict:** ❌ Insufficient

### 3.2 Technique: Sibling Selectors (`+`, `~`)

**What they do:** Select an element based on its relationship to adjacent siblings.

**Why they don't solve the problem:**
- `.HyperMD-quote` elements are NOT siblings across `.cm-line` boundaries
- `.HyperMD-quote + .HyperMD-quote` only matches when two quote spans are adjacent within the SAME `.cm-line` (wrapped content)
- Cannot detect "first line of blockquote" or "last line of blockquote" across `.cm-line` boundaries

**Verdict:** ❌ Insufficient

### 3.3 Technique: `:has()` Selector

**What it does:** Select an element based on its descendants or subsequent siblings.

**Why it doesn't solve the problem:**
- `.cm-line:has(.HyperMD-quote)` would target the line, but this is BANNED by PR-6/I-10
- Even if allowed, it would style each `.cm-line` independently, not create a continuous container
- `:has()` cannot group multiple elements into a visual container

**Verdict:** ❌ Banned and insufficient

### 3.4 Technique: `sibling-index()` and `sibling-count()`

**What they do:** Return the position of an element among its siblings and the total sibling count.

**Why they don't solve the problem:**
- `.HyperMD-quote` elements are NOT siblings across `.cm-line` boundaries
- Even if they were, `sibling-index()` counts ALL siblings, not just quote lines
- The `of` filter (`sibling-index(of .HyperMD-quote)`) only works within the same parent
- These functions are also very new (Chrome 138+, Safari 26.2+) and not universally supported

**Verdict:** ❌ Insufficient and poor browser support

### 3.5 Technique: Negative Margins

**What they do:** Collapse gaps between elements by overlapping margins.

**Why they don't solve the problem:**
- The user explicitly banned negative margins
- Even with negative margins, each line still has its own background/border
- Creates visual artifacts when lines have different heights
- Does not create a true continuous container

**Verdict:** ❌ Banned and insufficient

### 3.6 Technique: Pseudo-Elements on `.cm-content`

**What it does:** Use `::before` or `::after` on the editor content element to draw decorations.

**Why it doesn't solve the problem:**
- `.cm-content` is the entire editor content, not a single blockquote
- CSS cannot dynamically calculate the position of each blockquote
- A single pseudo-element cannot draw multiple blockquote backgrounds
- Would require JavaScript to calculate positions

**Verdict:** ❌ Insufficient

### 3.7 Technique: `box-shadow` with Large Spread

**What it does:** Extend the visual area of an element using box-shadow.

**Why it doesn't solve the problem:**
- `box-shadow` extends in all directions, bleeding into unrelated content
- Cannot be constrained to "only extend to the next quote line"
- Creates visual artifacts with overlapping content

**Verdict:** ❌ Insufficient

### 3.8 Technique: CSS Grid / Flexbox on `.cm-content`

**What it does:** Change the layout algorithm of the editor content.

**Why it doesn't solve the problem:**
- CodeMirror uses its own layout system
- Changing `.cm-content` to grid/flex would break CodeMirror's line rendering
- Would break cursor positioning, selection, scrolling, and editing

**Verdict:** ❌ Breaks editor functionality

### 3.9 Technique: `outline` Instead of `border`

**What it does:** Draw a border-like decoration outside the element's box.

**Why it doesn't solve the problem:**
- `outline` is still per-element
- Outlines don't follow border-radius on all browsers
- Does not create continuity across elements

**Verdict:** ❌ Insufficient

### 3.10 Technique: `background-attachment: fixed` or `local`

**What it does:** Control how backgrounds scroll with content.

**Why it doesn't solve the problem:**
- Does not merge backgrounds across elements
- `fixed` attaches to the viewport, not the blockquote
- `local` attaches to the element's content, not the blockquote

**Verdict:** ❌ Insufficient

### 3.11 Technique: CSS `containment` (`contain: layout`, `contain: paint`)

**What it does:** Isolate an element's rendering from the rest of the document.

**Why it doesn't solve the problem:**
- Containment isolates elements, it doesn't group them
- Does not help create a continuous container

**Verdict:** ❌ Insufficient

### 3.12 Technique: CSS Anchor Positioning

**What it does:** Position an element relative to another element.

**Why it doesn't solve the problem:**
- Requires explicit anchor designation
- Does not create a continuous background/border
- Very new feature (Chrome 125+), poor browser support
- Does not solve the fundamental grouping problem

**Verdict:** ❌ Insufficient

### 3.13 Technique: `display: block` on `.HyperMD-quote`

**What it does:** Convert the inline span to a block-level element.

**Why it doesn't solve the problem (and breaks things):**
- `.HyperMD-quote` is a span within `.cm-line`; making it block breaks CodeMirror's line layout
- Causes cursor positioning errors, selection issues, line height miscalculations
- Each line still has its own block box — does not create continuity
- This is Failed Experiment B from the previous investigation

**Verdict:** ❌ Breaks editor functionality

---

## 4. What Other Themes Do

### 4.1 Obsidian Default Theme

**Approach:** Per-line background with `box-decoration-break: clone`. No top/bottom bars. No border radius.

**Result:** Each line has its own background, but without decorative bars or radius, the per-line effect is subtle. The quote reads as a highlighted region, not a continuous container.

**Key insight:** Default theme avoids the "stack of boxes" artifact by NOT having decorative elements that would repeat per line.

### 4.2 Obsidianite Theme

**Approach:** Per-line background, border, and pseudo-elements. Uses `.HyperMD-quote + .HyperMD-quote::before` to hide the top bar on consecutive lines (but only within the same `.cm-line` for wrapped content).

**Result:** Top bar appears on every line for multi-line quotes (not just the first). Bottom bar appears on every line. This is the same "per-line decoration" problem.

**Key insight:** Obsidianite's sibling selector only works for wrapped content within a single `.cm-line`, not across `.cm-line` boundaries.

### 4.3 Primary Theme

**Approach:** Per-line background and border. No decorative bars. No border radius in Live Preview.

**Result:** Similar to Default theme — subtle per-line highlighting without decorative repetition.

**Key insight:** Primary theme accepts the per-line limitation and avoids decorative elements that would repeat.

### 4.4 Community Solutions (from CodeMirror discussions)

**Approach:** Some community members have created CodeMirror plugins that use `Decoration.line()` to add a class to lines that match `^>.*`.

**Result:** This adds a class to each line, but still requires per-line styling. The plugin approach could potentially add classes to first/last lines, but this requires JavaScript.

**Key insight:** Even the CodeMirror community acknowledges that CSS alone cannot target "lines that are part of a blockquote" without a plugin extension.

---

## 5. What Would Be Required for True Parity

### 5.1 Option A: CodeMirror Plugin with Line Decorations

**How it works:**
1. A plugin registers a CodeMirror extension
2. The extension scans the document for blockquote lines
3. It adds a class to the first and last lines of each blockquote
4. CSS can then target these classes for special styling

**Required JavaScript:**
```javascript
import { ViewPlugin, Decoration } from "@codemirror/view";
import { RangeSetBuilder } from "@codemirror/state";

const blockquoteDecoration = ViewPlugin.fromClass(
    class {
        decorations;
        constructor(view) {
            this.decorations = this.buildDecorations(view);
        }
        update(update) {
            if (update.docChanged || update.viewportChanged) {
                this.decorations = this.buildDecorations(update.view);
            }
        }
        buildDecorations(view) {
            const builder = new RangeSetBuilder();
            // Logic to detect blockquote boundaries
            // and add classes to first/last lines
            return builder.finish();
        }
    },
    { decorations: (v) => v.decorations }
);
```

**CSS that could be used:**
```css
/* First line of blockquote */
.cm-line-blockquote-first {
    border-top-left-radius: var(--primidian-blockquote-radius);
    border-top-right-radius: var(--primidian-blockquote-radius);
}

/* Last line of blockquote */
.cm-line-blockquote-last {
    border-bottom-left-radius: var(--primidian-blockquote-radius);
    border-bottom-right-radius: var(--primidian-blockquote-radius);
}

/* Top bar on first line only */
.cm-line-blockquote-first .HyperMD-quote::before {
    display: block;
}

/* Bottom bar on last line only */
.cm-line-blockquote-last .HyperMD-quote::after {
    display: block;
}
```

**Limitations:**
- Requires a plugin (themes cannot register CodeMirror extensions)
- Still per-line backgrounds (CSS cannot merge them)
- Plugin must be maintained alongside the theme
- May not work on mobile Obsidian (different editor)

### 5.2 Option B: Simplified Visual Treatment

**How it works:**
Accept that Live Preview cannot have a continuous container, and design a blockquote treatment that works per-line without creating the "stack of boxes" artifact.

**Principles:**
1. No decorative bars that repeat per line
2. No border radius on individual lines
3. Subtle background that reads as a continuous region
4. Left accent border that reads as continuous (border-left on each line creates a visual vertical line)

**CSS:**
```css
/* Per-line background, no decorative bars */
.markdown-source-view.mod-cm6 .HyperMD-quote {
    background-color: var(--primidian-quote-bg);
    border-left: var(--primidian-quote-border-width) solid var(--primidian-quote-border-color);
    padding: 0.2em 0.5em;
    box-decoration-break: clone;
    -webkit-box-decoration-break: clone;
}

/* No pseudo-elements for bars */
.markdown-source-view.mod-cm6 .HyperMD-quote::before,
.markdown-source-view.mod-cm6 .HyperMD-quote::after {
    display: none;
}
```

**Result:** Live Preview blockquotes would have a continuous-looking left accent and background, but no top/bottom bars or border radius. This is similar to the "Simple" preset but with background.

**Trade-off:** Loss of decorative bars and border radius in Live Preview.

### 5.3 Option C: Hybrid Approach

**How it works:**
Use a simplified treatment for most elements, but preserve the left accent and background. Accept that top/bottom bars and border radius are Reading Mode-only features.

**CSS:**
```css
/* Continuous background and left accent */
.markdown-source-view.mod-cm6 .HyperMD-quote {
    background-color: var(--primidian-quote-bg);
    border-left: var(--primidian-quote-border-width) solid var(--primidian-quote-border-color);
    padding: 0.2em 0.5em;
    box-decoration-break: clone;
    -webkit-box-decoration-break: clone;
}

/* Bars disabled in Live Preview (Reading Mode only) */
.markdown-source-view.mod-cm6 .HyperMD-quote::before,
.markdown-source-view.mod-cm6 .HyperMD-quote::after {
    display: none;
}

/* Nested quotes: transparent background, muted accent */
.markdown-source-view.mod-cm6 .HyperMD-quote-2,
.markdown-source-view.mod-cm6 .HyperMD-quote-3,
.markdown-source-view.mod-cm6 .HyperMD-quote-4 {
    background-color: transparent;
    border-left-color: var(--primidian-accent-muted);
}
```

**Result:**
- Reading Mode: Full decorative treatment (bars, radius, background)
- Live Preview: Simplified treatment (background + left accent, no bars, no radius)
- No per-line horizontal separators
- No "stack of boxes" artifact

---

## 6. Recommendation

### 6.1 Recommended Approach: Option C (Hybrid)

This approach:
1. ✅ Eliminates per-line horizontal separators
2. ✅ Creates a continuous-looking left accent (border-left on each line reads as one vertical line)
3. ✅ Creates a continuous-looking background (subtle color, no harsh boundaries)
4. ✅ Preserves Reading Mode exactly
5. ✅ Works within CSS's constraints
6. ✅ Requires no JavaScript
7. ✅ Maintains all four presets (bars are simply disabled in Live Preview)
8. ✅ Preserves nested quote hierarchy

### 6.2 What Is Lost in Live Preview

| Feature | Reading Mode | Live Preview |
|---------|-------------|--------------|
| Background | ✓ | ✓ |
| Left accent | ✓ | ✓ |
| Top bar | ✓ (Fade preset) | ✗ (disabled) |
| Bottom bar | ✓ (Fade preset) | ✗ (disabled) |
| Border radius | ✓ | ✗ (not possible on inline elements) |
| Box border | ✓ (Boxy preset) | ✗ (not possible per-line) |

### 6.3 What Is Gained

- No per-line horizontal separators
- No "stack of boxes" artifact
- Clean, maintainable CSS
- No JavaScript dependency
- Works on all platforms

---

## 7. Implementation Plan

### 7.1 Files to Modify

| File | Changes |
|------|---------|
| `src/components/57-blockquotes.css` | Disable pseudo-elements in Live Preview |
| `src/systems/82-glow.css` | Adjust glow selectors if needed |

### 7.2 Specific Changes

**In `src/components/57-blockquotes.css`:**

```css
/* Live Preview: simplified treatment (no per-line decorations) */
.markdown-source-view.mod-cm6 .HyperMD-quote {
    background-color: var(--primidian-quote-bg);
    border-left: var(--primidian-quote-border-width) solid var(--primidian-quote-border-color);
    border: var(--primidian-quote-box-border-width) solid var(--primidian-quote-border-color);
    padding: 0.2em 0.5em;
    box-decoration-break: clone;
    -webkit-box-decoration-break: clone;
    border-radius: 0;
}

/* Disable gradient bars in Live Preview (Reading Mode only) */
.markdown-source-view.mod-cm6 .HyperMD-quote::before,
.markdown-source-view.mod-cm6 .HyperMD-quote::after {
    display: none;
}
```

### 7.3 Preset Impact

| Preset | Reading Mode | Live Preview |
|--------|-------------|--------------|
| Simple | Background only | Background only |
| Boxy | Background + box border | Background + left accent (box border disabled) |
| Minimal | Background + left accent | Background + left accent |
| Fade | Background + left accent + bars | Background + left accent (bars disabled) |

---

## 8. Alternative: Plugin-Based Solution

If the user requires full visual parity (including bars and radius in Live Preview), a CodeMirror plugin is required. This would:

1. Create a plugin that registers a CodeMirror extension
2. The extension detects blockquote boundaries using the syntax tree
3. It adds classes to first/last lines (e.g., `cm-blockquote-first`, `cm-blockquote-last`)
4. CSS targets these classes for special styling

**This is NOT recommended because:**
- Themes cannot register CodeMirror extensions (only plugins can)
- Requires users to install a separate plugin
- Increases maintenance burden
- May not work on mobile Obsidian
- Future Obsidian updates could break the decoration API

---

## 9. Conclusion

**CSS alone cannot create a continuous visual container across multiple `.cm-line` elements.** This is a fundamental limitation of the CSS box model, not a missing feature or technique.

The recommended approach is a **hybrid solution** that:
- Preserves Reading Mode exactly
- Uses a simplified treatment in Live Preview (background + left accent, no bars, no radius)
- Eliminates per-line horizontal separators entirely
- Requires no JavaScript
- Works within CSS's constraints

This is the closest visually faithful CSS-only solution that does not create the rejected "per-line separator" artifact.

---

## 10. Appendices

### Appendix A: CSS Techniques Evaluated

| Technique | Status | Reason |
|-----------|--------|--------|
| `box-decoration-break: clone` | ❌ Insufficient | Creates per-line boxes |
| Sibling selectors (`+`, `~`) | ❌ Insufficient | `.HyperMD-quote` not siblings across lines |
| `:has()` | ❌ Banned | PR-6/I-10 restriction |
| `sibling-index()` / `sibling-count()` | ❌ Insufficient | Not siblings across lines |
| Negative margins | ❌ Banned | User restriction |
| Pseudo-elements on `.cm-content` | ❌ Insufficient | Cannot calculate positions |
| `box-shadow` spread | ❌ Insufficient | Bleeds into other content |
| CSS Grid/Flexbox | ❌ Insufficient | Breaks CodeMirror layout |
| `outline` | ❌ Insufficient | Per-element only |
| CSS Anchor Positioning | ❌ Insufficient | Does not group elements |
| `display: block` on `.HyperMD-quote` | ❌ Failed | Breaks CodeMirror |

### Appendix B: CodeMirror 6 Blockquote DOM Reference

```
.cm-editor
├── .cm-scroller
│   └── .cm-content
│       ├── .cm-line (line 1)
│       │   ├── .cm-formatting-quote (">")
│       │   └── .HyperMD-quote.HyperMD-quote-1 ("text")
│       ├── .cm-line (line 2)
│       │   ├── .cm-formatting-quote (">")
│       │   └── .HyperMD-quote.HyperMD-quote-1 ("text")
│       └── .cm-line (line 3)
│           ├── .cm-formatting-quote (">")
│           └── .HyperMD-quote.HyperMD-quote-1 ("text")
```

**Key observations:**
- No element wraps all three `.cm-line` elements
- No class indicates "first line" or "last line" of blockquote
- `.HyperMD-quote` is always `display: inline`
- `.cm-line` is always `display: block`
