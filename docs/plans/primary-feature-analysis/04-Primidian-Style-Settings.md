# 04 — Primidian Style Settings

> Complete categorized inventory of Primidian's current Style Settings.
> Source: `src/01-settings.css` (2,074 lines)

---

## STATISTICS

- **Total settings categories (L1)**: 13
- **Total settings entries**: ~120
- **Total subcategories (L2-L4)**: ~30

---

## 1. ABOUT & GUIDE (L1)

| Setting | Type | Description |
|---------|------|-------------|
| Primidian version | info-text | Version display |
| About & Guide text | info-text | Usage guide |
| Saving your setup | info-text | Export/import info |
| Attribution | info-text | Credits to Obsidianite + Primary |

---

## 2. COLOURS (L1)

### 2.1 Core Colours (L2)

| Setting | Type | Default (Dark) | Default (Light) | CSS Variable | Description |
|---------|------|----------------|-----------------|--------------|-------------|
| Accent Colour | variable-themed-color (hsl) | #0fb5d7 | #09718b | `--primidian-accent` | Primary accent |
| Secondary Accent Colour | variable-themed-color (hsl) | #f4579e | #b81e61 | `--primidian-accent-alt` | Secondary accent |
| Background — Primary | variable-themed-color (hsl) | #100d16 | #fcfcfd | `--primidian-bg-primary` | Main background |
| Background — Secondary | variable-themed-color (hsl) | #191721 | #f6f6f9 | `--primidian-bg-secondary` | Code blocks, sidebars |
| Background — Elevated | variable-themed-color (hsl) | #201d2a | #ffffff | `--primidian-bg-elevated` | Modals, popovers |
| Text — Normal | variable-themed-color (hsl) | #bfbfbf | #2a2735 | `--primidian-text-normal` | Body text |
| Text — Muted | variable-themed-color (hsl) | #898698 | #575464 | `--primidian-text-muted` | Secondary text |
| Text — Faint | variable-themed-color (hsl) | #6d6a7c | #898698 | `--primidian-text-faint` | Least prominent |
| Border Colour | variable-themed-color (hsl, opacity) | #0fb5d71f | #09718b2e | `--primidian-border` | Dividing lines |

---

## 3. TYPOGRAPHY (L1)

| Setting | Type | Default | CSS Variable | Source File |
|---------|------|---------|--------------|-------------|
| Text Font | variable-text | 'Rubik', 'Inter', ... | `--primidian-font-text` | tokens/11 |
| Interface Font | variable-text | 'Rubik', 'Inter', ... | `--primidian-font-interface` | tokens/11 |
| Monospace Font | variable-text | 'JetBrains Mono', ... | `--primidian-font-monospace` | tokens/11 |
| Base Font Size | variable-number (px) | 17 | `--primidian-font-size` | tokens/11 |
| Body Font Weight | variable-number | 400 | `--primidian-font-weight` | tokens/11 |
| Line Height | variable-number-slider (1.2-2.2) | 1.6 | `--primidian-line-height` | tokens/11 |
| Content Width | variable-text | 720px | `--primidian-content-width` | tokens/11 |

---

## 4. INTERFACE (L1)

### 4.1 General

| Setting | Type | Default | CSS Variable | Source File |
|---------|------|---------|--------------|-------------|
| Corner Radius — Small | variable-number (px) | 5 | `--primidian-radius-s` | tokens/10 |
| Corner Radius — Medium | variable-number (px) | 8 | `--primidian-radius-m` | tokens/10 |
| Corner Radius — Large | variable-number (px) | 12 | `--primidian-radius-l` | tokens/10 |
| Icon Resting Opacity | variable-number-slider (0.2-1) | 0.6 | `--primidian-icon-opacity` | tokens/14 |

### 4.2 Status Bar (L2)

| Setting | Type | Default | CSS Variable | Source File |
|---------|------|---------|--------------|-------------|
| Status Bar Style | class-select | Floating | — | ui/31 |
| Floating Opacity at Rest | variable-number-slider (0-1) | 0.45 | `--primidian-statusbar-opacity` | tokens/14 |

---

## 5. HEADINGS (L1)

