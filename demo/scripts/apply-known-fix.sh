#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
case "${OSTYPE:-}" in msys*|cygwin*) ROOT="$(cygpath -w "$ROOT")" ;; esac
cp "$ROOT/scripts/fixtures/PricingCalculator.fixed.txt" "$ROOT/src/Commerce.Pricing/PricingCalculator.cs"
touch "$ROOT/src/Commerce.Pricing/PricingCalculator.cs"
printf 'Known fix applied to PricingCalculator.cs.\n'
