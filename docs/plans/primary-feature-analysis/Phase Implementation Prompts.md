# Chat Link: [Customizable Obsidian Theme](https://chatgpt.com/c/6a771403-bd30-83ee-b769-2cdbf8ff1839)

Bro, **now that we have both `08` and `09`, I’d turn the roadmap into five controlled implementation sessions** rather than one giant prompt. That matches the roadmap's own risk progression: Tier 1 is low-risk/additive, Tier 2 needs more editor/interface testing, Tier 3 is experimental and some parts require DOM investigation.

I also agree with adding provenance/status badges. The proposed settings architecture explicitly marks many additions as coming from Primary, while the roadmap separately classifies Tier 3 as experimental.

I recommend these two badges:

- **`Primary`** — this feature was added to Primidian as a clean-room reimplementation/adaptation of a Primary-inspired capability.
    
- **`Experimental`** — this feature is still experimental/high-risk or needs further investigation.
    

For Phase 5, a feature can legitimately have **both** badges.

And, crucially, tell OpenCode to reuse the **same successful badge-rendering mechanism** it used for your Glow System heading. It should **not** put HTML into Style Settings text strings again.

---

# Phase 1 — Quick Wins

This covers the eight Tier-1 features from the roadmap: font features, per-heading font family, link underline controls, bold modifier, non-Markdown link colors, editor gutter colors, font size tiers, and font weight tiers. They are explicitly classified as high-value/low-risk and largely additive.

