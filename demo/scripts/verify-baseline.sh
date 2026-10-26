#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
case "${OSTYPE:-}" in msys*|cygwin*) ROOT="$(cygpath -w "$ROOT")" ;; esac
cd "$ROOT"
set +e
OUTPUT=$(dotnet run --project tests/Commerce.Pricing.Specs 2>&1)
STATUS=$?
set -e
printf '%s\n' "$OUTPUT"
if [ "$STATUS" -eq 0 ]; then
  printf 'ERROR: baseline unexpectedly passed.\n' >&2
  exit 1
fi
EXPECTED_FAILURES=(
  'FAILED: 3 pricing specification(s)'
  'SAVE20 discount is capped at EUR 50'
  'SAVE20 does not stack with category discount'
  'currency result rounds away from zero'
)
for expected in "${EXPECTED_FAILURES[@]}"; do
  if [[ "$OUTPUT" != *"$expected"* ]]; then
    printf 'ERROR: baseline failed for an unexpected reason; missing: %s\n' "$expected" >&2
    exit 1
  fi
done
printf 'EXPECTED RED: baseline exposes exactly the three known pricing defects.\n'
