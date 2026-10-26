#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cp "$ROOT/scripts/fixtures/discountPolicy.fixed.ts" "$ROOT/src/domain/discountPolicy.ts"
touch "$ROOT/src/domain/discountPolicy.ts"
echo 'KNOWN FIX APPLIED: promotion eligibility now belongs to the domain policy.'
