# 02 — Primary UI Effects

> Documentation of Primary's 3D buttons, shadows, hover effects, and dimensional UI.
> Source: `references/Primary.css`

---

## 1. 3D BUTTON ARCHITECTURE

### 1.1 The "Dimensional" Effect

Primary's buttons achieve a 3D appearance through a **carefully constructed combination of**:

1. **Layered box-shadows** — multiple shadows at different offsets
2. **Border manipulation** — subtle border color changes
3. **Background gradients** — linear gradients on the button surface
4. **Transform on press** — translateY(1px) to simulate depression
5. **Inset shadows on active** — to create a pressed-in look

### 1.2 Button State Machine

```
Normal State
    ├── Background: solid color or subtle gradient
    ├── Box-shadow: 1-2 layers (subtle elevation)
    └── Border: 1px solid (slightly darker than bg)

Hover State
    ├── Background: slightly lighter/darker
    ├── Box-shadow: enhanced (more visible elevation)
    └── Border: accent color

Active/Pressed State
    ├── Transform: translateY(1px) or translateY(2px)
    ├── Box-shadow: reduced or removed
    └── Background: slightly darker

Focus State
    ├── Box-shadow: outer ring (accent-colored)
    └── Border: accent color

Disabled State
    ├── Opacity: reduced
    └── Cursor: not-allowed
```

### 1.3 Shadow Hierarchy

Primary uses a consistent shadow system:

| Layer | Offset | Blur | Color | Use |
|-------|--------|------|-------|-----|
| 1 | 0 1px 2px | 4px | rgba(0,0,0,0.1) | Resting elevation |
| 2 | 0 2px 4px | 8px | rgba(0,0,0,0.15) | Hover elevation |
| 3 | 0 4px 8px | 16px | rgba(0,0,0,0.2) | Modal/popover |
| Inset | 0 1px 0 | 0 | rgba(255,255,255,0.1) | Top highlight |

---

## 2. TAB EFFECTS (The Standout Feature)

### 2.1 Inactive Tab

- **Background**: Transparent or very subtle
- **Opacity**: Reduced (approximately 0.7)
- **Border**: None visible
- **Transform**: translateY(0) at rest

### 2.2 Inactive Tab on Hover

- **Transform**: translateY(-2px) — lifts up
- **Box-shadow**: Subtle drop shadow appears
- **Opacity**: Increases to 1
- **Background**: Very subtle highlight

### 2.3 Inactive Tab on Press

- **Transform**: translateY(2px) — sinks down
- **Box-shadow**: Reduced
- **Transition duration**: Shorter than hover (snappier)

### 2.4 Active Tab (The "Raised Card")

The active tab is Primary's most sophisticated UI effect:

```
box-shadow:
    inset 0 1px 0 0 rgba(255,255,255,0.1),  /* top highlight */
    inset 0 -1px 0 0 rgba(0,0,0,0.1),        /* bottom shade */
    0 2px 4px rgba(0,0,0,0.15);              /* drop shadow */
```

**Visual result**: The tab reads as a physical card raised above the surface, with:
- A light line along the top edge (inset highlight)
- A dark line along the bottom edge (inset shade)
- A soft drop shadow underneath

### 2.5 Active Tab Indicator

- **Primary**: Uses `nth-child(3n+1/2/3)` to rotate through three accent colors
- **Border-top**: Colored accent line at the top of the active tab
- **Co-ordinated emphasis**: Container border, icon, and title all take the accent color simultaneously

### 2.6 Close Button

- **Hidden** by default (opacity: 0, scale: 0.85)
- **Appears** on tab hover or when tab is active
- **Hover**: Fills with accent color, glyph flips to on-accent color
- **Transition**: opacity + transform + background-color

---

## 3. SETTINGS PANEL EFFECTS

### 3.1 Toggle Switches

```
Normal:    bg: muted, border: subtle
Hover:     border: accent
Enabled:   bg: accent, border: accent, thumb slides right
```

- **Thumb animation**: `transform: translateX()` with overshoot easing
- **Track**: Background color transition

### 3.2 Sliders

```
Track:    muted background, rounded
Thumb:    accent color, circular
Hover:    thumb scales to 1.1
Active:   thumb scales to 0.95
```

### 3.3 Input Fields

```
Normal:   bg: secondary, border: subtle
Hover:   border: accent-muted
Focus:   border: accent, box-shadow: ring (accent at 20% opacity)
```

### 3.4 Dropdowns

Same pattern as input fields.

---

## 4. FILE EXPLORER EFFECTS

### 4.1 Colored Folders System

Primary's most distinctive UI feature is its **12-color folder system**:

