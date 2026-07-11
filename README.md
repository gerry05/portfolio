<div align="center">

# Gerry Albert Buala — Portfolio

**A fast, static personal portfolio built with Next.js 16, React 19, and Framer Motion.**

[![Next.js](https://img.shields.io/badge/Next.js-16.2-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-0055FF?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)

[Live Demo](#) · [Report Bug](https://github.com/gerry05/portfolio/issues) · [Request Feature](https://github.com/gerry05/portfolio/issues)

</div>

---

## Overview

A single-page developer portfolio showcasing selected work, skills, and contact links. The site is fully static—no server required—making it easy to deploy anywhere static files are hosted.

Designed with a cinematic hero, scroll-driven reveal animations, and a content-driven architecture so updates stay simple: edit one data file, swap images, rebuild.

## Features

| Feature | Description |
| --- | --- |
| **Static export** | `output: "export"` — deploy to GitHub Pages, Netlify, Vercel, or any CDN |
| **Motion system** | Reusable `Reveal`, `Stagger`, and `StaggerItem` primitives with `prefers-reduced-motion` support |
| **Content-driven** | All copy, projects, skills, and social links live in `src/data/portfolio.ts` |
| **Typography** | Outfit, Bricolage Grotesque, and IBM Plex Mono via `next/font` |
| **Responsive** | Mobile-first layout with fluid type and adaptive sections |
| **Accessible** | Semantic HTML, reduced-motion fallbacks, and keyboard-friendly navigation |
| **SEO ready** | Open Graph metadata and descriptive page titles |

## Tech Stack

```
Next.js 16  ·  React 19  ·  TypeScript  ·  Tailwind CSS v4  ·  Framer Motion
```

- **Framework** — [Next.js](https://nextjs.org/) App Router with static HTML export
- **Styling** — [Tailwind CSS v4](https://tailwindcss.com/) with CSS custom properties
- **Animation** — [Framer Motion](https://www.framer.com/motion/) scroll and entrance effects
- **Fonts** — Google Fonts loaded through `next/font/google`

## Project Structure

```
portfolio-nextjs/
├── public/
│   ├── images/          # Profile and showcase assets
│   └── projects/        # Project thumbnails
├── src/
│   ├── app/
│   │   ├── globals.css  # Design tokens, utilities, layout shell
│   │   ├── layout.tsx   # Root layout, fonts, metadata
│   │   └── page.tsx     # Single-page composition
│   ├── components/
│   │   ├── Header.tsx   # Sticky nav + mobile menu
│   │   ├── Hero.tsx     # Full-viewport intro
│   │   ├── About.tsx
│   │   ├── Skills.tsx
│   │   ├── Projects.tsx
│   │   ├── Contact.tsx
│   │   ├── Footer.tsx
│   │   └── motion.tsx   # Shared animation primitives
│   └── data/
│       └── portfolio.ts # ← Edit content here
├── next.config.ts       # Static export settings
└── package.json
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 20+
- npm (or pnpm / yarn)

### Install & run locally

```bash
git clone https://github.com/gerry05/portfolio.git
cd portfolio
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Production build

```bash
npm run build
```

Static files are written to `out/` and can be served by any static host.

### Lint

```bash
npm run lint
```

## Customization

### Update content

Edit [`src/data/portfolio.ts`](src/data/portfolio.ts):

```ts
export const site = {
  name: "Your Name",
  title: "Your Title",
  tagline: "Your tagline.",
  resumeUrl: "https://...",
  social: { github: "...", linkedin: "..." },
};

export const projects = [
  {
    title: "Project Name",
    description: "Short description.",
    tools: ["Next.js", "TypeScript"],
    image: "/projects/example.png",
    website: "https://example.com", // optional
  },
];
```

### Replace images

| Path | Purpose |
| --- | --- |
| `public/images/me.jpg` | Hero background portrait |
| `public/projects/*.png` | Project card thumbnails |

### Tweak design tokens

Colors, shadows, and the hero mesh gradient are defined in [`src/app/globals.css`](src/app/globals.css) under `:root`.

## Deployment

### GitHub Pages (project site)

For a repo at `github.com/gerry05/portfolio`, the site URL is `https://gerry05.github.io/portfolio/`.

1. Add a `basePath` to [`next.config.ts`](next.config.ts):

   ```ts
   const nextConfig: NextConfig = {
     output: "export",
     basePath: "/portfolio",
     trailingSlash: true,
     images: { unoptimized: true },
   };
   ```

2. Build and deploy the `out/` folder (e.g. with [peaceiris/actions-gh-pages](https://github.com/peaceiris/actions-gh-pages) or push `out/` to a `gh-pages` branch).

### Vercel / Netlify

Connect the repository and use:

- **Build command:** `npm run build`
- **Output directory:** `out`

No `basePath` is needed when using a custom domain or platform-assigned URL.

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start development server |
| `npm run build` | Generate static export in `out/` |
| `npm run start` | Serve production build (non-export mode) |
| `npm run lint` | Run ESLint |

## Connect

- **GitHub** — [@gerry05](https://github.com/gerry05)
- **LinkedIn** — [Gerry Albert Buala](https://www.linkedin.com/in/gerry-albert-buala-6ba2a1168/)
- **Resume** — [Google Drive](https://drive.google.com/file/d/1rzUN3WSUA2IUynxm3HPBdGecOjmGwBnv/view?usp=sharing)

---

<div align="center">

Built with care in the Philippines.

**© Gerry Albert Buala**

</div>
