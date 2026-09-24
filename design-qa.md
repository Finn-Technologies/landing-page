# Design QA

**Findings**

- No actionable P0, P1, or P2 findings remain after the typography unification pass.
- [P3] The FinnAI device asset (`public/finnai-phone.png`) is a genuine fresh-chat state, so the phone screen is mostly empty. It is kept as a real product capture rather than replaced with an invented conversation.
- The measured Figma home composition is unchanged above the fold: centered navigation pill, `#F8F8F8` canvas, intro block, two gradient cards, asymmetric corners, labels, and arrows.

**Iteration Scope**

- Replaced the previous display-type system (124 px heroes, `-0.068em` tracking, full-height centered heroes) with the home page's own scale as the site ceiling.
- Titles are now 24–32 px on every route; descriptions are 15–16 px. No heading renders larger than the home page's 28 px card label.
- Removed every negative letter-spacing declaration. Positive tracking remains only on small uppercase labels.
- Self-hosted Instrument Sans so the typeface no longer depends on the Google Fonts CDN.

**Open Questions**

- The Figma source is a 1440 x 1024 desktop frame. Browser captures use a 1280 x 720 viewport; the normalized comparison remains the design-scale reference.
- Legal pages use a single 700 px measure so headings, copy, and rules share one column; the nav pill is 690 px, so the two are nearly coincident by design.

**Implementation Checklist**

- [x] Preserve the Figma-derived home first frame.
- [x] Self-host Instrument Sans (latin, latin-ext, italic) and preload it from `index.html`.
- [x] Introduce a shared type scale: `--text-display` 32, `--text-title` 24, `--text-heading` 18, `--text-body` 16, `--text-base` 15, `--text-meta` 12.
- [x] Left-align every page hero onto the same `--page` measure as the home sections.
- [x] Rebuild section rhythm on one `--section-y` and `--column-gap` pair and drop the 190 px section padding.
- [x] Convert the closing sections into a title-left / actions-right band.
- [x] Fix the device-stage captions being covered by the phone image (captions now sit in flow under each device).
- [x] Standardize both device stages to the same 290 x 520 render.
- [x] Add `:focus-visible` outlines, `::selection` colour, `text-wrap: balance/pretty`, and scroll padding for the fixed nav.
- [x] Keep the dark colour scheme in step with the new tokens.

**Verification Evidence**

- Production preview: `http://127.0.0.1:4173/` (built from `dist/`), plus the dev server on `5173`.
- Computed-typography audit across `/`, `/finnai`, `/finn-code`, `/finnos`, `/team`, `/support`, `/privacy`: every sampled heading and body element resolves to `"Instrument Sans"`; largest observed size is 32 px (`.page-hero h1`, `.legal-header h1`), every sampled `letter-spacing` is `normal` or a positive label value.
- Font proof: `document.fonts.status === "loaded"` with 4 registered faces, and the page-asset inventory lists `instrument-sans-latin.woff2` and `instrument-sans-latin-ext.woff2` with `resource` provenance — both fetched from the site's own origin. `rg` finds no `fonts.googleapis.com` or `fonts.gstatic.com` reference in `dist/`.
- Viewport checks: 1280 x 720 desktop, 900 x 800 tablet, and 390 x 844 phone, including the mobile menu open state. The temporary viewport override was reset afterwards.
- Interaction checks: mobile menu toggle, `details` disclosure on FinnOS, and client-side navigation between all routes.
- Fixed in this pass: FinnOS hero button spacing (`.page-hero-inner > .button`), device caption occlusion, and the legal measure mismatch.
- Route probes returned HTTP 200 for `/`, `/finnai`, `/finn-code`, `/finnos`, `/team`, `/privacy`, `/terms`, `/support`, `/flux`, and `/contact` on the production preview. `/fonts/*.woff2` returns 200 with `font/woff2`.
- `npm test` passes all 4 reporting tests; `npm run lint` passes; `npm run build` passes with Vite 6; `git diff --check` passes.

**final result: passed**
