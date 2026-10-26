---
name: BrewCart React UI
description: UI conventions for BrewCart React components.
applyTo: "src/components/**/*.tsx"
---

- Components render checkout state and dispatch user intent.
- Keep pricing formulas and promotion eligibility out of React components.
- Display subtotal, promotion discount, delivery, and final total separately.
- Prefer accessible roles, names, and semantic controls.
- Use stable `data-testid` values only when user-facing queries are insufficient.
- Verify visible behavior with React Testing Library and Playwright.
