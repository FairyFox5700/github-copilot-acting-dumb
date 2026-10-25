$ErrorActionPreference = 'Continue'
$Root = Split-Path -Parent $PSScriptRoot
Push-Location $Root
dotnet run --project tests/Commerce.Pricing.Specs
$status = $LASTEXITCODE
Pop-Location
if ($status -eq 0) { throw 'Baseline unexpectedly passed.' }
Write-Host 'EXPECTED RED: baseline exposes the pricing defect.'
exit 0
