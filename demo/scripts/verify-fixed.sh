#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
case "${OSTYPE:-}" in msys*|cygwin*) ROOT="$(cygpath -w "$ROOT")" ;; esac
cd "$ROOT"
printf '\n[1/3] Focused pricing specifications\n'
dotnet run --project tests/Commerce.Pricing.Specs
printf '\n[2/3] Full solution build\n'
dotnet build CommercePricing.slnx --nologo
printf '\n[3/3] Changed-file scope\n'
git diff --name-only -- . ':(exclude)bin' ':(exclude)obj' || true
printf '\nVERIFIED GREEN: specifications pass and solution builds.\n'
