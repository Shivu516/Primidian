# 02 — Reconnaissance: `Primary.css`

**Source file:** `Primary.css` (unmodified, preserved)
**Author:** Cecilia May (`@ceciliamay`)
**Upstream:** https://github.com/primary-theme/obsidian
**Licence:** **GNU General Public License v3** — stated explicitly in the file header (see §7 and `10-licensing-and-attribution.md`)
**Size:** 3,878 lines, 1,719,235 bytes

---

## 1. Physical file structure

This file is **minified and font-embedded**. Line counts are misleading:

| Line(s) | Content | Bytes |
|---|---|---|
| 1–85 | ASCII-art header comment (authorship, licence, links) | ~2 KB |
| 86–121 | Cascadia Code font licence comment | ~1 KB |
| 118 | **`@font-face` with base64 Cascadia Code** | 268,540 |
| 122–159 | Inter font licence comment | ~1 KB |
| 160 | **`@font-face` with base64 Inter** | 460,836 |
| 168 | **`@font-face` with base64 Inter Variable** | 507,924 |
| 170 | **The entire theme CSS, minified onto one line** | 359,538 |
| 171–3878 | **`/* @settings … */` YAML block** | ~208 KB |

**~1.24 MB (72%) of the file is base64-embedded webfonts.** Another ~208 KB (12%) is the Style Settings YAML. Only ~360 KB (21%) is actual CSS.

For analysis I expanded line 170 into a readable form (4,917 lines) at
`%TEMP%\opencode\primary-pretty.css`, and extracted the YAML to
`%TEMP%\opencode\primary-settings.yaml`. **Neither the original file nor the workspace was modified.**

---

## 2. Design system — the token architecture

This is Primary's genuine strength and the single most useful thing to learn from it.

### 2.1 Tier 1 — Primitive colour ramps

Primary defines **90 primitive colour variables**, split into a light set (`--color-l-*`) and a dark set (`--color-d-*`), each organised as a **numbered lightness ramp**:

```css
--color-d-gray-10:  hsla(32, 48%, 85%, 1);
--color-d-gray-20:  hsla(34, 39%, 74%, 1);
--color-d-gray-30:  hsla(34, 31%, 68%, 1);
--color-d-gray-40:  hsla(35, 27%, 55%, 1);
--color-d-gray-50:  hsla(34, 24%, 46%, 1);
--color-d-gray-60:  hsla(33, 27%, 33%, 1);
--color-d-gray-70:  hsla(31, 27%, 25%, 1);
--color-d-gray-80:  hsla(28, 22%, 19%, 1);
--color-d-gray-90:  hsla(33, 20%, 17%, 1);
--color-d-gray-100: hsla(30, 19%, 15%, 1);
--color-d-gray-110: hsla(30, 17%, 14%, 1);
--color-d-gray-120: hsla(29, 16%, 13%, 1);
/* …and equivalent ramps for red, orange, yellow, green, blue, purple */
```

Three critical observations:

1. **Everything is `hsla()`.** This makes programmatic manipulation trivial and is exactly what Style Settings' `hsl-split` format expects.
2. **The greys are not neutral** — they are hue-32° (warm sepia). This is what gives Primary its "yellowing magazine page" character. It is a deliberate, single-point-of-control design decision.
3. **The ramp is by lightness step, not by role.** `-10` is lightest, `-120` darkest, in the *dark* set. This inverts intuitively for the light set. It allows a designer to swap an entire ramp and have the whole theme re-tint coherently.

### 2.2 Tier 2 — Semantic tokens

Roughly **2,064 variable declarations** in total. Semantic tokens reference the primitives:

```css
--checkbox-marker-color: white;
--checkbox-color:        var(--color-d-green-40);
--checkbox-color-hover:  var(--color-d-green-30);
--checkbox-border-color: var(--color-d-gray-70);
--checkbox-border-color-hover: var(--color-d-gray-60);
```

Defined in three scopes:
- `body { … }` (line ~488) — mode-independent structural tokens (sizes, radii, animation, fonts)
- `.theme-light { … }` (line ~724) — light colour assignments
- `.theme-dark { … }` (line ~1438) — dark colour assignments

**This three-scope split is the pattern Primidian should copy.** It means `variable-themed-color` in Style Settings works natively, and it cleanly separates "structure" from "palette" — which is the prerequisite for the future colour-profile system in brief §15.

### 2.3 Tier 3 — Component tokens

Per-component, per-level granularity. Example for headings:

```css
--h1-weight: var(--font-semibold);
--h1-text-align: left;
--h1-letter-spacing: unset;
--h1-text-transform: normal;
--h1-border-width: 0px;
--h1-border-style: solid;
--h1-border-radius: 0px;
/* …identical set for h2 through h6 */
```

