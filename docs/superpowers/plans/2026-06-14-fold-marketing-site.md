# Fold Marketing Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a 4-page, quiet-luxury magazine-style static marketing site for the Fold wardrobe app and prepare it for GitHub Pages deployment at `datnntqn/fold`.

**Architecture:** Hand-written static HTML + one shared CSS file + one shared vanilla-JS file. No build step, no framework, no external runtime dependencies. Header/footer markup is duplicated byte-for-byte across the four HTML pages. Fonts (Jost) and all images are self-hosted with **relative** paths so the site works under the `/fold/` GitHub Pages sub-path.

**Tech Stack:** HTML5, CSS (custom properties, grid/flex, IntersectionObserver-driven reveal classes), vanilla JS, self-hosted Jost `.ttf`, inline SVG logo.

**Spec:** `docs/superpowers/specs/2026-06-14-fold-marketing-site-design.md`

**Source repo for assets:** the app repo at `/Users/datnnt/App/Wardrobe/smartwardrobe` (fonts in `fonts/`, images in `design-assets/`, logo SVGs in `design-assets/app-icon/`).

**Working directory for all output:** `/Users/datnnt/App/Wardrobe/fold` (referred to below as the repo root).

**Verification approach:** No unit-test framework — this is a static content site. Each task is verified by (a) serving the folder with `python3 -m http.server 8000` from the repo root and opening the page in a browser, and (b) a concrete visual checklist. "Expected" describes exactly what must be visible/true.

---

## File structure (created by this plan)

```
fold/
  .nojekyll
  .gitignore
  index.html
  privacy.html
  terms.html
  support.html
  assets/
    css/site.css
    js/site.js
    fonts/Jost-Light.ttf  Jost-Regular.ttf  Jost-Medium.ttf
    img/
      logo/fold-mark.svg
      logo/favicon.svg
      closet/  (transparent garment cut-outs, .png)
      looks/   (look photos, .png)
```

---

## Task 0: Repo scaffold, fonts, images, logo

**Files:**
- Create: `.nojekyll`, `.gitignore`
- Create dirs: `assets/css`, `assets/js`, `assets/fonts`, `assets/img/logo`, `assets/img/closet`, `assets/img/looks`
- Copy: fonts + images + logo from the app repo

- [ ] **Step 1: Create directories**

```bash
cd /Users/datnnt/App/Wardrobe/fold
mkdir -p assets/css assets/js assets/fonts assets/img/logo assets/img/closet assets/img/looks
```

- [ ] **Step 2: Create `.nojekyll`** (empty file; stops GitHub Pages from running Jekyll and lets dotfiles/underscored paths through)

```bash
touch /Users/datnnt/App/Wardrobe/fold/.nojekyll
```

- [ ] **Step 3: Create `.gitignore`**

File `/Users/datnnt/App/Wardrobe/fold/.gitignore`:

```
.DS_Store
.superpowers/
*.log
```

- [ ] **Step 4: Copy the three Jost fonts**

```bash
cd /Users/datnnt/App/Wardrobe
cp smartwardrobe/fonts/Jost-Light.ttf   fold/assets/fonts/
cp smartwardrobe/fonts/Jost-Regular.ttf fold/assets/fonts/
cp smartwardrobe/fonts/Jost-Medium.ttf  fold/assets/fonts/
```

- [ ] **Step 5: Copy garment cut-outs into `closet/` and look photos into `looks/`** (all are model-supported types; no jewelry)

```bash
cd /Users/datnnt/App/Wardrobe
cp smartwardrobe/design-assets/item-top.png          fold/assets/img/closet/top.png
cp smartwardrobe/design-assets/item-jeans.png        fold/assets/img/closet/jeans.png
cp smartwardrobe/design-assets/item-dress-white.png  fold/assets/img/closet/dress-white.png
cp smartwardrobe/design-assets/item-dress-yellow.png fold/assets/img/closet/dress-yellow.png
cp smartwardrobe/design-assets/item-shoe.png         fold/assets/img/closet/shoe.png
cp smartwardrobe/design-assets/item-bag.png          fold/assets/img/closet/bag.png
cp smartwardrobe/design-assets/item-hat.png          fold/assets/img/closet/hat.png
cp smartwardrobe/design-assets/look-street.png       fold/assets/img/looks/street.png
cp smartwardrobe/design-assets/look-dress-white.png  fold/assets/img/looks/dress-white.png
cp smartwardrobe/design-assets/look-dress-yellow.png fold/assets/img/looks/dress-yellow.png
```

- [ ] **Step 6: Create the inline logo mark** `assets/img/logo/fold-mark.svg` (hang-tag "F", tag-only, transparent background so it sits on the bone page)

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" role="img" aria-label="Fold">
  <path d="M36,24 H66 a8,8 0 0 1 8,8 V72 a8,8 0 0 1 -8,8 H34 a8,8 0 0 1 -8,-8 V40 Z" fill="#2C2925"/>
  <circle cx="33" cy="36" r="4" fill="#F4F1EC"/>
  <path d="M33,36 q-7,-6 -11,-14" stroke="#2C2925" stroke-width="2.6" fill="none" stroke-linecap="round"/>
  <rect x="40" y="42" width="9"  height="30" rx="2.5" fill="#F4F1EC"/>
  <rect x="40" y="42" width="20" height="9"  rx="2.5" fill="#F4F1EC"/>
  <rect x="40" y="54" width="15" height="8"  rx="2.5" fill="#F4F1EC"/>
</svg>
```

- [ ] **Step 7: Create the favicon** `assets/img/logo/favicon.svg` (same mark but with the bone rounded background so it reads as an app icon in a browser tab)

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <rect width="100" height="100" rx="22" fill="#F1ECE4"/>
  <path d="M36,24 H66 a8,8 0 0 1 8,8 V72 a8,8 0 0 1 -8,8 H34 a8,8 0 0 1 -8,-8 V40 Z" fill="#2C2925"/>
  <circle cx="33" cy="36" r="4" fill="#F1ECE4"/>
  <path d="M33,36 q-7,-6 -11,-14" stroke="#2C2925" stroke-width="2.6" fill="none" stroke-linecap="round"/>
  <rect x="40" y="42" width="9"  height="30" rx="2.5" fill="#F1ECE4"/>
  <rect x="40" y="42" width="20" height="9"  rx="2.5" fill="#F1ECE4"/>
  <rect x="40" y="54" width="15" height="8"  rx="2.5" fill="#F1ECE4"/>
</svg>
```

- [ ] **Step 8: Verify scaffold**

Run:
```bash
cd /Users/datnnt/App/Wardrobe/fold && find . -type f -not -path './.git/*' -not -path './docs/*' | sort
```
Expected: lists `.gitignore`, `.nojekyll`, 3 `.ttf` files under `assets/fonts/`, 7 `.png` under `assets/img/closet/`, 3 `.png` under `assets/img/looks/`, and `fold-mark.svg` + `favicon.svg` under `assets/img/logo/`.

- [ ] **Step 9: Commit**

