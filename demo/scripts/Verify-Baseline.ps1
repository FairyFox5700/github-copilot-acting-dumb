$ErrorActionPreference = 'Stop'
$Demo = Split-Path $PSScriptRoot -Parent
Push-Location $Demo
try {
    node "$PSScriptRoot/verify-baseline.mjs"
    if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }

    $outputLines = & dotnet run --project tests/Commerce.Pricing.Specs 2>&1
    $status = $LASTEXITCODE
    $outputText = $outputLines -join [Environment]::NewLine
    Write-Host $outputText
    if ($status -eq 0 -or -not $outputText.Contains('FAILED: 3 pricing specification(s)')) {
        throw 'C# baseline did not expose exactly three known pricing failures.'
    }
    foreach ($expected in @(
        'SAVE20 discount is capped at EUR 50',
        'SAVE20 does not stack with category discount',
        'currency result rounds away from zero'
    )) {
        if (-not $outputText.Contains($expected)) {
            throw "C# baseline is missing an expected failure: $expected"
        }
    }
}
finally {
    Pop-Location
}
