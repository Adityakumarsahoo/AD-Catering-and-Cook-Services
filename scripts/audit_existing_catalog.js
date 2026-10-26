import fs from 'fs';

const db = JSON.parse(fs.readFileSync('backend/data/db.json', 'utf8'));
const items = db.menuItems;

console.log(`Auditing ${items.length} dishes in backend/data/db.json...`);

// Check current duplicates
const urlToDishes = new Map();
items.forEach(item => {
  if (!urlToDishes.has(item.image)) {
    urlToDishes.set(item.image, []);
  }
  urlToDishes.get(item.image).push(item);
});

console.log(`Distinct image URLs: ${urlToDishes.size}`);
let dupCount = 0;
for (const [url, list] of urlToDishes.entries()) {
  if (list.length > 1) {
    dupCount++;
    console.log(`[DUPLICATE #${dupCount}] Used ${list.length} times: ${url}`);
    console.log(`  Dishes: ${list.map(d => `${d.name} (${d.category}, isVeg:${d.isVeg})`).slice(0, 5).join(' | ')}${list.length > 5 ? ' ...' : ''}`);
  }
}

console.log(`\nTotal duplicate URL clusters: ${dupCount}`);
