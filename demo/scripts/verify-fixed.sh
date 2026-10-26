#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

dotnet run --project tests/Commerce.Pricing.Specs
dotnet test tests/Commerce.Api.Tests --nologo
dotnet build CommercePricing.slnx --nologo
npm run test:run
npm run lint
npm run build
npm run e2e

echo 'VERIFIED GREEN: C# domain/API, frontend tests, lint, build, and browser check pass.'
