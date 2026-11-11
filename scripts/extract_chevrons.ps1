Add-Type -AssemblyName System.Drawing

$clean = [System.Drawing.Bitmap]::FromFile('c:\Users\merna\OneDrive\Desktop\tixmerna\assets\images\basket-clean.png')
$before = [System.Drawing.Bitmap]::FromFile('c:\Users\merna\OneDrive\Desktop\tixmerna\assets\images\before.png')

$w = $clean.Width
$h = $clean.Height

# Left chevron in before: roughly X: 650 to 1470, Y: 280 to 1150
# Right chevron in before: roughly X: 1470 to 2250, Y: 280 to 1150

$leftChev = New-Object System.Drawing.Bitmap(900, 900, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$rightChev = New-Object System.Drawing.Bitmap(900, 900, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)

# Let's see: for each pixel in before where difference with clean is substantial:
for ($y = 280; $y -lt 1150; $y++) {
    for ($x = 650; $x -lt 1470; $x++) {
        $pB = $before.GetPixel($x, $y)
        $pC = $clean.GetPixel($x, $y)
        $d = [Math]::Abs($pB.R - $pC.R) + [Math]::Abs($pB.G - $pC.G) + [Math]::Abs($pB.B - $pC.B) + [Math]::Abs($pB.A - $pC.A)
        if ($d -gt 25) {
            $leftChev.SetPixel($x - 650, $y - 280, $pB)
        }
    }
    for ($x = 1470; $x -lt 2250; $x++) {
        $pB = $before.GetPixel($x, $y)
        $pC = $clean.GetPixel($x, $y)
        $d = [Math]::Abs($pB.R - $pC.R) + [Math]::Abs($pB.G - $pC.G) + [Math]::Abs($pB.B - $pC.B) + [Math]::Abs($pB.A - $pC.A)
        if ($d -gt 25) {
            $rightChev.SetPixel($x - 1470, $y - 280, $pB)
        }
    }
}

$leftChev.Save('c:\Users\merna\OneDrive\Desktop\tixmerna\assets\images\left-chev-raw.png', [System.Drawing.Imaging.ImageFormat]::Png)
$rightChev.Save('c:\Users\merna\OneDrive\Desktop\tixmerna\assets\images\right-chev-raw.png', [System.Drawing.Imaging.ImageFormat]::Png)
Write-Host "Chevrons extracted!"

$clean.Dispose()
$before.Dispose()
$leftChev.Dispose()
$rightChev.Dispose()
