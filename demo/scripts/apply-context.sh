#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
case "${OSTYPE:-}" in msys*|cygwin*) ROOT="$(cygpath -w "$ROOT")" ;; esac
mkdir -p "$ROOT/.github/instructions" "$ROOT/.github/prompts"
cp "$ROOT/context-kit/.github/copilot-instructions.md" "$ROOT/.github/copilot-instructions.md"
cp "$ROOT/context-kit/.github/instructions/"*.instructions.md "$ROOT/.github/instructions/"
cp "$ROOT/context-kit/.github/prompts/"*.prompt.md "$ROOT/.github/prompts/"
printf 'Context applied: repository instructions, path instructions, and prompt file installed.\n'
