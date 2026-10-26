#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cp "$ROOT/scripts/fixtures/discountPolicy.baseline.ts" "$ROOT/src/domain/discountPolicy.ts"
touch "$ROOT/src/domain/discountPolicy.ts"
(cd "$ROOT" && node scripts/clear-context.mjs)
echo 'RESET: BrewCart restored to the intentional red baseline.'