| Setting | Type | Default | CSS Variable | Source File |
|---------|------|---------|--------------|-------------|
| Heading Style | class-select | Obsidianite | — | variants/71 |
| Heading Space Above | variable-text | 1.9em | `--primidian-h-margin-top` | tokens/14 |
| Heading Space Below | variable-text | 0.7em | `--primidian-h-margin-bottom` | tokens/14 |
| Underline Thickness | variable-number (px) | 1 | `--primidian-h-underline-width` | tokens/14 |
| Underline Offset | variable-text | 0.35em | `--primidian-h-underline-padding` | tokens/14 |
| Accent Bar Thickness | variable-number (px) | 3 | `--primidian-h-bar-width` | tokens/14 |
| Underline Colour | variable-themed-color | — | `--primidian-h-underline-color` | tokens/14 |
| Accent Bar / Marker Colour | variable-themed-color | — | `--primidian-h-marker-color` | tokens/14 |

### 5.1 Per-Heading Settings (L2: H1-H6)

Each heading level has:

| Setting | Type | Default (H1) | CSS Variable |
|---------|------|---------|--------------|
| Colour | variable-themed-color | #0fb5d7 | `--primidian-h1-color` |
| Font Size | variable-text | 2em | `--primidian-h1-size` |
| Font Weight | variable-number | 600 | `--primidian-h1-weight` |
| Letter Spacing | variable-text | normal | `--primidian-h1-spacing` |
| Text Transform | variable-select | none | `--primidian-h1-transform` |

---

## 6. DIVIDERS (L1)

| Setting | Type | Default | CSS Variable | Source File |
|---------|------|---------|--------------|-------------|
| Divider Style | class-select | Decorative | — | variants/70 |
| Line Pattern | class-select | Solid | — | components/51 |
| Thickness | variable-number (px) | 1 | `--primidian-divider-thickness` | tokens/14 |
| Line Width | variable-text | 100% | `--primidian-divider-width` | tokens/14 |
| Space Above | variable-text | 3em | `--primidian-divider-space-above` | tokens/14 |
| Space Below | variable-text | 3em | `--primidian-divider-space-below` | tokens/14 |
| Vertical Spacing (both) | variable-text | 3em | `--primidian-divider-margin` | tokens/14 |
| End Cap Size | variable-number (px) | 5 | `--primidian-divider-cap-size` | tokens/14 |
| Glyph Character | variable-text | § | `--primidian-divider-glyph` | tokens/14 |
| Glyph Rotation | variable-text | 60deg | `--primidian-divider-glyph-rotate` | tokens/14 |
| Glyph Size | variable-text | 1em | `--primidian-divider-glyph-size` | tokens/14 |
| Glyph Clearance | variable-text | 0.75em | `--primidian-divider-glyph-gap` | tokens/14 |
| Glyph Weight | variable-number | 400 | `--primidian-divider-glyph-weight` | tokens/14 |
| Sweep Duration | variable-text | 3.4s | `--primidian-divider-shimmer-duration` | tokens/14 |
| Highlight Width | variable-text | 22% | `--primidian-divider-shimmer-width` | tokens/14 |
| Line Colour | variable-themed-color | — | `--primidian-divider-color` | tokens/14 |
| Glyph Colour | variable-themed-color | — | `--primidian-divider-glyph-color` | tokens/14 |

---

## 7. BOLD, ITALIC & HIGHLIGHT (L1)

| Setting | Type | Default (Dark) | CSS Variable |
|---------|------|----------------|--------------|
| Bold Colour | variable-themed-color | #78a0f7 | `--primidian-bold-color` |
| Bold Weight | variable-number | 700 | `--primidian-bold-weight` |
| Italic Colour | variable-themed-color | #b896f8 | `--primidian-italic-color` |
| Highlight Background | variable-themed-color (opacity) | #f4579e40 | `--primidian-highlight-bg` |
| Highlight Text Colour | variable-themed-color | #ffffff | `--primidian-highlight-text` |
| Highlight Horizontal Padding | variable-text | 0.2em | `--primidian-highlight-padding-x` |
| Highlight Vertical Padding | variable-text | 0.05em | `--primidian-highlight-padding-y` |
| Highlight Corner Radius | variable-number (px) | 3 | `--primidian-highlight-radius` |
| Strikethrough Colour | variable-themed-color | #6d6a7c | `--primidian-strike-color` |

---

