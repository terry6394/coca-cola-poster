# Heritage Poster — Coca-Cola Inspired Concept

An independent, non-commercial concept poster and responsive single-page HTML experience inspired by public Coca-Cola brand history and design principles. Built as an original Heritage Poster in a Swiss / print-editorial style.

**Live preview:** open `index.html` in any modern browser, or serve the repository root with any static file server.

## Design contract

- **Palette:** classic red (`#F40009`), warm white (`#FFF8F0`), near-black (`#0A0A0A`). Georgia Green (`#3A4A3A`) is used only as a small historical accent.
- **Typography:** Playfair Display for display type, Inter for body text. Both are loaded from Google Fonts (OFL).
- **Artwork:** original CSS/SVG created for this concept. No official Coca-Cola wordmark, contour bottle, Dynamic Ribbon, campaign photography, or proprietary fonts are used.
- **Motion:** restrained scroll reveals and subtle parallax. A complete static fallback is active when `prefers-reduced-motion` is set.
- **Accessibility:** semantic HTML, skip link, focus-visible styles, `aria-label` on the bottle SVG, and WCAG 2.1 AA contrast targets.
- **Disclaimer:** a visible independent, non-commercial, unofficial concept disclaimer is included in the footer.

## Local development

```bash
# Option 1: open directly
open index.html

# Option 2: serve with any static file server
python3 -m http.server 8000
# then visit http://localhost:8000

# Option 3: Node-based static server
npx serve .
```

## Testing

```bash
npm install
npm test
```

Tests check:
- Rendered semantic landmarks, keyboard skip navigation, credits, and disclaimer.
- Responsive containment across desktop, laptop, tablet, and mobile viewports.
- Computed color contrast across viewports and footer hover states.
- Actual network requests, local asset responses, motion preferences, and A2 PDF output.

## Deployment

The site is deployment-neutral static HTML/CSS/JS. Host the repository root on any static hosting service (GitHub Pages, Netlify, Vercel, Cloudflare Pages, S3, etc.).

## Sources & credits

- Concept and research: see `docs/RESEARCH.md`.
- Historical context: [The Coca-Cola Company — history](https://www.coca-colacompany.com/about-us/history) and [2026 visual identity refresh](https://www.coca-colacompany.com/media-center/coca-cola-sharpens-its-identity-under-one-bold-visual-system.html).
- Fonts: [Playfair Display](https://fonts.google.com/specimen/Playfair+Display) and [Inter](https://fonts.google.com/specimen/Inter) via Google Fonts.
- All SVG and CSS artwork is original.

## Disclaimer

This is an independent, non-commercial, unofficial concept study. It is not affiliated with, endorsed by, or sponsored by The Coca-Cola Company.