```markdown
# PHASE 1 IMPLEMENTATION — EXECUTE NOW
# PRIMIDIAN PRIMARY-INSPIRED QUICK WINS

IMPORTANT: THIS IS AN IMPLEMENTATION TASK.

The research/planning phase is ALREADY COMPLETE.

You have already inspected the following authoritative documents and the
Primidian source architecture:

- docs/plans/primary-feature-analysis/08-Proposed-Primidian-Settings-Organization.md
- docs/plans/primary-feature-analysis/09-Primary-Feature-Roadmap.md
- docs/plans/primary-feature-analysis/10-Primary-Primidian-Master-Analysis.md
- docs/plans/primary-feature-analysis/01-Primary-Animation-Forensics.md
- docs/plans/primary-feature-analysis/02-Primary-UI-Effects.md
- docs/plans/primary-feature-analysis/03-Primary-Style-Settings.md
- docs/plans/primary-feature-analysis/04-Primidian-Style-Settings.md
- docs/plans/primary-feature-analysis/05-Style-Settings-Comparison.md
- docs/plans/primary-feature-analysis/06-Primary-Feature-Portability.md
- docs/plans/primary-feature-analysis/07-Animation-Architecture.md

You have also already verified the existing badge mechanism from Git
history and the existing Primidian implementation.

DO NOT START ANOTHER RESEARCH SESSION.

DO NOT CREATE ANOTHER PLAN.

DO NOT JUST READ THE DOCUMENTS AND REPORT WHAT THEY SAY.

DO NOT STOP AFTER ANALYSIS.

START MODIFYING THE SOURCE FILES NOW.

The purpose of this prompt is to make you EXECUTE Phase 1.

============================================================
OBJECTIVE
============================================================

Implement ALL eight Phase 1 / Tier 1 features from the roadmap:

1. Font Feature Settings
2. Per-Heading Font Family
3. Link Underline Controls
4. Bold Modifier
5. Non-Markdown Link Colors
6. Editor Gutter Colors
7. Font Size Tiers
8. Font Weight Tiers

The roadmap explicitly classifies these as:

HIGH VALUE / LOW RISK

They are intended to be additive features that can be integrated into
Primidian without replacing its existing architecture.

The authoritative Phase 1 definition is in:

docs/plans/primary-feature-analysis/09-Primary-Feature-Roadmap.md

Use that document as the source of truth for the intended scope.

============================================================
CRITICAL: THIS IS NOT A PLANNING REQUEST
============================================================

You have permission to edit the implementation source files.

Your workflow MUST be:

    inspect only what is necessary
             ↓
    implement Phase 1
             ↓
    build
             ↓
    inspect build errors
             ↓
    fix implementation errors
             ↓
    rebuild
             ↓
    report exactly what changed

Do NOT replace this with:

    read files
      ↓
    think
      ↓
    write a report
      ↓
    stop

The previous attempt already completed the research portion.

This session is specifically for EXECUTION.

============================================================
SOURCE ARCHITECTURE RULES
============================================================

Preserve Primidian's existing architecture.

Do NOT copy Primary.css wholesale.

Do NOT transplant large chunks of Primary.css.

Do NOT redesign Primidian to match Primary's internal architecture.

Instead, perform clean-room CSS implementation of the capabilities.

Follow Primidian's existing architecture:

- source CSS under src/
- existing token/cascade architecture
- existing Style Settings architecture
- existing dark/light organization
- existing animation architecture
- existing naming conventions
- existing component organization

User-configurable values should become Style Settings controls where
appropriate.

Consumers should use Primidian's existing CSS variables/token system
rather than hard-coded duplicated values whenever practical.

DO NOT edit generated theme.css directly.

Modify the source files and run the normal build process.

The generated theme.css should be produced by the build system.

============================================================
DO NOT BREAK EXISTING PRIMIDIAN FEATURES
============================================================

This is an additive feature phase.

Do NOT:

- remove existing settings
- rename existing Style Settings IDs unnecessarily
- change existing defaults unnecessarily
- remove existing animations
- replace existing color tokens
- replace the existing typography architecture wholesale
- alter unrelated components
- rewrite large portions of theme.css
- modify blockquote implementation
- modify Glow System behavior
- modify callouts
- modify unrelated UI components

If an existing Primidian setting already provides part of a requested
capability, extend/reuse it rather than creating a competing duplicate.

Preserve backward compatibility with existing settings.

============================================================
STYLE SETTINGS ORGANIZATION
============================================================

Use the organization proposed in:

docs/plans/primary-feature-analysis/08-Proposed-Primidian-Settings-Organization.md

Do not dump all new settings into one existing category merely because
it is convenient.

The purpose of this phase is also to begin moving Primidian toward the
cleaner Style Settings organization documented in that file.

At minimum, use the logical categories identified by the roadmap,
including:

TYPOGRAPHY

- Font Sizes
- Font Weights
- Font Features
- Fonts / heading font controls where appropriate

LINKS

- Link underline controls
- Non-Markdown link colors

EDITOR

- Editor gutter colors

Use the exact category/subcategory naming recommended by document 08
where it already specifies the intended structure.

Do not invent an entirely different settings hierarchy.

============================================================
PRIMARY BADGE
============================================================

These features originate from the Primary feature analysis.

Therefore, the relevant Phase 1 settings sections should receive the:

    Primary

badge.

IMPORTANT:

Do NOT add the Experimental badge to Phase 1 merely because these
features are new.

Phase 1 is Tier 1 / low-risk.

The Experimental badge is intended for the explicitly experimental
features in Phase 5 unless a specific feature is independently found
to have an unresolved experimental implementation.

============================================================
BADGE IMPLEMENTATION
============================================================

You already discovered the existing successful badge implementation
from Git history.

Reuse that mechanism.

DO NOT create a new badge system.

DO NOT put literal HTML such as:

<span class="...">Primary</span>

inside Style Settings text strings.

The previous Glow System implementation demonstrated the correct
approach.

Reuse the same CSS pseudo-element / heading-based badge mechanism and
adapt it so that the Primary badge can be attached to the relevant
settings headings.

The badge must:

- use Primidian's existing theme colors
- work in Dark Mode
- work in Light Mode
- respect the user's accent color where appropriate
- remain visually consistent with the existing Experimental badge
- remain compact
- not introduce layout shifts
- not use arbitrary hard-coded warning colors
- not glow unless the existing badge architecture explicitly permits it
- not interfere with setting controls

Prefer one reusable badge mechanism over separate CSS for each feature.

If the current badge system was implemented specifically around setting
IDs/headings, extend that mechanism rather than replacing it.

============================================================
FEATURE 1 — FONT FEATURE SETTINGS
============================================================

Implement the Font Feature controls described in the roadmap and Primary
analysis.

First inspect the existing Primidian typography/token implementation.

Expose only font-feature capabilities that can be safely represented
through CSS/font-feature-settings or the appropriate existing CSS
mechanism.

Do not bundle fonts.

Do not force a specific font.

Do not enable unusual OpenType features by default unless that matches
the documented Primidian design.

The default state MUST preserve the current appearance.

Ensure the controls affect the intended typography contexts and do not
unexpectedly alter:

- code
- inline code
- UI controls
- icons
- headings
- metadata
- unrelated plugin interfaces

unless the setting is explicitly intended to do so.

Use sensible Style Settings controls and existing Primidian variables.

Add the Primary badge to the appropriate Font Features settings section.

============================================================
FEATURE 2 — PER-HEADING FONT FAMILY
============================================================

Implement configurable heading font family support based on the
architecture documented in the roadmap.

Support the intended heading levels without unnecessarily duplicating
CSS.

Preserve the current heading appearance as the default.

Do NOT bundle fonts.

Do NOT download fonts.

Do NOT introduce external dependencies.

Use CSS variables/tokens where practical.

Make sure:

- H1 works
- H2 works
- H3 works
- H4 works
- H5 works
- H6 works
- Reading Mode works
- Live Preview works

Pay particular attention to Obsidian's Live Preview editor DOM so that
heading styling does not accidentally affect ordinary editor text.

If the existing Primidian heading architecture already exposes some
heading-level variables, extend them rather than creating conflicting
ones.

Add the Primary badge to the appropriate settings section.

============================================================
FEATURE 3 — LINK UNDERLINE CONTROLS
============================================================

Implement the link underline controls from the roadmap.

The controls should allow the user to configure the intended underline
behavior without destroying Primidian's existing link styling.

Consider the different link contexts:

- normal Markdown links
- internal links
- external links
- Reading Mode
- Live Preview
- hover state
- visited state if currently supported

Do not unintentionally remove existing link colors.

Default behavior must remain visually compatible with the current
Primidian design.

Use the existing link tokens/variables.

Add the Primary badge to the relevant Links settings section.

============================================================
FEATURE 4 — BOLD MODIFIER
============================================================

Implement the Primary-inspired bold modifier.

Determine the correct existing Primidian typography token/selector that
controls bold text.

Do not globally replace font-weight architecture.

The feature should allow the user to adjust the intended bold modifier
while preserving existing heading and UI typography unless those
contexts are explicitly part of the documented feature.

Test:

- normal Markdown bold
- bold inside links
- bold inside headings
- bold inside blockquotes
- bold inside callouts
- Reading Mode
- Live Preview

Avoid selector conflicts with existing typography rules.

Add the Primary badge to the relevant Typography section.

============================================================
FEATURE 5 — NON-MARKDOWN LINK COLORS
============================================================

Implement configurable colors for the additional link contexts
identified in the roadmap.

Do not replace the existing Markdown link color system.

Determine which link selectors/contexts the roadmap means by
"Non-Markdown Link Colors" and implement those contexts specifically.

Potential contexts should be verified against the actual Obsidian DOM
rather than guessed.

Preserve:

- internal link styling
- external link styling
- hover styling
- unresolved link styling
- Reading Mode
- Live Preview

where applicable.

Use Primidian color tokens rather than introducing arbitrary colors.

Add the Primary badge to the relevant Links section.

============================================================
FEATURE 6 — EDITOR GUTTER COLORS
============================================================

Implement configurable editor gutter colors.

This MUST be scoped to the actual editor/gutter DOM used by Obsidian.

Do not style generic borders or arbitrary editor backgrounds and call
them "gutter colors."

Verify the relevant CodeMirror 6 selectors before implementation.

Potential areas may include:

- line-number gutter
- active line gutter
- fold gutter
- gutter background
- gutter text
- related editor gutter states

Only implement controls that are actually supported by the roadmap and
safe to target.

Do not use :has() on .cm-line if Primidian's build/performance rules
prohibit it.

Respect all existing PR/performance selector rules.

Test Live Preview carefully.

Make sure ordinary editor content is unaffected.

Add the Primary badge to the relevant Editor settings section.

============================================================
FEATURE 7 — FONT SIZE TIERS
============================================================

Implement the Font Size Tier system described by the roadmap.

Do not create dozens of redundant font-size settings.

Use the intended tier architecture.

Determine the appropriate Primidian variables for:

- normal body text
- small text
- larger text
- other documented tiers

Preserve the current default sizes.

Ensure hierarchy remains coherent.

Do not accidentally scale:

- code blocks
- inline code
- UI controls
- settings UI
- plugin UI

unless explicitly intended.

Verify Reading Mode and Live Preview.

Add the Primary badge to the relevant Typography settings section.

============================================================
FEATURE 8 — FONT WEIGHT TIERS
============================================================

Implement the Font Weight Tier system described by the roadmap.

Use Primidian's existing typography architecture.

Do not introduce arbitrary weights that common fonts cannot support.

Where variable font weights are unavailable, normal CSS fallback behavior
should remain sensible.

Preserve the existing visual hierarchy by default.

Verify:

- body text
- headings
- bold
- strong text
- links
- callouts
- blockquotes
- code
- Reading Mode
- Live Preview

Do not unintentionally modify UI font weights.

Add the Primary badge to the relevant Typography settings section.

============================================================
STYLE SETTINGS QUALITY
============================================================

For every new setting:

1. Give it a clear human-readable name.
2. Give it a useful description.
3. Place it in the correct category.
4. Use a stable setting ID.
5. Use the same formatting conventions as existing Primidian settings.
6. Provide a sensible default.
7. Ensure reset-to-default works.
8. Do not create duplicate IDs.
9. Do not break Style Settings parsing.

Do not expose internal implementation details to the user in the
setting description.

============================================================
DARK / LIGHT MODE
============================================================

Every feature must work in both:

- Dark Mode
- Light Mode

Do not hard-code colors that only work on the current dark theme.

Use existing Primidian color tokens where possible.

If a feature genuinely requires separate dark/light values, follow the
existing Primidian token architecture.

============================================================
RESPONSIVE / UI SAFETY
============================================================

Test at least conceptually for:

- normal desktop width
- narrow editor width
- long setting names
- long descriptions
- Style Settings sidebar
- settings reset state

Badges must not overlap controls.

============================================================
REDUCED MOTION
============================================================

Do not introduce unnecessary animations for these features.

If any existing Primidian animation is involved, preserve the existing
reduced-motion behavior.

Do not introduce:

    transition: all;

============================================================
IMPLEMENTATION ORDER
============================================================

Implement in this order:

1. Audit existing typography/link/editor tokens only as necessary.
2. Implement reusable Primary badge support if needed.
3. Font Feature Settings.
4. Per-Heading Font Family.
5. Link Underline Controls.
6. Bold Modifier.
7. Non-Markdown Link Colors.
8. Editor Gutter Colors.
9. Font Size Tiers.
10. Font Weight Tiers.
11. Clean up/reconcile duplicate or overlapping rules.
12. Build.
13. Fix build errors.
14. Build again.
15. Inspect generated theme.css for expected output.

You MAY batch closely related CSS changes, but do not make unrelated
changes outside Phase 1.

============================================================
BUILD / VALIDATION
============================================================

Run the normal Primidian build command.

The build MUST succeed.

If the build fails:

- inspect the actual error;
- fix the source;
- rebuild.

Do not simply report the build error as the final result if it is
reasonably fixable.

Verify that generated theme.css is produced successfully.

Check that the new settings are actually present in the generated output.

============================================================
GIT / CHANGE SCOPE
============================================================

Before modifying anything, inspect git status.

Do not reset or discard the user's existing work.

Do not touch unrelated uncommitted changes.

Only modify files required for Phase 1.

Do not modify the historical research documents.

Do not modify the blockquote work.

Do not modify unrelated experimental features.

============================================================
IMPORTANT STOP CONDITION
============================================================

There is a difference between:

A) "I need to understand this better"

and

B) "There is a genuine technical blocker preventing implementation."

You are NOT allowed to stop merely because more research could be
performed.

If the intended implementation is clear from the existing research and
source architecture, implement it.

Only stop and report a blocker if:

- the required Obsidian DOM does not exist or is fundamentally
  inaccessible;
- the feature conflicts with an existing hard architectural constraint;
- the build system prevents a safe implementation;
- implementing it would require modifying unrelated systems;
- or there is a genuinely ambiguous requirement that cannot be resolved
  from documents/source.

If none of those conditions apply:

IMPLEMENT THE FEATURE.

============================================================
FINAL REPORT
============================================================

At the end, report:

### Implementation Status

For each of the eight features:

| Feature | Status | Source Files | Settings Added | Badge |
|---|---|---|---|---|
| Font Features | | | | Primary |
| Per-Heading Font Family | | | | Primary |
| Link Underline Controls | | | | Primary |
| Bold Modifier | | | | Primary |
| Non-Markdown Link Colors | | | | Primary |
| Editor Gutter Colors | | | | Primary |
| Font Size Tiers | | | | Primary |
| Font Weight Tiers | | | | Primary |

Then report:

### Files Changed

List every modified source file.

### Settings Added

List the actual Style Settings IDs and categories.

### Badge Implementation

Explain whether the existing Glow System badge mechanism was reused.

### Build

Report the exact build command and whether it succeeded.

### Validation

Report what was verified automatically and what still requires manual
testing in Obsidian.

### Known Limitations

Only list genuine limitations.

DO NOT claim a feature was implemented if only its CSS selectors were
written.

============================================================
FINAL INSTRUCTION
============================================================

STOP RESEARCHING.

START IMPLEMENTING PHASE 1 NOW.

The planning work is already complete.

Do not return another planning document.

Do not return a summary of the roadmap before editing.

Use the existing research to make the changes.

IMPLEMENT THE SOURCE FILES, BUILD THE THEME, AND REPORT THE RESULT.
```
---

