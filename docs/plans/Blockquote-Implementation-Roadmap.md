# Blockquote Implementation Roadmap

> **Status:** Ready for implementation
> **Date:** 2026-08-11
> **Depends on:** `Blockquote-Rendering-Architecture.md`

---

## Overview

This roadmap provides a phased approach to implementing the blockquote rendering fix. Each phase includes specific steps, verification procedures, and rollback instructions.

**Estimated effort:** 2-3 hours for all phases
**Risk level:** Low — changes are scoped to blockquote CSS only

---

## Phase 1: Baseline and Backup

### Goal
Establish a clean baseline before making changes.

### Steps

1. **Build the current theme:**
   ```bash
   node build.mjs --check
   ```
   Verify the build passes with no errors.

2. **Create a backup of the current blockquote CSS:**
   ```bash
   Copy-Item "src\components\57-blockquotes.css" "references\backup-57-blockquotes.css"
   ```

3. **Document current visual state:**
   - Take screenshots of blockquotes in both modes
   - Record the four presets in both modes
   - Test nested quotes in both modes

### Verification
- Build passes
- Backup file exists
- Screenshots captured

### Rollback
Restore from backup if needed.

---

## Phase 2: Remove/Revert Problematic Experimental Rules

### Goal
Clean up any experimental rules that may have been added during previous investigations.

### Steps

1. **Search for experimental rules:**
   ```bash
   Select-String -Path "src\components\57-blockquotes.css" -Pattern "top: calc|bottom: 0|display: block"
   ```

2. **Remove or comment out any experimental rules found.**

3. **Verify the build still passes:**
   ```bash
   node build.mjs --check
   ```

### Verification
- No experimental rules remain
- Build passes

### Rollback
Restore from backup.

---

## Phase 3: Implement Structural Live Preview Solution

### Goal
Apply the revised Live Preview architecture.

### Steps

#### 3.1 Update Base Quote Line Styles

**File:** `src/components/57-blockquotes.css`

Replace:
```css
/* All quote lines: inline background + left accent + padding */
.markdown-source-view.mod-cm6 .HyperMD-quote {
    background-color: var(--primidian-quote-bg);
    border-left: var(--primidian-quote-border-width) solid var(--primidian-quote-border-color);
    padding: 0.2em 0.5em;
    box-decoration-break: clone;
    -webkit-box-decoration-break: clone;
    border-radius: 0;
}
```

With:
```css
/* All quote lines: inline background + left accent + padding */
.markdown-source-view.mod-cm6 .HyperMD-quote {
    position: relative;
    color: var(--primidian-quote-color);
    background-color: var(--primidian-quote-bg);
    font-style: var(--primidian-quote-style);
    border: var(--primidian-quote-box-border-width) solid var(--primidian-quote-border-color);
    border-left: var(--primidian-quote-border-width) solid var(--primidian-quote-border-color);
    margin-inline-start: 0;
    padding: 0.2em 0.5em;
    box-decoration-break: clone;
    -webkit-box-decoration-break: clone;
    border-radius: 0;
}
```

#### 3.2 Update Pseudo-Element Styles

**File:** `src/components/57-blockquotes.css`

Replace:
```css
/* Live Preview: gradient bars on all lines (inline pseudo-elements) */
.markdown-source-view.mod-cm6 .HyperMD-quote::before {
    content: '';
    display: var(--primidian-quote-bar-display);
    position: absolute;
    top: 0;
    left: 0;
    height: 2px;
    width: 55%;
    background-image: linear-gradient(
        90deg,
        var(--primidian-quote-border-color),
        transparent
    );
    pointer-events: none;
}

.markdown-source-view.mod-cm6 .HyperMD-quote::after {
    content: '';
    display: var(--primidian-quote-bar-display);
    position: absolute;
    bottom: 0;
    left: 0;
    height: 1px;
    width: 25%;
    background-image: linear-gradient(
        90deg,
        var(--primidian-quote-border-color),
        transparent
    );
    pointer-events: none;
}
```

With:
```css
/* Live Preview: gradient bars on all lines (accepted limitation) */
.markdown-source-view.mod-cm6 .HyperMD-quote::before {
    content: '';
    display: var(--primidian-quote-bar-display);
    position: absolute;
    top: 0;
    left: 0;
    height: 2px;
    width: 55%;
    background-image: linear-gradient(
        90deg,
        var(--primidian-quote-border-color),
        transparent
    );
    pointer-events: none;
}

.markdown-source-view.mod-cm6 .HyperMD-quote::after {
    content: '';
    display: var(--primidian-quote-bar-display);
    position: absolute;
    bottom: 0;
    left: 0;
    height: 2px;
    width: 25%;
    background-image: linear-gradient(
        90deg,
        var(--primidian-quote-border-color),
        transparent
    );
    pointer-events: none;
}
```

