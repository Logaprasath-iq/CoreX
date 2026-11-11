const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const edge = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const outDir = path.join(__dirname, '..', 'verification_screenshots', 'rtl_fixes');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

function capture(name, url, mode, width, height, openDrawer = false) {
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
  if (${openDrawer}) {
    const btn = doc.getElementById('mobile-menu-btn');
    if (btn) btn.click();
  }
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

// 1. Desktop 1280px Navbar
capture('nav_rtl_1280_dark', 'http://localhost:3005/index.html', 'dark', 1280, 150);
capture('nav_rtl_1280_light', 'http://localhost:3005/index.html', 'light', 1280, 150);

// 2. 1024px Navbar
capture('nav_rtl_1024_dark', 'http://localhost:3005/index.html', 'dark', 1024, 150);
capture('nav_rtl_1024_light', 'http://localhost:3005/index.html', 'light', 1024, 150);

// 3. Mobile menu drawer with RTL button
capture('nav_rtl_mobile_drawer_dark', 'http://localhost:3005/index.html', 'dark', 360, 750, true);

console.log('RTL verification captures completed!');
