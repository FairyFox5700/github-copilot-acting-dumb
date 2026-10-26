$ErrorActionPreference = 'Stop'
$Demo = Split-Path $PSScriptRoot -Parent
Push-Location $Demo
try {
    dotnet run --project tests/Commerce.Pricing.Specs
    if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
    dotnet test tests/Commerce.Api.Tests --nologo
    if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
    dotnet build CommercePricing.slnx --nologo
    if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
    npm ci --prefix web
    if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
    npm test --prefix web
    if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
    npm run build --prefix web
    if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
    npm run test:run
    if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
    npm run lint
    if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
    npm run build
    if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
    npm run e2e
    if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
    Write-Host 'VERIFIED GREEN: C# domain/API, frontend tests, lint, build, and browser check pass.'
}
finally {
    Pop-Location
}
