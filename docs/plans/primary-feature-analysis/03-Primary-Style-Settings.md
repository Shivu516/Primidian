# 03 — Primary Style Settings

> Complete categorized inventory of Primary's Style Settings.
> Source: `references/Primary.css` lines 171-3878

---

## STATISTICS

- **Total settings categories (L1)**: 8
- **Total settings entries**: ~215
- **Total subcategories (L2-L4)**: ~45

---

## 1. INTERFACE (L1)

### 1.1 Typography (L2)

#### Font Features (L3)

| Setting | Type | Default | Description |
|---------|------|---------|-------------|
| Interface Font's Feature Settings | variable-text | `"calt" 1, "case" 0, "ccmp" 1, "ss03" 1, "cv01" 1, "cv05" 1, "cv06" 1, "cv08" 0, "cv11" 1, "cv12" 0, "cv13" 0` | font-feature-settings for interface font |
| Text Font's Feature Settings | variable-text | Same as above | font-feature-settings for text font |
| Monospace Font's Feature Settings | variable-text | `"calt" 1, "ss01" 1, "ss02" 1, "ss03" 1, "ss05" 1, "ss19" 1, "zero" 1` | font-feature-settings for monospace font |

#### Interface Font Sizes (L3)

| Setting | Type | Default | Description |
|---------|------|---------|-------------|
| Smallest UI Font Size | variable-number (px) | 11 | Smallest UI text |
| Smaller UI Font Size | variable-number (px) | 12 | Smaller UI text |
| Small UI Font Size | variable-number (px) | 13 | Small UI text |
| Medium UI Font Size | variable-number (px) | 15 | Medium UI text |
| Large UI Font Size | variable-number (px) | 20 | Large UI text |

#### Font Weight (L3)

| Setting | Type | Default | Description |
|---------|------|---------|-------------|
| Thin Font Weight | variable-number | 150 | Thin weight |
| Extralight Font Weight | variable-number | 250 | Extralight weight |
| Light Font Weight | variable-number | 350 | Light weight |
| Normal Font Weight | variable-number | 450 | Normal weight |
| Medium Font Weight | variable-number | 550 | Medium weight |
| Semibold Font Weight | variable-number | 650 | Semibold weight |
| Bold Font Weight | variable-number | 750 | Bold weight |
| Extrabold Font Weight | variable-number | 850 | Extrabold weight |
| Black Font Weight | variable-number | 900 | Black weight |
| Bold Modifier | variable-number | 200 | Added to Normal for certain bold UI components |

### 1.2 Animations and Effects (L2)

| Setting | Type | Default | Description |
|---------|------|---------|-------------|
| Remove Jumpy Tab Animations | class-toggle | — | Disables tab hover/press transforms |
| Remove Popup and Pop Down Animations | class-toggle | — | Disables modal entry/exit keyframes |
| Remove Popup Background Blur | class-toggle | — | Disables backdrop-filter on modals |

### 1.3 Ribbon (L2)

| Setting | Type | Default | Description |
|---------|------|---------|-------------|
| Ribbon Style | class-select | Docked | Docked or Slide Out on Hover |
| Ribbon Background Color | variable-themed-color | — | Background color |
| Ribbon Border Width | variable-text | 1px | Border width |
| Ribbon Border Color | variable-themed-color | — | Border color |
| Ribbon Top Right Border Roundness | variable-text | 0px 12px 12px 0px | Corner radius |
| Ribbon Width | variable-number (px) | 44 | Ribbon width |
| Ribbon Icon Size | variable-number (px) | 15 | Icon size |
| Ribbon Icons Spacing | variable-number (px) | 4 | Space between icons |

### 1.4 Editor (L2)

