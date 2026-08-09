# 04 — Bug #1: Task List Kanban Checkboxes Do Not Render Under Obsidianite

**Status:** Root cause identified with direct evidence from plugin source.
**Confidence:** High (~90%). Remaining 10% is visual confirmation, which requires running Obsidian.
**Plugin:** Task List Kanban v2.13.0 — Chris Kerr & Erika Rice Scherpelz — https://github.com/erikars/task-list-kanban
**Evidence source:** `references/task-list-kanban/main.js` (Svelte-compiled), `references/task-list-kanban/styles.css`

---

## 1. Reported behaviour

> Under Obsidianite, Task List Kanban checkboxes are not rendered correctly.
> Other themes, including Primary, render them correctly.

---

## 2. Investigation method

Task List Kanban ships as a compiled Svelte bundle. Component CSS is embedded as string literals in `main.js` under `$$css` objects. I extracted all 20 such blocks programmatically (read-only) and reconstructed the relevant component markup from the `from_html(...)` template literals.

The three components that matter:

| Component | `main.js` location | Svelte scope hash |
|---|---|---|
| `TaskStatusMarker.svelte` | lines 15336–15450 | `svelte-48e5ji` |
| `Task.svelte` | lines 17294–17900 | `svelte-1fvsaoa` |
| `TaskLineRow.svelte` | line ~15400 block 5 | `svelte-1y3uj64` |

---

## 3. The plugin's actual DOM

### 3.1 The status marker (the primary checkbox)

From `main.js:15336–15338`:

```js
var root3   = from_html(`<span class="status-text-marker svelte-48e5ji"> </span>`);
var root_1  = from_html(`<input type="checkbox" class="task-list-item-checkbox source-status-checkbox svelte-48e5ji" tabindex="-1" aria-hidden="true" style="pointer-events: none;"/>`);
var root_2  = from_html(`<span class="task-status-marker markdown-rendered markdown-preview-view markdown-source-view mod-cm6 svelte-48e5ji"><span><!></span></span>`);
```

And from `main.js:15437–15439`:

```js
styles  = set_style(span, "", styles, { "--task-status-marker-size": get(markerSize) });
classes = set_class(span_1, 1, "task-list-item HyperMD-task-line svelte-48e5ji", null, classes,
                    { "is-checked": get(resolvedIsChecked) });
set_attribute2(span_1, "data-task", status());
```

Reconstructed DOM:

```html
<span class="task-status-marker markdown-rendered markdown-preview-view markdown-source-view mod-cm6"
      style="--task-status-marker-size: 16px">
  <span class="task-list-item HyperMD-task-line is-checked" data-task="x">
    <input type="checkbox"
           class="task-list-item-checkbox source-status-checkbox"
           data-task="x" checked
           tabindex="-1" aria-hidden="true"
           style="pointer-events: none">
  </span>
</span>
```

**Four facts that decide this bug:**

| # | Fact | Consequence |
|---|---|---|
| A | The element carrying `.task-list-item` is a **`<span>`**, not an `<li>` | Any theme rule written as `li.task-list-item` misses entirely |
| B | There is **no `.contains-task-list` ancestor** anywhere | Any theme rule scoped under `.contains-task-list` misses entirely |
| C | The outer wrapper carries `markdown-preview-view` **and** `markdown-source-view mod-cm6` simultaneously | Rules written for *either* mode both apply, at once, out of context |
| D | The `.task-list-item` span is forced to `display: contents` by the plugin | It generates **no box**, so it cannot host an absolutely-positioned pseudo-element |

### 3.2 The plugin's own CSS for that marker

From `main.js:15342` (`$$css3.code`), reformatted:

