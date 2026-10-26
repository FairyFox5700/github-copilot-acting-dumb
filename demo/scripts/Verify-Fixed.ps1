$ErrorActionPreference = 'Stop'
$Root = Split-Path -Parent $PSScriptRoot
Push-Location $Root
try {
    Write-Host "`n[1/6] Focused pricing specifications"
    dotnet run --project tests/Commerce.Pricing.Specs
    if ($LASTEXITCODE -ne 0) { throw 'Pricing specifications failed.' }

    Write-Host "`n[2/6] API integration tests"
    dotnet test tests/Commerce.Api.Tests --nologo
    if ($LASTEXITCODE -ne 0) { throw 'API integration tests failed.' }

    Write-Host "`n[3/6] React component and API-client tests"
    npm ci --prefix web
    if ($LASTEXITCODE -ne 0) { throw 'npm install failed.' }
    npm test --prefix web
    if ($LASTEXITCODE -ne 0) { throw 'React tests failed.' }

    Write-Host "`n[4/6] Full .NET solution build"
    dotnet build CommercePricing.slnx --nologo
    if ($LASTEXITCODE -ne 0) { throw 'Solution build failed.' }

    Write-Host "`n[5/6] React production build"
    npm run build --prefix web
    if ($LASTEXITCODE -ne 0) { throw 'React production build failed.' }

    Write-Host "`n[6/6] Changed-file scope"
    $changedFiles = @(git diff --name-only)
    $changedFiles | ForEach-Object { Write-Host $_ }
    if ($changedFiles.Count -ne 1 -or $changedFiles[0] -ne 'demo/src/Commerce.Pricing/PricingCalculator.cs') {
        throw 'Expected only PricingCalculator.cs to change.'
    }
    Write-Host "`nVERIFIED GREEN: domain specs, API tests, React tests, production builds, and change scope pass."
}
finally {
    Pop-Location
}