```bash
cd /Users/datnnt/App/Wardrobe/fold
git add -A
git commit -m "chore: scaffold fold marketing site (fonts, images, logo)"
```

---

## Task 1: Shared stylesheet — tokens, base, type, layout primitives

**Files:**
- Create: `assets/css/site.css`

- [ ] **Step 1: Write `assets/css/site.css` in full**

```css
/* ===== Fonts ===== */
@font-face { font-family:"Jost"; src:url("../fonts/Jost-Light.ttf") format("truetype");   font-weight:300; font-display:swap; }
@font-face { font-family:"Jost"; src:url("../fonts/Jost-Regular.ttf") format("truetype"); font-weight:400; font-display:swap; }
@font-face { font-family:"Jost"; src:url("../fonts/Jost-Medium.ttf") format("truetype");  font-weight:500; font-display:swap; }

/* ===== Tokens ===== */
:root{
  --bg:#F4F1EC; --card:#FBFAF7; --ink:#1A1A18; --muted:#8A8174; --faint:#B6AFA2; --hair:#E2DDD3; --tag:#2C2925;
  --r-sm:7px; --r-md:14px; --maxw:1100px;
  --ease:cubic-bezier(.2,.65,.2,1);
}
*{ box-sizing:border-box; }
html{ scroll-behavior:smooth; }
body{
  margin:0; background:var(--bg); color:var(--ink);
  font-family:"Jost",-apple-system,system-ui,sans-serif; font-weight:400;
  -webkit-font-smoothing:antialiased; line-height:1.6;
}
img{ max-width:100%; display:block; }
a{ color:inherit; text-decoration:none; }

.wrap{ max-width:var(--maxw); margin:0 auto; padding:0 28px; }
.eyebrow{ font-size:11px; letter-spacing:.28em; text-transform:uppercase; color:var(--muted); }
.roman{ font-size:11px; letter-spacing:.3em; text-transform:uppercase; color:var(--faint); }
h1,h2,h3{ font-weight:300; letter-spacing:.01em; margin:0; }
h2.title{ font-size:clamp(26px,4vw,40px); line-height:1.1; margin:12px 0 16px; }
p.lead{ font-size:clamp(16px,2.2vw,20px); font-weight:300; line-height:1.6; color:#33302b; }
p.body{ font-size:15px; line-height:1.75; color:#4a463f; max-width:46ch; }
.note{ font-size:13px; color:var(--muted); }
.section{ padding:clamp(48px,8vw,84px) 0; border-top:1px solid var(--hair); }

/* ===== Header ===== */
.site-head{
  position:sticky; top:0; z-index:20; background:rgba(244,241,236,.86);
  backdrop-filter:saturate(120%) blur(8px); border-bottom:1px solid var(--hair);
}
.site-head .wrap{ display:flex; align-items:center; justify-content:space-between; height:62px; }
.brand{ display:flex; align-items:center; gap:10px; }
.brand img{ width:24px; height:24px; }
.brand .word{ font-size:14px; letter-spacing:.4em; }
.nav{ display:flex; gap:26px; font-size:11px; letter-spacing:.18em; text-transform:uppercase; color:var(--muted); }
.nav a:hover{ color:var(--ink); }

/* ===== Footer ===== */
.site-foot{ text-align:center; padding:64px 0; border-top:1px solid var(--hair); }
.site-foot .word{ font-size:26px; letter-spacing:.42em; margin-bottom:16px; }
.site-foot .fnav{ font-size:11px; letter-spacing:.16em; text-transform:uppercase; color:var(--muted); }
.site-foot .fnav a:hover{ color:var(--ink); }
.site-foot .cop{ font-size:10px; letter-spacing:.12em; color:var(--faint); margin-top:14px; }

/* ===== Reveal animation ===== */
.rv{ opacity:0; transform:translateY(22px); transition:opacity 1.1s var(--ease), transform 1.1s var(--ease); }
.rv.in{ opacity:1; transform:none; }
.rv.d1{ transition-delay:.08s } .rv.d2{ transition-delay:.16s } .rv.d3{ transition-delay:.24s }
.rv.d4{ transition-delay:.32s } .rv.d5{ transition-delay:.40s } .rv.d6{ transition-delay:.48s }

@media (prefers-reduced-motion: reduce){
  html{ scroll-behavior:auto; }
  .rv{ opacity:1 !important; transform:none !important; transition:none !important; }
  *{ animation:none !important; }
}

/* ===== Responsive base ===== */
@media (max-width:720px){
  .wrap{ padding:0 20px; }
  .nav{ gap:16px; }
}
```

- [ ] **Step 2: Verify the file is valid CSS (no syntax errors)**

Run:
```bash
cd /Users/datnnt/App/Wardrobe/fold && node -e "const c=require('fs').readFileSync('assets/css/site.css','utf8'); const o=(c.match(/{/g)||[]).length, x=(c.match(/}/g)||[]).length; console.log('braces',o,x); process.exit(o===x?0:1)"
```
Expected: prints `braces N N` (equal counts) and exits 0. (If `node` is unavailable, skip — it is validated visually in later tasks.)

- [ ] **Step 3: Commit**

```bash
cd /Users/datnnt/App/Wardrobe/fold
git add assets/css/site.css
git commit -m "feat: shared stylesheet — tokens, header/footer, reveal base"
```

---

## Task 2: Shared JavaScript — reveal, masthead, parallax, lookbook

**Files:**
- Create: `assets/js/site.js`

- [ ] **Step 1: Write `assets/js/site.js` in full**

```js
(function () {
  "use strict";
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Scroll reveal
  var revealables = document.querySelectorAll(".rv");
  if (reduce || !("IntersectionObserver" in window)) {
    revealables.forEach(function (el) { el.classList.add("in"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      });
    }, { threshold: 0.18, rootMargin: "0px 0px -8% 0px" });
    revealables.forEach(function (el) { io.observe(el); });
  }

  // Masthead reveal (letter-spacing settle)
  var mast = document.getElementById("mast");
  if (mast) {
    if (reduce) { mast.classList.add("in"); }
    else { setTimeout(function () { mast.classList.add("in"); }, 180); }
  }

  // Subtle parallax on the hero look image
  var hero = document.getElementById("hero-photo");
  if (hero && !reduce) {
    window.addEventListener("scroll", function () {
      var top = hero.getBoundingClientRect().top;
      hero.style.transform = "translateY(" + (top * -0.04) + "px)";
    }, { passive: true });
  }
})();
```

- [ ] **Step 2: Verify the file parses as valid JS**

Run:
```bash
cd /Users/datnnt/App/Wardrobe/fold && node --check assets/js/site.js && echo "JS OK"
```
Expected: prints `JS OK`. (If `node` is unavailable, skip — validated visually later.)

- [ ] **Step 3: Commit**

```bash
cd /Users/datnnt/App/Wardrobe/fold
git add assets/js/site.js
git commit -m "feat: shared JS — scroll reveal, masthead, parallax"
```

---

## Task 3: Canonical header & footer snippets

These exact blocks are pasted into all four pages. Define them once here; later tasks reference "the canonical header/footer".

**CANONICAL HEADER** (paste immediately after `<body>`):

