# Kegel Coach — Kegel Trainer: Pelvic Floor Exercises

A fast, private, offline-first kegel exercise trainer (PWA), with a clean
Zerodha-Kite-inspired UI. Live at **https://madhusudhansoniiii.github.io**.

- Guided squeeze/relax sessions with animation, sound and vibration cues
- 4 workouts: Beginner, Classic, Endurance, Quick flicks
- Daily goal ring, day streaks, 7-day chart, session history
- Light/dark theme, installable, works fully offline
- No accounts, no tracking — all data stays in `localStorage`

## Stack

Plain HTML/CSS/JS, no build step, no dependencies. Deployed via GitHub Pages.

| File | Purpose |
|---|---|
| `index.html` | App shell: Home, Progress, Guide, Settings + session overlay |
| `styles.css` | Kite-style theme (light + dark) |
| `app.js` | Session engine, stats, storage |
| `sw.js` | Cache-first service worker (offline) |
| `manifest.webmanifest` | PWA manifest (name, icons, standalone display) |
| `.well-known/assetlinks.json` | Digital Asset Links for the Android TWA |

## Publishing to Google Play (TWA)

The app ships to Play as a Trusted Web Activity using
[Bubblewrap](https://github.com/GoogleChromeLabs/bubblewrap):

```bash
npm i -g @bubblewrap/cli
bubblewrap init --manifest https://madhusudhansoniiii.github.io/manifest.webmanifest
# suggested applicationId: me.mssoni.kegelcoach
bubblewrap build          # produces app-release-bundle.aab
```

1. Upload the `.aab` to Play Console (use **Play App Signing**).
2. In Play Console → Setup → App signing, copy the **SHA-256 certificate
   fingerprint** and paste it into `.well-known/assetlinks.json`
   (replacing the placeholder), then push. Until this matches, the TWA
   shows a browser URL bar.
3. Health apps: complete the **Health apps declaration** in App content.

### ASO (store listing)

- **Title (≤30 chars):** `Kegel Trainer: Pelvic Floor` — leads with the
  two highest-volume keywords.
- **Short description (≤80):** `Kegel exercises for men & women. Daily
  pelvic floor workouts, streaks & timer.`
- **Keywords to work into the full description naturally:** kegel
  exercises, pelvic floor exercises, kegel trainer, bladder control,
  kegel timer, pelvic floor strengthening, kegel workout for men /
  for women, pelvic floor physiotherapy.
- Category: **Health & Fitness**. Add 4–8 phone screenshots (capture the
  Home ring, session screen, progress chart, dark mode).

## Develop locally

```bash
python3 -m http.server 8080   # then open http://localhost:8080
```
