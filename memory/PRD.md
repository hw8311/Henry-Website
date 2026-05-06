# PRD – Henry Wilke Portfolio (AI System Architect)

## Original Problem Statement
Create a high-quality, modern, modular and maintainable multi-page website for Henry Wilke (AI System Architect). Focus areas: technical SEO, performance (LCP), customer testimonials, hero visual polish, dual-language support (DE/EN), admin dashboard.

## Product Requirements
- Dual-Language Support (DE/EN)
- High-end AI-Architect aesthetic (Dark base, Satoshi font, Cyan/Gold accents)
- Admin dashboard (leads + contact submissions, JWT auth)
- Strong technical SEO: sitemap.xml, robots.txt, JSON-LD (Person + Organization), canonical URLs, hreflang, meta tags, Google site verification
- Optimized LCP (no render-blocking animations on hero H1)
- Customer testimonials in Google-Review style

## Architecture
- Frontend: React 19, Tailwind CSS, Framer Motion, Context API for i18n
- Backend: FastAPI, Motor (MongoDB async), PyJWT
- Key files:
  - `/app/frontend/src/data/translations.js`
  - `/app/frontend/src/pages/HomePage.jsx`, `LeistungenPage.jsx`
  - `/app/backend/server.py`
  - `/app/frontend/public/sitemap.xml`, `robots.txt`, `index.html` (SEO meta + JSON-LD)

## Key API Endpoints
- `POST /api/contact`
- `POST /api/whitepaper`
- `POST /api/admin/login`
- `GET /api/admin/leads` (JWT-protected)

## DB Schema
- `contact_submissions`: `{name, email, message, created_at, status}`
- `whitepaper_downloads`: `{email, name, company, whitepaper, created_at, source}`

## Completed Work (2026-02)
- SEO keyword integration: "KI-Agenten für Prozessautomatisierung" (HomePage positioning), "ROI von KI-Projekten im Mittelstand" (Leistungen – Entscheidungsintelligenz card), "DSGVO-konforme KI (Souveräne KI)" (Leistungen – Strategische KI-Architektur card) – organic weaving in DE + EN, no layout changes
- Hero LCP optimization: removed TypingText, single static H1 "Henry Wilke – AI-Systemarchitekt für KMU"
- Client testimonials section (5 Google-Review-style entries) below hero
- Technical SEO: sitemap.xml, robots.txt, canonical, hreflang, JSON-LD Person+Organization, Google site verification
- Location update across Impressum/AGB/Datenschutz (Rostock → New York)

## Backlog / Next Actions
- P2: Email forwarding for contact form (user said "Um die Mail kümmern wir uns später")
- OBSERVED (not requested): Leistungen-Seite und viele Sections rendern aktuell einen sichtbaren Concrete-Texture-Hintergrund über `#concrete-texture-layer` in `/app/frontend/src/index.css`. Laut vorheriger Übergabe sollte dieser entfernt sein ("Fertig und aus"). User bitte entscheiden, ob Layer entfernt werden soll.

## Credentials
- Admin Dashboard Password: `5U7I35H3XC`
- Admin login endpoint: `POST /api/admin/login`
