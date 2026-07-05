# Fold Homepage — App Showcase & Conversion Pass

**Date:** 2026-07-05
**Scope:** Add two new sections to the existing Fold marketing homepage (`fold/index.html`) so it shows the real app and sells the download, **without changing the existing quiet-luxury editorial concept**. Plus two small, cheap conversion additions.

**Builds on:** `2026-06-14-fold-marketing-site-design.md` (the original site). That spec deliberately used editorial lifestyle imagery instead of phone screenshots. This pass revisits that one decision: research (below) shows a premium/editorial aesthetic *helps* conversion, so we keep the concept and add real screenshots inside it.

**Out of scope:** the hero (kept exactly as-is), the Closet/Mix/Lookbook/Calendar/Quiet/Index sections (unchanged), subpages (privacy/terms/support), any backend, analytics, email capture, build step. Still hand-written HTML/CSS/vanilla-JS on GitHub Pages.

---

## 1. Why (research basis)

Deep-research (18/25 claims confirmed by 3-vote adversarial verification) established, with evidence:

- **Editorial aesthetic is an asset, not a liability** (aesthetic-usability effect, NN/g). Keep the concept; only keep the conversion path unobstructed.
- **Show the app early; front-load the 3 strongest screens** in a problem→solution order. ~60% of the install decision forms on the first screen; the first 3 carry the majority.
- **Short, benefit-driven captions** beat feature labels; sequence as a narrative.
- **One conversion goal, CTA repeated** at multiple scroll depths (hero + mid + close). The site already had hero + close; this adds the missing **mid-page CTA**.
- **Social proof near the decision point**; for a new app, avoid a too-perfect displayed rating (5.0/4.9 reads as suspicious). Use real testimonials; show the numeric rating only if it is the true current App Store rating.
- **Mobile-first:** a **Smart App Banner** is the lowest-friction download path on iOS Safari, where most App Store traffic is.
- **One-time unlock fits a premium product** (removes subscription/commitment anxiety) — worth stating plainly as a selling point.

Refuted / not relied on: fixed 5-element order, "10%+ conversion is good", device-frame-by-category, bright/high-contrast screenshots winning, benefit-first-captions-win-6/8, "social proof = +34%". → We are free to keep muted tones and a bezel-less plate frame.

Full report: task `wevu8jc6x` output (session scratchpad).

---

## 2. What we add

### 2.1 Section ① — "Inside Fold" (screenshot showcase)

**Placement:** immediately after the standfirst paragraph, before `#closet`. (Shows the real app early.)

**Content:** three real screenshots, in narrative order:

| Plate | Screenshot file (in `assets/img/screens/`) | Eyebrow | Benefit caption | Sub |
|---|---|---|---|---|
| I | `scan.jpg` (Smart Scan — "Processed on device") | I — Scan | Lifted from any photo. | Garments cut out cleanly. Nothing leaves the phone. |
| II | `mix.jpg` (Mix — compose an outfit) | II — Mix | Six pieces, one look. | Compose from everything you already own. |
| III | `today.jpg` (Today — the week ahead) | III — Plan | A week that dresses itself. | Today's edit and the days ahead, matched to the weather. |

Source files provided in `fold/screenshots/` — to be renamed/moved into `assets/img/screens/` (see §4).

**Layout:** three-column grid on desktop (`repeat(3,1fr)`), single column ≤820px. Each plate = screenshot in a "plate" frame: `--card` background, 1px `--hair` border, 22px radius, 10px padding, soft downward shadow (`0 30px 50px -30px rgba(26,26,24,.28)`), image inside at 14px radius. Caption below a hairline rule: roman eyebrow, light 19px benefit line, 13px muted sub.

**Effect (chosen: "B · Parallax gallery"):** each column drifts vertically on scroll at a different factor (≈ `+0.06`, `−0.05`, `+0.09` of its distance from viewport-center), applied via a single passive scroll listener + `requestAnimationFrame`, `transform: translateY(...)`, `will-change:transform`. Middle column offset down ~56px at rest for a staggered baseline. Disabled under `prefers-reduced-motion`.

**Mid-page CTA (research: repeat the one CTA):** below the plates, the standard App Store button (same markup/SVG as hero & Get Fold) + an aside line:
> *Free for your first 40 pieces · unlock once, keep forever · no subscription.*

### 2.2 Section ② — "The Word" (TestFlight reviews)

**Placement:** immediately before the existing `.download` ("Get Fold") section (proof adjacent to the closing CTA).

