# Shreeja AI — Technical Architecture Reference

> **For Senior Technical Architects & AI Agents**: This document is the single source of truth for all architectural decisions, design patterns, and implementation context. Reference this before every bug fix, feature addition, or refactor.

---

## 1. Project Identity

| Attribute | Value |
|-----------|-------|
| **Company** | Shreeja AI |
| **Tagline** | "Trust Layer for AI Agents" |
| **Domain** | shreejaai.com |
| **Founded** | 2025, Delhi, India |
| **Contact** | hello@shreejaai.com |
| **Project Type** | Static marketing website |
| **Repo Layout** | Source: repo root; Published: `/docs/` folder |
| **Hosting** | GitHub Pages (custom domain via CNAME) |
| **Build Step** | None — pure HTML/CSS/JS, zero dependencies |

---

## 2. Product Portfolio

### 2.1 AGR — Agent Governance at Runtime
- **Category**: AI agent policy & control layer
- **Core Capabilities**: Policy engine, permission orchestration, audit-grade tracing
- **Process**: 4-step runtime governance loop (Connect → Define → Enforce → Audit)
- **Use Cases**: Support workflows, copilots, finance ops, knowledge retrieval, multi-agent orchestration
- **Page**: `/agr.html`

### 2.2 Company Box — Secure Ops Hub
- **Category**: Operational security & secrets management
- **Core Capabilities**: Role-aware access control, structured secrets workflow, delivery traceability
- **Process**: 4-step ops lifecycle (Onboard → Assign → Operate → Trace)
- **Use Cases**: Internal platforms, security-conscious teams, regulated environments
- **Page**: `/company-box.html`

### 2.3 Four Pillars (Brand Messaging)
1. Runtime governance
2. Human oversight by design
3. Operational transparency
4. Security-native workflows

---

## 3. Repository & File Structure

```
/shreejaaiwebsite/
├── ARCHITECTURE.md          ← This file
├── AGENTS.md                ← Coding standards & delivery checklist
├── README.md                ← Deployment & hosting notes
├── CNAME                    ← shreejaai.com (repo root copy)
└── docs/                    ← Published website root (GitHub Pages source)
    ├── index.html           ← Home / landing page
    ├── about.html           ← Company mission, vision, values
    ├── contact.html         ← Contact form + direct email
    ├── agr.html             ← AGR product detail page
    ├── company-box.html     ← Company Box product detail page
    ├── terms.html           ← Terms of Use (last updated 2026-03-05)
    ├── privacy.html         ← Privacy Policy (last updated 2026-03-05)
    ├── favicon.svg          ← Scalable site favicon
    ├── sitemap.xml          ← SEO sitemap (7 URLs)
    ├── robots.txt           ← Allows all crawlers; declares sitemap
    ├── CNAME                ← shreejaai.com (GitHub Pages reads this)
    └── assets/
        ├── logo.png         ← Site logo (68 bytes, height: 38px header / 28px footer)
        ├── style.css        ← Master stylesheet (~494 lines, ~15 KB)
        └── script.js        ← Master JavaScript (86 lines, 2.9 KB, IIFE pattern)
```

**Rule**: There is NO build pipeline. Every file in `docs/` is deployed as-is. Never introduce a bundler, preprocessor, or npm dependency without explicit product decision.

---

## 4. Page Map & Navigation

| URL Path | File | Nav Location | Purpose |
|----------|------|-------------|---------|
| `/` | `index.html` | "Home" link | Landing — hero, products overview, CTAs |
| `/agr.html` | `agr.html` | Products → AGR | AGR full product detail |
| `/company-box.html` | `company-box.html` | Products → Company Box | Company Box full product detail |
| `/about.html` | `about.html` | "About" link | Company story, mission, values |
| `/contact.html` | `contact.html` | "Contact" link | Form + direct email |
| `/privacy.html` | `privacy.html` | Footer only | Privacy Policy |
| `/terms.html` | `terms.html` | Footer only | Terms of Use |

### Navigation Architecture
- **Sticky header** with backdrop-filter glassmorphism effect
- **Products dropdown** — `.nav-drop-toggle` button toggles `.product-dropdown`
- **Mobile hamburger** — `.menu-toggle` toggles `.nav-links` with class `open`
- All ARIA attributes (`aria-expanded`, `aria-controls`, `aria-label`) are managed via JS

