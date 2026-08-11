# 07 — Animation Architecture

> Analysis of Primary's underlying animation/design system and how an equivalent Primidian system could be structured.

---

## 1. PRIMARY'S UNDERLYING DESIGN PHILOSOPHY

### 1.1 Core Principles

After forensic analysis of Primary's animation system, these underlying principles emerge:

1. **Consistency through uniformity** — One duration (`0.15s`) and one easing (`cubic-bezier(0.4, 0, 0.2, 1)`) for all interactive transitions
2. **Physicality through transform** — Elements lift, sink, and press via `translateY()`, giving a tactile feel
3. **Elevation through shadow** — Layered `box-shadow` creates a consistent elevation hierarchy
4. **Feedback through color** — Hover/active states always include a color change for clear feedback
5. **Restraint through limitation** — Only `transform`, `opacity`, `color`, `background-color`, and `box-shadow` are animated

### 1.2 Transition Architecture

```
--button-anim: 0.15s cubic-bezier(0.4, 0, 0.2, 1);

/* Applied to: */
transition: background-color, box-shadow, border-color, color, transform var(--button-anim);
```

**Note**: This is a malformed comma list. In CSS, when you write:
```css
transition: background-color, box-shadow, transform 0.15s ease;
```
Only `transform` gets the timing function. The other properties transition instantly. This is a bug in Primary, not a feature.

### 1.3 Duration Scale

| Context | Duration |
|---------|----------|
| All interactive transitions | 0.15s |
| Popup/popdown keyframes | ~0.15s |

Primary uses a **single duration** for everything.

### 1.4 Easing Scale

| Context | Easing |
|---------|--------|
| All interactive transitions | cubic-bezier(0.4, 0, 0.2, 1) |
| Keyframes | cubic-bezier(0.4, 0, 0, 1) |

Primary uses a **single easing** for everything.

### 1.5 Shadow Hierarchy

| Elevation | Shadow |
|-----------|--------|
| Rest (buttons) | 0 1px 2px rgba(0,0,0,0.1) |
| Hover (buttons) | 0 2px 4px rgba(0,0,0,0.15) |
| Raised card (active tab) | inset 0 1px 0 + inset 0 -1px 0 + 0 2px 4px |
| Modal/popover | 0 4px 8px rgba(0,0,0,0.2) |

### 1.6 Transform Vocabulary

| Effect | Transform |
|--------|-----------|
| Tab hover lift | translateY(-2px) |
| Tab press sink | translateY(2px) |
| Button press | translateY(1px) |
| Slider thumb hover | scale(1.1) |
| Slider thumb active | scale(0.95) |
| Close button reveal | scale(0.85) → scale(1) |
| Folder expand | rotate(90deg) |

---

## 2. PRIMIDIAN'S EXISTING ANIMATION ARCHITECTURE

### 2.1 Core Principles

1. **Consistency through a named scale** — 4 durations × 2 easings
2. **Physicality through overshoot** — Spring-like entry animations
3. **Elevation through shadow** — Named shadow tokens
4. **Accessibility through respect** — `prefers-reduced-motion` by default
5. **Performance through explicitness** — Every transition lists property/duration/easing

### 2.2 Duration Scale

| Token | Value | Use |
|-------|-------|-----|
| `--primidian-motion-superfast` | 80ms | Hover tints, focus rings |
| `--primidian-motion-fast` | 160ms | Buttons, icons, checkboxes, tags |
| `--primidian-motion-moderate` | 260ms | Panels, popovers, link sweeps |
| `--primidian-motion-slow` | 400ms | Large surfaces, sidebars |

### 2.3 Easing Scale

| Token | Value | Use |
|-------|-------|-----|
| `--primidian-ease-standard` | cubic-bezier(0.4, 0, 0.2, 1) | Standard transitions |
| `--primidian-ease-overshoot` | cubic-bezier(0.34, 1.56, 0.64, 1) | Spring entries |

### 2.4 Keyframe Library

| Name | Effect |
|------|--------|
| `primidian-enter-up` | Popup entry (translateY + scale + opacity) |
| `primidian-enter-down` | Dropdown entry |
| `primidian-fade` | Simple opacity fade |
| `primidian-divider-shimmer` | Travelling highlight on hr |
| `primidian-tab-indicator-in` | ScaleX wipe on tab indicator |
| `primidian-tab-activate` | Subtle settle on tab activation |

### 2.5 Accessibility

