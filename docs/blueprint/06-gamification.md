# 06 · Gamification Strategy

Goal: make daily 3–8 minute practice feel rewarding, not clinical — while staying
inside the calm, restrained design language (no casino effects, no shame mechanics).

## Core loop

**Reminder → 1-tap session → immediate reward (XP + streak + score tick) →
tomorrow's hook ("Level 3 unlocks in 2 sessions").**

## Systems

| System | Design | Notes |
|---|---|---|
| **Streaks** | Consecutive days with ≥1 session. Flame chip on Today screen. | Premium: 1 streak-freeze earned per 7-day streak (max 2 banked) — protects retention without cheapening the streak. Free tier: streak counts but no freezes. |
| **XP & Levels** | XP per completed session (base 10 + 1/min + bonuses for consistency). Levels 1–50 on a gentle curve; level-ups unlock cosmetic ring styles, never exercises (exercise unlocks follow the *protocol*, not XP). | Keeps game layer from distorting the clinical progression. |
| **Badges** | ~25 at launch: First Session, 7/30/100-day streaks, Stage completions, Early Bird / Night Owl, Comeback (returned after 7+ days — celebrate returns, never guilt), Polyglot (used voice guidance in 2 languages), Certificate badges. | Brass line-art medallions (doc 04). |
| **Weekly goal** | User-set sessions/week (default 5). Ring on Today screen; weekly summary notification on completion. | Realistic default beats 7/7 perfectionism (adherence evidence). |
| **Monthly challenges** | One opt-in challenge/month (e.g., "Steady October: 20 sessions"). Completion = exclusive badge. Server-configured via admin panel. | Content-light, ops-light. |
| **Milestones & celebrations** | Stage completion = full-screen moment: restrained brass shimmer, haptic, share-free by default (discretion). Program completion = downloadable **certificate** (PDF, user's name, localized). | |
| **Control Score** | The visible "am I improving?" number (doc 05). Weekly trend chart is the emotional payoff. | Always "estimated". |
| **Daily check-in** | Post-session 1-tap: difficulty (too easy / right / too hard) + optional mood. Feeds auto-adaptation and gives users a sense of being listened to. | |
| **Leaderboard** | **Deferred post-v1**, opt-in, anonymous handles only, weekly XP not health data. This category is privacy-sensitive; competition can misfire. | Optional per brief. |

## Motivational messaging

- Rotating post-session lines, localized, honest tone ("Consistency builds
  control — 4 weeks in is where most people feel it").
- Never shame ("You failed your streak" ❌ → "Pick up where you left off" ✅).
- Notification categories individually mutable (doc 02 §notifications).

## Retention levers by moment

| Moment | Lever |
|---|---|
| Day 0 | First session within 3 min; instant first badge |
| Day 1–7 | Streak formation + daily reminder at user-chosen time |
| Day 8–14 | Week-2 upgrade offer; first stage completion |
| Miss 1 day | Same-evening gentle nudge |
| Miss 3+ days | Comeback message + easier restart session (protocol regression) |
| Day 30 | Monthly progress report + certificate milestone |

## Anti-patterns explicitly avoided

Pay-to-win streaks, loss-aversion spam, fake urgency timers on the paywall,
public sharing defaults, XP-gated *exercises* (health progression is
protocol-gated only).
