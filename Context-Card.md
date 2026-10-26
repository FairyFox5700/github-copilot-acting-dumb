# Context card — BrewCart

| Context item | Role | Include? | Why |
|---|---|---:|---|
| `src/domain/discountPolicy.ts` | Target | Yes | The implementation to change |
| `tests/discountPolicy.test.ts` | Executable acceptance criteria | Yes | Proves eligible and excluded categories |
| `docs/pricing-rules.md` | Authoritative contract | Yes | Defines BEANS25 and architecture |
| `src/services/checkoutService.ts` | Supporting current context | Yes | Shows how the policy is consumed |
| `docs/legacy-promo-guide.md` | Obsolete evidence | No | Describes rejected gift-card behavior |
| Focused/full tests, lint, build, browser | Verification | Yes | Turns a proposal into evidence |
| Entire repository | Undifferentiated context | No | Adds noise without establishing authority |

## Minimum context packet

```text
Goal + target + authority + constraints + acceptance values + excluded evidence + verification
```

## BrewCart packet

```text
Goal: BEANS25 discounts coffee and beans only.
Target: src/domain/discountPolicy.ts.
Authority: docs/pricing-rules.md and tests/discountPolicy.test.ts.
Constraints: no React pricing logic, no test weakening, no API or dependency changes.
Acceptance: discount €10; final total €85.
Exclude: docs/legacy-promo-guide.md.
Verify: focused tests → all tests → lint → build → browser → diff.
```
