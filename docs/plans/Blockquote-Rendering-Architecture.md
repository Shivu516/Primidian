# Blockquote Rendering Architecture

> **Status:** Design complete — awaiting implementation approval
> **Date:** 2026-08-11
> **Depends on:** `Blockquote-Rendering-Forensics.md`

---

## 1. Design Goals

1. **Reading Mode is the source of truth** — its visual appearance is correct and must be preserved exactly.
2. **Live Preview must approximate Reading Mode** — perfect parity is impossible; the goal is visual consistency.
3. **No editor functionality sacrifice** — cursor, selection, wrapping, scrolling must remain stable.
4. **All four presets must work** — Simple, Boxy, Minimal, Fade.
5. **Glow Engine compatibility** — must not break existing glow behavior.
6. **No new `:has()` on `.cm-line`** — per PR-6/I-10.
7. **No negative margins** — per Obsidian theme guidance.
8. **No `display: block` on `.HyperMD-quote`** — breaks CodeMirror layout.

---

## 2. Architectural Decision: CSS-Only with Acceptable Approximation

### 2.1 Why Not CodeMirror Decorations?

CodeMirror decorations (line decorations, mark decorations, widgets) could theoretically paint a continuous background across multiple lines. However:

- **Requires JavaScript** — themes cannot register decorations; only plugins can.
- **Complexity** — would require a companion plugin or theme script.
- **Maintenance burden** — decorations must be updated on every document change.
- **Mobile incompatibility** — mobile Obsidian uses a different editor (CM5 or mobile-specific).
- **Risk** — future Obsidian updates could break the decoration API.

### 2.2 Why CSS-Only Is Sufficient

The visual discrepancy is primarily:
1. Gradient bars appearing on every line (instead of just top/bottom)
2. Border radius only on first/last lines (instead of the whole blockquote)
3. Background discontinuity between lines

These can be addressed with:
- Sibling selectors to hide bars on non-first/non-last lines
- Structural CSS to apply radius to first/last lines
- `box-decoration-break: clone` for background continuity

The result is a **visually consistent approximation** that is maintainable, performant, and compatible.

---

## 3. Target Architecture

### 3.1 Core Strategy: "Per-Line with Structural Selectors"

```
┌─────────────────────────────────────────────────────────────┐
│ .HyperMD-quote (first line)                                 │
│   ::before — top gradient bar (visible)                     │
│   ::after — bottom gradient bar (hidden)                    │
│   border-top-left-radius, border-top-right-radius           │
├─────────────────────────────────────────────────────────────┤
│ .HyperMD-quote (middle line)                                │
│   ::before — top gradient bar (hidden via sibling selector) │
│   ::after — bottom gradient bar (hidden)                    │
│   no border-radius                                          │
├─────────────────────────────────────────────────────────────┤
│ .HyperMD-quote (last line)                                  │
│   ::before — top gradient bar (hidden)                      │
│   ::after — bottom gradient bar (visible)                   │
│   border-bottom-left-radius, border-bottom-right-radius     │
└─────────────────────────────────────────────────────────────┘
```

### 3.2 Selector Strategy

#### First Line Detection
```css
/* A quote line that is NOT preceded by another quote line */
.HyperMD-quote:not(.HyperMD-quote + .HyperMD-quote) {
    /* First line styles */
}
```

**Problem:** This selector doesn't work because `.HyperMD-quote` elements are not direct siblings—they're in separate `.cm-line` containers.

**Alternative:** Use the absence of a preceding quote formatting:
```css
/* First line: .cm-formatting-quote that is NOT preceded by .HyperMD-quote */
.cm-line:not(:has(.HyperMD-quote)) + .cm-line .HyperMD-quote {
    /* First line */
}
```

**Problem:** Uses `:has()` on `.cm-line` — banned by PR-6/I-10.

**Revised Alternative:** Use the structural relationship:
```css
/* The first .cm-line in a sequence of quote lines */
.cm-line:has(.HyperMD-quote):not(:has(.cm-formatting-quote:first-child)) {
    /* This doesn't work either */
}
```

**Final Approach:** Accept that pure CSS cannot reliably detect first/last lines. Use the Obsidianite approach:
```css
/* Show top bar only on the first quote line (no preceding quote line) */
.HyperMD-quote::before {
    /* Default: visible */
}

/* Hide top bar on consecutive quote lines */
/* This works because .HyperMD-quote + .HyperMD-quote is valid within a single .cm-line when wrapped */
.HyperMD-quote + .HyperMD-quote::before {
    display: none;
}
```

**Limitation:** This only works for wrapped lines within a single `.cm-line`, not across `.cm-line` boundaries.

### 3.3 Revised Architecture: Accept Per-Line Bars

Given the CSS limitations, the recommended architecture is:

**Live Preview Treatment:**
- Each line gets a background (via `box-decoration-break: clone`)
- Each line gets a left border (continuous visual)
- Top/bottom bars appear on every line (accepted limitation)
- Border radius on all lines (simplified)
- Nested quotes use muted accent (transparent background)

**Reading Mode Treatment:**
- Unchanged (already correct)

**Result:** Live Preview will have a "striped" appearance with gradient bars on each line, but the overall blockquote will be visually distinct and consistent.

### 3.4 Alternative Architecture: Minimal Bars

If the per-line bars are unacceptable, the alternative is:

**Live Preview Treatment:**
- No top/bottom bars (disable for Live Preview)
- Each line gets a background
- Each line gets a left border
- Border radius on first/last lines (approximate via `.HyperMD-quote:first-of-type` — but this doesn't work across `.cm-line` boundaries)

**Result:** Live Preview becomes a simpler left-accent + background treatment, similar to the "Simple" preset but with background.

---

## 4. Recommended Architecture: "Continuous Background with Structural Bars"

### 4.1 Reading Mode (Unchanged)

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

/* Top bar */
.markdown-rendered blockquote:not(.callout)::before {
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

/* Bottom bar */
.markdown-rendered blockquote:not(.callout)::after {
    content: '';
    display: var(--primidian-quote-bar-display);
    position: absolute;
    bottom: 0;
    left: 0;
    height: 2px;
    width: 25%;
    background-image: linear-gradient(90deg, var(--primidian-quote-border-color), transparent);
    pointer-events: none;
}
```

### 4.2 Live Preview (Revised)

```css
/* Base: all quote lines */
.markdown-source-view.mod-cm6 .HyperMD-quote {
    position: relative;
    color: var(--primidian-quote-color);
    background-color: var(--primidian-quote-bg);
    font-style: var(--primidian-quote-style);
    border-left: var(--primidian-quote-border-width) solid var(--primidian-quote-border-color);
    border: var(--primidian-quote-box-border-width) solid var(--primidian-quote-border-color);
    margin-inline-start: 0;
    padding: 0.2em 0.5em;
    box-decoration-break: clone;
    -webkit-box-decoration-break: clone;
    border-radius: 0;
}

/* Top bar: visible on all lines (accepted limitation) */
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

/* Bottom bar: visible on all lines (accepted limitation) */
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

/* Nested quotes: transparent background, muted accent */
.markdown-source-view.mod-cm6 .HyperMD-quote-2,
.markdown-source-view.mod-cm6 .HyperMD-quote-3,
.markdown-source-view.mod-cm6 .HyperMD-quote-4 {
    background-color: transparent;
    border-left-color: var(--primidian-accent-muted);
}
```

### 4.3 Key Architectural Decisions

| Decision | Rationale |
|----------|-----------|
| Keep per-line bars | CSS cannot detect first/last line across `.cm-line` boundaries |
| `box-decoration-break: clone` | Ensures background is continuous across wrapped lines |
| `border-radius: 0` on lines | Cannot apply radius to inline elements reliably |
| Nested quotes transparent | Avoids compounding backgrounds |
| No `:has()` on `.cm-line` | Complies with PR-6/I-10 |
| No negative margins | Complies with Obsidian theme guidance |

---

## 5. Nested Blockquote Strategy

### 5.1 Reading Mode (Unchanged)

```css
.markdown-rendered blockquote:not(.callout) blockquote:not(.callout) {
    background-color: transparent;
    border-left-color: var(--primidian-accent-muted);
}

.markdown-rendered blockquote:not(.callout) blockquote:not(.callout)::before,
.markdown-rendered blockquote:not(.callout) blockquote:not(.callout)::after {
    display: none;
}
```

### 5.2 Live Preview

```css
/* Nested quote levels use muted accent and transparent background */
.markdown-source-view.mod-cm6 .HyperMD-quote-2,
.markdown-source-view.mod-cm6 .HyperMD-quote-3,
.markdown-source-view.mod-cm6 .HyperMD-quote-4 {
    background-color: transparent;
    border-left-color: var(--primidian-accent-muted);
}

/* Hide bars on nested quote lines */
.markdown-source-view.mod-cm6 .HyperMD-quote-2::before,
.markdown-source-view.mod-cm6 .HyperMD-quote-2::after,
.markdown-source-view.mod-cm6 .HyperMD-quote-3::before,
.markdown-source-view.mod-cm6 .HyperMD-quote-3::after,
.markdown-source-view.mod-cm6 .HyperMD-quote-4::before,
.markdown-source-view.mod-cm6 .HyperMD-quote-4::after {
    display: none;
}
```

---

## 6. Preset Strategy

### 6.1 Preset Impact on Live Preview

| Preset | Live Preview Effect |
|--------|---------------------|
| Simple | No bars, no box border, background + left accent only |
| Boxy | No bars, box border (all sides), background + left accent |
| Minimal | No bars, no box border, background + left accent |
| Fade | Bars on every line, no box border, background + left accent |

### 6.2 Preset Implementation

The presets are already implemented via CSS custom properties. The Live Preview architecture respects these tokens:

```css
--primidian-quote-bar-display: none | block;  /* Controls bars */
--primidian-quote-box-border-width: 0px | 1px;  /* Controls box border */
--primidian-quote-border-width: 0px | 3px;  /* Controls left accent */
```

---

## 7. Glow Engine Compatibility

### 7.1 Current Glow Selectors

```css
/* Automatic engine */
body:not(.primidian-glow-off).primidian-glow-borders .markdown-rendered blockquote:not(.callout),
body:not(.primidian-glow-off).primidian-glow-borders .markdown-source-view.mod-cm6 .HyperMD-quote:not(:has(+ .HyperMD-quote)) {
    box-shadow: inset var(--primidian-quote-border-width) 0 var(--primidian-glow-blur)
        calc(-1 * var(--primidian-quote-border-width))
        color-mix(in srgb, var(--primidian-quote-border-color) var(--primidian-glow-alpha), transparent);
}
```

### 7.2 Glow Compatibility Requirements

1. **`:has(+ .HyperMD-quote)` selector:** This detects the last line of a quote. It must be preserved.
2. **`:has()` usage:** This is on `.HyperMD-quote`, not `.cm-line`, so it's acceptable.
3. **Performance:** The `:has()` selector may cause performance issues with long quotes. Consider limiting glow to first/last lines only.

### 7.3 Recommended Glow Adjustment

```css
/* Apply glow to all quote lines, not just the last */
body:not(.primidian-glow-off).primidian-glow-borders .markdown-source-view.mod-cm6 .HyperMD-quote {
    box-shadow: inset var(--primidian-quote-border-width) 0 var(--primidian-glow-blur)
        calc(-1 * var(--primidian-quote-border-width))
        color-mix(in srgb, var(--primidian-quote-border-color) var(--primidian-glow-alpha), transparent);
}
```

**Rationale:** Applying glow to all lines is simpler and avoids the `:has()` selector. The visual effect is similar.

---

## 8. Performance Considerations

### 8.1 Selector Performance

| Selector | Performance Impact |
|----------|-------------------|
| `.HyperMD-quote` | Low — single class |
| `.HyperMD-quote::before` | Low — pseudo-element |
| `.HyperMD-quote + .HyperMD-quote` | Low — adjacent sibling |
| `.HyperMD-quote:not(:has(+ .HyperMD-quote))` | Medium — `:has()` on quote elements |

### 8.2 Rendering Performance

- `box-decoration-break: clone` — minimal impact, well-optimized in browsers
- `position: relative` on inline elements — minimal impact
- Pseudo-elements on inline elements — minimal impact

### 8.3 Recommendations

1. **Avoid `:has()` on `.cm-line`** — banned by PR-6/I-10.
2. **Limit `:has()` on `.HyperMD-quote`** — acceptable but monitor performance.
3. **No `transition: all`** — banned by build validation.
4. **No `contain` property** — unnecessary for this use case.

---

## 9. Obsidian Compatibility

### 9.1 Live Preview Compatibility

- Uses standard CodeMirror 6 classes (`.HyperMD-quote`, `.cm-line`)
- No modifications to CodeMirror's expected DOM structure
- No `display` changes to `.HyperMD-quote`
- No margin changes to `.cm-line`

### 9.2 Reading Mode Compatibility

- Uses `.markdown-rendered` scope (not `.markdown-preview-view`)
- Compatible with embeds, popovers, Canvas, and plugin-rendered content
- No changes needed

### 9.3 Mobile Compatibility

- Mobile Obsidian uses CM5 (older CodeMirror) for some features
- The CSS selectors used are compatible with both CM5 and CM6
- No mobile-specific overrides needed

---

## 10. Risk Assessment

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Per-line bars look inconsistent with Reading Mode | High | Medium | Accept as known limitation |
| `:has()` performance issues | Low | Low | Monitor, remove if needed |
| Future Obsidian changes break selectors | Low | Medium | Use standard CodeMirror classes |
| Nested quote visual discontinuity | Medium | Low | Transparent background for nested |
| Glow engine conflict | Low | Low | Test all glow modes |

---

## 11. Summary

The recommended architecture is a **CSS-only, per-line treatment** that:

1. **Preserves Reading Mode exactly** — no changes to block-level styling.
2. **Approximates in Live Preview** — per-line backgrounds, left accents, and bars.
3. **Supports all four presets** — via existing CSS custom properties.
4. **Maintains Glow Engine compatibility** — with minor selector adjustments.
5. **Avoids banned patterns** — no `:has()` on `.cm-line`, no negative margins, no `display: block` on `.HyperMD-quote`.

The known limitation is that gradient bars appear on every line in Live Preview, not just the top/bottom of the blockquote. This is an acceptable trade-off for a maintainable, CSS-only solution.
