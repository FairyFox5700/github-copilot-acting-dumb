$ErrorActionPreference = 'Stop'
$Demo = Split-Path $PSScriptRoot -Parent
node "$PSScriptRoot/clear-context.mjs"
New-Item -ItemType Directory -Path "$Demo/.github" -Force | Out-Null
Copy-Item "$Demo/context-kit/.github/*" "$Demo/.github" -Recurse -Force
Write-Host 'CONTEXT APPLIED: instructions, prompt, agents, skill, and hook are active.'