#### 3.3 Update Nested Quote Styles

**File:** `src/components/57-blockquotes.css`

Replace:
```css
/* Live Preview: nested quotes use muted accent and transparent background */
.markdown-source-view.mod-cm6 .HyperMD-quote-2,
.markdown-source-view.mod-cm6 .HyperMD-quote-3,
.markdown-source-view.mod-cm6 .HyperMD-quote-4 {
    background-color: transparent;
    border-left-color: var(--primidian-accent-muted);
}
```

With:
```css
/* Live Preview: nested quotes use muted accent and transparent background */
.markdown-source-view.mod-cm6 .HyperMD-quote-2,
.markdown-source-view.mod-cm6 .HyperMD-quote-3,
.markdown-source-view.mod-cm6 .HyperMD-quote-4 {
    background-color: transparent;
    border-left-color: var(--primidian-accent-muted);
}

/* Hide bars on nested quote levels */
.markdown-source-view.mod-cm6 .HyperMD-quote-2::before,
.markdown-source-view.mod-cm6 .HyperMD-quote-2::after,
.markdown-source-view.mod-cm6 .HyperMD-quote-3::before,
.markdown-source-view.mod-cm6 .HyperMD-quote-3::after,
.markdown-source-view.mod-cm6 .HyperMD-quote-4::before,
.markdown-source-view.mod-cm6 .HyperMD-quote-4::after {
    display: none;
}
```

### Verification
```bash
node build.mjs --check
```
- Build passes
- No new warnings

### Rollback
Restore from backup.

---

## Phase 4: Match Reading Mode Geometry

### Goal
Ensure Live Preview geometry matches Reading Mode as closely as possible.

### Steps

#### 4.1 Verify Token Consistency

Confirm that the same tokens are used in both modes:

| Token | Reading Mode | Live Preview |
|-------|-------------|--------------|
| `--primidian-quote-color` | ✓ | ✓ |
| `--primidian-quote-bg` | ✓ | ✓ |
| `--primidian-quote-border-color` | ✓ | ✓ |
| `--primidian-quote-border-width` | ✓ | ✓ |
| `--primidian-quote-box-border-width` | ✓ | ✓ |
| `--primidian-quote-bar-display` | ✓ | ✓ |

#### 4.2 Adjust Padding if Needed

If Live Preview padding differs from Reading Mode, consider:

```css
/* Live Preview: match Reading Mode padding where possible */
.markdown-source-view.mod-cm6 .HyperMD-quote {
    padding: 0.2em 0.5em; /* Current — may need adjustment */
}
```

**Note:** Reading Mode uses `var(--primidian-quote-padding)` which is `var(--primidian-space-3) var(--primidian-space-5)`. Live Preview uses fixed `0.2em 0.5em` because padding on inline elements behaves differently.

### Verification
- Visual comparison of both modes
- Padding appears consistent

### Rollback
Restore from backup.

---

## Phase 5: Nested Blockquotes

### Goal
Ensure nested blockquotes render correctly in both modes.

### Steps

#### 5.1 Test Nested Structures

Test the following markdown:

```markdown
> Outer quote
> Second line of outer
>
> > Nested quote
> > Second line of nested
>
> > > Deeply nested
```

#### 5.2 Verify Visual Hierarchy

- Outer quote: full background, accent border
- Nested quote: transparent background, muted accent
- Deeply nested: transparent background, muted accent

#### 3.3 Adjust if Needed

If nested quotes don't look right, adjust:

```css
/* Ensure nested quotes are clearly de-emphasized */
.markdown-source-view.mod-cm6 .HyperMD-quote-2 {
    background-color: transparent;
    border-left-color: var(--primidian-accent-muted);
}
```

### Verification
- Nested quotes are visually distinct
- No compounding backgrounds
- Bars hidden on nested levels

### Rollback
Restore from backup.

---

## Phase 6: All Four Presets

### Goal
Verify all four presets work correctly in both modes.

### Steps

#### 6.1 Test Each Preset

For each preset (Simple, Boxy, Minimal, Fade):

1. Select the preset in Style Settings
2. Verify Reading Mode appearance
3. Verify Live Preview appearance
4. Compare for consistency

#### 6.2 Preset-Specific Adjustments

**Simple Preset:**
- No bars, no box border
- Background + left accent only
- Should be consistent between modes

