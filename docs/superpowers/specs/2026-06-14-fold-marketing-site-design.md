# Fold — Marketing Site Design

**Date:** 2026-06-14
**Scope:** A static marketing website for **Fold** (the Smart Wardrobe iOS app), styled like a quiet-luxury fashion magazine, deployed to GitHub Pages at `datnntqn/fold`. Four pages: Homepage, Privacy, Terms, Support.

**Out of scope:** App Store download flow, email/waitlist capture, analytics, any backend, multi-language. The site is a pure showcase.

---

## 1. Goals & constraints

- **Tone:** "quiet luxury" — restraint, whitespace, hairline rules, slow/soft motion. The website adopts the *form language* of the app (same palette, same Jost type, same restraint), but is a real editorial website, not phone-screen mockups.
- **Narrative:** the homepage tells the app's core flow as a magazine story — **list your clothes (Closet) → recompose into looks (Mix / Lookbook) → place onto the week (Calendar)** — leading the reader to the result.
- **No false claims about the model.** Imagery and copy stay within what the on-device segmentation model actually supports (see §7). **No jewelry, anywhere.**
- **No build step.** Hand-written HTML + CSS + a little vanilla JS. Push the folder; GitHub Pages serves it.
- **English** copy throughout.
- **No download CTA, no email capture, no tracking/analytics.**

---

## 2. Deliverables & file structure

Everything lives in the repo root of `datnntqn/fold` (deploy target `/Users/datnnt/App/Wardrobe/fold`):

```
fold/
  index.html            # homepage
  privacy.html
  terms.html
  support.html
  .nojekyll             # serve dotfiles / skip Jekyll processing
  assets/
    css/site.css        # single shared stylesheet (design tokens + components)
    js/site.js          # vanilla JS: scroll reveal, mast reveal, parallax, lookbook
    fonts/
      Jost-Light.ttf
      Jost-Regular.ttf
      Jost-Medium.ttf
    img/
      logo/fold-mark.svg        # hang-tag "F", light variant (inline-able)
      logo/favicon.svg
      closet/*.png              # transparent garment cut-outs
      looks/*.jpg|png           # outfit / look photos
  docs/superpowers/...          # spec + plan (this file). Not part of the site.
```

- `.superpowers/` (brainstorm mockups) and any local scratch go in `.gitignore`.
- Header and footer markup is **duplicated** across the four HTML files (acceptable for 4 pages; no templating engine). Keep them byte-identical so edits stay in sync.
- Fonts: self-host the three Jost `.ttf` files already in the app repo (`smartwardrobe/fonts/`). `@font-face` with `font-display: swap`. No Google Fonts dependency in production.

---

## 3. Design tokens (CSS custom properties in `:root`)

| Token | Value | Use |
|---|---|---|
| `--bg` | `#F4F1EC` | warm bone background |
| `--card` | `#FBFAF7` | card / surface |
| `--ink` | `#1A1A18` | primary text; the only "accent"; dark sections |
| `--muted` | `#8A8174` | secondary text (taupe) |
| `--faint` | `#B6AFA2` | tertiary / numerals / captions |
| `--hair` | `#E2DDD3` | 1px hairline borders |
| `--tag` | `#2C2925` | hang-tag charcoal (logo) |

- Radii: `7px` small elements, `14px` cards/tiles.
- Type: Jost. Display headings `font-weight:300`; body `400`; small labels `500`, uppercase, letter-spacing `.1–.34em`.
- Generous vertical rhythm (`~54–60px` section padding), 1px hairline section dividers.
- Max content width ≈ `1080px`; comfortable reading measure (`~46ch`) for body copy.
- Fully responsive: multi-column editorial grids collapse to single column on mobile; the hero collage stacks (image above, index below).

---

## 4. Homepage (`index.html`) — section by section

Header (shared): small hang-tag logo + `F O L D` wordmark on the left; right-side nav `Closet · Privacy · Support` (anchor links + page links). Sticky, hairline bottom border, bone background.

1. **Hero — "Composed collage" cover (Cover B).**
   Two-column editorial cover.
   - **Left column:** hang-tag logo + small `FOLD` eyebrow; large masthead `FOLD`; issue line `Issue 01 · The Considered Wardrobe`; a contents list `I — The Closet`, `II — The Mix`, `III — The Calendar` each with a one-line teaser; a strip of **3 small garment cut-outs** at the bottom.
   - **Right column:** one large look photo bleeding to the edge; overlaid headline `A Quieter Wardrobe`; a small decorative "barcode" mark + `No. 01`.
   - Collapses on mobile: photo on top, left-column content below.

