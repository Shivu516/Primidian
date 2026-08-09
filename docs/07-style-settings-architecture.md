# 07 — Style Settings Architecture

Answers brief §6, §7. All claims here were verified against
`references/obsidian-style-settings/main.js` (v1.0.9) rather than documentation.

---

## 1. Verified plugin capabilities

### 1.1 Complete supported type list

From `main.js`, the `he` enum:

```js
he = {
  HEADING:                "heading",
  INFO_TEXT:              "info-text",
  CLASS_TOGGLE:           "class-toggle",
  CLASS_SELECT:           "class-select",
  VARIABLE_TEXT:          "variable-text",
  VARIABLE_NUMBER:        "variable-number",
  VARIABLE_NUMBER_SLIDER: "variable-number-slider",
  VARIABLE_SELECT:        "variable-select",
  VARIABLE_COLOR:         "variable-color",
  VARIABLE_THEMED_COLOR:  "variable-themed-color",
  COLOR_GRADIENT:         "color-gradient"
}
```

`color-gradient` is undocumented in most theme tutorials and unused by Primary, but it is implemented (`setConfig` collects it into `this.gradients`, and `tn()` interpolates it). It generates a numbered series of variables between two colours at a given step — useful but not needed for v1.

### 1.2 How values are applied

```js
setCSSVariables() {
  this.styleTag.innerText = `
    body.css-settings-manager             { --k: v; … }
    body.theme-light.css-settings-manager { --k: v; … }
    body.theme-dark.css-settings-manager  { --k: v; … }
  `;
  this.plugin.app.workspace.trigger("css-change", { source: "style-settings" });
}
```

**Consequence:** see the Primidian Directive in `06-css-architecture.md` §1. Theme defaults must live at `body` / `.theme-dark` / `.theme-light` specificity or lower.

### 1.3 How classes are applied

```js
initClasses() {
  … if (type === CLASS_TOGGLE) {
        if (value === true || (value === undefined && default === true))
          document.body.classList.add(setting.id);
      }
      else if (type === CLASS_SELECT) {
        let v = value ?? (default || "none");
        if (v !== "none") document.body.classList.add(v);
      }
}
```

**Consequences:**
- `class-toggle` adds a class **named after the setting's `id`**.
- `class-select` adds a class **named after the selected option's `value`**.
- Both land on `document.body`, so variant selectors are `body.primidian-…`.
- With `allowEmpty: false` and a `default`, exactly one option class is always present — so the theme can rely on a variant class existing.

### 1.4 Colour formats

```js
format: "hex" | "hsl" | "hsl-values" | "hsl-split" | "hsl-split-decimal"
      | "rgb" | "rgb-values" | "rgb-split"
```

- `hsl-split` → emits `--x-h`, `--x-s`, `--x-l` (+ `--x-a` if `opacity: true`)
- `rgb-values` → emits `r,g,b` — **exactly the format Obsidian's `--interactive-accent-rgb` needs**
- `alt-format:` allows one setting to emit **several** formats at once:

```yaml
- id: primidian-accent
  type: variable-themed-color
  format: hsl
  opacity: true
  alt-format:
    - id: primidian-accent-rgb
      format: rgb-values
    - id: primidian-accent-hsl
      format: hsl-split
```

One user-facing control → three usable variables. This is how Primidian fixes Obsidianite defect F-6 and enables `color-mix()`-free derivation.

### 1.5 Reset behaviour — brief §7 is satisfied natively

Verified in every component class:

```js
this.settingEl.addExtraButton(b => {
  b.setIcon("reset");
  b.onClick(() => {
    component.setValue(this.setting.default);
    this.settingsManager.clearSetting(this.sectionId, this.setting.id);
  });
  b.setTooltip("Restore default");
});
```

Plus, at section level (`SettingsMarkup.generate`):

```js
{ id: c.id, type: "heading", level: 0, resetFn: () => {
    plugin.settingsManager.clearSection(c.id); this.rerender();
} }
```