## 8. LINKS (L1)

| Setting | Type | Default (Dark) | CSS Variable |
|---------|------|----------------|--------------|
| Link Style | class-select | Sweep | — |
| Link Text Colour | variable-themed-color | #bfbfbf | `--primidian-link-color` |
| Link Text Colour on Hover | variable-themed-color | #07060a | `--primidian-link-hover-color` |
| Internal Link Underline | variable-themed-color (opacity) | #0fb5d78c | `--primidian-link-internal-accent` |
| External Link Underline | variable-themed-color (opacity) | #f4579e8c | `--primidian-link-external-accent` |
| Unresolved Link Colour | variable-themed-color | #6d6a7c | `--primidian-link-unresolved-color` |
| Underline Thickness at Rest | variable-number (px) | 5 | `--primidian-link-sweep-rest` |
| Sweep Height on Hover | variable-number (px) | 60 | `--primidian-link-sweep-hover` |

---

## 9. INLINE CODE (L1)

| Setting | Type | Default (Dark) | CSS Variable |
|---------|------|----------------|--------------|
| Text Colour | variable-themed-color | #0fb5d7 | `--primidian-inline-code-color` |
| Background | variable-themed-color (opacity) | #0fb5d717 | `--primidian-inline-code-bg` |
| Corner Radius | variable-number (px) | 3 | `--primidian-inline-code-radius` |
| Font Size | variable-text | 0.88em | `--primidian-inline-code-size` |

---

## 10. CODE BLOCKS (L1)

| Setting | Type | Default | CSS Variable |
|---------|------|---------|--------------|
| Code Block Style | class-select | Standard | — |
| Background | variable-themed-color | #191721 | `--primidian-code-bg` |
| Default Text Colour | variable-themed-color | #bfbfbf | `--primidian-code-color` |
| Corner Radius | variable-number (px) | 8 | `--primidian-code-radius` |
| Font Size | variable-text | 0.86em | `--primidian-code-size` |
| Line Height | variable-number-slider (1.2-2) | 1.55 | `--primidian-code-line-height` |
| Hide Language Label | class-toggle | false | — |

### 10.1 Line Numbers (L2)

| Setting | Type | Default | CSS Variable |
|---------|------|---------|--------------|
| Show Line Numbers | class-toggle | false | — |
| Line Number Colour | variable-themed-color | #0fb5d7 | `--primidian-linenum-color` |
| Line Number Opacity | variable-number-slider (0.1-1) | 0.45 | `--primidian-linenum-opacity` |
| Gutter Width | variable-text | 2.5em | `--primidian-linenum-width` |
| Gutter Gap | variable-text | 1em | `--primidian-linenum-gap` |
| Line Number Font Size | variable-text | 0.9em | `--primidian-linenum-size` |
| Gutter Separator Width | variable-number (px) | 0 | `--primidian-linenum-divider-width` |

### 10.2 Syntax Colours (L2)

| Setting | Type | Default (Dark) | CSS Variable |
|---------|------|----------------|--------------|
| Keywords | variable-themed-color | #f4579e | `--primidian-syntax-keyword` |
| Strings | variable-themed-color | #29d682 | `--primidian-syntax-string` |
| Numbers | variable-themed-color | #b896f8 | `--primidian-syntax-number` |
| Comments | variable-themed-color | #6d6a7c | `--primidian-syntax-comment` |
| Functions | variable-themed-color | #0fb5d7 | `--primidian-syntax-function` |
| Properties | variable-themed-color | #78a0f7 | `--primidian-syntax-property` |
| Types & Selectors | variable-themed-color | #fbbb28 | `--primidian-syntax-type` |
| Punctuation | variable-themed-color | #898698 | `--primidian-syntax-punctuation` |

---

## 11. CALLOUTS (L1)

| Setting | Type | Default | CSS Variable |
|---------|------|---------|--------------|
| Callout Style | class-select | Standard | — |
| Corner Radius | variable-number (px) | 8 | `--primidian-callout-radius` |
| Accent Edge Width | variable-number (px) | 3 | `--primidian-callout-accent-width` |
| Background Tint Strength | variable-text | 8% | `--primidian-callout-bg-opacity` |
| Title Font Weight | variable-number | 600 | `--primidian-callout-title-weight` |

---

