# Commerce pricing repository instructions

## Authority and scope

- Treat `docs/promotion-policy.md` as the authoritative pricing contract.
- Treat `docs/stale-promotion-notes.md` as rejected historical context. Do not implement it.
- Preserve public contracts unless the task explicitly authorizes a breaking change.
- Make the smallest production change that satisfies the acceptance criteria. Never weaken tests to make a failure disappear.

## Architecture

- `src/Commerce.Pricing` owns business rules and contains no web concerns.
- `src/Commerce.Api` exposes the pricing domain over HTTP.
- `web` is a React + Vite client and communicates through `/api`.
- Tests are consumers of the contract, not the source of business policy.

## Verification

From `demo`, use this ladder:

1. `dotnet run --project tests/Commerce.Pricing.Specs`
2. `dotnet test tests/Commerce.Api.Tests`
3. `npm test --prefix web`
4. `dotnet build CommercePricing.slnx --nologo`
5. `npm run build --prefix web`
6. `git diff --name-only`

Report the evidence used, root cause, files changed, and command results.
