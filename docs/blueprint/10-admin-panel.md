# 10 · Admin Panel

Separate web app (Firebase Hosting; Next.js or Flutter Web) authenticated via
Firebase Auth with custom-claim roles. Never bundled in the mobile app.

## Roles

| Role | Access |
|---|---|
| **Owner** | Everything incl. admin-user management, refunds liaison, data-deletion approvals |
| **Editor** | Content, programs, challenges, notifications, languages |
| **Support** | User lookup (minimal view), subscription status, comp entitlements |

## Modules

1. **Dashboard** — DAU/WAU/MAU, new users, sessions today, trial starts,
   conversions, churn, crash-free rate (Firebase Analytics + RevenueCat data).
2. **Users** — search by uid/phone/email; view: tier, language, stage, streak,
   last active. *Health-adjacent onboarding answers are NOT visible* (privacy by
   design). Actions: comp premium, reset streak (support fix), trigger
   password/OTP help, delete account (owner-approved, runs full-erasure function).
3. **Subscriptions & payments** — RevenueCat-sourced: active subs, trials,
   renewals, refunds, failed payments; grant/revoke promotional entitlements;
   links into Play Console / App Store Connect for money-side operations.
4. **Programs** — edit `programTemplates` (hold/rest/reps per stage), versioned
   with rollback; changes gated behind a "physio-approved" checkbox + approver
   name; published templates apply to new plan generations only.
5. **Content** — CRUD articles/videos/FAQs, per-locale editor with coverage
   indicators, draft/publish states, premium/free flag.
6. **Challenges** — create monthly challenges (name, target, badge, window).
7. **Notifications** — compose campaigns (localized variants required before
   send), audience filters (tier/language/inactivity), schedule; per-category
   caps to prevent spam; test-send to self.
8. **Languages** — coverage matrix (strings/content/voice per locale),
   missing-translation flag queue.
9. **Reports** — funnel (install→onboard→trial→paid), retention cohorts,
   consistency distributions, exportable CSV; revenue summaries.
10. **Audit log** — every admin action recorded (who/what/when), owner-visible.

## Build note

v1 can ship with modules 1–4 + 7 only; 5–6 and 8–10 land with the v1.1 content
push. Resist building a CMS before there's content volume to manage.
