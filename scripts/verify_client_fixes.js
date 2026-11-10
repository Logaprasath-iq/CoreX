const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const edge = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const outDir = path.join(__dirname, '..', 'verification_screenshots', 'client_fixes');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

function capture(name, url, mode, scrollFn, width, height) {
  const runnerContent = `<!DOCTYPE html>
<html>
<head>
<style>
  body, html { margin:0; padding:0; width:${width}px; height:${height}px; overflow:hidden; }
  iframe { border:none; width:${width}px; height:${height}px; }
</style>
</head>
<body>
<iframe id="f" src="${url}"></iframe>
<script>
const f = document.getElementById('f');
f.onload = () => {
  const doc = f.contentWindow.document;
  if ('${mode}' === 'light') {
    doc.documentElement.classList.add('light');
  } else {
    doc.documentElement.classList.remove('light');
  }
  setTimeout(() => {
    try {
      (${scrollFn.toString()})(doc);
    } catch(e) {
      console.error(e);
    }
  }, 400);
};
</script>
</body>
</html>`;

  const runnerFileName = `runner_${name}.html`;
  fs.writeFileSync(path.join(__dirname, runnerFileName), runnerContent);
  const snapPath = path.join(outDir, `${name}.png`);
  const runnerUrl = `http://localhost:3005/scripts/${runnerFileName}`;

  const cmd = `"${edge}" --headless --disable-gpu --virtual-time-budget=2000 --screenshot="${snapPath}" --window-size=${width},${height} "${runnerUrl}"`;
  try {
    execSync(cmd, { stdio: 'ignore', timeout: 10000 });
    console.log(`[PASS] Captured ${name}.png (${width}x${height})`);
  } catch(e) {
    console.error(`[FAIL] ${name}:`, e.message);
  } finally {
    try { fs.unlinkSync(path.join(__dirname, runnerFileName)); } catch(e) {}
  }
}

// 1. Item 1: Benchmark Buttons (Dark & Light at 1024, 768)
const scrollBench = (doc) => {
  const el = doc.getElementById('benchmark-buttons');
  if (el) el.scrollIntoView({ behavior: 'instant', block: 'center' });
};
capture('item1_bench_dark_1024', 'http://localhost:3005/index.html', 'dark', scrollBench, 1024, 600);
capture('item1_bench_dark_768', 'http://localhost:3005/index.html', 'dark', scrollBench, 768, 600);
capture('item1_bench_dark_1280', 'http://localhost:3005/index.html', 'dark', scrollBench, 1280, 600);

// 3. Item 3: Mission & Vision Symbols
const scrollMission = (doc) => {
  const h = Array.from(doc.querySelectorAll('h3')).find(el => el.textContent.includes('Our Mission'));
  if (h) h.closest('section').scrollIntoView({ behavior: 'instant', block: 'center' });
};
capture('item3_mission_vision_dark', 'http://localhost:3005/about.html', 'dark', scrollMission, 1200, 600);
capture('item3_mission_vision_light', 'http://localhost:3005/about.html', 'light', scrollMission, 1200, 600);

// 5. Item 5: Pricing Table
const scrollPricing = (doc) => {
  const th = doc.querySelector('.comparison-header-row');
  if (th) th.scrollIntoView({ behavior: 'instant', block: 'center' });
};
capture('item5_pricing_table_dark', 'http://localhost:3005/pricing.html', 'dark', scrollPricing, 1200, 600);
capture('item5_pricing_table_light', 'http://localhost:3005/pricing.html', 'light', scrollPricing, 1200, 600);

console.log('Finished capturing targeted screenshots!');