```html
<header class="site-head">
  <div class="wrap">
    <a class="brand" href="index.html">
      <img src="assets/img/logo/fold-mark.svg" alt="">
      <span class="word">FOLD</span>
    </a>
    <nav class="nav">
      <a href="index.html#closet">Closet</a>
      <a href="privacy.html">Privacy</a>
      <a href="support.html">Support</a>
    </nav>
  </div>
</header>
```

**CANONICAL FOOTER** (paste immediately before `<script>`):

```html
<footer class="site-foot">
  <div class="wrap">
    <div class="word">FOLD</div>
    <div class="fnav">
      <a href="index.html#closet">Closet</a> ·
      <a href="privacy.html">Privacy</a> ·
      <a href="terms.html">Terms</a> ·
      <a href="support.html">Support</a>
    </div>
    <div class="cop">On-device · © 2026 Fold</div>
  </div>
</footer>
```

**CANONICAL `<head>`** (every page uses this, swapping only `<title>` and the meta description):

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>__TITLE__</title>
  <meta name="description" content="__DESC__">
  <link rel="icon" type="image/svg+xml" href="assets/img/logo/favicon.svg">
  <link rel="stylesheet" href="assets/css/site.css">
</head>
```

**CANONICAL script include** (last line before `</body>`):

```html
<script src="assets/js/site.js"></script>
```

- [ ] **Step 1: No file is produced by this task** — it is the reference used by Tasks 4–9. Confirm the asset paths referenced above exist (from Task 0): `assets/img/logo/fold-mark.svg`, `assets/img/logo/favicon.svg`, `assets/css/site.css`, `assets/js/site.js`.

Run:
```bash
cd /Users/datnnt/App/Wardrobe/fold && ls assets/img/logo/fold-mark.svg assets/img/logo/favicon.svg assets/css/site.css assets/js/site.js
```
Expected: all four paths listed with no "No such file" error.

---

## Task 4: Homepage — hero (Cover B) markup & CSS

**Files:**
- Create: `index.html` (head + header + hero only for now; sections added in Task 5)
- Modify: `assets/css/site.css` (append hero styles)

- [ ] **Step 1: Append hero CSS to `assets/css/site.css`**

```css
/* ===== Hero (Cover B — composed collage) ===== */
.hero{ border-bottom:1px solid var(--hair); }
.hero .grid{ display:grid; grid-template-columns:0.95fr 1.15fr; min-height:min(82vh,720px); }
.hero .left{ padding:clamp(28px,4vw,52px); display:flex; flex-direction:column; border-right:1px solid var(--hair); }
.hero .ey{ display:flex; align-items:center; gap:9px; font-size:11px; letter-spacing:.34em; text-transform:uppercase; color:var(--muted); }
.hero .ey img{ width:18px; height:18px; }
.hero .mast{ font-size:clamp(56px,10vw,118px); font-weight:300; line-height:1; margin:18px 0 6px;
  letter-spacing:.5em; opacity:0; transition:opacity 1.6s ease, letter-spacing 1.8s var(--ease); }