```css
.task-status-marker {
  display: inline-flex !important;
  align-items: center;
  justify-content: center;
  width:      var(--task-status-marker-size);
  height:     var(--task-status-marker-size);
  min-width:  var(--task-status-marker-size);
  min-height: var(--task-status-marker-size);
  overflow: visible;
  margin: 0 !important;
  padding: 0 !important;
  text-indent: 0 !important;
  line-height: 1 !important;
  list-style: none !important;
  vertical-align: middle;
}

.task-status-marker .task-list-item.HyperMD-task-line {
  display: contents !important;          /* ← FACT D */
}

.task-status-marker .source-status-checkbox,
.task-status-marker .status-text-marker {
  display: inline-flex !important;
  box-sizing: border-box;
  width:      var(--task-status-marker-size) !important;
  height:     var(--task-status-marker-size) !important;
  margin: 0 !important;
  padding: 0 !important;
  pointer-events: none;
  text-indent: 0 !important;
  line-height: 1 !important;
  vertical-align: middle !important;
}

.task-status-marker .source-status-checkbox {
  position: relative !important;
  top: 0 !important;
  left: 0 !important;
  transform: none !important;
  margin: 0 !important;
  padding: 0 !important;
  appearance: none !important;
  -webkit-appearance: none !important;
  box-sizing: border-box !important;
}
```

Note the last block: the plugin sets **`appearance: none`** and provides **no** background, border, or `::after`. It is *explicitly delegating all visual rendering of the checkbox to the theme.* The plugin draws nothing itself.

This is the crux. **The plugin renders a bare, appearance-stripped input and expects the theme to paint it.** Primary paints `input[type=checkbox]` directly, so it works. Obsidianite paints a parent pseudo-element, so nothing appears.

### 3.3 The card body (the nested/preview checkboxes)

From `main.js:17294` and `17556–17582`:

```js
var root_17 = from_html(`<div role="button" class="content-preview markdown-rendered svelte-1fvsaoa" tabindex="0"></div>`);
…
await MarkdownRenderer.render(app(), contentToRender, previewContainerEl, task().path, markdownComponent);
…
const checkboxes = Array.from(previewContainerEl.querySelectorAll('input[type="checkbox"]'));
const [primaryCheckbox, ...nestedCheckboxes] = checkboxes;
primaryCheckbox.classList.add("task-primary-checkbox");
primaryCheckbox.style.visibility = "hidden";      // when not interactive
nestedCheckboxes.forEach(cb => cb.classList.add("task-nested-checkbox"));
```

And from `$$css10` (line 17317):

```css
.task .task-row-content .content-preview > ul {
  padding-left: 0 !important; margin: 0 !important; list-style: none !important;
}
.task-row-content .content-preview .task-list-item {
  min-width: 0; word-break: break-word;
  padding-left: 0 !important;        /* ← kills Obsidianite's 30px reservation */
  list-style-type: none !important;
}
.task-row-content .content-preview .task-list-item > input[type="checkbox"].task-primary-checkbox {
  display: none !important;
}
```

So inside a card, the plugin **strips all left padding** from `.task-list-item` and hides the primary checkbox, keeping only nested subtask checkboxes visible.

---

## 4. Obsidianite's implementation, re-examined against that DOM

`Obsidianite.css` lines 365–436:

```css
.contains-task-list .task-list-item {                      /* (0,2,0) */
  position: relative;
  padding-left: 30px;
}

.contains-task-list .task-list-item input[type='checkbox'] {   /* (0,3,1) */
  position: relative;
  top: 2px;
  left: -8px;
  width: 20px;
  height: 20px;
  margin: 0;
  opacity: 0;              /* ← THE REAL CHECKBOX IS MADE INVISIBLE */
  z-index: 10;
}

.contains-task-list .task-list-item::before {              /* the fake box */
  content: '';
  position: absolute;
  top: 2px;
  left: -25px;             /* ← magic offset, requires a positioned parent box */
  width: 20px; height: 20px;
  border: 2px solid #9e9e9e;
  border-radius: 3px;
  transition: all 0.3s;
  z-index: 1;
}

.contains-task-list .is-checked.task-list-item::before {
  border: 10px solid var(--text-accent);
  animation: bounce 300ms;
}

.contains-task-list .is-checked.task-list-item::after {    /* the fake tick */
  content: '';
  position: absolute;
  top: 8px; left: -21px;
  border-right: 3px solid transparent;
  border-bottom: 3px solid transparent;
  transform: rotate(45deg);
  animation: checked-box 125ms 250ms forwards;
  z-index: 5;
}
```

