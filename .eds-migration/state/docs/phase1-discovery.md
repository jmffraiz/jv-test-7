# Phase 1 Discovery — juvederm.nl

## Overview

- **Source site**: https://www.juvederm.nl
- **Crawled**: 2026-04-23
- **Tool**: Playwright (Chromium, headless), Node.js v25.2.1
- **Total pages found**: 14 (after deduplication)
- **Pages captured with screenshots**: 9
- **Sitemap URLs discovered**: 13

---

## Pages by Archetype

| Archetype   | Count | Notes |
|-------------|-------|-------|
| homepage    | 2     | Root redirect (`/`) and Dutch locale root (`/nl`) — both render the same homepage |
| treatment   | 5     | Treatment area pages under `/nl/treatment/*` |
| faq         | 1     | Veelgestelde vragen (FAQ) at `/nl/qa` |
| locator     | 3     | Clinic finder pages: `/nl/find-a-clinic`, `/nl/clinics`, `/nl/clinic` |
| legal       | 2     | Disclaimer + Algemene voorwaarden kliniekzoeker |
| contact     | 1     | Contact page at `/nl/contact-us` |
| **Total**   | **14**| |

---

## Navigation Structure

### Header Navigation (rendered, post-JS)

The site uses a sticky top navigation bar with:
- **Logo** → links to `/nl`
- **Treatment sub-menu**: Lippen, Ogen, Accentueren, Herstel, Man
- **FAQ sub-menu**: Over Juvéderm®, Kosten, Langdurige resultaten, Veiligheid, Zones van het gezicht
- **CTA**: "Vind je kliniek" → `/nl/find-a-clinic`

Navigation is duplicated in DOM (desktop + mobile hamburger menus), both extracted.

### Footer Navigation

The footer is minimal — contains only one visible link:
- **Vind je kliniek** → `/nl/find-a-clinic`

The site's `<footer>` element renders mostly empty (AEM placeholder container). Most footer-like content appears to be within the main page body or a cookie/privacy banner layer.

---

## Site Assets Discovered

| Asset | Value |
|-------|-------|
| Favicon | `https://www.juvederm.nl/content/dam/juvederm-ous/favicon.ico` |
| Font (Typekit) | `https://use.typekit.net/sic6ayn.css` |
| Font (Google) | `https://fonts.googleapis.com/css?family=Assistant` |
| Global Images | None detected (images are lazy-loaded and embedded in JS bundles) |

---

## Archetype Rationale

| Archetype | Rationale |
|-----------|-----------|
| **homepage** | Root `/` and locale root `/nl` — both render the JUVÉDERM Nederland brand homepage with hero, treatment overview, and CTA |
| **treatment** | Pages under `/nl/treatment/*` each describe a treatment area (lips, eye-area, enhance, restore, male). All share the same page structure: hero, before/after imagery, description, product info, CTA |
| **faq** | `/nl/qa` is a Q&A page with anchor-linked sections covering: about Juvederm, cost, duration, results, safety, facial areas |
| **locator** | `/nl/find-a-clinic`, `/nl/clinics`, `/nl/clinic` — clinic finder/map functionality. These are functionally the same JS-driven clinic locator at different URL aliases |
| **legal** | `/nl/disclaimer` (social media disclaimer) and `/nl/algemene-voorwaarden-kliniekzoeker` (T&Cs for the clinic finder) |
| **contact** | `/nl/contact-us` — contact form page |

---

## Crawl Issues

1. **406 Not Acceptable from plain HTTP clients** — The site returns HTTP 406 to all requests without a browser-like User-Agent. `curl`, `fetch`, and default Node.js HTTP clients are blocked. All crawling was performed via Playwright with a Chrome desktop UA.

2. **Footer is near-empty in DOM** — The `<footer>` element is an AEM placeholder container (`emu-card__footer`) that renders virtually no content. The visible "footer" content (privacy links, etc.) appears to be injected via cookie consent script (OneTrust) or is absent entirely. Only 1 footer link was found.

3. **Sitemap returns 406** — `sitemap.xml` was accessible only through Playwright/browser UA. It contained 13 URLs which were all successfully crawled.

4. **Footer screenshot timeout** — Initial `elementHandle.screenshot()` calls on the `<footer>` element timed out because the element was not visible/scrollable. Resolved by using `page.screenshot()` with a bottom-of-page clip instead.

5. **`/content/juvederm-ous/nl/nl/clinics.html`** — An AEM content path discovered during link traversal; this is the underlying AEM page path, not a user-facing URL. It was captured but represents the same content as `/nl/clinics`.

6. **No blog/article pages found** — The site has no blog, news, or article section in the Dutch locale.

---

## Source-of-Truth Bundle

Location: `.eds-migration/state/source-bundle/`

### Coverage

| Page | Desktop PNG | Mobile PNG | index.html | meta.json |
|------|-------------|------------|------------|-----------|
| `/` (homepage) | ✅ | ✅ | ✅ | ✅ |
| `/nl` | ✅ | ✅ | ✅ | ✅ |
| `/nl/treatment/lips` | ✅ | ✅ | ✅ | ✅ |
| `/nl/treatment/eye-area` | ✅ | ✅ | ✅ | ✅ |
| `/nl/treatment/enhance` | ✅ | ✅ | ✅ | ✅ |
| `/nl/qa` | ✅ | ✅ | ✅ | ✅ |
| `/nl/find-a-clinic` | ✅ | ✅ | ✅ | ✅ |
| `/nl/disclaimer` | ✅ | ✅ | ✅ | ✅ |
| `/nl/contact-us` | ✅ | ✅ | ✅ | ✅ |

**Total**: 9 pages × 2 viewports = 18 screenshots + 9 HTML captures

Chrome artifacts: `header.html`, `footer.html`, `header.links.json`, `footer.links.json`, `header-desktop.png`, `footer-desktop.png`

### Viewports Used

- Desktop: **1440 × 900**
- Mobile: **390 × 844** (iPhone 14 Pro dimensions)

---

## Settle Strategy

All pages captured with:
1. `page.goto(url, { waitUntil: 'domcontentloaded' })`
2. Overlay dismissal (OneTrust cookie banner: `#onetrust-accept-btn-handler`)
3. `page.waitForLoadState('networkidle', { timeout: 15000 })`
4. `body.innerText.length` measured twice 500 ms apart — accepted when stable (delta < 50 chars)
5. Second overlay dismissal pass
6. `page.screenshot({ fullPage: true })` at desktop then mobile
