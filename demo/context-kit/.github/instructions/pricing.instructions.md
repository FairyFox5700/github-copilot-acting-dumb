---
name: BrewCart pricing rules
description: Pricing architecture and validation for checkout domain code.
applyTo: "src/domain/**/*.ts,src/services/checkoutService.ts,tests/discountPolicy.test.ts"
---

- `discountPolicy.ts` owns promotion eligibility and discount calculation.
- `checkoutService.ts` orchestrates totals; it must not duplicate eligibility rules.
- Gift cards, tips, tax, subscriptions, and delivery are never promotion eligible.
- BEANS25 applies 25% only to coffee and bean products.
- Use integer cents for money calculations.
- Treat `docs/pricing-rules.md` as authoritative and `docs/legacy-promo-guide.md` as obsolete.
- Never weaken an existing pricing assertion to make a test pass.
