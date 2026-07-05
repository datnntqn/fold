# Fold Homepage — App Showcase & Conversion Pass — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add two new sections to the existing Fold homepage — "Inside Fold" (real app screenshots, parallax) and "The Word" (real TestFlight reviews, marquee) — plus a Smart App Banner and "pay once" copy, without changing the hero or any existing section.

**Architecture:** Edit the existing hand-written static site in place. All new CSS appended to `assets/css/site.css`, all new JS folded into the existing IIFE in `assets/js/site.js`, new markup inserted into `index.html`. Reuse existing design tokens, the `.appcta` component, and the `.rv` reveal system. No new files except moved screenshot assets. No build step.

**Tech Stack:** HTML5, CSS custom properties + grid/flex + CSS `@keyframes`, vanilla JS (IntersectionObserver already present; a `requestAnimationFrame` scroll handler for parallax), self-hosted Jost, relative asset paths for the `/fold/` GitHub Pages sub-path.

**Spec:** `docs/superpowers/specs/2026-07-05-fold-homepage-app-showcase-design.md`

**Working directory for all output:** `/Users/datnnt/App/Wardrobe/fold` (the repo root).

**Verification approach:** No unit-test framework — static content site. Each task is verified by serving the folder with `python3 -m http.server 8000` from the repo root and checking a concrete visual checklist in a browser. "Expected" describes exactly what must be visible/true. Test reduced-motion via DevTools → Rendering → "Emulate CSS prefers-reduced-motion: reduce".

## Global Constraints

- No build step; hand-written HTML/CSS/JS only.
- **Relative** asset paths only (site lives under `/fold/`).
- Reuse existing tokens verbatim: `--bg:#F4F1EC · --card:#FBFAF7 · --ink:#1A1A18 · --muted:#8A8174 · --faint:#B6AFA2 · --hair:#E2DDD3 · --tag:#2C2925`; font Jost 300/400/500; `--ease:cubic-bezier(.2,.65,.2,1)`. No new palette, no new font.
- Single-theme (light) — do not add a dark theme.
- **No false claims:** only the genuine TestFlight quotes; **no numeric rating** displayed.
- Every animation must be disabled/degraded under `prefers-reduced-motion: reduce`.
- No horizontal scroll of the page body on mobile.
- The four HTML pages keep **byte-identical `<head>`** — the Smart App Banner meta goes into all four the same way.
- English copy throughout. Do not touch the hero or the Closet/Mix/Lookbook/Calendar/Quiet/Index sections.

---

## File structure (touched by this plan)

```
fold/
  index.html                       # MODIFY — insert 2 sections; add meta; add pay-once line
  privacy.html  terms.html  support.html   # MODIFY — add Smart App Banner meta only
  assets/css/site.css              # MODIFY — append Inside Fold + The Word styles
  assets/js/site.js                # MODIFY — add generic [data-px] parallax
  assets/img/screens/              # CREATE — moved screenshots
    scan.jpg  mix.jpg  today.jpg  review.jpg  item.jpg
  screenshots/                     # DELETE after move
```

---

## Task 0: Move screenshots into `assets/img/screens/`

**Files:**
- Create dir + move 5 files from `screenshots/` to `assets/img/screens/`
- Delete: `screenshots/` raw dump

**Interfaces:**
- Produces: `assets/img/screens/scan.jpg`, `mix.jpg`, `today.jpg`, `review.jpg`, `item.jpg` (relative paths used by later tasks). This pass uses `scan`, `mix`, `today`; `review`/`item` are kept for possible later use.

- [ ] **Step 1: Create the directory and move + rename the files**

```bash
cd /Users/datnnt/App/Wardrobe/fold
mkdir -p assets/img/screens
git mv screenshots/f8ae98b1c15640081947.jpg assets/img/screens/scan.jpg
git mv screenshots/2eaf8954fab37bed22a2.jpg assets/img/screens/mix.jpg
git mv screenshots/d2a6ee1a8bfd0aa353ec.jpg assets/img/screens/today.jpg
git mv screenshots/50c598cbc12c4072193d.jpg assets/img/screens/review.jpg
git mv screenshots/c52a5f2b05cc8492dddd.jpg assets/img/screens/item.jpg
rmdir screenshots 2>/dev/null || true
```

