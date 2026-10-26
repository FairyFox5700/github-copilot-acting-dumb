# Promotion policy — authoritative contract

## SAVE20

- Applies a 20% discount to the original basket subtotal.
- The discount is capped at EUR 50 per basket.
- It does not stack with an existing category discount. If `hasCategoryDiscount` is true, return the subtotal unchanged.
- The final amount is rounded to two decimal places using `MidpointRounding.AwayFromZero`.
- Unknown promotion codes leave the subtotal unchanged.

## Guardrails

- Do not add a new dependency for promotion arithmetic.
- Do not change the public method signature in this exercise.
- Keep the fix inside `PricingCalculator.cs`.

This document is the business source of truth for the workshop.
