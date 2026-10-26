#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"
node scripts/verify-baseline.mjs

set +e
OUTPUT=$(dotnet run --project tests/Commerce.Pricing.Specs 2>&1)
STATUS=$?
set -e
printf '%s\n' "$OUTPUT"
if [ "$STATUS" -eq 0 ] || [[ "$OUTPUT" != *'FAILED: 3 pricing specification(s)'* ]]; then
  printf 'BASELINE INVALID: the C# pricing baseline did not expose exactly three known failures.\n' >&2
  exit 1
fi
for expected in \
  'SAVE20 discount is capped at EUR 50' \
  'SAVE20 does not stack with category discount' \
  'currency result rounds away from zero'; do
  if [[ "$OUTPUT" != *"$expected"* ]]; then
    printf 'BASELINE INVALID: missing expected C# failure: %s\n' "$expected" >&2
    exit 1
  fi
done
printf 'EXPECTED RED: the C# baseline exposes exactly the three known pricing defects.\n'
