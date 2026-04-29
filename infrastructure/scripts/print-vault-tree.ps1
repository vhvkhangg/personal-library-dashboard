param(
  [Parameter(Mandatory = $true)]
  [string]$VaultPath,

  [string]$OutputPath = "vault-tree-utf8.txt"
)

$ErrorActionPreference = "Stop"

function Write-Tree {
  param(
    [string]$Path,
    [string]$Prefix = ""
  )

  $items = Get-ChildItem -LiteralPath $Path -Force |
    Where-Object {
      $_.Name -notin @(".git", "node_modules", ".trash") -and
      -not ($_.FullName -like "*\.obsidian\workspace*")
    } |
    Sort-Object @{ Expression = { -not $_.PSIsContainer } }, Name

  for ($i = 0; $i -lt $items.Count; $i++) {
    $item = $items[$i]
    $isLast = $i -eq ($items.Count - 1)
    $branch = if ($isLast) { "+-- " } else { "\-- " }

    "$Prefix$branch$($item.Name)"

    if ($item.PSIsContainer) {
      $nextPrefix = if ($isLast) { "$Prefix    " } else { "$Prefix|   " }
      Write-Tree -Path $item.FullName -Prefix $nextPrefix
    }
  }
}

$root = Get-Item -LiteralPath $VaultPath
$result = @()
$result += $root.FullName
$result += Write-Tree -Path $root.FullName

$result | Set-Content -LiteralPath $OutputPath -Encoding utf8
Write-Host "Wrote $OutputPath"