| Setting | Type | Default | Description |
|---------|------|---------|-------------|
| Editor Background Type | class-select | Plain Color | Plain, Line Grid, or Dot Grid |
| Editor Background Color | variable-themed-color | — | Background color |
| Editor Background Size for Pattern | variable-text | 50px 50px | Grid pattern size |
| Editor Background's Pattern Color | variable-themed-color | — | Grid line/dot color |
| Editor Border Width | variable-text | 1px | Border width |
| Editor Border Color | variable-themed-color | — | Border color |
| File Header | class-select | Always Show | Always Show, Hide Full, Hide Title |
| File Header Border Width | variable-text | 1px | Border width |
| File Header Border Color | variable-themed-color | — | Border color |
| File Readable Line Width | variable-text | 700px | Content width |
| Gutter Number Text Color | variable-themed-color | — | Line number color |
| Active Line Gutter Number Text Color | variable-themed-color | — | Active line number color |
| Toggle Active Line Highlighting | class-toggle | — | Active line background |
| Active Line Background Color | variable-themed-color | — | Active line bg color |

### 1.5 Status Bar (L2)

| Setting | Type | Default | Description |
|---------|------|---------|-------------|
| Status Bar Style | class-select | On Top | On Top, Visible Full Length, Slide Up Full Length, Slide Out, Floating |
| Status Bar Item Visibility | class-select | Show Everything | Show Everything, Sync Only, Word Count Only |
| Status Bar Background | variable-themed-color | — | Background color |
| Status Bar Border Width | variable-text | 1px | Border width |
| Status Bar Border Roundness | variable-text | 12px 0px 0px 12px | Corner radius |
| Floating Style - Status Bar Opacity at Rest | variable-number-slider | 0.5 | Resting opacity |
| Floating Style - Status Bar Opacity on Hover | variable-number-slider | 1 | Hover opacity |

---

## 2. COMPONENTS (L1)

### 2.1 Progress (L2)

| Setting | Type | Default | Description |
|---------|------|---------|-------------|
| Progress Bar Width | variable-text | 220px | Width |
| Progress Bar Height | variable-text | 8px | Height |
| Progress Background Color | variable-themed-color | — | Background color |
| Progress Border Widths | variable-text | 1px | Border width |
| Progress Bar Border Color | variable-themed-color | — | Border color |
| Progress Inner Value Roundness | variable-text | 8px | Value bar radius |
| Progress Inner Value Border Color | variable-themed-color | — | Value bar border |
| Progress Color 1 (0-39%) | variable-themed-color | — | Color for 0-39% |
| Progress Color 2 (40-59%) | variable-themed-color | — | Color for 40-59% |
| Progress Color 3 (60-79%) | variable-themed-color | — | Color for 60-79% |
| Progress Color 4 (80-99%) | variable-themed-color | — | Color for 80-99% |
| Progress 100% Leftmost Color | variable-themed-color | — | Gradient left |
| Progress 100% Middle Color | variable-themed-color | — | Gradient middle |
| Progress 100% Rightmost Color | variable-themed-color | — | Gradient right |

---

## 3. NOTES AND FILES (L1)

### 3.1 Heading (L2)

#### Heading 1-6 (L3 each)

Each heading level has these settings:

| Setting | Type | Default (H1) | Description |
|---------|------|---------|-------------|
| Font Size | variable-text | 1.802em | Size |
| Font Family | variable-text | Inter | Font |
| Font Weight | variable-number | 650 | Weight |
| Font Style | variable-text | normal | Style |
| Text Alignment | variable-text | left | Alignment |
| Letter Spacing | variable-text | 0px | Spacing |
| Text Transform | variable-select | normal | Transform |
| Line Height | variable-number | 1.2 | Line height |
| Color | variable-themed-color | — | Text color |
| Background Color | variable-themed-color | transparent | Background |
| Vertically Align Header to Center | class-toggle | — | Vertical centering |
| Border Thickness | variable-text | 0px | Border width |
| Border Style | variable-text | solid | Border style |
| Top Border Color | variable-themed-color | — | Top border |
| Right Border Color | variable-themed-color | — | Right border |
| Bottom Border Color | variable-themed-color | — | Bottom border |
| Left Border Color | variable-themed-color | — | Left border |
| Roundness | variable-text | 0px | Border radius |

### 3.2 Emphasis (L2)

