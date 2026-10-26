#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
case "${OSTYPE:-}" in msys*|cygwin*) ROOT="$(cygpath -w "$ROOT")" ;; esac
cp "$ROOT/scripts/fixtures/PricingCalculator.baseline.txt" "$ROOT/src/Commerce.Pricing/PricingCalculator.cs"
touch "$ROOT/src/Commerce.Pricing/PricingCalculator.cs"
rm -rf "$ROOT/.github"
dotnet clean "$ROOT/CommercePricing.slnx" --nologo >/dev/null
printf 'Reset complete: buggy pricing code restored; Copilot context files removed.\n'
