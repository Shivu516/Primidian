# 09 — Future Feature Roadmap

> Ranked future features into tiers with dependencies and recommended implementation order.

---

## TIER DEFINITIONS

| Tier | Meaning |
|------|---------|
| **Tier 1** | High Value / Low Risk — implement first |
| **Tier 2** | High Value / Medium Risk — implement after foundation |
| **Tier 3** | Experimental — interesting but needs investigation |
| **Do Not Port** | Conflicts with Primidian's design philosophy |

---

## TIER 1 — HIGH VALUE / LOW RISK

### 1.1 Font Feature Settings

| Attribute | Value |
|-----------|-------|
| **What Primary does** | Per-font OpenType feature control (calt, case, ccmp, ss03, etc.) |
| **What Primidian currently does** | Nothing — no font feature settings |
| **Why valuable** | Power users want to enable/disable font features without editing CSS |
| **What would change** | 3 new settings in Typography → Font Features |
| **Dependencies** | None |
| **Risk** | LOW — purely additive |
| **Visual impact** | Medium — affects text rendering quality |
| **Estimated effort** | Small |

### 1.2 Per-Heading Font Family

| Attribute | Value |
|-----------|-------|
| **What Primary does** | Each heading level can use a different font family |
| **What Primidian currently does** | All headings use the text font |
| **Why valuable** | Design flexibility — users may want a distinct font for H1 |
| **What would change** | 6 new settings (one per heading level) |
| **Dependencies** | None |
| **Risk** | LOW — purely additive |
| **Visual impact** | High — changes heading appearance |
| **Estimated effort** | Small |

### 1.3 Link Underline Controls

| Attribute | Value |
|-----------|-------|
| **What Primary does** | Offset, thickness, opacity for link underlines |
| **What Primidian currently does** | Fixed underline via sweep animation |
| **Why valuable** | Fine control over link appearance |
| **What would change** | 3 new settings in Links section |
| **Dependencies** | None |
| **Risk** | LOW — extends existing system |
| **Visual impact** | Low — subtle refinement |
| **Estimated effort** | Small |

### 1.4 Font Size Tiers

| Attribute | Value |
|-----------|-------|
| **What Primary does** | 5 interface font sizes (smallest, smaller, small, medium, large) |
| **What Primidian currently does** | Single base font size |
| **Why valuable** | Control over interface text scaling |
| **What would change** | 4 new settings + UI CSS for each size tier |
| **Dependencies** | None |
| **Risk** | LOW — additive with CSS additions |
| **Visual impact** | Medium — affects interface text |
| **Estimated effort** | Medium |

### 1.5 Font Weight Tiers

| Attribute | Value |
|-----------|-------|
| **What Primary does** | 9 font weight settings (thin through black) |
| **What Primidian currently does** | Single body font weight |
| **Why valuable** | Control over interface text weight |
| **What would change** | 8 new settings + UI CSS for each weight |
| **Dependencies** | None |
| **Risk** | LOW — additive with CSS additions |
| **Visual impact** | Medium — affects interface text |
| **Estimated effort** | Medium |

### 1.6 Bold Modifier

| Attribute | Value |
|-----------|-------|
| **What Primary does** | Addend to Normal Font Weight for certain bold UI components |
| **What Primidian currently does** | Fixed bold weight |
| **Why valuable** | Fine control over bold appearance |
| **What would change** | 1 new setting + token |
| **Dependencies** | None |
| **Risk** | LOW — single setting |
| **Visual impact** | Low — subtle |
| **Estimated effort** | Small |

### 1.7 Non-Markdown Link Colors

| Attribute | Value |
|-----------|-------|
| **What Primary does** | Separate colors for links outside notes |
| **What Primidian currently does** | Same colors for all links |
| **Why valuable** | Distinguish note links from UI links |
| **What would change** | 2 new settings in Links section |
| **Dependencies** | None |
| **Risk** | LOW — additive |
| **Visual impact** | Low — subtle |
| **Estimated effort** | Small |

### 1.8 Editor Gutter Colors

