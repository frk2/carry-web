# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Marketing website for **Carry**, an electric cargo moped. Static site — no build step, no framework, no bundler. Pure HTML/CSS/JS.

## Development

```bash
# Serve locally (required for Google Fonts to load)
python3 -m http.server 8765
# Open http://localhost:8765

# Capture screenshots for visual verification (requires server running on :8765)
node screenshot.mjs
```

Playwright + Chromium is installed for automated screenshots. The script in `screenshot.mjs` captures desktop (1440x900) and mobile (390x844) views of every section into `screenshots/`.

## Architecture

Single-page site with three files:

- **`index.html`** — All sections: nav, hero, stats strip, features (3 blocks), gallery, specs, impact/sustainability, reserve CTA, footer
- **`css/styles.css`** — Full design system using CSS custom properties. Sections are clearly labeled with comment headers. Responsive breakpoints at 1024px, 768px, 480px
- **`js/main.js`** — Vanilla JS: IntersectionObserver-based scroll reveals, animated stat counters, sticky nav with scroll detection, mobile menu toggle, smooth anchor scroll, hero parallax (respects prefers-reduced-motion)

## Design System

**Aesthetic:** "Industrial Warmth" — raw steel bike meets warm family lifestyle

**Colors** (CSS custom properties in `:root`):
- Primary: `#E8613C` (terracotta orange) — CTAs, accents, highlights
- Secondary: `#1B4D3E` (forest green) — trust/sustainability
- Accent: `#F5C542` (gold) — decorative emphasis
- Dark: `#0F1210` / Light: `#FDFBF7`

**Typography** (Google Fonts):
- Display/headlines: Bricolage Grotesque
- Body: Outfit
- Data/labels: IBM Plex Mono

**Animations:** Elements with class `.reveal` animate in on scroll (IntersectionObserver adds `.visible`). Use `.reveal--delay-1/2/3` for staggered timing.

## Images

Product and lifestyle photos are in `images/`. All are PNGs sourced from `/home/faraz/Dropbox/Carry cargo bike/Website/`. Key images:
- `ParkedinPark*.png` — Family lifestyle shots (hero, gallery)
- `Carry2JustBike*.png` — Product shots with/without seat (features)
- `JustBike.png` — Clean product render (specs section)
- `*onroad*.png` — Action/riding shots (gallery, CTA background)

## Specs
- Powerful 4kw motor
- Full suspension so it soaks every bump
- Step through cradle frame so you use it to store school or grocery bags and toys
- Long wheelbase for extra stability
- Kids wiggling in the back doesn't mean your bike has to - a big complaint many cargo bike riders have is that bigger kids can cause serious wiggles and make the bike feel unsafe. Not with this one. The motorcycle inspired frame is rigid enough to handle squirmy kids without becoming unstable (Make this big and obvious)
- High performance fork and shocks. No more jerky rides
- Giant 2kwh battery that gives 60 miles of range at full speed
- Instant acceleration to 30mph so you are just as fast as cars on surface streets.
- Built by parents for parents in California, USA.
- Unapologetically electric - this bike has no pedals which allows you to sit in the bike low to ground as opposed to on top of it.

## Content
- Use the "Designed in California, Made in California" obvious with maybe a US flag somewhere.
- We need to highlight that the bike is not just another e-bike but accelerates significantly faster, won't clog traffic on a hill and has world class handling and suspension

## FAQ
- Yes this requires a drivers license
- It is safer than a e-bike due to heavy duty frame, motorcycle tires and suspension components.
- Lower Center of gravity means more stability
- Easy to flat foot the back
- No maintenace required

## Quality check
- Make sure there are no empty links. Remove all links that don't have actual content
- Change reserve to 'Sign up for early bird waitlist'
- Test rides available in SF Bay area on request