# Coca-Cola-Inspired Concept Poster & Single-Page HTML Experience — Visual Direction Plan

**Research-only deliverable.** No code, images, or fonts were copied from Coca-Cola or third-party sites. All implementation requires the captain's later selection.

---

## 1. Research methodology

I searched public web sources for three categories:

1. **Current high-quality brand/editorial poster sites and creative one-page web experiences** (inspiration only).
2. **Authoritative Coca-Cola public brand, history, and product references** (factual context only).
3. **Technical implementation patterns** (scroll-driven typography, accessibility, performance, single-page builds) that can be reused as abstract principles.

I did not download, trace, or redistribute copyrighted campaign images, proprietary fonts, or site code. Every reference below is cited by URL and described as a reusable **abstract design principle** rather than as something to copy.

---

## 2. Official / authoritative Coca-Cola references (factual context)

These sources are used only to anchor the concept in verifiable public brand history and identity principles. They are **not** used as visual templates to reproduce.

| Source | What it provides | Reusable as abstract principle |
|--------|------------------|-------------------------------|
| [The Coca-Cola Company — *Coca-Cola Sharpens Its Identity Under One Bold Visual System*](https://www.coca-colacompany.com/media-center/coca-cola-sharpens-its-identity-under-one-bold-visual-system.html) | Official July 20 2026 announcement of a global visual identity refresh built around the red-and-white palette, Spencerian script, Dynamic Ribbon, and Arden Square; intended to make every Coca-Cola execution "unmistakably Coca-Cola" across 200+ markets. | Use a single, consistent red-white-black palette; anchor the poster around one iconic glyph/shape (the Spencerian script wordmark or a contour-bottle silhouette) and one motion motif (the ribbon). |
| [The Coca-Cola Company — *One Iconic Brand, One Iconic Look*](https://www.coca-colacompany.com/media-center/one-iconic-brand-one-iconic-look-coca-cola-sharpens-its-identity-under-one-bold-visual-system-.html) | Official framing of the 2026 refresh as a consistency system rather than a logo rewrite. | Treat the deliverable as a brand-system exercise, not a new logo design. |
| [The Coca-Cola Company — *The Coca-Cola Company Introduces Fizzion*](https://www.coca-colacompany.com/media-center/the-coca-cola-company-introduces-fizzion) | Official Adobe-powered AI design governance tool for scaling on-brand creative production. | Reinforce the value of governed, repeatable design tokens and component choices. |
| [The Coca-Cola Company — *The History of the Coca-Cola Contour Bottle*](https://www.coca-colacompany.com/about-us/history/the-history-of-the-coca-cola-contour-bottle) | The 1915 bottle-design competition, the Root Glass Company patent, the "Georgia Green" glass, and the bottle's cultural footprint (Warhol, Dali, Loewy). | A contour-bottle silhouette is a strong, historically grounded, single-shape motif that can be rendered as an original SVG. |
| [The Coca-Cola Company — *Coca-Cola Red: Our Second Secret Formula*](https://www.coca-colacompany.com/about-us/history/coca-cola-red-our-second-secret-formula) | The origin of the red-and-white pairing with Frank Robinson's Spencerian script signage; no single Pantone is officially defined, but the red disc became a "promise." | Use red as a promise/anchor; do not claim a proprietary Pantone—use a clearly named open swatch (e.g., `#F40009`) and state it is an approximation. |
| [The Coca-Cola Company — *The Birth of a Refreshing Idea*](https://www.coca-colacompany.com/about-us/history/the-birth-of-a-refreshing-idea) | Origin story: May 8, 1886, Atlanta, Jacobs' Pharmacy, five cents a glass, "Delicious and Refreshing." | A timeline anchor (1886 → today) can organize the poster narrative. |
| [JKR Global — Coca-Cola work page](https://www.jkrglobal.com/work/coca-cola) | Agency context for the 2026 refresh (secondary, not official Coca-Cola governance). | Confirms the refresh is led by an external design partner; useful only for context, not for asset reuse. |
| [Coca-Cola Licensing Guidelines (PDF)](https://peernetgroup.com/wp-content/uploads/formidable/22/Coca-ColaLicensingGuidelines.pdf) | Third-party licensing document referencing Spencerian Script usage rules and Gotham as a preferred typeface in licensee contexts. | Reinforces that any Coca-Cola-adjacent work must carry a visible **unofficial/non-commercial disclaimer** and avoid reproducing the official Spencerian script logotype. |

### Key brand facts distilled from official sources
- **Founded:** May 8, 1886, Atlanta, Georgia, by Dr. John Stith Pemberton; named and first logo penned by Frank M. Robinson.
- **Iconic assets:** Spencerian script wordmark, Dynamic Ribbon, red-and-white palette, contour bottle (patented 1915), Arden Square.
- **Brand promise:** Red equals refreshment/availability; the bottle is a cultural icon recognized by shape alone.
- **2026 refresh principle:** Make every execution "unmistakably Coca-Cola" through consistency, not novelty.

---

## 3. Third-party creative references (inspiration only)

Each reference is listed with its URL, what it does well, and the **abstract principle** we can reuse—not the expression itself.

| # | Reference | URL | What it does well | Reusable abstract principle |
|---|-----------|-----|-------------------|----------------------------|
| 1 | **Awwwards — *Website Design Inspired by Iconic Posters*** | https://www.awwwards.com/website-design-inspired-by-iconic-posters.html | Argues that poster design and microsite design share the same goal: capture attention in seconds, then deliver a clear who/what/when/where. | Poster-first thinking: the HTML page should read like a single poster at a glance before any interaction. |
| 2 | **One Page Love — *Brutalist Websites*** | https://onepagelove.com/brutalist-websites | Curates raw, high-contrast, typography-driven single-page sites with strong personality and clear information hierarchy. | Brutalist/raw layouts can make a poster feel immediate and bold; use high contrast, exposed structure, and limited polish. |
| 3 | **One Page Love — *Antwerp Poster Festival*** | https://onepagelove.com/antwerp-poster-festival | A brutalist one-pager for a poster festival with a cursor-reactive intro type feature. | Cursor proximity can be a playful, non-essential layer of interaction on desktop; always provide a static fallback for touch/reduced-motion. |
| 4 | **Qode Magazine — *Websites Inspired by Poster Aesthetics*** | https://qodeinteractive.com/magazine/websites-inspired-by-poster-aesthetics/ | Surveys poster-influenced web design across Art Nouveau, Constructivism, Swiss/International Typographic Style, psychedelia, and brutalism. | Historical poster styles are a vocabulary, not a formula; we can pick one period (e.g., Swiss/Constructivist) and adapt its grid/typography to a contemporary web layout. |
| 5 | **One Page Love — *Typographic Website Design Examples*** | https://onepagelove.com/style/typographic | Gallery of 735+ typography-first one-page sites; shows that type alone can carry a brand experience. | Large, well-set type can be the primary visual element; photography/illustration should be secondary or original. |
| 6 | **Codrops — *The Exat Microsite: Pushing a Typography Showcase to New Creative Extremes*** | https://tympanus.net/codrops/2026/04/10/the-exat-microsite-pushing-a-typography-showcase-to-new-creative-extremes/ | Case study of a scroll-driven variable-font microsite where typography itself is the interface; includes concrete implementation patterns (GSAP+ScrollTrigger, Lenis, proximity interaction, static fallback). | Typography can be the interface; scroll can be structural rather than decorative; always provide a simplified mobile/touch fallback. |
| 7 | **Codrops — *On-Scroll Typography Animations*** | https://tympanus.net/codrops/2023/01/18/on-scroll-typography-animations/ | Demonstrates transform-origin, rotation, and scale combinations for scroll-triggered type effects. | Use transform-only animations (translate/scale/rotate) for 60 fps scroll effects; respect `prefers-reduced-motion`. |
| 8 | **Awwwards — *One-Page Websites*** | https://www.awwwards.com/websites/single-page/ | Curated directory of single-page sites with scoring and design-pattern tags. | Single-page experiences should be continuous, scroll-driven, and sectioned but not paginated. |
| 9 | **One Page Love — *Inspiration*** | https://onepagelove.com/inspiration | 9,000+ one-page examples sorted by genre, style, tech, and section. | A useful reference library for pattern names (scroll effects, typographic, brutalist, minimal) but not for direct copying. |
| 10 | **CSS Design Awards — scroll-feature gallery** | https://www.cssdesignawards.com/website-gallery?feature=scroll&page=12 | Showcases scroll-animated interactive storytelling. | Scroll-based narrative can replace page navigation if progression is reversible and predictable. |

### Summary of reusable principles
- **Poster-first composition:** one dominant message, one dominant shape, one dominant color, clear hierarchy.
- **Typography-as-interface:** the type itself can carry motion and meaning.
- **Scroll as structure:** use scroll position to reveal sections predictably, not as a gimmick.
- **Fallback-first motion:** every effect (cursor, scroll, variable fonts) needs a static, reduced-motion, and touch-friendly version.
- **Historical reference:** Swiss/International Typographic Style, Constructivism, and vintage print posters provide a grid/typography vocabulary that can be modernized without copying.

---

## 4. Copyright, trademark, and asset boundaries

The following guardrails will apply to any implementation:

1. **No reproduction of official Coca-Cola assets.** Do not use the official Spencerian script logotype, the contour-bottle trademarked silhouette, campaign photography, or the Dynamic Ribbon as a literal copy. Instead, create **original SVG shapes** that evoke the contour bottle's proportions (a generic curvy bottle shape), hand-lettered or original script lettering, and a red-disc motif that is a common geometric element.
2. **Visible non-commercial / unofficial disclaimer.** The page must include a persistent footer: *“This is an independent, non-commercial concept study inspired by Coca-Cola history and design principles. It is not affiliated with, endorsed by, or sponsored by The Coca-Cola Company.”*
3. **Typefaces.** Use open-source or clearly licensed fonts only. Candidates:
   - **Playfair Display** (Google Fonts) for an elegant, high-contrast editorial headline.
   - **Inter / Manrope / Satoshi** for clean, modern body copy.
   - An original SVG logotype or custom lettering rather than the proprietary Spencerian script.
4. **Imagery.** Use original CSS/SVG/Canvas artwork (gradients, blobs, contour-like shapes, ribbon-like curves), user-supplied photos, or clearly licensed stock. No Coca-Cola campaign imagery.
5. **Code.** All markup, CSS, and JS will be original. No copying of site source from references.
6. **Performance/accessibility.** No autoplaying audio/video; motion respects `prefers-reduced-motion`; color contrast meets WCAG 2.1 AA.

---

## 5. Three creative directions

### Direction A — Heritage Poster (Swiss/Print Editorial)

**Visual thesis:** Treat the page as a single limited-edition poster about the 1886 origin of Coca-Cola, updated through a clean International Typographic Style grid. The emotional beat is reverence for craft and history; the visual beat is red, white, black, and a single Georgia Green accent.

- **Composition:** Strong 12-column grid, large top-left date block ("1886"), centered headline "Delicious & Refreshing," a bottom-right contour-inspired bottle silhouette, and a footer rail of historical facts.
- **Palette:** Coke red (`#F40009`), warm white (`#FFF8F0`), near-black (`#0A0A0A`), Georgia Green bottle accent (`#3A4A3A`) used sparingly.
- **Typography:** Playfair Display (headlines) + Inter (body). A custom-drawn SVG logotype in the spirit of Spencerian script, but clearly original.
- **Motion/interaction:** Scroll-linked reveals of the date block and headline; a subtle parallax shift on the bottle silhouette; hover state on fact-rail items flips their text color. No WebGL. Cursor effect: none.
- **Responsive behavior:** Desktop poster is a 2:3 aspect grid; tablet stacks the headline over the bottle; mobile becomes a long scroll of large type + small bottle shape.
- **Implementation approach:** Semantic HTML5 (`main`, `section`, `header`, `footer`), CSS Grid/Flex, CSS custom properties, GSAP ScrollTrigger for optional reveals, `prefers-reduced-motion` media query turns off all motion.
- **Accessibility:** Large type sizes (≥48 px headline), WCAG AA contrast, semantic headings, `aria-label` on the bottle SVG, skip link, focus-visible styles.
- **Asset/licensing needs:** Playfair Display + Inter (OFL), original SVG bottle and logotype, no stock imagery needed.
- **Risks:** May feel too conservative for a "memorable" web experience; mitigated by bold scale and a crisp reveal animation.
- **Estimated complexity:** **Low–Medium** (1–2 dev days for a polished prototype; 2–3 days for production polish).

### Direction B — Dynamic Ribbon (Kinetic Brand System)

**Visual thesis:** Build the entire page around a single fluid ribbon shape that evokes the Coca-Cola Dynamic Ribbon and the fizz of carbonation. The experience is energetic, modern, and unmistakably red.

- **Composition:** Full-bleed red canvas; a white SVG/Canvas ribbon that weaves through the viewport, carrying text along its path; a final panel resolves into a clean product-style silhouette.
- **Palette:** Coke red, white, black, silver/gray (`#B0B0B0`) for fizz/bubble accents.
- **Typography:** Manrope or Satoshi for a tech-forward sans-serif; oversized numerals and single-word statements ("1886", "Fizz", "Real Magic"). No faux Spencerian script.
- **Motion/interaction:** Scroll-driven canvas/SVG ribbon morphing; bubbles that rise as the user scrolls; mouse parallax on the ribbon (desktop only). Reduced-motion: static ribbon curves and no bubbles.
- **Responsive behavior:** Desktop uses canvas layer; tablet/mobile uses a pre-baked SVG path with CSS animations only, preserving battery.
- **Implementation approach:** HTML5 + CSS + vanilla JS Canvas 2D or SVG path animation; GSAP ScrollTrigger for sequencing; `requestAnimationFrame` with off-screen pause; no WebGL/Three.js needed.
- **Accessibility:** Strong color contrast (white on red); reduced-motion provides a static layout; `aria-hidden` on decorative canvas; a plain text version in a `<div class="sr-only">`.
- **Asset/licensing needs:** Open-source typeface only; original ribbon curves and bubble particles generated in code.
- **Risks:** Canvas motion can be heavy on low-end devices and may distract from content; needs careful performance budgets and fallbacks.
- **Estimated complexity:** **High** (3–5 dev days for the ribbon system and fallbacks; 2 days for polish).

### Direction C — Brutalist Pop (Raw Collage Poster)

**Visual thesis:** A raw, print-like collage that references the bottle as a pop-culture object—think torn paper, oversized type, Georgia Green, and a playful, anti-polished layout. The emotional beat is nostalgia and mass-culture joy.

- **Composition:** Asymmetric, overlapping blocks: a huge red disc, a tilted "1886" stamp, a torn-paper strip for the headline, and a hand-drawn bottle outline. Layout breaks the grid on purpose but still keeps a readable Z-axis.
- **Palette:** Coke red, white, black, Georgia Green, and a single yellow accent (`#FFD600`) for pop-art energy.
- **Typography:** A bold condensed sans-serif (Bebas Neue or similar OFL font) for headlines, plus a rounded sans for body. Custom lettering for the headline, not the official script.
- **Motion/interaction:** Marquee-style horizontal scrolling text strips; hover-triggered paper-tear reveals; cursor-sensitive type rotation (desktop). Touch: static stacked collage with tap-to-reveal details.
- **Responsive behavior:** Desktop is a dense collage; tablet simplifies to two-column stacked blocks; mobile becomes a single-column scroll with large stamps and one marquee at reduced speed.
- **Implementation approach:** CSS Grid with overlapping cells, CSS animations for marquees, vanilla JS for cursor proximity on headline blocks, SVG for torn edges and bottle outline.
- **Accessibility:** Marquees must be pauseable (`prefers-reduced-motion` or a pause button); ensure text never overlaps in a way that hurts readability; maintain 4.5:1 contrast on every text block.
- **Asset/licensing needs:** Bebas Neue or similar OFL font; original SVG paper textures and torn edges; no stock photos.
- **Risks:** Brutalism can quickly become unreadable; needs strong art direction and constant contrast checks. Marquees are generally discouraged for accessibility unless controllable.
- **Estimated complexity:** **Medium** (2–3 dev days for layout and interactions; 1–2 days for accessibility/contrast polish).

---

## 6. Recommended direction: Heritage Poster (Swiss/Print Editorial)

**Evidence:**
- Coca-Cola's own 2026 refresh is explicitly about making the brand "unmistakably Coca-Cola" through **clarity and consistency** rather than through more effects (source: Coca-Cola Company media center). A poster that is bold, red, white, and typographically confident delivers that consistency better than a motion-heavy experience.
- The 2021/2026 brand strategy emphasizes the **red disc** as a simple promise and the **contour bottle** as a cultural icon (source: Coca-Cola Red history article). Direction A can feature a single red disc and a single bottle silhouette as the only visual motifs.
- The reference literature (Awwwards poster-to-web article, Codrops Exat case study) consistently stresses that **poster thinking = hierarchy first**. Direction A is the only option where the static poster and the HTML page are essentially the same composition.
- **Accessibility and performance** are easiest to guarantee in Direction A because it relies on CSS transforms and semantic HTML rather than canvas or marquees. This aligns with the brief's requirement for a beautiful poster *and* a memorable one-page HTML deliverable.
- **Risk profile** is lowest while still leaving room for elegant motion (scroll reveals, parallax). It is the safest bet for a single production-quality deliverable.

**Why it fits best:**
- It reads as a poster at first glance (large date, headline, bottle, footer).
- It translates cleanly to a single-page scroll without breaking the poster composition.
- It honors the official brand's emphasis on red, white, and iconic shape without copying proprietary assets.
- It can be implemented in original HTML/CSS/SVG with no external dependencies beyond open fonts.

---

## 7. Concrete implementation plan (for the recommended Heritage Poster direction)

### 7.1 Information hierarchy

1. **Primary:** The headline "Delicious & Refreshing" + the year "1886".
2. **Secondary:** The contour-inspired bottle silhouette (original SVG).
3. **Tertiary:** A short origin statement (≤25 words) and the unofficial disclaimer.
4. **Quaternary:** Historical fact rail (3–4 micro-facts: Atlanta, Jacobs' Pharmacy, five cents, contour bottle).

### 7.2 Page sections

- **Fixed poster stage (100vh):** the poster composition.
- **Scroll reveal panel:** additional context about the 2026 refresh, the red disc, and the bottle—appears as the user scrolls, but the page remains one continuous document.
- **Footer:** disclaimer, credits, and sources.

### 7.3 Component / asset inventory

| Component | Asset | Format | License/Origin |
|-----------|-------|--------|----------------|
| Headline | "Delicious & Refreshing" | HTML text + CSS | Original copy, public domain phrasing from historical ad. |
| Year block | "1886" | HTML text | Original. |
| Bottle motif | Original contour-inspired shape | SVG | Original artwork, no trademarked likeness. |
| Red disc | Geometric red circle | SVG/CSS | Original, generic shape. |
| Body type | Inter | Web font | SIL Open Font License. |
| Headline type | Playfair Display | Web font | SIL Open Font License. |
| Decorative rule | Thin lines | CSS | Original. |
| Background texture | Subtle grain/noise | CSS/SVG | Original, no external image. |
| Scroll arrow | Animated chevron | SVG + CSS | Original. |

### 7.4 Animation states

| State | Behavior | Reduced-motion fallback |
|-------|----------|--------------------------|
| Load | Headline and date fade in + translate up (0.8s, ease-out). | Static, no translate. |
| Scroll | Bottle silhouette parallax (±60px), red disc scales slightly. | Static layout. |
| Hover (fact rail) | Text color inverts to white on red. | Same color change, no transition. |
| Focus | Focus-visible outline on interactive elements. | Same. |
| Mobile | All motion disabled; layout is static scroll. | N/A (already reduced). |

### 7.5 Responsive breakpoints

- **Desktop:** ≥1280px — full 12-column poster grid, 100vh stage.
- **Laptop:** 1024px–1279px — tighter grid, smaller headline scale.
- **Tablet:** 768px–1023px — headline centered, bottle below, fact rail becomes horizontal.
- **Mobile:** <768px — single-column scroll, headline at 12vw, bottle at 40vw, fact rail stacked.

### 7.6 Performance budget

- **Total page weight:** ≤350 KB (fonts ≤120 KB, CSS+HTML ≤30 KB, JS ≤80 KB, SVG ≤20 KB).
- **First Contentful Paint:** ≤1.2s on 4G.
- **Largest Contentful Paint:** ≤1.8s on 4G.
- **Animation frame budget:** 60 fps; only `transform` and `opacity` animated.
- **No external images** except self-hosted fonts.

### 7.7 Reduced-motion fallback

- Use `prefers-reduced-motion: reduce` to disable all transforms, parallax, and fade-ins.
- Provide a static, still poster layout that is fully readable and identical in content.
- Avoid auto-playing marquees or continuous canvas loops.

### 7.8 Semantic & accessibility requirements

- Semantic HTML: `<main>`, `<header>`, `<section>`, `<footer>`, `<h1>` for the headline, `<h2>` for secondary sections.
- `aria-label` on the bottle SVG describing it as an "original contour-inspired bottle silhouette."
- Skip link to main content.
- Focus-visible styles for keyboard users.
- Color contrast ≥4.5:1 for body text, ≥3:1 for large text.
- `prefers-reduced-motion` honored.
- Language attribute `lang="en"`.

### 7.9 Testing matrix

| Test | Desktop | Tablet | Mobile | Reduced motion | Screen reader |
|------|---------|--------|--------|----------------|---------------|
| Layout grid | Chrome, Firefox, Safari | iPad Safari, Chrome | iOS Safari, Android Chrome | Same | N/A |
| Scroll reveals | Verify 60fps | Verify no jank | Verify disabled or simplified | Verify static | N/A |
| Contrast | axe / Lighthouse | axe | axe | axe | N/A |
| Keyboard nav | Tab order | Tab order | N/A | N/A | N/A |
| Screen reader | VoiceOver macOS | VoiceOver iPad | VoiceOver iOS | N/A | NVDA/VoiceOver |
| Performance | Lighthouse ≥90 | Lighthouse ≥90 | Lighthouse ≥85 | Lighthouse ≥90 | N/A |
| Print / poster | Print to PDF at A2 | N/A | N/A | N/A | N/A |

### 7.10 Staged delivery / acceptance criteria

| Stage | Deliverable | Acceptance criteria |
|-------|-------------|---------------------|
| 1. Static poster | A2-ratio static HTML/CSS composition in the browser. | Matches selected direction, brand colors, typography, and disclaimer present. |
| 2. Responsive pass | Breakpoints implemented. | Layout is readable and beautiful at 1280px, 768px, and 375px. |
| 3. Motion pass | Scroll reveals + parallax. | 60fps on desktop, graceful fallback on mobile/reduced-motion. |
| 4. Accessibility pass | A11y audit. | WCAG 2.1 AA, Lighthouse a11y ≥90, keyboard navigable. |
| 5. Final polish | Asset compression, font subsetting, print test. | Page weight ≤350 KB, prints cleanly as a poster, all sources cited. |

---

## 8. Unresolved captain decisions

The implementation plan exposes the following decisions that belong to the captain. These have been registered through the decision-hold lifecycle so they survive teardown.

1. **Creative direction selection** — Which of the three directions (Heritage Poster, Dynamic Ribbon, Brutalist Pop) should be implemented?
2. **Asset sourcing** — Should the bottle silhouette and any decorative graphics be supplied by the user, generated as original SVG/Canvas by the implementer, or sourced from clearly licensed stock?
3. **Motion ambition** — Should the deliverable include the recommended scroll/parallax motion, or default to a static poster-first experience with only hover/focus micro-interactions?

A private Lavish review artifact has been created at `/Users/cyril/code/firstmate/data/coca-cola-poster-research/visual-direction-plan.html` and is open for review at **http://127.0.0.1:4387/session/cdf81e6981de8e0b** with structured controls for the captain to compare the three directions and submit a preference. A self-contained exported copy is also saved as `visual-direction-plan-export.html` in the same directory and can be opened directly without the Lavish server.

---

## 9. Commands and evidence

### Web research executed

```bash
# Searches for creative references and Coca-Cola brand sources
web_search queries=[...]  # see section 2–3 sources
fetch_content https://www.coca-colacompany.com/media-center/coca-cola-sharpens-its-identity-under-one-bold-visual-system.html
fetch_content https://www.coca-colacompany.com/about-us/history/coca-cola-red-our-second-secret-formula
fetch_content https://www.coca-colacompany.com/about-us/history/the-history-of-the-coca-cola-contour-bottle
fetch_content https://www.coca-colacompany.com/about-us/history/the-birth-of-a-refreshing-idea
fetch_content https://www.awwwards.com/website-design-inspired-by-iconic-posters.html
fetch_content https://onepagelove.com/brutalist-websites
fetch_content https://onepagelove.com/antwerp-poster-festival
fetch_content https://onepagelove.com/style/typographic
fetch_content https://tympanus.net/codrops/2026/04/10/the-exat-microsite-pushing-a-typography-showcase-to-new-creative-extremes/
fetch_content https://tympanus.net/codrops/2023/01/18/on-scroll-typography-animations/
fetch_content https://qodeinteractive.com/magazine/websites-inspired-by-poster-aesthetics/
```

### Files created

- `/Users/cyril/code/firstmate/data/coca-cola-poster-research/report.md` (this report)
- `/Users/cyril/code/firstmate/data/coca-cola-poster-research/visual-direction-plan.html` (Lavish review artifact)

### Decision-hold lifecycle

- Origin ID: `coca-cola-poster-research`
- Decision keys registered: `creative-direction`, `asset-sourcing`, `motion-ambition`
- Completion gate: `fm-decision-hold.sh complete coca-cola-poster-research creative-direction asset-sourcing motion-ambition`

---

## 10. Recommendation summary

**Implement Direction A — Heritage Poster (Swiss/Print Editorial).** It is the only option that is equally strong as a static poster and as a single-page HTML experience, it aligns with Coca-Cola's own 2026 emphasis on consistency and clarity, and it carries the lowest accessibility/performance risk while still allowing elegant, original scroll-driven motion. The two alternatives (Dynamic Ribbon and Brutalist Pop) are viable but higher-risk and should only be selected if the captain explicitly prioritizes kinetic energy or raw collage energy over poster clarity.
