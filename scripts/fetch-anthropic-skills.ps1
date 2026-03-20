$ErrorActionPreference = "Stop"

# Refresh upstream skills for this project.
# All skills live in skills/. Agent symlinks (.claude, .trae, .agent) point there.
#
# Run from the project root:
#   powershell -ExecutionPolicy Bypass -File .\scripts\fetch-anthropic-skills.ps1

$repoRoot   = Split-Path -Parent $PSScriptRoot
$skillsDir  = Join-Path $repoRoot "skills"
$agentDirs  = @(".claude", ".trae", ".agent")

$skills = @(
    @{ Repo = "https://github.com/vercel-labs/agent-skills"; Skill = "vercel-react-best-practices" },
    @{ Repo = "https://github.com/payloadcms/skills";        Skill = "payload" }
)

foreach ($item in $skills) {
    $slug      = $item.Skill
    $targetDir = Join-Path $skillsDir $slug

    # Install via skills CLI into a temp .agents location, then move to skills/
    Write-Host "Installing: $slug"
    npx skills add $item.Repo --skill $slug --yes

    $tempDir = Join-Path $repoRoot ".agents\skills\$slug"
    if (Test-Path $tempDir) {
        if (Test-Path $targetDir) {
            Remove-Item $targetDir -Recurse -Force
        }
        Move-Item $tempDir (Join-Path $skillsDir $slug)
        Write-Host "  Moved to skills/$slug"
    }

    # Repoint agent symlinks to skills/$slug
    foreach ($agentDir in $agentDirs) {
        $linkPath = Join-Path $repoRoot "$agentDir\skills\$slug"
        if (Test-Path $linkPath) {
            Remove-Item $linkPath -Force -Recurse
        }
        New-Item -ItemType SymbolicLink -Path $linkPath -Target $targetDir | Out-Null
        Write-Host "  Symlinked $agentDir/skills/$slug -> skills/$slug"
    }
}

# Clean up empty .agents dir if present
$agentsSkillsDir = Join-Path $repoRoot ".agents\skills"
if ((Test-Path $agentsSkillsDir) -and (!(Get-ChildItem $agentsSkillsDir))) {
    Remove-Item (Join-Path $repoRoot ".agents") -Recurse -Force
    Write-Host "Cleaned up .agents/"
}

Write-Host "All upstream skills ready in: skills/"
