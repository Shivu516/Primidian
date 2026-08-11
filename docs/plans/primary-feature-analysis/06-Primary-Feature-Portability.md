# 06 — Primary Feature Portability Analysis

> Which Primary features could realistically be brought into Primidian.

---

## PORTABILITY CLASSIFICATIONS

| Rating | Meaning |
|--------|---------|
| **HIGH** | Can be implemented with minimal architectural disruption |
| **MEDIUM** | Requires some architectural changes but feasible |
| **LOW** | Would require substantial architectural changes |
| **UNKNOWN** | Not enough information to assess |

| Rating | Meaning |
|--------|---------|
| **LOW** | Minimal risk of breaking existing functionality |
| **MEDIUM** | Some risk, needs testing |
| **HIGH** | Significant risk, needs careful implementation |

---

## PORTABILITY TABLE

| Feature | Primary Implementation | Primidian Status | Portability | Dependencies | Risk |
|---------|----------------------------------|----------------|-------------|--------------|------|
| Tab lift/sink/raised card | translateY + inset box-shadow | Already adapted (Phase 3) | **HIGH** | None | **LOW** |
| Popup entry/exit animation | keyframes (margin + opacity + scale) | Already adapted (Phase 3) | **HIGH** | None | **LOW** |
| Settings toggle animation | background + transform | Already adapted | **HIGH** | None | **LOW** |
| Slider thumb scale | transform: scale | Already adapted | **HIGH** | None | **LOW** |
| Input focus ring | box-shadow ring | Already adapted | **HIGH** | None | **LOW** |
| Button press effect | translateY(1px) + shadow | Already adapted | **HIGH** | None | **LOW** |
| File hover/background | background-color transition | Already adapted | **HIGH** | None | **LOW** |
| Folder collapse rotation | transform: rotate(90deg) | Already adapted | **HIGH** | None | **LOW** |
| Ribbon icon hover | opacity + color | Already adapted | **HIGH** | None | **LOW** |
| Floating status bar | opacity fade | Already adapted | **HIGH** | None | **LOW** |
| 12-color folder cycle | Per-folder themed-color × 12 | Missing | **MEDIUM** | Token architecture expansion | **MEDIUM** |
| Status bar slide-out | transform: translateX/Y | Missing | **MEDIUM** | New status bar styles | **LOW** |
| Ribbon slide-out on hover | transform: translateX | Missing | **MEDIUM** | Ribbon layout changes | **MEDIUM** |
| Editor bg patterns (grid/dot) | background-image pattern | Missing | **MEDIUM** | Editor background system | **LOW** |
| File header hover-reveal | opacity + transform | Missing | **MEDIUM** | Header layout | **MEDIUM** |
| Active line highlighting | background-color on .active-line | Missing | **MEDIUM** | Editor line detection | **LOW** |
| Progress bar customization | Per-range colors + gradient | Missing | **MEDIUM** | New component | **MEDIUM** |
| Graph view colors | Per-element graph colors | Missing | **LOW** | Graph view DOM knowledge | **MEDIUM** |
| Canvas colors | 7 canvas colors | Missing | **LOW** | Canvas DOM knowledge | **MEDIUM** |
| Font feature settings | font-feature-settings per font | Missing | **HIGH** | New settings only | **LOW** |
| Per-heading font family | variable-text per heading | Missing | **HIGH** | New settings only | **LOW** |
| Per-heading text align | variable-text per heading | Missing | **HIGH** | New settings only | **LOW** |
| Per-heading border (4 sides) | variable-text per side per heading | Missing | **MEDIUM** | Heading CSS expansion | **MEDIUM** |
| Per-heading background | variable-themed-color per heading | Missing | **MEDIUM** | Heading CSS expansion | **MEDIUM** |
| Per-heading border radius | variable-text per heading | Missing | **MEDIUM** | Heading CSS expansion | **LOW** |
| Note embed per-side border | 4 sides × 3 settings | Missing | **MEDIUM** | Embed CSS expansion | **MEDIUM** |
| 22 checkbox task types | Per-type colors + icons | 6 types exist | **MEDIUM** | Checkbox component expansion | **MEDIUM** |
| Highlight combinations | 5 combo colors | Missing | **MEDIUM** | Emphasis component expansion | **LOW** |
| Non-markdown link colors | Separate link colors | Missing | **HIGH** | New settings only | **LOW** |
| Link underline controls | Offset, thickness, opacity | Missing | **HIGH** | Link CSS expansion | **LOW** |
| Editor gutter colors | Line number colors | Missing | **MEDIUM** | Editor line number CSS | **LOW** |
| Font size tiers (5) | 5 interface font sizes | Missing | **HIGH** | New settings + UI CSS | **LOW** |
| Font weight tiers (9) | 9 font weight settings | Missing | **HIGH** | New settings + UI CSS | **LOW** |
| Bold modifier | Addend for bold components | Missing | **HIGH** | New setting + token | **LOW** |
| Bookmark folder colors | Separate 12-color cycle | Missing | **MEDIUM** | Bookmark DOM knowledge | **MEDIUM** |

---

## HIGH PORTABILITY FEATURES (Detailed)

### Font Feature Settings

**What Primary does**: Per-font OpenType feature control (calt, case, ccmp, ss03, etc.)
**Why portability is HIGH**: Pure addition of settings, no architectural changes needed
**What would change**: 3 new settings in Typography section
**Risk**: LOW — purely additive

### Per-Heading Font Family

