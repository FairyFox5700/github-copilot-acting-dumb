$ErrorActionPreference = 'Stop'
$Root = Split-Path -Parent $PSScriptRoot
Push-Location $Root
try {
    Write-Host "`n[1/3] Focused pricing specifications"
    dotnet run --project tests/Commerce.Pricing.Specs
    if ($LASTEXITCODE -ne 0) { throw 'Pricing specifications failed.' }

    Write-Host "`n[2/3] Full solution build"
    dotnet build CommercePricing.slnx --nologo
    if ($LASTEXITCODE -ne 0) { throw 'Solution build failed.' }

    Write-Host "`n[3/3] Changed-file scope"
    git diff --name-only
    Write-Host "`nVERIFIED GREEN: specifications pass and solution builds."
}
finally {
    Pop-Location
}