## 12. BLOCKQUOTES (L1)

| Setting | Type | Default | CSS Variable |
|---------|------|---------|--------------|
| Blockquote Preset | class-select | Fade | — |
| Left Line Thickness | variable-number (px) | 3 | `--primidian-blockquote-left-width` |
| Box Border Thickness | variable-number (px) | 1 | `--primidian-blockquote-border-width` |
| Corner Radius | variable-number (px) | 5 | `--primidian-blockquote-radius` |
| Text Colour | variable-themed-color | #898698 | `--primidian-quote-color` |
| Accent Colour | variable-themed-color | #0fb5d7 | `--primidian-quote-border-color` |
| Background | variable-themed-color (opacity) | #0fb5d70a | `--primidian-quote-bg` |
| Left Border Width (Legacy) | variable-number (px) | 3 | `--primidian-quote-border-width` |
| Font Style | variable-select | normal | `--primidian-quote-style` |

---

## 13. CHECKBOXES & TASKS (L1)

| Setting | Type | Default | CSS Variable |
|---------|------|---------|--------------|
| Checkbox Shape | class-select | Rounded | — |
| Size | variable-text | 1.05em | `--primidian-checkbox-size` |
| Border Width | variable-number (px) | 2 | `--primidian-checkbox-border-width` |
| Corner Radius | variable-number (px) | 3 | `--primidian-checkbox-radius` |
| Unchecked Border Colour | variable-themed-color | #6d6a7c | `--primidian-checkbox-border-color` |
| Checked Background | variable-themed-color | #0fb5d7 | `--primidian-checkbox-checked-bg` |
| Tick Colour | variable-themed-color | #07060a | `--primidian-checkbox-marker-color` |
| Tick Size | variable-text | 68% | `--primidian-checkbox-marker-size` |
| Completed Task Text Colour | variable-themed-color | #6d6a7c | `--primidian-task-done-color` |
| Do Not Strike Through Completed Tasks | class-toggle | false | — |

### 13.1 Custom Task States (L2)

| Setting | Type | Default (Dark) | CSS Variable |
|---------|------|----------------|--------------|
| In Progress — [/] | variable-themed-color | #fbbb28 | `--primidian-task-progress-color` |
| Cancelled — [-] | variable-themed-color | #6d6a7c | `--primidian-task-cancelled-color` |
| Forwarded / Scheduled — [>] and [<] | variable-themed-color | #78a0f7 | `--primidian-task-forwarded-color` |
| Question — [?] | variable-themed-color | #b896f8 | `--primidian-task-question-color` |
| Important — [!] | variable-themed-color | #f1555a | `--primidian-task-important-color` |
| Star — [*] | variable-themed-color | #fbbb28 | `--primidian-task-star-color` |

---

## 14. TAGS (L1)

| Setting | Type | Default | CSS Variable |
|---------|------|---------|--------------|
| Tag Style | class-select | Pill | — |
| Text Colour | variable-themed-color | #0fb5d7 | `--primidian-tag-color` |
| Background | variable-themed-color (opacity) | #0fb5d724 | `--primidian-tag-bg` |
| Font Size | variable-text | 0.84em | `--primidian-tag-size` |
| Font Style | variable-select | italic | `--primidian-tag-style` |
| Corner Radius | variable-number (px) | 999 | `--primidian-tag-radius` |

---

## 15. TABLES (L1)

| Setting | Type | Default | CSS Variable |
|---------|------|---------|--------------|
| Table Style | class-select | Standard | — |
| Header Background | variable-themed-color | #191721 | `--primidian-table-header-bg` |
| Header Text Colour | variable-themed-color | #0fb5d7 | `--primidian-table-header-color` |
| Border Colour | variable-themed-color (opacity) | #0fb5d71f | `--primidian-table-border-color` |
| Alternating Row Tint | variable-text | 0% | `--primidian-table-stripe-opacity` |
| Cell Padding | variable-text | 0.45em 0.8em | `--primidian-table-cell-padding` |

---

## 16. LISTS, EMBEDS & PROPERTIES (L1)

