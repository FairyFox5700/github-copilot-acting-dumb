$ErrorActionPreference = 'Stop'
$Demo = Split-Path $PSScriptRoot -Parent
Copy-Item "$PSScriptRoot/fixtures/discountPolicy.baseline.ts" "$Demo/src/domain/discountPolicy.ts" -Force
(Get-Item "$Demo/src/domain/discountPolicy.ts").LastWriteTime = Get-Date
node "$PSScriptRoot/clear-context.mjs"
Write-Host 'RESET: BrewCart restored to the intentional red baseline.'
