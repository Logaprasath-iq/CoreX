const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const edge = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

const tests = [
  { name: 'snap_360_index_flash_sale.png', url: 'http://localhost:3005/index.html' },
  { name: 'snap_360_build_pc.png', url: 'http://localhost:3005/build-pc.html' },
  { name: 'snap_360_home2_hero.png', url: 'http://localhost:3005/home-2.html' },
  { name: 'snap_360_home2_tiers.png', url: 'http://localhost:3005/home-2.html' },
  { name: 'snap_360_pricing_table.png', url: 'http://localhost:3005/pricing.html' }
];

tests.forEach((t, i) => {
  const runner = `<!DOCTYPE html>
<html>
<head>
<style>
  body, html { margin:0; padding:0; width:360px; height:800px; overflow:hidden; }
  iframe { border:none; width:360px; height:800px; }
</style>
</head>
<body>
<iframe id="f" src="${t.url}"></iframe>
<script>
const f = document.getElementById('f');
f.onload = () => {
  setTimeout(() => {
    try {
      const doc = f.contentWindow.document;
      let el = null;
      if ('${t.name}'.includes('flash_sale')) {
        el = doc.querySelector('.flash-sale-section') || doc.querySelector('#flash-sale-section') || doc.querySelector('section:has(.flash-sale-badge-text)');
      } else if ('${t.name}'.includes('build_pc')) {
        el = doc.querySelector('#builder-container') || doc.querySelector('section:has(#total-price)') || doc.querySelector('#pc-builder-slots') || doc.querySelector('section:nth-of-type(2)');
      } else if ('${t.name}'.includes('tiers')) {
        const headings = Array.from(doc.querySelectorAll('h3'));
        el = headings.find(h => h.textContent.includes('GAMING PERFORMANCE'))?.closest('section');
      } else if ('${t.name}'.includes('pricing_table')) {
        el = doc.querySelector('.package-comparison-card');
      } else if ('${t.name}'.includes('home2_hero')) {
        // Natural top of page
        window.scrollTo(0, 0);
        return;
      } else {
        el = doc.querySelector('section');
      }
      if (el) {
        el.scrollIntoView({ behavior: 'instant', block: 'start' });
      }
    } catch(e) {}
  }, 800);
};
</script>
</body>
</html>`;

  fs.writeFileSync(`scripts/run_snap_360_${i}.html`, runner, 'utf8');

  const out = path.resolve(`verification_screenshots/${t.name}`);
  const cmd = `"${edge}" --headless --disable-gpu --virtual-time-budget=2500 --window-size=360,800 --screenshot="${out}" http://localhost:3005/scripts/run_snap_360_${i}.html`;
  try {
    execSync(cmd, { timeout: 10000 });
    console.log('Captured:', t.name);
  } catch(e) {
    console.error('Failed:', t.name, e.message);
  }
});
