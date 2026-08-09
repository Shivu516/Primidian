# 10 — Licensing and Attribution

Answers brief §3 and §21 (Credits section). **This is the blocking item for Phase 3.**

> ⚠️ **Disclaimer:** This is an engineering analysis of licence texts and project metadata, not legal advice. For a commercial release or if any doubt remains, obtain a legal opinion.

---

## 1. Findings

### 1.1 Obsidianite — **MIT**

| | |
|---|---|
| **Licence** | MIT |
| **Determined from** | GitHub repository metadata for `bennyxguo/Obsidian-Obsidianite` (confirmed across three independent sources, including the mirror at `TriDiamond/Obsidian-Obsidianite`) |
| **In the CSS file?** | ❌ **No SPDX identifier or licence text in `Obsidianite.css`.** Only an authorship banner (lines 1–11). |
| **Author** | Benny Guo (三钻) — `bennyxguo`, formerly `TriDiamond` |
| **Version in hand** | 2.1.0 |

**MIT permits:** use, copy, modify, merge, publish, distribute, sublicense, sell.
**MIT requires:** the copyright notice and permission notice be included in all copies or substantial portions.
**MIT does not require:** that derivatives be MIT, or that source be published.

✅ **Primidian may freely use Obsidianite as its visual and code baseline, provided the MIT notice and Benny Guo's copyright are reproduced.**

### 1.2 Primary — **GNU GPL v3**

Stated verbatim in `Primary.css` lines ~66–83:

> This theme is using the GNU GENERAL PUBLIC LICENSE v3.
>
> Please visit the project's README file for more information: https://git.new/primary/obsidian
>
> If you will be using parts of the code or are inspired, please do leave a link to my Ko-fi: https://ko-fi.com/ceciliamay
>
> as well as leave a link to the original GitHub repository: https://github.com/primary-theme/obsidian
>
> It has to be stated clearly, publicly, and visibly. Thank you so much!

| | |
|---|---|
| **Licence** | GNU GPL v3 |
| **Determined from** | The file's own header — unambiguous, in the file we were given |
| **Author** | Cecilia May — `@ceciliamay` |
| **Additional stated requests** | Visible Ko-fi link; visible link to the original repo; *"stated clearly, publicly, and visibly"* |

**GPLv3 requires**, for any distributed derivative work:
1. The derivative must also be **GPLv3** (§5c — "you must license the entire work, as a whole, under this License").
2. **Complete corresponding source** must be made available.
3. Copyright notices and the licence text must be preserved.
4. Modifications must be marked with prominent notices.

⛔ **If Primidian contains any of Primary's CSS text, Primidian must be released under GPLv3, in its entirety, and can never be relicensed.**

### 1.3 Note on the "inspired" clause

Primary's header requests attribution even for people who are merely *"inspired"*. This request extends beyond what GPLv3 itself compels — copyright does not attach to ideas, methods, or design concepts, only to expression. It is therefore best read as a **moral/community request rather than a licence condition**.

**Recommendation: honour it regardless.** The cost is two links in a README; the benefit is community goodwill and unambiguous good faith. This is D-04.

### 1.4 Third-party code inside Obsidianite

`Obsidianite.css` lines 1163–1481 vendor the **Dracula theme for Prism.js**, with its own header at lines 1165–1175:

```
* Dracula Theme for Prism.JS
* @author      Gustavo Costa  <gusbemacbe@gmail.com>
* @contributor Jon Leopard    <jonlprd@gmail.com>
* @license     MIT 2016-2018
```

MIT — compatible, but it is a **separate copyright holder** whose notice must be preserved if that code is retained.

