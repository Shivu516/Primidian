# 05 — Style Settings Comparison

> Primary vs Primidian category-by-category comparison.

---

## CLASSIFICATION KEY

| Status | Meaning |
|--------|---------|
| **EXISTING** | Primidian already provides essentially the same capability |
| **PARTIAL** | Primidian provides some related functionality but Primary goes further |
| **MISSING** | Primary provides a feature Primidian currently does not have |
| **DIFFERENT** | Both provide the feature but through substantially different architectures |
| **N/A** | The Primary feature does not make sense to port directly |
| **NEEDS INVESTIGATION** | Not enough evidence to classify |

---

## CATEGORY COMPARISON TABLE

| Primary Category | Primidian Equivalent | Status | Notes |
|-----------------|---------------------|--------|-------|
| Interface → Typography → Font Features | Typography | **DIFFERENT** | Primary: per-font feature settings. Primidian: font family + size + weight + line-height |
| Interface → Typography → Font Sizes | Typography | **PARTIAL** | Primary: 5 sizes (smallest to large). Primidian: single base size |
| Interface → Typography → Font Weight | Typography | **PARTIAL** | Primary: 9 weights + bold modifier. Primidian: single body weight |
| Interface → Animations and Effects | Animations | **PARTIAL** | Primary: 3 toggles. Primidian: 6 toggles + duration scale + easing |
| Interface → Ribbon | Interface | **PARTIAL** | Primary: style + bg + border + width + icon size/spacing. Primidian: radius + icon opacity |
| Interface → Editor | — | **MISSING** | Primary: bg type (plain/grid/dot) + color + border + file header + line width + gutter + active line |
| Interface → Status Bar | Interface → Status Bar | **PARTIAL** | Primary: 5 styles + item visibility + bg + border + floating opacity. Primidian: 2 styles + opacity |
| Components → Progress | — | **MISSING** | Primary: full progress bar customization (width, height, colors per range, gradient for 100%) |
| Notes and Files → Heading (×6) | Headings | **PARTIAL** | Primary: 16 settings per heading. Primidian: 5 settings per heading |
| Notes and Files → Emphasis | Bold, Italic & Highlight | **PARTIAL** | Primary: bold+italic combo, strikethrough, underline. Primidian: bold, italic, highlight, strikethrough |
| Notes and Files → Highlight | Bold, Italic & Highlight | **PARTIAL** | Primary: 5 highlight combos (bold, italic, strikethrough, bold+italic). Primidian: single highlight |
| Notes and Files → Link | Links | **PARTIAL** | Primary: 5 link types (non-markdown, unresolved, resolved, external, all). Primidian: internal + external |
| Notes and Files → Blockquotes | Blockquotes | **EXISTING** | Both provide border thickness, color, background |
| Notes and Files → List | Lists, Embeds & Properties | **PARTIAL** | Primary: indent guides (3 modes) + marker colors (normal/hover/collapsed). Primidian: marker + indent |
| Notes and Files → Checkbox | Checkboxes & Tasks | **PARTIAL** | Primary: 22 task types. Primidian: 6 task types |
| Notes and Files → Checkbox Icons | Checkboxes & Tasks | **PARTIAL** | Primary: per-type colors + icon colors + border radius. Primidian: per-type colors only |
| Notes and Files → Media | Lists, Embeds & Properties | **EXISTING** | Both provide border radius for media |
| Notes and Files → Note Embed | Lists, Embeds & Properties | **PARTIAL** | Primary: max height + bg + title (10 settings) + border (4 sides × 3). Primidian: bg + title + radius |
| Canvas | — | **MISSING** | Primary: dot pattern + card label + 7 canvas colors |
| File Explorer & Bookmarks | — | **MISSING** | Primary: 12-color folder cycle + 6 behavior toggles + separate bookmark colors |
| Graph | — | **MISSING** | Primary: 10 graph colors (nodes, lines, arrows, etc.) |
| Advanced | Advanced | **EXISTING** | Both have an Advanced section |
| — | Colours | **DIFFERENT** | Primidian: 9 core colors. Primary: colors are distributed per-component |
| — | Gradient System | **DIFFERENT** | Primidian: global + per-component gradients. Primary: no gradient system |
| — | Glow System | **DIFFERENT** | Primidian: 16+ targets, 3 engines, UI glow. Primary: no glow system |
| — | Plugin Compatibility | **DIFFERENT** | Primidian: Task List Kanban fix. Primary: no plugin section |

