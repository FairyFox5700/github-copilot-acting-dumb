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
printf 'EXPECTED RED: baseline exposes the pricing defect.\n'
