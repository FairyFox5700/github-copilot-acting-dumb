#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

npm run test:run
npm run lint
npm run build
npm run e2e

echo 'VERIFIED GREEN: tests, lint, build, and browser check pass.'
