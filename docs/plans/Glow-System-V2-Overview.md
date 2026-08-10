# Glow System V2 — Overview & Implementation Plan

## Current Architecture

The Primidian Glow System is a centralized, token-driven glow engine defined in `src/systems/82-glow.css`. It uses two resolved tokens:

- `--primidian-glow-alpha` (opacity) = base × intensity × opacity
- `--primidian-glow-blur` (radius) = base × intensity

Each glow target passes its own color token into `color-mix()`:
- **Text targets** use `text-shadow` (headings, links, tags, highlights, bold)
- **UI targets** use `box-shadow` (dividers, tables, checkboxes, buttons, toggles, sliders, inputs, tabs, sidebar)

Per-element toggles (`.primidian-glow-*` classes) gate glow for specific targets. The master off-switch (`body.primidian-glow-off`) sets alpha to 0% and blur to 0.

### Key Files
| File | Role |
|---|---|
| `src/systems/82-glow.css` | Glow engine, all glow rules |
| `src/tokens/14-components.css` | Glow tokens (intensity, blur, alpha, spread, opacity) |
| `src/01-settings.css` | Style Settings definitions |
| `src/variants/72-variants-scaffold.css` | Component variants |

### Current Glow Targets
Text: text, headings, links, tags, highlights, bold
UI: dividers, tables, checkboxes, buttons, toggles, sliders, inputs, tabs, sidebar, borders (blockquote), code line numbers

### Current Style Settings
- Disable Glow (master toggle, default: true = off)
- Global Glow: Intensity (1.5), Blur Radius (16), Opacity (0.45), Global Opacity (1), Spread (0), Corner Radius (0)
- Glow Targets: 16 independent toggles (text, headings, links, tags, highlights, dividers, tables, buttons, checkboxes, toggles, sliders, inputs, tabs, sidebar, borders, code)
- Glow Behavior: Pulse Animation, Pulse Duration

---

## Problems with Current Implementation

### 1. Rectangular Glow Artifacts
The current system uses `box-shadow` for UI elements and `text-shadow` for text. Box-shadow creates rectangular halos around non-rectangular elements (icons, glyphs, SVGs). This is most visible with:
- Decorative dividers with glyphs
- SVG icons
- Inline elements

### 2. No Gradient-Aware Glow
Current system uses solid color via `color-mix()`. Gradient text and gradient dividers cannot produce gradient glow.

### 3. Text-Shadow Limitations
Multiple text-shadows are needed for convincing glow, but the current system uses a single shadow. This produces less pronounced glow compared to stacked shadows.

### 4. No Drop-Shadow Support
`filter: drop-shadow()` follows the rendered alpha shape (glyph outlines, SVG paths) rather than creating a bounding box. This would eliminate rectangular artifacts for icons and decorative elements.

---

## Proposed Glow System V2 Architecture

### Three Glow Engine Modes

| Mode | Technique | Best For |
|---|---|---|
| **Text Shadow** | `text-shadow` | Headings, body text, links, inline code, code text, line numbers |
| **Drop Shadow** | `filter: drop-shadow()` | Icons, SVGs, decorative glyphs, dividers, UI controls |
| **Automatic** | Per-target method selection | Intelligently picks the best technique for each target |

### Automatic Mode Target Mapping

| Target | Method | Rationale |
|---|---|---|
| Headings | text-shadow | Text glyphs, follows shape |
| Body text | text-shadow | Text glyphs |
| Links | text-shadow | Text glyphs |
| Inline code | text-shadow | Text glyphs |
| Code text | text-shadow | Text glyphs |
| Code line numbers | text-shadow | Text glyphs |
| Bold text | text-shadow | Text glyphs |
| Highlights | text-shadow | Text glyphs |
| Tags | text-shadow | Text glyphs |
| SVG icons | filter: drop-shadow | Follows icon path |
| Buttons | filter: drop-shadow | Follows button shape |
| Checkboxes | filter: drop-shadow | Follows checkbox shape |
| Toggles | filter: drop-shadow | Follows toggle shape |
| Sliders | filter: drop-shadow | Follows thumb shape |
| Dividers | filter: drop-shadow | Follows divider shape (incl. glyph) |
| Tables | box-shadow | Rectangular, box-shadow is fine |
| Blockquotes | box-shadow | Rectangular container |
| Inputs | filter: drop-shadow | Follows input shape |
| Tabs | filter: drop-shadow | Follows tab shape |
| Sidebar | filter: drop-shadow | Follows item shape |

### Glow Parameters by Engine