# Phase 2 — Content Enhancements

This covers editor background patterns, active line highlighting, heading alignment, heading line-height, and highlight combinations. The roadmap places these in Tier 2 because they need more editor/CSS testing.

```text
# PHASE 2 IMPLEMENTATION — CONTENT & EDITOR ENHANCEMENTS

Implement PHASE 2 from:
docs/plans/primary-feature-analysis/09-Primary-Feature-Roadmap.md

READ:
- 08-Proposed-Primidian-Settings-Organization.md
- 09-Primary-Feature-Roadmap.md
- 10-Primary-Primidian-Master-Analysis.md

Implement ONLY Phase 2.

Do not implement Phase 3, 4, or 5 yet.

==================================================
FEATURES
==================================================

1. Editor Background Patterns
2. Active Line Highlighting
3. Per-Heading Text Alignment
4. Per-Heading Line Height
5. Highlight Combinations

==================================================
PRIMARY PROVENANCE BADGE
==================================================

Every feature in this phase originated from the Primary feature analysis.

Add the small:

    Primary

badge beside the relevant setting/section.

Reuse the already-working Primidian badge mechanism.

Do NOT insert literal HTML into Style Settings strings.

Use only Primidian theme colors.

Do not make the badge glow.

For Phase 2, do NOT use the Experimental badge; these are Tier 2 features,
not Tier 3 experimental features.

==================================================
1. EDITOR BACKGROUND PATTERNS
==================================================

Implement:

- None
- Line Grid
- Dot Grid

or the exact options established by the roadmap/source analysis.

Provide settings for:

- background type
- background color
- pattern size
- pattern color

Ensure the default remains the current solid editor background.

Important:

The pattern must remain subtle.

Do not impair text readability.

Test:

- Live Preview
- Reading Mode where relevant
- code blocks
- callouts
- blockquotes
- tables
- long documents
- light mode
- dark mode

Ensure patterns do not scroll/position incorrectly relative to the editor.

==================================================
2. ACTIVE LINE HIGHLIGHTING
==================================================

Add active-line highlighting.

Provide the planned settings for:

- enable/disable if appropriate
- active line background/color

The implementation must target only the active editor line.

Do not globally modify all .cm-line elements.

Do not introduce prohibited expensive selectors.

Verify cursor movement and selection still behave correctly.

Test long documents and scrolling.

==================================================
3. PER-HEADING TEXT ALIGNMENT
==================================================

Add six heading alignment controls:

- H1
- H2
- H3
- H4
- H5
- H6

Options should use valid CSS text-align choices.

Default:

    left

Preserve current appearance.

Verify in Reading Mode and Live Preview.

==================================================
4. PER-HEADING LINE HEIGHT
==================================================

Add six independent controls.

The settings should allow users to adjust heading line-height without
breaking surrounding layout.

Default values must preserve existing appearance.

Avoid excessive/unsafe values.

The UI should clearly state that the value is a line-height value.

Do not force px if a unitless line-height architecture is more appropriate.

==================================================
5. HIGHLIGHT COMBINATIONS
==================================================

Add the planned styling for combinations such as:

- bold + highlight
- italic + highlight
- bold + italic + highlight
- other combinations identified in the roadmap

Preserve current highlight behavior by default.

Add only additional override granularity.

Avoid selector conflicts with:

- bold
- italic
- links
- inline code
- headings

==================================================
PERFORMANCE
==================================================

Do not use:

- transition: all
- expensive global selectors
- unnecessary DOM-wide filters
- unnecessary repaint-heavy animations

Any background-pattern implementation must be reasonably lightweight.

==================================================
REGRESSION
==================================================

Test:

- Dark/Light
- Reading/Live Preview
- all six headings
- long editor sessions
- selection
- cursor movement
- tables
- callouts
- blockquotes
- code blocks

Do not modify Glow/Blockquote systems.

Build and verify generated theme.css.

Final report must separate:

- automatically validated
- manually tested
- remaining limitations.
```