| Attribute | Value |
|-----------|-------|
| **What Primary does** | Separate colors for line numbers and active line number |
| **What Primidian currently does** | Single line number color |
| **Why valuable** | Distinguish active line number |
| **What would change** | 1 new setting |
| **Dependencies** | None |
| **Risk** | LOW — additive |
| **Visual impact** | Low — subtle |
| **Estimated effort** | Small |

---

## TIER 2 — HIGH VALUE / MEDIUM RISK

### 2.1 Editor Background Patterns

| Attribute | Value |
|-----------|-------|
| **What Primary does** | Line grid or dot grid as editor background |
| **What Primidian currently does** | Solid color only |
| **Why valuable** | Popular feature for users who want a "notebook" feel |
| **What would change** | 4 new settings + CSS background patterns |
| **Dependencies** | Editor background system |
| **Risk** | MEDIUM — needs testing with various backgrounds |
| **Visual impact** | High — changes editor appearance |
| **Estimated effort** | Medium |
| **Depends on** | None |

### 2.2 Active Line Highlighting

| Attribute | Value |
|-----------|-------|
| **What Primary does** | Background color on the active line |
| **What Primidian currently does** | Nothing |
| **Why valuable** | Helps users track cursor position |
| **What would change** | 2 new settings + CSS for active line |
| **Dependencies** | Editor line detection |
| **Risk** | MEDIUM — needs to work with various backgrounds |
| **Visual impact** | Medium — subtle highlight |
| **Estimated effort** | Medium |
| **Depends on** | None |

### 2.3 Status Bar Slide-Out Style

| Attribute | Value |
|-----------|-------|
| **What Primary does** | 3 additional status bar styles (slide up, slide out, visible full) |
| **What Primidian currently does** | 2 styles (floating, docked) |
| **Why valuable** | More options for status bar behavior |
| **What would change** | 3 new CSS patterns + class-select options |
| **Dependencies** | Status bar layout |
| **Risk** | MEDIUM — needs testing |
| **Visual impact** | Medium — changes status bar behavior |
| **Estimated effort** | Medium |
| **Depends on** | None |

### 2.4 Ribbon Slide-Out on Hover

| Attribute | Value |
|-----------|-------|
| **What Primary does** | Ribbon slides out on hover, collapsed by default |
| **What Primidian currently does** | Static ribbon |
| **Why valuable** | Saves screen space |
| **What would change** | New ribbon CSS + class-select option |
| **Dependencies** | Ribbon layout |
| **Risk** | MEDIUM — ribbon behavior changes |
| **Visual impact** | Medium — changes ribbon behavior |
| **Estimated effort** | Medium |
| **Depends on** | None |

### 2.5 File Header Hover-Reveal

| Attribute | Value |
|-----------|-------|
| **What Primary does** | File header can be hidden, revealed on hover |
| **What Primidian currently does** | Always visible |
| **Why valuable** | Saves vertical space |
| **What would change** | New header CSS + class-select options |
| **Dependencies** | Header layout |
| **Risk** | MEDIUM — header behavior changes |
| **Visual impact** | Medium — changes header behavior |
| **Estimated effort** | Medium |
| **Depends on** | None |

### 2.6 Per-Heading Text Alignment

| Attribute | Value |
|-----------|-------|
| **What Primary does** | Each heading level can have different text alignment |
| **What Primidian currently does** | All headings left-aligned |
| **Why valuable** | Design flexibility |
| **What would change** | 6 new settings |
| **Dependencies** | None |
| **Risk** | LOW — additive |
| **Visual impact** | Medium |
| **Estimated effort** | Small |
| **Depends on** | None |

### 2.7 Per-Heading Line Height

| Attribute | Value |
|-----------|-------|
| **What Primary does** | Each heading level can have different line height |
| **What Primidian currently does** | All headings use default line height |
| **Why valuable** | Fine control over heading spacing |
| **What would change** | 6 new settings |
| **Dependencies** | None |
| **Risk** | LOW — additive |
| **Visual impact** | Low |
| **Estimated effort** | Small |
| **Depends on** | None |

### 2.8 Note Embed Per-Side Border

