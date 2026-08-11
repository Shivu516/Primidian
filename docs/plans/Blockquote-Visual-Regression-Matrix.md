# Blockquote Visual Regression Matrix

> **Status:** Ready for use during implementation
> **Date:** 2026-08-11
> **Purpose:** Comprehensive test matrix for verifying blockquote rendering

---

## 1. Test Matrix Overview

### 1.1 Dimensions

| Dimension | Values |
|-----------|--------|
| **Mode** | Reading Mode, Live Preview |
| **Preset** | Simple, Boxy, Minimal, Fade |
| **Structure** | Single line, Two lines, Four lines, Long wrapped, Nested, Deeply nested, Mixed nesting, Blank lines |
| **Theme** | Dark, Light |
| **Glow** | Off, Text Shadow, Drop Shadow, Automatic |
| **Content** | Plain text, Bold, Italic, Links, Inline code, Lists, Headings |

### 1.2 Total Combinations

2 modes × 4 presets × 8 structures × 2 themes × 4 glow modes × 7 content types = **3,584 combinations**

**Note:** Not all combinations need manual testing. Focus on the high-value combinations listed below.

---

## 2. Priority Test Cases

### 2.1 Critical (Must Pass)

| # | Mode | Preset | Structure | Theme | Glow | Content |
|---|------|--------|-----------|-------|------|---------|
| 1 | Reading | Fade | Single line | Dark | Off | Plain text |
| 2 | Live Preview | Fade | Single line | Dark | Off | Plain text |
| 3 | Reading | Fade | Two lines | Dark | Off | Plain text |
| 4 | Live Preview | Fade | Two lines | Dark | Off | Plain text |
| 5 | Reading | Fade | Four lines | Dark | Off | Plain text |
| 6 | Live Preview | Fade | Four lines | Dark | Off | Plain text |
| 7 | Reading | Fade | Nested | Dark | Off | Plain text |
| 8 | Live Preview | Fade | Nested | Dark | Off | Plain text |
| 9 | Reading | Simple | Single line | Dark | Off | Plain text |
| 10 | Live Preview | Simple | Single line | Dark | Off | Plain text |
| 11 | Reading | Boxy | Single line | Dark | Off | Plain text |
| 12 | Live Preview | Boxy | Single line | Dark | Off | Plain text |
| 13 | Reading | Minimal | Single line | Dark | Off | Plain text |
| 14 | Live Preview | Minimal | Single line | Dark | Off | Plain text |
| 15 | Reading | Fade | Single line | Light | Off | Plain text |
| 16 | Live Preview | Fade | Single line | Light | Off | Plain text |
| 17 | Reading | Fade | Nested | Light | Off | Plain text |
| 18 | Live Preview | Fade | Nested | Light | Off | Plain text |

### 2.2 High (Should Pass)

| # | Mode | Preset | Structure | Theme | Glow | Content |
|---|------|--------|-----------|-------|------|---------|
| 19 | Reading | Fade | Long wrapped | Dark | Off | Plain text |
| 20 | Live Preview | Fade | Long wrapped | Dark | Off | Plain text |
| 21 | Reading | Fade | Deeply nested | Dark | Off | Plain text |
| 22 | Live Preview | Fade | Deeply nested | Dark | Off | Plain text |
| 23 | Reading | Fade | Mixed nesting | Dark | Off | Plain text |
| 24 | Live Preview | Fade | Mixed nesting | Dark | Off | Plain text |
| 25 | Reading | Fade | Blank lines | Dark | Off | Plain text |
| 26 | Live Preview | Fade | Blank lines | Dark | Off | Plain text |
| 27 | Reading | Fade | Single line | Dark | Text Shadow | Plain text |
| 28 | Live Preview | Fade | Single line | Dark | Text Shadow | Plain text |
| 29 | Reading | Fade | Single line | Dark | Drop Shadow | Plain text |
| 30 | Live Preview | Fade | Single line | Dark | Drop Shadow | Plain text |
| 31 | Reading | Fade | Single line | Dark | Automatic | Plain text |
| 32 | Live Preview | Fade | Single line | Dark | Automatic | Plain text |
| 33 | Reading | Fade | Nested | Dark | Automatic | Plain text |
| 34 | Live Preview | Fade | Nested | Dark | Automatic | Plain text |

### 2.3 Medium (Nice to Pass)