| Setting | Type | Default | Description |
|---------|------|---------|-------------|
| Bold Text Color | variable-themed-color | — | Bold color |
| Bold Text Weight | variable-number | 750 | Bold weight |
| Italic Text Color | variable-themed-color | — | Italic color |
| Strikethrough Text Color | variable-themed-color | — | Strikethrough color |
| Underlined Text Color | variable-themed-color | — | Underline color |
| Underlined Text Line Opacity | variable-text | 22% | Underline opacity |
| Bold + Italic Text Color | variable-themed-color | — | Bold+Italic color |
| Bold + Italic Text Weight | variable-number | 625 | Bold+Italic weight |
| Bold + Italic + Strikethrough Color | variable-themed-color | — | Bold+Italic+Strike color |

### 3.3 Highlight (L2)

| Setting | Type | Default | Description |
|---------|------|---------|-------------|
| Highlight Text Color | variable-themed-color | — | Text color |
| Highlight Background Color | variable-themed-color | — | Background color |
| Bold + Highlight Text Color | variable-themed-color | — | Bold+Highlight text |
| Bold + Highlight Background Color | variable-themed-color | — | Bold+Highlight bg |
| Italic + Highlight Text Color | variable-themed-color | — | Italic+Highlight text |
| Italic + Highlight Background Color | variable-themed-color | — | Italic+Highlight bg |
| Strikethrough + Highlight Text Color | variable-themed-color | — | Strike+Highlight text |
| Strikethrough + Highlight Background Color | variable-themed-color | — | Strike+Highlight bg |
| Bold + Italic + Highlight Text Color | variable-themed-color | — | Bold+Italic+Highlight text |
| Bold + Italic + Highlight Background Color | variable-themed-color | — | Bold+Italic+Highlight bg |

### 3.4 Link (L2)

#### All Links (L3)

| Setting | Type | Default | Description |
|---------|------|---------|-------------|
| All Links Underline Offset | variable-text | 2px | Underline offset |
| All Links Underline Thickness | variable-text | 1.5px | Underline thickness |
| Link Underline Opacity | variable-text | 22% | Underline opacity |
| Remove Link Underline | class-toggle | — | Remove underline |
| Link Opacity when Pressed | variable-number | 0.5 | Pressed opacity |

#### Non-markdown Links (L3)

| Setting | Type | Default | Description |
|---------|------|---------|-------------|
| Non-markdown Links Color | variable-themed-color | — | Color |
| Non-markdown Links Color when Hovered | variable-themed-color | — | Hover color |

#### Unresolved Links (L3)

| Setting | Type | Default | Description |
|---------|------|---------|-------------|
| Unresolved Links Color | variable-themed-color | — | Color |
| Unresolved Links Color when Hovered | variable-themed-color | — | Hover color |
| Unresolved Link Opacity | variable-number | 1 | Opacity |

#### Resolved Links (L3)

| Setting | Type | Default | Description |
|---------|------|---------|-------------|
| Resolved Links Color | variable-themed-color | — | Color |
| Resolved Links Color when Hovered | variable-themed-color | — | Hover color |

#### External Links (L3)

| Setting | Type | Default | Description |
|---------|------|---------|-------------|
| External Links Color | variable-themed-color | — | Color |
| External Links Color when Hovered | variable-themed-color | — | Hover color |

### 3.5 Blockquotes (L2)

| Setting | Type | Default | Description |
|---------|------|---------|-------------|
| Blockquote Border Thickness | variable-text | 2px | Border width |
| Blockquote Border Color | variable-themed-color | — | Border color |
| Blockquote Background Color | variable-themed-color | — | Background color |

### 3.6 List (L2)

| Setting | Type | Default | Description |
|---------|------|---------|-------------|
| Reading Mode – Indentation Line Guide Indent | variable-number (em) | -0.85 | Reading indent |
| Live Preview Mode – Indentation Line Guide Indent | variable-number (em) | 0.975 | Live Preview indent |
| Source Mode – Indentation Line Guide Indent | variable-number (em) | 0.25 | Source indent |
| List Marker Color | variable-themed-color | — | Marker color |
| List Marker Color when Hovered | variable-themed-color | — | Hover color |
| List Marker Color when Collapsed | variable-themed-color | — | Collapsed color |

### 3.7 Checkbox (L2)

