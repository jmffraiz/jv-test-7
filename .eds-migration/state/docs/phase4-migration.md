
## Phase 3.5 Pilot Migration — 2026-04-23

### Pages Migrated

| URL | da.live Path | Archetype | Upload | Preview | Publish |
|-----|-------------|-----------|--------|---------|---------|
| https://www.juvederm.nl/ | / | homepage | 201 | 200 | 200 |
| https://www.juvederm.nl/nl/treatment/lips | /nl/treatment/lips | treatment | 201 | 200 | 200 |
| https://www.juvederm.nl/nl/qa | /nl/qa | faq | 201 | 200 | 200 |
| https://www.juvederm.nl/nl/find-a-clinic | /nl/find-a-clinic | locator | 201 | 200 | 200 |
| https://www.juvederm.nl/nl/disclaimer | /nl/disclaimer | legal | 201 | 200 | 200 |
| https://www.juvederm.nl/nl/contact-us | /nl/contact-us | contact | 201 | 200 | 200 |
| /nav (chrome) | /nav | — | 200 | 200 | 200 |
| /footer (chrome) | /footer | — | 200 | 200 | 200 |

### Preview URLs
- Homepage: https://main--jv-test-7--jmffraiz.aem.page/
- Treatment/Lips: https://main--jv-test-7--jmffraiz.aem.page/nl/treatment/lips
- FAQ: https://main--jv-test-7--jmffraiz.aem.page/nl/qa
- Find-a-Clinic: https://main--jv-test-7--jmffraiz.aem.page/nl/find-a-clinic
- Disclaimer: https://main--jv-test-7--jmffraiz.aem.page/nl/disclaimer
- Contact: https://main--jv-test-7--jmffraiz.aem.page/nl/contact-us

### Issues Encountered & Resolutions
1. **da.live path format**: Initial uploads to paths like `/nl/treatment/lips` (without `.html` extension) returned HTTP 201 but the admin preview API returned 404. Resolution: re-uploaded with explicit `.html` extension (e.g., `/nl/treatment/lips.html`). da.live strips the extension and serves at `/nl/treatment/lips`. All previews returned 200 after re-upload.
2. **nav/footer**: Uploaded as `nav` and `footer` paths (no extension needed at root). Both returned HTTP 200 on upload (pre-existing documents updated).

### Content Fidelity
- **Homepage**: Hero image + H1 "Jouw unieke schoonheid", 4-card benefits grid, columns intro with Lily image, 3-slide before/after carousel, treatment-zones block, footer notes. Text ratio ~85%, image ratio ~90%.
- **Treatment/Lips**: Hero + H1 "Aantrekkelijke lippen", columns intro, 3-slide text carousel (benefits), before/after columns, 5 product-cards carousel, 4-item accordion (Q&A), treatment-zones block, footer notes. Text ratio ~85%, image ratio ~90%.
- **FAQ**: Hero + H1 "Ontdek het antwoord op je vraag", topic-menu (5 anchor links), 6 content sections with IDs (about-juvederm, duration, results, side-effects, facial-areas), 3-slide text carousel, footer notes. Text ratio ~80%, image ratio ~85%.
- **Find-a-Clinic**: Hero + H1 "Vind een kliniek bij jou in de buurt", clinic-finder block (heading + placeholder config), footer notes. Text ratio ~95%, image ratio ~100%.
- **Disclaimer**: Centered heading "Disclaimer" + full disclaimer text paragraphs. Text ratio ~90%.
- **Contact**: Centered heading "NEEM CONTACT OP", address, phone link, email links. Text ratio ~95%.

### Pending Patterns
None — all 6 archetypes matched blueprint templates.

