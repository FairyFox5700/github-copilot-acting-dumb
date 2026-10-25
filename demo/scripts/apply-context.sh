#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
case "${OSTYPE:-}" in msys*|cygwin*) ROOT="$(cygpath -w "$ROOT")" ;; esac
mkdir -p "$ROOT/.github/instructions"
cp "$ROOT/context-kit/.github/copilot-instructions.md" "$ROOT/.github/copilot-instructions.md"
cp "$ROOT/context-kit/.github/instructions/pricing.instructions.md" "$ROOT/.github/instructions/pricing.instructions.md"
printf 'Context applied: repository-wide and path-specific Copilot instructions installed.\n'