2. **Standfirst.** Centered lead paragraph (≈19px, light): *"Fold is a quiet place for everything you own. Photograph each piece, compose a look, and plan the week — all on your phone, nothing in the cloud."*

3. **I — The Closet.** Roman-numeral label, heading *"Everything you own, on one page."*, body tying to the **Scan** feature ("photograph a piece and Fold lifts the garment from its background"). A grid of **~8 transparent garment cut-outs** with small uppercase captions. Garment types limited per §7.

4. **II — The Mix.** Heading *"From pieces to a look."* Two-column: a composed look image on one side; a pull-quote (*"Six things become one outfit — laid out like a collage, not a checklist."*) + a weather note (*"Right for 18° and a light wind."*) + garment chips on the other.

5. **III — The Lookbook.** Heading *"One wardrobe, many lives."* A **horizontally-scrollable strip of multiple looks** (e.g., The Office / Off Duty / The Rain / Evening / Weekend), each with a name, number, and a small weather caption (`19° · clear`). Scroll-snap; hover scales the image slightly.

6. **IV — The Calendar.** Heading *"A week, planned in advance."* A week strip (Mon–Sun); some days carry a small look thumbnail; "today" is outlined. Caption: *"Added to Thursday — your camel-coat look, ready when you wake."* Ties to the **Plan / outfit-calendar** feature.

7. **The Quiet Part (dark section, `--ink` background).** Eyebrow *"The quiet part"*, heading *"Luxury is what it leaves out."* A 2×2 grid of values: **100% on-device · No account · No subscription · No ads, no tracking.** This doubles as the privacy teaser and links to `privacy.html`.

8. **The Index.** Heading *"Everything Fold does."* A restrained two-column numbered list of the 6 features: Scan & cut out · Mix looks · Plan the week · Weather-aware · Cost per wear · Saved looks.

9. **Footer / colophon (shared).** Large `FOLD` wordmark, nav `Closet · Privacy · Terms · Support`, line `On-device · © 2026 Fold`.

---

## 5. Motion design (`assets/js/site.js`)

Quiet-luxury motion = **slow, soft, sparse**. All transitions ease-out, ~0.7–1.6s.

- **Masthead reveal:** on load, `FOLD` fades in while letter-spacing settles from wide to normal (~1.6s).
- **Scroll reveal:** `IntersectionObserver` adds an `in` class; elements fade up `translateY(22px)→0`, with small stagger delays (`d1…d6`) within a section. Each element animates once.
- **Parallax:** very subtle (~4% translate) on the hero look image on scroll. Passive listener.
- **Hover:** closet cut-outs lift slightly + soft shadow; lookbook images scale ~1.03; calendar/value tiles get a faint state change.
- **Lookbook:** native horizontal scroll with `scroll-snap-type: x mandatory`; thin custom scrollbar.
- **Accessibility:** wrap all non-essential motion in `@media (prefers-reduced-motion: reduce)` → no transforms, content visible immediately.

No animation libraries; vanilla JS + CSS only.

---

## 6. Subpages

All three reuse the shared header/footer and the same type/spacing system. Layout: a centered single column, generous measure, hairline-separated sections — like the editorial body of a magazine. Each page has a simple title block (page name + effective date where relevant).