| Parameter | Text Shadow | Drop Shadow | Box Shadow |
|---|---|---|---|
| Intensity | ✓ (scales blur+opacity) | ✓ (scales blur+opacity) | ✓ (scales blur+opacity) |
| Blur Radius | ✓ | ✓ | ✓ |
| Spread | ✗ (not supported) | ✗ (not supported) | ✓ |
| Opacity | ✓ (via color-mix) | ✓ (via color-mix) | ✓ (via color-mix) |
| Color | ✓ | ✓ | ✓ |

---

## Gradient Glow Analysis

### Feasibility

| Technique | Gradient Glow Support | Notes |
|---|---|---|
| text-shadow | ✗ | Cannot be gradient (single color only) |
| filter: drop-shadow | ✗ | Single color only |
| box-shadow | ✗ | Single color only |
| Pseudo-element with gradient | ✓ | Can simulate glow with blurred gradient layer |
| Background-clip + gradient | ✓ | For text specifically |

### Conclusion
True gradient glow is **not possible with pure CSS shadow properties** for arbitrary shapes. The practical approaches are:

1. **Pseudo-element glow**: A positioned pseudo-element behind the content with a blurred gradient background
2. **Multiple stacked shadows**: Approximate multi-color glow with multiple shadow layers
3. **Accept limitation**: Single-color glow for gradient elements (current behavior)

For Glow System V2, the pragmatic approach is:
- Single-color glow follows the **dominant color** of the gradient (first color stop or accent)
- Document this limitation clearly
- Future: investigate pseudo-element gradient glow for specific high-impact targets

---

## Divider Glow Analysis

### Current Divider Architecture
Dividers are `<hr>` elements with:
- `background-color` or `background-image` (gradient)
- `::before` pseudo-element (end caps)
- `::after` pseudo-element (decorative glyph)

### Drop-Shadow on Dividers

| Divider Style | Drop-Shadow Behavior |
|---|---|
| Standard (flat) | ✓ Follows rectangular shape |
| Minimal (flat) | ✓ Follows rectangular shape |
| Gradient | ✗ Drop-shadow uses single color, won't follow gradient |
| Decorative (glyph) | ✗ Drop-shadow creates bounding box around glyph |
| Animated | ✗ Drop-shadow conflicts with animation pseudo-elements |

### Recommendation
For dividers, the **Automatic mode** should:
- Use `box-shadow` for flat/rectangular dividers (Standard, Minimal)
- Use `text-shadow` on the `::after` glyph for decorative dividers
- Use `box-shadow` on the base `<hr>` for gradient dividers (accept single-color glow)
- Avoid drop-shadow on animated dividers (conflicts with pseudo-elements)

---

## Performance Analysis

### Desktop

| Technique | Performance | Notes |
|---|---|---|
| text-shadow | Excellent | GPU-accelerated, minimal cost |
| box-shadow | Excellent | GPU-accelerated, minimal cost |
| filter: drop-shadow | Good | Slightly more expensive than shadows, but acceptable |
| Multiple stacked shadows | Moderate | Each additional shadow adds cost |
| Large blur radii | Moderate | Larger blur = more GPU work |

### Mobile

| Technique | Performance | Notes |
|---|---|---|
| text-shadow | Good | Acceptable on modern mobile GPUs |
| box-shadow | Good | Acceptable on modern mobile GPUs |
| filter: drop-shadow | Moderate | Can be expensive on low-end devices |
| Multiple stacked shadows | Poor | Avoid on mobile |
| Large blur radii | Poor | Reduce defaults for mobile |

### Safeguards
1. Default blur values should be reasonable (16px max)
2. Limit stacked shadows to 2-3 layers maximum
3. Provide mobile-friendly defaults (lower blur, no stacking)
4. Avoid applying filters to large containers
5. Use `will-change: transform` sparingly for animated glow
6. Respect `prefers-reduced-motion` for pulse animation

---

## Style Settings Design

### Proposed Structure

```
Glow System
├── Enable Glow (master toggle)
├── Glow Engine
│   ├── Automatic (default)
│   ├── Text Shadow
│   └── Drop Shadow
├── Global Glow
│   ├── Intensity (0-2, default 1.5)
│   ├── Blur Radius (px, default 16)
│   ├── Opacity (0-1, default 0.45)
│   └── Global Opacity (0-1, default 1)
├── Glow Targets
│   ├── Text (toggle)
│   ├── Headings (toggle)
│   ├── Links (toggle)
│   ├── Tags (toggle)
│   ├── Highlights (toggle)
│   ├── Dividers (toggle)
│   ├── Tables (toggle)
│   ├── Buttons (toggle)
│   ├── Checkboxes (toggle)
│   ├── Toggles (toggle)
│   ├── Sliders (toggle)
│   ├── Inputs (toggle)
│   ├── Tabs (toggle)
│   ├── Sidebar (toggle)
│   └── Code Line Numbers (toggle)
├── Advanced
│   ├── Pulse Animation (toggle)
│   ├── Pulse Duration (s, default 3)
│   └── Mobile Optimization (toggle)
└── Engine-Specific
    ├── Text Shadow Layers (1-3, default 1)
    └── Drop Shadow Layers (1-3, default 1)
```