**Boxy Preset:**
- No bars, box border (all sides)
- Background + left accent + box border
- Box border may appear per-line in Live Preview (accepted limitation)

**Minimal Preset:**
- No bars, no box border
- Background + left accent
- Should be consistent between modes

**Fade Preset:**
- Bars on every line (Live Preview)
- Bars on top/bottom only (Reading Mode)
- This is the known limitation

### Verification
- All presets work in both modes
- Visual differences are acceptable

### Rollback
Restore from backup.

---

## Phase 7: Glow Compatibility

### Goal
Ensure the Glow Engine works correctly with the new blockquote architecture.

### Steps

#### 7.1 Test Glow Modes

For each glow mode (Off, Text Shadow, Drop Shadow, Automatic):

1. Enable glow for blockquotes
2. Verify glow appears on blockquotes
3. Verify no visual artifacts

#### 7.2 Adjust Glow Selectors if Needed

If the glow selector `.HyperMD-quote:not(:has(+ .HyperMD-quote))` causes issues:

```css
/* Simplified glow selector — apply to all quote lines */
body:not(.primidian-glow-off).primidian-glow-borders .markdown-source-view.mod-cm6 .HyperMD-quote {
    box-shadow: inset var(--primidian-quote-border-width) 0 var(--primidian-glow-blur)
        calc(-1 * var(--primidian-quote-border-width))
        color-mix(in srgb, var(--primidian-quote-border-color) var(--primidian-glow-alpha), transparent);
}
```

**File:** `src/systems/82-glow.css`

Update the blockquote glow selectors to match.

### Verification
- Glow appears on blockquotes
- No visual artifacts
- Performance is acceptable

### Rollback
Restore from backup.

---

## Phase 8: Dark Mode

### Goal
Verify blockquotes work correctly in dark mode.

### Steps

1. Switch to dark mode
2. Test all four presets
3. Test nested quotes
4. Test glow modes
5. Compare Reading Mode and Live Preview

### Verification
- All features work in dark mode
- Colors are correct (using theme-scoped tokens)

### Rollback
Restore from backup.

---

## Phase 9: Light Mode

### Goal
Verify blockquotes work correctly in light mode.

### Steps

1. Switch to light mode
2. Test all four presets
3. Test nested quotes
4. Test glow modes
5. Compare Reading Mode and Live Preview

### Verification
- All features work in light mode
- Colors are correct (using theme-scoped tokens)

### Rollback
Restore from backup.

---

## Phase 10: Regression Testing

### Goal
Ensure no regressions in other components or features.

### Steps

10.1 **Run full build:**
    ```bash
    node build.mjs
    ```

10.2 **Test related components:**
    - Callouts (should not be affected)
    - Lists (should not be affected)
    - Code blocks (should not be affected)
    - Tables (should not be affected)

10.3 **Test edge cases:**
    - Empty blockquotes
    - Very long blockquotes
    - Blockquotes with only whitespace
    - Blockquotes followed by other blockquotes
    - Blockquotes in lists
    - Blockquotes in callouts

10.4 **Test mobile:**
    - Verify blockquotes render on mobile
    - Check for any mobile-specific issues

### Verification
- Build passes
- No regressions in other components
- Edge cases handled

### Rollback
Restore from backup.

---

## Implementation Checklist

- [ ] Phase 1: Baseline and backup
- [ ] Phase 2: Remove experimental rules
- [ ] Phase 3: Implement structural Live Preview solution
- [ ] Phase 4: Match Reading Mode geometry
- [ ] Phase 5: Nested blockquotes
- [ ] Phase 6: All four presets
- [ ] Phase 7: Glow compatibility
- [ ] Phase 8: Dark mode
- [ ] Phase 9: Light mode
- [ ] Phase 10: Regression testing

---

## Files to Modify

| File | Changes |
|------|---------|
| `src/components/57-blockquotes.css` | Main blockquote styles |
| `src/systems/82-glow.css` | Glow engine blockquote selectors |

## Files NOT to Modify

| File | Reason |
|------|--------|
| `src/tokens/14-components.css` | Tokens are already correct |
| `src/variants/72-variants-scaffold.css` | Preset definitions are correct |
| `src/01-settings.css` | Settings are correct |
| `theme.css` | Build output — never edit directly |
| `manifest.json` | No changes needed |

---

## Success Criteria

1. Reading Mode blockquotes look exactly as before
2. Live Preview blockquotes are visually consistent with Reading Mode
3. All four presets work in both modes
4. Nested quotes render correctly
5. Glow Engine works correctly
6. No regressions in other components
7. Build passes with no errors
8. Mobile rendering is correct
