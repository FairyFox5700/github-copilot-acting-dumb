$ErrorActionPreference = 'Continue'
$Root = Split-Path -Parent $PSScriptRoot
Push-Location $Root
$outputLines = & dotnet run --project tests/Commerce.Pricing.Specs 2>&1
$status = $LASTEXITCODE
Pop-Location
$outputText = $outputLines -join [Environment]::NewLine
Write-Host $outputText
if ($status -eq 0) { throw 'Baseline unexpectedly passed.' }
$expectedFailures = @(
    'FAILED: 3 pricing specification(s)',
    'SAVE20 discount is capped at EUR 50',
    'SAVE20 does not stack with category discount',
    'currency result rounds away from zero'
)
foreach ($expected in $expectedFailures) {
    if (-not $outputText.Contains($expected)) {
        throw "Baseline failed for an unexpected reason; missing: $expected"
    }
}
Write-Host 'EXPECTED RED: baseline exposes exactly the three known pricing defects.'
exit 0
