# 11 · Roadmap, Timeline, Testing & Deployment

## Development roadmap

**Phase 0 — Foundations (Weeks 1–2)**
Physio engagement + protocol sign-off kickoff · Firebase project, environments
(dev/staging/prod), CI/CD (GitHub Actions + Fastlane) · design tokens →
Flutter theme · ARB i18n scaffold (all 12 locales stubbed).

**Phase 1 — Core training MVP (Weeks 3–6)**
Auth (email/Google/OTP) + age gate · onboarding quiz + `generatePlan` matrix ·
guided session player (breathing circle, tones, haptics, voice En/Hi) ·
local+cloud session logging, streaks · Today/Program/Progress/Learn skeletons ·
offline cache. **Exit: complete a personalized session end-to-end offline.**

**Phase 2 — Monetization & retention (Weeks 7–9)**
RevenueCat + both stores' products + paywall + webhook entitlements ·
free-tier gating · full gamification (XP, badges, weekly goals) · notifications
(local reminders, FCM digests) · analytics events + Crashlytics · admin panel
modules 1–4, 7.

**Phase 3 — Content & polish (Weeks 10–12)**
Education library (En+Hi) · Hindi voice pack + full Hindi QA ·
accessibility pass (TalkBack/VoiceOver, font scaling) · performance pass ·
data export/delete · security review · physio final sign-off on all copy.

**Phase 4 — Beta & launch (Weeks 13–16)**
Closed beta (Play internal testing + TestFlight, 100–300 users) · fix cycle ·
store listings (localized), data-safety forms, health-app declarations ·
staged rollout (10%→50%→100% on Play; phased release on iOS).

**Post-launch:** v1.1 (4 more languages, content push, admin modules 5–10),
v1.2 (4 more languages, AI coach), v1.3 (Odia+, monthly challenges at scale,
leaderboard experiment, web checkout evaluation).

## Timeline & team estimate

~**16 weeks to public v1.0** with: 1 senior Flutter dev, 1 full-stack dev
(Functions/admin), 1 product designer (part-time after Phase 1), 1 pelvic-floor
physiotherapist (consulting), translators (Phase 3+), QA (Phases 2–4).
A single experienced full-stack Flutter dev can do it in ~22–26 weeks.

## Testing strategy

- **Unit:** personalization matrix (every rule row), session engine state
  machine, streak/XP math, entitlement gating — target 90% on these modules.
- **Widget/golden:** session player phases, paywall, Today — per-locale goldens
  for top screens (catches Indic text overflow).
- **Integration (Firebase emulator):** auth flows, security rules (user can't
  read others' data, client can't write subscriptions), plan generation.
- **E2E (Patrol/integration_test):** onboarding→session→completion; purchase
  sandbox flows on both stores; offline session → sync.
- **Manual matrix:** low-end Android (2GB RAM), iOS oldest-supported, TalkBack/
  VoiceOver run-through, all reminder permutations, timezone/day-boundary streaks.
- **Beta:** structured feedback form + analytics funnels; crash-free ≥99.5% gate.
- **Clinical QA:** physio reviews recorded voice cues and translated cue text.

## Deployment plan

- **CI/CD:** GitHub Actions — PR: analyze+test; main: build+deploy Functions/
  rules/admin to staging; tags: Fastlane → Play internal / TestFlight;
  promotion to production is a manual approval.
- **Play Store:** app signing by Google, data-safety form (health data = not
  shared, encrypted, deletable), Health apps declaration, staged rollout,
  pre-launch report on 15+ devices.
- **App Store:** privacy nutrition labels, sensitive-content note (wellness,
  non-explicit), IAP review notes with demo account, phased release.
- **Ops:** Crashlytics alerts → Slack/email; RevenueCat webhook failure alarms;
  Firestore backup schedule; versioned `programTemplates` rollback path;
  kill-switch Remote Config flag for the AI coach.
