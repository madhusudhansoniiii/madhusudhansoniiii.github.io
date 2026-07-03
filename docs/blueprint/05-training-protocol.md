# 05 · Training Protocol (PROTOCOL_SPEC — draft)

> **Status: DRAFT — every parameter below requires sign-off by a licensed
> pelvic-floor physiotherapist before launch.** The two deep-research reports
> referenced by the master prompt were not provided; parameters are drawn from
> published public evidence and graded. Where evidence is thin the safer,
> more conservative option is chosen and flagged.

**Evidence grades:** A = systematic review / guideline (Cochrane, NICE NG123);
B = RCT (e.g., Dorey 2005 for men); C = expert consensus / common clinical practice.

## Exercise taxonomy

| Type | Purpose | How it's cued | Grade |
|---|---|---|---|
| Slow holds (endurance) | Strength & support | Squeeze-lift 3–10s, equal rest, keep breathing | A |
| Quick flicks | Fast-twitch response (sneeze/cough, ejaculatory control) | 1s max squeeze, 2s release, sets of 10 | A |
| Reverse Kegel / relaxation | Down-training tense floors, pain-first track | Slow exhale, soft belly, gentle lengthening | C — NEEDS PHYSIO REVIEW |
| The Knack (behavioral) | Pre-contract before cough/lift | Taught as a skill in Learn + functional stage | B |
| Start-stop awareness | Identification only (not a routine exercise) | One-time identification drill; not repeated during urination | C |
| Functional integration | Contract during real movements (stand, walk, lift) | Later stages only | C |

## Prescription defaults (per session)

- **Structure:** warm-up breathing (30s) → slow holds block → quick flicks block →
  relaxation cool-down (30s).
- **Dose:** 3 sets/day equivalent, ~10 reps/set, hold time per level (below),
  rest ≥ hold time. Daily frequency; results messaging: 8–12 weeks, early
  changes 4–6 weeks. (Grade A for continence outcomes; sexual-function outcomes
  Grade B.)
- **Slow:fast ratio:** default 2:1; goal-adjusted (below).

## 7-stage progressive program

| Stage | Weeks | Hold / rest | Session | Advance when |
|---|---|---|---|---|
| 1 Beginner Foundation | 1–2 | 3s / 3s ×10, 1 set + identification drills | 3 min | 7 sessions logged + self-report "can feel the squeeze" |
| 2 Basic Strength | 3–4 | 5s / 5s ×10, 2 blocks | 5 min | 80% weekly consistency |
| 3 Endurance | 5–6 | 8s / 8s ×8 + 10 flicks | 7 min | holds rated "moderate" or easier |
| 4 Speed | 7–8 | 5s holds + 2×15 flicks | 7 min | flick cadence kept 2 sessions in a row |
| 5 Advanced Control | 9–10 | 10s holds, staircase (half→full squeeze), reverse-Kegel work | 8 min | control drills completed |
| 6 Functional | 11–12 | Holds in standing/walking, the Knack drills | 8 min | 80% consistency |
| 7 Expert / Maintenance | 13+ | Mixed challenge sessions; maintenance 3–4×/week | 5–10 min | ongoing |

Auto-adaptation: 3 missed days → repeat current week; difficulty rated "too hard"
twice → step hold time down one level; "too easy" twice → offer early advance.
Never advance past a stage boundary without the consistency criterion.

## Personalization matrix (`buildProgram(answers)`)

Onboarding answers → plan parameters. Implement as readable rule tables, each row
commented with source + grade.

| Input | Effect |
|---|---|
| Gender | Content/cue set (men: prostate/ejaculatory cues; women: postpartum/prolapse-aware cues); schematic visuals |
| Experience (never / some / regular) | Entry stage 1 / 2 / 3; Control Score seed 20 / 35 / 50 |
| Goal: bladder control | +slow-hold volume, the Knack earlier (stage 4) |
| Goal: sexual wellness / lasting longer | flick ratio → 1:1, start-stop education, endurance emphasis |
| Goal: postpartum recovery | gate: <6 weeks postpartum or symptomatic → physio-first notice; gentle track, extra relaxation |
| Goal: prostate health (post-op continence) | conservative ramp + strong "work with your doctor" framing |
| Pelvic pain / tension = yes | **Relaxation-first track**: reverse Kegels + breathing only, no strength work, prominent physio referral. NEEDS PHYSIO REVIEW |
| Pregnancy = yes | Physio/doctor-first notice; only general breathing content until cleared |
| Recent pelvic surgery (<3 months) | Blocked from training; education only + referral |
| Time/day (3/5/10 min) | Blocks included per session; never below minimum effective dose |
| Age 55+ | Longer rests, seated variants offered first |
| Motivation low | Shorter sessions, streak-freeze grace, gentler reminder copy |

## Baseline & Control Score

Baseline self-test at onboarding: longest comfortable hold (self-timed with the
app timer) + flicks in 10s + symptom self-rating. Produces a 0–100 **Control
Score** — *a designed training index*, always labeled "estimated". It rises with
completed volume/progression and re-anchors on optional monthly re-tests. Never
shown as a medical measure and never used to promise outcomes.

## Safety rules & red flags (hard-coded)

- Stop-and-consult triggers in copy: pain during/after exercise, blood in urine,
  worsening leakage, pelvic pressure/bulge sensation → "pause training and see a
  doctor or pelvic-floor physiotherapist."
- Never coach exercising while urinating (identification drill is one-time only).
- Breath-holding and glute/abdominal substitution called out in every early session.
- All disclaimers surfaced at onboarding and in Learn; app never diagnoses.

## NEEDS PHYSIO REVIEW checklist

1. All hold/rest/rep/set values and weekly ramp above.
2. Reverse-Kegel cueing script and its place in the pain-first track.
3. Postpartum gating (weeks, symptoms) and pregnancy messaging.
4. Post-prostatectomy ramp and framing.
5. Advancement/regression thresholds.
6. Baseline self-test instructions and Control Score formula.
7. All translated exercise cues (per language) for clinical accuracy.

## Sources (to be expanded into PROTOCOL_SOURCES.md at build)

- NICE NG123 — pelvic floor muscle training ≥3 months for UI (Grade A)
- Cochrane 2018 (Dumoulin et al.) — PFMT for urinary incontinence (Grade A)
- Dorey et al. 2005 (BJU Int) — PFMT for erectile dysfunction / post-micturition dribble in men (Grade B)
- Miller et al. — "the Knack" pre-contraction studies (Grade B)
- App-based PFMT RCTs (e.g., Tät/Continence app trials) — digital delivery efficacy (Grade B)
