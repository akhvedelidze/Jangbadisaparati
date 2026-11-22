# SEO audit & expansion notes — Jangbadisaparati.ge

Branch: `seo/georgia-expansion` · Date of change: 2026-11-22 · Nothing here is merged to production.

The site is plain static HTML (GitHub Pages style, `CNAME` = `jangbadisaparati.ge`). This change adds 25 new static pages (14 Georgian, 11 English), a shared `js/site.js`, appended CSS, a full `sitemap.xml`, and light updates to the three existing pages.

---

## 1. What changed

### New Georgian pages (14)
| URL | Purpose | Main schema |
|---|---|---|
| `/qiraoba/5-litri/` | 5 L rental, 10 GEL/day | Service + Offer (UnitPriceSpecification, DAY), FAQPage |
| `/qiraoba/10-litri/` | 10 L rental, 15 GEL/day | Service + Offer (UnitPriceSpecification, DAY), FAQPage |
| `/gayidva/5-litri/` | 5 L sale, 1 300 GEL | Product + Offer (UnitPriceSpecification, 6-month WarrantyPromise), FAQPage |
| `/gayidva/10-litri/` | 10 L sale, 2 200 GEL | Product + Offer (UnitPriceSpecification, 6-month WarrantyPromise), FAQPage |
| `/shesakheb/` | About | AboutPage |
| `/kontakti/` | Contact + map | ContactPage + ContactPoint (24/7 technical support) |
| `/pirebebi/` | Rental conditions | Service (both rental offers, `termsOfService`) |
| `/garantia/` | Warranty (6 months, sales only) | WebPage |
| `/kitkhvebi/` | FAQ hub (16 Q&A) | FAQPage |
| `/tsodna/` | Knowledge center index | CollectionPage + ItemList |
| `/tsodna/ra-aris-jangbadis-kontsentratori/` | Article | Article |
| `/tsodna/5-da-10-litri/` | Article | Article |
| `/tsodna/gakiraveba-tu-yidva/` | Article | Article |
| `/tsodna/mitana-tbilisshi/` | Article | Article |

### New English pages (11)
`/en/`, `/en/rental/`, `/en/rental/5-liter/`, `/en/rental/10-liter/`, `/en/sales/`, `/en/sales/5-liter/`, `/en/sales/10-liter/`, `/en/about/`, `/en/contact/`, `/en/faq/`, `/en/knowledge/`.

The English knowledge page contains short English summaries and links to the four Georgian articles (marked `hreflang="ka" lang="ka"`). English versions of `/pirebebi/` and `/garantia/` do not exist; English pages link to the Georgian versions (labelled "Georgian").

### Other files
| File | Change |
|---|---|
| `css/styles.css` | **Appended only** (~420 lines at the end): `.breadcrumb`, `.page-hero`, `.prose`, `.article-meta`, `.knowledge-grid`, `.lang-link`, plus helpers `.fact-box`, `.review-note`, `.data-table`/`.table-wrap`, `.step-list`, `.related-links`, `.knowledge-card`, `.footer-grid-4`, `.no-js .faq-answer`, nav `aria-current` style. No existing rule edited. |
| `js/site.js` | New. Mobile nav, FAQ accordion, `[data-track]` click listeners, analytics stub (see §6). |
| `js/main.js` | **Now unused** (no page loads it). Kept per brief; safe to delete after review. |
| `sitemap.xml` | Rewritten: 28 URLs (all indexable KA + EN), `lastmod` 2026-11-22, `xhtml:link` hreflang alternates for the 11 KA/EN pairs. |
| `index.html`, `qiraoba/index.html`, `gayidva/index.html` | Light update (see §2). Public URLs unchanged. |
| `SEO-AUDIT.md` | This file. |

`robots.txt`, `CNAME`, `favicon.svg`, images: untouched.

---

