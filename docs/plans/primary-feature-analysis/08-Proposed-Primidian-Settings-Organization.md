# 08 — Proposed Primidian Settings Organization

> Current → Primary → Proposed Primidian organization.
> This document shows how Primidian's settings could eventually be reorganized.
> **NO IMPLEMENTATION** — research only.

---

## 1. CURRENT PRIMIDIAN STRUCTURE

```
Primidian (L1)
├── About & Guide
├── Colours
│   └── Core Colours
├── Typography
├── Interface
│   ├── General (radius, icon opacity)
│   └── Status Bar
├── Headings
│   ├── General (style, spacing, underline, bar)
│   ├── Heading 1
│   ├── Heading 2
│   ├── Heading 3
│   ├── Heading 4
│   ├── Heading 5
│   └── Heading 6
├── Dividers
│   ├── General (style, pattern)
│   ├── Dimensions
│   ├── Decorative Glyph
│   ├── Animated Style
│   └── Colours
├── Bold, Italic & Highlight
├── Links
├── Inline Code
├── Code Blocks
│   ├── General
│   ├── Line Numbers
│   └── Syntax Colours
├── Callouts
├── Blockquotes
├── Checkboxes & Tasks
│   ├── General
│   └── Custom Task States
├── Tags
├── Tables
├── Lists, Embeds & Properties
├── Gradient System
│   ├── General
│   ├── Bold Text Gradient
│   ├── Heading Gradient
│   └── Divider Gradient
├── Glow System
│   ├── Master Controls
│   ├── Global Glow
│   ├── Glow Targets
│   ├── UI Glow
│   └── Glow Behavior
├── Animations
│   ├── General
│   ├── Tab Motion
│   └── Individual Durations
├── Plugin Compatibility
└── Advanced
```

**Statistics**: 13 L1 categories, ~30 L2 subcategories, ~120 settings

---

## 2. PRIMARY STRUCTURE

```
Primary Theme Settings (L1)
├── Interface
│   ├── Typography
│   │   ├── Font Features
│   │   ├── Interface Font Sizes
│   │   └── Font Weight
│   ├── Animations and Effects
│   ├── Ribbon
│   ├── Editor
│   └── Status Bar
├── Components
│   └── Progress
├── Notes and Files
│   ├── Heading (×6 levels)
│   ├── Emphasis
│   ├── Highlight
│   ├── Link (×5 sub-types)
│   ├── Blockquotes
│   ├── List
│   ├── Checkbox
│   ├── Checkbox Icons (×22 types)
│   ├── Media
│   └── Note Embed
├── Canvas
├── File Explorer & Bookmarks
│   ├── Folder Behavior
│   ├── Folder 1-12 (×5 settings each)
│   └── Bookmarks Folders (×12 folders)
├── Graph
├── Advanced
└── Support Primary's Development
```

**Statistics**: 8 L1 categories, ~45 L2-L4 subcategories, ~215 settings

---

## 3. PROPOSED PRIMIDIAN STRUCTURE

### 3.1 Design Goals

1. **Preserve ALL existing Primidian settings** — no removals
2. **Group related settings logically** — reduce cognitive load
3. **Follow Primary's proven category hierarchy** — where it makes sense
4. **Maintain Primidian's token-driven architecture** — don't flatten to per-component colors
5. **Keep the total category count manageable** — aim for 10-12 L1 categories

### 3.2 Proposed Organization