---

## DETAILED COMPARISON BY DOMAIN

### TYPOGRAPHY

| Feature | Primary | Primidian | Status |
|---------|---------|-----------|--------|
| Font family (text) | ✓ (via Obsidian) | ✓ | EXISTING |
| Font family (interface) | ✓ (via Obsidian) | ✓ | EXISTING |
| Font family (monospace) | ✓ (via Obsidian) | ✓ | EXISTING |
| Font feature settings | ✓ (3 fonts) | — | MISSING |
| Font sizes (5 tiers) | ✓ | — | MISSING |
| Font weight (9 tiers) | ✓ | — | MISSING |
| Bold modifier | ✓ | — | MISSING |
| Base font size | ✓ | ✓ | EXISTING |
| Body font weight | ✓ | ✓ | EXISTING |
| Line height | ✓ | ✓ | EXISTING |
| Content width | ✓ | ✓ | EXISTING |

### HEADINGS

| Feature | Primary | Primidian | Status |
|---------|---------|-----------|--------|
| Per-heading font size | ✓ | ✓ | EXISTING |
| Per-heading font weight | ✓ | ✓ | EXISTING |
| Per-heading font family | ✓ | — | MISSING |
| Per-heading font style | ✓ | — | MISSING |
| Per-heading text align | ✓ | — | MISSING |
| Per-heading letter spacing | ✓ | ✓ | EXISTING |
| Per-heading text transform | ✓ | ✓ | EXISTING |
| Per-heading line height | ✓ | — | MISSING |
| Per-heading color | ✓ | ✓ | EXISTING |
| Per-heading background | ✓ | — | MISSING |
| Per-heading vertical align | ✓ | — | MISSING |
| Per-heading border (4 sides) | ✓ | — | MISSING |
| Per-heading border radius | ✓ | — | MISSING |
| Heading style variants | — | ✓ (5) | DIFFERENT |
| Heading underline | — | ✓ | DIFFERENT |
| Heading accent bar | — | ✓ | DIFFERENT |

### LINKS

| Feature | Primary | Primidian | Status |
|---------|---------|-----------|--------|
| Internal link color | ✓ | ✓ | EXISTING |
| External link color | ✓ | ✓ | EXISTING |
| Unresolved link color | ✓ | ✓ | EXISTING |
| Non-markdown link color | ✓ | — | MISSING |
| Link underline offset | ✓ | — | MISSING |
| Link underline thickness | ✓ | — | MISSING |
| Link underline opacity | ✓ | — | MISSING |
| Remove link underline | ✓ | — | MISSING |
| Link pressed opacity | ✓ | — | MISSING |
| Link sweep animation | — | ✓ | DIFFERENT |

### CHECKBOXES

