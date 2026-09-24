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

## Verification evidence

- Computed typography audit across `/`, `/finnai`, `/finn-code`, `/finnos`, `/team`, `/support`, `/privacy`: every sampled element resolves to `"Instrument Sans"`, every `font-weight` is `400`, every `text-transform` is `none`, every `letter-spacing` is `normal`. Largest title is 24 px; the only larger text is the 28 px card label from the Figma frame.
- Card rendering on the production build: natural 927 x 532 shown at 541 x 310 with `object-fit: cover` and `transform: none`.
- Font proof: `document.fonts` reports 4 loaded faces and the page-asset inventory lists both `.woff2` files with `resource` provenance from the site's own origin. No `fonts.googleapis.com` or `fonts.gstatic.com` reference exists in `dist/`.
- Viewport checks: 1280 x 720 desktop and 390 x 844 phone including the mobile menu open state. The temporary viewport override was reset.
- Route probes returned HTTP 200 for `/`, `/finnai`, `/finn-code`, `/finnos`, `/team`, `/privacy`, `/terms`, `/support`, `/flux` and `/contact`; `/finnai-card.webp` and `/finn-code-card.webp` return 200 `image/webp`.
- `npm test` 4/4, `npm run lint`, `npm run build` and `git diff --check` all pass. Stylesheet and JSX cross-check clean: no dead CSS rules and no unstyled classes.

**final result: passed**