```
Primidian (L1)
│
├── About & Guide                    [UNCHANGED]
│   ├── About & Guide
│   ├── Saving your setup
│   └── Attribution
│
├── Colours                          [UNCHANGED]
│   └── Core Colours
│       ├── Accent Colour
│       ├── Secondary Accent Colour
│       ├── Background — Primary
│       ├── Background — Secondary
│       ├── Background — Elevated
│       ├── Text — Normal
│       ├── Text — Muted
│       ├── Text — Faint
│       └── Border Colour
│
├── Typography                       [EXPANDED]
│   ├── Fonts
│   │   ├── Text Font
│   │   ├── Interface Font
│   │   └── Monospace Font
│   ├── Font Sizes                        [NEW — from Primary]
│   │   ├── Base Font Size
│   │   ├── Small UI Font Size            [NEW]
│   │   ├── Medium UI Font Size           [NEW]
│   │   └── Large UI Font Size            [NEW]
│   ├── Font Weights                      [NEW — from Primary]
│   │   ├── Body Font Weight
│   │   ├── Bold Weight                   [NEW]
│   │   └── Bold Modifier                 [NEW]
│   ├── Font Features                     [NEW — from Primary]
│   │   ├── Interface Font Features
│   │   ├── Text Font Features
│   │   └── Monospace Font Features
│   └── Readability
│       ├── Line Height
│       └── Content Width
│
├── Interface                        [REORGANIZED]
│   ├── General
│   │   ├── Corner Radius — Small
│   │   ├── Corner Radius — Medium
│   │   ├── Corner Radius — Large
│   │   └── Icon Resting Opacity
│   ├── Workspace                         [NEW]
│   │   ├── Editor Background Type        [NEW — from Primary]
│   │   ├── Editor Background Color       [NEW — from Primary]
│   │   ├── Editor Background Pattern Size [NEW — from Primary]
│   │   ├── Editor Background Pattern Color [NEW — from Primary]
│   │   ├── Editor Border Width           [NEW — from Primary]
│   │   ├── Editor Border Color           [NEW — from Primary]
│   │   ├── File Readable Line Width
│   │   └── Active Line Highlighting      [NEW — from Primary]
│   ├── File Header                       [NEW — from Primary]
│   │   ├── File Header Style
│   │   ├── File Header Border Width
│   │   └── File Header Border Color
│   ├── Ribbon                            [EXPANDED — from Primary]
│   │   ├── Ribbon Style
│   │   ├── Ribbon Background Color
│   │   ├── Ribbon Border Width
│   │   ├── Ribbon Border Color
│   │   ├── Ribbon Width
│   │   ├── Ribbon Icon Size
│   │   └── Ribbon Icons Spacing
│   ├── Status Bar
│   │   ├── Status Bar Style
│   │   ├── Floating Opacity at Rest
│   │   └── Floating Opacity on Hover     [NEW — from Primary]
│   └── File Explorer                     [NEW — from Primary]
│       ├── Folder Color Style            [NEW — simplified from Primary]
│       └── Folder Color 1-6              [NEW — simplified]
│
├── Editor & Markdown             [NEW L1 — splits Headings + content]
│   │
│   ├── Headings
│   │   ├── Style
│   │   ├── Space Above
│   │   ├── Space Below
│   │   ├── Underline Thickness
│   │   ├── Underline Offset
│   │   ├── Accent Bar Thickness
│   │   ├── Underline Colour
│   │   ├── Accent Bar / Marker Colour
│   │   ├── Heading 1 (color, size, weight, spacing, transform)
│   │   ├── Heading 2
│   │   ├── Heading 3
│   │   ├── Heading 4
│   │   ├── Heading 5
│   │   └── Heading 6
│   │
│   ├── Text Emphasis
│   │   ├── Bold Colour
│   │   ├── Bold Weight
│   │   ├── Italic Colour
│   │   ├── Highlight Background
│   │   ├── Highlight Text Colour
│   │   ├── Highlight Padding
│   │   ├── Highlight Corner Radius
│   │   └── Strikethrough Colour
│   │
│   ├── Links
│   │   ├── Link Style
│   │   ├── Link Text Colour
│   │   ├── Link Text Colour on Hover
│   │   ├── Internal Link Underline
│   │   ├── External Link Underline
│   │   ├── Unresolved Link Colour
│   │   ├── Underline Thickness at Rest
│   │   └── Sweep Height on Hover
│   │
│   ├── Blockquotes
│   │   ├── Blockquote Preset
│   │   ├── Left Line Thickness
│   │   ├── Box Border Thickness
│   │   ├── Corner Radius
│   │   ├── Text Colour
│   │   ├── Accent Colour
│   │   ├── Background
│   │   └── Font Style
│   │
│   ├── Callouts
│   │   ├── Callout Style
│   │   ├── Corner Radius
│   │   ├── Accent Edge Width
│   │   ├── Background Tint Strength
│   │   └── Title Font Weight
│   │
│   ├── Lists
│   │   ├── List Bullet Colour
│   │   ├── Indent Guide Colour
│   │   └── Indent Guide Opacity
│   │
│   ├── Checkboxes & Tasks
│   │   ├── Checkbox Shape
│   │   ├── Size
│   │   ├── Border Width
│   │   ├── Corner Radius
│   │   ├── Unchecked Border Colour
│   │   ├── Checked Background
│   │   ├── Tick Colour
│   │   ├── Tick Size
│   │   ├── Completed Task Text Colour
│   │   ├── Do Not Strike Through
│   │   └── Custom Task States (×6)
│   │
│   ├── Tables
│   │   ├── Table Style
│   │   ├── Header Background
│   │   ├── Header Text Colour
│   │   ├── Border Colour
│   │   ├── Alternating Row Tint
│   │   └── Cell Padding
│   │
│   ├── Tags
│   │   ├── Tag Style
│   │   ├── Text Colour
│   │   ├── Background
│   │   ├── Font Size
│   │   ├── Font Style
│   │   └── Corner Radius
│   │
│   ├── Code
│   │   ├── Code Block Style
│   │   ├── Background
│   │   ├── Default Text Colour
│   │   ├── Corner Radius
│   │   ├── Font Size
│   │   ├── Line Height
│   │   ├── Hide Language Label
│   │   ├── Line Numbers (gutter settings)
│   │   └── Syntax Colours (×8)
│   │
│   ├── Dividers
│   │   ├── Divider Style
│   │   ├── Line Pattern
│   │   ├── Dimensions (thickness, width, spacing)
│   │   ├── Decorative Glyph
│   │   ├── Animated Style
│   │   └── Colours
│   │
│   └── Embeds & Properties
│       ├── Embed Background
│       ├── Embed Title Colour
│       ├── Embed Corner Radius
│       ├── Image Corner Radius
│       ├── Properties Background
│       └── Property Name Colour
│
├── Gradient System                 [UNCHANGED]
│   ├── General
│   ├── Bold Text Gradient
│   ├── Heading Gradient
│   └── Divider Gradient
│
├── Glow System                      [UNCHANGED]
│   ├── Master Controls
│   ├── Global Glow
│   ├── Glow Targets
│   ├── UI Glow
│   └── Glow Behavior
│
├── Animations                       [UNCHANGED]
│   ├── General
│   ├── Tab Motion
│   └── Individual Durations
│
├── Plugin Compatibility             [UNCHANGED]
│   └── Task List Kanban
│
└── Advanced                         [EXPANDED]
    ├── General
    │   ├── Disable Background Blur
    │   ├── Scrollbar Width
    │   └── Base Border Width
    ├── Graph View                        [NEW — from Primary]
    │   ├── Resolved Note Node Color
    │   ├── Unresolved Note Node Color
    │   ├── Tag Node Color
    │   ├── Attachment Node Color
    │   ├── Active File Node Color
    │   ├── Hovered Node Color
    │   ├── Text Color
    │   ├── Line Color
    │   └── Arrow Color
    └── Canvas                            [NEW — from Primary]
        ├── Canvas Dot Pattern Color
        ├── Canvas Card Label Color
        └── Canvas Colors (×7)
```

