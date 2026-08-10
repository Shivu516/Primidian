# Glow System V2 — Implementation Roadmap

## Phase 1: Architecture & Token Preparation

### Goal
Prepare the token and settings architecture for the three engine modes.

### Tasks

1. **Add Glow Engine token** to `src/tokens/14-components.css`:
   ```css
   --primidian-glow-engine: automatic; /* automatic | text-shadow | drop-shadow */
   --primidian-glow-text-layers: 1;     /* 1-3 stacked text-shadows */
   --primidian-glow-drop-layers: 1;     /* 1-3 stacked drop-shadows */
   ```

2. **Add Glow Engine dropdown** to `src/01-settings.css`:
   - Setting: `primidian-glow-engine`
   - Type: `class-select`
   - Options: Automatic, Text Shadow, Drop Shadow
   - Default: Automatic

3. **Add layer controls** to `src/01-settings.css`:
   - `primidian-glow-text-layers` (1-3, default 1)
   - `primidian-glow-drop-layers` (1-3, default 1)

### Files Modified
- `src/tokens/14-components.css`
- `src/01-settings.css`

### Verification
- Build passes
- New settings appear in Style Settings
- Default values correct

---

## Phase 2: Text Shadow Enhancement

### Goal
Support stacked text-shadows for more convincing glow on text elements.

### Tasks

1. **Update text glow rules** in `src/systems/82-glow.css`:
   - Generate multiple `text-shadow` values based on `--primidian-glow-text-layers`
   - Layer 1: `0 0 var(--primidian-glow-blur) color`
   - Layer 2: Add `0 0 calc(var(--primidian-glow-blur) * 0.5) color`
   - Layer 3: Add `0 0 calc(var(--primidian-glow-blur) * 1.5) color`

2. **Targets affected**:
   - Headings (h1-h6)
   - Body text (p, li, td, th)
   - Links (hover)
   - Tags (hover)
   - Highlights
   - Bold text
   - Inline code (when added)

### Files Modified
- `src/systems/82-glow.css`

### Verification
- Text glow appears more pronounced
- Performance remains acceptable

---

## Phase 3: Drop Shadow Implementation

### Goal
Implement `filter: drop-shadow()` for UI elements and decorative shapes.

### Tasks

1. **Identify drop-shadow-safe targets**:
   - SVG icons
   - Buttons
   - Checkboxes
   - Toggles
   - Sliders
   - Inputs
   - Tabs
   - Sidebar items

2. **Identify drop-shadow-unsafe targets** (use box-shadow instead):
   - Tables (rectangular, box-shadow fine)
   - Blockquotes (rectangular container)
   - Dividers with pseudo-elements (glyph, caps)

3. **Add drop-shadow rules** in `src/systems/82-glow.css`:
   ```css
   body.primidian-glow-engine-drop-shadow .target {
       filter: drop-shadow(0 0 var(--primidian-glow-blur) color);
   }
   ```

4. **Handle stacked drop-shadows**:
   - Layer 1: `drop-shadow(0 0 blur color)`
   - Layer 2: `drop-shadow(0 0 calc(blur * 0.5) color)`
   - Layer 3: `drop-shadow(0 0 calc(blur * 1.5) color)`

### Files Modified
- `src/systems/82-glow.css`

### Verification
- Icons/shapes glow following their outline (no rectangular halo)
- No pseudo-element conflicts
- Performance acceptable

---

## Phase 4: Automatic/Dynamic Engine

### Goal
Implement intelligent per-target method selection.

### Tasks

1. **Define method mapping** in CSS custom properties:
   ```css
   --primidian-glow-method-headings: text-shadow;
   --primidian-glow-method-links: text-shadow;
   --primidian-glow-method-icons: drop-shadow;
   --primidian-glow-method-dividers: box-shadow;
   /* etc. */
   ```

2. **Implement conditional application**:
   - When `--primidian-glow-engine: automatic`, use per-target method
   - When `--primidian-glow-engine: text-shadow`, force all targets to text-shadow
   - When `--primidian-glow-engine: drop-shadow`, force all targets to drop-shadow

3. **Handle fallbacks**:
   - Targets that don't support drop-shadow (tables, blockquotes) fall back to box-shadow
   - Targets that don't support text-shadow (dividers) fall back to box-shadow

### Files Modified
- `src/systems/82-glow.css`
- `src/tokens/14-components.css`

### Verification
- Automatic mode selects correct method per target
- Manual modes override correctly
- No broken fallbacks

