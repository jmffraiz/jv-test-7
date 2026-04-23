# Source-of-Truth Bundle — juvederm.nl

## Capture Summary

- **Source site**: https://www.juvederm.nl
- **Crawled at**: 2026-04-23T17:24:20.585Z
- **Total pages discovered**: 15
- **Pages captured with screenshots**: 9
- **Viewports**: Desktop (1440×900), Mobile (390×844)
- **Sitemap URLs found**: 13

## Render / Settle Strategy

All pages were captured using Playwright (Chromium, headless) with the following strategy:

1. Navigate to URL with `domcontentloaded` wait
2. Attempt to dismiss common overlay selectors (OneTrust cookie banners, age gates, modal closes)
3. Wait for `networkidle` (15s budget)
4. Measure `body.innerText.length` twice, 500 ms apart — accept when lengths are within 50 chars (content stability)
5. Dismiss overlays again (post-settle)
6. Take full-page screenshot at desktop (1440×900) and mobile (390×844) viewports
7. Save fully rendered `outerHTML` as `index.html`

Cookie banner selectors tried:
- `#onetrust-accept-btn-handler`
- `.onetrust-accept-btn-handler`
- `button[id*="accept"]`
- Various `.cookie-consent` patterns

## Archetypes

- **homepage** (1 pages)
- **content-page** (7 pages)
- **treatment** (5 pages)
- **legal** (1 pages)
- **contact** (1 pages)

## Navigation

- Header links: 27 links extracted
- Footer links: 0 links extracted

## Directory Structure

```
source-bundle/
  pages/
    <slug>/
      index.html       — full rendered DOM
      desktop.png      — full-page screenshot at 1440×900
      mobile.png       — full-page screenshot at 390×844
      meta.json        — capture metadata
  chrome/
    header.html        — rendered <header> outerHTML
    footer.html        — rendered <footer> outerHTML
    header.links.json  — header link text + hrefs
    footer.links.json  — footer link text + hrefs
    header-desktop.png — cropped header screenshot
    footer-desktop.png — cropped footer screenshot
```

## Site-Specific Quirks

- Site returns 406 Not Acceptable to plain curl/fetch with default user-agent — requires browser-like User-Agent
- Playwright Chromium with full browser UA was used for all requests
- OneTrust cookie consent management platform detected

## Partial Captures

None — all scheduled captures completed successfully.

## Crawl Errors

None