The design contract Obsidianite assumes:

```
<ul class="contains-task-list">            ← required ancestor
  <li class="task-list-item">              ← required positioned block box
    <input type=checkbox>                  ← hidden, used only as a hit target
    ::before                               ← the visible box, at left: -25px
    ::after                                ← the visible tick, at left: -21px
    label text
  </li>
</ul>
```

---

## 5. Root cause

### 5.1 Failure in the status marker (the main symptom)

Match Obsidianite's contract against the plugin's DOM:

| Requirement | Present in Kanban marker? | Result |
|---|---|---|
| `.contains-task-list` ancestor | ❌ **No** | Every `::before`/`::after` rule fails to match → **no fake box, no fake tick drawn** |
| `.task-list-item` on an element that generates a box | ❌ **No** — it is a `<span>` forced to `display: contents` | Even if the ancestor existed, `display: contents` removes the box, so `position: relative` and the pseudo-elements have no containing block |
| Real input visible | Depends | See below |

The `opacity: 0` rule is `.contains-task-list .task-list-item input[type='checkbox']`. It **also** requires `.contains-task-list`, so in the *status marker* it does **not** match. The real input is therefore not hidden by that rule.

But the plugin has already set `appearance: none !important` with no fallback paint, and Obsidianite provides **no `input[type=checkbox]` styling of any kind** (verified: the string `input[type` appears exactly once in the entire 1,481-line file, at line 387).

**⟹ Net result in the status marker: an appearance-stripped, unpainted, 16×16 input. A blank space. Nothing is drawn by the plugin, nothing is drawn by the theme.**

This is the primary reported symptom.

### 5.2 Failure inside the card content preview (the secondary symptom)

Here the DOM *does* come from `MarkdownRenderer.render()`, so Obsidian emits a genuine
`<ul class="contains-task-list"><li class="task-list-item">…`.

Obsidianite's rules now **do** match — and that is worse:

| Obsidianite rule | Plugin counter-rule | Outcome |
|---|---|---|
| `.contains-task-list .task-list-item { padding-left: 30px }` (0,2,0) | `.task-row-content .content-preview .task-list-item { padding-left: 0 !important }` | **Plugin wins** (`!important`). The 30px space Obsidianite reserved for its `left: -25px` pseudo-element is removed. |
| `…::before { left: -25px }` | — | Box is drawn **25px outside** the card's content area → clipped by `.task { overflow: hidden }` (confirmed in `$$css10`: `.task { position: relative; overflow: hidden; }`) → **invisible**. |
| `… input[type=checkbox] { opacity: 0 }` (0,3,1) | — | **Obsidianite wins.** The real nested subtask checkbox is made invisible. |
| `.markdown-preview-view ul > li.task-list-item { text-indent: -3em }` | `text-indent: 0 !important` on the marker only — not in the preview | Text shifts left by 3em inside cards. |

**⟹ Net result in the card body: nested subtask checkboxes are `opacity: 0` (invisible) AND their pseudo-element replacements are positioned outside a clipped container (also invisible). Double invisibility, plus text indent corruption.**

### 5.3 Why Primary works

Primary styles `input[type=checkbox]` **directly**, with no ancestor requirement, no parent-box requirement, and no `opacity: 0`. The plugin's `appearance: none` is exactly what Primary's own styling expects. The plugin's `width`/`height` overrides simply resize Primary's box. Everything renders.

Primary additionally supports `data-task` via `input[type=checkbox][data-task=…]`, and the plugin **sets `data-task` directly on the input** (`set_attribute2(input, "data-task", status())`, `main.js:15423`). So Primary even renders the *correct custom state glyph* inside Kanban cards.

---

## 6. Summary of the root cause

