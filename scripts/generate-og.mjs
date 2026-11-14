import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

async function generateOgImage() {
  const width = 1200;
  const height = 630;

  // SVG overlay with dark gradient, gold & red glowing accents, logo, and crisp typography
  const svgText = `
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#020617"/>
          <stop offset="50%" stop-color="#0f172a"/>
          <stop offset="100%" stop-color="#020617"/>
        </linearGradient>
        <radialGradient id="glowRed" cx="90%" cy="10%" r="50%">
          <stop offset="0%" stop-color="#C71C22" stop-opacity="0.35"/>
          <stop offset="100%" stop-color="#C71C22" stop-opacity="0"/>
        </radialGradient>
        <radialGradient id="glowGold" cx="10%" cy="90%" r="50%">
          <stop offset="0%" stop-color="#FCC22F" stop-opacity="0.3"/>
          <stop offset="100%" stop-color="#FCC22F" stop-opacity="0"/>
        </radialGradient>
      </defs>

      <!-- Background -->
      <rect width="${width}" height="${height}" fill="url(#bg)"/>
      <rect width="${width}" height="${height}" fill="url(#glowRed)"/>
      <rect width="${width}" height="${height}" fill="url(#glowGold)"/>

      <!-- Accent Top Border -->
      <rect x="0" y="0" width="${width}" height="6" fill="#C71C22"/>

      <!-- Badge -->
      <rect x="80" y="70" width="360" height="38" rx="19" fill="#FCC22F" fill-opacity="0.12" stroke="#FCC22F" stroke-opacity="0.4" stroke-width="1.5"/>
      <text x="260" y="94" font-family="Arial, sans-serif" font-size="14" font-weight="bold" fill="#FCC22F" text-anchor="middle" letter-spacing="2">MAHARASHTRA'S #1 INSTITUTE</text>

      <!-- Main Heading -->
      <text x="80" y="175" font-family="Arial, Helvetica, sans-serif" font-size="52" font-weight="900" fill="#ffffff">
        Learn Share Market Trading
      </text>
      <text x="80" y="240" font-family="Arial, Helvetica, sans-serif" font-size="48" font-weight="900" fill="#FCC22F">
        Basics to Advance in Marathi
      </text>

      <!-- Subtitle -->
      <text x="80" y="310" font-family="Arial, Helvetica, sans-serif" font-size="22" font-weight="normal" fill="#94a3b8">
        Equity • Futures &amp; Options • Commodity • Currency • Technical Analysis
      </text>

      <!-- Highlights Row -->
      <g transform="translate(80, 370)">
        <!-- Stat 1 -->
        <rect x="0" y="0" width="220" height="90" rx="16" fill="#1e293b" fill-opacity="0.7" stroke="#334155" stroke-width="1"/>
        <text x="24" y="42" font-family="Arial, sans-serif" font-size="32" font-weight="bold" fill="#ffffff">23+ Yrs</text>
        <text x="24" y="68" font-family="Arial, sans-serif" font-size="14" font-weight="bold" fill="#94a3b8">Finance Experience</text>

        <!-- Stat 2 -->
        <rect x="240" y="0" width="220" height="90" rx="16" fill="#1e293b" fill-opacity="0.7" stroke="#334155" stroke-width="1"/>
        <text x="264" y="42" font-family="Arial, sans-serif" font-size="32" font-weight="bold" fill="#FCC22F">10,000+</text>
        <text x="264" y="68" font-family="Arial, sans-serif" font-size="14" font-weight="bold" fill="#94a3b8">Families Trained</text>

        <!-- Stat 3 -->
        <rect x="480" y="0" width="220" height="90" rx="16" fill="#1e293b" fill-opacity="0.7" stroke="#334155" stroke-width="1"/>
        <text x="504" y="42" font-family="Arial, sans-serif" font-size="32" font-weight="bold" fill="#ffffff">5.0 ★</text>
        <text x="504" y="68" font-family="Arial, sans-serif" font-size="14" font-weight="bold" fill="#94a3b8">Google Rating</text>
      </g>

      <!-- Footer Bar -->
      <line x1="80" y1="510" x2="1120" y2="510" stroke="#334155" stroke-width="1"/>
      <text x="80" y="555" font-family="Arial, sans-serif" font-size="20" font-weight="bold" fill="#ffffff">
        Finanthropist Educare Pvt Ltd
      </text>
      <text x="80" y="582" font-family="Arial, sans-serif" font-size="14" fill="#94a3b8">
        Founder: Sammeer Sarang • Nashik, Maharashtra • www.finanthropist.com
      </text>
    </svg>
  `;

  const logoPath = path.resolve('public/static-media/logo.png');
  let compositeInputs = [{ input: Buffer.from(svgText), top: 0, left: 0 }];

  if (fs.existsSync(logoPath)) {
    const logoBuffer = await sharp(logoPath)
      .resize({ width: 220, height: 110, fit: 'inside' })
      .toBuffer();
    compositeInputs.push({
      input: logoBuffer,
      top: 60,
      left: 900,
    });
  }

  await sharp({
    create: {
      width,
      height,
      channels: 4,
      background: { r: 2, g: 6, b: 23, alpha: 1 },
    },
  })
    .composite(compositeInputs)
    .jpeg({ quality: 92 })
    .toFile('public/og-image.jpg');

  console.log('Generated public/og-image.jpg successfully!');
}

generateOgImage().catch(console.error);

