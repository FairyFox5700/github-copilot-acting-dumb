#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
(cd "$ROOT" && node scripts/clear-context.mjs)
mkdir -p "$ROOT/.github"
cp -R "$ROOT/context-kit/.github/." "$ROOT/.github/"
echo 'CONTEXT APPLIED: instructions, prompt, agents, skill, and hook are active.'
