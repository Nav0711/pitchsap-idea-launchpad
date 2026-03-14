# 🎨 Pitchsap – Frontend

> The client-side application for Pitchsap, built with **React 18**, **TypeScript**, **Vite**, and **Tailwind CSS**.

🔗 **Live**: [https://pitchsap-idea-launchpad.vercel.app/](https://pitchsap-idea-launchpad.vercel.app/)

---

## 🗂️ Project Structure

```
frontend/
├── public/
│   └── favicon.png            # Pitchsap logo as favicon
│
├── src/
│   ├── assets/                # Static images (logo, hero, blogs)
│   │   ├── pitchsap-logo.png
│   │   ├── hero-laptop.jpg
│   │   ├── blog-1.jpg
│   │   ├── blog-2.jpg
│   │   └── blog-3.jpg
│   │
│   ├── components/            # UI building blocks
│   │   ├── Navbar.tsx         # Floating 3-island liquid glass navbar
│   │   ├── HeroSection.tsx    # Landing hero with Vanta fog bg + buttons
│   │   ├── HowItWorksSection.tsx  # Animated step-by-step walkthrough
│   │   ├── WhyPitchsapSection.tsx # Benefits/differentiators cards
│   │   ├── PricingPageSection.tsx # Pricing plans grid + mobile accordion
│   │   ├── CommunitySection.tsx   # Community highlights
│   │   ├── EarlyAccessSection.tsx # Beta/waitlist email capture
│   │   ├── BlogPreviewSection.tsx # Blog card grid (horizontal on mobile)
│   │   ├── CTASection.tsx         # Bottom call-to-action
│   │   ├── Footer.tsx             # Footer with nav links + social media icons
│   │   ├── ChatWidget.tsx         # Floating AI chat bubble
│   │   ├── VantaBackground.tsx    # Three.js fog animation background
│   │   ├── CursorGlow.tsx         # Mouse-following pointer glow effect
│   │   └── ui/                    # Shadcn/Radix primitive components
│   │
│   ├── hooks/
│   │   ├── use-theme.tsx      # Dark/light mode hook
│   │   └── use-mobile.tsx     # Breakpoint detection hook
│   │
│   ├── lib/
│   │   └── utils.ts           # cn() utility for class merging
│   │
│   ├── pages/
│   │   ├── Index.tsx          # Home page — assembles all sections
│   │   ├── AuthPage.tsx       # Login & Register page
│   │   ├── ChatPage.tsx       # Full-screen AI chat page
│   │   ├── BlogPage.tsx       # Full blog listing page
│   │   └── NotFound.tsx       # 404 page
│   │
│   ├── App.tsx                # Root component (router + CursorGlow)
│   ├── main.tsx               # Vite entry point
│   └── index.css              # Global CSS, design tokens, glass styles
│
├── index.html                 # HTML shell (Vanta CDN scripts here)
├── vite.config.ts             # Vite config (aliases, port 8080)
├── tailwind.config.ts         # Tailwind theme extensions
├── tsconfig.json
└── package.json
```

---

## 🧩 Key Components Explained

### `Navbar.tsx`
A floating, three-island navigation bar with **liquid glass** styling:
- **Left island**: Pitchsap logo, links to home.
- **Centre island**: Navigation links (How it Works, Blogs, Why Pitchsap, Contact Us) with smooth-scroll on homepage and standard navigation elsewhere.
- **Right island**: Theme toggle, chat icon (logged-in), Get Started CTA.
- Hides on scroll down, reappears on scroll up.

### `HeroSection.tsx`
Full-viewport hero with:
- **Vanta.js fog** animation background (reduced complexity on mobile for performance).
- **Get Started** → routes to `/auth`.
- **Learn More** → smooth-scrolls to `#how-it-works`.

### `PricingPageSection.tsx`
- **Desktop**: 4-column card grid with monthly/yearly toggle.
- **Mobile**: Compact liquid glass accordion rows — tap any plan to expand features.

### `BlogPreviewSection.tsx`
- **Desktop**: 3-column image cards with hover animations.
- **Mobile**: Compact horizontal thumbnail-left cards for reduced vertical space.

### `ChatWidget.tsx`
A floating chat bubble that expands into a real-time AI conversation panel, powered by the backend `/api/chat` endpoint.

### `VantaBackground.tsx`
GPU-accelerated fog animation. On mobile (`< 768px`), reduces blur, speed, and disables mouse/touch tracking to save battery.

### `CursorGlow.tsx`
Global mouse-following radial glow effect rendered as a fixed div tracking cursor position via `mousemove`.

### `Footer.tsx`
Structured footer with:
- Brand logo and nav links.
- Social media icons (Twitter · Instagram · LinkedIn · GitHub · YouTube) styled as interactive liquid glass pills.

---

## 📄 Pages

| Route | Page | Description |
|---|---|---|
| `/` | `Index.tsx` | Main landing page with all sections |
| `/auth` | `AuthPage.tsx` | Login / Register (JWT-based) |
| `/chat` | `ChatPage.tsx` | Full AI chat interface (auth required) |
| `/blog` | `BlogPage.tsx` | Blog listing page |
| `*` | `NotFound.tsx` | 404 fallback |

---

## 🎨 Design System

All global design tokens (colors, gradients, glass styles) are defined in `src/index.css`:

| Token / Class | Usage |
|---|---|
| `.gradient-primary` | Purple gradient for CTAs |
| `.gradient-text` | Gradient text for headings |
| `.glass-hero-card` | Hero section left card |
| `.glass-card-hover` | Blog / feature cards with hover lift |
| `.section-bg-b` | Alternating section background |
| `backdrop-blur-2xl` | Core liquid glass blur |

---

## 🛠️ Dependencies

| Package | Purpose |
|---|---|
| `react` / `react-dom` | UI framework |
| `react-router-dom` | Client-side routing |
| `framer-motion` | Animations and transitions |
| `@radix-ui/react-*` | Accessible UI primitives |
| `lucide-react` | Icon set |
| `@tanstack/react-query` | Server state management |
| `tailwindcss` | Utility-first CSS |
| `@number-flow/react` | Animated number display (pricing) |
| `vanta` (CDN) | Fog animation background |

---

## 🚀 Running the Frontend

### Prerequisites
- **Node.js** v18 or higher
- **npm** (or bun)

### 1. Install dependencies

```bash
cd frontend
npm install
```

### 2. Configure environment (optional)

Create a `.env` file in `frontend/` if you want to point to a specific backend:

```env
VITE_API_URL=http://localhost:8000
```

### 3. Start the dev server

```bash
npm run dev
```

> App runs at **http://localhost:8080**

### 4. Build for production

```bash
npm run build
```

Output goes to `frontend/dist/`.

### 5. Preview the production build

```bash
npm run preview
```

---

## 🌍 Deployment

Deployed automatically via **Vercel** from the `/frontend` directory.  
Live URL: [https://pitchsap-idea-launchpad.vercel.app/](https://pitchsap-idea-launchpad.vercel.app/)
