# Leagă regula globală (din repo) la ~/.claude/CLAUDE.md pe mașina curentă.
# Rulează o singură dată pe fiecare mașină nouă (după ce skill-ul e sincronizat/junctionat).
#   powershell -ExecutionPolicy Bypass -File setup\link-global-claude.ps1
$repoRule = (Resolve-Path (Join-Path $PSScriptRoot '..\CLAUDE.md')).Path
$global   = Join-Path $HOME '.claude\CLAUDE.md'
New-Item -ItemType Directory -Force -Path (Split-Path $global) | Out-Null
$linked = $false
try {
  if (Test-Path $global) { Remove-Item $global -Force }
  cmd /c mklink /H "$global" "$repoRule" | Out-Null
  if (Test-Path $global) { $linked = $true }
} catch {}
if (-not $linked) { Copy-Item $repoRule $global -Force }
$mode = if ($linked) { 'hardlink (auto-sync)' } else { 'copie' }
Write-Output "Regula globala activa la: $global ($mode)"
Write-Output "Sursa canonica (repo, versionata): $repoRule"
if (-not $linked) { Write-Output "NOTA: e copie - la schimbarea regulii, re-ruleaza scriptul." }
