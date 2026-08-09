# 14 — Phase 3 Reproducible Test Checklist

Satisfies requirement F. **Every item must be verified by looking at the
rendered result in Obsidian, not by reading CSS.** Static analysis has already
been done (see §0); it cannot prove that anything actually renders.

---

## 0. Automated checks — already passing

These run without Obsidian and are re-run by `npm run build`.

| Check | Result |
|---|---|
| CSS parses with zero errors (`csstree-validator`) | ✅ 0 errors |
| `@settings` YAML parses (`js-yaml`) | ✅ valid |
| Brace balance | ✅ 448 / 448 |
| Every `variable-*` setting id has a matching `--<id>` declaration | ✅ enforced by build |
| Every setting declares a default | ✅ enforced by build |
| Every `class-select` option has a `body.<value>` rule | ✅ enforced by build |
| No `transition: all` | ✅ |
| No Tier-1 primitive referenced outside `src/tokens/` | ✅ enforced by build |
| No `@import` | ✅ |
| Functional `!important` count | ✅ **0** (8 total, all `prefers-reduced-motion` a11y guards) |
| Output size | ✅ 257 KB |
| Bug #1 structural audit (14 assertions) | ✅ 14/14 |
| Bug #2 structural audit (9 assertions) | ✅ 9/9 |

Re-run the bug audit at any time with the script in
`%TEMP%\opencode\audit.cjs`, or simply `npm run check`.

---

## 1. Setup

1. Copy the theme folder to `<vault>/.obsidian/themes/Primidian/`.
   It must contain `theme.css` and `manifest.json`.
2. Settings → Appearance → Themes → select **Primidian**.
3. Install **Style Settings** (mgmeyers) and **Task List Kanban** (erikars).
4. Create `TEST.md` from the fixture in §9.

---

## 2. Smoke test — run first

| # | Check | Pass |
|---|---|---|
| 1.1 | Theme appears in the theme list and applies | ☐ |
| 1.2 | Dev console (Ctrl+Shift+I) shows no CSS errors | ☐ |
| 1.3 | Dark mode renders: violet-black bg, cyan accents | ☐ |
| 1.4 | Light mode renders and is legible (not an inversion) | ☐ |
| 1.5 | Style Settings shows an **Primidian** section | ☐ |
| 1.6 | Console shows no `missing default value` errors | ☐ |

**If 1.6 fails**, a setting will render no control and no reset button. Note
which one and report it — the build check should have caught it.

---

## 3. ⭐ BUG #1 REGRESSION GATE — Task List Kanban checkboxes

**This is the primary reason the project exists. Verify visually.**

### 3.1 Normal Obsidian task lists (must not regress)

| # | Input | Mode | Expected | Pass |
|---|---|---|---|---|
| 3.1.1 | `- [ ] Unchecked` | Reading | Empty box, visible border | ☐ |
| 3.1.2 | `- [x] Checked` | Reading | Filled accent box + white tick | ☐ |
| 3.1.3 | Same two | Live Preview | Identical to Reading | ☐ |
| 3.1.4 | Click a checkbox in Reading | — | Toggles; markdown updates | ☐ |
| 3.1.5 | Click a checkbox in Live Preview | — | Toggles | ☐ |
| 3.1.6 | Tick animation | — | Springs in with a slight overshoot | ☐ |
| 3.1.7 | Hover an unchecked box | — | Border brightens + soft glow ring | ☐ |
| 3.1.8 | Completed task text | — | Muted + struck through | ☐ |
| 3.1.9 | Nested 3 levels deep | Both | Correct indentation, **no leftward text shift** | ☐ |
| 3.1.10 | Completed parent, incomplete child | Reading | Child is **not** struck through | ☐ |
| 3.1.11 | Alignment with adjacent text | Both | Box vertically centred on the line | ☐ |

> 3.1.9 specifically tests that Obsidianite's `text-indent: -3em` hack is gone.

### 3.2 Custom task states (new capability)

Obsidianite styled none of these. Each must show a distinct colour and glyph.

| # | Input | Expected | Pass |
|---|---|---|---|
| 3.2.1 | `- [/]` | Amber, dash | ☐ |
| 3.2.2 | `- [-]` | Grey, cross, text struck | ☐ |
| 3.2.3 | `- [>]` | Blue, right chevron | ☐ |
| 3.2.4 | `- [<]` | Blue, left chevron | ☐ |
| 3.2.5 | `- [?]` | Purple, question mark | ☐ |
| 3.2.6 | `- [!]` | Red, exclamation | ☐ |
| 3.2.7 | `- [*]` | Amber, star | ☐ |
| 3.2.8 | All of the above | Live Preview | Same as Reading | ☐ |

