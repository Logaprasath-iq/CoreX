const fs = require('fs');
const path = require('path');

const files = [
  'about.html',
  'blog-details.html',
  'blog.html',
  'build-pc.html',
  'contact.html',
  'home-2.html',
  'index.html',
  'order.html',
  'pricing.html',
  'product-details.html',
  'products.html'
];

let desktopCount = 0;
let mobileCount = 0;

files.forEach(fileName => {
  const filePath = path.join(__dirname, '..', fileName);
  let content = fs.readFileSync(filePath, 'utf8');

  // Replace desktop button
  const newContent = content.replace(
    /(<!-- RTL Toggle Pill -->\s*<button onclick="window\.COREX\.toggleRTL\(\)" class="navbar-pill-btn)[^"]*(" title="Toggle RTL \/ LTR">\s*)<i data-lucide="arrow-left-right"[^>]*><\/i>\s*<span>RTL<\/span>(\s*<\/button>)/g,
    (match, p1, p2, p3) => {
      desktopCount++;
      return `${p1} navbar-rtl-btn hidden lg:inline-flex items-center justify-center h-10 px-3.5 rounded-xl text-xs font-bold text-neutral-300 hover:text-white transition${p2}<span>RTL</span>${p3}`;
    }
  ).replace(
    /(<!-- RTL Toggle inside Mobile Menu -->\s*<button onclick="window\.COREX\.toggleRTL\(\)" class="flex items-center justify-center)[^"]*(" title="Toggle RTL">\s*)<i data-lucide="arrow-left-right"[^>]*><\/i>\s*(<span class="text-\[11px\] font-semibold">RTL<\/span>\s*<\/button>)/g,
    (match, p1, p2, p3) => {
      mobileCount++;
      return `${p1} py-2.5 px-2 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white transition${p2}${p3}`;
    }
  );

  fs.writeFileSync(filePath, newContent, 'utf8');
  console.log(`Updated ${fileName}`);
});

console.log(`Finished: ${desktopCount} desktop and ${mobileCount} mobile RTL buttons updated!`);
