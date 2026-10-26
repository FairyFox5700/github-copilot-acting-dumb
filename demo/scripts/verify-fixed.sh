#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
case "${OSTYPE:-}" in msys*|cygwin*) ROOT="$(cygpath -w "$ROOT")" ;; esac
cd "$ROOT"
printf '\n[1/6] Focused pricing specifications\n'
dotnet run --project tests/Commerce.Pricing.Specs
printf '\n[2/6] API integration tests\n'
dotnet test tests/Commerce.Api.Tests --nologo
printf '\n[3/6] React component and API-client tests\n'
npm ci --prefix web
npm test --prefix web
printf '\n[4/6] Full .NET solution build\n'
dotnet build CommercePricing.slnx --nologo
printf '\n[5/6] React production build\n'
npm run build --prefix web
printf '\n[6/6] Changed-file scope\n'
CHANGED=$(git diff --name-only -- . ':(exclude)bin' ':(exclude)obj' ':(exclude)web/node_modules' ':(exclude)web/dist')
printf '%s\n' "$CHANGED"
if [ "$CHANGED" != 'demo/src/Commerce.Pricing/PricingCalculator.cs' ]; then
  printf 'ERROR: expected only PricingCalculator.cs to change.\n' >&2
  exit 1
fi
printf '\nVERIFIED GREEN: domain specs, API tests, React tests, production builds, and change scope pass.\n'