---

# Phase 3 — Interface Enhancements

This is the interface-focused Tier 2 phase: status-bar slide-out, ribbon slide-out, file-header hover-reveal, and note-embed per-side borders.

```text
# PHASE 3 IMPLEMENTATION — INTERFACE ENHANCEMENTS

Implement PHASE 3 from the Primary-inspired roadmap.

READ FIRST:

- docs/plans/primary-feature-analysis/08-Proposed-Primidian-Settings-Organization.md
- docs/plans/primary-feature-analysis/09-Primary-Feature-Roadmap.md
- docs/plans/primary-feature-analysis/10-Primary-Primidian-Master-Analysis.md

Implement ONLY:

1. Status Bar Slide-Out Style
2. Ribbon Slide-Out on Hover
3. File Header Hover-Reveal
4. Note Embed Per-Side Border

==================================================
BADGES
==================================================

All four are Primary-inspired Tier 2 features.

Add:

    Primary

badge

to their relevant Style Settings sections.

Do not add Experimental yet.

Use the same already-working badge infrastructure.

Do not put raw HTML into settings descriptions/titles.

==================================================
1. STATUS BAR SLIDE-OUT
==================================================

Extend the current status-bar styles with the additional variants identified
by the roadmap.

Preserve existing:

- Floating
- Docked

Add the researched Primary-inspired variants only.

Before implementing, inspect the current Primidian status-bar architecture.

Do not replace the current modes.

Make each style independently selectable.

Verify:

- bottom positioning
- workspace resizing
- hover behavior
- status text
- small screens
- mobile where applicable

Avoid layout-jank-heavy animations.

Prefer transform/opacity where appropriate.

Respect reduced-motion.

==================================================
2. RIBBON SLIDE-OUT
==================================================

Implement an optional ribbon behavior where the ribbon is collapsed/hidden
to conserve workspace and reveals itself on hover.

IMPORTANT:

Do not force this behavior on users by default.

Default must preserve Primidian's current ribbon appearance.

Provide a Style Settings selector/toggle.

Investigate the actual Obsidian ribbon DOM before writing selectors.

Do not rely on brittle positional hacks.

Ensure:

- hover area remains usable
- icons remain clickable
- ribbon does not overlap editors incorrectly
- no clipping
- no focus/accessibility issues
- no mobile breakage

Use compositor-friendly motion.

Respect reduced-motion.

==================================================
3. FILE HEADER HOVER-REVEAL
==================================================

Add optional hover-reveal behavior for the file header/title area.

Default:

    Current Primidian behavior

Provide a setting for enabling the hover-reveal mode.

Do not hide important controls permanently.

Ensure keyboard/focus users can still reach the controls.

Investigate the current file-header DOM first.

Avoid absolute-position hacks that break different view widths.

==================================================
4. NOTE EMBED PER-SIDE BORDER
==================================================

Expand embed customization so the user can independently control:

- top
- right
- bottom
- left

border properties according to the roadmap.

Reuse existing embed tokens.

Avoid creating a completely separate color architecture.

Verify that embeds, nested embeds, and internal links remain functional.

==================================================
ANIMATION ARCHITECTURE
==================================================

Do NOT copy Primary's animation system wholesale.

Use Primidian's existing:

- duration scale
- easing system
- reduced-motion behavior
- transform/opacity preference

The research specifically concluded that Primidian's current motion architecture
is preferable to Primary's in several respects. Do not regress that. 
```

