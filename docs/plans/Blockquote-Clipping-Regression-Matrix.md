# Blockquote Clipping — Regression Test Matrix

## Test Cases

### By Preset

| Preset | Reading Mode | Live Preview | Nested | Wrapped | Glow ON |
|---|---|---|---|---|---|
| Simple | ✓ | ✓ | ✓ | ✓ | ✓ |
| Boxy | ✓ | ✓ | ✓ | ✓ | ✓ |
| Minimal | ✓ | ✓ | ✓ | ✓ | ✓ |
| Fade | ✓ | ✓ | ✓ | ✓ | ✓ |

### By Blockquote Structure

| Structure | Reading Mode | Live Preview | Notes |
|---|---|---|---|
| Single-line | ✓ | ✓ | Both ::before and ::after on same element |
| 2-line | ✓ | ✓ | First + Last |
| Many-line (4+) | ✓ | ✓ | First + Middle(s) + Last |
| Long wrapped | ✓ | ✓ | Single .HyperMD-quote that wraps visually |
| Nested (1 level) | ✓ | ✓ | Outer + Inner |
| Nested (2+ levels) | ✓ | ✓ | Outer + Inner + Deepest |
| After paragraph | ✓ | ✓ | Spacing correct |
| After heading | ✓ | ✓ | Spacing correct |
| Before divider | ✓ | ✓ | No overlap |
| After divider | ✓ | ✓ | No overlap |

### By Glow Engine

| Engine | Blockquote Glow | Notes |
|---|---|---|
| Automatic | ✓ | Uses box-shadow for blockquotes |
| Text Shadow | ✓ | Falls back to box-shadow |
| Drop Shadow | ✓ | Falls back to box-shadow |
| Glow OFF | ✓ | No glow, just decoration |

### By Theme

| Mode | Notes |
|---|---|
| Dark Mode | ✓ |
| Light Mode | ✓ |

### Specific Visual Checks

| Check | Reading Mode | Live Preview |
|---|---|---|
| Top fading line visible | ✓ | ✓ |
| Bottom fading line visible | ✓ | ✓ |
| Left accent line continuous | ✓ | ✓ |
| Bottom border-radius correct | ✓ | ✓ |
| Top border-radius correct | ✓ | ✓ |
| No horizontal seams between lines | — | ✓ |
| No extra boxes around each line | — | ✓ |
| Nested quotes have muted border | ✓ | ✓ |
| Background color continuous | ✓ | ✓ |

### Edge Cases

| Case | Reading Mode | Live Preview |
|---|---|---|
| Empty blockquote | ✓ | ✓ |
| Blockquote with only whitespace | ✓ | ✓ |
| Very long single line (wrapping) | ✓ | ✓ |
| Blockquote containing code | ✓ | ✓ |
| Blockquote containing links | ✓ | ✓ |
| Blockquote containing emphasis | ✓ | ✓ |
| Consecutive blockquotes | ✓ | ✓ |

---

## Priority Tests (Must Pass)

1. **Fade preset, multi-line, Live Preview** — Bottom fading line fully visible
2. **Boxy preset, multi-line, Live Preview** — Bottom border-radius correct
3. **Nested blockquotes, Live Preview** — Inner decorations not clipped
4. **Single-line quote, Live Preview** — Both top and bottom decorations visible
5. **Glow ON, Fade preset, Live Preview** — No clipping of glow or decoration

---

## Test Procedure

1. Create a test note with all blockquote variations above
2. Open in Reading Mode — verify all cases render correctly
3. Switch to Live Preview — verify all cases render correctly
4. Enable Glow — verify no clipping with glow active
5. Switch through all four presets — verify each works
6. Test in both Dark Mode and Light Mode