---

## 4. MIGRATION MAP

This table shows where each current setting would move:

| Current Location | Proposed Location | Change |
|-----------------|-------------------|--------|
| About & Guide | About & Guide | None |
| Colours | Colours | None |
| Typography | Typography → Fonts | Reorganized |
| Interface (radius, icon opacity) | Interface → General | Reorganized |
| Interface → Status Bar | Interface → Status Bar | None |
| Headings (all) | Editor & Markdown → Headings | Moved |
| Dividers (all) | Editor & Markdown → Dividers | Moved |
| Bold, Italic & Highlight | Editor & Markdown → Text Emphasis | Moved |
| Links | Editor & Markdown → Links | Moved |
| Inline Code | Editor & Markdown → Code | Moved |
| Code Blocks | Editor & Markdown → Code | Moved |
| Callouts | Editor & Markdown → Callouts | Moved |
| Blockquotes | Editor & Markdown → Blockquotes | Moved |
| Checkboxes & Tasks | Editor & Markdown → Checkboxes & Tasks | Moved |
| Tags | Editor & Markdown → Tags | Moved |
| Tables | Editor & Markdown → Tables | Moved |
| Lists, Embeds & Properties | Editor & Markdown → Lists + Embeds & Properties | Split |
| Gradient System | Gradient System | None |
| Glow System | Glow System | None |
| Animations | Animations | None |
| Plugin Compatibility | Plugin Compatibility | None |
| Advanced | Advanced | None |