| Setting | Type | Default | CSS Variable |
|---------|------|---------|--------------|
| List Bullet Colour | variable-themed-color | #0fb5d7 | `--primidian-list-marker-color` |
| Indent Guide Colour | variable-themed-color | #0fb5d7 | `--primidian-list-indent-color` |
| Indent Guide Opacity | variable-number-slider (0-1) | 0.35 | `--primidian-list-indent-opacity` |
| Embed Background | variable-themed-color | #191721 | `--primidian-embed-bg` |
| Embed Title Colour | variable-themed-color | #0fb5d7 | `--primidian-embed-title-color` |
| Embed Corner Radius | variable-number (px) | 8 | `--primidian-embed-radius` |
| Image Corner Radius | variable-number (px) | 8 | `--primidian-image-radius` |
| Properties Background | variable-themed-color | #191721 | `--primidian-props-bg` |
| Property Name Colour | variable-themed-color | #898698 | `--primidian-props-key-color` |

---

## 17. GRADIENT SYSTEM (L1)

| Setting | Type | Default (Dark) | CSS Variable |
|---------|------|----------------|--------------|
| Disable All Gradients | class-toggle | false | — |
| Global Gradient — Colour 1 | variable-themed-color | #0fb5d7 | `--primidian-grad-1` |
| Global Gradient — Colour 2 | variable-themed-color | #f4579e | `--primidian-grad-2` |
| Global Gradient Angle | variable-text | 62deg | `--primidian-grad-angle` |
| Bold Text Gradient Colour 1 | variable-themed-color | #90c3fd | `--primidian-bold-grad-1` |
| Bold Text Gradient Colour 2 | variable-themed-color | #ddbbfb | `--primidian-bold-grad-2` |
| Bold Text Gradient Angle | variable-text | 62deg | `--primidian-bold-grad-angle` |
| Heading Gradient Colour 1 | variable-themed-color | #0fb5d7 | `--primidian-h-grad-1` |
| Heading Gradient Colour 2 | variable-themed-color | #f4579e | `--primidian-h-grad-2` |
| Heading Gradient Angle | variable-text | 62deg | `--primidian-h-grad-angle` |
| Divider Gradient Colour 1 | variable-themed-color | #0fb5d7 | `--primidian-divider-grad-1` |
| Divider Gradient Colour 2 | variable-themed-color | #f4579e | `--primidian-divider-grad-2` |

---

## 18. GLOW SYSTEM (L1)

### 18.1 Master Controls

| Setting | Type | Default | CSS Variable |
|---------|------|---------|--------------|
| Disable Glow | class-toggle | true | — |
| Glow Engine | class-select | Automatic | — |

### 18.2 Global Glow (L2)

| Setting | Type | Default | CSS Variable |
|---------|------|---------|--------------|
| Intensity | variable-number-slider (0-2) | 1.5 | `--primidian-glow-intensity` |
| Blur Radius | variable-number (px) | 16 | `--primidian-glow-blur-base` |
| Opacity | variable-number-slider (0-1) | 0.45 | `--primidian-glow-alpha-base` |
| Global Opacity | variable-number-slider (0-1) | 1 | `--primidian-glow-opacity` |
| Spread | variable-number (px) | 0 | `--primidian-glow-spread` |
| Corner Radius | variable-number (px) | 0 | `--primidian-glow-radius` |

### 18.3 Glow Targets (L2)

| Setting | Type | Default |
|---------|------|---------|
| Text Glow | class-toggle | false |
| Heading Glow | class-toggle | true |
| Link Glow | class-toggle | true |
| Tag Glow | class-toggle | true |
| Highlight Glow | class-toggle | true |
| Divider Glow | class-toggle | true |
| Table Glow | class-toggle | false |
| Button Glow | class-toggle | true |
| Checkbox Glow | class-toggle | true |
| Toggle Glow | class-toggle | true |
| Slider Glow | class-toggle | true |
| Input Glow | class-toggle | true |
| Tab Glow | class-toggle | true |
| Sidebar Glow | class-toggle | true |
| Border Glow | class-toggle | false |
| Code Line Number Glow | class-toggle | false |

### 18.4 UI Glow (L2)

