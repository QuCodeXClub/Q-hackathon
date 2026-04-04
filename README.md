# Q Hackathon Website 🚀

Official website for the Q Hackathon event, built with React and Vite.

## Overview 🌟

This repository contains a multi-page hackathon site with:

- Event landing experience (hero, tracks, timeline, prizes, FAQ, contact)
- Dedicated sponsors page with tiers and CTA
- Responsive navigation and section-based layout

## Tech Stack 🧰

- React
- Vite
- React Router (`HashRouter`)
- Framer Motion
- Lucide React
- Tailwind CSS (via `@import "tailwindcss"`)

## Project Index 🗂️

- `src/main.jsx`: app entry point
- `src/App.jsx`: router configuration
- `src/pages/Home.jsx`: landing page composition
- `src/pages/Sponsors.jsx`: sponsors page composition
- `src/components/`: reusable UI sections
- `src/styles/`: global and page/component-level styles
- `public/`: static assets served directly

For a more detailed file map, see `INDEX.md`.

## NPM Scripts ⚙️

- `npm run dev`: start local dev server
- `npm run build`: create production build
- `npm run preview`: preview built app locally
- `npm run predeploy`: build before deployment
- `npm run deploy`: deploy `dist/` via `gh-pages`

## Getting Started 🏁

### 1) Install dependencies

```bash
npm install
```

### 2) Run locally

```bash
npm run dev
```

### 3) Build for production

```bash
npm run build
```

## Routing Notes 🧭

The app uses `HashRouter`, which is suitable for static hosting (including GitHub Pages) without server-side route rewrite configuration.

## Deployment 📦

This repository includes `gh-pages` scripts.

Typical deployment flow:

```bash
npm run deploy
```

## Contribution Workflow 🤝

Please read:

- `CONTRIBUTING.md`
- `.github/PULL_REQUEST_TEMPLATE.md`
- `.github/ISSUE_TEMPLATE/bug_report.md`
- `.github/ISSUE_TEMPLATE/feature_request.md`
- `.github/CODEOWNERS`
- `CODE_OF_CONDUCT.md`
- `CHANGELOG.md`

## Pull Request Rules (Short) ✅

- Keep PRs focused and small
- Link issue/task in PR description
- Include testing notes and screenshots for UI changes
- Avoid mixing formatting-only changes with feature/fix work
- Ensure build passes before requesting review

## Security 🔒

Please review `SECURITY.md` for responsible disclosure.

## License 📄

This repository includes an MIT license in `LICENSE`.