# AZAD STUDIO — V1.0

**Where CNC Meets Creativity**

A production-ready, premium luxury website for AZAD STUDIO — a professional CNC design studio offering precision craftsmanship and creative digital services.

---

## 🎨 Overview

AZAD STUDIO's website is a fully custom-designed, award-quality digital experience featuring:

- **Three.js 3D interactive hero** with floating geometry, particles, and mouse tracking
- **Full-page loading animation** with luxury branding
- **Glass morphism UI** with gold accents and premium typography
- **Animated sections** with scroll-triggered reveal effects
- **Interactive portfolio** with lightbox and category filtering
- **Dynamic contact form** backed by PostgreSQL database
- **Cursor spotlight effect** for premium interaction feel
- **Fully responsive** — mobile to 4K displays
- **Accessibility compliant** — ARIA labels, keyboard navigation, semantic HTML
- **SEO optimized** — meta tags, Open Graph, Twitter Cards, JSON-LD schema, sitemap, robots.txt

---

## 🏗️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 4 + Custom CSS |
| 3D Graphics | Three.js |
| Database | PostgreSQL + Drizzle ORM |
| Fonts | Google Fonts (Manrope + Space Grotesk) |

---

## 📁 Project Structure

```
azad-studio/
├── public/
│   ├── favicon.svg
│   └── images/
│       ├── hero-bg.jpg
│       ├── about-img.jpg
│       ├── og-image.jpg
│       └── portfolio-1..6.jpg
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout with metadata & SEO
│   │   ├── page.tsx            # Main page composition
│   │   ├── globals.css         # Global styles & CSS variables
│   │   ├── robots.ts           # Robots.txt generation
│   │   ├── sitemap.ts          # Sitemap XML generation
│   │   └── api/
│   │       ├── health/route.ts # Health check endpoint
│   │       └── contact/route.ts # Contact form API
│   ├── components/
│   │   ├── Navbar.tsx           # Sticky glass navbar
│   │   ├── HeroSection.tsx      # Three.js animated hero
│   │   ├── AboutSection.tsx     # About + counters + timeline
│   │   ├── ServicesSection.tsx  # 3D tilt service cards
│   │   ├── WhyUsSection.tsx     # Why choose us cards
│   │   ├── PortfolioSection.tsx # Masonry + lightbox portfolio
│   │   ├── PricingSection.tsx   # 3-tier pricing
│   │   ├── TestimonialsSection.tsx # Auto-rotating testimonials
│   │   ├── ContactSection.tsx   # Form + contact info
│   │   ├── Footer.tsx           # Footer + back-to-top
│   │   ├── Loader.tsx           # Loading screen
│   │   └── CursorSpotlight.tsx  # Mouse spotlight effect
│   └── db/
│       ├── index.ts             # Drizzle ORM client
│       └── schema.ts            # Database tables
├── package.json
├── tsconfig.json
├── next.config.ts
└── drizzle.config.json
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL 14+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/your-repo/azad-studio

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Edit .env with your database URL
DATABASE_URL=postgresql://user:password@localhost:5432/azad_studio
```

### Database Setup

```bash
# Push the schema to your database
npx drizzle-kit push
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Production Build

```bash
npm run build
npm start
```

---

## 🌍 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project on [Vercel](https://vercel.com)
3. Add `DATABASE_URL` environment variable
4. Deploy

### Self-hosted

```bash
npm run build
npm start
```

---

## 📞 Contact Information

- **Owner:** Azad
- **Phone:** +91 8958902932
- **Alt Phone:** +91 8449818083
- **Email:** azadsaifi864@gmail.com
- **Instagram:** @mr_azad_saif

---

## 🌐 Browser Support

| Browser | Support |
|---------|---------|
| Chrome 90+ | ✅ Full |
| Firefox 88+ | ✅ Full |
| Safari 14+ | ✅ Full |
| Edge 90+ | ✅ Full |
| Mobile Chrome | ✅ Full |
| Mobile Safari | ✅ Full |

---

## ✨ Features Checklist

- [x] Three.js 3D animated hero with mouse tracking
- [x] Particle system with golden dust effect
- [x] Glass morphism navbar (transparent → solid on scroll)
- [x] Animated loading screen
- [x] Cursor spotlight effect
- [x] Animated section reveals (scroll-triggered)
- [x] 3D tilt cards for services
- [x] Animated counters (About section)
- [x] Portfolio with filtering + lightbox
- [x] 3-tier pricing with feature comparison
- [x] Auto-rotating testimonials slider
- [x] Contact form with client + server validation
- [x] PostgreSQL form submissions storage
- [x] WhatsApp, Phone, Email quick contacts
- [x] Newsletter signup UI
- [x] Back-to-top button
- [x] Fully responsive (mobile-first)
- [x] ARIA labels & keyboard navigation
- [x] SEO meta tags + Open Graph + Twitter Cards
- [x] JSON-LD structured data
- [x] Sitemap & robots.txt
- [x] 60 FPS Three.js optimization
- [x] Lazy loading images

---

© 2024 AZAD STUDIO. All rights reserved.