## 2. Changes to the three existing pages
- `<html>`: removed `data-page`, added `class="no-js"`.
- Added `hreflang` ka / en / x-default (self-referencing canonical kept). `/` ↔ `/en/`, `/qiraoba/` ↔ `/en/rental/`, `/gayidva/` ↔ `/en/sales/`.
- Header: JS KA/EN buttons replaced by real links (`KA` is the active label, `EN` is `<a href="/en/…">` — it points to the English *counterpart* where one exists, e.g. `/en/rental/` from `/qiraoba/`). English pages link back to the Georgian counterpart (`/` from `/en/`).
- Visible breadcrumb added to `/qiraoba/` and `/gayidva/` (and, for consistency with the "every page" rule, a one-item breadcrumb on `/`).
- Header nav / mobile nav / footer / sticky bar replaced with the shared partials used by all new pages (nav: გაქირავება, გაყიდვა, ცოდნა, კითხვები, ჩვენ შესახებ, კონტაქტი). Home keeps its `#why / #about / #faq / #contact` sections.
- Links to new pages: product names/cards now link to the four product subpages; new "knowledge" section on `/`; links to `/pirebebi/`, `/garantia/`, `/kitkhvebi/`, `/tsodna/…`, `/kontakti/`, `/shesakheb/`.
- JSON-LD on `/qiraoba/` and `/gayidva/` rebuilt: BreadcrumbList, MedicalBusiness, WebSite, WebPage, Service/Product with `UnitPriceSpecification`; `/` keeps its original graph plus a BreadcrumbList. **`availability: InStock` was removed** from the existing offers (not a verified fact — see §4).
- All `data-i18n*` / `data-wa*` attributes removed; WhatsApp links now carry their pre-filled text directly in the `href`; `<script src=…main.js>` → `js/site.js`.
- `width`/`height` on existing images corrected to the real pixel size (they said 800×1000 for square images).
- One stray raw `&` (`5 & 10`) and one `&` in a map URL escaped; a BOM removed from two files.

---

## 3. Pattern checks on every page (28 pages)
All pass in the automated check (`ERRORS: 0`):
- `lang` attribute; unique `<title>` and meta description; self-referencing canonical; `og:url` equals canonical.
- hreflang `ka` + `x-default` (+ `en` where a counterpart exists), verified reciprocal.
- `og:*` and `twitter:image` with absolute image URLs; image files exist.
- Exactly one `<h1>`; visible `<nav class="breadcrumb">`; BreadcrumbList + MedicalBusiness JSON-LD (all JSON parses).
- No broken root-relative links; all assets resolve with the correct `../` depth (root `""`, depth-1 `../`, depth-2 `../../`, `en/rental/5-liter/` → `../../../`).
- `<img>` always has `alt`, `width`, `height`, `decoding="async"`; below-the-fold images `loading="lazy"`.
- Every `tel:` / `wa.me` link has `data-track` (`tel`, `whatsapp`, `rent`, `buy`); product WhatsApp links also carry `data-product` (`5L`/`10L`) and `data-channel="whatsapp"`.
- Exactly one `.mobile-cta` (sticky Call + WhatsApp); no floating WhatsApp button.
- All 28 indexable URLs are in `sitemap.xml`, and every sitemap URL has a file.
- Secondary check with `html-validate` (recommended preset): only the stylistic `tel-non-breaking` rule fires (phone numbers use ordinary spaces, as the original pages do).

### Not done / still to do
- Google Rich Results Test and Search Console URL inspection (needs the deployed site).
- Lighthouse / Core Web Vitals measurement.
- Native Georgian-speaker proofreading of all new Georgian copy.
- Real-device mobile check beyond a narrow-viewport preview in the IDE browser.

---

