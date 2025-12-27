$files = @('day3.html', 'day4.html', 'day5.html', 'day6.html', 'day7.html', 'day8.html')

foreach ($file in $files) {
    if (Test-Path $file) {
        $content = Get-Content $file -Raw -Encoding UTF8
        
        # 替換所有顏色
        $content = $content -replace '#667eea', '#0047A0'
        $content = $content -replace '#764ba2', '#CD2E3A'
        $content = $content -replace 'rgba\(102, 126, 234, 0\.4\)', 'rgba(0, 71, 160, 0.3)'
        $content = $content -replace 'rgba\(102, 126, 234,', 'rgba(0, 71, 160,'
        $content = $content -replace "this\.style\.background = '#667eea'", "this.style.background = 'linear-gradient(135deg, #0047A0 0%, #CD2E3A 100%)'"
        
        [System.IO.File]::WriteAllText((Resolve-Path $file).Path, $content, [System.Text.Encoding]::UTF8)
        Write-Host "Updated $file"
    }
}

