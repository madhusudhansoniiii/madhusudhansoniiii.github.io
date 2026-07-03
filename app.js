/* Kegel Coach — simple, private, offline-first kegel trainer */
(function () {
  "use strict";

  // ---------- Programs ----------
  var PROGRAMS = {
    beginner:  { name: "Beginner",     reps: 10, squeeze: 3,  rest: 3,  badge: "START HERE" },
    classic:   { name: "Classic",      reps: 10, squeeze: 5,  rest: 5,  badge: "" },
    endurance: { name: "Endurance",    reps: 6,  squeeze: 10, rest: 10, badge: "" },
    quick:     { name: "Quick flicks", reps: 20, squeeze: 1,  rest: 2,  badge: "" }
  };

  // ---------- State ----------
  var KEY = "kegelcoach.v1";
  var state = load();

  function load() {
    var def = { goal: 3, sound: true, vibrate: true, theme: "auto", history: [] };
    try {
      var raw = localStorage.getItem(KEY);
      if (!raw) return def;
      var s = JSON.parse(raw);
      for (var k in def) if (!(k in s)) s[k] = def[k];
      return s;
    } catch (e) { return def; }
  }
  function save() { try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) {} }

  function todayKey(offset) {
    var d = new Date();
    if (offset) d.setDate(d.getDate() + offset);
    return d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate());
  }
  function pad(n) { return (n < 10 ? "0" : "") + n; }

  function sessionsOn(dayKey) {
    return state.history.filter(function (h) { return h.d === dayKey; });
  }

  function streak(endToday) {
    // count consecutive days with >=1 session, ending today (or yesterday if today empty)
    var n = 0, offset = 0;
    if (!sessionsOn(todayKey(0)).length) {
      if (endToday) return 0;
      offset = -1;
    }
    while (sessionsOn(todayKey(offset - n)).length) n++;
    return n;
  }

  function bestStreak() {
    if (!state.history.length) return 0;
    var days = {};
    state.history.forEach(function (h) { days[h.d] = 1; });
    var keys = Object.keys(days).sort();
    var best = 1, cur = 1;
    for (var i = 1; i < keys.length; i++) {
      var prev = new Date(keys[i - 1]), curD = new Date(keys[i]);
      if ((curD - prev) / 86400000 === 1) { cur++; if (cur > best) best = cur; }
      else cur = 1;
    }
    return best;
  }

  function fmtMins(sec) {
    if (sec < 60) return sec + "s";
    var m = Math.round(sec / 60);
    return m + "m";
  }

  // ---------- DOM helpers ----------
  function $(id) { return document.getElementById(id); }
  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text != null) e.textContent = text;
    return e;
  }

  // ---------- Theme ----------
  function applyTheme() {
    document.documentElement.setAttribute("data-theme", state.theme);
    var segBtns = $("theme-seg").querySelectorAll("button");
    segBtns.forEach(function (b) { b.classList.toggle("active", b.dataset.theme === state.theme); });
  }

  // ---------- Navigation ----------
  var VIEWS = ["home", "stats", "learn", "settings"];
  function nav(name) {
    VIEWS.forEach(function (v) { $("view-" + v).hidden = v !== name; });
    document.querySelectorAll(".tab").forEach(function (t) {
      t.classList.toggle("active", t.dataset.nav === name);
    });
    window.scrollTo(0, 0);
    if (name === "home") renderHome();
    if (name === "stats") renderStats();
  }
  document.querySelectorAll("[data-nav]").forEach(function (b) {
    b.addEventListener("click", function () { nav(b.dataset.nav); });
  });

  // ---------- Home ----------
  function renderHome() {
    var d = new Date();
    $("home-date").textContent = d.toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" });

    var today = sessionsOn(todayKey(0));
    var done = today.length, goal = state.goal;
    $("ring-count").textContent = done + "/" + goal;
    var frac = Math.min(1, goal ? done / goal : 0);
    var C = 2 * Math.PI * 52;
    $("ring-fill").style.strokeDashoffset = String(C * (1 - frac));
    $("ring-fill").style.stroke = frac >= 1 ? "var(--green)" : "var(--blue)";

    $("chip-streak").textContent = String(streak(false));
    var secToday = today.reduce(function (a, h) { return a + h.s; }, 0);
    $("chip-mins").textContent = fmtMins(secToday);
  }

  function renderPrograms() {
    var list = $("program-list");
    list.textContent = "";
    Object.keys(PROGRAMS).forEach(function (id) {
      var p = PROGRAMS[id];
      var row = el("button", "row row-link");
      var main = el("div", "row-main");
      main.appendChild(el("div", "row-title", p.name));
      main.appendChild(el("div", "row-sub",
        p.reps + " reps · " + p.squeeze + "s squeeze · " + p.rest + "s rest · ~" +
        fmtMins(p.reps * (p.squeeze + p.rest))));
      row.appendChild(main);
      if (p.badge) row.appendChild(el("span", "row-badge", p.badge));
      var chev = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      chev.setAttribute("viewBox", "0 0 24 24");
      chev.setAttribute("class", "chev");
      chev.innerHTML = '<path d="M9 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>';
      row.appendChild(chev);
      row.addEventListener("click", function () { startSession(id); });
      list.appendChild(row);
    });
  }

  // ---------- Stats ----------
  function renderStats() {
    $("stat-streak").textContent = String(streak(false));
    $("stat-best").textContent = String(bestStreak());
    $("stat-sessions").textContent = String(state.history.length);
    var total = state.history.reduce(function (a, h) { return a + h.s; }, 0);
    $("stat-time").textContent = fmtMins(total);

    // 7-day chart
    var chart = $("chart-week");
    chart.textContent = "";
    var max = 1;
    var days = [];
    for (var i = 6; i >= 0; i--) {
      var key = todayKey(-i);
      var count = sessionsOn(key).length;
      if (count > max) max = count;
      days.push({ key: key, count: count, off: i });
    }
    days.forEach(function (day) {
      var col = el("div", "col" + (day.off === 0 ? " today" : ""));
      var bar = el("div", "bar" + (day.count === 0 ? " zero" : ""));
      bar.style.height = day.count === 0 ? "2px" : Math.round((day.count / max) * 100) + "%";
      bar.title = day.count + " session" + (day.count === 1 ? "" : "s");
      var d = new Date(day.key + "T12:00:00");
      col.appendChild(bar);
      col.appendChild(el("div", "day", d.toLocaleDateString(undefined, { weekday: "narrow" })));
      chart.appendChild(col);
    });

    // history
    var list = $("history-list");
    list.textContent = "";
    var recent = state.history.slice(-20).reverse();
    $("history-empty").hidden = recent.length > 0;
    recent.forEach(function (h) {
      var row = el("div", "row");
      var main = el("div", "row-main");
      var p = PROGRAMS[h.p];
      main.appendChild(el("div", "row-title", p ? p.name : "Workout"));
      var d = new Date(h.d + "T12:00:00");
      main.appendChild(el("div", "row-sub",
        d.toLocaleDateString(undefined, { month: "short", day: "numeric" }) + " · " + fmtMins(h.s)));
      row.appendChild(main);
      list.appendChild(row);
    });
  }

  // ---------- Settings ----------
  function renderSettings() {
    $("goal-val").textContent = String(state.goal);
    $("goal-sub").textContent = state.goal + " session" + (state.goal === 1 ? "" : "s") + " a day";
    $("opt-sound").checked = state.sound;
    $("opt-vibrate").checked = state.vibrate;
    applyTheme();
  }
  $("goal-minus").addEventListener("click", function () {
    if (state.goal > 1) { state.goal--; save(); renderSettings(); }
  });
  $("goal-plus").addEventListener("click", function () {
    if (state.goal < 10) { state.goal++; save(); renderSettings(); }
  });
  $("opt-sound").addEventListener("change", function (e) { state.sound = e.target.checked; save(); });
  $("opt-vibrate").addEventListener("change", function (e) { state.vibrate = e.target.checked; save(); });
  $("theme-seg").addEventListener("click", function (e) {
    var b = e.target.closest("button");
    if (!b) return;
    state.theme = b.dataset.theme;
    save(); applyTheme();
  });
  $("btn-reset").addEventListener("click", function () {
    if (confirm("Delete all history and settings? This cannot be undone.")) {
      localStorage.removeItem(KEY);
      state = load();
      renderSettings(); renderHome();
      nav("home");
    }
  });

  // ---------- Audio & haptics ----------
  var audioCtx = null;
  function beep(freq, ms) {
    if (!state.sound) return;
    try {
      if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      if (audioCtx.state === "suspended") audioCtx.resume();
      var o = audioCtx.createOscillator(), g = audioCtx.createGain();
      o.type = "sine"; o.frequency.value = freq;
      g.gain.setValueAtTime(0.001, audioCtx.currentTime);
      g.gain.exponentialRampToValueAtTime(0.25, audioCtx.currentTime + 0.02);
      g.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + ms / 1000);
      o.connect(g); g.connect(audioCtx.destination);
      o.start(); o.stop(audioCtx.currentTime + ms / 1000 + 0.05);
    } catch (e) {}
  }
  function buzz(pattern) {
    if (state.vibrate && navigator.vibrate) { try { navigator.vibrate(pattern); } catch (e) {} }
  }

  // ---------- Session engine ----------
  var session = null; // {programId, rep, phase, remaining, timer, startedAt, paused}

  function startSession(programId) {
    var p = PROGRAMS[programId];
    session = {
      programId: programId, p: p,
      rep: 0, phase: "ready", remaining: 3,
      elapsed: 0, paused: false, timer: null
    };
    $("session-name").textContent = p.name;
    $("btn-pause").textContent = "Pause";
    $("session").hidden = false;
    document.body.style.overflow = "hidden";
    renderPhase();
    tickStart();
  }

  function totalSeconds() {
    var p = session.p;
    return 3 + p.reps * (p.squeeze + p.rest);
  }

  function tickStart() {
    clearInterval(session.timer);
    session.timer = setInterval(tick, 1000);
  }

  function tick() {
    if (!session || session.paused) return;
    session.remaining--;
    session.elapsed++;
    if (session.remaining <= 0) nextPhase();
    else renderCounts();
  }

  function nextPhase() {
    var p = session.p;
    if (session.phase === "ready" || session.phase === "rest") {
      // start a squeeze
      session.rep++;
      if (session.rep > p.reps) { finish(); return; }
      session.phase = "squeeze";
      session.remaining = p.squeeze;
      beep(880, 180); buzz(60);
    } else {
      // squeeze done
      if (session.rep >= p.reps) { finish(); return; }
      session.phase = "rest";
      session.remaining = p.rest;
      beep(440, 180); buzz([40, 60, 40]);
    }
    renderPhase();
  }

  function renderPhase() {
    var s = session, root = $("session");
    root.classList.toggle("resting", s.phase !== "squeeze");
    var label = s.phase === "squeeze" ? "SQUEEZE" : (s.phase === "rest" ? "RELAX" : "GET READY");
    var hint = s.phase === "squeeze" ? "Lift and hold — keep breathing"
             : s.phase === "rest" ? "Release completely"
             : "Relax and breathe";
    $("phase-label").textContent = label;
    $("phase-hint").textContent = hint;

    var pulse = $("pulse");
    pulse.style.setProperty("--dur", s.remaining + "s");
    pulse.classList.remove("grow", "shrink");
    void pulse.offsetWidth; // restart transition
    pulse.classList.add(s.phase === "squeeze" ? "grow" : "shrink");

    renderCounts();
  }

  function renderCounts() {
    var s = session;
    $("phase-count").textContent = String(Math.max(0, s.remaining));
    $("session-rep").textContent = s.phase === "ready" ? "" : "Rep " + s.rep + "/" + s.p.reps;
    $("session-bar").style.width = Math.min(100, (s.elapsed / totalSeconds()) * 100) + "%";
  }

  function stopSession() {
    if (session) { clearInterval(session.timer); session = null; }
    $("session").hidden = true;
    document.body.style.overflow = "";
  }

  function finish() {
    var seconds = session.elapsed;
    var programId = session.programId;
    clearInterval(session.timer);
    session = null;
    $("session").hidden = true;

    state.history.push({ d: todayKey(0), p: programId, s: seconds });
    save();

    var doneToday = sessionsOn(todayKey(0)).length;
    $("done-sub").textContent = fmtMins(seconds) + " of exercise · " + doneToday + "/" + state.goal + " sessions today";
    var st = streak(true);
    $("done-streak").textContent = doneToday >= state.goal
      ? "Daily goal reached! " + (st > 1 ? st + " day streak 🔥" : "")
      : (st > 1 ? st + " day streak 🔥" : "");
    beep(660, 120); setTimeout(function () { beep(880, 200); }, 150);
    buzz([80, 60, 80]);
    $("done").hidden = false;
  }

  $("btn-pause").addEventListener("click", function () {
    if (!session) return;
    session.paused = !session.paused;
    this.textContent = session.paused ? "Resume" : "Pause";
    var pulse = $("pulse");
    if (session.paused) {
      // freeze the pulse where it is
      var scale = getComputedStyle(pulse).transform;
      pulse.classList.remove("grow", "shrink");
      pulse.style.transform = scale === "none" ? "" : scale;
    } else {
      pulse.style.transform = "";
      pulse.style.setProperty("--dur", session.remaining + "s");
      void pulse.offsetWidth;
      pulse.classList.add(session.phase === "squeeze" ? "grow" : "shrink");
    }
  });

  $("session-close").addEventListener("click", function () {
    stopSession();
    renderHome();
  });

  $("btn-done").addEventListener("click", function () {
    $("done").hidden = true;
    document.body.style.overflow = "";
    renderHome();
    nav("home");
  });

  // ---------- Service worker ----------
  if ("serviceWorker" in navigator && location.protocol === "https:") {
    window.addEventListener("load", function () {
      navigator.serviceWorker.register("sw.js").catch(function () {});
    });
  }

  // ---------- Init ----------
  applyTheme();
  renderPrograms();
  renderSettings();
  renderHome();
})();