| Setting | Type | Default |
|---------|------|---------|
| Inactive UI Glow | variable-number (%) | 15 |
| Hover UI Glow | variable-number (%) | 50 |
| Selected / Active UI Glow | variable-number (%) | 100 |
| Document Title | class-toggle | true |
| Search | class-toggle | true |
| Sidebar Items | class-toggle | true |
| Sidebar Icons | class-toggle | true |
| Tabs | class-toggle | true |
| Buttons | class-toggle | true |
| Toggles | class-toggle | false |
| Sliders | class-toggle | false |
| Scrollbars | class-toggle | false |
| UI Controls | class-toggle | true |
| Mind Map | class-toggle | false |

### 18.5 Glow Behavior (L2)

| Setting | Type | Default |
|---------|------|---------|
| Pulse Animation | class-toggle | false |
| Pulse Duration | variable-number (s) | 3 |

---

## 19. ANIMATIONS (L1)

| Setting | Type | Default | CSS Variable |
|---------|------|---------|--------------|
| Disable All Animations | class-toggle | false | — |
| Animation Speed Multiplier | variable-number-slider (0.25-2) | 1 | `--primidian-motion-scale` |
| Ignore System Reduce-Motion | class-toggle | false | — |
| Disable Popup Entry Animation | class-toggle | false | — |
| Disable Checkbox Animation | class-toggle | false | — |
| Disable Button Press Effect | class-toggle | false | — |
| Disable Tab Motion | class-toggle | false | — |

### 19.1 Tab Motion (L2)

| Setting | Type | Default | CSS Variable |
|---------|------|---------|--------------|
| Hover Lift Distance | variable-number (px) | 2 | `--primidian-tab-lift` |
| Press Depth | variable-number (px) | 1 | `--primidian-tab-press` |
| Active Indicator Thickness | variable-number (px) | 2 | `--primidian-tab-indicator-height` |
| Active Indicator Inset | variable-text | 22% | `--primidian-tab-indicator-inset` |
| Inactive Tab Opacity | variable-number-slider (0.2-1) | 0.62 | `--primidian-tab-inactive-opacity` |

### 19.2 Individual Durations (L2)

| Setting | Type | Default | CSS Variable |
|---------|------|---------|--------------|
| Superfast | variable-text | 80ms | `--primidian-motion-superfast` |
| Fast | variable-text | 160ms | `--primidian-motion-fast` |
| Moderate | variable-text | 260ms | `--primidian-motion-moderate` |
| Slow | variable-text | 400ms | `--primidian-motion-slow` |
| Easing — Standard | variable-text | cubic-bezier(0.4, 0, 0.2, 1) | `--primidian-ease-standard` |
| Easing — Overshoot | variable-text | cubic-bezier(0.34, 1.56, 0.64, 1) | `--primidian-ease-overshoot` |

---

## 20. PLUGIN COMPATIBILITY (L1)

| Setting | Type | Default |
|---------|------|---------|
| Task List Kanban — Use Standard Checkbox Proportions | class-toggle | false |

---

## 21. ADVANCED (L1)

| Setting | Type | Default | CSS Variable |
|---------|------|---------|--------------|
| Disable Background Blur | class-toggle | false | — |
| Scrollbar Width | variable-number (px) | 10 | `--primidian-scrollbar-width` |
| Base Border Width | variable-number (px) | 1 | `--primidian-border-width` |

---

## SETTING TYPE DISTRIBUTION

| Type | Count | % |
|------|-------|---|
| class-toggle | ~40 | 33% |
| variable-themed-color | ~35 | 29% |
| variable-text | ~20 | 17% |
| variable-number | ~15 | 12% |
| variable-number-slider | ~10 | 8% |
| class-select | ~7 | 6% |
| variable-select | ~3 | 2% |

---

## KEY OBSERVATIONS

1. **Primidian has ~120 settings** — roughly half of Primary's ~215
2. **Primidian uses a token cascade** — accent color drives most components
3. **Primidian has a comprehensive glow system** — 16+ targets, 3 engines
4. **Primidian has a gradient system** — global + per-component gradients
5. **Primidian has proper animation controls** — duration scale, easing, reduced-motion
6. **Primidian has no folder color system** — unlike Primary's 12-color cycle
7. **Primidian's per-heading settings are leaner** — 5 settings per heading vs Primary's 16
8. **Primidian has fewer task states** — 6 vs Primary's 22
9. **Primidian has Plugin Compatibility section** — Primary has none
10. **Primidian bundles no fonts** — Primary bundles Cascadia Code + Inter