### 3.3 ⭐ Task List Kanban — the actual bug

| # | Step | Expected | Pass |
|---|---|---|---|
| 3.3.1 | Open a Task List Kanban board | Board renders | ☐ |
| 3.3.2 | **Look at a card's status marker** | **A VISIBLE CHECKBOX — not a blank gap** | ☐ |
| 3.3.3 | Card from `- [ ]` | Empty box with visible border | ☐ |
| 3.3.4 | Card from `- [x]` | Filled box + tick | ☐ |
| 3.3.5 | Card from `- [/]` | Amber box + dash | ☐ |
| 3.3.6 | Card from `- [-]` | Grey box + cross | ☐ |
| 3.3.7 | Marker size vs card text | Proportional, not oversized | ☐ |
| 3.3.8 | Card whose text has subtasks | **Nested checkboxes visible** | ☐ |
| 3.3.9 | Nested checkbox position | Inside the card, **not clipped at the edge** | ☐ |
| 3.3.10 | Click the status marker | Advances state (plugin JS unaffected) | ☐ |
| 3.3.11 | Drag a card between columns | Works; marker stays visible | ☐ |
| 3.3.12 | Card text indentation | Normal — no leftward shift | ☐ |
| 3.3.13 | Inline code inside a card | **Styled and visible** (was unstyled) | ☐ |
| 3.3.14 | Tags inside a card | Styled as pills | ☐ |
| 3.3.15 | Compare with the Primary theme | Equivalent quality | ☐ |
| 3.3.16 | Toggle *Use Standard Checkbox Proportions* | Slight size change; **stays visible** | ☐ |

> 3.3.2 is **the** gate. Under Obsidianite this was a blank gap.
> 3.3.8 / 3.3.9 test the secondary failure (`opacity: 0` + `overflow: hidden` clipping).

### 3.4 Other checkbox contexts (proves it is a component, not a patch)

| # | Context | Expected | Pass |
|---|---|---|---|
| 3.4.1 | Hover popover over a note with tasks | Checkboxes visible | ☐ |
| 3.4.2 | Canvas card containing a task list | Checkboxes visible | ☐ |
| 3.4.3 | Note embed containing a task list | Checkboxes visible | ☐ |
| 3.4.4 | Dataview `TASK` query | Checkboxes visible | ☐ |
| 3.4.5 | Properties panel checkbox property | Renders correctly | ☐ |
| 3.4.6 | Settings toggles | Unaffected — different element | ☐ |
| 3.4.7 | Search / filter checkboxes in plugin UIs | Render correctly | ☐ |

> If 3.4.1–3.4.4 pass, the root-cause fix is confirmed: these contexts were
> never specifically targeted, they work because the assumption was removed.

---

## 4. ⭐ BUG #2 REGRESSION GATE — inline code

**Every line below must show VISIBLE CODE TEXT. Verify by eye.**

### 4.1 Reading Mode — the failing cases

| # | Markdown | Expected | Pass |
|---|---|---|---|
| 4.1.1 | `` `code` `` | Cyan text on faint pill | ☐ |
| 4.1.2 | `` **`code`** `` | **Text visible** ← the bug | ☐ |
| 4.1.3 | `` **bold `code` bold** `` | Bold solid; code visible | ☐ |
| 4.1.4 | `` **[link `code`](url)** `` | Both visible | ☐ |
| 4.1.5 | `` *italic `code`* `` | Both visible | ☐ |
| 4.1.6 | `` ***bold italic `code`*** `` | Both visible | ☐ |
| 4.1.7 | `` ==mark `code`== `` | Both visible | ☐ |
| 4.1.8 | `` ~~strike `code`~~ `` | Both visible | ☐ |
| 4.1.9 | `` ## Head **b** `c` `` | Both visible | ☐ |
| 4.1.10 | `` - **Term** — `value` `` | Both visible | ☐ |
| 4.1.11 | Table cell `` \| **Col** \| `code` \| `` | Both visible | ☐ |
| 4.1.12 | `` > quote **b** `c` `` | Both visible | ☐ |
| 4.1.13 | `` > [!note] with `code` `` | Visible | ☐ |
| 4.1.14 | `` - [ ] task with `code` `` | Visible | ☐ |
| 4.1.15 | `` **bold <kbd>Ctrl</kbd>** `` | kbd visible and styled | ☐ |
| 4.1.16 | `` **bold #tag** `` | Tag visible | ☐ |

