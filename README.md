# AFTC® Group — Website

A multi-page marketing website for **AFTC® Group** — the acrylic foam tape
specialists — built directly from the **AFTC Brand & Design System v1.0**.

## Design system

Implemented faithfully from the brand guidelines:

- **Colour** — AFTC Orange `#E87308` as the signal accent, a neutral grey
  system (`#76777A`, `#333333`, `#B9BABC`, `#F5F5F6`) for text and structure,
  charcoal imagery overlays and a pale-blue (`#DBEEF3`) support tint. Usage
  ratio ~60% neutral / 25% grey / 15% orange.
- **Typography** — Albert Sans (headings & body), Oswald (uppercase labels &
  UI micro-copy), Varela Round (rounded accent).
- **Components** — fully-rounded pill buttons with uppercase Oswald labels,
  circular icon buttons, category pills, 8px-radius cards, an 8px spacing
  scale, industrial photo + dark-overlay hero, and a solid-orange feature
  panel.
- **Logo** — the AFTC wordmark in heavy italic geometric sans with the
  orange diagonal slash (`assets/img/logo.svg`), recoloured for dark
  surfaces via a CSS custom property.
- **Navigation** — Company · Applications · Products · Downloads · Services
  (dropdowns), matching the brand's primary nav.

## Pages

| File | Purpose |
| --- | --- |
| `index.html` | Home — hero, about, brand principles, applications, products, feature panel, services, downloads |
| `products.html` | Full SilverTape™ range with a selection/comparison table |
| `applications.html` | Industry sectors: automotive, solar, signing, construction, transportation, electronics, aerospace, appliances |
| `contact.html` | Contact form and company details |

## Assets

- `assets/css/style.css` — the complete design-system stylesheet (tokens,
  components, layout, responsive rules)
- `assets/js/main.js` — mobile nav toggle, scroll-reveal animation, demo form
- `assets/img/logo.svg` — AFTC wordmark

## Run locally

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

No build step — plain HTML/CSS/JS. Fonts load from Google Fonts.

## Content source

Company information and the SilverTape™ product range reflect publicly
available details from [aftcgroup.com](https://www.aftcgroup.com). Photography
is represented with charcoal-gradient placeholder panels per the brand's
imagery direction; swap in production imagery as needed.
