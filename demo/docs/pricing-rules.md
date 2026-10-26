# BrewCart pricing rules

**Status:** current
**Owner:** Coffee Commerce team
**Last reviewed:** 2026-10-26

## Promotion eligibility

`BEANS25` applies a 25% discount only to cart lines categorized as `coffee` or `beans`.

The following are never promotion eligible:

- gift cards;
- delivery;
- tips;
- taxes;
- subscriptions.

## Architecture

- `src/domain/discountPolicy.ts` owns promotion eligibility and discount calculation.
- `src/services/checkoutService.ts` orchestrates totals but must not duplicate eligibility rules.
- React components display results and user intent; they must not contain pricing formulas.

## Money

All internal values use integer cents. Round only when applying a percentage at the domain boundary.

## Acceptance example

| Line | Amount | Eligible |
|---|---:|---|
| House Blend beans × 2 | €40.00 | Yes |
| BrewCart gift card | €50.00 | No |
| Delivery | €5.00 | No |

Expected BEANS25 discount: **€10.00**.
Expected final total: **€85.00**.