```css
/* Off-ramp 1: explicit user switch */
body.primidian-animations-off * { ... }

/* Off-ramp 2: system preference (respected BY DEFAULT) */
@media (prefers-reduced-motion: reduce) {
  body:not(.primidian-motion-force) * { ... }
}

/* Off-ramp 3: granular toggles */
body.primidian-anim-no-hover-lift ... { ... }
```

---

## 3. COMPARATIVE ARCHITECTURE

### 3.1 Duration Strategy

| Aspect | Primary | Primidian |
|--------|---------|-----------|
| Approach | Single duration | Named scale (4 tiers) |
| Configurability | Not configurable | User-configurable |
| Scope | All transitions use same duration | Different durations per context |
| Rationale | Simplicity | Granular control |

### 3.2 Easing Strategy

| Aspect | Primary | Primidian |
|--------|---------|-----------|
| Approach | Single easing | Two named easings |
| Configurability | Not configurable | User-configurable |
| Scope | All transitions use same easing | Standard vs overshoot |

### 3.3 Keyframe Strategy

| Aspect | Primary | Primidian |
|--------|---------|-----------|
| Count | 2-3 | 6 |
| Purpose | Entry animations only | Entry + ambient + indicator |
| Performance concern | margin-top animation | All transform-only |

### 3.4 Accessibility Strategy

| Aspect | Primary | Primidian |
|--------|---------|-----------|
| prefers-reduced-motion | Not supported | Respected by default |
| User override | 3 toggles | 6 toggles + speed multiplier |
| System preference | Ignored | Honoured by default |

---

## 4. HOW A FUTURE PRIMIDIAN ANIMATION SYSTEM COULD BE STRUCTURED

### 4.1 Recommended Architecture

Based on the analysis, Primidian's existing animation architecture is already superior to Primary's in:

- **Accessibility**: Primidian has reduced-motion support; Primary doesn't
- **Granularity**: Primidian has 4 durations × 2 easings; Primary has 1 duration × 1 easing
- **Correctness**: Primidian's explicit property/duration/easing triplets are more correct than Primary's malformed comma lists
- **Performance**: Primidian avoids margin-top animation; Primary doesn't

### 4.2 Potential Improvements Inspired by Primary

#### 4.2.1 Shadow Consistency

Primary's shadow hierarchy is well-established. Primidian could benefit from:

```css
/* Named shadow tokens */
--primidian-shadow-s: 0 1px 2px rgba(0,0,0,0.1);
--primidian-shadow-m: 0 2px 4px rgba(0,0,0,0.15);
--primidian-shadow-l: 0 4px 8px rgba(0,0,0,0.2);
--primidian-shadow-inset-top: inset 0 1px 0 rgba(255,255,255,0.1);
--primidian-shadow-inset-bottom: inset 0 -1px 0 rgba(0,0,0,0.1);
```

#### 4.2.2 Transform Vocabulary

Primary's tab lift/sink pattern is a proven interaction model. Primidian already adapted this, but could extend it:

```css
/* Named transform tokens */
--primidian-lift-small: translateY(-2px);
--primidian-lift-medium: translateY(-4px);
--primidian-press-small: translateY(1px);
--primidian-press-medium: translateY(2px);
--primidian-scale-hover: scale(1.1);
--primidian-scale-active: scale(0.95);
--primidian-scale-reveal-from: scale(0.85);
--primidian-scale-reveal-to: scale(1);
```

#### 4.2.3 Button State Architecture

Primary's button states are clear and consistent:

```css
/* Button state tokens */
--primidian-button-shadow-rest: var(--primidian-shadow-s);
--primidian-button-shadow-hover: var(--primidian-shadow-m);
--primidian-button-shadow-active: none;
--primidian-button-transform-rest: translateY(0);
--primidian-button-transform-active: translateY(1px);
```

### 4.3 Unified Animation Token System

A future unified system could look like:

```css
body {
  /* Duration scale */
  --primidian-motion-superfast: 80ms;
  --primidian-motion-fast: 160ms;
  --primidian-motion-moderate: 260ms;
  --primidian-motion-slow: 400ms;

  /* Easing scale */
  --primidian-ease-standard: cubic-bezier(0.4, 0, 0.2, 1);
  --primidian-ease-overshoot: cubic-bezier(0.34, 1.56, 0.64, 1);

  /* Shadow scale */
  --primidian-shadow-s: 0 1px 2px rgba(0,0,0,0.1);
  --primidian-shadow-m: 0 2px 4px rgba(0,0,0,0.15);
  --primidian-shadow-l: 0 4px 8px rgba(0,0,0,0.2);

  /* Transform scale */
  --primidian-lift: translateY(-2px);
  --primidian-press: translateY(1px);
  --primidian-scale-up: scale(1.1);
  --primidian-scale-down: scale(0.95);
}
```

