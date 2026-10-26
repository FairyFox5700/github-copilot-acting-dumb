# Context card

| Context item | Role | Include? | Why |
|---|---|---:|---|
| `src/Commerce.Pricing/PricingCalculator.cs` | Target | Yes | The implementation to change |
| `tests/Commerce.Pricing.Specs/Program.cs` | Fast acceptance criteria | Yes | Proves cap, non-stacking, and rounding |
| `tests/Commerce.Api.Tests/PricingQuoteEndpointTests.cs` | Boundary acceptance criteria | Yes | Proves the rule survives the HTTP boundary |
| `docs/promotion-policy.md` | Authoritative contract | Yes | Defines the business rule |
| `src/Commerce.Api/` | Delivery adapter | No | Real consumer, but outside this fix's scope |
| `web/` | React/Vite consumer | No | Makes results visible, but is not pricing authority |
| `docs/stale-promotion-notes.md` | Stale/noisy evidence | No | Rejected historical proposal |
| Build/test commands | Verification | Yes | Turns output into evidence |
| Entire repository | Undifferentiated context | No | Adds noise without authority |

## The reusable context packet

**Task + target + authority + constraints + acceptance criteria + verification.**
