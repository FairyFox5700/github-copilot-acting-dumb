---
applyTo: "web/src/**/*.{js,jsx,css}"
---

# React client instructions

- Keep pricing rules on the C# server; the client may explain API results but must not calculate authoritative discounts.
- Use semantic HTML, associated labels, keyboard-accessible controls, and visible loading and error states.
- Test user-visible behavior with Vitest and Testing Library before implementation.
- Route API calls through `quoteApi.js`; do not scatter `fetch` calls through components.
- Verify with `npm test --prefix web` and `npm run build --prefix web` from `demo`.
