# Context card

| Context item | Role | Include? | Why |
|---|---|---:|---|
| `src/Commerce.Pricing/PricingCalculator.cs` | Target | Yes | The implementation to change |
| `tests/Commerce.Pricing.Specs/Program.cs` | Executable acceptance criteria | Yes | Proves cap, non-stacking, and rounding |
| `docs/promotion-policy.md` | Authoritative contract | Yes | Defines the business rule |
| `docs/stale-promotion-notes.md` | Stale/noisy evidence | No | Rejected historical proposal |
| Build/test commands | Verification | Yes | Turns output into evidence |
| Entire repository | Undifferentiated context | No | Adds noise without authority |

## The reusable context packet

**Task + target + authority + constraints + acceptance criteria + verification.**
