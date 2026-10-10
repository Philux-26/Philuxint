# Philux International - Next.js Headless Architecture

This repository contains the premium frontend architecture for Philux International. It relies on a Next.js (Static Export) configuration to cleanly interface with a Headless WordPress backend, guaranteeing ultra-fast load times and impenetrable frontend security.

## 🛠 Tech Stack
- **Frontend Framework:** Next.js 14 (Pages Router, SSG output)
- **Styling Architecture:** Custom Vanilla CSS Design System (Bespoke Tokens located in `src/index.css`)
- **Animations:** Framer Motion (Scroll Reveals) & Studio Freight Lenis (Momentum Scrolling)
- **Backend CMS Engine:** WordPress Headless
    - *Required Plugins:* WPGraphQL, WPGraphQL for WooCommerce.

## ⚙️ Environment Variables
For the GraphQL data pipelines to work locally, create a `.env.local` file in the root directory. **NEVER commit this file to version control (it is ignored in `.gitignore`).**

```env
NEXT_PUBLIC_WP_API_URL=https://api.philuxint.com.ng/graphql
```

## 💻 Local Development
1. Run `npm install`
2. Run `npm run dev` to preview the dynamic site.
3. Run `npm run build` to compile the production-ready static HTML files into the `/out` directory.

---

## 🚀 Native cPanel Deployment & Security Protocol

This site avoids Node.js server overhead by operating entirely as a Statically Generated App (`output: 'export'`). 

### Deployment Steps (Git Version Control):
1. In cPanel, open **Git Version Control**.
2. Clone/Update the repository URL: `https://github.com/Philux-26/Philuxint.git` into a folder completely outside your public directory (e.g., `/repositories/philuxint`).
3. **DOCUMENT ROOT MAPPING:** Open cPanel **Domains**. Edit your main domain (`philuxint.com.ng`) so its **Document Root** points exactly to the compiled build folder: `/repositories/philuxint/out`.

### 🚨 SECURITY WARNING: The Private GitHub Workaround
To protect proprietary corporate assets, this GitHub repository must be kept **Private**.
If a future developer encounters an empty folder bug inside cPanel because the host server's Git module explicitly blocks Personal Access Tokens (PATs) or SSH, establish connection using this safe and instantaneous bypass:

1. Log into GitHub and temporarily change the Repository visibility to **Public**.
2. Go to cPanel **Git Version Control** and click **Update from Remote**. It will pull the entire repository cleanly without throwing authorization breaks.
3. Immediately go back into GitHub and swap the Repository back to **Private**.
*(Because the cPanel Git module caches the internal deployment mapped folder, changing it back to private does NOT take the Philux website offline. It ensures the corporate source code stays locked down between manual updates).*

---
*Engineered to exceptional standards for Philux International.*
