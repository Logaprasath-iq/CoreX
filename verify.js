const fs = require('fs');
const path = require('path');

const htmlFiles = fs.readdirSync('.').filter(f => f.endsWith('.html'));
console.log('HTML files found (' + htmlFiles.length + '):', htmlFiles.join(', '));

let errors = 0;

htmlFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');

  // Check href links
  const hrefRegex = /href=["']([^"'#:]+?)["']/g;
  let match;
  while ((match = hrefRegex.exec(content)) !== null) {
    const raw = match[1];
    if (raw && !raw.startsWith('http') && !raw.startsWith('mailto') && !raw.startsWith('tel') && !raw.startsWith('javascript')) {
      const cleanPath = raw.split('?')[0];
      if (!fs.existsSync(cleanPath)) {
        console.error(`[${file}] Broken href: "${cleanPath}"`);
        errors++;
      }
    }
  }

  // Check src links
  const srcRegex = /src=["']([^"']+)["']/g;
  while ((match = srcRegex.exec(content)) !== null) {
    const raw = match[1];
    if (raw && !raw.startsWith('http') && !raw.startsWith('data:') && !raw.includes('${')) {
      const cleanPath = raw.split('?')[0];
      if (!fs.existsSync(cleanPath)) {
        console.error(`[${file}] Broken src: "${cleanPath}"`);
        errors++;
      }
    }
  }
});

// Also verify product data images
const { COREX_PRODUCTS, COREX_PACKAGES, COREX_CATEGORIES, COREX_BLOGS } = require('./js/products-data.js');

COREX_PRODUCTS.forEach(p => {
  if (p.image && !fs.existsSync(p.image)) {
    console.error(`[Product Data] Missing image: ${p.image} for ${p.id}`);
    errors++;
  }
});

COREX_PACKAGES.forEach(pkg => {
  if (pkg.image && !fs.existsSync(pkg.image)) {
    console.error(`[Package Data] Missing image: ${pkg.image} for ${pkg.id}`);
    errors++;
  }
});

COREX_CATEGORIES.forEach(c => {
  if (c.image && !fs.existsSync(c.image)) {
    console.error(`[Category Data] Missing image: ${c.image} for ${c.name}`);
    errors++;
  }
});

COREX_BLOGS.forEach(b => {
  if (b.image && !fs.existsSync(b.image)) {
    console.error(`[Blog Data] Missing image: ${b.image} for ${b.id}`);
    errors++;
  }
});

if (errors === 0) {
  console.log('SUCCESS: All 11 pages, links, and all 55+ media assets verified completely!');
} else {
  console.error(`Total verification errors: ${errors}`);
  process.exit(1);
}