> **Obsidianite does not style checkboxes. It hides them and draws a decorative substitute on an ancestor element, using a selector chain (`.contains-task-list .task-list-item`) and a layout assumption (a positioned block-level `<li>` with 30px of left padding) that only hold inside canonical Obsidian markdown lists.**
>
> **Task List Kanban's status marker satisfies neither condition: there is no `.contains-task-list` ancestor, and the `.task-list-item` element is a `<span>` explicitly set to `display: contents`. The plugin further strips the input's native appearance and deliberately delegates painting to the theme — a delegation Obsidianite never accepts, because it has zero `input[type=checkbox]` rules.**
>
> **Inside the card body the selectors *do* match, and the outcome is worse: Obsidianite's `opacity: 0` wins on the input while the plugin's `padding-left: 0 !important` and `overflow: hidden` push and clip the substitute pseudo-element out of view.**

It is **not**:
- a specificity war (the selectors mostly do not match at all),
- an `appearance` conflict (Obsidianite never sets `appearance`),
- a z-index issue,
- a plugin bug.

---

## 7. Proposed fix

### 7.1 Principle

Fix at the root, not with an override. Per brief §11 and §22.4, no blanket `!important`.

**The fix is architectural: Primidian styles the native `input[type=checkbox]` and never hides it.** Obsidianite's pseudo-element mechanism is removed entirely, not patched.

### 7.2 Core implementation sketch

```css
/* ---- Core: the checkbox IS the input ---- */
input[type="checkbox"] {
  appearance: none;
  -webkit-appearance: none;
  position: relative;
  box-sizing: border-box;
  width:  var(--primidian-checkbox-size);
  height: var(--primidian-checkbox-size);
  margin: 0 var(--primidian-checkbox-gap) 0 0;
  border: var(--primidian-checkbox-border-width) solid var(--primidian-checkbox-border);
  border-radius: var(--primidian-checkbox-radius);
  background: var(--primidian-checkbox-bg);
  transition:
    background-color var(--primidian-motion-fast)      var(--primidian-ease-standard),
    border-color     var(--primidian-motion-fast)      var(--primidian-ease-standard),
    box-shadow       var(--primidian-motion-superfast) var(--primidian-ease-standard);
}

input[type="checkbox"]:checked {
  background: var(--primidian-checkbox-checked-bg);
  border-color: var(--primidian-checkbox-checked-border);
}

/* The tick — drawn on the INPUT'S OWN pseudo-element. No parent dependency. */
input[type="checkbox"]::after {
  content: "";
  position: absolute;
  inset: 0;
  background-color: var(--primidian-checkbox-marker);
  -webkit-mask-image: var(--primidian-checkbox-marker-icon);
  -webkit-mask-position: center;
  -webkit-mask-size: var(--primidian-checkbox-marker-size);
  -webkit-mask-repeat: no-repeat;
  transform: scale(0);
  opacity: 0;
  transition:
    transform var(--primidian-motion-fast) var(--primidian-ease-overshoot),
    opacity   var(--primidian-motion-superfast) linear;
}

input[type="checkbox"]:checked::after {
  transform: scale(1);
  opacity: 1;
}
```

The Obsidianite "bounce + tick draw" feel is preserved through `--primidian-ease-overshoot` on the marker's `scale`, rather than through the `border-width: 2px → 10px` keyframe. Same perceived motion, no parent element, no layout thrash.

### 7.3 `data-task` state support (new capability)

```css
li[data-task="/"]     > input[type="checkbox"]:checked,
li[data-task="/"] > p > input[type="checkbox"]:checked,
input[type="checkbox"]:checked[data-task="/"] {
  background: linear-gradient(to right,
              var(--primidian-checkbox-inprogress) 50%,
              var(--primidian-checkbox-bg) 50%);
}
```

The third selector (`input[…][data-task]`) is specifically what makes Task List Kanban's status marker show the right glyph, because the plugin sets `data-task` on the input itself.

### 7.4 Isolated compatibility layer

Per brief §18, a clearly-labelled, minimal section:

```css
/* ========================================
   PLUGIN COMPATIBILITY — Task List Kanban
   github.com/erikars/task-list-kanban  (v2.13.0)

   The plugin renders an appearance:none input inside a
   display:contents span and delegates painting to the theme.
   Primidian's core checkbox rules already handle this correctly.
   The rules below only harmonise SIZING with the plugin's
   --task-status-marker-size token.
   ======================================== */

.task-status-marker input[type="checkbox"].source-status-checkbox {
  border-width: max(1px, calc(var(--task-status-marker-size, 16px) / 12));
  border-radius: calc(var(--primidian-checkbox-radius) * 0.85);
}

.task-status-marker input[type="checkbox"].source-status-checkbox::after {
  -webkit-mask-size: calc(var(--task-status-marker-size, 16px) * 0.72);
}
```

**Note the size of this layer: two rules, zero `!important`.** That is the measure of a correct root-cause fix — because the core architecture is right, the compatibility shim is nearly empty.

### 7.5 Why the fix works

| Failure mode | Why it can no longer occur |
|---|---|
| Missing `.contains-task-list` ancestor | Primidian's selector has no ancestor requirement |
| `.task-list-item` is a `<span>` | Primidian never references `.task-list-item` for painting |
| `display: contents` on the parent | Primidian's pseudo-element lives on the input, which is `inline-flex` and generates a box |
| `padding-left: 0 !important` from the plugin | Primidian reserves no padding; the box *is* the input |
| `overflow: hidden` clipping | Primidian's box is at `inset: 0` of the input, never outside it |
| `appearance: none !important` from the plugin | Primidian sets `appearance: none` too — they agree |
| Plugin `width/height !important` | Primidian's box is `inset: 0`, so it resizes automatically |

### 7.6 Regression risk

| Risk | Mitigation |
|---|---|
| Check animation feels different from Obsidianite's | Tune `--primidian-ease-overshoot` + duration to match perceptually; expose both via Style Settings |
| Alignment shifts in normal task lists | The `-2px` nudge (Obsidianite L359) and `-3em` text-indent are removed together with the mechanism; native flow alignment applies |
| Other plugins depended on the old `::before` | Extremely unlikely — plugins target Obsidian's DOM, not a theme's pseudo-elements |

---

## 8. Verification plan

| # | Test | Expected |
|---|---|---|
| 1 | Standard task list, Reading Mode — `- [ ]` / `- [x]` | Empty box / filled box + tick |
| 2 | Standard task list, Live Preview | Identical to #1 |
| 3 | Nested task list, both modes | Correct indentation, no `-3em` shift |
| 4 | Custom states `[/] [-] [>] [?] [!]` | Distinct glyph per state (new capability) |
| 5 | **Task List Kanban — card status marker** | **Visible box + correct state glyph** ← primary bug |
| 6 | **Task List Kanban — nested subtask checkboxes in card preview** | **Visible, not `opacity: 0`, not clipped** ← secondary bug |
| 7 | Task List Kanban — click the status marker | Advances state (plugin JS unaffected) |
| 8 | Settings-panel toggles (`.checkbox-container`) | Unaffected — different element |
| 9 | Hover popover containing a task list | Renders correctly (previously untested territory) |
| 10 | Dataview `TASK` query output | Renders correctly |

---

## 9. Additional information that would raise confidence to ~100 %

| # | Item | Why |
|---|---|---|
| 1 | A DevTools screenshot of a Kanban card's computed styles under Obsidianite | Confirms which rules actually apply/lose at runtime |
| 2 | The plugin's **unminified** Svelte source (`src/ui/components/TaskStatusMarker.svelte`) from GitHub | Confirms my DOM reconstruction from the compiled bundle |
| 3 | Confirmation of the Obsidian version in use | `.markdown-rendered` vs `.markdown-preview-view` class emission has shifted across 1.x releases |
| 4 | Whether the user sees a *blank gap* or a *misplaced box* | Distinguishes symptom 5.1 from 5.2; both are addressed, but it confirms the diagnosis |
| 5 | Whether "Use status marker" is enabled in the plugin's settings | The plugin falls back to a Lucide `square`/`check-square` icon when the status is not custom (`main.js:15442–15455`); that path is theme-independent |