So the plugin already provides:
- **Per-setting reset** — a reset icon on every control
- **Per-section reset** — a reset icon on every heading
- **Whole-theme reset** — the top-level section heading
- **Export / Import JSON** — `ExportModal` / `ImportModal`

**The one hard requirement Primidian must meet:** every setting must declare `default` (or `default-light` + `default-dark`). Components explicitly bail with a console error otherwise:

```js
if (typeof this.setting.default !== "string")
  return console.error(`Error: ${title} missing default value`);
```

A setting with no default renders **nothing at all** and has no reset. This is the single most common Style Settings authoring mistake.

### 1.6 Search and i18n

- The panel has fuzzy search (`fuzzysort` on title + description) — good descriptions improve discoverability.
- Localised titles are supported via `title.<lang>` / `description.<lang>` keys. Not needed for v1, but the key format is worth knowing.

---

## 2. Proposed Primidian settings structure

Target: **~140–170 settings** for v1. Primary has 517; Obsidianite has 0. 150 is enough for deep customisation without an unusable panel (brief §5's explicit warning).

```
Primidian
│
├── ℹ️  About & Guide                                    [info-text × 3]
│
├── 1. Theme & Colours                                   [L1]
│   ├── Colour Profile                    class-select   (Default / AMOLED* / Midnight*)
│   ├── 1.1 Core Colours                                 [L2]
│   │   ├── Accent (Primary)              themed-color   + rgb-values alt-format
│   │   ├── Accent (Secondary)            themed-color
│   │   ├── Background — Primary          themed-color
│   │   ├── Background — Secondary        themed-color
│   │   ├── Background — Elevated         themed-color
│   │   ├── Text — Normal                 themed-color
│   │   ├── Text — Muted                  themed-color
│   │   ├── Text — Faint                  themed-color
│   │   └── Border Colour                 themed-color
│   └── 1.2 Semantic Colours                             [L2]
│       └── Success / Warning / Error     themed-color × 3
│
├── 2. Typography                                        [L1]
│   ├── Text Font                         variable-text
│   ├── Interface Font                    variable-text
│   ├── Monospace Font                    variable-text
│   ├── Base Font Size                    number (px)
│   ├── Body Font Weight                  number
│   └── Line Height                       number-slider (1.2–2.0, 0.05)
│
├── 3. Interface                                         [L1]
│   ├── Corner Radius — Small/Medium/Large number × 3 (px)
│   ├── 3.1 Status Bar                                   [L2]
│   │   ├── Status Bar Style              class-select   (Floating / Docked)
│   │   ├── Resting Opacity               number-slider  (0–1, 0.1)
│   │   └── Background                    themed-color
│   ├── 3.2 Sidebar & Ribbon                             [L2]
│   └── 3.3 Tabs                                         [L2]
│
├── 4. Headings                                          [L1]
│   ├── ℹ️ info-text
│   ├── Heading Style                     class-select   ★ VARIANT
│   │      Obsidianite / Minimal / Gradient / Bordered / Numbered
│   ├── Heading Top Margin                number (px)
│   ├── Heading Bottom Margin             number (px)
│   ├── Underline Thickness               number (px)
│   ├── Underline Colour                  themed-color
│   ├── 4.1 Heading 1                                    [L2]
│   │   ├── Colour                        themed-color
│   │   ├── Font Size                     number (px)
│   │   ├── Font Weight                   number
│   │   ├── Letter Spacing                variable-text
│   │   ├── Text Transform                variable-select (none/uppercase/…)
│   │   └── Use Gradient                  class-toggle   ★ GRADIENT
│   ├── 4.2 Heading 2 … 4.6 Heading 6     (same six controls each)
│
├── 5. Dividers                                          [L1]
│   ├── Divider Style                     class-select   ★ VARIANT
│   │      Standard / Minimal / Gradient / Decorative / Animated
│   ├── Thickness                         number (px)
│   ├── Vertical Spacing                  variable-text  (accepts em)
│   ├── Colour                            themed-color
│   ├── Glyph (Decorative style)          variable-text  ('§')
│   ├── Glyph Rotation                    variable-text  ('60deg')
│   ├── Glyph Colour                      themed-color
│   └── Use Gradient                      class-toggle   ★ GRADIENT
│
├── 6. Text & Emphasis                                   [L1]
│   ├── Bold Colour / Bold Weight
│   ├── Bold Uses Gradient                class-toggle   ★ GRADIENT  ← Bug #2 escape hatch
│   ├── Bold Gradient Colour 1 / 2        themed-color × 2
│   ├── Bold Gradient Angle               variable-text
│   ├── Italic Colour / Italic Font       themed-color, variable-text
│   ├── Highlight Colour / Background
│   └── Strikethrough Colour
│
├── 7. Links                                             [L1]
│   ├── Link Style                        class-select   ★ VARIANT
│   │      Sweep (Obsidianite) / Underline / Minimal / Pill
│   ├── Internal Link Colour / Accent     themed-color × 2
│   ├── External Link Colour / Accent     themed-color × 2
│   ├── Unresolved Link Colour            themed-color
│   ├── Unresolved Link Opacity           number-slider
│   ├── Sweep Thickness (rest)            number (px)
│   ├── Sweep Thickness (hover)           number (px)
│   └── Hover Text Colour                 themed-color
│
├── 8. Inline Code                                       [L1]
│   ├── Text Colour                       themed-color
│   ├── Background                        themed-color
│   ├── Corner Radius                     number (px)
│   ├── Horizontal Padding                number (px)
│   └── Font Size                         variable-text  (em)
│
├── 9. Code Blocks                                       [L1]
│   ├── Code Block Style                  class-select   ★ VARIANT
│   │      Standard / Bordered / Flat / Elevated
│   ├── Background                        themed-color
│   ├── Border Colour / Radius / Padding
│   ├── Font Size / Line Height
│   ├── Show Language Flair               class-toggle
│   └── 9.1 Syntax Colours                               [L2]
│       └── keyword / string / number / comment / function /
│           variable / operator / type / punctuation      themed-color × 9
│
├── 10. Callouts                                         [L1]
│   ├── Callout Style                     class-select   ★ VARIANT
│   │      Standard / Minimal / Bold Border / Solid
│   ├── Background Opacity                number-slider
│   ├── Corner Radius / Border Width
│   ├── Title Font Weight
│   └── Show Icon                         class-toggle
│
├── 11. Blockquotes                                      [L1]
│   ├── Blockquote Style                  class-select   ★ VARIANT
│   │      Obsidianite / Minimal / Solid
│   ├── Border Colour / Width
│   ├── Background                        themed-color
│   ├── Text Colour                       themed-color
│   ├── Show Quote Glyph                  class-toggle
│   └── Quote Glyph                       variable-text  ('!!')
│
├── 12. Checkboxes & Tasks                               [L1]
│   ├── Checkbox Style                    class-select   ★ VARIANT
│   │      Rounded / Square / Circle / Minimal
│   ├── Size / Border Width / Radius      number × 3 (px)
│   ├── Unchecked Border / Background     themed-color × 2
│   ├── Checked Background / Border       themed-color × 2
│   ├── Marker Colour / Marker Size       themed-color, number-slider
│   ├── Completed Text Colour             themed-color
│   ├── Strike Completed Text             class-toggle
│   └── 12.1 Custom Task States                          [L2]
│       └── In Progress / Cancelled / Question /
│           Important / Forwarded         themed-color × 5
│
├── 13. Tags                                             [L1]
│   ├── Tag Style                         class-select   ★ VARIANT
│   │      Pill / Outline / Minimal / Underline
│   ├── Text / Background / Border        themed-color × 3
│   ├── Radius / Padding X / Padding Y    number × 3
│   ├── Font Size                         variable-text
│   ├── Italic                            class-toggle
│   └── 13.1 Custom Tag Colours                          [L2]
│       └── Slot 1–6: Tag Name + Colour   variable-text + themed-color × 6
│              (replaces Obsidianite's 9 hard-coded names)
│
├── 14. Tables                                           [L1]
│   ├── Table Style                       class-select   ★ VARIANT
│   │      Standard / Bordered / Striped / Minimal
│   ├── Header Background / Text          themed-color × 2
│   ├── Row Border / Alternate Row BG     themed-color × 2
│   ├── Hover Row Background              themed-color
│   └── Cell Padding                      number (px)
│
├── 15. Lists                                            [L1]
│   ├── Bullet Colour / Number Colour     themed-color × 2
│   ├── Indent Guide Colour / Opacity     themed-color, number-slider
│   └── Line Spacing                      number-slider
│
├── 16. Embeds & Properties                              [L1]
│   ├── Embed Background / Border / Radius
│   ├── Embed Title Colour / Weight
│   ├── Properties Key Colour / Value Colour
│   └── Properties Background
│
├── 17. ✨ Gradient System                               [L1]
│   ├── ℹ️ info-text: how gradients cascade
│   ├── Enable Gradients (Global)         class-toggle   ★ MASTER
│   ├── Global Gradient Colour 1          themed-color
│   ├── Global Gradient Colour 2          themed-color
│   ├── Global Gradient Angle             variable-text
│   ├── 17.1 Headings Gradient                           [L2]
│   │   ├── Use Custom Colours            class-toggle
│   │   ├── Colour 1 / Colour 2           themed-color × 2
│   │   └── Angle                         variable-text
│   ├── 17.2 Links Gradient                              [L2]  (same 4)
│   ├── 17.3 Dividers Gradient                           [L2]  (same 4)
│   └── 17.4 Bold Text Gradient                          [L2]  (same 4)
│
├── 18. 🎬 Animations                                    [L1]
│   ├── ℹ️ info-text: reduced-motion note
│   ├── Enable Animations                 class-toggle   ★ MASTER
│   ├── Animation Speed                   variable-select (Instant/Fast/Normal/Relaxed)
│   ├── Speed Multiplier                  number-slider  (0.25–2.0, 0.05)
│   ├── Respect System Reduced Motion     class-toggle   (default ON)
│   ├── Duration — Superfast/Fast/Moderate/Slow  number × 4 (ms)
│   ├── Easing — Standard/Overshoot/Swing/Exit   variable-text × 4
│   ├── Enable Hover Lift                 class-toggle
│   ├── Enable Popup Entry Animation      class-toggle
│   └── Enable Checkbox Animation         class-toggle
│
├── 19. 🔌 Plugin Compatibility                          [L1]
│   ├── ℹ️ info-text: list of supported plugins
│   └── Task List Kanban — Match Theme Checkboxes  class-toggle (default ON)
│
└── 20. ⚙️ Advanced                                      [L1]
    ├── ℹ️ info-text: export/import + reset guidance
    ├── Disable Backdrop Blur             class-toggle   (performance)
    ├── Editor Max Line Width             variable-text
    └── Custom CSS Hook Notes             info-text
```

★ = variant or gradient control, cross-referenced in `08-*` and `09-*`.

---

## 3. Authoring rules

| # | Rule | Reason |
|---|---|---|
| SS-1 | **Every** setting declares `default` or `default-light` + `default-dark` | Otherwise the control does not render and has no reset |
| SS-2 | `id` = CSS variable name minus `--` | Plugin emits `--${id}`; mechanical mapping prevents typos |
| SS-3 | `collapsed: true` on every heading | 150+ settings need a navigable panel |
| SS-4 | Max nesting depth: **level 3** | Deeper is unnavigable |
| SS-5 | Colours use `type: variable-themed-color` unless genuinely mode-independent | Light/dark must be independently settable (brief §16) |
| SS-6 | `format: hsl`, `opacity: true` | Matches Tier-1 `hsl()`; enables alpha |
| SS-7 | Descriptions explain the *visual outcome*, not the CSS property | Brief §5's usability requirement |
| SS-8 | Numeric settings use `format: px` / `ms` rather than requiring the user to type units | Fewer invalid values |
| SS-9 | `allowEmpty: false` + explicit `default` on every `class-select` | Guarantees exactly one variant class is present |
| SS-10 | Variant option `value`s are prefixed `primidian-` | They become body classes; must not collide |
| SS-11 | Every `variable-text` used inside `content:` must be `quotes: true` | Plugin wraps the value in single quotes for CSS string context |
| SS-12 | Settings appear in the panel in YAML order | Order = information architecture |

---

## 4. Worked example — the accent colour

**YAML:**

```yaml
- id: primidian-accent
  type: variable-themed-color
  format: hsl
  opacity: true
  title: Accent Colour
  description: The main accent used by headings, links, tags, checkboxes and borders.
  default-dark:  'hsl(190, 87%, 45%)'
  default-light: 'hsl(190, 87%, 36%)'
  alt-format:
    - id: primidian-accent-rgb
      format: rgb-values
```

**What the plugin emits when the user picks a colour:**

```css
body.theme-dark.css-settings-manager {
  --primidian-accent: hsl(196, 90%, 50%);
  --primidian-accent-rgb: 13,178,242;
}
```

**What the theme does with it** (`15-obsidian-bridge.css`):

```css
.theme-dark, .theme-light {
  --text-accent:            var(--primidian-accent);
  --interactive-accent:     var(--primidian-accent);
  --interactive-accent-rgb: var(--primidian-accent-rgb);
}
```

**Result:** one colour picker updates headings, links, tags, checkboxes, borders, the ribbon, the status bar, Obsidian's own accent-driven UI, *and* every plugin that reads `--interactive-accent` or `--interactive-accent-rgb`. And the reset button restores `hsl(190, 87%, 45%)` in dark and `hsl(190, 87%, 36%)` in light, independently.

That single example is the whole architecture in miniature.

---

## 5. Reset/default strategy (brief §7)

| Level | Mechanism | Source |
|---|---|---|
| Single setting | Reset icon on the control | Plugin built-in — requires SS-1 |
| Component group | Reset icon on the L2/L3 heading | Plugin built-in (`clearSection`) |
| Whole theme | Reset icon on the top-level heading | Plugin built-in |
| Snapshot / restore | Export → JSON file; Import to restore | Plugin built-in (`ExportModal`/`ImportModal`) |
| Absolute fallback | Delete the theme's entry from `.obsidian/plugins/obsidian-style-settings/data.json` | Documented in README |

Nothing custom needs to be built. **The entire requirement reduces to discipline around SS-1.** This will be documented in the README as brief §7 requires, together with the note that Export/Import is also the v1 answer to "user colour profiles" (brief §15).

---

## 6. Validation plan

Because the `@settings` block is YAML inside a CSS comment, a syntax error silently disables the *entire* settings panel.

Mitigations:
1. Keep the block in its own source file (`src/01-settings.css`) so it is diff-reviewable.
2. Add a build-time check: extract the YAML between `/* @settings` and `*/`, parse it, and fail the build on error. ~15 lines using Node's built-in support plus a tiny YAML parser, or a regex-based structural check to stay dependency-free.
3. Add a build-time cross-check: **every `id` in the YAML must correspond to a `--<id>` declared in `src/tokens/`**, and every `class-select` option `value` must appear as a `body.<value>` selector in `src/variants/`. This catches the most damaging authoring error — a setting that exists in the panel but does nothing.

That second check is worth building. It converts "the setting silently does nothing" from a bug users report into a build failure.