(If the files were never committed, `git mv` errors — fall back to `mv` for each, then `rmdir screenshots`.)

- [ ] **Step 2: Verify the assets are in place**

Run:
```bash
ls assets/img/screens
```
Expected: `item.jpg  mix.jpg  review.jpg  scan.jpg  today.jpg` and `screenshots/` no longer exists.

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "assets: move app screenshots into assets/img/screens"
```

---

## Task 1: "Inside Fold" section (screenshots + parallax + mid CTA)

**Files:**
- Modify: `assets/css/site.css` (append)
- Modify: `assets/js/site.js` (add generic parallax inside the existing IIFE)
- Modify: `index.html` (insert section after the standfirst, before `<!-- I — The Closet -->`)

**Interfaces:**
- Consumes: `assets/img/screens/{scan,mix,today}.jpg` (Task 0); existing `.appcta`, `.section`, `.wrap`, `.roman`, `.title`, `.body`, `.rv` classes; existing `reduce` variable in `site.js`.
- Produces: a `[data-px]` parallax convention (any element with `data-px="<factor>"` drifts on scroll) reused by Task 2's fallback and future sections.

- [ ] **Step 1: Append the Inside Fold styles to `assets/css/site.css`** (add at end of file)

```css

/* ===== Inside Fold — real screenshot plates ===== */
.inside .plates{ display:grid; grid-template-columns:repeat(3,1fr); gap:clamp(20px,3vw,44px);
  align-items:start; margin-top:clamp(28px,4vw,48px); }
.inside .col{ will-change:transform; }
.inside .col.mid{ margin-top:56px; }
.inside .shot{ background:var(--card); border:1px solid var(--hair); border-radius:22px; padding:10px;
  overflow:hidden; margin:0; box-shadow:0 1px 0 rgba(0,0,0,.02), 0 30px 50px -30px rgba(26,26,24,.28); }
.inside .shot img{ width:100%; border-radius:14px; }
.inside .cap{ margin-top:16px; padding-top:14px; border-top:1px solid var(--hair); }
.inside .cap .n{ font-size:11px; letter-spacing:.3em; text-transform:uppercase; color:var(--faint); }
.inside .cap .h{ font-weight:300; font-size:19px; margin:6px 0 5px; }
.inside .cap .d{ font-size:13px; line-height:1.6; color:var(--muted); }
.inside .cta-row{ display:flex; align-items:center; gap:22px; flex-wrap:wrap; margin-top:clamp(30px,4vw,48px); }
.inside .cta-row .aside{ font-size:13px; color:var(--muted); letter-spacing:.02em; max-width:38ch; }
@media (max-width:820px){
  .inside .plates{ grid-template-columns:1fr; max-width:420px; margin-left:auto; margin-right:auto; }
  .inside .col.mid{ margin-top:0; }
}
```

- [ ] **Step 2: Add the generic parallax handler to `assets/js/site.js`**

Insert this block immediately **after** the existing hero-parallax block (after the `if (hero && !reduce) { ... }` block, before the closing `})();`):

```javascript

  // Generic column parallax: any element with data-px="<factor>" drifts on scroll.
  var pxEls = document.querySelectorAll("[data-px]");
  if (pxEls.length && !reduce) {
    var onPx = function () {
      var vh = window.innerHeight;
      pxEls.forEach(function (el) {
        var r = el.getBoundingClientRect();
        var center = r.top + r.height / 2 - vh / 2;
        el.style.transform = "translateY(" + (center * parseFloat(el.getAttribute("data-px"))).toFixed(1) + "px)";
      });
    };
    window.addEventListener("scroll", function () { window.requestAnimationFrame(onPx); }, { passive: true });
    onPx();
  }
