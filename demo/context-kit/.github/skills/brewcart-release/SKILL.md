---
name: brewcart-release
description: Prepare and verify a BrewCart release. Use when asked to validate or review a release candidate.
---

# BrewCart release

## Safety

- Never publish packages, push tags, or deploy automatically.
- Stop if the working tree contains unrelated changes.
- Do not bypass failed tests, lint, build, browser checks, or secret scans.

## Procedure

1. Inspect the branch and working tree.
2. Review changes since the previous release.
3. Run `npm run test:focused`.
4. Run `npm run test:run`.
5. Run `npm run lint`.
6. Run `npm run build`.
7. Run `npm run e2e` when Chromium is available.
8. Check dependency and lockfile changes.
9. Check for secrets and customer data.
10. Produce a concise evidence report.

Return one recommendation:

- `READY FOR APPROVAL`
- `NOT READY`
- `BLOCKED`
