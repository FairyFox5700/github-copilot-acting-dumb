#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cp "$ROOT/scripts/fixtures/discountPolicy.fixed.ts" "$ROOT/src/domain/discountPolicy.ts"
touch "$ROOT/src/domain/discountPolicy.ts"
cp "$ROOT/scripts/fixtures/PricingCalculator.fixed.txt" "$ROOT/src/Commerce.Pricing/PricingCalculator.cs"
touch "$ROOT/src/Commerce.Pricing/PricingCalculator.cs"
echo 'KNOWN FIX APPLIED: promotion rules now use the authoritative domain policies.'