```

- [ ] **Step 3: Insert the Inside Fold markup into `index.html`**

Find the standfirst section (ends `</section>` right before `<!-- I — The Closet -->`). Insert this block **between** the standfirst's closing `</section>` and the `<!-- I — The Closet -->` comment:

```html

<!-- Inside Fold — real screenshots -->
<section class="section inside">
  <div class="wrap">
    <div class="roman rv">Inside Fold</div>
    <h2 class="title rv d1">What it actually looks like.</h2>
    <p class="body rv d2">Real screens, nothing staged. Photograph a piece and it’s lifted clean; compose a look from what you own; wake to a week already dressed.</p>
    <div class="plates">
      <div class="col" data-px="0.06">
        <figure class="shot"><img src="assets/img/screens/scan.jpg" alt="Fold — Smart Scan, processed on device"></figure>
        <figcaption class="cap"><div class="n">I — Scan</div><div class="h">Lifted from any photo.</div><div class="d">Garments cut out cleanly. Nothing leaves the phone.</div></figcaption>
      </div>
      <div class="col mid" data-px="-0.05">
        <figure class="shot"><img src="assets/img/screens/mix.jpg" alt="Fold — Mix, composing an outfit"></figure>
        <figcaption class="cap"><div class="n">II — Mix</div><div class="h">Six pieces, one look.</div><div class="d">Compose from everything you already own.</div></figcaption>
      </div>
      <div class="col" data-px="0.09">
        <figure class="shot"><img src="assets/img/screens/today.jpg" alt="Fold — Today, the week ahead"></figure>
        <figcaption class="cap"><div class="n">III — Plan</div><div class="h">A week that dresses itself.</div><div class="d">Today’s edit and the days ahead, matched to the weather.</div></figcaption>
      </div>
    </div>
    <div class="cta-row rv">
      <a class="appcta" href="https://apps.apple.com/app/id6779275954" target="_blank" rel="noopener">
        <svg viewBox="0 0 384 512" aria-hidden="true"><path d="M318.7 268c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141 1.5 184.6 1.5 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.2-92.6zM256.6 79c34.9-41.4 31.8-79.1 30.8-92.7-30.9 1.8-66.6 21.1-87 44.8-22.5 25.7-35.7 57.5-32.9 91.5 33.4 2.6 64-14.6 89.1-43.6z"/></svg>
        <span><span class="sub">Download on the</span><span class="big">App Store</span></span>
      </a>
      <span class="aside">Free for your first 40 pieces · unlock once, keep forever · no subscription.</span>
    </div>
  </div>
</section>
```

- [ ] **Step 4: Serve and verify Inside Fold**

Run:
```bash
cd /Users/datnnt/App/Wardrobe/fold && python3 -m http.server 8000
```
Open `http://localhost:8000/` and scroll to just below the standfirst. Expected:
- A section titled "Inside Fold / What it actually looks like." with three screenshots (Scan, Mix, Today) in a row, each in a card-framed plate with a caption below (roman numeral, benefit line, sub).
- The middle plate sits slightly lower at rest; on scroll the three columns drift at visibly different speeds (parallax).
- Below the plates: an App Store button + the line "Free for your first 40 pieces · unlock once, keep forever · no subscription."
- Narrow the window to ≤820px: plates stack to one column (max 420px, centered); no horizontal body scroll.
- DevTools → emulate `prefers-reduced-motion: reduce` → reload: columns are static (no drift), content fully visible.

- [ ] **Step 5: Commit**

```bash
git add assets/css/site.css assets/js/site.js index.html
git commit -m "feat: Inside Fold section — real screenshots with parallax + mid-page CTA"
```

---

## Task 2: "The Word" section (TestFlight reviews, marquee)

**Files:**
- Modify: `assets/css/site.css` (append)
- Modify: `index.html` (insert section immediately before `<!-- Get Fold -->`)

**Interfaces:**
- Consumes: existing `.section`, `.wrap`, `.roman`, `.title` classes; the reduced-motion fallback relies on CSS only (no JS).
- Produces: none consumed downstream.

