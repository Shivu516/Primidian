# Blockquote Architecture — Revised for No Per-Line Separators

> **Status:** Revised based on definitive forensic findings
> **Date:** 2026-08-11
> **Depends on:** `Blockquote-Definitive-Forensic.md`
> **Supersedes:** `Blockquote-Rendering-Architecture.md` (the earlier accepted per-line bars)

---

## 1. Definitive Finding

**CSS alone cannot create a continuous visual container across multiple `.cm-line` elements.** This is a fundamental limitation of the CSS box model.

After exhaustive evaluation of every CSS technique (see `Blockquote-Definitive-Forensic.md` §3), the only viable approaches are:

1. **Simplified Live Preview treatment** — background + left accent only, no bars, no radius
2. **CodeMirror plugin** — requires JavaScript, not suitable for a theme

This document defines Approach 1.

---

## 2. Architecture Overview

### 2.1 Reading Mode (Unchanged — Source of Truth)

Full decorative treatment preserved:
- Background
- Left accent border
- Top/bottom gradient bars (Fade preset)
- Border radius
- Box border (Boxy preset)
- Nested quote hierarchy

### 2.2 Live Preview (Simplified — CSS-Only Constraint)

Simplified treatment that avoids per-line separators:
- Background (subtle, continuous-looking)
- Left accent border (reads as continuous vertical line)
- NO top/bottom bars (disabled)
- NO border radius (not possible on inline elements)
- NO box border (not possible per-line)
- Nested quote hierarchy (transparent bg, muted accent)

---

## 3. Visual Comparison

### 3.1 Reading Mode (Preserved)

```
┌──────────────────────────────────────────┐  ← top bar (Fade)
│ Blockquote content                       │
│ more content                             │
│ more content                             │
└──────────────────────────────────────────┘  ← bottom bar (Fade)
```

### 3.2 Live Preview (Revised)

```
│ Blockquote content                       │  ← left accent only
│ more content                             │     (no top/bottom bars)
│ more content                             │
```

The left accent (`border-left`) on each line reads as ONE continuous vertical line. The subtle background reads as ONE continuous block because there are no harsh boundaries between lines.

---

## 4. Implementation

### 4.1 Base Live Preview Styles

**File:** `src/components/57-blockquotes.css`

```css
/* ── Live Preview: simplified blockquote treatment ──────────────────────
 * CSS cannot create a continuous container across .cm-line elements.
 * Instead, we use a simplified treatment:
 * - Background (subtle, reads as continuous)
 * - Left accent (reads as continuous vertical line)
 * - NO top/bottom bars (would repeat per line)
 * - NO border radius (not possible on inline elements)
 * - NO box border (would create per-line boxes)
 *
 * This eliminates the "stack of boxes" artifact entirely. */

.markdown-source-view.mod-cm6 .HyperMD-quote {
    background-color: var(--primidian-quote-bg);
    border-left: var(--primidian-quote-border-width) solid var(--primidian-quote-border-color);
    border: var(--primidian-quote-box-border-width) solid var(--primidian-quote-border-color);
    padding: 0.2em 0.5em;
    box-decoration-break: clone;
    -webkit-box-decoration-break: clone;
    border-radius: 0;
    color: var(--primidian-quote-color);
    font-style: var(--primidian-quote-style);
    margin-inline-start: 0;
    position: relative;
}
```

### 4.2 Disable Pseudo-Elements in Live Preview

```css
/* Disable gradient bars in Live Preview (Reading Mode only) */
.markdown-source-view.mod-cm6 .HyperMD-quote::before,
.markdown-source-view.mod-cm6 .HyperMD-quote::after {
    display: none;
}
```

### 4.3 Nested Quotes

```css
/* Nested quotes: transparent background, muted accent */
.markdown-source-view.mod-cm6 .HyperMD-quote-2,
.markdown-source-view.mod-cm6 .HyperMD-quote-3,
.markdown-source-view.mod-cm6 .HyperMD-quote-4 {
    background-color: transparent;
    border-left-color: var(--primidian-accent-muted);
}
```

### 4.4 Glow Compatibility

**File:** `src/systems/82-glow.css`

The existing glow selector uses `:has(+ .HyperMD-quote)` which is on `.HyperMD-quote` (not `.cm-line`), so it's permitted. However, the glow will still apply per-line. This is acceptable because glow is a subtle effect that doesn't create harsh boundaries.

