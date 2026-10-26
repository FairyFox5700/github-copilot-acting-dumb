$ErrorActionPreference = 'Stop'
$Demo = Split-Path $PSScriptRoot -Parent
Copy-Item "$PSScriptRoot/fixtures/discountPolicy.fixed.ts" "$Demo/src/domain/discountPolicy.ts" -Force
(Get-Item "$Demo/src/domain/discountPolicy.ts").LastWriteTime = Get-Date
Copy-Item "$PSScriptRoot/fixtures/PricingCalculator.fixed.txt" "$Demo/src/Commerce.Pricing/PricingCalculator.cs" -Force
(Get-Item "$Demo/src/Commerce.Pricing/PricingCalculator.cs").LastWriteTime = Get-Date
Write-Host 'KNOWN FIX APPLIED: promotion rules now use the authoritative domain policies.'
