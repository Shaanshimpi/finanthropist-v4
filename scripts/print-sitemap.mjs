async function check() {
  const res = await fetch('https://finanthropist.com/pages-sitemap.xml');
  const xml = await res.text();
  console.log('=== PAGES SITEMAP XML ===\n', xml);
}
check();