| # | Mode | Preset | Structure | Theme | Glow | Content |
|---|------|--------|-----------|-------|------|---------|
| 35 | Reading | Simple | Nested | Dark | Off | Plain text |
| 36 | Live Preview | Simple | Nested | Dark | Off | Plain text |
| 37 | Reading | Boxy | Nested | Dark | Off | Plain text |
| 38 | Live Preview | Boxy | Nested | Dark | Off | Plain text |
| 39 | Reading | Minimal | Nested | Dark | Off | Plain text |
| 40 | Live Preview | Minimal | Nested | Dark | Off | Plain text |
| 41 | Reading | Fade | Single line | Dark | Off | Bold |
| 42 | Live Preview | Fade | Single line | Dark | Off | Bold |
| 43 | Reading | Fade | Single line | Dark | Off | Italic |
| 44 | Live Preview | Fade | Single line | Dark | Off | Italic |
| 45 | Reading | Fade | Single line | Dark | Off | Links |
| 46 | Live Preview | Fade | Single line | Dark | Off | Links |
| 47 | Reading | Fade | Single line | Dark | Off | Inline code |
| 48 | Live Preview | Fade | Single line | Dark | Off | Inline code |
| 49 | Reading | Fade | Single line | Dark | Off | Lists |
| 50 | Live Preview | Fade | Single line | Dark | Off | Lists |

---

## 3. Detailed Test Cases

### 3.1 Structure Test Cases

#### Case 1: Single Line
```markdown
> This is a single line quote.
```

**Expected (Reading Mode):**
- Background: `--primidian-quote-bg`
- Left border: `--primidian-quote-border-width` solid `--primidian-quote-border-color`
- Top bar: visible (if Fade preset)
- Bottom bar: visible (if Fade preset)
- Border radius: `--primidian-blockquote-radius`

**Expected (Live Preview):**
- Same as Reading Mode (single line = no multi-line issues)

#### Case 2: Two Lines
```markdown
> This is the first line.
> This is the second line.
```

**Expected (Reading Mode):**
- Single blockquote container
- Background spans both lines
- Top bar at top of blockquote
- Bottom bar at bottom of blockquote

**Expected (Live Preview):**
- Two `.HyperMD-quote` spans in separate `.cm-line` containers
- Each line has background
- Top bar on each line (accepted limitation)
- Bottom bar on each line (accepted limitation)

#### Case 3: Four Lines
```markdown
> Line one of the quote.
> Line two of the quote.
> Line three of the quote.
> Line four of the quote.
```

**Expected:** Same as Case 2 but with four lines.

#### Case 4: Long Wrapped Line
```markdown
> This is a very long line that will wrap to multiple lines in the editor because it exceeds the width of the content area and needs to test how wrapped lines are handled.
```

**Expected (Reading Mode):**
- Single blockquote container
- Wrapped text within single `<p>` element
- Background spans all wrapped lines

**Expected (Live Preview):**
- Single `.cm-line` with wrapped content
- `.HyperMD-quote` spans the wrapped content
- `box-decoration-break: clone` ensures background continuity

#### Case 5: Nested Quote
```markdown
> Outer quote text.
>
> > Nested quote text.
```

**Expected (Reading Mode):**
- Outer blockquote: full background, accent border
- Inner blockquote: transparent background, muted accent border
- No bars on inner blockquote

**Expected (Live Preview):**
- Outer lines: `.HyperMD-quote-1` with full background
- Inner lines: `.HyperMD-quote-2` with transparent background, muted accent
- No bars on inner lines

#### Case 6: Deeply Nested Quote
```markdown
> Level 1
>
> > Level 2
> >
> > > Level 3
```

**Expected:** Three visual levels with decreasing emphasis.

#### Case 7: Mixed Nesting
```markdown
> Outer line 1
>
> > Nested line 1
> >
> > Nested line 2
>
> Outer line 2
>
> > Another nested
```

**Expected:** Visual hierarchy maintained throughout.

#### Case 8: Blank Lines in Quote
```markdown
> Line 1
>
> Line 3 (after blank)
```

**Expected:** Blank line is part of the quote (no visual break).

---

## 4. Preset Behavior Matrix

### 4.1 Simple Preset

| Element | Reading Mode | Live Preview |
|---------|-------------|--------------|
| Background | ✓ | ✓ |
| Left Accent | ✗ | ✗ |
| Top Bar | ✗ | ✗ |
| Bottom Bar | ✗ | ✗ |
| Box Border | ✗ | ✗ |

### 4.2 Boxy Preset

| Element | Reading Mode | Live Preview |
|---------|-------------|--------------|
| Background | ✓ | ✓ |
| Left Accent | ✓ (3px) | ✓ (3px) |
| Top Bar | ✗ | ✗ |
| Bottom Bar | ✗ | ✗ |
| Box Border | ✓ (1px) | ✓ (1px, per-line) |

### 4.3 Minimal Preset

| Element | Reading Mode | Live Preview |
|---------|-------------|--------------|
| Background | ✓ | ✓ |
| Left Accent | ✓ (3px) | ✓ (3px) |
| Top Bar | ✗ | ✗ |
| Bottom Bar | ✗ | ✗ |
| Box Border | ✗ | ✗ |

### 4.4 Fade Preset

| Element | Reading Mode | Live Preview |
|---------|-------------|--------------|
| Background | ✓ | ✓ |
| Left Accent | ✓ (3px) | ✓ (3px) |
| Top Bar | ✓ (top only) | ✓ (every line) |
| Bottom Bar | ✓ (bottom only) | ✓ (every line) |
| Box Border | ✗ | ✗ |

---

## 5. Glow Mode Matrix

