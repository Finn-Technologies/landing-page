# Design QA

## Design reference

Source of truth: the Figma `Home` frame at `/Users/abhi/Downloads/Home.png` (1440 x 1024).

Measured from that frame:

- Nav pill: 524 px wide, 50 px tall, white, active item on a light grey pill, 4 links, regular weight.
- Intro block: left at x=100, top at 145, two lines of 24 px Instrument Sans — first line black, second line grey.
- Cards: 610 x 350, top at 248, 20 px gutter, 25 px radius on the outer top corner and 10 px on the others.
- There is no uppercase micro-label anywhere in the frame, and no letter-spacing other than zero.

## Findings

- No actionable P0, P1, or P2 findings remain.
- [P3] The FinnAI device asset (`public/finnai-phone.png`) is a genuine fresh-chat state, so the phone screen is mostly empty. Kept as a real capture rather than replaced with an invented conversation.
- The Figma nav lists Home, FinnAI, Contact and Privacy Policy. The site keeps Finn Code and Team in the nav as well so those pages stay reachable; everything is still listed in the footer.

## This iteration

- Rebuilt the type system on the home screen's own language: one title size (24 px), regular weight only, no uppercase, no letter-spacing. Titles no longer scale with the viewport.
- Replaced every section header with the home pattern: a sentence-case title plus a grey description, in a single column at the page margin. The label-column-plus-content grid is gone.
- Removed the numbered blocks that read as generated filler: the "01/02/03" principles band, the feature numbering, the execution-path numbering and the team row numbers.
- Removed the zoom on both card backgrounds. The card art is now cropped to the card's own 610:350 aspect, so the browser neither scales nor crops it (`object-fit: cover`, `transform: none`).
- That crop also removed a **MagicPattern watermark** baked into the bottom-right of both source PNGs, which the previous zoom had been hiding. The watermark was visible once the art was shown whole; the clean region is now the asset.
- Renamed the second card from "Nomad" to "Finn Code": label, `aria-label`, background asset and link target (`/finn-code`).
- Converted the card art to WebP: 598 KB + 638 KB PNG became 86 KB + 71 KB, an 87% reduction, with the film grain and gradient intact.
- Removed the "What we make" index from the home page. The two cards in the first frame already present FinnAI and Finn Code, so the list was repeating them. Home is now the frame, "Who we are", the team line, and the closing band. FinnOS remains reachable from the footer and still has its own page.

## Verification evidence

- Computed typography audit across `/`, `/finnai`, `/finn-code`, `/finnos`, `/team`, `/support`, `/privacy`: every sampled element resolves to `"Instrument Sans"`, every `font-weight` is `400`, every `text-transform` is `none`, every `letter-spacing` is `normal`. Largest title is 24 px; the only larger text is the 28 px card label from the Figma frame.
- Card rendering on the production build: natural 927 x 532 shown at 541 x 310 with `object-fit: cover` and `transform: none`.
- Font proof: `document.fonts` reports 4 loaded faces and the page-asset inventory lists both `.woff2` files with `resource` provenance from the site's own origin. No `fonts.googleapis.com` or `fonts.gstatic.com` reference exists in `dist/`.
- Viewport checks: 1280 x 720 desktop and 390 x 844 phone including the mobile menu open state. The temporary viewport override was reset.
- Route probes returned HTTP 200 for `/`, `/finnai`, `/finn-code`, `/finnos`, `/team`, `/privacy`, `/terms`, `/support`, `/flux` and `/contact`; `/finnai-card.webp` and `/finn-code-card.webp` return 200 `image/webp`.
- `npm test` 4/4, `npm run lint`, `npm run build` and `git diff --check` all pass. Stylesheet and JSX cross-check clean: no dead CSS rules and no unstyled classes.

## Mobile menu

- The header no longer draws a second panel. Opening the menu expands the existing pill: `.nav-links` animates `max-height` from 0 to 260px inside the pill, so the pill grows from 50px to 272px and the header grows with it. `padding` and `opacity` animate on the same curve.
- `visibility` runs alongside `max-height`, delayed by the transition on close, so the collapsed links cannot be focused or read by assistive tech while hidden.
- The text labels are replaced with two Hugeicons glyphs — `Menu01Icon` and `Cancel01Icon` through `@hugeicons/react`. The button keeps its `aria-label`, `aria-expanded` and `aria-controls`, and both glyphs are `aria-hidden`.
- The glyphs animate into each other: the menu icon rotates to 90deg and fades out while the close icon rotates in from -90deg, over 200ms (opacity) and 260ms (transform). The button is a fixed 44 x 50 target so nothing shifts.
- Verified end states: closed pill 50px with `max-height: 0` / `visibility: hidden`, menu glyph at opacity 1 and close glyph at opacity 0; open pill 272px with the close glyph at opacity 1 and the menu glyph rotated 90deg at opacity 0. Computed transition on `.nav-links` reads `max-height, padding, opacity, visibility` at `0.34s, 0.34s, 0.24s, 0s`.
- `prefers-reduced-motion` now also zeroes `transition-delay`, so the reduced-motion path collapses instantly instead of waiting out the visibility delay.

## Top bar insets

- The pill had a fixed `min(690px, 100vw - 40px)` width, which left roughly 187px of dead space after Contact. It is now `width: fit-content`, so the bar hugs its own content and the trailing gap is gone.
- The four insets around the bar's text are equal. Pixel scan of the 1280px render at `devicePixelRatio` 1: left 18, right 18, top 18, bottom 19 (the extra pixel on the baseline is glyph antialiasing, not layout). The pill measures 500 x 50, spanning x 390..890 at y 35..85.
- The insets come from `padding: 0 7px` on `.nav-pill` plus the 9px the brand and links carry: 7 + 9 + ~2px side bearing = 18, matching the 18px the cap height sits from the top and bottom of the 50px bar.
- Mobile is unchanged: the `max-width: 760px` block restores `padding: 0 8px` and `width: 100%`, so the expanded header still fills the 350px pill from a 390px viewport.

## Header blur

- `.nav-pill` now carries `backdrop-filter: blur(14px) saturate(160%)` plus the `-webkit-` form for Safari, behind a translucent fill token: `rgba(255, 255, 255, 0.82)` light and `rgba(28, 28, 28, 0.82)` dark. A new `--nav-pill-solid` backs a `@supports not (...)` fallback so engines without backdrop blur keep an opaque pill.
- The alpha was set by contrast, not feel. At `0.72` the muted link colour measured 4.13:1 over the brightest card; at `0.82` it measures 5.04:1, and 5.93:1 over the purple card and the page gap, clearing the 4.5:1 bar for 18px text against `#a5a5a5` in dark mode.
- The header previously centred itself with `transform: translateX(-50%)`. A transformed ancestor can stop Safari resolving the backdrop, so it now centres with `left: 0; right: 0; margin-inline: auto`, which leaves the pill at the identical position: x 390, 500 x 50 at 1280.
- Verified in Safari on the local dev server with the pill crossing both cards: the artwork behind the pill is visibly frosted and the edge between the two cards reads as a soft boundary, while the labels stay crisp. Also checked in the in-app browser at 1280 x 800 and 390 x 844. `npm run build` emits both the prefixed and unprefixed blur plus the `@supports` fallback.

**final result: passed**
