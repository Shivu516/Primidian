# 01 — Primary Animation Forensics

> Comprehensive forensic analysis of Primary's animation system.
> Source: `references/Primary.css` (1,719,235 bytes, 3,878 lines)

---

## 1. ANIMATION PHILOSOPHY

Primary's animation system is built on a philosophy of **consistent short transitions on interactive states** rather than elaborate choreography. The theme uses:

- **53 transitions** across the theme
- **3 keyframes** for entry/popup effects
- A single `--button-anim` variable (`0.15s cubic-bezier(0.4, 0, 0.2, 1)`) that drives most interactive transitions
- Transitions are written as comma-separated property lists with a single timing function at the end — a technique that is **malformed** (only the last segment receives the timing function in CSS)

---

## 2. KEYFRAMES

### 2.1 Popup/Popdown (Entry Animation)

```
@keyframes popup { ... }      /* modal/popover entry */
@keyframes popdown { ... }    /* modal/popover exit */
```

- **Trigger**: Opening modals, command palette, quick switcher, popovers
- **Properties animated**: `margin-top`, `opacity`, `transform`
- **Duration**: ~0.15s
- **Timing**: cubic-bezier easing
- **Note**: Animates `margin-top` which triggers layout on every frame — a performance concern Primidian deliberately avoids

### 2.2 Tab Animation

Primary uses smooth transitions on tab headers rather than keyframe-based animations.

---

## 3. INTERACTIVE STATE TRANSITIONS

### 3.1 Buttons

| State | Properties | Duration | Timing |
|-------|-----------|----------|--------|
| Normal → Hover | `background-color`, `box-shadow`, `border-color`, `color` | 0.15s | ease |
| Hover → Active | `transform: translateY(1px)`, `box-shadow` | 0.15s | ease |
| Focus | `box-shadow` (ring) | 0.15s | ease |

**Architecture**: Primary uses a combination of `box-shadow` and `transform` to create a 3D pressed effect. The button appears to lift (via shadow) and then press down (via translateY + shadow removal).

### 3.2 Clickable Icons

| State | Properties | Duration |
|-------|-----------|----------|
| Normal → Hover | `color`, `background-color` | 0.15s |
| Hover → Active | `color`, `background-color` | 0.15s |
| Focus | `box-shadow` | 0.15s |

### 3.3 Tabs

| State | Properties | Duration |
|-------|-----------|----------|
| Inactive → Hover | `transform: translateY(-2px)`, `box-shadow` | 0.15s |
| Hover → Active (press) | `transform: translateY(2px)` | 0.15s |
| Active tab | `box-shadow` (inset, layered) | — |

**Architecture**: Primary's tabs use:
- Inactive hover lifts the tab 2px upward with a shadow
- Press sinks it 2px downward
- Active tab uses layered inset box-shadows to create a raised card effect

### 3.4 Settings Toggles (.checkbox-container)

| State | Properties | Duration |
|-------|-----------|----------|
| Normal → Hover | `background-color`, `border-color` | 0.15s |
| Off → On | `background-color`, `transform` (thumb) | 0.15s |

### 3.5 Sliders

| State | Properties | Duration |
|-------|-----------|----------|
| Thumb hover | `transform: scale(1.1)` | 0.15s |
| Thumb active | `transform: scale(0.95)` | 0.15s |

### 3.6 Inputs

| State | Properties | Duration |
|-------|-----------|----------|
| Normal → Hover | `border-color` | 0.15s |
| Hover → Focus | `border-color`, `box-shadow` (ring) | 0.15s |

### 3.7 Dropdowns

Same transition pattern as inputs — border-color and box-shadow on focus.

### 3.8 File Explorer Items

| State | Properties | Duration |
|-------|-----------|----------|
| Normal → Hover | `background-color`, `color` | 0.15s |
| Active | `background-color`, `color` | — |

### 3.9 Folder Collapse Indicators

| State | Properties | Duration |
|-------|-----------|----------|
| Collapsed → Expanded | `transform: rotate(90deg)` | 0.15s |

### 3.10 Ribbon

| State | Properties | Duration |
|-------|-----------|----------|
| Icon hover | `color`, `background-color` | 0.15s |
| Slide-out ribbon | `transform: translateX()` | 0.15s |

### 3.11 Status Bar

| Style | Animation |
|-------|-----------|
| Slide Up Full Length | `transform: translateY()` on hover |
| Slide Out | `transform: translateX()` on hover |
| Floating | `opacity` transition on hover |

---

## 4. SETTINGS UI ANIMATIONS

### 4.1 Settings Categories

- **No explicit animation** on category expansion/collapse — Obsidian handles this natively
- Settings items have `border-top` separators (no animation)

### 4.2 Settings Controls

All controls use the same `--button-anim` timing:
- **Toggles**: `background-color` + `transform` on the thumb
- **Sliders**: `transform: scale()` on thumb hover
- **Buttons**: `background-color` + `box-shadow` + `transform`
- **Dropdowns**: `border-color` + `box-shadow` on focus

### 4.3 Search UI

- Search input: `box-shadow` on focus (same as other inputs)
- Search results: `background-color` on hover
- Command palette: popup keyframe animation on entry