---

## 5. KEY DIFFERENCES FROM PRIMARY

| Aspect | Primary | Proposed Primidian |
|--------|---------|-------------------|
| L1 count | 8 | 12 |
| Color strategy | Per-component flat colors | Token cascade (accent-driven) |
| Folder colors | 12-color cycle | Simplified 6-color option |
| Heading settings | 16 per heading | 5 per heading (leaner) |
| Task states | 22 types | 6 types |
| Glow system | None | Comprehensive |
| Gradient system | None | Comprehensive |
| Animation controls | 3 toggles | Full duration/easing/reduced-motion |
| Plugin section | None | Task List Kanban |

---

## 6. RATIONALE

### 6.1 Why "Editor & Markdown" as a new L1?

Primary groups all content-related settings under "Notes and Files". Primidian's current structure scatters these across 10+ L1 categories. A dedicated "Editor & Markdown" section:

- Groups all content styling in one place
- Reduces the number of L1 categories users must scan
- Mirrors how users think about their content

### 6.2 Why move "Inline Code" into "Code"?

Primary groups inline code with code blocks. Primidian currently separates them. Combining them:

- Reduces L1 category count
- Groups all code-related settings logically
- Inline code is a variant of code styling

### 6.3 Why "Interface" expansion?

Primary has extensive ribbon, editor, and status bar settings. Primidian's current "Interface" is thin. Expanding it:

- Groups all workspace chrome settings
- Provides a home for new settings from Primary
- Separates "interface" from "content"

### 6.4 Why keep "Gradient System" and "Glow System" as L1?

These are Primidian's signature systems with no equivalent in Primary. They deserve top-level visibility because:

- They affect many components
- They have many settings each
- They're key differentiators for Primidian

---

## 7. SETTINGS PRESERVATION CHECKLIST

All ~120 existing Primidian settings are preserved:

- [x] About & Guide (4 settings)
- [x] Colours (9 settings)
- [x] Typography (7 settings)
- [x] Interface (6 settings)
- [x] Headings (38 settings)
- [x] Dividers (18 settings)
- [x] Bold, Italic & Highlight (9 settings)
- [x] Links (8 settings)
- [x] Inline Code (4 settings)
- [x] Code Blocks (18 settings)
- [x] Callouts (5 settings)
- [x] Blockquotes (9 settings)
- [x] Checkboxes & Tasks (15 settings)
- [x] Tags (6 settings)
- [x] Tables (6 settings)
- [x] Lists, Embeds & Properties (9 settings)
- [x] Gradient System (11 settings)
- [x] Glow System (32 settings)
- [x] Animations (14 settings)
- [x] Plugin Compatibility (1 setting)
- [x] Advanced (3 settings)

**Total: ~120 settings — ALL PRESERVED**
