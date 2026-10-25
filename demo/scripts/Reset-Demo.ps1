$ErrorActionPreference = 'Stop'
$Root = Split-Path -Parent $PSScriptRoot
Copy-Item "$Root\scripts\fixtures\PricingCalculator.baseline.txt" "$Root\src\Commerce.Pricing\PricingCalculator.cs" -Force
(Get-Item "$Root\src\Commerce.Pricing\PricingCalculator.cs").LastWriteTime = Get-Date
Remove-Item "$Root\.github" -Recurse -Force -ErrorAction SilentlyContinue
dotnet clean "$Root\CommercePricing.slnx" --nologo | Out-Null
Write-Host 'Reset complete: buggy pricing code restored; Copilot context files removed.'
