# 11 — Testing Strategy

Answers brief §19 Phase 7 and §23.10.

---

## 1. Constraint

There is no automated test harness for an Obsidian theme. Testing is **manual, in-app, and checklist-driven**. The strategy therefore prioritises:

1. A single canonical test vault that exercises every styled element.
2. A repeatable checklist so that regressions are caught by comparison, not by memory.
3. Build-time static checks for the failure classes that *can* be automated.

---

## 2. Test vault

Create `test-vault/` (gitignored, or a separate repo) containing:

```
test-vault/
├── 00 — Kitchen Sink.md          Every markdown feature, in order
├── 01 — Headings.md              H1–H6, in isolation and mixed with inline formatting
├── 02 — Emphasis & Inline.md     bold / italic / code / mark / kbd / strike + ALL nestings
├── 03 — Code Blocks.md           10+ languages, long lines, empty blocks, nested fences
├── 04 — Lists & Tasks.md         Ordered, unordered, nested 4 deep, all data-task states
├── 05 — Quotes & Callouts.md     Blockquotes (nested), all 14 callout types, collapsible
├── 06 — Tables.md                Wide, narrow, aligned, with inline formatting in cells
├── 07 — Links & Tags.md          Internal/external/unresolved/aliased/heading/block refs
├── 08 — Embeds & Properties.md   Note embeds, image embeds, PDF, YAML frontmatter
├── 09 — Media & Math.md          Images, video, audio, LaTeX inline + block, Mermaid
├── 10 — Dividers.md              Multiple hr, inside quotes, inside callouts
├── 11 — Long Document.md         ~5000 words, for scroll-performance testing
├── 12 — Edge Cases.md            Empty elements, very long unbroken strings, RTL, CJK, emoji
└── Kanban Source/                Notes with tasks, for Task List Kanban to index
```

`02 — Emphasis & Inline.md` is the single most important file, because it is the Bug #2 regression suite. It must contain, at minimum:

```markdown
`code`
**bold**
**bold with `code` inside**
**[bold link with `code`](https://example.com)**
*italic with `code`*
***bold italic with `code`***
==highlight with `code`==
~~strike with `code`~~
**bold** and `code` as siblings
> quote with **bold `code`**
- **Term** — `value`
| **Col** | `code` |
## Heading with **bold** and `code`
**bold with <kbd>Ctrl</kbd>**
**bold with #tag**
**bold with ==mark==**
```

---

## 3. Test matrix

### 3.1 Dimensions

| Dimension | Values |
|---|---|
| Colour scheme | Dark, Light |
| View mode | Reading, Live Preview, Source |
| Container | Main pane, Split pane, Note embed, Hover popover, Canvas card, Sidebar preview |
| Platform | Desktop (Win/macOS/Linux), Mobile (phone), Tablet |
| Settings state | Defaults, All-variants-changed, Gradients OFF, Animations OFF, Reduced motion |

Full cross-product is impractical. The pragmatic plan:

| Tier | Coverage | When |
|---|---|---|
| **T1 Smoke** | Dark + Light × Reading + Live Preview, defaults, Kitchen Sink | Every build |
| **T2 Component** | Full component checklist, Dark + Light, Reading + Live Preview | End of each phase |
| **T3 Container** | Embeds, popovers, Canvas | End of Phase 3 and Phase 6 |
| **T4 Settings** | Every setting toggled and reset | End of Phase 5 |
| **T5 Plugin** | Task List Kanban, Style Settings, Dataview, Kanban, Tasks, Calendar | End of Phase 4 and pre-release |
| **T6 Platform** | Mobile, tablet | Pre-release |
| **T7 Performance** | Long document scroll, large vault | Pre-release |
| **T8 Accessibility** | Contrast, reduced motion, forced-colors, keyboard focus | Pre-release |

---

## 4. Component checklist (T2)

Run in **Dark/Reading, Dark/Live Preview, Light/Reading, Light/Live Preview** — four passes.