## 4. Images, performance and markup decisions
- **WebP delivered:** `images/webp/` contains WebP versions of all referenced photos. HTML uses `<picture><source type="image/webp">` with PNG/JPG fallback. Hero CSS background `soft-medical` now points at the WebP file (~292 KB → ~104 KB).
- Approximate savings: concentrators ~40–70%; photos like `hero2.jpg` ~569 KB → ~187 KB; `courier.jpg` ~107 KB → ~35 KB.
- Unused untracked asset `images/hero-mobile.png` was **removed** (never referenced).
- The single hero image on each product page is **not** `loading="lazy"` (likely LCP); it uses `decoding="async"` / `fetchpriority="high"` where set. Other images are lazy.
- Product photos (`concentrator-1…4.png`, `accessories-kit.png`) are stock-style. `concentrator-3.png` and `concentrator-4.png` show third-party branding; `accessories-kit.png` shows a different device. **Confirm these match devices you offer** before relying on Product rich results. No manufacturer names appear in copy or schema.
- `og:image` still uses PNG/JPG absolute URLs (broader crawler compatibility). Optional follow-up: 1200×630 share images.
- FAQ answers remain visible without JS (`.no-js .faq-answer`).
- `<html lang>` is `ka` / `en`; hreflang is also in the sitemap.
- Fonts: Google Fonts still loaded; optional CWV follow-up is self-hosting Noto Sans Georgian subset.

---

## 5. Verified facts used, and what was deliberately NOT stated
Used (from the brief): brand, both phone numbers, WhatsApp link, address, geo, map, TikTok, Facebook, rental 10/15 GEL/day, sale 1 300 / 2 200 GEL, 6-month sale warranty, rental inclusions (სატურატორი, კანულა, ნიღაბი, გამოხდილი წყალი, საჭირო აქსესუარები), services (delivery in Tbilisi, installation, 24/7 technical support, sterilization/cleaning before rental), general concentrator info (≈90–95 % concentration depending on mode/model, runs on electricity, continuous supply vs cylinders).

Not stated anywhere: manufacturer/brand names, certifications, CE marks, review scores/ratings, hospital affiliations, flow rates in L/min as product specs, delivery fees/times/districts, opening hours, deposit/ID requirements, founding year, customer counts.

Derived arithmetic (clearly labelled as simple arithmetic): rental-vs-purchase day equivalents (1 300 ÷ 10 = 130 days; 2 200 ÷ 15 ≈ 147 days), price difference 900 GEL, and "daily rate × days" tables on rental product pages.

Content split rule used in articles: a mint **"verified commercial information"** box (facts from the brief) is visually separate from sections marked with a yellow **review note** ("general educational information — requires review by a medical expert") and the doctor-recommendation notice. Articles also show "სამედიცინო გადამოწმება: საჭიროა" in the meta line. The emergency number 112 is mentioned in the review note (general Georgian emergency number — please confirm you are happy to include it).

---

## 6. Tracking / analytics
`js/site.js`:
- Reads `window.SITE_ANALYTICS_ID`. Google tag is loaded **only** if it is set *before* `site.js` and matches `G-…`, `GT-…` or `AW-…`. Otherwise no third-party request is made.
- To enable: add `<script>window.SITE_ANALYTICS_ID = "G-XXXXXXXXXX";</script>` above the `site.js` tag (or build it into your deploy step). Consider a consent banner first if required by your legal advice.
- Every `[data-track]` click dispatches a `site:track` DOM event and, if `gtag` exists, sends `contact_click` with `contact_type` (`tel|whatsapp|rent|buy`), `contact_channel` (`phone|whatsapp`), `product_size` (`5L|10L`), `link_url`, `page_path`, `language`.
- `anonymize_ip` is set; no cookies are set by our code.

---

## 7. Missing information / owner confirmation flags
Each item below is also an HTML comment `<!-- OWNER CONFIRMATION NEEDED: … -->` in the relevant page (search the repo for that string; 25 comments across 19 pages).

**Rental conditions (`/pirebebi/`, rental product pages, EN rental pages)** — all unverified, none published as policy:
1. Minimum rental period; how long-term rental is priced (site only says "contact us for longer periods").
2. Payment method/timing.
3. Deposit (გირაო): exists or not, amount, refund.
4. ID / prescription requirement.
5. Return/pick-up procedure and who covers transport.
6. Late-return rules and how a "day" is counted.
7. Damage/loss liability.
8. Electricity cost and power-cut guidance.
9. Delivery fee, hours/lead time, covered districts, delivery outside Tbilisi, office pick-up.
10. Whether the "daily rate × days" tables (1/3/7/14/30 days) are acceptable (assumes no discount and no extra fees).

