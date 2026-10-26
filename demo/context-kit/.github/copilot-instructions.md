# BrewCart repository contract

- The primary demo uses React, TypeScript, and Vite; `web/` is the separate React client for the C# pricing API.
- Keep TypeScript strict mode enabled.
- Treat ESLint errors and TypeScript errors as build failures.
- The C# pricing API and domain target .NET 10; use `decimal` for money and follow `docs/promotion-policy.md`.
- Keep pricing rules in the domain and cover API behavior with integration tests.
- Never commit secrets, customer data, or payment credentials.
- Preserve exported component props and domain APIs unless a breaking change is approved.
- Inspect the target, closest tests, and current contract before editing.
- Report the commands actually run; do not claim success from a plausible diff.
