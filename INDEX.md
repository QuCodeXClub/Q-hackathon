# Project Index

This file provides a quick map of the Q Hackathon website codebase.

## Root

- `index.html`: Vite HTML template
- `package.json`: scripts and dependencies
- `vite.config.js`: Vite configuration
- `eslint.config.js`: linting setup
- `README.md`: project overview and setup guide

## Source (`src/`)

### App Shell

- `src/main.jsx`: React render entry
- `src/App.jsx`: route definitions (`/`, `/sponsors`)
- `src/index.css`: global variables/base CSS
- `src/App.css`: app-level styles

### Pages

- `src/pages/Home.jsx`: landing page
- `src/pages/Sponsors.jsx`: sponsors page

### Components

- `src/components/navbar.jsx`: header + navigation
- `src/components/Hero.jsx`: hero section with countdown
- `src/components/about.jsx`: about section
- `src/components/tracks.jsx`: track cards
- `src/components/timeline.jsx`: event schedule
- `src/components/prizes.jsx`: prizes section
- `src/components/faq.jsx`: FAQ section
- `src/components/contact.jsx`: contact section
- `src/components/organizerStrip.jsx`: organizer strip
- `src/components/footer.jsx`: footer
- `src/components/SponsorHeader.jsx`: sponsor page hero
- `src/components/ImpactStats.jsx`: sponsor impact metrics
- `src/components/SponsorshipTiers.jsx`: sponsorship plans
- `src/components/Partnerships.jsx`: partner logos/content
- `src/components/SponsorCTA.jsx`: sponsor call-to-action

### Styles

- `src/styles/globals.css`: global typography/base
- `src/styles/components.css`: shared component styling
- `src/styles/sponsors.css`: sponsor-page-specific styles

### Assets

- `src/assets/`: images, icons, and branding assets

## Public (`public/`)

- Static files served as-is by Vite

## GitHub Meta

- `.github/PULL_REQUEST_TEMPLATE.md`: PR checklist/template
- `.github/ISSUE_TEMPLATE/`: bug and feature templates
- `.github/workflows/ci.yml`: CI checks