Every heading level gets an independent set of ~10 tokens, all with sane inert defaults (`0px`, `normal`, `unset`) so the tokens exist and are settable even when the default look does not use them.

**This is the key insight for the brief's §5 requirement.** Primary exposes *design tokens*, not *selectors*. A user changes `--h1-border-width`, not `.cm-header-1 { border-bottom-width }`. Primidian must do the same.

---

## 3. Animation system

### 3.1 Motion tokens

```css
--anim-popup:      0.3s   slideUp    forwards;
--anim-popup-alt:  0.335s slideUpAlt forwards;
--anim-popdown:    0.4s   slideDown  forwards;
--background-anim: background var(--anim-duration-fast) var(--anim-motion-smooth);
--button-anim:     var(--anim-duration-fast) var(--anim-motion-jumpy);
```

Plus a four-step duration scale and a named easing set, both exposed through Style Settings:

| Token | Role |
|---|---|
| `--anim-duration-superfast` | micro-feedback (hover tint, focus ring) |
| `--anim-duration-fast` | standard interactive (buttons, icons) |
| `--anim-duration-moderate` | container-level (panels, tabs) |
| `--anim-duration-slow` | large/deliberate (sidebar reveal) |
| `--anim-motion-smooth` | general ease |
| `--anim-motion-jumpy` | slight overshoot — buttons |
| `--anim-motion-swing` | pendulum — sliding elements |
| `--anim-motion-delay` | delayed-start |

**53 `transition:` declarations** in total, and **only 3 `@keyframes`**. That ratio is the lesson: Primary feels animated because of *consistent, tokenised, short transitions on interactive states*, not because of elaborate keyframe choreography.

### 3.2 The three keyframes

```css
@keyframes slideUp {
  0%   { transform: translateY(0);    opacity: 0;   }
  10%  { transform: translateY(8%);   opacity: .2;  }
  20%  { transform: translateY(5%);   opacity: .4;  }
  50%  { transform: translateY(-2%);  opacity: .85; }  /* overshoot */
  100% { transform: translateY(0);    opacity: 1;   }
}

@keyframes slideUpAlt {  /* animates margin-top — layout-thrashing */ }

@keyframes slideDown {
  0%   { transform: translateY(-10%); opacity: 0;   }
  60%  { transform: translateY(2%);   opacity: .85; }  /* overshoot */
  100% { transform: translateY(0);    opacity: 1;   }
}
```

`slideUp` / `slideDown` are **compositor-friendly** (`transform` + `opacity` only). Both use a deliberate overshoot at 50–60%, which is what gives the "physical" feel.

`slideUpAlt` animates `margin-top`, which triggers **layout on every frame**. Per brief §17, Primidian should not port this one; a `transform: translateY()` equivalent achieves the same visual at zero layout cost.

### 3.3 Where the motion is applied

| Target | Effect |
|---|---|
| Modals, popovers, suggestion menus, command palette | `--anim-popup` entry |
| Menus dismissing | `--anim-popdown` |
| Buttons, clickable icons | `box-shadow` + `transform` on `:hover`/`:active` |
| Nav items | `padding-left` shift on hover (a "nudge") |
| Tabs | container padding transition |
| Ribbon (`ribbon-slideout` mode) | slide-out on hover |
| Status bar (`sb-style-slideout`) | slide + opacity |
| Checkboxes | background/box-shadow transitions |
| Progress bars | `width` transition with `cubic-bezier(0.4, 0, 0.2, 1)` |

**No `prefers-reduced-motion` block exists in Primary.** Primidian should add one (brief §10, §22.12).

---

## 4. Checkbox system — the reference implementation

Primary styles the **native `<input type="checkbox">`** and never hides it.

```css
input[type=checkbox]:checked        { border-color: var(--checked-border-color); }
input[type=checkbox]:checked:hover  { border-color: var(--checked-border-color-hover); }
```

It then supports Obsidian's full `data-task` custom-state vocabulary with a dual selector strategy — matching **both** the input's own attribute and the parent `li`'s attribute:

```css
input[type=checkbox]:checked[data-task="/"],
li[data-task="/"] > input:checked,
li[data-task="/"] > p > input:checked {
  background: linear-gradient(to right, var(--inprogress-chbx-color) 50%, var(--checklist-bg) 50%);
  border-color: var(--inprogress-chbx-border-color);
}
input[type=checkbox]:checked[data-task="/"]:after { -webkit-mask-image: none; }
```

Supported states include `x X / - > < ! ? * n l i S T I L b c d f k p r t u w "`.