### `privacy.html`
Structure adapted from the reference but rewritten for Fold's on-device reality:
- **The short version** — stored locally, no account, nothing sold.
- **What stays on your device** — wardrobe photos, cut-outs, looks, plans, settings; included in the user's own iCloud backup if enabled.
- **No network for your wardrobe** — the segmentation model runs on-device; clothing images are never uploaded. (WeatherKit, if used, fetches only forecast for the user's location via Apple — note this honestly.)
- **No tracking, no ads, no profiling.**
- **Children.**
- **Contact** + how updates are announced.
- Effective date: **2026-06-14**.

### `terms.html`
Lightweight terms (no purchases/accounts to govern): license to use the app, "as-is" no-warranty, limitation of liability, intellectual property, changes to terms, contact. Effective date: **2026-06-14**.

### `support.html`
- Short intro + contact email.
- **FAQ** (rewritten for Fold): How do I add a piece? · What kinds of items can Fold recognize? (answer honest per §7) · Where is my data stored? · Does it work offline? · Which devices are supported? · Is there a subscription? (no).
- Contact block with email.

**Contact email:** `danny.ng.it@gmail.com` — used throughout Privacy/Terms/Support as the contact address (as a `mailto:` link).

---

## 7. Imagery & model constraints (hard rules)

**Source.** Royalty-free photography from Unsplash / Pexels (licenses permit commercial use, no attribution required). Download and **self-host** in `assets/img/`. No hotlinking. No brand logos, no recognizable brand products, no named brands in copy. Garment cut-outs: isolate onto transparency (manual or tooled) to mirror the app's cut-out aesthetic.

**Allowed garment types** (only what the ATR `segformer_b2_clothes` model segments — `SegmentationLabel.swift`):
Hat · Upper-clothes (tops, incl. coats/knits as "upper") · Pants · Skirt · Dress · Shoes · Bag · Scarf · Belt · Sunglasses.

**Forbidden / avoid:**
- **Jewelry of any kind** — rings, necklaces, earrings, watches, bracelets. The model has no class for these and cannot cut them out. Do not show them, do not imply they're supported.
- Do **not** market "automatic outerwear/jacket detection" as a distinct category — ATR folds coats into the single "upper-clothes" class.

**Suggested image set** (all model-supported): camel/wool coat, ivory knit, white shirt, pleated trousers, denim, a skirt, leather loafers, a structured bag, a silk scarf, a hat. Plus 4–5 assembled "look" photos for the Mix/Lookbook/Calendar sections.

The existing app cut-out assets in `smartwardrobe/design-assets/` (`item-top`, `item-jeans`, `item-dress-*`, `item-shoe`, `item-bag`, `item-hat`, `look-*`) may be reused as on-brand fallbacks.

---

## 8. Logo & favicon

- Source of truth: the hang-tag "F" SVG (`smartwardrobe/design-assets/app-icon/fold-icon-light.svg` and dark/tinted variants). Geometry in the branding spec.
- Inline a tag-only mark (no rounded background) for header/footer use on the bone background; provide `favicon.svg` (+ a PNG fallback if needed).
- Used in: sticky header, hero left column, footer colophon, browser favicon.

---

## 9. Deployment

1. Files at repo root of `datnntqn/fold`, plus `.nojekyll`.
2. GitHub → Settings → Pages → deploy from `main` branch, root.
3. Published at `https://datnntqn.github.io/fold/` — use **root-relative-safe** asset paths (relative `assets/...`, not `/assets/...`) so it works under the `/fold/` sub-path.
4. `.gitignore` includes `.superpowers/`.
5. Commit/push only when the user asks.

---

## 10. Acceptance criteria

- [ ] Four pages render and are mutually linked via shared header/footer.
- [ ] Homepage follows the Cover-B hero + Closet → Mix → Lookbook → Calendar → Quiet-Part → Index → Footer narrative.
- [ ] Quiet-luxury motion present and gated by `prefers-reduced-motion`.
- [ ] Jost self-hosted; palette matches tokens; no Google Fonts in production.
- [ ] Hang-tag logo in header, footer, hero, favicon.
- [ ] **Zero jewelry** in imagery or copy; only model-supported garment types shown; no "outerwear detection" claim.
- [ ] All images self-hosted, royalty-free, no brand logos/products.
- [ ] Responsive down to mobile (hero collage stacks; grids collapse).
- [ ] Works under the `/fold/` GitHub Pages sub-path (relative asset paths); `.nojekyll` present.
- [ ] Contact email (`danny.ng.it@gmail.com`) + effective dates (2026-06-14) set throughout.

---

## Revision — 2026-06-14 (post-launch)

The app shipped during build. Changes from the original spec:

- **App Store CTA added (reverses §1 "no download CTA").** App is live: **Fold: Wardrobe & Outfits**, App ID `6779275954`, URL `https://apps.apple.com/app/id6779275954`. "Download on the App Store" button now appears in the hero, a dedicated "Get Fold" section before the footer, and a Support FAQ. Homepage `<title>` uses the full app name.
- **Image treatment = floating cut-outs (Option A).** To stay honest about what the on-device segmentation model can actually process, all imagery is plain-/white-background, single-garment, royalty-free (Unsplash), self-hosted. Closet items render as cut-outs floating on the bone background via `mix-blend-mode: multiply`; the hero/mix/lookbook/calendar use plain-background model shots framed with `object-fit: cover`. **No styled flat-lays with props, no busy backgrounds, no jewelry.** Closet trimmed to 5 strong items (dropped hat + standalone trousers — no clean plain-bg source found).
- **Section padding reduced** to ~⅓ of the original for a tighter rhythm.
- The earlier app cut-out assets copied from the app repo were removed from the site.
