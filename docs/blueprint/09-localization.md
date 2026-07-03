# 09 · Localization (12 Indian languages)

## Languages & rollout

| Wave | Languages | Rationale |
|---|---|---|
| v1.0 | English, Hindi | Covers widest reach; proves the pipeline |
| v1.1 | Marathi, Gujarati, Bengali, Tamil | Largest next cohorts |
| v1.2 | Telugu, Kannada, Malayalam, Punjabi | |
| v1.3 | Odia + (candidates: Assamese, Urdu) | Urdu adds RTL — scope separately |

Shipping all 12 simultaneously multiplies QA, voice recording, and clinical
review by 12 — phasing protects quality. The i18n architecture supports all 12
from day one; only content lags.

## What gets localized

1. **UI strings** — Flutter ARB/ICU (plurals, genders). ~600 strings est.
2. **Exercise cues & coach copy** — the clinically sensitive set (~150 strings);
   translated by professionals, then **reviewed by a physio-literate speaker**
   (mistranslated cues are a safety issue, not a polish issue).
3. **Voice guidance** — per-language audio packs, downloaded on demand
   (~2–3MB each). v1: recorded human voice for En+Hi; evaluate high-quality TTS
   (e.g., Google Cloud TTS Indic voices) for later waves — flag each pack's
   provenance in credits.
4. **Education content** — articles/videos with per-locale fields in Firestore
   (doc 07 schema); English fallback with "translation coming" notice.
5. **Notifications, paywall, certificates, store listings** (Play/App Store
   localized metadata — big organic-discovery win, competitors don't do it).

## Mechanics

- Language picker at first launch (before auth) and in Settings; instant switch,
  no restart; stored in profile for cross-device sync + push localization.
- Fonts: Noto Sans per script, subsetted, bundled for wave-1 languages,
  dynamically fetched for later waves.
- Numerals: Latin digits everywhere (timer legibility), localized date formats.
- Layout: strings expand up to ~40% vs English — components must wrap, not
  truncate; pseudo-localization test in CI.
- Translation workflow: source-of-truth ARB in repo → TMS (Crowdin/Lokalise) →
  professional translation → physio review for cue set → CI pulls back →
  screenshot tests per locale for top 8 screens.

## Admin hooks

Admin panel (doc 10) shows per-language content coverage %, missing-translation
flags raised by client fallbacks, and lets editors publish locale field updates
without app releases.