**What Primary does**: Each heading level can use a different font family
**Why portability is HIGH**: Simple token addition
**What would change**: 6 new settings (one per heading)
**Risk**: LOW — purely additive

### Link Underline Controls

**What Primary does**: Offset, thickness, opacity for link underlines
**Why portability is HIGH**: Primidian already has link underline tokens
**What would change**: 3 new settings in Links section
**Risk**: LOW — extends existing system

### Font Size Tiers

**What Primary does**: 5 interface font sizes (smallest, smaller, small, medium, large)
**Why portability is HIGH**: Settings + minor CSS additions
**What would change**: 5 new settings + UI CSS for each size tier
**Risk**: LOW — additive with CSS additions

### Font Weight Tiers

**What Primary does**: 9 font weight settings (thin through black)
**Why portability is HIGH**: Settings + minor CSS additions
**What would change**: 9 new settings + UI CSS for each weight
**Risk**: LOW — additive with CSS additions

---

## MEDIUM PORTABILITY FEATURES (Detailed)

### 12-Color Folder Cycle

**What Primary does**: Folders cycle through up to 12 distinct colors
**Why portability is MEDIUM**: Requires significant token architecture expansion
**Dependencies**:
- 12 × 5 = 60 new color settings
- CSS to apply colors by folder depth
- Token cascade for folder colors
**What would change**:
- New L1 category or L2 under Interface
- CSS rules targeting folder items by depth
- Integration with Primidian's existing folder hover system
**Risk**: MEDIUM — large setting count, potential visual clutter

### Editor Background Patterns

**What Primary does**: Line grid or dot grid as editor background
**Why portability is MEDIUM**: Requires background-image pattern generation
**Dependencies**:
- 3 new settings (pattern type, size, color)
- CSS background-image with repeating-linear-gradient or radial-gradient
**What would change**:
- New L2 under Interface or Advanced
- CSS on .markdown-source-view or .workspace-leaf
**Risk**: LOW — self-contained feature

### Progress Bar Customization

**What Primary does**: Full progress bar customization with per-range colors
**Why portability is MEDIUM**: New component, not currently in Primidian
**Dependencies**:
- ~15 new settings
- CSS for progress bar styling
**What would change**:
- New L1 or L2 category
- Progress bar CSS rules
**Risk**: MEDIUM — new component, needs testing

### Note Embed Per-Side Border

**What Primary does**: Each border side of note embeds has independent width/style/color
**Why portability is MEDIUM**: Expands existing embed settings significantly
**Dependencies**:
- 12 new settings (4 sides × 3 properties)
- CSS for each border side
**What would change**:
- Expansion of existing Note Embed section
- CSS for border sides
**Risk**: MEDIUM — many new settings

### 22 Checkbox Task Types

**What Primary does**: 22 distinct task marker types with individual colors
**Why portability is MEDIUM**: Expands existing checkbox component
**Dependencies**:
- 16+ new color settings (8 new types × 2 for hover)
- SVG icons for each new type
- CSS for each type
**What would change**:
- Expansion of existing Custom Task States section
- New CSS rules
**Risk**: MEDIUM — many settings, icon creation needed

---

## LOW PORTABILITY FEATURES (Detailed)

### Graph View Colors

**What Primary does**: 10 graph-specific color settings
**Why portability is LOW**: Requires deep Obsidian graph view DOM knowledge
**Dependencies**:
- Graph view internal structure knowledge
- 10 new settings
- CSS targeting graph SVG elements
**Risk**: MEDIUM — graph view DOM may change between Obsidian versions

### Canvas Colors

**What Primary does**: 7 canvas colors + dot pattern + card label color
**Why portability is LOW**: Requires Canvas plugin DOM knowledge
**Dependencies**:
- Canvas internal structure knowledge
- 9 new settings
- CSS targeting canvas elements
**Risk**: MEDIUM — Canvas DOM may change between Obsidian versions

---

## FEATURES THAT SHOULD NOT BE PORTED

| Feature | Reason |
|---------|--------|
| Primary's malformed transition lists | Primidian's explicit property/duration/easing triplets are more correct |
| Primary's margin-animating popup | Triggers layout; Primidian's transform-only approach is better |
| Primary's nth-child tab color rotation | Conflicts with Primidian's two-accent design |
| Primary's bundled fonts (Cascadia Code, Inter) | Primidian deliberately bundles no fonts for size/licensing |
| Primary's `transition: all` patterns | Banned by Primidian's PR-1 performance rule |
| Primary's lack of prefers-reduced-motion | Primidian has this; would not regress |

---

## RECOMMENDED IMPLEMENTATION ORDER

### Phase A — Quick Wins (HIGH portability, LOW risk)

1. Font feature settings
2. Per-heading font family
3. Link underline controls
4. Font size tiers
5. Font weight tiers
6. Bold modifier
7. Non-markdown link colors
8. Editor gutter colors

### Phase B — Medium Effort (MEDIUM portability)

9. Editor background patterns
10. Active line highlighting
11. Status bar slide-out style
12. Ribbon slide-out on hover
13. File header hover-reveal
14. Per-heading text align
15. Per-heading line height
16. Note embed per-side border
17. Highlight combinations

### Phase C — Large Features (lower portability)

18. Progress bar customization
19. 12-color folder cycle
20. 22 checkbox task types
21. Graph view colors
22. Canvas colors

### Phase D — Needs Investigation

23. Bookmark folder colors
24. Per-heading border (4 sides)
25. Per-heading background