### 4.4 Component Animation Patterns

#### 4.4.1 Button Pattern

```css
button {
  transition: background-color var(--primidian-motion-fast) var(--primidian-ease-standard),
              box-shadow var(--primidian-motion-fast) var(--primidian-ease-standard),
              transform var(--primidian-motion-superfast) var(--primidian-ease-standard);
}

button:hover {
  box-shadow: var(--primidian-shadow-m);
}

button:active {
  transform: var(--primidian-press);
  box-shadow: none;
}
```

#### 4.4.2 Tab Pattern

```css
.workspace-tab-header {
  transition: opacity var(--primidian-motion-fast) var(--primidian-ease-standard),
              transform var(--primidian-motion-fast) var(--primidian-ease-overshoot),
              background-color var(--primidian-motion-fast) var(--primidian-ease-standard),
              box-shadow var(--primidian-motion-fast) var(--primidian-ease-standard);
}

.workspace-tab-header:not(.is-active):hover {
  transform: translateY(calc(-1 * var(--primidian-tab-lift)));
}

.workspace-tab-header:not(.is-active):active {
  transform: translateY(var(--primidian-tab-press));
}
```

#### 4.4.3 Input Pattern

```css
input {
  transition: border-color var(--primidian-motion-fast) var(--primidian-ease-standard),
              box-shadow var(--primidian-motion-fast) var(--primidian-ease-standard);
}

input:focus {
  border-color: var(--primidian-border-focus);
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--primidian-accent) 18%, transparent);
}
```

---

## 5. GLOW SYSTEM COEXISTENCE

### 5.1 Overlap Analysis

| Concept | Animation System | Glow System | Relationship |
|---------|-----------------|-------------|--------------|
| Shadow | box-shadow (elevation) | box-shadow (glow) | **Shared property** — must not conflict |
| Opacity | transition opacity | pulse animation | **Complementary** — pulse modulates glow opacity |
| Transform | translateY/scale | none (glow doesn't transform) | **Independent** |
| Color | background-color | color-mix (glow color) | **Independent** |
| Filter | none | drop-shadow | **Independent** |

### 5.2 Potential Conflicts

1. **box-shadow conflict**: If an element has both elevation shadow and glow shadow, they compete. Resolution: glow replaces elevation on glow-enabled elements, or glow uses a separate pseudo-element.

2. **transition conflict**: If a glow element also has an animation transition on the same property (box-shadow), the transition fights the pulse. Resolution: pulse animates opacity, not box-shadow.

3. **filter conflict**: `filter: drop-shadow()` creates a containing block, which can break positioned pseudo-elements. Resolution: careful target selection.

### 5.3 Recommended Boundaries

| System | Controls | Never Touches |
|--------|----------|---------------|
| Animation | transform, opacity, color, background-color, border-color | filter, box-shadow (when glow is active) |
| Glow | box-shadow (on glow targets), filter: drop-shadow | transform, opacity (except pulse) |

### 5.4 Shared Tokens

These tokens could safely be shared between animation and glow:

```css
/* Duration — glow state changes use animation durations */
--primidian-glow-ui-transition: var(--primidian-motion-fast);

/* Color — glow derives from the same color tokens */
--primidian-glow-color: var(--primidian-accent);
```

---

## 6. CONCLUSIONS

1. **Primidian's animation architecture is already more sophisticated than Primary's** — it has better accessibility, more granularity, and correct transition syntax.

2. **The main architectural lesson from Primary is the value of a consistent shadow hierarchy** — Primidian could benefit from named shadow tokens.

3. **Primidian should NOT copy Primary's single-duration approach** — the named duration scale is a genuine improvement.

4. **Primidian should NOT copy Primary's malformed transition lists** — the explicit property/duration/easing triplet pattern is correct.

5. **The glow and animation systems can coexist cleanly** — they control different properties and only need clear boundaries around box-shadow.

6. **Any future animation features should follow Primidian's existing patterns**:
   - Named duration/easing tokens
   - Explicit property/duration/easing triplets
   - `prefers-reduced-motion` support
   - Granular toggles via class-toggle
   - Compositor-only properties (transform, opacity)
