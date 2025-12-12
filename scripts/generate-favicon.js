import sharp from 'sharp'
import { readFileSync, writeFileSync } from 'fs'
import { join } from 'path'

const logoPath = join(process.cwd(), 'public', 'static-media', 'logo.png')
const faviconIcoPath = join(process.cwd(), 'public', 'favicon.ico')
const faviconSvgPath = join(process.cwd(), 'public', 'favicon.svg')

async function generateFavicon() {
  try {
    // Convert logo.png to favicon.ico (32x32)
    await sharp(logoPath)
      .resize(32, 32, {
        fit: 'contain',
        background: { r: 255, g: 255, b: 255, alpha: 0 }
      })
      .toFile(faviconIcoPath)

    console.log('✓ Generated favicon.ico')

    // Create favicon.svg that references the logo
    const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <image href="/static-media/logo.png" width="32" height="32" preserveAspectRatio="xMidYMid meet"/>
</svg>`

    writeFileSync(faviconSvgPath, svgContent, 'utf8')
    console.log('✓ Generated favicon.svg')

    console.log('Favicon generation complete!')
  } catch (error) {
    console.error('Error generating favicon:', error)
    process.exit(1)
  }
}

generateFavicon()

