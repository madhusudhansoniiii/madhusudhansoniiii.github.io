# Kegel App — Pre-Development Blueprint

Complete planning package for a production-ready Kegel / pelvic-floor training app
(Android & iOS), covering every deliverable requested before development begins.

## Documents

| # | Document | Covers |
|---|---|---|
| 01 | [Market Research](01-market-research.md) | Competitor analysis, pricing, gamification & onboarding insights |
| 02 | [Features & Flows](02-features-and-flows.md) | Complete feature list (free vs premium), user flows, information architecture |
| 03 | [Wireframes](wireframes.html) | Lo-fi wireframes for all key screens (open via GitHub Pages) |
| 04 | [Design System](04-design-system.md) | Tokens, typography, components, accessibility, motion |
| 05 | [Training Protocol](05-training-protocol.md) | Progressive program, personalization matrix, safety rules, evidence grades |
| 06 | [Gamification](06-gamification.md) | XP, streaks, badges, levels, challenges, retention loops |
| 07 | [Technical Architecture](07-architecture.md) | Stack, system diagram, database schema, API architecture, security |
| 08 | [Subscriptions & Payments](08-subscriptions-payments.md) | Plans, store billing, RevenueCat, subscription flows |
| 09 | [Localization](09-localization.md) | 12-language strategy: fonts, voice guidance, translation workflow |
| 10 | [Admin Panel](10-admin-panel.md) | Admin dashboard modules and permissions |
| 11 | [Roadmap & Delivery](11-roadmap.md) | Development roadmap, timeline, testing strategy, deployment plan |
| 12 | [What We Need From You](12-what-we-need-from-you.md) | Every input required to start building |

## Input reconciliation (read first)

This blueprint reconciles **two briefs**:

1. **The product brief** (chat request): a multi-language Indian-market Kegel app for
   all genders, freemium with ₹999/month and ₹2,999 lifetime plans, gamification,
   admin panel, education, notifications.
2. **The Alpha Man master implementation prompt** (uploaded file): an Android-first,
   men-only pelvic-floor training app with a warm-dark brass design system,
   evidence-driven protocol, Flutter + Firebase stack, RevenueCat billing.

**Resolution:** the product brief is treated as the primary product definition
(broader audience, India-first, multi-language). The Alpha Man prompt supplies the
design language (§Design System), the guided-session engine model, the
personalization-matrix approach, the honest-framing guardrails, and the tech stack —
all of which are compatible with the broader brief.

**Conflicts resolved:**

| Topic | Product brief | Alpha Man prompt | Decision |
|---|---|---|---|
| Audience | Men + women, all goals | Men only | Both genders; onboarding branches by gender |
| Payments | UPI / cards / net-banking / wallets | RevenueCat + Google Play Billing, "not Razorpay" | Store billing (Play Billing / App Store IAP) via RevenueCat — **mandatory** for in-app digital subscriptions per store policy; UPI/cards/net-banking are payment *methods inside* Google Play & App Store checkout in India, so users still pay by UPI. See doc 08. |
| Languages | 12+ Indian languages | Not addressed | 12 languages, phased rollout (doc 09) |
| Design | "clean, modern, minimal" | Warm-dark brass, Kite-style restraint | Alpha Man aesthetic adopted as the design system (doc 04) |

**Missing inputs:** the Alpha Man prompt instructs building from *two deep-research
reports* and an *`AlphaMan.jsx` prototype* — **none of these were provided**. Per the
prompt's own rule ("do not invent parameters"), protocol parameters in doc 05 are
drawn from published public evidence (NICE guideline NG123, Cochrane reviews, RCTs)
with evidence grades, and every parameter is flagged for physiotherapist sign-off in
the `NEEDS PHYSIO REVIEW` checklist. The **Kegel Coach PWA** already deployed in this
repository serves as the interim working prototype for flow and session mechanics.

## Positioning guardrails (non-negotiable)

- The app is **fitness/wellness, never medical**. No diagnosis, no cure claims.
- Progress scores are *designed training indices*, shown as estimates — never
  promised outcomes ("+X seconds").
- 18+ age gate.
- Sexual-health data is sensitive: minimize collection, encrypt, allow in-app delete.
- Pelvic pain, pregnancy, and post-surgical users are routed to a conservative
  relaxation-first track and prompted to consult a pelvic-floor physiotherapist.
- All exercise content must be signed off by a licensed pelvic-floor
  physiotherapist before launch.