Add the rest:

```text
Do not copy Primary's malformed transitions or layout-affecting popup motion.

==================================================
SCOPE
==================================================

Do not modify:

- Glow Engine
- UI Glow
- blockquotes
- dividers
- code blocks
- task compatibility
- unrelated typography

==================================================
VALIDATION
==================================================

Test every interface feature at:

- normal window size
- narrow window size
- large window
- dark mode
- light mode
- reduced motion enabled
- reduced motion disabled

Check keyboard focus and accessibility.

Build and verify theme.css.

Final report:
- settings added
- badges added
- selectors changed
- animation approach
- build status
- runtime/manual tests
- remaining limitations
```

---

# Phase 4 — Major Features

The roadmap deliberately simplifies this phase from Primary's larger systems: progress bar customization, six-color folders instead of twelve, and additional task types incrementally.

This is where I'd become more conservative.

```text
# PHASE 4 IMPLEMENTATION — MAJOR FEATURES

This is PHASE 4 of the Primary-inspired roadmap.

READ:

- 08-Proposed-Primidian-Settings-Organization.md
- 09-Primary-Feature-Roadmap.md
- 10-Primary-Primidian-Master-Analysis.md

Implement:

1. Progress Bar Customization
2. Simplified Folder Colors — 6 colors
3. Additional Task Types — incremental implementation

These are larger features.

Do NOT implement Phase 5 experimental features.

==================================================
BADGES
==================================================

These are Primary-inspired features.

Add:

    Primary

badge

to their relevant sections.

Because these are Phase 4 / major features rather than explicitly marked
Tier 3 experimental in the roadmap, do NOT automatically label them
Experimental.

However, individual features may be marked Experimental only if the
implementation discovers a genuine unresolved experimental state.

Do not use the badge as a replacement for proper documentation.

==================================================
1. PROGRESS BAR CUSTOMIZATION
==================================================

Investigate the actual Obsidian progress-bar/task progress DOM or syntax
supported by the feature being styled.

Implement only what is reliably targetable.

The roadmap estimates approximately 15 settings.

Do not create all 15 blindly.

Group them logically.

Possible categories include:

- general visibility/style
- track/background
- fill
- range/color states
- dimensions
- radius

Use the roadmap/source analysis as the exact reference.

Default behavior must remain visually coherent with Primidian.

Do not copy Primary's flat color architecture.

Use Primidian tokens.

==================================================
2. SIMPLIFIED FOLDER COLORS
==================================================

IMPORTANT:

Do NOT implement Primary's full 12-color/60+ setting model.

The roadmap explicitly recommends simplifying this to 6 colors.

Implement:

- Folder Color Style
- Folder Color 1
- Folder Color 2
- Folder Color 3
- Folder Color 4
- Folder Color 5
- Folder Color 6

or the exact structure determined by the roadmap and current source.

Consider whether the style selector should support:

- Off / single accent
- Sequential/alternating color cycle
- another minimal architecture

Do not add unnecessary settings.

Colors must integrate with Primidian's token system.

Do not introduce nth-child selector logic if a more robust architecture exists.

Ensure nested folders and collapsed folders continue to work.

Test:

- files
- folders
- nested folders
- bookmarks if affected
- light mode
- dark mode

==================================================
3. ADDITIONAL TASK TYPES
==================================================

Primidian currently supports six task types.

Primary has substantially more.

Do NOT add all remaining states in one giant implementation.

Implement incrementally, starting with the most broadly useful/low-risk
additional states identified in the roadmap/research.

For each task type:

- define marker appearance
- define color token
- define CSS
- ensure it does not conflict with normal checkboxes
- ensure Task List Kanban compatibility is preserved
- test Reading Mode
- test Live Preview

Do not modify the existing Task List Kanban compatibility fix unless required.

New task types should follow the same rendering architecture as the
existing six.

==================================================
BADGES
==================================================

The Primary badge must be reusable.

Do not create one-off badge CSS for each section.

Do not use literal HTML in settings text.

==================================================
RISK CONTROL
==================================================

Because these are larger changes:

- implement ONE major feature at a time;
- build after each;
- visually test after each;
- do not proceed to the next feature if the previous one causes regressions.

Do not produce a huge untested diff.

==================================================
VALIDATION
==================================================

Test:

- Dark
- Light
- Settings reset
- existing settings
- file explorer
- tasks
- Task List Kanban
- mobile where relevant

Make sure no unrelated settings are invalidated.

Do not rename existing settings IDs unless absolutely necessary.

Do not remove existing configuration.

Build and verify generated theme.css.

Final report must provide separate results for:

- Progress Bar
- Folder Colors
- Task States
```

