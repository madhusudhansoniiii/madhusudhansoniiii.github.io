# 04 · UI/UX Design System

Adopted from the Alpha Man UI brief: **warm-dark "earned strength," single brass
accent, Kite-style restraint.** Calm, premium, discreet — never clinical, never
neon, never explicit.

## Color tokens

| Token | Value | Use |
|---|---|---|
| `bg` | `#14110E` | App background (warm dark, not cold black) |
| `surface` | `#1F1A15` | Cards, sheets |
| `border` | `#362E25` | Hairline dividers, card borders |
| `text` | `#F4EFE8` | Primary text |
| `textSecondary` | `#A99E90` | Secondary text |
| `textMuted` | `#776E62` | Captions, disabled |
| `accent` | `#D9A441` (brass) | ONE accent: primary buttons, active states, progress, streak flame |
| `success` | `#86A57E` | Completion, positive deltas |
| `danger` | `#B3564D` | Destructive actions only |

Rules: generous whitespace; hairline (1px) borders; the brass accent used
sparingly — one accent element per screen region. Optional light theme ships
post-v1; dark is the brand default.

## Typography

- **Latin:** Inter (UI) — 400/500/600. Display numerals (timers, scores):
  tabular lining figures.
- **Indic scripts:** Noto Sans family per script (Devanagari, Gujarati, Tamil,
  Telugu, Kannada, Malayalam, Bengali, Gurmukhi, Odia) — matched x-height with
  Inter; line-height 1.5+ for Indic text (taller conjuncts).
- Scale: 34/28 display · 22 title · 17 body · 15 secondary · 13 caption.
  All sizes respect OS font scaling (accessibility).

## Signature element: the breathing circle

The session player centers on a slow-pulsing circle:
- **Squeeze/inhale:** circle grows over the hold duration, brass ring brightens,
  rising tone, single haptic tick.
- **Release/exhale:** circle shrinks, falling tone, soft double haptic.
- Countdown numeral inside the circle; rep counter and phase label ("Squeeze" /
  "Release") above; breathing cue below ("Keep breathing — don't hold your breath").
This is the app's "biofeedback feeling" without hardware. Animations 60fps,
duration-driven (not looped), reduced-motion fallback = opacity fade.

## Components

- **Buttons:** large (56px min height), full-width primary (brass fill, dark
  text), ghost secondary. One primary action per screen.
- **Cards:** surface + hairline border, 16px radius, 20px padding.
- **Progress ring:** hairline track, brass fill, center stat.
- **Streak chip:** flame glyph + count, brass on surface.
- **Program map:** vertical stage list with connected nodes; locked stages show
  a subtle padlock, never a shouting overlay.
- **Charts:** single-hue brass bars/lines on hairline grid, no gradients or 3D
  (see dataviz conventions); success green only for goal-met markers.
- **Badges/certificates:** engraved-metal look — brass line-art on dark, no
  cartoon confetti; milestone celebration = restrained shimmer + haptic.

## Imagery & tone

- Muscle guide = clean line schematic, side-view cross-section, no photos,
  nothing explicit. Gender toggle switches the schematic.
- No gym stock photos, no neon, no emoji-heavy copy.
- Voice: calm coach, second person, plain words, honest ("Most people feel a
  difference in 4–6 weeks with daily practice") — never promises or medical claims.

## Accessibility (all age groups)

- Tap targets ≥ 48dp; primary flows operable one-handed, bottom-anchored actions.
- Contrast AA minimum (brass on dark passes for large text/buttons; body text uses `text`).
- Full TalkBack/VoiceOver labels; session player fully usable by audio alone
  (voice guidance is a first-class feature, not an add-on).
- Reduced motion & silent modes; every audio cue has a visual + haptic twin.
- Copy at a grade-6 reading level in every language.

## Discretion

- Optional neutral app icon + neutral notification copy ("Time for your
  5-minute routine").
- App lock (PIN/biometric) gate on open.
- No screenshots of sensitive screens in the OS app switcher (FLAG_SECURE on
  Android for session/progress screens — decide at build).