### 4.2 Container contexts (the secondary defect)

All were **completely unstyled** under Obsidianite.

| # | Context containing `` `code` `` | Expected | Pass |
|---|---|---|---|
| 4.2.1 | Note embed `![[Note]]` | Styled pill | ☐ |
| 4.2.2 | Hover popover | Styled pill | ☐ |
| 4.2.3 | Canvas card | Styled pill | ☐ |
| 4.2.4 | Task List Kanban card | Styled pill | ☐ |
| 4.2.5 | Search result preview | Legible | ☐ |
| 4.2.6 | Backlinks panel | Legible | ☐ |

### 4.3 Must not regress

| # | Check | Expected | Pass |
|---|---|---|---|
| 4.3.1 | Fenced code block | Unaffected by the inline rule | ☐ |
| 4.3.2 | `` **bold** `` alone | Gradient still applied (signature kept) | ☐ |
| 4.3.3 | Live Preview `` `code` `` | Styled | ☐ |
| 4.3.4 | Live Preview backtick delimiters | Faint, no layout jump | ☐ |
| 4.3.5 | Gradients OFF → all of §4.1 | All visible | ☐ |
| 4.3.6 | Light mode → all of §4.1 | All visible with good contrast | ☐ |
| 4.3.7 | Change inline-code colour in Style Settings | **Takes effect** (proves the `!important` is gone) | ☐ |

---

## 5. Component checklist

Run in **four passes**: Dark/Reading, Dark/Live Preview, Light/Reading, Light/Live Preview.

