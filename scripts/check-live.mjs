async function checkUrl(url) {
  try {
    const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } });
    console.log(`URL: ${url}`);
    console.log(`Status: ${res.status} ${res.statusText}`);
    const text = await res.text();
    console.log(`Length: ${text.length}`);
    console.log(`Preview:\n${text.substring(0, 400)}\n---`);
    return { status: res.status, text };
  } catch (err) {
    console.error(`Error fetching ${url}:`, err.message);
    return null;
  }
}

async function run() {
  await checkUrl('https://finanthropist.com/robots.txt');
  await checkUrl('https://finanthropist.com/sitemap.xml');
  await checkUrl('https://finanthropist.com/pages-sitemap.xml');
  await checkUrl('https://finanthropist.com/og-image.jpg');
  const home = await checkUrl('https://finanthropist.com/');
  if (home && home.text) {
    const titleMatch = home.text.match(/<title>([^<]+)<\/title>/i);
    const descMatch = home.text.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']+)["']/i);
    const canonMatch = home.text.match(/<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)["']/i);
    const ogImageMatch = home.text.match(/<meta[^>]*property=["']og:image["'][^>]*content=["']([^"']+)["']/i);
    const ldJsonMatches = [...home.text.matchAll(/<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)];
    console.log('=== METADATA EXTRACTED ===');
    console.log('Title:', titleMatch ? titleMatch[1] : 'NOT FOUND');
    console.log('Description:', descMatch ? descMatch[1] : 'NOT FOUND');
    console.log('Canonical:', canonMatch ? canonMatch[1] : 'NOT FOUND');
    console.log('OG Image:', ogImageMatch ? ogImageMatch[1] : 'NOT FOUND');
    console.log('JSON-LD blocks found:', ldJsonMatches.length);
    ldJsonMatches.forEach((m, idx) => {
      console.log(`JSON-LD [${idx}]:\n${m[1].substring(0, 300)}...\n`);
    });
  }
}

run();