| # | Element | Check |
|---|---|---|
| 1 | H1–H6 | Distinct sizes; H4/H5/H6 differ from body; underline renders; consistent between modes |
| 2 | Paragraph | Correct font, size, weight, line-height, measure |
| 3 | **Bold** | Gradient renders; falls back to solid when gradients off |
| 4 | *Italic* | Correct colour and font |
| 5 | ***Bold italic*** | Both applied, text visible |
| 6 | `inline code` | **Visible text**, correct pill, correct radius |
| 7 | **`code in bold`** | ⚠ **Text visible** — Bug #2 regression gate |
| 8 | ==Highlight== | Background + readable text |
| 9 | ~~Strike~~ | Line visible |
| 10 | `<kbd>` | Distinct styling; visible inside bold |
| 11 | Code block | Same background in both modes; scrolls; no clipped first line |
| 12 | Syntax colours | Consistent between CM6 and Prism |
| 13 | Code flair | Language pill positioned correctly, does not cover code |
| 14 | Blockquote | Border, gradient bars, glyph; nested quotes correct |
| 15 | Callout — all types | ⚠ Does **not** inherit blockquote glyph/border |
| 16 | Callout collapse | Chevron rotates; content hides |
| 17 | UL / OL | Marker colour, indentation, nesting to 4 levels |
| 18 | Indent guides | Visible, correct opacity, active state |
| 19 | Task `[ ]` | ⚠ **Box visible** — Bug #1 regression gate |
| 20 | Task `[x]` | ⚠ **Box + tick visible**, animation plays |
| 21 | Task `[/] [-] [>] [?] [!]` | Distinct glyph per state |
| 22 | Nested tasks | Correct indentation; no `-3em` shift |
| 23 | Internal link | Sweep underline; hover grows |
| 24 | External link | Distinct accent colour |
| 25 | Unresolved link | Distinct/dimmed |
| 26 | Tag | Pill, italic, hover |
| 27 | Table | Header, borders, hover row, alignment |
| 28 | Table with inline code | Code visible in cells |
| 29 | `hr` | All 5 variants; glyph centred |
| 30 | `hr` in callout | Documented limitation behaves as documented |
| 31 | Note embed | Border, title, content styled |
| 32 | Image embed | Radius, sizing |
| 33 | Properties / frontmatter | Key/value colours, pills |
| 34 | Footnote + ref | Superscript, hover popover |
| 35 | Math inline + block | Renders, correct colour |
| 36 | Mermaid | Renders legibly |
| 37 | Scrollbar | Themed, correct width |
| 38 | Text selection | Visible contrast |
| 39 | Focus ring | Visible on all interactive elements |
| 40 | Search UI + highlights | Legible |

---

## 5. Bug regression gates

These two must be verified **explicitly and by name** at every release. They are the reason the project exists.

### 5.1 Bug #1 — Task List Kanban

| # | Step | Pass criterion |
|---|---|---|
| 1 | Open a Task List Kanban board | Board renders |
| 2 | Inspect a card's status marker | **A visible checkbox box** — not a blank gap |
| 3 | Card with `[x]` | Box filled + tick visible |
| 4 | Card with `[/]`, `[-]`, `[>]` | Correct distinct glyph |
| 5 | Card whose text has nested subtasks | **Nested checkboxes visible** — not `opacity: 0` |
| 6 | Nested checkbox position | Inside the card, not clipped at the edge |
| 7 | Click the status marker | Advances state (JS unaffected) |
| 8 | Card text indentation | Normal — no `-3em` shift |
| 9 | Compare against Primary | Visually equivalent quality |
| 10 | Toggle the compat setting off | Degrades gracefully, does not break |

### 5.2 Bug #2 — Inline code in Reading Mode

Run every line of `02 — Emphasis & Inline.md` in Reading Mode. Pass criterion: **every backticked span shows visible glyphs**, in every nesting context, in both colour schemes.

Additionally:
- Fenced code blocks unaffected (`:not(pre > code)` working)
- Inline code inside a **note embed** — styled
- Inside a **hover popover** — styled
- Inside a **Canvas card** — styled
- Inside a **Task List Kanban card** — styled
- With gradients OFF — visible
- `**bold**` alone still shows the gradient (signature preserved)

---

## 6. Settings testing (T4)

| # | Test | Criterion |
|---|---|---|
| 1 | Style Settings panel opens | No console errors; **"Primidian" section present** |
| 2 | Every setting renders a control | A missing control ⇒ a missing `default` (SS-1 violation) |
| 3 | Console during panel open | Zero `Error: … missing default value` |
| 4 | Change each colour | Takes effect immediately |
| 5 | Per-setting reset | Restores the documented default |
| 6 | Per-section reset | Restores all settings in that section |
| 7 | Whole-theme reset | Restores everything |
| 8 | Light and dark defaults independent | Changing dark does not alter light |
| 9 | Each `class-select` variant | Visibly different; no layout breakage |
| 10 | Gradient master toggle | All gradients off; solid fallbacks correct |
| 11 | Animation master toggle | All motion stops |
| 12 | Animation speed dropdown | Perceptibly retimes the whole theme |
| 13 | Export settings | Produces valid JSON |
| 14 | Import that JSON | Restores state exactly |
| 15 | Restart Obsidian | Settings persist |
| 16 | Switch dark→light with customisations | Correct per-mode values applied |

