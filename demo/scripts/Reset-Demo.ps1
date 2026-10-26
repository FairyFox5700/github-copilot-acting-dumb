$ErrorActionPreference = 'Stop'
$Demo = Split-Path $PSScriptRoot -Parent
Copy-Item "$PSScriptRoot/fixtures/discountPolicy.baseline.ts" "$Demo/src/domain/discountPolicy.ts" -Force
(Get-Item "$Demo/src/domain/discountPolicy.ts").LastWriteTime = Get-Date
Copy-Item "$PSScriptRoot/fixtures/PricingCalculator.baseline.txt" "$Demo/src/Commerce.Pricing/PricingCalculator.cs" -Force
(Get-Item "$Demo/src/Commerce.Pricing/PricingCalculator.cs").LastWriteTime = Get-Date
node "$PSScriptRoot/clear-context.mjs"
Write-Host 'RESET: BrewCart and the C# pricing API restored to their intentional red baselines.'