| Attribute | Value |
|-----------|-------|
| **What Primary does** | Each border side of note embeds has independent width/style/color |
| **What Primidian currently does** | Uniform border |
| **Why valuable** | Fine control over embed appearance |
| **What would change** | 12 new settings + CSS |
| **Dependencies** | Embed CSS |
| **Risk** | MEDIUM — many settings |
| **Visual impact** | Medium |
| **Estimated effort** | Medium |
| **Depends on** | None |

### 2.9 Highlight Combinations

| Attribute | Value |
|-----------|-------|
| **What Primary does** | 5 highlight combo colors (bold+highlight, italic+highlight, etc.) |
| **What Primidian currently does** | Single highlight color |
| **Why valuable** | Distinguish highlight combinations |
| **What would change** | 8 new settings + CSS |
| **Dependencies** | Emphasis component |
| **Risk** | MEDIUM — CSS complexity |
| **Visual impact** | Low |
| **Estimated effort** | Medium |
| **Depends on** | None |

### 2.10 Progress Bar Customization

| Attribute | Value |
|-----------|-------|
| **What Primary does** | Full progress bar customization with per-range colors |
| **What Primidian currently does** | Nothing |
| **Why valuable** | Useful for users who embed progress bars |
| **What would change** | ~15 new settings + new component CSS |
| **Dependencies** | New component |
| **Risk** | MEDIUM — new component |
| **Visual impact** | Medium |
| **Estimated effort** | Large |
| **Depends on** | None |

---

## TIER 3 — EXPERIMENTAL

### 3.1 12-Color Folder Cycle

| Attribute | Value |
|-----------|-------|
| **What Primary does** | Folders cycle through up to 12 distinct colors |
| **What Primidian currently does** | Single accent color for all folders |
| **Why valuable** | Visual organization of file structure |
| **What would change** | 60+ new settings + CSS for color application |
| **Dependencies** | Token architecture expansion |
| **Risk** | HIGH — massive setting count, potential visual clutter |
| **Visual impact** | High — dramatic change |
| **Estimated effort** | Large |
| **Depends on** | Settings reorganization |
| **Notes** | Could be simplified to 6 colors instead of 12 |

### 3.2 22 Checkbox Task Types

| Attribute | Value |
|-----------|-------|
| **What Primary does** | 22 distinct task marker types with individual colors |
| **What Primidian currently does** | 6 task types |
| **Why valuable** | Comprehensive task state coverage |
| **What would change** | 16+ new color settings + SVG icons + CSS |
| **Dependencies** | Checkbox component expansion |
| **Risk** | HIGH — many settings, icon creation |
| **Visual impact** | Medium |
| **Estimated effort** | Large |
| **Depends on** | None |
| **Notes** | Could be added incrementally (most popular types first) |

### 3.3 Graph View Colors

| Attribute | Value |
|-----------|-------|
| **What Primary does** | 10 graph-specific color settings |
| **What Primidian currently does** | Nothing |
| **Why valuable** | Customize graph view appearance |
| **What would change** | 10 new settings + CSS targeting graph SVG |
| **Dependencies** | Graph view DOM knowledge |
| **Risk** | HIGH — graph view DOM may change |
| **Visual impact** | Medium |
| **Estimated effort** | Medium |
| **Depends on** | Graph view DOM investigation |

### 3.4 Canvas Colors

| Attribute | Value |
|-----------|-------|
| **What Primary does** | 7 canvas colors + dot pattern + card label |
| **What Primidian currently does** | Nothing |
| **Why valuable** | Customize canvas appearance |
| **What would change** | 9 new settings + CSS targeting canvas |
| **Dependencies** | Canvas DOM knowledge |
| **Risk** | HIGH — canvas DOM may change |
| **Visual impact** | Medium |
| **Estimated effort** | Medium |
| **Depends on** | Canvas DOM investigation |

### 3.5 Per-Heading Border (4 Sides)

| Attribute | Value |
|-----------|-------|
| **What Primary does** | Each heading level has independent 4-side border control |
| **What Primidian currently does** | No heading borders |
| **Why valuable** | Maximum heading design flexibility |
| **What would change** | 24 new settings (6 headings × 4 sides) + CSS |
| **Dependencies** | Heading CSS expansion |
| **Risk** | HIGH — many settings, CSS complexity |
| **Visual impact** | High |
| **Estimated effort** | Large |
| **Depends on** | None |
| **Notes** | Could be simplified to "border all sides" + "border radius" |

