# AGENTS.md — Primidian

An Obsidian theme. Dark-first, MIT-licensed, built from `src/` into `theme.css`.

## Build commands

```bash
node build.mjs            # build + validate → theme.css
node build.mjs --watch    # rebuild on src/ change
node build.mjs --check    # validate only, no write
```

**`theme.css` is a build output. Never hand-edit it.** Edit files in `src/` and rebuild.

## Source layout

Files concatenate by the leading numeric prefix of the **filename**, not directory. Order is enforced in `build.mjs:43-50`:

```
00-banner.css          licence header (emitted verbatim, no separator)
01-settings.css        Style Settings YAML — all ~215 option definitions
tokens/    10-15       Tier-1 primitives → semantic → component → Obsidian bridge
base/      20-21       reset, typography
ui/        30-35       workspace, chrome, controls
editor/    40-42       shared, Live Preview, Reading Mode
components/50-66        headings … misc
variants/  70-72        component variants (divider, heading, scaffold)
systems/   80-82        gradients, motion, glow
platform/  90           mobile
compat/    95           plugin compatibility — loads last
```

Tokens always precede consumers; variants always follow components; compat always comes last.

## Build validation (fails on these)

The build is a static checker. It **errors** on:

- `transition: all` — banned (perf)
- `@import` — banned (ordering ambiguity)
- `var(--primidian-c-*)` outside `src/tokens/` — Tier-1 primitives must not leak
- `:has()` on `.cm-line` — banned (perf)
- A `class-select` option value with no matching `body.<value>` rule
- A `variable-*` setting id with no matching `--<id>:` declaration
- A setting with no `default:` (or `default-light:` + `default-dark:`)

It **warns** on:

- More than 5 functional `!important` (accessibility overrides marked with `a11y` / `accessibility-override` are exempt)
- A `class-toggle` / `class-select` with no explicit default

## The Primidian Directive

> Every themeable value is a CSS custom property declared at `body`, `.theme-dark` or `.theme-light`, consumed only via `var()` at the point of use.

Style Settings injects overrides at specificity `0,2,1`. Anything declared above that (or with `!important`) is permanently uncustomisable. Primidian has **zero functional `!important`**.

## Token architecture (four tiers)

```
Tier 1  --primidian-c-*           raw hsl() ramps (tokens/ only — never referenced elsewhere)
Tier 2  --primidian-accent        semantic tokens (what Style Settings writes)
Tier 3  --primidian-h1-color      component tokens
Tier 4  --text-accent             Obsidian's own variables (the bridge — highest leverage)
```

## Rule 2 — no structural assumptions

A component's rendering depends only on the element that semantically **is** that component — never on an ancestor's tag, class or box model. This is why the checkbox fix (`components/60-checkboxes.css`) also fixes Dataview, Canvas, and hover previews without targeting them.

## Adding a component variant

1. Ensure the value is already a token in `tokens/14-components.css`.
2. Add `body.primidian-<component>-<name> { --token: value; }` in `src/variants/`. **Reassign tokens only** — never write a non-custom property.
3. Add the option to that component's `class-select` in `src/01-settings.css`.
4. Build — the cross-check verifies the wiring.

## Plugin compatibility

Create `src/compat/9N-compat-<plugin>.css`. **First ask: is this a plugin quirk, or a structural assumption in a Primidian component? If the latter, fix the component.** A compat file that grows large is a signal the core is wrong. See `compat/95-compat-task-list-kanban.css` for the canonical example — two cosmetic rules, zero `!important`.

## Style Settings YAML (`src/01-settings.css`)

The `/* @settings */` block is the source of truth for every option. Each entry needs:
- `id`, `type`, and a `default` (or `default-light` + `default-dark`)
- For `class-select`: every `value:` must have a matching `body.<value>` rule somewhere in `src/`
- For `variable-*`: every `id:` must have a matching `--<id>:` declaration in `src/tokens/`

## References in repo root

`Primary.css` and `Obsidianite.css` are **immutable reference material**, excluded from the build. Do not edit them.

`references/` is gitignored — safe to use for local scratch files.