- Each folder level cycles through up to 12 distinct colors
- Color applies to: text, collapse indicator, background (on hover), indentation guide
- **Folder 1**: Red tones
- **Folder 2**: Orange tones
- **Folder 3**: Yellow tones
- **Folder 4**: Green tones
- **Folder 5**: Teal/cyan tones
- **Folder 6**: Purple tones
- **Folders 7-12**: Repeat the cycle

### 4.2 Folder Hover Effects

- **Text**: Takes the folder's assigned color
- **Background**: Tinted with the folder's color at 12% opacity
- **Collapse indicator**: Rotates 90deg on expand

### 4.3 File Items

- **Hover**: Background color transition (subtle)
- **Active**: Accent background + accent text color

---

## 5. RIBBON EFFECTS

### 5.1 Docked Mode

- **Background**: Solid color matching sidebar
- **Border**: Subtle right border
- **Icons**: Reduced opacity at rest, full opacity + accent on hover

### 5.2 Slide Out on Hover

- **Default**: Ribbon is collapsed (narrow)
- **On hover**: Slides out to full width
- **Animation**: `transform: translateX()` with 0.15s easing

---

## 6. STATUS BAR EFFECTS

### 6.1 Style Variants

| Style | Effect |
|-------|--------|
| On Top | Default, no animation |
| Visible Full Length | Full width, no animation |
| Slide Up Full Length | Hidden below screen edge, slides up on hover |
| Slide Out | Slides in from side on hover |
| Floating | Semi-transparent, fades in on hover |

### 6.2 Floating Status Bar

- **At rest**: 50% opacity (configurable)
- **On hover**: 100% opacity
- **Transition**: opacity 0.15s
- **Border radius**: Rounded corners (12px 0 0 12px)

---

## 7. MODAL / POPOVER EFFECTS

### 7.1 Entry Animation

- **Transform**: translateY(-10px) → translateY(0)
- **Scale**: 0.98 → 1
- **Opacity**: 0 → 1
- **Background blur**: backdrop-filter on the overlay

### 7.2 Modal Container

- **Background**: Elevated surface color
- **Border radius**: 12px
- **Box shadow**: Deep layered shadow (3 layers)
- **Border**: 1px subtle border

---

## 8. SCROLLBAR EFFECTS

- **Track**: Transparent or very subtle
- **Thumb**: Muted color, rounded
- **Thumb on hover**: Accent color
- **Width**: Configurable

---

## 9. BLOCKQUOTE EFFECTS

- **Border**: Left border (2px solid, subtle color)
- **Background**: Very subtle tint
- **No animations**

---

## 10. CALLOUT EFFECTS

- **Border**: Left accent border
- **Background**: Tinted with accent color
- **No animations**

---

## 11. CODE BLOCK EFFECTS

- **Background**: Secondary surface
- **Border radius**: 8px
- **Border**: 1px subtle
- **Copy button**: Appears on hover
- **No animations on the block itself**

---

## 12. TAG EFFECTS

- **Background**: Tinted with accent
- **Border radius**: Pill shape
- **Hover**: Slightly brighter background
- **No animations**

---

## 13. COMPARISON WITH PRIMIDIAN

| Effect | Primary | Primidian |
|--------|---------|-----------|
| 3D buttons | Layered shadow + transform | Shadow + transform (simpler) |
| Tab raised card | Inset shadow layers | Inset shadow layers (adapted) |
| Tab lift/sink | translateY(-2px)/translateY(2px) | translateY(-2px)/translateY(1px) |
| Tab close button | Scale + opacity reveal | Scale + opacity reveal (adapted) |
| Tab indicator | nth-child color rotation | Single accent, scaleX wipe |
| Colored folders | 12-color cycle | Not implemented |
| Folder hover | Background tint + color | Simple accent hover |
| Ribbon slide-out | translateX animation | Not implemented |
| Status bar floating | Opacity fade | Opacity fade (adapted) |
| Status bar slide | translateX/Y | Not implemented |
| Modal entry | translateY + scale + opacity | translateY + scale (adapted) |
| Settings toggles | Background + thumb slide | Background + thumb slide (adapted) |
| Slider thumb | Scale on hover | Scale on hover (adapted) |

---

## 14. KEY FINDINGS

1. **Primary's 3D effect is NOT genuinely 3D** — it's a carefully constructed combination of shadows, borders, and transforms that creates the illusion of depth
2. **The tab raised card is Primary's signature effect** — achieved with layered inset box-shadows
3. **The 12-color folder system is Primary's most distinctive feature** — but it's a matter of taste and may not fit Primidian's design philosophy
4. **Primary uses consistent shadow layering throughout** — a coherent shadow hierarchy from buttons to modals
5. **Primary's ribbon slide-out is a clever space-saving feature** — but adds complexity
6. **Primary's status bar variants offer more options than Primidian** — 5 styles vs Primidian's 2