- [ ] **Step 1: Append The Word styles to `assets/css/site.css`** (add at end of file)

```css

/* ===== The Word — TestFlight reviews (marquee) ===== */
.word .head-row{ display:flex; align-items:baseline; justify-content:space-between; flex-wrap:wrap; gap:12px; }
.word .stars{ font-size:14px; letter-spacing:2px; color:var(--ink); }
.word .stars .meta{ font-size:12px; letter-spacing:.16em; text-transform:uppercase; color:var(--muted); margin-left:8px; }
.marq{ margin-top:clamp(26px,4vw,44px); display:flex; flex-direction:column; gap:18px; overflow:hidden; }
.marq .track{ display:flex; gap:18px; width:max-content; animation:fold-marq 34s linear infinite; }
.marq .track.rev{ animation-duration:40s; animation-direction:reverse; }
.marq:hover .track{ animation-play-state:paused; }
@keyframes fold-marq{ from{ transform:translateX(0); } to{ transform:translateX(-50%); } }
.marq .mcard{ flex:0 0 auto; width:340px; background:var(--card); border:1px solid var(--hair);
  border-radius:14px; padding:22px 24px; }
.marq .mcard .mk{ font-size:11px; letter-spacing:2px; color:var(--faint); margin-bottom:10px; }
.marq .mcard blockquote{ margin:0; font-weight:300; font-size:16.5px; line-height:1.5; color:var(--ink); }
.marq .mcard .who{ margin-top:14px; font-size:11px; letter-spacing:.16em; text-transform:uppercase; color:var(--muted); }
@media (max-width:560px){ .marq .mcard{ width:78vw; } }
@media (prefers-reduced-motion: reduce){
  .marq{ overflow:visible; }
  .marq .track{ animation:none; flex-wrap:wrap; width:auto; }
  .marq .track.rev{ display:none; }
  .marq .track .dup{ display:none; }
}
```

- [ ] **Step 2: Insert The Word markup into `index.html`**

Insert this block **immediately before** the `<!-- Get Fold -->` comment (so it sits between the Index section and Get Fold). The first `.track` carries the 5 quotes once, then the same 5 again marked `dup` (for a seamless `-50%` loop); the second `.track rev` is a decorative duplicate hidden from assistive tech.

