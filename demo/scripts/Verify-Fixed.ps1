$ErrorActionPreference = 'Stop'
$Demo = Split-Path $PSScriptRoot -Parent
Push-Location $Demo
try {
    npm run test:run
    if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
    npm run lint
    if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
    npm run build
    if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
    npm run e2e
    if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
    Write-Host 'VERIFIED GREEN: tests, lint, build, and browser check pass.'
}
finally {
    Pop-Location
}
