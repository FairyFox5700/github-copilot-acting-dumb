---
description: Diagnose and fix a BrewCart checkout defect using authoritative evidence.
agent: brewcart-debugger
---

Goal:
Fix the checkout behavior described by the selected issue.

Before editing:
1. Reproduce the failure.
2. List the repository sources used.
3. Classify each source as authoritative, supporting, obsolete, or uncertain.
4. Trace the incorrect value to its first incorrect state.
5. Propose the smallest architecture-compliant change.
6. List files that should and should not change.

Constraints:
- Do not weaken, skip, delete, or rewrite an authoritative test.
- Keep pricing rules out of React components.
- Do not add dependencies or change exported APIs without approval.
- Do not perform unrelated refactoring or formatting.

Validation:
- Run `npm run test:focused`.
- Run `npm run test:run`.
- Run `npm run lint` and `npm run build`.
- Run `npm run e2e` when Chromium is available.
- Review `git diff --check` and changed-file scope.