---

# Phase 5 — Experimental / Investigation First

This one is **different**. The roadmap explicitly says Graph/Canvas need DOM investigation, and per-heading border/background require architecture investigation. They're Tier 3 experimental.

So I would **not tell OpenCode to immediately implement all four**.

Give it this prompt, and require it to investigate each one before implementation:

```text
# PHASE 5 — EXPERIMENTAL FEATURES
# INVESTIGATE → PLAN → IMPLEMENT ONE FEATURE AT A TIME

Implement PHASE 5 of the Primary-inspired roadmap.

READ FIRST:

- docs/plans/primary-feature-analysis/08-Proposed-Primidian-Settings-Organization.md
- docs/plans/primary-feature-analysis/09-Primary-Feature-Roadmap.md
- docs/plans/primary-feature-analysis/10-Primary-Primidian-Master-Analysis.md

PHASE 5 FEATURES:

1. Graph View Colors
2. Canvas Colors
3. Per-Heading Border
4. Per-Heading Background

These are Tier 3 / Experimental.

DO NOT blindly implement all four.

For each feature:

    INVESTIGATE
        ↓
    PLAN
        ↓
    IMPLEMENT
        ↓
    TEST
        ↓
    ONLY THEN proceed to next feature

==================================================
BADGES
==================================================

Every Phase 5 feature must receive BOTH badges:

    Primary
    Experimental

Meaning:

- Primary = the capability is inspired by / identified from Primary
- Experimental = the Primidian implementation is still experimental,
  architecture-sensitive, or requires additional compatibility testing

Reuse the exact successful badge system already implemented for Glow System.

Do not put literal HTML markup into Style Settings text.

Both badges must:

- use existing Primidian theme colors
- adapt Dark/Light
- adapt to accent colors
- remain compact
- not glow
- not create layout problems

==================================================
GENERAL EXPERIMENTAL RULE
==================================================

Do not claim support for a feature merely because CSS selectors exist.

A feature is not complete until its target DOM has been verified.

If Obsidian does not expose a stable enough DOM structure:

STOP.

Document the limitation.

Do not ship a brittle implementation.

==================================================
1. GRAPH VIEW COLORS
==================================================

Before implementation:

Investigate the current Obsidian Graph View DOM/SVG structure.

Determine whether Primidian can safely target:

- resolved note node
- unresolved note node
- tag node
- attachment node
- active file node
- hovered node
- graph text
- graph lines
- graph arrows

The roadmap identifies approximately 10 graph-specific colors.

Do not assume those selectors are stable.

Determine:

- SVG elements used
- classes
- data attributes
- inline styles
- CSS variables
- hover states
- selected states

Assess future Obsidian compatibility.

Then design the smallest viable settings architecture.

Add the Primary + Experimental badges.

If reliable styling is possible:

implement one coherent graph-color subsystem.

If not:

STOP and report the blocker.

==================================================
2. CANVAS COLORS
==================================================

Do the same investigation for Canvas.

Study:

- canvas nodes/cards
- card labels
- dot pattern
- backgrounds
- connections where relevant
- selection states

Determine whether CSS can safely control:

- dot pattern color
- card label color
- canvas colors
- the roadmap's proposed 7+ settings

Do NOT blindly style generic canvas elements.

Document DOM stability concerns.

If a safe implementation exists, implement it.

Otherwise document the blocker and stop.

Add Primary + Experimental badges.

==================================================
3. PER-HEADING BORDER
==================================================

Investigate Primidian's existing heading architecture first.

The roadmap suggests:

6 headings × 4 sides = 24 settings

but explicitly notes that this could potentially be simplified.

Do NOT automatically add 24 settings.

Evaluate whether a more usable architecture is possible, such as:

- border enable/disable
- border color
- border width
- border radius
- border style
- optional per-heading control

Determine whether the feature actually provides value without exploding
the Style Settings panel.

If implemented, preserve Primidian's heading design.

Do NOT turn every heading into a heavy bordered card by default.

Default values must preserve current appearance:
borders OFF unless the existing design already uses them.

Add Primary + Experimental badges.

==================================================
4. PER-HEADING BACKGROUND
==================================================

Investigate the heading architecture.

Determine whether each H1-H6 can safely receive an independent background.

Provide enough flexibility without creating unnecessary complexity.

Default:

    no additional background

unless the existing design already provides one.

Ensure:

- wrapping works
- headings remain readable
- background does not interfere with heading gradients
- borders/underlines remain correct
- Live Preview works
- Reading Mode works

Add Primary + Experimental badges.

==================================================
EXPERIMENTAL FEATURE DOCUMENTATION
==================================================

For every Phase 5 feature create/update a short documentation section
in the project planning docs describing:

- what was investigated
- what DOM was found
- what selectors are used
- compatibility considerations
- why the feature is experimental
- known limitations
- rollback procedure

Do not modify the old Primary research docs to pretend something was always
supported.

Keep implementation notes clearly separated from research notes.

==================================================
PERFORMANCE
==================================================

Avoid:

- transition: all
- expensive global selectors
- brittle nth-child hacks where possible
- unnecessary filters
- excessive SVG selectors
- broad Canvas selectors
- DOM-wide animations

Preserve Primidian's performance architecture.

==================================================
REGRESSION
==================================================

For Graph:

- small graph
- large graph
- tags
- files
- attachments
- hover
- selected node

For Canvas:

- empty canvas
- multiple cards
- selected card
- labels
- zooming

For headings:

- all six levels
- wrapping
- inline formatting
- gradients
- dark/light

Also test:

- reduced motion
- existing settings
- restore defaults

==================================================
STOP CONDITIONS
==================================================

If any feature cannot be implemented safely:

DO NOT force it.

The correct outcome of a Tier 3 experiment may be:

    "Investigated; not safe to ship yet."

That is a successful result.

Do not sacrifice Primidian stability merely to complete the roadmap.

==================================================
FINAL REPORT
==================================================

For EACH of the four features report:

- Investigation result
- DOM/selector findings
- Implementation status
- Settings added
- Primary badge
- Experimental badge
- Build result
- Manual testing
- Known limitations
- Ship / Do Not Ship recommendation
```

