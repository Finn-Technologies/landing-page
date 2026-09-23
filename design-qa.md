# Design QA

**Findings**

- No actionable P0, P1, or P2 findings remain after the normalized comparison.
- [P3] Safari screenshot includes browser chrome, a pointer/status overlay, and tab labels. These are browser artifacts and are excluded from the page comparison.

**Open Questions**

- The Figma source is a 1440 x 1024 desktop frame. Safari was verified at its available 1224 x 768 window size, then normalized by scaling the source to 1224 px wide and cropping both images to the visible content region.
- The implementation keeps the source's desktop geometry at the 1440 px design size and applies responsive margins/stacking below that size.

**Implementation Checklist**

- [x] Match Instrument Sans typography and measured type sizes.
- [x] Match `#F8F8F8` canvas and `#FFFFFF` navigation pill.
- [x] Match navigation item spacing, active pill, and labels.
- [x] Match intro position, two-line hierarchy, and 50% subtitle color.
- [x] Match card dimensions, asymmetric corner radii, 5% black overlay, image crops, labels, and arrows.
- [x] Verify Home, FinnAI, Contact, and Privacy Policy navigation.
- [x] Verify long-form content remains available below the 1024 px design frame.

**Follow-up Polish**

- [P3] Consider a dedicated mobile Figma frame if a separate mobile composition is needed.

**Evidence**

- Source visual truth: `/Users/abhi/Downloads/Home.png` (Figma `Home` frame export, 1440 x 1024).
- Source vector export: `/Users/abhi/Downloads/Home.svg`.
- Implementation screenshot: `/var/folders/pn/f_p_k7xn3r521sbj5shz3c4m0000gn/T/com.openai.sky.CUAService/Safari Screenshot 2026-09-23 at 12.39.32 PM.jpeg`.
- Full-view comparison: `/tmp/finn-design-qa-composite2.png`.
- Viewport/state: Home route at `http://localhost:5173/`, light theme, desktop layout, Safari window screenshot 1224 x 768; source normalized to 1224 px wide with 0.85 density scaling and a 694 px content crop.
- Focused region comparison: navigation, intro, and both product cards are readable in the combined evidence above; no separate crop was needed because those regions are the complete above-the-fold composition.
- Primary interactions tested: Home, FinnAI, Contact, and Privacy Policy navigation; card links resolve to `/flux` and `/finnos`.
- Console errors checked: no page-level runtime errors observed in Safari accessibility state after load.
- Build note: `npm run lint` passes. The repository's existing Vite 8/Node 18 build incompatibility and pre-existing reporting test failure are unrelated to this redesign.

**final result: passed**
