const { execSync } = require('child_process');
const fs = require('fs');

const pages = [
  'index.html',
  'home-2.html',
  'products.html',
  'pricing.html',
  'about.html',
  'build-pc.html',
  'contact.html',
  'blog.html',
  'order.html',
  'product-details.html',
  'blog-details.html'
];

if (!fs.existsSync('scripts')) {
  fs.mkdirSync('scripts');
}

const allResults = [];

pages.forEach(p => {
  const runner = `<!DOCTYPE html>
<html>
<head>
<style>
  body, html { margin:0; padding:0; width:360px; height:800px; overflow:hidden; }
  iframe { border:none; width:360px; height:800px; }
</style>
</head>
<body>
<iframe id="f" src="http://localhost:3005/${p}"></iframe>
<script>
const f = document.getElementById('f');
f.onload = () => {
  setTimeout(() => {
    try {
      const doc = f.contentWindow.document;
      const clientW = doc.documentElement.clientWidth;
      const scrollW = doc.documentElement.scrollWidth;
      const bodyScrollW = doc.body.scrollWidth;
      
      const overflowing = [];
      doc.querySelectorAll('*').forEach(el => {
        if (el.closest('#cart-drawer')) return;
        if (el.closest('#mobile-menu') && el.closest('#mobile-menu').classList.contains('hidden')) return;
        if (el.closest('#search-modal') && el.closest('#search-modal').classList.contains('hidden')) return;
        
        // Horizontal scrollable containers are allowed, and decorative elements clipped by overflow-hidden are safe
        if (el.closest('.overflow-hidden') || el.closest('.overflow-x-auto') || el.closest('#category-chips-bar') || el.closest('.package-comparison-card')) return;

        const rect = el.getBoundingClientRect();
        if (rect.right > clientW + 1) {
          overflowing.push({
            tag: el.tagName,
            id: el.id,
            cls: (el.className && typeof el.className === 'string') ? el.className.split(' ').slice(0, 5).join(' ') : '',
            right: Math.round(rect.right),
            width: Math.round(rect.width),
            diff: Math.round(rect.right - clientW)
          });
        }
      });

      overflowing.sort((a,b) => b.diff - a.diff);

      const report = {
        page: '${p}',
        clientW,
        scrollW,
        bodyScrollW,
        hasDocOverflow: scrollW > clientW || bodyScrollW > clientW,
        count: overflowing.length,
        top: overflowing.slice(0, 10)
      };

      const out = document.createElement('div');
      out.id = 'report';
      out.textContent = JSON.stringify(report);
      document.body.appendChild(out);
    } catch(e) {
      const out = document.createElement('div');
      out.id = 'report';
      out.textContent = JSON.stringify({ page: '${p}', error: e.message });
      document.body.appendChild(out);
    }
  }, 1000);
};
</script>
</body>
</html>`;

  fs.writeFileSync('scripts/temp_360_check.html', runner, 'utf8');

  const edge = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
  const cmd = `"${edge}" --headless --disable-gpu --virtual-time-budget=2500 --window-size=360,800 --dump-dom http://localhost:3005/scripts/temp_360_check.html`;
  try {
    const res = execSync(cmd, { encoding: 'utf8', timeout: 10000 });
    const match = res.match(/<div id="report">([\s\S]*?)<\/div>/);
    if (match) {
      const obj = JSON.parse(match[1]);
      allResults.push(obj);
      console.log(`[${p}] clientW=${obj.clientW} scrollW=${obj.scrollW} overflow=${obj.hasDocOverflow} badElements=${obj.count}`);
      if (obj.top && obj.top.length > 0) {
        obj.top.forEach(b => {
          console.log(`    +${b.diff}px: <${b.tag} id="${b.id}" class="${b.cls}"> right=${b.right} width=${b.width}`);
        });
      }
    }
  } catch(e) {
    console.error(`Failed ${p}:`, e.message);
  }
});

fs.writeFileSync('scripts/audit_360_results.json', JSON.stringify(allResults, null, 2), 'utf8');
console.log('Saved all results to scripts/audit_360_results.json');
