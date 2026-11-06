const { execSync } = require('child_process');
const path = require('path');

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

const tests = [
  { url: 'http://localhost:3005/about.html', out: 'verification_screenshots/nav_about_dark.png', w: 1440, h: 220 },
  { url: 'http://localhost:3005/pricing.html', out: 'verification_screenshots/nav_pricing_dark.png', w: 1440, h: 220 },
  { url: 'http://localhost:3005/contact.html?theme=light', out: 'verification_screenshots/nav_contact_light.png', w: 1440, h: 220 }
];

tests.forEach(t => {
  const fullOut = path.resolve(t.out);
  const cmd = `"${edgePath}" --headless --disable-gpu --window-size=${t.w},${t.h} --screenshot="${fullOut}" "${t.url}"`;
  try {
    execSync(cmd, { stdio: 'inherit', timeout: 5000 });
    console.log('Successfully captured:', t.out);
  } catch (e) {
    console.error('Failed:', t.out, e.message);
  }
});