---

## 5. Design System

### 5.1 CSS Custom Properties (variables in `style.css`)

```css
/* Color Palette */
--bg:           #060a18     /* Dark navy — page background */
--bg-soft:      #0c1230     /* Slightly lighter navy — section backgrounds */
--card-bg:      rgba(12, 18, 48, 0.55)  /* Frosted glass card background */
--text:         #e4e9ff     /* Primary text — light lavender-white */
--muted:        #8e9ac4     /* Secondary text — gray-blue */
--primary:      #4a6cf7     /* Brand blue — CTAs, links, accents */
--primary-light:#6b8aff     /* Lighter blue — hover states, gradients */
--accent:       #38d9a9     /* Teal — highlight, focus rings, success states */

/* Typography */
--font-body:    'DM Sans', sans-serif      /* All body text, headings */
--font-mono:    'Space Mono', monospace    /* Badges, mock panels, taglines */
```

### 5.2 Typography Scale

| Element | Size | Notes |
|---------|------|-------|
| H1 | `clamp(2.2rem, 4.5vw, 3.5rem)` | Hero headings |
| H2 | `clamp(1.5rem, 2.6vw, 2.2rem)` | Section headings |
| H3 | `clamp(1.1rem, 1.8vw, 1.35rem)` | Card headings |
| Body | `1rem` / `1.1rem` | Standard paragraph text |
| Small | `0.85rem` | Labels, muted text |
| Mono | `Space Mono` | Code-like UI elements |

### 5.3 Button System

| Type | CSS Class | Appearance | Use Case |
|------|-----------|-----------|---------|
| Primary | `.btn-primary` | Gradient blue background + glow shadow | Main CTAs (Get early access, Request demo) |
| Secondary | `.btn-secondary` | Transparent + border | Supporting actions |

**Hover behavior**: `-1px` to `-2px` translateY lift + enhanced glow shadow.

### 5.4 Card System
- Background: `var(--card-bg)` with `backdrop-filter: blur()`
- Border: `1px solid rgba(74, 108, 247, 0.15)` (subtle blue tint)
- Hover: Top border transitions to gradient accent, slight elevation
- Padding: `1.75rem` standard

### 5.5 Layout Grid Classes

| Class | Columns | Breakpoint (→ 1 col) |
|-------|---------|---------------------|
| `.grid-2` | 2 equal | 960px |
| `.grid-3` | 3 equal | 960px |
| `.platform-grid` | auto-fill, 280px min | 600px |
| `.capability-grid` | auto-fill, 260px min | 600px |
| `.split-grid` | 1fr 1.2fr | 960px |
| `.flow-grid` | auto-fill, 230px min | 600px |

### 5.6 Visual Effects
- **Background**: Fixed radial gradients creating depth layers
- **Noise texture**: SVG fractal noise at 2.5% opacity overlaid on body
- **Glassmorphism**: Header + cards use `backdrop-filter: blur() saturate()`
- **Mock panels**: Dark gradient background + CSS grid dot pattern overlay
- **Animations**: `fadeUp` keyframe (opacity 0→1, Y 18px→0) with staggered delays
- **Transitions**: `0.3s cubic-bezier(0.4, 0, 0.2, 1)` — all interactive elements

### 5.7 Responsive Breakpoints

| Breakpoint | Changes |
|-----------|---------|
| `960px` | Grids collapse to single column; mobile nav activates; section margins 6rem→4rem |
| `600px` | CTA strip becomes flex-column; button rows center-justify; further spacing reductions |

---

## 6. JavaScript Architecture

**Pattern**: IIFE (Immediately Invoked Function Expression) — no global scope pollution, no frameworks.

### 6.1 Module Responsibilities

```
script.js
├── Mobile Navigation
│   ├── .menu-toggle click → toggle .nav-links.open
│   └── aria-expanded tracking
├── Product Dropdown
│   ├── .nav-drop-toggle click → toggle .product-dropdown.open
│   ├── document click outside → close dropdown
│   └── ESC key → close nav + dropdown
├── Smooth Scroll
│   └── [data-scroll-target] links → scrollIntoView({behavior:'smooth'})
└── Contact Form Handler
    ├── #mailto-form submit intercept
    ├── URL-encode name/email/message
    └── Redirect to mailto: link
```