### 5.1 Glow Off

No glow applied. Blockquote renders normally.

### 5.2 Text Shadow Engine

```css
text-shadow: 0 0 var(--primidian-glow-blur)
    color-mix(in srgb, var(--primidian-quote-border-color) var(--primidian-glow-alpha), transparent);
```

**Expected:** Glow appears on blockquote border.

### 5.3 Drop Shadow Engine

```css
box-shadow: inset var(--primidian-quote-border-width) 0 var(--primidian-glow-blur)
    calc(-1 * var(--primidian-quote-border-width))
    color-mix(in srgb, var(--primidian-quote-border-color) var(--primidian-glow-alpha), transparent);
```

**Expected:** Inset glow appears on left border.

### 5.4 Automatic Engine

Same as Drop Shadow for blockquotes (rectangular container).

---

## 6. Content Type Matrix

### 6.1 Plain Text
Standard text rendering. No special considerations.

### 6.2 Bold
```markdown
> This has **bold** text inside.
```

**Expected:** Bold text uses `--primidian-bold-color` and gradient (if enabled).

### 6.3 Italic
```markdown
> This has *italic* text inside.
```

**Expected:** Italic text uses `--primidian-italic-color`.

### 6.4 Links
```markdown
> This has a [link](https://example.com) inside.
```

**Expected:** Links use `--primidian-link-color` and hover color.

### 6.5 Inline Code
```markdown
> This has `code` inside.
```

**Expected:** Inline code uses `--primidian-inline-code-bg` and `--primidian-inline-code-color`.

### 6.6 Lists
```markdown
> - Item 1
> - Item 2
> - Item 3
```

**Expected:** List items render within the blockquote background.

### 6.7 Headings
```markdown
> # Heading in quote
```

**Expected:** Heading renders within blockquote (unusual but valid).

---

## 7. Edge Cases

### 7.1 Empty Blockquote
```markdown
>
```

**Expected:** Minimal height blockquote with background.

### 7.2 Blockquote with Only Whitespace
```markdown
>    
```

**Expected:** Minimal height blockquote.

### 7.3 Consecutive Blockquotes
```markdown
> First blockquote

> Second blockquote
```

**Expected:** Two separate blockquotes with margin between them.

### 7.4 Blockquote in List
```markdown
- List item
  > Blockquote in list
```

**Expected:** Blockquote renders within list item.

### 7.5 Blockquote in Callout
```markdown
> [!note]
> Blockquote in callout
```

**Expected:** Callout styling takes precedence (blockquotes in callouts are excluded via `:not(.callout)`).

### 7.6 Very Long Blockquote
```markdown
> Line 1
> Line 2
> ... (50 lines)
> Line 50
```

**Expected:** All lines render correctly. No performance issues.

### 7.7 Blockquote with Code Block
```markdown
> Text before
>
> ```
> code block
> ```
>
> Text after
```

**Expected:** Code block renders within blockquote (if supported).

---

## 8. Mobile Test Cases

### 8.1 Mobile Reading Mode
- All presets work
- Touch interactions work
- No horizontal overflow

### 8.2 Mobile Live Preview
- All presets work
- Cursor positioning correct
- Selection works
- No visual artifacts

---

## 9. Performance Test Cases

### 9.1 Long Document
- 100+ blockquotes in a single document
- Scroll performance acceptable
- No layout thrashing

### 9.2 Complex Nesting
- 5+ levels of nesting
- No visual glitches
- Glow performance acceptable

### 9.3 Rapid Editing
- Type in a blockquote
- No visual lag
- Cursor follows text correctly

---

## 10. Acceptance Criteria

### 10.1 Must Have
- [ ] Reading Mode blockquotes unchanged from current
- [ ] Live Preview blockquotes have background
- [ ] Live Preview blockquotes have left accent
- [ ] All four presets work in both modes
- [ ] Nested quotes render correctly
- [ ] Glow Engine works with blockquotes
- [ ] No build errors
- [ ] No mobile regressions

### 10.2 Should Have
- [ ] Live Preview bars approximate Reading Mode bars
- [ ] Consistent padding between modes
- [ ] No visual artifacts on wrapped lines

### 10.3 Nice to Have
- [ ] Perfect bar placement (top/bottom only)
- [ ] Border radius on first/last lines
- [ ] Continuous background across lines

---

## 11. Test Execution Log

| Date | Tester | Cases Tested | Passed | Failed | Notes |
|------|--------|--------------|--------|--------|-------|
| | | | | | |
| | | | | | |
| | | | | | |

---

## 12. Known Limitations

1. **Per-line bars in Live Preview:** Gradient bars appear on every line, not just top/bottom.
2. **No border radius on inline elements:** Border radius cannot be applied to inline `.HyperMD-quote` elements.
3. **Background discontinuity:** Backgrounds are per-line, not continuous across lines.
4. **Nested quote complexity:** Deep nesting may have visual inconsistencies.

These limitations are accepted as trade-offs for a CSS-only, maintainable solution.
