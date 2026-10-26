$ErrorActionPreference = 'Stop'
$Demo = Split-Path $PSScriptRoot -Parent
Push-Location $Demo
try {
    node "$PSScriptRoot/verify-baseline.mjs"
    if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
}
finally {
    Pop-Location
}