| # | Element | Check | D-R | D-LP | L-R | L-LP |
|---|---|---|---|---|---|---|
| 5.1 | H1–H6 | Six distinct sizes; H4/5/6 differ from body | ☐ | ☐ | ☐ | ☐ |
| 5.2 | Heading underline | Magenta fading to transparent | ☐ | ☐ | ☐ | ☐ |
| 5.3 | Heading spacing | Consistent between modes | ☐ | ☐ | ☐ | ☐ |
| 5.4 | Paragraph | Correct font, size, line-height, measure | ☐ | ☐ | ☐ | ☐ |
| 5.5 | Bold | Blue→lilac gradient | ☐ | ☐ | ☐ | ☐ |
| 5.6 | Italic | Purple | ☐ | ☐ | ☐ | ☐ |
| 5.7 | Highlight | Background + readable text | ☐ | ☐ | ☐ | ☐ |
| 5.8 | Strikethrough | Visible line | ☐ | ☐ | ☐ | ☐ |
| 5.9 | `<kbd>` | Raised key appearance | ☐ | ☐ | ☐ | ☐ |
| 5.10 | Code block bg | **Identical in both modes** | ☐ | ☐ | ☐ | ☐ |
| 5.11 | Syntax colours | **Identical in both modes** | ☐ | ☐ | ☐ | ☐ |
| 5.12 | Code block first line | **Not covered** (issue #44 fix) | ☐ | ☐ | ☐ | ☐ |
| 5.13 | Code block scroll | Long lines scroll horizontally | ☐ | ☐ | ☐ | ☐ |
| 5.14 | Language flair | Positioned; does not cover code | ☐ | ☐ | ☐ | ☐ |
| 5.15 | Copy button | Appears on hover; works | ☐ | — | ☐ | — |
| 5.16 | Blockquote | Left border + gradient bars | ☐ | ☐ | ☐ | ☐ |
| 5.17 | Nested blockquote | De-emphasised, not compounded | ☐ | ☐ | ☐ | ☐ |
| 5.18 | Callout — all 14 types | Distinct colours + icons | ☐ | ☐ | ☐ | ☐ |
| 5.19 | Callout | **No blockquote border or glyph bleed** | ☐ | ☐ | ☐ | ☐ |
| 5.20 | Callout collapse | Chevron rotates; content hides | ☐ | ☐ | ☐ | ☐ |
| 5.21 | UL / OL | Accent markers; 4-level nesting | ☐ | ☐ | ☐ | ☐ |
| 5.22 | Indent guides | Visible; **active line brighter** | — | ☐ | — | ☐ |
| 5.23 | Internal link | Sweep underline; fills on hover | ☐ | ☐ | ☐ | ☐ |
| 5.24 | External link | Magenta accent | ☐ | ☐ | ☐ | ☐ |
| 5.25 | Unresolved link | Dimmed, distinct | ☐ | ☐ | ☐ | ☐ |
| 5.26 | Tag | Italic pill; hover response | ☐ | ☐ | ☐ | ☐ |
| 5.27 | Table | Header, borders, hover row | ☐ | ☐ | ☐ | ☐ |
| 5.28 | Table alignment | Left/centre/right honoured | ☐ | ☐ | ☐ | ☐ |
| 5.29 | `hr` | Gradient line + centred § | ☐ | ☐ | ☐ | ☐ |
| 5.30 | Note embed | Border, title, styled content | ☐ | ☐ | ☐ | ☐ |
| 5.31 | Image | Rounded corners | ☐ | ☐ | ☐ | ☐ |
| 5.32 | Properties panel | Key/value colours, pills | ☐ | ☐ | ☐ | ☐ |
| 5.33 | Footnote + ref | Superscript; popover works | ☐ | ☐ | ☐ | ☐ |
| 5.34 | Math inline + block | Renders legibly | ☐ | ☐ | ☐ | ☐ |
| 5.35 | Mermaid | Legible | ☐ | — | ☐ | — |
| 5.36 | Scrollbar | Themed; hover brightens | ☐ | ☐ | ☐ | ☐ |
| 5.37 | Text selection | Visible contrast | ☐ | ☐ | ☐ | ☐ |
| 5.38 | Search highlight | Legible | ☐ | ☐ | ☐ | ☐ |

### 5.39 Interface (mode-independent)

| # | Element | Check | Pass |
|---|---|---|---|
| 5.39.1 | Ribbon icons | Fade in on hover, turn accent | ☐ |
| 5.39.2 | File explorer | Hover + active states distinct | ☐ |
| 5.39.3 | Tabs | Active tab has accent underline | ☐ |
| 5.39.4 | Status bar | Floating, fades, reveals on hover | ☐ |
| 5.39.5 | Command palette | Enters with upward motion | ☐ |
| 5.39.6 | Modals | Rounded, elevated, animated | ☐ |
| 5.39.7 | Menus | Hover states correct | ☐ |
| 5.39.8 | Buttons | Hover shadow; 1px press | ☐ |
| 5.39.9 | Inputs | Focus ring visible | ☐ |
| 5.39.10 | Settings toggles | Distinct from task checkboxes | ☐ |
| 5.39.11 | Keyboard focus ring | Visible on every control | ☐ |
| 5.39.12 | Graph view | Nodes and links themed | ☐ |

---

## 6. Style Settings

| # | Check | Pass |
|---|---|---|
| 6.1 | Panel opens with no console errors | ☐ |
| 6.2 | Every setting renders a control | ☐ |
| 6.3 | Change **Accent Colour** → headings, links, tags, checkboxes, borders all update | ☐ |
| 6.4 | Per-setting reset restores the documented default | ☐ |
| 6.5 | Section reset restores that whole section | ☐ |
| 6.6 | Top-level reset restores the entire theme | ☐ |
| 6.7 | Dark and light defaults are independent | ☐ |
| 6.8 | Heading Style — all 5 variants visibly differ | ☐ |
| 6.9 | Divider Style — all 5 variants visibly differ | ☐ |
| 6.10 | Divider glyph — change `§` to `◆` and see it | ☐ |
| 6.11 | **Disable All Gradients** → solid everywhere, nothing invisible | ☐ |
| 6.12 | **Disable All Animations** → all motion stops | ☐ |
| 6.13 | Animation Speed Multiplier → perceptibly retimes | ☐ |
| 6.14 | Font settings apply | ☐ |
| 6.15 | Corner radius settings apply | ☐ |
| 6.16 | Custom task-state colours apply | ☐ |
| 6.17 | Export produces valid JSON | ☐ |
| 6.18 | Import restores state exactly | ☐ |
| 6.19 | Settings persist across restart | ☐ |
| 6.20 | Switch dark↔light with customisations → correct per-mode values | ☐ |

---

## 7. Performance & accessibility

| # | Check | Target | Pass |
|---|---|---|---|
| 7.1 | Scroll a 5,000-word note | Smooth, no jank | ☐ |
| 7.2 | Type in a large note | No input lag | ☐ |
| 7.3 | Rapid tab switching | No animation buildup | ☐ |
| 7.4 | Vault with 1,000+ notes | Explorer renders promptly | ☐ |
| 7.5 | Body text contrast, both modes | ≥ 7:1 | ☐ |
| 7.6 | Accent on background, **light mode** | ≥ 4.5:1 | ☐ |
| 7.7 | Inline code contrast, both modes | ≥ 4.5:1 | ☐ |
| 7.8 | Enable OS reduced motion | All motion stops | ☐ |
| 7.9 | Enable *Ignore System Reduce-Motion* | Motion returns | ☐ |
| 7.10 | Windows High Contrast | Gradient text becomes solid and visible | ☐ |
| 7.11 | Keyboard-only navigation | Focus always visible | ☐ |
| 7.12 | 200% zoom | Checkbox stays aligned | ☐ |
| 7.13 | Print preview | Readable; gradients solid | ☐ |

---

## 8. Mobile (if applicable)

| # | Check | Pass |
|---|---|---|
| 8.1 | Theme applies on phone | ☐ |
| 8.2 | Checkboxes are comfortably tappable | ☐ |
| 8.3 | Status bar is docked, not floating | ☐ |
| 8.4 | Tables scroll horizontally | ☐ |
| 8.5 | Headings scaled down appropriately | ☐ |
| 8.6 | Drawers and toolbar themed | ☐ |

---

## 9. Test fixture — `TEST.md`

````markdown
---
tags: [test, primidian]
status: active
priority: 3
done: false
---

# Heading 1
## Heading 2
### Heading 3
#### Heading 4
##### Heading 5
###### Heading 6

Normal paragraph with **bold**, *italic*, ***bold italic***, `inline code`,
==highlight==, ~~strikethrough~~ and <kbd>Ctrl</kbd>+<kbd>K</kbd>.

## ⭐ BUG #2 GATE — every backtick below must show VISIBLE TEXT

`code`
**`code`**
**bold `code` bold**
**[bold link with `code`](https://example.com)**
*italic with `code`*
***bold italic with `code`***
==highlight with `code`==
~~strike with `code`~~
**bold** and `code` as siblings
**bold with <kbd>Ctrl</kbd>**
**bold with #tag**
**bold with ==mark==**

- **Term** — `value`
- **Another** — `--primidian-accent`

> quote with **bold `code`**

> [!note] Callout
> Callout with **bold `code`** inside.

| Column | Value |
| ------ | ----- |
| **Bold** | `code` |
| Plain | `--token` |

### Heading with **bold** and `code`

---

## ⭐ BUG #1 GATE — task lists

- [ ] Unchecked
- [x] Checked
- [/] In progress
- [-] Cancelled
- [>] Forwarded
- [<] Scheduled
- [?] Question
- [!] Important
- [*] Star

- [ ] Parent task
    - [x] Completed child
    - [ ] Incomplete child
        - [ ] Grandchild
- [x] Completed parent
    - [ ] Child must NOT be struck through

- [ ] Task with `inline code`
- [ ] Task with **bold** and [a link](https://example.com)
- [ ] Task with #tag

---

## Code

```javascript
// A comment
const greet = (name = "world") => {
  const items = [1, 2, 3];
  return `Hello, ${name}! ${items.length}`;
};
export default greet;
```

```python
class Example:
    """Docstring."""
    def __init__(self, value: int = 0) -> None:
        self.value = value
```

```css
.selector { color: var(--token); }
```

---

## Callouts

> [!note] Note
> [!tip] Tip
> [!warning] Warning
> [!danger] Danger
> [!success] Success
> [!question] Question
> [!example] Example
> [!quote] Quote
> [!bug] Bug
> [!abstract] Abstract

> [!info]- Collapsed callout
> Hidden content.

---

## Links, tags, embeds

[[Internal Link]] · [[Nonexistent Note]] · [External](https://obsidian.md)

#tag #nested/tag #another-tag

![[Some Other Note]]

Footnote reference[^1].

[^1]: The footnote text with `code`.

Math: $E = mc^2$

$$\int_{a}^{b} f(x)\,dx$$

---

## Lists

1. First
2. Second
   1. Nested
3. Third

- Bullet
  - Nested
    - Deeper
````

---

## 10. Sign-off

Phase 3 is complete when:

- [ ] §2 smoke test passes
- [ ] **§3 Bug #1 gate passes in full — especially 3.3.2**
- [ ] **§4 Bug #2 gate passes in full — especially 4.1.2**
- [ ] §5 passes in all four mode combinations
- [ ] §6 Style Settings passes with zero console errors
- [ ] §7 shows no performance or accessibility regressions
- [ ] Any failures are logged with a screenshot and the offending markdown

Record failures as: **item number · mode · expected · actual · screenshot**.