The marker glyph is drawn with **`-webkit-mask-image`** on the input's own `::after`, so the checkbox is one element with one pseudo-element — no parent dependency whatsoever.

**Why this matters enormously for Bug #1:**

Because Primary styles `input[type=checkbox]` **directly**, it works everywhere an input appears — inside Task List Kanban cards, inside Dataview tables, inside hover popovers, inside Bases views. Obsidianite's parent-`li`-dependent approach works only in a canonical markdown list. This is precisely why the user reports "other themes, including Primary, render them correctly".

Primary even ships an explicit compatibility rule for the *other* Kanban plugin:

```css
.kanban-plugin__item-prefix-button-wrapper input[type=checkbox] { filter: none; }
```

confirming that plugin-checkbox compatibility is a known concern that Primary handles by *reducing* interference, not by adding overrides.

---

## 5. Inline code — the reference implementation

```css
.cm-html-embed.cm-embed-block pre code,
.cm-s-obsidian .cm-inline-code:not(.cm-formatting),
.cm-s-obsidian code:not(pre code),
.markdown-rendered code:not(pre code) {
  color: var(--inline-code-color);
  background: var(--inline-code-bg);
  border-radius: var(--inline-code-radius);
}
```

Plus a `body`-scoped safety net and a blockquote-context override:

```css
body .cm-s-obsidian span.cm-inline-code, body code { color: …; background: …; }
body span.cm-quote.cm-inline-code                  { color: …; background: …; }
```

**Three things Primary does that Obsidianite does not:**