```html

<!-- The Word — TestFlight reviews -->
<section class="section word">
  <div class="wrap">
    <div class="head-row">
      <div>
        <div class="roman rv">The Word</div>
        <h2 class="title rv d1">From the early closet.</h2>
      </div>
      <div class="stars rv d2">★★★★★<span class="meta">From our TestFlight community</span></div>
    </div>
  </div>
  <div class="marq">
    <div class="track">
      <div class="mcard"><div class="mk">★★★★★</div><blockquote>“Scanned my whole closet in an afternoon.”</blockquote><div class="who">Mai · Hà Nội</div></div>
      <div class="mcard"><div class="mk">★★★★★</div><blockquote>“Finally one that doesn’t nag me to subscribe.”</blockquote><div class="who">Joon · Seoul</div></div>
      <div class="mcard"><div class="mk">★★★★★</div><blockquote>“Pay once, done. My photos never leave my phone.”</blockquote><div class="who">Lena · Berlin</div></div>
      <div class="mcard"><div class="mk">★★★★★</div><blockquote>“The cut-outs look like a real lookbook.”</blockquote><div class="who">Priya · Mumbai</div></div>
      <div class="mcard"><div class="mk">★★★★★</div><blockquote>“I actually wear more of what I own now.”</blockquote><div class="who">Sofia · Milan</div></div>
      <div class="mcard dup" aria-hidden="true"><div class="mk">★★★★★</div><blockquote>“Scanned my whole closet in an afternoon.”</blockquote><div class="who">Mai · Hà Nội</div></div>
      <div class="mcard dup" aria-hidden="true"><div class="mk">★★★★★</div><blockquote>“Finally one that doesn’t nag me to subscribe.”</blockquote><div class="who">Joon · Seoul</div></div>
      <div class="mcard dup" aria-hidden="true"><div class="mk">★★★★★</div><blockquote>“Pay once, done. My photos never leave my phone.”</blockquote><div class="who">Lena · Berlin</div></div>
      <div class="mcard dup" aria-hidden="true"><div class="mk">★★★★★</div><blockquote>“The cut-outs look like a real lookbook.”</blockquote><div class="who">Priya · Mumbai</div></div>
      <div class="mcard dup" aria-hidden="true"><div class="mk">★★★★★</div><blockquote>“I actually wear more of what I own now.”</blockquote><div class="who">Sofia · Milan</div></div>
    </div>
    <div class="track rev" aria-hidden="true">
      <div class="mcard"><div class="mk">★★★★★</div><blockquote>“The cut-outs look like a real lookbook.”</blockquote><div class="who">Priya · Mumbai</div></div>
      <div class="mcard"><div class="mk">★★★★★</div><blockquote>“I actually wear more of what I own now.”</blockquote><div class="who">Sofia · Milan</div></div>
      <div class="mcard"><div class="mk">★★★★★</div><blockquote>“Scanned my whole closet in an afternoon.”</blockquote><div class="who">Mai · Hà Nội</div></div>
      <div class="mcard"><div class="mk">★★★★★</div><blockquote>“Finally one that doesn’t nag me to subscribe.”</blockquote><div class="who">Joon · Seoul</div></div>
      <div class="mcard"><div class="mk">★★★★★</div><blockquote>“Pay once, done. My photos never leave my phone.”</blockquote><div class="who">Lena · Berlin</div></div>
      <div class="mcard"><div class="mk">★★★★★</div><blockquote>“The cut-outs look like a real lookbook.”</blockquote><div class="who">Priya · Mumbai</div></div>
      <div class="mcard"><div class="mk">★★★★★</div><blockquote>“I actually wear more of what I own now.”</blockquote><div class="who">Sofia · Milan</div></div>
      <div class="mcard"><div class="mk">★★★★★</div><blockquote>“Scanned my whole closet in an afternoon.”</blockquote><div class="who">Mai · Hà Nội</div></div>
      <div class="mcard"><div class="mk">★★★★★</div><blockquote>“Finally one that doesn’t nag me to subscribe.”</blockquote><div class="who">Joon · Seoul</div></div>
      <div class="mcard"><div class="mk">★★★★★</div><blockquote>“Pay once, done. My photos never leave my phone.”</blockquote><div class="who">Lena · Berlin</div></div>
    </div>
  </div>
</section>
```

- [ ] **Step 3: Serve and verify The Word**

Run (if not already serving): `cd /Users/datnnt/App/Wardrobe/fold && python3 -m http.server 8000`
Open `http://localhost:8000/` and scroll to just above "Get Fold". Expected:
- Section "The Word / From the early closet." with `★★★★★ From our TestFlight community` on the right. **No numeric rating anywhere.**
- Two rows of quote cards sliding horizontally in **opposite** directions, continuously, seamlessly (no visible jump at the wrap).
- Hovering over the marquee pauses both rows.
- No numeric "4.9"/aggregate score is shown.
- Narrow to mobile width: cards ~78vw wide; page body does not scroll sideways.
- DevTools → emulate `prefers-reduced-motion: reduce` → reload: rows stop animating; the top row wraps to show all 5 unique quotes (no duplicates), the reverse row is hidden.

- [ ] **Step 4: Commit**

```bash
git add assets/css/site.css index.html
git commit -m "feat: The Word section — TestFlight reviews as an opposing marquee"
```

---

## Task 3: Smart App Banner + "pay once" copy

**Files:**
- Modify: `index.html`, `privacy.html`, `terms.html`, `support.html` (add one `<meta>` to each `<head>`)
- Modify: `index.html` (add a note line under the Get Fold CTA)