**Automatable subset:** items 2 and 3 are effectively covered by the build-time cross-check proposed in `07-*` §6 (every setting `id` must exist as a token; every setting must have a default). Building that check converts the most tedious manual test into a build failure.

---

## 7. Plugin compatibility (T5)

| Plugin | Why | Priority |
|---|---|---|
| **Task List Kanban** | Bug #1 | **Critical** |
| **Style Settings** | Required for customisation | **Critical** |
| Dataview | Renders markdown incl. tasks and inline code in tables | High |
| Tasks | Heavy `data-task` user | High |
| Kanban (mgmeyers) | The *other* kanban; also renders checkboxes | High |
| Calendar | Common; heavy custom UI | Medium |
| Excalidraw | Canvas-adjacent | Medium |
| Templater / QuickAdd | Modal-heavy — tests popup animations | Medium |
| Advanced Tables | Table UI overlays | Medium |
| Iconize | Injects into the file explorer | Low |

---

## 8. Performance testing (T7)

| # | Test | Target |
|---|---|---|
| 1 | Scroll `11 — Long Document.md` | Smooth; no visible jank |
| 2 | DevTools Performance during scroll | ≥ 50 fps average |
| 3 | Typing in a 5,000-word note | No input lag |
| 4 | Open a vault with 1,000+ notes | File explorer renders promptly |
| 5 | Rapid tab switching | No animation queue buildup |
| 6 | Theme file size | < 200 KB (vs Primary's 1.72 MB) |
| 7 | Style recalculation on keystroke | No `:has()` invalidation storms |
| 8 | Memory after 30 min | No growth from animations |

Item 7 specifically validates PR-6: `:has()` is used only on `strong` and headings, never on `.cm-line`.

---

## 9. Accessibility testing (T8)

| # | Test | Target |
|---|---|---|
| 1 | Body text contrast, both modes | ≥ 7:1 (AAA) |
| 2 | Muted text contrast | ≥ 4.5:1 (AA) |
| 3 | Faint text contrast | ≥ 3:1 |
| 4 | Accent on background | ≥ 4.5:1 — **this is why light mode uses `cyan-600`** |
| 5 | Inline code contrast | ≥ 4.5:1 in both modes |
| 6 | Gradient text — darkest point | ≥ 4.5:1 |
| 7 | OS reduced motion enabled | All motion suppressed |
| 8 | `primidian-motion-force` set | Motion returns |
| 9 | Windows High Contrast | Gradient text becomes visible solid text |
| 10 | Keyboard-only navigation | Focus ring always visible |
| 11 | Checkbox at 200% zoom | Still aligned |
| 12 | Screen reader on a blockquote | The `!!` glyph does not pollute the reading |

Item 12 is a known Obsidianite defect (`01-*` §4.6) and needs an explicit fix: either the `content: '!!' / ''` alt-text syntax or making the glyph opt-in.

---

## 10. Build-time static checks

The automatable portion. Proposed for `build.mjs`:

| Check | Catches |
|---|---|
| YAML in the `@settings` block parses | A syntax error silently disables the **entire** settings panel |
| Every setting has `default` / `default-light` + `default-dark` | SS-1 violations → invisible controls, no reset |
| Every setting `id` corresponds to a `--<id>` in `src/tokens/` | Settings that appear but do nothing |
| Every `class-select` option `value` has a `body.<value>` rule in `src/variants/` | Variants that appear but do nothing |
| `!important` count ≤ 8 (5 budget + 3 accessibility) | PR-8 drift |
| No `transition: all` | PR-1 |
| No `--primidian-c-*` referenced outside `src/tokens/` | Tier-1 leakage — would break future colour profiles |
| No `@import` | Ordering ambiguity |

These eight checks are perhaps 80 lines of Node and catch the majority of the failure modes that are otherwise invisible until a user reports them.

---

## 11. Release gate

Before any release:

- [ ] T1 smoke passes
- [ ] T2 component checklist passes in all four mode combinations
- [ ] **Bug #1 gate passes** (all 10 steps)
- [ ] **Bug #2 gate passes** (every line of `02 — Emphasis & Inline.md`)
- [ ] T4 settings pass, zero console errors
- [ ] Task List Kanban + Style Settings verified
- [ ] Build-time static checks pass
- [ ] Light and dark both reviewed by eye
- [ ] Mobile smoke test
- [ ] README updated, including both bug write-ups
- [ ] Attribution banner intact and accurate
- [ ] Version bumped in `manifest.json` and the banner
