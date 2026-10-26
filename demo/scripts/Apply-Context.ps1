$ErrorActionPreference = 'Stop'
$Root = Split-Path -Parent $PSScriptRoot
New-Item "$Root\.github\instructions" -ItemType Directory -Force | Out-Null
New-Item "$Root\.github\prompts" -ItemType Directory -Force | Out-Null
Copy-Item "$Root\context-kit\.github\copilot-instructions.md" "$Root\.github\copilot-instructions.md" -Force
Copy-Item "$Root\context-kit\.github\instructions\*.instructions.md" "$Root\.github\instructions" -Force
Copy-Item "$Root\context-kit\.github\prompts\*.prompt.md" "$Root\.github\prompts" -Force
Write-Host 'Context applied: repository instructions, path instructions, and prompt file installed.'