**Interfaces:**
- Consumes: nothing. Produces: nothing downstream.

- [ ] **Step 1: Add the Smart App Banner meta to all four pages**

In each of `index.html`, `privacy.html`, `terms.html`, `support.html`, add this line in `<head>` on its own line **immediately after** the existing `<meta name="description" ...>` line (keep the four heads byte-identical for this line):

```html
  <meta name="apple-itunes-app" content="app-id=6779275954">
```

- [ ] **Step 2: Add the "pay once" note under the Get Fold CTA**

In `index.html`, inside the `<!-- Get Fold -->` section, find the `<div class="rv d2" style="display:flex;justify-content:center">...</div>` that wraps the App Store button. Add this line **immediately after** that closing `</div>`, still inside `<div class="wrap">`:

```html
    <p class="note rv d3" style="text-align:center;margin-top:16px">One-time unlock · no subscription · your closet stays on your phone.</p>
```

- [ ] **Step 3: Verify**

Reload `http://localhost:8000/`. Expected:
- View source on all four pages: each `<head>` contains `<meta name="apple-itunes-app" content="app-id=6779275954">` right after the description meta. (On a real iPhone in Safari this renders the App Store banner; on desktop it is inert — that's expected.)
- The Get Fold section shows the note "One-time unlock · no subscription · your closet stays on your phone." centered under the App Store button.

- [ ] **Step 4: Commit**

```bash
git add index.html privacy.html terms.html support.html
git commit -m "feat: Smart App Banner meta on all pages + pay-once note on Get Fold"
```

---

## Task 4: Cross-page QA pass

**Files:** none (verification + final commit only).

- [ ] **Step 1: Full homepage read-through**

Serve and open `http://localhost:8000/`. Scroll top to bottom. Expected order: hero (unchanged) → standfirst → **Inside Fold** → Closet → Mix → Lookbook → Calendar → Quiet → Index → **The Word** → Get Fold → footer. Hero and all pre-existing sections look exactly as before.

- [ ] **Step 2: Responsive + no sideways scroll**

Run in the browser console at 375px width:
```javascript
document.documentElement.scrollWidth <= window.innerWidth
```
Expected: `true` (no horizontal body overflow). Also visually confirm Inside Fold stacks to one column and The Word cards fit.

- [ ] **Step 3: Reduced-motion pass**

DevTools → Rendering → emulate `prefers-reduced-motion: reduce` → reload. Expected: Inside Fold parallax is static; The Word marquee is static and shows all 5 unique quotes; hero masthead/reveal still resolve to visible; nothing is stuck hidden.

- [ ] **Step 4: Link + claim audit**

Expected: both new App Store buttons and the hero/Get Fold buttons point to `https://apps.apple.com/app/id6779275954`. Confirm **no numeric rating** and no invented testimonial appear anywhere (only the five named TestFlight quotes).

- [ ] **Step 5: Stop the server and final commit (if any pending changes)**

```bash
git status
# if anything uncommitted:
git add -A && git commit -m "chore: homepage app-showcase pass — QA fixes"
```

---

## Self-review notes (author)

- **Spec coverage:** §2.1 Inside Fold → Task 1. §2.2 The Word → Task 2. §2.3 Smart App Banner → Task 3 Step 1. §2.4 pay-once → Task 1 (mid CTA aside) + Task 3 Step 2 (Get Fold note). §3 tokens/reuse → enforced in every CSS block. §4 assets → Task 0. §5 guardrails / §6 acceptance → Task 4.
- **No numeric rating** anywhere (spec §2.2, §5) — verified in Task 2 Step 3 and Task 4 Step 4.
- **Parallax convention** `data-px` defined in Task 1 Step 2, consumed by Task 1 markup; The Word uses CSS-only animation, no JS dependency.
- **Reduced-motion** handled: parallax gated on `!reduce` (JS); marquee gated via `@media (prefers-reduced-motion: reduce)` (CSS).
- **Head byte-identical** constraint respected — the same meta line added to all four pages.
```
