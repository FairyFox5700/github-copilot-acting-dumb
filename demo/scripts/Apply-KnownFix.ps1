$ErrorActionPreference = 'Stop'
$Root = Split-Path -Parent $PSScriptRoot
Copy-Item "$Root\scripts\fixtures\PricingCalculator.fixed.txt" "$Root\src\Commerce.Pricing\PricingCalculator.cs" -Force
(Get-Item "$Root\src\Commerce.Pricing\PricingCalculator.cs").LastWriteTime = Get-Date
Write-Host 'Known fix applied to PricingCalculator.cs.'
