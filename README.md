# Philux International - Headless Web Application

This repository houses the premium frontend application for Philux International. Engineered as a highly interactive, bespoke React application, it utilizes Framer Motion for cinematic structural animations and a strictly enforced Vanilla CSS design system (Graphite, Philux Red, Off-White).

## System Architecture (Headless CMS)
**Current Stage:** Converting from React/Vite to Next.js SSG.  
**Deployment Target:** Next.js Static Export natively deployed on cPanel Git Version Control.

### Developer Handoff Instructions
1. **The Backend (Data Source):** All active content data (E-commerce Shop products, Blog posts, page text) is strictly managed via an external Headless WordPress backend. The client logs into a standard WP dashboard (e.g., `api.philux.com`). We utilize **Advanced Custom Fields (ACF)** and **WPGraphQL** endpoints to serve structured data.
2. **The Frontend (This Repository):** This UI interacts with the WordPress API asynchronously. It will be built into deeply optimized Static HTML/JS files via Next.js Static Site Generation (SSG). This allows zero database strain on the cPanel while ensuring standard SEO parsing.
3. **Automated Deployment:** CI/CD is integrated directly from this GitHub repository (`Philux-26/Philuxint`). Any successful merge to the `main` branch will seamlessly trigger the cPanel Git Webhook to pull, build, and deploy the new static files. Clients only touch the WordPress panel.

### Local Development Setup
Ensure you have the latest stable Node.js installed.
```bash
# 1. Install all dependencies
npm install

# 2. Spin up the local development server
npm run dev

# 3. Create a production build simulation
npm run build
```

### Core Libraries
- `framer-motion`: Orchestrates scroll-linked reveals, dynamic image masking, and interactive layout state transitions.
- `@studio-freight/lenis`: Handles inertia-based smooth scrolling globally to augment the high-end feel.
- `react-helmet-async`: Configures meta tags and localized SEO dynamically per page.
- `lucide-react`: Geometric SVG Iconography.

### Design Integrity Note
Do not arbitrarily add Tailwind or Bootstrap. The design relies entirely on the custom CSS variables strictly located in `/src/index.css` to maintain brand integrity. 

---
*Designed & Managed by BrainBox | Engineered for Philux International*