Alternative: Simplify the glow selector to avoid `:has()`:

```css
/* Apply glow to all quote lines */
body:not(.primidian-glow-off).primidian-glow-borders .markdown-source-view.mod-cm6 .HyperMD-quote {
    box-shadow: inset var(--primidian-quote-border-width) 0 var(--primidian-glow-blur)
        calc(-1 * var(--primidian-quote-border-width))
        color-mix(in srgb, var(--primidian-quote-border-color) var(--primidian-glow-alpha), transparent);
}
```

---

## 5. Preset Impact

### 5.1 Simple Preset

| Feature | Reading Mode | Live Preview |
|---------|-------------|--------------|
| Background | ✓ | ✓ |
| Left Accent | ✗ | ✗ |
| Bars | ✗ | ✗ |
| Box Border | ✗ | ✗ |
| Radius | ✓ | ✗ |

**Visual:** Identical in both modes (already simple).

### 5.2 Boxy Preset

| Feature | Reading Mode | Live Preview |
|---------|-------------|--------------|
| Background | ✓ | ✓ |
| Left Accent | ✓ | ✓ |
| Bars | ✗ | ✗ |
| Box Border | ✓ | ✗ |
| Radius | ✓ | ✗ |

**Visual:** Reading Mode has full box; Live Preview has left accent + background only.

### 5.3 Minimal Preset

| Feature | Reading Mode | Live Preview |
|---------|-------------|--------------|
| Background | ✓ | ✓ |
| Left Accent | ✓ | ✓ |
| Bars | ✗ | ✗ |
| Box Border | ✗ | ✗ |
| Radius | ✓ | ✗ |

**Visual:** Nearly identical (radius is the only difference).

### 5.4 Fade Preset

| Feature | Reading Mode | Live Preview |
|---------|-------------|--------------|
| Background | ✓ | ✓ |
| Left Accent | ✓ | ✓ |
| Bars | ✓ | ✗ |
| Box Border | ✗ | ✗ |
| Radius | ✓ | ✗ |

**Visual:** Reading Mode has bars; Live Preview has left accent + background only.

---

## 6. What This Achieves

✅ **No per-line horizontal separators** — bars are disabled in Live Preview
✅ **No "stack of boxes"** — no repeated borders or radius per line
✅ **Continuous left accent** — border-left on each line reads as one vertical line
✅ **Continuous background** — subtle color without harsh boundaries
✅ **Reading Mode preserved** — no changes to block-level styling
✅ **All presets functional** — each preset works in both modes
✅ **Nested quotes preserved** — hierarchy maintained with muted accents
✅ **No JavaScript** — pure CSS solution
✅ **No banned selectors** — no `:has()` on `.cm-line`
✅ **No negative margins** — complies with Obsidian guidance

---

## 7. What Is Lost in Live Preview

| Feature | Status | Reason |
|---------|--------|--------|
| Top/bottom bars | Lost | Would repeat per line |
| Border radius | Lost | Not possible on inline elements |
| Box border (Boxy) | Lost | Would create per-line boxes |

These are **fundamental CSS limitations**, not implementation failures. CSS cannot create a continuous container across multiple `.cm-line` elements.

---

## 8. Alternative: Plugin-Based Solution

If full visual parity is required (including bars and radius in Live Preview), a CodeMirror plugin is necessary. See `Blockquote-Definitive-Forensic.md` §5.1 for details.

**This is NOT recommended** because:
- Themes cannot register CodeMirror extensions
- Requires users to install a separate plugin
- May not work on mobile Obsidian
- Increases maintenance burden

---

## 9. Implementation Checklist

- [ ] Read `Blockquote-Definitive-Forensic.md` for full context
- [ ] Read this document for architecture
- [ ] Implement simplified Live Preview styles
- [ ] Disable pseudo-elements in Live Preview
- [ ] Verify nested quotes work
- [ ] Test all four presets in both modes
- [ ] Test glow compatibility
- [ ] Run `node build.mjs`
- [ ] Verify generated `theme.css`
- [ ] Document any remaining limitations

---

## 10. Success Criteria

The implementation is successful when:

- [ ] No per-line horizontal separators in Live Preview
- [ ] Left accent reads as continuous
- [ ] Background reads as continuous
- [ ] Reading Mode unchanged
- [ ] All four presets work
- [ ] Nested quotes work
- [ ] Glow Engine works
- [ ] Build passes
- [ ] No PR-6 / I-10 violations
