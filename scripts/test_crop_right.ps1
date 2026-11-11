Add-Type -AssemblyName System.Drawing

$after = [System.Drawing.Bitmap]::FromFile('c:\Users\merna\OneDrive\Desktop\tixmerna\assets\images\after.png')
$cropRight = New-Object System.Drawing.Bitmap(650, 1000, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$g = [System.Drawing.Graphics]::FromImage($cropRight)
# Right chevron in after.png: X from 2300 to 2940, Y from 250 to 1250
$srcRect = New-Object System.Drawing.Rectangle(2300, 250, 640, 1000)
$destRect = New-Object System.Drawing.Rectangle(0, 0, 640, 1000)
$g.DrawImage($after, $destRect, $srcRect, [System.Drawing.GraphicsUnit]::Pixel)
$g.Dispose()
$cropRight.Save('c:\Users\merna\OneDrive\Desktop\tixmerna\assets\images\crop-right.png', [System.Drawing.Imaging.ImageFormat]::Png)
$cropRight.Dispose()
$after.Dispose()
Write-Host "Right crop saved!"
