const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const edge = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const outDir = path.join(__dirname, '..', 'verification_screenshots', 'footer_and_bench');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

function capture(name, url, mode, prepareFn, width, height) {
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
      (${prepareFn.toString()})(doc, f.contentWindow);
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
  const userDir = path.join(__dirname, `temp_edge_${name}`);

  const cmd = `"${edge}" --headless --disable-gpu --user-data-dir="${userDir}" --virtual-time-budget=2000 --screenshot="${snapPath}" --window-size=${width},${height} "${runnerUrl}"`;
  try {
    execSync(cmd, { stdio: 'ignore', timeout: 12000 });
    console.log(`[PASS] Captured ${name}.png (${width}x${height})`);
  } catch(e) {
    console.error(`[FAIL] ${name}:`, e.message);
  } finally {
    try { fs.unlinkSync(path.join(__dirname, runnerFileName)); } catch(e) {}
    try { fs.rmSync(userDir, { recursive: true, force: true }); } catch(e) {}
  }
}

// 1. Benchmark Card in Dark Mode
capture('benchmark_card_dark', 'http://localhost:3005/index.html', 'dark', (doc) => {
  const el = doc.getElementById('bench-setting-tag');
  if (el) el.closest('.card-3d').scrollIntoView({ behavior: 'instant', block: 'center' });
}, 1100, 550);

// 2. Benchmark Card in Light Mode
capture('benchmark_card_light', 'http://localhost:3005/index.html', 'light', (doc) => {
  const el = doc.getElementById('bench-setting-tag');
  if (el) el.closest('.card-3d').scrollIntoView({ behavior: 'instant', block: 'center' });
}, 1100, 550);

// 3. Footer Social - Twitter/X with hover state simulated or focused
capture('footer_twitter_hover', 'http://localhost:3005/index.html', 'dark', (doc) => {
  const xBtn = doc.querySelector('footer a[href*="x.com"]');
  if (xBtn) {
    xBtn.scrollIntoView({ behavior: 'instant', block: 'center' });
    // Simulate hover by adding hover class or dispatching mouseenter/focus
    xBtn.focus();
    // Also inject a test rule to preview :hover rendering directly
    const style = doc.createElement('style');
    style.textContent = `
      footer a[href*="x.com"] {
        background-color: #FFFFFF !important;
        color: #000000 !important;
        border-color: #FFFFFF !important;
      }
      footer a[href*="x.com"] svg {
        fill: #000000 !important;
        color: #000000 !important;
      }
    `;
    doc.head.appendChild(style);
  }
}, 600, 300);

console.log('Capture script finished!');