.hero .mast.in{ opacity:1; letter-spacing:.1em; }
.hero .issue{ font-size:11px; letter-spacing:.3em; text-transform:uppercase; color:var(--muted); margin-bottom:26px; }
.hero .contents .item{ padding:14px 0; border-top:1px solid var(--hair); }
.hero .contents .n{ font-size:10px; letter-spacing:.2em; color:var(--faint); }
.hero .contents .h{ font-size:16px; color:var(--ink); margin:3px 0 2px; }
.hero .contents .d{ font-size:12px; color:#5b554c; }
.hero .strip{ margin-top:auto; padding-top:22px; display:flex; gap:10px; }
.hero .strip .cut{ flex:1; aspect-ratio:3/4; background:var(--card); border:1px solid var(--hair); border-radius:var(--r-sm);
  display:flex; align-items:center; justify-content:center; overflow:hidden; }
.hero .strip .cut img{ width:78%; height:78%; object-fit:contain; }
.hero .right{ position:relative; overflow:hidden; background:linear-gradient(150deg,#e7e0d2,#cfc6b6); }
.hero .right img{ position:absolute; inset:-4%; width:108%; height:108%; object-fit:cover; }
.hero .right .ovl{ position:absolute; left:24px; right:24px; bottom:22px; display:flex; align-items:flex-end; justify-content:space-between; }
.hero .right .headline{ font-size:clamp(28px,4.4vw,46px); font-weight:300; line-height:1.05; color:#fff; text-shadow:0 1px 30px rgba(0,0,0,.32); }
.hero .right .mark{ display:flex; flex-direction:column; align-items:flex-end; gap:6px; color:rgba(255,255,255,.9); font-size:10px; letter-spacing:.2em; text-transform:uppercase; }
.hero .right .barcode{ width:56px; height:26px; background:repeating-linear-gradient(90deg,#fff 0 1.5px, transparent 1.5px 3.5px); opacity:.85; }

@media (max-width:820px){
  .hero .grid{ grid-template-columns:1fr; }
  .hero .left{ border-right:none; border-top:1px solid var(--hair); order:2; }
  .hero .right{ order:1; min-height:60vh; }
}
```

- [ ] **Step 2: Create `index.html`** with the canonical `<head>`, canonical header, and the hero. (Sections + footer + script are added in Tasks 5–6; for now close the tags so the page is viewable.)

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Fold — The Considered Wardrobe</title>
  <meta name="description" content="Fold is a quiet place for everything you own. Photograph each piece, compose a look, and plan the week — all on your phone, nothing in the cloud.">
  <link rel="icon" type="image/svg+xml" href="assets/img/logo/favicon.svg">
  <link rel="stylesheet" href="assets/css/site.css">
</head>
<body>

<header class="site-head">
  <div class="wrap">
    <a class="brand" href="index.html">
      <img src="assets/img/logo/fold-mark.svg" alt="">
      <span class="word">FOLD</span>
    </a>
    <nav class="nav">
      <a href="index.html#closet">Closet</a>
      <a href="privacy.html">Privacy</a>
      <a href="support.html">Support</a>
    </nav>
  </div>
</header>

<section class="hero">
  <div class="grid">
    <div class="left">
      <div class="ey"><img src="assets/img/logo/fold-mark.svg" alt=""> Fold</div>
      <div class="mast" id="mast">FOLD</div>
      <div class="issue">Issue 01 · The Considered Wardrobe</div>
      <div class="contents">
        <a class="item" href="#closet"><div class="n">I</div><div class="h">The Closet</div><div class="d">Everything you own, lifted clean from its background.</div></a>
        <a class="item" href="#mix"><div class="n">II</div><div class="h">The Mix</div><div class="d">Six pieces become a single look.</div></a>
        <a class="item" href="#calendar"><div class="n">III</div><div class="h">The Calendar</div><div class="d">Dressed for the weather, a week ahead.</div></a>
      </div>
      <div class="strip">
        <div class="cut"><img src="assets/img/closet/top.png" alt="Top"></div>
        <div class="cut"><img src="assets/img/closet/jeans.png" alt="Trousers"></div>
        <div class="cut"><img src="assets/img/closet/shoe.png" alt="Shoes"></div>
      </div>
    </div>
    <div class="right">
      <img id="hero-photo" src="assets/img/looks/street.png" alt="A composed Fold look">
      <div class="ovl">
        <div class="headline">A Quieter<br>Wardrobe</div>
        <div class="mark"><span>No. 01</span><span class="barcode"></span></div>
      </div>
    </div>
  </div>
</section>

<script src="assets/js/site.js"></script>
</body>
</html>
```

- [ ] **Step 3: Serve and verify the hero**

Run:
```bash
cd /Users/datnnt/App/Wardrobe/fold && python3 -m http.server 8000
```
Open `http://localhost:8000/index.html`. Expected:
- Sticky header with hang-tag logo + `FOLD` wordmark + nav (Closet/Privacy/Support).
- Masthead `FOLD` fades in over ~1.6s and the letter-spacing tightens.
- Left column shows contents I/II/III with teasers and a strip of 3 garment cut-outs.
- Right column shows the `street.png` look filling the column, with white headline "A Quieter Wardrobe" lower-left and a barcode mark lower-right.
- Scrolling a little moves the hero photo slightly (parallax).
- Narrow the window below 820px: the photo stacks on top, the text column below.

Stop the server with Ctrl-C when done.

- [ ] **Step 4: Commit**

```bash
cd /Users/datnnt/App/Wardrobe/fold
git add assets/css/site.css index.html
git commit -m "feat: homepage hero (Cover B composed collage)"
```

---

## Task 5: Homepage — body sections (Standfirst → Index)

**Files:**
- Modify: `index.html` (insert sections between the hero `</section>` and the `<script>`)
- Modify: `assets/css/site.css` (append section styles)

- [ ] **Step 1: Append section CSS to `assets/css/site.css`**

```css
/* ===== Standfirst ===== */
.standfirst{ text-align:center; }
.standfirst .wrap{ max-width:760px; }
.standfirst p{ font-size:clamp(18px,2.6vw,23px); font-weight:300; line-height:1.6; color:#33302b; margin:0; }

/* ===== Closet grid ===== */
.closet-grid{ display:grid; grid-template-columns:repeat(4,1fr); gap:18px; margin-top:30px; }
.closet-grid .it{ text-align:center; }
.closet-grid .tile{ aspect-ratio:3/4; background:var(--card); border:1px solid var(--hair); border-radius:var(--r-md);
  display:flex; align-items:center; justify-content:center; overflow:hidden;
  transition:transform .7s var(--ease), box-shadow .7s var(--ease); }
.closet-grid .tile img{ width:74%; height:74%; object-fit:contain; }
.closet-grid .it:hover .tile{ transform:translateY(-6px); box-shadow:0 16px 34px -18px rgba(26,26,24,.4); }
.closet-grid .cap{ font-size:11px; letter-spacing:.13em; text-transform:uppercase; color:var(--muted); margin-top:10px; }
@media (max-width:720px){ .closet-grid{ grid-template-columns:repeat(2,1fr); } }

/* ===== Mix ===== */
.mix-grid{ display:grid; grid-template-columns:1fr 1fr; gap:42px; align-items:center; margin-top:24px; }
.mix-grid .look{ aspect-ratio:4/5; background:var(--card); border:1px solid var(--hair); border-radius:var(--r-md);
  display:flex; align-items:center; justify-content:center; overflow:hidden; }
.mix-grid .look img{ width:84%; height:84%; object-fit:contain; }
.mix-grid .pull{ font-size:clamp(19px,2.6vw,24px); font-weight:300; line-height:1.45; margin:0 0 16px; }
.chips{ margin-top:16px; }
.chip{ display:inline-block; font-size:11px; letter-spacing:.12em; text-transform:uppercase; color:var(--muted);
  border:1px solid var(--hair); border-radius:20px; padding:6px 14px; margin:0 6px 8px 0; background:var(--card); }
@media (max-width:720px){ .mix-grid{ grid-template-columns:1fr; gap:24px; } }

/* ===== Lookbook (horizontal scroll) ===== */
.lookbook{ display:flex; gap:20px; margin-top:30px; overflow-x:auto; padding-bottom:14px; scroll-snap-type:x mandatory; }
.lookbook::-webkit-scrollbar{ height:6px; } .lookbook::-webkit-scrollbar-thumb{ background:var(--hair); border-radius:5px; }
.lookbook .lk{ flex:0 0 240px; scroll-snap-align:start; }
.lookbook .lk .frame{ aspect-ratio:3/4; background:var(--card); border:1px solid var(--hair); border-radius:var(--r-md);
  display:flex; align-items:center; justify-content:center; overflow:hidden; }
.lookbook .lk .frame img{ width:84%; height:84%; object-fit:contain; transition:transform .8s var(--ease); }
.lookbook .lk:hover .frame img{ transform:scale(1.04); }
.lookbook .lk .meta{ display:flex; justify-content:space-between; margin-top:11px; font-size:11px; letter-spacing:.13em; text-transform:uppercase; }
.lookbook .lk .meta .no{ color:var(--faint); }
.lookbook .lk .wx{ font-size:11px; color:var(--muted); margin-top:4px; }

/* ===== Calendar ===== */
.cal{ margin-top:26px; background:var(--card); border:1px solid var(--hair); border-radius:var(--r-md); padding:24px; }
.cal .wk{ display:grid; grid-template-columns:repeat(7,1fr); gap:10px; }
.cal .d{ aspect-ratio:.72; border:1px solid var(--hair); border-radius:var(--r-sm); padding:8px;
  font-size:10px; letter-spacing:.1em; text-transform:uppercase; color:var(--faint); position:relative; }
.cal .d.has{ border-color:var(--muted); }
.cal .d.has .thumb{ position:absolute; left:7px; right:7px; top:24px; bottom:7px; border-radius:5px; overflow:hidden;
  background:linear-gradient(160deg,#ece6db,#ddd5c7); display:flex; align-items:center; justify-content:center; }
.cal .d.has .thumb img{ width:80%; height:80%; object-fit:contain; }
.cal .d.today{ box-shadow:inset 0 0 0 1.5px var(--ink); }
@media (max-width:720px){ .cal .wk{ grid-template-columns:repeat(7,1fr); gap:5px; } .cal .d{ padding:5px; font-size:8px; } }

/* ===== Quiet part (dark) ===== */
.quiet{ background:var(--ink); color:var(--bg); text-align:center; border-top:none; }
.quiet h2.title{ color:var(--bg); }
.quiet .eyebrow{ color:#b8b1a4; }
.quiet .vals{ display:grid; grid-template-columns:repeat(4,1fr); gap:1px; margin-top:34px;
  background:rgba(244,241,236,.14); border:1px solid rgba(244,241,236,.14); border-radius:var(--r-md); overflow:hidden; }
.quiet .v{ background:var(--ink); padding:28px 20px; transition:background .5s; }
.quiet .v:hover{ background:#221f1c; }
.quiet .v .vt{ font-size:14px; letter-spacing:.08em; margin-bottom:6px; }
.quiet .v .vd{ font-size:12px; color:#b8b1a4; line-height:1.5; }
@media (max-width:720px){ .quiet .vals{ grid-template-columns:repeat(2,1fr); } }

/* ===== Feature index ===== */
.feat-index{ display:grid; grid-template-columns:repeat(2,1fr); gap:0 48px; margin-top:26px; }
.feat-index .f{ display:flex; gap:14px; padding:18px 0; border-bottom:1px solid var(--hair); }
.feat-index .f .no{ font-size:11px; letter-spacing:.1em; color:var(--faint); min-width:22px; padding-top:3px; }
.feat-index .f b{ font-weight:400; font-size:15px; display:block; margin-bottom:3px; }
.feat-index .f span{ font-size:12px; color:var(--muted); line-height:1.5; }
@media (max-width:720px){ .feat-index{ grid-template-columns:1fr; gap:0; } }
```

- [ ] **Step 2: Insert the section markup into `index.html`** — place this block between the hero's closing `</section>` and the `<script src="assets/js/site.js"></script>` line.

```html
<!-- Standfirst -->
<section class="section standfirst">
  <div class="wrap">
    <p class="rv">Fold is a quiet place for everything you own. Photograph each piece, compose a look, and plan the week — all on your phone, nothing in the cloud.</p>
  </div>
</section>

<!-- I — The Closet -->
<section class="section" id="closet">
  <div class="wrap">
    <div class="roman rv">I — The Closet</div>
    <h2 class="title rv d1">Everything you own, on one page.</h2>
    <p class="body rv d2">Photograph a piece and Fold lifts the garment from its background — a clean cut-out, ready to wear. Your wardrobe becomes an index you can actually see.</p>
    <div class="closet-grid">
      <div class="it rv d1"><div class="tile"><img src="assets/img/closet/top.png" alt="Top"></div><div class="cap">Top</div></div>
      <div class="it rv d2"><div class="tile"><img src="assets/img/closet/jeans.png" alt="Trousers"></div><div class="cap">Trousers</div></div>
      <div class="it rv d3"><div class="tile"><img src="assets/img/closet/dress-white.png" alt="Dress"></div><div class="cap">Dress</div></div>
      <div class="it rv d4"><div class="tile"><img src="assets/img/closet/shoe.png" alt="Shoes"></div><div class="cap">Shoes</div></div>
      <div class="it rv d1"><div class="tile"><img src="assets/img/closet/bag.png" alt="Bag"></div><div class="cap">Bag</div></div>
      <div class="it rv d2"><div class="tile"><img src="assets/img/closet/hat.png" alt="Hat"></div><div class="cap">Hat</div></div>
      <div class="it rv d3"><div class="tile"><img src="assets/img/closet/dress-yellow.png" alt="Dress"></div><div class="cap">Dress</div></div>
      <div class="it rv d4"><div class="tile"><img src="assets/img/closet/top.png" alt="Shirt"></div><div class="cap">Shirt</div></div>
    </div>
  </div>
</section>

<!-- II — The Mix -->
<section class="section" id="mix">
  <div class="wrap">
    <div class="roman rv">II — The Mix</div>
    <h2 class="title rv d1">From pieces to a look.</h2>
    <div class="mix-grid">
      <div class="look rv d1"><img src="assets/img/looks/dress-white.png" alt="A composed look"></div>
      <div>
        <p class="pull rv d2">Several things become one outfit — laid out like a collage, not a checklist.</p>
        <p class="note rv d3">Right for 18° and a light wind.</p>
        <div class="chips rv d4">
          <span class="chip">Top</span><span class="chip">Trousers</span><span class="chip">Shoes</span><span class="chip">Bag</span><span class="chip">Hat</span>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- III — The Lookbook -->
<section class="section">
  <div class="wrap">
    <div class="roman rv">III — The Lookbook</div>
    <h2 class="title rv d1">One wardrobe, many lives.</h2>
    <p class="body rv d2">The same pieces, recomposed for every day and every weather. Swipe through looks you've made and saved.</p>
    <div class="lookbook">
      <div class="lk rv d1"><div class="frame"><img src="assets/img/looks/street.png" alt="The Office look"></div><div class="meta"><span>The Office</span><span class="no">01</span></div><div class="wx">19° · clear</div></div>
      <div class="lk rv d2"><div class="frame"><img src="assets/img/looks/dress-white.png" alt="Off Duty look"></div><div class="meta"><span>Off Duty</span><span class="no">02</span></div><div class="wx">22° · breeze</div></div>
      <div class="lk rv d3"><div class="frame"><img src="assets/img/looks/dress-yellow.png" alt="Evening look"></div><div class="meta"><span>Evening</span><span class="no">03</span></div><div class="wx">17° · still</div></div>
      <div class="lk rv d4"><div class="frame"><img src="assets/img/looks/street.png" alt="Weekend look"></div><div class="meta"><span>Weekend</span><span class="no">04</span></div><div class="wx">24° · sun</div></div>
    </div>
  </div>
</section>

<!-- IV — The Calendar -->
<section class="section" id="calendar">
  <div class="wrap">
    <div class="roman rv">IV — The Calendar</div>
    <h2 class="title rv d1">A week, planned in advance.</h2>
    <p class="body rv d2">Drop a look onto a day and your week dresses itself — already matched to the forecast. No more morning guesswork.</p>
    <div class="cal rv d3">
      <div class="wk">
        <div class="d">Mon</div>
        <div class="d has">Tue<div class="thumb"><img src="assets/img/looks/dress-white.png" alt=""></div></div>
        <div class="d has">Wed<div class="thumb"><img src="assets/img/looks/dress-yellow.png" alt=""></div></div>
        <div class="d today has">Thu<div class="thumb"><img src="assets/img/looks/street.png" alt=""></div></div>
        <div class="d">Fri</div>
        <div class="d has">Sat<div class="thumb"><img src="assets/img/looks/street.png" alt=""></div></div>
        <div class="d">Sun</div>
      </div>
      <p class="note" style="margin-top:16px">Added to Thursday — your street look, ready when you wake.</p>
    </div>
  </div>
</section>

<!-- The Quiet Part -->
<section class="section quiet">
  <div class="wrap">
    <div class="eyebrow rv">The quiet part</div>
    <h2 class="title rv d1">Luxury is what it leaves out.</h2>
    <div class="vals">
      <div class="v rv d1"><div class="vt">100% on-device</div><div class="vd">Your wardrobe never leaves your phone.</div></div>
      <div class="v rv d2"><div class="vt">No account</div><div class="vd">Nothing to sign up for. Just open it.</div></div>
      <div class="v rv d3"><div class="vt">No subscription</div><div class="vd">No monthly toll for your own closet.</div></div>
      <div class="v rv d4"><div class="vt">No ads, no tracking</div><div class="vd">No profiling, no feed, no noise.</div></div>
    </div>
  </div>
</section>

<!-- The Index -->
<section class="section">
  <div class="wrap">
    <div class="roman rv">The Index</div>
    <h2 class="title rv d1">Everything Fold does.</h2>
    <div class="feat-index">
      <div class="f rv d1"><div class="no">01</div><div><b>Scan &amp; cut out</b><span>Garments lifted cleanly from any photo.</span></div></div>
      <div class="f rv d2"><div class="no">02</div><div><b>Mix looks</b><span>Compose outfits as a collage.</span></div></div>
      <div class="f rv d3"><div class="no">03</div><div><b>Plan the week</b><span>Schedule looks onto a calendar.</span></div></div>
      <div class="f rv d4"><div class="no">04</div><div><b>Weather-aware</b><span>Suggestions matched to the forecast.</span></div></div>
      <div class="f rv d1"><div class="no">05</div><div><b>Cost per wear</b><span>See what each piece really costs.</span></div></div>
      <div class="f rv d2"><div class="no">06</div><div><b>Saved looks</b><span>Keep the outfits you love.</span></div></div>
    </div>
  </div>
</section>

<!-- Footer -->
<footer class="site-foot">
  <div class="wrap">
    <div class="word">FOLD</div>
    <div class="fnav">
      <a href="index.html#closet">Closet</a> ·
      <a href="privacy.html">Privacy</a> ·
      <a href="terms.html">Terms</a> ·
      <a href="support.html">Support</a>
    </div>
    <div class="cop">On-device · © 2026 Fold</div>
  </div>
</footer>
```

- [ ] **Step 3: Serve and verify the full homepage**

Run `python3 -m http.server 8000` from the repo root, open `http://localhost:8000/index.html`. Expected:
- All sections appear in order: Standfirst → I Closet (8 tiles, 4-up) → II Mix → III Lookbook (horizontal-scrollable) → IV Calendar (Thu outlined as "today", several days with thumbnails) → Quiet part (dark, 4 values) → Index (6 features) → footer.
- Scrolling reveals each section with a soft fade-up; closet tiles lift on hover; lookbook scrolls sideways and images scale on hover.
- No broken images (every `<img>` shows a garment/look).
- Anchor nav: clicking header "Closet" jumps to the Closet section.

- [ ] **Step 4: Commit**

```bash
cd /Users/datnnt/App/Wardrobe/fold
git add assets/css/site.css index.html
git commit -m "feat: homepage body — closet, mix, lookbook, calendar, ethos, index"
```

---

## Task 6: Subpage shared styles

**Files:**
- Modify: `assets/css/site.css` (append article/legal styles used by privacy/terms/support)

- [ ] **Step 1: Append subpage CSS**

```css
/* ===== Subpage / article ===== */
.page-head{ border-bottom:1px solid var(--hair); padding:clamp(40px,7vw,72px) 0 clamp(28px,4vw,40px); }
.page-head .wrap{ max-width:760px; }
.page-head h1{ font-size:clamp(30px,5vw,48px); }
.page-head .eff{ font-size:12px; letter-spacing:.14em; text-transform:uppercase; color:var(--muted); margin-top:14px; }
.article{ padding:clamp(36px,6vw,64px) 0 clamp(48px,8vw,84px); }
.article .wrap{ max-width:760px; }
.article h2{ font-size:22px; margin:40px 0 12px; }
.article h2:first-child{ margin-top:0; }
.article p{ font-size:15px; line-height:1.8; color:#3f3b34; margin:0 0 14px; }
.article ul{ margin:0 0 16px; padding-left:20px; }
.article li{ font-size:15px; line-height:1.8; color:#3f3b34; margin-bottom:6px; }
.article a{ color:var(--ink); border-bottom:1px solid var(--muted); }
.article .tl{ font-size:12px; letter-spacing:.2em; text-transform:uppercase; color:var(--faint); margin:0 0 6px; }
.faq .q{ border-top:1px solid var(--hair); padding:22px 0; }
.faq .q h3{ font-size:17px; margin-bottom:8px; }
.faq .q p{ margin:0; color:#4a463f; }
```

- [ ] **Step 2: Verify braces balance**

Run:
```bash
cd /Users/datnnt/App/Wardrobe/fold && node -e "const c=require('fs').readFileSync('assets/css/site.css','utf8'); const o=(c.match(/{/g)||[]).length, x=(c.match(/}/g)||[]).length; console.log('braces',o,x); process.exit(o===x?0:1)"
```
Expected: equal brace counts, exit 0. (Skip if no `node`.)

- [ ] **Step 3: Commit**

```bash
cd /Users/datnnt/App/Wardrobe/fold
git add assets/css/site.css
git commit -m "feat: subpage/article styles for privacy, terms, support"
```

---

## Task 7: `privacy.html`

**Files:**
- Create: `privacy.html`

- [ ] **Step 1: Create `privacy.html` in full** (canonical head/header/footer/script; privacy copy rewritten for Fold's on-device reality)

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Privacy — Fold</title>
  <meta name="description" content="Fold keeps your wardrobe on your device. No account, no tracking, nothing sold.">
  <link rel="icon" type="image/svg+xml" href="assets/img/logo/favicon.svg">
  <link rel="stylesheet" href="assets/css/site.css">
</head>
<body>

<header class="site-head">
  <div class="wrap">
    <a class="brand" href="index.html"><img src="assets/img/logo/fold-mark.svg" alt=""><span class="word">FOLD</span></a>
    <nav class="nav"><a href="index.html#closet">Closet</a><a href="privacy.html">Privacy</a><a href="support.html">Support</a></nav>
  </div>
</header>

<div class="page-head">
  <div class="wrap">
    <div class="roman">Privacy</div>
    <h1>Privacy Policy</h1>
    <div class="eff">Effective 14 June 2026</div>
  </div>
</div>

<main class="article">
  <div class="wrap">
    <p class="tl">The short version</p>
    <p>Fold keeps everything about your wardrobe on your device. There is no account to create, nothing is uploaded to our servers, and we never sell your data. We have no way to see your clothes, your looks, or your plans.</p>

    <h2>What stays on your device</h2>
    <p>Everything you add to Fold lives only on your iPhone:</p>
    <ul>
      <li>Photos you take of your clothes and the cut-outs Fold makes from them</li>
      <li>Items, looks, and outfit plans you create</li>
      <li>Notes, costs, and wear counts you record</li>
      <li>App settings and preferences</li>
    </ul>
    <p>If you have iCloud Backup turned on, this data may be included in your own encrypted Apple backup, under your control. We never receive it.</p>

    <h2>No network for your wardrobe</h2>
    <p>Fold removes the background from your garment photos using a model that runs entirely on your device. Your images are never sent to us or to any third party for processing.</p>
    <p>If you use weather-based suggestions, Fold asks Apple's Weather service for the forecast at your location through your device. That request is handled by Apple under Apple's privacy terms; we do not receive your location or build any profile from it.</p>

    <h2>No tracking, no ads, no profiling</h2>
    <p>Fold contains no advertising, no analytics SDKs, and no third-party trackers. We do not profile you and there is no feed. Suggestions are produced locally from your own wardrobe and the weather.</p>

    <h2>Children</h2>
    <p>Fold is a general-audience app and does not knowingly collect any information from anyone, including children, because it collects nothing.</p>

    <h2>Contact</h2>
    <p>Questions about this policy? Email <a href="mailto:danny.ng.it@gmail.com">danny.ng.it@gmail.com</a>. If this policy changes, we will update this page and revise the effective date above.</p>
  </div>
</main>

<footer class="site-foot">
  <div class="wrap">
    <div class="word">FOLD</div>
    <div class="fnav"><a href="index.html#closet">Closet</a> · <a href="privacy.html">Privacy</a> · <a href="terms.html">Terms</a> · <a href="support.html">Support</a></div>
    <div class="cop">On-device · © 2026 Fold</div>
  </div>
</footer>

<script src="assets/js/site.js"></script>
</body>
</html>
```

- [ ] **Step 2: Verify** — serve and open `http://localhost:8000/privacy.html`. Expected: header/footer match the homepage; title block "Privacy Policy" + "Effective 14 June 2026"; six sections render; the contact email is a working `mailto:` link; favicon shows in the tab.

- [ ] **Step 3: Commit**

```bash
cd /Users/datnnt/App/Wardrobe/fold
git add privacy.html
git commit -m "feat: privacy page"
```

---

## Task 8: `terms.html`

**Files:**
- Create: `terms.html`

- [ ] **Step 1: Create `terms.html` in full**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Terms — Fold</title>
  <meta name="description" content="The terms for using the Fold wardrobe app.">
  <link rel="icon" type="image/svg+xml" href="assets/img/logo/favicon.svg">
  <link rel="stylesheet" href="assets/css/site.css">
</head>
<body>

<header class="site-head">
  <div class="wrap">
    <a class="brand" href="index.html"><img src="assets/img/logo/fold-mark.svg" alt=""><span class="word">FOLD</span></a>
    <nav class="nav"><a href="index.html#closet">Closet</a><a href="privacy.html">Privacy</a><a href="support.html">Support</a></nav>
  </div>
</header>

<div class="page-head">
  <div class="wrap">
    <div class="roman">Terms</div>
    <h1>Terms of Use</h1>
    <div class="eff">Effective 14 June 2026</div>
  </div>
</div>

<main class="article">
  <div class="wrap">
    <p class="tl">The short version</p>
    <p>Fold is provided as-is for your personal use. There is no account and no subscription. You own your data; we keep none of it.</p>

    <h2>Licence to use the app</h2>
    <p>When you download Fold from the App Store, Apple grants you a personal, non-transferable licence to use the app on devices you own or control, in line with the App Store Terms of Service. You agree to use Fold lawfully and not to attempt to reverse-engineer, resell, or redistribute it.</p>

    <h2>Your content</h2>
    <p>The photos, items, looks, and plans you create in Fold are yours and remain on your device. We claim no rights over them and have no access to them.</p>

    <h2>No warranty</h2>
    <p>Fold is provided "as is" and "as available", without warranties of any kind, whether express or implied, including fitness for a particular purpose. Outfit and weather suggestions are conveniences, not advice, and may be imperfect.</p>

    <h2>Limitation of liability</h2>
    <p>To the maximum extent permitted by law, Fold and its maker are not liable for any indirect, incidental, or consequential damages arising from your use of, or inability to use, the app.</p>

    <h2>Intellectual property</h2>
    <p>The Fold name, logo, and the app itself are the property of their maker. The licence to use the app does not transfer any of these rights to you.</p>

    <h2>Changes to these terms</h2>
    <p>We may update these terms from time to time. Continued use of the app after an update means you accept the revised terms. We will revise the effective date above when we make changes.</p>

    <h2>Contact</h2>
    <p>Questions about these terms? Email <a href="mailto:danny.ng.it@gmail.com">danny.ng.it@gmail.com</a>.</p>
  </div>
</main>

<footer class="site-foot">
  <div class="wrap">
    <div class="word">FOLD</div>
    <div class="fnav"><a href="index.html#closet">Closet</a> · <a href="privacy.html">Privacy</a> · <a href="terms.html">Terms</a> · <a href="support.html">Support</a></div>
    <div class="cop">On-device · © 2026 Fold</div>
  </div>
</footer>

<script src="assets/js/site.js"></script>
</body>
</html>
```

- [ ] **Step 2: Verify** — open `http://localhost:8000/terms.html`. Expected: title "Terms of Use" + effective date; seven sections render; contact `mailto:` link works; header/footer consistent.

- [ ] **Step 3: Commit**

```bash
cd /Users/datnnt/App/Wardrobe/fold
git add terms.html
git commit -m "feat: terms page"
```

---

## Task 9: `support.html`

**Files:**
- Create: `support.html`

- [ ] **Step 1: Create `support.html` in full** — FAQ answers are honest about what the model supports (no jewelry claim).

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Support — Fold</title>
  <meta name="description" content="Help and answers for the Fold wardrobe app.">
  <link rel="icon" type="image/svg+xml" href="assets/img/logo/favicon.svg">
  <link rel="stylesheet" href="assets/css/site.css">
</head>
<body>

<header class="site-head">
  <div class="wrap">
    <a class="brand" href="index.html"><img src="assets/img/logo/fold-mark.svg" alt=""><span class="word">FOLD</span></a>
    <nav class="nav"><a href="index.html#closet">Closet</a><a href="privacy.html">Privacy</a><a href="support.html">Support</a></nav>
  </div>
</header>

<div class="page-head">
  <div class="wrap">
    <div class="roman">Support</div>
    <h1>Support</h1>
    <div class="eff">We usually reply within a couple of days</div>
  </div>
</div>

<main class="article">
  <div class="wrap">
    <p>Need a hand with Fold? Email <a href="mailto:danny.ng.it@gmail.com">danny.ng.it@gmail.com</a> and we'll help. Below are the questions we hear most.</p>

    <div class="faq">
      <div class="q">
        <h3>How do I add a piece?</h3>
        <p>Take or choose a photo of a single garment. Fold lifts it from its background into a clean cut-out and files it in your closet.</p>
      </div>
      <div class="q">
        <h3>What kinds of items can Fold recognise?</h3>
        <p>Fold works with clothing and a few worn accessories: tops, trousers and skirts, dresses, shoes, bags, hats, and scarves. It does not recognise jewellery such as rings, necklaces, earrings, or watches.</p>
      </div>
      <div class="q">
        <h3>Where is my data stored?</h3>
        <p>Entirely on your device. Nothing about your wardrobe is uploaded to us. See the <a href="privacy.html">Privacy Policy</a> for details.</p>
      </div>
      <div class="q">
        <h3>Does Fold work offline?</h3>
        <p>Yes. Scanning, mixing, and planning all run on-device and work without a connection. Weather-based suggestions need a network only to fetch the forecast.</p>
      </div>
      <div class="q">
        <h3>Which devices are supported?</h3>
        <p>Fold is an iPhone app. On-device cut-outs work best on recent iPhones.</p>
      </div>
      <div class="q">
        <h3>Is there a subscription?</h3>
        <p>No. Fold has no subscription and no ads.</p>
      </div>
    </div>
  </div>
</main>

<footer class="site-foot">
  <div class="wrap">
    <div class="word">FOLD</div>
    <div class="fnav"><a href="index.html#closet">Closet</a> · <a href="privacy.html">Privacy</a> · <a href="terms.html">Terms</a> · <a href="support.html">Support</a></div>
    <div class="cop">On-device · © 2026 Fold</div>
  </div>
</footer>

<script src="assets/js/site.js"></script>
</body>
</html>
```

- [ ] **Step 2: Verify** — open `http://localhost:8000/support.html`. Expected: title "Support"; intro with `mailto:` link; 6 FAQ entries with hairline separators; the "What kinds of items" answer explicitly excludes jewellery; the answer links to the privacy page and it navigates correctly.

- [ ] **Step 3: Commit**

```bash
cd /Users/datnnt/App/Wardrobe/fold
git add support.html
git commit -m "feat: support page with FAQ"
```

---

## Task 10: Cross-page QA pass (links, responsive, reduced-motion)

**Files:**
- Modify (only if defects found): any of the four HTML files / `assets/css/site.css`

- [ ] **Step 1: Link integrity check** — confirm every internal href points to a file that exists.

Run:
```bash
cd /Users/datnnt/App/Wardrobe/fold
grep -rhoE 'href="[^"#]+\.html' *.html | sed -E 's/href="//' | sort -u | while read f; do [ -f "$f" ] && echo "OK  $f" || echo "MISSING  $f"; done
```
Expected: every line starts with `OK` (index.html, privacy.html, terms.html, support.html). No `MISSING`.

- [ ] **Step 2: Asset reference check** — confirm every referenced image/font/css/js exists.

Run:
```bash
cd /Users/datnnt/App/Wardrobe/fold
grep -rhoE '(src|href)="assets/[^"]+"' *.html | sed -E 's/.*="//; s/"//' | sort -u | while read f; do [ -f "$f" ] && echo "OK  $f" || echo "MISSING  $f"; done
```
Expected: all `OK`. No `MISSING`.

- [ ] **Step 3: Responsive check** — serve, open each page, and resize the browser to ~375px wide. Expected on the homepage: hero stacks (photo above, text below); closet grid becomes 2 columns; mix stacks; lookbook still scrolls horizontally; quiet-part values become 2 columns; feature index becomes 1 column; nav stays usable. Subpages: single column stays readable with comfortable measure.

- [ ] **Step 4: Reduced-motion check** — enable "Reduce Motion" (macOS: System Settings → Accessibility → Display → Reduce Motion) and reload the homepage. Expected: all content is visible immediately with no fade-up, the masthead shows at its final spacing, and scrolling causes no parallax movement.

- [ ] **Step 5: Fix any defects found**, then re-run Steps 1–4. If no defects, continue.

- [ ] **Step 6: Commit (only if changes were made)**

```bash
cd /Users/datnnt/App/Wardrobe/fold
git add -A
git commit -m "fix: cross-page QA (links, responsive, reduced-motion)"
```

---

## Task 11 (optional polish): Upgrade to royalty-free editorial photography

Do this only if richer photography is wanted beyond the app's built-in cut-out assets. The site already works with real images from Task 0.

**Files:**
- Add: more `.png`/`.jpg` under `assets/img/closet/` and `assets/img/looks/`
- Modify: `index.html` (swap `src` / add tiles)

- [ ] **Step 1: Source images** from Unsplash or Pexels. Use only their free licences (commercial use, no attribution required). Search terms that fit quiet-luxury and the allowed garment types: "camel wool coat flat lay", "ivory knit sweater", "pleated tailored trousers", "leather loafers", "structured leather tote", "silk scarf", "minimal outfit neutral". **Do not** download images that show brand logos or are jewellery-focused. Save originals into a scratch folder.

- [ ] **Step 2: Isolate garments onto transparency** (so they match the cut-out aesthetic). Use any background-removal tool; export PNG with alpha. Name them descriptively, e.g. `assets/img/closet/coat.png`, `assets/img/closet/knit.png`.

- [ ] **Step 3: Replace/extend** the `src` attributes in the homepage Closet grid, Mix, Lookbook, and Calendar sections to point at the new files. Keep captions accurate to the garment shown. Keep alt text descriptive. **Do not** add any jewellery item.

- [ ] **Step 4: Verify** — reload the homepage; confirm new images load, no broken links, layout intact, and still no jewellery anywhere.

- [ ] **Step 5: Commit**

```bash
cd /Users/datnnt/App/Wardrobe/fold
git add -A
git commit -m "feat: upgrade imagery to royalty-free editorial photography"
```

---

## Task 12: Deployment to GitHub Pages

**Files:**
- None new (uses existing `.nojekyll`)

- [ ] **Step 1: Final local smoke test** — serve and click through all four pages and the header/footer links one more time. Confirm no broken links or images and the favicon appears.

- [ ] **Step 2: Confirm relative paths** — every asset/href in the four HTML files is **relative** (`assets/...`, `index.html`, etc.), never root-absolute (`/assets/...`). This is required because the site is served from the `/fold/` sub-path.

Run:
```bash
cd /Users/datnnt/App/Wardrobe/fold && grep -nE '(src|href)="/' *.html && echo "FOUND ROOT-ABSOLUTE PATHS — FIX THESE" || echo "OK: no root-absolute paths"
```
Expected: prints `OK: no root-absolute paths`.

- [ ] **Step 3: Push to GitHub** (only when the user has asked to publish)

```bash
cd /Users/datnnt/App/Wardrobe/fold
git push -u origin main
```

- [ ] **Step 4: Enable Pages** — in the GitHub repo `datnntqn/fold`: Settings → Pages → Source = "Deploy from a branch" → Branch = `main` → folder `/ (root)` → Save. (This is a manual UI step; note it for the user.)

- [ ] **Step 5: Verify live** — after Pages builds (~1 min), open `https://datnntqn.github.io/fold/` and confirm the homepage and all subpages load with images, fonts, and styling intact over the `/fold/` sub-path.

---

## Self-review notes (author)

- **Spec coverage:** 4 pages (Tasks 6–9 + homepage Tasks 4–5); quiet-luxury tokens & Jost self-host (Task 1); Cover-B hero (Task 4); Closet→Mix→Lookbook→Calendar→Quiet→Index narrative (Tasks 4–5); motion + reduced-motion (Tasks 2, 5, 10); logo in header/footer/hero/favicon (Tasks 0, 3, 4); model constraints / no jewelry baked into closet captions, support FAQ, and Task 11 guardrails; royalty-free imagery path (Task 11); relative-path / `.nojekyll` / sub-path deploy (Tasks 0, 12). All spec §1–§10 requirements mapped.
- **No placeholders:** every file's full content is inline; contact email and effective dates are concrete (`danny.ng.it@gmail.com`, 14 June 2026).
- **Consistency:** the masthead element id (`mast`) and hero photo id (`hero-photo`) used in `site.js` match the ids in `index.html`; `.rv` reveal classes and `.d1–.d6` delays are defined in Task 1 and used consistently; header/footer/`<head>` are identical across all four pages.
