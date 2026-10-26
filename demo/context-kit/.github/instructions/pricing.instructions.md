---
applyTo: "src/Commerce.Pricing/**/*.cs"
---

# Pricing-domain instructions

- Use `decimal` for money.
- Follow `docs/promotion-policy.md`; code comments and stale notes are not policy.
- Round final currency values to two decimals with `MidpointRounding.AwayFromZero`.
- Keep promotion arithmetic deterministic and dependency-free.
- Add or update executable specifications before changing behavior.