### 3.6 Per-Heading Background

| Attribute | Value |
|-----------|-------|
| **What Primary does** | Each heading level can have a background color |
| **What Primidian currently does** | No heading backgrounds |
| **Why valuable** | Heading highlight effect |
| **What would change** | 6 new settings + CSS |
| **Dependencies** | Heading CSS expansion |
| **Risk** | MEDIUM — CSS complexity |
| **Visual impact** | High |
| **Estimated effort** | Medium |
| **Depends on** | Per-heading vertical align toggle |

---

## DO NOT PORT

| Feature | Reason |
|---------|--------|
| Primary's malformed transition lists | Primidian's explicit property/duration/easing triplets are more correct |
| Primary's margin-animating popup keyframe | Triggers layout; Primidian's transform-only approach is better |
| Primary's nth-child tab color rotation | Conflicts with Primidian's two-accent design |
| Primary's bundled fonts (Cascadia Code, Inter) | Primidian deliberately bundles no fonts for size/licensing |
| Primary's `transition: all` patterns | Banned by Primidian's PR-1 performance rule |
| Primary's lack of prefers-reduced-motion | Primidian has this; would not regress |
| Primary's single-duration approach | Primidian's named duration scale is better |
| Primary's flat color system | Primidian's token cascade is more maintainable |

---

## RECOMMENDED IMPLEMENTATION ORDER

### Phase 1: Quick Wins (Tier 1)

1. Font feature settings
2. Per-heading font family
3. Link underline controls
4. Bold modifier
5. Non-markdown link colors
6. Editor gutter colors
7. Font size tiers
8. Font weight tiers

### Phase 2: Content Enhancements (Tier 2, first half)

9. Editor background patterns
10. Active line highlighting
11. Per-heading text alignment
12. Per-heading line height
13. Highlight combinations

### Phase 3: Interface Enhancements (Tier 2, second half)

14. Status bar slide-out style
15. Ribbon slide-out on hover
16. File header hover-reveal
17. Note embed per-side border

### Phase 4: Major Features (Tier 3, simplified)

18. Progress bar customization
19. Simplified folder colors (6 instead of 12)
20. Additional task types (incremental)

### Phase 5: Investigation Needed (Tier 3, experimental)

21. Graph view colors
22. Canvas colors
23. Per-heading border (4 sides)
24. Per-heading background

---

## DEPENDENCY GRAPH

```
Phase 1 (Quick Wins)
    │
    ├── Font feature settings ───────────────────────────┐
    ├── Per-heading font family ─── Phase 2 (Content)     │
    ├── Link underline controls ──────────┐               │
    ├── Bold modifier ────────────────────┤               │
    ├── Non-markdown link colors ─────────┤               │
    ├── Editor gutter colors ─────────────┤               │
    ├── Font size tiers ──────────────────┤               │
    └── Font weight tiers ────────────────┘               │
                                                         │
Phase 2 (Content)                                        │
    │                                                    │
    ├── Editor background patterns                       │
    ├── Active line highlighting                        │
    ├── Per-heading text alignment ◄─────────────────────┤
    ├── Per-heading line height ◄────────────────────────┤
    └── Highlight combinations                           │
                                                         │
Phase 3 (Interface)                                      │
    │                                                    │
    ├── Status bar slide-out                             │
    ├── Ribbon slide-out                                 │
    ├── File header hover-reveal                         │
    └── Note embed per-side border                       │
                                                         │
Phase 4 (Major Features)                                 │
    │                                                    │
    ├── Progress bar customization                       │
    ├── Simplified folder colors                         │
    └── Additional task types                            │
                                                         │
Phase 5 (Experimental)                                   │
    │                                                    │
    ├── Graph view colors ─── needs DOM investigation     │
    ├── Canvas colors ─────── needs DOM investigation     │
    ├── Per-heading border ── needs CSS architecture      │
    └── Per-heading background ─ needs CSS architecture   │
```
