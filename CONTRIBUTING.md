# Contributing Guide 🤝

Thank you for contributing to Q Hackathon.

## Branching 🌿

- Create a feature branch from `main`.
- Branch naming examples:
  - `feat/home-hero-update`
  - `fix/mobile-navbar-scroll`
  - `docs/repo-guidelines`

## Commit Messages 📝

Use clear, scoped commit messages.

Examples:

- `feat: add sponsor CTA section`
- `fix: prevent body scroll when menu is open`
- `docs: add PR template and issue forms`

## Development Setup 🛠️

1. Install dependencies: `npm install`
2. Run dev server: `npm run dev`
3. Build before PR: `npm run build`

## Pull Request Rules ✅

- Keep PRs focused on one logical change.
- Link the issue (if available).
- Include screenshots/GIFs for UI changes.
- Include testing notes in PR description.
- Ensure CI passes before requesting review.
- Resolve review comments in follow-up commits.

## Code Style 🧹

- Follow existing React component style.
- Prefer small reusable components over large monoliths.
- Do not rename files/symbols unless necessary.
- Avoid unrelated formatting changes.

## Testing Expectations 🧪

This repository currently enforces build-level verification.

Minimum requirement before opening a PR:

- `npm run build` succeeds locally.

## Documentation 📚

Update docs when behavior, scripts, or workflow changes:

- `README.md`
- `INDEX.md`
- Any relevant `.github` templates

## Need Help? 🙋

Open a GitHub issue using the provided templates.