---

## Phase 5: Target-Specific Wiring

### Goal
Update each glow target to support all three engine modes.

### Tasks

For each of the 16 glow targets:
1. Add text-shadow variant
2. Add drop-shadow variant (where applicable)
3. Add box-shadow fallback
4. Handle pseudo-element conflicts
5. Verify Reading Mode selectors
6. Verify Live Preview selectors

### Target List
| # | Target | Text | Drop | Box |
|---|---|---|---|---|
| 1 | Text | ✓ | ✗ | fallback |
| 2 | Headings | ✓ | ✗ | fallback |
| 3 | Links | ✓ | ✗ | fallback |
| 4 | Tags | ✓ | ✗ | fallback |
| 5 | Highlights | ✓ | ✗ | fallback |
| 6 | Dividers | ✗ | ✓* | fallback |
| 7 | Tables | ✗ | ✗ | ✓ |
| 8 | Buttons | ✗ | ✓ | fallback |
| 9 | Checkboxes | ✗ | ✓ | fallback |
| 10 | Toggles | ✗ | ✓ | fallback |
| 11 | Sliders | ✗ | ✓ | fallback |
| 12 | Inputs | ✗ | ✓ | fallback |
| 13 | Tabs | ✗ | ✓ | fallback |
| 14 | Sidebar | ✗ | ✓ | fallback |
| 15 | Blockquote borders | ✗ | ✗ | ✓ |
| 16 | Code line numbers | ✓ | ✗ | fallback |

*Drop-shadow on dividers is problematic due to pseudo-elements. Use box-shadow on base + text-shadow on glyph.

### Files Modified
- `src/systems/82-glow.css`

### Verification
- Each target glows correctly in each engine mode
- No visual artifacts

---

## Phase 6: Gradient-Aware Handling

### Goal
Handle gradient elements gracefully.

### Tasks

1. **Document limitation**: Single-color glow cannot follow gradients
2. **Implement fallback**: Use first gradient color stop or accent color
3. **Optional pseudo-element glow** (future investigation):
   - For headings: `::before` with blurred gradient behind text
   - For dividers: enhanced `::before`/`::after` with gradient blur

### Files Modified
- `src/systems/82-glow.css` (if pseudo-element glow implemented)
- `docs/plans/Glow-System-V2-Overview.md` (documentation)

### Verification
- Gradient elements glow with dominant color
- No visual artifacts

---

## Phase 7: Reading Mode

### Goal
Verify all glow selectors work in Reading Mode.

### Tasks

1. **Audit Reading Mode selectors**:
   - `.markdown-rendered h1-h6` ✓
   - `.markdown-rendered p, li, td, th` ✓
   - `.markdown-rendered a` ✓
   - `.markdown-rendered a.tag` ✓
   - `.markdown-rendered mark` ✓
   - `.markdown-rendered hr` ✓
   - `.markdown-rendered table` ✓
   - `.markdown-rendered blockquote` ✓
   - `input[type='checkbox']` ✓
   - `button.mod-cta` ✓
   - `.checkbox-container` ✓
   - `input[type='range']` ✓
   - `input[type='text'], textarea, .dropdown` ✓
   - `.workspace-tab-header` ✓
   - `.nav-file-title, .tree-item-self` ✓

2. **Fix any missing selectors**

### Files Modified
- `src/systems/82-glow.css`

### Verification
- All targets glow in Reading Mode

---

## Phase 8: Live Preview

### Goal
Verify all glow selectors work in Live Preview.

### Tasks

1. **Audit Live Preview selectors**:
   - `.cm-header-1-6` ✓
   - `.cm-line` ✓
   - `.cm-hmd-internal-link, .cm-link` ✓
   - `.cm-hashtag` ✓
   - `.cm-highlight` ✓
   - `.cm-strong` ✓
   - `.cm-line hr` ✓
   - `.cm-table-widget table` ✓
   - `.HyperMD-quote` ✓
   - `.HyperMD-codeblock::before` ✓

2. **Handle `.HyperMD-quote` line grouping** (existing implementation):
   - First line: top border-radius + top padding
   - Middle lines: no decoration
   - Last line: bottom border-radius + bottom padding
   - Apply glow only to last line to avoid per-line glow bands

3. **Fix any missing selectors**

### Files Modified
- `src/systems/82-glow.css`

### Verification
- All targets glow in Live Preview
- No per-line glow bands on multi-line blockquotes

---

