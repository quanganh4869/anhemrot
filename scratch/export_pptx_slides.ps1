$ppt = New-Object -ComObject PowerPoint.Application
$pres = $ppt.Presentations.Open('d:\Work\Freelance\anhemrot\260830 Loi ru _ childhood story.pptx', [Microsoft.Office.Core.MsoTriState]::msoTrue, [Microsoft.Office.Core.MsoTriState]::msoFalse, [Microsoft.Office.Core.MsoTriState]::msoFalse)
for ($i = 21; $i -le 27; $i++) {
    $s = $pres.Slides.Item($i)
    $outPath = "d:\Work\Freelance\anhemrot\scratch\slides_24_27\pptx_full_slide_$i.png"
    $s.Export($outPath, "PNG", 1920, 1080)
    Write-Output "Exported slide $i to $outPath"
}
$pres.Close()
$ppt.Quit()
