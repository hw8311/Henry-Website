# PRD – Henry Wilke Portfolio (AI System Architect)

## Original Problem Statement
Modular, modern multi-page website for Henry Wilke (AI System Architect). Focus: technical SEO, performance, dual-language DE/EN, admin dashboard, GEO optimization for LLM citations.

## Architecture
- Frontend: React 19, Tailwind, Framer Motion, Context API i18n
- Backend: FastAPI, Motor (MongoDB), PyJWT
- Production: https://ai-strategist-12.emergent.host (custom domain wilke-solutions.com per DNS at Namecheap)
- Key files: `frontend/src/data/translations.js`, `frontend/src/pages/*.jsx`, `frontend/src/components/Navigation.jsx`, `backend/server.py`, `frontend/public/sitemap.xml`, `index.html`

## Pages
Home, Leistungen, Referenzen, Blog (+3 articles), Über, Automatisierung, **FAQ (GEO-optimized, 15 questions)**, Whitepaper, Kontakt, Impressum, AGB, Datenschutz, Admin

## Key API Endpoints
- `POST /api/contact`
- `POST /api/whitepaper/download` (URL via `WHITEPAPER_DOWNLOAD_URL` env)
- `POST /api/admin/login`, `GET /api/admin/contacts`

## DB Schema
- `contact_submissions`: `{name, email, message, created_at, status}`
- `whitepaper_downloads`: `{email, name, company, whitepaper, created_at, source}`

## Completed Work
### 2026-05 (current session)
- **FAQSchema-Komponente** extrahiert nach `src/components/seo/FAQSchema.jsx` (vorher inline in FAQPage). Wiederverwendbar, single source of truth für FAQ JSON-LD. In FAQPage als `<FAQSchema />` direkt vor Hero eingebunden.
- **Sitemap-Index** unter `/sitemap_index.xml` + bereinigte `sitemap.xml` (15 URLs, alle auf `wilke-solutions.com`). robots.txt aktualisiert.
- **FAQ page** at `/faq` with 15 GEO-optimized Q&A (Inverted-Pyramid, EU AI Act, DSGVO, ProdHaftG, BAFA/Digital Jetzt). Rich JSX: tables, numbered lists, blockquotes, ASCII diagrams. shadcn Accordion. FAQPage JSON-LD via dedicated FAQSchema component. Mobile-Hyphenation für „Prozess-automatisierung".
- **Email update**: `henry-triangle@outlook.com` → `info@wilke-solutions.com` (Impressum, Datenschutz, Kontakt, Footer)
- **SEO keyword integration**: "KI-Agenten für Prozessautomatisierung" (HomePage positioning), "ROI von KI-Projekten im Mittelstand" (Leistungen Entscheidungsintelligenz), "DSGVO-konforme KI (Souveräne KI)" (Leistungen Strategische KI-Architektur)
- **Pre-deployment cleanup**: `.gitignore` no longer blocks `.env`; hardcoded whitepaper URL moved to `WHITEPAPER_DOWNLOAD_URL` env var
- **Health check**: ✅ PASS (no blockers)

### Earlier
- Hero LCP optimization (removed TypingText, single static H1)
- Client testimonials (Google-Review style)
- Technical SEO: sitemap.xml, robots.txt, canonical, hreflang, JSON-LD Person+Organization
- Location updates in legal pages (Rostock → New York)

## Backlog
- P2: Email forwarding for contact form (Resend with DKIM/SPF)
- (Note) Concrete texture background still present in CSS (`#concrete-texture-layer`) — user requested its removal in earlier session as "Fertig und aus"; not auto-removed pending explicit confirmation

## Credentials
- Admin Password: `5U7I35H3XC` (in `backend/.env` as `ADMIN_PASSWORD`)
- Login: `POST /api/admin/login` with `{password}`