**Sales / warranty (`/garantia/`, sales product pages)**:
1. Warranty start date, scope (device only? accessories?), exclusions, repair vs replacement, where service happens, documents given.
2. Whether delivery/installation is offered for purchases (and its price).
3. Whether the sale price includes accessories (cannula, mask, humidifier bottle…).
4. Whether 24/7 support applies to buyers after the sale.
5. Product availability (`InStock` removed from schema); `itemCondition` (new/used) not published.

**Company / trust (`/shesakheb/`)**: legal entity name, years in business, medical-device licences/registrations, team, customers served — all omitted.

**Contact (`/kontakti/`)**: office opening hours / whether customers may visit; no `openingHours` schema emitted (only the 24/7 technical-support `ContactPoint`).

**Product specs (`/tsodna/5-da-10-litri/`)**: model-level specifications (maximum flow, power consumption, noise, size, weight). The article explains "5 / 10 liter" only as a general naming convention and flags it for medical review.

**Terminology**: the Georgian word "სატურატორი" is rendered in English as "pulse oximeter (saturation meter)" — consistent with the old site translation and with the accessories photo. Please confirm.

### Claims already on the *existing* site that are not in the brief's verified list
Left unchanged (not touched by this task) but worth confirming:
- "new accessories" / "ახალი აქსესუარები" / "გადმოგეცემათ ახალი საჭირო აქსესუარებით" (home page, 3 places). New pages avoid the word "new".
- "instruction/explanation of use at handover" (existing FAQ) — reused on new pages.
- "devices are designed for continuous long-term operation" — reused in FAQ.
- Home page `areaServed` includes "Country: საქართველო" while delivery is only stated for Tbilisi.
- `priceRange: "₾10–₾2200"` in the MedicalBusiness node (derived from verified prices).
- The home page lists medical use cases (chronic lung disease, pneumonia, etc.) — these should receive the same medical-expert review as the new articles.

---

## 8. Publishing notes & risks
- Article `datePublished`/`dateModified` are set to **2026-11-22** (the date of this change). Adjust to the real publication date. `author` is the Organization (no invented people); no `reviewedBy` is emitted until a medical reviewer exists.
- The articles' review banners say medical review is *required*. Once a qualified reviewer signs off, update the banner, add `reviewedBy`/`lastReviewed` schema, and change the meta line.
- Product pages for 5 L and 10 L are necessarily similar because no model specs were provided; differentiation comes from price, cross-comparison and FAQ wording. Adding verified specs would strengthen both pages.
- Georgian URL slugs are transliterated Latin (as specified), e.g. `/qiraoba/`, `/tsodna/…`.
- Repo-root hygiene (not changed): `Jangbadisaparati.docx` and six `*.jfif` files at the root are publicly served by GitHub Pages; consider removing or moving them. `images/hero-mobile.png` is untracked and unused.
- Internal links are root-absolute (`/qiraoba/…`) like the original pages, so previews must be served from the domain root (e.g. `python -m http.server` in the repo root), not opened via `file://`.

## 9. Suggested post-deploy checklist
1. Submit `https://jangbadisaparati.ge/sitemap.xml` in Google Search Console; request indexing for the new hubs.
2. Run Rich Results Test on one page per type (rental product, sales product, FAQ, article).
3. Verify hreflang with a crawler (Screaming Frog / Sitebulb).
4. Set `SITE_ANALYTICS_ID` if analytics are wanted; check `contact_click` events.
5. Resolve the owner-confirmation list above and delete the comments/placeholder wording as items are confirmed.
6. Convert images to WebP/AVIF and add `<picture>` once files exist in `images/webp/`.
