import fs from 'fs';

const db = JSON.parse(fs.readFileSync('backend/data/db.json', 'utf8'));
const items = db.menuItems;

console.log('Total items in backend/data/db.json:', items.length);

const byCategory = {};
items.forEach(it => {
  if (!byCategory[it.category]) byCategory[it.category] = [];
  byCategory[it.category].push({ id: it.id, name: it.name, image: it.image, isVeg: it.isVeg });
});

let out = `Total items in backend/data/db.json: ${items.length}\n`;
for (const [cat, list] of Object.entries(byCategory)) {
  out += `\n=== CATEGORY: ${cat} (${list.length} items) ===\n`;
  list.forEach(i => {
    out += `  [${i.id}] ${i.name} -> ${i.image}\n`;
  });
}
fs.writeFileSync('scripts/menu_analysis_out.txt', out, 'utf8');
console.log('Saved to scripts/menu_analysis_out.txt');