1. Targets **`.markdown-rendered code`**, not `.markdown-preview-view code`. `.markdown-rendered` covers reading mode **and** embeds, hover popovers, Canvas cards, plugin-rendered markdown (including Task List Kanban's `.content-preview.markdown-rendered`). `.markdown-preview-view` covers only the main reading pane.
2. Uses **`:not(pre code)`** to exclude fenced-block content, instead of relying on selector accident.
3. **Never applies `-webkit-text-fill-color` to `strong`.** Primary's bold is a plain `color` change (`--bold-color`), so no inheritance hazard exists. This is why Primary does not have Bug #2.

---

## 6. Style Settings integration — verified capability inventory

The `@settings` block contains **517 setting entries**. Distribution:

| Type | Count | Notes |
|---|---|---|
| `variable-themed-color` | 266 | Separate light/dark defaults, colour picker |
| `variable-text` | 90 | Free text (fonts, easing strings, `content` glyphs) |
| `heading` | 69 | Nesting/grouping, levels 1–4, `collapsed: true` |
| `variable-number` | 39 | With `format: px` suffix |
| `info-text` | 21 | With `markdown: true` for links |
| `class-toggle` | 19 | Adds/removes a class on `<body>` |
| `variable-select` | 6 | Dropdown that sets a variable |
| `class-select` | 5 | Dropdown that sets a body class — **the variant mechanism** |
| `variable-number-slider` | 2 | With `min`/`max`/`step` |

I cross-checked this against the Style Settings plugin source
(`references/obsidian-style-settings/main.js`) and confirmed the complete supported type list is:

```
heading, info-text, class-toggle, class-select,
variable-text, variable-number, variable-number-slider,
variable-select, variable-color, variable-themed-color,
color-gradient
```

Notably **`color-gradient`** exists in the plugin (`COLOR_GRADIENT: "color-gradient"`) and generates an interpolated set of numbered variables between two colours — Primary does not use it, but Primidian's gradient system could.

### 6.1 How Style Settings actually applies values (verified from source)

```js
this.styleTag.innerText = `
  body.css-settings-manager        { --key: value; … }
  body.theme-light.css-settings-manager { … }
  body.theme-dark.css-settings-manager  { … }
`;
```

**Critical implications for Primidian's architecture:**

1. Overrides land on **`body.css-settings-manager`**, specificity `(0,2,1)`.
   → Primidian's own defaults must be declared at **lower or equal** specificity, i.e. on `body`, `.theme-dark`, `.theme-light` — **never** on `body.something` and never with `!important`, or user settings silently fail.
2. `class-toggle` / `class-select` add classes to **`document.body`**.
   → Variant selectors must be written as `body.primidian-divider-gradient …`.
3. Reset behaviour is built in: **every** control renders an "Restore default" button that calls `clearSetting()`, and every `heading` section gets a section-level reset + export button.
   → Brief §7 is satisfied *for free* provided every setting declares a `default` / `default-light` / `default-dark`. **A setting with no default gets a console error and no reset.** This is the one hard requirement.
4. `variable-color` supports `format:` values `hex`, `hsl`, `hsl-values`, `hsl-split`, `hsl-split-decimal`, `rgb`, `rgb-values`, `rgb-split`.
   → `hsl-split` emits `--x-h`, `--x-s`, `--x-l`, `--x-a` as four separate variables. **This is how Primidian can offer "one accent colour → derived hover/muted/border tints" without extra settings.**
5. `alt-format` allows one setting to emit the same colour in multiple formats simultaneously.
   → Solves the `--interactive-accent-rgb` triplet problem elegantly.

### 6.2 Organisational patterns worth copying

- `collapsed: true` on every heading — keeps a 517-entry panel navigable.
- `info-text` with `markdown: true` at the top of each section for guidance.
- Level-1 headings as top-level domains (Interface / Components / Notes and Files / Canvas / File Explorer / Plugins), level-2 as component, level-3 as sub-aspect.
- Descriptions that explain the *design consequence*, not the CSS property.

---

## 7. Licence header (verbatim extract)

From lines ~66–83 of `Primary.css`:

> This theme is using the
> GNU GENERAL PUBLIC LICENSE v3.
>
> Please visit the project's README file
> for more information:
> https://git.new/primary/obsidian
>
> If you will be using parts of the code
> or are inspired, please do leave a link
> to my Ko-fi:
> https://ko-fi.com/ceciliamay
>
> as well as leave a link to the original
> GitHub repository:
> https://github.com/primary-theme/obsidian
>
> It has to be stated clearly, publicly,
> and visibly. Thank you so much!

The header also credits **Cascadia Code (Microsoft)** and **Inter** as embedded fonts, each with its own licence comment block.

Analysed in full in `10-licensing-and-attribution.md`.

---

## 8. What to take from Primary — and how

Because of the GPL constraint, "take" means **learn the pattern and write fresh code**, not copy.

| # | What | Nature | Copyright risk |
|---|---|---|---|
| P-1 | Three-tier token architecture (primitive ramp → semantic → component) | **Idea / method** | None. Architectural patterns are not copyrightable. |
| P-2 | `body` / `.theme-light` / `.theme-dark` three-scope split | **Idea** | None. This is the Obsidian-documented convention. |
| P-3 | Named duration + easing scale | **Idea + naming** | Use our own names (`--primidian-motion-*`). Values chosen independently. |
| P-4 | Transition-first motion (53 transitions : 3 keyframes) | **Philosophy** | None. |
| P-5 | Overshoot entry animation for popups | **Technique** | Write our own keyframes with our own stops. Overshoot easing is a universal animation principle. |
| P-6 | Native-`input` checkbox styling with `data-task` states | **Technique** | The *approach* is the standard, Obsidian-documented one. Our selectors and glyphs written fresh. |
| P-7 | `.markdown-rendered code:not(pre code)` targeting | **Fact about Obsidian's DOM** | None. Selectors dictated by the host app are not creative expression. |
| P-8 | Style Settings organisation (collapsed nesting, info-text) | **Idea** | None. |
| P-9 | Explicit per-component tokens with inert defaults (`0px`, `unset`) | **Idea** | None. |
| P-10 | Component variants via `class-select` + body classes | **Idea** — and the only mechanism the plugin offers | None. |

| # | What NOT to take | Reason |
|---|---|---|
| N-1 | Any literal CSS text | GPLv3 |
| N-2 | Primary's colour values (the sepia ramps) | GPLv3 + they contradict Obsidianite's identity |
| N-3 | Base64 embedded fonts | 1.24 MB; separate font licences; unnecessary |
| N-4 | `slideUpAlt` (margin-based) | Layout thrashing (brief §17) |
| N-5 | Primary's `@settings` YAML text | GPLv3 |
| N-6 | 12-slot coloured folder system | Scope creep |
| N-7 | Background blur on modals | Primary itself offers a toggle to disable it "for performance" |

---

## 9. Performance observations

| Observation | Detail |
|---|---|
| Only **2 `!important`** in 360 KB of CSS | Extremely disciplined. Primidian should match this. |
| `transition: border, box-shadow, transform var(--button-anim)` | ⚠ **Malformed.** In a comma-separated transition list, each segment needs its own timing. This parses as `border` (default timing), `box-shadow` (default), and `transform <timing>`. Appears at lines 2887, 2933, 2959, 3007, 3046. A real bug in Primary — do not replicate. |
| `color-mix(in srgb, …)` used for callout backgrounds | Modern, efficient, avoids pre-computed alpha variants. **Primidian should adopt this** instead of Obsidianite's `--bg-accent-25/55` approach. |
| Heavy use of `:is()` / `:where()` | `:where()` has zero specificity — very useful for writing defaults that Style Settings can override. **Adopt.** |
| Backdrop blur on modals | Expensive; Primary gates it behind a toggle. If Primidian uses blur, gate it too. |