## Phase 9: Code Styler Compatibility

### Goal
Investigate and implement Code Styler compatibility.

### Tasks

1. **Obtain Code Styler source/reference** (if available)
2. **Identify Code Styler DOM structure**:
   - Code block containers
   - Line number elements
   - Header/flair elements
   - Language labels
   - Highlighted lines

3. **Add compatibility selectors** for:
   - Code Styler line numbers
   - Code Styler code blocks
   - Code Styler headers

4. **Preserve native Obsidian selectors** (don't break native blocks)

### Files Modified
- `src/systems/82-glow.css` (add compatibility selectors)
- `src/compat/96-compat-code-styler.css` (new, if needed)

### Verification
- Code Styler code blocks styled correctly
- Native code blocks still work
- Line number glow works with Code Styler (if applicable)

---

## Phase 10: Performance Optimization

### Goal
Ensure Glow System V2 performs well on all devices.

### Tasks

1. **Add mobile safeguards**:
   - Reduce default blur on mobile
   - Limit stacked shadows on mobile
   - Disable pulse animation on mobile (or reduce)

2. **Add `will-change` hints** (sparingly):
   - Only on elements with animated glow

3. **Avoid universal selectors**:
   - Never use `*` for glow
   - Always target specific elements

4. **Test performance**:
   - Large documents with many glowing elements
   - Long code blocks
   - Large tables
   - Many checkboxes

### Files Modified
- `src/systems/82-glow.css`

### Verification
- No jank on mobile
- No excessive GPU usage
- Smooth scrolling with many glowing elements

---

## Phase 11: Regression Testing

### Goal
Ensure no existing functionality is broken.

### Test Matrix

| Feature | Reading Mode | Live Preview |
|---|---|---|
| Blockquote presets (4) | ✓ | ✓ |
| Divider styles (5) | ✓ | ✓ |
| Tab animations | ✓ | ✓ |
| Code blocks | ✓ | ✓ |
| Checkboxes | ✓ | ✓ |
| Gradients | ✓ | ✓ |
| Inline code | ✓ | ✓ |
| Headings | ✓ | ✓ |
| Links | ✓ | ✓ |
| Tags | ✓ | ✓ |
| Highlights | ✓ | ✓ |
| Tables | ✓ | ✓ |

### Files Modified
- None (testing only)

### Verification
- All features work as before
- No visual regressions

---

## Phase 12: Documentation

### Goal
Document Glow System V2 for users and developers.

### Tasks

1. **Update README.md**:
   - Explain three engine modes
   - Explain Automatic/Dynamic behavior
   - Document gradient glow limitations
   - Document performance considerations
   - Document Code Styler compatibility

2. **Update docs/15-v1.1-feature-pass.md** (or create new doc):
   - Document V2 implementation details
   - Document architectural decisions

### Files Modified
- `README.md`
- `docs/15-v1.1-feature-pass.md`

### Verification
- Documentation is accurate and complete

---

## Dependencies

```
Phase 1 (tokens)
    ↓
Phase 2 (text-shadow) ←→ Phase 3 (drop-shadow)
    ↓                           ↓
Phase 4 (automatic engine)
    ↓
Phase 5 (target wiring)
    ↓
Phase 6 (gradient handling)
    ↓
Phase 7 (Reading Mode) ←→ Phase 8 (Live Preview)
    ↓
Phase 9 (Code Styler)
    ↓
Phase 10 (performance)
    ↓
Phase 11 (regression)
    ↓
Phase 12 (documentation)
```

---

## Estimated Effort

| Phase | Effort | Risk |
|---|---|---|
| 1 | Low | Low |
| 2 | Low | Low |
| 3 | Medium | Medium |
| 4 | High | Medium |
| 5 | High | Medium |
| 6 | Medium | Low |
| 7 | Low | Low |
| 8 | Medium | Medium |
| 9 | Medium | High |
| 10 | Low | Low |
| 11 | High | Low |
| 12 | Low | Low |

---

## Success Criteria

- [ ] Three engine modes work correctly
- [ ] Automatic mode selects appropriate method per target
- [ ] No rectangular glow artifacts on icons/SVGs
- [ ] Gradient elements glow with dominant color
- [ ] All 16 targets work in all three modes
- [ ] Reading Mode works completely
- [ ] Live Preview works completely
- [ ] Code Styler compatible (if applicable)
- [ ] Performance acceptable on mobile
- [ ] No regressions in existing functionality
- [ ] Documentation complete