| Setting | Type | Default | Description |
|---------|------|---------|-------------|
| Unchecked Background Color | variable-themed-color | — | Unchecked bg |
| Checked Background Color | variable-themed-color | — | Checked bg |
| Checked Background Color when Hovered | variable-themed-color | — | Checked hover bg |
| Checked Item's Check Icon Color | variable-themed-color | — | Check icon color |
| Checked Text Color | variable-themed-color | — | Done text color |
| Checked Text Decoration | variable-text | line-through | Text decoration |
| Checkbox Border Radius | variable-text | 4px | Border radius |

### 3.8 Checkbox Icons (L2)

| Setting | Type | Default | Description |
|---------|------|---------|-------------|
| In Progress [/] Color | variable-themed-color | — | Color |
| In Progress [/] Color when Hovered | variable-themed-color | — | Hover color |
| Reschedule [>] Color | variable-themed-color | — | Color |
| Schedule or Date [<] Color | variable-themed-color | — | Color |
| Important [!] Color | variable-themed-color | — | Color |
| Important [!] Inner Icon Color | variable-themed-color | — | Icon color |
| Important [!] Border Radius | variable-text | 100% | Border radius |
| Cancelled [-] Color | variable-themed-color | — | Color |
| Cancelled [-] Text Color | variable-themed-color | — | Text color |
| Cancelled [-] Text Decoration | variable-text | line-through | Text decoration |
| Question [?] Color | variable-themed-color | — | Color |
| Question [?] Inner Icon Color | variable-themed-color | — | Icon color |
| Star [*] Color | variable-themed-color | — | Color |
| Star [*] Inner Icon Color | variable-themed-color | — | Icon color |
| Note [n] Color | variable-themed-color | — | Color |
| Location [l] Color | variable-themed-color | — | Color |
| Info [i] Color | variable-themed-color | — | Color |
| Info [i] Inner Icon Color | variable-themed-color | — | Icon color |
| Amount [S] Color | variable-themed-color | — | Color |
| Amount [S] Inner Icon Color | variable-themed-color | — | Icon color |
| Amount [S] Border Radius | variable-text | 100% | Border radius |
| Quote ["] Color | variable-themed-color | — | Color |
| Quote ["] Inner Icon Color | variable-themed-color | — | Icon color |
| Idea [I] Color | variable-themed-color | — | Color |
| Pro [p] Color | variable-themed-color | — | Color |
| Con [c] Color | variable-themed-color | — | Color |
| Bookmark [b] Color | variable-themed-color | — | Color |
| Up Trend Line [u] Color | variable-themed-color | — | Color |
| Down Trend Line [d] Color | variable-themed-color | — | Color |
| Rule or Law [r] Color | variable-themed-color | — | Color |
| Language or Translate [L] Color | variable-themed-color | — | Color |
| Time or Clock [t] Color | variable-themed-color | — | Color |
| Telephone [T] Color | variable-themed-color | — | Color |

### 3.9 Media (L2)

| Setting | Type | Default | Description |
|---------|------|---------|-------------|
| Media Border Radius | variable-text | 8px | Border radius for images/audio/video |

### 3.10 Note Embed (L2)

#### Note Embed Title (L3)

| Setting | Type | Default | Description |
|---------|------|---------|-------------|
| Note Embed Max Height | variable-text | 4000px | Max height |
| Note Embed Background Color | variable-themed-color | — | Background |
| Hide Note Embed Title | class-toggle | — | Hide title |
| Note Embed Title Font Size | variable-text | 12px | Font size |
| Note Embed Title Font Weight | variable-number | 500 | Font weight |
| Note Embed Title Text Transform | variable-text | none | Transform |
| Note Embed Title Letter Spacing | variable-text | normal | Spacing |
| Note Embed Title Color | variable-themed-color | — | Color |
| Note Embed Title Bottom Border Width | variable-text | 1px | Border width |
| Note Embed Title Bottom Border Style | variable-text | solid | Border style |
| Note Embed Title Border Color | variable-themed-color | — | Border color |
| Note Embed Title Bottom Margin Size | variable-text | 8px | Margin |

#### Note Embed Border (L3)

| Setting | Type | Default | Description |
|---------|------|---------|-------------|
| Note Embed Border Radius | variable-text | 12px | Border radius |

#### Note Embed Top/Right/Bottom/Left Border (L4 each)

Each side has: Width, Style, Color settings.

---

## 4. CANVAS (L1)

| Setting | Type | Default | Description |
|---------|------|---------|-------------|
| Canvas Dot Pattern Color | variable-themed-color | — | Dot pattern color |
| Canvas Card Label Color | variable-themed-color | — | Card label color |
| Canvas Color 1-7 | variable-themed-color (rgb) | — | 7 canvas colors |

---

## 5. FILE EXPLORER & BOOKMARKS (L1)

### 5.1 Folder Colors (L2) — 12 folders × 5 settings each

Each folder (1-12) has:

| Setting | Type | Description |
|---------|------|-------------|
| Folder N Text Color | variable-themed-color | Text color |
| Folder N Collapse Indicator Color | variable-themed-color | Collapse indicator |
| Folder N Background Color | variable-themed-color | Background |
| Folder N Background Color when Hovered | variable-themed-color | Hover background |
| Folder N Indentation Guide Color | variable-themed-color | Indent guide |

### 5.2 Folder Behavior Toggles

| Setting | Type | Description |
|---------|------|-------------|
| Toggle using Folders as Collapse Indicators | class-toggle | Use folders instead of chevrons |
| Toggle Colored Folder Text | class-toggle | Color folder names |
| Toggle Colored Folder Collapse Indicators | class-toggle | Color collapse indicators |
| Toggle Colored Folder Backgrounds | class-toggle | Color folder backgrounds |
| Toggle Colored Folder Colored Indentation Guide | class-toggle | Color indent guides |
| Toggle to Inherit Parent Folder Colors | class-toggle | Inherit parent colors |

### 5.3 Bookmarks Folders (L2)

Same 12-folder × 5-setting structure as File Explorer folders.

| Setting | Type | Description |
|---------|------|-------------|
| Custom Bookmarks Folders | class-toggle | Enable separate bookmark colors |
| Bookmark Folder 1-12 (×5 settings each) | variable-themed-color | Same as file explorer folders |

---

## 6. GRAPH (L1)

| Setting | Type | Default | Description |
|---------|------|---------|-------------|
| Resolved Note Node Color | variable-themed-color | — | Existing notes |
| Unresolved Note Node Color | variable-themed-color | — | Non-existing notes |
| Unresolved Note Node Opacity | variable-number | 1 | Opacity |
| Tag Node Color | variable-themed-color | — | Tag nodes |
| Attachment Node Color | variable-themed-color | — | Attachment nodes |
| Active File Node Color | variable-themed-color | — | Current file |
| Hovered Node Color | variable-themed-color | — | Hover |
| Hovered Node Line Color | variable-themed-color | — | Hover line |
| Text Color | variable-themed-color | — | Text |
| Line Color | variable-themed-color | — | Lines |
| Arrow Color | variable-themed-color | — | Arrows |

---

## 7. ADVANCED (L1)

Placeholder — "Coming soon!"

---

## 8. SUPPORT PRIMARY'S DEVELOPMENT (L1)

Informational links only.

---

## SETTING TYPE DISTRIBUTION

| Type | Count | % |
|------|-------|---|
| variable-themed-color | ~120 | 56% |
| variable-text | ~35 | 16% |
| variable-number | ~20 | 9% |
| class-toggle | ~15 | 7% |
| class-select | ~7 | 3% |
| variable-number-slider | ~5 | 2% |
| variable-select | ~7 | 3% |
| info-text | ~10 | 5% |

---

## KEY OBSERVATIONS

1. **Primary has ~215 settings** — significantly more than Primidian's ~120
2. **Folder colors dominate** — 12 folders × 5 settings × 2 (file explorer + bookmarks) = 120 settings alone
3. **Per-heading customization is extreme** — 6 headings × 16 settings = 96 settings
4. **Checkbox task states are comprehensive** — 22 custom task types with individual colors
5. **Primary uses a flat color system** — most colors are individual themed-color picks, not driven by a token cascade
6. **No gradient system** — unlike Primidian's gradient architecture
7. **No glow system** — Primary has no equivalent to Primidian's glow engine
8. **No animation duration/easing controls** — Primary's animations are not user-configurable