**Content:** the five real TestFlight testimonials (currently living as the paywall reviews in `PurchaseManager`/`PaywallView`; confirmed by the user as genuine early-user quotes):

1. "Scanned my whole closet in an afternoon." — Mai · Hà Nội
2. "Finally one that doesn't nag me to subscribe." — Joon · Seoul
3. "Pay once, done. My photos never leave my phone." — Lena · Berlin
4. "The cut-outs look like a real lookbook." — Priya · Mumbai
5. "I actually wear more of what I own now." — Sofia · Milan

**Header:** roman eyebrow "The Word" + title "From the early closet." + right-aligned `★★★★★ From our TestFlight community`. **No numeric aggregate rating** is shown. (If/when a real App Store rating in the 4.2–4.8 band exists, it may replace the "From our TestFlight community" label with the true number — a later edit, not part of this pass.)

**Effect (chosen: "2 · Marquee ticker"):** two horizontal rows of quote cards, translating in opposite directions in a continuous CSS `@keyframes` loop (`translateX(0)`→`translateX(-50%)`, content duplicated once for a seamless wrap), row speeds ~34s / ~40s. `animation-play-state: paused` on `:hover` (whole marquee). Under `prefers-reduced-motion` the animation is removed (rows render static, horizontally scrollable). Cards: `--card` bg, 1px `--hair`, 14px radius, `★★★★★` mark, light 16.5px quote, small-caps muted attribution. Section has `overflow:hidden`.

### 2.3 Smart App Banner (mobile-first)

Add to `<head>` of **all four pages** (keep head byte-identical per original spec):
```html
<meta name="apple-itunes-app" content="app-id=6779275954">
```

### 2.4 Elevate "pay once" as a selling point

- The mid-page CTA aside (§2.1) states the free-tier + one-time model in plain words.
- The existing "Get Fold" section gains the same one-line qualifier under its CTA: *One-time unlock · no subscription · your closet stays on your phone.*
- The existing "Quiet part" values grid is unchanged (it already lists "No subscription").

---

## 3. Design tokens & constraints

Reuse the existing system verbatim — **no new palette, no new font**:
`--bg:#F4F1EC · --card:#FBFAF7 · --ink:#1A1A18 · --muted:#8A8174 · --faint:#B6AFA2 · --hair:#E2DDD3 · --tag:#2C2925`, Jost 300/400/500, roman-numeral eyebrows, hairline rules, `--ease:cubic-bezier(.2,.65,.2,1)`. Both new sections use `.section`/`.wrap` and match existing type scale. Site remains single-theme (committed light editorial world). All new CSS goes in `assets/css/site.css`; all new JS in `assets/js/site.js` (extend the existing scroll-reveal/parallax code, don't duplicate a listener).

---

## 4. Assets

- Move the 5 provided screenshots out of `fold/screenshots/` into `assets/img/screens/` with semantic names; this pass uses three: `scan.jpg`, `mix.jpg`, `today.jpg`. (`review.jpg`, `item.jpg` kept for possible later use.)
- Screenshots are full iPhone captures (status bar included) — used as-is inside the bezel-less plate frame; no device chrome added.
- Optimize: they're 100–235 KB JPGs; fine for GitHub Pages. Optionally compress later.
- `.superpowers/` is already gitignored; `fold/screenshots/` raw dump should be removed once assets are moved.

---

## 5. Non-goals / guardrails

- **No false claims.** No invented rating number, no fabricated testimonials, no "as seen in" without a real source. Only the genuine TestFlight quotes.
- **Don't touch the hero or the existing narrative sections.**
- **Keep the conversion path clear** — the mid CTA and Smart App Banner must not be obscured by effects.
- Motion must degrade gracefully under `prefers-reduced-motion`.

---

## 6. Acceptance criteria

1. Homepage shows "Inside Fold" (3 real screenshots, parallax on scroll, benefit captions, mid App Store CTA) after the standfirst.
2. Homepage shows "The Word" (5 real TestFlight quotes, opposing marquee rows, pause-on-hover, no numeric rating) just before "Get Fold".
3. Both sections use only the existing tokens/font and read as part of the same magazine.
4. Smart App Banner meta present on all four pages.
5. "Pay once / no subscription" stated at the mid CTA and the Get Fold CTA.
6. `prefers-reduced-motion` disables parallax + marquee; nothing overlaps or scrolls the body sideways on mobile.
7. Hero and all pre-existing sections are unchanged.