### Input Design
- All numeric inputs: unitless, unit stated in description
- Intensity: slider (0-2, step 0.05)
- Blur Radius: number (px)
- Opacity: slider (0-1, step 0.05)
- Spread: number (px) - only meaningful for box-shadow
- Corner Radius: number (px)
- Pulse Duration: number (s)

---

## Source Architecture

### Proposed File Changes

| File | Action | Description |
|---|---|---|
| `src/systems/82-glow.css` | Modify | Add engine modes, update selectors |
| `src/tokens/14-components.css` | Modify | Add engine-specific tokens |
| `src/01-settings.css` | Modify | Add Glow Engine dropdown, update descriptions |
| `src/variants/72-variants-scaffold.css` | Modify | Add glow engine variant hooks |

### Dependency Order

```
Style Settings (dropdown)
    ↓
Glow Tokens (--primidian-glow-engine, etc.)
    ↓
Glow Engine (CSS rules selecting technique)
    ↓
Target Definitions (each target's glow method)
    ↓
Reading Mode / Live Preview selectors
    ↓
Generated theme.css
```

---

## Implementation Roadmap

### Phase 1: Architecture/Token Preparation
- Add `--primidian-glow-engine` token (automatic | text-shadow | drop-shadow)
- Add `--primidian-glow-text-layers` token (1-3)
- Add `--primidian-glow-drop-layers` token (1-3)
- Add Glow Engine dropdown to Style Settings

### Phase 2: Text Shadow Enhancement
- Implement stacked text-shadow support
- Update all text targets to use configurable layer count

### Phase 3: Drop Shadow Implementation
- Implement `filter: drop-shadow()` for suitable targets
- Handle pseudo-element conflicts (divider glyph, heading bar)

### Phase 4: Automatic/Dynamic Engine
- Implement per-target method selection
- Add fallback logic for edge cases

### Phase 5: Target-Specific Wiring
- Update each glow target to support engine modes
- Handle special cases (dividers, blockquotes, code)

### Phase 6: Gradient-Aware Handling
- Document limitations
- Implement pseudo-element gradient glow for high-impact targets (optional)

### Phase 7: Reading Mode
- Verify all selectors work in Reading Mode
- Add Reading Mode-specific selectors where needed

### Phase 8: Live Preview
- Verify all selectors work in Live Preview
- Handle `.HyperMD-quote`, `.cm-header-*`, etc.

### Phase 9: Code Styler Compatibility
- Investigate Code Styler DOM
- Add compatibility selectors

### Phase 10: Performance Optimization
- Add mobile safeguards
- Optimize blur values
- Test with many glowing elements

### Phase 11: Regression Testing
- Test all four blockquote presets
- Test all five divider styles
- Test all other glow targets
- Verify no visual regressions

### Phase 12: Documentation
- Update README
- Document limitations
- Add user-facing documentation

---

## Backwards Compatibility

### Preserved
- All existing setting IDs
- All CSS variable names
- Default values (Intensity: 1.5, Blur: 16)
- Target enable/disable states
- Master off-switch behavior

### Changed
- Internal glow rendering technique (transparent to users who don't change engine)
- Added new optional settings (engine choice, layers)

### Migration
- No migration needed for existing users
- New settings have sensible defaults
- Old behavior preserved when engine = "automatic" (default)

---

## Open Questions

1. **Gradient glow**: Is pseudo-element gradient glow worth the complexity for dividers/headings?
2. **Mobile performance**: Should mobile defaults be lower than desktop?
3. **Code Styler**: What is the actual DOM structure? Need plugin source/reference.
4. **Drop-shadow on containers**: Does drop-shadow on a container with many children cause performance issues?
5. **Stacked shadows**: Is the visual improvement worth the performance cost?

---

## Risks

| Risk | Mitigation |
|---|---|
| Drop-shadow breaks positioned pseudo-elements | Use `box-shadow` fallback for affected targets |
| Mobile performance degradation | Add mobile-specific defaults, limit layers |
| Gradient glow not feasible with CSS | Document limitation, offer single-color glow |
| Existing settings become invalid | Preserve all IDs, add new settings as optional |
| Complex implementation introduces bugs | Phased rollout, extensive testing per phase |