**Recommendation: do not retain it.** Re-derive syntax-highlighting token colours from the Primidian palette (which is required anyway — see conflict 4.6 in `03-*`, the Dracula colours clash with Obsidianite's cyan/magenta identity). This removes a third-party licence dependency at no cost.

### 1.5 Fonts

| Font | Referenced by | Status |
|---|---|---|
| Rubik | Obsidianite (`--default-font`) | SIL OFL. **Referenced by name only, not bundled.** No obligation. |
| OperatorMonoSSmLig-Book | Obsidianite (`--code-mono-font`) | **Commercial** (Operator Mono, H&Co). Referenced by name only. Users must own it. Not bundled — no obligation, but it means the intended code font is unavailable to most users. |
| Cascadia Code | Primary | SIL OFL. **Base64-embedded (268 KB).** |
| Inter | Primary | SIL OFL. **Base64-embedded (969 KB across two faces).** |

Primidian bundles **no fonts** (D-09). This avoids all font licence obligations, removes 1.24 MB, and lets users choose. The README will recommend fonts and explain how to set them via Style Settings.

### 1.6 Style Settings

MIT, by mgmeyers. Primidian does not include any of its code — it only *authors a config* that the plugin reads. No licence obligation; credit given as a courtesy and because users need to know to install it.

### 1.7 Task List Kanban

Referenced only for compatibility analysis. No code is copied. Credited in the README's plugin-compatibility section.

---

## 2. The licence conflict

```
Obsidianite (MIT, permissive)  +  Primary (GPLv3, copyleft)  =  GPLv3
```

MIT is **one-way compatible** with GPL: MIT code can be absorbed into a GPL work, but not vice versa. Combining the two produces a work that must be distributed under GPLv3.

**The user has explicitly asked** (brief §3.6) to *"prefer reimplementing behavior based on understanding where direct copying would create licensing problems"* and (§22.2) to *"not blindly copy selectors from Primary"*. The brief's own instructions already point at the resolution.

---

## 3. The two viable paths

### ✅ Path A — Clean-room reimplementation (RECOMMENDED)

**What it means**

- Obsidianite's CSS may be used directly (MIT), with attribution.
- Primary is used as a **specification and quality benchmark**, not as a source of text.
- Every Primary-inspired feature in Primidian is written fresh, from the understanding documented in `02-reconnaissance-primary.md` §8.
- Primidian ships **MIT**.

**What is safe to reimplement**

| Item | Why it is not protected expression |
|---|---|
| Three-tier token architecture | An architectural method. Ideas and methods are outside copyright (17 USC §102(b) and equivalents). |
| Named duration/easing scales | A naming convention; our names and values are our own. |
| `hsla()` primitives with numbered ramps | Standard design-system practice, predates Primary by years. |
| `body` / `.theme-light` / `.theme-dark` scoping | The convention **documented by Obsidian itself**. Not Primary's invention. |
| Styling `input[type=checkbox]` natively | The obvious and Obsidian-documented approach; also what Obsidian's own default theme does. |
| `.markdown-rendered code:not(pre code)` | A **fact about Obsidian's DOM**. Selectors dictated by the host application are functional, not expressive — the merger doctrine applies: there is essentially one way to express "inline code in rendered markdown". |
| `data-task` state selectors | Same — dictated by Obsidian's markup. |
| Transition-first motion philosophy | An approach, not code. |
| Overshoot entry animation | A universal animation principle (anticipation/overshoot predates CSS entirely). Our keyframes, our stops. |
| Style Settings organisational patterns | The plugin's own documented conventions. |

**What must not be reproduced**

- Verbatim or near-verbatim CSS rule text
- Primary's colour values
- Primary's `@settings` YAML text
- Primary's variable names (`--anim-motion-jumpy`, `--checklist-bg`, …) → Primidian uses `--primidian-*`
- Primary's keyframe percentage stops
- Primary's base64 fonts

**Risk:** Low. The overlap between Primidian and Primary will be at the level of *approach*, which is not protectable. Distinct namespacing (`--primidian-*`), a distinct palette, distinct selectors, and independent values make the independence self-evident on inspection.

**Cost:** Slightly more implementation work — but the brief mandates this anyway (§22.1–22.3), and the resulting code will be better because it is designed for Primidian rather than adapted.

### ⚠️ Path B — Adopt GPLv3

**What it means**

- Primary's CSS may be copied and adapted directly.
- Primidian must be released under GPLv3, with full source, preserved notices, and marked modifications.

**Consequences**
- Primidian can never be relicensed (no MIT, no dual-licensing, no proprietary variants — ever, without every contributor's consent).
- Any future contributor's work is also GPLv3.
- Downstream users who fork Primidian inherit the copyleft.
- The Obsidian theme ecosystem is overwhelmingly MIT; a GPLv3 theme is unusual and limits reuse of Primidian's own code by others.

**Risk if chosen deliberately:** Low, and legally clean.
**Risk if chosen accidentally** (by copying a few Primary rules while labelling the project MIT): **This is licence infringement.** It is the specific failure mode this document exists to prevent.

---

## 4. Recommendation

> **Adopt Path A.**
>
> - Licence Primidian under **MIT**.
> - Reproduce Obsidianite's MIT notice and Benny Guo's copyright in `LICENSE` and in the `theme.css` banner.
> - Copy **no** Primary CSS text.
> - Credit Primary prominently as design inspiration, including the Ko-fi and repository links the author requests — even though Path A does not legally compel it.
> - Do not vendor the Prism-Dracula block; re-derive syntax colours.
> - Bundle no fonts.

This satisfies every legal obligation, honours both authors' wishes, matches the ecosystem norm, and is exactly what the brief already asks for.

**Status: awaiting your approval (decisions D-01, D-02, D-03).**

---

## 5. Required artefacts

### 5.1 `LICENSE`

```
MIT License

Copyright (c) 2026 <Your Name>  — Primidian

This theme's visual foundation is derived from Obsidianite:
Copyright (c) 2020-2023 Benny Guo (bennyxguo)
https://github.com/bennyxguo/Obsidian-Obsidianite
Licensed under the MIT License.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

### 5.2 `src/00-banner.css` — first bytes of the shipped `theme.css`

```css
/*
 * ══════════════════════════════════════════════════════════════
 *  PRIMIDIAN
 *  An Obsidian theme — Obsidianite's identity, engineered.
 *  Version <x.y.z>
 * ══════════════════════════════════════════════════════════════
 *
 *  Licensed under the MIT License. See LICENSE.
 *
 *  ── VISUAL FOUNDATION ─────────────────────────────────────────
 *  Derived from OBSIDIANITE by Benny Guo (bennyxguo), MIT.
 *  https://github.com/bennyxguo/Obsidian-Obsidianite
 *  Portions of this theme's visual design and CSS are adapted
 *  from Obsidianite under the terms of the MIT License.
 *
 *  ── DESIGN INSPIRATION ────────────────────────────────────────
 *  Primidian's animation, token, and customisation
 *  architecture was INSPIRED BY the excellent work in
 *  PRIMARY by Cecilia May (@ceciliamay), GPLv3.
 *      https://github.com/primary-theme/obsidian
 *      https://ko-fi.com/ceciliamay
 *  No code from Primary is included in this theme. All
 *  Primary-inspired functionality was independently
 *  reimplemented. Please support Cecilia's work.
 *
 *  ── COMPATIBILITY ─────────────────────────────────────────────
 *  Style Settings by mgmeyers (MIT)
 *  Task List Kanban by Chris Kerr & Erika Rice Scherpelz
 * ══════════════════════════════════════════════════════════════
 */
```

The sentence *"No code from Primary is included in this theme"* is deliberate and load-bearing: it is a public, checkable statement of the project's licence position. **It must remain true.** If any Primary code is ever pasted in, that line becomes a false statement — which is a much clearer red flag for a future contributor than a silent licence violation.

### 5.3 README "Credits" section

Full text drafted in `12-implementation-roadmap.md` §4, covering: Obsidianite (foundation, MIT, link), Primary (inspiration, GPLv3, repo link, Ko-fi link, explicit no-code statement), Style Settings, Task List Kanban, and recommended fonts with their licences.

---

## 6. Ongoing compliance rules

| # | Rule |
|---|---|
| L-1 | Never paste text from `Primary.css` into `src/`. Read it, understand it, close it, then write. |
| L-2 | Keep `Primary.css` and `Obsidianite.css` in the repo root as **reference only**, excluded from the build, and note this in the README. |
| L-3 | Never remove or alter the banner in `src/00-banner.css`. |
| L-4 | Any new third-party code requires a licence check and a Credits entry before merge. |
| L-5 | If a contributor submits Primary-derived code, reject it and reimplement. |
| L-6 | If Path B is ever chosen later, the licence change must be deliberate, documented, and applied across `LICENSE`, the banner, the README, and `manifest.json`. |

---

## 7. Open questions

| # | Question | Impact |
|---|---|---|
| Q-1 | Do you approve MIT + clean-room (Path A)? | **Blocks Phase 3** |
| Q-2 | Copyright holder name for `LICENSE`? | Blocks release |
| Q-3 | Is Primidian intended for the community theme directory? | The directory requires a licence file and may have its own attribution expectations |
| Q-4 | Should we notify Benny Guo / Cecilia May as a courtesy? | Optional, not required; generally well received |
| Q-5 | Confirm the exact Obsidianite version to credit (banner says 2.1.0) | Cosmetic accuracy |