| Feature | Primary | Primidian | Status |
|---------|---------|-----------|--------|
| Checkbox size | — | ✓ | DIFFERENT |
| Checkbox border width | — | ✓ | DIFFERING |
| Checkbox radius | ✓ | ✓ | EXISTING |
| Unchecked background | ✓ | — | MISSING |
| Checked background | ✓ | ✓ | EXISTING |
| Checked hover background | ✓ | — | MISSING |
| Check icon color | ✓ | ✓ | EXISTING |
| Done text color | ✓ | ✓ | EXISTING |
| Done text decoration | ✓ | ✓ | EXISTING |
| In progress [/] | ✓ | ✓ | EXISTING |
| In progress hover [/] | ✓ | — | MISSING |
| Reschedule [>] | ✓ | — | MISSING |
| Schedule [<] | ✓ | — | MISSING |
| Important [!] | ✓ | ✓ | EXISTING |
| Important icon color | ✓ | — | MISSING |
| Important radius | ✓ | — | MISSING |
| Cancelled [-] | ✓ | ✓ | EXISTING |
| Cancelled text color | ✓ | — | MISSING |
| Cancelled decoration | ✓ | — | MISSING |
| Question [?] | ✓ | ✓ | EXISTING |
| Question icon color | ✓ | — | MISSING |
| Star [*] | ✓ | ✓ | EXISTING |
| Star icon color | ✓ | — | MISSING |
| Note [n] | ✓ | — | MISSING |
| Location [l] | ✓ | — | MISSING |
| Info [i] | ✓ | — | MISSING |
| Info icon color | ✓ | — | MISSING |
| Amount [S] | ✓ | — | MISSING |
| Amount icon color | ✓ | — | MISSING |
| Amount radius | ✓ | — | MISSING |
| Quote ["] | ✓ | — | MISSING |
| Quote icon color | ✓ | — | MISSING |
| Idea [I] | ✓ | — | MISSING |
| Pro [p] | ✓ | — | MISSING |
| Con [c] | ✓ | — | MISSING |
| Bookmark [b] | ✓ | — | MISSING |
| Up trend [u] | ✓ | — | MISSING |
| Down trend [d] | ✓ | — | MISSING |
| Rule/law [r] | ✓ | — | MISSING |
| Language [L] | ✓ | — | MISSING |
| Time [t] | ✓ | — | MISSING |
| Telephone [T] | ✓ | — | MISSING |
| Forwarded/Scheduled | — | ✓ | DIFFERENT |

### FOLDERS & FILE EXPLORER

| Feature | Primary | Primidian | Status |
|---------|---------|-----------|--------|
| 12-color folder cycle | ✓ | — | MISSING |
| Folder text color | ✓ | — | MISSING |
| Folder collapse indicator color | ✓ | — | MISSING |
| Folder background color | ✓ | — | MISSING |
| Folder hover background | ✓ | — | MISSING |
| Folder indent guide color | ✓ | — | MISSING |
| Folder as collapse indicator | ✓ | — | MISSING |
| Inherit parent folder colors | ✓ | — | MISSING |
| Separate bookmark colors | ✓ | — | MISSING |

### ANIMATIONS

| Feature | Primary | Primidian | Status |
|---------|---------|-----------|--------|
| Disable all animations | — | ✓ | DIFFERENT |
| Animation speed multiplier | — | ✓ | DIFFERENT |
| Ignore reduced-motion | — | ✓ | DIFFERENT |
| Disable popup animation | — | ✓ | DIFFERENT |
| Disable checkbox animation | — | ✓ | DIFFERENT |
| Disable button press | — | ✓ | DIFFERENT |
| Disable tab motion | — | ✓ | DIFFERENT |
| Remove jumpy tab animations | ✓ | — | DIFFERENT |
| Remove popup/popdown | ✓ | — | DIFFERENT |
| Remove popup blur | ✓ | — | DIFFERENT |
| Duration scale (4 tiers) | — | ✓ | DIFFERENT |
| Easing controls | — | ✓ | DIFFERENT |
| Tab lift distance | — | ✓ | DIFFERENT |
| Tab press depth | — | ✓ | DIFFERENT |
| Tab indicator height | — | ✓ | DIFFERENT |
| Tab indicator inset | — | ✓ | DIFFERENT |
| Inactive tab opacity | — | ✓ | DIFFERENT |

---

## GAP ANALYSIS

### Major Gaps (Primidian missing entirely)

1. **Folder color system** — Primary's 12-color cycle is a signature feature
2. **Graph view colors** — 10 graph-specific color settings
3. **Canvas colors** — 7 canvas colors + dot pattern + card label
4. **Progress bar** — Full progress bar customization
5. **Editor background patterns** — Line grid / dot grid options
6. **File header modes** — 3 visibility modes
7. **Font feature settings** — Per-font OpenType feature control
8. **Font size tiers** — 5 interface font sizes
9. **Font weight tiers** — 9 font weight settings
10. **Note embed customization** — Extensive per-side border control

### Minor Gaps (Primidian has partial coverage)

1. **Per-heading settings** — Primary has 16 per heading, Primidian has 5
2. **Link types** — Primary has 5 link types, Primidian has 3
3. **Task states** — Primary has 22, Primidian has 6
4. **Status bar styles** — Primary has 5, Primidian has 2
5. **Highlight combinations** — Primary has 5 combos, Primidian has 1
6. **Ribbon customization** — Primary has more options

### Areas Where Primidian Exceeds Primary

1. **Glow system** — Primary has no equivalent
2. **Gradient system** — Primary has no equivalent
3. **Animation controls** — Primidian has proper duration/easing/reduced-motion
4. **Token cascade** — Primidian's accent-driven system is more maintainable
5. **Plugin compatibility** — Primidian has a dedicated section
6. **Code line numbers** — Primidian has Live Preview line numbers
