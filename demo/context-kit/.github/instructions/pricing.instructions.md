---
name: BrewCart pricing rules
description: Pricing architecture and validation for checkout domain code.
applyTo: "src/domain/**/*.ts,src/services/checkoutService.ts,tests/discountPolicy.test.ts,src/Commerce.Pricing/**/*.cs,src/Commerce.Api/**/*.cs,tests/Commerce.Pricing.Specs/**/*.cs,tests/Commerce.Api.Tests/**/*.cs"
---

- For the BrewCart TypeScript demo:
- `discountPolicy.ts` owns promotion eligibility and discount calculation.
- `checkoutService.ts` orchestrates totals; it must not duplicate eligibility rules.
- Gift cards, tips, tax, subscriptions, and delivery are never promotion eligible.
- BEANS25 applies 25% only to coffee and bean products.
- Use integer cents for money calculations.
- Treat `docs/pricing-rules.md` as authoritative and `docs/legacy-promo-guide.md` as obsolete.
- Never weaken an existing pricing assertion to make a test pass.

- For the C# pricing API, use `decimal` for money and follow `docs/promotion-policy.md`.
- Round final currency values to two decimals with `MidpointRounding.AwayFromZero`.
- Keep promotion arithmetic deterministic and dependency-free; add or update executable specifications before changing behavior.
