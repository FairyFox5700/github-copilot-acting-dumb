$ErrorActionPreference = 'Stop'
$Root = Split-Path -Parent $PSScriptRoot
New-Item "$Root\.github\instructions" -ItemType Directory -Force | Out-Null
Copy-Item "$Root\context-kit\.github\copilot-instructions.md" "$Root\.github\copilot-instructions.md" -Force
Copy-Item "$Root\context-kit\.github\instructions\pricing.instructions.md" "$Root\.github\instructions\pricing.instructions.md" -Force
Write-Host 'Context applied: repository-wide and path-specific Copilot instructions installed.'
