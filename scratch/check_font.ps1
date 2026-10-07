$ppt = New-Object -ComObject PowerPoint.Application
$pres = $ppt.Presentations.Open('d:\Work\Freelance\anhemrot\260830 Loi ru _ childhood story.pptx', [Microsoft.Office.Core.MsoTriState]::msoTrue, [Microsoft.Office.Core.MsoTriState]::msoFalse, [Microsoft.Office.Core.MsoTriState]::msoFalse)
for ($i = 23; $i -le 26; $i++) {
    $s = $pres.Slides.Item($i)
    Write-Output "=== Slide $i ==="
    for ($j = 1; $j -le $s.Shapes.Count; $j++) {
        $sh = $s.Shapes.Item($j)
        if ($sh.HasTextFrame -and $sh.TextFrame.HasText) {
            $tr = $sh.TextFrame.TextRange
            Write-Output "   Shape '$($sh.Name)': Font=$($tr.Font.Name) Size=$($tr.Font.Size) ColorRGB=$($tr.Font.Color.RGB) FillVisible=$($sh.Fill.Visible) LineVisible=$($sh.Line.Visible)"
        }
    }
}
$pres.Close()
$ppt.Quit()
