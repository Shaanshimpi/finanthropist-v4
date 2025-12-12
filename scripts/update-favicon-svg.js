import { readFileSync, writeFileSync } from 'fs'
import { join } from 'path'

const logoPath = join(process.cwd(), 'public', 'static-media', 'logo.png')
const faviconSvgPath = join(process.cwd(), 'public', 'favicon.svg')

// Read logo and convert to base64
const logo = readFileSync(logoPath)
const base64 = logo.toString('base64')

// Create SVG with embedded logo
const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32">
  <image href="data:image/png;base64,${base64}" width="32" height="32" preserveAspectRatio="xMidYMid meet"/>
</svg>`

writeFileSync(faviconSvgPath, svgContent, 'utf8')
console.log('✓ Updated favicon.svg with embedded logo')