### 6.2 Contact Form Email Routing

**Current Configuration**:
```javascript
window.location.href = `mailto:navneetgoel126@gmail.com?subject=...`
```

**Issue**: Form currently routes to developer email (`navneetgoel126@gmail.com`), NOT the company email (`hello@shreejaai.com`). This must be corrected before any production traffic is directed here.

**Correct target**: `hello@shreejaai.com`

---

## 7. HTML Page Anatomy

Every page follows this consistent shell:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <!-- Meta: charset, viewport, description -->
  <!-- SEO: og:*, twitter:*, canonical -->
  <!-- Fonts: Google Fonts (DM Sans + Space Mono) -->
  <!-- Styles: /assets/style.css -->
  <!-- Favicon: /favicon.svg -->
</head>
<body>
  <header>                    <!-- Sticky glassmorphism nav -->
    <nav>
      <a href="/" class="logo-link">...</a>
      <button class="menu-toggle">...</button>
      <ul class="nav-links">
        <!-- Home, Products dropdown, About, Contact -->
      </ul>
    </nav>
  </header>

  <main>
    <section class="hero">...</section>
    <!-- Page-specific sections -->
  </main>

  <footer>
    <!-- Logo, tagline, nav links, legal links, copyright -->
  </footer>

  <script src="/assets/script.js"></script>
</body>
</html>
```

### Section Pattern (used consistently)
```html
<section class="[section-name]" aria-labelledby="[section-id]-heading">
  <div class="container">
    <div class="section-header">
      <span class="pill">[category label]</span>
      <h2 id="[section-id]-heading">[Heading Text]</h2>
      <p class="lead">[Supporting description]</p>
    </div>
    <!-- Content: grid of cards, steps, etc. -->
  </div>
</section>
```

---

## 8. SEO Configuration

| File | Purpose | Status |
|------|---------|--------|
| `sitemap.xml` | Lists all 7 page URLs with lastmod `2026-03-05` | Active |
| `robots.txt` | `Allow: *`, declares sitemap at `https://shreejaai.com/sitemap.xml` | Active |
| Per-page `<meta name="description">` | Unique per page | Implemented |
| Per-page OpenGraph tags | `og:title`, `og:description`, `og:url`, `og:image`, `og:type` | Implemented |
| Twitter Card tags | `twitter:card`, `twitter:title`, `twitter:description`, `twitter:image` | Implemented |
| `<link rel="canonical">` | Prevents duplicate indexing issues | Implemented |

**When adding a new page**: Update `sitemap.xml` with new URL + today's date.

---

## 9. Accessibility Standards

This project follows progressive accessibility patterns. All new code must:

- Use semantic HTML elements (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`)
- Associate form labels with inputs using `for`/`id` pairs
- Add `aria-label` to icon-only interactive elements
- Maintain `aria-expanded` + `aria-controls` on all toggle patterns
- Use `aria-labelledby` on major `<section>` elements
- Ensure `focus-visible` outline styles remain (`:focus-visible { outline: 2px solid var(--accent) }`)
- Use `<details>/<summary>` for FAQ expand/collapse (no JS needed)
- Support ESC key for closing overlays/menus

---

## 10. Performance Constraints

| Constraint | Detail |
|-----------|--------|
| **No build step** | Pure static HTML/CSS/JS — never add npm/webpack/vite |
| **No JS frameworks** | No React, Vue, Angular — vanilla JS only |
| **No external JS** | No CDN scripts beyond Google Fonts CSS import |
| **Single CSS file** | All styles in `docs/assets/style.css` — no per-page stylesheets |
| **Single JS file** | All behavior in `docs/assets/script.js` — no per-page scripts |
| **Asset optimization** | Keep logo.png minimal; use SVG for icons where possible |

**Current Baseline** (uncompressed):
- CSS: ~15 KB
- JS: ~2.9 KB
- Logo: 68 bytes
- Total page weight: < 50 KB (excluding fonts from Google CDN)

---

## 11. Deployment & Operations

### How it Works
1. Push changes to `main` branch
2. GitHub Pages auto-deploys `/docs/` folder
3. Custom domain resolves via DNS A records → GitHub Pages IP addresses
4. HTTPS enforced via GitHub Pages automatic certificate

### When updating legal pages
- Update `lastmod` date in `sitemap.xml`
- Update "Last Updated" date within the page content

### Adding a new page
1. Create `docs/[page-name].html` using the standard page shell
2. Add `<link rel="canonical" href="https://shreejaai.com/[page-name].html">`
3. Add OpenGraph + Twitter meta tags
4. Add route to `docs/sitemap.xml`
5. Add navigation link if user-facing

---

## 12. Known Issues & Technical Debt

| Priority | Issue | Location | Fix |
|----------|-------|---------|-----|
| HIGH | Contact form emails developer, not company | `script.js` line ~82 | Change `navneetgoel126@gmail.com` → `hello@shreejaai.com` |
| LOW | No form validation feedback UI | `contact.html`, `script.js` | Add inline validation messages before mailto dispatch |
| LOW | sitemap.xml lastmod dates are static | `docs/sitemap.xml` | Update when pages are modified |

---

## 13. Future Scope & Roadmap Considerations

### Near-Term Likely Needs
- **Blog / Content pages**: Technical articles on AI governance — will need consistent card-based listing layout
- **Pricing page**: Feature comparison table — extend `.grid-3` pattern with a new `.pricing-grid`
- **Demo booking**: Replace mailto with Calendly embed or real form backend (Formspree, Netlify Forms)
- **Case studies**: Customer story pages — `.split-grid` pattern fits naturally

### Architecture Decisions for Scale
- **When content grows significantly**: Consider a static site generator (Eleventy, Hugo) that compiles to the same `/docs/` output — zero user-facing change, author experience improvement
- **When form backend is needed**: Formspree or Netlify Forms are zero-JS drop-in replacements for the current mailto approach
- **When analytics are needed**: Add simple privacy-respecting analytics (Plausible, Fathom) via single `<script>` tag in `<head>` of all pages
- **When images multiply**: Introduce WebP format with `<picture>` fallbacks; consider image CDN

### Design System Evolution
- Current CSS variables are well-structured for a design token migration to a `tokens.css` file
- Component classes (`.card`, `.btn-primary`, `.pill`, `.grid-*`) are already modular — document these formally if a design system is built

---

## 14. Coding Standards (from AGENTS.md)

1. **HTML**: Semantic elements, ARIA attributes on all interactive controls
2. **CSS**: All styles in `assets/style.css` — no duplication, no inline styles
3. **JS**: Minimal, progressive enhancement — do not add complexity without reason
4. **No frameworks**: Pure HTML/CSS/JS only
5. **Test checklist before every deploy**:
   - [ ] Sticky navbar correct on all pages
   - [ ] Mobile hamburger menu opens/closes
   - [ ] Product dropdown opens/closes and closes on outside click
   - [ ] All internal links resolve (no 404s)
   - [ ] Contact form opens mail client with correct fields
   - [ ] Pages render correctly on mobile (360px) and desktop (1440px)
   - [ ] No console errors

---

## 15. Quick Reference: Class Names

| Class | Purpose |
|-------|---------|
| `.container` | Max-width 1180px, centered, 90% wide |
| `.section-header` | Centered intro block (pill + h2 + lead) |
| `.pill` | Small rounded category badge |
| `.lead` | Large intro paragraph below h2 |
| `.btn-primary` | Gradient CTA button |
| `.btn-secondary` | Bordered transparent button |
| `.card` | Frosted glass content card |
| `.grid-2` | 2-column responsive grid |
| `.grid-3` | 3-column responsive grid |
| `.mock-panel` | Dark patterned code-aesthetic panel |
| `.step-number` | Numbered circle in process flows |
| `.cta-strip` | Full-width gradient CTA section |
| `.nav-links` | Top navigation list (gets `.open` on mobile) |
| `.product-dropdown` | Products sub-menu (gets `.open` when active) |
| `.menu-toggle` | Mobile hamburger button |

---

*Last Updated: 2026-03-17 | Maintained by: Senior Technical Architect*