---

## 5. EDITOR / MARKDOWN ANIMATIONS

### 5.1 Headings

- **No animations** on headings themselves
- Heading level indicators in Live Preview have color transitions

### 5.2 Links

| State | Properties | Duration |
|-------|-----------|----------|
| Normal → Hover | `color`, `text-decoration` | 0.15s |
| Active (pressed) | `opacity: 0.5` | 0.15s |

### 5.3 Checkboxes

| State | Properties | Duration |
|-------|-----------|----------|
| Unchecked → Checked | `background-color`, `border-color` | 0.15s |
| Check icon | `transform: scale()` spring | 0.15s |

### 5.4 Blockquotes

- No animations

### 5.5 Callouts

- No animations on the callout container itself

### 5.6 Code Blocks

- No animations on code blocks
- Copy button: `color` + `background-color` on hover

### 5.7 Lists

- List marker: `color` on hover (0.15s)
- Collapsed list item: `transform: rotate()` on the marker

### 5.8 Tables

- No animations

### 5.9 Embeds

- No animations on embed containers

### 5.10 Images

- No animations

---

## 6. POPOVER / MODAL ANIMATIONS

### 6.1 Entry Animation

```
@keyframes popup {
    0% { opacity: 0; transform: translateY(-10px) scale(0.98); }
    100% { opacity: 1; transform: translateY(0) scale(1); }
}
```

- **Trigger**: Opening any modal, popover, command palette, quick switcher
- **Properties**: `opacity`, `transform` (translateY + scale)
- **Duration**: ~0.15s
- **Timing**: cubic-bezier easing

### 6.2 Exit Animation

```
@keyframes popdown {
    0% { opacity: 1; transform: translateY(0) scale(1); }
    100% { opacity: 0; transform: translateY(-10px) scale(0.98); }
}
```

### 6.3 Background Blur

- `backdrop-filter: blur()` on the modal backdrop
- Can be disabled via "Remove Popup Background Blur" toggle

---

## 7. SPECIAL ANIMATED FEATURES

### 7.1 Colored Folders

- Folder text color cycles through up to 12 colors
- On hover: `background-color` transition (0.15s)
- Collapse indicator: `transform: rotate(90deg)` on expand

### 7.2 Progress Bars

- Gradient animation on the progress value bar
- Color changes based on percentage ranges (0-39%, 40-59%, 60-79%, 80-99%, 100%)

### 7.3 Active Line Highlighting

- Background color transition on the active line
- Can be toggled on/off

### 7.4 File Header

- Three modes: Always Show, Hide Full File Header (shows on hover), Hide Title (shows on hover)
- The hover-reveal modes use `opacity` + `transform` transitions

---

## 8. ANIMATION CONTROL TOGGLES

Primary provides these animation-disabling toggles:

| Toggle | Effect |
|--------|--------|
| Remove Jumpy Tab Animations | Disables tab hover/press transforms |
| Remove Popup and Pop Down Animations | Disables modal entry/exit keyframes |
| Remove Popup Background Blur | Disables backdrop-filter on modals |

---

## 9. PERFORMANCE ANALYSIS

### 9.1 GPU/Compositor-Friendly

- `transform` (translateY, scale) — compositor-only
- `opacity` — compositor-only
- `color` — minimal cost
- `background-color` — minimal cost

### 9.2 Moderate Cost

- `box-shadow` — can be expensive when animated on many elements
- `border-color` — triggers repaint

### 9.3 Potentially Expensive

- `margin-top` animation in popup keyframe — triggers layout on every frame
- `backdrop-filter: blur()` — GPU-intensive, especially on large vaults
- `transform: rotate()` on many folder indicators — compositor-only but many elements

---

## 10. COMPARISON WITH PRIMIDIAN

| Aspect | Primary | Primidian |
|--------|---------|-----------|
| Duration scale | Single `--button-anim` (0.15s) | 4-tier scale: superfast (80ms), fast (160ms), moderate (260ms), slow (400ms) |
| Easing | Single cubic-bezier | Two named easings: standard + overshoot |
| Keyframes | 3 (popup, popdown, tab) | 6 (enter-up, enter-down, fade, divider-shimmer, tab-indicator-in, tab-activate) |
| Reduced motion | Not built-in | Built-in via `prefers-reduced-motion` |
| Granular toggles | 3 toggles | 6 toggles (all, popups, checkbox, hover-lift, tabs) |
| Animation scope | Interactive states only | Interactive states + divider shimmer + tab indicator |
| Performance concern | `margin-top` animation | None — all transform/opacity |

---

## 11. KEY FINDINGS

1. **Primary's animation system is simpler than Primidian's** — it uses a single duration/easing pair for everything
2. **Primary lacks prefers-reduced-motion support** — a significant accessibility gap
3. **Primary's popup animation is the only keyframe-based entry** — and it has a performance issue with `margin-top`
4. **Primary's tab animation is the standout feature** — the lift/sink/raised-card pattern is well-executed
5. **Primary has no divider animation** — Primidian's animated divider is an original addition
6. **Primary's settings UI has no special animations** — controls use the same transitions as everywhere else
