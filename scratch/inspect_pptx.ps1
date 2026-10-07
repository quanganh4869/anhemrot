$ppt = New-Object -ComObject PowerPoint.Application
$pres = $ppt.Presentations.Open('d:\Work\Freelance\anhemrot\260830 Loi ru _ childhood story.pptx', [Microsoft.Office.Core.MsoTriState]::msoTrue, [Microsoft.Office.Core.MsoTriState]::msoFalse, [Microsoft.Office.Core.MsoTriState]::msoFalse)
Write-Output "Total PPTX Slides: $($pres.Slides.Count)"
for ($i = 20; $i -le [Math]::Min(28, $pres.Slides.Count); $i++) {
    $s = $pres.Slides.Item($i)
    Write-Output "=== Slide $i ==="
    for ($j = 1; $j -le $s.Shapes.Count; $j++) {
        $sh = $s.Shapes.Item($j)
        $txt = ''
        if ($sh.HasTextFrame -and $sh.TextFrame.HasText) {
            $txt = $sh.TextFrame.TextRange.Text.Replace("`n", ' ').Replace("`r", ' ')
            if ($txt.Length -gt 60) { $txt = $txt.Substring(0, 60) + '...' }
        }
        Write-Output "   Shape $j : '$($sh.Name)' Type: $($sh.Type) L: $($sh.Left) T: $($sh.Top) W: $($sh.Width) H: $($sh.Height) Text: '$txt'"
    }
}
$pres.Close()
$ppt.Quit()
