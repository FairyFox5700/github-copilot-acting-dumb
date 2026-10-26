#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cp "$ROOT/scripts/fixtures/discountPolicy.baseline.ts" "$ROOT/src/domain/discountPolicy.ts"
touch "$ROOT/src/domain/discountPolicy.ts"
cp "$ROOT/scripts/fixtures/PricingCalculator.baseline.txt" "$ROOT/src/Commerce.Pricing/PricingCalculator.cs"
touch "$ROOT/src/Commerce.Pricing/PricingCalculator.cs"
(cd "$ROOT" && node scripts/clear-context.mjs)
echo 'RESET: BrewCart and the C# pricing API restored to their intentional red baselines.'