---

# One extra prompt: the Settings Reorganization itself

There's one thing I would do **before Phase 1**, even though it isn't technically a numbered phase in `09`: implement the proposed settings hierarchy from `08`.

The document is very explicit that the aim is to preserve all ~120 existing settings while reorganizing them into roughly 12 L1 categories. The migration map also explicitly defines where current categories move, such as Headings → Editor & Markdown → Headings and Code Blocks + Inline Code → Editor & Markdown → Code.

I'd do that as a separate **Phase 0**:

```text
# PHASE 0 — STYLE SETTINGS REORGANIZATION ONLY

Read:

- docs/plans/primary-feature-analysis/08-Proposed-Primidian-Settings-Organization.md
- docs/plans/primary-feature-analysis/09-Primary-Feature-Roadmap.md
- docs/plans/primary-feature-analysis/10-Primary-Primidian-Master-Analysis.md

GOAL:

Reorganize Primidian's existing Style Settings hierarchy according to the
proposed structure in document 08.

IMPORTANT:

This task is organizational ONLY.

Do NOT add new Primary-inspired features yet.

Do NOT remove existing settings.

Do NOT change setting behavior.

Do NOT change defaults.

Do NOT change CSS selectors.

Do NOT change tokens.

Do NOT change visual appearance.

Do NOT rename setting IDs unless absolutely necessary.

The Style Settings UI should become the proposed hierarchy while preserving
all existing functionality.

==================================================
PRESERVE ALL EXISTING SETTINGS
==================================================

The source document explicitly identifies approximately 120 existing
settings and marks every existing category as preserved.

Verify all of them before and after migration.

Use the migration map in document 08 as the authoritative mapping.

==================================================
PROPOSED HIGH-LEVEL STRUCTURE
==================================================

Use the proposed hierarchy:

- About & Guide
- Colours
- Typography
- Interface
- Editor & Markdown
- Gradient System
- Glow System
- Animations
- Plugin Compatibility
- Advanced

Do not invent additional top-level categories without evidence.

==================================================
SPECIAL CASES
==================================================

Move Inline Code into Code.

Move Code Blocks into Code.

Move Headings into Editor & Markdown → Headings.

Move Dividers into Editor & Markdown → Dividers.

Move Bold/Italic/Highlight into Text Emphasis.

Move Links into Links.

Move Blockquotes into Blockquotes.

Move Checkboxes & Tasks into Checkboxes & Tasks.

Move Tables, Tags, Lists, Embeds & Properties into their proposed locations.

Keep:

- Gradient System
- Glow System
- Animations
- Plugin Compatibility

as top-level systems.

==================================================
BADGES

Do NOT add Primary/Experimental badges yet except where an existing
Experimental badge already exists and must remain functional.

This phase is organization-only.

==================================================
VALIDATION
==================================================

Before:

- count current settings
- record IDs
- record defaults

After:

- verify every setting still exists
- verify IDs unchanged
- verify defaults unchanged
- verify descriptions unchanged unless formatting is needed
- verify Restore Default works
- verify no orphaned settings
- verify no duplicate settings
- verify all section headings render correctly

Build the theme.

Do not change visual appearance.

Final report must include:

- old category → new category mapping
- number of settings preserved
- IDs preserved
- defaults preserved
- build result
- any exceptions
```

---

## The order I'd personally use

Because you've already got the roadmap, I'd do:

**Phase 0 → Phase 1 → Phase 2 → Phase 3 → Phase 4 → Phase 5**

That maps directly onto the architecture you've documented.

And I'd make **one Git commit after each phase**, with the test branch containing the incremental history. That gives you an absurdly nice rollback structure:

```text
main
 │
 └── known-good release
        │
        └── test
             ├── Phase 0 — Settings Reorganization
             ├── Phase 1 — Quick Wins
             ├── Phase 2 — Content
             ├── Phase 3 — Interface
             ├── Phase 4 — Major Features
             └── Phase 5 — Experimental
```

The nice part is that **Phase 5 can fail without contaminating everything before it**.

Also, I would _not_ let OpenCode implement Phase 4 or 5 in one uninterrupted run. The roadmap itself identifies folder colors/task states as high-risk and Graph/Canvas as needing DOM investigation.

So for the big phases, the best workflow is:

**one feature → build → visually test → commit → next feature.**

That will be much safer than another 18-minute "OpenCode goes brrr" session. 💀

And the badge architecture is now a nice little reusable system: **Primary** tells users where the idea came from, while **Experimental** communicates its maturity. That fits the roadmap's own Tier 1/2/3 distinction very neatly.