$ErrorActionPreference = 'Stop'
$Demo = Split-Path $PSScriptRoot -Parent
Copy-Item "$PSScriptRoot/fixtures/discountPolicy.fixed.ts" "$Demo/src/domain/discountPolicy.ts" -Force
(Get-Item "$Demo/src/domain/discountPolicy.ts").LastWriteTime = Get-Date
Write-Host 'KNOWN FIX APPLIED: promotion eligibility now belongs to the domain policy.'
